'use client'

import React from 'react'
import Link from 'next/link'
import { LawyerCard, LawyerData } from './LawyerCard'
import { Scale, ArrowRight, X, AlertCircle } from 'lucide-react'

interface LawyerGridProps {
  lawyers: LawyerData[]
  isLoading?: boolean
  comparedLawyers: LawyerData[]
  onToggleCompare: (lawyer: LawyerData) => void
  onClearCompare: () => void
  onResetFilters?: () => void
}

/**
 * Grid list component for advocate directory with skeleton states and comparison drawer.
 */
export function LawyerGrid({
  lawyers,
  isLoading = false,
  comparedLawyers,
  onToggleCompare,
  onClearCompare,
  onResetFilters,
}: LawyerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-xl bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
                <div className="h-3 w-1/4 rounded bg-slate-100" />
              </div>
            </div>
            <div className="h-8 w-full rounded bg-slate-100" />
            <div className="h-10 w-full rounded bg-slate-200" />
          </div>
        ))}
      </div>
    )
  }

  if (lawyers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Scale className="h-6 w-6" />
        </div>
        <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
          No Advocates Match Your Filter Criteria
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Try expanding your price range, clearing specific filters, or searching by generic legal terms.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
          >
            Reset All Filters
          </button>
        )}
      </div>
    )
  }

  const comparedIds = new Set(comparedLawyers.map((l) => l.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          Showing <strong className="text-[#0B1F3A]">{lawyers.length}</strong> Verified Legal Professionals
        </span>
        <span className="hidden sm:inline">Select up to 3 to compare side-by-side</span>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lawyers.map((lawyer) => (
          <LawyerCard
            key={lawyer.id}
            lawyer={lawyer}
            isCompared={comparedIds.has(lawyer.id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>

      {/* Sticky Bottom Comparison Floating Bar */}
      {comparedLawyers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in slide-in-from-bottom duration-300">
          <div className="rounded-2xl bg-[#0B1F3A] p-4 text-white shadow-2xl border border-[#C9A84C]/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                Compare ({comparedLawyers.length}/3):
              </span>
              <div className="flex items-center gap-2">
                {comparedLawyers.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-slate-200"
                  >
                    <span className="truncate max-w-[100px]">{l.name}</span>
                    <button
                      onClick={() => onToggleCompare(l)}
                      className="text-slate-400 hover:text-white"
                      title="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClearCompare}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
              <Link
                href={`/compare?ids=${comparedLawyers.map((l) => l.id).join(',')}`}
                className="flex items-center gap-1.5 rounded-xl bg-[#C9A84C] px-4 py-2 text-xs font-bold text-[#0B1F3A] hover:bg-[#d8b85c] transition"
              >
                <span>Compare Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
