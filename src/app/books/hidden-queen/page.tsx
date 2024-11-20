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
                  A dark romance that pushes boundaries and explores the depths of passion and power. 
                  Enter a world where love and danger dance in perfect harmony.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Book Details:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Series: Dark Crown Series (Book 1)</li>
                  <li>• Paperback: 380 pages</li>
                  <li>• Genre: Dark Romance</li>
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
                  In the shadows of an ancient kingdom, a forgotten heir rises. When Sofia discovers 
                  her true identity as the rightful queen of a powerful dynasty, she must navigate 
                  a treacherous world of politics, passion, and deadly intrigue.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "Hidden Queen" delves deep into a world where loyalty comes at a price and love 
                  can be the deadliest weapon of all. This dark romance will captivate readers with 
                  its intense passion and complex characters.
                </p>
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
