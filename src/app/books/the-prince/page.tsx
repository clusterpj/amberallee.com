import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThePrincePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Decorative Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="relative group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                  <Image 
                    src="/the-prince-cover.jpg"
                    alt="The Prince Book Cover"
                    fill
                    className={cn(
                      "object-cover shadow-2xl",
                      "transform transition-transform duration-500",
                      "group-hover:scale-105"
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-t from-black/60 to-transparent",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-500"
                  )} />
                </div>
              </div>
              
              {/* Book Details */}
              <div className="space-y-8">
                {/* Title and Author */}
                <div className="space-y-2">
                  <h1 className={cn(
                    "text-5xl font-bold",
                    "bg-gradient-to-r from-primary to-secondary",
                    "bg-clip-text text-transparent",
                    "crystal sparkle"
                  )}>
                    The Prince
                  </h1>
                  <p className="text-xl text-foreground/80">By Amber Allee</p>
                </div>

                {/* Price and Description */}
                <div className="space-y-4">
                  <p className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      $16.99
                    </span>
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Enter the dangerous world of the Las Vegas mafia with the first book in the Falcone Family series. 
                    A gripping tale of power, loyalty, and forbidden love that will keep you on the edge of your seat.
                  </p>
                </div>

                {/* Book Details List */}
                <Card className={cn(
                  "bg-background/50 backdrop-blur-sm",
                  "border border-primary/10",
                  "hover:border-primary/20 transition-colors"
                )}>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Book Details
                    </h3>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Series: Las Vegas Mafia Series (Book 1)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Paperback: 400 pages
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Genre: Mafia Romance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Publication Date: March 2024
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className={cn(
                      "metallic",
                      "bg-primary text-primary-foreground",
                      "text-lg px-8 py-6",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-300"
                    )}
                  >
                    Purchase Now
                  </Button>
                  <Button 
                    asChild
                    className={cn(
                      "bg-[#FF9900] text-white",
                      "hover:bg-[#FF9900]/90",
                      "text-lg px-8 py-6",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-300"
                    )}
                  >
                    <a 
                      href="https://www.amazon.com/Prince-Las-Vegas-Mafia-ebook/dp/B0CVV5XRK1?ref_=ast_author_dp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Buy on Amazon
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Description */}
      <div className="mt-16 space-y-8">
        <Card className={cn(
          "bg-background/50 backdrop-blur-sm",
          "border border-primary/10",
          "hover:border-primary/20 transition-colors"
        )}>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About the Book
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Luca Falcone has been groomed to be the next Don of his mafia family in Las Vegas. His entire 
              life has been about becoming the man his father can be proud to hand his legacy to. The one rule 
              to survive: leave no witnesses. But what happens when Luca breaks that rule? That choice alters 
              the course of his life and puts his entire future at risk.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Gemma Barone has been dealt a horrible hand in life, but during the spring break of her senior 
              year in college, she meets a man who changes everything with a whirlwind romance. As she settles 
              into her new relationship, ugly truths and haunting mysteries are revealed about the man she now 
              can't live without. Will she be strong enough to survive the lies and betrayals of what she 
              thought was her fairy tale love story, or will life, once again, deal her a losing hand?
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Book Teasers */}
      <div className="mt-16">
        <Card className={cn(
          "bg-background/50 backdrop-blur-sm",
          "border border-primary/10",
          "hover:border-primary/20 transition-colors"
        )}>
          <CardContent className="p-6 space-y-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Teasers
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  "Do you always speak to others like that?" She asks.<br/>
                  "Like what?"<br/>
                  "Order people around. Command them to do what you want."<br/>
                  I pause for a moment.<br/>
                  She doesn't know I was raised to give orders and commands for others to follow.<br/>
                  "Does that bother you?"<br/>
                  She blushes. "I kinda like it."
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  "Do you have a work thing while we're here?"<br/>
                  "No work. I'm all yours while we're here."<br/>
                  "Then what are we attending?" I ask.<br/>
                  "A wedding."<br/>
                  "Oh, that sounds like fun."<br/>
                  "It will be. You are going to love it."<br/>
                  "Whose wedding is it?" Wondering if it's an employee.<br/>
                  Luca smirks, "Ours."
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  A figure runs across the rainy windows of the study. My body immediately on high alert. 
                  Moments later the door bursts open and Cassio huffs out of breath.<br/>
                  "She ran."<br/>
                  My legs spring towards the doors where Gemma just bolted. I take off in a dead run.<br/>
                  She's running scared.<br/>
                  She's running from me.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back to Books Link */}
      <div className="mt-12 text-center">
        <Button 
          asChild
          variant="outline"
          className={cn(
            "border border-primary/10",
            "text-primary",
            "hover:bg-primary/10",
            "transition-all duration-300"
          )}
        >
          <Link href="/books">Back to All Books</Link>
        </Button>
      </div>
    </div>
  )
}
