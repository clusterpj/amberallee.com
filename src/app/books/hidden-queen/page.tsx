'use client'

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function HiddenQueenPage() {
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('title', 'Hidden Queen')
          .single()

        if (error) throw error
        setBook(data)
      } catch (err) {
        setError('Failed to load book data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [])

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
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">
                ← Back to Books
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="relative group order-1 md:order-1">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl">
                  <Image 
                    src="/hidden-queen-cover.jpg"
                    alt="Hidden Queen Book Cover"
                    fill
                    className={cn(
                      "object-cover",
                      "transform transition-transform duration-500",
                      "group-hover:scale-105"
                    )}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 hover:bg-primary text-white">
                      Book 2
                    </Badge>
                  </div>

                  {/* Available Now Banner */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-white px-4 py-2 text-sm shadow-lg">
                      Available Now
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Book Details */}
              <div className="space-y-8 order-2 md:order-2">
                {/* Title and Series */}
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-primary">
                    {book?.title || 'Hidden Queen'}
                  </h1>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">
                    ${book?.price ? (book.price / 100).toFixed(2) : '19.99'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    size="lg"
                    className="w-full bg-[#000000] text-white hover:bg-[#333333]"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Purchase Now
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90"
                    asChild
                  >
                    <a href="https://www.amazon.com/Hidden-Queen-Las-Vegas-Mafia-ebook/dp/B0D3KMQ8XQ" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2"
                    >
                      Buy on Amazon
                    </a>
                  </Button>
                </div>

                {/* Tropes */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary">Tropes</h2>
                  <div className="flex flex-wrap gap-2">
                    {(book?.tropes || []).map((trope: string, index: number) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="text-sm bg-secondary/10 hover:bg-secondary/20"
                      >
                        {trope}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Book Details Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Book Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="bg-background border border-primary/10">
                      <CardContent className="p-4">
                        <dl className="space-y-1">
                          <dt className="text-sm text-muted-foreground">Series</dt>
                          <dd className="text-foreground font-medium">{book?.series || 'Las Vegas Mafia Series'}</dd>
                        </dl>
                      </CardContent>
                    </Card>
                    <Card className="bg-background border border-primary/10">
                      <CardContent className="p-4">
                        <dl className="space-y-1">
                          <dt className="text-sm text-muted-foreground">Book</dt>
                          <dd className="text-foreground font-medium">#{book?.series_order || '2'}</dd>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="mt-16 space-y-8">
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-3xl font-bold text-primary">About the Book</h2>
                  <p className="text-lg text-foreground/90 italic font-medium">
                    It's Sin City, what could go wrong?
                  </p>
                  <div className="space-y-4 text-foreground/80">
                    <p className="text-lg leading-relaxed italic">
                      "You have your whole life ahead of you and I won't let you throw it away to that awful place. 
                      The answer is no. I'm not going to say it again."
                    </p>
                    <p className="text-lg leading-relaxed">
                      When Kendall Drake disregards her guardians' warning and arrives in Las Vegas to accept the summer 
                      internship of a lifetime, she doesn't expect to meet Wyatt Dawson. Arrogant, rich, and exceedingly 
                      handsome, he is a delicious distraction that she does not need as she tries to make a name for herself 
                      in a male-dominated industry. As she juggles her new position and Wyatt's irresistible seduction while 
                      pretending to be on summer vacation with her friend, Harper, she finds herself caught in a world she 
                      never knew actually existed. Power plays, secrets, deception, and murder. Kendall soon realizes she's 
                      bit off more than she can chew when her new life becomes entangled with the life she once led.
                    </p>
                    <p className="text-lg leading-relaxed font-medium">
                      Who is Wyatt really?
                    </p>
                    <p className="text-lg leading-relaxed font-medium">
                      Why was she told not to come to Sin City?
                    </p>
                    <p className="text-lg leading-relaxed">
                      Danger follows her every move and the ghosts of her past lurk in the shadows waiting to tie up loose ends.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Teasers */}
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-3xl font-bold text-primary">Teasers</h2>
                  <div className="space-y-6">
                    {(book?.teasers || []).map((teaser, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-lg text-foreground/80 italic leading-relaxed whitespace-pre-line">
                          {teaser}
                        </div>
                        <div className="border-b border-primary/10"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
