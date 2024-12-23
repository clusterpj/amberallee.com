import { Inter as FontSans } from 'next/font/google'
>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'
=======
import { Inter as FontSans } from 'next/font/google'
>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
import { CoreBillProvider } from '@/context/CoreBillContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
=======
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
      <body className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}>
>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
=======
      <body className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}>
>>>>>>> 5162041b181874339e1173fbb43964f6b2877298
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
  )
}
