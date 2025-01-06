'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

interface BookFormData {
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
    book || {
      title: '',
      description: '',
      cover_image_url: '',
      published_date: new Date().toISOString().split('T')[0],
      price: 0
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('books')
        .insert([formData])

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTropesChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tropes: value.split(',').map(trope => trope.trim())
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

      <div className="space-y-2">
        <Label htmlFor="cover_image_url">Cover Image URL</Label>
        <Input
          id="cover_image_url"
          name="cover_image_url"
          value={formData.cover_image_url}
          onChange={handleChange}
          required
        />
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
