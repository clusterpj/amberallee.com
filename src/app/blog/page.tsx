import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const BLOG_POSTS = [
  {
    title: "The Art of Writing Mafia Romance",
    excerpt: "Discover how real-world research and imagination blend to create compelling mafia romance stories that captivate readers. From character development to plot twists, learn about the intricate process of crafting these intense love stories.",
    date: "March 15, 2024",
    slug: "writing-mafia-romance",
    readTime: "8 min read",
    category: "Writing Tips"
  },
  {
    title: "Behind the Scenes: Las Vegas Elite Series",
    excerpt: "Take a peek behind the curtain of my latest series and learn about the inspiration behind Hidden Queen. Explore the world-building process and character development that went into creating this thrilling new series.",
    date: "March 1, 2024",
    slug: "las-vegas-elite-series",
    readTime: "6 min read",
    category: "Book Series"
  },
  {
    title: "Romance Writing Tips: Creating Chemistry",
    excerpt: "Learn the secrets to writing sizzling chemistry between your characters that keeps readers turning pages. From subtle glances to heated encounters, discover how to build tension that feels authentic and compelling.",
    date: "February 15, 2024",
    slug: "writing-character-chemistry",
    readTime: "10 min read",
    category: "Writing Tips"
  },
  {
    title: "Meet the Characters: The Prince",
    excerpt: "Get to know Luca Falcone and the complex cast of characters that populate the Las Vegas Mafia Series. Dive deep into their motivations, conflicts, and the relationships that drive the story.",
    date: "February 1, 2024",
    slug: "meet-the-characters-prince",
    readTime: "7 min read",
    category: "Character Spotlight"
  },
  {
    title: "From Idea to Publication: My Writing Journey",
    excerpt: "Follow my personal journey from aspiring writer to published author. Learn about the challenges, victories, and lessons learned along the way to becoming a romance novelist.",
    date: "January 15, 2024",
    slug: "writing-journey",
    readTime: "12 min read",
    category: "Personal"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 py-16 animate-gradient-x">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
            Author Blog
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore writing tips, behind-the-scenes insights, and updates about my latest works
          </p>

          <div className="space-y-8">
            {BLOG_POSTS.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="group hover:shadow-xl transition-all duration-300 border border-accent/20 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {post.readTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center text-secondary font-medium">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
