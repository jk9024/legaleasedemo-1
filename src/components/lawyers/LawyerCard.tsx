'use client'

import React from 'react'
import Link from 'next/link'
import {
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  PhoneCall,
  ArrowRight,
  Plus,
  Check,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'
import { CompatibilityScore } from './CompatibilityScore'
import { AIMatchBadge } from './AIMatchBadge'

export interface LawyerData {
  id: string
  name: string
  image?: string | null
  court: string
  barCouncilId?: string
  specializations: string[]
  experienceYears: number
  hourlyFee: number
  perMinuteFee: number
  pricingModel?: string
  city: string
  state: string
  languages: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isEmergencyAvailable: boolean
  successRate?: number
  bio?: string
  aiMatchScore?: number
  aiMatchReason?: string
}

interface LawyerCardProps {
  lawyer: LawyerData
  isCompared?: boolean
  onToggleCompare?: (lawyer: LawyerData) => void
}

/**
 * Responsive Advocate Card component for search listings and comparisons.
 * Features verified badge, court affiliation, per-hour & per-minute fees, and compare toggle.
 */
export function LawyerCard({
  lawyer,
  isCompared = false,
  onToggleCompare,
}: LawyerCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-slate-300 relative group">
      {/* Top Banner / AI Match pill */}
      {lawyer.aiMatchScore && (
        <div className="mb-4">
          <AIMatchBadge score={lawyer.aiMatchScore} reason={lawyer.aiMatchReason} />
        </div>
      )}

      <div>
        {/* Header: Photo + Info */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={
                  lawyer.image ||
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                }
                alt={lawyer.name}
                className="h-16 w-16 rounded-xl object-cover border border-slate-100 shadow-2xs"
              />
              {lawyer.isEmergencyAvailable && (
                <span
                  title="24/7 Emergency Advocate Available"
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-white shadow-xs"
                >
                  <PhoneCall className="h-2.5 w-2.5" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/lawyer/${lawyer.id}`}
                  className="font-hero text-base font-bold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                >
                  {lawyer.name}
                </Link>
                {lawyer.isVerified && (
                  <span title="Bar Council Verified" className="inline-flex">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium mt-0.5">{lawyer.court}</p>

              <div className="mt-1 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#0B1F3A]">{lawyer.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[11px]">({lawyer.reviewCount})</span>
                </div>
                {lawyer.successRate && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#0D7A55] font-semibold text-[11px]">
                      {lawyer.successRate}% Success
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Compatibility Circle (if calculated) */}
          {lawyer.aiMatchScore ? (
            <div className="shrink-0 hidden sm:block">
              <CompatibilityScore score={lawyer.aiMatchScore} showLabel={false} size="sm" />
            </div>
          ) : null}
        </div>

        {/* Practice Areas / Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {lawyer.specializations.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
            >
              {spec}
            </span>
          ))}
          {lawyer.specializations.length > 3 && (
            <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400">
              +{lawyer.specializations.length - 3} more
            </span>
          )}
        </div>

        {/* Location & Languages */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span>
              {lawyer.city} • {lawyer.experienceYears} Years Exp
            </span>
          </div>
          <div>
            <span>{lawyer.languages.slice(0, 2).join(', ')}</span>
            {lawyer.languages.length > 2 ? ` +${lawyer.languages.length - 2}` : ''}
          </div>
        </div>
      </div>

      {/* Footer: Pricing & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Consultation Fee</p>
          <p className="text-base font-extrabold text-[#0B1F3A]">
            {formatINR(lawyer.hourlyFee)}
            <span className="text-xs font-normal text-slate-500"> / hr</span>
          </p>
          <p className="text-[10px] text-[#0D7A55] font-medium">or {formatINR(lawyer.perMinuteFee)}/min</p>
        </div>

        <div className="flex items-center gap-2">
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(lawyer)}
              className={`rounded-lg p-2 text-xs font-semibold transition border ${
                isCompared
                  ? 'bg-[#0B1F3A] text-[#C9A84C] border-[#0B1F3A]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
            >
              {isCompared ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </button>
          )}

          <Link
            href={`/book/${lawyer.id}`}
            className="flex items-center gap-1 rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
          >
            <span>Book</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C9A84C]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
