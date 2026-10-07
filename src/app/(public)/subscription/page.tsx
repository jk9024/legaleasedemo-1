'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Check,
  Zap,
  Building,
  Users,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

interface PlanTier {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  isPopular?: boolean
  features: string[]
  buttonText: string
  buttonVariant: 'outline' | 'primary' | 'gold'
}

const PLANS: PlanTier[] = [
  {
    id: 'FREE',
    name: 'Citizen Basic',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Essential access for occasional legal consultations and standard advice.',
    buttonText: 'Current Free Plan',
    buttonVariant: 'outline',
    features: [
      'Standard advocate marketplace search',
      'Pay-per-minute & hourly consultations',
      'Swiggy-style 7-stage case tracking',
      'Google Meet 1080p encrypted video room',
      'PWA offline legal document vault',
    ],
  },
  {
    id: 'LEGAL_SHIELD',
    name: 'Legal Shield',
    monthlyPrice: 499,
    annualPrice: 4999,
    description: 'Complete legal protection and consultation savings for individuals.',
    isPopular: true,
    buttonText: 'Upgrade to Shield',
    buttonVariant: 'primary',
    features: [
      '20% Flat Discount on all lawyer consultations',
      '2 Free AI Document Audits & Risk Scans per month',
      'Priority Advocate Response within 15 mins',
      '24/7 Midnight Emergency Hotline access',
      'AI Structured Consultation Summaries saved forever',
      'Encrypted Document Vault (10GB Cloud Storage)',
    ],
  },
  {
    id: 'FAMILY',
    name: 'Family Shield',
    monthlyPrice: 999,
    annualPrice: 9999,
    description: 'Comprehensive family legal security covering parents, spouse, and children.',
    buttonText: 'Get Family Shield',
    buttonVariant: 'gold',
    features: [
      'Coverage for up to 4 Family Members',
      '1 Complimentary 30-min Video Consultation/year',
      '20% Flat Discount across all family bookings',
      '5 Free AI Document Audits per month',
      'Property Link Document due diligence discount (30%)',
      'Dedicated Family Legal Concierge',
    ],
  },
  {
    id: 'BUSINESS',
    name: 'Business Shield',
    monthlyPrice: 2499,
    annualPrice: 24999,
    description: 'Designed for Hyderabad startups, founders, and MSMEs for continuous counsel.',
    buttonText: 'Protect My Business',
    buttonVariant: 'primary',
    features: [
      'Dedicated Corporate Advocate Advisory',
      'Unlimited Commercial Contract & NDA Audits',
      'Trademark & IP Filing advisory (flat fee)',
      'Employment & Non-Compete agreements vetting',
      'Statutory Legal Notice drafting assistance',
      'Priority GST tax invoicing & B2B compliance',
    ],
  },
]

export default function SubscriptionPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null)

  const handleSubscribe = (planId: string) => {
    if (planId === 'FREE') return
    setSubscribedPlan(planId)
    alert(`Upgraded to ${planId}! 20% consultation discount is now active across your account.`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <ShieldCheck className="h-4 w-4" />
            <span>Legal Shield Membership • 20% Flat Consultation Discount</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Legal Protection for Every Indian
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose a plan that gives you instant consultation discounts, AI document audits,
            and 24/7 priority emergency access across Telangana and pan-India.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-xl px-4 py-2 font-bold transition ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0B1F3A] shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`rounded-xl px-4 py-2 font-bold transition flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#0B1F3A] shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-[#0D7A55] text-white px-2 py-0.5 text-[10px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const price =
              billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)
            const isSubscribed = subscribedPlan === plan.id

            return (
              <div
                key={plan.id}
                className={`rounded-3xl border bg-white p-6 shadow-sm flex flex-col justify-between transition hover:shadow-xl relative ${
                  plan.isPopular
                    ? 'border-[#C9A84C] ring-2 ring-[#C9A84C]/40'
                    : 'border-slate-200'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A84C] px-3.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F3A] shadow-xs">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                  </div>

                  <div className="pt-2 pb-1 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="font-hero text-3xl font-extrabold text-[#0B1F3A]">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    {billingCycle === 'annual' && plan.annualPrice > 0 && (
                      <p className="text-[10px] text-[#0D7A55] font-semibold mt-0.5">
                        Billed annually ({formatINR(plan.annualPrice)}/yr)
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#0D7A55] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    disabled={isSubscribed || plan.id === 'FREE'}
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full rounded-xl py-3 text-xs font-bold transition shadow-xs ${
                      isSubscribed
                        ? 'bg-[#0D7A55] text-white cursor-default'
                        : plan.buttonVariant === 'primary'
                        ? 'bg-[#0B1F3A] text-white hover:bg-[#1a3a6b]'
                        : plan.buttonVariant === 'gold'
                        ? 'bg-[#C9A84C] text-[#0B1F3A] hover:bg-amber-400'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isSubscribed ? 'Active Plan' : plan.buttonText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 rounded-3xl bg-slate-900 text-white p-8 max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C]/20 text-[#C9A84C]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-hero text-base font-bold text-white">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                If you are not 100% satisfied with your advocate consultations, cancel anytime without lock-in.
              </p>
            </div>
          </div>

          <Link
            href="/search"
            className="shrink-0 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs font-bold text-white transition text-center"
          >
            Explore Advocates Directory
          </Link>
        </div>
      </div>
    </div>
  )
}
