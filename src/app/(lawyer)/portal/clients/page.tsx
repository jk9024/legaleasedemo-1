'use client'

import React, { useState } from 'react'
import {
  Users,
  Search,
  Briefcase,
  Calendar,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  PlusCircle,
} from 'lucide-react'
import { CASE_STAGES } from '@/lib/constants'

export default function LawyerClientsPage() {
  const [selectedCaseStage, setSelectedCaseStage] = useState(2)
  const [stageNotes, setStageNotes] = useState('')
  const [isUpdatingStage, setIsUpdatingStage] = useState(false)
  const [stageUpdatedNotice, setStageUpdatedNotice] = useState(false)

  const clients = [
    {
      id: 'client-1',
      name: 'Rahul Kumar',
      email: 'rahul@test.com',
      phone: '+91 98765 43210',
      caseTitle: 'Property Boundary Dispute (Plot #42, Kompally)',
      caseNumber: 'LE-2025-PROP-01',
      currentStage: 2,
      lastInteraction: '22 Oct 2025',
    },
    {
      id: 'client-2',
      name: 'Vikram Chawla',
      email: 'vikram.c@gmail.com',
      phone: '+91 98765 11223',
      caseTitle: 'Commercial Tenancy Eviction (Banjara Hills)',
      caseNumber: 'LE-2025-PROP-04',
      currentStage: 1,
      lastInteraction: '19 Oct 2025',
    },
  ]

  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingStage(true)
    setTimeout(() => {
      setIsUpdatingStage(false)
      setStageUpdatedNotice(true)
      setTimeout(() => setStageUpdatedNotice(false), 3000)
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">My Active Clients</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage legal representations, client documents, and update live 7-stage case trackers.
          </p>
        </div>
      </div>

      {stageUpdatedNotice && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Case stage updated! WhatsApp notification dispatched to client Rahul Kumar.</span>
        </div>
      )}

      {/* Grid: Client list on left, Stage Advancement Tool on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col: Client List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Client Roster ({clients.length})
          </h2>

          {clients.map((c) => {
            const stage = CASE_STAGES[c.currentStage]
            return (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {c.caseNumber}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1F3A] mt-1">{c.name}</h3>
                    <p className="text-xs text-slate-500">
                      {c.phone} • {c.email}
                    </p>
                  </div>

                  <span className="rounded bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 self-start border border-amber-200">
                    Stage {c.currentStage}: {stage.label}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  <p className="font-semibold text-slate-800">Case Matter:</p>
                  <p className="mt-0.5 text-slate-600">{c.caseTitle}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Last Activity: {c.lastInteraction}</span>
                  <button
                    onClick={() => {
                      setSelectedCaseStage(c.currentStage + 1)
                      setStageNotes(`Proceeded to stage ${c.currentStage + 1}`)
                    }}
                    className="font-bold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                  >
                    Update Progress →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right col: Swiggy-Style Case Stage Advancement Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Briefcase className="h-4 w-4 text-[#0B1F3A]" />
            <h2 className="text-sm font-bold text-[#0B1F3A]">Advance Case Stage</h2>
          </div>

          <form onSubmit={handleUpdateStage} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select New Stage
              </label>
              <select
                value={selectedCaseStage}
                onChange={(e) => setSelectedCaseStage(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              >
                {CASE_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    Stage {s.id}: {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stage Notes for Client
              </label>
              <textarea
                rows={4}
                required
                value={stageNotes}
                onChange={(e) => setStageNotes(e.target.value)}
                placeholder="Describe next procedural steps, filings, or document requirements..."
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingStage}
              className="w-full rounded-xl bg-[#0B1F3A] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition disabled:opacity-50"
            >
              {isUpdatingStage ? 'Updating & Notifying...' : 'Push Stage Update & Notify Client'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
