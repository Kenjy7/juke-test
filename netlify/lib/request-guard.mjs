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

export function takeRateLimit(store, key, options) {
  const {
    limit,
    windowMs,
    blockMs = 0,
  } = options

  const now = Date.now()
  cleanupStore(store, now)

  const current = store.get(key)
  const entry = !current || current.resetAt <= now
    ? {
        count: 0,
        resetAt: now + windowMs,
        blockedUntil: 0,
      }
    : current

  if (entry.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: entry.blockedUntil - now,
    }
  }

  entry.count += 1

  if (entry.count > limit) {
    entry.blockedUntil = now + blockMs
    store.set(key, entry)

    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: Math.max(windowMs, blockMs || windowMs),
    }
  }

  store.set(key, entry)

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
    retryAfter: 0,
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
