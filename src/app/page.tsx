'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  ShieldCheck,
  Video,
  Clock,
  Star,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
  Lock,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'
import { LEGAL_CATEGORIES } from '@/lib/constants'

// Seed preview advocates for immediate instant interaction
const FEATURED_LAWYERS = [
  {
    id: 'priya-sharma',
    name: 'Adv. Priya Sharma',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    court: 'Telangana High Court',
    specialization: 'Property Law & RERA',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 312,
    feePerHour: 660,
    feePerMinute: 11,
    city: 'Hyderabad',
    languages: ['Telugu', 'Hindi', 'English'],
    verified: true,
    emergency: true,
  },
  {
    id: 'anjali-kapoor',
    name: 'Adv. Anjali Kapoor',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80',
    court: 'Hyderabad Family Court',
    specialization: 'Family Law & Custody',
    experienceYears: 8,
    rating: 4.8,
    reviewCount: 245,
    feePerHour: 840,
    feePerMinute: 14,
    city: 'Hyderabad',
    languages: ['Telugu', 'Hindi', 'English', 'Urdu'],
    verified: true,
    emergency: false,
  },
  {
    id: 'suresh-reddy',
    name: 'Adv. Suresh Reddy',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    court: 'Hyderabad Labour Court',
    specialization: 'Employment & Labour Rights',
    experienceYears: 6,
    rating: 4.7,
    reviewCount: 189,
    feePerHour: 540,
    feePerMinute: 9,
    city: 'Hyderabad',
    languages: ['Telugu', 'English'],
    verified: true,
    emergency: true,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#102A4E] to-[#0B1F3A] py-20 text-white">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-semibold text-[#C9A84C] backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Matched Legal Consultations • Over 10,000+ Consultations Delivered</span>
          </div>

          {/* Hero title */}
          <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Clear Legal Counsel, Direct from{' '}
            <span className="text-[#C9A84C]">Verified Advocates</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect via Google Meet in 15 minutes. Transparent fees from {formatINR(149)}, per-minute
            billing, and real-time Swiggy-style case tracking.
          </p>

          {/* AI Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-2xl">
              <Search className="h-6 w-6 ml-3 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe your legal issue in plain words (e.g., 'Tenant not vacating flat in Kompally')..."
                className="w-full bg-transparent px-4 py-3 text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none"
              />
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3a6b] shrink-0"
              >
                <span>AI Search</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Filter Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400">Popular:</span>
              {['Property Encroachment', 'Mutual Divorce', 'Cheque Bounce S.138', 'RERA Delay', 'Wrongful Termination'].map(
                (tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-white/10 px-3 py-1 text-slate-300 transition hover:bg-white/20 hover:text-white"
                  >
                    {tag}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* 4 Trust Highlights */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-8 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9A84C]/20 text-[#C9A84C]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Bar Council Verified</p>
                <p className="text-xs text-slate-400">Enrolled Advocates Only</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D7A55]/20 text-[#0D7A55]">
                <Video className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Google Meet Video</p>
                <p className="text-xs text-slate-400">Instant Encrypted Rooms</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9A84C]/20 text-[#C9A84C]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Per-Minute Billing</p>
                <p className="text-xs text-slate-400">Pay only for time spent</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Escrow Protection</p>
                <p className="text-xs text-slate-400">Released after call completes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Emergency Callout Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shrink-0">
              <PhoneCall className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white mb-1">
                Active 24/7
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Need Immediate Legal Protection?</h2>
              <p className="mt-1 text-sm text-red-100 max-w-xl">
                Arrest threats, sudden police interrogation, or domestic emergencies. Connect with an
                on-call advocate in under 5 minutes.
              </p>
            </div>
          </div>
          <Link
            href="/emergency"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50 shrink-0"
          >
            <span>Connect to Emergency Lawyer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 3. Featured Verified Lawyers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Top Rated Advocates
            </span>
            <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
              Consult High Court & District Practitioners
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B1F3A] hover:text-[#C9A84C] transition"
          >
            View all 50+ advocates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_LAWYERS.map((lawyer) => (
            <div
              key={lawyer.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-slate-300"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-[#0B1F3A] text-base">{lawyer.name}</h3>
                      <CheckCircle2 className="h-4 w-4 text-[#0D7A55]" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{lawyer.court}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#0B1F3A]">{lawyer.rating}</span>
                      <span className="text-slate-400">({lawyer.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">Specialization:</span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">
                      {lawyer.specialization}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{lawyer.city} • {lawyer.experienceYears} Years Exp</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span>Langs: {lawyer.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#0D7A55] font-semibold">
                    From {formatINR(lawyer.feePerMinute * 15)} for 15 min
                  </p>
                  <p className="text-base font-extrabold text-[#0B1F3A]">
                    {formatINR(lawyer.feePerMinute)}
                    <span className="text-xs font-semibold text-slate-600">/min</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    ({formatINR(lawyer.feePerHour)}/hr)
                  </p>
                </div>
                <Link
                  href={`/book/${lawyer.id}`}
                  className="rounded-lg bg-[#0B1F3A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1a3a6b]"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Practice Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
            Legal Expertise
          </span>
          <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
            Browse by Practice Category
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Select a specialized legal field to find matched High Court advocates.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {LEGAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col p-5 rounded-xl border border-slate-200 bg-white hover:border-[#C9A84C] hover:shadow-md transition text-left group"
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <h3 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#C9A84C] transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4.5. Client Subscription Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A55] bg-emerald-50 px-2.5 py-1 rounded-md">
                Subscription Plans
              </span>
              <h2 className="font-hero text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2">
                Predictable Legal Coverage for Everyone
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                From basic personal coverage to comprehensive business protection.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D7A55] hover:underline"
            >
              <span>View all plans & features</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LexBasic - Rs.199 */}
            <div className="rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Individual</span>
                <h3 className="font-hero text-xl font-bold text-[#0B1F3A] mt-1">LexBasic</h3>
                <div className="mt-4 mb-5">
                  <span className="font-hero text-3xl font-extrabold text-[#0B1F3A]">₹199</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>1 free 30-min consultation/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>10% off all bookings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register?plan=LEX_BASIC"
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-[#0B1F3A] text-white hover:bg-[#1a3a6b] transition block"
              >
                Start Free Trial
              </Link>
            </div>

            {/* LexPlus - Rs.399 (Most Popular) */}
            <div className="rounded-2xl border-2 border-[#0D7A55] bg-emerald-50/20 p-6 flex flex-col justify-between shadow-lg relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0D7A55] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold text-[#0D7A55] uppercase tracking-wider">Family (4 Members)</span>
                <h3 className="font-hero text-xl font-bold text-[#0B1F3A] mt-1">LexPlus</h3>
                <div className="mt-4 mb-5">
                  <span className="font-hero text-3xl font-extrabold text-[#0B1F3A]">₹399</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>2 free 30-min consultations/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>20% off all bookings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>4 family members covered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>Document vault 5GB & WhatsApp alerts</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register?plan=LEX_PLUS"
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-[#0D7A55] text-white hover:bg-[#09573c] transition shadow-md block"
              >
                Start Free Trial
              </Link>
            </div>

            {/* LexPro - Rs.999 */}
            <div className="rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Business Pro</span>
                <h3 className="font-hero text-xl font-bold text-[#0B1F3A] mt-1">LexPro</h3>
                <div className="mt-4 mb-5">
                  <span className="font-hero text-3xl font-extrabold text-[#0B1F3A]">₹999</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>4 free 45-min consultations/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>25% off all bookings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>Document drafting included (2/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55] shrink-0" />
                    <span>Dedicated legal manager</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register?plan=LEX_PRO"
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-[#0B1F3A] text-white hover:bg-[#1a3a6b] transition block"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works (4 Steps) */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Transparent & Simple
            </span>
            <h2 className="font-hero text-3xl font-bold text-[#0B1F3A] mt-1">
              How LegalEase Works
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              No chamber waiting, no opaque pricing. Complete legal consultation in 4 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white mb-4">
                1
              </span>
              <h3 className="font-bold text-[#0B1F3A] text-base mb-1">Search or AI Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Describe your issue. Gemini AI matches you with the ideal advocate based on jurisdiction,
                language, and past success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white mb-4">
                2
              </span>
              <h3 className="font-bold text-[#0B1F3A] text-base mb-1">Book & Lock Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick a slot. Pay via UPI/Razorpay. Your funds remain in secure platform escrow until the
                consultation completes satisfactorily.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white mb-4">
                3
              </span>
              <h3 className="font-bold text-[#0B1F3A] text-base mb-1">Meet on Google Meet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join video call directly from phone or browser. Share documents, review agreements, and
                receive formal legal advice.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-white mb-4">
                4
              </span>
              <h3 className="font-bold text-[#0B1F3A] text-base mb-1">Track Case (7 Stages)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an AI consultation summary with statutory citations. Track your notices and court
                filings on a live timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to Consult CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0B1F3A] p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-hero text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get Professional Legal Clarity Today
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Join thousands of Indian individuals, families, and startup founders who resolve disputes
              smoothly on LegalEase.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/search"
                className="rounded-xl bg-[#C9A84C] px-6 py-3.5 text-sm font-bold text-[#0B1F3A] shadow-lg transition hover:bg-[#d8b85c]"
              >
                Find an Advocate Now
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                View Subscription Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
