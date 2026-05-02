import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from 'next'
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { GraduationCap, BookOpen, FileText, PenTool, Calendar, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/ui/footer"

export const metadata: Metadata = {
  title: 'Browse IGNOU Study Materials – Assignments, Notes & Question Papers',
  description: 'Browse IGNOU study materials by program, semester, and category. Find assignments, study notes, and previous year question papers for BA, BCA, MCA, MA, and all other IGNOU programs.',
  keywords: ['browse IGNOU materials', 'IGNOU assignments by program', 'IGNOU notes by semester', 'IGNOU BA assignments', 'IGNOU BCA notes', 'IGNOU MCA papers'],
}

export default function BrowsePage() {
  const programs = [
    { name: "BA", fullName: "Bachelor of Arts", count: 45, color: "bg-blue-100 text-blue-800" },
    { name: "BCA", fullName: "Bachelor of Computer Applications", count: 32, color: "bg-green-100 text-green-800" },
    { name: "B.Com", fullName: "Bachelor of Commerce", count: 28, color: "bg-purple-100 text-purple-800" },
    { name: "MCA", fullName: "Master of Computer Applications", count: 24, color: "bg-orange-100 text-orange-800" },
    { name: "MA", fullName: "Master of Arts", count: 18, color: "bg-pink-100 text-pink-800" },
    { name: "M.Com", fullName: "Master of Commerce", count: 15, color: "bg-indigo-100 text-indigo-800" },
  ]

  const semesters = [
    { name: "1st", count: 42 },
    { name: "2nd", count: 38 },
    { name: "3rd", count: 35 },
    { name: "4th", count: 32 },
    { name: "5th", count: 28 },
    { name: "6th", count: 25 },
  ]

  const categories = [
    {
      name: "Assignments",
      icon: PenTool,
      count: 156,
      description: "Premium assignments with guaranteed high scores",
      href: "/assignments",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Study Notes",
      icon: BookOpen,
      count: 89,
      description: "Comprehensive study materials simplified for easy understanding",
      href: "/notes",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Question Papers",
      icon: FileText,
      count: 73,
      description: "Past exam papers with solutions to boost your preparation",
      href: "/previous-papers",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const stats = [
    { label: "Total Materials", value: "318", icon: FileText },
    { label: "Programs Covered", value: "12", icon: GraduationCap },
    { label: "Happy Students", value: "25K+", icon: Users },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-6 lg:py-12">
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">Browse Study Materials</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of assignments, notes, and question papers organized by programs and
              semesters
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-4 lg:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:px-4 py-6 lg:py-12">
        {/* Categories */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Browse by Category</h2>
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className={`${category.bgColor} border-0 hover:shadow-lg transition-shadow cursor-pointer`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} items
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Browse by Program</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {programs.map((program) => (
              <Card key={program.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
                      <span className="font-semibold text-sm lg:text-base">{program.name}</span>
                    </div>
                    <Badge className={`${program.color} text-xs`}>{program.count}</Badge>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600">{program.fullName}</p>
                  <div className="mt-2 lg:mt-3 flex gap-1 lg:gap-2">
                    <Link
                      href={`/assignments/category/${program.name.toLowerCase()}`}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Assignments
                    </Link>
                    <span className="text-xs text-gray-400">•</span>
                    <Link
                      href={`/notes/category/${program.name.toLowerCase()}`}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Notes
                    </Link>
                    <span className="text-xs text-gray-400">•</span>
                    <Link
                      href={`/previous-papers/category/${program.name.toLowerCase()}`}
                      className="text-xs text-purple-600 hover:text-purple-800"
                    >
                      Papers
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Semesters */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Browse by Semester</h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {semesters.map((semester) => (
              <Link key={semester.name} href={`/assignments/semester/${semester.name}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 lg:p-4 text-center">
                    <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-sm lg:text-base">{semester.name} Semester</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {semester.count} items
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
