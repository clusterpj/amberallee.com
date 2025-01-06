'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const popupSeen = localStorage.getItem('newsletter_popup_seen');
    if (!popupSeen) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('newsletter_popup_seen', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl m-4 animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Get Your Free E-Book!</h2>
          <p className="text-gray-600 mb-3">
            Subscribe to our newsletter and receive a free e-book instantly!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Stay updated with exclusive content, new releases, and special offers.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-secondary hover:bg-secondary-hover transition-colors rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
