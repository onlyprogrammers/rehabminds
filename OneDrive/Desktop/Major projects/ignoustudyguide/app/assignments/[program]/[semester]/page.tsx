"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowLeft, BookOpen } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { use } from "react"

export default function SemesterAssignmentsPage({ params }: { params: { program: string; semester: string } }) {
  const searchParams = useSearchParams()
  const selectedSubject = searchParams.get("subject")
  const callparam = use(params)
  // Extract program and semester info
  const programName = callparam.program.replace("-assignments", "").toUpperCase()
  const semesterName = callparam.semester.replace("-assignments", "").replace("-", " ")

  // Mock assignments data with multiple assignments per subject
  const allAssignments = [
    // BCS-011 Multiple Assignments
    {
      id: "bcs011-assignment-1",
      code: "BCS-011",
      title: "Computer Basics - Assignment 1 (Detailed Solutions)",
      program: "BCA",
      semester: "1st",
      price: 0,
      originalPrice: 199,
      type: "free" as const,
      rating: 4.8,
      reviews: 1250,
      downloads: 5200,
      description: "Comprehensive assignment covering computer fundamentals with detailed explanations",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Dr. Rajesh Kumar",
      pages: 45,
    },
    {
      id: "bcs011-assignment-2",
      code: "BCS-011",
      title: "Computer Basics - Assignment 2 (Premium Quality)",
      program: "BCA",
      semester: "1st",
      price: 149,
      originalPrice: 299,
      type: "premium" as const,
      rating: 4.9,
      reviews: 890,
      downloads: 3100,
      description: "Premium quality assignment with practical examples and screenshots",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Prof. Anita Sharma",
      pages: 52,
    },
    {
      id: "bcs011-assignment-3",
      code: "BCS-011",
      title: "Computer Basics - Assignment 3 (Expert Written)",
      program: "BCA",
      semester: "1st",
      price: 199,
      originalPrice: 399,
      type: "premium" as const,
      rating: 4.7,
      reviews: 567,
      downloads: 2200,
      description: "Expert written assignment with industry insights and real-world examples",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Mr. Vikash Singh",
      pages: 48,
    },
    // BCS-012 Multiple Assignments
    {
      id: "bcs012-assignment-1",
      code: "BCS-012",
      title: "Mathematics - Assignment 1 (Step-by-Step Solutions)",
      program: "BCA",
      semester: "1st",
      price: 99,
      originalPrice: 199,
      type: "premium" as const,
      rating: 4.6,
      reviews: 743,
      downloads: 1900,
      description: "Mathematical concepts with step-by-step problem solving techniques",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Dr. Priya Gupta",
      pages: 38,
    },
    {
      id: "bcs012-assignment-2",
      code: "BCS-012",
      title: "Mathematics - Assignment 2 (Complete Guide)",
      program: "BCA",
      semester: "1st",
      price: 179,
      originalPrice: 299,
      type: "premium" as const,
      rating: 4.8,
      reviews: 654,
      downloads: 2800,
      description: "Complete mathematical guide with formulas, theorems and solved examples",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Prof. Suresh Kumar",
      pages: 55,
    },
    // ECO-01 Multiple Assignments
    {
      id: "eco01-assignment-1",
      code: "ECO-01",
      title: "Business Organization - Assignment 1 (Free Version)",
      program: "BCA",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.5,
      reviews: 2100,
      downloads: 7800,
      description: "Basic business organization concepts with fundamental principles",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Ms. Neha Agarwal",
      pages: 35,
    },
    {
      id: "eco01-assignment-2",
      code: "ECO-01",
      title: "Business Organization - Assignment 2 (Premium Edition)",
      program: "BCA",
      semester: "1st",
      price: 129,
      originalPrice: 249,
      type: "premium" as const,
      rating: 4.7,
      reviews: 1200,
      downloads: 4500,
      description: "Premium edition with case studies, practical examples and detailed analysis",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Dr. Amit Verma",
      pages: 42,
    },
    // ECO-02 Multiple Assignments
    {
      id: "eco02-assignment-1",
      code: "ECO-02",
      title: "Accountancy-1 - Assignment 1 (Basic Version)",
      program: "BCA",
      semester: "1st",
      price: 99,
      originalPrice: 199,
      type: "premium" as const,
      rating: 4.4,
      reviews: 567,
      downloads: 1800,
      description: "Basic accounting principles with journal entries and ledger preparation",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "CA Ravi Sharma",
      pages: 40,
    },
    {
      id: "eco02-assignment-2",
      code: "ECO-02",
      title: "Accountancy-1 - Assignment 2 (Advanced Solutions)",
      program: "BCA",
      semester: "1st",
      price: 199,
      originalPrice: 399,
      type: "premium" as const,
      rating: 4.8,
      reviews: 890,
      downloads: 3200,
      description: "Advanced accounting solutions with financial statements and ratio analysis",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Prof. Sunita Jain",
      pages: 58,
    },
    // ENG-01 Multiple Assignments
    {
      id: "eng01-assignment-1",
      code: "ENG-01",
      title: "English - Assignment 1 (Grammar Focus)",
      program: "BCA",
      semester: "1st",
      price: 79,
      originalPrice: 149,
      type: "premium" as const,
      rating: 4.3,
      reviews: 456,
      downloads: 1500,
      description: "English grammar, vocabulary and communication skills development",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Ms. Pooja Singh",
      pages: 32,
    },
    {
      id: "eng01-assignment-2",
      code: "ENG-01",
      title: "English - Assignment 2 (Communication Skills)",
      program: "BCA",
      semester: "1st",
      price: 119,
      originalPrice: 199,
      type: "premium" as const,
      rating: 4.6,
      reviews: 678,
      downloads: 2100,
      description: "Advanced communication skills with business English and presentation techniques",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
      author: "Dr. Meera Patel",
      pages: 45,
    },
  ]

  // Filter assignments by selected subject if any
  const filteredAssignments = selectedSubject
    ? allAssignments.filter((assignment) => assignment.code === selectedSubject)
    : allAssignments

  // Get unique subject codes for filter dropdown
  const uniqueSubjects = [...new Set(allAssignments.map((assignment) => assignment.code))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/assignments" className="text-blue-600 hover:text-blue-800">
              Assignments
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/assignments/${params.program}`} className="text-blue-600 hover:text-blue-800">
              {programName}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 capitalize">{semesterName}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900 capitalize">
                {programName} - {semesterName} Assignments
              </h1>
              {selectedSubject && (
                <p className="text-sm lg:text-base text-blue-600 font-medium">
                  Showing {filteredAssignments.length} assignments for: {selectedSubject}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm lg:text-lg text-gray-600">
            {selectedSubject
              ? `Multiple assignment solutions available for ${selectedSubject} subject`
              : `All assignments for ${semesterName} semester`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assignments..."
                  className="pl-10 h-10 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32 h-10">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-24 h-10">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-10 px-4 bg-transparent">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center mobflex">
            <div>
              <div className="text-2xl lg:text-3xl font-bold mb-1">{filteredAssignments.length}</div>
              <div className="text-sm text-blue-100">Assignments</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold mb-1">
                {filteredAssignments.filter((a) => a.type === "free").length}
              </div>
              <div className="text-sm text-blue-100">Free</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold mb-1">4.7</div>
              <div className="text-sm text-blue-100">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold mb-1">
                {Math.round(filteredAssignments.reduce((sum, a) => sum + a.downloads, 0) / 1000)}K+
              </div>
              <div className="text-sm text-blue-100">Downloads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Selection Info */}
      {selectedSubject && (
        <div className="bg-blue-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedSubject.split("-")[1]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedSubject}</h3>
                  <p className="text-sm text-gray-600">
                    {filteredAssignments.length} different assignment solutions available
                  </p>
                </div>
              </div>
              <Link href={`/assignments/${params.program}/${params.semester}`}>
                <Button variant="outline" size="sm">
                  View All Subjects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Grid */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredAssignments.map((assignment) => (
              <Link
                key={assignment.id}
                href={`/assignments/${callparam.program}/${callparam.semester}/${assignment.code.toLowerCase()}/${assignment.id}`}
              >
                <ProductCard {...assignment} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600 mb-6">
              {selectedSubject
                ? `No assignments available for ${selectedSubject} yet.`
                : `No assignments available for ${semesterName} yet.`}
            </p>
            <Link href={`/assignments/${params.program}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Semester Selection
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
