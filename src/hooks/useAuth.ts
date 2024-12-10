'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export interface CustomUser extends User {
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user && mounted) {
          // Get user data from our custom table
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

          const customUser: CustomUser = {
            ...session.user,
            role: userData?.role || 'customer'
          }

          setUser(customUser)
        } else if (mounted) {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      
      if (session?.user && mounted) {
        // Get user data from our custom table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        const customUser: CustomUser = {
          ...session.user,
          role: userData?.role || 'customer'
        }

        setUser(customUser)
        
        // If signing in, redirect to dashboard
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        }
      } else if (mounted) {
        setUser(null)
        
        // If signing out, redirect to home
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
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

  return {
    user,
    loading,
    signOut,
  }
}
