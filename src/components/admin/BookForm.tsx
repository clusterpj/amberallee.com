'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'

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
  const [useFileUpload, setUseFileUpload] = useState(false)
  const [imagePreview, setImagePreview] = useState(book?.cover_image_url || '')

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
      [name]: value
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
        <div className="flex items-center space-x-2">
          <Switch
            id="upload-mode"
            checked={useFileUpload}
            onCheckedChange={setUseFileUpload}
          />
          <Label htmlFor="upload-mode">
            {useFileUpload ? 'Upload Image' : 'Use Image URL'}
          </Label>
        </div>

        {useFileUpload ? (
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
                if (file) {
                  try {
                    setUploading(true)
                    setUploadProgress(0)
                    
                    // Upload to Supabase storage
                    const fileExt = file.name.split('.').pop()
                    const fileName = `${Math.random()}.${fileExt}`
                    const filePath = `book-covers/${fileName}`

                    const { data, error } = await supabase.storage
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
                  } finally {
                    setUploading(false)
                  }
                }
              }}
            />
            {uploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="cover_image_url">Cover Image URL</Label>
            <Input
              id="cover_image_url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={(e) => {
                handleChange(e)
                setImagePreview(e.target.value)
              }}
              required
            />
          </div>
        )}

        {imagePreview && (
          <div className="mt-4">
            <Label>Preview</Label>
            <div className="mt-2 border rounded-lg overflow-hidden w-48">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="w-full h-auto object-cover"
                onError={() => setImagePreview('')}
              />
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
