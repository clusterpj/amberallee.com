'use client'

import { createClient } from '@/utils/supabase/client'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
