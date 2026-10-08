'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  Video,
  Clock,
  Briefcase,
  FolderLock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import { formatINR, formatDateIndian } from '@/lib/utils/formatters'
import { CASE_STAGES } from '@/lib/constants'

export default function ClientDashboardOverview() {
  // Current active consultation based on seeded data
  const upcomingBooking = {
    id: 'LX-2025-847291',
    lawyerName: 'Adv. Priya Sharma',
    lawyerImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    specialization: 'Property Law & RERA',
    court: 'Telangana High Court',
    dateTime: 'Thursday, 24 Oct • 11:00 AM IST',
    meetLink: 'https://meet.google.com/leg-ease-priya',
    type: 'Google Meet Video',
    status: 'CONFIRMED',
    paidAmount: 741,
  }

  // Active cases from seed
  const activeCases = [
    {
      id: 'case-1',
      title: 'Property Boundary Dispute',
      caseNumber: 'LE-2025-PROP-01',
      lawyerName: 'Adv. Priya Sharma',
      currentStage: 2, // Under Review
      lastUpdate: 'Reviewing layout boundary coordinates against GHMC approved plan.',
      category: 'Property Law',
      predictedDuration: '4 - 8 Months',
    },
    {
      id: 'case-2',
      title: 'Divorce Consultation & Child Custody',
      caseNumber: 'LE-2025-FAM-02',
      lawyerName: 'Adv. Anjali Kapoor',
      currentStage: 0, // Consultation Booked
      lastUpdate: 'Consultation scheduled. Please collate marriage registration documents.',
      category: 'Family Law',
      predictedDuration: '6 - 12 Months',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 1. Header greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              Welcome back, Rahul Kumar
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified Citizen
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Track your ongoing legal cases, video consultations, and court filings.
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1a3a6b]"
        >
          <Sparkles className="h-4 w-4 text-[#C9A84C]" />
          <span>New AI Consultation</span>
        </Link>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Active Cases</span>
            <Briefcase className="h-4 w-4 text-[#0B1F3A]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">2</p>
          <p className="mt-1 text-[11px] text-[#0D7A55] font-medium">Both cases progressing on track</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Consultations</span>
            <Video className="h-4 w-4 text-[#0B1F3A]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">3</p>
          <p className="mt-1 text-[11px] text-amber-600 font-medium">1 upcoming consultation</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Vault Files</span>
            <FolderLock className="h-4 w-4 text-[#0B1F3A]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">4</p>
          <p className="mt-1 text-[11px] text-slate-500 font-medium">Encrypted & OCR Indexed</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Protection Plan</span>
            <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
          </div>
          <p className="mt-3 text-base font-bold text-[#0B1F3A]">LexPlus</p>
          <p className="mt-1 text-[11px] text-[#0D7A55] font-medium">20% consultation discount active</p>
        </div>
      </div>

      {/* 3. Upcoming Consultation Highlight Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">
              Next Scheduled Consultation
            </h2>
          </div>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
            ID: {upcomingBooking.id}
          </span>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={upcomingBooking.lawyerImage}
              alt={upcomingBooking.lawyerName}
              className="h-16 w-16 rounded-xl object-cover border border-slate-100"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-[#0B1F3A]">
                  {upcomingBooking.lawyerName}
                </h3>
                <CheckCircle2 className="h-4 w-4 text-[#0D7A55]" />
              </div>
              <p className="text-xs text-slate-500">{upcomingBooking.specialization} • {upcomingBooking.court}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-700">
                <span className="flex items-center gap-1 font-semibold text-[#0B1F3A]">
                  <Calendar className="h-3.5 w-3.5 text-[#C9A84C]" /> {upcomingBooking.dateTime}
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Video className="h-3.5 w-3.5 text-blue-500" /> {upcomingBooking.type}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/video/${upcomingBooking.id}`}
              className="flex items-center gap-2 rounded-xl bg-[#0D7A55] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Video className="h-4 w-4" />
              <span>Join Google Meet</span>
            </Link>
            <Link
              href={`/dashboard/bookings`}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#0B1F3A] hover:bg-slate-50 transition"
            >
              View Booking
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Active Cases with Swiggy-Style 7-Stage Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-hero text-xl font-bold text-[#0B1F3A]">Active Case Tracker</h2>
            <p className="text-xs text-slate-500">Live 7-stage status updates from your advocate</p>
          </div>
          <Link
            href="/dashboard/cases"
            className="text-xs font-semibold text-[#0B1F3A] hover:text-[#C9A84C] flex items-center gap-1"
          >
            <span>View all cases</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {activeCases.map((c) => {
            const currentStageInfo = CASE_STAGES[c.currentStage]

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
                    <h3 className="text-base font-bold text-[#0B1F3A] mt-1">{c.title}</h3>
                    <p className="text-xs text-slate-500">
                      Advocate: <strong>{c.lawyerName}</strong> • Predicted Duration: {c.predictedDuration}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/cases/${c.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1F3A] hover:text-[#C9A84C]"
                  >
                    <span>Full Timeline</span> <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* 7-Stage Progress Bar (Swiggy/Zepto style) */}
                <div className="mt-6">
                  <div className="relative flex items-center justify-between">
                    {/* Background track line */}
                    <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-slate-200" />
                    {/* Active filled line */}
                    <div
                      className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-[#0D7A55] transition-all duration-500"
                      style={{
                        width: `${(c.currentStage / (CASE_STAGES.length - 1)) * 100}%`,
                      }}
                    />

                    {/* Stage nodes */}
                    {CASE_STAGES.map((stage) => {
                      const isCompleted = stage.id <= c.currentStage
                      const isCurrent = stage.id === c.currentStage

                      return (
                        <div
                          key={stage.id}
                          className="relative z-10 flex flex-col items-center group cursor-pointer"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                              isCurrent
                                ? 'bg-[#0B1F3A] text-[#C9A84C] ring-4 ring-[#C9A84C]/30 shadow-md'
                                : isCompleted
                                ? 'bg-[#0D7A55] text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            <span>{stage.icon}</span>
                          </div>
                          <span
                            className={`hidden md:block mt-2 text-[10px] font-semibold text-center max-w-[80px] ${
                              isCurrent
                                ? 'text-[#0B1F3A] font-bold'
                                : isCompleted
                                ? 'text-[#0D7A55]'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Latest update note */}
                <div className="mt-6 rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-start gap-2.5">
                  <span className="text-base">{currentStageInfo.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-[#0B1F3A]">
                      Current Stage: {currentStageInfo.label}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{c.lastUpdate}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
