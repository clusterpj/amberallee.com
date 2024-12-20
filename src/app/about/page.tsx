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
                    Author of The Las Vegas Mafia Series
                  </p>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Crafting stories filled with romance, drama, and suspense featuring 
                  hot alpha heroes. Join her in exploring the thrilling world of 
                  mafia romance.
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
                  Amber Allee is a brand-new author who made her debut with "The Prince" in 
                  February 2024, followed by "Hidden Queen" in June 2024. These books are part 
                  of her thrilling Las Vegas Mafia Series, with the final book set to release 
                  early 2025.
                </p>
                <p>
                  While she started writing in 2015, Amber recently took the bold step to share 
                  her stories with the world. She lives in Texas with her husband and two kids, 
                  in the same town she grew up in. When not writing, you can find her curled up 
                  under blankets reading, playing games with her family, traveling, or shopping.
                </p>
                <p>
                  A lover of animal print and everything bling, Amber brings her vibrant 
                  personality to her writing, creating stories that capture readers' hearts 
                  with their blend of romance, drama, and suspense.
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

      {/* Upcoming Events Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-primary">
                Upcoming Events
              </h2>
              <p className="text-xl text-highlight2">
                Meet Amber in 2025
              </p>
            </div>

            <div className="grid gap-8">
              <div className="p-6 rounded-xl bg-highlight2/5 border border-highlight1/20">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Motorcycles Mobsters & Mayhem
                </h3>
                <div className="space-y-2">
                  <p className="text-highlight2">March 15, 2025</p>
                  <p className="text-muted-foreground">Frisco, TX</p>
                  <a 
                    href="https://motorcyclesmobstersandmayhem.com" 
                    className="text-highlight1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Event Website
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-highlight2/5 border border-highlight1/20">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Kiss and Tell Book Event
                </h3>
                <div className="space-y-2">
                  <p className="text-highlight2">June 21, 2025</p>
                  <p className="text-muted-foreground">Grapevine, TX</p>
                  <a 
                    href="https://kissandtelltx.com" 
                    className="text-highlight1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Event Website
                  </a>
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
