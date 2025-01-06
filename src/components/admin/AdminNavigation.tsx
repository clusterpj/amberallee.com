import Link from 'next/link'

export default function AdminNavigation() {
  return (
    <nav className="w-64 bg-white shadow-md fixed top-20 left-0 bottom-0 z-40">
      <div className="py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Section</h1>
      </div>
      <ul className="py-4 overflow-y-auto h-[calc(100vh-7rem)]">
        <li>
          <Link href="/admin/dashboard" className="block py-2 px-6 hover:bg-gray-100">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/books" className="block py-2 px-6 hover:bg-gray-100">
            Books
          </Link>
        </li>
        <li>
          <Link href="/events" className="block py-2 px-6 hover:bg-gray-100">
            Events
          </Link>
        </li>
        <li>
          <Link href="/logout" className="block py-2 px-6 hover:bg-gray-100 text-red-600">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}
