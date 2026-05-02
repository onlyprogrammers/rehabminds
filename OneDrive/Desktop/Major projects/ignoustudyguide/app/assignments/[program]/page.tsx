"use client"

import { useState, use, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { ChevronDown, ChevronRight, GraduationCap, BookOpen, ArrowLeft, Database, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Subject {
  code: string
  name: string
}

interface Semester {
  id: string
  name: string
  subjects: Subject[]
}

interface ProgrammeData {
  code: string
  name: string
  semesters: Semester[]
}

export default function ProgramPage({ params }: { params: Promise<{ program: string }> }) {
  const [activeSemester, setActiveSemester] = useState<string | null>(null)
  const [dbCounts, setDbCounts] = useState<Record<string, number>>({})
  const [programmeData, setProgrammeData] = useState<ProgrammeData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { program: programSlug } = use(params)
  const programName = programSlug.toUpperCase()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/programmes?code=${encodeURIComponent(programName)}`)
      .then(r => r.json())
      .then(data => {
        if (data.semesters) setProgrammeData(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [programName])

  useEffect(() => {
    fetch(`/api/materials/counts?programme=${encodeURIComponent(programName)}&type=assignment`)
      .then((r) => r.json())
      .then((data) => {
        if (data.counts) setDbCounts(data.counts)
      })
      .catch(() => {})
  }, [programName])

  const getSemesterCount = (semester: Semester) =>
    semester.subjects.reduce((sum, s) => sum + (dbCounts[s.code] || 0), 0)

  const handleSubjectClick = (semesterId: string, subjectCode: string) => {
    const route = `/assignments/${programSlug}/${programSlug}-${semesterId}-${subjectCode.toLowerCase()}`
    router.push(route)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SlidingNavbar />
        <div className="flex justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (!programmeData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SlidingNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-6">The program &quot;{programName}&quot; doesn&apos;t exist in our database.</p>
          <Link href="/assignments">
            <Button>Back to Assignments</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SlidingNavbar />

      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/assignments" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900">{programName}</h1>
              <p className="text-sm lg:text-base text-gray-600">{programmeData.name}</p>
            </div>
          </div>

          <p className="text-sm lg:text-lg text-gray-600">
            Select a semester to view available subjects and assignments
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Choose Semester</h2>
          </div>

          <div className="space-y-3">
            {programmeData.semesters.map((semester) => {
              const semCount = getSemesterCount(semester)
              return (
                <Card key={semester.id} className="overflow-hidden border-0 shadow-md">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      className="w-full h-12 lg:h-14 px-4 lg:px-6 justify-between text-left font-medium hover:bg-blue-50 rounded-none"
                      onClick={() => setActiveSemester(activeSemester === semester.id ? null : semester.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base lg:text-lg text-gray-900">{semester.name}</span>
                        {semCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            <Database className="h-3 w-3" />
                            {semCount} in DB
                          </span>
                        )}
                      </div>
                      {activeSemester === semester.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>

                    {activeSemester === semester.id && (
                      <div className="px-4 lg:px-6 pb-4 bg-gray-50">
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-3">Select a subject to view assignments:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {semester.subjects.map((subject) => {
                              const count = dbCounts[subject.code] || 0
                              return (
                                <Button
                                  key={subject.code}
                                  variant="outline"
                                  className="h-auto p-3 justify-between text-left hover:bg-white hover:border-blue-300 hover:text-blue-700 bg-white"
                                  onClick={() => handleSubjectClick(semester.id, subject.code)}
                                >
                                  <div>
                                    <div className="font-medium text-sm">{subject.code}</div>
                                    <div className="text-xs text-gray-500 mt-1">{subject.name}</div>
                                  </div>
                                  {count > 0 ? (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0 font-medium">
                                      {count} available
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">No DB entries</span>
                                  )}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Program Statistics</h3>
            </div>

            <div className="grid grid-rows-2 lg:grid-cols-4 gap-4 text-center mobflex">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                  {programmeData.semesters.length}
                </div>
                <div className="text-sm text-gray-600">Semesters</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
                  {programmeData.semesters.reduce((total, sem) => total + sem.subjects.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">
                  {Object.values(dbCounts).reduce((a, b) => a + b, 0) || "—"}
                </div>
                <div className="text-sm text-gray-600">Assignments in DB</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">25K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
