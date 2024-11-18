import DashboardStats from '@/components/admin/DashboardStats'
import { fetchDashboardStats } from '@/lib/dashboard-stats'

export default async function AdminDashboardPage() {
  const stats = await fetchDashboardStats()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStats 
          title="Total Books" 
          value={stats.totalBooks.toString()} 
          icon="📚" 
        />
        <DashboardStats 
          title="Blog Posts" 
          value={stats.totalBlogPosts.toString()} 
          icon="✍️" 
        />
        <DashboardStats 
          title="Upcoming Events" 
          value={stats.upcomingEvents.toString()} 
          icon="🗓️" 
        />
      </div>
    </div>
  )
}
