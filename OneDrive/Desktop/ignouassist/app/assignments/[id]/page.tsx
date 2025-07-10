import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { Star, ShoppingCart, Heart, Share2, CheckCircle, Clock, ArrowLeft, Shield, Award } from "lucide-react"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const assignment = {
    id: params.id,
    code: "BEGC-101",
    title: "An Introduction to Literature",
    program: "BA",
    semester: "1st Semester",
    price: 199,
    originalPrice: 299,
    type: "premium",
    rating: 4.8,
    reviews: 1250,
    downloads: 5200,
    description:
      "Comprehensive assignment covering poetry, prose, and drama analysis with detailed explanations and examples. This assignment includes all units with proper formatting, references, and plagiarism-free content.",
    features: [
      "Complete coverage of all units",
      "Proper IGNOU formatting",
      "Plagiarism-free content",
      "Expert-written solutions",
      "24-hour delivery",
      "Free revisions included",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const discount = Math.round(((assignment.originalPrice - assignment.price) / assignment.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <SlidingNavbar />

      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 lg:mb-6 text-sm">
          <Link href="/assignments" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Images */}
          <div className="space-y-2 lg:space-y-4">
            <div className="aspect-square lg:aspect-video bg-white rounded-lg overflow-hidden border">
              <img
                src={assignment.images[0] || "/placeholder.svg"}
                alt={assignment.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {assignment.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${assignment.title} ${index + 2}`}
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
                <Badge className="bg-blue-100 text-blue-800 text-xs lg:text-sm">{assignment.program}</Badge>
                <Badge variant="outline" className="text-xs lg:text-sm">
                  {assignment.semester}
                </Badge>
              </div>

              <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-2">
                {assignment.code} - {assignment.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < Math.floor(assignment.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm lg:text-base font-medium">{assignment.rating}</span>
                <span className="text-sm text-gray-600">({assignment.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <span className="text-2xl lg:text-4xl font-bold text-gray-900">₹{assignment.price}</span>
                <span className="text-lg lg:text-xl text-gray-500 line-through">₹{assignment.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">-{discount}% OFF</Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6">
                <Button className="flex-1 h-10 lg:h-12 text-sm lg:text-base">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 lg:h-12 lg:w-12 bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 lg:h-12 lg:w-12 bg-transparent">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Features */}
              <Card>
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-base lg:text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
                  {assignment.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm lg:text-base">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                <div className="text-center p-2 lg:p-3 bg-white rounded-lg border">
                  <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-green-500 mx-auto mb-1" />
                  <p className="text-xs lg:text-sm font-medium">Secure</p>
                </div>
                <div className="text-center p-2 lg:p-3 bg-white rounded-lg border">
                  <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs lg:text-sm font-medium">Fast Delivery</p>
                </div>
                <div className="text-center p-2 lg:p-3 bg-white rounded-lg border">
                  <Award className="h-5 w-5 lg:h-6 lg:w-6 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs lg:text-sm font-medium">Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-4 lg:mt-8">
          <CardHeader>
            <CardTitle className="text-base lg:text-xl">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{assignment.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
