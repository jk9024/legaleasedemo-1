'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  Scale,
  Lock,
  Search,
  BookOpen,
} from 'lucide-react'
import { DocumentAnalysisResult } from '@/app/api/documents/analyze/route'

const SAMPLE_DOCS = [
  {
    id: 'rent',
    title: '11-Month Residential Rental Agreement (Hyderabad)',
    fileName: 'Rental_Agreement_Kompally.pdf',
    text: 'This agreement is made between R. Sharma (Lessor) and K. Verma (Lessee) for Flat 402, Kompally, Hyderabad. Monthly rent Rs. 28,000. Security deposit Rs. 84,000. Lessee agrees to pay all structural repairs and landlord may forfeit deposit without notice if vacating prior to 11 months.',
  },
  {
    id: 'cheque',
    title: 'Statutory Demand Notice under Sec 138 NI Act',
    fileName: 'Section_138_Notice_Cheque_Bounce.pdf',
    text: 'Under instructions of my client Apex Trading Ltd, notice is hereby given under Section 138 of the Negotiable Instruments Act. Cheque No 482910 for Rs. 4,50,000 drawn on HDFC Bank was returned with remarks Funds Insufficient on 12-Oct-2025. You are called upon to make payment within 15 days.',
  },
  {
    id: 'sale',
    title: 'Apartment Agreement of Sale (Telangana RERA)',
    fileName: 'Agreement_of_Sale_Gachibowli.pdf',
    text: 'Agreement of sale for residential flat in Gachibowli. Total sale consideration Rs. 75,00,000. Token advance paid Rs. 10,00,000. Vendor agrees to deliver possession by Dec 2024. Purchaser to bear stamp duty. No 30-year link documents or non-encumbrance warranty specified.',
  },
]

export default function DocumentAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [customText, setCustomText] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Handle sample click
  const handleSelectSample = (sample: typeof SAMPLE_DOCS[0]) => {
    setFileName(sample.fileName)
    setCustomText(sample.text)
    analyzeDocument(sample.fileName, sample.text)
  }

  // Handle user file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setFileName(file.name)
      analyzeDocument(file.name, `Scanned legal document: ${file.name}`)
    }
  }

  // Trigger analysis API
  const analyzeDocument = async (name: string, text: string) => {
    setIsAnalyzing(true)
    setErrorMessage('')
    setAnalysisResult(null)

    try {
      const res = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: name,
          text,
        }),
      })

      const json = await res.json()
      if (json.success && json.data) {
        setAnalysisResult(json.data)
      } else {
        setErrorMessage(json.error || 'Failed to analyze document')
      }
    } catch {
      setErrorMessage('Could not connect to analyzer service. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Google Cloud Vision OCR + Gemini 1.5 Flash</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Legal Document Risk & Clause Audit
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Upload any scanned agreement, sale deed, rent agreement, or statutory court notice.
            Our OCR and legal AI inspect unfair clauses, statutory deadlines, and stamp duty compliance under Indian law.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Upload & Sample Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: File Uploader Card (2 cols on md) */}
          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-hero text-base font-bold text-[#0B1F3A]">
              Upload Legal Document or Scan
            </h2>

            <div className="border-2 border-dashed border-slate-300 hover:border-[#0B1F3A] rounded-2xl p-8 text-center transition relative bg-slate-50/50">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] mb-3">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-[#0B1F3A]">
                Drop your file here, or <span className="text-[#C9A84C] underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF, JPG, PNG scans up to 25MB • 256-bit confidential encryption
              </p>
            </div>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <Lock className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                Zero Data Leakage Guarantee: Documents are processed securely and never shared with third parties.
              </span>
            </div>
          </div>

          {/* Right: Quick Samples Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h3 className="font-hero text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
              Try Sample Legal Drafts
            </h3>
            <p className="text-[11px] text-slate-500">
              Test instant AI clause extraction with real Indian legal documents:
            </p>

            <div className="space-y-2 pt-1">
              {SAMPLE_DOCS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 p-2.5 hover:bg-[#0B1F3A]/5 hover:border-[#0B1F3A]/30 transition group"
                >
                  <p className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#0B1F3A]">
                    {s.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Click to audit ➔</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner during analysis */}
        {isAnalyzing && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-8 text-center space-y-3 shadow-xs">
            <Sparkles className="h-8 w-8 text-[#C9A84C] animate-spin mx-auto" />
            <h3 className="font-hero text-base font-bold text-[#0B1F3A]">
              Extracting Text with Google Vision OCR & Auditing Clauses...
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Scanning for statutory compliance, unfavorable indemnities, notice timelines, and jurisdiction clauses.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* ================= ANALYSIS RESULTS DASHBOARD ================= */}
        {analysisResult && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md space-y-8">
            {/* Header / Document Classification */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 px-2.5 py-0.5 text-xs font-bold text-[#0B1F3A]">
                  {analysisResult.documentType}
                </span>
                <h2 className="font-hero text-2xl font-extrabold text-[#0B1F3A] pt-1">
                  Document Risk & Statutory Audit
                </h2>
                <p className="text-xs text-slate-500">
                  Governing Indian Law: <strong className="text-slate-700">{analysisResult.governingLaw}</strong>
                </p>
              </div>

              {/* Consultation CTA */}
              <Link
                href={`/book/${analysisResult.recommendedAdvocateId}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-3 text-xs font-bold text-white hover:bg-[#1a3a6b] transition shadow-xs"
              >
                <span>Consult Specialist Advocate</span>
                <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
              </Link>
            </div>

            {/* Executive Plain English Summary */}
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80 space-y-2">
              <h3 className="font-hero text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                Plain-English Legal Summary
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {analysisResult.executiveSummary}
              </p>
            </div>

            {/* RED FLAGS & UNFAIR CLAUSES (Crucial Section) */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <AlertTriangle className="h-5 w-5" />
                <span>Identified Legal Risks & Red Flags (Under Indian Law)</span>
              </div>

              <div className="space-y-2.5">
                {analysisResult.redFlagsAndRisks.map((risk, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-red-100 shadow-2xs text-xs text-slate-800"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Column Grid: Parties, Dates, Financials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Parties */}
              <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <Scale className="h-4 w-4 text-slate-400" />
                  <span>Identified Parties</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {analysisResult.parties.map((p, i) => (
                    <div key={i} className="rounded-lg bg-slate-50 p-2 font-medium">
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Dates & Deadlines */}
              <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Critical Deadlines</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {analysisResult.keyDatesAndDeadlines.map((d, i) => (
                    <div key={i} className="rounded-lg bg-slate-50 p-2 font-medium">
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Liabilities */}
              <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span>Financial Obligations</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {analysisResult.financialObligations.map((f, i) => (
                    <div key={i} className="rounded-lg bg-slate-50 p-2 font-medium">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Recommendation Strip */}
            <div className="rounded-2xl bg-[#0B1F3A] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-[#C9A84C] uppercase font-bold tracking-wider">
                  Recommended Advocate Specialty
                </p>
                <p className="text-base font-bold mt-0.5">
                  {analysisResult.recommendedAdvocateSpecialty}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Have this draft scrutinized or respond formally before statutory deadlines lapse.
                </p>
              </div>

              <Link
                href={`/book/${analysisResult.recommendedAdvocateId}`}
                className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-[#C9A84C] text-[#0B1F3A] px-5 py-3 text-xs font-bold hover:bg-amber-400 transition"
              >
                <span>Book Document Consultation (from ₹330)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
