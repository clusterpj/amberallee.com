import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const FEATURED_BOOKS = [
  {
    title: "Crimson Vows",
    cover: "/book-cover-1.jpg",
    description: "A dark mafia romance that will leave you breathless.",
    link: "/books/crimson-vows"
  },
  {
    title: "Midnight Covenant",
    cover: "/book-cover-2.jpg",
    description: "Passion, power, and a love that defies all boundaries.",
    link: "/books/midnight-covenant"
  },
  {
    title: "Rogue's Redemption",
    cover: "/book-cover-3.jpg",
    description: "When love collides with the criminal underworld.",
    link: "/books/rogues-redemption"
  }
]

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
    excerpt: "Dive into my creative process and inspirations...",
    date: "March 15, 2024",
    link: "/blog/writing-mafia-romance"
  },
  {
    title: "Behind the Scenes of Crimson Vows",
    excerpt: "Exclusive insights into my latest novel...",
    date: "February 22, 2024",
    link: "/blog/behind-crimson-vows"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Mafia Romance <br />
            <span className="text-pink-600">Where Passion Meets Danger</span>
          </h1>
          <p className="text-xl text-gray-700">
            Dive into the dark, passionate world of Amber Allee's novels. 
            Suspense, romance, and edge-of-your-seat storytelling await.
          </p>
          <div className="flex space-x-4">
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/books">Explore Books</Link>
            </Button>
            <Button asChild variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
              <Link href="/newsletter">Join Newsletter</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-sm shadow-2xl transform hover:scale-105 transition">
            <CardHeader>
              <CardTitle className="text-center text-pink-600">Latest Release</CardTitle>
            </CardHeader>
            <CardContent>
              <Image 
                src="/latest-book-cover.jpg" 
                alt="Latest Book Cover" 
                width={400} 
                height={600} 
                className="rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured <span className="text-pink-600">Books</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_BOOKS.map((book) => (
              <Card key={book.title} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={book.cover} 
                    alt={book.title} 
                    width={300} 
                    height={450} 
                    className="rounded-xl mx-auto"
                  />
                  <div className="mt-4 text-center">
                    <Button asChild variant="outline" className="border-pink-600 text-pink-600">
                      <Link href={book.link}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="/author-photo.jpg" 
              alt="Amber Allee" 
              width={500} 
              height={600} 
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              About <span className="text-pink-600">Amber Allee</span>
            </h2>
            <p className="text-lg text-gray-700">
              Amber Allee is a USA Today bestselling author known for her heart-stopping mafia romance novels. 
              With a passion for complex characters and edge-of-your-seat storytelling, she creates worlds 
              where love conquers even the darkest of circumstances.
            </p>
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/about">Read Full Bio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Stay <span className="text-pink-600">Connected</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get exclusive updates, sneak peeks, and special offers straight to your inbox.
          </p>
          <div className="max-w-xl mx-auto">
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            What <span className="text-pink-600">Readers</span> Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="text-xl italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-pink-600">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Latest <span className="text-pink-600">Blog Posts</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card key={post.title} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Button asChild variant="outline" className="border-pink-600 text-pink-600">
                    <Link href={post.link}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">&copy; 2024 Amber Allee. All Rights Reserved.</p>
          <div className="space-x-4">
            <Link href="#" className="text-gray-800 hover:text-pink-600">Instagram</Link>
            <Link href="#" className="text-gray-800 hover:text-pink-600">TikTok</Link>
            <Link href="#" className="text-gray-800 hover:text-pink-600">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
