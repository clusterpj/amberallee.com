import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FEATURED_BOOKS = [
  {
    title: "The Prince",
    cover: "https://m.media-amazon.com/images/I/81xfln5hhtL._SL1500_.jpg",
    link: "/books/the-prince",
    excerpt: "Luca Falcone has been groomed to be the next Don of his mafia family in Las Vegas. When he breaks the one rule to survive - leave no witnesses - his entire future is at risk. Can he leave his family's legacy behind, or will the mafia catch up to him?",
    details: {
      series: "Las Vegas Mafia Series",
      price: 19.99,
      amazonLink: "https://www.amazon.com/Prince-Las-Vegas-Mafia-ebook/dp/B0CVV5XRK1"
    }
  },
  {
    title: "Hidden Queen",
    cover: "https://m.media-amazon.com/images/I/813hDlWZyzL._SL1500_.jpg",
    link: "/books/hidden-queen",
    excerpt: "When Kendall Drake disregards her guardians' warning and arrives in Las Vegas to accept the summer internship of a lifetime, she doesn't expect to meet Wyatt Dawson. As she juggles her new position and Wyatt's irresistible seduction, she finds herself caught in a world of power plays, secrets, deception, and murder.",
    details: {
      series: "Las Vegas Mafia Series",
      price: 19.99,
      amazonLink: "https://www.amazon.com/Hidden-Queen-Las-Vegas-Mafia-ebook/dp/B0D3KMQ8XQ"
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


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full relative py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold title-gradient">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="btn-gold text-black font-bold px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 group"
                >
                  <Link href="/books" className="flex items-center">
                    <span className="text-xl font-bold">Explore Books</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#004AAD] text-[#004AAD] hover:bg-[#004AAD] hover:text-white font-semibold px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#004AAD]/20 group"
                >
                  <Link href="/newsletter" className="flex items-center">
                    Join Newsletter
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Card className="relative group bg-white border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="relative">
                  <CardTitle className="text-center text-2xl font-bold text-primary pb-2 relative title-gradient">
                    Latest Release
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-highlight1"></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative p-6">
                  <div className="relative group/image overflow-hidden rounded-xl">
                    <Image
                      src="https://m.media-amazon.com/images/I/813hDlWZyzL._SL1500_.jpg"
                      alt="Hidden Queen - Latest Release"
                      width={400}
                      height={600}
                      className="rounded-xl shadow-lg transition-all duration-500 ease-in-out group-hover/image:scale-110 group-hover/image:rotate-3 group-hover/image:shadow-xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 bg-highlight2/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-primary title-gradient">
              Featured Books
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover stories that will captivate your heart and keep you turning pages late into the night
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1800px] mx-auto">
            {FEATURED_BOOKS.map((book) => (
              <div key={book.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {book.excerpt}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {book.details.series}
                  </p>
                  <Button
                    asChild
                    className="btn-gold text-black font-bold w-full px-6 py-3"
                  >
                    <Link href={book.link} className="flex items-center justify-center">
                      <span>Explore Book</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1 w-full">
                <div className="relative group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden w-full max-w-[500px] mx-auto">
                    <Image
                      src="/author-photo.jpg"
                      alt="Amber Allee"
                      width={500}
                      height={750}
                      className="object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02] w-full h-full"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 lg:-right-20 bg-white shadow-lg p-6 rounded-xl max-w-xs transition-all duration-300 hover:shadow-xl">
                  <p className="text-highlight2 italic text-sm leading-relaxed">
                    "Writing romance is about exploring the depths of human connection and the transformative power of love."
                  </p>
                  <p className="text-primary font-semibold mt-2">- Amber Allee</p>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <div className="max-w-4xl">
                  <h2 className="text-4xl font-bold mb-2 text-left">Meet Amber Allee</h2>
                  <h3 className="text-xl text-muted-foreground mb-6 text-left">Author of The Las Vegas Mafia Series</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground text-left">
                    From small-town Texas roots to penning steamy mafia romance, debut author Amber Allee burst onto the scene in 2024 with "The Prince" and "Hidden Queen" - the first installments of her Las Vegas Mafia Series. This self-proclaimed lover of animal print and bling brings together sizzling alpha heroes, intense drama, and nail-biting suspense in her work, drawing from nearly a decade of honing her craft before stepping into publishing. When she's not weaving tales of dangerous love, you'll find this family-oriented author curled up with a good book or creating memories with her husband and two children. Her highly anticipated series conclusion is set to release in early 2025.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    variant="secondary"
                  >
                    <Link href="/about">
                      Read Full Bio
                    </Link>
                  </Button>

                  <Button 
                    asChild
                    variant="outline"
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
          <h2 className="text-4xl font-bold text-primary title-gradient mb-6">
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
                variant="secondary"
                size="lg"
                className="bg-[#004AAD] hover:bg-[#69AAD4] text-white font-semibold px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#004AAD]/20 group"
              >
                Subscribe
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary title-gradient text-center mb-12">
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
