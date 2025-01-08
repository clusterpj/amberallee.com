import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { UserRole } from '@/types/auth'

import { supabase } from './supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not set')
}

export async function checkUserRole(userId: string): Promise<UserRole> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error checking user role:', error)
      return 'customer'
    }

    return (data?.role as UserRole) || 'customer'
  } catch (error) {
    console.error('Error checking user role:', error)
    return 'customer'
  }
}

// Server-side authentication helper
export async function requireAdminAuth(request: NextRequest) {
  const supabaseAuthClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  )

  const { data: { session }, error } = await supabaseAuthClient.auth.getSession()

  if (error || !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const role = await checkUserRole(session.user.id)
  
  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return null
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  if (!sessionToken) {
    console.warn('No session token provided')
    return false
  }

  try {
    // Use PostgreSQL to validate session
    const response = await fetch('/api/sessions/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        token: sessionToken,
        checkExpiration: true 
      })
    })

    if (!response.ok) {
      throw new Error('Session validation request failed')
    }

    const result = await response.json()
    
    if (!result.valid) {
      console.warn('Invalid session:', result.reason)
    }

    return result.valid
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

// Enhanced error handling for authentication
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

interface AuthResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    email: string
    role: string
  }
  error?: string
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Login error:', error)
    return { success: false }
  }
}

async function createUserRecord(userId: string, email: string, role: string = 'customer') {
  try {
    const { error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email: email,
          role: role
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating user record:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in createUserRecord:', error)
    // Don't throw here, allow auth to continue
  }
}

export async function signUp(email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (authError) {
    throw authError
  }

  if (authData?.user) {
    await createUserRecord(authData.user.id, email)
  }

  return authData
}

export async function signIn(email: string, password: string) {
  // Sign in with Supabase
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (authError) {
    throw authError
  }

  if (authData?.user) {
    // Check if user exists in our custom table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    // If user doesn't exist in our custom table, create it
    if (!userData && !userError) {
      await createUserRecord(authData.user.id, authData.user.email!)
    }

    // Store session tokens in cookies with proper SameSite attribute
    if (authData.session) {
      const cookieOptions = `path=/; max-age=${60 * 60}; SameSite=Lax; Secure`
      document.cookie = `sb-access-token=${authData.session.access_token}; ${cookieOptions}`
      document.cookie = `sb-refresh-token=${authData.session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; ${cookieOptions}`
        
      // Also store session in localStorage for immediate client-side access
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: authData.session,
        expiresAt: authData.session.expires_at
      }))
    }
  }

  return authData
}

export async function signOut() {
  // Clear session cookies with SameSite attribute
  const clearOptions = 'path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure'
  document.cookie = `sb-access-token=; ${clearOptions}`
  document.cookie = `sb-refresh-token=; ${clearOptions}`
  
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}


export async function requireAuth(request: NextRequest) {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  return null
}

export async function requireAdminAuthSupabase(request: NextRequest) {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  const role = await checkUserRole(session.user.id)
  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  return null
}
