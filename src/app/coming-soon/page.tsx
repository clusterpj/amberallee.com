'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CalendarDays, BookOpen, Sparkles } from 'lucide-react'

const UPCOMING_BOOKS = [
  {
    title: "Untitled Book 3",
    series: "Las Vegas Elite Series",
    releaseDate: "Coming Fall 2024",
    coverImage: "/placeholder-cover.jpg",
    description: "The thrilling continuation of the Las Vegas Elite Series. More details coming soon!",
    teaserQuote: "\"Power, passion, and betrayal collide in this explosive next installment...\"",
    status: "In Progress",
    progress: 65 // percentage of completion
  }
]

const TEASERS = [
  {
    title: "Chapter Preview",
    type: "Excerpt",
    content: "Coming soon...",
    releaseDate: "Available in Summer 2024",
    icon: BookOpen
  },
  {
    title: "Character Spotlight",
    type: "Behind the Scenes",
    content: "Meet the new characters joining the Las Vegas Elite world...",
    releaseDate: "Updates Monthly",
    icon: Sparkles
  },
  {
    title: "Exclusive Artwork",
    type: "Visual",
    content: "Special character art and scene illustrations...",
    releaseDate: "Revealed Monthly",
    icon: CalendarDays
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ComingSoonPage() {
  const [activeTab, setActiveTab] = useState<'books' | 'teasers'>('books')

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-neutral-50/80 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold text-center mb-6 bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 bg-clip-text text-transparent"
          >
            Coming Soon
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Get a sneak peek at upcoming releases and exclusive content
          </motion.p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveTab('books')}
              variant={activeTab === 'books' ? 'default' : 'outline'}
              className="px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              Upcoming Books
            </Button>
            <Button
              onClick={() => setActiveTab('teasers')}
              variant={activeTab === 'teasers' ? 'default' : 'outline'}
              className="px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              Teasers & Previews
            </Button>
          </div>

          {/* Upcoming Books Section */}
          {activeTab === 'books' && (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8"
            >
              {UPCOMING_BOOKS.map((book) => (
                <motion.div key={book.title} variants={item}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-md">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="relative h-[400px] md:h-full overflow-hidden bg-gradient-to-br from-stone-100 to-neutral-50">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-neutral-100">
                            <span className="text-6xl mb-4">📚</span>
                            <p className="text-muted-foreground text-center px-4">Cover Reveal Coming Soon</p>
                          </div>
                        )}
                        
                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200">
                          <div 
                            className="h-full bg-stone-700 transition-all duration-1000"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 p-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 rounded-full bg-stone-800 text-white text-sm font-medium">
                              {book.status}
                            </span>
                            <span className="text-muted-foreground">
                              {book.releaseDate}
                            </span>
                          </div>
                          
                          <div>
                            <h2 className="text-3xl font-bold mb-2 text-stone-800">{book.title}</h2>
                            <p className="text-stone-600 font-semibold">{book.series}</p>
                          </div>
                          
                          <p className="text-stone-600 leading-relaxed">
                            {book.description}
                          </p>
                          
                          <blockquote className="border-l-4 border-stone-300 pl-4 italic text-lg text-stone-700">
                            {book.teaserQuote}
                          </blockquote>
                          
                          <div className="pt-4">
                            <p className="text-sm text-stone-500">
                              Writing Progress: {book.progress}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Teasers Section */}
          {activeTab === 'teasers' && (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-3 gap-6"
            >
              {TEASERS.map((teaser) => (
                <motion.div key={teaser.title} variants={item}>
                  <Card className="group h-full hover:shadow-xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 mb-6">
                        {<teaser.icon className="h-6 w-6" />}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-stone-800 group-hover:text-stone-600 transition-colors">
                          {teaser.title}
                        </h3>
                        <p className="text-sm text-stone-600 font-medium">
                          {teaser.type}
                        </p>
                      </div>
                      
                      <p className="text-stone-600">
                        {teaser.content}
                      </p>
                      
                      <div className="pt-4 flex items-center text-sm text-stone-500">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {teaser.releaseDate}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
