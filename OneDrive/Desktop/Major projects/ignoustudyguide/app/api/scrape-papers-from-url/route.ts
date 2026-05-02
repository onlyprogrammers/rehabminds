import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import axios from 'axios'
import https from 'https'
import { getScrapeCache, saveScrapeCache } from '@/lib/scrape-cache'

export const runtime = 'nodejs'

interface PaperLink {
  date: string
  year: string
  url: string
  month: string
}

interface CourseData {
  courseCode: string
  courseName: string
  courseLink: string
  papersByYear: {
    [year: string]: PaperLink[]
  }
}

const MONTH_MAP: Record<string, string> = {
  january: 'January', jan: 'January',
  february: 'February', feb: 'February',
  march: 'March', mar: 'March',
  april: 'April', apr: 'April',
  may: 'May',
  june: 'June', jun: 'June',
  july: 'July', jul: 'July',
  august: 'August', aug: 'August',
  september: 'September', sept: 'September', sep: 'September',
  october: 'October', oct: 'October',
  november: 'November', nov: 'November',
  december: 'December', dec: 'December',
}

const MONTH_ORDER: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4,
  May: 5, June: 6, July: 7, August: 8,
  September: 9, October: 10, November: 11, December: 12,
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function extractYearAndMonth(text: string): { year: string; month: string } {
  const match = normalizeText(text).match(/\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec)\b[\s,.-]*(20\d{2})\b/i)
  if (!match) return { year: '0000', month: 'Unknown' }

  return {
    year: match[2],
    month: MONTH_MAP[match[1].toLowerCase()] || 'Unknown',
  }
}

function shouldUsePaperLink(href: string, baseUrl: string) {
  try {
    const link = new URL(href, baseUrl)
    const host = link.hostname.toLowerCase()

    if (/facebook|twitter|pinterest|telegram|whatsapp|youtube|bit\.ly|dmca/.test(host)) {
      return false
    }

    if (/shop\./.test(host)) {
      return false
    }

    return /assignmentguru|ignouassignmentguru/.test(host) || /\.pdf($|\?)/i.test(link.pathname)
  } catch {
    return false
  }
}

function getTitle($: cheerio.CheerioAPI, fallbackName: string) {
  const title = normalizeText($('h1, h2').first().text()) || normalizeText($('title').first().text())
  return title || fallbackName
}

async function scrapePapersFromUrl(pageUrl: string, courseCode: string, courseName: string): Promise<CourseData> {
  const papersByYear: Record<string, PaperLink[]> = {}
  const agent = new https.Agent({ family: 4 })

  try {
    const response = await axios.get(pageUrl, {
      timeout: 20000,
      httpsAgent: agent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      validateStatus: () => true,
    })

    if (response.status !== 200) {
      throw new Error(`Failed to fetch page: ${response.status}`)
    }

    const $ = cheerio.load(response.data)
    const pageTitle = getTitle($, courseName)

    const addPaper = (label: string, href: string) => {
      const { year, month } = extractYearAndMonth(label)
      if (year === '0000' || !shouldUsePaperLink(href, pageUrl)) return

      const fullUrl = new URL(href, pageUrl).href
      const date = `${month} ${year}`
      if (!papersByYear[year]) papersByYear[year] = []

      if (!papersByYear[year].some((paper) => paper.url === fullUrl && paper.date === date)) {
        papersByYear[year].push({
          date,
          year,
          month,
          url: fullUrl,
        })
      }
    }

    $('tr').each((_, row) => {
      const rowText = normalizeText($(row).text())
      if (extractYearAndMonth(rowText).year === '0000') return

      $(row).find('a[href]').each((_, anchor) => {
        const href = $(anchor).attr('href')
        if (href) addPaper(rowText, href)
      })
    })

    $('a[href]').each((_, anchor) => {
      const href = $(anchor).attr('href')
      if (!href) return

      const anchorText = normalizeText($(anchor).text())
      const contextText = normalizeText($(anchor).closest('tr, li, p, div').text())
      const label = extractYearAndMonth(anchorText).year !== '0000' ? anchorText : contextText

      addPaper(label, href)
    })

    const sortedPapersByYear: Record<string, PaperLink[]> = {}
    Object.keys(papersByYear)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .forEach((year) => {
        sortedPapersByYear[year] = papersByYear[year].sort(
          (a, b) => (MONTH_ORDER[b.month] || 0) - (MONTH_ORDER[a.month] || 0)
        )
      })

    return {
      courseCode,
      courseName: pageTitle,
      courseLink: pageUrl,
      papersByYear: sortedPapersByYear,
    }
  } catch (error) {
    console.error('Error scraping papers:', error)
    return {
      courseCode,
      courseName,
      courseLink: pageUrl,
      papersByYear: {},
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pageUrl = searchParams.get('url')
    const courseCode = searchParams.get('code') || 'UNKNOWN'
    const courseName = searchParams.get('name') || 'Course'

    if (!pageUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    const cacheKey = pageUrl.toLowerCase()
    const cached = await getScrapeCache<CourseData>('previous_paper_url', cacheKey)
    if (cached) {
      return NextResponse.json(cached, { status: 200 })
    }

    const result = await scrapePapersFromUrl(pageUrl, courseCode, courseName)
    await saveScrapeCache('previous_paper_url', cacheKey, result)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to scrape papers' },
      { status: 500 }
    )
  }
}
