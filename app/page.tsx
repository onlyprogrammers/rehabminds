import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Heart, Users, Sparkles } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import HeroSlider from "@/components/hero-slider"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

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
      <section className="py-20 bg-accent/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Featured Specialists</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Meet our team of qualified psychiatrists and psychologists dedicated to providing exceptional mental
              health care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all hover:border-secondary">
              <CardHeader>
                <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Dr. Kiran Kumari"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">Dr. Kiran Kumari</CardTitle>
                <CardDescription className="text-base">RCI-Certified Rehabilitation Psychologist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      CBT
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      DBT
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Child Psychology
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    8+ years of experience in rehabilitation psychology, currently at Tulasi Health Care, Gurgaon.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/specialists/kiran-kumari"
                  className="text-primary text-sm flex items-center hover:underline"
                >
                  View Profile <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-secondary">
              <CardHeader>
                <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Dr. Ananya Sharma"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">Dr. Ananya Sharma</CardTitle>
                <CardDescription className="text-base">Clinical Psychologist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Anxiety
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Depression
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      PTSD
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    10+ years specializing in anxiety disorders and trauma therapy with a focus on evidence-based
                    approaches.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/specialists/ananya-sharma"
                  className="text-primary text-sm flex items-center hover:underline"
                >
                  View Profile <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-secondary">
              <CardHeader>
                <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Dr. Rajiv Mehta"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">Dr. Rajiv Mehta</CardTitle>
                <CardDescription className="text-base">Psychiatrist & Addiction Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Addiction
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Mood Disorders
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Medication Management
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    15+ years of experience in addiction psychiatry and medication management for complex mental health
                    conditions.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/specialists/rajiv-mehta"
                  className="text-primary text-sm flex items-center hover:underline"
                >
                  View Profile <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/specialists">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View All Specialists
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We offer a comprehensive range of mental health services to address various needs and conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/services#therapy" className="group">
            <Card className="h-full transition-all group-hover:border-secondary group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Heart className="h-6 w-6 text-primary" />
                  Therapy & Counseling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Individual Counseling</li>
                  <li>Couple Therapy</li>
                  <li>Family & Relationship Counseling</li>
                  <li>LGBTQ+ Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/services#disorders" className="group">
            <Card className="h-full transition-all group-hover:border-secondary group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="h-6 w-6 text-primary" />
                  Disorder Treatment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Stress, Depression, Anxiety</li>
                  <li>OCD, PTSD, Trauma Therapy</li>
                  <li>Sleep & Eating Disorders</li>
                  <li>Addiction Therapy</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/services#child" className="group">
            <Card className="h-full transition-all group-hover:border-secondary group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  Child & Adolescent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Child Psychology</li>
                  <li>Behavioral Assessments</li>
                  <li>Academic Performance Issues</li>
                  <li>Developmental Disorders</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/services#psychometric" className="group">
            <Card className="h-full transition-all group-hover:border-secondary group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Psychometric & Clinical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>IQ Testing</li>
                  <li>Psychometric Evaluations</li>
                  <li>Clinical Hypnosis</li>
                  <li>Personality Assessments</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/services#workshops" className="group">
            <Card className="h-full transition-all group-hover:border-secondary group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  Workshops & Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Cultural Adjustment Assistance</li>
                  <li>Brain Coordination & Balancing</li>
                  <li>Stress Management Workshops</li>
                  <li>Corporate Wellness Programs</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-primary text-sm flex items-center transition-all group-hover:translate-x-1">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>

          <div className="md:col-span-1 lg:col-span-1 flex items-center justify-center">
            <div className="text-center p-8 bg-accent/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Need Help Choosing?</h3>
              <p className="text-muted-foreground mb-6">
                Not sure which service is right for you? Contact us for a consultation.
              </p>
              <Link href="/contact">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Mental wellness support"
                fill
                className="object-cover"
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
                  src="/placeholder.svg?height=300&width=500"
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
                  src="/placeholder.svg?height=300&width=500"
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
                  src="/placeholder.svg?height=300&width=500"
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
