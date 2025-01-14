import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'
import { format } from 'date-fns'

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  registration_link: string
  image_url: string
}

async function getUpcomingEvents() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    throw error
  }
  return data as Event[]
}

export default async function EventsPage() {
  const events = await getUpcomingEvents()
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 py-16 animate-gradient-x">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold title-gradient mb-4">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join me for book signings, workshops, and special events. Connect with other readers
              and celebrate our shared love of romance literature.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-8">
            {events.map((event) => (
              <Card key={event.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-accent/20 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <Image
                      src={event.image_url || '/default-event.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-3xl font-heading mb-3 group-hover:text-secondary transition-colors">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {format(new Date(event.date), 'MMMM d, yyyy')} • {format(new Date(event.date), 'h:mm a')}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-6">{event.description}</p>
                      <Button asChild className="bg-metallic hover:bg-metallic-hover text-primary font-medium group">
                        <Link href={event.registration_link || '#'}>
                          Register Now
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16">
            <Card className="p-8 border border-accent/20 backdrop-blur-sm bg-white/70">
              <CardContent className="text-center">
                <h2 className="text-3xl font-heading font-bold text-primary mb-4 title-gradient">
                  Stay Updated
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Subscribe to my newsletter to receive updates about upcoming events and book releases.
                </p>
                <div className="max-w-md mx-auto flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-accent/20 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                  <Button className="bg-secondary hover:bg-secondary-hover text-white font-medium">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
