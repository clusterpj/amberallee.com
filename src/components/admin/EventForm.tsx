'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Event } from '@/lib/types'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<Partial<Event>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Validate file type
      const file = e.target.files[0]
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setSelectedFile(file)
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, image_url: previewUrl }))
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    console.log('Starting image upload for file:', file.name, file.size, file.type)
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`
  
    try {
      // Upload the file directly without checking/creating bucket
      const { error: uploadError } = await supabase
        .storage
        .from('events')  // Make sure this bucket is already created in Supabase dashboard
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })
  
      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }
  
      // Get the public URL
      const { data: publicUrlData } = supabase
        .storage
        .from('events')
        .getPublicUrl(filePath)
  
      console.log('Upload successful. Public URL:', publicUrlData.publicUrl)
      return publicUrlData.publicUrl
  
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error('Please log in to save events')
        return
      }
  
      let imageUrl = formData.image_url
  
      // Upload new image if selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile)
        } catch (uploadError) {
          console.error('Image upload error:', uploadError)
          toast.error('Failed to upload image. Please try again.')
          return
        }
      }
  
      const eventData = {
        ...formData,
        image_url: imageUrl || '/default-event.jpg',
        date: new Date(formData.date || new Date()).toISOString(),
        updated_at: new Date().toISOString(),
        user_id: session.user.id // Track who modified the event
      }
      
      // Verify image_url is set correctly
      if (!eventData.image_url) {
        console.error('Image URL is missing in event data')
        throw new Error('Image URL is required')
      }
      console.log('Saving event data:', {
        ...eventData,
        image_url: eventData.image_url // Explicitly log the image URL
      })
  
      if (initialData?.id) {
        // Check if user has permission to update this event
        const { data: existingEvent, error: fetchError } = await supabase
          .from('events')
          .select('user_id')
          .eq('id', initialData.id)
          .single()
  
        if (fetchError) {
          throw new Error('Failed to verify event ownership')
        }
  
        if (existingEvent.user_id !== session.user.id) {
          toast.error('You do not have permission to edit this event')
          return
        }
  
        // Update existing event
        console.log('Attempting to update event with data:', eventData)
        const { data, error: updateError } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', initialData.id)
          .select()
        
        if (updateError) {
          console.error('Update error details:', {
            message: updateError.message,
            code: updateError.code,
            details: updateError.details
          })
          if (updateError.code === '42501') { // Permission denied error
            toast.error('You do not have permission to update this event')
          } else {
            throw updateError
          }
          return
        }
        
        toast.success('Event updated successfully')
      } else {
        // Create new event
        const { error: insertError } = await supabase
          .from('events')
          .insert([eventData])
        
        if (insertError) {
          if (insertError.code === '42501') { // Permission denied error
            toast.error('You do not have permission to create events')
          } else {
            throw insertError
          }
          return
        }
        
        toast.success('Event created successfully')
      }
  
      router.refresh()
      onCancel()
    } catch (error) {
      console.error('Error saving event:', error)
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to save event. Please try again.'
      )
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

        <div className="space-y-2">
          <label className="block mb-2 font-medium">Event Image</label>
          <div className="flex flex-col items-center space-y-4">
            {formData.image_url && (
              <div className="relative w-full h-48">
                <Image
                  src={formData.image_url}
                  alt="Event preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              {formData.image_url ? 'Change Image' : 'Upload Image'}
            </Button>
          </div>
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