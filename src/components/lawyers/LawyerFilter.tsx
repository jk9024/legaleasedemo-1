'use client'

import React from 'react'
import { Filter, RotateCcw, Search, SlidersHorizontal, MapPin, Globe, PhoneCall } from 'lucide-react'
import { LEGAL_CATEGORIES, INDIAN_STATES } from '@/lib/constants'

export interface FilterState {
  search: string
  category: string
  city: string
  language: string
  maxFee: number
  minExperience: number
  emergencyOnly: boolean
  verifiedOnly: boolean
}

interface LawyerFilterProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
}

/**
 * Filter sidebar and quick-chips controller for advocate directory.
 * Filters by practice category, jurisdiction, language, price, and emergency availability.
 */
export function LawyerFilter({ filters, onChange, onReset }: LawyerFilterProps) {
  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#0B1F3A]" />
          <h2 className="text-sm font-bold text-[#0B1F3A]">Filter Advocates</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-600 transition"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Practice Category */}
      <div>
        <label className="block text-xs font-bold text-[#0B1F3A] mb-2">Practice Area</label>
        <select
          value={filters.category}
          onChange={(e) => update({ category: e.target.value })}
          className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
        >
          <option value="ALL">All Legal Categories</option>
          {LEGAL_CATEGORIES.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block text-xs font-bold text-[#0B1F3A] mb-2">Spoken Language</label>
        <select
          value={filters.language}
          onChange={(e) => update({ language: e.target.value })}
          className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
        >
          <option value="ALL">All Languages</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
        </select>
      </div>

      {/* City Jurisdiction */}
      <div>
        <label className="block text-xs font-bold text-[#0B1F3A] mb-2">City / Court Jurisdiction</label>
        <select
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
          className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
        >
          <option value="ALL">All Cities (Pan-India)</option>
          <option value="Hyderabad">Hyderabad (Telangana)</option>
          <option value="Secunderabad">Secunderabad</option>
          <option value="Warangal">Warangal</option>
          <option value="Visakhapatnam">Visakhapatnam (AP)</option>
          <option value="Vijayawada">Vijayawada (AP)</option>
          <option value="Bengaluru">Bengaluru (Karnataka)</option>
        </select>
      </div>

      {/* Max Consultation Fee Slider */}
      <div>
        <div className="flex justify-between items-center mb-1 text-xs">
          <label className="font-bold text-[#0B1F3A]">Max Hourly Fee</label>
          <span className="font-bold text-[#0D7A55]">₹{filters.maxFee}</span>
        </div>
        <input
          type="range"
          min={149}
          max={2000}
          step={50}
          value={filters.maxFee}
          onChange={(e) => update({ maxFee: Number(e.target.value) })}
          className="w-full accent-[#0B1F3A] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹149</span>
          <span>₹1,000</span>
          <span>₹2,000+</span>
        </div>
      </div>

      {/* Experience Tier */}
      <div>
        <label className="block text-xs font-bold text-[#0B1F3A] mb-2">Minimum Experience</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { label: 'Any', val: 0 },
            { label: '5+ Yrs', val: 5 },
            { label: '10+ Yrs', val: 10 },
          ].map((exp) => (
            <button
              key={exp.label}
              type="button"
              onClick={() => update({ minExperience: exp.val })}
              className={`rounded-lg py-1.5 font-semibold transition border ${
                filters.minExperience === exp.val
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-3.5 w-3.5 text-red-600" />
            <span className="text-xs font-bold text-red-700">24/7 Emergency Available</span>
          </div>
          <input
            type="checkbox"
            checked={filters.emergencyOnly}
            onChange={(e) => update({ emergencyOnly: e.target.checked })}
            className="h-4 w-4 rounded text-red-600 accent-red-600"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold text-slate-700">Bar Council Verified Only</span>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => update({ verifiedOnly: e.target.checked })}
            className="h-4 w-4 rounded accent-[#0B1F3A]"
          />
        </label>
      </div>
    </div>
  )
}
