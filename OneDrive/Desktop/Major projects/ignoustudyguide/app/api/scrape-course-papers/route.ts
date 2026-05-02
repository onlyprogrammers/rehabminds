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
  jan: 'January', january: 'January',
  feb: 'February', february: 'February',
  mar: 'March', march: 'March',
  apr: 'April', april: 'April',
  may: 'May',
  jun: 'June', june: 'June',
  jul: 'July', july: 'July',
  aug: 'August', august: 'August',
  sep: 'September', sept: 'September', september: 'September',
  oct: 'October', october: 'October',
  nov: 'November', november: 'November',
  dec: 'December', december: 'December',
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

function extractCourseCode(value: string) {
  const decoded = decodeURIComponent(value)
  const match = decoded.match(/\b([a-z]{2,}[a-z0-9]*-\d{2,4})\b/i)
  return match ? match[1].toUpperCase() : decoded.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '').toUpperCase()
}

function buildSourceSlug(input: string) {
  let value = decodeURIComponent(input).trim()

  try {
    const parsedUrl = new URL(value)
    value = parsedUrl.pathname
  } catch {
    // The input is already a slug or course code.
  }

  const slug = value
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  if (/previous-year-question-papers?$/.test(slug)) {
    return slug
  }

  const courseCode = extractCourseCode(slug).toLowerCase()
  return `${courseCode}-previous-year-question-papers`
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

async function scrapeCourseFromIgnou(courseSlug: string): Promise<CourseData> {
  const sourceSlug = buildSourceSlug(courseSlug)
  const url = `https://www.ignouassignmentguru.com/${sourceSlug}/`
  const courseCode = extractCourseCode(sourceSlug)
  const papersByYear: Record<string, PaperLink[]> = {}

  const agent = new https.Agent({ family: 4 })
  const response = await axios.get(url, {
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
    throw new Error(`Source page returned ${response.status}`)
  }

  const $ = cheerio.load(response.data)
  const courseName = normalizeText($('h1, h2').first().text()) || courseCode

  const addPaper = (label: string, href: string) => {
    const { year, month } = extractYearAndMonth(label)
    if (year === '0000' || !shouldUsePaperLink(href, url)) return

    const fullUrl = new URL(href, url).href
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

  const sorted: Record<string, PaperLink[]> = {}
  Object.keys(papersByYear)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .forEach((year) => {
      sorted[year] = papersByYear[year].sort(
        (a, b) => (MONTH_ORDER[b.month] || 0) - (MONTH_ORDER[a.month] || 0)
      )
    })

  return {
    courseCode,
    courseName,
    courseLink: url,
    papersByYear: sorted,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const courseSlug = searchParams.get('course')

  if (!courseSlug) {
    return NextResponse.json(
      { error: 'Course slug is required' },
      { status: 400 }
    )
  }

  try {
    const cacheKey = buildSourceSlug(courseSlug)
    const cached = await getScrapeCache<CourseData>('previous_paper_course', cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    const data = await scrapeCourseFromIgnou(courseSlug)
    await saveScrapeCache('previous_paper_course', cacheKey, data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json(
      { error: 'Scraping failed' },
      { status: 500 }
    )
  }
}
