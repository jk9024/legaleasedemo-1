'use client'

import React from 'react'
import { IndianRupee, TrendingUp, ShieldCheck, Download, Calculator } from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function AdminRevenuePage() {
  const financialSummary = {
    grossGMV: 1888,
    platformCommission: 161,
    techServiceCharge: 57,
    gstCollected: 39,
    netPayableToLawyers: 1540,
    infrastructureCost: 800,
  }

  const commissionRules = [
    { tier: 'Law Students', commission: '15%', note: 'Supports student legal apprenticeships' },
    { tier: 'Consultations < ₹599', commission: '12%', note: 'High volume, low ticket rate' },
    { tier: 'Consultations ₹599 - ₹1,500', commission: '10%', note: 'Standard advocate consultation' },
    { tier: 'Consultations > ₹1,500', commission: '8%', note: 'Senior counsel premium tier' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl font-bold text-white">Revenue, GST & Platform Economics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Auditing 100% transparent fee breakdowns, 18% GST remittances, and Rs.800/mo operating ceiling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Gross Booking GMV</span>
          <p className="mt-3 text-2xl font-extrabold text-white">
            {formatINR(financialSummary.grossGMV)}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Total customer funds processed</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Platform Take-Rate</span>
          <p className="mt-3 text-2xl font-extrabold text-emerald-400">
            {formatINR(financialSummary.platformCommission)}
          </p>
          <p className="mt-1 text-[11px] text-emerald-400">Avg. 9.8% effective take-rate</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">18% GST Remittance</span>
          <p className="mt-3 text-2xl font-extrabold text-amber-400">
            {formatINR(financialSummary.gstCollected)}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">On platform & tech charges</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Monthly Infra Cost</span>
          <p className="mt-3 text-2xl font-extrabold text-blue-400">
            {formatINR(financialSummary.infrastructureCost)}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Google Ecosystem + SMS + WA</p>
        </div>
      </div>

      {/* Commission Rules Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Platform Commission Structure (AGENTS.md Locked)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {commissionRules.map((r) => (
            <div
              key={r.tier}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{r.tier}</span>
                <span className="rounded bg-[#C9A84C] px-2 py-0.5 text-[10px] font-bold text-[#0B1F3A]">
                  {r.commission} Platform Fee
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
