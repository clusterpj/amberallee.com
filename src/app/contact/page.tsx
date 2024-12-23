import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold title-gradient">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have a question or just want to say hello? I'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="p-6 shadow-lg">
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold title-gradient">Send a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and I'll get back to you soon!</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="jane@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can I help you?" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold title-gradient">Connect With Me</h2>
                <p className="text-muted-foreground">
                  Follow me on social media to stay updated with my latest releases, behind-the-scenes content, and more!
                </p>
              </div>

              <div className="space-y-6">
                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media</h3>
                  <div className="grid gap-4">
                    <a
                      href="https://www.instagram.com/author.amberallee?igshid=dmdoMmw1N3o1cXU5&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-background rounded-lg border hover:bg-secondary/5 transition-colors"
                    >
                      <span className="text-xl mr-4">📸</span>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">@author.amberallee</p>
                      </div>
                    </a>
                    <a
                      href="https://www.facebook.com/share/GoP2UGzzWMA78A89/?mibextid=K35XfP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-background rounded-lg border hover:bg-secondary/5 transition-colors"
                    >
                      <span className="text-xl mr-4">👥</span>
                      <div>
                        <p className="font-medium">Facebook Group</p>
                        <p className="text-sm text-muted-foreground">Join the community</p>
                      </div>
                    </a>
                    <a
                      href="https://www.goodreads.com/author/show/48624101.Amber_Allee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-background rounded-lg border hover:bg-secondary/5 transition-colors"
                    >
                      <span className="text-xl mr-4">📚</span>
                      <div>
                        <p className="font-medium">Goodreads</p>
                        <p className="text-sm text-muted-foreground">Follow and review</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-secondary/10 p-6 rounded-lg space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Join My Newsletter</h3>
                    <p className="text-sm text-muted-foreground">
                      Subscribe to get exclusive content, early access to new releases, and special offers!
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Enter your email" className="flex-1" />
                    <Button>Subscribe</Button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Response Time</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Usually within 48 hours</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
