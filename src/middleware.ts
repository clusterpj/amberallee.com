import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )
  
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/login', '/', '/books']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return res
  }

  try {
    // Validate session with server
    const sessionResponse = await fetch(new URL('/api/auth/session', request.url), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
    
    if (!sessionResponse.ok) {
      // Clear auth cookies and redirect to login
      const response = NextResponse.redirect(new URL('/auth/signin', request.url))
      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')
      response.cookies.delete('sb-bdififwytjactxqekism-auth-token.3')
      return response
    }

    const contentType = sessionResponse.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response')
    }

    const { session } = await sessionResponse.json()
    
    if (!session || !session.user) {
      // Store the attempted URL to redirect back after login
      const redirectUrl = new URL('/auth/signin', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // For admin routes, check role
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (roleError || userData?.role !== 'admin') {
        console.warn('Unauthorized access attempt to admin route')
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    // Update response with new tokens if they were refreshed
    return res

  } catch (error) {
    console.error('Middleware error:', error)
    
    // Clear auth cookies and redirect to login
    const response = NextResponse.redirect(new URL('/auth/signin', request.url))
    
    // Clear cookies directly
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')
    response.cookies.delete('sb-bdififwytjactxqekism-auth-token.3')
    
    return response
  }
}

// Update matcher to be more specific and include all routes that need protection
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth/signin|auth/signup|login).*)',
  ]
}
