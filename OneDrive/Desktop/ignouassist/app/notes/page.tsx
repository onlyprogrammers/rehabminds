import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, BookOpen } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import ProductCard from "@/components/product-card"

export default function NotesPage() {
  const notes = [
    {
      id: "1",
      code: "BEGC-101",
      title: "An Introduction to Literature",
      program: "BA",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.7,
      reviews: 5200,
      downloads: 15600,
      description: "Complete study notes covering all units with examples, analysis, and key points highlighted",
      image: "/placeholder.svg?height=200&width=300",
      category: "note" as const,
    },
    {
      id: "2",
      code: "BCS-011",
      title: "Computer Basics and PC Software",
      program: "BCA",
      semester: "1st",
      price: 149,
      originalPrice: 249,
      type: "premium" as const,
      rating: 4.9,
      reviews: 3100,
      downloads: 8900,
      description: "Detailed notes with screenshots, practical examples, and comprehensive coverage",
      image: "/placeholder.svg?height=200&width=300",
      category: "note" as const,
    },
    {
      id: "3",
      code: "BCOS-183",
      title: "Computer Application in Business",
      program: "B.Com",
      semester: "1st",
      price: 0,
      type: "free" as const,
      rating: 4.6,
      reviews: 4800,
      downloads: 12300,
      description: "Business computer applications with real-world case studies and practical insights",
      image: "/placeholder.svg?height=200&width=300",
      category: "note" as const,
    },
    {
      id: "4",
      code: "MCS-011",
      title: "Problem Solving and Programming",
      program: "MCA",
      semester: "1st",
      price: 199,
      originalPrice: 349,
      type: "premium" as const,
      rating: 4.8,
      reviews: 2900,
      downloads: 6700,
      description: "Programming concepts, algorithms, and C language with solved examples and explanations",
      image: "/placeholder.svg?height=200&width=300",
      category: "note" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-4">
            <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Study Notes</h1>
          </div>
          <p className="text-sm lg:text-lg text-gray-600">
            Comprehensive study materials simplified for easy understanding
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-2 lg:px-4 py-2 lg:py-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search study notes..."
                  className="pl-8 lg:pl-10 h-8 lg:h-10 text-sm border-green-200 focus:border-green-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-24 lg:w-32 h-8 lg:h-10 text-xs lg:text-sm border-green-200">
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
                className="h-8 lg:h-10 px-2 lg:px-4 border-green-200 hover:bg-green-50 bg-transparent"
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
          {notes.map((note) => (
            <ProductCard key={note.id} {...note} />
          ))}
        </div>
      </div>
    </div>
  )
}
