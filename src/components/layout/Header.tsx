'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut, isLoading } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Coming Soon', href: '/coming-soon' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ]

  const userNavigation = [
    { name: 'Profile', href: '/profile', role: ['customer', 'admin'] },
    { name: 'Dashboard', href: '/dashboard', role: ['customer'] },
    { name: 'Admin Dashboard', href: '/admin', role: ['admin'] },
    { name: 'Orders', href: '/orders', role: ['customer'] },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className={cn(
              "text-2xl font-bold crystal sparkle relative group",
              "bg-gradient-to-r from-[#004AAD] via-[#69AAD4] to-[#004AAD] bg-clip-text text-transparent",
              "hover:opacity-80 transition-all duration-300"
            )}
          >
            Amber Allee
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Main Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-base font-semibold transition-all duration-300",
                  "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                  "relative group",
                  pathname === item.href ? "text-[#004AAD] font-bold" : "text-muted-foreground"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#004AAD] rounded-full" />
                )}
                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-[#004AAD]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}

            {/* Auth Navigation */}
            {!isLoading && (
              <>
                {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userNavigation
                    .filter(item => item.role.includes(user.role || 'customer'))
                    .map((item) => (
                      <DropdownMenuItem key={item.name}>
                        <Link 
                          href={item.href}
                          className="w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 rounded-full text-base font-semibold transition-all duration-300",
                  "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                  pathname === '/login' ? "text-[#004AAD] font-bold" : "text-muted-foreground"
                )}
              >
                Login
              </Link>
            )}
            </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-full text-base font-semibold transition-all duration-300",
                    "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                    pathname === item.href ? "text-[#004AAD] font-bold bg-[#004AAD]/5" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Auth Navigation */}
              {!isLoading && (
                <>
                  {user ? (
                <>
                  {userNavigation
                    .filter(item => item.role.includes(user.role || 'customer'))
                    .map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-full text-base font-semibold transition-all duration-300",
                          "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                          pathname === item.href ? "text-[#004AAD] font-bold bg-[#004AAD]/5" : "text-muted-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-full text-base font-semibold transition-all duration-300",
                      "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                      "text-muted-foreground"
                    )}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-full text-base font-semibold transition-all duration-300",
                    "hover:text-[#004AAD] hover:bg-[#004AAD]/5",
                    pathname === '/login' ? "text-[#004AAD] font-bold bg-[#004AAD]/5" : "text-muted-foreground"
                  )}
                >
                  Login
                </Link>
              )}
              </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
