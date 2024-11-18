import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // TODO: Replace with actual authentication logic
    // This is a placeholder - you'll want to integrate with your actual auth system
    if (email === 'admin@example.com' && password === 'password') {
      return NextResponse.json({ 
        success: true, 
        token: 'mock-jwt-token',
        user: {
          id: '1',
          role: 'admin'
        }
      }, { status: 200 })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
