import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, FileText, BookOpen, PenTool } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import ProductCard from "@/components/product-card"

export default function SearchPage() {
  const searchResults = {
    assignments: [
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
    ],
    notes: [
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
    ],
    papers: [
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
    ],
  }

  const totalResults = searchResults.assignments.length + searchResults.notes.length + searchResults.papers.length

  return (
    <div className="min-h-screen bg-gray-50">
      <SlidingNavbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
          <div className="flex items-center gap-3 mb-2 lg:mb-4">
            <Search className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Search Results</h1>
          </div>
          <p className="text-sm lg:text-lg text-gray-600">
            Found {totalResults} results across assignments, notes, and question papers
          </p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-2 lg:py-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assignments, notes, papers..."
                  className="pl-8 lg:pl-10 h-8 lg:h-10 text-sm"
                />
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
              <Select>
                <SelectTrigger className="w-20 lg:w-28 h-8 lg:h-10 text-xs lg:text-sm">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8 lg:h-10 px-2 lg:px-4 bg-transparent">
                <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 lg:mb-6">
            <TabsTrigger value="all" className="text-xs lg:text-sm">
              All ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-xs lg:text-sm">
              <PenTool className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              Assignments ({searchResults.assignments.length})
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs lg:text-sm">
              <BookOpen className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              Notes ({searchResults.notes.length})
            </TabsTrigger>
            <TabsTrigger value="papers" className="text-xs lg:text-sm">
              <FileText className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              Papers ({searchResults.papers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {searchResults.assignments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Assignments</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {searchResults.assignments.map((item) => (
                      <ProductCard key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              )}

              {searchResults.notes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Study Notes</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {searchResults.notes.map((item) => (
                      <ProductCard key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              )}

              {searchResults.papers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Question Papers</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {searchResults.papers.map((item) => (
                      <ProductCard key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
              {searchResults.assignments.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
              {searchResults.notes.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="papers">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
              {searchResults.papers.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
