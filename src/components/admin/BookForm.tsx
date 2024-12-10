'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

interface BookFormProps {
  book?: {
    id?: string
    title: string
    description: string
    amazonLink: string
    publishedDate: string
    coverImage: string
    isPublished?: boolean
  }
  onSuccess?: () => void
}

export default function BookForm({ book, onSuccess }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    description: book?.description || '',
    amazonLink: book?.amazon_link || '',
    publishedDate: book?.published_date || '',
    coverImage: book?.cover_image_url || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const bookData = {
        title: formData.title,
        description: formData.description,
        amazon_link: formData.amazonLink,
        published_date: formData.publishedDate,
        cover_image_url: formData.coverImage,
        updated_at: new Date().toISOString()
      }

      if (book?.id) {
        // Update existing book
        const { error } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', book.id)

        if (error) throw error
      } else {
        // Create new book
        const { error } = await supabase
          .from('books')
          .insert([{ ...bookData, created_at: new Date().toISOString() }])

        if (error) throw error
      }

      if (onSuccess) onSuccess()
      
      if (!book?.id) {
        // Reset form after successful creation
        setFormData({
          title: '',
          description: '',
          amazonLink: '',
          publishedDate: '',
          coverImage: '',
          isPublished: false
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book?.id ? 'Edit Book' : 'Add New Book'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Amazon Link</label>
              <input
                type="url"
                value={formData.amazonLink}
                onChange={(e) => setFormData(prev => ({ ...prev, amazonLink: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Published Date</label>
              <input
                type="date"
                value={formData.publishedDate}
                onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : (book?.id ? 'Update Book' : 'Add Book')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
