'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const SIGN_UP_OPTIONS = [
  {
    title: "BETA Reader Team",
    description: "Join my exclusive BETA reader team and help shape my stories before they hit the shelves. Get early access to manuscripts and provide valuable feedback.",
    benefits: [
      "Early access to manuscripts",
      "Direct communication with the author",
      "Shape the development of stories",
      "Special acknowledgments in books",
    ],
    link: "https://forms.gle/your-beta-form-link"
  },
  {
    title: "ARC Team",
    description: "Become an Advanced Reader Copy (ARC) reviewer and get free copies of my books before their release. Help spread the word by leaving honest reviews.",
    benefits: [
      "Free advance copies of new releases",
      "Exclusive content and sneak peeks",
      "Special mention in acknowledgments",
      "Priority access to new releases",
    ],
    link: "https://forms.gle/your-arc-form-link"
  },
  {
    title: "Street Team",
    description: "Join my dedicated street team and become an essential part of my book launch success. Help promote my books and engage with the reading community.",
    benefits: [
      "Exclusive promotional materials",
      "Behind-the-scenes content",
      "Special team-only giveaways",
      "Direct interaction with the author",
    ],
    link: "https://forms.gle/your-street-team-form-link"
  }
]

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 py-16 animate-gradient-x">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
            Join My Teams
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Become part of my inner circle and get exclusive access to content, opportunities, and special perks
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {SIGN_UP_OPTIONS.map((option) => (
              <Card key={option.title} className="group hover:shadow-xl transition-all duration-300 border border-accent/20 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                <CardHeader>
                  <CardTitle className="text-2xl text-center group-hover:text-secondary transition-colors">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {option.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-metallic hover:bg-metallic-hover text-primary font-medium group">
                    <Link href={option.link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
