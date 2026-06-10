import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildCorsHeaders,
  createRateLimitStore,
  getClientIp,
  getUserAgent,
  isAllowedOrigin,
  isAllowedSiteRequest,
  isAssetPath,
  isPublicHttpUrl,
  isSuspiciousAgent,
  isTrustedBot,
  jsonResponse,
  evaluateRateLimit,
  takeRateLimit,
  takeRateLimitShared,
  withRateLimitHeaders,
  withSecurityHeaders,
} from '../netlify/lib/request-guard.mjs'

// Small helper: build a Headers-like object from a plain map. The guard only
// ever calls `.get()`, and using the real Headers keeps casing behaviour honest.
const headers = (map = {}) => new Headers(map)
const request = (map = {}) => ({ headers: headers(map) })

describe('getClientIp', () => {
  it('returns the first ip from a multi-hop x-forwarded-for chain', () => {
    expect(getClientIp(headers({ 'x-forwarded-for': '203.0.113.7, 70.41.3.18' }))).toBe('203.0.113.7')
  })

  it('falls back to client-ip when x-forwarded-for is absent', () => {
    expect(getClientIp(headers({ 'client-ip': '198.51.100.4' }))).toBe('198.51.100.4')
  })

  it('returns "unknown" when no ip header is present', () => {
    expect(getClientIp(headers())).toBe('unknown')
  })
})

describe('getUserAgent', () => {
  it('trims surrounding whitespace', () => {
    expect(getUserAgent(headers({ 'user-agent': '  Mozilla/5.0  ' }))).toBe('Mozilla/5.0')
  })

  it('returns empty string when header missing', () => {
    expect(getUserAgent(headers())).toBe('')
  })
})

describe('isAllowedOrigin', () => {
  it('accepts the canonical production origin', () => {
    expect(isAllowedOrigin('https://jukecoding.be')).toBe(true)
  })

  it('accepts the local dev origin', () => {
    expect(isAllowedOrigin('http://localhost:5173')).toBe(true)
  })

  it('rejects a look-alike origin (no substring match)', () => {
    expect(isAllowedOrigin('https://jukecoding.be.evil.com')).toBe(false)
  })

  it('rejects an unknown origin', () => {
    expect(isAllowedOrigin('https://example.com')).toBe(false)
  })
})

describe('isAllowedSiteRequest', () => {
  it('allows when origin header is on the allowlist', () => {
    expect(isAllowedSiteRequest(request({ origin: 'https://www.jukecoding.be' }))).toBe(true)
  })

  it('rejects when origin header is present but not allowed (ignores referer)', () => {
    // Origin takes precedence: a disallowed origin must not be rescued by referer.
    expect(
      isAllowedSiteRequest(
        request({ origin: 'https://evil.com', referer: 'https://jukecoding.be/contact' }),
      ),
    ).toBe(false)
  })

  it('falls back to the referer origin when no origin header is sent', () => {
    expect(isAllowedSiteRequest(request({ referer: 'https://jukecoding.be/contact' }))).toBe(true)
  })

  it('rejects a malformed referer instead of throwing', () => {
    expect(isAllowedSiteRequest(request({ referer: 'not-a-url' }))).toBe(false)
  })

  it('rejects when neither origin nor referer is present', () => {
    expect(isAllowedSiteRequest(request())).toBe(false)
  })
})

describe('isTrustedBot', () => {
  it('recognises Googlebot regardless of case', () => {
    expect(isTrustedBot('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true)
  })

  it('does not flag a normal browser UA', () => {
    expect(isTrustedBot('Mozilla/5.0 (Macintosh) Safari/605')).toBe(false)
  })
})

describe('isSuspiciousAgent', () => {
  it('flags an empty user-agent', () => {
    expect(isSuspiciousAgent('')).toBe(true)
  })

  it.each(['curl/8.4.0', 'python-requests/2.31', 'node-fetch/3', 'HeadlessChrome/120'])(
    'flags scripted client %s',
    (ua) => {
      expect(isSuspiciousAgent(ua)).toBe(true)
    },
  )

  it('does not flag a real browser UA', () => {
    expect(isSuspiciousAgent('Mozilla/5.0 (Windows NT 10.0) Chrome/120 Safari/537')).toBe(false)
  })
})

describe('isAssetPath', () => {
  it.each([
    '/assets/app.js',
    '/images/hero.png',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/whatever/logo.webp',
    '/fonts/geist.woff2',
  ])('treats %s as an asset', (p) => {
    expect(isAssetPath(p)).toBe(true)
  })

  it.each(['/contact', '/blog/some-post', '/'])('treats page route %s as non-asset', (p) => {
    expect(isAssetPath(p)).toBe(false)
  })
})

describe('isPublicHttpUrl (SSRF guard)', () => {
  it.each([
    'https://example.com',
    'http://jukecoding.be/path?q=1',
    'https://8.8.8.8',
    'https://203.0.113.42',
  ])('allows public http(s) url %s', (url) => {
    expect(isPublicHttpUrl(url)).toBe(true)
  })

  it.each([
    'ftp://example.com',
    'file:///etc/passwd',
    'gopher://example.com',
    'javascript:alert(1)',
    'not-a-url',
  ])('rejects non-http(s) or malformed url %s', (url) => {
    expect(isPublicHttpUrl(url)).toBe(false)
  })

  it.each([
    'http://localhost/admin',
    'http://api.localhost',
    'http://service.internal',
    'http://printer.local',
    'http://metadata.google.internal/computeMetadata/v1/',
  ])('rejects internal hostname %s', (url) => {
    expect(isPublicHttpUrl(url)).toBe(false)
  })

  it.each([
    'http://127.0.0.1',
    'http://10.0.0.5',
    'http://172.16.0.1',
    'http://172.31.255.255',
    'http://192.168.1.1',
    'http://169.254.169.254', // cloud metadata IMDS
    'http://100.64.0.1', // CGNAT
    'http://0.0.0.0',
    'http://224.0.0.1', // multicast
  ])('rejects private/reserved IPv4 %s', (url) => {
    expect(isPublicHttpUrl(url)).toBe(false)
  })

  it('rejects an out-of-range IPv4 octet', () => {
    expect(isPublicHttpUrl('http://999.1.1.1')).toBe(false)
  })

  it('treats the boundary of the private 172.16/12 block correctly', () => {
    // 172.15 and 172.32 are public; only 172.16–172.31 are private.
    expect(isPublicHttpUrl('http://172.15.0.1')).toBe(true)
    expect(isPublicHttpUrl('http://172.32.0.1')).toBe(true)
    expect(isPublicHttpUrl('http://172.16.0.1')).toBe(false)
  })

  it.each([
    'http://[::1]', // loopback
    'http://[fe80::1]', // link-local
    'http://[fc00::1]', // unique local
    'http://[fd12:3456::1]', // unique local
  ])('rejects internal IPv6 %s', (url) => {
    expect(isPublicHttpUrl(url)).toBe(false)
  })

  it('unwraps IPv4-mapped IPv6 and rejects the mapped private address', () => {
    expect(isPublicHttpUrl('http://[::ffff:127.0.0.1]')).toBe(false)
  })
})

describe('buildCorsHeaders', () => {
  it('reflects an allowed origin back', () => {
    const h = buildCorsHeaders(request({ origin: 'https://www.jukecoding.be' }))
    expect(h['Access-Control-Allow-Origin']).toBe('https://www.jukecoding.be')
  })

  it('defaults to the canonical origin for a disallowed/absent origin', () => {
    const h = buildCorsHeaders(request({ origin: 'https://evil.com' }))
    expect(h['Access-Control-Allow-Origin']).toBe('https://jukecoding.be')
  })

  it('always includes the hardened security headers and Vary: Origin', () => {
    const h = buildCorsHeaders(request())
    expect(h['X-Frame-Options']).toBe('DENY')
    expect(h['X-Content-Type-Options']).toBe('nosniff')
    expect(h.Vary).toBe('Origin')
  })

  it('honours custom methods and content type', () => {
    const h = buildCorsHeaders(request(), { methods: 'GET, OPTIONS', contentType: 'text/plain' })
    expect(h['Access-Control-Allow-Methods']).toBe('GET, OPTIONS')
    expect(h['Content-Type']).toBe('text/plain')
  })
})

describe('jsonResponse', () => {
  it('serialises the body and defaults to status 200', async () => {
    const res = jsonResponse({ ok: true })
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true })
  })

  it('passes through a custom status', () => {
    expect(jsonResponse({ error: 'nope' }, { status: 429 }).status).toBe(429)
  })
})

describe('withSecurityHeaders', () => {
  it('adds missing security headers without clobbering existing ones', () => {
    const res = new Response('hi', { headers: { 'X-Frame-Options': 'SAMEORIGIN' } })
    const out = withSecurityHeaders(res)
    // Existing value preserved, missing ones filled in.
    expect(out.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
    expect(out.headers.get('X-Content-Type-Options')).toBe('nosniff')
  })

  it('preserves the original status', () => {
    // 204 requires a null body, so build it that way.
    expect(withSecurityHeaders(new Response(null, { status: 204 })).status).toBe(204)
  })
})

describe('withRateLimitHeaders', () => {
  it('writes limit/remaining/reset headers', () => {
    const out = withRateLimitHeaders(headers(), {
      allowed: true,
      limit: 10,
      remaining: 7,
      resetAt: 1_700_000_000_000,
      retryAfter: 0,
    })
    expect(out.get('X-RateLimit-Limit')).toBe('10')
    expect(out.get('X-RateLimit-Remaining')).toBe('7')
    expect(out.get('X-RateLimit-Reset')).toBe(new Date(1_700_000_000_000).toISOString())
  })

  it('clamps negative remaining to 0', () => {
    const out = withRateLimitHeaders(headers(), {
      allowed: true,
      limit: 10,
      remaining: -3,
      resetAt: 1_700_000_000_000,
      retryAfter: 0,
    })
    expect(out.get('X-RateLimit-Remaining')).toBe('0')
  })

  it('adds Retry-After (in whole seconds, min 1) only when blocked', () => {
    const blocked = withRateLimitHeaders(headers(), {
      allowed: false,
      limit: 10,
      remaining: 0,
      resetAt: 1_700_000_000_000,
      retryAfter: 1500, // ms -> ceil to 2s
    })
    expect(blocked.get('Retry-After')).toBe('2')

    const allowed = withRateLimitHeaders(headers(), {
      allowed: true,
      limit: 10,
      remaining: 9,
      resetAt: 1_700_000_000_000,
      retryAfter: 0,
    })
    expect(allowed.get('Retry-After')).toBeNull()
  })
})

describe('takeRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const opts = { limit: 3, windowMs: 60_000, blockMs: 120_000 }

  it('allows requests up to the limit and decrements remaining', () => {
    const store = new Map()
    const r1 = takeRateLimit(store, 'ip', opts)
    const r2 = takeRateLimit(store, 'ip', opts)
    const r3 = takeRateLimit(store, 'ip', opts)

    expect([r1.allowed, r2.allowed, r3.allowed]).toEqual([true, true, true])
    expect([r1.remaining, r2.remaining, r3.remaining]).toEqual([2, 1, 0])
  })

  it('blocks the request that exceeds the limit (off-by-one boundary)', () => {
    const store = new Map()
    for (let i = 0; i < 3; i += 1) takeRateLimit(store, 'ip', opts)

    const blocked = takeRateLimit(store, 'ip', opts) // 4th request
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
    expect(blocked.retryAfter).toBe(120_000) // max(windowMs, blockMs)
  })

  it('keeps blocking offenders for the remainder of the current window', () => {
    const store = new Map()
    for (let i = 0; i < 4; i += 1) takeRateLimit(store, 'ip', opts) // trip the block

    vi.advanceTimersByTime(30_000) // still inside the 60s window
    const stillBlocked = takeRateLimit(store, 'ip', opts)
    expect(stillBlocked.allowed).toBe(false)
  })

  it('honours a blockMs that outlasts the window (block survives the window reset)', () => {
    const store = new Map()
    for (let i = 0; i < 4; i += 1) takeRateLimit(store, 'ip', opts) // trip 120s block

    vi.advanceTimersByTime(60_001) // past the 60s window, still inside the 120s block
    const afterWindow = takeRateLimit(store, 'ip', opts)
    expect(afterWindow.allowed).toBe(false)
  })

  it('lets the offender back in once the full blockMs has elapsed', () => {
    const store = new Map()
    for (let i = 0; i < 4; i += 1) takeRateLimit(store, 'ip', opts)

    vi.advanceTimersByTime(120_001) // entire block window elapsed
    const recovered = takeRateLimit(store, 'ip', opts)
    expect(recovered.allowed).toBe(true)
    expect(recovered.remaining).toBe(2)
  })

  it('resets the counter after the window elapses (no block configured)', () => {
    const store = new Map()
    const windowOnly = { limit: 2, windowMs: 60_000 }
    takeRateLimit(store, 'ip', windowOnly)
    takeRateLimit(store, 'ip', windowOnly) // remaining 0

    vi.advanceTimersByTime(60_001) // window expired
    const fresh = takeRateLimit(store, 'ip', windowOnly)
    expect(fresh.allowed).toBe(true)
    expect(fresh.remaining).toBe(1)
  })

  it('tracks distinct keys independently', () => {
    const store = new Map()
    takeRateLimit(store, 'ip-a', opts)
    const b = takeRateLimit(store, 'ip-b', opts)
    expect(b.remaining).toBe(2) // ip-b unaffected by ip-a
  })
})

describe('createRateLimitStore', () => {
  it('returns the same Map for the same name (process-global)', () => {
    expect(createRateLimitStore('seo')).toBe(createRateLimitStore('seo'))
  })

  it('returns distinct stores for different names', () => {
    expect(createRateLimitStore('seo')).not.toBe(createRateLimitStore('chat'))
  })
})

describe('evaluateRateLimit (pure core)', () => {
  const opts = { limit: 3, windowMs: 60_000, blockMs: 120_000 }

  it('allows up to the limit and reports remaining', () => {
    const r1 = evaluateRateLimit(null, 1_000, opts)
    expect(r1.decision.allowed).toBe(true)
    expect(r1.decision.remaining).toBe(2)
    expect(r1.persist).toBe(true)

    // feed the persisted entry back in (simulates the store)
    const r2 = evaluateRateLimit(r1.entry, 1_001, opts)
    expect(r2.decision.allowed).toBe(true)
    expect(r2.decision.remaining).toBe(1)
  })

  it('blocks once the count exceeds the limit', () => {
    let entry = null
    let res
    for (let i = 0; i < 4; i += 1) {
      res = evaluateRateLimit(entry, 1_000 + i, opts)
      entry = res.entry
    }
    expect(res.decision.allowed).toBe(false)
    expect(res.entry.blockedUntil).toBeGreaterThan(1_000)
  })

  it('does not persist when already blocked', () => {
    const blocked = { count: 99, resetAt: 10_000, blockedUntil: 9_000 }
    const res = evaluateRateLimit(blocked, 5_000, opts)
    expect(res.decision.allowed).toBe(false)
    expect(res.persist).toBe(false)
    expect(res.decision.retryAfter).toBe(4_000)
  })

  it('resets after the window but carries an active block forward', () => {
    const expiredButBlocked = { count: 99, resetAt: 1_000, blockedUntil: 50_000 }
    const res = evaluateRateLimit(expiredButBlocked, 2_000, opts)
    // window expired (resetAt < now) yet block still active → stays blocked
    expect(res.decision.allowed).toBe(false)
    expect(res.entry.blockedUntil).toBe(50_000)
  })
})

describe('takeRateLimitShared (fallback path)', () => {
  it('falls back to the in-memory store when Blobs is unavailable', async () => {
    const fallback = createRateLimitStore('shared-fallback-test')
    const opts = { limit: 2, windowMs: 60_000, blockMs: 60_000 }

    // No Netlify runtime in the test env → getStore() throws → memory fallback.
    const a = await takeRateLimitShared('seo-scan', 'ip-x', opts, fallback)
    const b = await takeRateLimitShared('seo-scan', 'ip-x', opts, fallback)
    const c = await takeRateLimitShared('seo-scan', 'ip-x', opts, fallback)

    expect(a.allowed).toBe(true)
    expect(b.allowed).toBe(true)
    expect(c.allowed).toBe(false) // 3rd request over limit of 2
  })
})
