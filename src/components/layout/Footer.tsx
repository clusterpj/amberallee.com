'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-2xl font-bold title-gradient"
            >
              Amber Allee
            </Link>
            <p className="text-muted-foreground">
              Romance author crafting stories of passion, intrigue, and love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold title-gradient mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-[#004AAD] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-[#004AAD] transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-[#004AAD] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-[#004AAD] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold title-gradient mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com/author.amberallee?igshid=dmdoMmw1N3o1cXU5&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#004AAD] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/GoP2UGzzWMA78A89/?mibextid=K35XfP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#004AAD] transition-colors"
                >
                  Facebook Group
                </a>
              </li>
              <li>
                <a 
                  href="https://www.goodreads.com/author/show/48624101.Amber_Allee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#004AAD] transition-colors"
                >
                  Goodreads
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@author.amberallee?_t=8rSKePISXdL&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#004AAD] transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a 
                  href="https://www.amazon.com/stores/Amber-Allee/author/B0CVV9KV9Z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#004AAD] transition-colors"
                >
                  Amazon Author Page
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold title-gradient mb-4">Newsletter</h3>
            <div id="mc_embed_signup">
              <form 
                action="https://amberallee.us7.list-manage.com/subscribe/post?u=dc20423e7217e6dc92c18be05&amp;id=7c4f90951a&amp;f_id=009aafe0f0" 
                method="post" 
                id="mc-embedded-subscribe-form" 
                name="mc-embedded-subscribe-form" 
                className="validate" 
                target="_self" 
                noValidate
              >
                <div id="mc_embed_signup_scroll" className="space-y-4">
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL" className="sr-only">Email Address</label>
                    <input 
                      type="email" 
                      name="EMAIL" 
                      className="required email w-full px-4 py-3 rounded-md border-accent/20 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 bg-background"
                      id="mce-EMAIL" 
                      required 
                      placeholder="Enter your email"
                    />
                  </div>
                  <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}}>
                    <input type="text" name="b_dc20423e7217e6dc92c18be05_7c4f90951a" tabIndex={-1} value="" />
                  </div>
                  <div className="clear">
                    <Button 
                      type="submit" 
                      name="subscribe" 
                      id="mc-embedded-subscribe"
                      variant="secondary"
                      size="lg"
                      className="w-full bg-[#004AAD] hover:bg-[#69AAD4] text-white font-semibold px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#004AAD]/20 group"
                    >
                      Subscribe
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Amber Allee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
