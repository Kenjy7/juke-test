import {
  buildCorsHeaders,
  createRateLimitStore,
  getClientIp,
  getUserAgent,
  isAllowedSiteRequest,
  isSuspiciousAgent,
  jsonResponse,
  takeRateLimit,
  withRateLimitHeaders,
} from '../lib/request-guard.mjs'

const rateLimitStore = createRateLimitStore('discord-log')

export default async function handler(request) {
  const baseHeaders = buildCorsHeaders(request)

  if (request.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: baseHeaders })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Alleen POST toegestaan' }, { status: 405, headers: baseHeaders })
  }

  if (!isAllowedSiteRequest(request)) {
    return jsonResponse(
      { error: 'Deze endpoint werkt alleen via jukecoding.be.' },
      { status: 403, headers: baseHeaders }
    )
  }

  const userAgent = getUserAgent(request.headers)
  const clientIp = getClientIp(request.headers)
  const limitDecision = takeRateLimit(rateLimitStore, `discord-log:${clientIp}`, {
    limit: isSuspiciousAgent(userAgent) ? 8 : 40,
    windowMs: 10 * 60 * 1000,
    blockMs: 20 * 60 * 1000,
  })
  const headers = withRateLimitHeaders(baseHeaders, limitDecision)

  if (!limitDecision.allowed) {
    return jsonResponse(
      { error: 'Te veel logverzoeken op korte tijd.' },
      { status: 429, headers }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Ongeldige JSON' }, { status: 400, headers })
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    return jsonResponse({ error: 'DISCORD_WEBHOOK_URL ontbreekt' }, { status: 500, headers })
  }

  const sessionId = String(body?.sessionId || 'unknown').slice(0, 120)
  const message = String(body?.message || '-').slice(0, 800)
  const reply = String(body?.reply || '-').slice(0, 1600)

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `JUKE Bot Log\nSession: ${sessionId}\nUser message: ${message}\nBot reply: ${reply}`,
      }),
      signal: AbortSignal.timeout(8000),
    })

    return jsonResponse({ success: true }, { status: 200, headers })
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Onbekende fout' },
      { status: 500, headers }
    )
  }
}
