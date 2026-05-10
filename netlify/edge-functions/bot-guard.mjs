import {
  createRateLimitStore,
  getClientIp,
  getUserAgent,
  isAssetPath,
  isSuspiciousAgent,
  isTrustedBot,
  jsonResponse,
  takeRateLimit,
  withRateLimitHeaders,
  withSecurityHeaders,
} from '../lib/request-guard.mjs'

const pageStore = createRateLimitStore('edge-pages')
const functionStore = createRateLimitStore('edge-functions')

function shouldInspect(pathname) {
  if (pathname.startsWith('/.netlify/functions/')) return true
  if (isAssetPath(pathname)) return false
  return true
}

export default async (request, context) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  if (!shouldInspect(pathname)) {
    return context.next()
  }

  const userAgent = getUserAgent(request.headers)
  const clientIp = getClientIp(request.headers)
  const isFunctionRequest = pathname.startsWith('/.netlify/functions/')

  if (!isFunctionRequest && isTrustedBot(userAgent)) {
    return withSecurityHeaders(await context.next())
  }

  const limitDecision = takeRateLimit(
    isFunctionRequest ? functionStore : pageStore,
    `${clientIp}:${isFunctionRequest ? 'function' : 'page'}`,
    isFunctionRequest
      ? {
          limit: isSuspiciousAgent(userAgent) ? 8 : 30,
          windowMs: 5 * 60 * 1000,
          blockMs: 15 * 60 * 1000,
        }
      : {
          limit: isSuspiciousAgent(userAgent) ? 40 : 140,
          windowMs: 5 * 60 * 1000,
          blockMs: 10 * 60 * 1000,
        }
  )

  if (!limitDecision.allowed) {
    const headers = withRateLimitHeaders(
      isFunctionRequest ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'text/plain; charset=utf-8' },
      limitDecision
    )

    return isFunctionRequest
      ? jsonResponse(
          { error: 'Te veel verzoeken op korte tijd. Probeer later opnieuw.' },
          { status: 429, headers }
        )
      : new Response('Te veel verzoeken op korte tijd. Probeer later opnieuw.', {
          status: 429,
          headers,
        })
  }

  const response = await context.next()
  return withSecurityHeaders(response)
}
