'use client'

import React, { useState } from 'react'
import {
  FolderLock,
  Upload,
  Search,
  FileText,
  ShieldCheck,
  Download,
  Trash2,
  Share2,
  CheckCircle2,
  Eye,
} from 'lucide-react'

export default function DocumentVaultPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      name: 'Registered Sale Deed (Kompally Plot #42).pdf',
      category: 'Property Law',
      size: '2.4 MB',
      uploadDate: '20 Oct 2025',
      ocrSummary: 'Survey No 142/B, Kompally Village, Medchal-Malkajgiri District, 350 Sq.Yards.',
      isSharedWithLawyer: true,
      lawyerName: 'Adv. Priya Sharma',
    },
    {
      id: 'doc-2',
      name: 'HMDA Layout Sanction Copy & Land Demarcation.pdf',
      category: 'Property Law',
      size: '1.1 MB',
      uploadDate: '20 Oct 2025',
      ocrSummary: 'Approved Layout L.P. No 18/HMDA/2016, 40-feet road boundary verification.',
      isSharedWithLawyer: true,
      lawyerName: 'Adv. Priya Sharma',
    },
    {
      id: 'doc-3',
      name: 'Marriage Certificate & Registration Copy.pdf',
      category: 'Family Law',
      size: '850 KB',
      uploadDate: '15 Oct 2025',
      ocrSummary: 'Marriage solemnized under Special Marriage Act, Registrar of Marriages Hyderabad.',
      isSharedWithLawyer: true,
      lawyerName: 'Adv. Anjali Kapoor',
    },
    {
      id: 'doc-4',
      name: 'RTI Application Draft & Court Fee Receipt.pdf',
      category: 'RTI & Public Law',
      size: '420 KB',
      uploadDate: '10 Oct 2025',
      ocrSummary: 'RTI S.6 filing to GHMC PWD Circle 14 regarding road completion timeline.',
      isSharedWithLawyer: false,
    },
  ])

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.ocrSummary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'ALL' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Document Vault</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[#0D7A55]">
              <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit Encrypted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Securely store legal notices, title deeds, and case evidence. Search across scanned pages via Google Cloud Vision OCR.
          </p>
        </div>

        <button
          onClick={() => alert('Document upload modal opened. Supported formats: PDF, JPG, PNG up to 25MB.')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <Upload className="h-4 w-4 text-[#C9A84C]" />
          <span>Upload Legal Document</span>
        </button>
      </div>

      {/* Search Bar with OCR explanation */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by filename or OCR text inside scanned documents (e.g., 'Survey No', 'Kompally', 'Section 6')..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs text-[#0B1F3A] placeholder-slate-400 focus:border-[#0B1F3A] focus:outline-none shadow-2xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {['ALL', 'Property Law', 'Family Law', 'RTI & Public Law'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1.5 transition ${
              selectedCategory === cat
                ? 'bg-[#0B1F3A] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'All Documents' : cat}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#0B1F3A] shrink-0">
                    <FileText className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#0B1F3A] leading-snug">{doc.name}</h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {doc.category} • {doc.size} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* OCR Extracted Text Preview */}
              <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-100">
                <span className="font-bold text-[#0B1F3A]">OCR Indexed: </span>
                <span className="italic">{doc.ocrSummary}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {doc.isSharedWithLawyer ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0D7A55]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Shared with {doc.lawyerName}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Private to you</span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert(`Downloading ${doc.name}...`)}
                  title="Download File"
                  className="rounded-lg p-1.5 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 transition"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => alert(`Toggled advocate sharing for ${doc.name}`)}
                  title="Share with Advocate"
                  className="rounded-lg p-1.5 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 transition"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
