import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import Footer from "@/components/ui/footer"

export const metadata: Metadata = {
  title: 'Contact Us – IGNOU Study Guide Support',
  description: 'Get in touch with IGNOU Study Guide for assignment help, study material queries, grade card issues, and technical support. We respond within 24 hours.',
  keywords: ['IGNOU contact', 'IGNOU help', 'IGNOU support', 'IGNOU assignment help contact', 'IGNOU study guide contact'],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SlidingNavbar />

      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-6">Contact Us</h1>
          <p className="text-sm md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Have questions? Need help with IGNOU studies? We're here to help.
          </p>
        </div>
      </section>

      <section className="pb-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-lg md:text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-xs md:text-sm">Fill out the form and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs md:text-sm">First Name</Label>
                    <Input id="firstName" placeholder="First name" className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs md:text-sm">Last Name</Label>
                    <Input id="lastName" placeholder="Last name" className="text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" className="text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 9876543210" className="text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="program" className="text-xs md:text-sm">IGNOU Program</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ba">BA</SelectItem>
                      <SelectItem value="bcom">B.Com</SelectItem>
                      <SelectItem value="bsc">B.Sc</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="ma">MA</SelectItem>
                      <SelectItem value="mcom">M.Com</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs md:text-sm">Subject</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="What can we help you with?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">Assignment Help</SelectItem>
                      <SelectItem value="notes">Study Notes</SelectItem>
                      <SelectItem value="synopsis">Synopsis Help</SelectItem>
                      <SelectItem value="gradecard">Grade Card Issues</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs md:text-sm">Message</Label>
                  <Textarea id="message" placeholder="Describe your query in detail..." rows={4} className="text-sm" />
                </div>

                <Button type="submit" className="w-full text-sm">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4 md:space-y-8">
              <Card>
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="text-base md:text-2xl">Get in Touch</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Multiple ways to reach us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Phone Support</p>
                      <p className="text-gray-600 text-sm">+91 9876543210</p>
                      <p className="text-xs text-gray-500">Mon-Sat, 9 AM – 8 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Email Support</p>
                      <p className="text-gray-600 text-sm">support@ignoustudyguide.com</p>
                      <p className="text-xs text-gray-500">24/7 Email Support</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-purple-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">WhatsApp</p>
                      <p className="text-gray-600 text-sm">+91 9876543210</p>
                      <p className="text-xs text-gray-500">Quick responses via WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Office</p>
                      <p className="text-gray-600 text-sm">New Delhi, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs md:text-sm">
                        <Clock className="h-3.5 w-3.5 text-blue-600" />Monday – Friday
                      </span>
                      <span className="font-medium text-xs md:text-sm">9 AM – 8 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs md:text-sm">
                        <Clock className="h-3.5 w-3.5 text-blue-600" />Saturday
                      </span>
                      <span className="font-medium text-xs md:text-sm">10 AM – 6 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs md:text-sm">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />Sunday
                      </span>
                      <span className="text-gray-500 text-xs md:text-sm">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/faq" className="block text-blue-600 hover:underline">Frequently Asked Questions</Link>
                    <Link href="/services" className="block text-blue-600 hover:underline">Our Services</Link>
                    <Link href="/assignments" className="block text-blue-600 hover:underline">Assignment Help</Link>
                    <Link href="/gradecard" className="block text-blue-600 hover:underline">Grade Card</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { q: 'How quickly do you respond?', a: 'We respond within 2–4 hours during business hours. For urgent matters, call or WhatsApp us.' },
              { q: 'Do you provide 24/7 support?', a: 'Email is 24/7. Phone and WhatsApp support is Monday–Saturday, 9 AM – 8 PM.' },
              { q: 'Can I get a refund?', a: 'Yes, we offer a 7-day money-back guarantee for premium services.' },
              { q: 'Do you help with all IGNOU programs?', a: 'Yes, we support all IGNOU UG, PG, diploma, and certificate programs.' },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="text-sm md:text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-gray-600">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Still Have Questions?</h3>
          <p className="text-sm md:text-xl mb-5 opacity-90">Our expert team is ready to help with any IGNOU queries</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" className="text-sm w-full sm:w-auto">
              Call: +91 9876543210
            </Button>
            <Button size="lg" variant="outline" className="text-sm text-white border-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
