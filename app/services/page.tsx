import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, Sparkles, Clock } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-5 md:py-12">
        <div className="container py-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Services</h1>
            <p className="text-xl text-primary-foreground/90 mb-4">
              Comprehensive mental health services tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Mental Health Care</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At Rehab Minds, we offer a wide range of services designed to address various mental health needs and
            support your journey to wellness.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Therapy & Counseling */}
          <div id="therapy" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Therapy & Counseling</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Therapy session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our therapy and counseling services provide a safe, supportive environment where you can explore your
                  thoughts, feelings, and behaviors with the guidance of a trained professional. We offer various
                  therapeutic approaches tailored to your specific needs.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Individual Counseling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        One-on-one sessions focused on personal growth, coping strategies, and addressing specific
                        mental health concerns.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Couple Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Support for couples facing relationship challenges, communication issues, or major life
                        transitions.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Family & Relationship Counseling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Guidance for families working through conflicts, improving communication, and strengthening
                        bonds.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">LGBTQ+ Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Specialized counseling addressing the unique challenges and experiences of LGBTQ+ individuals.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Disorder Treatment */}
          <div id="disorders" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Disorder Treatment</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 order-2 md:order-1">
                <p className="text-muted-foreground">
                  We provide evidence-based treatment for a wide range of mental health disorders. Our specialists
                  develop personalized treatment plans that may include therapy, medication management, and lifestyle
                  recommendations.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Stress, Depression, Anxiety</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive treatment for common mental health conditions that affect mood, thoughts, and
                        daily functioning.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">OCD, PTSD, Trauma Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Specialized approaches for addressing obsessive-compulsive disorder, post-traumatic stress, and
                        trauma recovery.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Sleep & Eating Disorders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Treatment for disorders affecting sleep patterns and eating behaviors, addressing both physical
                        and psychological factors.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Addiction Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Support for overcoming substance dependencies and behavioral addictions through evidence-based
                        approaches.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Disorder treatment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Child & Adolescent */}
          <div id="child" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Child & Adolescent</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Child psychology"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our child and adolescent services focus on the unique mental health needs of young people. We use
                  age-appropriate approaches to help children and teenagers navigate emotional challenges, behavioral
                  issues, and developmental concerns.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Child Psychology</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Specialized care for children dealing with emotional, behavioral, or developmental challenges.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Behavioral Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive evaluations to identify behavioral patterns and develop effective intervention
                        strategies.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Academic Performance Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Support for children struggling with school performance, learning difficulties, or attention
                        issues.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Developmental Disorders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Specialized care for autism spectrum disorders, ADHD, and other developmental conditions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Psychometric & Clinical */}
          <div id="psychometric" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Psychometric & Clinical</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 order-2 md:order-1">
                <p className="text-muted-foreground">
                  Our psychometric and clinical services provide objective assessments of cognitive abilities,
                  personality traits, and psychological functioning. These evaluations help inform diagnosis and
                  treatment planning.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">IQ Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Standardized assessments of cognitive abilities, including reasoning, problem-solving, and
                        memory.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Psychometric Evaluations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive assessments of personality, emotional functioning, and psychological well-being.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Clinical Hypnosis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Therapeutic technique using focused attention and guided relaxation to address specific
                        psychological issues.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Personality Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Structured evaluations to identify personality traits, strengths, and potential areas for
                        growth.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Psychometric testing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Workshops & Programs */}
          <div id="workshops" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Workshops & Programs</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Workshop session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our workshops and programs offer structured learning experiences focused on specific mental health
                  topics and skills. These group-based offerings provide education, support, and opportunities for
                  personal growth.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Cultural Adjustment Assistance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Support for individuals adapting to new cultural environments, addressing challenges of
                        transition and integration.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Brain Coordination & Balancing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Techniques to improve cognitive function, emotional regulation, and mind-body connection.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Stress Management Workshops</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Practical strategies for managing stress, building resilience, and promoting overall well-being.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Corporate Wellness Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Customized programs for organizations focused on employee mental health, team building, and
                        workplace well-being.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
              <p className="mb-6">
                Our team of specialists is ready to provide personalized care tailored to your unique needs. Book an
                appointment today to begin your journey to mental wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/appointment">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
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
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Consultation session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and approach to mental health care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>How do I know which service is right for me?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We recommend scheduling an initial consultation where our specialists can assess your needs and
                recommend the most appropriate services. You can also contact us directly to discuss your specific
                concerns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What can I expect during my first appointment?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your first appointment will typically involve discussing your concerns, medical history, and goals for
                treatment. This helps us understand your unique situation and develop an appropriate care plan.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How long does each session last?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Most individual therapy sessions last 45-60 minutes. Initial consultations and certain assessments may
                require more time. Group sessions and workshops typically run for 90-120 minutes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Do you offer online/virtual services?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we offer teletherapy and virtual consultations for many of our services, making mental health care
                accessible regardless of your location or circumstances.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-10">
          <Link href="/faq">
            <Button variant="outline">View All FAQs</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
