'use client'

import Link from 'next/link'
import { useCoreBill } from '@/context/CoreBillContext'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'Events' }
]

export default function Header() {
  const { isAuthenticated } = useCoreBill()
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          Amber Allee
        </Link>
        
        <nav className="space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`
                text-gray-800 hover:text-pink-600 transition-colors
                ${pathname === item.href ? 'font-bold text-pink-600' : ''}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link 
              href="/admin/dashboard" 
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
