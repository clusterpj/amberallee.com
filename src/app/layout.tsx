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
      <body className={`${inter.className} relative flex flex-col min-h-screen`}>
        <div className="fixed inset-0 -z-20 bg-[url('/patterns/pattern.jpg')] bg-repeat bg-[length:400px_400px] opacity-50" />
        <div className="fixed inset-0 -z-10 bg-background/98" />
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
