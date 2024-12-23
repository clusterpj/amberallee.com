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

// Map book titles to their URL-friendly paths
const bookUrlMap: Record<string, string> = {
  'The Prince': 'the-prince',
  'Hidden Queen': 'hidden-queen'
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
            <h1 className="text-4xl font-bold title-gradient mb-4">Books</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book) => (
            <Card 
              key={book.id} 
              className={cn(
                "group relative overflow-hidden",
                "hover:shadow-2xl transition-all duration-500",
                "bg-white",
                "border border-primary/10 hover:border-primary/20"
              )}
            >
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold text-primary">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
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
                      "absolute inset-0 flex flex-col justify-end p-6",
                      "bg-gradient-to-t from-black/80 via-black/50 to-transparent",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}>
                      <p className="text-white mb-4 line-clamp-3">
                        {book.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button 
                          asChild
                          variant="secondary"
                          className="w-full bg-white text-primary hover:bg-white/90"
                        >
                          <Link href={`/books/${bookUrlMap[book.title] || book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          asChild
                          variant="outline"
                          className="w-full bg-transparent text-white border-white hover:bg-white/10"
                        >
                          <a href={book.amazon_link} target="_blank" rel="noopener noreferrer">
                            Buy on Amazon
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
