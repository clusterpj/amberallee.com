'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

interface BookFormData {
  id?: string
  title: string
  description: string
  cover_image_url: string
  published_date: string
  price: number
}

interface BookFormProps {
  book?: BookFormData
  onSuccess: () => void
}

export default function BookForm({ book, onSuccess }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(
    book ? { ...book } : {
      title: '',
      description: '',
      cover_image_url: '',
      published_date: new Date().toISOString().split('T')[0],
      price: 0
    }
  )
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState(book?.cover_image_url || '')
  const [uploadError, setUploadError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let error
      if (book) {
        // Update existing book
        const { error: updateError } = await supabase
          .from('books')
          .update(formData)
          .eq('id', book.id)
        error = updateError
      } else {
        // Create new book
        const { error: insertError } = await supabase
          .from('books')
          .insert([formData])
        error = insertError
      }

      if (error) throw error
      onSuccess()
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error saving book:', error.message);
      } else {
        console.error('Error saving book:', error);
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Cover Image</Label>
            <Input
              id="cover_image_file"
              name="cover_image_file"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                  setUploadError('File size must be less than 5MB')
                  return
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                  setUploadError('Only image files are allowed')
                  return
                }

                try {
                  setUploadError('')
                  setUploading(true)
                  setUploadProgress(0)
                  
                  // Generate unique filename
                  const fileExt = file.name.split('.').pop()
                  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
                  const filePath = `book-covers/${fileName}`

                  // Upload to Supabase storage
                  const { error } = await supabase.storage
                    .from('book-covers')
                    .upload(filePath, file, {
                      cacheControl: '3600',
                      upsert: false,
                      onProgress: (progress) => {
                        setUploadProgress((progress.loaded / progress.total) * 100)
                      }
                    })

                  if (error) throw error

                  // Get public URL
                  const { data: urlData } = supabase
                    .storage
                    .from('book-covers')
                    .getPublicUrl(filePath)

                  setFormData(prev => ({
                    ...prev,
                    cover_image_url: urlData.publicUrl
                  }))
                  setImagePreview(urlData.publicUrl)
                } catch (error) {
                  console.error('Error uploading image:', error)
                  setUploadError('Failed to upload image. Please try again.')
                } finally {
                  setUploading(false)
                }
              }}
            />
            {uploadError && (
              <p className="text-sm text-red-600">{uploadError}</p>
            )}
            {uploading && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>

        {imagePreview && (
          <div className="mt-4 space-y-2">
            <Label>Preview</Label>
            <div className="relative">
              <div className="border rounded-lg overflow-hidden w-48">
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="w-full h-auto object-cover"
                  onError={() => setImagePreview('')}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, cover_image_url: '' }))
                  setImagePreview('')
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                title="Remove cover image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="published_date">Published Date</Label>
        <Input
          id="published_date"
          name="published_date"
          type="date"
          value={formData.published_date}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit">Save Book</Button>
    </form>
  )
}
