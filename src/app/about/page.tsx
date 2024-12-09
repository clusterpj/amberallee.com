import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-highlight2/5" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-primary">
                    Amber Allee
                  </h1>
                  <p className="text-2xl text-highlight2">
                    USA Today Bestselling Author of Heart-Stopping Romance
                  </p>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Crafting stories that blend passion, suspense, and the raw emotions 
                  of forbidden love. Every page is an invitation to explore the depths 
                  of human connection and the transformative power of love.
                </p>
              </div>

              {/* Author Image */}
              <div className="relative">
                <div className="relative group">
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                    <Image 
                      src="/author-photo.jpg" 
                      alt="Amber Allee" 
                      fill
                      className="object-cover rounded-xl transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center text-primary">
                The Story Behind the Stories
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Amber Allee is a passionate storyteller who weaves intricate tales of love, 
                  power, and redemption. Her journey into the world of romance writing began 
                  with a deep fascination for the complex dynamics of relationships and the 
                  transformative journey of finding love in unexpected places.
                </p>
                <p>
                  Her mafia romance novels have captivated readers worldwide with their blend 
                  of intense passion and heart-stopping suspense. Each story features strong, 
                  complex characters who must navigate the dangerous waters of loyalty, betrayal, 
                  and passion.
                </p>
                <p>
                  As a USA Today bestselling author, Amber has established herself as a master 
                  of the genre, known for creating worlds where love conquers even the darkest 
                  of circumstances. Her writing style combines emotional depth with pulse-pounding 
                  action, keeping readers on the edge of their seats until the very last page.
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="relative p-8 rounded-xl bg-highlight2/5 border border-highlight1/20">
              <div className="absolute -top-4 -left-2 text-6xl text-highlight1">"</div>
              <p className="text-xl italic text-highlight2 text-center">
                Writing romance is about exploring the depths of human connection and the 
                transformative power of love. Every story is a journey into the heart of 
                what makes us human.
              </p>
              <footer className="mt-4 text-right text-highlight2">
                - Amber Allee
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Amazon Book Launch Journey */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-primary">
                The Amazon Journey
              </h2>
              <p className="text-xl text-highlight2">
                A Dream Launch That Became Reality
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Launch Story */}
              <div className="space-y-6">
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    When "The Prince" hit Amazon's virtual shelves, it wasn't just another 
                    book launch – it was the culmination of countless hours of writing, 
                    editing, and dreaming. The response was overwhelming, with readers 
                    immediately connecting with Dante's complex world and the forbidden 
                    romance at its heart.
                  </p>
                  <p>
                    Within hours of its release, "The Prince" began climbing the Amazon 
                    charts, eventually reaching #1 in multiple categories. The success 
                    wasn't just in numbers – it was in the countless messages from readers 
                    who found themselves unable to put the book down, staying up late into 
                    the night to discover how the story would unfold.
                  </p>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-6 rounded-xl text-center bg-highlight2/5 border border-highlight1/20 hover:border-highlight1/40 transition-colors duration-300">
                    <div className="text-3xl font-bold text-primary mb-2">#1</div>
                    <div className="text-sm text-highlight2">
                      Amazon Bestseller in Dark Romance
                    </div>
                  </div>
                  <div className="p-6 rounded-xl text-center bg-highlight2/5 border border-highlight1/20 hover:border-highlight1/40 transition-colors duration-300">
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-highlight2">
                      Copies Sold in First Week
                    </div>
                  </div>
                </div>
              </div>

              {/* Launch Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                    <Image
                      src="/amazon-launch-1.jpg"
                      alt="Amazon Book Launch Celebration"
                      fill
                      className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src="/amazon-launch-2.jpg"
                      alt="Book Signing Event"
                      fill
                      className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8 group">
                  <Image
                    src="/amazon-launch-3.jpg"
                    alt="Readers with The Prince"
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              Let's Connect
            </h2>
            <p className="text-xl text-highlight2">
              Join me on this incredible journey of storytelling. Whether you're a 
              longtime reader or just discovering my books, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className={cn(
                  "bg-highlight1 text-white font-semibold",
                  "transform-gpu transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-lg",
                  "text-lg py-6 px-8",
                  "group relative overflow-hidden"
                )}
              >
                <Link href="/contact">
                  <span className="relative z-10">Get in Touch</span>
                  <div className={cn(
                    "absolute inset-0",
                    "bg-highlight1/50",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-300"
                  )} />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className={cn(
                  "border-highlight1 hover:bg-highlight1/10",
                  "text-lg py-6 px-8",
                  "transform-gpu transition-all duration-300",
                  "hover:scale-[1.02]"
                )}
              >
                <Link href="/newsletter">Join Newsletter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
