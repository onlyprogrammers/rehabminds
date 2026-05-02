import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, FileText, BookOpen, Search, Download, Calendar, Trophy, Users, ArrowRight } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import Footer from "@/components/ui/footer"

export const metadata: Metadata = {
  title: 'IGNOU Services – Assignments, Notes, Grade Card & More',
  description: 'Complete IGNOU academic services: solved assignments, study notes, synopsis help, grade card access, previous question papers, and career guidance for all programs.',
  keywords: ['IGNOU services', 'IGNOU assignments help', 'IGNOU study notes', 'IGNOU grade card', 'IGNOU synopsis', 'IGNOU solved papers'],
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SlidingNavbar />

      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-6">Complete IGNOU Services</h1>
          <p className="text-sm md:text-xl text-gray-600 mb-4 md:mb-8 max-w-3xl mx-auto">
            Everything you need for your IGNOU studies in one place. From assignments to grade cards, we've got you covered.
          </p>
        </div>
      </section>

      <section className="pb-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <Badge variant="secondary" className="text-xs">Most Popular</Badge>
                </div>
                <CardTitle className="text-sm md:text-lg">Assignments</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Ready-made assignments for all IGNOU courses with proper formatting and plagiarism-free content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• All subjects covered</li>
                  <li>• Proper formatting & references</li>
                  <li>• Plagiarism-free content</li>
                  <li>• Quick delivery</li>
                  <li>• Revision support</li>
                </ul>
                <Link href="/assignments">
                  <Button size="sm" className="w-full md:w-auto text-xs">
                    Get Assignments <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="pb-2 md:pb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <CardTitle className="text-sm md:text-lg">Study Notes</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Comprehensive study notes for all subjects, simplified and easy to understand.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• Subject-wise notes</li>
                  <li>• Easy to understand</li>
                  <li>• Key points highlighted</li>
                  <li>• Exam-focused content</li>
                  <li>• Regular updates</li>
                </ul>
                <Link href="/notes">
                  <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                    Browse Notes <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="pb-2 md:pb-4">
                <Search className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm md:text-lg">Synopsis</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Project synopsis and dissertation help for all programs with proper research methodology.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• All programs covered</li>
                  <li>• Research methodology</li>
                  <li>• Proper formatting</li>
                  <li>• Expert guidance</li>
                  <li>• Approval support</li>
                </ul>
                <Link href="/contact">
                  <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                    Get Synopsis Help <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
              <CardHeader className="pb-2 md:pb-4">
                <Download className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-sm md:text-lg">Books & Materials</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Digital books, reference materials, previous year papers, and study guides.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• Digital textbooks</li>
                  <li>• Reference materials</li>
                  <li>• Previous year papers</li>
                  <li>• Study guides</li>
                  <li>• Instant download</li>
                </ul>
                <Link href="/materials">
                  <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                    Download Materials <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center justify-between">
                  <Trophy className="h-5 w-5 text-red-600" />
                  <Badge variant="outline" className="text-xs">New</Badge>
                </div>
                <CardTitle className="text-sm md:text-lg">Grade Card</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  View and download your academic results and track your progress easily.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• View results online</li>
                  <li>• Download grade cards</li>
                  <li>• Track progress</li>
                  <li>• Result notifications</li>
                  <li>• Academic history</li>
                </ul>
                <Link href="/gradecard">
                  <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                    View Grade Card <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200">
              <CardHeader className="pb-2 md:pb-4">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-sm md:text-lg">Question Papers</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Stay updated with previous year question papers and exam preparation material.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm text-gray-600 mb-3 md:mb-6 hidden md:block">
                  <li>• Previous year papers</li>
                  <li>• All programs covered</li>
                  <li>• Semester-wise</li>
                  <li>• Free to access</li>
                  <li>• Regular updates</li>
                </ul>
                <Link href="/previouspapers">
                  <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                    View Papers <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-12">Additional Support Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
            <Card>
              <CardHeader className="pb-2 md:pb-4">
                <Users className="h-7 md:h-10 w-7 md:w-10 text-teal-600 mb-2 md:mb-4" />
                <CardTitle className="text-sm md:text-base">Study Groups</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Connect with fellow students and get peer support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="text-xs">Join Community</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 md:pb-4">
                <GraduationCap className="h-7 md:h-10 w-7 md:w-10 text-pink-600 mb-2 md:mb-4" />
                <CardTitle className="text-sm md:text-base">Career Guidance</CardTitle>
                <CardDescription className="text-xs md:text-sm hidden md:block">
                  Career counseling and job placement assistance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/career-guidance">
                  <Button variant="outline" size="sm" className="text-xs">Get Guidance</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-12">Affordable Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-base md:text-lg">Basic</CardTitle>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">₹299</div>
                <CardDescription className="text-xs">Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• 5 Assignments/month</li>
                  <li>• Basic study notes</li>
                  <li>• Email support</li>
                  <li>• Grade card access</li>
                </ul>
                <Link href="/signup">
                  <Button size="sm" className="mt-4 w-full" variant="outline">Choose Basic</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-xs">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-base md:text-lg">Premium</CardTitle>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">₹599</div>
                <CardDescription className="text-xs">Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• Unlimited assignments</li>
                  <li>• Complete study materials</li>
                  <li>• Priority support</li>
                  <li>• Synopsis help</li>
                  <li>• All books & materials</li>
                </ul>
                <Link href="/signup">
                  <Button size="sm" className="mt-4 w-full">Choose Premium</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-base md:text-lg">Enterprise</CardTitle>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">₹999</div>
                <CardDescription className="text-xs">Per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• Everything in Premium</li>
                  <li>• Personal mentor</li>
                  <li>• Career guidance</li>
                  <li>• 24/7 phone support</li>
                  <li>• Custom materials</li>
                </ul>
                <Link href="/signup">
                  <Button size="sm" className="mt-4 w-full" variant="outline">Choose Enterprise</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Start Your Success Journey?</h3>
          <p className="text-sm md:text-xl mb-5 md:mb-8 opacity-90">
            Join thousands of successful IGNOU students
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-base px-6 w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 text-white border-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
