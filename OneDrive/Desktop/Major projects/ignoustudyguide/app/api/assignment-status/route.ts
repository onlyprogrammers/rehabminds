import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, enrollmentno, program } = body

    if (!enrollmentno || !program) {
      return NextResponse.json({ error: "Missing required fields: enrollmentno, program" }, { status: 400 })
    }

    const url = `https://isms.ignou.ac.in/changeadmdata/StatusAssignment.asp?submit=1&enrno=${enrollmentno}&program=${program}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`IGNOU server error: ${response.status}`)
    }

    const html = await response.text()

    return NextResponse.json({ html })
  } catch (error) {
    console.error("Assignment Status API error:", error)
    return NextResponse.json({ error: "Failed to fetch assignment status" }, { status: 500 })
  }
}
