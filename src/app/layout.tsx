import Banner from '@/components/layout/Banner'
import { SocialBar } from '@/components/ui/SocialBar'
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans">
        <CoreBillProvider>
          <Header />
          <Banner />
          <SocialBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CoreBillProvider>
      </body>
    </html>
  );
}
