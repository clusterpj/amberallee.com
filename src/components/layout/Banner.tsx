'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Banner() {
  const pathname = usePathname()
  
  // Don't show banner on admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    return null
  }

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <Image
        src="/facebook-cover.jpg"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
