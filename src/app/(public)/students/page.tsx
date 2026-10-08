'use client'

import React from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Star,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

interface StudentData {
  id: string
  name: string
  college: string
  year: string
  specialties: string[]
  ratePerMinute: number
  hourlyFee: number
  rating: number
  reviewCount: number
  image: string
  servicesOffered: string[]
}

const STUDENTS: StudentData[] = [
  {
    id: 'student-rohan-01',
    name: 'Rohan Mehta',
    college: 'NALSAR University of Law, Hyderabad',
    year: '4th Year B.A. LL.B (Hons)',
    specialties: ['Right to Information (RTI)', 'Constitutional Law', 'Property Research'],
    ratePerMinute: 4,
    hourlyFee: 240,
    rating: 4.9,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    servicesOffered: ['RTI Drafting (₹99)', 'High Court Precedent Search (₹199)', 'Legal Article Writing'],
  },
  {
    id: 'student-vikram-02',
    name: 'Vikram Singh',
    college: 'University College of Law, Osmania University',
    year: 'Final Year LL.B',
    specialties: ['Commercial Contract Proofreading', 'Rental Agreements', 'Consumer Disputes'],
    ratePerMinute: 3,
    hourlyFee: 180,
    rating: 4.8,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    servicesOffered: ['Agreement Proofreading (₹149)', 'Notice Draft Review (₹199)', 'Consumer Complaint Format'],
  },
]

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>NALSAR & Osmania University Law Scholars</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Law Student Network — Affordable Legal Research & RTI
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Get RTI applications drafted, contracts proofread, and court precedents researched at a fraction of standard advocate fees.
            Every draft is mentored and supervised.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Micro-services 3 Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-hero text-sm font-bold text-[#0B1F3A]">RTI Application Drafting</h3>
            <p className="text-xs text-slate-500">
              Draft comprehensive RTI queries for municipal, property, and government exam inquiries.
            </p>
            <p className="text-xs font-extrabold text-[#0D7A55]">Starting from ₹99 only</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-hero text-sm font-bold text-[#0B1F3A]">Agreement Proofreading</h3>
            <p className="text-xs text-slate-500">
              Check rental agreements, NDAs, and commercial contracts for typographical and clause errors.
            </p>
            <p className="text-xs font-extrabold text-[#0D7A55]">Starting from ₹149 only</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-hero text-sm font-bold text-[#0B1F3A]">Case Precedent Research</h3>
            <p className="text-xs text-slate-500">
              Extract landmark Supreme Court and High Court judgments supporting your specific legal position.
            </p>
            <p className="text-xs font-extrabold text-[#0D7A55]">Starting from ₹199 only</p>
          </div>
        </div>

        {/* Student Profiles */}
        <div>
          <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
            Verified Law Student Scholars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDENTS.map((student) => (
              <div
                key={student.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-hero text-base font-bold text-[#0B1F3A]">
                          {student.name}
                        </h3>
                        <CheckCircle2 className="h-4 w-4 text-[#0D7A55]" />
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">{student.college}</p>
                      <p className="text-[11px] text-slate-400">{student.year}</p>

                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#0B1F3A]">{student.rating}</span>
                        <span className="text-slate-400">({student.reviewCount} tasks)</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {student.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="mt-3 space-y-1 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <p className="font-semibold text-slate-800">Popular Micro-Services:</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {student.servicesOffered.map((serv, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-emerald-50 text-emerald-800 text-[11px] px-2 py-0.5 font-medium border border-emerald-100"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Per-Minute Rate</p>
                    <p className="font-extrabold text-sm text-[#0B1F3A]">
                      Rs.{student.ratePerMinute}/min{' '}
                      <span className="text-[11px] font-normal text-slate-500">
                        ({formatINR(student.hourlyFee)}/hr)
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/search`}
                    className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
                  >
                    <span>Hire Student Scholar</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C9A84C]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
