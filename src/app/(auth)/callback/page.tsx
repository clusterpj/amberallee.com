'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuthStateChange = async (event: string) => {
      if (event === 'SIGNED_IN') {
        // Check if this is an email confirmation
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email_confirmed_at) {
          router.push('/dashboard')
        } else {
          router.push('/')
        }
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      handleAuthStateChange(event)
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing sign in...</h1>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  )
}
