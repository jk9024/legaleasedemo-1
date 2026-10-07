'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Newspaper,
  Calendar,
  Scale,
  ArrowRight,
  Bookmark,
  Share2,
  ExternalLink,
} from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  summary: string
  court: string
  category: string
  publishedAt: string
  readTime: string
  keyTakeaway: string
}

const ARTICLES: NewsArticle[] = [
  {
    id: 'news-01',
    title: 'Telangana High Court: Prior Notice Mandatory Before Demolition Under Municipal Act',
    summary:
      'In a landmark ruling, the High Court held that municipal authorities cannot carry out sudden weekend demolitions without providing a minimum 15-day statutory notice and personal hearing to the occupant.',
    court: 'High Court of Telangana',
    category: 'Property & Municipal Law',
    publishedAt: '24-Sep-2025',
    readTime: '3 min read',
    keyTakeaway:
      'Occupants facing demolition threats have the constitutional right to seek an immediate status-quo interim stay before the vacation bench.',
  },
  {
    id: 'news-02',
    title: 'Supreme Court Clarifies Bail Guidelines Under Section 479 of New BNSS Code',
    summary:
      'The Supreme Court ruled that first-time undertrial offenders who have completed one-third of the maximum sentence are entitled to mandatory statutory bail, applying the beneficial provisions retrospectively.',
    court: 'Supreme Court of India',
    category: 'Criminal Law & BNSS',
    publishedAt: '18-Sep-2025',
    readTime: '4 min read',
    keyTakeaway:
      'Undertrial prisoners in Telangana central jails can apply for expedited bail if one-third incarceration is completed.',
  },
  {
    id: 'news-03',
    title: 'Telangana RERA Mandates 60-Day Disbursal of Delay Compensation from Builders',
    summary:
      'The Telangana Real Estate Regulatory Authority issued a circular directing builders in Hyderabad to credit interest on delayed flat possession directly to buyers bank accounts within 60 days of the order.',
    court: 'Telangana RERA Appellate Tribunal',
    category: 'RERA & Real Estate',
    publishedAt: '12-Sep-2025',
    readTime: '3 min read',
    keyTakeaway:
      'Homebuyers can execute RERA recovery warrants directly via the District Collector revenue recovery process.',
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const categories = ['ALL', 'Property & Municipal Law', 'Criminal Law & BNSS', 'RERA & Real Estate']

  const filtered = selectedCategory === 'ALL'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <Newspaper className="h-3.5 w-3.5" />
            <span>High Court of Telangana & Supreme Court Updates</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Indian Legal News & Landmark Judgments
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Stay informed with digestible breakdowns of court orders, new statutory amendments (BNS/BNSS),
            and property rights developments impacting Telangana and India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-semibold transition whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-[#0B1F3A] text-[#C9A84C] border-[#0B1F3A]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All News' : cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#0B1F3A]/5 text-[#0B1F3A] px-2.5 py-0.5 font-bold border border-[#0B1F3A]/10">
                    {article.category}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-semibold">{article.court}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] leading-snug">
                {article.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">{article.summary}</p>

              {/* Key Takeaway Box */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-950 space-y-1">
                <span className="font-bold text-[#0B1F3A]">💡 Key Citizen Takeaway:</span>
                <p>{article.keyTakeaway}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1.5 font-bold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                >
                  <span>Consult an Advocate on this Topic</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
