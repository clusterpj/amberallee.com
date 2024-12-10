import { NextRequest, NextResponse } from 'next/server'
import { apiConfig } from '@/config/corebill'
import { supabase } from './supabase'
import { UserRole } from '@/types/auth'

interface AuthResponse {
  success: boolean
  user?: {
    id: string
    role: UserRole
  }
}

export async function checkCoreBillAuth(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.auth.me}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return false
    }

    const data: AuthResponse = await response.json()
    return data.success && data.user?.role === 'admin'
  } catch (error) {
    console.error('Authentication check failed:', error)
    return false
  }
}

// Server-side authentication helper
export async function requireAdminAuth(request: NextRequest) {
  const token = request.cookies.get('corebill_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const isAdmin = await checkCoreBillAuth(token)
  
  if (!isAdmin) {
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

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${apiConfig.endpoints.auth.login}`, {
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
  }

  return authData
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function checkUserRole(userId: string): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) throw new Error('Failed to fetch user role')

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (userError) throw new Error('Failed to fetch user role')
  return userData?.role || 'customer'
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
