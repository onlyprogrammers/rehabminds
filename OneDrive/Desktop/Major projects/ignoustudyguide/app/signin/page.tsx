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

export default function SignInPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(formData: FormData) {
    setLoading(true)
    setMessage('')

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: formData.get('login'),
        password: formData.get('password'),
      }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error || 'Sign in failed')
      return
    }

    router.push(data.user?.role === 'admin' ? '/admin' : '/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Ignou Study Guide</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access saved papers, uploads, and purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Email or Enrollment Number</Label>
              <Input id="login" name="login" type="text" placeholder="your.email@example.com or enrollment number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </Button>

            {message && <p className="text-sm text-red-600">{message}</p>}
          </form>

          <div className="mt-4 text-center text-sm">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

