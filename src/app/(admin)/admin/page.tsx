'use client'

import React from 'react'
import Link from 'next/link'
import {
  Users,
  ShieldCheck,
  CalendarCheck,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function AdminOverviewPage() {
  const stats = {
    totalUsers: 9,
    verifiedAdvocates: 5,
    lawStudents: 2,
    totalConsultations: 3,
    totalGMV: 1888,
    platformRevenue: 161,
    escrowLocked: 741,
  }

  const systemHealth = [
    { name: 'Google Gemini 1.5 Flash', status: 'Operational', latency: '340ms', tier: 'Free (15 req/min)' },
    { name: 'Google Meet / Calendar API', status: 'Operational', latency: '410ms', tier: 'Free Tier' },
    { name: 'Razorpay Payments & Escrow', status: 'Active (Test)', latency: '190ms', tier: 'Standard Escrow' },
    { name: 'Brevo Transactional Email', status: 'Operational', latency: '220ms', tier: '300/day Free Tier' },
    { name: 'Fast2SMS Indian SMS/OTP', status: 'Operational', latency: '120ms', tier: 'Rs.0.10 / SMS' },
    { name: 'Meta WhatsApp Cloud API', status: 'Connected', latency: '280ms', tier: 'Active Webhook' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl sm:text-3xl font-bold text-white">Platform Control Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pan-India telemetry, advocate Bar Council verification, and escrow settlement audits.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-950/80 px-3.5 py-1.5 border border-emerald-800 text-xs font-semibold text-emerald-400">
          <Activity className="h-4 w-4 animate-pulse" />
          <span>All Microservices Operational</span>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="h-4 w-4 text-[#C9A84C]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{stats.totalUsers}</p>
          <p className="mt-1 text-[11px] text-slate-400">5 Lawyers • 2 Students • 1 Client</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Verified Advocates</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-400">{stats.verifiedAdvocates}</p>
          <p className="mt-1 text-[11px] text-slate-400">Telangana High Court Enrolled</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Platform GMV</span>
            <IndianRupee className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{formatINR(stats.totalGMV)}</p>
          <p className="mt-1 text-[11px] text-emerald-400 font-semibold">
            {formatINR(stats.platformRevenue)} Platform Commission
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Escrow Balance</span>
            <IndianRupee className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-amber-400">{formatINR(stats.escrowLocked)}</p>
          <p className="mt-1 text-[11px] text-slate-400">Locked pending completion</p>
        </div>
      </div>

      {/* Google Ecosystem & Microservice Telemetry */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white">Google Ecosystem & Microservice Integrations</h2>
            <p className="text-xs text-slate-400">Target budget: under Rs.800/month across entire platform</p>
          </div>
          <span className="rounded bg-slate-900 px-3 py-1 text-xs font-mono text-emerald-400 border border-slate-800">
            Budget Est: Rs.800 / mo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {systemHealth.map((srv) => (
            <div
              key={srv.name}
              className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{srv.name}</span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="h-3 w-3" /> {srv.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Latency: {srv.latency}</span>
                <span className="text-[#C9A84C] font-semibold">{srv.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Shortcut Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/lawyers"
          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5 hover:border-[#C9A84C] transition group"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#C9A84C] transition">
              Advocate Bar Council Verification Queue
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verify enrollment certificates, ID proofs, and practice court authorizations.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-[#C9A84C] transition" />
        </Link>

        <Link
          href="/admin/bookings"
          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5 hover:border-[#C9A84C] transition group"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#C9A84C] transition">
              Escrow Audit & Dispute Resolution
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspect consultation logs, Google Meet transcripts, and approve 48h payouts.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-[#C9A84C] transition" />
        </Link>
      </div>
    </div>
  )
}
