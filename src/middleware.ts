import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkCoreBillAuth, validateSession } from './lib/auth'

export async function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('corebill_token')?.value
    const sessionToken = request.cookies.get('session_token')?.value

    // Detailed logging for authentication attempts
    console.log(`Admin access attempt: ${request.nextUrl.pathname}`)
    console.log(`Token present: ${!!token}, Session Token present: ${!!sessionToken}`)

    // Check for token presence
    if (!token || !sessionToken) {
      console.warn('Missing authentication tokens')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Validate session with more robust error handling
      const isValidSession = await validateSession(sessionToken)
      if (!isValidSession) {
        console.warn('Invalid session')
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Check admin authorization
      const isAdmin = await checkCoreBillAuth(token)
      if (!isAdmin) {
        console.warn('Non-admin access attempt')
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    } catch (error) {
      console.error('Middleware authentication error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
