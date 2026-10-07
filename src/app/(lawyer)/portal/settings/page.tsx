'use client'

import React, { useState } from 'react'
import { Settings, Save, Check, Scale, ShieldCheck } from 'lucide-react'

export default function LawyerSettingsPage() {
  const [hourlyFee, setHourlyFee] = useState(599)
  const [perMinuteFee, setPerMinuteFee] = useState(12)
  const [emergencyFee, setEmergencyFee] = useState(999)
  const [autoApproveExtension, setAutoApproveExtension] = useState(true)
  const [emergencyAvailable, setEmergencyAvailable] = useState(true)
  const [saved, setSaved] = useState(false)

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
          Configure your consultation rates, auto-extension preferences, and Bar Council verified profile.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
          <Check className="h-4 w-4" />
          <span>Practice profile and fee configurations saved!</span>
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

        {/* Pricing Tiers (Per Hour & Per Minute) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0B1F3A]">Consultation Pricing Configuration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Fee Per Hour (INR)</label>
              <input
                type="number"
                value={hourlyFee}
                onChange={(e) => setHourlyFee(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-[#0B1F3A] font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Platform comm: 10% on ₹599</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Fee Per Minute (INR)</label>
              <input
                type="number"
                value={perMinuteFee}
                onChange={(e) => setPerMinuteFee(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-[#0B1F3A] font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Applied for quick calls</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Fee (INR)</label>
              <input
                type="number"
                value={emergencyFee}
                onChange={(e) => setEmergencyFee(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-[#0B1F3A] font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">For 24/7 on-call consults</p>
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
                Automatically add 15 or 30 minutes when client extends and pays during consultation.
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
                Receive high-priority WhatsApp and phone dispatch requests for emergency arrest/custody cases.
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
