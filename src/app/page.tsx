import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { NewsletterPopup } from "@/components/ui/NewsletterPopup"
import { SocialBar } from "@/components/ui/SocialBar"

const FEATURED_BOOKS = [
  {
    title: "The Prince",
    cover: "/the-prince-cover.jpg",
    description: "First book in the Las Vegas Mafia Series - A story of power, loyalty, and forbidden love.",
    link: "/books/the-prince",
    excerpt: "In the glittering city of Las Vegas, where power is the ultimate currency, Dante Romano rules his empire with an iron fist. But when a mysterious woman from his past resurfaces, he finds himself caught between duty and desire, forced to confront the true meaning of loyalty.",
    details: {
      series: "Las Vegas Mafia Series, Book 1"
    }
  },
  {
    title: "Hidden Queen",
    cover: "/hidden-queen-cover.jpg",
    description: "A dark romance that will keep you on the edge of your seat.",
    link: "/books/hidden-queen",
    excerpt: "She was meant to be just another pawn in his game. But when Alessandro discovers the truth about the woman he's been hunting, everything changes. Now, he must decide between his thirst for revenge and the undeniable pull of a love that could destroy them both.",
    details: {
      series: "Las Vegas Elite Series, Book 1"
    }
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
      <NewsletterPopup />
      <SocialBar />
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
      <section className="relative py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,227,249,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(209,227,249,0.05),transparent_50%)]" />
        
        <div className="container px-4 mx-auto relative">
          <div className="text-center mb-16 space-y-4">
            <h2 className={cn(
              "text-5xl font-bold",
              "bg-gradient-to-r from-primary via-secondary to-accent",
              "bg-clip-text text-transparent",
              "animate-gradient-x"
            )}>
              Featured Books
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover stories that will captivate your heart and keep you turning pages late into the night
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1800px] mx-auto">
            {FEATURED_BOOKS.map((book) => (
              <div key={book.title} className="group perspective-[2000px]">
                <div className={cn(
                  "relative h-full",
                  "transform-gpu transition-all duration-700",
                  "group-hover:scale-[1.02] group-hover:rotate-y-[-4deg]",
                  "rounded-xl overflow-hidden",
                  "bg-gradient-to-br from-background to-accent/5",
                  "border border-accent/10",
                  "shadow-[0_0_15px_rgba(209,227,249,0.1)]",
                  "group-hover:shadow-[0_0_30px_rgba(209,227,249,0.2)]"
                )}>
                  {/* Decorative gradient overlay */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent",
                    "transition-opacity duration-700",
                    "pointer-events-none"
                  )} />

                  <div className="flex flex-col lg:min-h-[1000px]">
                    {/* Book Cover Container */}
                    <div className="relative w-full px-6 pt-8 pb-4">
                      {/* Book Cover Wrapper with max-width constraint */}
                      <div className="relative mx-auto" style={{ width: '500px', maxWidth: '100%', aspectRatio: '2/3' }}>
                        <div className={cn(
                          "absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl",
                          "opacity-0 group-hover:opacity-100",
                          "transition-all duration-700 ease-in-out",
                          "blur-xl"
                        )} />
                        <div className="relative w-full h-full">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            className={cn(
                              "object-cover rounded-lg",
                              "transform-gpu transition-all duration-700",
                              "group-hover:scale-[1.02]",
                              "shadow-xl"
                            )}
                            priority
                            sizes="(max-width: 768px) 90vw, (max-width: 1800px) 45vw, 500px"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex flex-col flex-grow p-8 space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className={cn(
                            "text-3xl font-bold mb-2 text-center lg:text-left",
                            "bg-gradient-to-r from-primary to-secondary",
                            "bg-clip-text text-transparent"
                          )}>
                            {book.title}
                          </h3>
                          <p className="text-lg text-foreground/70 text-center lg:text-left">
                            {book.details.series}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <p className="text-lg text-foreground/90 leading-relaxed italic">
                            "{book.description}"
                          </p>
                          <p className="text-foreground/80 leading-relaxed">
                            {book.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Link href={book.link}>
                          <Button 
                            className={cn(
                              "w-full",
                              "bg-gradient-to-r from-primary to-secondary",
                              "text-white font-semibold text-lg py-6",
                              "transform-gpu transition-all duration-300",
                              "hover:scale-[1.02] hover:shadow-lg",
                              "group/button relative overflow-hidden"
                            )}
                          >
                            <span className="relative z-10">Explore Book</span>
                            <div className={cn(
                              "absolute inset-0",
                              "bg-gradient-to-r from-secondary to-primary",
                              "opacity-0 group-hover/button:opacity-100",
                              "transition-opacity duration-300"
                            )} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,227,249,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(209,227,249,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">
              {/* Author Image Column */}
              <div className="relative order-2 lg:order-1">
                <div className="relative group">
                  {/* Decorative Elements */}
                  <div className={cn(
                    "absolute -inset-4 rounded-xl",
                    "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20",
                    "opacity-0 group-hover:opacity-100 blur-xl",
                    "transition-all duration-700"
                  )} />
                  <div className={cn(
                    "absolute -inset-0.5 rounded-xl",
                    "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20",
                    "opacity-0 group-hover:opacity-100",
                    "transition-all duration-700"
                  )} />
                  
                  {/* Main Image */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image 
                      src="/author-photo.jpg" 
                      alt="Amber Allee" 
                      fill
                      className={cn(
                        "object-cover",
                        "transform-gpu transition-all duration-700",
                        "group-hover:scale-[1.02]",
                        "rounded-xl"
                      )}
                    />
                  </div>
                </div>

                {/* Decorative Quote */}
                <div className={cn(
                  "absolute -bottom-8 -right-8 lg:-right-16",
                  "bg-white/90 backdrop-blur-sm",
                  "p-6 rounded-xl shadow-lg",
                  "max-w-xs",
                  "transform-gpu transition-all duration-500",
                  "hover:scale-[1.02] hover:shadow-xl"
                )}>
                  <p className="text-foreground/80 italic text-sm leading-relaxed">
                    "Writing romance is about exploring the depths of human connection and the transformative power of love."
                  </p>
                  <p className="text-primary font-semibold mt-2">- Amber Allee</p>
                </div>
              </div>

              {/* Content Column */}
              <div className="order-1 lg:order-2 space-y-8">
                <div className="space-y-4">
                  <h2 className={cn(
                    "text-4xl lg:text-5xl font-bold",
                    "bg-gradient-to-r from-primary via-secondary to-accent",
                    "bg-clip-text text-transparent",
                    "animate-gradient-x"
                  )}>
                    Meet Amber Allee
                  </h2>
                  <p className="text-xl text-foreground/70 leading-relaxed">
                    USA Today Bestselling Author
                  </p>
                </div>

                <div className="space-y-6 text-foreground/80">
                  <p className="text-lg leading-relaxed">
                    Amber Allee is a passionate storyteller who weaves intricate tales of love, power, and redemption. 
                    Her mafia romance novels have captivated readers worldwide with their blend of intense passion and 
                    heart-stopping suspense.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Based in the heart of romance writing, Amber draws inspiration from the complex dynamics of 
                    relationships and the transformative journey of finding love in unexpected places. Her stories 
                    feature strong, complex characters who must navigate the dangerous waters of loyalty, betrayal, 
                    and passion.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    className={cn(
                      "bg-gradient-to-r from-primary to-secondary",
                      "text-white font-semibold",
                      "transform-gpu transition-all duration-300",
                      "hover:scale-[1.02] hover:shadow-lg",
                      "text-lg py-6 px-8",
                      "group relative overflow-hidden"
                    )}
                  >
                    <Link href="/about">
                      <span className="relative z-10">Read Full Bio</span>
                      <div className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r from-secondary to-primary",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-300"
                      )} />
                    </Link>
                  </Button>

                  <Button 
                    asChild
                    variant="outline"
                    className={cn(
                      "border-accent hover:bg-accent/10",
                      "text-lg py-6 px-8",
                      "transform-gpu transition-all duration-300",
                      "hover:scale-[1.02]"
                    )}
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
