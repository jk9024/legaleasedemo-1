/**
 * Redis client and Rate Limiting utility for LegalEase.
 * Connects to Upstash Redis REST or falls back to an in-memory Map in local development.
 * Enforces AGENTS.md Rule 10: "Rate-limit all API routes via Redis".
 */

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// In-memory fallback cache for development or when Upstash credentials are missing
const memoryStore = new Map<string, { count: number; expiresAt: number }>()

const isUpstashConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes('your_')
)

/**
 * Executes a raw Upstash REST API command if configured.
 * @param command - Redis command arguments
 */
async function upstashCommand<T = unknown>(...command: (string | number)[]): Promise<T | null> {
  if (!isUpstashConfigured) return null

  try {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/${command.map(encodeURIComponent).join('/')}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
      },
      cache: 'no-store'
    })
    if (!res.ok) throw new Error(`Upstash error: ${res.statusText}`)
    const data = await res.json()
    return data.result as T
  } catch (error) {
    console.warn('[Redis] Upstash request failed, falling back to memory store:', error)
    return null
  }
}

/**
 * Rate limit an identifier (e.g. IP address or user ID) using fixed-window algorithm.
 * @param identifier - Unique client identifier (IP address, user ID, API key)
 * @param limit - Max allowed requests in window (default: 60)
 * @param windowSec - Duration of window in seconds (default: 60)
 * @returns RateLimitResult with success flag, remaining quota, and reset timestamp
 */
export async function rateLimit(
  identifier: string,
  limit: number = 60,
  windowSec: number = 60
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`
  const now = Date.now()

  if (isUpstashConfigured) {
    try {
      const current = await upstashCommand<number>('INCR', key)
      if (current === 1) {
        await upstashCommand('EXPIRE', key, windowSec)
      }
      const count = current || 1
      return {
        success: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
        reset: Math.floor(now / 1000) + windowSec
      }
    } catch {
      // fallback to memory below
    }
  }

  // Memory store fallback
  const existing = memoryStore.get(key)
  if (!existing || now > existing.expiresAt) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowSec * 1000 })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.floor((now + windowSec * 1000) / 1000)
    }
  }

  existing.count += 1
  return {
    success: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    reset: Math.floor(existing.expiresAt / 1000)
  }
}

/**
 * Get cached JSON value by key.
 * @param key - Cache key
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (isUpstashConfigured) {
    try {
      const data = await upstashCommand<string>('GET', key)
      if (data) return JSON.parse(data) as T
    } catch {
      // fallback to memory
    }
  }

  const mem = memoryStore.get(key)
  if (mem && Date.now() < mem.expiresAt) {
    return mem as unknown as T
  }
  return null
}

/**
 * Set cached value with TTL in seconds.
 * @param key - Cache key
 * @param value - Value to cache
 * @param ttlSeconds - Expiration time in seconds
 */
export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds: number = 300
): Promise<void> {
  if (isUpstashConfigured) {
    try {
      await upstashCommand('SETEX', key, ttlSeconds, JSON.stringify(value))
      return
    } catch {
      // fallback to memory
    }
  }

  memoryStore.set(key, { count: value as any, expiresAt: Date.now() + ttlSeconds * 1000 })
}

/**
 * Delete key from cache.
 * @param key - Cache key
 */
export async function delCache(key: string): Promise<void> {
  if (isUpstashConfigured) {
    try {
      await upstashCommand('DEL', key)
      return
    } catch {
      // fallback
    }
  }
  memoryStore.delete(key)
}
