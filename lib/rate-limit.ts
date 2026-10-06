interface RateLimitEntry {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitEntry>()

const MAX_REQUESTS = 5
const WINDOW_MS = 60 * 60 * 1000

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  const entry = buckets.get(identifier)

  if (!entry || entry.resetAt < now) {
    const newEntry = { count: 1, resetAt: now + WINDOW_MS }
    buckets.set(identifier, newEntry)
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: newEntry.resetAt,
    }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  }
}
