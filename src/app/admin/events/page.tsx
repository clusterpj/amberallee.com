import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Las Vegas Elite Series Book Signing",
    date: "April 15, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Barnes & Noble - Las Vegas Strip",
    description: "Join Amber Allee for the launch of Hidden Queen! Meet the author, get your book signed, and enjoy an evening of discussion about the Las Vegas Elite Series.",
    status: "upcoming",
    capacity: 100,
    registered: 45
  },
  {
    id: 2,
    title: "Romance Writers Workshop",
    date: "May 1, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    description: "Learn the craft of romance writing in this intensive workshop. Topics include character development, plot structure, and writing compelling dialogue.",
    status: "upcoming",
    capacity: 50,
    registered: 30
  },
  {
    id: 3,
    title: "Summer Book Festival",
    date: "June 20-22, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Henderson Convention Center",
    description: "A three-day celebration of romance literature featuring panel discussions, book signings, and meet-and-greets with your favorite authors.",
    status: "planning",
    capacity: 500,
    registered: 175
  }
]

export default function EventsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Button className="bg-pink-600 hover:bg-pink-700">
          Create New Event
        </Button>
      </div>

      <div className="grid gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{event.date} • {event.time}</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-pink-600 text-pink-600">
                    Edit
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {event.registered} / {event.capacity} registered
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
