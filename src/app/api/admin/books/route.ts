import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { requireAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authResponse = await requireAdminAuth(request)
    if (authResponse) {
      return authResponse
    }

    const body = await request.json()
    
    const newBook = await db.insert(books).values({
      title: body.title,
      description: body.description,
      amazon_link: body.amazonLink,
      cover_image: body.coverImage,
      release_date: new Date(body.releaseDate).toISOString(),
      series: body.series,
      series_order: body.seriesOrder,
      tropes: body.tropes,
      is_published: body.isPublished,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).returning()

    return NextResponse.json(newBook[0])
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
