'use client'

import { createBrowserClient } from '@supabase/ssr'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
