import { Inter } from 'next/font/google'
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import ConditionalBanner from '@/components/layout/ConditionalBanner'
import Footer from '@/components/layout/Footer'
import { SocialBar } from '@/components/ui/SocialBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[url('/patterns/pattern.jpg')] bg-repeat bg-[length:200px_200px] before:content-[''] before:fixed before:inset-0 before:bg-white/80 before:-z-10`}>
        <CoreBillProvider>
          <Header />
          <ConditionalBanner />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <SocialBar />
        </CoreBillProvider>
      </body>
    </html>
  )
}
