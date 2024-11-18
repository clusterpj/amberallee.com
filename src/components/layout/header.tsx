import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Amber Allee
          </Link>
          <div className="space-x-6">
            <Link href="/books">Books</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/store">Store</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}