import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { requireAdminAuth } from '@/lib/auth'
import { sql } from 'drizzle-orm'

type BookInput = {
  title: string
  description?: string
  amazonLink?: string
  coverImage?: string
  publishedDate?: string
  price?: number
  series?: string
  tropes?: string[]
  isPublished?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const authResponse = await requireAdminAuth(request)
    if (authResponse) {
      return authResponse
    }

    const body = await request.json() as BookInput
    
    const now = new Date().toISOString()
    
    const insertedBook = await db
      .insert(books)
      .values({
        title: sql`${body.title}`,
        description: body.description ? sql`${body.description}` : null,
        amazon_link: body.amazonLink ? sql`${body.amazonLink}` : null,
        cover_image_url: body.coverImage ? sql`${body.coverImage}` : null,
        published_date: body.publishedDate ? sql`${new Date(body.publishedDate).toISOString()}` : null,
        price: body.price || null,
        series: body.series ? sql`${body.series}` : null,
        tropes: body.tropes || null,
        created_at: sql`${now}`,
        updated_at: sql`${now}`,
      })
      .returning()

    return NextResponse.json(insertedBook[0])
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
  }
}
