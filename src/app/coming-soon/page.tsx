'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const UPCOMING_BOOKS = [
  {
    title: "Untitled Book 3",
    series: "Las Vegas Elite Series",
    releaseDate: "Coming Fall 2024",
    coverImage: "/placeholder-cover.jpg", // Replace with actual cover image
    description: "The thrilling continuation of the Las Vegas Elite Series. More details coming soon!",
    teaserQuote: "\"Power, passion, and betrayal collide in this explosive next installment...\"",
    status: "In Progress"
  }
]

const TEASERS = [
  {
    title: "Chapter Preview",
    type: "Excerpt",
    content: "Coming soon...",
    releaseDate: "Available in Summer 2024"
  },
  {
    title: "Character Spotlight",
    type: "Behind the Scenes",
    content: "Meet the new characters joining the Las Vegas Elite world...",
    releaseDate: "Updates Monthly"
  },
  {
    title: "Exclusive Artwork",
    type: "Visual",
    content: "Special character art and scene illustrations...",
    releaseDate: "Revealed Monthly"
  }
]

export default function ComingSoonPage() {
  const [activeTab, setActiveTab] = useState<'books' | 'teasers'>('books')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 py-16 animate-gradient-x">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
            Coming Soon
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get a sneak peek at upcoming releases and exclusive content
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveTab('books')}
              className={`px-8 ${activeTab === 'books' ? 'bg-metallic' : 'bg-white/50'} hover:bg-metallic-hover text-primary font-medium`}
            >
              Upcoming Books
            </Button>
            <Button
              onClick={() => setActiveTab('teasers')}
              className={`px-8 ${activeTab === 'teasers' ? 'bg-metallic' : 'bg-white/50'} hover:bg-metallic-hover text-primary font-medium`}
            >
              Teasers & Previews
            </Button>
          </div>

          {/* Upcoming Books Section */}
          {activeTab === 'books' && (
            <div className="grid gap-8">
              {UPCOMING_BOOKS.map((book) => (
                <Card key={book.title} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-accent/20 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative h-96 md:h-full overflow-hidden bg-accent/10 flex items-center justify-center">
                      {book.coverImage ? (
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center p-8">
                          <span className="text-6xl mb-4">📚</span>
                          <p className="text-muted-foreground">Cover Reveal Coming Soon</p>
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2 p-8">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                            {book.status}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {book.releaseDate}
                          </span>
                        </div>
                        <CardTitle className="text-3xl mb-2 group-hover:text-secondary transition-colors">
                          {book.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-primary/80">
                          {book.series}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground">
                          {book.description}
                        </p>
                        <blockquote className="border-l-4 border-secondary pl-4 italic text-primary/80">
                          {book.teaserQuote}
                        </blockquote>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Teasers Section */}
          {activeTab === 'teasers' && (
            <div className="grid md:grid-cols-3 gap-8">
              {TEASERS.map((teaser) => (
                <Card key={teaser.title} className="group hover:shadow-xl transition-all duration-300 border border-accent/20 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                        {teaser.type}
                      </span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors">
                      {teaser.title}
                    </CardTitle>
                    <CardDescription>
                      {teaser.releaseDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {teaser.content}
                    </p>
                    <Button className="w-full bg-metallic hover:bg-metallic-hover text-primary font-medium group">
                      Notify Me
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
