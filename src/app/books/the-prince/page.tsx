import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThePrincePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Book Header */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative group">
              <Image 
                src="/the-prince-cover.jpg"
                alt="The Prince Book Cover"
                width={600}
                height={900}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">The Prince</h1>
                <p className="text-pink-600 text-xl">By Amber Allee</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-2xl font-bold text-pink-600">$19.99</p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Enter the dangerous world of the Las Vegas mafia with the first book in the Falcone Family series. 
                  A gripping tale of power, loyalty, and forbidden love that will keep you on the edge of your seat.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Book Details:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Series: Las Vegas Mafia Series (Book 1)</li>
                  <li>• Paperback: 400 pages</li>
                  <li>• Genre: Mafia Romance</li>
                  <li>• Publication Date: March 2024</li>
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
                  Luca Falcone has been groomed to be the next Don of his mafia family in Las Vegas. His entire 
                  life has been about becoming the man his father can be proud to hand his legacy to. The one rule 
                  to survive: leave no witnesses. But what happens when Luca breaks that rule? That choice alters 
                  the course of his life and puts his entire future at risk.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Gemma Barone has been dealt a horrible hand in life, but during the spring break of her senior 
                  year in college, she meets a man who changes everything with a whirlwind romance. As she settles 
                  into her new relationship, ugly truths and haunting mysteries are revealed about the man she now 
                  can't live without. Will she be strong enough to survive the lies and betrayals of what she 
                  thought was her fairy tale love story, or will life, once again, deal her a losing hand?
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Book Teasers */}
          <div className="mt-16">
            <Card className="p-8">
              <CardContent className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">Teasers</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      "Do you always speak to others like that?" She asks.<br/>
                      "Like what?"<br/>
                      "Order people around. Command them to do what you want."<br/>
                      I pause for a moment.<br/>
                      She doesn't know I was raised to give orders and commands for others to follow.<br/>
                      "Does that bother you?"<br/>
                      She blushes. "I kinda like it."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      "Do you have a work thing while we're here?"<br/>
                      "No work. I'm all yours while we're here."<br/>
                      "Then what are we attending?" I ask.<br/>
                      "A wedding."<br/>
                      "Oh, that sounds like fun."<br/>
                      "It will be. You are going to love it."<br/>
                      "Whose wedding is it?" Wondering if it's an employee.<br/>
                      Luca smirks, "Ours."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      A figure runs across the rainy windows of the study. My body immediately on high alert. 
                      Moments later the door bursts open and Cassio huffs out of breath.<br/>
                      "She ran."<br/>
                      My legs spring towards the doors where Gemma just bolted. I take off in a dead run.<br/>
                      She's running scared.<br/>
                      She's running from me.
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
