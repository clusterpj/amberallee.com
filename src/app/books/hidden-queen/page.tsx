import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HiddenQueenPage() {
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
                    src="/hidden-queen-cover.jpg"
                    alt="Hidden Queen Book Cover"
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
                    Hidden Queen
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
                    It's Sin City, what could go wrong? When Kendall Drake defies her guardians' warning and arrives in Las Vegas, 
                    she finds herself caught between ambition and desire in a world of power, secrets, and hidden dangers.
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
                        Series: Las Vegas Elite Series (Book 1)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Paperback: 380 pages
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Genre: Mafia Romance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Tropes: Forced Proximity, Secrets, Found Family, Blind Date, Strong Female Heroine, Hidden Identity
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        Publication Date: February 2024
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
                      href="https://www.amazon.com/Hidden-Queen-Las-Vegas-Mafia-ebook/dp/B0D3KMQ8XQ?ref_=ast_author_dp"
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
              "You have your whole life ahead of you and I won't let you throw it away to that awful place. 
              The answer is no. I'm not going to say it again."
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              When Kendall Drake disregards her guardians' warning and arrives in Las Vegas to accept the summer 
              internship of a lifetime, she doesn't expect to meet Wyatt Dawson. Arrogant, rich, and exceedingly 
              handsome, he is a delicious distraction that she does not need as she tries to make a name for herself 
              in a male-dominated industry. As she juggles her new position and Wyatt's irresistible seduction while 
              pretending to be on summer vacation with her friend, Harper, she finds herself caught in a world she 
              never knew actually existed. Power plays, secrets, deception, and murder. Kendall soon realizes she's 
              bit off more than she can chew when her new life becomes entangled with the life she once led.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Who is Wyatt really? Why was she told not to come to Sin City? Danger follows her every move and 
              the ghosts of her past lurk in the shadows waiting to tie up loose ends.
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
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  "Your eyes set you apart from everyone else in this world."<br/>
                  <span className="text-pink-600 mt-2 block">- Wyatt</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  "In such a short amount of time you've worked yourself into my whole being and I can't picture a life that doesn't have you by my side."<br/>
                  <span className="text-pink-600 mt-2 block">- Wyatt</span>
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
