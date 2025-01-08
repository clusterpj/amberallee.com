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
        // First check localStorage for existing session
        const storedSession = localStorage.getItem('supabase.auth.token')
        if (storedSession) {
          const { currentSession } = JSON.parse(storedSession)
          if (currentSession && new Date(currentSession.expires_at * 1000) > new Date()) {
            // Restore session from localStorage
            await supabase.auth.setSession(currentSession)
          } else {
            // Clear expired session
            localStorage.removeItem('supabase.auth.token')
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
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (authError) throw authError

      if (authData.user) {
        const role = await ensureUserRecord(authData.user)
        const customUser: CustomUser = {
          ...authData.user,
          role
        }
        setUser(customUser)
        
        // Use window.location for initial redirect to avoid RSC issues
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/dashboard'
        } else {
          router.replace('/admin/dashboard')
        }
      }

      return authData
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    signOut,
    signIn,
  }
}
