import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              We're here to answer your questions and provide the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+1 (234) 567-890</p>
              <p className="text-sm text-muted-foreground mt-2">For appointments and general inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">info@rehabminds.com</p>
              <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">123 Wellness Street</p>
              <p className="text-muted-foreground">Gurgaon, India</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Mon-Fri: 9 AM - 6 PM</p>
              <p className="text-muted-foreground">Sat: 9 AM - 2 PM</p>
              <p className="text-muted-foreground">Sun: Closed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter message subject" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={6} />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Office location map"
                fill
                className="object-cover"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media for mental health tips, resources, and updates about our services.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                    <Facebook className="h-5 w-5 text-primary" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                    <Instagram className="h-5 w-5 text-primary" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                    <Twitter className="h-5 w-5 text-primary" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you're experiencing a mental health emergency, please contact:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Mental Health Crisis Hotline:</p>
                  <p className="text-muted-foreground">+1 (800) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-4">Available 24/7 for immediate support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and how to get in touch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How quickly will I receive a response?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive to respond to all inquiries within 24 business hours. For urgent matters, please call our
                  office directly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is there parking available at your location?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we have free parking available for all patients and visitors in the building's parking lot.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you offer virtual consultations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer secure video consultations for many of our services. You can request a virtual
                  appointment through our booking form.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I provide feedback about my experience?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We value your feedback. You can share your experience by filling out our feedback form, sending us an
                  email, or speaking directly with our staff.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/faq">
              <Button variant="outline">View All FAQs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the First Step?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Schedule an appointment today and begin your journey to mental wellness with the support of our experienced
            specialists.
          </p>
          <Link href="/appointment">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book an Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
