'use client'

import React from 'react'
import { BarChart3, Star, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react'

export default function LawyerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Practice Analytics & Performance</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your client retention, settlement success metrics, and review sentiment scores.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Case Success Rate
          </span>
          <p className="mt-3 text-3xl font-extrabold text-[#0D7A55]">87%</p>
          <p className="mt-1 text-[11px] text-slate-500">Amicable or court judgments</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Avg. Response Time
          </span>
          <p className="mt-3 text-3xl font-extrabold text-[#0B1F3A]">15 min</p>
          <p className="mt-1 text-[11px] text-[#0D7A55] font-semibold">Top 5% on platform</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Profile Views
          </span>
          <p className="mt-3 text-3xl font-extrabold text-[#0B1F3A]">1,420</p>
          <p className="mt-1 text-[11px] text-slate-500">Last 30 days in Hyderabad</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Client Rating
          </span>
          <p className="mt-3 text-3xl font-extrabold text-amber-500">4.9 ★</p>
          <p className="mt-1 text-[11px] text-slate-500">Across 312 verified consultations</p>
        </div>
      </div>

      {/* Review breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#0B1F3A]">Client Satisfaction Breakdown</h2>
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-700">Legal Knowledge & Precision</span>
              <span className="font-bold text-[#0B1F3A]">98% (4.9 / 5.0)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-[#0D7A55]" style={{ width: '98%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-700">Communication & Empathy</span>
              <span className="font-bold text-[#0B1F3A]">96% (4.8 / 5.0)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-[#C9A84C]" style={{ width: '96%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-700">Punctuality on Google Meet</span>
              <span className="font-bold text-[#0B1F3A]">100% (5.0 / 5.0)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-[#0B1F3A]" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
