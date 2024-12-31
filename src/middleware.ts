import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/login', '/']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      }
    )

    // Get session from cookie
    const accessToken = request.cookies.get('sb-access-token')?.value
    const refreshToken = request.cookies.get('sb-refresh-token')?.value

    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || ''
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
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (userData?.role !== 'admin') {
        console.warn('Not authorized for admin route')
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
