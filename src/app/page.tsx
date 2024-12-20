import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { NewsletterPopup } from "@/components/ui/NewsletterPopup"
import { SocialBar } from "@/components/ui/SocialBar"
import { getPublishedBooks } from "@/lib/books"
import type { Book } from "@/types/book"

const TESTIMONIALS = [
  {
    quote: "Amber Allee's writing is like a rollercoaster of emotions. Absolutely addictive!",
    author: "New York Times Bestselling Author",
    source: "Book Review Magazine"
  },
  {
    quote: "A masterful storyteller who knows how to keep readers on the edge of their seats.",
    author: "Romance Reads Blog",
    source: "Literary Review"
  }
]

const BLOG_POSTS = [
  {
    title: "The Art of Writing Mafia Romance",
    excerpt: "Discover how real-world research and imagination blend to create compelling mafia romance stories that captivate readers...",
    date: "March 15, 2024",
    link: "/blog/writing-mafia-romance"
  },
  {
    title: "Behind the Scenes: Las Vegas Elite Series",
    excerpt: "Take a peek behind the curtain of my latest series and learn about the inspiration behind Hidden Queen...",
    date: "March 1, 2024",
    link: "/blog/las-vegas-elite-series"
  },
  {
    title: "Romance Writing Tips: Creating Chemistry",
    excerpt: "Learn the secrets to writing sizzling chemistry between your characters that keeps readers turning pages...",
    date: "February 15, 2024",
    link: "/blog/writing-character-chemistry"
  }
]

export default async function Home() {
  const books = await getPublishedBooks()

  return (
    <div className="min-h-screen bg-background">
      <NewsletterPopup />
      <SocialBar />
      {/* Hero Section */}
      <section className="w-full relative py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold">
                Romance Novels
                <br />
                <span className="text-primary">
                  That Captivate Your Heart
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Experience the emotional depth and compelling storytelling of Amber Allee's novels.
                Where romance meets unforgettable characters.
              </p>
              <div className="flex space-x-4">
                <Button 
                  asChild 
                  className="bg-secondary hover:bg-secondary-hover text-white font-medium"
                >
                  <Link href="/books" className="flex items-center">
                    Explore Books
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-highlight1 text-highlight1 hover:bg-highlight1/10"
                >
                  <Link href="/newsletter">Join Newsletter</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Card className="relative group bg-white border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="relative">
                  <CardTitle className="text-center text-2xl font-bold text-primary pb-2 relative">
                    Latest Release
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-highlight1"></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative p-6">
                  <div className="relative group/image overflow-hidden rounded-xl">
                    {books[0] && (
                      <Image 
                        src={books[0].coverImage}
                        alt={`${books[0].title} - Latest Release`}
                        width={400} 
                        height={600} 
                        className="rounded-xl shadow-lg transition-all duration-500 ease-in-out group-hover/image:scale-110 group-hover/image:rotate-3 group-hover/image:shadow-xl"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section - Redesigned */}
      <section className="py-24 bg-highlight2/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-primary">
              Featured Books
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover stories that will captivate your heart and keep you turning pages late into the night
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {books.map((book: Book) => {
              const bookUrl = `/books/${book.title.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <Link 
                  key={book.id} 
                  href={bookUrl}
                  className="relative aspect-[2/3] block overflow-hidden rounded-lg group"
                >
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 300px"
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About the Author Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image 
                      src="/author-photo.jpg" 
                      alt="Amber Allee" 
                      fill
                      className="object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 lg:-right-16 bg-white shadow-lg p-6 rounded-xl max-w-xs transition-all duration-300 hover:shadow-xl">
                  <p className="text-highlight2 italic text-sm leading-relaxed">
                    "Writing romance is about exploring the depths of human connection and the transformative power of love."
                  </p>
                  <p className="text-primary font-semibold mt-2">- Amber Allee</p>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                    Meet Amber Allee
                  </h2>
                  <p className="text-xl text-highlight1">
                    USA Today Bestselling Author
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Amber Allee is a passionate storyteller who weaves intricate tales of love, power, and redemption. 
                    Her mafia romance novels have captivated readers worldwide with their blend of intense passion and 
                    heart-stopping suspense.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Based in the heart of romance writing, Amber draws inspiration from the complex dynamics of 
                    relationships and the transformative journey of finding love in unexpected places. Her stories 
                    feature strong, complex characters who must navigate the dangerous waters of loyalty, betrayal, 
                    and passion.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    className="bg-secondary hover:bg-secondary-hover text-white font-medium text-lg py-6 px-8"
                  >
                    <Link href="/about">
                      Read Full Bio
                    </Link>
                  </Button>

                  <Button 
                    asChild
                    variant="outline"
                    className="border-highlight1 text-highlight1 hover:bg-highlight1/10 text-lg py-6 px-8"
                  >
                    <Link href="/contact">Contact Amber</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-highlight2/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get exclusive updates, sneak peeks, and special offers straight to your inbox.
          </p>
          <div className="max-w-xl mx-auto">
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-md border-accent/20 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
              />
              <Button 
                className="bg-secondary hover:bg-secondary-hover text-white font-medium"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            What Readers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group bg-white border-accent/20 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center relative">
                  <div className="absolute top-4 left-4 text-6xl font-serif text-highlight1/20">"</div>
                  <p className="text-xl italic text-muted-foreground mb-4 relative z-10">"{testimonial.quote}"</p>
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-highlight2">{testimonial.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-white/80">&copy; 2024 Amber Allee. All Rights Reserved.</p>
          <div className="space-x-6">
            <Link href="#" className="text-white/80 hover:text-highlight1 transition-colors">Instagram</Link>
            <Link href="#" className="text-white/80 hover:text-highlight1 transition-colors">TikTok</Link>
            <Link href="#" className="text-white/80 hover:text-highlight1 transition-colors">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
