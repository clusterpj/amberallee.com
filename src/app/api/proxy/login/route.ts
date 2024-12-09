import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Log the incoming request for debugging
  console.log('Proxy Login Request Headers:', Object.fromEntries(request.headers));
  
  try {
    const body = await request.json();
    console.log('Request Body:', body);

    const authHeader = request.headers.get('authorization')

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }

    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    const response = await fetch('http://localhost/v1/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    // Log the response status and headers
    console.log('Backend Response Status:', response.status);
    console.log('Backend Response Headers:', Object.fromEntries(response.headers));

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    // Create response with the token
    const nextResponse = NextResponse.json(data)

    // Set the cookie in the response
    nextResponse.cookies.set('corebill_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    // Add CORS headers
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    nextResponse.headers.set('Access-Control-Allow-Credentials', 'true')
    nextResponse.headers.set('Vary', 'Origin')

    return nextResponse
  } catch (error) {
    console.error('Proxy Login Error:', error);

    return NextResponse.json(
      { 
        error: 'Authentication failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Vary': 'Origin'
        }
      }
    )
  }
}

// Comprehensive OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Vary': 'Origin'
    }
  });
}
