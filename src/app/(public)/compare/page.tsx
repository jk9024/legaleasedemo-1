'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Scale,
  Plus,
  ArrowRight,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  PhoneCall,
  X,
  Search,
  Loader2,
} from 'lucide-react'
import { LawyerData } from '@/components/lawyers/LawyerCard'
import { LawyerCompareTool } from '@/components/lawyers/LawyerCompareTool'

function CompareContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [allLawyers, setAllLawyers] = useState<LawyerData[]>([])
  const [comparedLawyers, setComparedLawyers] = useState<LawyerData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // 1. Fetch available lawyers
  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/lawyers')
        const json = await res.json()
        if (json.success && json.data?.lawyers && isMounted) {
          const list: LawyerData[] = json.data.lawyers
          setAllLawyers(list)

          // Read ids from URL params: ?ids=id1,id2,id3
          const rawIds = searchParams.get('ids')
          if (rawIds) {
            const idList = rawIds.split(',').map((id) => id.trim())
            const matched = list.filter(
              (l) => idList.includes(l.id) || idList.includes(l.barCouncilId || '')
            )
            setComparedLawyers(matched.length > 0 ? matched : list.slice(0, 2))
          } else {
            // Default: pick top 2 advocates
            setComparedLawyers(list.slice(0, 2))
          }
        }
      } catch (err) {
        console.error('Failed to load lawyers for comparison:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [searchParams])

  // Remove lawyer from comparison
  const handleRemove = (id: string) => {
    setComparedLawyers((prev) => {
      const updated = prev.filter((l) => l.id !== id)
      // Update URL
      const newIds = updated.map((l) => l.id).join(',')
      router.replace(newIds ? `/compare?ids=${newIds}` : '/compare')
      return updated
    })
  }

  // Add lawyer to comparison
  const handleAdd = (lawyer: LawyerData) => {
    if (comparedLawyers.length >= 3) {
      alert('You can compare a maximum of 3 advocates.')
      return
    }
    if (comparedLawyers.some((l) => l.id === lawyer.id)) {
      alert('This advocate is already in your comparison table.')
      return
    }

    const updated = [...comparedLawyers, lawyer]
    setComparedLawyers(updated)
    const newIds = updated.map((l) => l.id).join(',')
    router.replace(`/compare?ids=${newIds}`)
    setIsAddModalOpen(false)
  }

  // Filter available lawyers for modal
  const selectableLawyers = allLawyers.filter(
    (l) =>
      !comparedLawyers.some((c) => c.id === l.id) &&
      (l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-[#0B1F3A]">
                Home
              </Link>
              <span>/</span>
              <Link href="/search" className="hover:text-[#0B1F3A]">
                Advocates
              </Link>
              <span>/</span>
              <span className="text-[#0B1F3A] font-semibold">Compare</span>
            </div>
            <h1 className="font-hero text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Compare Legal Advocates Side-by-Side
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Analyze fees, court jurisdictions, Bar Council credentials, and client feedback to choose the right advocate for your case.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedLawyers.length < 3 && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1a3a6b] transition shadow-xs"
              >
                <Plus className="h-4 w-4 text-[#C9A84C]" />
                <span>Add Advocate ({comparedLawyers.length}/3)</span>
              </button>
            )}

            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <span>Directory</span>
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 animate-pulse space-y-4">
            <div className="h-10 bg-slate-200 rounded w-1/3" />
            <div className="h-64 bg-slate-100 rounded" />
          </div>
        ) : (
          <LawyerCompareTool lawyers={comparedLawyers} onRemove={handleRemove} />
        )}

        {/* Add Lawyer Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Select an Advocate to Compare
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Choose an advocate from the verified directory to add to your side-by-side comparison table.
              </p>

              {/* Search filter in modal */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, court, or legal specialty..."
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>

              {/* Advocates list */}
              <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
                {selectableLawyers.length > 0 ? (
                  selectableLawyers.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            lawyer.image ||
                            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                          }
                          alt={lawyer.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#0B1F3A]">{lawyer.name}</p>
                          <p className="text-[11px] text-slate-500">{lawyer.court}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(lawyer)}
                        className="rounded-lg bg-[#0B1F3A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1a3a6b]"
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No additional advocates found.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="h-8 w-8 animate-spin text-[#0B1F3A]" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  )
}
