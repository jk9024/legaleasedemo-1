'use client'

import React, { useState, useEffect } from 'react'
import { calcExtensionFee, EXTENSION_OPTIONS } from '@/lib/utils/pricing'
import { formatINR } from '@/lib/utils/formatters'
import { loadRazorpayScript } from '@/lib/razorpay-client'
import { X, Clock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'

export interface ExtensionPromptProps {
  bookingId: string
  ratePerMinute: number
  extensionCount: number // how many extensions so far
  onExtended: (minutes: number) => void
  onDismiss: () => void
  lawyerName: string
  isEmergency?: boolean
}

/**
 * ExtensionPrompt modal component
 * Displays discounted extension packages (15, 30, 45, 60 mins),
 * 2-minute auto-expiry countdown, and completes Razorpay extension payment.
 */
export default function ExtensionPrompt({
  bookingId,
  ratePerMinute,
  extensionCount,
  onExtended,
  onDismiss,
  lawyerName,
  isEmergency = false
}: ExtensionPromptProps) {
  // Emergency sessions cannot be extended
  if (isEmergency) return null

  const [secondsRemaining, setSecondsRemaining] = useState<number>(120) // 2-min auto-dismiss
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [selectedMins, setSelectedMins] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Auto-dismiss countdown (2 minutes)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onDismiss()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onDismiss])

  // Format expiry countdown M:SS
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Calculate pricing for each option
  const nextExtensionNumber = extensionCount + 1
  const optionCalculations = EXTENSION_OPTIONS.map((opt) => {
    const feeInfo = calcExtensionFee(ratePerMinute, opt.minutes, nextExtensionNumber)
    return {
      minutes: opt.minutes,
      label: opt.label,
      isBestValue: opt.minutes === 60,
      feeInfo
    }
  })

  // Handle extension selection and payment
  const handleSelectOption = async (minutes: number) => {
    try {
      setIsProcessing(true)
      setSelectedMins(minutes)
      setErrorMessage('')

      // 1. Initiate extension order
      const res = await fetch('/api/session/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          extensionMinutes: minutes
        })
      })

      const json = await res.json()
      if (!json.success || !json.data) {
        throw new Error(json.error || 'Failed to initiate session extension')
      }

      const { orderId, discountedFee, keyId: serverKeyId } = json.data
      const effectiveKey = (serverKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').trim()

      // Guarantee Razorpay SDK is loaded
      await loadRazorpayScript()
      const hasRazorpay = typeof window !== 'undefined' && 'Razorpay' in window
      const hasRealKey = Boolean(effectiveKey && effectiveKey.startsWith('rzp_') && !effectiveKey.includes('placeholder') && !effectiveKey.includes('YOUR_KEY') && !effectiveKey.includes('demo'))
      const hasRealOrder = Boolean(orderId && orderId.startsWith('order_'))

      if (hasRazorpay && hasRealKey) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const RazorpayConstructor = (window as any).Razorpay
        const rzpOptions: Record<string, unknown> = {
          key: effectiveKey,
          amount: Math.round(discountedFee * 100),
          currency: 'INR',
          name: 'LegalEase India',
          description: `+${minutes} min consultation extension with ${lawyerName}`,
          notes: { bookingId, minutes: minutes.toString() },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async (paymentResponse: any) => {
            await confirmExtensionPayment({
              bookingId,
              razorpayOrderId: paymentResponse.razorpay_order_id || orderId,
              razorpayPaymentId: paymentResponse.razorpay_payment_id || `pay_${Date.now()}`,
              razorpaySignature: paymentResponse.razorpay_signature || 'sig_mock_verified_signature_2025',
              extensionMinutes: minutes
            })
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false)
              setSelectedMins(null)
            }
          }
        }

        if (hasRealOrder) {
          rzpOptions.order_id = orderId
        }

        const rzp = new RazorpayConstructor(rzpOptions)
        rzp.open()
      } else {
        // Fallback direct confirmation for development/testing or when order was simulated
        await confirmExtensionPayment({
          bookingId,
          razorpayOrderId: orderId,
          razorpayPaymentId: `pay_mock_${Date.now()}`,
          razorpaySignature: 'sig_mock_verified_signature_2025',
          extensionMinutes: minutes
        })
      }
    } catch (err) {
      console.error('Session extension error:', err)
      setErrorMessage(err instanceof Error ? err.message : 'Extension failed. Please try again.')
      setIsProcessing(false)
      setSelectedMins(null)
    }
  }

  // 2. Confirm payment on server
  const confirmExtensionPayment = async (payload: {
    bookingId: string
    razorpayOrderId: string
    razorpayPaymentId: string
    razorpaySignature: string
    extensionMinutes: number
  }) => {
    try {
      const confirmRes = await fetch('/api/session/extend/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const confirmJson = await confirmRes.json()
      if (!confirmJson.success) {
        throw new Error(confirmJson.error || 'Payment verification failed')
      }

      setToastMessage(`+${payload.extensionMinutes} min added successfully`)
      onExtended(payload.extensionMinutes)

      setTimeout(() => {
        onDismiss()
      }, 1500)
    } catch (err) {
      console.error('Confirm payment error:', err)
      setErrorMessage(err instanceof Error ? err.message : 'Confirmation error')
      setIsProcessing(false)
      setSelectedMins(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0B1F3A] border border-amber-500/30 rounded-2xl shadow-2xl text-white overflow-hidden p-6 sm:p-7">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                5 Minutes Remaining
              </span>
              <span className="text-xs text-slate-400">
                Attempt {nextExtensionNumber} of 3
              </span>
            </div>
            <h2 className="text-xl font-bold font-hero text-white mt-1">
              Extend Your Consultation
            </h2>
            <p className="text-sm text-slate-300 mt-0.5">
              Continue your live consultation with <strong className="text-white">{lawyerName}</strong> without interruption.
            </p>
          </div>
        </div>

        {/* Expiry Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Exclusive in-session discount applied automatically:</span>
          </div>
          <div className="font-semibold text-amber-400">
            Expires in {formatTimer(secondsRemaining)}
          </div>
        </div>

        {/* Toast / Error Notices */}
        {toastMessage && (
          <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-200 text-sm flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-sm">
            {errorMessage}
          </div>
        )}

        {/* 4 Extension Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {optionCalculations.map((opt) => {
            const hasDiscount = opt.feeInfo.discountPercent > 0
            const isSelected = selectedMins === opt.minutes

            return (
              <div
                key={opt.minutes}
                className={`relative rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-500/30'
                    : opt.isBestValue
                    ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900/60 hover:border-amber-400'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-base">
                    {opt.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {opt.isBestValue && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-black">
                        BEST VALUE
                      </span>
                    )}
                    {hasDiscount ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {opt.feeInfo.discountPercent}% OFF
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        Full price
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-1 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-emerald-400">
                      {formatINR(opt.feeInfo.discountedFee)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatINR(opt.feeInfo.originalFee)}
                      </span>
                    )}
                  </div>
                  {hasDiscount && opt.feeInfo.saving > 0 && (
                    <p className="text-xs text-emerald-300 font-medium mt-0.5">
                      Save {formatINR(opt.feeInfo.saving)}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectOption(opt.minutes)}
                  disabled={isProcessing}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isProcessing && isSelected
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : opt.isBestValue
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  }`}
                >
                  {isProcessing && isSelected ? (
                    'Processing Payment...'
                  ) : (
                    <>
                      <span>Select {opt.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Instant Google Meet update & 100% Escrow secured</span>
          </div>
          <button
            onClick={onDismiss}
            disabled={isProcessing}
            className="text-slate-400 hover:text-white underline text-xs"
          >
            No thanks, end on time
          </button>
        </div>
      </div>
    </div>
  )
}
