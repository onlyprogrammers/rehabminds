import { NextResponse, NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { getScrapeCache, saveScrapeCache } from "@/lib/scrape-cache";

interface CourseLinkVariant {
  language: string;
  link: string;
}

interface Paper {
  year: string;
  subject: string;
  link: string;
  variants: CourseLinkVariant[];
  courseCode?: string;
}

interface SemesterGroup {
  name: string;
  papers: Paper[];
}

interface ScrapedData {
  title: string;
  summary: string;
  semesterGroups: SemesterGroup[];
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function detectLanguage(text: string) {
  if (/\b(hindi|हिंदी|hin)\b/i.test(text)) return "Hindi";
  if (/\b(english|eng)\b/i.test(text)) return "English";
  return "PDF";
}

function makePaperFromRow($: cheerio.CheerioAPI, row: any, baseUrl: string): Paper | null {
  const cells = $(row).find("td, th");
  if (!cells.length) return null;

  const courseCode = normalizeText($(cells).eq(0).text());
  const courseTitle = normalizeText($(cells).eq(1).text());
  const rowText = normalizeText($(row).text());
  const subject = normalizeText([courseCode, courseTitle].filter(Boolean).join(" - ")) || "Question Paper";

  const variants: CourseLinkVariant[] = [];
  $(row)
    .find("a[href]")
    .each((_, anchor) => {
      const href = $(anchor).attr("href")?.trim();
      if (!href || href.startsWith("#")) return;

      let link = href;
      try {
        link = new URL(href, baseUrl).toString();
      } catch {
        // keep original href when URL resolution fails
      }

      if (!link || link.startsWith("#")) return;

      const anchorText = normalizeText($(anchor).text() || $(anchor).attr("title") || "");
      const language = detectLanguage(`${anchorText} ${rowText}`);
      if (!variants.some((item) => item.link === link)) {
        variants.push({ language, link });
      }
    });

  if (!variants.length) return null;

  return {
    year: "",
    subject,
    link: variants[0].link,
    variants,
    courseCode: courseCode || undefined,
  };
}

async function groupSemesterPapers($: cheerio.CheerioAPI, baseUrl: string): Promise<SemesterGroup[]> {
  const groups: SemesterGroup[] = [];
  const headingSelectors = "h1, h2, h3, h4, h5, h6";

  $(headingSelectors).each((_, heading) => {
    const headingText = normalizeText($(heading).text());
    if (!headingText || !/semester/i.test(headingText)) return;

    const papers: Paper[] = [];
    let next = $(heading).next();

    while (next.length) {
      if (next.is(headingSelectors)) break;

      if (next.is("table")) {
        next.find("tr").each((_, row) => {
          const paper = makePaperFromRow($, row, baseUrl);
          if (!paper) return;

          const existing = papers.find((item) => item.subject.toLowerCase() === paper.subject.toLowerCase());
          if (existing) {
            paper.variants.forEach((variant) => {
              if (!existing.variants.some((item) => item.link === variant.link)) {
                existing.variants.push(variant);
              }
            });
          } else {
            papers.push(paper);
          }
        });
      }

      next = next.next();
    }

    if (papers.length > 0) {
      groups.push({ name: headingText, papers });
    }
  });

  if (groups.length > 0) {
    return groups;
  }

  const fallbackPapers: Paper[] = [];
  $("table").each((_, table) => {
    $(table)
      .find("tr")
      .each((_, row) => {
        const paper = makePaperFromRow($, row, baseUrl);
        if (!paper) return;

        const existing = fallbackPapers.find((item) => item.subject.toLowerCase() === paper.subject.toLowerCase());
        if (existing) {
          paper.variants.forEach((variant) => {
            if (!existing.variants.some((item) => item.link === variant.link)) {
              existing.variants.push(variant);
            }
          });
        } else {
          fallbackPapers.push(paper);
        }
      });
  });

  if (fallbackPapers.length > 0) {
    return [{ name: "Previous Question Papers", papers: fallbackPapers }];
  }

  return [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { programmeTitle, programmeLink } = body;

    if (!programmeTitle || !programmeLink) {
      return NextResponse.json(
        { success: false, error: "programmeTitle and programmeLink are required" },
        { status: 400 }
      );
    }

    const targetUrl = programmeLink;
    const cached = await getScrapeCache<ScrapedData>("programme_papers", targetUrl.toLowerCase());
    if (cached) {
      return NextResponse.json({
        success: true,
        data: cached,
        cached: true,
      });
    }

    const fetchUrl = new URL("/api/scrapurl", request.url);
    fetchUrl.searchParams.set("url", targetUrl);

    const response = await fetch(fetchUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Remote fetch failed with status ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const html = typeof data.html === "string" ? data.html : "";

    if (!html) {
      return NextResponse.json(
        { success: false, error: "Unable to retrieve page HTML" },
        { status: 502 }
      );
    }

    const $ = cheerio.load(html);
    const title = normalizeText($("h1").first().text()) || normalizeText($("title").text()) || programmeTitle;
    const summary = normalizeText($("meta[name='description']").attr("content") || $("p").first().text()) || `Previous question papers for ${programmeTitle}.`;

    const semesterGroups = await groupSemesterPapers($, targetUrl);

    const payload = {
      title,
      summary,
      semesterGroups,
    } as ScrapedData;

    await saveScrapeCache("programme_papers", targetUrl.toLowerCase(), payload);

    return NextResponse.json({
      success: true,
      data: payload,
      cached: false,
    });
  } catch (error) {
    console.error("Previous Question Paper API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch previous question papers" },
      { status: 500 }
    );
  }
}
