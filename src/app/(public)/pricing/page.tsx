'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Calculator,
  Building,
  Users,
  FileText,
  Clock,
  Briefcase,
  Award,
  Zap,
} from 'lucide-react'
import {
  CLIENT_PLANS,
  LAWYER_PLANS,
  B2B_PLANS,
  DOCUMENT_PRICES,
} from '@/lib/utils/pricing'
import { formatINR } from '@/lib/utils/formatters'

/**
 * LegalEase Overhauled Pricing Page
 * Features 4 distinct sections:
 * 1. For Citizens (LexBasic, LexPlus, LexPro, LexEnterprise) with Monthly/Annual toggle
 * 2. For Lawyers (Free, Starter, Pro, Elite) with interactive commission calculator
 * 3. For Businesses (Startup, SME, Corporate) with traditional law firm comparison
 * 4. Document Pricing Grid with instant delivery timelines
 */
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [monthlyBookings, setMonthlyBookings] = useState<number>(20)
  const [avgFeePerBooking, setAvgFeePerBooking] = useState<number>(600)

  // Paid citizen plans (Rs.199 to Rs.2,999)
  const citizenPlans = CLIENT_PLANS.filter((p) => p.key !== 'NONE')

  // Commission upgrade calculator math
  const grossMonthlyEarnings = monthlyBookings * avgFeePerBooking
  const freePlatformCut = Math.round(grossMonthlyEarnings * 0.20)
  const proPlatformCut = Math.round(grossMonthlyEarnings * 0.10) + 599 // 10% + Rs.599 subscription
  const monthlySavingsWithPro = Math.max(0, freePlatformCut - proPlatformCut)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 px-4 py-1.5 text-xs font-semibold text-[#C9A84C] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Transparent, Affordable Indian Legal Access</span>
          </div>
          <h1 className="font-hero text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Clear Pricing. <span className="text-[#C9A84C]">Zero Surprises.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            From affordable per-minute consultations to comprehensive enterprise plans. Choose the right plan for you or your business.
          </p>
        </div>
      </section>

      {/* ================= SECTION 1: FOR CITIZENS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A55] bg-emerald-50 px-2.5 py-1 rounded-md">
                  Section 1
                </span>
                <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                  For Citizens & Families
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Flexible plans starting from ₹199/month with free monthly consultations.
              </p>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  billingCycle === 'monthly'
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  billingCycle === 'annual'
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-[#0D7A55] text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                  2 Months Free
                </span>
              </button>
            </div>
          </div>

          {/* 4 Citizen Plans Grid (LexBasic, LexPlus, LexPro, LexEnterprise) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citizenPlans.map((plan) => {
              const price = billingCycle === 'annual' ? plan.priceAnnual : plan.price
              const isPopular = plan.popular

              return (
                <div
                  key={plan.key}
                  className={`relative rounded-3xl p-6 transition-all flex flex-col justify-between border ${
                    isPopular
                      ? 'border-[#0D7A55] bg-gradient-to-b from-emerald-50/50 to-white shadow-lg ring-2 ring-[#0D7A55]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0D7A55] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                        {plan.name}
                      </h3>
                      {plan.members > 1 && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {plan.members} Members
                        </span>
                      )}
                    </div>

                    <div className="mt-4 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-hero text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
                          {formatINR(price)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          /{billingCycle === 'annual' ? 'year' : 'month'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {plan.freeConsults > 0
                          ? `${plan.freeConsults} free consults/mo (${plan.discount}% off bookings)`
                          : plan.freeConsults === -1
                          ? `Unlimited consults (${plan.discount}% off bookings)`
                          : 'Standard booking rates apply'}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-slate-700">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#0D7A55] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/register?plan=${plan.key}`}
                    className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? 'bg-[#0D7A55] hover:bg-[#09573c] text-white shadow-md'
                        : 'bg-[#0B1F3A] hover:bg-[#1a3a6b] text-white'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: FOR LAWYERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] bg-[#C9A84C]/20 border border-[#C9A84C]/30 px-2.5 py-1 rounded-md">
              Section 2
            </span>
            <h2 className="font-hero text-2xl sm:text-4xl font-bold text-white mt-3">
              For Advocates & Legal Practitioners
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Keep more of what you earn with tiered commissions as low as 7%. Upgrade anytime as your practice expands.
            </p>
          </div>

          {/* 4 Lawyer Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {LAWYER_PLANS.map((plan) => {
              const isPro = plan.key === 'PRO'
              return (
                <div
                  key={plan.key}
                  className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                    isPro
                      ? 'bg-slate-900 border-[#C9A84C] ring-2 ring-[#C9A84C]/40 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-hero text-lg font-bold text-white">
                        {plan.name}
                      </h3>
                      {isPro && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C9A84C] text-[#0B1F3A]">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="my-5">
                      <div className="flex items-baseline gap-1">
                        <span className="font-hero text-3xl font-extrabold text-white">
                          {plan.price === 0 ? 'Free' : formatINR(plan.price)}
                        </span>
                        {plan.price > 0 && <span className="text-xs text-slate-400">/month</span>}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        <span>Platform Commission:</span>
                        <span className="text-sm">{plan.commission}%</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {plan.upgradeHook && (
                      <p className="text-[11px] text-slate-400 mb-4 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                        💡 {plan.upgradeHook}
                      </p>
                    )}
                    <Link
                      href="/portal/settings"
                      className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold transition block ${
                        isPro
                          ? 'bg-[#C9A84C] hover:bg-[#d8b85c] text-[#0B1F3A]'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {plan.price === 0 ? 'Get Started' : `Choose ${plan.name}`}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Self-Upgrade Calculator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[#C9A84C] font-semibold text-xs mb-2">
              <Calculator className="h-4 w-4" />
              <span>Interactive Commission Savings Calculator</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              At 20 bookings/month, Pro pays for itself
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Adjust your expected consultation volume to calculate how much you save by moving to the Pro plan (10% commission vs 20% on Free).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-2">
                  Monthly Consultations: <strong className="text-white text-sm">{monthlyBookings}</strong>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={monthlyBookings}
                  onChange={(e) => setMonthlyBookings(Number(e.target.value))}
                  className="w-full accent-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-2">
                  Average Fee per Booking: <strong className="text-white text-sm">{formatINR(avgFeePerBooking)}</strong>
                </label>
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="50"
                  value={avgFeePerBooking}
                  onChange={(e) => setAvgFeePerBooking(Number(e.target.value))}
                  className="w-full accent-[#C9A84C]"
                />
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/30 p-4 rounded-xl text-center">
                <p className="text-[11px] text-emerald-300 uppercase font-semibold">
                  Estimated Monthly Savings with Pro
                </p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                  {formatINR(monthlySavingsWithPro)}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Net earnings boost after ₹599 plan fee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: FOR BUSINESSES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a56db] bg-blue-50 px-2.5 py-1 rounded-md">
              Section 3
            </span>
            <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-3">
              For Startups, SMEs & Corporate Teams
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Compare to traditional law firm: ₹25,000+/month
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {B2B_PLANS.map((b2b) => (
              <div
                key={b2b.key}
                className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                  b2b.popular
                    ? 'border-[#0B1F3A] bg-slate-50/50 shadow-lg ring-2 ring-[#0B1F3A]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-hero text-xl font-bold text-[#0B1F3A]">
                      {b2b.name}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#1a56db] border border-blue-200">
                      {b2b.employees} Employees
                    </span>
                  </div>

                  <div className="my-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-hero text-3xl font-extrabold text-[#0B1F3A]">
                        {formatINR(b2b.price)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/month</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Annual: {formatINR(b2b.priceAnnual)}/year
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-700">
                    {b2b.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#0D7A55] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact?intent=b2b"
                  className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    b2b.popular
                      ? 'bg-[#0B1F3A] hover:bg-[#1a3a6b] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                  }`}
                >
                  <span>Contact Sales for {b2b.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: DOCUMENT PRICES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9d174d] bg-pink-50 px-2.5 py-1 rounded-md">
              Section 4
            </span>
            <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-3">
              Standardized Legal Document Pricing
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Fixed, guaranteed pricing on everyday legal drafting with fast turnaround delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENT_PRICES.map((doc) => (
              <div
                key={doc.key}
                className="rounded-2xl border border-slate-200 p-5 bg-white hover:border-[#0B1F3A] hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {doc.name}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{doc.deliveryHours} hrs</span>
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#0D7A55]">
                      {formatINR(doc.price)}
                    </span>
                    <span className="text-xs text-slate-400">flat fee</span>
                  </div>
                </div>

                <Link
                  href={`/templates?category=${doc.key}`}
                  className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#0B1F3A] hover:text-[#0D7A55] flex items-center justify-between group"
                >
                  <span>Request Draft</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
