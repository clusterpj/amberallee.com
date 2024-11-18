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
