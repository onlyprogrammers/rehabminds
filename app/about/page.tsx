import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Users, Sparkles, Award, Shield } from "lucide-react"
import mainimage from "@/components/images/aboutsection.png"
import about2 from "@/components/images/about2.png"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Rehab Minds</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Dedicated to providing compassionate mental health care and fostering well-being in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]  sm:w-300px rounded-lg overflow-hidden flex self-center">
            <Image src={mainimage} alt="Rehab Minds team" fill className="" />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                At Rehab Minds, our mission is to provide accessible, high-quality mental health care that empowers
                individuals to overcome challenges and achieve optimal well-being. We are committed to breaking down
                stigmas surrounding mental health and creating a supportive environment where everyone feels valued and
                understood.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                We envision a world where mental health is prioritized as an essential component of overall wellness,
                where seeking help is normalized, and where everyone has access to the resources they need to thrive
                mentally and emotionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide our approach to mental health care and shape every interaction we have with our
              patients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-muted-foreground">
                  We approach every individual with empathy, understanding, and genuine care, recognizing the courage it
                  takes to seek help.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  We uphold the highest ethical standards in our practice, ensuring confidentiality, respect, and
                  honesty in all our interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We are committed to providing the highest quality care through evidence-based practices and continuous
                  professional development.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity and create a welcoming environment for individuals of all backgrounds,
                  identities, and experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new approaches and technologies that enhance the effectiveness and accessibility of mental
                  health care.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
                <p className="text-muted-foreground">
                  We strive to equip individuals with the knowledge, skills, and resources they need to take an active
                  role in their mental health journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Team Behind Rehab Minds</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team consists of highly qualified mental health professionals dedicated to providing exceptional care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Founded by Dr. Kiran Kumari, Rehab Minds brings together a diverse team of psychiatrists, psychologists,
              and counselors with expertise in various mental health specialties. Our professionals are not only highly
              qualified but also deeply committed to our mission of compassionate care.
            </p>
            <p className="text-muted-foreground">
              Each team member brings unique skills and perspectives to our practice, allowing us to offer comprehensive
              care that addresses the full spectrum of mental health needs. We regularly engage in continuing education
              and professional development to stay at the forefront of advancements in mental health care.
            </p>
            <p className="text-muted-foreground">
              Beyond our clinical expertise, what truly sets our team apart is our genuine passion for helping others
              and our belief in the resilience of the human spirit. We consider it a privilege to be part of our
              patients' journeys toward mental wellness.
            </p>
            <div className="pt-4">
              <Link href="/specialists">
                <Button>Meet Our Specialists</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=200&width=200" alt="Team member 1" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=200&width=200" alt="Team member 2" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=200&width=200" alt="Team member 3" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=200&width=200" alt="Team member 4" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Mental Wellness</h2>
              <div className="space-y-4">
                <p>
                  At Rehab Minds, we believe that mental health is an essential component of overall well-being. Our
                  commitment extends beyond providing clinical services to advocating for mental health awareness and
                  reducing stigma in our community.
                </p>
                <p>
                  We take a holistic approach to mental wellness, recognizing that each person's journey is unique and
                  influenced by various factors including physical health, relationships, environment, and personal
                  experiences.
                </p>
                <p>
                  Through personalized care plans, evidence-based treatments, and ongoing support, we help individuals
                  develop the resilience and skills needed to navigate life's challenges and achieve lasting mental
                  wellness.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={about2}
                alt="Mental wellness session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join Us on Our Mission</h2>
          <p className="text-muted-foreground mb-8">
            Whether you're seeking help for yourself, supporting a loved one, or interested in joining our team, we
            invite you to be part of our community dedicated to mental wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment">
              <Button size="lg">Book an Appointment</Button>
            </Link>
            <Link href="/join">
              <Button size="lg" variant="outline">
                Join as a Specialist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
