# Supabase Events Integration Documentation for AmberAllee.com

## Events Table Schema

### Table Structure
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location TEXT,
    virtual_link TEXT,
    is_virtual BOOLEAN DEFAULT false,
    image_url TEXT,
    registration_link TEXT,
    time TEXT,
    capacity INTEGER,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_location ON events(location);
CREATE INDEX idx_events_tags ON events USING GIN(tags);

-- Add RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for events" 
ON events 
FOR SELECT 
USING (true);

CREATE POLICY "Admin full access for events"
ON events
FOR ALL
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = 'admin'
));
```

### Column Details
- `id`: UUID, Required, Primary key
- `title`: Text, Required, Event title
- `description`: Text, Optional, Event description
- `date`: Timestamp with timezone, Required, Event date and time
- `location`: Text, Optional, Event location
- `registration_link`: Text, Optional, Link to registration page
- `created_at`: Timestamp with timezone, Required, Auto-generated
- `updated_at`: Timestamp with timezone, Required, Auto-generated

## API Operations

### Reading Data

#### Get All Events
```typescript
const getAllEvents = async () => {
  const { data: events, error } = await supabase
    .from('events')
    .select('*');
    
  if (error) throw error;
  return events;
};
```

#### Get Events with Pagination
```typescript
const getEventsPaginated = async (page: number, pageSize: number) => {
  const start = page * pageSize;
  const end = start + pageSize - 1;
  
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .range(start, end);
    
  if (error) throw error;
  return events;
};
```

#### Get Upcoming Events
```typescript
const getUpcomingEvents = async () => {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });
    
  if (error) throw error;
  return events;
};
```

### Writing Data

#### Create New Event
```typescript
interface EventInput {
  title: string;
  description?: string;
  date: string;
  location?: string;
  registration_link?: string;
}

const createEvent = async (event: EventInput) => {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select();
    
  if (error) throw error;
  return data[0];
};
```

#### Update Event
```typescript
const updateEvent = async (id: string, updates: Partial<EventInput>) => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};
```

#### Delete Event
```typescript
const deleteEvent = async (id: string) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};
```

## Real-time Subscriptions

### Subscribe to All Event Changes
```typescript
const subscribeToEvents = (callback: (payload: any) => void) => {
  return supabase.channel('events-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'events' },
      callback
    )
    .subscribe();
};
```

### Subscribe to Specific Events
```typescript
// Insert events
const subscribeToNewEvents = (callback: (payload: any) => void) => {
  return supabase.channel('events-inserts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'events' },
      callback
    )
    .subscribe();
};

// Update events
const subscribeToEventUpdates = (callback: (payload: any) => void) => {
  return supabase.channel('events-updates')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'events' },
      callback
    )
    .subscribe();
};

// Delete events
const subscribeToEventDeletions = (callback: (payload: any) => void) => {
  return supabase.channel('events-deletions')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'events' },
      callback
    )
    .subscribe();
};
```

## Type Definitions

```typescript
interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  registration_link?: string;
  created_at: string;
  updated_at: string;
}

interface EventFilter {
  title?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
  location?: string;
}
```

## Usage Examples

### Implementing Event Search
```typescript
const searchEvents = async (filter: EventFilter) => {
  let query = supabase.from('events').select('*');
  
  if (filter.title) {
    query = query.ilike('title', `%${filter.title}%`);
  }
  
  if (filter.dateRange?.start) {
    query = query.gte('date', filter.dateRange.start);
  }
  
  if (filter.dateRange?.end) {
    query = query.lte('date', filter.dateRange.end);
  }
  
  if (filter.location) {
    query = query.ilike('location', `%${filter.location}%`);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

### Get Events by Date Range
```typescript
const getEventsByDateRange = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
    
  if (error) throw error;
  return data;
};
```

### Basic CRUD Operations Example
```typescript
const eventOperations = {
  async create(event: EventInput) {
    return await createEvent(event);
  },
  
  async read(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async update(id: string, updates: Partial<EventInput>) {
    return await updateEvent(id, updates);
  },
  
  async delete(id: string) {
    return await deleteEvent(id);
  },
  
  async list(page = 0, pageSize = 10) {
    return await getEventsPaginated(page, pageSize);
  }
};
```

## Calendar Integration Helpers

```typescript
const eventCalendarHelpers = {
  // Convert events to calendar format
  toCalendarEvents(events: Event[]) {
    return events.map(event => ({
      id: event.id,
      title: event.title,
      start: new Date(event.date),
      description: event.description,
      location: event.location,
      url: event.registration_link
    }));
  },
  
  // Group events by month
  groupByMonth(events: Event[]) {
    return events.reduce((acc, event) => {
      const month = new Date(event.date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {} as Record<string, Event[]>);
  }
};
```

## Integration Notes

1. Always validate date inputs before sending to database
2. Consider timezone handling for event dates
3. Implement proper date formatting for display
4. Consider adding indexes for date and location columns
5. Implement proper validation for required fields
6. Consider implementing event recurrence logic if needed
7. Add appropriate RLS policies for event management
8. Consider implementing event capacity tracking
9. Add validation for registration link format
10. Consider implementing event categories or tags
