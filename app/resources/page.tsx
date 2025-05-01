import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Filter, BookOpen, FileText, Video, Download } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mental Health Resources</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Explore our collection of articles, guides, and resources to support your mental wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-10" />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">Categories</Button>
              <Button variant="outline">Topics</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
          <p className="text-muted-foreground max-w-3xl">
            Our most popular and helpful resources to support your mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Understanding Anxiety"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Mental Health
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Anxiety
                </Badge>
              </div>
              <CardTitle>Understanding Anxiety: Causes and Coping Strategies</CardTitle>
              <CardDescription>May 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Anxiety is a common mental health condition that affects millions worldwide. Learn about its causes and
                effective strategies to manage symptoms.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">8 min read</span>
              </div>
              <Link href="/resources/understanding-anxiety" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Mindfulness Meditation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Wellness
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Mindfulness
                </Badge>
              </div>
              <CardTitle>The Power of Mindfulness in Daily Life</CardTitle>
              <CardDescription>April 28, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Discover how incorporating mindfulness practices into your daily routine can improve mental well-being
                and reduce stress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">6 min read</span>
              </div>
              <Link href="/resources/mindfulness-daily-life" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Supporting Loved Ones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Relationships
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Depression
                </Badge>
              </div>
              <CardTitle>Supporting Loved Ones with Depression</CardTitle>
              <CardDescription>April 10, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Learn how to provide effective support to friends and family members dealing with depression while
                taking care of your own mental health.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">10 min read</span>
              </div>
              <Link href="/resources/supporting-loved-ones" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Resource Categories</h2>
            <p className="text-muted-foreground max-w-3xl">
              Browse resources by category to find information relevant to your interests and needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link href="/resources/category/mental-health-awareness" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Mental Health Awareness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Educational resources about various mental health conditions, symptoms, and treatments.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resources/category/coping-strategies" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Coping Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Practical techniques and approaches for managing stress, anxiety, and other mental health
                    challenges.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resources/category/case-studies" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Case Studies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Real-life examples of mental health journeys and treatment approaches (with privacy maintained).
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resources/category/new-therapies" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    New Therapies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Information about emerging therapeutic approaches and advancements in mental health treatment.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resources/category/psychologist-articles" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Psychologist-written Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expert insights and perspectives from our team of mental health professionals.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/resources/category/self-help" className="group">
              <Card className="h-full transition-all group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Self-Help Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Downloadable worksheets, guides, and tools for self-guided mental health support.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
          <p className="text-muted-foreground max-w-3xl">
            Stay up-to-date with our latest mental health insights and information.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Sleep Hygiene" fill className="object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Wellness
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Sleep
                </Badge>
              </div>
              <CardTitle>Improving Sleep Hygiene for Better Mental Health</CardTitle>
              <CardDescription>April 5, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Explore the connection between sleep and mental health, with practical tips for establishing healthy
                sleep habits.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">7 min read</span>
              </div>
              <Link href="/resources/sleep-hygiene" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Digital Detox" fill className="object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Lifestyle
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Technology
                </Badge>
              </div>
              <CardTitle>Digital Detox: Balancing Technology Use for Mental Wellness</CardTitle>
              <CardDescription>March 22, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Learn how excessive screen time affects mental health and discover strategies for a healthy relationship
                with technology.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">9 min read</span>
              </div>
              <Link href="/resources/digital-detox" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Nutrition and Mental Health"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Nutrition
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Wellness
                </Badge>
              </div>
              <CardTitle>The Connection Between Nutrition and Mental Health</CardTitle>
              <CardDescription>March 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Explore how diet affects brain function and mood, with dietary recommendations for supporting mental
                well-being.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">8 min read</span>
              </div>
              <Link href="/resources/nutrition-mental-health" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Workplace Mental Health"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Workplace
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Stress
                </Badge>
              </div>
              <CardTitle>Promoting Mental Health in the Workplace</CardTitle>
              <CardDescription>March 8, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Strategies for creating a mentally healthy work environment and managing work-related stress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">11 min read</span>
              </div>
              <Link href="/resources/workplace-mental-health" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Exercise and Mental Health"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Exercise
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Wellness
                </Badge>
              </div>
              <CardTitle>The Mental Health Benefits of Regular Exercise</CardTitle>
              <CardDescription>March 1, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                How physical activity impacts mental health and simple ways to incorporate movement into your daily
                routine.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">6 min read</span>
              </div>
              <Link href="/resources/exercise-mental-health" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Parenting and Mental Health"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  Parenting
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Family
                </Badge>
              </div>
              <CardTitle>Supporting Children's Mental Health: A Guide for Parents</CardTitle>
              <CardDescription>February 22, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Practical advice for parents on fostering emotional well-being and resilience in children of all ages.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">12 min read</span>
              </div>
              <Link href="/resources/parenting-mental-health" className="text-primary text-sm flex items-center">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button>Load More Articles</Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Receive the latest mental health resources, articles, and tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-foreground" />
              <Button className="bg-white text-primary hover:bg-white/90">Subscribe</Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-4">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
