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
          
          // Only redirect if we're not already on the dashboard
          if (event === 'SIGNED_IN' && window.location.pathname !== '/dashboard') {
            router.replace('/dashboard')
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
          window.location.href = '/dashboard'
        } else {
          router.replace('/dashboard')
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
