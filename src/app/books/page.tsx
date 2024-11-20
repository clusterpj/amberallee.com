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
    title: "The Price",
    cover: "/book-cover-1.jpg",
    description: "The latest captivating romance from Amber Allee.",
    category: "Romance",
    link: "/books/the-price",
    price: 19.99
  },
  {
    title: "The Queen",
    cover: "/book-cover-2.jpg",
    description: "A dark romance that will keep you on the edge of your seat.",
    category: "Dark Romance",
    link: "/books/the-queen",
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
        <div className="grid md:grid-cols-4 gap-8">
          {BOOKS.map((book) => (
            <Card key={book.title} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>{book.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image 
                  src={book.cover} 
                  alt={book.title} 
                  width={300} 
                  height={450} 
                  className="rounded-xl mx-auto mb-4"
                />
                <p className="text-gray-700 mb-4 text-center">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-pink-600">${book.price}</span>
                  <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
                    <Link href={book.link}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
