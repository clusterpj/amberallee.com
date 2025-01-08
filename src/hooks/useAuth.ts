'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export interface CustomUser extends User {
  role?: string
}

async function ensureUserRecord(user: User): Promise<string> {
  try {
    // Try to get existing user record
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error && error.code === 'PGRST116') {
      // User doesn't exist, create new record
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email,
            role: 'customer'
          }
        ])
        .select('role')
        .single()

      if (insertError) throw insertError
      return newUser?.role || 'customer'
    }

    if (error) throw error
    return userData?.role || 'customer'
  } catch (error) {
    console.error('Error in ensureUserRecord:', error)
    return 'customer'
  }
}

export function useAuth() {
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Check for existing session in cookies first
        const { data: { session: cookieSession } } = await supabase.auth.getSession()
        
        if (cookieSession) {
          // Validate session with server
          const validationResponse = await fetch('/api/auth/session')
          if (!validationResponse.ok) {
            throw new Error('Session validation failed')
          }
          
          const { session: validatedSession } = await validationResponse.json()
          if (validatedSession) {
            await supabase.auth.setSession(validatedSession)
          }
        }

        // Then check server session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user && mounted) {
          const role = await ensureUserRecord(session.user)
          const customUser: CustomUser = {
            ...session.user,
            role
          }
          setUser(customUser)
        } else if (mounted) {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error)
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      try {
        if (session?.user) {
          const role = await ensureUserRecord(session.user)
          const customUser: CustomUser = {
            ...session.user,
            role
          }
          setUser(customUser)
          
          // Redirect all signed-in users to /admin/dashboard
          if (event === 'SIGNED_IN') {
            // Use full page reload to avoid RSC issues
            window.location.href = '/admin/dashboard'
          }
        } else {
          setUser(null)
          
          if (event === 'SIGNED_OUT' && window.location.pathname !== '/') {
            router.replace('/')
          }
        }
      } catch (error) {
        console.error('Auth state change error:', error)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      // Clear all auth-related storage
      localStorage.removeItem('supabase.auth.token')
      document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure'
      document.cookie = 'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure'
      setUser(null)
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    signOut,
  }
}
