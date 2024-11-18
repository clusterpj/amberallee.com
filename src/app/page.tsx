import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex flex-col">
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image 
            src="/amber-allee-logo.png" 
            alt="Amber Allee Logo" 
            width={150} 
            height={50} 
            className="rounded-lg"
          />
        </div>
        <nav className="space-x-4">
          <Link href="/books" className="text-gray-800 hover:text-pink-600">Books</Link>
          <Link href="/blog" className="text-gray-800 hover:text-pink-600">Blog</Link>
          <Link href="/events" className="text-gray-800 hover:text-pink-600">Events</Link>
        </nav>
      </header>

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
            <Link 
              href="/books" 
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
            >
              Explore Books
            </Link>
            <Link 
              href="/newsletter" 
              className="border border-pink-600 text-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 transition"
            >
              Join Newsletter
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image 
            src="/latest-book-cover.jpg" 
            alt="Latest Book Cover" 
            width={400} 
            height={600} 
            className="rounded-xl shadow-2xl transform hover:scale-105 transition"
          />
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">&copy; 2024 Amber Allee. All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-800 hover:text-pink-600">Instagram</a>
            <a href="#" className="text-gray-800 hover:text-pink-600">TikTok</a>
            <a href="#" className="text-gray-800 hover:text-pink-600">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
