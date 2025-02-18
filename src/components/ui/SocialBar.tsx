'use client';

import { Facebook, Users, Instagram, Book } from 'lucide-react';

export function SocialBar() {
  return (
    <div className="fixed right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40 bg-black/60 p-3 rounded-t-2xl rounded-b-2xl">
      {/* Facebook Group */}
      <a
        href="https://www.facebook.com/share/GoP2UGzzWMA78A89/?mibextid=K35XfP"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 group relative
                 hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] border-2 border-transparent hover:border-[#1877F2]"
        aria-label="Facebook Group"
      >
        <Facebook className="w-6 h-6 text-[#1877F2] group-hover:text-[#0d6efd]" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-md
                       text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Facebook Group
        </span>
      </a>

      {/* Goodreads */}
      <a
        href="https://www.goodreads.com/author/show/48624101.Amber_Allee"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 group relative
                 hover:shadow-[0_0_15px_rgba(103,68,25,0.4)] border-2 border-transparent hover:border-[#674419]"
        aria-label="Goodreads"
      >
        <Book className="w-6 h-6 text-[#674419] group-hover:text-[#8B5E34]" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-md
                       text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Goodreads
        </span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/author.amberallee?igsh=dmdoMmw1N3o1cXU5&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 group relative
                 hover:shadow-[0_0_15px_rgba(228,64,95,0.4)] border-2 border-transparent hover:border-[#E4405F]"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 text-[#E4405F] group-hover:text-[#d62e4c]" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-md
                       text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Instagram
        </span>
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@author.amberallee?_t=8rSKePISXdL&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 group relative
                 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] border-2 border-transparent hover:border-black"
        aria-label="TikTok"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 text-black group-hover:text-gray-800"
          fill="currentColor"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-md
                       text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          TikTok
        </span>
      </a>
    </div>
  );
}
