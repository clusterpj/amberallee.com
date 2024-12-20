import { NextRequest, NextResponse } from 'next/server'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  })
}

export async function POST(request: NextRequest) {
  try {
    // Handle preflight and CORS
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders
      })
    }

    const { email, password } = await request.json()

    // TODO: Replace with actual authentication logic
    // This is a placeholder - you'll want to integrate with your actual auth system
    if (email === 'admin@example.com' && password === 'password') {
      return NextResponse.json({ 
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: '1',
          role: 'admin',
          email: email
        }
      }, { 
        status: 200,
        headers: corsHeaders
      })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { 
      status: 401,
      headers: corsHeaders 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { 
      status: 500,
      headers: corsHeaders 
    })
  }
}
