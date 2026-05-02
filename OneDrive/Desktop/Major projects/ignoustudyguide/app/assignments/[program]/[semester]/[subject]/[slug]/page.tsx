import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingNavbar } from "@/components/sliding-navbar"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Eye,
  BookOpen,
  Download,
  Users,
  Calendar,
} from "lucide-react"

export default function AssignmentDetailPage({
  params,
}: {
  params: {
    program: string
    semester: string
    subject: string
    slug: string
  }
}) {
  // Extract info from params
  const programName = params.program.replace("-assignments", "").toUpperCase()
  const semesterName = params.semester.replace("-assignments", "").replace("-", " ")
  const subjectCode = params.subject.toUpperCase()

  // Mock assignment data based on slug
  const assignmentData = {
    "bcs011-assignment-1": {
      id: "bcs011-assignment-1",
      code: "BCS-011",
      title: "Computer Basics and PC Software - Detailed Solutions",
      program: programName,
      semester: semesterName,
      price: 0,
      originalPrice: 199,
      type: "free",
      rating: 4.8,
      reviews: 1250,
      downloads: 5200,
      pages: 45,
      wordCount: 8500,
      description:
        "Comprehensive assignment solution covering all units of Computer Basics and PC Software. Includes detailed explanations, practical examples, screenshots, and step-by-step solutions for all questions. This assignment follows proper IGNOU formatting guidelines and includes references from recommended textbooks.",
      features: [
        "Complete coverage of all units (1-4)",
        "Proper IGNOU formatting and structure",
        "Plagiarism-free original content",
        "Expert-written solutions with explanations",
        "Screenshots and practical examples included",
        "References from IGNOU study materials",
        "Instant download after purchase",
        "Free revisions if needed",
      ],
      tableOfContents: [
        "Unit 1: Introduction to Computers",
        "Unit 2: Computer Hardware",
        "Unit 3: Operating Systems",
        "Unit 4: PC Software Applications",
        "Practical Exercises",
        "References and Bibliography",
      ],
      author: {
        name: "Dr. Rajesh Kumar",
        qualification: "Ph.D. Computer Science",
        experience: "15+ years",
        rating: 4.9,
        assignments: 45,
      },
    },
    "bcs011-assignment-2": {
      id: "bcs011-assignment-2",
      code: "BCS-011",
      title: "Computer Basics and PC Software - Premium Quality",
      program: programName,
      semester: semesterName,
      price: 149,
      originalPrice: 299,
      type: "premium",
      rating: 4.9,
      reviews: 890,
      downloads: 3100,
      pages: 52,
      wordCount: 9800,
      description:
        "Premium quality assignment with enhanced content, practical examples, and industry insights. Features advanced formatting, detailed diagrams, and comprehensive coverage of all topics with real-world applications.",
      features: [
        "Premium quality content with industry insights",
        "Advanced formatting and professional presentation",
        "Detailed diagrams and flowcharts",
        "Real-world practical examples",
        "Case studies and applications",
        "Expert review and quality assurance",
        "24-hour customer support",
        "Money-back guarantee",
      ],
      tableOfContents: [
        "Unit 1: Computer Fundamentals (Enhanced)",
        "Unit 2: Hardware Components (Detailed)",
        "Unit 3: Operating Systems (Advanced)",
        "Unit 4: Software Applications (Comprehensive)",
        "Industry Case Studies",
        "Practical Implementations",
        "Future Trends and Technologies",
        "References and Further Reading",
      ],
      author: {
        name: "Prof. Anita Sharma",
        qualification: "M.Tech, Ph.D. Computer Science",
        experience: "20+ years",
        rating: 4.9,
        assignments: 78,
      },
    },
    // Add more assignment data as needed
  }

  // Get assignment data or default
  const assignment = assignmentData[params.slug as keyof typeof assignmentData] || assignmentData["bcs011-assignment-1"]

  const discount =
    assignment.originalPrice > assignment.price
      ? Math.round(((assignment.originalPrice - assignment.price) / assignment.originalPrice) * 100)
      : 0

  // Related assignments (same subject, different versions)
  const relatedAssignments = [
    {
      id: "bcs011-assignment-3",
      title: "Computer Basics - Expert Written",
      price: 199,
      rating: 4.7,
      type: "premium",
    },
    {
      id: "bcs011-assignment-4",
      title: "Computer Basics - Quick Solutions",
      price: 99,
      rating: 4.5,
      type: "premium",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SlidingNavbar />

      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
          <Link href="/assignments" className="text-blue-600 hover:text-blue-800">
            Assignments
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/assignments/${params.program}`} className="text-blue-600 hover:text-blue-800">
            {programName}
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/assignments/${params.program}/${params.semester}`}
            className="text-blue-600 hover:text-blue-800 capitalize"
          >
            {semesterName}
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/assignments/${params.program}/${params.semester}?subject=${subjectCode}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {subjectCode}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Assignment Details</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Preview Images */}
            <div className="space-y-4">
              <div className="aspect-video bg-white rounded-lg overflow-hidden border shadow-sm">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Assignment+Preview"
                  alt={assignment.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-video bg-white rounded-lg overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Table+of+Contents"
                    alt="Table of Contents"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video bg-white rounded-lg overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Sample+Pages"
                    alt="Sample Pages"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video bg-white rounded-lg overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=References"
                    alt="References"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Assignment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">{assignment.description}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{assignment.pages}</div>
                    <div className="text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{assignment.wordCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{assignment.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{assignment.downloads.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {assignment.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {assignment.tableOfContents.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 p-2 hover:bg-gray-50 rounded">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                        {index + 1}
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Author Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {assignment.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">{assignment.author.name}</h4>
                    <p className="text-blue-600 font-medium mb-2">{assignment.author.qualification}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{assignment.author.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600">{assignment.author.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{assignment.author.assignments} assignments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium">Excellent Quality!</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "This assignment helped me understand the concepts clearly. Well-structured and comprehensive
                      content."
                    </p>
                    <p className="text-xs text-gray-500">- Rahul S., BCA Student</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Good Content</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "Detailed explanations and good formatting. Helped me score well in my assignment."
                    </p>
                    <p className="text-xs text-gray-500">- Priya M., BCA Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-100 text-blue-800">{assignment.program}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {assignment.semester}
                  </Badge>
                  <Badge variant={assignment.type === "free" ? "secondary" : "default"}>
                    {assignment.type === "free" ? "FREE" : "PREMIUM"}
                  </Badge>
                </div>

                <h1 className="text-xl font-bold text-gray-900 mb-3">{assignment.code} Assignment</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(assignment.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{assignment.rating}</span>
                  <span className="text-sm text-gray-600">({assignment.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  {assignment.price === 0 ? (
                    <span className="text-3xl font-bold text-green-600">FREE</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-gray-900">₹{assignment.price}</span>
                      {assignment.originalPrice > assignment.price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">₹{assignment.originalPrice}</span>
                          <Badge className="bg-red-100 text-red-800">-{discount}% OFF</Badge>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  {assignment.price === 0 ? (
                    <Button className="w-full h-12 text-base bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Free
                    </Button>
                  ) : (
                    <Button className="w-full h-12 text-base">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy Now
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xs font-medium">Secure</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs font-medium">Instant</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Award className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs font-medium">Quality</p>
                  </div>
                </div>

                {/* Download Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{assignment.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{assignment.pages} pages</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">More {subjectCode} Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedAssignments.map((related) => (
                    <Link
                      key={related.id}
                      href={`/assignments/${params.program}/${params.semester}/${params.subject}/${related.id}`}
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{related.title}</h4>
                        <Badge variant={related.type === "free" ? "secondary" : "default"} className="ml-2 text-xs">
                          {related.type === "free" ? "FREE" : `₹${related.price}`}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{related.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
