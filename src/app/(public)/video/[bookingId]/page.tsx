'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  MessageSquare,
  FileText,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Send,
  Plus,
  CheckCircle2,
  X,
  Lock,
  Download,
  Star,
} from 'lucide-react'
import { calcExtensionFee, ExtensionFeeResult } from '@/lib/utils/session-extension'
import { formatINR, formatDuration } from '@/lib/utils/formatters'
import { SummaryData } from '@/lib/utils/call-summary'

interface BookingInfo {
  id: string
  bookingRef: string
  consultationType: string
  scheduledAt: string
  durationMinutes: number
  totalFee: number
  meetLink: string
  issueCategory: string
  issueDescription: string
  lawyerName: string
  court?: string
  clientName: string
}

interface ChatMsg {
  id: string
  sender: 'advocate' | 'client'
  text: string
  time: string
}

export default function VideoConsultationRoom() {
  const params = useParams()
  const router = useRouter()
  const bookingId = (params?.bookingId as string) || 'LX-2025-847291'

  // Booking & Session Data
  const [booking, setBooking] = useState<BookingInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Media Controls
  const [isMicOn, setIsMicOn] = useState<boolean>(true)
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true)
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'docs'>('chat')

  // Timer & Extensions
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(30 * 60)
  const [extensionCount, setExtensionCount] = useState<number>(0)
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState<boolean>(false)
  const [extensionSuccess, setExtensionSuccess] = useState<string>('')

  // In-Call Chat
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'advocate',
      text: 'Namaste! Welcome to our confidential consultation. I have reviewed your case notes.',
      time: '11:30 AM',
    },
    {
      id: 'm2',
      sender: 'client',
      text: 'Good morning Advocate. I have questions regarding the builder delayed possession compensation.',
      time: '11:31 AM',
    },
  ])
  const [newMessage, setNewMessage] = useState<string>('')

  // Legal Notes
  const [lawyerNotes, setLawyerNotes] = useState<string>(
    'Client purchased 3BHK in Kompally in 2022. Builder agreed possession date was Dec 2023. Construction delayed by 22 months. Client possesses original agreement of sale and payment receipts.'
  )

  // End Session & Summary
  const [isConcluded, setIsConcluded] = useState<boolean>(false)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false)
  const [callSummary, setCallSummary] = useState<SummaryData | null>(null)

  // Load Booking Details
  useEffect(() => {
    let isMounted = true

    async function loadBooking() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/bookings/${bookingId}`)
        const json = await res.json()
        if (json.success && json.data && isMounted) {
          setBooking(json.data)
          setTimeLeftSeconds(json.data.durationMinutes * 60 || 30 * 60)
        }
      } catch (err) {
        console.error('Failed to load booking:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadBooking()
    return () => {
      isMounted = false
    }
  }, [bookingId])

  // Countdown Timer
  useEffect(() => {
    if (isConcluded) return

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleConcludeCall()
          return 0
        }
        // Auto-trigger extension modal at 5 mins remaining
        if (prev === 300 && extensionCount === 0) {
          setIsExtensionModalOpen(true)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isConcluded, extensionCount])

  // Send Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'client',
        text: newMessage,
        time: timeStr,
      },
    ])
    setNewMessage('')

    // Auto-advocate simulated reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-reply`,
          sender: 'advocate',
          text: 'Understood. Under Section 18 of RERA, you are entitled to interest on every month of delay at SBI MCLR + 2%.',
          time: timeStr,
        },
      ])
    }, 2000)
  }

  // Handle Extension Request (33% or 20% discount)
  const handleApplyExtension = (mins: number) => {
    const nextExtNumber = extensionCount + 1
    const extFee = calcExtensionFee(599, mins, nextExtNumber)

    setTimeLeftSeconds((prev) => prev + mins * 60)
    setExtensionCount(nextExtNumber)
    setExtensionSuccess(
      `Extended by +${mins} minutes! Saved ${extFee.discountPct}% (${formatINR(extFee.saving)}) loyalty discount.`
    )

    setTimeout(() => {
      setIsExtensionModalOpen(false)
      setExtensionSuccess('')
    }, 2000)
  }

  // Handle Conclude Call & Generate AI Summary
  const handleConcludeCall = async () => {
    setIsConcluded(true)
    setIsGeneratingSummary(true)

    try {
      const res = await fetch(`/api/consultations/${bookingId}/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueDescription: booking?.issueDescription || 'Property dispute regarding delay compensation',
          issueCategory: booking?.issueCategory || 'Property Law',
          transcript: lawyerNotes,
        }),
      })

      const json = await res.json()
      if (json.success && json.data) {
        setCallSummary(json.data)
      }
    } catch (err) {
      console.warn('Call summary generation error:', err)
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  // Current extension calculation preview
  const ext15 = calcExtensionFee(599, 15, extensionCount + 1)
  const ext30 = calcExtensionFee(599, 30, extensionCount + 1)

  return (
    <div className="min-h-screen bg-[#071322] text-white flex flex-col justify-between">
      {/* Top Consultation Room Navigation Bar */}
      <header className="border-b border-slate-800 bg-[#0B1F3A]/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Advocate Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="Advocate"
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-emerald-500"
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0B1F3A]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-hero text-sm font-bold text-white">
                  {booking?.lawyerName || 'Adv. Priya Sharma'}
                </h1>
                <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {booking?.court || 'Telangana High Court'} • {booking?.bookingRef || 'LX-2025-847291'}
              </p>
            </div>
          </div>

          {/* Central Countdown Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-mono font-bold transition border ${
                timeLeftSeconds < 300
                  ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                  : 'bg-white/10 border-white/10 text-white'
              }`}
            >
              <Clock className="h-4 w-4 text-[#C9A84C]" />
              <span className="text-sm font-extrabold">{formatDuration(timeLeftSeconds)}</span>
            </div>

            {/* Extend Button */}
            {!isConcluded && (
              <button
                type="button"
                onClick={() => setIsExtensionModalOpen(true)}
                className="hidden sm:flex items-center gap-1 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 px-3 py-1.5 text-xs font-bold text-[#C9A84C] hover:bg-[#C9A84C]/30 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Extend ({extensionCount === 0 ? '33% Off' : '20% Off'})</span>
              </button>
            )}
          </div>

          {/* Right Controls: Escrow Status & Meet Outbound */}
          <div className="flex items-center gap-2 text-xs">
            <div className="hidden lg:flex items-center gap-1.5 text-[#0D7A55] bg-[#0D7A55]/20 border border-[#0D7A55]/30 rounded-xl px-3 py-1.5 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Escrow Locked</span>
            </div>

            {booking?.meetLink && (
              <a
                href={booking.meetLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 text-xs font-bold text-white transition"
                title="Open directly in Google Meet"
              >
                <span className="hidden sm:inline">Google Meet</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Consultation Canvas */}
      {!isConcluded ? (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {/* Left: Video Streams (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 p-4 relative overflow-hidden shadow-2xl">
            {/* Top Video Indicators */}
            <div className="flex items-center justify-between text-xs z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-semibold text-slate-300">
                <Lock className="h-3 w-3 text-emerald-400" />
                <span>256-bit Encrypted Consultation</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span>Audio Recording Consented</span>
              </span>
            </div>

            {/* Advocate Primary Stream */}
            <div className="relative my-auto flex flex-col items-center justify-center py-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Adv. Priya Sharma"
                  className="h-64 sm:h-80 w-64 sm:w-80 rounded-3xl object-cover ring-4 ring-emerald-500/40 shadow-2xl"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md rounded-xl px-3 py-1 text-xs font-bold text-white flex items-center gap-2">
                  <span>Adv. Priya Sharma</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            {/* Client PIP (Picture in Picture) preview */}
            <div className="absolute bottom-20 right-6 h-28 w-40 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-xl overflow-hidden hidden sm:block">
              {isVideoOn ? (
                <div className="relative h-full w-full bg-slate-700 flex items-center justify-center">
                  <span className="text-[11px] text-slate-300 font-semibold">You (Client Video)</span>
                  <div className="absolute bottom-1 left-2 text-[10px] bg-black/60 px-1.5 rounded text-white">
                    You
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-900 text-slate-500 text-xs">
                  <VideoOff className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="flex items-center justify-center gap-3 z-10 pt-4 border-t border-slate-800/80">
              {/* Mic Toggle */}
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3.5 rounded-2xl transition ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'
                }`}
                title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>

              {/* Camera Toggle */}
              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3.5 rounded-2xl transition ${
                  isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'
                }`}
                title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              {/* Screen Share */}
              <button
                type="button"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3.5 rounded-2xl transition ${
                  isScreenSharing ? 'bg-[#C9A84C] text-[#0B1F3A]' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title="Share Screen to review documents"
              >
                <Share2 className="h-5 w-5" />
              </button>

              {/* End Call Button */}
              <button
                type="button"
                onClick={handleConcludeCall}
                className="flex items-center gap-2 rounded-2xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-xs font-bold text-white transition shadow-lg active:scale-95 ml-2"
              >
                <PhoneOff className="h-4 w-4" />
                <span>End & Generate Summary</span>
              </button>
            </div>
          </div>

          {/* Right: In-Call Drawer (Chat / Legal Notes) */}
          <div className="lg:col-span-1 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-900/50 p-2 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-[#0B1F3A] text-[#C9A84C]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'bg-[#0B1F3A] text-[#C9A84C]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Legal Notes</span>
              </button>
            </div>

            {/* Tab 1: Live Chat Content */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'client' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-3 max-w-[85%] leading-relaxed ${
                          msg.sender === 'client'
                            ? 'bg-[#0B1F3A] text-white rounded-br-xs'
                            : 'bg-slate-800 text-slate-200 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-3 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message or legal query..."
                    className="w-full rounded-2xl bg-slate-800 border border-slate-700 pl-4 pr-11 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A84C]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 rounded-xl bg-[#0B1F3A] text-[#C9A84C] hover:bg-[#1a3a6b]"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Legal Notes Content */}
            {activeTab === 'notes' && (
              <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
                <div>
                  <h4 className="font-bold text-white mb-1">Advocate&apos;s Shared Session Notes</h4>
                  <p className="text-[11px] text-slate-400">
                    Live notes being taken by the advocate during this consultation.
                  </p>
                </div>

                <textarea
                  rows={8}
                  value={lawyerNotes}
                  onChange={(e) => setLawyerNotes(e.target.value)}
                  className="w-full rounded-2xl bg-slate-800 border border-slate-700 p-3 text-xs text-slate-200 focus:outline-none focus:border-[#C9A84C]"
                />

                <div className="rounded-xl bg-slate-800/60 p-3 space-y-1 text-[11px] text-slate-400">
                  <p className="font-bold text-slate-300">Statutory Pointers Discussed:</p>
                  <p>• Real Estate (Regulation and Development) Act, 2016 (Section 18)</p>
                  <p>• Telangana RERA complaint filing procedure (Form M)</p>
                  <p>• 15-day statutory legal notice via Registered Post</p>
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        /* ================= CONCLUDED CONSULTATION & AI CALL SUMMARY ================= */
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 my-auto">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-hero text-2xl font-extrabold text-white">
                Consultation Concluded Successfully
              </h2>
              <p className="text-xs text-slate-400">
                Booking Reference: <strong className="text-white">{booking?.bookingRef || bookingId}</strong>
              </p>
            </div>

            {/* Summary Box */}
            {isGeneratingSummary ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center space-y-3">
                <Sparkles className="h-8 w-8 text-[#C9A84C] animate-spin mx-auto" />
                <h3 className="font-bold text-sm text-[#C9A84C]">
                  Synthesizing AI Legal Consultation Summary...
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Google Gemini 1.5 Flash is extracting key facts, advocate advice, statutory sections, and client next steps.
                </p>
              </div>
            ) : callSummary ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 space-y-5 text-left text-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#C9A84C]" />
                    <span className="font-hero text-sm font-bold text-white">
                      AI Legal Consultation Summary
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Gemini 1.5 Synthesized
                  </span>
                </div>

                {/* Issue Discussed */}
                <div>
                  <h4 className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Issue Discussed
                  </h4>
                  <p className="mt-1 text-slate-200 leading-relaxed">{callSummary.issueDiscussed}</p>
                </div>

                {/* Key Facts */}
                <div>
                  <h4 className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Key Facts Identified
                  </h4>
                  <ul className="mt-1 list-disc list-inside space-y-1 text-slate-300">
                    {callSummary.keyFacts.map((fact, i) => (
                      <li key={i}>{fact}</li>
                    ))}
                  </ul>
                </div>

                {/* Advocate Advice */}
                <div>
                  <h4 className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Advocate&apos;s Legal Advice
                  </h4>
                  <p className="mt-1 text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                    {callSummary.adviceGiven}
                  </p>
                </div>

                {/* Statutes Referenced */}
                <div>
                  <h4 className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Applicable Indian Legal Sections
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {callSummary.legalSectionsReferenced.map((sec, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 text-[11px] font-semibold"
                      >
                        ⚖️ {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h4 className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    Actionable Next Steps for Client
                  </h4>
                  <ul className="mt-1 space-y-1 text-slate-300">
                    {callSummary.nextStepsForClient.map((step, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Escrow Release Notice */}
            <div className="rounded-2xl bg-[#0D7A55]/10 border border-[#0D7A55]/20 p-4 text-xs text-[#0D7A55] flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Escrow Guarantee Active</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Your consultation fee is protected in escrow. Funds will be released to the advocate after the 48-hour satisfaction window.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard/bookings"
                className="rounded-xl bg-[#0B1F3A] px-6 py-3 text-xs font-bold text-white hover:bg-[#1a3a6b] transition border border-slate-700"
              >
                Go to Dashboard
              </Link>

              <Link
                href={`/lawyer/${booking?.lawyerName ? 'lawyer-priya-001' : ''}`}
                className="rounded-xl bg-amber-500/20 text-[#C9A84C] border border-[#C9A84C]/40 px-6 py-3 text-xs font-bold hover:bg-amber-500/30 transition"
              >
                Leave Client Review
              </Link>
            </div>
          </div>
        </main>
      )}

      {/* Extension Modal */}
      {isExtensionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-white space-y-5">
            <button
              type="button"
              onClick={() => setIsExtensionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 px-3 py-1 text-[10px] font-bold text-[#C9A84C]">
                Loyalty Discount Active
              </span>
              <h3 className="font-hero text-lg font-bold mt-2">Extend Your Consultation</h3>
              <p className="text-xs text-slate-400 mt-1">
                Need more time with {booking?.lawyerName || 'Adv. Priya Sharma'}? Choose an extension with automatic tiered discount.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 15 Mins Option */}
              <button
                type="button"
                onClick={() => handleApplyExtension(15)}
                className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 text-left hover:border-[#C9A84C] hover:bg-slate-800 transition"
              >
                <p className="font-bold text-sm">+15 Minutes</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-extrabold text-base text-white">
                    {formatINR(ext15.discountedFee)}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatINR(ext15.originalFee)}
                  </span>
                </div>
                <span className="mt-2 inline-block rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5">
                  Save {ext15.discountPct}%
                </span>
              </button>

              {/* 30 Mins Option */}
              <button
                type="button"
                onClick={() => handleApplyExtension(30)}
                className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 text-left hover:border-[#C9A84C] hover:bg-slate-800 transition"
              >
                <p className="font-bold text-sm">+30 Minutes</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-extrabold text-base text-white">
                    {formatINR(ext30.discountedFee)}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatINR(ext30.originalFee)}
                  </span>
                </div>
                <span className="mt-2 inline-block rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5">
                  Save {ext30.discountPct}%
                </span>
              </button>
            </div>

            {extensionSuccess && (
              <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-center">
                {extensionSuccess}
              </p>
            )}

            <p className="text-[10px] text-slate-500 text-center">
              Additional fee is authorized directly via existing Razorpay escrow.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
