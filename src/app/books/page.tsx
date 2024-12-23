import { supabase } from '@/lib/supabase'
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Book {
  id: string
  title: string
  description: string
  amazon_link: string
  published_date: string
  cover_image_url: string
  price: number
}

async function getBooks() {
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('published_date', { ascending: false })

  if (error) {
    console.error('Error fetching books:', error)
    return []
  }

  return books
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(to right, rgba(209, 227, 249, 0.2), rgba(209, 227, 249, 0.05))'
        }}
        className="w-full relative py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold">
              <span className={cn(
                "bg-gradient-to-r from-[#0A1933] to-[#2851A3]",
                "bg-clip-text text-transparent"
              )}>
                Explore My Books
              </span>
            </h1>
            <p className="text-xl text-foreground/80">
              Dive into a world of passion, intrigue, and romance. Each story is crafted to take you on an unforgettable journey.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Card 
              key={book.id} 
              className={cn(
                "group relative overflow-hidden",
                "hover:shadow-2xl transition-all duration-500",
                "bg-background/50 backdrop-blur-sm",
                "border border-primary/10 hover:border-primary/20"
              )}
            >
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {book.title}
                  </span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Published: {new Date(book.published_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {book.cover_image_url && (
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                    <img 
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-t from-black/60 to-transparent",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-500",
                      "flex items-end justify-center pb-8"
                    )}>
                      <Button 
                        asChild 
                        variant="default" 
                        className="bg-primary text-primary-foreground px-6 py-2"
                      >
                        <Link href={`/books/${book.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <p className="text-gray-600 line-clamp-3">{book.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-primary">
                      ${(book.price / 100).toFixed(2)}
                    </span>
                    {book.amazon_link && (
                      <a
                        href={book.amazon_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-primary bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                      >
                        Buy on Amazon
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
