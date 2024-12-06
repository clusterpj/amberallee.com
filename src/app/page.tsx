import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(to right, rgba(209, 227, 249, 0.2), rgba(209, 227, 249, 0.05))'
        }}
        className="w-full relative py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold">
                Romance Novels
                <br />
                <span className={cn(
                  "bg-gradient-to-r from-[#0A1933] to-[#2851A3]",
                  "bg-clip-text text-transparent",
                  "crystal sparkle"
                )}>
                  That Captivate Your Heart
                </span>
              </h1>
              <p className="text-xl text-foreground/80">
                Experience the emotional depth and compelling storytelling of Amber Allee's novels.
                Where romance meets unforgettable characters.
              </p>
              <div className="flex space-x-4">
                <Button 
                  asChild 
                  className={cn(
                    "metallic",
                    "bg-primary text-primary-foreground",
                    "shadow-lg hover:shadow-xl transition-all duration-300"
                  )}
                >
                  <Link href="/books" className="flex items-center">
                    Explore Books
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className={cn(
                    "crystal",
                    "border-accent hover:bg-accent/10",
                    "shadow-sm hover:shadow-md transition-all duration-300"
                  )}
                >
                  <Link href="/newsletter">Join Newsletter</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Card className={cn(
                "relative group",
                "bg-gradient-to-br from-background via-accent/5 to-background",
                "border border-accent/20",
                "shadow-[0_0_15px_rgba(209,227,249,0.2)]",
                "hover:shadow-[0_0_30px_rgba(209,227,249,0.3)]",
                "transition-all duration-1000 ease-in-out",
                "hover:scale-[1.03]"
              )}>
                <div className={cn(
                  "absolute -inset-[2px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl",
                  "casino-glow",
                  "group-hover:opacity-100"
                )}></div>
                <CardHeader className="relative">
                  <CardTitle className={cn(
                    "text-center text-2xl font-bold",
                    "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
                    "pb-2 relative"
                  )}>
                    Latest Release
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative p-6">
                  <div className="relative group/image perspective-[1000px]">
                    <div className={cn(
                      "absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl",
                      "opacity-0 group-hover/image:opacity-100",
                      "transition-all duration-1000 ease-in-out",
                      "casino-glow"
                    )}></div>
                    <Image 
                      src="/hidden-queen-cover.jpg" 
                      alt="Hidden Queen - Latest Release" 
                      width={400} 
                      height={600} 
                      className={cn(
                        "rounded-xl relative",
                        "shadow-lg group-hover/image:shadow-xl",
                        "transition-all duration-1000 ease-in-out",
                        "group-hover/image:scale-[1.04]",
                        "group-hover/image:rotate-[12deg]",
                        "origin-center transform-gpu",
                        "z-10"
                      )}
                    />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent",
                      "opacity-0 group-hover/image:opacity-100",
                      "rounded-xl transition-all duration-1000 ease-in-out",
                      "group-hover/image:rotate-[12deg]",
                      "origin-center",
                      "z-20"
                    )} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 relative mx-auto w-fit">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Books</span>
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-secondary to-transparent"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {FEATURED_BOOKS.map((book) => (
              <Card 
                key={book.title} 
                className={cn(
                  "crystal group",
                  "hover:shadow-xl transition-all duration-300",
                  "transform hover:-translate-y-2"
                )}
              >
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-foreground/70">
                    {book.description}
                  </CardDescription>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-8">
                      <Button 
                        asChild 
                        className={cn(
                          "metallic",
                          "bg-primary text-primary-foreground",
                          "text-lg px-8 py-6"
                        )}
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
      <section className="bg-gradient-to-br from-accent/20 via-secondary/5 to-background py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <Image 
              src="/author-photo.jpg" 
              alt="Amber Allee" 
              width={500} 
              height={600} 
              className="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Amber Allee</span>
            </h2>
            <p className="text-xl text-foreground/80">
              Amber Allee is a USA Today bestselling author known for her heart-stopping mafia romance novels. 
              With a passion for complex characters and edge-of-your-seat storytelling, she creates worlds 
              where love conquers even the darkest of circumstances.
            </p>
            <Button 
              asChild 
              className={cn(
                "metallic",
                "bg-primary text-primary-foreground",
                "shadow-lg hover:shadow-xl transition-all duration-300"
              )}
            >
              <Link href="/about">Read Full Bio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-background py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connected</span>
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Get exclusive updates, sneak peeks, and special offers straight to your inbox.
          </p>
          <div className="max-w-xl mx-auto">
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={cn(
                  "flex-grow px-4 py-3 rounded-md crystal",
                  "border-accent/20 focus:border-accent",
                  "focus:ring-2 focus:ring-accent focus:ring-offset-2",
                  "transition-all duration-300",
                  "placeholder:text-foreground/60"
                )}
              />
              <Button 
                className={cn(
                  "metallic",
                  "bg-primary text-primary-foreground",
                  "shadow-lg hover:shadow-xl transition-all duration-300"
                )}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-accent/10 via-secondary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Readers</span> Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card 
                key={index} 
                className={cn(
                  "crystal group",
                  "hover:shadow-xl transition-all duration-300"
                )}
              >
                <CardContent className="p-6 text-center relative">
                  <div className="absolute top-4 left-4 text-6xl font-serif text-primary/10 group-hover:text-primary/20 transition-colors">"</div>
                  <p className="text-xl italic text-foreground/80 mb-4 relative z-10">"{testimonial.quote}"</p>
                  <p className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{testimonial.author}</p>
                  <p className="text-foreground/60">{testimonial.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Blog Posts
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-secondary/30"></span>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card 
                key={post.title} 
                className={cn(
                  "crystal group",
                  "hover:shadow-xl transition-all duration-300"
                )}
              >
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/60">
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">{post.excerpt}</p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className={cn(
                      "crystal",
                      "border-accent hover:bg-accent/10",
                      "shadow-sm hover:shadow-md transition-all duration-300"
                    )}
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
              className={cn(
                "metallic",
                "bg-primary text-primary-foreground",
                "shadow-lg hover:shadow-xl transition-all duration-300"
              )}
            >
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-foreground/60">&copy; 2024 Amber Allee. All Rights Reserved.</p>
          <div className="space-x-6">
            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors">TikTok</Link>
            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
