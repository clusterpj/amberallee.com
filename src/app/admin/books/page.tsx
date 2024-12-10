'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BookForm from '@/components/admin/BookForm'
import { supabase } from '@/lib/supabase'

interface Book {
  id: string
  title: string
  description: string
  amazon_link: string
  published_date: string
  cover_image_url: string
  created_at: string
  updated_at: string
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setBooks(books.filter(book => book.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
          <p className="text-gray-600 mt-1">Manage your book catalog</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${showAddForm ? 'bg-gray-500' : 'bg-blue-600'} hover:bg-opacity-90 transition-colors`}
        >
          {showAddForm ? '✕ Cancel' : '📚 Add New Book'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showAddForm && (
        <BookForm
          onSuccess={() => {
            fetchBooks()
            setShowAddForm(false)
          }}
        />
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <BookForm
                book={{
                  ...editingBook,
                  amazonLink: editingBook.amazon_link,
                  publishedDate: editingBook.published_date,
                  coverImage: editingBook.cover_image_url,
                  isPublished: editingBook.is_published
                }}
                onSuccess={() => {
                  fetchBooks()
                  setEditingBook(null)
                }}
              />
              <Button
                variant="outline"
                onClick={() => setEditingBook(null)}
                className="mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">
                {book.title}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Published: {new Date(book.published_date).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingBook(book)}
                    className="flex items-center gap-1 hover:bg-blue-50"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(book.id)}
                    className="flex items-center gap-1"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
