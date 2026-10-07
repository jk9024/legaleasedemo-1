'use client'

import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, XCircle, Search, ExternalLink } from 'lucide-react'

export default function AdminLawyersPage() {
  const [lawyers, setLawyers] = useState([
    {
      id: 'l-1',
      name: 'Adv. Priya Sharma',
      email: 'priya@legalease.in',
      phone: '+919876543201',
      barCouncilId: 'BAR/TS/2012/001',
      court: 'Telangana High Court',
      experienceYears: 12,
      isVerified: true,
      plan: 'PRO',
    },
    {
      id: 'l-2',
      name: 'Adv. Anjali Kapoor',
      email: 'anjali@legalease.in',
      phone: '+919876543202',
      barCouncilId: 'BAR/TS/2016/042',
      court: 'Hyderabad Family Court',
      experienceYears: 8,
      isVerified: true,
      plan: 'ELITE',
    },
    {
      id: 'l-3',
      name: 'Adv. Suresh Reddy',
      email: 'suresh@legalease.in',
      phone: '+919876543203',
      barCouncilId: 'BAR/TS/2018/089',
      court: 'Hyderabad Labour Court',
      experienceYears: 6,
      isVerified: true,
      plan: 'PRO',
    },
    {
      id: 'l-4',
      name: 'Adv. Fatima Khan',
      email: 'fatima@legalease.in',
      phone: '+919876543204',
      barCouncilId: 'BAR/TS/2019/112',
      court: 'Telangana State Consumer Commission',
      experienceYears: 5,
      isVerified: true,
      plan: 'FREE',
    },
    {
      id: 'l-5',
      name: 'Adv. Kiran Kumar',
      email: 'kiran@legalease.in',
      phone: '+919876543205',
      barCouncilId: 'BAR/TS/2014/055',
      court: 'City Criminal Court, Nampally',
      experienceYears: 10,
      isVerified: true,
      plan: 'PRO',
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-white">Advocate Verification & Directory</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review Bar Council of India IDs, enrollment certificates, and authorize marketplace listing.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Advocate</th>
                <th className="p-4">Bar Council ID</th>
                <th className="p-4">Court Jurisdiction</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {lawyers.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white">{l.name}</td>
                  <td className="p-4 font-mono text-[11px] text-[#C9A84C]">{l.barCouncilId}</td>
                  <td className="p-4">{l.court}</td>
                  <td className="p-4">{l.experienceYears} Years</td>
                  <td className="p-4">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {l.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="h-3 w-3" /> VERIFIED
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Reviewing documents for ${l.name}`)}
                      className="rounded-lg bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-700"
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
