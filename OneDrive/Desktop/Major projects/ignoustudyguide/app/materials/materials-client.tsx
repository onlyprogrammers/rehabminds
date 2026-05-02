'use client'

import { useState, useEffect } from 'react'
import { Download, IndianRupee, Loader2, Upload, Lock, CheckCircle, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Material = {
  id: string
  title: string
  description: string | null
  material_type: string
  programme: string | null
  course_code: string | null
  price_paise: number
  currency: string
  file_url: string
  seller_name: string | null
  status?: string
}

function statusBadge(status: string | undefined) {
  if (status === 'approved') return (
    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
      <CheckCircle className="h-3 w-3" /> Approved
    </span>
  )
  if (status === 'rejected') return (
    <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
      <XCircle className="h-3 w-3" /> Rejected
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
      <Clock className="h-3 w-3" /> Pending
    </span>
  )
}

export function MaterialsClient({ initialMaterials }: { initialMaterials: Material[] }) {
  const [materials, setMaterials] = useState(initialMaterials)
  const [materialType, setMaterialType] = useState('assignment')
  const [fileUrl, setFileUrl] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [myMaterials, setMyMaterials] = useState<Material[]>([])
  const [myMaterialsLoading, setMyMaterialsLoading] = useState(false)
  const [detectedSemester, setDetectedSemester] = useState('')
  const [courseCodeInput, setCourseCodeInput] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        setIsLoggedIn(!!data.user)
        if (data.user) {
          loadMyMaterials()
        }
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  async function loadMyMaterials() {
    setMyMaterialsLoading(true)
    try {
      const res = await fetch('/api/materials?mine=true&status=approved')
      const data = await res.json()
      setMyMaterials(data.materials || [])
    } catch {
      setMyMaterials([])
    } finally {
      setMyMaterialsLoading(false)
    }
  }

  async function handleCourseCodeChange(value: string) {
    setCourseCodeInput(value)
    if (value.trim().length < 3) {
      setDetectedSemester('')
      return
    }
    try {
      const res = await fetch(`/api/programmes?courseCode=${encodeURIComponent(value.trim())}`)
      const data = await res.json()
      if (data.semester) {
        setDetectedSemester(data.semester)
      } else {
        setDetectedSemester('')
      }
    } catch {
      setDetectedSemester('')
    }
  }

  async function uploadFile(file: File) {
    setUploading(true)
    setMessage('')

    const presignResponse = await fetch('/api/uploads/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, contentType: file.type || 'application/octet-stream' }),
    })
    const presign = await presignResponse.json()

    if (!presignResponse.ok) {
      setUploading(false)
      setMessage(presign.error || 'File upload is not configured')
      return
    }

    const uploadResponse = await fetch(presign.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })

    setUploading(false)
    if (!uploadResponse.ok) {
      setMessage('File upload failed')
      return
    }

    setFileUrl(presign.fileUrl)
    setMessage('File uploaded. Submit it for admin review.')
  }

  async function submitMaterial(formData: FormData) {
    setLoading(true)
    setMessage('')

    const payload = Object.fromEntries(formData.entries())
    const response = await fetch('/api/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, materialType, semester: detectedSemester || undefined }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error || 'Upload failed')
      return
    }

    setMessage('Material submitted for admin review.')
    if (isLoggedIn) loadMyMaterials()
  }

  async function checkout(material: Material) {
    if (material.price_paise <= 0) {
      window.open(material.file_url, '_blank', 'noopener,noreferrer')
      return
    }

    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materialId: material.id }),
    })
    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      setMessage(data.error || 'Payment could not start')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-6">
        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Upload material</h2>
          </div>

          {isLoggedIn === false && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center mb-4">
              <Lock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800 mb-1">Login required to upload</p>
              <p className="text-sm text-gray-600 mb-4">You must be signed in to upload study materials.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/signin">
                  <Button size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
          )}

          <form action={submitMaterial} className="space-y-4" style={{ display: isLoggedIn ? undefined : 'none' }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sellerName">Your name</Label>
                <Input id="sellerName" name="sellerName" placeholder="Seller name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerEmail">Email</Label>
                <Input id="sellerEmail" name="sellerEmail" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="MCS-011 solved assignment" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Short details, session, language, and contents" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={materialType} onValueChange={setMaterialType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="programme">Programme</Label>
                <Input id="programme" name="programme" placeholder="BCA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course code</Label>
                <Input
                  id="courseCode"
                  name="courseCode"
                  placeholder="BCS-011"
                  value={courseCodeInput}
                  onChange={(e) => handleCourseCodeChange(e.target.value)}
                />
                {detectedSemester && (
                  <p className="text-xs text-green-600">Detected: {detectedSemester}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fileUrl">File URL</Label>
                <Input
                  id="fileUrl"
                  name="fileUrl"
                  value={fileUrl}
                  onChange={(event) => setFileUrl(event.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previewUrl">Preview URL</Label>
                <Input id="previewUrl" name="previewUrl" placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialFile">Upload file</Label>
              <Input
                id="materialFile"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) uploadFile(file)
                }}
              />
              {uploading && <p className="text-sm text-gray-600">Uploading file...</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price in INR</Label>
              <Input id="price" name="price" type="number" min="0" step="1" placeholder="0 for free" />
            </div>

            <Button disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Submit for review
            </Button>
            {message && <p className="text-sm text-gray-600">{message}</p>}
          </form>
        </section>

        {isLoggedIn && (
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Your approved uploads</h2>
            </div>

            {myMaterialsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : myMaterials.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No approved materials yet. Submit something above!
              </p>
            ) : (
              <div className="space-y-3">
                {myMaterials.map((m) => (
                  <div key={m.id} className="rounded-lg border border-green-100 bg-green-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1 mb-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{m.material_type}</span>
                          {m.programme && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{m.programme}</span>}
                          {m.course_code && <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{m.course_code}</span>}
                          {statusBadge(m.status)}
                        </div>
                        <p className="font-medium text-sm text-gray-900 truncate">{m.title}</p>
                        {m.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{m.description}</p>}
                      </div>
                      <span className="text-xs font-bold text-blue-600 flex-shrink-0">
                        {m.price_paise === 0 ? 'Free' : `₹${m.price_paise / 100}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Available materials</h2>
          <p className="text-sm text-gray-600">Approved student uploads and study resources.</p>
        </div>

        <div className="grid gap-4">
          {materials.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
              No approved materials yet.
            </div>
          ) : (
            materials.map((material) => (
              <article key={material.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">{material.material_type}</span>
                      {material.programme && <span>{material.programme}</span>}
                      {material.course_code && <span>{material.course_code}</span>}
                    </div>
                    <h3 className="font-semibold text-gray-900">{material.title}</h3>
                    {material.description && <p className="mt-1 text-sm text-gray-600">{material.description}</p>}
                    {material.seller_name && <p className="mt-2 text-xs text-gray-500">By {material.seller_name}</p>}
                  </div>

                  <Button onClick={() => checkout(material)} className="shrink-0">
                    {material.price_paise > 0 ? <IndianRupee className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    {material.price_paise > 0 ? `${material.price_paise / 100}` : 'Free'}
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
