import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Mafia Romance <br />
            <span className="text-pink-600">Where Passion Meets Danger</span>
          </h1>
          <p className="text-xl text-gray-700">
            Dive into the dark, passionate world of Amber Allee's novels. 
            Suspense, romance, and edge-of-your-seat storytelling await.
          </p>
          <div className="flex space-x-4">
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/books">Explore Books</Link>
            </Button>
            <Button asChild variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
              <Link href="/newsletter">Join Newsletter</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-sm shadow-2xl transform hover:scale-105 transition">
            <CardHeader>
              <CardTitle className="text-center text-pink-600">Latest Release</CardTitle>
            </CardHeader>
            <CardContent>
              <Image 
                src="/latest-book-cover.jpg" 
                alt="Latest Book Cover" 
                width={400} 
                height={600} 
                className="rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">&copy; 2024 Amber Allee. All Rights Reserved.</p>
          <div className="space-x-4">
            <Link href="#" className="text-gray-800 hover:text-pink-600">Instagram</Link>
            <Link href="#" className="text-gray-800 hover:text-pink-600">TikTok</Link>
            <Link href="#" className="text-gray-800 hover:text-pink-600">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
