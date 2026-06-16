/**
 * JukeCoding — Maandelijkse SEO Analyzer
 * ─────────────────────────────────────────────────────────────────────
 * Draait automatisch op de 5e van elke maand om 08:00.
 * Voert 4 analyses uit en stuurt een volledig rapport naar Discord:
 *
 *  1. 🔍 Keyword research — nieuwe kansen in de Belgische markt
 *  2. 📋 On-page audit    — title tags, meta, H1, canonical per pagina
 *  3. 🥊 Concurrenten     — wat doen imaxx.be, kmodesign.be, kreatix.be
 *  4. ✅ Acties           — top 5 concrete stappen voor deze maand
 *
 * Netlify env vars vereist:
 *   ANTHROPIC_API_KEY     — Claude API key
 *   DISCORD_WEBHOOK_URL   — Discord webhook (al ingesteld)
 * ─────────────────────────────────────────────────────────────────────
 */

const SITE_URL = 'https://jukecoding.be'
const COMPETITORS = ['https://www.imaxx.be', 'https://kmodesign.be', 'https://kreatix.be']

const PAGES_TO_AUDIT = [
  { url: `${SITE_URL}/`, name: 'Homepage' },
  { url: `${SITE_URL}/webdesign`, name: 'Webdesign' },
  { url: `${SITE_URL}/ai-automatisatie`, name: 'AI Automatisatie' },
  { url: `${SITE_URL}/blog`, name: 'Blog' },
  { url: `${SITE_URL}/webdesign-hasselt`, name: 'Webdesign Hasselt' },
]

// ── HTML ophalen ───────────────────────────────────────────────────────
async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'JukeCoding-SEO-Bot/1.0' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

// ── Meta tags uit HTML halen ───────────────────────────────────────────
function extractMeta(html) {
  if (!html) return { title: null, description: null, h1: null, canonical: null, h2s: [] }

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null
  const description = html.match(/name=["']description["'][^>]*content=["']([^"']*)/i)?.[1]?.trim()
    || html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1]?.trim()
    || null
  const h1 = html.match(/<h1[^>]*>([^<]*)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g, '').trim() || null
  const canonical = html.match(/rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1]?.trim()
    || html.match(/href=["']([^"']*)["'][^>]*rel=["']canonical["']/i)?.[1]?.trim()
    || null
  const h2matches = [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)]
  const h2s = h2matches.map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean).slice(0, 5)

  return { title, description, h1, canonical, h2s }
}

// ── On-page audit ──────────────────────────────────────────────────────
function auditPage({ name, url }, meta) {
  const issues = []
  const good = []

  // Title
  if (!meta.title) {
    issues.push('❌ Geen title tag')
  } else if (meta.title.length > 60) {
    issues.push(`⚠️ Title te lang (${meta.title.length} tekens, max 60)`)
  } else if (meta.title.length < 30) {
    issues.push(`⚠️ Title te kort (${meta.title.length} tekens, min 30)`)
  } else {
    good.push('✅ Title OK')
  }

  // Description
  if (!meta.description) {
    issues.push('❌ Geen meta description')
  } else if (meta.description.length > 160) {
    issues.push(`⚠️ Description te lang (${meta.description.length} tekens, max 160)`)
  } else if (meta.description.length < 80) {
    issues.push(`⚠️ Description te kort (${meta.description.length} tekens)`)
  } else {
    good.push('✅ Meta description OK')
  }

  // H1
  if (!meta.h1) {
    issues.push('❌ Geen H1 gevonden')
  } else {
    good.push('✅ H1 aanwezig')
  }

  // Canonical
  if (!meta.canonical) {
    issues.push('⚠️ Geen canonical tag')
  } else {
    good.push('✅ Canonical aanwezig')
  }

  return { name, url, issues, good, meta }
}

// ── Claude analyse ─────────────────────────────────────────────────────
async function analyzeWithClaude({ pageAudits, competitorData, apiKey }) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })

  const auditSummary = pageAudits.map(p => `
Pagina: ${p.name} (${p.url})
- Title: ${p.meta.title || 'ONTBREEKT'} (${p.meta.title?.length || 0} tekens)
- Description: ${p.meta.description ? p.meta.description.substring(0, 80) + '...' : 'ONTBREEKT'}
- H1: ${p.meta.h1 || 'ONTBREEKT'}
- Issues: ${p.issues.join(', ') || 'geen'}
`).join('\n')

  const competitorSummary = competitorData.map(c => `
Concurrent: ${c.url}
- Title homepage: ${c.meta.title || 'onbekend'}
- H1: ${c.meta.h1 || 'onbekend'}
- H2s: ${c.meta.h2s.join(' | ') || 'onbekend'}
`).join('\n')

  const prompt = `Je bent een SEO-expert voor JukeCoding, een Belgisch webbureau (custom websites + AI-automatisering voor KMO's, gevestigd in Hasselt).

Hier zijn de on-page audit resultaten van jukecoding.be:
${auditSummary}

Hier zijn de competitor gegevens:
${competitorSummary}

Geef een SEO-analyse in het Nederlands met deze 4 secties:

**1. KEYWORD KANSEN**
Geef 5-7 concrete zoekwoorden die JukeCoding nog niet of onvoldoende target, maar waar potentiële klanten wel op zoeken. Focus op Belgische KMO-markt. Geef per keyword: zoekwoord + waarom kans + aanbevolen pagina of blogpost.

**2. ON-PAGE PRIORITEITEN**
Geef de 3 meest impactvolle on-page verbeteringen op basis van de audit. Wees concreet: geef de exacte nieuwe tekst voor title tags en meta descriptions waar nodig.

**3. CONCURRENTIE-INZICHTEN**
Vergelijk JukeCoding met de concurrenten. Wat doen zij goed in SEO? Waar heeft JukeCoding een voordeel of kans?

**4. TOP 5 ACTIES DEZE MAAND**
Geef 5 concrete, uitvoerbare acties gerangschikt op impact. Elke actie max 1 zin, begint met een werkwoord.

Wees direct en specifiek — geen vage adviezen.`

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  return message.content[0].text
}

// ── Discord bericht sturen ─────────────────────────────────────────────
async function sendToDiscord(webhookUrl, analysis, pageAudits, month) {
  const totalIssues = pageAudits.reduce((sum, p) => sum + p.issues.length, 0)
  const totalGood = pageAudits.reduce((sum, p) => sum + p.good.length, 0)

  // Splits de analyse in secties voor Discord
  const sections = analysis.split(/\*\*\d+\./)
  const keywordSection = sections[1]?.substring(0, 900) || ''
  const onPageSection = sections[2]?.substring(0, 900) || ''
  const competitorSection = sections[3]?.substring(0, 900) || ''
  const actionsSection = sections[4]?.substring(0, 900) || ''

  const issueLines = pageAudits
    .filter(p => p.issues.length > 0)
    .map(p => `**${p.name}:** ${p.issues.join(' · ')}`)
    .join('\n')
    .substring(0, 800)

  const payload = {
    username: 'JukeCoding SEO Bot',
    avatar_url: 'https://jukecoding.be/favicon-512x512.png',
    embeds: [
      {
        title: `📊 Maandelijks SEO Rapport — ${month}`,
        description: `Automatische analyse van **jukecoding.be** · ${totalIssues} issues gevonden · ${totalGood} checks geslaagd`,
        color: totalIssues > 5 ? 0xFF4444 : totalIssues > 2 ? 0xFFAA00 : 0x00CC66,
        timestamp: new Date().toISOString(),
        footer: { text: 'JukeCoding SEO Automation · jukecoding.be' },
      },
      {
        title: '📋 On-Page Issues',
        description: issueLines || '✅ Geen kritische issues gevonden!',
        color: 0x5865F2,
      },
      {
        title: '🔍 Keyword Kansen',
        description: `**KEYWORD KANSEN**${keywordSection}`.substring(0, 1024),
        color: 0x57F287,
      },
      {
        title: '🥊 Concurrentie-inzichten',
        description: `**CONCURRENTIE-INZICHTEN**${competitorSection}`.substring(0, 1024),
        color: 0xFEE75C,
      },
      {
        title: '✅ Top 5 Acties Deze Maand',
        description: `**TOP 5 ACTIES DEZE MAAND**${actionsSection}`.substring(0, 1024),
        color: 0xEB459E,
      },
    ],
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return res.ok
}

// ── Main handler ───────────────────────────────────────────────────────
export default async function handler(req) {
  const { ANTHROPIC_API_KEY, DISCORD_SEO_WEBHOOK_URL, DISCORD_WEBHOOK_URL } = process.env
  const webhookUrl = DISCORD_SEO_WEBHOOK_URL || DISCORD_WEBHOOK_URL

  if (!ANTHROPIC_API_KEY) return new Response('ANTHROPIC_API_KEY ontbreekt', { status: 500 })
  if (!webhookUrl) return new Response('DISCORD_WEBHOOK_URL ontbreekt', { status: 500 })

  const month = new Date().toLocaleString('nl-BE', { month: 'long', year: 'numeric' })
  console.log(`🚀 SEO analyse gestart voor ${month}`)

  // 1. Pagina's ophalen en auditen
  console.log('📋 Pagina\'s auditen...')
  const pageAudits = await Promise.all(
    PAGES_TO_AUDIT.map(async (page) => {
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      return auditPage(page, meta)
    })
  )

  // 2. Concurrent data ophalen
  console.log('🥊 Concurrenten analyseren...')
  const competitorData = await Promise.all(
    COMPETITORS.map(async (url) => {
      const html = await fetchPage(url)
      const meta = extractMeta(html)
      return { url, meta }
    })
  )

  // 3. Claude analyse
  console.log('🤖 Claude analyseert...')
  const analysis = await analyzeWithClaude({ pageAudits, competitorData, apiKey: ANTHROPIC_API_KEY })

  // 4. Stuur naar Discord
  console.log('📨 Rapport naar Discord sturen...')
  const sent = await sendToDiscord(webhookUrl, analysis, pageAudits, month)

  if (!sent) {
    console.error('❌ Discord melding mislukt')
    return new Response('Discord melding mislukt', { status: 500 })
  }

  console.log('✅ SEO rapport verstuurd naar Discord!')
  return new Response(JSON.stringify({ success: true, month, issues: pageAudits.reduce((s, p) => s + p.issues.length, 0) }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

// Netlify scheduled trigger: 5e van elke maand om 08:00
export const config = {
  schedule: '0 8 5 * *',
}
