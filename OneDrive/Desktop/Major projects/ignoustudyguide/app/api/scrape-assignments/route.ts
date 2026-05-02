import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import axios from 'axios'
import https from 'https'
import { queryOptional } from '@/lib/db'
import { getScrapeCache, saveScrapeCache } from '@/lib/scrape-cache'

export const runtime = 'nodejs'

type AssignmentLink = {
  title: string
  programme: string
  courseCode: string | null
  session: string | null
  url: string
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function extractCourseCode(text: string) {
  return text.match(/\b[A-Z]{2,}[A-Z0-9]*-\d{2,4}\b/i)?.[0]?.toUpperCase() || null
}

function extractSession(text: string) {
  return text.match(/\b(20\d{2}[-\s]?20\d{2}|20\d{2})\b/)?.[0] || null
}

function shouldUseAssignmentLink(href: string, baseUrl: string) {
  try {
    const link = new URL(href, baseUrl)
    const host = link.hostname.toLowerCase()

    if (/facebook|twitter|pinterest|telegram|whatsapp|youtube|bit\.ly|dmca/.test(host)) {
      return false
    }

    return /assignmentguru|ignouassignmentguru/.test(host) || /\.pdf($|\?)/i.test(link.pathname)
  } catch {
    return false
  }
}

async function scrapeAssignments(pageUrl: string, programme: string) {
  const response = await axios.get(pageUrl, {
    timeout: 20000,
    httpsAgent: new https.Agent({ family: 4 }),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    validateStatus: () => true,
  })

  if (response.status !== 200) {
    throw new Error(`Source page returned ${response.status}`)
  }

  const $ = cheerio.load(response.data)
  const assignments: AssignmentLink[] = []

  $('tr, li, p').each((_, container) => {
    const text = normalizeText($(container).text())
    if (!/assignment|download|question/i.test(text)) return

    $(container).find('a[href]').each((_, anchor) => {
      const href = $(anchor).attr('href')
      if (!href || !shouldUseAssignmentLink(href, pageUrl)) return

      const anchorText = normalizeText($(anchor).text())
      const title = anchorText.length > 4 ? anchorText : text
      const url = new URL(href, pageUrl).href

      if (!assignments.some((item) => item.url === url)) {
        assignments.push({
          title,
          programme,
          courseCode: extractCourseCode(title) || extractCourseCode(text),
          session: extractSession(text),
          url,
        })
      }
    })
  })

  if (assignments.length === 0) {
    $('a[href]').each((_, anchor) => {
      const href = $(anchor).attr('href')
      const text = normalizeText($(anchor).text())
      if (!href || !/assignment/i.test(text) || !shouldUseAssignmentLink(href, pageUrl)) return

      const url = new URL(href, pageUrl).href
      assignments.push({
        title: text,
        programme,
        courseCode: extractCourseCode(text),
        session: extractSession(text),
        url,
      })
    })
  }

  return {
    title: normalizeText($('h1, h2').first().text()) || `${programme} assignments`,
    sourceUrl: pageUrl,
    programme,
    assignments,
  }
}

async function saveAssignmentsToMaterials(assignments: AssignmentLink[]) {
  for (const assignment of assignments) {
    await queryOptional(
      `insert into marketplace_materials
        (title, material_type, programme, course_code, price_paise, currency, file_url, seller_name, status)
       values ($1, 'assignment', $2, $3, 0, 'INR', $4, 'IGNOU Study Guide', 'approved')
       on conflict do nothing`,
      [assignment.title, assignment.programme, assignment.courseCode, assignment.url]
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const pageUrl = request.nextUrl.searchParams.get('url')
    const programme = request.nextUrl.searchParams.get('programme') || 'IGNOU'
    const shouldSave = request.nextUrl.searchParams.get('save') === 'true'

    if (!pageUrl) {
      return NextResponse.json({ error: 'url is required' }, { status: 400 })
    }

    const cacheKey = `${programme}:${pageUrl}`.toLowerCase()
    const cached = await getScrapeCache<Awaited<ReturnType<typeof scrapeAssignments>>>('assignments', cacheKey)
    if (cached) {
      return NextResponse.json({ ...cached, cached: true })
    }

    const result = await scrapeAssignments(pageUrl, programme)
    await saveScrapeCache('assignments', cacheKey, result)

    if (shouldSave) {
      await saveAssignmentsToMaterials(result.assignments)
    }

    return NextResponse.json({ ...result, cached: false })
  } catch (error) {
    console.error('Assignment scraping failed:', error)
    return NextResponse.json({ error: 'Assignment scraping failed' }, { status: 500 })
  }
}
