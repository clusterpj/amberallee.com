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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12 text-gray-900">
            Author <span className="text-pink-600">Blog</span>
          </h1>

          <div className="space-y-8">
            {BLOG_POSTS.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-pink-600">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {post.readTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{post.excerpt}</p>
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
