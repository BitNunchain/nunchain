import { NextResponse, NextRequest } from 'next/server'

// Configure protected routes and allowed origins
const PROTECTED = [/^\/dashboard/, /^\/admin/, /^\/settings/]
const INTERNAL_API = /^\/api\/internal(\/|$)/
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)

function isProtected(pathname: string) {
  return PROTECTED.some(rx => rx.test(pathname))
}

function hasAuthCookie(req: NextRequest) {
  // Adjust the cookie name to your auth implementation
  return Boolean(req.cookies.get('auth')?.value)
}

function originAllowed(req: NextRequest) {
  if (ALLOWED_ORIGINS.length === 0) return true // permissive until you set it
  const origin = req.headers.get('origin') || ''
  return ALLOWED_ORIGINS.includes(origin)
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Enforce origin for state‑changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    if (!originAllowed(req)) {
      return new NextResponse('Origin not allowed', { status: 403 })
    }
  }

  // Block unauthenticated access to protected routes
  if (isProtected(pathname) && !hasAuthCookie(req)) {
    // Prefer 302 to /login for pages; use 401 for APIs if you split paths
    const url = new URL('/login', req.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Require internal key for internal API routes
  if (INTERNAL_API.test(pathname)) {
    const key = req.headers.get('x-internal-key')
    if (!key || key !== process.env.INTERNAL_API_KEY) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  // Tighten cache behavior by default
  const res = NextResponse.next()
  res.headers.set('Vary', 'Origin')
  return res
}

export const config = {
  matcher: [
    /*
     - Apply to all routes except static assets and Next internals
    */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
