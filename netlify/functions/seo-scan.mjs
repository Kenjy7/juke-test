import {
  buildCorsHeaders,
  createRateLimitStore,
  getClientIp,
  getUserAgent,
  isAllowedSiteRequest,
  isPublicHttpUrl,
  isSuspiciousAgent,
  jsonResponse,
  takeRateLimitShared,
  withRateLimitHeaders,
} from '../lib/request-guard.mjs'

const rateLimitStore = createRateLimitStore('seo-scan')

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'JukeCoding-SEO-Scanner/1.0 (+https://jukecoding.be)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return { html: null, status: response.status }
    }

    return {
      html: await response.text(),
      status: response.status,
    }
  } catch (error) {
    return {
      html: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Onbekende fout',
    }
  }
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, '').trim()
}

function extractMeta(html) {
  if (!html) {
    return {
      title: null,
      description: null,
      h1: null,
      canonical: null,
      h2s: [],
      h3s: [],
      og: { title: null, description: null, image: null },
      hasSchema: false,
      imgsWithoutAlt: 0,
      totalImgs: 0,
    }
  }

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null
  const description =
    html.match(/name=["']description["'][^>]*content=(["'])(.*?)\1/i)?.[2]?.trim() ||
    html.match(/content=(["'])(.*?)\1[^>]*name=["']description["']/i)?.[2]?.trim() ||
    null
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]
  const canonical =
    html.match(/rel=["']canonical["'][^>]*href=(["'])(.*?)\1/i)?.[2]?.trim() ||
    html.match(/href=(["'])(.*?)\1[^>]*rel=["']canonical["']/i)?.[2]?.trim() ||
    null

  const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean)
    .slice(0, 6)

  const h3s = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gis)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean)
    .slice(0, 4)

  const ogTitle = html.match(/property=["']og:title["'][^>]*content=(["'])(.*?)\1/i)?.[2]?.trim() || null
  const ogDescription = html.match(/property=["']og:description["'][^>]*content=(["'])(.*?)\1/i)?.[2]?.trim() || null
  const ogImage = html.match(/property=["']og:image["'][^>]*content=(["'])(.*?)\1/i)?.[2]?.trim() || null

  const hasSchema = html.includes('"@context"') || html.includes("'@context'")
  const imgTags = [...html.matchAll(/<img[^>]*>/gi)]
  const imgsWithoutAlt = imgTags.filter((match) => !match[0].includes('alt=')).length

  return {
    title,
    description,
    h1: h1 ? stripHtml(h1) : null,
    canonical,
    h2s,
    h3s,
    og: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
    },
    hasSchema,
    imgsWithoutAlt,
    totalImgs: imgTags.length,
  }
}

function scoreItem(value, min, max) {
  if (!value) {
    return { status: 'missing', score: 0, message: 'Ontbreekt' }
  }

  if (value.length < min) {
    return { status: 'warning', score: 1, message: `Te kort (${value.length}/${min} tekens min.)` }
  }

  if (value.length > max) {
    return { status: 'warning', score: 1, message: `Te lang (${value.length}/${max} tekens max.)` }
  }

  return { status: 'ok', score: 2, message: `OK (${value.length} tekens)` }
}

function normaliseUrl(rawUrl) {
  const trimmed = String(rawUrl || '').trim()
  if (!trimmed || trimmed.length > 200) return null

  const prefixed = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const parsed = new URL(prefixed)
    if (!['http:', 'https:'].includes(parsed.protocol)) return null
    parsed.hash = ''
    const normalised = parsed.toString().replace(/\/$/, '')
    // SSRF guard: refuse internal / loopback / metadata targets.
    if (!isPublicHttpUrl(normalised)) return null
    return normalised
  } catch {
    return null
  }
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
      { error: 'Deze scan werkt alleen via jukecoding.be.' },
      { status: 403, headers: baseHeaders }
    )
  }

  const userAgent = getUserAgent(request.headers)
  const clientIp = getClientIp(request.headers)
  const limitDecision = await takeRateLimitShared(
    'seo-scan',
    `seo-scan:${clientIp}`,
    {
      limit: isSuspiciousAgent(userAgent) ? 2 : 5,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000,
    },
    rateLimitStore,
  )
  const headers = withRateLimitHeaders(baseHeaders, limitDecision)

  if (!limitDecision.allowed) {
    return jsonResponse(
      { error: 'Te veel scans vanaf dit netwerk. Probeer het over een kwartier opnieuw.' },
      { status: 429, headers }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Ongeldige JSON' }, { status: 400, headers })
  }

  const cleanUrl = normaliseUrl(body?.url)
  if (!cleanUrl) {
    return jsonResponse({ error: 'Geef een geldige website-URL in.' }, { status: 400, headers })
  }

  const { html, status } = await fetchPage(cleanUrl)

  if (!html) {
    return jsonResponse(
      {
        error: `Kon ${cleanUrl} niet bereiken (status ${status || 'onbekend'}).`,
        url: cleanUrl,
      },
      { status: 200, headers }
    )
  }

  const meta = extractMeta(html)
  const checks = {
    title: scoreItem(meta.title, 30, 60),
    description: scoreItem(meta.description, 80, 160),
    h1: meta.h1
      ? { status: 'ok', score: 2, message: 'Aanwezig' }
      : { status: 'missing', score: 0, message: 'Ontbreekt - verplicht voor SEO' },
    canonical: meta.canonical
      ? { status: 'ok', score: 2, message: 'Aanwezig' }
      : { status: 'warning', score: 1, message: 'Ontbreekt - duplicate content risico' },
    ogTags: meta.og.title && meta.og.description && meta.og.image
      ? { status: 'ok', score: 2, message: 'Title, description en afbeelding aanwezig' }
      : { status: 'warning', score: 1, message: 'Onvolledig - social preview werkt niet optimaal' },
    schema: meta.hasSchema
      ? { status: 'ok', score: 2, message: 'Schema markup gevonden' }
      : { status: 'warning', score: 1, message: 'Geen schema markup - rich snippets missen' },
    headings: meta.h2s.length > 0
      ? { status: 'ok', score: 2, message: `${meta.h2s.length} H2-titels gevonden` }
      : { status: 'warning', score: 1, message: 'Geen H2-titels - slechte structuur voor Google' },
    images: meta.imgsWithoutAlt === 0
      ? { status: 'ok', score: 2, message: `Alle ${meta.totalImgs} afbeeldingen hebben alt-tekst` }
      : { status: 'warning', score: 1, message: `${meta.imgsWithoutAlt}/${meta.totalImgs} afbeeldingen missen alt-tekst` },
  }

  const maxScore = Object.keys(checks).length * 2
  const totalScore = Object.values(checks).reduce((sum, check) => sum + check.score, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)
  const grade = percentage >= 85 ? 'A' : percentage >= 70 ? 'B' : percentage >= 55 ? 'C' : percentage >= 40 ? 'D' : 'F'

  return jsonResponse(
    {
      url: cleanUrl,
      scannedAt: new Date().toISOString(),
      score: { points: totalScore, max: maxScore, percentage, grade },
      meta: {
        title: meta.title,
        description: meta.description,
        h1: meta.h1,
        canonical: meta.canonical,
        h2s: meta.h2s,
        og: meta.og,
      },
      checks,
    },
    { status: 200, headers }
  )
}
