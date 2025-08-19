import { NextResponse } from 'next/server'
import { isAllowedUrl } from '@/lib/security'
import { rateLimit } from '@/lib/rateLimit'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const target = searchParams.get('url')
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown'

  const rl = rateLimit(`proxy:${ip}`, 60, 60_000)
  if (!rl.allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    })
  }

  if (!target || !isAllowedUrl(target)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 400 })
  }

  const res = await fetch(target, { cache: 'no-store' })

  // Strip hop-by-hop headers and set safe cache policy
  const out = new NextResponse(res.body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/octet-stream',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  })
  return out
}
