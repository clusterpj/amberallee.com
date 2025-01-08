import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db/types'

export function createClient() {
  const cookieStore = cookies()
  
  // Extract project reference from Supabase URL
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!
    .split('//')[1]
    .split('.')[0]

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component
            // This can be safely ignored in middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `remove` method was called from a Server Component
            // This can be safely ignored in middleware
          }
        },
      },
      auth: {
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
        storageKey: `sb-${projectRef}-auth-token`,
      }
    }
  )
}
