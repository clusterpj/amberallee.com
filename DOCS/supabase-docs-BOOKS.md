# Supabase Integration Documentation for AmberAllee.com

## Books Table Schema

### Table Structure
```sql
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    amazon_link TEXT,
    published_date DATE,
    price INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Column Details
- `id`: UUID, Required, Primary key
- `title`: Text, Required, Book title
- `description`: Text, Optional, Book description
- `cover_image_url`: Text, Optional, URL to book cover image
- `amazon_link`: Text, Optional, Link to Amazon listing
- `published_date`: Date, Optional, Book release date
- `price`: Integer, Optional, Price in cents
- `created_at`: Timestamp with timezone, Required, Auto-generated
- `updated_at`: Timestamp with timezone, Required, Auto-generated

## API Operations

### Reading Data

#### Get All Books
```typescript
const getAllBooks = async () => {
  const { data: books, error } = await supabase
    .from('books')
    .select('*');
    
  if (error) throw error;
  return books;
};
```

#### Get Books with Pagination
```typescript
const getBooksPaginated = async (page: number, pageSize: number) => {
  const start = page * pageSize;
  const end = start + pageSize - 1;
  
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .range(start, end);
    
  if (error) throw error;
  return books;
};
```

#### Get Book by ID
```typescript
const getBookById = async (id: string) => {
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return book;
};
```

### Writing Data

#### Insert New Book
```typescript
interface BookInput {
  title: string;
  description?: string;
  cover_image_url?: string;
  amazon_link?: string;
  published_date?: string;
  price?: number;
}

const createBook = async (book: BookInput) => {
  const { data, error } = await supabase
    .from('books')
    .insert([book])
    .select();
    
  if (error) throw error;
  return data[0];
};
```

#### Update Book
```typescript
const updateBook = async (id: string, updates: Partial<BookInput>) => {
  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};
```

#### Delete Book
```typescript
const deleteBook = async (id: string) => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};
```

## Real-time Subscriptions

### Subscribe to All Book Changes
```typescript
const subscribeToBooks = (callback: (payload: any) => void) => {
  return supabase.channel('books-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'books' },
      callback
    )
    .subscribe();
};
```

### Subscribe to Specific Events
```typescript
// Insert events
const subscribeToNewBooks = (callback: (payload: any) => void) => {
  return supabase.channel('books-inserts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'books' },
      callback
    )
    .subscribe();
};

// Update events
const subscribeToBookUpdates = (callback: (payload: any) => void) => {
  return supabase.channel('books-updates')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'books' },
      callback
    )
    .subscribe();
};

// Delete events
const subscribeToBookDeletions = (callback: (payload: any) => void) => {
  return supabase.channel('books-deletions')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'books' },
      callback
    )
    .subscribe();
};
```

## Error Handling

```typescript
interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

const handleSupabaseError = (error: SupabaseError) => {
  console.error('Supabase Error:', {
    message: error.message,
    details: error.details,
    code: error.code
  });
  
  // Add appropriate error handling logic here
  throw new Error(`Database error: ${error.message}`);
};
```

## Type Definitions

```typescript
interface Book {
  id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  amazon_link?: string;
  published_date?: string;
  price?: number;
  created_at: string;
  updated_at: string;
}

interface BookFilter {
  title?: string;
  published_date?: {
    start?: string;
    end?: string;
  };
  price?: {
    min?: number;
    max?: number;
  };
}
```

## Usage Examples

### Implementing a Book Search
```typescript
const searchBooks = async (filter: BookFilter) => {
  let query = supabase.from('books').select('*');
  
  if (filter.title) {
    query = query.ilike('title', `%${filter.title}%`);
  }
  
  if (filter.published_date?.start) {
    query = query.gte('published_date', filter.published_date.start);
  }
  
  if (filter.published_date?.end) {
    query = query.lte('published_date', filter.published_date.end);
  }
  
  if (filter.price?.min) {
    query = query.gte('price', filter.price.min);
  }
  
  if (filter.price?.max) {
    query = query.lte('price', filter.price.max);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

### Basic CRUD Operations Example
```typescript
// Example implementation
const bookOperations = {
  async create(book: BookInput) {
    return await createBook(book);
  },
  
  async read(id: string) {
    return await getBookById(id);
  },
  
  async update(id: string, updates: Partial<BookInput>) {
    return await updateBook(id, updates);
  },
  
  async delete(id: string) {
    return await deleteBook(id);
  },
  
  async list(page = 0, pageSize = 10) {
    return await getBooksPaginated(page, pageSize);
  }
};
```

## Integration Notes

1. Ensure Supabase client is properly initialized with project URL and anon key
2. Implement proper error handling for all database operations
3. Consider implementing retry logic for failed operations
4. Use TypeScript types for better type safety
5. Set up appropriate RLS policies for security
6. Consider implementing caching for frequently accessed data
7. Use prepared statements to prevent SQL injection
8. Implement proper validation before database operations
