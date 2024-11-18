import { Metadata } from 'next'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'
import { desc, eq, and, lte } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog | Amber Allee',
  description: 'Latest news, updates and insights from romance author Amber Allee'
}

async function getPublishedPosts() {
  return await db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.isPublished, true),
        lte(blogPosts.publishedAt, new Date())
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-playfair mb-8 text-center">Blog</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {post.featuredImage && (
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-playfair">{post.title}</CardTitle>
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
