'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  Download,
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { formatINR, formatDuration } from '@/lib/utils/formatters'

export default function ClientBookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')

  const upcomingBookings = [
    {
      id: 'b-1',
      bookingRef: 'LX-2025-847291',
      lawyerName: 'Adv. Priya Sharma',
      lawyerRole: 'High Court Advocate',
      lawyerImage:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      dateTime: 'Thursday, 24 Oct 2025 • 11:00 AM IST',
      durationMinutes: 60,
      consultationType: 'VIDEO',
      pricingModel: 'PER_HOUR',
      status: 'CONFIRMED',
      totalAmount: 741,
      meetLink: 'https://meet.google.com/leg-ease-priya',
      issueCategory: 'Property Law',
      issueDescription:
        'Property boundary dispute. Neighbour built wall on my land in Kompally.',
      extensionCount: 1,
      extensionAmount: 199,
    },
    {
      id: 'b-2',
      bookingRef: 'LX-2025-623847',
      lawyerName: 'Adv. Anjali Kapoor',
      lawyerRole: 'Family Court Advocate',
      lawyerImage:
        'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80',
      dateTime: 'Monday, 28 Oct 2025 • 03:00 PM IST',
      durationMinutes: 60,
      consultationType: 'INPERSON',
      pricingModel: 'PER_HOUR',
      status: 'CONFIRMED',
      totalAmount: 958,
      issueCategory: 'Family Law',
      issueDescription: 'Divorce consultation and child custody settlement queries.',
    },
  ]

  const completedBookings = [
    {
      id: 'b-3',
      bookingRef: 'LX-2025-512034',
      lawyerName: 'Vikram Singh',
      lawyerRole: 'Law Student (Symbiosis Law)',
      lawyerImage:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      dateTime: '10 Oct 2025 • 05:00 PM IST',
      durationMinutes: 47,
      actualDurationSeconds: 2843,
      consultationType: 'PHONE',
      pricingModel: 'PER_MINUTE',
      status: 'COMPLETED',
      totalAmount: 142,
      preAuthorized: 149,
      refundAmount: 7,
      isEscrowReleased: true,
      issueCategory: 'RTI & Public Law',
      callSummary: {
        issueDiscussed: 'RTI for road construction status in Kompally, Hyderabad',
        adviceGiven:
          'File formal RTI application with GHMC Public Information Officer (PWD dept). Request contractor work order, sanctioned budget, and scheduled completion date.',
        legalSectionsReferenced: ['RTI Act 2005 S.6', 'GHMC Act 1955 S.98'],
        nextSteps: [
          'Draft RTI application using LegalEase RTI Template',
          'Submit to GHMC Circle Office with Rs.10 court fee stamp',
          'Wait 30 statutory days for response',
        ],
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">My Consultations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your upcoming Google Meet sessions, call summaries, and billing statements.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-slate-200/70 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-lg px-4 py-2 transition ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-[#0B1F3A]'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`rounded-lg px-4 py-2 transition ${
              activeTab === 'completed'
                ? 'bg-white text-[#0B1F3A] shadow-sm'
                : 'text-slate-600 hover:text-[#0B1F3A]'
            }`}
          >
            Completed ({completedBookings.length})
          </button>
        </div>
      </div>

      {/* Upcoming Tab */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingBookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <img
                    src={b.lawyerImage}
                    alt={b.lawyerName}
                    className="h-14 w-14 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {b.bookingRef}
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#0D7A55]">
                        Escrow Locked
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#0B1F3A] mt-1">{b.lawyerName}</h2>
                    <p className="text-xs text-slate-500">{b.lawyerRole} • {b.issueCategory}</p>
                  </div>
                </div>

                <div className="text-right sm:self-center">
                  <p className="text-[11px] text-slate-500">Paid Amount</p>
                  <p className="text-lg font-bold text-[#0B1F3A]">{formatINR(b.totalAmount)}</p>
                </div>
              </div>

              {/* Consultation details & join CTA */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#C9A84C]" />
                    <span className="font-semibold text-[#0B1F3A]">{b.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.consultationType === 'VIDEO' ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MapPin className="h-4 w-4 text-amber-500" />
                    )}
                    <span>
                      Mode: {b.consultationType === 'VIDEO' ? 'Google Meet Encrypted Video' : 'In-Person Chamber Consultation'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {b.meetLink && (
                    <Link
                      href={`/video/${b.bookingRef}`}
                      className="flex items-center gap-2 rounded-xl bg-[#0D7A55] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      <Video className="h-4 w-4" />
                      <span>Enter Consultation Room</span>
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/messages?booking=${b.bookingRef}`}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Share Documents
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tab with AI Summary Delivery */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedBookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <img
                    src={b.lawyerImage}
                    alt={b.lawyerName}
                    className="h-14 w-14 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {b.bookingRef}
                      </span>
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                        Completed ({formatDuration(b.actualDurationSeconds)})
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#0B1F3A] mt-1">{b.lawyerName}</h2>
                    <p className="text-xs text-slate-500">{b.lawyerRole} • Per-Minute Billing</p>
                  </div>
                </div>

                <div className="text-right sm:self-center">
                  <p className="text-[11px] text-slate-500">Charged Amount</p>
                  <p className="text-base font-bold text-[#0B1F3A]">{formatINR(b.totalAmount)}</p>
                  <p className="text-[10px] text-[#0D7A55]">Refunded: {formatINR(b.refundAmount)}</p>
                </div>
              </div>

              {/* AI Call Summary Card */}
              {b.callSummary && (
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#C9A84C]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                        AI Consultation Summary & Action Plan
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#0B1F3A] hover:underline">
                      <Download className="h-3.5 w-3.5" /> Download PDF
                    </button>
                  </div>

                  <p className="text-xs text-slate-700">
                    <strong>Issue Discussed:</strong> {b.callSummary.issueDiscussed}
                  </p>
                  <p className="text-xs text-slate-700">
                    <strong>Advice Given:</strong> {b.callSummary.adviceGiven}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs">
                    <p className="font-semibold text-slate-800 mb-1">Recommended Next Steps:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {b.callSummary.nextSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
