// src/providers/SupabaseProvider.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export function SupabaseProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return <>{children}</>
}
