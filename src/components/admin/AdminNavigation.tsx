'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

export default function AdminNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="w-64 bg-white shadow-md fixed top-20 left-0 bottom-0 z-40">
      <div className="py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Section</h1>
      </div>
      <ul className="py-4 overflow-y-auto h-[calc(100vh-7rem)]">
        <li>
          <Link 
            href="/admin/dashboard" 
            className={cn(
              'block py-2 px-6 hover:bg-gray-100',
              isActive('/admin/dashboard') && 'bg-pink-50 font-semibold'
            )}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            href="/admin/books" 
            className={cn(
              'block py-2 px-6 hover:bg-gray-100',
              isActive('/admin/books') && 'bg-pink-50 font-semibold'
            )}
          >
            Books
          </Link>
        </li>
        <li>
          <Link 
            href="/admin/events" 
            className={cn(
              'block py-2 px-6 hover:bg-gray-100',
              isActive('/admin/events') && 'bg-pink-50 font-semibold'
            )}
          >
            Events
          </Link>
        </li>
        <li>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="w-full text-left block py-2 px-6 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
