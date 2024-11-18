import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkCoreBillAuth } from './lib/auth'

export async function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('corebill_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const isAdmin = await checkCoreBillAuth(token)
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
