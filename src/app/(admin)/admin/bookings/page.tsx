'use client'

import React, { useState } from 'react'
import { CalendarCheck, ShieldCheck, IndianRupee, ExternalLink } from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([
    {
      id: 'LX-2025-847291',
      client: 'Rahul Kumar',
      lawyer: 'Adv. Priya Sharma',
      date: '24 Oct 2025',
      type: 'VIDEO',
      total: 741,
      lawyerShare: 599,
      platformFee: 60,
      escrowStatus: 'LOCKED',
      paymentStatus: 'PAID',
    },
    {
      id: 'LX-2025-623847',
      client: 'Rahul Kumar',
      lawyer: 'Adv. Anjali Kapoor',
      date: '28 Oct 2025',
      type: 'INPERSON',
      total: 958,
      lawyerShare: 799,
      platformFee: 80,
      escrowStatus: 'LOCKED',
      paymentStatus: 'PAID',
    },
    {
      id: 'LX-2025-512034',
      client: 'Rahul Kumar',
      lawyer: 'Vikram Singh (Student)',
      date: '10 Oct 2025',
      type: 'PHONE',
      total: 189,
      lawyerShare: 142,
      platformFee: 21,
      escrowStatus: 'RELEASED',
      paymentStatus: 'PAID',
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-white">Platform Bookings & Escrow Audit</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor consultation transactions, Razorpay order bindings, and manual escrow releases.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Client</th>
                <th className="p-4">Advocate</th>
                <th className="p-4">Mode</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Platform Fee</th>
                <th className="p-4">Escrow Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-mono font-bold text-[#C9A84C]">{b.id}</td>
                  <td className="p-4 font-medium text-white">{b.client}</td>
                  <td className="p-4">{b.lawyer}</td>
                  <td className="p-4">{b.type}</td>
                  <td className="p-4 font-bold text-white">{formatINR(b.total)}</td>
                  <td className="p-4 font-bold text-emerald-400">{formatINR(b.platformFee)}</td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        b.escrowStatus === 'LOCKED'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {b.escrowStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Escrow audit for ${b.id}: Verified payment. Ready for automated 48h settlement.`)}
                      className="rounded-lg bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700"
                    >
                      Audit
                    </button>
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
