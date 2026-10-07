'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Video,
  PhoneCall,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CreditCard,
  AlertCircle,
  Upload,
  X,
  ExternalLink,
  Copy,
  Check,
  Loader2,
} from 'lucide-react'
import { calculateFees, FeeBreakdown } from '@/lib/utils/fees'
import { formatINR, formatPhoneNumber } from '@/lib/utils/formatters'
import { LEGAL_CATEGORIES } from '@/lib/constants'

interface LawyerInfo {
  id: string
  name: string
  image?: string | null
  court: string
  barCouncilId: string
  hourlyFee: number
  perMinuteFee: number
  languages: string[]
  isVerified: boolean
  isEmergencyAvailable: boolean
  rating: number
  reviewCount: number
}

interface ConfirmedBookingData {
  bookingId: string
  bookingRef: string
  meetLink: string
  status: string
  scheduledAt: string
  totalFee: number
}

function BookingWizard() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const lawyerId = (params?.lawyerId as string) || 'lawyer-priya-001'

  // URL Query pre-fills
  const prefillType = searchParams.get('type') || '30min'
  const prefillDate = searchParams.get('date') || ''
  const prefillSlot = searchParams.get('slot') || '11:30 AM'

  // 1. Wizard Step (1 to 5)
  const [step, setStep] = useState<number>(1)
  const [lawyer, setLawyer] = useState<LawyerInfo | null>(null)
  const [isLoadingLawyer, setIsLoadingLawyer] = useState(true)

  // Step 1: Mode & Duration
  const [consultType, setConsultType] = useState<'VIDEO' | 'PHONE' | 'INPERSON' | 'EMERGENCY'>('VIDEO')
  const [durationMinutes, setDurationMinutes] = useState<number>(prefillType === '60min' ? 60 : 30)
  const [pricingModel, setPricingModel] = useState<'PER_HOUR' | 'PER_MINUTE'>(
    prefillType === 'perMinute' ? 'PER_MINUTE' : 'PER_HOUR'
  )

  // Step 2: Date & Slot
  const [selectedDate, setSelectedDate] = useState<string>(prefillDate)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(prefillSlot)

  // Step 3: Case Details & Client Info
  const [issueCategory, setIssueCategory] = useState<string>('Property Law')
  const [issueDescription, setIssueDescription] = useState<string>('')
  const [clientName, setClientName] = useState<string>('Rahul Kumar')
  const [clientEmail, setClientEmail] = useState<string>('rahul@test.com')
  const [clientPhone, setClientPhone] = useState<string>('9876543210')
  const [attachedFiles, setAttachedFiles] = useState<string[]>([])
  const [applyShieldDiscount, setApplyShieldDiscount] = useState<boolean>(false)

  // Step 4: Payment state
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const [paymentError, setPaymentError] = useState<string>('')

  // Step 5: Confirmed Booking details
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBookingData | null>(null)
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  // Generate 7 upcoming dates
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    }
  })

  // Set default date if empty
  useEffect(() => {
    if (!selectedDate && availableDates[0]) {
      setSelectedDate(availableDates[0].dateStr)
    }
  }, [availableDates, selectedDate])

  // Load Lawyer Info
  useEffect(() => {
    let isMounted = true

    async function fetchLawyer() {
      setIsLoadingLawyer(true)
      try {
        const res = await fetch(`/api/lawyers/${lawyerId}`)
        const json = await res.json()
        if (json.success && json.data && isMounted) {
          setLawyer(json.data)
        }
      } catch (err) {
        console.error('Failed to load advocate info for booking:', err)
      } finally {
        if (isMounted) setIsLoadingLawyer(false)
      }
    }

    fetchLawyer()
    return () => {
      isMounted = false
    }
  }, [lawyerId])

  // Calculate Fee breakdown
  const calculateBookingFee = (): FeeBreakdown => {
    const hourlyFee = lawyer?.hourlyFee || 599
    const perMinuteFee = lawyer?.perMinuteFee || 12

    let baseFee = hourlyFee
    if (pricingModel === 'PER_MINUTE') {
      baseFee = perMinuteFee * durationMinutes
    } else if (durationMinutes === 30) {
      baseFee = Math.round(hourlyFee * 0.6)
    } else if (durationMinutes === 60) {
      baseFee = hourlyFee
    } else if (consultType === 'EMERGENCY') {
      baseFee = 999
    }

    const plan = applyShieldDiscount ? 'LEGAL_SHIELD' : 'FREE'
    return calculateFees(baseFee, 'lawyer', plan)
  }

  const feeBreakdown = calculateBookingFee()

  // Handle mock file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAttachedFiles((prev) => [...prev, file.name])
    }
  }

  // Handle Payment & Booking submission
  const handleCompletePayment = async () => {
    setIsProcessingPayment(true)
    setPaymentError('')

    try {
      const scheduledDateTime = `${selectedDate}T${selectedTimeSlot.split(' ')[0]}:00Z`

      // 1. Create booking in DB / state
      const createRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lawyerId,
          consultationType: consultType,
          pricingModel,
          scheduledAt: scheduledDateTime,
          durationMinutes,
          clientName,
          clientEmail,
          clientPhone: clientPhone.startsWith('+91') ? clientPhone : `+91${clientPhone}`,
          issueCategory,
          issueDescription: issueDescription || 'General legal advice requested.',
          documentUrls: attachedFiles,
          userPlan: applyShieldDiscount ? 'LEGAL_SHIELD' : 'FREE',
        }),
      })

      const createData = await createRes.json()
      if (!createData.success) {
        throw new Error(createData.error || 'Failed to initialize booking')
      }

      const { bookingId, bookingRef } = createData.data

      // 2. Create Razorpay Order
      const orderRes = await fetch('/api/bookings/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          bookingRef,
          amount: feeBreakdown.total,
        }),
      })

      const orderData = await orderRes.json()
      const orderId = orderData.data?.orderId || `order_${bookingRef}`

      // 3. Verify Payment & Generate Google Meet Room (Escrow Lock)
      const verifyRes = await fetch('/api/bookings/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          bookingRef,
          razorpayOrderId: orderId,
          razorpayPaymentId: `pay_${Date.now()}`,
          razorpaySignature: 'sig_mock_verified_signature_2025',
          clientName,
          clientPhone: clientPhone.startsWith('+91') ? clientPhone : `+91${clientPhone}`,
          clientEmail,
          lawyerName: lawyer?.name || 'Adv. Priya Sharma',
          scheduledAt: scheduledDateTime,
          totalFee: feeBreakdown.total,
        }),
      })

      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Payment signature verification failed')
      }

      // 4. Move to Success Step
      setConfirmedBooking({
        bookingId: verifyData.data.bookingId,
        bookingRef: verifyData.data.bookingRef,
        meetLink: verifyData.data.meetLink,
        status: verifyData.data.status,
        scheduledAt: scheduledDateTime,
        totalFee: feeBreakdown.total,
      })

      setStep(5)
    } catch (err) {
      console.error('Booking payment error:', err)
      setPaymentError(
        err instanceof Error ? err.message : 'Payment could not be completed. Please retry.'
      )
    } finally {
      setIsProcessingPayment(false)
    }
  }

  // Copy Meet Link
  const handleCopyLink = () => {
    if (confirmedBooking?.meetLink) {
      navigator.clipboard.writeText(confirmedBooking.meetLink)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Advocate Strip */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={
                lawyer?.image ||
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
              }
              alt={lawyer?.name || 'Advocate'}
              className="h-14 w-14 rounded-xl object-cover border border-slate-100 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-hero text-base font-bold text-[#0B1F3A]">
                  {lawyer?.name || 'Advocate Consultation'}
                </h2>
                <CheckCircle2 className="h-4 w-4 text-[#0D7A55]" />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lawyer?.court || 'Telangana High Court'} • {lawyer?.barCouncilId || 'BCI Verified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div>
              <p className="text-slate-400 font-medium">Fee</p>
              <p className="font-extrabold text-sm text-[#0B1F3A]">
                {formatINR(feeBreakdown.total)}
              </p>
            </div>
            <Link
              href={`/lawyer/${lawyerId}`}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* 4-Step Apollo Progress Indicator */}
        {step < 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { s: 1, label: 'Mode & Time' },
                { s: 2, label: 'Date & Slot' },
                { s: 3, label: 'Case Facts' },
                { s: 4, label: 'Escrow Pay' },
              ].map((item) => {
                const isActive = step === item.s
                const isPassed = step > item.s
                return (
                  <div key={item.s} className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        isPassed
                          ? 'bg-[#0D7A55] text-white'
                          : isActive
                          ? 'bg-[#0B1F3A] text-[#C9A84C] ring-4 ring-[#0B1F3A]/10'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPassed ? <Check className="h-4 w-4" /> : item.s}
                    </div>
                    <span
                      className={`mt-1.5 text-[11px] font-semibold hidden sm:inline ${
                        isActive ? 'text-[#0B1F3A]' : isPassed ? 'text-[#0D7A55]' : 'text-slate-400'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 1: CONSULTATION MODE & DURATION ================= */}
        {step === 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Step 1: Choose Consultation Mode & Duration
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your preferred consultation channel and scheduled duration.
              </p>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setConsultType('VIDEO')}
                className={`rounded-2xl p-4 text-left transition border ${
                  consultType === 'VIDEO'
                    ? 'border-[#0B1F3A] bg-[#0B1F3A]/5 ring-2 ring-[#0B1F3A]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 text-[#0B1F3A]">
                  <Video className="h-5 w-5 text-[#0B1F3A]" />
                  <span className="font-bold text-sm">Google Meet Video</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  1080p encrypted video room with screen-sharing for document review.
                </p>
                <span className="mt-3 inline-block rounded-md bg-[#0D7A55]/10 px-2 py-0.5 text-[10px] font-bold text-[#0D7A55]">
                  Recommended
                </span>
              </button>

              <button
                type="button"
                onClick={() => setConsultType('PHONE')}
                className={`rounded-2xl p-4 text-left transition border ${
                  consultType === 'PHONE'
                    ? 'border-[#0B1F3A] bg-[#0B1F3A]/5 ring-2 ring-[#0B1F3A]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 text-[#0B1F3A]">
                  <PhoneCall className="h-5 w-5 text-[#0B1F3A]" />
                  <span className="font-bold text-sm">Direct Phone Call</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Direct audio call with the advocate on your verified WhatsApp/mobile.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConsultType('INPERSON')}
                className={`rounded-2xl p-4 text-left transition border ${
                  consultType === 'INPERSON'
                    ? 'border-[#0B1F3A] bg-[#0B1F3A]/5 ring-2 ring-[#0B1F3A]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 text-[#0B1F3A]">
                  <MapPin className="h-5 w-5 text-[#0B1F3A]" />
                  <span className="font-bold text-sm">Chamber Visit</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Face-to-face consultation at the advocate's chamber near High Court.
                </p>
              </button>
            </div>

            {/* Duration & Billing Model */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-[#0B1F3A]">
                Select Duration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDurationMinutes(30)
                    setPricingModel('PER_HOUR')
                  }}
                  className={`rounded-xl p-3 text-left border transition ${
                    durationMinutes === 30 && pricingModel === 'PER_HOUR'
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">30 Minutes Consultation</p>
                  <p className="text-[11px] opacity-80 mt-1">
                    {formatINR(Math.round((lawyer?.hourlyFee || 599) * 0.6))} • Standard Advice
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDurationMinutes(60)
                    setPricingModel('PER_HOUR')
                  }}
                  className={`rounded-xl p-3 text-left border transition ${
                    durationMinutes === 60 && pricingModel === 'PER_HOUR'
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">60 Minutes Deep Dive</p>
                  <p className="text-[11px] opacity-80 mt-1">
                    {formatINR(lawyer?.hourlyFee || 599)} • Complete Case Review
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDurationMinutes(15)
                    setPricingModel('PER_MINUTE')
                  }}
                  className={`rounded-xl p-3 text-left border transition ${
                    pricingModel === 'PER_MINUTE'
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">Per-Minute Billing</p>
                  <p className="text-[11px] opacity-80 mt-1">
                    {formatINR(lawyer?.perMinuteFee || 12)}/min • Pay for exact minutes
                  </p>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
              >
                <span>Select Date & Slot</span>
                <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DATE & TIME SLOT SELECTION ================= */}
        {step === 2 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Step 2: Choose Consultation Date & Time (IST)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your preferred appointment date and time slot from the advocate's live calendar.
              </p>
            </div>

            {/* Date Slider Chips */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-2">
                Consultation Date
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.dateStr
                  return (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`rounded-xl p-2.5 text-center transition border ${
                        isSelected
                          ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#0B1F3A] font-bold ring-2 ring-[#C9A84C]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-[10px] uppercase font-semibold text-slate-400">
                        {d.dayName}
                      </p>
                      <p className="text-base font-extrabold my-0.5">{d.dayNumber}</p>
                      <p className="text-[10px] text-slate-400">{d.month}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#0B1F3A]">
                Available Slots (Indian Standard Time)
              </label>

              {/* Morning Slots */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase mb-2">
                  Morning (10:00 AM – 01:00 PM)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['10:00 AM', '10:45 AM', '11:30 AM', '12:15 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`rounded-xl py-2 px-3 text-xs font-semibold transition border ${
                        selectedTimeSlot === slot
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase mb-2">
                  Afternoon (02:00 PM – 05:00 PM)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`rounded-xl py-2 px-3 text-xs font-semibold transition border ${
                        selectedTimeSlot === slot
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase mb-2">
                  Evening (05:00 PM – 07:30 PM)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`rounded-xl py-2 px-3 text-xs font-semibold transition border ${
                        selectedTimeSlot === slot
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
              >
                <span>Case Facts & Details</span>
                <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CASE DETAILS & DOCUMENT ATTACHMENT ================= */}
        {step === 3 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Step 3: Brief Case Facts & Contact Information
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help the advocate prepare by describing key facts. Protected by legal privilege.
              </p>
            </div>

            {/* Legal Category */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                Legal Practice Area / Issue Category
              </label>
              <select
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-[#0B1F3A]"
              >
                {LEGAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                Summary of the Legal Issue
              </label>
              <textarea
                rows={4}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Mention relevant facts (e.g. Dates of dispute, opposing party details, property survey numbers, or notice received)..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            {/* Client Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B1F3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B1F3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                  WhatsApp Number (+91)
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B1F3A]"
                  required
                />
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                Attach Legal Documents (Optional)
              </label>
              <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">
                  Click or drag files here to upload
                </p>
                <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 25MB</p>
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                        <span>{file}</span>
                      </span>
                      <X
                        className="h-3.5 w-3.5 cursor-pointer text-slate-400 hover:text-red-500"
                        onClick={() =>
                          setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-center gap-2 rounded-xl bg-amber-50/70 border border-amber-200 p-3 text-xs text-amber-900">
              <Lock className="h-4 w-4 shrink-0 text-amber-700" />
              <span>
                <strong>Confidentiality Guaranteed:</strong> Communications are protected under Section 126 of the Indian Evidence Act (Attorney-Client Privilege).
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="flex items-center gap-1.5 rounded-xl bg-[#0B1F3A] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
              >
                <span>Proceed to Escrow Payment</span>
                <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: ITEMISED BILLING & ESCROW PAYMENT ================= */}
        {step === 4 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Step 4: Transparent Fee Breakdown & Escrow Payment
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your payment is held in 100% secure escrow until the consultation is concluded.
              </p>
            </div>

            {/* Booking Summary Strip */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Advocate:</span>
                <span className="font-bold text-[#0B1F3A]">{lawyer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date & Time:</span>
                <span className="font-bold text-[#0B1F3A]">
                  {selectedDate} at {selectedTimeSlot} IST
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mode & Duration:</span>
                <span className="font-bold text-[#0B1F3A]">
                  {consultType} • {durationMinutes} Minutes
                </span>
              </div>
            </div>

            {/* Legal Shield Coupon Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-xs font-bold text-[#0B1F3A]">Legal Shield Membership</p>
                  <p className="text-[11px] text-slate-500">Apply 20% discount on consultation fees</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApplyShieldDiscount(!applyShieldDiscount)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition border ${
                  applyShieldDiscount
                    ? 'bg-[#0D7A55] text-white border-[#0D7A55]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {applyShieldDiscount ? 'Applied (-20%)' : 'Apply'}
              </button>
            </div>

            {/* Itemized Calculation */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Advocate Consultation Fee</span>
                <span>{formatINR(feeBreakdown.lawyerFee + feeBreakdown.discount)}</span>
              </div>

              {feeBreakdown.discount > 0 && (
                <div className="flex justify-between text-[#0D7A55] font-semibold">
                  <span>Legal Shield Member Discount (20%)</span>
                  <span>-{formatINR(feeBreakdown.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Platform Commission ({feeBreakdown.platformPercent}%)</span>
                <span>{formatINR(feeBreakdown.platformFee)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Fixed Service & Infrastructure Charge</span>
                <span>{formatINR(feeBreakdown.serviceCharge)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>18% GST (Tax Invoice Provided)</span>
                <span>{formatINR(feeBreakdown.gst)}</span>
              </div>

              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-[#0B1F3A]">
                <span>Total Amount Payable (Escrow)</span>
                <span className="text-base text-[#0B1F3A]">{formatINR(feeBreakdown.total)}</span>
              </div>
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="rounded-xl bg-[#0D7A55]/10 border border-[#0D7A55]/20 p-3.5 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0D7A55] shrink-0 mt-0.5" />
              <div className="text-xs text-[#0D7A55]">
                <p className="font-bold">100% Escrow Protection Guarantee</p>
                <p className="mt-0.5 text-slate-600 text-[11px] leading-relaxed">
                  Your payment is safely held by LegalEase Escrow until the consultation concludes.
                  Advocates only receive funds 48 hours post-session, giving you a complete satisfaction window.
                </p>
              </div>
            </div>

            {paymentError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{paymentError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleCompletePayment}
                className="flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#1a3a6b] transition shadow-md disabled:opacity-50"
              >
                <CreditCard className="h-4 w-4 text-[#C9A84C]" />
                <span>
                  {isProcessingPayment
                    ? 'Processing Escrow...'
                    : `Pay ${formatINR(feeBreakdown.total)} via Razorpay`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: BOOKING CONFIRMED (SUCCESS STATE) ================= */}
        {step === 5 && confirmedBooking && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0D7A55]/10 text-[#0D7A55]">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-600">
                Ref: {confirmedBooking.bookingRef}
              </span>
              <h2 className="font-hero text-2xl font-extrabold text-[#0B1F3A] pt-2">
                Consultation Confirmed!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your appointment with <strong>{lawyer?.name}</strong> is locked.
                Google Meet credentials and calendar invites have been generated.
              </p>
            </div>

            {/* Meet Launcher Card */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 max-w-lg mx-auto text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <Video className="h-4 w-4 text-[#0B1F3A]" />
                  <span>Google Meet Room</span>
                </div>
                <span className="text-[10px] font-bold text-[#0D7A55] bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  1080p Encrypted
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-xl p-2.5 border border-emerald-100">
                <input
                  type="text"
                  readOnly
                  value={confirmedBooking.meetLink}
                  className="w-full text-xs font-mono text-slate-700 bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                  title="Copy Link"
                >
                  {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <a
                href={confirmedBooking.meetLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] py-2.5 text-xs font-bold text-white hover:bg-[#1a3a6b] transition"
              >
                <span>Join Google Meet Room</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Multi-channel Alert Notice */}
            <div className="max-w-md mx-auto text-xs text-slate-500 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p>
                📲 Confirmation sent via WhatsApp & SMS to <strong>{formatPhoneNumber(clientPhone)}</strong>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Google Calendar invite delivered to <strong>{clientEmail}</strong>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/dashboard/bookings"
                className="rounded-xl bg-[#0B1F3A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1a3a6b] transition shadow-xs"
              >
                View in Client Dashboard
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="h-8 w-8 animate-spin text-[#0B1F3A]" />
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  )
}
