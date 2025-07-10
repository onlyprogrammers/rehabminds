import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">IGNOU Hub</span>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join thousands of successful IGNOU students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter last name" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 9876543210" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollmentNumber">IGNOU Enrollment Number</Label>
            <Input id="enrollmentNumber" placeholder="Enter your enrollment number" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ba">Bachelor of Arts (BA)</SelectItem>
                <SelectItem value="bcom">Bachelor of Commerce (B.Com)</SelectItem>
                <SelectItem value="bsc">Bachelor of Science (B.Sc)</SelectItem>
                <SelectItem value="bca">Bachelor of Computer Applications (BCA)</SelectItem>
                <SelectItem value="ma">Master of Arts (MA)</SelectItem>
                <SelectItem value="mcom">Master of Commerce (M.Com)</SelectItem>
                <SelectItem value="msc">Master of Science (M.Sc)</SelectItem>
                <SelectItem value="mca">Master of Computer Applications (MCA)</SelectItem>
                <SelectItem value="mba">Master of Business Administration (MBA)</SelectItem>
                <SelectItem value="bed">Bachelor of Education (B.Ed)</SelectItem>
                <SelectItem value="med">Master of Education (M.Ed)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a strong password" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
