import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const FEATURED_BOOKS = [
  {
    title: "The Prince",
    cover: "/the-prince-cover.jpg",
    description: "First book in the Las Vegas Mafia Series - A story of power, loyalty, and forbidden love.",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-black">
            Romance Novels <br />
            <span className="text-blue relative">
              That Captivate Your Heart
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-peach/20"></span>
            </span>
          </h1>
          <p className="text-xl text-gray">
            Experience the emotional depth and compelling storytelling of Amber Allee's novels.
            Where romance meets unforgettable characters.
          </p>
          <div className="flex space-x-4">
            <Button 
              asChild 
              className="bg-blue hover:bg-blue-light text-white transition-colors relative group"
            >
              <Link href="/books" className="flex items-center">
                Explore Books
                <span className="ml-2 text-pink/20 group-hover:text-white/20 transition-colors">→</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="border-blue text-blue hover:bg-blue hover:text-white hover:border-blue-light transition-colors"
            >
              <Link href="/newsletter">Join Newsletter</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow border-sage/20 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-peach/10 via-mint/10 to-pink/10 rounded-[22px] blur-lg group-hover:opacity-75 transition duration-500"></div>
            <CardHeader>
              <CardTitle className="text-center text-blue">Latest Release</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative group">
                <Image 
                  src="/the-prince-cover.jpg" 
                  alt="The Prince - Latest Release" 
                  width={400} 
                  height={600} 
                  className="rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-peach/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-black relative inline-block">
            Featured <span className="text-blue">Books</span>
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-mint/30 via-peach/30 to-transparent"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {FEATURED_BOOKS.map((book) => (
              <Card 
                key={book.title} 
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-sage/20"
              >
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold text-blue">{book.title}</CardTitle>
                  <CardDescription className="text-lg text-gray">{book.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="relative group">
                    <Image 
                      src={book.cover} 
                      alt={book.title} 
                      width={400} 
                      height={600} 
                      className="rounded-xl mx-auto shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-8">
                      <Button 
                        asChild 
                        className="bg-blue hover:bg-blue-light text-white transition-colors text-lg px-8 py-6"
                      >
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
      <section className="bg-gradient-to-br from-blue-light/10 via-peach/5 to-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <Image 
              src="/author-photo.jpg" 
              alt="Amber Allee" 
              width={500} 
              height={600} 
              className="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-blue/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-black">
              About <span className="text-blue">Amber Allee</span>
            </h2>
            <p className="text-lg text-gray">
              Amber Allee is a USA Today bestselling author known for her heart-stopping mafia romance novels. 
              With a passion for complex characters and edge-of-your-seat storytelling, she creates worlds 
              where love conquers even the darkest of circumstances.
            </p>
            <Button 
              asChild 
              className="bg-blue hover:bg-blue-light text-white transition-colors"
            >
              <Link href="/about">Read Full Bio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Stay <span className="text-blue">Connected</span>
          </h2>
          <p className="text-xl text-gray mb-8">
            Get exclusive updates, sneak peeks, and special offers straight to your inbox.
          </p>
          <div className="max-w-xl mx-auto">
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 border border-sage rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue 
                         focus:border-blue-light transition-colors
                         placeholder:text-gray/60"
              />
              <Button 
                className="bg-blue hover:bg-blue-light text-white transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-blue-light/5 via-pink/5 to-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            What <span className="text-blue">Readers</span> Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 border-sage/20 group"
              >
                <CardContent className="p-6 text-center relative">
                  <div className="absolute top-4 left-4 text-6xl font-serif text-blue/10 group-hover:text-blue/20 transition-colors">"</div>
                  <p className="text-xl italic text-gray mb-4 relative z-10">"{testimonial.quote}"</p>
                  <p className="font-semibold text-blue">{testimonial.author}</p>
                  <p className="text-gray/80">{testimonial.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Latest <span className="text-blue relative">
              Blog Posts
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-peach/30 to-pink/30"></span>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card 
                key={post.title} 
                className="hover:shadow-xl transition-all duration-300 border-sage/20 group"
              >
                <CardHeader>
                  <CardTitle className="text-blue group-hover:text-blue-light transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray/60">
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray mb-4">{post.excerpt}</p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-blue text-blue hover:bg-blue hover:text-white transition-colors"
                  >
                    <Link href={post.link}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              asChild 
              className="bg-blue hover:bg-blue-light text-white transition-colors"
            >
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
