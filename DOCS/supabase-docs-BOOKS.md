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
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    categories TEXT[], -- Array of categories
    purchase_now_button TEXT, -- Purchase button configuration
    series TEXT, -- Series name
    book_number INTEGER, -- Order in series
    teasers TEXT[], -- Array of teasers
    tropes TEXT[] -- Array of tropes
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
- `categories`: Text Array, Optional, Book categories for improved searchability
- `purchase_now_button`: Text, Optional, Custom purchase button configuration
- `series`: Text, Optional, Name of the book series
- `book_number`: Integer, Optional, Position in the series
- `teasers`: Text Array, Optional, Marketing teasers
- `tropes`: Text Array, Optional, Genre tropes for enhanced discoverability

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
  categories?: string[];
  purchase_now_button?: string;
  series?: string;
  book_number?: number;
  teasers?: string[];
  tropes?: string[];
}

interface BookInput {
  title: string;
  description?: string;
  cover_image_url?: string;
  amazon_link?: string;
  published_date?: string;
  price?: number;
  categories?: string[];
  purchase_now_button?: string;
  series?: string;
  book_number?: number;
  teasers?: string[];
  tropes?: string[];
}

interface BookFilter extends Partial<BookInput> {
  published_date?: {
    start?: string;
    end?: string;
  };
  price?: {
    min?: number;
    max?: number;
  };
  series_only?: boolean;
}
```

## Enhanced API Operations

### Reading Data with Advanced Filtering

```typescript
const getBooksByCategory = async (category: string) => {
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .contains('categories', [category]);
    
  if (error) throw error;
  return books;
};

const getBooksBySeries = async (seriesName: string) => {
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .eq('series', seriesName)
    .order('book_number', { ascending: true });
    
  if (error) throw error;
  return books;
};

const searchBooksAdvanced = async (filter: BookFilter) => {
  let query = supabase.from('books').select('*');
  
  if (filter.title) {
    query = query.ilike('title', `%${filter.title}%`);
  }
  
  if (filter.series) {
    query = query.eq('series', filter.series);
  }
  
  if (filter.categories?.length) {
    query = query.contains('categories', filter.categories);
  }
  
  if (filter.tropes?.length) {
    query = query.contains('tropes', filter.tropes);
  }
  
  if (filter.series_only) {
    query = query.not('series', 'is', null);
  }
  
  if (filter.published_date?.start) {
    query = query.gte('published_date', filter.published_date.start);
  }
  
  if (filter.published_date?.end) {
    query = query.lte('published_date', filter.published_date.end);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

### Writing Data with Validation

```typescript
const createBookWithValidation = async (book: BookInput) => {
  // Validate series data consistency
  if (book.series && typeof book.book_number === 'undefined') {
    throw new Error('Book number is required when adding to a series');
  }
  
  // Ensure arrays are properly formatted
  const formattedBook = {
    ...book,
    categories: book.categories || [],
    tropes: book.tropes || [],
    teasers: book.teasers || []
  };
  
  const { data, error } = await supabase
    .from('books')
    .insert([formattedBook])
    .select();
    
  if (error) throw error;
  return data[0];
};

const updateBookWithValidation = async (id: string, updates: Partial<BookInput>) => {
  // Prevent series inconsistencies
  if (updates.series === null && updates.book_number !== null) {
    updates.book_number = null;
  }
  
  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};
```

## Performance Optimizations

### Batch Operations

```typescript
const batchUpdateBooks = async (updates: Array<{ id: string } & Partial<BookInput>>) => {
  const { data, error } = await supabase
    .from('books')
    .upsert(updates)
    .select();
    
  if (error) throw error;
  return data;
};

const batchDeleteBooks = async (ids: string[]) => {
  const { error } = await supabase
    .from('books')
    .delete()
    .in('id', ids);
    
  if (error) throw error;
};
```

### Optimized Queries

```typescript
const getSeriesWithBooks = async (seriesName: string) => {
  const { data: books, error } = await supabase
    .from('books')
    .select('id, title, book_number, published_date') // Select only needed fields
    .eq('series', seriesName)
    .order('book_number', { ascending: true });
    
  if (error) throw error;
  return books;
};
```

## Integration Notes

1. Database Considerations
   - Implement appropriate indexes for frequently queried columns
   - Consider partitioning for large series collections
   - Use materialized views for complex category/trope combinations

2. Security Considerations
   - Implement RLS policies for public/private book visibility
   - Validate array inputs to prevent injection
   - Sanitize search inputs

3. Performance Optimizations
   - Cache frequently accessed series data
   - Implement lazy loading for book covers
   - Use connection pooling for high-traffic periods

4. Monitoring and Maintenance
   - Track query performance metrics
   - Monitor real-time subscription usage
   - Implement automated data validation checks