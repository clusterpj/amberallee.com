import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.slug, params.slug)
  })

  if (!post) {
    return {
      title: 'Post Not Found | Amber Allee'
    }
  }

  return {
    title: `${post.title} | Amber Allee`,
    description: post.excerpt || post.content.substring(0, 160)
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.slug, params.slug),
    with: {
      author: true
    }
  })

  if (!post || (!post.isPublished && post.publishedAt > new Date())) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {post.featuredImage && (
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <article className="prose prose-rose lg:prose-xl mx-auto">
        <h1 className="font-playfair">{post.title}</h1>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <span>{post.author.name}</span>
          <span>•</span>
          <time dateTime={post.publishedAt?.toISOString()}>
            {formatDate(post.publishedAt!)}
          </time>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}
