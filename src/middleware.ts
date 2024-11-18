import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkCoreBillAuth, validateSession } from './lib/auth'

export async function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('corebill_token')?.value
    const sessionToken = request.cookies.get('session_token')?.value

    // Check for token presence
    if (!token || !sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Validate session
    const isValidSession = await validateSession(sessionToken)
    if (!isValidSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check admin authorization
    const isAdmin = await checkCoreBillAuth(token)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
