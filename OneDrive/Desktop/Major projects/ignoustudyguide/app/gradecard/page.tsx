"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Book, BookOpen, Loader2 } from "lucide-react"
import html2canvas from "html2canvas"
import jspdf from "jspdf"
import { SlidingNavbar } from "@/components/sliding-navbar"

const PROGRAM_TYPES: { [key: string]: string[] } = {
  "1": ["BCA", "BCAOL", "MCA", "MCAOL", "MP", "MPB", "PGDCA", "PGDCA_NEW"],
  "2": ["ASSO", "BA", "BCOM", "BDP", "BSC"],
  "3": [
    "ACFS",
    "ACISE",
    "ACPDM",
    "ACSEPD",
    "ACSM",
    "ADACM",
    "ADAOM",
    "ADTS",
    "BAADM",
    "BAAHD",
    "BAASK",
    "BAAVFX",
    "BACT",
    "BAFC",
    "BAFD",
    "BAFMP",
    "BAFSM",
    "BAGS",
    "BAIHA",
    "BAPFHMH",
    "BARCH",
    "BASKH",
    "BAUDH",
    "BAVMSME",
    "BBA",
    "BBARIL",
    "BBARL",
    "BBARS",
    "BBARSDL",
    "BBASM",
    "BCOMAF",
    "BCOMCAA",
  ],
  "4": ["BAECH", "BAEGH", "BAG", "BAHDH", "BAHIH", "BAPAH", "BAPCH", "BAPSH"],
}

const ALL_PROGRAMS = Object.values(PROGRAM_TYPES).flat()

const DEMO_GRADECARD_DATA = {
  name: "Rajesh Kumar",
  enrollmentno: "0620150001",
  program: "BCA",
  theory: [
    ["CS-01", "Fundamentals of Computer", "78", "COMPLETED"],
    ["CS-02", "Programming in C", "85", "COMPLETED"],
    ["CS-03", "Database Management", "72", "COMPLETED"],
    ["CS-04", "Web Development", "88", "COMPLETED"],
  ],
  practical: [
    ["CS-01P", "Fundamentals of Computer Lab", "82", "COMPLETED"],
    ["CS-02P", "Programming in C Lab", "80", "COMPLETED"],
    ["CS-03P", "Database Management Lab", "76", "COMPLETED"],
  ],
  incompleted: [["CS-05", "Advanced Java", "-", "-", "PENDING"]],
}

interface GradeCardData {
  name: string
  enrollmentno: string
  program: string
  theory: any[]
  practical: any[]
  incompleted: any[]
}

// Header Component
function Header() {
  return (
    <SlidingNavbar/>
  )
}

// Input Form Component
interface InputFormProps {
  onSubmit: (program: string, enrollmentNo: string, type: number) => void
  onDemoClick: () => void
  loading: boolean
}

function InputForm({ onSubmit, onDemoClick, loading }: InputFormProps) {
  const [program, setProgram] = useState("")
  const [enrollmentNo, setEnrollmentNo] = useState("")
  const [programType, setProgramType] = useState<number | null>(null)

  const handleProgramChange = (value: string) => {
    setProgram(value)
    for (const [key, programs] of Object.entries(PROGRAM_TYPES)) {
      if (programs.includes(value)) {
        setProgramType(Number.parseInt(key))
        break
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (program && enrollmentNo && enrollmentNo.length === 10 && programType) {
      onSubmit(program, enrollmentNo, programType)
    }
  }

  const isValid = program && enrollmentNo.length === 10 && programType

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="program" className="text-base font-medium">
            Select Programme
          </Label>
          <Select value={program} onValueChange={handleProgramChange}>
            <SelectTrigger id="program" className="h-11">
              <SelectValue placeholder="Choose your program" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {ALL_PROGRAMS.map((prog) => (
                <SelectItem key={prog} value={prog}>
                  {prog}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="enrollment" className="text-base font-medium">
            Enrollment Number
          </Label>
          <Input
            id="enrollment"
            type="text"
            placeholder="Enter 10-digit enrollment number"
            value={enrollmentNo}
            onChange={(e) => setEnrollmentNo(e.target.value.toUpperCase())}
            maxLength={10}
            className="h-11"
          />
          {enrollmentNo.length > 0 && enrollmentNo.length < 10 && (
            <p className="text-xs text-destructive">Enrollment number must be 10 digits</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={!isValid || loading} size="lg" className="sm:flex-1">
          {loading ? "Checking..." : "Check Grade Card"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onDemoClick}
          disabled={loading}
          className="sm:flex-1 bg-transparent"
        >
          View Demo
        </Button>
      </div>
    </form>
  )
}

// Grade Card Display Component
interface GradeCardDisplayProps {
  data: GradeCardData
}

function GradeCardDisplay({ data }: GradeCardDisplayProps) {
  const [downloadFormat, setDownloadFormat] = useState("pdf")
  const [calcType, setCalcType] = useState("t")
  const [percentage, setPercentage] = useState<string | null>(null)
  const [cgpa, setCGPA] = useState<string | null>(null)
  const gradeCardRef = useRef<HTMLDivElement>(null)

  const calculatePercentage = (type: string) => {
    let arr: any[] = []
    let total = 0
    let count = 0

    if (type === "t") {
      arr = [...data.theory, ...data.practical]
    } else if (type === "th") {
      arr = data.theory
    } else if (type === "pr") {
      arr = data.practical
    }

    arr.forEach((item) => {
      if (item[3] === "COMPLETED") {
        total += Number(item[2])
        count += 1
      }
    })

    const perc = count > 0 ? (total / count).toFixed(1) : "0"
    const cgpValue = type === "t" ? (Number(perc) / 9.5).toFixed(2) : (Number(perc) / 10).toFixed(2)

    setPercentage(`${perc}%`)
    setCGPA(`${cgpValue} CGPA`)
    setCalcType(type)
  }

  const downloadGradeCard = async () => {
    if (!gradeCardRef.current) return

    try {
      const canvas = await html2canvas(gradeCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")

      if (downloadFormat === "pdf") {
        const rect = gradeCardRef.current.getBoundingClientRect()
        const widthMM = (rect.width / window.innerWidth) * 229
        const heightMM = (rect.height / window.innerHeight) * 297

        const pdf = new jspdf({
          orientation: "portrait",
          unit: "mm",
          format: [widthMM, heightMM],
        })

        pdf.addImage(imgData, "PNG", 0, 0)
        pdf.save(`gradecard_${data.enrollmentno}.pdf`)
      } else {
        const link = document.createElement("a")
        link.href = imgData
        link.download = `gradecard_${data.enrollmentno}.png`
        link.click()
      }
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg p-0 m-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle>Your Grade Card</CardTitle>
        </CardHeader>
        <div className="pt-6">
          <div ref={gradeCardRef} className="space-y-6 rounded-lg border border-border bg-white p-2 text-foreground">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div>
                <h2 className="text-lg font-bold">IGNOU</h2>
                <p className="text-xs text-muted-foreground">Indira Gandhi National Open University</p>
              </div>
              <div className="text-right">
                <h3 className=" w-[max-content] text-lg font-bold">Grade Card</h3>
              </div>
            </div>

            {/* Personal Info */}
            <div className="flex gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Name</p>
                <p className="text-xs font-semibold">{data.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Enrollment No.</p>
                <p className="text-xs font-semibold">{data.enrollmentno}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Program</p>
                <p className="text-xs font-semibold">{data.program}</p>
              </div>
            </div>

            {/* Exam Results */}
            {data.theory.length > 0 && (
              <div>
                <h4 className="mb-4 text-lg font-semibold">Theory Exam</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2 text-left text-sm font-medium">Code</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Assignment</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Marks</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.theory.map((item, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="px-4 py-2 text-sm">{item[0]}</td>
                          <td className="px-4 py-2 text-sm">{item[1]}</td>
                          <td className="px-4 py-2 text-sm font-medium">{item[2]}</td>
                          <td className="px-4 py-2 text-sm">
                            <Badge variant={item[3] === "COMPLETED" ? "default" : "destructive"}>
                              {item[3] === "COMPLETED" ? "Pass" : "Fail"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {data.practical.length > 0 && (
              <div>
                <h4 className="mb-4 text-lg font-semibold">Practical Exam</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2 text-left text-sm font-medium">Code</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Assignment</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Marks</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.practical.map((item, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="px-4 py-2 text-sm">{item[0]}</td>
                          <td className="px-4 py-2 text-sm">{item[1]}</td>
                          <td className="px-4 py-2 text-sm font-medium">{item[2]}</td>
                          <td className="px-4 py-2 text-sm">
                            <Badge variant={item[3] === "COMPLETED" ? "default" : "destructive"}>
                              {item[3] === "COMPLETED" ? "Pass" : "Fail"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {data.incompleted.length > 0 && (
              <div>
                <h4 className="mb-4 text-lg font-semibold">Incomplete Exams</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2 text-left text-sm font-medium">Code</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Assignment</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Marks</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.incompleted.map((item, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="px-4 py-2 text-sm">{item[0]}</td>
                          <td className="px-4 py-2 text-sm">{item[1]}</td>
                          <td className="px-4 py-2 text-sm font-medium">{item[2]}</td>
                          <td className="px-4 py-2 text-sm">
                            <Badge variant="outline">Incomplete</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Download and Calculation Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="h-5 w-5" /> Download Grade Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={downloadFormat} onValueChange={setDownloadFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Format</SelectItem>
                <SelectItem value="image">Image (PNG)</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={downloadGradeCard} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Book className="h-5 w-5" /> Performance Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={calcType} onValueChange={calculatePercentage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t">Overall (Theory + Practical)</SelectItem>
                <SelectItem value="th">Only Theory</SelectItem>
                <SelectItem value="pr">Only Practical</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground">Percentage</p>
                <p className="text-2xl font-bold text-primary">{percentage || "—"}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground">CGPA</p>
                <p className="text-2xl font-bold text-primary">{cgpa || "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main Home Component
export default function Home() {
  const [loading, setLoading] = useState(false)
  const [showGradeCard, setShowGradeCard] = useState(false)
  const [gradeCardData, setGradeCardData] = useState<any>(null)

  const handleFetchGradeCard = async (program: string, enrollmentNo: string, type: number) => {
    setLoading(true)

    try {
      const response = await fetch("/api/gradecard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          program,
          enrollmentno: enrollmentNo,
          type: String(type),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch grade card")
      }

      const result = await response.json()
      const parsedData = parseGradeCardHTML(result.html)
      setGradeCardData(parsedData)
      setShowGradeCard(true)
    } catch (error) {
      console.error("Error fetching grade card:", error)
      alert("Failed to fetch grade card. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoClick = () => {
    setGradeCardData(DEMO_GRADECARD_DATA)
    setShowGradeCard(true)
  }

  const parseGradeCardHTML = (html: string) => {
    const str = html.replace(/[\n\r]/g, " ")
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, "text/html")
    const tables = doc.getElementsByTagName("table")

    const allresult = []
    let currentResult = []
    let resultpart = 0
    const gradecard = {
      name: "",
      enrollmentno: "",
      program: "",
      theory: [] as any[],
      practical: [] as any[],
      incompleted: [] as any[],
    }

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i]
      const rows = table.getElementsByTagName("tr")

      for (let j = 0; j < rows.length; j++) {
        const row = rows[j]
        const cells = row.getElementsByTagName("td")

        if (i === 1 && j === 6) {
          resultpart = 1
        }

        for (let k = 0; k < cells.length; k++) {
          const cell = cells[k]
          if (i === 1 && j === 4) {
            if (k === 3) gradecard.enrollmentno = cell.innerText
            else if (k === 5) gradecard.name = cell.innerText
            else if (k === 7) gradecard.program = cell.innerText
          } else if (i === 1 && j === 6) {
            if (k > 0) {
              if (resultpart < 9) {
                resultpart += 1
                currentResult.push(cell.innerText)
              } else {
                currentResult.push(cell.innerText)
                resultpart = 1
                allresult.push(currentResult)
                currentResult = []
              }
            }
          }
        }
      }
    }

    allresult.forEach((i: any) => {
      if (i[7] === "-" && i[6] !== "-") {
        gradecard.theory.push([i[0], i[1], i[6], i[8]])
      } else if (i[6] === "-" && i[7] !== "-") {
        gradecard.practical.push([i[0], i[1], i[7], i[8]])
      } else {
        gradecard.incompleted.push(i)
      }
    })

    return gradecard
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle>Enter Your Details</CardTitle>
              <CardDescription>Provide your program and enrollment number to retrieve your grade card</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <InputForm onSubmit={handleFetchGradeCard} onDemoClick={handleDemoClick} loading={loading} />
            </CardContent>
          </Card>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-lg text-muted-foreground">Fetching your grade card...</span>
            </div>
          )}

          {showGradeCard && gradeCardData && !loading && <GradeCardDisplay data={gradeCardData} />}
        </div>
      </main>
      <footer className="border-t border-border bg-card py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 IGNOU Grade Card Portal. This is a non-official service for checking academic results.</p>
        <p className="mt-2">Note: Your personal data and results are not saved on our servers.</p>
      </footer>
    </>
  )
}
