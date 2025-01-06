# PROJECT CONTEXT: AmberAllee.com

## SYSTEM ARCHITECTURE

### Database: Supabase + Drizzle ORM
- Primary database: Supabase PostgreSQL
- ORM: Drizzle with custom migrations
- Authentication: Supabase Auth

### Frontend
- Framework: Next.js 14 (App Router)
- UI: TailwindCSS + shadcn/ui components
- State: React hooks + Supabase realtime

## IMPLEMENTED FEATURES

### Authentication System
STATUS: COMPLETE
LOCATION: src/lib/useAuth.ts, src/components/SupabaseProvider.tsx
```typescript
interface CustomUser {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}
```
CAPABILITIES:
- Role-based access control
- Session management
- Protected routes
- Automatic user record creation

### Book Management
STATUS: PARTIAL
LOCATION: src/components/admin/BookForm.tsx, src/app/admin/books/page.tsx

IMPLEMENTED:
```typescript
interface Book {
  id: string
  title: string
  description: string
  amazon_link: string
  cover_image: string
  release_date: string
  series?: string
  series_order?: number
  tropes: string[]
  is_published: boolean
}
```
FEATURES:
- Basic CRUD operations
- Responsive grid layout
- Form-based book creation
- Basic card display

### Database Schema
STATUS: COMPLETE
LOCATION: src/lib/db/schema.ts

TABLES:
- books
- users
- blog_posts
- events
- orders
- order_items
- newsletter_subscribers

## REQUIRED IMPLEMENTATIONS

### 1. Book Display Enhancement
PRIORITY: HIGH
```typescript
interface BookDisplayOptions {
  showUnpublished?: boolean
  series?: string
}
```
REQUIREMENTS:
- Add cover images to book cards
- Implement quick edit for admin
- Add delete functionality
- Add list/grid view toggle

### 2. Series Organization
PRIORITY: MEDIUM
REQUIREMENTS:
- Group books by series
- Sort by release date
- Series order display
- Toggle published/unpublished in admin view

### 3. Admin Interface
PRIORITY: HIGH
LOCATION: src/app/admin/*
REQUIREMENTS:
- Enhanced book editing
- Cover image upload
- Book deletion
- Publication status management

## API ENDPOINTS

### Implemented
```typescript
// Current endpoints
supabase.from('books').select('*')
supabase.from('books').insert([book])
```

### Required
```typescript
// Required endpoints
const bookApi = {
  getPublishedBooks: async () => {
    return supabase
      .from('books')
      .select('*')
      .eq('is_published', true)
      .order('release_date', { ascending: false })
  },

  getAllBooks: async () => {
    return supabase
      .from('books')
      .select('*')
      .order('release_date', { ascending: false })
  },

  getSeriesBooks: async (series: string) => {
    return supabase
      .from('books')
      .select('*')
      .eq('series', series)
      .eq('is_published', true)
      .order('series_order')
  }
}
```

## PROJECT CONSTRAINTS

### Business Context
- Small book catalog (2-3 books initially)
- Romance author platform
- Focus on series organization
- Admin and public views needed

### Technical Constraints
- Supabase for database and auth
- Next.js 14 App Router structure
- TailwindCSS for styling
- shadcn/ui component library

## DEVELOPMENT GUIDELINES

### Component Structure
- Use 'use client' for client components
- Implement error boundaries
- Add loading states
- Follow existing naming conventions

### Data Handling
- Use Supabase for all data operations
- Implement optimistic updates
- Handle loading/error states
- Validate data on client and server

### Authentication
- Check user roles for admin access
- Protect admin routes
- Handle auth state changes
- Maintain session consistency

### Styling
- Use Tailwind utility classes
- Follow shadcn/ui patterns
- Maintain responsive design
- Use existing color scheme

## TESTING REQUIREMENTS

### Unit Tests Needed
- Form validation
- Data transformations
- API functions
- Utility functions

### Integration Tests Needed
- Book CRUD operations
- Admin workflows
- Authentication flows
- Series organization

## STATUS INDICATORS
✅ = Implemented
🔄 = Partially Implemented
⚠️ = Needs Implementation
🚫 = Blocked/Dependencies

Use these indicators when discussing feature status.