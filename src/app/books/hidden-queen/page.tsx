import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HiddenQueenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Book Header */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative group">
              <Image 
                src="/hidden-queen-cover.jpg"
                alt="Hidden Queen Book Cover"
                width={600}
                height={900}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">Hidden Queen</h1>
                <p className="text-pink-600 text-xl">By Amber Allee</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-2xl font-bold text-pink-600">$17.99</p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  It's Sin City, what could go wrong? When Kendall Drake defies her guardians' warning and arrives in Las Vegas, 
                  she finds herself caught between ambition and desire in a world of power, secrets, and hidden dangers.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Book Details:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Series: Las Vegas Elite Series (Book 1)</li>
                  <li>• Paperback: 380 pages</li>
                  <li>• Genre: Mafia Romance</li>
                  <li>• Tropes: Forced Proximity, Secrets, Found Family, Blind Date, Strong Female Heroine, Hidden Identity</li>
                  <li>• Publication Date: February 2024</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-6">
                  Purchase Now
                </Button>
                <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 text-lg px-8 py-6">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>

          {/* Book Description */}
          <div className="mt-16 space-y-8">
            <Card className="p-8">
              <CardContent className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">About the Book</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "You have your whole life ahead of you and I won't let you throw it away to that awful place. 
                  The answer is no. I'm not going to say it again."
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  When Kendall Drake disregards her guardians' warning and arrives in Las Vegas to accept the summer 
                  internship of a lifetime, she doesn't expect to meet Wyatt Dawson. Arrogant, rich, and exceedingly 
                  handsome, he is a delicious distraction that she does not need as she tries to make a name for herself 
                  in a male-dominated industry. As she juggles her new position and Wyatt's irresistible seduction while 
                  pretending to be on summer vacation with her friend, Harper, she finds herself caught in a world she 
                  never knew actually existed. Power plays, secrets, deception, and murder. Kendall soon realizes she's 
                  bit off more than she can chew when her new life becomes entangled with the life she once led.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Who is Wyatt really? Why was she told not to come to Sin City? Danger follows her every move and 
                  the ghosts of her past lurk in the shadows waiting to tie up loose ends.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Book Teasers */}
          <div className="mt-16">
            <Card className="p-8">
              <CardContent className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">Teasers</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      "Your eyes set you apart from everyone else in this world."<br/>
                      <span className="text-pink-600 mt-2 block">- Wyatt</span>
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      "In such a short amount of time you've worked yourself into my whole being and I can't picture a life that doesn't have you by my side."<br/>
                      <span className="text-pink-600 mt-2 block">- Wyatt</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Books Link */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
              <Link href="/books">Back to All Books</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
