import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminRootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}

export const metadata = {
  title: 'Amber Allee - Admin Dashboard',
  description: 'Administrative dashboard for managing content'
}
