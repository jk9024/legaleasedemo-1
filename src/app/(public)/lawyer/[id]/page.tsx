'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  PhoneCall,
  Calendar,
  ArrowRight,
  BookOpen,
  Award,
  Scale,
  Languages,
  MessageSquare,
  ThumbsUp,
  Share2,
  AlertCircle,
  X,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'

interface ReviewItem {
  id: string
  rating: number
  reviewText?: string
  comment?: string
  clientName: string
  clientCity?: string
  createdAt: string
  isVerifiedBooking: boolean
}

interface LawyerProfileData {
  id: string
  name: string
  image?: string | null
  court: string
  barCouncilId: string
  enrollmentYear?: number
  specializations: string[]
  experienceYears: number
  education?: string
  hourlyFee: number
  perMinuteFee: number
  pricingModel?: string
  minimumMinutes?: number
  emergencyFee?: number
  consultationTypes?: string[]
  city: string
  state: string
  address?: string
  languages: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isOnline: boolean
  isEmergencyAvailable: boolean
  successRate?: number
  responseTime?: number
  totalConsultations?: number
  bio: string
  availableDays?: string[]
  reviews?: ReviewItem[]
}

export default function LawyerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const lawyerId = (params?.id as string) || 'lawyer-priya-001'

  const [lawyer, setLawyer] = useState<LawyerProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<'30min' | '60min'>('30min')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [reviewMessage, setReviewMessage] = useState('')

  // Generate next 5 calendar dates for slot preview
  const upcomingDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    }
  })

  useEffect(() => {
    if (!selectedDate && upcomingDates[0]) {
      setSelectedDate(upcomingDates[0].dateStr)
    }
  }, [upcomingDates])

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/lawyers/${lawyerId}`)
        const json = await res.json()
        if (json.success && json.data && isMounted) {
          setLawyer(json.data)
        }
      } catch (err) {
        console.error('Failed to load lawyer profile:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadProfile()
    return () => {
      isMounted = false
    }
  }, [lawyerId])

  // Handle Review submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmittingReview(true)
    setReviewMessage('')

    try {
      const res = await fetch(`/api/lawyers/${lawyerId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newRating,
          comment: newComment,
        }),
      })

      const json = await res.json()
      if (json.success) {
        setReviewMessage('Thank you! Your verified review has been published.')
        // Optimistically append review
        if (lawyer) {
          const addedReview: ReviewItem = {
            id: `rev-${Date.now()}`,
            rating: newRating,
            reviewText: newComment,
            clientName: 'You (Verified Client)',
            createdAt: new Date().toISOString(),
            isVerifiedBooking: true,
          }
          setLawyer({
            ...lawyer,
            reviewCount: lawyer.reviewCount + 1,
            reviews: [addedReview, ...(lawyer.reviews || [])],
          })
        }
        setTimeout(() => {
          setIsReviewModalOpen(false)
          setNewComment('')
          setReviewMessage('')
        }, 1500)
      } else {
        setReviewMessage(json.error || 'Failed to submit review.')
      }
    } catch {
      setReviewMessage('Failed to submit review. Please try again.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-pulse space-y-8">
          <div className="h-64 rounded-3xl bg-slate-200" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-40 rounded-2xl bg-slate-200" />
              <div className="h-60 rounded-2xl bg-slate-200" />
            </div>
            <div className="h-96 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    )
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <Scale className="h-12 w-12 text-slate-400 mx-auto" />
          <h1 className="font-hero text-xl font-bold text-[#0B1F3A]">Advocate Profile Not Found</h1>
          <p className="text-xs text-slate-500">
            The requested advocate profile could not be located or may have been updated.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1a3a6b]"
          >
            <span>Back to Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  // Schema.org JSON-LD Structured Data for Google SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: lawyer.name,
    image: lawyer.image,
    telephone: '+91-40-7128-4000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: lawyer.address || 'High Court of Telangana Complex',
      addressLocality: lawyer.city,
      addressRegion: lawyer.state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.3616',
      longitude: '78.4747',
    },
    priceRange: `₹${lawyer.hourlyFee} - ₹${lawyer.hourlyFee * 2}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: lawyer.rating,
      reviewCount: lawyer.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    alumniOf: lawyer.education,
    knowsLanguage: lawyer.languages,
    knowsAbout: lawyer.specializations,
  }

  // Consultation price calculation (at start: 30 mins or 1 hour; extension available later)
  const getSelectedPrice = () => {
    if (!lawyer) return 330
    const rate = lawyer.perMinuteFee || Math.round(lawyer.hourlyFee / 60) || 11
    if (selectedType === '60min') return rate * 60
    return rate * 30
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Hero Header Section */}
      <div className="bg-[#0B1F3A] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/search" className="hover:text-white transition">
              Advocates
            </Link>
            <span>/</span>
            <span className="text-slate-200">{lawyer.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img
                  src={
                    lawyer.image ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                  }
                  alt={lawyer.name}
                  className="h-28 w-28 rounded-2xl object-cover ring-4 ring-white/10 shadow-xl"
                />
                {lawyer.isEmergencyAvailable && (
                  <span
                    title="24/7 Emergency Consultation Active"
                    className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-md ring-2 ring-[#0B1F3A]"
                  >
                    <PhoneCall className="h-3 w-3" />
                    <span>24/7 Hotline</span>
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-hero text-2xl sm:text-3xl font-extrabold text-white">
                    {lawyer.name}
                  </h1>
                  {lawyer.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0D7A55]/20 text-[#0D7A55] border border-[#0D7A55]/40 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Bar Council Verified</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
                  <Scale className="h-4 w-4 text-[#C9A84C]" />
                  <span>{lawyer.court}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">BCI Reg: {lawyer.barCouncilId}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white text-sm">{lawyer.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({lawyer.reviewCount} client reviews)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{lawyer.experienceYears} Years Standing at Bar</span>
                  </div>
                  {lawyer.successRate && (
                    <>
                      <span>•</span>
                      <span className="text-[#0D7A55] font-semibold">
                        {lawyer.successRate}% Success Rate
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/compare?ids=${lawyer.id}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition border border-white/10"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>Compare</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${lawyer.name} — Advocate Profile`,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Profile link copied to clipboard!')
                  }
                }}
                className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 p-2.5 text-white transition border border-white/10"
                title="Share Profile"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Credentials, Bio, Courts, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* About / Bio Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
                About & Practice Philosophy
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {lawyer.bio}
              </p>

              {/* Education & Admissions */}
              {lawyer.education && (
                <div className="pt-4 border-t border-slate-100 flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-800">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0B1F3A]">Legal Education & Honors</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{lawyer.education}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Specializations & Practice Areas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Areas of Legal Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {lawyer.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-xl bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 px-3.5 py-1.5 text-xs font-semibold text-[#0B1F3A]"
                  >
                    ⚖️ {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Chambers, Jurisdiction & Languages */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>Chamber Office Location</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lawyer.address || `Chamber Near High Court, ${lawyer.city}, ${lawyer.state}`}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <Languages className="h-4 w-4 text-slate-400" />
                  <span>Fluent Consultation Languages</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lawyer.languages.map((l) => (
                    <span
                      key={l}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Reviews Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-hero text-lg font-bold text-[#0B1F3A]">
                    Client Reviews & Testimonials
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified ratings from clients who completed Google Meet consultations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
                >
                  Write Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {lawyer.reviews && lawyer.reviews.length > 0 ? (
                  lawyer.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0B1F3A]">
                            {rev.clientName}
                          </span>
                          {rev.isVerifiedBooking && (
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#0D7A55]">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Verified Consultation</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {rev.reviewText || rev.comment}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Consulted in {new Date(rev.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-6">
                    No reviews yet. Be the first to consult and leave feedback!
                  </p>
                )}
              </div>
            </div>

            {/* Bar Council Rule 36 Disclaimer */}
            <div className="rounded-xl bg-slate-100 p-4 text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">
                ⚖️ Bar Council of India Rule 36 Compliance Notice
              </p>
              <p>
                As per the rules of the Bar Council of India, advocates are not permitted to advertise or solicit work. This profile is intended solely for client informational due diligence and transparent appointment scheduling on LegalEase.
              </p>
            </div>
          </div>

          {/* Right Column (1 Col): Interactive Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Consultation Package
                  </span>
                  <span className="text-xs font-bold text-[#0D7A55]">
                    Rs.{lawyer.perMinuteFee || Math.round(lawyer.hourlyFee / 60) || 11}/min{' '}
                    <span className="text-[10px] font-normal text-slate-500">
                      ({formatINR(lawyer.hourlyFee || (lawyer.perMinuteFee || 11) * 60)}/hr)
                    </span>
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedType('30min')}
                    className={`rounded-xl p-3 text-center transition border relative ${
                      selectedType === '30min'
                        ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-md ring-2 ring-[#C9A84C]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded bg-[#C9A84C] px-2 py-0.5 text-[8px] font-extrabold text-[#0B1F3A]">
                      POPULAR
                    </span>
                    <p className="text-xs font-bold">30 Mins</p>
                    <p className={`text-xs mt-1 font-extrabold ${selectedType === '30min' ? 'text-[#C9A84C]' : 'text-[#0D7A55]'}`}>
                      {formatINR((lawyer.perMinuteFee || Math.round(lawyer.hourlyFee / 60) || 11) * 30)}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('60min')}
                    className={`rounded-xl p-3 text-center transition border relative ${
                      selectedType === '60min'
                        ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-md ring-2 ring-[#C9A84C]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded bg-emerald-600 px-2 py-0.5 text-[8px] font-extrabold text-white">
                      BEST VALUE
                    </span>
                    <p className="text-xs font-bold">1 Hour</p>
                    <p className={`text-xs mt-1 font-extrabold ${selectedType === '60min' ? 'text-[#C9A84C]' : 'text-[#0D7A55]'}`}>
                      {formatINR((lawyer.perMinuteFee || Math.round(lawyer.hourlyFee / 60) || 11) * 60)}
                    </p>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  ⏱️ Need more time? Live in-call extensions (+15, +30, +45, +60 min) available later.
                </p>
              </div>

              {/* Features included */}
              <div className="rounded-xl bg-slate-50 p-3.5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#0B1F3A]" />
                  <span>Google Meet 1080p Encrypted Video Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#0D7A55]" />
                  <span>100% Escrow Protected — 48h dispute window</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>AI Structured Legal Consultation Summary</span>
                </div>
              </div>

              {/* Slot Date Picker */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Consultation Date
                </span>
                <div className="mt-2 grid grid-cols-5 gap-1.5">
                  {upcomingDates.map((d) => {
                    const isSelected = selectedDate === d.dateStr
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`rounded-xl p-2 text-center transition border ${
                          isSelected
                            ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#0B1F3A] font-bold'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-[10px] uppercase text-slate-400 font-semibold">{d.dayName}</p>
                        <p className="text-sm font-extrabold">{d.dayNumber}</p>
                        <p className="text-[9px] text-slate-400">{d.month}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots Preview */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Available Slots (IST)
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'].map((slot) => {
                    const isSelected = selectedSlot === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-xl py-2 px-3 text-xs font-semibold transition border ${
                          isSelected
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/book/${lawyer.id}?type=${selectedType}&date=${selectedDate}&slot=${encodeURIComponent(
                    selectedSlot
                  )}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] py-3.5 px-4 text-sm font-bold text-white shadow-lg hover:bg-[#1a3a6b] transition active:scale-[0.99]"
                >
                  <span>Book Consultation ({formatINR(getSelectedPrice())})</span>
                  <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
                </Link>
                <p className="mt-2 text-center text-[10px] text-slate-400">
                  Instant confirmation • Google Calendar auto-invite
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
              Write a Verified Review
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rate your legal consultation with {lawyer.name}.
            </p>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Your Feedback / Experience
                </label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about the advocate's advice, punctuality, and clarity..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-[#0B1F3A] focus:outline-none"
                  required
                />
              </div>

              {reviewMessage && (
                <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg">
                  {reviewMessage}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="rounded-xl bg-[#0B1F3A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] disabled:opacity-50"
                >
                  {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
