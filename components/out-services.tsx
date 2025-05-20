import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Heart, Brain, Users, Sparkles, ArrowRight} from "lucide-react"

const Ourservices = () => {
    return (
       <>
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

       </>
    );
}
export default Ourservices;