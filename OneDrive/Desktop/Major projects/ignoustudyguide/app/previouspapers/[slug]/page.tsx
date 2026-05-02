'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { AlertCircle, Download, ExternalLink, FileText, Loader2, RefreshCw } from 'lucide-react'
import { SlidingNavbar } from '@/components/sliding-navbar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PaperLink {
  date: string
  year: string
  url: string
  month: string
}

interface CourseData {
  courseCode: string
  courseName: string
  courseLink?: string
  papersByYear: {
    [year: string]: PaperLink[]
  }
}

function extractCourseCodeFromSlug(slug: string) {
  const match = decodeURIComponent(slug).match(/\b([a-z]{2,}[a-z0-9]*-\d{2,4})\b/i)
  return match ? match[1].toUpperCase() : slug.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '').toUpperCase()
}

function buildSourceSlug(slug: string, courseCode: string) {
  const cleanedSlug = decodeURIComponent(slug)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  if (/previous-year-question-papers?$/.test(cleanedSlug)) {
    return cleanedSlug
  }

  return `${courseCode.toLowerCase()}-previous-year-question-papers`
}

export default function PreviousPapersPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params?.slug as string
  const courseLink = searchParams?.get('courseLink')

  const [courseData, setCourseData] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingPaper, setProcessingPaper] = useState<string | null>(null)

  useEffect(() => {
    const fetchPapers = async () => {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)

        const storedCourseLink =
          typeof window !== 'undefined' ? localStorage.getItem(`previouspapers-link-${slug}`) : null
        const effectiveCourseLink = courseLink || storedCourseLink
        const courseCode = extractCourseCodeFromSlug(slug)

        const url = effectiveCourseLink
          ? `/api/scrape-papers-from-url?url=${encodeURIComponent(effectiveCourseLink)}&code=${encodeURIComponent(courseCode)}&name=${encodeURIComponent(courseCode)}`
          : `/api/scrape-course-papers?course=${encodeURIComponent(buildSourceSlug(slug, courseCode))}`

        const response = await fetch(url, { cache: 'no-store' })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch course papers')
        }

        setCourseData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching papers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPapers()
  }, [slug, courseLink])

  const years = courseData
    ? Object.keys(courseData.papersByYear).sort((a, b) => parseInt(b) - parseInt(a))
    : []
  const totalPapers = years.reduce((sum, year) => sum + courseData!.papersByYear[year].length, 0)
  const hasPapers = totalPapers > 0

  const downloadPaper = async (paper: PaperLink) => {
    setProcessingPaper(`${paper.date}-${paper.url}`)
    await new Promise((resolve) => setTimeout(resolve, 350))
    window.open(paper.url, '_blank', 'noopener,noreferrer')
    setProcessingPaper(null)
  }

  return (
    <>
      <SlidingNavbar />
      <main className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-6rem] left-1/4 h-96 w-96 rounded-full bg-gray-800/20 blur-3xl" />
          <div className="absolute bottom-[-6rem] right-1/4 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl" />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="h-11 w-11 animate-spin text-gray-300" />
              <p className="text-base text-gray-300">Loading previous papers...</p>
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto mt-8 max-w-3xl">
              <Alert variant="destructive" className="border-red-700 bg-red-950/40 text-red-100">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-gray-700 text-white hover:bg-gray-600"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && !courseData && (
            <div className="flex min-h-[60vh] items-center justify-center text-gray-300">
              No papers found
            </div>
          )}

          {!loading && !error && courseData && (
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-600 bg-gray-900 p-4 sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gray-300">
                      <FileText className="h-4 w-4" />
                      Previous papers
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                      {courseData.courseName}
                    </h1>
                    <p className="mt-2 text-sm text-gray-400 sm:text-base">
                      Course code: {courseData.courseCode} - {totalPapers} paper{totalPapers === 1 ? '' : 's'} found
                    </p>
                  </div>

                  {courseData.courseLink && (
                    <Button asChild className="bg-gray-700 text-white hover:bg-gray-600">
                      <a href={courseData.courseLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Source page
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {!hasPapers ? (
                <Card className="border-gray-600 bg-gray-900 text-white">
                  <CardContent className="pt-6">
                    <div className="py-12 text-center">
                      <FileText className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                      <h3 className="mb-2 text-xl font-semibold text-gray-200">
                        No previous papers available
                      </h3>
                      <p className="mx-auto max-w-md text-sm text-gray-400">
                        Previous year question papers for {courseData.courseCode} were not found on the source page.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue={years[0]} className="w-full">
                  <div className="overflow-x-auto pb-1">
                    <TabsList className="h-auto w-max justify-start gap-1 rounded-lg border border-gray-600 bg-gray-900 p-1">
                      {years.map((year) => (
                        <TabsTrigger
                          key={year}
                          value={year}
                          className="rounded-md px-4 py-2 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                        >
                          {year} ({courseData.papersByYear[year].length})
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {years.map((year) => (
                    <TabsContent key={year} value={year} className="mt-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {courseData.papersByYear[year].map((paper) => (
                          <Card
                            key={`${paper.date}-${paper.url}`}
                            className="border-gray-600 bg-gray-900 text-white transition hover:border-gray-400"
                          >
                            <CardHeader>
                              <CardTitle className="text-lg text-white">{paper.date}</CardTitle>
                              <CardDescription className="text-gray-400">
                                Term-end examination paper
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button
                                onClick={() => downloadPaper(paper)}
                                disabled={processingPaper === `${paper.date}-${paper.url}`}
                                className="w-full bg-gray-700 text-white hover:bg-gray-600"
                              >
                                {processingPaper === `${paper.date}-${paper.url}` ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Preparing...
                                  </>
                                ) : (
                                  <>
                                  <Download className="h-4 w-4" />
                                  Download paper
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}

              <p className="text-center text-xs text-gray-500">
                Papers are grouped by year and include every dated month found on the source page.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
