import { NextRequest, NextResponse } from 'next/server'
import { apiConfig } from '@/config/corebill'

// CoreBill authentication check
export async function checkCoreBillAuth(token: string) {
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

    const userData = await response.json()
    return userData.role === 'admin'
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
import { apiConfig } from '@/config/corebill'

interface AuthResponse {
  success: boolean
  user?: {
    id: string
    role: 'admin' | 'user'
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
