import DashboardStats from '@/components/admin/DashboardStats'

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStats 
          title="Total Books" 
          value="12" 
          icon="📚" 
        />
        <DashboardStats 
          title="Blog Posts" 
          value="24" 
          icon="✍️" 
        />
        <DashboardStats 
          title="Upcoming Events" 
          value="3" 
          icon="🗓️" 
        />
      </div>
    </div>
  )
}
