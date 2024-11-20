import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const BOOK_CATEGORIES = [
  "Romance",
  "Dark Romance"
]

const BOOKS = [
  {
    title: "The Prince",
    cover: "/the-prince-cover.jpg",
    description: "First book in the Las Vegas Mafia Series - A story of power, loyalty, and forbidden love.",
    category: "Mafia Romance",
    link: "/books/the-prince",
    price: 19.99
  },
  {
    title: "Hidden Queen",
    cover: "/hidden-queen-cover.jpg",
    description: "Welcome to Sin City, where danger and romance collide in this thrilling mafia romance filled with secrets and hidden identities.",
    category: "Mafia Romance",
    link: "/books/hidden-queen",
    price: 17.99
  }
]

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-900">
          Amber Allee's <span className="text-pink-600">Book Collection</span>
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {BOOK_CATEGORIES.map((category) => (
            <Button 
              key={category} 
              variant="outline" 
              className="border-pink-600 text-pink-600 hover:bg-pink-50"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {BOOKS.map((book) => (
            <Card key={book.title} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-gray-900">{book.title}</CardTitle>
                <CardDescription className="text-lg">
                  <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                    {book.category}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative group">
                  <Image 
                    src={book.cover} 
                    alt={book.title} 
                    width={400} 
                    height={600} 
                    className="rounded-xl mx-auto shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-8">
                    <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-6">
                      <Link href={book.link}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-gray-700 text-lg">{book.description}</p>
                  <p className="text-2xl font-bold text-pink-600">${book.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
