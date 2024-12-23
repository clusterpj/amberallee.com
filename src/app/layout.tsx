import { Inter as FontSans } from 'next/font/google'
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}>
        <CoreBillProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CoreBillProvider>
      </body>
    </html>
  );
}
