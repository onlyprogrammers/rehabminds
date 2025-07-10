import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, FileText, Calendar } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import ProductCard from "@/components/product-card"

export default function PreviousPapersPage() {
  const papers = [
    {
      id: "1",
      code: "BEGC-101",
      title: "An Introduction to Literature - June 2023",
      program: "BA",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.6,
      reviews: 2800,
      downloads: 8900,
      description: "Previous year question paper with detailed solutions and marking scheme",
      image: "/placeholder.svg?height=200&width=300",
      category: "paper" as const,
    },
    {
      id: "2",
      code: "BCS-011",
      title: "Computer Basics - December 2023",
      program: "BCA",
      semester: "1st",
      price: 49,
      originalPrice: 99,
      type: "premium" as const,
      rating: 4.8,
      reviews: 1900,
      downloads: 5600,
      description: "Latest question paper with complete solutions and exam pattern analysis",
      image: "/placeholder.svg?height=200&width=300",
      category: "paper" as const,
    },
    {
      id: "3",
      code: "BCOS-183",
      title: "Computer Application - June 2023",
      program: "B.Com",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.5,
      reviews: 3200,
      downloads: 11200,
      description: "Previous year paper with business application focus and detailed answers",
      image: "/placeholder.svg?height=200&width=300",
      category: "paper" as const,
    },
    {
      id: "4",
      code: "MCS-011",
      title: "Problem Solving - December 2023",
      program: "MCA",
      semester: "1st",
      price: 79,
      originalPrice: 149,
      type: "premium" as const,
      rating: 4.9,
      reviews: 1200,
      downloads: 3400,
      description: "Programming question paper with code solutions and algorithm explanations",
      image: "/placeholder.svg?height=200&width=300",
      category: "paper" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200">
        <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-4">
            <div className="relative">
              <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
              <Calendar className="absolute -bottom-1 -right-1 h-3 w-3 lg:h-4 lg:w-4 text-pink-500" />
            </div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Previous Question Papers</h1>
          </div>
          <p className="text-sm lg:text-lg text-gray-600">Past exam papers with solutions to boost your preparation</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-2 lg:px-4 py-2 lg:py-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search question papers..."
                  className="pl-8 lg:pl-10 h-8 lg:h-10 text-sm border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-20 lg:w-28 h-8 lg:h-10 text-xs lg:text-sm border-purple-200">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-24 lg:w-32 h-8 lg:h-10 text-xs lg:text-sm border-purple-200">
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
              <Button
                variant="outline"
                size="sm"
                className="h-8 lg:h-10 px-2 lg:px-4 border-purple-200 hover:bg-purple-50 bg-transparent"
              >
                <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
          {papers.map((paper) => (
            <ProductCard key={paper.id} {...paper} />
          ))}
        </div>
      </div>
    </div>
  )
}
