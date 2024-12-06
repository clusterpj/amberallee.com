# AmberAllee.com Website Masterplan

## Brand Overview
Amber Allee is a rising romance author specializing in mafia romance novels, combining passionate storytelling with elements of suspense and drama. Her brand identity merges feminine sophistication with edgy undertones, reflected in her visual identity through:
- Soft pink leopard print patterns
- Vintage typewriter motifs
- Elegant script typography
- Gold/metallic accents

## Core Objectives
1. Create a professional author platform that showcases Amber's books and brand
2. Enable direct sales of special edition books via CoreBill integration
3. Facilitate fan engagement and community building
4. Provide easy content management for ongoing updates
5. Drive traffic through blog content and social media integration

## Technical Stack
### Frontend
- **Next.js 14 App Router**
  - TailwindCSS + shadcn/ui components
  - TypeScript
  - Server Actions for form handling
  - Server-side rendering for SEO

### API Integration
- **CoreBill API**
  - Authentication & user management
  - Payment processing
  - Order management
  - Inventory tracking

### Database
- **PostgreSQL**
  - Content management
  - Blog posts
  - Events
  - Book information

### Infrastructure
- **Single Digital Ocean Droplet**
  - Ubuntu LTS
  - Nginx reverse proxy
  - PM2 process manager
  - Let's Encrypt SSL

## Database Schema
```sql
-- Books (Content Only - Inventory in CoreBill)
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    amazon_link TEXT,
    release_date DATE,
    cover_image TEXT,
    tropes TEXT[],
    series TEXT,
    corebill_item_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Sessions (CoreBill Auth)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## API Integration
### CoreBill Endpoints
```javascript
export const apiConfig = {
  baseURL: process.env.COREBILL_API_URL,
  endpoints: {
    auth: {
      login: 'auth/login',
      logout: 'auth/logout',
      me: 'me'
    },
    orders: {
      create: 'invoices',
      get: 'invoices'
    },
    payments: {
      methods: 'payments/multiple/get-payment-methods',
      create: 'payments/multiple/create'
    },
    items: 'items'
  }
}
```

## Core Features

### Authentication & User Management
- JWT-based authentication via CoreBill
- Session management
- Role-based access control
- Admin user management

### Content Management
- Book information and links
- Blog post editor with rich text
- Event calendar management
- Media uploads

### E-commerce (CoreBill Integration)
- Special editions listing
- Shopping cart functionality
- Secure checkout process
- Order tracking
- Inventory sync

### Public Features
- Book showcase
- Author blog
- Events listing
- Newsletter signup
- Social media integration

## Development Phases

### Phase 1: Foundation (1 week)
- Project setup
- CoreBill API integration
- Authentication implementation
- Database setup

### Phase 2: Content (1 week)
- Admin dashboard
- Book management
- Blog system
- Event calendar

### Phase 3: E-commerce (1 week)
- Special editions store
- Shopping cart
- Checkout process
- Order management

### Phase 4: Launch (1 week)
- Testing
- Content migration
- Performance optimization
- SSL setup

## Environment Variables
```
# CoreBill API
COREBILL_API_URL=
COREBILL_API_KEY=
COREBILL_SECRET=

# Database
DATABASE_URL=

# Auth
JWT_SECRET=
SESSION_SECRET=

# Email (Optional)
EMAIL_FROM=
EMAIL_API_KEY=
```

## Success Metrics
1. Special edition sales through CoreBill
2. Newsletter signups
3. Blog engagement
4. Website traffic
5. Order completion rate