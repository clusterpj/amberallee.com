import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Create middleware client
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/login', '/', '/books']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return res
  }

  try {
    // Check session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      throw error
    }

    if (!session) {
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
    
    // Use proper cookie clearing through Supabase client
    const supabase = createMiddlewareClient({ req: request, res: response })
    await supabase.auth.signOut()
    
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