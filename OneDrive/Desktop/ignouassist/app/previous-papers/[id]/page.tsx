import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { Star, Download, Heart, Share2, CheckCircle, FileText, ArrowLeft, Calendar, Clock, Target } from "lucide-react"

export default function PaperDetailPage({ params }: { params: { id: string } }) {
  const paper = {
    id: params.id,
    code: "BEGC-101",
    title: "An Introduction to Literature - June 2023 Question Paper",
    program: "BA",
    semester: "1st Semester",
    examDate: "June 2023",
    price: 0,
    type: "free",
    rating: 4.6,
    reviews: 2800,
    downloads: 8900,
    duration: "3 hours",
    maxMarks: "100",
    description:
      "Previous year question paper with detailed solutions and marking scheme. Includes exam pattern analysis and preparation tips.",
    features: [
      "Original question paper",
      "Detailed solutions provided",
      "Marking scheme included",
      "Exam pattern analysis",
      "Time management tips",
      "Important topics highlighted",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <SlidingNavbar />

      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 lg:mb-6 text-sm">
          <Link href="/previous-papers" className="flex items-center gap-1 text-purple-600 hover:text-purple-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Question Papers
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Images */}
          <div className="space-y-2 lg:space-y-4">
            <div className="aspect-square lg:aspect-video bg-white rounded-lg overflow-hidden border border-purple-200">
              <img
                src={paper.images[0] || "/placeholder.svg"}
                alt={paper.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {paper.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border border-purple-200">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${paper.title} ${index + 2}`}
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
                <Badge className="bg-purple-100 text-purple-800 text-xs lg:text-sm">
                  <FileText className="mr-1 h-3 w-3" />
                  {paper.program}
                </Badge>
                <Badge variant="outline" className="text-xs lg:text-sm border-purple-200">
                  <Calendar className="mr-1 h-3 w-3" />
                  {paper.examDate}
                </Badge>
                {paper.price === 0 && <Badge className="bg-green-100 text-green-800 text-xs lg:text-sm">FREE</Badge>}
              </div>

              <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-2">
                {paper.code} - {paper.title}
              </h1>

              {/* Exam Details */}
              <div className="grid grid-cols-2 gap-4 mb-3 lg:mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm lg:text-base">Duration: {paper.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm lg:text-base">Max Marks: {paper.maxMarks}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < Math.floor(paper.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm lg:text-base font-medium">{paper.rating}</span>
                <span className="text-sm text-gray-600">({paper.reviews} reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6">
                <Button className="flex-1 h-10 lg:h-12 text-sm lg:text-base bg-purple-600 hover:bg-purple-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Paper
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 lg:h-12 lg:w-12 border-purple-200 bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 lg:h-12 lg:w-12 border-purple-200 bg-transparent"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Features */}
              <Card className="border-purple-200">
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-base lg:text-lg text-purple-800">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
                  {paper.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                      <span className="text-sm lg:text-base">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-4 lg:mt-8 border-purple-200">
          <CardHeader>
            <CardTitle className="text-base lg:text-xl text-purple-800">About This Paper</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{paper.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
