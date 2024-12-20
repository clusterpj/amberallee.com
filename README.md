# Amber Lee Website

## Project Overview

This is a Next.js application for Amber Lee's website, built with TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: Zustand
- Backend: Supabase
- Authentication: Custom implementation with Supabase

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication-related pages
│   │   ├── admin/           # Admin section
│   │   ├── api/             # API routes
│   │   └── ...other pages
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── auth/            # Authentication components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Reusable UI components
│   ├── config/              # Configuration files
│   ├── context/             # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and services
│   │   ├── corebill/        # CoreBill-specific utilities
│   │   ├── db/              # Database utilities
│   │   └── supabase/        # Supabase-related utilities
│   ├── styles/              # Global styles
│   └── types/               # TypeScript type definitions
├── supabase/                # Supabase configurations
│   └── migrations/          # Database migration scripts
```

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file
   - Add Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Type Checking and Linting

Before committing, run:
```bash
npx tsc --noEmit
npm run lint
```

## Deployment

The project is configured for easy deployment on Vercel or similar platforms supporting Next.js.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run type checking and linting
4. Submit a pull request

## License

[Add your license information]
