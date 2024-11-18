import { Inter } from 'next/font/google'
import { CoreBillProvider } from '@/context/CoreBillContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CoreBillProvider>
          {children}
        </CoreBillProvider>
      </body>
    </html>
  );
}
