import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Heart, Users, Sparkles } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import HeroSlider from "@/components/hero-slider"
import Head from "next/head";
import { CategoriesGrid } from "@/components/categories-grid"
import { services } from "@/data/services"

{/* Images */}

import mentalwellness from "@/components/images/mindfulness.jpeg"
import anixity from "@/components/images/anxiety.jpeg"
import mindfullness from "@/components/images/mental health.png"
import supporting from "@/components/images/support.jpeg"
import mentalhealth from "@/components/images/mentalhealth1.jpeg"
import { min } from "date-fns"



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <link rel="icon" href="/tablogo.png" />
        <title>My Next.js App</title>
      </Head>
      {/* Hero Slider */}
      <HeroSlider />

      <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Our Mental Health Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive range of mental health services designed to support your wellbeing journey.
        </p>
      </div>

      <CategoriesGrid services={services} />
    </main>

      {/* Introduction Section */}
      <section className="py-20 container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to Rehab Minds</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At Rehab Minds, we believe in a holistic approach to mental health care. Our team of experienced
            psychiatrists and psychologists are dedicated to providing compassionate, personalized care to help you on
            your journey to mental wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-12">
          <Card className="text-center hover:shadow-lg transition-all hover:border-accent">
            <CardHeader className="pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Expert Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Qualified psychiatrists with years of experience in various mental health specialties.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all hover:border-accent">
            <CardHeader className="pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Compassionate Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We treat each patient with empathy, respect, and understanding.</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all hover:border-accent">
            <CardHeader className="pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Personalized Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customized care plans tailored to your unique needs and circumstances.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all hover:border-accent">
            <CardHeader className="pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Holistic Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Focus on complete mental well-being, not just symptom management.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Specialists */}
           {/* Services Overview */}
      
      {/* Testimonials */}
      <section className="py-20 bg-accent/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Patients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Read about the experiences of those who have benefited from our services.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Journey to Mental Wellness?</h2>
              <p className="text-xl mb-8">
                Take the first step towards better mental health today. Our team of specialists is ready to provide the
                support and care you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/appointment">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8">
                    Book an Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] sm-w rounded-lg overflow-hidden shadow-xl">
              <Image
                src={mentalhealth}
                alt="Mental wellness support"
                fill
                className="object-cover sm-w"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="py-20 container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our collection of articles, guides, and resources on mental health topics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all hover:border-accent">
            <CardHeader>
              <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={anixity}
                  alt="Understanding Anxiety"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-xl">Understanding Anxiety: Causes and Coping Strategies</CardTitle>
              <CardDescription>May 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Anxiety is a common mental health condition that affects millions worldwide. Learn about its causes and
                effective strategies to manage symptoms.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/resources/understanding-anxiety"
                className="text-primary text-sm flex items-center hover:underline"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:border-accent">
            <CardHeader>
              <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={mentalwellness}
                  alt="Mindfulness Meditation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-xl">The Power of Mindfulness in Daily Life</CardTitle>
              <CardDescription>April 28, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Discover how incorporating mindfulness practices into your daily routine can improve mental well-being
                and reduce stress.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/resources/mindfulness-daily-life"
                className="text-primary text-sm flex items-center hover:underline"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:border-accent">
            <CardHeader>
              <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={supporting}
                  alt="Supporting Loved Ones"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-xl">Supporting Loved Ones with Depression</CardTitle>
              <CardDescription>April 10, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                Learn how to provide effective support to friends and family members dealing with depression while
                taking care of your own mental health.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/resources/supporting-loved-ones"
                className="text-primary text-sm flex items-center hover:underline"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/resources">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View All Resources
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
