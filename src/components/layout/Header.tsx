'use client'

import Link from 'next/link'
import { useCoreBill } from '@/context/CoreBillContext'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/coming-soon', label: 'Coming Soon' },
  { href: '/blog', label: 'Blog' },
  { href: '/sign-up', label: 'Sign Up' },
  { href: '/contact', label: 'Contact' },
  { href: '/events', label: 'Events' }
]

export default function Header() {
  const { isAuthenticated } = useCoreBill()
  const pathname = usePathname()

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* Brand name with crystal effect */}
        <Link 
          href="/" 
          className={cn(
            "text-2xl font-bold crystal sparkle",
            "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
            "hover:opacity-80 transition-all duration-300"
          )}
        >
          Amber Allee
        </Link>
        
        {/* Navigation with metallic hover effect */}
        <nav className="space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative py-2 text-foreground/80 hover:text-foreground transition-colors",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
                "after:origin-left after:scale-x-0 hover:after:scale-x-100",
                "after:bg-accent after:transition-transform after:duration-300",
                pathname === item.href && "text-primary font-medium after:scale-x-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action buttons with metallic effect */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button 
              asChild 
              variant="default"
              className={cn(
                "metallic font-medium",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-lg hover:shadow-xl transition-all duration-300"
              )}
            >
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          ) : (
            <Button 
              asChild
              variant="outline" 
              className={cn(
                "crystal font-medium",
                "border-accent hover:bg-accent/10",
                "shadow-sm hover:shadow-md transition-all duration-300"
              )}
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
