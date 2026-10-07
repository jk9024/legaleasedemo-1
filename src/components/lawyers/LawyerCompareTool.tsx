'use client'

import React from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Scale,
  X,
} from 'lucide-react'
import { LawyerData } from './LawyerCard'
import { formatINR } from '@/lib/utils/formatters'

interface LawyerCompareToolProps {
  lawyers: LawyerData[]
  onRemove?: (id: string) => void
}

/**
 * Side-by-side advocate comparison table (up to 3 lawyers).
 * Compares court affiliations, fees, ratings, emergency availability, and specializations.
 */
export function LawyerCompareTool({ lawyers, onRemove }: LawyerCompareToolProps) {
  if (lawyers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
        <Scale className="h-10 w-10 text-slate-400 mx-auto" />
        <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
          No Advocates Selected for Comparison
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Please select up to 3 advocates from the directory or search results to view a side-by-side fee and credential comparison.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
        >
          <span>Browse Advocate Directory</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="p-4 text-slate-400 uppercase font-semibold w-1/4">Feature / Metric</th>
            {lawyers.map((l) => (
              <th key={l.id} className="p-4 align-top min-w-[220px]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        l.image ||
                        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                      }
                      alt={l.name}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#0B1F3A] leading-tight">{l.name}</h3>
                      <p className="text-[11px] text-slate-500 font-normal">{l.court}</p>
                    </div>
                  </div>
                  {onRemove && (
                    <button
                      onClick={() => onRemove(l.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {/* Hourly Consultation Fee */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Hourly Fee (INR)</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4 font-bold text-base text-[#0B1F3A]">
                {formatINR(l.hourlyFee)} <span className="text-xs font-normal text-slate-500">/ hr</span>
              </td>
            ))}
          </tr>

          {/* Per-Minute Rate */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Per-Minute Billing</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4 font-semibold text-[#0D7A55]">
                {formatINR(l.perMinuteFee)} / minute
              </td>
            ))}
          </tr>

          {/* Experience */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Experience</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4 font-medium">
                {l.experienceYears} Years Active Practice
              </td>
            ))}
          </tr>

          {/* Rating & Reviews */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Rating & Reviews</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#0B1F3A]">{l.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({l.reviewCount} client reviews)</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Court Jurisdiction */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Primary Court</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4 font-medium text-slate-800">
                {l.court}
              </td>
            ))}
          </tr>

          {/* Specializations */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Practice Areas</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4">
                <div className="flex flex-wrap gap-1">
                  {l.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Spoken Languages */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">Languages</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4 font-medium">
                {l.languages.join(', ')}
              </td>
            ))}
          </tr>

          {/* 24/7 Emergency */}
          <tr>
            <td className="p-4 font-bold text-[#0B1F3A]">24/7 Emergency Support</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4">
                {l.isEmergencyAvailable ? (
                  <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-600">
                    <PhoneCall className="h-3 w-3" /> Available On-Call
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">Scheduled Only</span>
                )}
              </td>
            ))}
          </tr>

          {/* Direct Booking CTA */}
          <tr className="bg-slate-50/50">
            <td className="p-4 font-bold text-[#0B1F3A]">Book Appointment</td>
            {lawyers.map((l) => (
              <td key={l.id} className="p-4">
                <Link
                  href={`/book/${l.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] py-2.5 px-4 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition w-full"
                >
                  <span>Select Advocate</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C9A84C]" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
