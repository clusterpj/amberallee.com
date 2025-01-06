# AmberAllee.com Website Masterplan

## Brand Overview
Amber Allee is a rising romance author specializing in mafia romance novels, combining passionate storytelling with elements of suspense and drama. Her brand identity merges sophistication with modern edge, reflected through:
- Blues with leopard print accents
- Elegant typography
- Gold/metallic accents
- Bling details

## Core Objectives
1. Create a professional author platform showcasing books and brand
2. Enable direct sales of special editions via Supabase and Stripe integration
3. Build and engage "Amber's Army of Readers" community
4. Streamline content management for regular updates
5. Drive traffic through social media integration and newsletter growth
6. Facilitate ARC/Beta reader program management

## Navigation Structure
- Home
- Books/Coming Soon
- Sign Up (Beta/ARC/Street Teams)
- Events
- Join Reader Group
- Contact
- Blog

## Social Media Integration
- Facebook: /AmberAlleeAuthor
- Facebook Group: Amber's Army of Readers
- Instagram: @author.amberallee
- TikTok: @author.amberallee
- Goodreads: Author Profile
- Contact Email: author.amberallee@gmail.com

## Upcoming Events 2025
- Book Release (TBD)
- Motorcycles Mobsters & Mayhem (March 15, Frisco, TX)
- Kiss and Tell Book Event (June 21, Grapevine, TX)

## Technical Stack
### Frontend
- **Next.js 14 App Router**
  - TailwindCSS + shadcn/ui components
  - TypeScript
  - Server Actions for form handling
  - Server-side rendering for SEO

### Backend & API
- **Supabase**
  - Authentication & user management
  - Database
  - Storage for media files
  - Edge Functions for custom logic
  - Row Level Security (RLS)

### Payment Processing
- **Authorize.net**
  - Payment processing and gateway
  - Credit card transaction handling
  - Secure payment data handling
  - Transaction reporting and management

### Infrastructure
- **Single Digital Ocean Droplet**
  - Ubuntu LTS
  - Nginx reverse proxy
  - PM2 process manager
  - Let's Encrypt SSL

## Database Schema
```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT,
    role TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Books
CREATE TABLE books (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    cover_image_url TEXT,
    amazon_link TEXT,
    published_date DATE,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    price INT4
);

-- Blog Posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY,
    title TEXT,
    content TEXT,
    excerpt TEXT,
    cover_image_url TEXT,
    published_at TIMESTAMPTZ,
    author_id UUID,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Events
CREATE TABLE events (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    date TIMESTAMPTZ,
    location TEXT,
    registration_link TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

## Row Level Security Policies

```sql
-- Books table policies
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are viewable by everyone" 
ON books FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Only admins can modify books" 
ON books FOR ALL 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Blog posts table policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone" 
ON blog_posts FOR SELECT 
TO authenticated, anon
USING (published_at IS NOT NULL);

CREATE POLICY "Only admins can modify blog posts" 
ON blog_posts FOR ALL 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Events table policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone" 
ON events FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Only admins can modify events" 
ON events FOR ALL 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

## API Integration
### Supabase Client Setup
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Core Features

### Authentication & User Management
- Supabase Auth with email provider
- Row Level Security (RLS) policies based on user roles
- Two-tier role system:
  - "admin": Full access to content management and user data
  - "customer": Limited access to public content and their own data
- Admin dashboard for user management

### Content Management
- Book information and links
- Blog post editor with rich text
- Event calendar management
- Media uploads to Supabase Storage

### E-commerce (Authorize.net Integration)
- Special editions listing
- Shopping cart functionality
- Secure checkout process via Authorize.net Accept.js
- Transaction management and reporting
- Inventory management
- Order status tracking

### Public Features
- Book showcase
- Author blog
- Events listing
- Newsletter signup
- Social media integration

## Development Phases

### Phase 1: Core Setup (Current)
- ✅ Project initialization
- ✅ Basic layout and components
- ⏳ Supabase integration
- ⏳ Database setup
- ⏳ Authentication implementation

### Phase 2: Content & Design
- ⏳ Layout refinement
- ⏳ Brand implementation
- ⏳ Content migration
- ⏳ Newsletter integration
- ⏳ Social media components

### Phase 3: E-commerce
- Authorize.net integration
  - Accept.js implementation for secure payment form
  - Server-side transaction processing
  - Payment response handling
  - Error handling and validation
- Shopping cart implementation
- Checkout flow with Authorize.net
- Order management system
- Inventory tracking

### Authorize.net Implementation
```typescript
// Accept.js initialization
const initializeAcceptJs = () => {
  const acceptInstance = new Accept({
    environment: process.env.NEXT_PUBLIC_AUTHORIZENET_ENVIRONMENT,
    clientKey: process.env.NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY,
    apiLoginId: process.env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID
  });
  return acceptInstance;
};

// Payment handling
const handlePayment = async (cardData: CardData) => {
  const acceptInstance = initializeAcceptJs();
  const paymentNonce = await acceptInstance.dispatchData({
    cardNumber: cardData.number,
    month: cardData.expMonth,
    year: cardData.expYear,
    cardCode: cardData.cvv
  });

  // Process payment on server
  const response = await fetch('/api/process-payment', {
    method: 'POST',
    body: JSON.stringify({
      paymentNonce,
      amount: cartTotal,
      orderId: generatedOrderId
    })
  });

  return response.json();
};
```

### Phase 4: Launch
- Comprehensive testing
- Performance optimization
- SSL configuration
- Content finalization
- Analytics setup

## Environment Variables
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authorize.net
NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID=
NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY=
AUTHORIZENET_TRANSACTION_KEY=
AUTHORIZENET_ENVIRONMENT=sandbox|production

# Database
DATABASE_URL=

# Email (Optional)
EMAIL_FROM=
EMAIL_PROVIDER_API_KEY=
```

## Success Metrics
1. Special edition sales through Stripe
2. Newsletter signups
3. Blog engagement
4. Website traffic
5. Order completion rate