import { supabase } from "@/lib/supabase"
import type { Book, BookDB } from "@/types/book"

const mapDBToBook = (dbBook: BookDB): Book => ({
  id: dbBook.id,
  title: dbBook.title,
  description: dbBook.description,
  amazonLink: dbBook.amazon_link,
  publishedDate: dbBook.published_date,
  coverImage: dbBook.cover_image_url,
  price: dbBook.price,
  isPublished: dbBook.is_published ?? true, // Default to true if not set
  createdAt: dbBook.created_at,
  updatedAt: dbBook.updated_at
})

export async function getPublishedBooks() {
  const { data: dbBooks, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2) // Limit to 2 books for featured section

  if (error) {
    console.error('Error fetching books:', error)
    return []
  }

  return (dbBooks as BookDB[]).map(mapDBToBook)
}
