import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-playfair mb-4">Post Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/blog">Back to Blog</Link>
      </Button>
    </div>
  )
}
