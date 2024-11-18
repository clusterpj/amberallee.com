import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Log the incoming request for debugging
  console.log('Proxy Login Request Headers:', Object.fromEntries(request.headers));
  
  try {
    const body = await request.json();
    console.log('Request Body:', body);

    const response = await fetch('http://localhost/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if present
        ...(request.headers.get('authorization') ? 
          { 'Authorization': request.headers.get('authorization') } : 
          {}
        )
      },
      body: JSON.stringify(body)
    });

    // Log the response status
    console.log('Backend Response Status:', response.status);

    const data = await response.json();
    console.log('Backend Response Data:', data);

    // Comprehensive CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Be more specific in production
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Vary': 'Origin'
    };

    // Create response with CORS headers
    const nextResponse = NextResponse.json(data, { 
      status: response.status,
      headers: corsHeaders 
    });

    return nextResponse;
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
