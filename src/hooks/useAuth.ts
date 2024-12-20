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
    let timeoutId: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        // Set a maximum timeout for the loading state
        timeoutId = setTimeout(() => {
          if (mounted) {
            setLoading(false)
          }
        }, 3000) // 3 second maximum loading time

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
        if (mounted) {
          setLoading(false)
          clearTimeout(timeoutId)
        }
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      
      if (session?.user && mounted) {
        const role = await ensureUserRecord(session.user)
        const customUser: CustomUser = {
          ...session.user,
          role
        }
        setUser(customUser)
        
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        }
      } else if (mounted) {
        setUser(null)
        
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
      clearTimeout(timeoutId)
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
