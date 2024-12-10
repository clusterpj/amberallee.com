'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error confirming email:', error)
        router.push('/auth/signin?error=Unable to confirm email')
        return
      }

      // Successfully confirmed email
      router.push('/dashboard')
    }

    handleEmailConfirmation()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p className="text-muted-foreground">Please wait while we confirm your email address.</p>
      </div>
    </div>
  )
}
