'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function requireAdminAuth(request?: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (request) {
            return request.cookies.get(name)?.value
          }
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          if (request) {
            request.cookies.set({ name, value, ...options })
          } else {
            cookies().set({ name, value, ...options })
          }
        },
        remove(name: string, options: CookieOptions) {
          if (request) {
            request.cookies.set({ name, value: '', ...options })
          } else {
            cookies().set({ name, value: '', ...options })
          }
        }
      }
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  // Check if user is admin
  const { data: userData, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (roleError || userData?.role !== 'admin') {
    return NextResponse.json(
      { error: 'Not authorized' },
      { status: 403 }
    )
  }

  return null
}

interface CookieOptions {
  name: string
  value: string
  path?: string
  maxAge?: number
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
}
