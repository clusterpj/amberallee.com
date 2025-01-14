'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Event } from '@/lib/types'

export function EventForm({ 
  initialData,
  onSubmit,
  onCancel
}: {
  initialData?: Partial<Event>
  onSubmit: (values: Partial<Event>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || new Date().toISOString(),
    location: initialData?.location || '',
    registration_link: initialData?.registration_link || '',
    image_url: initialData?.image_url || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="space-y-4 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Event Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Date</label>
          <Input
            type="datetime-local"
            name="date"
            value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Registration Link</label>
          <Input
            name="registration_link"
            value={formData.registration_link}
            onChange={handleChange}
            placeholder="https://example.com/register"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <Input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/event-image.jpg"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-pink-600 hover:bg-pink-700"
          >
            Save Event
          </Button>
        </div>
      </form>
    </div>
  )
}
