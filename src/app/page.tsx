import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const FEATURED_BOOKS = [
  {
    title: "The Prince",
    cover: "/the-prince-cover.jpg",
    description: "The latest captivating romance from Amber Allee.",
    link: "/books/the-prince"
  },
  {
    title: "Hidden Queen",
    cover: "/hidden-queen-cover.jpg",
    description: "A dark romance that will keep you on the edge of your seat.",
    link: "/books/hidden-queen"
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
            Romance Novels <br />
            <span className="text-pink-600">That Captivate Your Heart</span>
          </h1>
          <p className="text-xl text-gray-700">
            Experience the emotional depth and compelling storytelling of Amber Allee's novels.
            Where romance meets unforgettable characters.
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
                src="/the-prince-cover.jpg" 
                alt="The Prince - Latest Release" 
                width={400} 
                height={600} 
                className="rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
            Featured <span className="text-pink-600">Books</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {FEATURED_BOOKS.map((book) => (
              <Card key={book.title} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold text-gray-900">{book.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-700">{book.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
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
                        <Link href={book.link}>Explore Book</Link>
                      </Button>
                    </div>
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
