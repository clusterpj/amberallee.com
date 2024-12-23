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
      amazonLink: body.amazonLink,
      coverImage: body.coverImage,
      releaseDate: new Date(body.releaseDate),
      series: body.series,
      seriesOrder: body.seriesOrder,
      tropes: body.tropes,
      isPublished: body.isPublished,
      createdAt: new Date(),
      updatedAt: new Date(),
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
