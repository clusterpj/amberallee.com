import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies()
  
  // Set headers to ensure JSON response
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, max-age=0'
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore.get(name))?.value
        },
        async set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        async remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      return new Response(JSON.stringify({ 
        error: 'Not authenticated',
        redirect: '/auth/signin'
      }), { 
        status: 401,
        headers
      })
    }

    return new Response(JSON.stringify({ session }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (error) {
    console.error('Session error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  }
}
