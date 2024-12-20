import { Inter } from 'next/font/google'
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import ConditionalBanner from '@/components/layout/ConditionalBanner'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CoreBillProvider>
          <Header />
          <ConditionalBanner />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CoreBillProvider>
      </body>
    </html>
  )
}
