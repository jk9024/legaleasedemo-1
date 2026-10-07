'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  X,
  Copy,
  Check,
  Scale,
} from 'lucide-react'

interface LegalTemplate {
  id: string
  title: string
  category: string
  description: string
  format: string
  isFree: boolean
  downloads: number
  statute: string
  previewText: string
}

const TEMPLATES: LegalTemplate[] = [
  {
    id: 't-rent',
    title: '11-Month Residential Rental / Lease Agreement',
    category: 'Property Law',
    description:
      'Standard Telangana & Pan-India compliant lease agreement with mutual lock-in period, maintenance clause, and security deposit return covenants.',
    format: 'Word & PDF',
    isFree: true,
    downloads: 1420,
    statute: 'Transfer of Property Act, 1882 & Indian Registration Act',
    previewText: `RENTAL AGREEMENT

This RENTAL AGREEMENT is executed on this _____ day of ____________, 2025 at Hyderabad.

BETWEEN:
[Landlord Name], S/o [Father Name], residing at [Address] (hereinafter called the "LESSOR").
AND
[Tenant Name], S/o [Father Name], residing at [Address] (hereinafter called the "LESSEE").

WHEREAS the Lessor is the absolute owner of the residential premises situated at [Flat No, Building, Area, Hyderabad - PIN].

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
1. TENANCY PERIOD: The lease shall be for a duration of 11 (Eleven) months commencing from [Start Date] to [End Date].
2. MONTHLY RENT: The Lessee agrees to pay a monthly rent of Rs. _________/- (Rupees ____________________ only) on or before the 5th day of every English calendar month.
3. SECURITY DEPOSIT: The Lessee has paid an interest-free refundable security deposit of Rs. _________/- via Bank Transfer. The deposit shall be refunded upon vacating after adjusting arrears or damages.
4. NOTICE PERIOD: Either party may terminate this agreement by providing 1 (One) month prior written notice.

IN WITNESS WHEREOF the parties have set their signatures on the day, month and year first above written.

LESSOR: ____________________
LESSEE: ____________________`,
  },
  {
    id: 't-cheque',
    title: 'Statutory Demand Notice under Section 138 NI Act',
    category: 'Criminal & Financial Defense',
    description:
      'Mandatory formal legal notice dispatched to drawer after cheque bounce. Strictly adheres to the 30-day timeline requirement under Section 138.',
    format: 'Word & PDF',
    isFree: true,
    downloads: 890,
    statute: 'Negotiable Instruments Act, 1881 (Sections 138 & 142)',
    previewText: `REGISTERED A.D. / SPEED POST / LEGAL NOTICE

Date: ______________

To,
[Name of Accused / Drawer]
[Address of Accused]

Subject: STATUTORY LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881.

Sir/Madam,

Under instructions and on behalf of my client [Client Name], residing at [Address], I hereby serve upon you the following statutory notice:

1. That you approached my client for [discharge of legally enforceable debt/commercial transaction] and issued Cheque No. _________ dated _________ for an amount of Rs. _________/- drawn on [Bank Name, Branch].
2. That my client presented the said cheque for encashment, but the same was dishonoured and returned unpaid by your bank with remarks "FUNDS INSUFFICIENT" vide Cheque Return Memo dated _________.
3. That by dishonouring the said cheque, you have committed an offence punishable under Section 138 of the Negotiable Instruments Act, 1881.

I, THEREFORE, CALL UPON YOU to pay the cheque amount of Rs. _________/- within 15 (FIFTEEN) DAYS of receipt of this notice, failing which my client shall be constrained to initiate criminal proceedings against you under Section 138 and 142 of the Negotiable Instruments Act.

ADVOCATE FOR CLIENT:
[Advocate Signature & Seal]`,
  },
  {
    id: 't-divorce',
    title: 'Mutual Consent Divorce Petition (Section 13B)',
    category: 'Family & Matrimonial Law',
    description:
      'Joint petition format for first motion mutual dissolution of marriage with alimony settlement, asset division, and child custody schedule.',
    format: 'Word & PDF',
    isFree: true,
    downloads: 512,
    statute: 'Hindu Marriage Act, 1955 (Section 13B)',
    previewText: `IN THE FAMILY COURT AT HYDERABAD
O.P. NO. _________ OF 2025

IN THE MATTER OF:
[Petitioner 1 / Husband Name]  ... PETITIONER NO. 1
AND
[Petitioner 2 / Wife Name]     ... PETITIONER NO. 2

JOINT PETITION FOR DISSOLUTION OF MARRIAGE BY MUTUAL CONSENT UNDER SECTION 13B(1) OF THE HINDU MARRIAGE ACT, 1955.

THE PETITIONERS ABOVE NAMED RESPECTFULLY SUBMIT AS FOLLOWS:
1. That the marriage between the Petitioners was solemnized on [Marriage Date] at [Venue] according to Hindu rites and customs.
2. That the Petitioners have been living separately for a period of more than one year, since [Separation Date].
3. That the Petitioners have mutually agreed that their marriage be dissolved as they cannot live together despite mediation.
4. SETTLEMENT TERMS:
   (a) Permanent Alimony of Rs. _________ has been fully settled.
   (b) Child custody of minor child [Child Name] shall remain with [Parent Name] with visitation rights on weekends.
   (c) Neither party shall make further claims against each other.

PRAYER:
Wherefore, Petitioners pray that this Hon'ble Court may be pleased to dissolve the marriage between the Petitioners by a decree of divorce by mutual consent.`,
  },
  {
    id: 't-consumer',
    title: 'Consumer Forum Complaint for Delayed Builder Possession',
    category: 'Consumer Rights',
    description:
      'Format for filing complaint before District Consumer Disputes Redressal Commission for delayed apartment possession and interest compensation.',
    format: 'Word & PDF',
    isFree: true,
    downloads: 730,
    statute: 'Consumer Protection Act, 2019 (Section 35)',
    previewText: `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, HYDERABAD
CONSUMER COMPLAINT NO. _________ OF 2025

IN THE MATTER OF:
[Complainant Name]             ... COMPLAINANT
VERSUS
[Builder / Promoter Firm Name] ... OPPOSITE PARTY

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019 FOR DEFICIENCY IN SERVICE AND DELAY IN POSSESSION.

MOST RESPECTFULLY SHOWETH:
1. That the Complainant booked residential Apartment No. _____ in the project "[Project Name]" situated at [Location].
2. That as per the Construction Agreement dated _________, the Opposite Party was obligated to handover physical possession on or before [Agreed Date].
3. That the Opposite Party has failed to deliver possession till date, amounting to gross deficiency of service under Section 2(11) of the Act.

PRAYER:
Direct the Opposite Party to:
(a) Pay delay compensation @ 10% p.a. on the amount deposited from agreed possession date till actual handover.
(b) Pay Rs. 2,00,000/- towards mental agony and litigation costs.`,
  },
]

export default function TemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState<LegalTemplate | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (template: LegalTemplate) => {
    const blob = new Blob([template.previewText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <FileText className="h-3.5 w-3.5" />
            <span>Advocate-Vetted Indian Legal Drafts</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Legal Document Templates & Drafts Library
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Download standard, advocate-drafted legal contracts, statutory notices, and court petitions.
            Completely free for Indian citizens under the LegalEase Access to Justice initiative.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 px-2 py-0.5 text-[10px] font-bold text-[#0B1F3A]">
                    {t.category}
                  </span>
                  <span className="rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 border border-emerald-200">
                    Free Download
                  </span>
                </div>

                <h3 className="font-hero text-base font-bold text-[#0B1F3A] leading-snug">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                <p className="text-[11px] text-slate-400 font-mono">Statute: {t.statute}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTemplate(t)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(t)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
                >
                  <Download className="h-3.5 w-3.5 text-[#C9A84C]" />
                  <span>Download Text</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lawyer Customization Banner */}
        <div className="rounded-2xl bg-[#0B1F3A] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-hero text-lg font-bold text-white">
              Need an Advocate to Customize or Sign This Notice?
            </h3>
            <p className="text-xs text-slate-300">
              A standard draft gives you a foundation, but custom facts require advocate review before dispatch.
            </p>
          </div>

          <Link
            href="/search"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#C9A84C] text-[#0B1F3A] px-5 py-3 text-xs font-bold hover:bg-amber-400 transition"
          >
            <span>Consult Drafting Advocate</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      {activeTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-hero text-base font-bold text-[#0B1F3A]">
                  {activeTemplate.title}
                </h3>
                <p className="text-[11px] text-slate-400">{activeTemplate.statute}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTemplate(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
              <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                {activeTemplate.previewText}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleCopyText(activeTemplate.previewText)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload(activeTemplate)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b]"
              >
                <Download className="h-4 w-4 text-[#C9A84C]" />
                <span>Download Template</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
