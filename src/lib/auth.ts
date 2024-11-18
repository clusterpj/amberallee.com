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
import { apiConfig } from '@/masterplan'

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
  try {
    // Implement session validation logic here
    // This could involve checking against a database or an auth service
    const response = await fetch('/api/validate-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: sessionToken })
    })

    const result = await response.json()
    return result.valid
  } catch (error) {
    console.error('Session validation failed:', error)
    return false
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.auth.login}`, {
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
