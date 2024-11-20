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
                  The latest captivating romance from Amber Allee that will sweep you off your feet. 
                  A story of passion, intrigue, and the dangerous world of mafia romance.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Book Details:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Series: Crimson Crown Series (Book 1)</li>
                  <li>• Paperback: 400 pages</li>
                  <li>• Genre: Contemporary Romance</li>
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
                  In the glittering world of high society, where danger lurks beneath the surface of luxury, 
                  Isabella finds herself caught in the web of the city's most notorious crime family. 
                  When she meets Marcus, the enigmatic heir to the criminal empire, she must decide 
                  between following her heart and maintaining her freedom.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "The Prince" is a steamy romance that blends passion with danger, love with loyalty, 
                  and desire with duty. This first installment in the Crimson Crown Series will leave 
                  you breathless and begging for more.
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
