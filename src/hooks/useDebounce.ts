'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to debounce any rapidly changing value (e.g. search input).
 * @param value - Target value to debounce
 * @param delayMs - Delay in milliseconds (default: 300)
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delayMs])

  return debouncedValue
}
