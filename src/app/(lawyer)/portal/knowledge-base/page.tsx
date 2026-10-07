'use client'

import React, { useState } from 'react'
import {
  BookOpen,
  Search,
  PlusCircle,
  Sparkles,
  Scale,
  Clock,
  Tag,
  CheckCircle2,
  FileText,
} from 'lucide-react'

export default function LawyerKnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAiMatching, setIsAiMatching] = useState(false)
  const [aiMatchResult, setAiMatchResult] = useState<string | null>(null)

  const precedents = [
    {
      id: 'kb-1',
      title: 'Property Boundary Encroachment Dispute',
      category: 'Property Law',
      issue: 'Neighbour constructed boundary wall encroaching client registered land parcel in Medchal-Malkajgiri by 2 feet.',
      statutes: ['TPA 1882 S.5', 'CrPC S.145'],
      outcome: 'Resolved — Encroaching wall dismantled amicably within 60 days',
      resolutionMonths: 2,
      complexity: 'Medium',
      tags: ['boundary', 'neighbour', 'legal-notice', 'HMDA', 'survey'],
      views: 84,
    },
    {
      id: 'kb-2',
      title: 'RERA Complaint vs Builder for Handover Delay',
      category: 'Consumer Law',
      issue: 'Promoter delayed flat delivery in Gachibowli by 18 months without force majeure explanation.',
      statutes: ['RERA 2016 S.18', 'Consumer Protection Act 2019 S.35'],
      outcome: 'Rs. 1,80,000 compensation & monthly interest awarded until possession handover',
      resolutionMonths: 4,
      complexity: 'High',
      tags: ['RERA', 'builder', 'delay', 'possession', 'compensation'],
      views: 156,
    },
  ]

  const handleAiMatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsAiMatching(true)
    setTimeout(() => {
      setIsAiMatching(false)
      setAiMatchResult(
        'Matched Precedent: "Property Boundary Encroachment Dispute" (94% Similarity). Recommended strategy: Issue statutory 15-day notice under TPA 1882 S.5 with survey demarcation report before filing civil injunction.'
      )
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Legal Knowledge Base</h1>
            <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
              Advocate Precedents
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Store your personal case arguments, statutory sections, and leverage Gemini AI to find similar past wins.
          </p>
        </div>

        <button
          onClick={() => alert('New precedent entry modal')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <PlusCircle className="h-4 w-4 text-[#C9A84C]" />
          <span>Add Case Precedent</span>
        </button>
      </div>

      {/* Gemini AI Similar Case Matcher */}
      <div className="rounded-2xl border-2 border-[#C9A84C]/50 bg-gradient-to-r from-slate-900 to-[#0B1F3A] p-6 text-white shadow-md">
        <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Gemini 1.5 Flash Precedent Matcher</span>
        </div>
        <h2 className="text-base font-bold">Find Similar Past Cases for Current Client</h2>
        <p className="text-xs text-slate-300 mt-1">
          Type the client&apos;s raw facts below. Gemini will match your precedent bank and generate statutory recommendations.
        </p>

        <form onSubmit={handleAiMatch} className="mt-4 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. 'Neighbour built shed over my driveway without permission in Kompally'..."
            className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 border border-white/20 focus:border-[#C9A84C] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isAiMatching}
            className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-xs font-bold text-[#0B1F3A] hover:bg-[#d8b85c] transition shrink-0"
          >
            {isAiMatching ? 'Analyzing...' : 'Find Matches'}
          </button>
        </form>

        {aiMatchResult && (
          <div className="mt-4 rounded-xl bg-white/10 p-4 border border-white/20 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-[#C9A84C]">AI Match Analysis: </span>
            {aiMatchResult}
          </div>
        )}
      </div>

      {/* Precedent Cards */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Saved Case Precedents ({precedents.length})
        </h2>

        {precedents.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-[#0B1F3A] mt-1">{p.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{p.issue}</p>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  {p.complexity} Complexity
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {p.resolutionMonths} Months
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50/70 p-3 text-xs text-[#0D7A55] border border-emerald-100">
              <span className="font-bold">Final Resolution: </span>
              {p.outcome}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-slate-700">Statutory Provisions:</span>
                {p.statutes.map((s, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#0B1F3A]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>{p.views} consultations referenced</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
