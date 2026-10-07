'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  IndianRupee,
  Users,
  Star,
  Video,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function LawyerPortalOverview() {
  const [extensionPromptOpen, setExtensionPromptOpen] = useState(false)

  // Seed metrics for Adv. Priya Sharma
  const stats = {
    totalConsultations: 312,
    totalEarnings: 186888,
    escrowPending: 1540,
    rating: 4.9,
    reviewCount: 312,
    successRate: 87,
  }

  // Today's consultation
  const upcomingConsultation = {
    id: 'b-1',
    ref: 'LX-2025-847291',
    clientName: 'Rahul Kumar',
    clientPhone: '+91 98765 43210',
    time: '11:00 AM - 12:00 PM',
    mode: 'Google Meet Video',
    category: 'Property Law',
    issue: 'Property boundary dispute. Neighbour built wall on my land in Kompally.',
    meetLink: 'https://meet.google.com/leg-ease-priya',
    fee: 599,
  }

  return (
    <div className="space-y-8">
      {/* 1. Header greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              Welcome, Adv. Priya Sharma
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> High Court Bar Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enrolled 2012 (BAR/TS/2012/001) • Telangana High Court & Kukatpally Civil Court
          </p>
        </div>

        <Link
          href="/portal/knowledge-base"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <Sparkles className="h-4 w-4 text-[#C9A84C]" />
          <span>AI Precedent Matcher</span>
        </Link>
      </div>

      {/* 2. 4 Advocate Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Total Consults</span>
            <Users className="h-4 w-4 text-[#0B1F3A]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">{stats.totalConsultations}</p>
          <p className="mt-1 text-[11px] text-[#0D7A55] font-semibold">{stats.successRate}% settlement rate</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Total Earnings</span>
            <IndianRupee className="h-4 w-4 text-[#0B1F3A]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">
            {formatINR(stats.totalEarnings)}
          </p>
          <p className="mt-1 text-[11px] text-[#0D7A55] font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Direct bank payouts
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Pending Escrow</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-amber-600">
            {formatINR(stats.escrowPending)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">Releases 48h after consultation</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Client Rating</span>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#0B1F3A]">
            {stats.rating} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{stats.reviewCount} verified client reviews</p>
        </div>
      </div>

      {/* 3. Next Scheduled Consultation Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">
              Next Client Consultation
            </h2>
          </div>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            Ref: {upcomingConsultation.ref}
          </span>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A]">
              {upcomingConsultation.clientName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phone: {upcomingConsultation.clientPhone} • Category: {upcomingConsultation.category}
            </p>
            <p className="mt-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-xl">
              <strong>Client Issue:</strong> &quot;{upcomingConsultation.issue}&quot;
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-[#0B1F3A]">
                <Calendar className="h-3.5 w-3.5 text-[#C9A84C]" /> {upcomingConsultation.time}
              </span>
              <span className="flex items-center gap-1 text-[#0D7A55]">
                <IndianRupee className="h-3.5 w-3.5" /> Fee: {formatINR(upcomingConsultation.fee)} (Locked in Escrow)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={upcomingConsultation.meetLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0D7A55] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              <Video className="h-4 w-4" />
              <span>Launch Google Meet</span>
            </a>
            <Link
              href={`/portal/clients`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <span>View Documents</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. In-Session Extension Request Demo (Interactive Component) */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#0B1F3A]">
                  Session Extension Feature (AGENTS.md Logic)
                </h3>
                <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  Auto-Approve: ON
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                When a client extends a consultation by 15 or 30 minutes, 33% discount is applied on the 1st
                extension and 20% on the 2nd. Your account is configured to auto-accept extensions.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Simulated Session Extension: +30 minutes, ₹199 credited to your escrow.')}
            className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition shrink-0"
          >
            Test Extension Workflow
          </button>
        </div>
      </div>
    </div>
  )
}
