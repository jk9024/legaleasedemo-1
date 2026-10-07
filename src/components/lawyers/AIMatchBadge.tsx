'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

interface AIMatchBadgeProps {
  score?: number
  reason?: string
  className?: string
}

/**
 * AI Match Badge displaying Gemini compatibility match rating and rationale.
 * Displays vibrant Gold/Navy badge highlighting personalized search recommendations.
 */
export function AIMatchBadge({ score = 95, reason, className = '' }: AIMatchBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-[#C9A84C]/40 px-3 py-1 text-xs font-bold text-[#0B1F3A] ${className}`}
      title={reason || `${score}% Match for your legal issue`}
    >
      <Sparkles className="h-3.5 w-3.5 text-[#C9A84C] animate-pulse" />
      <span>{score}% AI Match</span>
      {reason && <span className="hidden sm:inline font-normal text-slate-600 truncate max-w-[200px]"> • {reason}</span>}
    </div>
  )
}
