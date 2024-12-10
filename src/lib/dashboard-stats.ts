import { supabase } from '@/lib/supabase'

interface DashboardStats {
  totalBooks: number
  totalBlogPosts: number
  upcomingEvents: number
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const [
      { count: totalBooks = 0 },
      { count: totalBlogPosts = 0 },
      { count: upcomingEvents = 0 }
    ] = await Promise.all([
      supabase
        .from('books')
        .select('*', { count: 'exact', head: true }),
      supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .lte('published_at', new Date().toISOString()),
      supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gt('date', new Date().toISOString())
    ])

    return {
      totalBooks: totalBooks || 0,
      totalBlogPosts: totalBlogPosts || 0,
      upcomingEvents: upcomingEvents || 0
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    
    // Fallback values in case of error
    return {
      totalBooks: 0,
      totalBlogPosts: 0,
      upcomingEvents: 0
    }
  }
}
