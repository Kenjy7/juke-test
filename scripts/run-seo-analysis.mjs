/**
 * JukeCoding — SEO Analyse (manueel)
 * ─────────────────────────────────────────────────────────────────────
 * Gebruik: node --env-file=.env scripts/run-seo-analysis.mjs
 *
 * Voert dezelfde analyse uit als de maandelijkse Netlify function
 * maar direct vanuit je terminal. Resultaat verschijnt in Discord.
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
  { url: `${SITE_URL}/webdesign-genk`, name: 'Webdesign Genk' },
]

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

function extractMeta(html) {
  if (!html) return { title: null, description: null, h1: null, canonical: null, h2s: [] }
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null
  const description =
    html.match(/name=["']description["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1]?.trim() ||
    null
  const h1 =
    html
      .match(/<h1[^>]*>([^<]*)<\/h1>/i)?.[1]
      ?.replace(/<[^>]*>/g, '')
      .trim() || null
  const canonical =
    html.match(/rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/href=["']([^"']*)["'][^>]*rel=["']canonical["']/i)?.[1]?.trim() ||
    null
  const h2matches = [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)]
  const h2s = h2matches
    .map((m) => m[1].replace(/<[^>]*>/g, '').trim())
    .filter(Boolean)
    .slice(0, 5)
  return { title, description, h1, canonical, h2s }
}

function auditPage({ name, url }, meta) {
  const issues = []
  const good = []
  if (!meta.title) issues.push('❌ Geen title tag')
  else if (meta.title.length > 60) issues.push(`⚠️ Title te lang (${meta.title.length} tekens)`)
  else if (meta.title.length < 30) issues.push(`⚠️ Title te kort (${meta.title.length} tekens)`)
  else good.push('✅ Title OK')

  if (!meta.description) issues.push('❌ Geen meta description')
  else if (meta.description.length > 160)
    issues.push(`⚠️ Description te lang (${meta.description.length} tekens)`)
  else if (meta.description.length < 80)
    issues.push(`⚠️ Description te kort (${meta.description.length} tekens)`)
  else good.push('✅ Meta description OK')

  if (!meta.h1) issues.push('❌ Geen H1')
  else good.push('✅ H1 aanwezig')

  if (!meta.canonical) issues.push('⚠️ Geen canonical')
  else good.push('✅ Canonical aanwezig')

  return { name, url, issues, good, meta }
}

async function analyzeWithClaude({ pageAudits, competitorData, apiKey }) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })

  const auditSummary = pageAudits
    .map(
      (p) =>
        `Pagina: ${p.name}\n- Title: ${p.meta.title || 'ONTBREEKT'} (${p.meta.title?.length || 0} tekens)\n- Description: ${p.meta.description?.substring(0, 80) || 'ONTBREEKT'}\n- H1: ${p.meta.h1 || 'ONTBREEKT'}\n- Issues: ${p.issues.join(', ') || 'geen'}`,
    )
    .join('\n\n')

  const competitorSummary = competitorData
    .map(
      (c) =>
        `${c.url}\n- Title: ${c.meta.title || 'onbekend'}\n- H1: ${c.meta.h1 || 'onbekend'}\n- H2s: ${c.meta.h2s.join(' | ') || 'onbekend'}`,
    )
    .join('\n\n')

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Je bent een SEO-expert voor JukeCoding (Belgisch webbureau, custom websites + AI-automatisering voor KMO's, Hasselt).

ON-PAGE AUDIT:
${auditSummary}

CONCURRENTEN:
${competitorSummary}

Geef een SEO-analyse in het Nederlands met deze 4 secties:

**1. KEYWORD KANSEN**
5-7 concrete zoekwoorden die JukeCoding nog onvoldoende target. Per keyword: zoekwoord + waarom kans + aanbevolen actie.

**2. ON-PAGE PRIORITEITEN**
De 3 meest impactvolle verbeteringen. Geef exacte tekst voor title/description waar nodig.

**3. CONCURRENTIE-INZICHTEN**
Wat doen concurrenten goed? Waar heeft JukeCoding een voordeel?

**4. TOP 5 ACTIES DEZE MAAND**
5 concrete acties gerangschikt op impact, elk max 1 zin.`,
      },
    ],
  })
  return message.content[0].text
}

async function sendToDiscord(webhookUrl, analysis, pageAudits) {
  const totalIssues = pageAudits.reduce((s, p) => s + p.issues.length, 0)
  const month = new Date().toLocaleString('nl-BE', { month: 'long', year: 'numeric' })
  const issueLines = pageAudits
    .filter((p) => p.issues.length > 0)
    .map((p) => `**${p.name}:** ${p.issues.join(' · ')}`)
    .join('\n')
    .substring(0, 800)

  const sections = analysis.split(/\*\*\d+\./)
  const payload = {
    username: 'JukeCoding SEO Bot',
    embeds: [
      {
        title: `📊 SEO Rapport — ${month}`,
        description: `${totalIssues} issues gevonden op jukecoding.be`,
        color: totalIssues > 5 ? 0xff4444 : totalIssues > 2 ? 0xffaa00 : 0x00cc66,
        timestamp: new Date().toISOString(),
      },
      {
        title: '📋 On-Page Issues',
        description: issueLines || '✅ Geen kritische issues!',
        color: 0x5865f2,
      },
      {
        title: '🔍 Keyword Kansen',
        description: `**KEYWORD KANSEN**${sections[1] || ''}`.substring(0, 1024),
        color: 0x57f287,
      },
      {
        title: '🥊 Concurrentie-inzichten',
        description: `**CONCURRENTIE**${sections[3] || ''}`.substring(0, 1024),
        color: 0xfee75c,
      },
      {
        title: '✅ Top 5 Acties',
        description: `**ACTIES**${sections[4] || ''}`.substring(0, 1024),
        color: 0xeb459e,
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

async function main() {
  const { ANTHROPIC_API_KEY, DISCORD_SEO_WEBHOOK_URL, DISCORD_WEBHOOK_URL } = process.env
  const webhookUrl = DISCORD_SEO_WEBHOOK_URL || DISCORD_WEBHOOK_URL

  if (!ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY ontbreekt in .env')
    process.exit(1)
  }
  if (!webhookUrl) {
    console.error('❌ DISCORD_WEBHOOK_URL ontbreekt in .env')
    process.exit(1)
  }

  console.log('🚀 JukeCoding SEO Analyse gestart...\n')

  console.log("📋 Pagina's ophalen en auditen...")
  const pageAudits = await Promise.all(
    PAGES_TO_AUDIT.map(async (page) => {
      process.stdout.write(`   → ${page.name}... `)
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      const result = auditPage(page, meta)
      console.log(result.issues.length === 0 ? '✅' : `⚠️ ${result.issues.length} issues`)
      return result
    }),
  )

  console.log('\n🥊 Concurrenten ophalen...')
  const competitorData = await Promise.all(
    COMPETITORS.map(async (url) => {
      process.stdout.write(`   → ${url}... `)
      const html = await fetchPage(url)
      const meta = extractMeta(html)
      console.log(meta.title ? '✅' : '⚠️ geen data')
      return { url, meta }
    }),
  )

  console.log('\n🤖 Claude analyseert alles...')
  const analysis = await analyzeWithClaude({
    pageAudits,
    competitorData,
    apiKey: ANTHROPIC_API_KEY,
  })

  console.log('\n📨 Rapport versturen naar Discord...')
  const sent = await sendToDiscord(webhookUrl, analysis, pageAudits)

  if (sent) {
    console.log('\n✅ SEO rapport staat in je Discord!')
    const totalIssues = pageAudits.reduce((s, p) => s + p.issues.length, 0)
    console.log(`   ${totalIssues} issues gevonden over ${pageAudits.length} pagina's`)
  } else {
    console.error('\n❌ Discord webhook mislukt — controleer DISCORD_WEBHOOK_URL in .env')
  }
}

main()
