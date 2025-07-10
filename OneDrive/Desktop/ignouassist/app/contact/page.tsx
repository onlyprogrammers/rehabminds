import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <SlidingNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about our services? Need help with your IGNOU studies? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 9876543210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">IGNOU Program</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ba">Bachelor of Arts (BA)</SelectItem>
                      <SelectItem value="bcom">Bachelor of Commerce (B.Com)</SelectItem>
                      <SelectItem value="bsc">Bachelor of Science (B.Sc)</SelectItem>
                      <SelectItem value="bca">Bachelor of Computer Applications (BCA)</SelectItem>
                      <SelectItem value="ma">Master of Arts (MA)</SelectItem>
                      <SelectItem value="mcom">Master of Commerce (M.Com)</SelectItem>
                      <SelectItem value="msc">Master of Science (M.Sc)</SelectItem>
                      <SelectItem value="mca">Master of Computer Applications (MCA)</SelectItem>
                      <SelectItem value="mba">Master of Business Administration (MBA)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
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

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please describe your query in detail..." rows={5} />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  <CardDescription>Multiple ways to reach us for quick assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Phone Support</p>
                      <p className="text-gray-600">+91 9876543210</p>
                      <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 8 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="text-gray-600">support@ignouHub.com</p>
                      <p className="text-sm text-gray-500">24/7 Email Support</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">WhatsApp Support</p>
                      <p className="text-gray-600">+91 9876543210</p>
                      <p className="text-sm text-gray-500">Quick responses via WhatsApp</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold">Office Address</p>
                      <p className="text-gray-600">
                        123, Education Hub,
                        <br />
                        Sector 18, Noida,
                        <br />
                        Uttar Pradesh - 201301
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Monday - Friday</span>
                      </span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Saturday</span>
                      </span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Sunday</span>
                      </span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/faq" className="block text-blue-600 hover:underline">
                      Frequently Asked Questions
                    </Link>
                    <Link href="/help" className="block text-blue-600 hover:underline">
                      Help Center
                    </Link>
                    <Link href="/services" className="block text-blue-600 hover:underline">
                      Our Services
                    </Link>
                    <Link href="/pricing" className="block text-blue-600 hover:underline">
                      Pricing Plans
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond to queries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We respond to all queries within 2-4 hours during business hours. For urgent matters, you can call or
                  WhatsApp us for immediate assistance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide 24/7 support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Email support is available 24/7. Phone and WhatsApp support are available Monday-Saturday, 9 AM - 8
                  PM. Emergency support is available for premium customers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I get a refund if not satisfied?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer a 7-day money-back guarantee for all premium services. If you're not satisfied with our
                  work, we'll provide a full refund.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you help with all IGNOU programs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we provide support for all IGNOU undergraduate, postgraduate, diploma, and certificate programs
                  across all schools and faculties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-xl mb-8 opacity-90">Our expert team is ready to help you with any IGNOU-related queries</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Call Now: +91 9876543210
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
