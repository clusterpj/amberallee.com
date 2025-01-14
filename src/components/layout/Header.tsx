'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LayoutDashboard, Settings, ShoppingBag, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
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
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      router.push('/')
      router.refresh()
    }
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
    { name: 'Admin Dashboard', href: '/admin/dashboard', role: ['admin'] },
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
            {!loading && (
              <>
                {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 px-4 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-[#004AAD]/10 hover:border-[#004AAD]/20 transition-all flex items-center gap-2"
                  >
                    <User className="h-5 w-5 text-[#004AAD] flex-shrink-0" />
                    <span className="text-[#004AAD] font-medium truncate max-w-[120px]">
                      {user?.email ? user.email.split('@')[0] : 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg">
                  <DropdownMenuItem>
                    <Link 
                      href="/admin/dashboard"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "px-6 py-2 rounded-full text-base font-semibold transition-all duration-300",
                  "bg-gradient-to-r from-[#004AAD] to-[#69AAD4] text-white",
                  "hover:from-[#00388A] hover:to-[#4F8DB4] hover:shadow-lg",
                  "active:scale-95 transform transition-transform",
                  "relative overflow-hidden group"
                )}
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              {!loading && (
  <>
    {user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#004AAD]/5 transition-colors"
          >
            {user?.email && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
            <User className="h-5 w-5 text-[#004AAD]" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-lg">
          <div className="px-2 py-1.5 text-sm">
            <p className="font-medium text-[#004AAD] truncate">
              {user?.email}
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              {user?.role || 'customer'}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Link 
              href="/admin/dashboard"
              className="w-full flex items-center px-2 py-1.5 hover:text-[#004AAD]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link
        href="/login"
        className={cn(
          "px-6 py-2 rounded-full text-base font-semibold transition-all duration-300",
          "bg-gradient-to-r from-[#004AAD] to-[#69AAD4] text-white",
          "hover:from-[#00388A] hover:to-[#4F8DB4] hover:shadow-lg",
          "active:scale-95 transform transition-transform",
          "relative overflow-hidden group"
        )}
      >
        <span className="relative z-10">Sign In</span>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
