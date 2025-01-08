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
  categories: string[]
  purchase_now_button: string
  series: string
  book_number: number
  teasers: string[]
  tropes: string[]
  amazon_link: string
  is_published: boolean
}

interface BookFormProps {
  book?: BookFormData
  onSuccess: () => void
}

export default function BookForm({ book, onSuccess }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(
    book ? { 
      ...book,
      categories: book.categories || [],
      purchase_now_button: book.purchase_now_button || '',
      series: book.series || '',
      book_number: book.book_number || 0,
      teasers: book.teasers || [],
      tropes: book.tropes || [],
      amazon_link: book.amazon_link || '',
      is_published: book.is_published || false
    } : {
      title: '',
      description: '',
      cover_image_url: '',
      published_date: new Date().toISOString().split('T')[0],
      price: 0,
      categories: [],
      purchase_now_button: '',
      series: '',
      book_number: 0,
      teasers: [],
      tropes: [],
      amazon_link: '',
      is_published: false
    }
  )
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState(book?.cover_image_url || '')
  const [uploadError, setUploadError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = book ? `/api/admin/books?id=${book.id}` : '/api/admin/books'
      const method = book ? 'PUT' : 'POST'
      
      // Prepare data according to Supabase schema
      const requestData = {
        title: formData.title,
        description: formData.description,
        cover_image_url: formData.cover_image_url,
        amazon_link: formData.amazon_link,
        published_date: formData.published_date,
        price: Math.round(formData.price * 100), // Convert to cents and round
        series: formData.series,
        book_number: formData.book_number,
        tropes: formData.tropes,
        teasers: formData.teasers,
        is_published: formData.is_published,
        categories: formData.categories
      }

      console.log('Sending request to:', url)
      console.log('Request data:', requestData)
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
      
      console.log('Response status:', response.status)

      if (!response.ok) {
        let errorMessage = 'Failed to save book'
        try {
          const errorData = await response.text()
          errorMessage = errorData || errorMessage
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
        }
        throw new Error(errorMessage)
      }

      const responseText = await response.text()
      try {
        const result = JSON.parse(responseText)
        onSuccess()
        return result
      } catch (error) {
        console.error('Failed to parse response:', responseText)
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error saving book:', error.message)
        setUploadError(error.message)
      } else {
        console.error('Error saving book:', error)
        setUploadError('An unexpected error occurred')
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? 
        Math.max(0, Number((Number(value).toFixed(2)))) : // Ensure valid price format
        value
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
                  const filePath = `${fileName}`

                  // Upload to Supabase storage
                  const { error } = await supabase.storage
                    .from('book-covers')
                    .upload(`amber-images/${filePath}`, file, {
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
                    .getPublicUrl(`amber-images/${filePath}`)

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

      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="book_number">Book Number</Label>
          <Input
            id="book_number"
            name="book_number"
            type="number"
            value={formData.book_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="series">Series</Label>
        <Input
          id="series"
          name="series"
          value={formData.series}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categories">Categories (comma separated)</Label>
        <Input
          id="categories"
          name="categories"
          value={formData.categories.join(', ')}
          onChange={(e) => {
            const categories = e.target.value
              .split(',')
              .map(c => c.trim())
              .filter(c => c.length > 0)
            setFormData(prev => ({ ...prev, categories }))
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tropes">Tropes (comma separated)</Label>
        <Input
          id="tropes"
          name="tropes"
          value={formData.tropes.join(', ')}
          onChange={(e) => {
            const tropes = e.target.value
              .split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0)
            setFormData(prev => ({ ...prev, tropes }))
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teasers">Teasers (one per line)</Label>
        <Textarea
          id="teasers"
          name="teasers"
          value={formData.teasers.join('\n')}
          onChange={(e) => {
            const teasers = e.target.value.split('\n').filter(t => t.trim().length > 0)
            setFormData(prev => ({ ...prev, teasers }))
          }}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purchase_now_button">Purchase Button Link</Label>
          <Input
            id="purchase_now_button"
            name="purchase_now_button"
            value={formData.purchase_now_button}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amazon_link">Amazon Link</Label>
          <Input
            id="amazon_link"
            name="amazon_link"
            value={formData.amazon_link}
            onChange={handleChange}
            placeholder="https://www.amazon.com/..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            id="is_published"
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              is_published: e.target.checked
            }))}
            className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
          />
          <Label htmlFor="is_published">Published</Label>
        </div>
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
