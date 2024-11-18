import React from 'react'
import AdminNavigation from './AdminNavigation'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
        {children}
      </main>
    </div>
  )
}
