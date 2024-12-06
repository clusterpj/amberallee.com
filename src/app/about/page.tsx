import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,227,249,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h1 className={cn(
                    "text-5xl lg:text-6xl font-bold mb-4",
                    "bg-gradient-to-r from-primary via-secondary to-accent",
                    "bg-clip-text text-transparent",
                    "animate-gradient-x"
                  )}>
                    Amber Allee
                  </h1>
                  <p className="text-2xl text-foreground/70">
                    USA Today Bestselling Author of Heart-Stopping Romance
                  </p>
                </div>
                <p className="text-xl text-foreground/80 leading-relaxed">
                  Crafting stories that blend passion, suspense, and the raw emotions 
                  of forbidden love. Every page is an invitation to explore the depths 
                  of human connection and the transformative power of love.
                </p>
              </div>

              {/* Author Image */}
              <div className="relative">
                <div className="relative group">
                  {/* Decorative Elements */}
                  <div className={cn(
                    "absolute -inset-4 rounded-xl",
                    "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20",
                    "opacity-0 group-hover:opacity-100 blur-xl",
                    "transition-all duration-700"
                  )} />
                  
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-8">
              <h2 className={cn(
                "text-4xl font-bold text-center",
                "bg-gradient-to-r from-primary to-secondary",
                "bg-clip-text text-transparent"
              )}>
                The Story Behind the Stories
              </h2>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
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
            <blockquote className={cn(
              "relative p-8 rounded-xl",
              "bg-gradient-to-br from-accent/10 to-transparent",
              "border border-accent/20"
            )}>
              <div className="absolute -top-4 -left-2 text-6xl text-primary/20">"</div>
              <p className="text-xl italic text-foreground/80 text-center">
                Writing romance is about exploring the depths of human connection and the 
                transformative power of love. Every story is a journey into the heart of 
                what makes us human.
              </p>
              <footer className="mt-4 text-right text-foreground/70">
                - Amber Allee
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Amazon Book Launch Journey */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className={cn(
                "text-4xl font-bold",
                "bg-gradient-to-r from-primary to-secondary",
                "bg-clip-text text-transparent"
              )}>
                The Amazon Journey
              </h2>
              <p className="text-xl text-foreground/70">
                A Dream Launch That Became Reality
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Launch Story */}
              <div className="space-y-6">
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
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
                  <div className={cn(
                    "p-6 rounded-xl text-center",
                    "bg-gradient-to-br from-accent/10 to-transparent",
                    "border border-accent/20"
                  )}>
                    <div className="text-3xl font-bold text-primary mb-2">#1</div>
                    <div className="text-sm text-foreground/70">
                      Amazon Bestseller in Dark Romance
                    </div>
                  </div>
                  <div className={cn(
                    "p-6 rounded-xl text-center",
                    "bg-gradient-to-br from-accent/10 to-transparent",
                    "border border-accent/20"
                  )}>
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-foreground/70">
                      Copies Sold in First Week
                    </div>
                  </div>
                </div>
              </div>

              {/* Launch Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src="/amazon-launch-1.jpg"
                      alt="Amazon Book Launch Celebration"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/amazon-launch-2.jpg"
                      alt="Book Signing Event"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8">
                  <Image
                    src="/amazon-launch-3.jpg"
                    alt="Readers with The Prince"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className={cn(
              "text-4xl font-bold",
              "bg-gradient-to-r from-primary to-secondary",
              "bg-clip-text text-transparent"
            )}>
              Let's Connect
            </h2>
            <p className="text-xl text-foreground/80">
              Join me on this incredible journey of storytelling. Whether you're a 
              longtime reader or just discovering my books, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <Link href="/contact">
                  <span className="relative z-10">Get in Touch</span>
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
                <Link href="/newsletter">Join Newsletter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
