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
    <header className="bg-white border-b border-sage py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Brand name - using blue as primary brand color */}
        <Link href="/" className="text-2xl font-bold text-blue hover:text-blue-light transition-colors">
          Amber Allee
        </Link>
        
        {/* Navigation - using gray for secondary text with blue hover state */}
        <nav className="space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`
                text-gray hover:text-blue transition-colors
                ${pathname === item.href ? 'font-bold text-blue' : ''}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action buttons - using primary blue for CTA */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button 
              asChild 
              className="bg-blue hover:bg-blue-light text-white transition-colors"
            >
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          ) : (
            <Button 
              asChild 
              className="bg-blue hover:bg-blue-light text-white transition-colors"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
