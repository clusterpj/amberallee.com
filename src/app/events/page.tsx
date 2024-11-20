import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Las Vegas Elite Series Book Signing",
    date: "April 15, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Barnes & Noble - Las Vegas Strip",
    description: "Join Amber Allee for the launch of Hidden Queen! Meet the author, get your book signed, and enjoy an evening of discussion about the Las Vegas Elite Series.",
    image: "/book-signing-event.jpg",
    registrationLink: "/events/book-signing-registration"
  },
  {
    id: 2,
    title: "Romance Writers Workshop",
    date: "May 1, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    description: "Learn the craft of romance writing in this intensive workshop. Topics include character development, plot structure, and writing compelling dialogue.",
    image: "/writers-workshop.jpg",
    registrationLink: "/events/workshop-registration"
  },
  {
    id: 3,
    title: "Summer Book Festival",
    date: "June 20-22, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Henderson Convention Center",
    description: "A three-day celebration of romance literature featuring panel discussions, book signings, and meet-and-greets with your favorite authors.",
    image: "/book-festival.jpg",
    registrationLink: "/events/festival-registration"
  }
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-pink-600">Events</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join me for book signings, workshops, and special events. Connect with other readers
              and celebrate our shared love of romance literature.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                      <div className="text-pink-600 space-y-1">
                        <p>{event.date} • {event.time}</p>
                        <p>{event.location}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-gray-700 mb-6">{event.description}</p>
                      <Button asChild className="bg-pink-600 hover:bg-pink-700">
                        <Link href={event.registrationLink}>Register Now</Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-pink-50">
              <CardContent>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Subscribe to my newsletter to receive updates about upcoming events and book releases.
                </p>
                <div className="max-w-md mx-auto flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <Button className="bg-pink-600 hover:bg-pink-700">
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
