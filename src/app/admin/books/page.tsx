'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import BookForm from '@/components/admin/BookForm'
import { createClient } from '@/lib/supabase/server'

interface Book {
  id: string
  title: string
  description: string
  cover_image_url: string
  published_date: string
  price: number
  series: string
  book_number: number
  tropes: string[]
  teasers: string[]
  amazon_link: string
  is_published: boolean
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error) {
      setError('Error fetching books')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSuccess = () => {
    setShowAddForm(false)
    fetchBooks()
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
  }

  const handleEditSuccess = () => {
    setEditingBook(null)
    fetchBooks()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-8 pt-24">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
          <p className="text-gray-600">Manage your books collection</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
          </CardHeader>
          <CardContent>
            <BookForm onSuccess={handleAddSuccess} />
          </CardContent>
        </Card>
      )}

      {editingBook && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Book</CardTitle>
          </CardHeader>
          <CardContent>
            <BookForm book={editingBook} onSuccess={handleEditSuccess} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.id} className="group relative">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-row items-start gap-4 p-4">
                {book.cover_image_url && (
                  <div className="w-24 h-36 shrink-0 relative rounded-md overflow-hidden">
                    <Image
                      src={book.cover_image_url}
                      alt={book.title}
                      width={96}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Published: {new Date(book.published_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: ${(book.price / 100).toFixed(2)}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEdit(book)}
                >
                  Edit Book
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
