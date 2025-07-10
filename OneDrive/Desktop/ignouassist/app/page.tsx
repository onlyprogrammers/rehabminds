import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import HeroSlider from "@/components/hero-slider"
import {
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  Download,
  Calendar,
  Trophy,
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react"
import Head from "next/head"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Head>
        <title>Home - IGNOU Assist</title>
        <meta name="description" content="Your one-stop solution for IGNOU assignments, study materials, and more." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@450" />
      </Head>
      <SlidingNavbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Grid */}
      <section className="py-14 px-4 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="text-blue-600"> IGNOU Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From assignments to grade cards, we provide comprehensive support for your entire academic journey
            </p>
          </div>

          {/* Mobile: 2-column grid, Desktop: 4-column grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              {
                icon: FileText,
                title: "Premium Assignments",
                description: "Expert-written assignments with guaranteed high scores",
                color: "blue",
                badge: "Most Popular",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: BookOpen,
                title: "Study Notes",
                description: "Comprehensive notes simplified for easy understanding",
                color: "green",
                badge: "Free Available",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: Search,
                title: "Synopsis Help",
                description: "Expert guidance for project work and dissertations",
                color: "purple",
                badge: "Expert Support",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: Download,
                title: "Study Materials",
                description: "Books, papers, and resources for comprehensive preparation",
                color: "orange",
                badge: "Instant Access",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: Trophy,
                title: "Grade Cards",
                description: "Easy access to results and academic progress tracking",
                color: "red",
                badge: "Real-time",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: Calendar,
                title: "Exam Updates",
                description: "Latest exam schedules and important notifications",
                color: "indigo",
                badge: "Always Updated",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: Users,
                title: "Study Groups",
                description: "Connect with peers and join collaborative learning",
                color: "teal",
                badge: "Community",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                icon: GraduationCap,
                title: "Career Guidance",
                description: "Professional counseling for your future career path",
                color: "pink",
                badge: "Expert Advice",
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-24 lg:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-1 right-1 lg:top-2 lg:right-2">
                    <Badge
                      className={`text-xs lg:text-sm bg-${service.color}-100 text-${service.color}-700 border-${service.color}-200`}
                    >
                      {service.badge}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="text-center p-3 lg:p-6">
                  <div
                    className={`w-8 h-8 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-4 rounded-full bg-gradient-to-r from-${service.color}-100 to-${service.color}-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`h-4 w-4 lg:h-8 lg:w-8 text-${service.color}-600`} />
                  </div>
                  <CardTitle className="text-sm lg:text-xl mb-1 lg:mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-base text-gray-600 leading-relaxed hidden lg:block">
                    {service.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    className="mt-2 lg:mt-4 text-xs lg:text-base group-hover:bg-blue-50 group-hover:text-blue-600 p-1 lg:p-2"
                  >
                    Learn More{" "}
                    <ArrowRight className="ml-1 lg:ml-2 h-3 w-3 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-white/20 text-white border-white/30">Why Choose Us</Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Why 50,000+ Students
                <span className="text-yellow-300"> Trust Us</span>
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    title: "Quality Guaranteed",
                    description: "All materials reviewed by experts with 95% success rate",
                  },
                  {
                    icon: Clock,
                    title: "Lightning Fast Delivery",
                    description: "Get your assignments within 24 hours with priority support",
                  },
                  {
                    icon: Shield,
                    title: "100% Secure & Confidential",
                    description: "Your data is protected with bank-level security measures",
                  },
                  {
                    icon: Heart,
                    title: "Student-First Approach",
                    description: "Dedicated support team available 24/7 for your success",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <feature.icon className="h-6 w-6 text-yellow-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-2 group-hover:text-yellow-300 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold mb-6 text-center">Student Success Stats</h4>
                <div className="flex flex-row gap-4 justify-between">
                  {[
                    { label: "Students Helped", value: "50,000+", icon: Users },
                    { label: "Success Rate", value: "95%", icon: TrendingUp },
                    { label: "Courses Covered", value: "500+", icon: BookOpen },
                    { label: "Years Experience", value: "10+", icon: Award },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-300 group-hover:scale-110 transition-transform" />
                      <div className="text-xl font-bold text-yellow-300 mb-1">{stat.value}</div>
                      <p className="text-xs text-blue-100">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">Student Success Stories</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What Our Students Say</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Real stories from real students who achieved their dreams with our help
            </p>
          </div>

          {/* Mobile: flex-row, Desktop: 3 columns */}
          <div className="flex flex-row gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-8">
            {[
              {
                name: "Rahul Singh",
                program: "BCA Graduate",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "IGNOU Hub transformed my academic journey! Their assignments helped me score 85% consistently.",
              },
              {
                name: "Priya Sharma",
                program: "MBA Student",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "The study notes are comprehensive and easy to understand. I'm on track to complete my MBA with distinction!",
              },
              {
                name: "Deepak Gupta",
                program: "MA Graduate",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "Affordable pricing, excellent quality, and amazing support. The synopsis help was invaluable!",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-64 md:w-auto"
              >
                <CardHeader className="text-center p-4 md:p-8">
                  <div className="relative mb-3 md:mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full mx-auto border-4 border-blue-100"
                    />
                    <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                      Verified
                    </div>
                  </div>
                  <div className="flex justify-center mb-2 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-3 md:mb-6 italic leading-relaxed text-xs md:text-base">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 font-medium text-xs md:text-base">{testimonial.program}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Start Your
            <span className="text-yellow-300"> Success Story?</span>
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students and get access to premium study materials, expert guidance, and 24/7
            support for your IGNOU journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 text-white border-white/50 hover:bg-white/10 hover:border-white transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Users className="mr-2 h-5 w-5" />
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">IGNOU Hub</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for IGNOU academic success. We provide quality study materials, expert guidance,
                and comprehensive support to help you achieve your educational goals.
              </p>
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-400 ml-2">4.8/5 (2,500+ reviews)</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                {["Assignments", "Study Notes", "Synopsis Help", "Grade Cards", "Exam Updates"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                {["Help Center", "Contact Us", "FAQ", "Live Chat", "WhatsApp Support"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">📞</span>
                  </div>
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">📧</span>
                  </div>
                  <span>support@ignouHub.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">📍</span>
                  </div>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IGNOU Hub. All rights reserved. Made with ❤️ for IGNOU students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
