import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkCoreBillAuth, validateSession } from './lib/auth'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/login', '/']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Create a Supabase client for this request
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        autoRefreshToken: false,
        storage: undefined
      }
    }
  )

  // Get the session from the request cookie
  const supabaseAccessToken = request.cookies.get('sb-access-token')?.value
  const supabaseRefreshToken = request.cookies.get('sb-refresh-token')?.value

  if (!supabaseAccessToken) {
    console.log('No Supabase access token found, redirecting to signin')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  try {
    // Set the auth tokens
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: supabaseAccessToken,
      refresh_token: supabaseRefreshToken || ''
    })

    if (error || !session) {
      console.error('Session error:', error)
      const response = NextResponse.redirect(new URL('/auth/signin', request.url))
      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')
      return response
    }

    // Check if the path starts with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const token = request.cookies.get('corebill_token')?.value
      const sessionToken = request.cookies.get('session_token')?.value

      try {
        // Check if user has admin role
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (userData?.role === 'admin') {
          return NextResponse.next()
        }

        // Fallback to CoreBill authentication
        if (token && sessionToken) {
          const isValidSession = await validateSession(sessionToken)
          if (isValidSession) {
            const isAdmin = await checkCoreBillAuth(token)
            if (isAdmin) {
              return NextResponse.next()
            }
          }
        }

        console.warn('Not authorized for admin route')
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      } catch (error) {
        console.error('Admin auth error:', error)
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }
    }

    // User is authenticated, allow access to protected routes
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    const response = NextResponse.redirect(new URL('/auth/signin', request.url))
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')
    return response
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/:path*'
  ]
}
