'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Video,
  User,
  Phone,
  CheckCircle2,
  FileText,
  IndianRupee,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function LawyerBookingsPage() {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all')

  const bookings = [
    {
      id: 'b-1',
      ref: 'LX-2025-847291',
      clientName: 'Rahul Kumar',
      clientPhone: '+91 98765 43210',
      dateTime: '24 Oct 2025 • 11:00 AM IST',
      durationMinutes: 60,
      mode: 'VIDEO',
      pricingModel: 'PER_HOUR',
      status: 'CONFIRMED',
      lawyerFee: 599,
      category: 'Property Law',
      issue: 'Property boundary dispute. Neighbour built wall on my land in Kompally.',
      meetLink: 'https://meet.google.com/leg-ease-priya',
    },
    {
      id: 'b-2',
      ref: 'LX-2025-781920',
      clientName: 'Vikram Chawla',
      clientPhone: '+91 98765 11223',
      dateTime: '25 Oct 2025 • 02:30 PM IST',
      durationMinutes: 30,
      mode: 'VIDEO',
      pricingModel: 'PER_MINUTE',
      status: 'CONFIRMED',
      lawyerFee: 360,
      category: 'Property Law',
      issue: 'Tenant refusing to vacate commercial shop in Banjara Hills after lease expiry.',
      meetLink: 'https://meet.google.com/leg-ease-priya-2',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Client Consultations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your schedule, launch Google Meet consultations, and review client uploaded evidence.
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-200/70 p-1 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-3 py-1.5 transition ${
              filter === 'all' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-600'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`rounded-lg px-3 py-1.5 transition ${
              filter === 'today' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-600'
            }`}
          >
            Today (1)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    {b.ref}
                  </span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#0D7A55]">
                    Escrow Locked
                  </span>
                </div>
                <h2 className="text-base font-bold text-[#0B1F3A] mt-1">{b.clientName}</h2>
                <p className="text-xs text-slate-500">{b.clientPhone} • {b.category}</p>
              </div>

              <div className="text-right sm:self-center">
                <p className="text-[11px] text-slate-500">Lawyer Share</p>
                <p className="text-lg font-bold text-[#0D7A55]">{formatINR(b.lawyerFee)}</p>
              </div>
            </div>

            <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
              <span className="font-bold text-[#0B1F3A]">Client Grievance: </span>
              &quot;{b.issue}&quot;
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-[#0B1F3A]">
                  <Calendar className="h-3.5 w-3.5 text-[#C9A84C]" /> {b.dateTime}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {b.durationMinutes} min session
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={b.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-[#0D7A55] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                >
                  <Video className="h-4 w-4" />
                  <span>Join Google Meet</span>
                </a>
                <Link
                  href="/portal/clients"
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Case Documents
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
