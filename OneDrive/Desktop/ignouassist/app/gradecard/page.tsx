import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Search, Download, Eye, AlertCircle } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"

export default function GradeCardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <SlidingNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">IGNOU Grade Card Portal</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            View and download your IGNOU results, grade cards, and track your academic progress. Get instant access to
            your examination results and academic records.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Search Your Grade Card</CardTitle>
              <CardDescription className="text-center">
                Enter your enrollment number and program details to view your results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="enrollment">Enrollment Number</Label>
                <Input
                  id="enrollment"
                  placeholder="Enter your IGNOU enrollment number"
                  className="text-center text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input id="program" placeholder="e.g., BCA, MCA, BA, MA, etc." className="text-center" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="examYear">Examination Year</Label>
                <Input id="examYear" placeholder="e.g., 2024, 2023" className="text-center" />
              </div>

              <Button className="w-full" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Search Grade Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Information Alert */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> This is a placeholder page. You mentioned you will provide the grade card section
              code later. The actual grade card functionality will be implemented once you provide the specific code and
              requirements.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Grade Card Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>View Results Online</CardTitle>
                <CardDescription>
                  Instantly view your examination results and grades online without any delay
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Download Grade Cards</CardTitle>
                <CardDescription>
                  Download official grade cards in PDF format for your records and applications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>
                  Track your overall academic progress and performance across all semesters
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Check Your Grade Card</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enter Enrollment Number</h3>
                  <p className="text-gray-600">Provide your valid IGNOU enrollment number in the search form</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Select Program</h3>
                  <p className="text-gray-600">Choose your program (BCA, MCA, BA, MA, etc.) from the options</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Specify Exam Year</h3>
                  <p className="text-gray-600">Enter the examination year for which you want to check results</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Search Results</h3>
                  <p className="text-gray-600">Click search to view your grade card and examination results</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Download & Save</h3>
                  <p className="text-gray-600">Download your grade card in PDF format for future reference</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Track Progress</h3>
                  <p className="text-gray-600">Monitor your academic progress and performance over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Need Help with Your Grade Card?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            If you're having trouble accessing your grade card or need assistance with your results, our support team is
            here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              View FAQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
