'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Scale,
  ShieldCheck,
  User,
  Paperclip,
  Download,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { CASE_STAGES } from '@/lib/constants'

export default function CaseDetailsPage() {
  const params = useParams()
  const caseId = params?.id as string

  // Seed data representation for Case 1 (Property Boundary Dispute)
  const caseData = {
    id: caseId || 'case-1',
    caseNumber: 'LE-2025-PROP-01',
    title: 'Property Boundary Dispute — Kompally Plot #42',
    category: 'Property Law',
    courtName: 'Telangana High Court / Kukatpally Civil Court',
    currentStage: 2, // Under Review
    lawyer: {
      name: 'Adv. Priya Sharma',
      court: 'Telangana High Court',
      phone: '+919876543201',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    predictedDuration: '4 - 8 Months',
    nextHearing: '28 November 2025',
    timeline: [
      {
        stage: 0,
        stageName: 'Consultation Booked',
        date: '18 Oct 2025, 11:30 AM',
        notes: 'Initial video consultation booked. Adv. Priya Sharma reviewed primary grievance regarding neighbour building boundary wall on client registered land.',
        attachments: [],
      },
      {
        stage: 1,
        stageName: 'Documents Submitted',
        date: '20 Oct 2025, 03:15 PM',
        notes: 'Client uploaded registered sale deed (2018), HMDA layout permission, and municipal tax receipts.',
        attachments: [
          { name: 'registered_sale_deed_kompally.pdf', size: '2.4 MB' },
          { name: 'hmda_layout_permission.pdf', size: '1.1 MB' },
        ],
      },
      {
        stage: 2,
        stageName: 'Under Review',
        date: '22 Oct 2025, 05:40 PM',
        notes: 'Reviewing layout boundary coordinates against GHMC approved plan. Statutory legal notice draft under TPA 1882 Section 5 is prepared.',
        attachments: [{ name: 'draft_legal_notice_tpa_sec5.docx', size: '420 KB' }],
      },
    ],
    documents: [
      { id: 'doc-1', name: 'Registered Sale Deed (Kompally)', size: '2.4 MB', date: '20 Oct 2025' },
      { id: 'doc-2', name: 'HMDA Layout Sanction Copy', size: '1.1 MB', date: '20 Oct 2025' },
      { id: 'doc-3', name: 'Draft Legal Demand Notice', size: '420 KB', date: '22 Oct 2025' },
    ],
  }

  return (
    <div className="space-y-8">
      {/* Back button and case header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B1F3A] mb-3"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-bold text-[#0B1F3A]">
                {caseData.caseNumber}
              </span>
              <span className="rounded bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                Stage 2: Under Review
              </span>
            </div>
            <h1 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2">
              {caseData.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Court: <strong>{caseData.courtName}</strong> • Category: {caseData.category}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/messages?lawyer=${caseData.lawyer.name}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1a3a6b]"
            >
              <MessageSquare className="h-4 w-4 text-[#C9A84C]" />
              <span>Message Advocate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Timeline on left, Case Details & Lawyer on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col (2 spans): 7-Stage Progress & Historical Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* 7-Stage Visual Progress Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] mb-6">
              Case Progression Status
            </h2>
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-slate-200" />
              <div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-[#0D7A55] transition-all"
                style={{
                  width: `${(caseData.currentStage / (CASE_STAGES.length - 1)) * 100}%`,
                }}
              />

              {CASE_STAGES.map((s) => {
                const isPassed = s.id <= caseData.currentStage
                const isCurrent = s.id === caseData.currentStage

                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                        isCurrent
                          ? 'bg-[#0B1F3A] text-[#C9A84C] ring-4 ring-[#C9A84C]/30 shadow-md'
                          : isPassed
                          ? 'bg-[#0D7A55] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <span>{s.icon}</span>
                    </div>
                    <span
                      className={`mt-2 text-[10px] font-semibold text-center max-w-[75px] ${
                        isCurrent ? 'text-[#0B1F3A] font-bold' : isPassed ? 'text-[#0D7A55]' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Historical Updates Feed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] mb-6">
              Detailed Case Milestones
            </h2>
            <div className="space-y-6">
              {caseData.timeline.map((update, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Timeline connector dot */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#0B1F3A]">{update.stageName}</h3>
                      <span className="text-[11px] text-slate-500">{update.date}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{update.notes}</p>

                    {update.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                        {update.attachments.map((att, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-[#0B1F3A] border border-slate-200 shadow-2xs"
                          >
                            <Paperclip className="h-3.5 w-3.5 text-slate-400" />
                            <span>{att.name}</span>
                            <span className="text-[10px] text-slate-400">({att.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Advocate Details & Case Metadata */}
        <div className="space-y-6">
          {/* Advocate Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Assigned Advocate
            </h2>
            <div className="flex items-center gap-3">
              <img
                src={caseData.lawyer.image}
                alt={caseData.lawyer.name}
                className="h-14 w-14 rounded-xl object-cover border border-slate-100"
              />
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A]">{caseData.lawyer.name}</h3>
                <p className="text-xs text-slate-500">{caseData.lawyer.court}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#0D7A55] font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> High Court Bar Verified
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
              <Link
                href={`/dashboard/messages?lawyer=${caseData.lawyer.name}`}
                className="flex-1 text-center rounded-lg bg-[#0B1F3A] py-2 text-xs font-semibold text-white hover:bg-[#1a3a6b] transition"
              >
                Direct Chat
              </Link>
              <Link
                href="/dashboard/bookings"
                className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Schedule Call
              </Link>
            </div>
          </div>

          {/* Hearing & Timeline Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Key Timelines
            </h2>
            <div>
              <p className="text-[11px] text-slate-500">Predicted Resolution Duration</p>
              <p className="text-sm font-bold text-[#0B1F3A] mt-0.5">
                {caseData.predictedDuration}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">Expected Legal Notice Dispatch</p>
              <p className="text-sm font-bold text-[#0D7A55] mt-0.5">Next Week (28 Oct 2025)</p>
            </div>
          </div>

          {/* Case Documents Vault */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Case Documents ({caseData.documents.length})
              </h2>
              <Link
                href="/dashboard/documents"
                className="text-xs font-semibold text-[#0B1F3A] hover:underline"
              >
                Open Vault
              </Link>
            </div>
            <div className="space-y-2">
              {caseData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 text-xs border border-slate-100"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate font-medium text-[#0B1F3A]">{doc.name}</span>
                  </div>
                  <button className="p-1 text-slate-500 hover:text-[#0B1F3A]">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
