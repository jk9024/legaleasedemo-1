import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Clock, RefreshCw, AlertCircle, CheckCircle2, ArrowRight, HelpCircle, PhoneCall } from 'lucide-react'

export const metadata: Metadata = {
  title: '100% Escrow Refund & Cancellation Policy — LegalEase',
  description:
    'LegalEase 100% Escrow Guarantee, advocate no-show protection, 48-hour dispute resolution, and instant UPI/Card refund timelines.',
}

/**
 * 100% Escrow & Cancellation Policy Page
 * Explains escrow fund safeguards, client cancellation timelines,
 * advocate no-show automatic refunds, and 48-hour dispute escalation.
 */
export default function RefundPolicyPage() {
  const refundScenarios = [
    {
      scenario: 'Advocate No-Show',
      description: 'Advocate fails to join the Google Meet room within 10 minutes of scheduled start time.',
      refundType: '100% Immediate Refund',
      typeColor: 'text-[#0D7A55] bg-emerald-50 border-emerald-200',
      action: 'Automatic system trigger + Option to rebook another advocate free of cost.',
    },
    {
      scenario: 'Cancellation > 2 Hours Before Slot',
      description: 'Client voluntarily cancels booking at least 2 hours prior to the scheduled consultation time.',
      refundType: '100% Full Refund',
      typeColor: 'text-[#0D7A55] bg-emerald-50 border-emerald-200',
      action: 'Credited to source payment account within 3 to 5 banking days.',
    },
    {
      scenario: 'Cancellation < 2 Hours Before Slot',
      description: 'Client cancels booking with less than 2 hours notice before the scheduled appointment.',
      refundType: '50% Partial Refund',
      typeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      action: '50% retained as advocate slot reservation fee; remaining 50% refunded immediately.',
    },
    {
      scenario: 'Platform Technical Failure',
      description: 'System connectivity outage or Google Meet server issue preventing meeting commencement.',
      refundType: '100% Refund or Free Reschedule',
      typeColor: 'text-[#0D7A55] bg-emerald-50 border-emerald-200',
      action: 'Full credit or complimentary immediate rescheduling at client choice.',
    },
    {
      scenario: 'Post-Call Dissatisfaction Dispute',
      description: 'Advocate ended call abruptly or did not address stated case matters during the session.',
      refundType: 'Case-by-Case Audit',
      typeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      action: 'Raise dispute within 48 hours. Escrow release frozen pending investigation.',
    },
    {
      scenario: 'LexPlus Subscription Cancellation',
      description: 'Annual or monthly subscription cancelled within 7 days with zero consultations used.',
      refundType: '100% Prorated / Full',
      typeColor: 'text-[#0D7A55] bg-emerald-50 border-emerald-200',
      action: '7-day cooling-off guarantee honored with zero cancellation penalty.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#0B1F3A] transition">Home</Link>
          <span>/</span>
          <span className="text-[#0B1F3A] font-semibold">Refund Policy</span>
        </div>

        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0B1F3A] via-[#102d54] to-[#0B1F3A] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D7A55]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D7A55]/20 border border-[#0D7A55]/40 text-[#10b981] text-xs font-bold tracking-wide uppercase mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Escrow Protection Guarantee</span>
            </div>
            <h1 className="font-hero text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Escrow Safeguards & Refund Policy
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your consultation fee is never transferred to the advocate until your session is completed satisfactorily. Learn how our 48-hour escrow protection keeps your funds secure.
            </p>
          </div>
        </div>

        {/* How the Escrow Works 3-Step Process */}
        <section className="mb-12">
          <h2 className="font-hero text-2xl font-bold text-[#0B1F3A] text-center mb-8">
            How Escrow Secures Every Consultation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-white font-bold text-sm mb-4">
                1
              </div>
              <h3 className="font-hero text-base font-bold text-[#0B1F3A] mb-2">
                Payment Locked in Escrow
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you pay via UPI or card, your consultation fee is deposited into a secured Reserve Bank of India compliant escrow account via Razorpay. The advocate cannot withdraw these funds yet.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-[#C9A84C] font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-hero text-base font-bold text-[#0B1F3A] mb-2">
                Consultation Takes Place
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You meet with your verified advocate over Google Meet at your scheduled IST time. Our system logs presence timestamps and creates your AI summary docket.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D7A55] text-white font-bold text-sm mb-4">
                3
              </div>
              <h3 className="font-hero text-base font-bold text-[#0B1F3A] mb-2">
                48-Hour Release or Refund
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have 48 hours post-call to confirm satisfaction. If satisfied, escrow releases funds to the advocate. If you raise a grievance, payout is frozen immediately for review.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Scenario Matrix */}
        <section className="mb-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-[#C9A84C]" />
            Cancellation & Refund Eligibility Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="py-3 px-4">Circumstance</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Refund Amount</th>
                  <th className="py-3 px-4">Resolution Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {refundScenarios.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-bold text-[#0B1F3A]">{item.scenario}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.description}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full border text-[11px] font-bold ${item.typeColor}`}>
                        {item.refundType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 48-Hour Dispute Resolution Process */}
        <section className="mb-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0B1F3A]" />
            How to Raise a 48-Hour Escrow Dispute
          </h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              If your consultation did not proceed as expected (for example, the advocate left the call prematurely without addressing your scheduled query, or there was severe audio/video distortion), follow these simple steps to freeze escrow release:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-xs text-slate-700">
              <li>
                <strong>Go to Client Dashboard:</strong> Open your <Link href="/dashboard" className="text-[#0B1F3A] font-semibold underline">Dashboard &gt; Bookings</Link> tab within 48 hours of your scheduled consultation.
              </li>
              <li>
                <strong>Click &quot;Raise Escrow Dispute&quot;:</strong> Select the booking in question and click the dispute link. Briefly specify whether the issue was an advocate absence, premature disconnect, or professional dispute.
              </li>
              <li>
                <strong>Automated Payout Freeze:</strong> Our platform locks the escrow balance immediately. The advocate cannot receive the disbursement while the dispute is pending.
              </li>
              <li>
                <strong>Resolution Within 24-48 Hours:</strong> Our Grievance Committee reviews Google Meet connection logs and AI consultation metrics. If upheld, a 100% refund is initiated back to your original payment method.
              </li>
            </ol>
          </div>
        </section>

        {/* Banking Timelines Notice */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-blue-950 mb-1">
                Disbursement & Banking Timelines
              </h3>
              <p className="text-xs text-blue-900 leading-relaxed">
                Once a refund is approved by LegalEase, Razorpay transmits refund instructions instantly. For UPI payments (Google Pay, PhonePe, Paytm), funds typically reflect within <strong>2 to 4 hours</strong>. For Debit/Credit Cards and Net Banking (SBI, HDFC, ICICI), your acquiring bank may take <strong>3 to 5 business days</strong> to credit the transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Help CTA Box */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#152e4d] p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-hero text-xl font-bold text-white mb-2">
              Have questions regarding an active booking?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Our support team is available 7 days a week to review bookings, handle slot rescheduling, and assist with immediate dispute settlements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:support@legalease.in"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-5 py-2.5 text-xs font-bold text-[#0B1F3A] hover:bg-[#b8953a] transition shadow-md"
            >
              <span>Email Support</span>
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              <span>Open Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
