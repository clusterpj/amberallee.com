'use client'

import Link from 'next/link'
import { useCoreBill } from '@/context/CoreBillContext'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

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
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
