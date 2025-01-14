'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventForm } from "@/components/admin/EventForm"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { Event } from '@/lib/types'

export default function AdminEventsPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      
      // Verify admin access
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        window.location.href = '/auth/signin'
        return
      }

      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (roleError || userData?.role !== 'admin') {
        window.location.href = '/auth/signin'
        return
      }

      // Fetch events
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true })

        if (error) throw error
        setEvents(data || [])
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowForm(true)
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await fetchEvents()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      console.error('Error deleting event:', error);
    }
  }

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setShowForm(true)
  }

  const fetchEvents = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error')
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values: Event) => {
    try {
      const supabase = createClient()
      const eventData = {
        ...values,
        image_url: values.image_url || '/default-event.jpg',
        id: selectedEvent?.id || ''
      }

      if (selectedEvent) {
        // Update existing event
        const { error: updateError } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', selectedEvent.id)
        if (updateError) throw updateError
      } else {
        // Create new event
        const { error: insertError } = await supabase
          .from('events')
          .insert([eventData])
        if (insertError) throw insertError
      }
      await fetchEvents()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Button 
          className="bg-pink-600 hover:bg-pink-700"
          onClick={handleCreateEvent}
        >
          Add New Event
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading events...</div>
          ) : events.length === 0 ? (
            <div>No events found</div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (!event.id) return
                        handleDeleteEvent(event.id)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent 
          className="sm:max-w-[600px] bg-white"
          aria-labelledby="event-form-title"
          aria-describedby="event-form-description"
        >
          <DialogHeader>
            <DialogTitle 
              id="event-form-title" 
              className="text-2xl font-bold"
              asChild
            >
              <h2>
                {selectedEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
            </DialogTitle>
            <DialogDescription 
              id="event-form-description" 
              className="text-sm text-muted-foreground"
            >
              {selectedEvent ? 
                'Edit the details of this event' : 
                'Create a new event with all the necessary details'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <EventForm
              initialData={selectedEvent || undefined}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
