'use client'

import { usePathname } from 'next/navigation'
import Banner from './Banner'

export default function ConditionalBanner() {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/auth')) {
    return null
  }

  return <Banner />
}
