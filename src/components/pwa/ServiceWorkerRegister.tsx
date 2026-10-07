'use client'

import React, { useEffect, useState } from 'react'
import { Download, X, WifiOff, Smartphone } from 'lucide-react'

// Interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

/**
 * ServiceWorkerRegister Component
 * Handles client-side service worker registration, PWA installation prompts,
 * and offline status notifications.
 */
export function ServiceWorkerRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false)
  const [isOffline, setIsOffline] = useState<boolean>(false)

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('LegalEase SW registered with scope:', registration.scope)
          })
          .catch((error) => {
            console.warn('LegalEase SW registration failed:', error)
          })
      })
    }

    // 2. Listen for BeforeInstallPromptEvent
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)

      // Only show if user hasn't dismissed in current session
      const hasDismissed = sessionStorage.getItem('legalease_pwa_dismissed')
      if (!hasDismissed) {
        setShowInstallBanner(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // 3. Online/Offline network state detection
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      console.log('User installed LegalEase PWA')
    }
    setDeferredPrompt(null)
    setShowInstallBanner(false)
  }

  const handleDismiss = () => {
    setShowInstallBanner(false)
    sessionStorage.setItem('legalease_pwa_dismissed', 'true')
  }

  return (
    <>
      {/* Offline Toast */}
      {isOffline && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-bounce">
          <WifiOff className="h-4 w-4 shrink-0" />
          <span>You are currently offline. Viewing cached dockets.</span>
        </div>
      )}

      {/* PWA Install Promotion Banner */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 rounded-xl border border-slate-700 bg-[#0B1F3A] p-4 text-white shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0B1F3A]">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Install LegalEase App</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Fast 1-tap booking, instant Google Meet calls, and offline case docket access.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#C9A84C] px-3.5 py-1.5 text-xs font-bold text-[#0B1F3A] hover:bg-[#b8953a] transition shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Install Now</span>
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="rounded-md p-1 text-slate-400 hover:text-white transition"
              aria-label="Close install prompt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
