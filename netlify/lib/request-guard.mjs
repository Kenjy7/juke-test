const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}

const ALLOWED_ORIGINS = new Set([
  'https://jukecoding.be',
  'https://www.jukecoding.be',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

const TRUSTED_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /duckduckbot/i,
  /applebot/i,
  /slurp/i,
  /linkedinbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
]

const SUSPICIOUS_AGENTS = [
  /^$/,
  /curl/i,
  /wget/i,
  /python/i,
  /aiohttp/i,
  /axios/i,
  /postman/i,
  /insomnia/i,
  /scrapy/i,
  /headlesschrome/i,
  /phantomjs/i,
  /go-http-client/i,
  /libwww-perl/i,
  /node-fetch/i,
]

const ASSET_PATH_REGEX = /\.(?:css|js|mjs|map|json|xml|txt|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|pdf)$/i

function cleanupStore(store, now) {
  for (const [key, entry] of store.entries()) {
    const expiredWindow = entry.resetAt <= now
    const expiredBlock = !entry.blockedUntil || entry.blockedUntil <= now
    if (expiredWindow && expiredBlock) {
      store.delete(key)
    }
  }
}

export function createRateLimitStore(name) {
  const key = `__juke_rate_limit_${name}`
  if (!globalThis[key]) {
    globalThis[key] = new Map()
  }
  return globalThis[key]
}

export function getClientIp(headers) {
  const forwardedFor = headers.get('x-forwarded-for') || headers.get('client-ip') || ''
  return forwardedFor.split(',')[0]?.trim() || 'unknown'
}

export function getUserAgent(headers) {
  return (headers.get('user-agent') || '').trim()
}

export function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.has(origin)
}

export function isAllowedSiteRequest(request) {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  if (origin) return isAllowedOrigin(origin)
  if (referer) {
    try {
      return isAllowedOrigin(new URL(referer).origin)
    } catch {
      return false
    }
  }

  return false
}

export function isTrustedBot(userAgent) {
  return TRUSTED_BOTS.some((pattern) => pattern.test(userAgent))
}

export function isSuspiciousAgent(userAgent) {
  return SUSPICIOUS_AGENTS.some((pattern) => pattern.test(userAgent))
}

// SSRF guard: reject non-http(s) schemes and any host that points at
// loopback / link-local / private / metadata ranges. Pure JS (no node:net)
// so it is safe to import from both Node functions and the Deno edge runtime.
// Residual risk: DNS rebinding (a public hostname resolving to an internal IP)
// is NOT covered here — that needs resolve-then-pin at fetch time.
export function isPublicHttpUrl(rawUrl) {
  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    return false
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false

  const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '')

  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.internal') ||
    host.endsWith('.local') ||
    host === 'metadata.google.internal'
  ) {
    return false
  }

  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (v4) {
    const octets = v4.slice(1).map(Number)
    if (octets.some((n) => n > 255)) return false
    const [a, b] = octets
    if (a === 0 || a === 10 || a === 127) return false
    if (a === 169 && b === 254) return false // link-local + AWS/GCP IMDS (169.254.169.254)
    if (a === 172 && b >= 16 && b <= 31) return false
    if (a === 192 && b === 168) return false
    if (a === 100 && b >= 64 && b <= 127) return false // CGNAT
    if (a >= 224) return false // multicast / reserved
    return true
  }

  if (host.includes(':')) {
    if (host === '::1' || host === '::') return false
    if (host.startsWith('fe80') || host.startsWith('fc') || host.startsWith('fd')) return false
    if (host.startsWith('::ffff:')) {
      const mapped = host.slice('::ffff:'.length)
      // Dotted-quad form (e.g. ::ffff:127.0.0.1) — re-check directly.
      if (mapped.includes('.')) {
        return isPublicHttpUrl(`${parsed.protocol}//${mapped}`)
      }
      // Hex form: the URL parser normalises ::ffff:127.0.0.1 to ::ffff:7f00:1,
      // so decode the two 16-bit groups back to dotted decimal before
      // re-checking — otherwise mapped loopback/private IPs slip through.
      const groups = mapped.split(':')
      if (groups.length === 2) {
        const [hi, lo] = groups.map((g) => parseInt(g, 16))
        if (!Number.isNaN(hi) && !Number.isNaN(lo)) {
          const dotted = [hi >> 8, hi & 0xff, lo >> 8, lo & 0xff].join('.')
          return isPublicHttpUrl(`${parsed.protocol}//${dotted}`)
        }
      }
      // Unrecognised mapped form — fail closed.
      return false
    }
  }

  if (host === '0.0.0.0') return false

  return true
}

export function isAssetPath(pathname) {
  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/afbeeldingensteden/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    ASSET_PATH_REGEX.test(pathname)
  )
}

export function buildCorsHeaders(request, options = {}) {
  const {
    methods = 'POST, OPTIONS',
    contentType = 'application/json',
  } = options

  const origin = request.headers.get('origin')
  const allowOrigin = origin && isAllowedOrigin(origin) ? origin : 'https://jukecoding.be'

  return {
    ...SECURITY_HEADERS,
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    Vary: 'Origin',
  }
}

export function jsonResponse(body, options = {}) {
  const {
    status = 200,
    headers = {},
  } = options

  return new Response(JSON.stringify(body), {
    status,
    headers,
  })
}

export function withRateLimitHeaders(headers, decision) {
  const nextHeaders = new Headers(headers)
  nextHeaders.set('X-RateLimit-Limit', String(decision.limit))
  nextHeaders.set('X-RateLimit-Remaining', String(Math.max(0, decision.remaining)))
  nextHeaders.set('X-RateLimit-Reset', new Date(decision.resetAt).toISOString())

  if (!decision.allowed) {
    nextHeaders.set('Retry-After', String(Math.max(1, Math.ceil(decision.retryAfter / 1000))))
  }

  return nextHeaders
}

// Pure rate-limit core: given the stored entry (or null/undefined) and the
// current clock, decide and return { decision, entry, persist }. No I/O, so it
// backs both the in-memory Map store (takeRateLimit) and the cross-instance
// Blobs store (takeRateLimitShared) with identical semantics.
export function evaluateRateLimit(current, now, options) {
  const {
    limit,
    windowMs,
    blockMs = 0,
  } = options

  const windowExpired = !current || current.resetAt <= now
  const entry = windowExpired
    ? {
        count: 0,
        resetAt: now + windowMs,
        // Carry an active block across the window reset, otherwise a blockMs
        // that outlasts windowMs would be silently dropped after one window
        // (and clients told retryAfter=blockMs would be let back in early).
        blockedUntil: current && current.blockedUntil > now ? current.blockedUntil : 0,
      }
    : { ...current }

  if (entry.blockedUntil && entry.blockedUntil > now) {
    // Already blocked — do not persist (matches the original early return).
    return {
      persist: false,
      entry,
      decision: {
        allowed: false,
        limit,
        remaining: 0,
        resetAt: entry.resetAt,
        retryAfter: entry.blockedUntil - now,
      },
    }
  }

  entry.count += 1

  if (entry.count > limit) {
    entry.blockedUntil = now + blockMs
    return {
      persist: true,
      entry,
      decision: {
        allowed: false,
        limit,
        remaining: 0,
        resetAt: entry.resetAt,
        retryAfter: Math.max(windowMs, blockMs || windowMs),
      },
    }
  }

  return {
    persist: true,
    entry,
    decision: {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - entry.count),
      resetAt: entry.resetAt,
      retryAfter: 0,
    },
  }
}

export function takeRateLimit(store, key, options) {
  const now = Date.now()
  cleanupStore(store, now)

  const { decision, entry, persist } = evaluateRateLimit(store.get(key), now, options)
  if (persist) store.set(key, entry)
  return decision
}

// Cross-instance rate limit backed by Netlify Blobs, so the limit holds across
// serverless instances / cold starts instead of resetting per instance. Falls
// back to the in-memory `fallbackStore` (fail OPEN) when Blobs is unavailable
// — local dev, missing runtime context, or any I/O error — so the endpoint
// keeps serving rather than 500-ing on a storage hiccup.
//
// Caveat: Blobs has no atomic increment, so two requests arriving in the same
// read-modify-write window can each see the same count and both pass — a small
// over-allowance under burst concurrency. Acceptable for coarse abuse limiting;
// for hard guarantees use a CAS/atomic backend (Redis/Upstash).
export async function takeRateLimitShared(storeName, key, options, fallbackStore) {
  let store
  try {
    const { getStore } = await import('@netlify/blobs')
    store = getStore({ name: `ratelimit-${storeName}`, consistency: 'strong' })
  } catch {
    return takeRateLimit(fallbackStore, key, options)
  }

  try {
    const now = Date.now()
    const current = await store.get(key, { type: 'json' })
    const { decision, entry, persist } = evaluateRateLimit(current, now, options)
    if (persist) await store.setJSON(key, entry)
    return decision
  } catch {
    return takeRateLimit(fallbackStore, key, options)
  }
}

export function withSecurityHeaders(response) {
  const headers = new Headers(response.headers)

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value)
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
