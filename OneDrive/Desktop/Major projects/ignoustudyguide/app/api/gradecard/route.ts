import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, enrollmentno, program } = body

    if (!type || !enrollmentno || !program) {
      return NextResponse.json({ error: "Missing required fields: type, enrollmentno, program" }, { status: 400 })
    }

    const url = `https://gradecard.ignou.ac.in/gradecard/view_gradecard.aspx?eno=${enrollmentno}&prog=${program}&type=${type}`

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
    console.error("Gradecard API error:", error)
    return NextResponse.json({ error: "Failed to fetch gradecard data" }, { status: 500 })
  }
}
