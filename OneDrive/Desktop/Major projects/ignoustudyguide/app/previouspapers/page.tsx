'use client'
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, Loader, AlertCircle, Download } from 'lucide-react';
import { SlidingNavbar } from "@/components/sliding-navbar";

interface CourseVariant {
  language: string;
  link: string;
}

interface Paper {
  year: string;
  subject: string;
  link: string;
  variants: CourseVariant[];
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

interface Programme {
  title: string;
  link: string;
}

function normalizeSubject(subject: string) {
  return subject
    .replace(/\b(hindi|english|eng|hin)\b/gi, "")
    .replace(/[–—‑]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripLanguageFromSubject(subject: string) {
  return subject
    .replace(/\b(hindi|english|eng|hin)\b/gi, "")
    .replace(/[–—‑]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function IGNOUProgrammeSearch() {

  const router = useRouter();
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Programme | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [error, setError] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [resultFilter, setResultFilter] = useState("");
  const [selectedDownloadPaper, setSelectedDownloadPaper] = useState<Paper | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const createDownloadSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const createPreviousPapersSlug = (programName: string, courseCode: string) => {
    const cleanProgram = programName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const cleanCourse = courseCode
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${cleanProgram}-${cleanCourse}-previous-question-paper`;
  };

  const saveDownloadLinkAndNavigate = (link: string, title: string) => {
    const slug = createDownloadSlug(title);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`previouspapers-link-${slug}`, link);
      router.push(`/previouspapers/${slug}`);
    }
  };

  const navigateToPreviousPapersWithLink = (programName: string, courseCode: string, courseLink: string) => {
    const slug = createPreviousPapersSlug(programName, courseCode);
    if (typeof window !== 'undefined') {
      router.push(`/previouspapers/${slug}?courseLink=${encodeURIComponent(courseLink)}`);
    }
  };

  // ✅ Fetch JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/programmes.json');
        const json = await res.json();
        setProgrammes(json.papers);
      } catch {
        setError("Failed to load programmes");
      }
    };

    fetchData();
  }, []);

  // ✅ Filter
  const filtered = query.length > 0
    ? programmes.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const mergedGroups = useMemo(() => {
    if (!scrapedData) return [];

    return scrapedData.semesterGroups
      .map((group) => {
        const mergedMap = new Map<string, Paper>();

        group.papers.forEach((paper) => {
          const key = paper.courseCode
            ? paper.courseCode.toLowerCase()
            : normalizeSubject(paper.subject);

          const existing = mergedMap.get(key);
          if (existing) {
            paper.variants.forEach((variant) => {
              if (!existing.variants.some((item) => item.link === variant.link)) {
                existing.variants.push(variant);
              }
            });
            existing.subject = stripLanguageFromSubject(existing.subject) || existing.subject;
          } else {
            mergedMap.set(key, {
              ...paper,
              subject: stripLanguageFromSubject(paper.subject) || paper.subject,
            });
          }
        });

        return {
          ...group,
          papers: Array.from(mergedMap.values()),
        };
      })
      .filter((group) => group.papers.length > 0);
  }, [scrapedData]);

  const filteredGroups = mergedGroups
    .map((group) => ({
      ...group,
      papers: group.papers.filter((paper) => {
        const term = resultFilter.trim().toLowerCase();
        if (!term) return true;
        return (
          paper.subject.toLowerCase().includes(term) ||
          (paper.courseCode?.toLowerCase().includes(term) ?? false) ||
          paper.year.toLowerCase().includes(term) ||
          group.name.toLowerCase().includes(term)
        );
      }),
    }))
    .filter((group) => group.papers.length > 0);

  // ✅ Select
  const handleSelect = (prog: Programme) => {
    setSelected(prog);
    setQuery(prog.title);
    setShowDropdown(false);
    setScrapedData(null);
    setError("");
    setHighlightIdx(-1);
  };

  // ✅ Search API
  const handleSearch = async () => {
    if (!selected) {
      setError("Please select a programme first.");
      return;
    }

    setLoading(true);
    setError("");
    setScrapedData(null);

    try {
      const response = await fetch("/api/prequetionpaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          programmeTitle: selected.title,
          programmeLink: selected.link
        })
      });

      const data = await response.json();

      if (data.success) {
        setScrapedData(data.data);
      } else {
        setError(data.error || "Failed to fetch data");
      }

    } catch (e) {
      console.error(e);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      setHighlightIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      handleSelect(filtered[highlightIdx]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // ✅ Outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  return (
    <>
    <SlidingNavbar />
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-6rem] left-1/4 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-4 max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-3 sm:mb-6">
          <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-md px-4 py-2 mb-3">
            <span className="text-xs tracking-widest text-gray-300 uppercase font-medium">
              📚 IGNOU Portal
            </span>
          </div>

          <h1 className="text-1xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 tracking-tight">
            Previous Year Question Papers
          
          </h1>

          <p className="text-gray-400 text-base sm:text-lg">
            Access past exam papers from {programmes.length}+ programmes
          </p>
        </div>

        {/* Search Section */}
        <div ref={dropdownRef} className="relative mb-8 sm:mb-12">
          <div className={`relative rounded-lg border border-gray-600 bg-gray-900 p-1 shadow-2xl transition-all duration-300 ${
            showDropdown || selected
              ? 'ring-2 ring-gray-500/20'
              : 'hover:border-gray-500'
          }`}>
            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search programme (e.g., MBA, BCA)..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => query.length > 0 && setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md border border-gray-600 bg-gray-950 py-3 pl-4 pr-40 text-sm sm:text-base text-white placeholder-gray-500 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-500/20"
                />
                {selected && (
                  <button
                    onClick={() => {
                      setSelected(null);
                      setQuery("");
                      setScrapedData(null);
                      setError("");
                    }}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-red-400 hover:text-white transition-colors text-lg z-10"
                  >
                    x
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  disabled={loading || !selected}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 flex items-center gap-1"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 sm:w-auto">
              </div>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && filtered.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-lg border border-gray-600 bg-gray-950 p-1 shadow-2xl max-h-80 overflow-y-auto">
                {filtered.map((prog, idx) => (
                  <button
                    key={prog.title}
                    onClick={() => handleSelect(prog)}
                    className={`w-full text-left rounded-md px-4 py-3 text-sm sm:text-base transition ${
                      idx === highlightIdx
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{prog.title}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 bg-red-900/20 border border-red-700 rounded-md p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {scrapedData && (
          <div className="mt-8 space-y-4 animate-in fade-in-50">
            {/* Programme Summary Card */}
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {scrapedData.title}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {scrapedData.summary}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-gray-400 text-sm">
                Search within retrieved papers by course, code, year, or semester.
              </div>
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  value={resultFilter}
                  onChange={(e) => setResultFilter(e.target.value)}
                  placeholder="Filter results..."
                  className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-500/20"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, groupIdx) => (
                  <div
                    key={groupIdx}
                    className="bg-gray-900 border border-gray-600 rounded-lg p-3 sm:p-4"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {group.name}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {group.papers.length} paper{group.papers.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-300">
                        {group.papers.length} available
                      </span>
                    </div>

                    <div className="divide-y divide-slate-800">
                      {group.papers.map((paper, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 relative"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <p className="text-sm sm:text-base text-gray-200 font-medium truncate">
                              {idx + 1}. {paper.subject || "Question Paper"}
                            </p>
                            <p className="text-[11px] sm:text-[12px] text-gray-500">
                              {paper.year ? `Year ${paper.year}` : "Year"}
                            </p>
                          </div>

                          <div className="flex-shrink-0 text-right w-[max-content] z-100 absolute bg-green-500 right-0">
                            {paper.variants?.length > 1 ? (
                              <button
                                onClick={() => setSelectedDownloadPaper(paper)}
                                className=" w-[max-content] inline-flex items-center gap-1 rounded-md bg-green-700 px-2 py-2 text-xs sm:text-[11px] uppercase tracking-[0.19em] text-gray-200 hover:bg-gray-600"
                              >
                                <Download className="w-4 h-4" />
                                <span className=" w-[max-content]hidden sm:inline">Choose language</span>
                              </button>
                            ) : paper.variants?.length === 1 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  navigateToPreviousPapersWithLink(
                                    scrapedData?.title || selected?.title || 'Programme',
                                    paper.courseCode || paper.subject || `paper-${idx}`,
                                    paper.variants[0].link
                                  )
                                }
                                className=" w-[max-content] absolute right-4 inline-flex items-center gap-1 rounded-md bg-gray-700 px-2 py-2 text-xs sm:text-[11px] uppercase tracking-[0.19em] text-gray-200 hover:bg-gray-600"
                              >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Download {paper.variants[0].language}</span>
                              </button>
                            ) : (
                              <span className="absolute right-4 inline-flex rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                No download link
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-gray-600 bg-gray-900/70 p-4 text-center text-gray-400 text-sm">
                  No semester-wise papers were found for this programme.
                </div>
              )}
            </div>

            <p className="text-center text-[11px] text-slate-500">
              {filteredGroups.reduce((sum, group) => sum + group.papers.length, 0)} papers across {filteredGroups.length} sections.
            </p>
          </div>
        )}

        {/* Download language modal */}
        {selectedDownloadPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg border border-gray-600 bg-gray-900 p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Choose language version
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedDownloadPaper.subject}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDownloadPaper(null)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3">
                {selectedDownloadPaper.variants.map((variant) => (
                  <button
                    key={`${variant.language}-${variant.link}`}
                    type="button"
                    onClick={() =>
                      saveDownloadLinkAndNavigate(
                        variant.link,
                        selectedDownloadPaper.courseCode || selectedDownloadPaper.subject || `paper-${variant.language}`
                      )
                    }
                    className="w-full text-left rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-gray-200 transition hover:border-gray-500 hover:bg-gray-700"
                  >
                    Download {variant.language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!scrapedData && !loading && !error && selected && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-gray-800 border border-gray-600 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-slate-400 text-sm">
              Click &quot;Get Question Papers&quot; to fetch available exam papers
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
