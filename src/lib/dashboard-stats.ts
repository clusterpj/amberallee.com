import { sql } from '@vercel/postgres'

interface DashboardStats {
  totalBooks: number
  totalBlogPosts: number
  upcomingEvents: number
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const [booksResult, postsResult, eventsResult] = await Promise.all([
      sql`SELECT COUNT(*) as total FROM books`,
      sql`SELECT COUNT(*) as total FROM blog_posts WHERE published_at <= NOW()`,
      sql`SELECT COUNT(*) as total FROM events WHERE date > NOW()`
    ])

    return {
      totalBooks: parseInt(booksResult.rows[0].total),
      totalBlogPosts: parseInt(postsResult.rows[0].total),
      upcomingEvents: parseInt(eventsResult.rows[0].total)
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
