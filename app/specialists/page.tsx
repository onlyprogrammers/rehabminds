import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import doctor1 from "@/components/images/doctor1.png"
import doctor2 from "@/components/images/doctor2.png"
import doctor3 from "@/components/images/doctor3.png"

export default function SpecialistsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Specialists</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Meet our team of qualified psychiatrists and psychologists dedicated to your mental well-being.
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
              <Input placeholder="Search by name or specialty..." className="pl-10" />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">Specialization</Button>
              <Button variant="outline">Location</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialists List */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dr. Kiran Kumari */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={doctor2}
                  alt="Dr. Kiran Kumari"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Kiran Kumari</CardTitle>
              <CardDescription>RCI-Certified Rehabilitation Psychologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    CBT
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    DBT
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Case Management
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Child Psychology
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 8+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Rehabilitation Psychologist at
                    Tulasi Health Care, Gurgaon
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> PG Diploma (Rehabilitation
                    Psychology), M.A. & B.A. in Psychology
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/kiran-kumari" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=kiran-kumari">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Dr. Ananya Sharma */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={doctor3}
                  alt="Dr. Ananya Sharma"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Ananya Sharma</CardTitle>
              <CardDescription>Clinical Psychologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Anxiety
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Depression
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    PTSD
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Trauma Therapy
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 10+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Senior Clinical Psychologist at
                    Rehab Minds
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> Ph.D. in Clinical Psychology,
                    M.Phil. in Clinical Psychology
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi, Bengali
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/ananya-sharma" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=ananya-sharma">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Dr. Rajiv Mehta */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={doctor1}
                  alt="Dr. Rajiv Mehta"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Rajiv Mehta</CardTitle>
              <CardDescription>Psychiatrist & Addiction Specialist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Addiction
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Mood Disorders
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Medication Management
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Substance Abuse
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 15+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Head of Addiction Psychiatry at
                    Rehab Minds
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> M.D. Psychiatry, MBBS
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi, Punjabi
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/rajiv-mehta" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=rajiv-mehta">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Dr. Priya Desai */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Priya Desai"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Priya Desai</CardTitle>
              <CardDescription>Child & Adolescent Psychologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Child Psychology
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ADHD
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Learning Disabilities
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Behavioral Issues
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 12+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Child & Adolescent Specialist at
                    Rehab Minds
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> Ph.D. in Child Psychology, M.A. in
                    Clinical Psychology
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi, Marathi
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/priya-desai" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=priya-desai">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Dr. Sanjay Kumar */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Sanjay Kumar"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Sanjay Kumar</CardTitle>
              <CardDescription>Neuropsychologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Neuropsychology
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Cognitive Assessment
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Brain Injury
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Memory Disorders
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 18+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Head of Neuropsychology at Rehab
                    Minds
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> Ph.D. in Neuropsychology, M.D.
                    Neurology
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi, Tamil
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/sanjay-kumar" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=sanjay-kumar">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Dr. Meera Patel */}
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Meera Patel"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>Dr. Meera Patel</CardTitle>
              <CardDescription>Relationship & Family Therapist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Couples Therapy
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Family Counseling
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Marriage Counseling
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Conflict Resolution
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Experience:</span> 14+ years
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Current Role:</span> Senior Relationship Therapist at
                    Rehab Minds
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Education:</span> Ph.D. in Family Therapy, M.A. in
                    Psychology
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Languages:</span> English, Hindi, Gujarati
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/specialists/meera-patel" className="text-primary text-sm flex items-center">
                View Full Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href="/appointment?specialist=meera-patel">
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button>Load More Specialists</Button>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join Our Team of Specialists</h2>
              <p className="text-muted-foreground mb-6">
                Are you a qualified mental health professional looking to make a difference? We're always looking for
                passionate specialists to join our team.
              </p>
              <Link href="/join">
                <Button>Learn More About Joining</Button>
              </Link>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Team of specialists"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
