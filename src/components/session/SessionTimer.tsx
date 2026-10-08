'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Clock, Plus, AlertCircle } from 'lucide-react'
import ExtensionPrompt from './ExtensionPrompt'

export interface SessionTimerProps {
  bookingId: string
  packageMinutes: number
  ratePerMinute: number
  lawyerName: string
  isEmergency?: boolean
  onSessionConcluded?: (totalElapsedSeconds: number) => void
}

/**
 * SessionTimer component
 * Tracks remaining consultation duration, activates session on connect,
 * shifts color state as time expires, prompts for extension at 5 minutes,
 * and deactivates session on exit.
 */
export default function SessionTimer({
  bookingId,
  packageMinutes,
  ratePerMinute,
  lawyerName,
  isEmergency = false,
  onSessionConcluded
}: SessionTimerProps) {
  const [sessionActive, setSessionActive] = useState<boolean>(false)
  const [showExtensionPrompt, setShowExtensionPrompt] = useState<boolean>(false)
  const [extensionCount, setExtensionCount] = useState<number>(0)
  const [totalMinutes, setTotalMinutes] = useState<number>(packageMinutes || 30)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0)

  const secondsElapsedRef = useRef<number>(0)
  secondsElapsedRef.current = secondsElapsed

  // 1. On mount: activate session
  useEffect(() => {
    let isCancelled = false

    async function activate() {
      try {
        const res = await fetch('/api/session/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId })
        })
        const json = await res.json()
        if (json.success && !isCancelled) {
          setSessionActive(true)
        }
      } catch (err) {
        console.error('Session activation error:', err)
        if (!isCancelled) setSessionActive(true)
      }
    }

    activate()

    // 5. On unmount: deactivate session
    return () => {
      isCancelled = true
      fetch('/api/session/deactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          secondsElapsed: secondsElapsedRef.current
        })
      }).catch((err) => console.error('Session deactivation error:', err))
    }
  }, [bookingId])

  // 2. Countdown timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const nextElapsed = prev + 1
        const remaining = totalMinutes * 60 - nextElapsed

        // 4. At EXACTLY 5 min remaining: trigger prompt
        if (remaining === 300 && !isEmergency) {
          setShowExtensionPrompt(true)
        }

        // Auto conclude when countdown reaches 0
        if (remaining <= 0) {
          clearInterval(interval)
          if (onSessionConcluded) {
            onSessionConcluded(nextElapsed)
          }
        }

        return nextElapsed
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [totalMinutes, isEmergency, onSessionConcluded])

  // Calculate remaining seconds
  const secondsRemaining = Math.max(0, totalMinutes * 60 - secondsElapsed)

  // Color state styling based on remaining minutes
  const minutesRemaining = secondsRemaining / 60

  let colorStyle = {
    textColor: 'text-[#1a56db]',
    borderColor: 'border-[#1a56db]/30',
    bgColor: 'bg-[#1a56db]/10',
    pulse: false
  }

  if (minutesRemaining < 5) {
    colorStyle = {
      textColor: 'text-[#dc2626]',
      borderColor: 'border-[#dc2626]/40',
      bgColor: 'bg-[#dc2626]/15',
      pulse: true
    }
  } else if (minutesRemaining <= 10) {
    colorStyle = {
      textColor: 'text-[#ea580c]',
      borderColor: 'border-[#ea580c]/30',
      bgColor: 'bg-[#ea580c]/10',
      pulse: false
    }
  } else if (minutesRemaining <= 20) {
    colorStyle = {
      textColor: 'text-[#d97706]',
      borderColor: 'border-[#d97706]/30',
      bgColor: 'bg-[#d97706]/10',
      pulse: false
    }
  }

  // Format time remaining MM:SS
  const mins = Math.floor(secondsRemaining / 60)
  const secs = secondsRemaining % 60
  const formattedRemaining = `${mins}:${secs < 10 ? '0' : ''}${secs}`

  // Callback when extension is paid
  const handleExtended = (addedMinutes: number) => {
    setTotalMinutes((prev) => prev + addedMinutes)
    setExtensionCount((prev) => prev + 1)
    setShowExtensionPrompt(false)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Timer Badge */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors ${
          colorStyle.borderColor
        } ${colorStyle.bgColor} ${colorStyle.textColor} ${
          colorStyle.pulse ? 'animate-pulse' : ''
        }`}
      >
        <Clock className="h-4 w-4 shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
          <span className="font-mono text-sm sm:text-base font-bold">
            {formattedRemaining}
          </span>
          <span className="text-[10px] sm:text-xs opacity-80 uppercase tracking-wide">
            Remaining
          </span>
        </div>
      </div>

      {/* Manual Extend Button (available anytime during live call except emergency) */}
      {!isEmergency && sessionActive && (
        <button
          onClick={() => setShowExtensionPrompt(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Extend Time</span>
        </button>
      )}

      {/* Extension Prompt Modal */}
      {showExtensionPrompt && (
        <ExtensionPrompt
          bookingId={bookingId}
          ratePerMinute={ratePerMinute}
          extensionCount={extensionCount}
          onExtended={handleExtended}
          onDismiss={() => setShowExtensionPrompt(false)}
          lawyerName={lawyerName}
          isEmergency={isEmergency}
        />
      )}
    </div>
  )
}
