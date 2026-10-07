'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  PhoneCall,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Video,
  Scale,
  Lock,
  Phone,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

interface DutyAdvocate {
  id: string
  name: string
  image: string
  specialty: string
  court: string
  experience: number
  phone: string
  emergencyFee: number
  isAvailableNow: boolean
}

const ON_DUTY_ADVOCATES: DutyAdvocate[] = [
  {
    id: 'lawyer-suresh-003',
    name: 'Adv. Suresh Reddy',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    specialty: 'Criminal Defense, Police Custody, Bail & Cyber Extortion',
    court: 'City Criminal Court Nampally & Telangana High Court',
    experience: 16,
    phone: '+919876543203',
    emergencyFee: 999,
    isAvailableNow: true,
  },
  {
    id: 'lawyer-priya-001',
    name: 'Adv. Priya Sharma',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    specialty: 'Urgent Civil Stay Orders, Demolition Threats & Dispossession',
    court: 'Telangana High Court & City Civil Courts',
    experience: 12,
    phone: '+919876543201',
    emergencyFee: 999,
    isAvailableNow: true,
  },
]

export default function EmergencyPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  const citizenRights = [
    {
      q: 'Can police arrest me without a warrant in India?',
      a: 'For cognizable offences, police can arrest without a warrant, but under Section 41A CrPC (now BNSS 35), police MUST issue a notice of appearance if the offence carries less than 7 years imprisonment, unless there is imminent flight risk.',
    },
    {
      q: 'What is the 24-hour rule after arrest?',
      a: 'Under Article 22(2) of the Indian Constitution and Section 57 CrPC (BNSS 58), any arrested citizen must be produced before the nearest Judicial Magistrate within 24 hours of arrest, excluding travel time. Detention beyond 24 hours without magistrate order is illegal.',
    },
    {
      q: 'Do I have the right to call an advocate during police questioning?',
      a: 'YES. Under Section 41D CrPC (BNSS 38) and Article 22(1), you have the fundamental constitutional right to meet and consult an advocate of your choice during interrogation (though not throughout the entire interrogation).',
    },
    {
      q: 'Can women be arrested after sunset or before sunrise?',
      a: 'Under Section 46(4) CrPC (BNSS 43(5)), no woman can be arrested after sunset and before sunrise except in extraordinary circumstances with prior written permission of a Judicial Magistrate, and only in the presence of a woman police officer.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Emergency Red Hero Banner */}
      <section className="bg-gradient-to-b from-[#DC2626] to-[#991B1B] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-bold text-white backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-white animate-ping" />
            <span>24/7 Pan-India Emergency Legal Response • 3 Min SLA</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Urgent Police Detention, Bail or Demolition Threat?
          </h1>

          <p className="text-base sm:text-lg text-red-100 max-w-2xl leading-relaxed">
            Connect directly with verified on-duty Telangana High Court & Criminal trial advocates right now.
            Instant encrypted phone / video consultation with zero waiting.
          </p>

          {/* Quick Direct Hotline CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="tel:+919876543203"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-red-700 shadow-2xl hover:bg-red-50 transition active:scale-95"
            >
              <PhoneCall className="h-5 w-5 animate-bounce" />
              <span>Direct Emergency Helpline: +91 98765 43203</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-red-200">
              <Clock className="h-4 w-4" />
              <span>Advocate connects in &lt; 3 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* On-Duty Advocates Card List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A]">
                On-Duty Emergency Advocates (Active Right Now)
              </h2>
              <p className="text-xs text-slate-500">
                Verified Bar Council advocates available for immediate midnight or emergency consultation.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#0D7A55] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>2 Advocates Online</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ON_DUTY_ADVOCATES.map((lawyer) => (
              <div
                key={lawyer.id}
                className="rounded-3xl border-2 border-red-100 bg-white p-6 shadow-sm hover:shadow-lg transition space-y-4 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="h-16 w-16 rounded-2xl object-cover ring-2 ring-red-500"
                    />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div>
                    <h3 className="font-hero text-base font-bold text-[#0B1F3A]">
                      {lawyer.name}
                    </h3>
                    <p className="text-xs text-slate-500">{lawyer.court}</p>
                    <p className="text-[11px] font-semibold text-slate-700 mt-1">
                      {lawyer.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Fixed Emergency Fee</p>
                    <p className="font-extrabold text-sm text-[#0B1F3A]">
                      {formatINR(lawyer.emergencyFee)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition"
                      title="Direct Phone Call"
                    >
                      <Phone className="h-4 w-4" />
                    </a>

                    <Link
                      href={`/book/${lawyer.id}?type=emergency`}
                      className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition shadow-xs"
                    >
                      <span>Instant Booking</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Citizen Arrest Rights Guide */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-700">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Citizen Arrest & Detention Rights in India (BNSS / CrPC)
              </h2>
              <p className="text-xs text-slate-500">
                Know your fundamental constitutional safeguards during police encounters or unexpected summons.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {citizenRights.map((item, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-[#0B1F3A] hover:text-red-700 transition"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1">
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
