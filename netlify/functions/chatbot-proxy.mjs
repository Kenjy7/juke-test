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

const DEFAULT_WEBHOOK_URL = 'https://hook.eu1.make.com/h8w6qlp2d6xz5k17pzr8u2uybnaf6f85'
const rateLimitStore = createRateLimitStore('chatbot-proxy')

function normaliseHistory(history) {
  if (!Array.isArray(history)) return []

  return history
    .slice(-10)
    .map((item) => ({
      sender: item?.sender === 'bot' ? 'bot' : 'user',
      text: String(item?.text || '').slice(0, 500),
      time: String(item?.time || '').slice(0, 20),
    }))
}

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
      { error: 'Deze chat werkt alleen via jukecoding.be.' },
      { status: 403, headers: baseHeaders }
    )
  }

  const userAgent = getUserAgent(request.headers)
  const clientIp = getClientIp(request.headers)
  const limitDecision = takeRateLimit(rateLimitStore, `chat:${clientIp}`, {
    limit: isSuspiciousAgent(userAgent) ? 4 : 25,
    windowMs: 10 * 60 * 1000,
    blockMs: 20 * 60 * 1000,
  })
  const headers = withRateLimitHeaders(baseHeaders, limitDecision)

  if (!limitDecision.allowed) {
    return jsonResponse(
      { error: 'Te veel chatverzoeken op korte tijd. Probeer het straks opnieuw.' },
      { status: 429, headers }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Ongeldige JSON' }, { status: 400, headers })
  }

  const input = String(body?.input || '').trim()
  if (!input || input.length > 500) {
    return jsonResponse(
      { error: 'Je bericht ontbreekt of is te lang.' },
      { status: 400, headers }
    )
  }

  const payload = {
    input,
    sessionId: String(body?.sessionId || '').slice(0, 120),
    history: normaliseHistory(body?.history),
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL || DEFAULT_WEBHOOK_URL

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    })

    const raw = await response.text()
    let reply = 'Geen antwoord ontvangen.'

    try {
      const parsed = JSON.parse(raw)
      if (typeof parsed?.reply === 'string' && parsed.reply.trim()) {
        reply = parsed.reply.trim()
      } else if (raw.trim()) {
        reply = raw.trim()
      }
    } catch {
      if (raw.trim()) {
        reply = raw.trim()
      }
    }

    if (!response.ok) {
      return jsonResponse(
        { error: `Chatservice tijdelijk onbeschikbaar (${response.status}).` },
        { status: 502, headers }
      )
    }

    return jsonResponse({ reply }, { status: 200, headers })
  } catch {
    return jsonResponse(
      { error: 'De chatservice reageert momenteel niet. Probeer later opnieuw.' },
      { status: 504, headers }
    )
  }
}
