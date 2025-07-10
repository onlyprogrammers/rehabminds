import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, CheckCircle, Star } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <SlidingNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About IGNOU Hub</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empowering IGNOU students since 2014 with quality study materials, expert guidance, and comprehensive
            support for academic excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                IGNOU Hub was founded in 2014 by a group of IGNOU alumni who understood the challenges faced by distance
                learning students. Having experienced the difficulties of finding quality study materials, getting
                assignment help, and navigating the complex university system, we decided to create a comprehensive
                platform to support fellow students.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small initiative to help a few students has now grown into India's largest IGNOU
                student support platform, serving over 50,000 students across the country. We've helped students achieve
                better grades, complete their programs on time, and build successful careers.
              </p>
              <p className="text-gray-600">
                Our mission remains the same: to make quality education accessible and affordable for every IGNOU
                student, regardless of their location or background.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">50,000+</div>
                  <p className="text-gray-600">Students Helped</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <p className="text-gray-600">Success Rate</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">10+</div>
                  <p className="text-gray-600">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                  <p className="text-gray-600">Student Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Quality First</CardTitle>
                <CardDescription>
                  We never compromise on quality. Every assignment, note, and material goes through rigorous quality
                  checks by our expert team.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Student-Centric</CardTitle>
                <CardDescription>
                  Students are at the heart of everything we do. We continuously evolve our services based on student
                  feedback and needs.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Integrity</CardTitle>
                <CardDescription>
                  We maintain the highest standards of academic integrity while providing guidance and support to help
                  students learn effectively.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Expert Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">DR</span>
                </div>
                <h3 className="font-semibold text-lg">Dr. Rajesh Kumar</h3>
                <p className="text-gray-600 text-sm">Founder & Academic Director</p>
                <p className="text-gray-500 text-xs mt-2">Ph.D. in Education, 15+ years experience</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">PS</span>
                </div>
                <h3 className="font-semibold text-lg">Priya Sharma</h3>
                <p className="text-gray-600 text-sm">Content Head</p>
                <p className="text-gray-500 text-xs mt-2">M.A. English, IGNOU Alumni</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">AV</span>
                </div>
                <h3 className="font-semibold text-lg">Amit Verma</h3>
                <p className="text-gray-600 text-sm">Technical Lead</p>
                <p className="text-gray-500 text-xs mt-2">MCA, Software Development Expert</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">SK</span>
                </div>
                <h3 className="font-semibold text-lg">Sunita Kapoor</h3>
                <p className="text-gray-600 text-sm">Student Support Manager</p>
                <p className="text-gray-500 text-xs mt-2">MBA, Customer Success Specialist</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">
                  "IGNOU Hub saved my academic career! Their assignments are top-quality and helped me score excellent
                  grades. The support team is always available to help."
                </p>
                <div className="font-semibold">- Rahul Singh, BCA Graduate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">
                  "The study notes are comprehensive and easy to understand. I completed my MBA with distinction thanks
                  to their excellent materials and guidance."
                </p>
                <div className="font-semibold">- Meera Patel, MBA Graduate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">
                  "Affordable pricing and excellent quality. The synopsis help was invaluable for my project work.
                  Highly recommend to all IGNOU students!"
                </p>
                <div className="font-semibold">- Deepak Gupta, MA Student</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Success Community?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Become part of thousands of successful IGNOU students who trust us for their academic journey
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
