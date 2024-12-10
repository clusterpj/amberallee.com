import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkCoreBillAuth, validateSession } from './lib/auth'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/login']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('corebill_token')?.value
    const sessionToken = request.cookies.get('session_token')?.value

    // Detailed logging for authentication attempts
    console.log(`Admin access attempt: ${request.nextUrl.pathname}`)
    console.log(`Token present: ${!!token}, Session Token present: ${!!sessionToken}`)

    try {
      // First try Supabase authentication
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (userData?.role === 'admin') {
          return NextResponse.next()
        }
      }

      // Fallback to CoreBill authentication if Supabase auth fails
      if (token && sessionToken) {
        const isValidSession = await validateSession(sessionToken)
        if (isValidSession) {
          const isAdmin = await checkCoreBillAuth(token)
          if (isAdmin) {
            return NextResponse.next()
          }
        }
      }

      // If both authentication methods fail, redirect to login
      console.warn('Authentication failed for admin route')
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    } catch (error) {
      console.error('Middleware authentication error:', error)
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // For non-admin protected routes, check Supabase authentication
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/:path*'
  ]
}
