import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/utils/supabase/server'


export default async function BookPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  const supabase = await createClient()
  
  // First try to get the book by slug
  let book
  const { data: initialBook, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single()

  // If not found, try to get by ID as fallback
  if (error?.code === 'PGRST116') {
    const { data: fallbackBook, error: fallbackError } = await supabase
      .from('books')
      .select('*')
      .eq('id', slug)
      .single()
    
    if (fallbackError || !fallbackBook) {
      return <div>Book not found</div>
    }
    book = fallbackBook
  } else if (error || !initialBook) {
    return <div>Book not found</div>
  } else {
    book = initialBook
  } else if (error || !book) {
    return <div>Book not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Decorative Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">
                ← Back to Books
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="relative group order-1 md:order-1">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl">
                  {book.cover_image_url && (
                    <Image 
                      src={book.cover_image_url}
                      alt={`${book.title} Book Cover`}
                      fill
                      className={cn(
                        "object-cover",
                        "transform transition-transform duration-500",
                        "group-hover:scale-105"
                      )}
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 hover:bg-primary text-white">
                      Book {book.series_order}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Book Details */}
              <div className="space-y-8 order-2 md:order-2">
                {/* Title and Series */}
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-primary">
                    {book.title}
                  </h1>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">
                    ${(book.price / 100).toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    size="lg"
                    className="w-full bg-[#000000] text-white hover:bg-[#333333]"
                    asChild
                  >
                    <a href={book.purchase_now_button || '#'} target="_blank" rel="noopener noreferrer">
                      Purchase Now
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90"
                    asChild
                  >
                    <a href={book.amazon_link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2"
                    >
                      Buy on Amazon
                    </a>
                  </Button>
                </div>

                {/* Tropes */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary">Tropes</h2>
                  <div className="flex flex-wrap gap-2">
                    {(book.tropes || []).map((trope: string, index: number) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="text-sm bg-secondary/10 hover:bg-secondary/20"
                      >
                        {trope}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Book Details Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary">Book Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="bg-background border border-primary/10">
                      <CardContent className="p-4">
                        <dl className="space-y-1">
                          <dt className="text-sm text-muted-foreground">Series</dt>
                          <dd className="text-foreground font-medium">{book.series}</dd>
                        </dl>
                      </CardContent>
                    </Card>
                    <Card className="bg-background border border-primary/10">
                      <CardContent className="p-4">
                        <dl className="space-y-1">
                          <dt className="text-sm text-muted-foreground">Book</dt>
                          <dd className="text-foreground font-medium">#{book.series_order}</dd>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="mt-16 space-y-8">
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-3xl font-bold text-primary">About the Book</h2>
                  <div className="space-y-4 text-foreground/80">
                    {book.description ? (
                      <p className="text-lg leading-relaxed whitespace-pre-line">
                        {book.description}
                      </p>
                    ) : (
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        No description available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Teasers */}
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-3xl font-bold text-primary">Teasers</h2>
                  <div className="space-y-6">
                    {(book.teasers || []).map((teaser: string, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="text-lg text-foreground/80 italic leading-relaxed whitespace-pre-line">
                          {teaser}
                        </div>
                        <div className="border-b border-primary/10"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
