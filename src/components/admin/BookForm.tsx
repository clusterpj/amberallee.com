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
  amazon_link: string
  cover_image: string
  release_date: string
  series?: string
  series_order?: number
  tropes: string[]
  is_published: boolean
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
      amazon_link: '',
      cover_image: '',
      release_date: '',
      series: '',
      series_order: undefined,
      tropes: [],
      is_published: false
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
        <Label htmlFor="amazon_link">Amazon Link</Label>
        <Input
          id="amazon_link"
          name="amazon_link"
          value={formData.amazon_link}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_image">Cover Image URL</Label>
        <Input
          id="cover_image"
          name="cover_image"
          value={formData.cover_image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="release_date">Release Date</Label>
        <Input
          id="release_date"
          name="release_date"
          type="date"
          value={formData.release_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="series">Series (Optional)</Label>
        <Input
          id="series"
          name="series"
          value={formData.series}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="series_order">Series Order (Optional)</Label>
        <Input
          id="series_order"
          name="series_order"
          type="number"
          value={formData.series_order || ''}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tropes">Tropes (comma-separated)</Label>
        <Input
          id="tropes"
          name="tropes"
          value={formData.tropes.join(', ')}
          onChange={(e) => handleTropesChange(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          checked={formData.is_published}
          onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <Button type="submit">Save Book</Button>
    </form>
  )
}
