'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SignUpPage() {
  const router = useRouter()
  const [programme, setProgramme] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(formData: FormData) {
    const password = String(formData.get('password') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    setLoading(true)
    setMessage('')

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        enrollmentNumber: formData.get('enrollmentNumber'),
        programme,
        password,
      }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error || 'Signup failed')
      return
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Ignou Study Guide</span>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Save searches, upload materials, and access purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="Enter first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Enter last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber">IGNOU Enrollment Number</Label>
              <Input id="enrollmentNumber" name="enrollmentNumber" placeholder="Enter your enrollment number" />
            </div>

            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={programme} onValueChange={setProgramme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  {['BA', 'BCOM', 'BSC', 'BCA', 'MA', 'MCOM', 'MSC', 'MCA', 'MBA', 'BED', 'MED', 'OTHER'].map((item) => (
                    <SelectItem key={item} value={item.toLowerCase()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </Button>

            {message && <p className="text-sm text-red-600">{message}</p>}
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
