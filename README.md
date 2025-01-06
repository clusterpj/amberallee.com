# AmberAllee.com

Official website for romance author Amber Allee, featuring her book catalog, blog, and special edition store.

## Overview

AmberAllee.com is a Next.js-powered author platform that combines elegant design with modern e-commerce capabilities. The site features pink leopard print patterns, vintage typewriter motifs, and art deco elements that reflect Amber's brand identity.

## Features

- 📚 Book catalog with series grouping and trope tags
- 🛍️ Special editions store with Stripe payments
- 📝 Author blog with rich content management
- 📅 Events calendar and announcements
- 📧 Newsletter integration
- 🔐 Secure admin dashboard
- 🔄 Real-time updates with Supabase

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** TailwindCSS, shadcn/ui components
- **Backend:** Supabase (Database, Authentication, Storage)
- **Payments:** Stripe integration
- **Infrastructure:** Digital Ocean, Ubuntu, Nginx

## Prerequisites

- Node.js v20 LTS
- Git
- Ubuntu/Linux environment (recommended)
- Supabase account
- Stripe account

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/clusterpj/amberallee.com.git
   cd amberallee.com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up Supabase:**
   - Create a new Supabase project
   - Run the database migrations in your Supabase project
   - Configure authentication settings
   - Set up storage buckets for media files

5. **Start the development server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
amberallee.com/
├── src/
│   ├── app/          # Next.js 14 App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and configurations
│   │   ├── supabase/ # Supabase client and helpers
│   │   └── stripe/   # Stripe integration
│   ├── actions/      # Server actions
│   └── types/       # TypeScript types
├── public/          # Static assets
├── supabase/       # Supabase configurations and types
└── docker/         # Deployment configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run generate:types` - Generate Supabase types

## Development Phases

1. **Core Layout & Authentication** (Current)
   - Base layout components
   - Supabase authentication
   - Protected routes

2. **Public Pages**
   - Homepage with featured books
   - Books catalog
   - Author information

3. **Admin Dashboard**
   - Content management
   - Statistics overview
   - Quick actions

4. **E-commerce Integration**
   - Stripe payment setup
   - Shopping cart
   - Order management

5. **Blog & Community**
   - Blog implementation
   - Newsletter integration
   - Events calendar

6. **Testing & Launch**
   - Performance optimization
   - SEO implementation
   - Production deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

Project Link: [https://github.com/clusterpj/amberallee.com](https://github.com/clusterpj/amberallee.com)