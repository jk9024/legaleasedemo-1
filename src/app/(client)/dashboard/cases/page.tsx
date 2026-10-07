'use client'

import React from 'react'
import Link from 'next/link'
import { Briefcase, ArrowRight, CheckCircle2, ChevronRight, Scale, Clock } from 'lucide-react'
import { CASE_STAGES } from '@/lib/constants'

export default function ClientCasesListPage() {
  const cases = [
    {
      id: 'case-1',
      title: 'Property Boundary Dispute — Kompally Plot #42',
      caseNumber: 'LE-2025-PROP-01',
      lawyerName: 'Adv. Priya Sharma',
      currentStage: 2,
      category: 'Property Law',
      predictedDuration: '4 - 8 Months',
      updatedAt: '22 Oct 2025',
    },
    {
      id: 'case-2',
      title: 'Divorce Consultation & Child Custody',
      caseNumber: 'LE-2025-FAM-02',
      lawyerName: 'Adv. Anjali Kapoor',
      currentStage: 0,
      category: 'Family Law',
      predictedDuration: '6 - 12 Months',
      updatedAt: '15 Oct 2025',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">My Active Cases</h1>
          <p className="text-xs text-slate-500 mt-1">
            All legal representations, notices, and ongoing court proceedings.
          </p>
        </div>
        <Link
          href="/search"
          className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
        >
          File New Dispute
        </Link>
      </div>

      <div className="space-y-4">
        {cases.map((c) => {
          const stage = CASE_STAGES[c.currentStage]
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    {c.caseNumber}
                  </span>
                  <h2 className="text-base font-bold text-[#0B1F3A] mt-1">{c.title}</h2>
                  <p className="text-xs text-slate-500">
                    Advocate: <strong>{c.lawyerName}</strong> • {c.category}
                  </p>
                </div>
                <Link
                  href={`/dashboard/cases/${c.id}`}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] hover:bg-slate-50"
                >
                  <span>View Timeline</span> <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">{stage.icon}</span>
                  <div>
                    <span className="font-semibold text-slate-700">Stage {c.currentStage}: </span>
                    <span className="font-bold text-[#0B1F3A]">{stage.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Duration: {c.predictedDuration}
                  </span>
                  <span>Updated: {c.updatedAt}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
