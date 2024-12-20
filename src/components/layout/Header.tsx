'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/coming-soon', label: 'Coming Soon' },
  { href: '/contact', label: 'Contact' },
  { href: '/events', label: 'Events' }
]

export default function Header() {
  const { user, signOut, loading } = useAuth()
  const pathname = usePathname()

  // Add timeout to prevent infinite loading state
  const showLoading = loading && !user

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

        {/* User menu */}
        <div className="flex items-center space-x-4">
          {showLoading ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <span className="text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white border border-border/50 shadow-lg rounded-md mt-2 z-[100]"
                sideOffset={5}
              >
                <div className="flex items-center justify-start gap-2 p-3 border-b border-border/50">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.email && (
                      <p className="font-medium">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-1">
                  <DropdownMenuItem 
                    asChild
                    className="w-full px-3 py-2 text-sm cursor-pointer hover:bg-accent/10 rounded-md"
                  >
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem 
                      asChild
                      className="w-full px-3 py-2 text-sm cursor-pointer hover:bg-accent/10 rounded-md"
                    >
                      <Link href="/admin/dashboard">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="w-full px-3 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 rounded-md mt-1"
                    onSelect={(event) => {
                      event.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
