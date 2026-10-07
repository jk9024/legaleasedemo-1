'use client'

import React, { useState } from 'react'
import { Share2, Copy, Check, Users, IndianRupee } from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

export default function LawyerReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'PRIYA2012'
  const referralUrl = `https://legalease.in/register?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Advocate Referral Program</h1>
        <p className="text-xs text-slate-500 mt-1">
          Invite fellow advocates and law graduates. Earn 5% recurring platform commission on their first 10 consultations.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#0B1F3A] p-6 sm:p-8 text-white shadow-md">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">Your Advocate Referral Link</h2>
        <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="w-full rounded-xl bg-white/10 px-4 py-2.5 text-xs text-white border border-white/20 font-mono"
          />
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-xs font-bold text-[#0B1F3A] hover:bg-[#d8b85c] transition shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy Referral Link'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Lawyers Referred</span>
          <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">4 Advocates</p>
          <p className="text-[11px] text-[#0D7A55]">3 Active and taking consultations</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Commission Earned</span>
          <p className="mt-2 text-2xl font-bold text-[#0D7A55]">{formatINR(4250)}</p>
          <p className="text-[11px] text-slate-500">Credited to monthly payout balance</p>
        </div>
      </div>
    </div>
  )
}
