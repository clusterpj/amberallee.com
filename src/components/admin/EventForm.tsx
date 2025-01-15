'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Event } from '@/lib/types'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function EventForm({ 
  initialData,
  onCancel
}: {
  initialData?: Partial<Event>
  onCancel: () => void
}) {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState<Partial<Event>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || new Date().toISOString(),
    location: initialData?.location || '',
    registration_link: initialData?.registration_link || '',
    image_url: initialData?.image_url || '',
    is_virtual: initialData?.is_virtual || false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const eventData = {
        ...formData,
        image_url: formData.image_url || '/default-event.jpg',
        // Ensure date is properly formatted for Supabase
        date: new Date(formData.date || new Date()).toISOString()
      }

      if (initialData?.id) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', initialData.id)
          .select() // Add select to get updated data
        
        if (error) {
          console.error('Update error:', error)
          throw error
        }
        toast.success('Event updated successfully')
        console.log('Updated event:', eventData)
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([eventData])
        
        if (error) throw error
        toast.success('Event created successfully')
      }

      router.refresh()
      onCancel()
    } catch (error) {
      toast.error('Failed to save event')
      console.error('Error saving event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Event Title *</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Date & Time *</label>
          <Input
            type="datetime-local"
            name="date"
            value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Registration Link</label>
          <Input
            name="registration_link"
            value={formData.registration_link}
            onChange={handleChange}
            placeholder="https://example.com/register"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <Input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/event-image.jpg"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_virtual"
            checked={formData.is_virtual}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isSubmitting}
          />
          <label className="text-sm font-medium">Virtual Event</label>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-pink-600 hover:bg-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </Button>
        </div>
      </form>
    </div>
  )
}
