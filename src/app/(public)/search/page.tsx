'use client'

import React, { useState, useEffect, useTransition, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
  Loader2,
} from 'lucide-react'
import { LawyerFilter, FilterState } from '@/components/lawyers/LawyerFilter'
import { LawyerGrid } from '@/components/lawyers/LawyerGrid'
import { LawyerData } from '@/components/lawyers/LawyerCard'
import { LEGAL_CATEGORIES } from '@/lib/constants'

interface AIAnalysisState {
  detectedCategory: string
  applicableActs: string[]
  complexity: 'Low' | 'Medium' | 'High'
  urgencyLevel: 'Normal' | 'Urgent' | 'Immediate'
  estimatedDurationMonths: number
  summary: string
  recommendations: Array<{
    lawyerId: string
    matchScore: number
    matchReason: string
  }>
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'ALL',
  city: 'ALL',
  language: 'ALL',
  maxFee: 2000,
  minExperience: 0,
  emergencyOnly: false,
  verifiedOnly: false,
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Initialize query from URL
  const initialQuery = searchParams.get('q') || searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || 'ALL'
  const initialCity = searchParams.get('city') || 'ALL'

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    search: initialQuery,
    category: initialCategory,
    city: initialCity,
  })

  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'experience'>('rating')
  const [lawyers, setLawyers] = useState<LawyerData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisState | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [comparedLawyers, setComparedLawyers] = useState<LawyerData[]>([])

  // Fetch lawyers matching current filters
  useEffect(() => {
    let isMounted = true

    async function fetchLawyers() {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.search) params.set('search', filters.search)
        if (filters.category && filters.category !== 'ALL') params.set('category', filters.category)
        if (filters.city && filters.city !== 'ALL') params.set('city', filters.city)
        if (filters.language && filters.language !== 'ALL') params.set('language', filters.language)
        if (filters.minExperience > 0) params.set('minExp', String(filters.minExperience))
        if (filters.maxFee < 2000) params.set('maxFee', String(filters.maxFee))
        if (filters.emergencyOnly) params.set('emergency', 'true')
        if (filters.verifiedOnly) params.set('verifiedOnly', 'true')
        params.set('sort', sortBy)

        const res = await fetch(`/api/lawyers?${params.toString()}`)
        const json = await res.json()

        if (json.success && isMounted) {
          let list: LawyerData[] = json.data.lawyers || []

          // If AI analysis is active, merge AI scores and rank them
          if (aiAnalysis && aiAnalysis.recommendations.length > 0) {
            const recMap = new Map(aiAnalysis.recommendations.map((r) => [r.lawyerId, r]))
            list = list.map((l) => {
              const rec = recMap.get(l.id)
              if (rec) {
                return {
                  ...l,
                  aiMatchScore: rec.matchScore,
                  aiMatchReason: rec.matchReason,
                }
              }
              return l
            })

            // Sort so top AI match comes first
            list.sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0))
          }

          setLawyers(list)
        }
      } catch (err) {
        console.error('Failed to load lawyers:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchLawyers()

    return () => {
      isMounted = false
    }
  }, [filters, sortBy, aiAnalysis])

  // Handle AI Search submission
  const handleAiSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    setIsAiLoading(true)
    setFilters((prev) => ({ ...prev, search: searchQuery }))

    try {
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          city: filters.city !== 'ALL' ? filters.city : 'Hyderabad',
          language: filters.language !== 'ALL' ? filters.language : undefined,
        }),
      })

      const json = await res.json()
      if (json.success && json.data) {
        setAiAnalysis(json.data)
      }
    } catch (err) {
      console.warn('AI analysis request failed:', err)
    } finally {
      setIsAiLoading(false)
    }
  }

  // Quick category chip clicked
  const handleCategoryChip = (catName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catName ? 'ALL' : catName,
    }))
  }

  // Toggle compare lawyer
  const handleToggleCompare = (lawyer: LawyerData) => {
    setComparedLawyers((prev) => {
      const exists = prev.some((l) => l.id === lawyer.id)
      if (exists) {
        return prev.filter((l) => l.id !== lawyer.id)
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 advocates at a time.')
        return prev
      }
      return [...prev, lawyer]
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setFilters(DEFAULT_FILTERS)
    setAiAnalysis(null)
  }

  // Count active filters
  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.category !== 'ALL' ? 1 : 0) +
    (filters.city !== 'ALL' ? 1 : 0) +
    (filters.language !== 'ALL' ? 1 : 0) +
    (filters.minExperience > 0 ? 1 : 0) +
    (filters.maxFee < 2000 ? 1 : 0) +
    (filters.emergencyOnly ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search Header Banner */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-[#C9A84C] backdrop-blur-sm mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Google Gemini 1.5 Flash Powered Legal Intelligence</span>
            </div>
            <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Find & Consult Verified Advocates in Hyderabad
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Describe your legal issue in everyday language. Our AI analyzes relevant Indian statutes and matches top High Court and District Court advocates.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleAiSearch} className="max-w-3xl">
            <div className="relative flex items-center shadow-2xl rounded-2xl bg-white p-2 text-slate-800">
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. My builder delayed apartment possession by 2 years in Gachibowli..."
                className="w-full bg-transparent text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isAiLoading}
                className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-5 py-3 text-xs font-bold text-white hover:bg-[#C9A84C] hover:text-[#0B1F3A] transition disabled:opacity-50 shrink-0"
              >
                {isAiLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin text-[#C9A84C]" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-[#C9A84C]" />
                    <span>AI Match</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar text-xs">
            <span className="text-slate-400 shrink-0 text-[11px] font-semibold">Popular:</span>
            {LEGAL_CATEGORIES.slice(0, 6).map((cat) => {
              const isSelected = filters.category === cat.name
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChip(cat.name)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#C9A84C] text-[#0B1F3A] font-bold'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gemini AI Analysis Insight Box (when triggered) */}
        {aiAnalysis && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0B1F3A]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h2 className="font-hero text-base font-bold text-[#0B1F3A]">
                    Gemini 1.5 Legal Assessment: {aiAnalysis.detectedCategory}
                  </h2>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                  {aiAnalysis.summary}
                </p>

                {/* Badges: Acts, Urgency, Timeline */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="rounded-md bg-white px-2.5 py-1 font-semibold text-slate-700 border border-amber-200 shadow-2xs">
                    Complexity: <strong className="text-[#0B1F3A]">{aiAnalysis.complexity}</strong>
                  </span>
                  <span className="rounded-md bg-white px-2.5 py-1 font-semibold text-slate-700 border border-amber-200 shadow-2xs">
                    Estimated Time: <strong className="text-[#0B1F3A]">~{aiAnalysis.estimatedDurationMonths} Months</strong>
                  </span>
                  <span className="rounded-md bg-white px-2.5 py-1 font-semibold text-slate-700 border border-amber-200 shadow-2xs">
                    Urgency: <strong className="text-amber-800">{aiAnalysis.urgencyLevel}</strong>
                  </span>
                </div>

                {/* Applicable Acts */}
                {aiAnalysis.applicableActs && aiAnalysis.applicableActs.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Key Indian Statutes Applicable:</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {aiAnalysis.applicableActs.map((act) => (
                        <span
                          key={act}
                          className="rounded-lg bg-white/80 px-2 py-0.5 text-[11px] font-medium text-slate-800 border border-amber-100"
                        >
                          📜 {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setAiAnalysis(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Dismiss analysis"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Toolbar: Filter Count, Mobile Toggle, Sort Options */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Sheet Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1F3A] shadow-xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Active filters pill display */}
            {activeFiltersCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400">Active:</span>
                {filters.category !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                    {filters.category}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((f) => ({ ...f, category: 'ALL' }))}
                    />
                  </span>
                )}
                {filters.city !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                    {filters.city}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((f) => ({ ...f, city: 'ALL' }))}
                    />
                  </span>
                )}
                {filters.language !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                    {filters.language}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((f) => ({ ...f, language: 'ALL' }))}
                    />
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-600 hover:underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B1F3A] shadow-2xs focus:outline-none"
            >
              <option value="rating">Top Rated & Reviews</option>
              <option value="price_asc">Fee: Low to High</option>
              <option value="price_desc">Fee: High to Low</option>
              <option value="experience">Years of Experience</option>
            </select>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filter & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <LawyerFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Drawer / Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 flex bg-black/50 lg:hidden p-4">
              <div className="relative m-auto w-full max-w-sm rounded-2xl bg-white p-5 max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
                <LawyerFilter
                  filters={filters}
                  onChange={(newFilters) => {
                    setFilters(newFilters)
                    setShowMobileFilters(false)
                  }}
                  onReset={() => {
                    handleResetFilters()
                    setShowMobileFilters(false)
                  }}
                />
              </div>
            </div>
          )}

          {/* Main Grid Column */}
          <div className="lg:col-span-3">
            <LawyerGrid
              lawyers={lawyers}
              isLoading={isLoading}
              comparedLawyers={comparedLawyers}
              onToggleCompare={handleToggleCompare}
              onClearCompare={() => setComparedLawyers([])}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="h-8 w-8 animate-spin text-[#0B1F3A]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
