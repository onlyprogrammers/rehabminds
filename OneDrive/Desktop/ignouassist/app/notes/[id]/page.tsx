import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { Star, Download, CheckCircle, BookOpen, ArrowLeft, Eye } from "lucide-react"

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const note = {
    id: params.id,
    code: "BEGC-101",
    title: "An Introduction to Literature - Complete Study Notes",
    program: "BA",
    semester: "1st Semester",
    price: 149,
    originalPrice: 249,
    type: "premium",
    rating: 4.7,
    reviews: 5200,
    downloads: 15600,
    pages: 85,
    description:
      "Comprehensive study notes covering all units with examples, analysis, and key points highlighted for easy understanding and quick revision.",
    features: [
      "85 pages of detailed content",
      "Unit-wise organized notes",
      "Key points highlighted",
      "Examples and case studies",
      "Exam-focused content",
      "Multiple format support",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SlidingNavbar />

      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 lg:mb-6 text-sm">
          <Link href="/notes" className="flex items-center gap-1 text-green-600 hover:text-green-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Images */}
          <div className="space-y-2 lg:space-y-4">
            <div className="aspect-square lg:aspect-video bg-white rounded-lg overflow-hidden border border-green-200">
              <img src={note.images[0] || "/placeholder.svg"} alt={note.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {note.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border border-green-200">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${note.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 lg:space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800 text-xs lg:text-sm">
                  <BookOpen className="mr-1 h-3 w-3" />
                  {note.program}
                </Badge>
                <Badge variant="outline" className="text-xs lg:text-sm border-green-200">
                  {note.semester}
                </Badge>
                <Badge variant="outline" className="text-xs lg:text-sm border-green-200">
                  {note.pages} pages
                </Badge>
              </div>

              <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-2">
                {note.code} - {note.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < Math.floor(note.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm lg:text-base font-medium">{note.rating}</span>
                <span className="text-sm text-gray-600">({note.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <span className="text-2xl lg:text-4xl font-bold text-gray-900">₹{note.price}</span>
                <span className="text-lg lg:text-xl text-gray-500 line-through">₹{note.originalPrice}</span>
                <Badge className="bg-green-100 text-green-800">Study Material</Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6">
                <Button className="flex-1 h-10 lg:h-12 text-sm lg:text-base bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Notes
                </Button>
                <Button
                  variant="outline"
                  className="h-10 lg:h-12 px-3 lg:px-4 border-green-200 hover:bg-green-50 bg-transparent"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Preview
                </Button>
              </div>

              {/* Features */}
              <Card className="border-green-200">
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-base lg:text-lg text-green-800">Study Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
                  {note.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm lg:text-base">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-4 lg:mt-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-base lg:text-xl text-green-800">About These Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{note.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
