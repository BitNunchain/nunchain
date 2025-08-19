// Dev-friendly in-memory rate limiter. Replace with Redis in prod.
const hits = new Map<string, { count: number; ts: number }>()

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now()
  const rec = hits.get(key)
  if (!rec || now - rec.ts > windowMs) {
    hits.set(key, { count: 1, ts: now })
    return { allowed: true, remaining: limit - 1 }
  }
  rec.count++
  if (rec.count > limit) return { allowed: false, remaining: 0 }
  return { allowed: true, remaining: limit - rec.count }
}
