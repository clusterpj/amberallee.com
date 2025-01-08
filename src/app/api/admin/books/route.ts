import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { createServerClient } from '@supabase/ssr'
import { sql } from 'drizzle-orm'
import { requireAdminAuth } from '@/lib/auth'

type BookInput = {
  title: string
  description?: string
  amazon_link?: string
  cover_image_url?: string
  published_date?: string
  price?: number
  series?: string
  tropes?: string[]
  is_published?: boolean
  series_order?: number
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          }
        }
      }
    )
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Not authenticated' }, 
        { status: 401 }
      )
    }

    const body = await request.json() as BookInput
    
    const now = new Date().toISOString()
    
    const insertedBook = await db
      .insert(books)
      .values({
        title: sql`${body.title}`,
        description: body.description ? sql`${body.description}` : null,
        amazon_link: body.amazon_link ? sql`${body.amazon_link}` : null,
        cover_image_url: body.cover_image_url ? sql`${body.cover_image_url}` : null,
        published_date: body.published_date ? sql`${new Date(body.published_date).toISOString()}` : null,
        price: body.price || null,
        series: body.series ? sql`${body.series}` : null,
        tropes: body.tropes || null,
        created_at: sql`${now}`,
        updated_at: sql`${now}`,
        series_order: body.series_order || null,
        is_published: body.is_published || false
      })
      .returning()

    return NextResponse.json({
      success: true,
      data: insertedBook[0]
    })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResponse = await requireAdminAuth(request)
    if (authResponse) {
      return authResponse
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    const body = await request.json() as BookInput
    const now = new Date().toISOString()

    const updatedBook = await db
      .update(books)
      .set({
        title: sql`${body.title}`,
        description: body.description ? sql`${body.description}` : null,
        amazon_link: body.amazon_link ? sql`${body.amazon_link}` : null,
        cover_image_url: body.cover_image_url ? sql`${body.cover_image_url}` : null,
        published_date: body.published_date ? sql`${new Date(body.published_date).toISOString()}` : null,
        price: body.price || null,
        series: body.series ? sql`${body.series}` : null,
        tropes: body.tropes || null,
        updated_at: sql`${now}`,
        series_order: body.series_order || null,
        is_published: body.is_published || false
      })
      .where(sql`id = ${id}`)
      .returning()

    return NextResponse.json({
      success: true,
      data: updatedBook[0]
    })
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 })
  }
}
