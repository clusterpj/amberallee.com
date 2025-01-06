'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventForm } from "@/components/admin/EventForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Event } from '@/lib/types'

export default function AdminEventsPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowForm(true)
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setShowForm(true)
  }

  const handleSubmit = async (values: Event) => {
    try {
      if (selectedEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(values)
          .eq('id', selectedEvent.id)
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([values])
      }
      fetchEvents()
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
                      onClick={() => handleDeleteEvent(event.id)}
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
          aria-describedby="event-form-description"
        >
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
            <p id="event-form-description" className="sr-only">
              {selectedEvent ? 'Edit existing event details' : 'Create a new event'}
            </p>
          </DialogHeader>
          <EventForm
            initialData={selectedEvent || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
