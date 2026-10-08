'use client'

import React from 'react'
import { ShieldCheck, Check, Sparkles, ArrowRight, Zap, Award } from 'lucide-react'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import { formatINR } from '@/lib/utils/formatters'

export default function SubscriptionPage() {
  const currentPlan = 'LEGAL_SHIELD'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">LexPlus Subscriptions</h1>
          <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
            Active Member
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Enjoy 20% flat consultation discounts, 2 free 30-min consultations, and session extension priority.
        </p>
      </div>

      {/* Current Active Plan Banner */}
      <div className="rounded-2xl border-2 border-[#C9A84C] bg-gradient-to-r from-[#0B1F3A] to-[#1a3a6b] p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="h-4 w-4" />
              <span>Current Subscription</span>
            </div>
            <h2 className="text-2xl font-bold">{SUBSCRIPTION_PLANS.LEX_PLUS.name}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Renews automatically on 24 November 2025 • {formatINR(SUBSCRIPTION_PLANS.LEX_PLUS.priceINR)} / month
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Check className="h-4 w-4" />
                <span>20% Consultation Discount Applied</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Check className="h-4 w-4" />
                <span>Unlimited OCR Document Vault</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Subscription management modal opened')}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              Cancel or Pause
            </button>
            <button
              onClick={() => alert('Upgraded to LexPro via Razorpay')}
              className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-xs font-bold text-[#0B1F3A] hover:bg-[#d8b85c] transition"
            >
              Upgrade to LexPro
            </button>
          </div>
        </div>
      </div>

      {/* Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plan 1: Free */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A]">{SUBSCRIPTION_PLANS.FREE.name}</h3>
            <p className="text-xs text-slate-500 mt-1">Standard on-demand legal advice</p>
            <p className="text-2xl font-extrabold text-[#0B1F3A] mt-4">₹0</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              {SUBSCRIPTION_PLANS.FREE.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            disabled
            className="mt-6 w-full rounded-lg bg-slate-100 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
          >
            Included by default
          </button>
        </div>

        {/* Plan 2: LexBasic */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A]">{SUBSCRIPTION_PLANS.LEX_BASIC.name}</h3>
            <p className="text-xs text-slate-500 mt-1">For individual personal legal advice</p>
            <p className="text-2xl font-extrabold text-[#0B1F3A] mt-4">
              {formatINR(SUBSCRIPTION_PLANS.LEX_BASIC.priceINR)}
              <span className="text-xs font-normal text-slate-500"> / month</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              {SUBSCRIPTION_PLANS.LEX_BASIC.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#0D7A55] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => alert('Switched to LexBasic')}
            className="mt-6 w-full rounded-lg bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Select LexBasic
          </button>
        </div>

        {/* Plan 3: LexPlus (Active) */}
        <div className="rounded-2xl border-2 border-[#0B1F3A] bg-white p-6 shadow-lg flex flex-col justify-between relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0B1F3A] px-3 py-0.5 text-[10px] font-bold text-[#C9A84C]">
            ACTIVE PLAN
          </span>
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A]">{SUBSCRIPTION_PLANS.LEX_PLUS.name}</h3>
            <p className="text-xs text-slate-500 mt-1">Covers 4 family members with priority</p>
            <p className="text-2xl font-extrabold text-[#0B1F3A] mt-4">
              {formatINR(SUBSCRIPTION_PLANS.LEX_PLUS.priceINR)}
              <span className="text-xs font-normal text-slate-500"> / month</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              {SUBSCRIPTION_PLANS.LEX_PLUS.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#0D7A55] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 rounded-lg bg-emerald-50 py-2 text-center text-xs font-semibold text-[#0D7A55] border border-emerald-200">
            Currently Active
          </div>
        </div>
      </div>
    </div>
  )
}
