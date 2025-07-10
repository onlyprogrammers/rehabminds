import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, FileText, BookOpen, Search, Download, Calendar, Trophy, Users, ArrowRight } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <SlidingNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Complete IGNOU Services</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need for your IGNOU studies in one place. From assignments to grade cards, we've got you
            covered with quality materials and expert support.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Assignments */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <FileText className="h-12 w-12 text-blue-600" />
                  <Badge variant="secondary">Most Popular</Badge>
                </div>
                <CardTitle className="text-2xl">Assignments</CardTitle>
                <CardDescription>
                  Ready-made assignments for all IGNOU courses with proper formatting, references, and plagiarism-free
                  content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• All subjects covered</li>
                  <li>• Proper formatting & references</li>
                  <li>• Plagiarism-free content</li>
                  <li>• Quick delivery</li>
                  <li>• Revision support</li>
                </ul>
                <Button className="w-full">
                  Get Assignments <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Study Notes */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600" />
                <CardTitle className="text-2xl">Study Notes</CardTitle>
                <CardDescription>
                  Comprehensive study notes for all subjects, simplified and easy to understand with key points
                  highlighted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Subject-wise notes</li>
                  <li>• Easy to understand</li>
                  <li>• Key points highlighted</li>
                  <li>• Exam-focused content</li>
                  <li>• Regular updates</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Browse Notes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Synopsis */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader>
                <Search className="h-12 w-12 text-purple-600" />
                <CardTitle className="text-2xl">Synopsis</CardTitle>
                <CardDescription>
                  Project synopsis and dissertation help for all programs with proper research methodology and
                  formatting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• All programs covered</li>
                  <li>• Research methodology</li>
                  <li>• Proper formatting</li>
                  <li>• Expert guidance</li>
                  <li>• Approval support</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Synopsis Help <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Books & Materials */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
              <CardHeader>
                <Download className="h-12 w-12 text-orange-600" />
                <CardTitle className="text-2xl">Books & Materials</CardTitle>
                <CardDescription>
                  Digital books, reference materials, previous year papers, and study guides for comprehensive
                  preparation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Digital textbooks</li>
                  <li>• Reference materials</li>
                  <li>• Previous year papers</li>
                  <li>• Study guides</li>
                  <li>• Instant download</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Download Materials <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Grade Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Trophy className="h-12 w-12 text-red-600" />
                  <Badge variant="outline">New</Badge>
                </div>
                <CardTitle className="text-2xl">Grade Card</CardTitle>
                <CardDescription>
                  View and download your academic results, grade cards, and track your academic progress easily.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• View results online</li>
                  <li>• Download grade cards</li>
                  <li>• Track progress</li>
                  <li>• Result notifications</li>
                  <li>• Academic history</li>
                </ul>
                <Link href="/gradecard">
                  <Button className="w-full" variant="outline">
                    View Grade Card <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Exam Schedule */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200">
              <CardHeader>
                <Calendar className="h-12 w-12 text-indigo-600" />
                <CardTitle className="text-2xl">Exam Schedule</CardTitle>
                <CardDescription>
                  Stay updated with exam dates, hall tickets, important notifications, and exam-related information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Exam date sheets</li>
                  <li>• Hall ticket download</li>
                  <li>• Important notifications</li>
                  <li>• Exam center details</li>
                  <li>• Reminder alerts</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Check Schedule <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Additional Support Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-teal-600 mb-4" />
                <CardTitle>Study Groups & Forums</CardTitle>
                <CardDescription>
                  Connect with fellow students, join study groups, participate in discussions, and get peer support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-pink-600 mb-4" />
                <CardTitle>Career Guidance</CardTitle>
                <CardDescription>
                  Get career counseling, job placement assistance, and guidance for your future career prospects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Get Guidance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Affordable Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="text-3xl font-bold text-blue-600">₹299</div>
                <CardDescription>Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 5 Assignments per month</li>
                  <li>• Basic study notes</li>
                  <li>• Email support</li>
                  <li>• Grade card access</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Choose Basic
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-3xl font-bold text-blue-600">₹599</div>
                <CardDescription>Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Unlimited assignments</li>
                  <li>• Complete study materials</li>
                  <li>• Priority support</li>
                  <li>• Synopsis help</li>
                  <li>• All books & materials</li>
                </ul>
                <Button className="w-full mt-6">Choose Premium</Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-blue-600">₹999</div>
                <CardDescription>Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Everything in Premium</li>
                  <li>• Personal mentor</li>
                  <li>• Career guidance</li>
                  <li>• 24/7 phone support</li>
                  <li>• Custom materials</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Choose Enterprise
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Success Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get access to all services and join thousands of successful IGNOU students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
