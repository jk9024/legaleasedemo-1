'use client'

import React from 'react'
import {
  IndianRupee,
  TrendingUp,
  Clock,
  ShieldCheck,
  Download,
  Building,
  CheckCircle2,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function LawyerEarningsPage() {
  const earnings = {
    totalRevenue: 186888,
    escrowLocked: 1540,
    withdrawn: 185348,
    bankAccount: 'HDFC Bank •••• 4092 (IFSC: HDFC0001234)',
    payoutHistory: [
      {
        id: 'PAY-892',
        date: '20 Oct 2025',
        amount: 24500,
        consultations: 42,
        status: 'TRANSFERRED',
        utr: 'UTR78291039821',
      },
      {
        id: 'PAY-891',
        date: '10 Oct 2025',
        amount: 21800,
        consultations: 38,
        status: 'TRANSFERRED',
        utr: 'UTR64829104921',
      },
      {
        id: 'PAY-890',
        date: '30 Sep 2025',
        amount: 28400,
        consultations: 48,
        status: 'TRANSFERRED',
        utr: 'UTR53920194821',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Earnings & Escrow Settlement</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your consultation payouts, escrow holding periods, and direct bank settlement records.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Payouts Received
          </span>
          <p className="mt-3 text-3xl font-extrabold text-[#0D7A55]">
            {formatINR(earnings.withdrawn)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Directly settled to your HDFC Bank</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Pending Escrow
          </span>
          <p className="mt-3 text-3xl font-extrabold text-amber-600">
            {formatINR(earnings.escrowLocked)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Auto-releases 48h after consultation</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Linked Settlement Bank
          </span>
          <p className="mt-3 text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
            <Building className="h-4 w-4 text-[#C9A84C]" />
            <span>{earnings.bankAccount}</span>
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#0D7A55]">
            <CheckCircle2 className="h-3 w-3" /> Penny-drop Verified
          </span>
        </div>
      </div>

      {/* Settlement History Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-[#0B1F3A]">Direct Bank Transfer Statements</h2>
          <button
            onClick={() => alert('Downloading GST payout statement')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:underline"
          >
            <Download className="h-4 w-4" /> Download Annual Tax Summary
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Payout ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Consultations</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Bank UTR Ref</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {earnings.payoutHistory.map((p) => (
                <tr key={p.id} className="text-slate-700">
                  <td className="py-3 font-semibold text-[#0B1F3A]">{p.id}</td>
                  <td className="py-3">{p.date}</td>
                  <td className="py-3">{p.consultations} sessions</td>
                  <td className="py-3 font-bold text-[#0D7A55]">{formatINR(p.amount)}</td>
                  <td className="py-3 text-slate-500 font-mono text-[11px]">{p.utr}</td>
                  <td className="py-3">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#0D7A55]">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
