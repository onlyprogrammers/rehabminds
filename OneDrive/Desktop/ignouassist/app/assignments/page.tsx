import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import ProductCard from "@/components/product-card"

export default function AssignmentsPage() {
  const assignments = [
    {
      id: "1",
      code: "BEGC-101",
      title: "An Introduction to Literature",
      program: "BA",
      semester: "1st",
      price: 0,
      originalPrice: 199,
      type: "free" as const,
      rating: 4.8,
      reviews: 1250,
      downloads: 5200,
      description: "Comprehensive assignment covering poetry, prose, and drama analysis with detailed explanations",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
    {
      id: "2",
      code: "BCS-011",
      title: "Computer Basics and PC Software",
      program: "BCA",
      semester: "1st",
      price: 149,
      originalPrice: 299,
      type: "premium" as const,
      rating: 4.9,
      reviews: 890,
      downloads: 3100,
      description: "Complete assignment with practical examples, screenshots, and step-by-step solutions",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
    {
      id: "3",
      code: "BCOS-183",
      title: "Computer Application in Business",
      program: "B.Com",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.7,
      reviews: 2100,
      downloads: 7800,
      description: "Business applications of computers with real-world case studies and examples",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
    {
      id: "4",
      code: "MCS-011",
      title: "Problem Solving and Programming",
      program: "MCA",
      semester: "1st",
      price: 249,
      originalPrice: 399,
      type: "premium" as const,
      rating: 4.9,
      reviews: 567,
      downloads: 2200,
      description: "Programming concepts with C language examples, algorithms, and complete solutions",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
    {
      id: "5",
      code: "BPSC-101",
      title: "Introduction to Political Theory",
      program: "BA",
      semester: "1st",
      price: 99,
      originalPrice: 199,
      type: "premium" as const,
      rating: 4.6,
      reviews: 743,
      downloads: 1900,
      description: "Political theory concepts with contemporary examples and detailed analysis",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
    {
      id: "6",
      code: "BEVAE-181",
      title: "Environmental Studies",
      program: "All Programs",
      semester: "Any",
      price: 0,
      type: "free" as const,
      rating: 4.5,
      reviews: 3200,
      downloads: 12500,
      description: "Environmental awareness and conservation strategies with practical applications",
      image: "/placeholder.svg?height=200&width=300",
      category: "assignment" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">IGNOU Assignments</h1>
          <p className="text-sm lg:text-lg text-gray-600">
            Premium assignments with guaranteed high scores and expert guidance
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-2 lg:py-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search assignments..." className="pl-8 lg:pl-10 h-8 lg:h-10 text-sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-24 lg:w-32 h-8 lg:h-10 text-xs lg:text-sm">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ba">BA</SelectItem>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bcom">B.Com</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8 lg:h-10 px-2 lg:px-4 bg-transparent">
                <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
          {assignments.map((assignment) => (
            <ProductCard key={assignment.id} {...assignment} />
          ))}
        </div>
      </div>
    </div>
  )
}
