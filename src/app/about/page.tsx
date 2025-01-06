import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-highlight2/5" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-primary">
                    Amber Allee
                  </h1>
                  <p className="text-2xl text-highlight2">
                    Author of The Las Vegas Mafia Series
                  </p>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A passionate storyteller who brings romance, drama, and suspense to life through 
                  her compelling novels featuring irresistible alpha heroes.
                </p>
              </div>

              {/* Author Image */}
              <div className="relative">
                <div className="relative group">
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                    <Image 
                      src="/author-photo.jpg" 
                      alt="Amber Allee" 
                      fill
                      className="object-cover rounded-xl transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="my-8 flex items-center justify-center space-x-4">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        <div className="flex items-center space-x-2">
          <span className="text-pink-400 text-2xl">♥</span>
          <span className="text-pink-300 text-xl">✧</span>
          <span className="text-pink-400 text-2xl">♥</span>
        </div>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
      </div>

      {/* About Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg">
              <h2 className="text-2xl font-semibold title-gradient mb-8">About Amber</h2>
              
              <p className="text-xl leading-relaxed mb-6">
                Amber Allee is a brand-new author making her debut with "The Prince" in February 2024, 
                followed by "Hidden Queen" in June 2024. These captivating novels are part of her 
                Las Vegas Mafia Series, with the final installment set to release in early 2025. 
                While she began her writing journey in 2015, she recently took the exciting step to 
                share her stories with the world.
              </p>

              <p className="text-xl leading-relaxed mb-6">
                She lives in the great state of Texas in the same town she grew up in, sharing her 
                home with her loving husband and two wonderful kids. When she's not crafting 
                her next steamy romance, you'll find Amber curled up under blankets with a good 
                book or enjoying quality time playing games with her family.
              </p>

              <p className="text-xl leading-relaxed">
                A true lover of life's adventures, Amber enjoys traveling and shopping. Her 
                signature style? Animal print and all things bling! This vibrant personality 
                shines through in her writing, where she expertly weaves together romance, 
                drama, and suspense with unforgettable alpha heroes.
              </p>
            </div>

            {/* Latest Releases */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold title-gradient mb-8">Latest Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hidden Queen */}
                <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <Link href="/books/hidden-queen">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Book Cover */}
                        <div className="relative w-full md:w-48 aspect-[2/3] rounded-lg overflow-hidden">
                          <Image
                            src="/hidden-queen-cover.jpg"
                            alt="Hidden Queen Book Cover"
                            fill
                            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary/90 text-white">
                              Latest Release
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Book Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-1">Hidden Queen</h3>
                            <p className="text-muted-foreground">Las Vegas Mafia Series - Book 2</p>
                            <p className="text-sm text-muted-foreground">Released June 27, 2024</p>
                          </div>
                          <div className="space-y-2">
                            <Badge variant="outline" className="mr-2">Mafia Romance</Badge>
                            <Badge variant="outline">Secrets</Badge>
                          </div>
                          <p className="text-foreground/80 line-clamp-3">
                            When Kendall Drake disregards her guardians' warning and arrives in Las Vegas 
                            to accept the summer internship of a lifetime, she doesn't expect to meet Wyatt Dawson...
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-primary">${(19.99).toFixed(2)}</p>
                            <Button variant="link" className="group-hover:text-primary transition-colors">
                              Read More →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>

                {/* The Prince */}
                <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <Link href="/books/the-prince">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Book Cover */}
                        <div className="relative w-full md:w-48 aspect-[2/3] rounded-lg overflow-hidden">
                          <Image
                            src="/the-prince-cover.jpg"
                            alt="The Prince Book Cover"
                            fill
                            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-secondary/90 text-white">
                              Available Now
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Book Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-1">The Prince</h3>
                            <p className="text-muted-foreground">Las Vegas Mafia Series - Book 1</p>
                            <p className="text-sm text-muted-foreground">Released March 21, 2024</p>
                          </div>
                          <div className="space-y-2">
                            <Badge variant="outline" className="mr-2">Mafia Romance</Badge>
                            <Badge variant="outline">Dark Romance</Badge>
                          </div>
                          <p className="text-foreground/80 line-clamp-3">
                            Luca Falcone has been groomed to be the next Don of his mafia family in Las Vegas. 
                            His entire life has been about becoming the man his father can be proud to hand his legacy to...
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-primary">${(19.99).toFixed(2)}</p>
                            <Button variant="link" className="group-hover:text-primary transition-colors">
                              Read More →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </section>

            {/* Contact CTA */}
            <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-primary mb-4">Connect with Amber</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Want to stay updated on new releases and exclusive content?
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="secondary">
                  <Link href="/newsletter">Join Newsletter</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
