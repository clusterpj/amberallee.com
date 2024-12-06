import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const BOOKS = [
  {
    title: "The Prince",
    cover: "/the-prince-cover.jpg",
    description: "First book in the Las Vegas Mafia Series - A story of power, loyalty, and forbidden love.",
    category: "Mafia Romance",
    link: "/books/the-prince",
    price: 19.99,
    series: "Las Vegas Mafia Series, Book 1"
  },
  {
    title: "Hidden Queen",
    cover: "/hidden-queen-cover.jpg",
    description: "Welcome to Sin City, where danger and romance collide in this thrilling mafia romance filled with secrets and hidden identities.",
    category: "Mafia Romance",
    link: "/books/hidden-queen",
    price: 17.99,
    series: "Las Vegas Elite Series, Book 1"
  }
]

export default function BooksPage() {
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
                "bg-clip-text text-transparent",
                "crystal sparkle"
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
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {BOOKS.map((book) => (
            <Card 
              key={book.title} 
              className={cn(
                "group relative overflow-hidden",
                "hover:shadow-2xl transition-all duration-500",
                "bg-background/50 backdrop-blur-sm",
                "border border-primary/10 hover:border-primary/20"
              )}
            >
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {book.title}
                  </span>
                </CardTitle>
                <CardDescription className="text-lg">
                  <span className={cn(
                    "inline-block px-4 py-1.5 rounded-full",
                    "bg-primary/5 text-primary",
                    "border border-primary/10"
                  )}>
                    {book.category}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="relative group">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                    <Image 
                      src={book.cover} 
                      alt={book.title} 
                      fill
                      className={cn(
                        "object-cover",
                        "transform transition-transform duration-500",
                        "group-hover:scale-105"
                      )}
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
                        className={cn(
                          "metallic",
                          "bg-primary text-primary-foreground",
                          "text-lg px-8 py-6"
                        )}
                      >
                        <Link href={book.link}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <p className="text-lg text-foreground/80">{book.description}</p>
                  <p className="text-sm text-foreground/60">{book.series}</p>
                  <p className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${book.price}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
