'use client'

import React, { useState } from 'react'
import { Settings, Save, Check, Scale, ShieldCheck, Award } from 'lucide-react'
import { LAWYER_TIERS } from '@/lib/utils/pricing'
import { formatINR } from '@/lib/utils/formatters'

type LawyerTierKey = 'student' | 'standard' | 'experienced' | 'senior'

export default function LawyerSettingsPage() {
  const [ratePerMinute, setRatePerMinute] = useState<number>(11)
  const [tier, setTier] = useState<LawyerTierKey>('experienced')
  const [autoApproveExtension, setAutoApproveExtension] = useState<boolean>(true)
  const [emergencyAvailable, setEmergencyAvailable] = useState<boolean>(true)
  const [saved, setSaved] = useState<boolean>(false)

  const hourlyEquivalent = ratePerMinute * 60
  const activeTierConfig = LAWYER_TIERS[tier] || LAWYER_TIERS.standard

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Practice & Fee Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure your per-minute consultation rates, tier commission classification, and auto-extension rules.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
          <Check className="h-4 w-4" />
          <span>Practice profile, per-minute rates, and tier settings updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Bar Council Verification Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-[#0B1F3A]">Bar Council of India Verification</h2>
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-[#0D7A55]">
              VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bar Council ID</label>
              <input
                type="text"
                disabled
                defaultValue="BAR/TS/2012/001"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Enrolled Bar Association</label>
              <input
                type="text"
                disabled
                defaultValue="Telangana High Court Advocates Association"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Tier Selector & Per-Minute Pricing */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-[#0B1F3A]">Your Tier & Commission Rate</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your practice tier. This determines your badge and platform commission rate.
            </p>
          </div>

          {/* Tier Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.entries(LAWYER_TIERS) as [LawyerTierKey, typeof LAWYER_TIERS['standard']][]).map(([key, t]) => {
              const isSelected = tier === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTier(key)}
                  className={`rounded-xl p-3 text-left border transition ${
                    isSelected
                      ? 'border-[#0B1F3A] bg-[#0B1F3A]/5 ring-2 ring-[#0B1F3A]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-bold text-xs text-[#0B1F3A]">{t.badge}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Comm: <strong>{(t.platformCommission * 100).toFixed(0)}%</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Range: ₹{t.minRatePerMin}–₹{t.maxRatePerMin}/min
                  </p>
                </button>
              )
            })}
          </div>

          {/* Rate per minute slider */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A]">
                  Rate per minute: <span className="text-[#0D7A55] text-sm">₹{ratePerMinute}/min</span>
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rs.{ratePerMinute}/min = <strong>{formatINR(hourlyEquivalent)}/hour</strong>
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#0D7A55] border border-emerald-200 text-xs font-semibold">
                You earn {(100 - activeTierConfig.platformCommission * 100).toFixed(0)}%: {formatINR(Math.round(ratePerMinute * (1 - activeTierConfig.platformCommission)))}/min
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={ratePerMinute}
                onChange={(e) => setRatePerMinute(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B1F3A]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹2/min (₹120/hr)</span>
                <span>₹25/min (₹1,500/hr)</span>
                <span>₹50/min (₹3,000/hr)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Toggles */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0B1F3A]">Session Automation Rules</h2>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-bold text-[#0B1F3A]">Auto-Accept In-Session Extensions</p>
              <p className="text-[11px] text-slate-500">
                Automatically add 15, 30, 45, or 60 minutes when client extends and pays during consultation.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoApproveExtension}
              onChange={(e) => setAutoApproveExtension(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0B1F3A]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-[#0B1F3A]">24/7 Emergency Lawyer Roster</p>
              <p className="text-[11px] text-slate-500">
                Receive priority emergency consultations at flat ₹999 (you earn ₹699, platform ₹300).
              </p>
            </div>
            <input
              type="checkbox"
              checked={emergencyAvailable}
              onChange={(e) => setEmergencyAvailable(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0B1F3A]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <Save className="h-4 w-4 text-[#C9A84C]" />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  )
}
