
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Heart, Users, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Specialist  () {
    return(
        <>
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

 

        
        </>
    )
}