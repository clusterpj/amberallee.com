'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface BookFormData {
  title: string
  description: string
  amazonLink: string
  coverImage: string
  releaseDate: string
  series?: string
  seriesOrder?: number
  tropes: string[]
  isPublished: boolean
}

export default function BookForm({ onSubmit }: { onSubmit: (data: BookFormData) => void }) {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    description: '',
    amazonLink: '',
    coverImage: '',
    releaseDate: '',
    series: '',
    seriesOrder: undefined,
    tropes: [],
    isPublished: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amazonLink">Amazon Link</Label>
        <Input
          id="amazonLink"
          value={formData.amazonLink}
          onChange={(e) => setFormData(prev => ({ ...prev, amazonLink: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="releaseDate">Release Date</Label>
        <Input
          id="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="series">Series Name</Label>
        <Input
          id="series"
          value={formData.series}
          onChange={(e) => setFormData(prev => ({ ...prev, series: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seriesOrder">Series Order</Label>
        <Input
          id="seriesOrder"
          type="number"
          value={formData.seriesOrder}
          onChange={(e) => setFormData(prev => ({ ...prev, seriesOrder: parseInt(e.target.value) }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tropes">Tropes (comma-separated)</Label>
        <Input
          id="tropes"
          value={formData.tropes.join(', ')}
          onChange={(e) => handleTropesChange(e.target.value)}
          placeholder="Romance, Mafia, Second Chance"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
          className="h-4 w-4"
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      <Button type="submit" className="w-full">
        Add Book
      </Button>
    </form>
  )
}
