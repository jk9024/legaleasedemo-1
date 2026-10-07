'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

/**
 * PWA installation prompt and online/offline state management hook.
 * Follows AGENTS.md Rule 11: "PWA: every page works offline".
 */
export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Check initial online status
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)

      // Listen for network status changes
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)

      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      // PWA install prompt handler
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault()
        setInstallPrompt(e as BeforeInstallPromptEvent)
        setIsInstallable(true)
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstall)

      // Check if already in standalone display mode (installed)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }

      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      }
    }
  }, [])

  const promptInstall = async () => {
    if (!installPrompt) return false
    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setIsInstalled(true)
      setIsInstallable(false)
    }
    setInstallPrompt(null)
    return choice.outcome === 'accepted'
  }

  return {
    isOnline,
    isInstallable,
    isInstalled,
    promptInstall,
  }
}
