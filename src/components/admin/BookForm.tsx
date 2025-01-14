'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'

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
  series_order: number
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
      series_order: book.series_order || 0,
      teasers: book.teasers || [],
      tropes: book.tropes || [],
      amazon_link: book.amazon_link || '',
      is_published: book.is_published || false,
      price: book.price ? book.price / 100 : 0.00 // Convert cents to dollars
    } : {
      title: '',
      description: '',
      cover_image_url: '',
      published_date: new Date().toISOString().split('T')[0],
      price: 0.00,
      categories: [],
      purchase_now_button: '',
      series: '',
      book_number: 0,
      series_order: 0,
      teasers: [],
      tropes: [],
      amazon_link: '',
      is_published: false
    }
  )
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState(book?.cover_image_url || '')
  const [uploadError, setUploadError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title.trim()) {
      setUploadError('Title is required')
      return
    }
    if (!formData.description.trim()) {
      setUploadError('Description is required') 
      return
    }
    if (!formData.published_date) {
      setUploadError('Published date is required')
      return
    }
    if (isNaN(formData.price) || formData.price < 0) {
      setUploadError('Price must be a positive number')
      return
    }
    
    // Ensure price is a valid number and not too large
    if (formData.price > 1000000) {
      setUploadError('Price must be less than $1,000,000')
      return
    }

    try {
      const supabase = createClient()
      
      // Prepare data according to Supabase schema
      const requestData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        cover_image_url: formData.cover_image_url,
        amazon_link: formData.amazon_link,
        published_date: formData.published_date,
        price: Math.round(formData.price * 100), // Convert dollars to cents
        series: formData.series,
        series_order: formData.series_order,
        tropes: formData.tropes,
        teasers: formData.teasers,
        is_published: formData.is_published,
        categories: formData.categories,
        purchase_now_button: formData.purchase_now_button
      }

      let error = null
      let data = null
      
      if (book?.id) {
        // Update existing book
        const { error: updateError, data: updateData } = await supabase
          .from('books')
          .update(requestData)
          .eq('id', book.id)
          .select()
          .single()
          
        error = updateError
        data = updateData
      } else {
        // Create new book
        const { error: insertError, data: insertData } = await supabase
          .from('books')
          .insert(requestData)
          .select()
          .single()
          
        error = insertError
        data = insertData
      }

      if (error) throw error
      
      onSuccess()
      return data

      onSuccess()
      return data
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
    
    // Clear any previous errors when user starts typing
    if (uploadError) setUploadError('')
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? 
        Math.max(0, parseFloat(value)) : // Parse as float for decimal values
        name === 'series_order' ?
        Number(value) : // Convert series_order to number
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

                  const supabase = createClient()
                  const { error: uploadError } = await supabase.storage
                    .from('book-covers')
                    .upload(`amber-images/${filePath}`, file, {
                      cacheControl: '3600',
                      upsert: false
                    })

                  if (uploadError) throw uploadError

                  // Get public URL
                  const { data: urlData } = await supabase
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
                <Image
                  src={imagePreview}
                  alt="Cover preview"
                  width={192}
                  height={288}
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
            step="0.01"
            value={formData.price === 0 ? '' : formData.price.toString()}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              setFormData(prev => ({
                ...prev,
                price: isNaN(value) ? 0 : value
              }))
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="series_order">Series Order</Label>
          <Input
            id="series_order"
            name="series_order"
            type="number"
            value={formData.series_order}
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
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          {formData.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full text-sm">
              {category}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    categories: prev.categories.filter((_, i) => i !== index)
                  }))
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-1 min-w-[100px] bg-transparent outline-none px-2"
            placeholder="Add category..."
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement
              const value = target?.value?.trim()
              if (e.key === 'Enter' && value) {
                e.preventDefault()
                setFormData(prev => ({
                  ...prev,
                  categories: [...prev.categories, value]
                }))
                if (target) {
                  target.value = ''
                }
              }
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tropes</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          {formData.tropes.map((trope, index) => (
            <div key={index} className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full text-sm">
              {trope}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    tropes: prev.tropes.filter((_, i) => i !== index)
                  }))
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-1 min-w-[100px] bg-transparent outline-none px-2"
            placeholder="Add trope..."
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement
              const value = target?.value?.trim()
              if (e.key === 'Enter' && value) {
                e.preventDefault()
                setFormData(prev => ({
                  ...prev,
                  tropes: [...prev.tropes, value]
                }))
                if (target) {
                  target.value = ''
                }
              }
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Teasers</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          {formData.teasers.map((teaser, index) => (
            <div key={index} className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full text-sm">
              {teaser}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    teasers: prev.teasers.filter((_, i) => i !== index)
                  }))
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-1 min-w-[100px] bg-transparent outline-none px-2"
            placeholder="Add teaser..."
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement
              const value = target?.value?.trim()
              if (e.key === 'Enter' && value) {
                e.preventDefault()
                setFormData(prev => ({
                  ...prev,
                  teasers: [...prev.teasers, value]
                }))
                if (target) {
                  target.value = ''
                }
              }
            }}
          />
        </div>
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
