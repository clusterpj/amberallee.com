'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">About Amber Allee</h3>
          <p className="text-gray-300">
            Romance author specializing in mafia romance novels. 
            Passionate storytelling with suspense and drama.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">Quick Links</h3>
          <nav className="space-y-2">
            <Link href="/books" className="block text-gray-300 hover:text-pink-400">Books</Link>
            <Link href="/events" className="block text-gray-300 hover:text-pink-400">Events</Link>
            <Link href="/contact" className="block text-gray-300 hover:text-pink-400">Contact</Link>
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">Stay Connected</h3>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button 
              type="submit" 
              className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-gray-700">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Amber Allee. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
