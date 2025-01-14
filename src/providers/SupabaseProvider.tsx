// src/providers/SupabaseProvider.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export default function SupabaseProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return <>{children}</>
}
