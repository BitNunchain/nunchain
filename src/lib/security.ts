// Basic allowlist and private-range blocklist for outbound URLs
const ALLOWLIST_HOSTS = (process.env.OUTBOUND_ALLOWLIST || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean)

const PRIVATE_HOSTS = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '169.254.',
  '10.',
  '172.16.',
  '172.17.',
  '172.18.',
  '172.19.',
  '172.2',
  '172.30.',
  '172.31.',
  '192.168.',
  '[::1]',
]

export function isAllowedUrl(input: string) {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    return false
  }
  const host = url.hostname.toLowerCase()

  // Only http/https
  if (!['http:', 'https:'].includes(url.protocol)) return false

  // Block obvious private ranges by prefix match
  if (PRIVATE_HOSTS.some(prefix => host.startsWith(prefix))) return false

  // Optional allowlist: if set, host must be in it
  if (ALLOWLIST_HOSTS.length > 0) {
    return ALLOWLIST_HOSTS.includes(host)
  }
  return true
}

export function assertOriginAllowed(origin: string | null) {
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  if (allowed.length === 0) return true
  return origin && allowed.includes(origin)
}
