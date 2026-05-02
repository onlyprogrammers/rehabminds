import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import https from "https"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const searchurl = request.nextUrl.searchParams.get("url")

    // ✅ Check input
    if (!searchurl) {
      return NextResponse.json(
        { error: "searchurl is required" },
        { status: 400 }
      )
    }

    // ✅ Validate URL
    let url: URL
    try {
      url = new URL(searchurl)
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      )
    }

    // 🔥 FIX 1: remove hash (#...)
    const cleanUrl = url.toString().split("#")[0]

    // 🔥 FIX 2: force IPv4 (prevents timeout issue)
    const agent = new https.Agent({ family: 4 })

    // 🔥 FIX 3: use axios instead of fetch
    const response = await axios.get(cleanUrl, {
      timeout: 20000,
      httpsAgent: agent,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
      },
      validateStatus: () => true, // prevent axios throwing on 403/500
    })

    if (response.status !== 200) {
      return NextResponse.json(
        { error: `Remote fetch failed with status ${response.status}` },
        { status: 502 }
      )
    }

    const html = response.data

    return NextResponse.json({ html })

  } catch (error) {
    console.error("Scraper API error:", error)

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    )
  }
}
