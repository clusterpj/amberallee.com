import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const BOOK_CATEGORIES = [
  "Mafia Romance",
  "Dark Romance",
  "Suspense",
  "Contemporary"
]

const BOOKS = [
  {
    title: "Crimson Vows",
    cover: "/book-cover-1.jpg",
    description: "A dark mafia romance that will leave you breathless.",
    category: "Mafia Romance",
    link: "/books/crimson-vows",
    price: 19.99
  },
  {
    title: "Midnight Covenant",
    cover: "/book-cover-2.jpg",
    description: "Passion, power, and a love that defies all boundaries.",
    category: "Dark Romance",
    link: "/books/midnight-covenant",
    price: 17.99
  },
  {
    title: "Rogue's Redemption",
    cover: "/book-cover-3.jpg",
    description: "When love collides with the criminal underworld.",
    category: "Mafia Romance",
    link: "/books/rogues-redemption",
    price: 18.99
  },
  {
    title: "Shadows of Desire",
    cover: "/book-cover-4.jpg",
    description: "A gripping tale of forbidden love and dangerous secrets.",
    category: "Suspense",
    link: "/books/shadows-of-desire",
    price: 16.99
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
