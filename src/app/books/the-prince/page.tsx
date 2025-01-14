'use client'

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function ThePrincePage() {
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
          .eq('title', 'The Prince: Falcone Family')
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
                    src="/the-prince-cover.jpg"
                    alt="The Prince Book Cover"
                    fill
                    className={cn(
                      "object-cover",
                      "transform transition-transform duration-500",
                      "group-hover:scale-105"
                    )}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 hover:bg-primary text-white">
                      Book 1
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
                    {book?.title || 'The Prince: Falcone Family'}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-muted-foreground">
                      {book?.series || 'Las Vegas Mafia Series'}
                    </Badge>
                    {(book?.categories || ['Romance']).map((category: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-muted-foreground">
                        {category}
                      </Badge>
                    ))}
                  </div>
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
                    <a href="https://www.amazon.com/Prince-Las-Vegas-Mafia-ebook/dp/B0CVV5XRK1" 
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
                    {(book?.teasers || []).map((teaser: string, index: number) => (
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
                          <dd className="text-foreground font-medium">#{book?.series_order || '1'}</dd>
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
                  <div className="space-y-4 text-foreground/80">
                    <p className="text-lg leading-relaxed">
                      Luca Falcone has been groomed to be the next Don of his mafia family in Las Vegas. 
                      His entire life has been about becoming the man his father can be proud to hand his 
                      legacy to. The one rule to survive: leave no witnesses. But what happens when Luca 
                      breaks that rule? That choice alters the course of his life and puts his entire 
                      future at risk. Can he leave his family's legacy behind, or will the mafia catch 
                      up to him and threaten the new future he is trying to build?
                    </p>
                    <p className="text-lg leading-relaxed">
                      Gemma Barone has been dealt a horrible hand in life, but during the spring break 
                      of her senior year in college, she meets a man who changes everything with a 
                      whirlwind romance. As she settles into her new relationship, ugly truths and 
                      haunting mysteries are revealed about the man she now can't live without. Will 
                      she be strong enough to survive the lies and betrayals of what she thought was 
                      her fairy tale love story, or will life, once again, deal her a losing hand?
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
