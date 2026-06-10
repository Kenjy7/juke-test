/**
 * JukeCoding — Discord SEO Worker
 * ─────────────────────────────────────────────────────────────────────
 * Wordt getriggerd door discord-bot.mjs.
 * Voert de analyse uit en stuurt het resultaat terug naar Discord
 * via de interaction followup webhook.
 *
 * Acties:
 *   analyse    — volledige SEO-audit met kant-en-klare teksten
 *   competitor — analyse van één concurrent
 *   blog       — blogpost draft genereren
 * ─────────────────────────────────────────────────────────────────────
 */

import crypto from 'node:crypto'
import { isPublicHttpUrl } from '../lib/request-guard.mjs'

const DEFAULT_SITE_URL = 'https://jukecoding.be'

// Constant-time string compare for the internal shared secret.
function timingSafeEqualStr(a, b) {
  const ab = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

const DEFAULT_PAGES = [
  '/webdesign',
  '/ai-automatisatie',
  '/blog',
  '/webdesign-hasselt',
]

// Bouw paginalijst: voor jukecoding.be kennen we de routes,
// voor klantensites crawlen we enkel de homepage + wat we vinden via nav-links
function buildPageList(rawUrl) {
  const base = rawUrl
    ? (rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).replace(/\/$/, '')
    : DEFAULT_SITE_URL

  const isJuke = base.includes('jukecoding.be')
  if (isJuke) {
    return [
      { url: `${base}/`, name: 'Homepage' },
      ...DEFAULT_PAGES.map(p => ({ url: `${base}${p}`, name: p.replace('/', '').replace(/-/g, ' ') })),
    ]
  }
  // Voor klantensites: homepage + probeer /diensten /over /contact
  return [
    { url: `${base}/`, name: 'Homepage' },
    { url: `${base}/diensten`, name: 'Diensten' },
    { url: `${base}/over`, name: 'Over ons' },
    { url: `${base}/contact`, name: 'Contact' },
  ]
}

// ── Helpers ───────────────────────────────────────────────────────────
async function fetchPage(url) {
  // SSRF guard: only fetch public http(s) targets.
  if (!isPublicHttpUrl(url)) return null
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'JukeCoding-SEO-Bot/1.0' },
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    })
    return res.ok ? await res.text() : null
  } catch { return null }
}

function extractMeta(html) {
  if (!html) return {
    title: null, description: null, h1: null, canonical: null, h2s: [], h3s: [],
    ogTitle: null, ogDesc: null, ogImage: null, schemas: [],
    imagesTotal: 0, imagesWithAlt: 0, wordCount: 0,
    robots: null, viewport: null, lang: null, hasFaqSchema: false,
  }
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null
  const description =
    html.match(/name=["']description["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1]?.trim() || null
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]*>/g, '').trim() || null
  const canonical =
    html.match(/rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/href=["']([^"']*)["'][^>]*rel=["']canonical["']/i)?.[1]?.trim() || null
  const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)]
    .map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean).slice(0, 8)
  const h3s = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gis)]
    .map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean).slice(0, 8)

  // OG tags
  const ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*property=["']og:title["']/i)?.[1]?.trim() || null
  const ogDesc = html.match(/property=["']og:description["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*property=["']og:description["']/i)?.[1]?.trim() || null
  const ogImage = html.match(/property=["']og:image["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*property=["']og:image["']/i)?.[1]?.trim() || null

  // Schema / JSON-LD
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map(m => { try { return JSON.parse(m[1]) } catch { return null } }).filter(Boolean)

  // Images
  const images = [...html.matchAll(/<img[^>]*>/gi)]
  const imagesTotal = images.length
  const imagesWithAlt = images.filter(m => /alt=["'][^"']+["']/i.test(m[0])).length

  // Word count (tekst zonder scripts/styles/tags)
  const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = textContent ? textContent.split(/\s+/).length : 0

  // Robots, viewport, lang
  const robots = html.match(/name=["']robots["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() || null
  const viewport = html.match(/name=["']viewport["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() || null
  const lang = html.match(/<html[^>]*lang=["']([^"']*)/i)?.[1]?.trim() || null

  // FAQ detectie
  const hasFaqSchema = schemas.some(s =>
    s['@type'] === 'FAQPage' ||
    (Array.isArray(s['@graph']) && s['@graph'].some(g => g['@type'] === 'FAQPage'))
  )

  return {
    title, description, h1, canonical, h2s, h3s,
    ogTitle, ogDesc, ogImage, schemas,
    imagesTotal, imagesWithAlt, wordCount,
    robots, viewport, lang, hasFaqSchema,
  }
}

function checkLength(text, min, max) {
  if (!text) return 'ontbreekt'
  if (text.length < min) return `te kort (${text.length}/${min})`
  if (text.length > max) return `te lang (${text.length}/${max})`
  return 'ok'
}

// ── Discord followup sturen ────────────────────────────────────────────
async function sendFollowup(applicationId, interactionToken, payload) {
  const url = `https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('Discord followup fout:', err)
  }
}

// ── Claude API ─────────────────────────────────────────────────────────
async function askClaude(prompt, apiKey, maxTokens = 1500) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })
  return msg.content[0].text
}

// ── ACTIE: Instant technische check (geen AI) ─────────────────────────
async function runQuickCheck({ interactionToken, applicationId, siteUrl }) {
  const pages = buildPageList(siteUrl)
  const displayUrl = siteUrl ? (siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`) : DEFAULT_SITE_URL
  const pageData = await Promise.all(
    pages.map(async (page) => {
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      return { ...page, meta, loaded: !!html }
    })
  )

  const statusIcon = (text, min, max) => {
    if (!text) return '❌'
    if (text.length < min || text.length > max) return '⚠️'
    return '✅'
  }

  const rows = pageData.map(p => {
    const t = statusIcon(p.meta.title, 30, 60)
    const d = statusIcon(p.meta.description, 80, 160)
    const h = p.meta.h1 ? '✅' : '❌'
    const c = p.meta.canonical ? '✅' : '❌'
    const issues = [t, d, h, c].filter(x => x !== '✅').length
    return { name: p.name, t, d, h, c, issues, title: p.meta.title, desc: p.meta.description }
  })

  const totalIssues = rows.reduce((s, r) => s + r.issues, 0)
  // Filter pagina's die 404 gaven (niet geladen + geen enkele meta)
  const loadedRows = rows.filter(r => pageData.find(p => p.name === r.name)?.loaded !== false || r.issues < 4)
  const color = totalIssues > 6 ? 0xFF4444 : totalIssues > 3 ? 0xFFAA00 : 0x57F287
  const scoreEmoji = totalIssues === 0 ? '🟢' : totalIssues <= 3 ? '🟡' : '🔴'

  const tableLines = loadedRows.map(r =>
    `**${r.name}** — Title ${r.t} · Desc ${r.d} · H1 ${r.h} · Canonical ${r.c}` +
    (r.issues > 0 ? `\n  ${r.issues} punt(en) te fixen` : '')
  ).join('\n')

  const problemDetails = loadedRows
    .filter(r => r.issues > 0)
    .map(r => {
      const lines = []
      if (r.t !== '✅') lines.push(`• Title ${r.t}: "${r.title || 'ontbreekt'}" (huidig: ${r.title?.length ?? 0} tekens, moet 30-60 zijn)`)
      if (r.d !== '✅') lines.push(`• Description ${r.d}: ${r.desc ? `${r.desc.length} tekens (moet 80-160 zijn)` : 'ontbreekt'}`)
      return `**${r.name}**\n${lines.join('\n')}`
    }).join('\n\n')

  await sendFollowup(applicationId, interactionToken, {
    embeds: [
      {
        title: `${scoreEmoji} Technische SEO Check — ${displayUrl.replace('https://', '')}`,
        description: `**${totalIssues} probleem${totalIssues !== 1 ? 'en' : ''}** gevonden · ${new Date().toLocaleDateString('nl-BE')}\n\n${tableLines}`,
        color,
        footer: { text: 'Gebruik /seo analyse voor een volledige AI-analyse met aanbevelingen' },
      },
      ...(problemDetails ? [{
        title: '🔧 Wat er moet worden aangepast',
        description: problemDetails.substring(0, 2000),
        color: 0x5865F2,
      }] : []),
    ],
  })
}

// ── ACTIE: Volledige SEO analyse ───────────────────────────────────────
async function runFullAnalysis({ interactionToken, applicationId, apiKey, siteUrl }) {
  const pages = buildPageList(siteUrl)
  const displayUrl = siteUrl ? (siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`) : DEFAULT_SITE_URL
  const isJuke = displayUrl.includes('jukecoding.be')

  // 1. Pagina's ophalen
  const pageData = await Promise.all(
    pages.map(async (page) => {
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      return { ...page, meta, loaded: !!html }
    })
  )

  // 2. Concurrent data
  const competitors = ['https://www.imaxx.be', 'https://kmodesign.be']
  const competitorData = await Promise.all(
    competitors.map(async (url) => {
      const html = await fetchPage(url)
      return { url, meta: extractMeta(html) }
    })
  )

  // 3. Claude analyse met gestructureerde output
  const auditText = pageData.map(p =>
    `${p.name} (${p.url})\n` +
    `  Title: "${p.meta.title || ''}" → ${checkLength(p.meta.title, 30, 60)}\n` +
    `  Description: "${p.meta.description?.substring(0, 80) || ''}" → ${checkLength(p.meta.description, 80, 160)}\n` +
    `  H1: "${p.meta.h1 || 'ONTBREEKT'}"\n` +
    `  H2s: ${p.meta.h2s.join(' | ') || 'geen'}\n` +
    `  Canonical: ${p.meta.canonical || 'ONTBREEKT'}`
  ).join('\n\n')

  const competitorText = competitorData.map(c =>
    `${c.url}: title="${c.meta.title || '?'}" h1="${c.meta.h1 || '?'}" h2s="${c.meta.h2s.slice(0,3).join(' | ') || '?'}"`
  ).join('\n')

  const siteContext = isJuke
    ? 'JukeCoding (Belgisch webbureau, custom websites + AI-automatisering voor KMO\'s, Hasselt)'
    : `klantsite van JukeCoding (${displayUrl})`

  const analysis = await askClaude(`
SEO-expert voor ${siteContext}.

DATA:
${auditText}

CONCURRENTEN:
${competitorText}

Antwoord KORT en CONCREET in het Nederlands. Gebruik EXACT dit formaat (max 3 items per sectie):

### TITELS VERBETEREN
▸ [Paginanaam]: "[nieuwe title max 60 tekens]"

### DESCRIPTIONS VERBETEREN
▸ [Paginanaam]: "[nieuwe description 130-160 tekens + CTA]"

### KEYWORD KANSEN
▸ [zoekwoord] → [actie: pagina/blog/aanpassen]

### CONCURRENTIE-VOORDELEN
▸ [punt]

### TOP 5 ACTIES
1. [actie] — [hoog/medium]
2. [actie] — [hoog/medium]
3. [actie] — [hoog/medium]
4. [actie] — [hoog/medium]
5. [actie] — [hoog/medium]
`, apiKey)

  // 4. Splits analyse in secties
  const sections = {
    titels: analysis.match(/### TITELS VERBETEREN([\s\S]*?)###/)?.[1]?.trim() || 'Geen verbeteringen nodig.',
    descriptions: analysis.match(/### DESCRIPTIONS VERBETEREN([\s\S]*?)###/)?.[1]?.trim() || 'Geen verbeteringen nodig.',
    keywords: analysis.match(/### KEYWORD KANSEN([\s\S]*?)###/)?.[1]?.trim() || '',
    concurrentie: analysis.match(/### CONCURRENTIE-VOORDELEN([\s\S]*?)###/)?.[1]?.trim() || '',
    acties: analysis.match(/### TOP 5 ACTIES([\s\S]*?)$/)?.[1]?.trim() || '',
  }

  const totalIssues = pageData.reduce((sum, p) => {
    let issues = 0
    if (!p.meta.title || p.meta.title.length > 60 || p.meta.title.length < 30) issues++
    if (!p.meta.description || p.meta.description.length > 160 || p.meta.description.length < 80) issues++
    if (!p.meta.h1) issues++
    if (!p.meta.canonical) issues++
    return sum + issues
  }, 0)

  const color = totalIssues > 6 ? 0xFF4444 : totalIssues > 3 ? 0xFFAA00 : 0x57F287

  // 5. Discord embeds sturen
  await sendFollowup(applicationId, interactionToken, {
    embeds: [
      {
        title: `📊 SEO Analyse — ${displayUrl.replace('https://', '')}`,
        description: `**${totalIssues} verbeterpunten** gevonden over ${pageData.length} pagina's · ${new Date().toLocaleDateString('nl-BE')}`,
        color,
        footer: { text: 'JukeCoding SEO Bot · Tip: gebruik /seo help voor alle commands' },
      },
      {
        title: '✏️ Betere Title Tags — kopieer & plak',
        description: sections.titels.substring(0, 1024) || '✅ Alle titles zijn in orde!',
        color: 0x5865F2,
      },
      {
        title: '📝 Betere Meta Descriptions — kopieer & plak',
        description: sections.descriptions.substring(0, 1024) || '✅ Alle descriptions zijn in orde!',
        color: 0x5865F2,
      },
      {
        title: '🔍 Keyword Kansen',
        description: sections.keywords.substring(0, 1024),
        color: 0x57F287,
      },
      {
        title: '🥊 Hoe je de concurrentie verslaat',
        description: sections.concurrentie.substring(0, 1024),
        color: 0xFEE75C,
      },
      {
        title: '✅ Top 5 Acties Deze Maand',
        description: sections.acties.substring(0, 1024),
        color: 0xEB459E,
      },
    ],
  })
}

// ── ACTIE: Concurrent analyseren ──────────────────────────────────────
async function runCompetitorAnalysis({ url, interactionToken, applicationId, apiKey }) {
  const cleanUrl = url.startsWith('http') ? url : `https://${url}`
  const html = await fetchPage(cleanUrl)
  const meta = extractMeta(html)

  if (!html) {
    return sendFollowup(applicationId, interactionToken, {
      content: `❌ Kon **${cleanUrl}** niet bereiken. Controleer de URL.`,
    })
  }

  const analysis = await askClaude(`
Je bent een SEO-expert voor JukeCoding (Belgisch webbureau, Hasselt).

Analyseer deze concurrent en vergelijk met JukeCoding:
URL: ${cleanUrl}
Title: "${meta.title || 'onbekend'}"
H1: "${meta.h1 || 'onbekend'}"
H2s: ${meta.h2s.join(' | ') || 'onbekend'}

JukeCoding doet: custom code websites + AI-automatisering voor Belgische KMO's.

Geef in het Nederlands:
**WAT DOEN ZE GOED IN SEO** (3 punten)
**WAAR HEEFT JUKECODING EEN VOORDEEL** (3 punten)
**WAT KAN JUKECODING OVERNEMEN** (2 concrete ideeën)
`, apiKey, 1000)

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `🥊 Concurrent: ${cleanUrl}`,
      description: analysis.substring(0, 2000),
      color: 0xFEE75C,
      fields: [
        { name: 'Title', value: meta.title || 'niet gevonden', inline: false },
        { name: 'H1', value: meta.h1 || 'niet gevonden', inline: false },
        { name: "H2's", value: meta.h2s.join('\n') || 'niet gevonden', inline: false },
      ],
      footer: { text: `Geanalyseerd op ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── ACTIE: Blog genereren ─────────────────────────────────────────────
async function runBlogGeneration({ topic, interactionToken, applicationId, apiKey }) {
  const post = await askClaude(`
Je bent een SEO-copywriter voor JukeCoding (Belgisch webbureau, custom websites + AI-automatisering voor KMO's, Hasselt).

Schrijf een volledige SEO-blogpost in het Nederlands over: "${topic}"

Geef UITSLUITEND een geldig JSON-object:
{
  "title": "H1 titel",
  "metaTitle": "SEO titel max 60 tekens | JukeCoding",
  "metaDescription": "Meta description 130-160 tekens met CTA",
  "excerpt": "Korte samenvatting max 200 tekens",
  "keywords": ["kw1", "kw2", "kw3"],
  "readingTime": 5,
  "content": "<h2>...</h2><p>...</p>..."
}`, apiKey, 3500)

  let parsed
  try {
    const json = post.match(/\{[\s\S]*\}/)?.[0]
    parsed = JSON.parse(json)
  } catch {
    return sendFollowup(applicationId, interactionToken, {
      content: '❌ Er ging iets mis bij het genereren. Probeer opnieuw.',
    })
  }

  // Post toevoegen aan blogs/index.js via GitHub API
  const { GITHUB_TOKEN, GITHUB_REPO } = process.env
  let prUrl = null

  if (GITHUB_TOKEN && GITHUB_REPO) {
    try {
      const slug = topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').substring(0, 60)

      const apiBase = `https://api.github.com/repos/${GITHUB_REPO}`
      const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      }

      const fileRes = await fetch(`${apiBase}/contents/src/data/blogs/index.js`, { headers })
      const fileData = await fileRes.json()
      const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8')
      const today = new Date().toISOString().slice(0, 10)

      const newPost = `
  {
    slug: '${slug}',
    title: ${JSON.stringify(parsed.title)},
    metaTitle: ${JSON.stringify(parsed.metaTitle)},
    metaDescription: ${JSON.stringify(parsed.metaDescription)},
    excerpt: ${JSON.stringify(parsed.excerpt)},
    publishedAt: '${today}',
    published: false,  // ← Zet op true na review
    category: 'Blog',
    keywords: ${JSON.stringify(parsed.keywords)},
    readingTime: ${parsed.readingTime || 5},
    ogImage: '/og-image.jpg',
    content: ${JSON.stringify(parsed.content)},
  },`

      const insertPoint = currentContent.lastIndexOf(']')
      const updatedContent = currentContent.slice(0, insertPoint) + newPost + '\n' + currentContent.slice(insertPoint)

      const branchName = `blog/discord-${slug}-${today}`
      const mainRes = await fetch(`${apiBase}/git/refs/heads/main`, { headers })
      const mainSha = (await mainRes.json()).object.sha

      await fetch(`${apiBase}/git/refs`, {
        method: 'POST', headers,
        body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
      })

      await fetch(`${apiBase}/contents/src/data/blogs/index.js`, {
        method: 'PUT', headers,
        body: JSON.stringify({
          message: `blog: draft "${parsed.title}"`,
          content: Buffer.from(updatedContent).toString('base64'),
          sha: fileData.sha,
          branch: branchName,
        }),
      })

      const prRes = await fetch(`${apiBase}/pulls`, {
        method: 'POST', headers,
        body: JSON.stringify({
          title: `📝 Blog: ${parsed.title}`,
          head: branchName,
          base: 'main',
          body: `Gegenereerd via Discord /seo blog command.\n\nZet \`published: false\` → \`published: true\` en merge om live te gaan.`,
        }),
      })
      prUrl = (await prRes.json()).html_url
    } catch (err) {
      console.error('GitHub PR fout:', err)
    }
  }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `📝 Blogpost draft: ${parsed.title}`,
      description: parsed.excerpt,
      color: 0x57F287,
      fields: [
        { name: '🔍 SEO Titel', value: `\`${parsed.metaTitle}\``, inline: false },
        { name: '📋 Meta Description', value: `\`${parsed.metaDescription}\``, inline: false },
        { name: '🏷️ Keywords', value: parsed.keywords.join(', '), inline: true },
        { name: '⏱️ Leestijd', value: `${parsed.readingTime} min`, inline: true },
        { name: '📌 Status', value: prUrl ? `[Review & goedkeuren →](${prUrl})` : 'PR aanmaken mislukt — voeg handmatig toe', inline: false },
      ],
      footer: { text: 'Keur de GitHub PR goed om de post live te zetten' },
    }],
  })
}

// ── ACTIE: Uitgebreide agency-scan ────────────────────────────────────
// Werkt stap-voor-stap: elke sectie wordt direct naar Discord gestuurd
// zodat je nooit hoeft te wachten op alles tegelijk.
async function runFullAgencyScan({ interactionToken, applicationId, apiKey, siteUrl }) {
  const pages = buildPageList(siteUrl)
  const displayUrl = siteUrl
    ? (siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`).replace(/\/$/, '')
    : DEFAULT_SITE_URL
  const domain = displayUrl.replace('https://', '').replace('http://', '')

  // ── Stap 1: Technische scan ───────────────────────────────────────────
  const pageData = await Promise.all(
    pages.map(async (page) => {
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      return { ...page, meta, loaded: !!html }
    })
  )
  const loadedPages = pageData.filter(p => p.loaded)

  const techIssues = loadedPages.flatMap(p => {
    const issues = []
    if (!p.meta.title) issues.push({ page: p.name, severity: 'hoog', msg: 'Title tag ontbreekt' })
    else if (p.meta.title.length > 60) issues.push({ page: p.name, severity: 'medium', msg: `Title te lang (${p.meta.title.length}/60)` })
    else if (p.meta.title.length < 30) issues.push({ page: p.name, severity: 'medium', msg: `Title te kort (${p.meta.title.length}/30)` })
    if (!p.meta.description) issues.push({ page: p.name, severity: 'hoog', msg: 'Meta description ontbreekt' })
    else if (p.meta.description.length > 160) issues.push({ page: p.name, severity: 'medium', msg: `Description te lang (${p.meta.description.length}/160)` })
    if (!p.meta.h1) issues.push({ page: p.name, severity: 'hoog', msg: 'H1-titel ontbreekt' })
    if (!p.meta.canonical) issues.push({ page: p.name, severity: 'medium', msg: 'Canonical ontbreekt' })
    return issues
  })
  const hoogIssues = techIssues.filter(i => i.severity === 'hoog')
  const mediumIssues = techIssues.filter(i => i.severity === 'medium')
  const scoreColor = hoogIssues.length > 3 ? 0xFF4444 : hoogIssues.length > 0 ? 0xFFAA00 : 0x57F287
  const scoreEmoji = hoogIssues.length > 3 ? '🔴' : hoogIssues.length > 0 ? '🟡' : '🟢'

  const techLines = [
    ...hoogIssues.map(i => `❌ **${i.page}**: ${i.msg}`),
    ...mediumIssues.map(i => `⚠️ **${i.page}**: ${i.msg}`),
  ]
  const techSummary = techLines.length > 0 ? techLines.join('\n') : '✅ Geen technische fouten gevonden'

  // Stuur meteen de technische scan — dit lost het "thinking..." op
  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `${scoreEmoji} Uitgebreide SEO Scan — ${domain}`,
      description: `**${loadedPages.length} pagina's** gescand · **${hoogIssues.length} kritiek** · **${mediumIssues.length} medium** · ${new Date().toLocaleDateString('nl-BE')}\n\n${techSummary.substring(0, 1800)}`,
      color: scoreColor,
      footer: { text: '📨 Titels & descriptions volgen zo...' },
    }],
  })

  // ── Stap 2: Concurrenten ophalen ──────────────────────────────────────
  const competitors = domain.includes('jukecoding')
    ? ['https://www.imaxx.be', 'https://kmodesign.be', 'https://www.lincelot.com']
    : []
  const competitorData = await Promise.all(
    competitors.map(async (url) => {
      const html = await fetchPage(url)
      return { url, meta: extractMeta(html), loaded: !!html }
    })
  )
  const competitorText = competitorData.filter(c => c.loaded).map(c =>
    `${c.url}: title="${c.meta.title || '?'}" h1="${c.meta.h1 || '?'}" h2s="${c.meta.h2s.slice(0, 2).join(' | ') || '?'}"`
  ).join('\n')

  const auditText = loadedPages.map(p =>
    `${p.name}: title="${p.meta.title || 'ONTBREEKT'}"(${p.meta.title?.length ?? 0}) desc="${p.meta.description?.substring(0, 60) || 'ONTBREEKT'}"(${p.meta.description?.length ?? 0}) h1="${p.meta.h1 || 'ONTBREEKT'}" canonical=${p.meta.canonical ? '✓' : '✗'}`
  ).join('\n')

  // ── Stap 3: Titels & descriptions (aparte Claude call) ────────────────
  let titlesResult = '⚠️ Analyse tijdelijk niet beschikbaar.'
  try {
    titlesResult = await askClaude(`
SEO-expert. Website: ${displayUrl}.
DATA:\n${auditText}

Geef voor elke pagina met een probleem een verbeterde titel en description.
Formaat:
▸ [Paginanaam]
  Title: "[max 60 tekens, keyword vooraan]"
  Description: "[130-160 tekens, eindig met een CTA]"

Alleen pagina's die verbetering nodig hebben. Concreet, geen uitleg.`, apiKey, 1200)
  } catch (e) {
    console.error('Titels analyse fout:', e.message)
  }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '✏️ Verbeterde Titels & Descriptions',
      description: titlesResult.substring(0, 2000),
      color: 0x5865F2,
      footer: { text: '🔍 Keyword analyse volgt...' },
    }],
  })

  // ── Stap 4: Keywords & strategie (aparte Claude call) ─────────────────
  let strategyResult = '⚠️ Strategie tijdelijk niet beschikbaar.'
  try {
    strategyResult = await askClaude(`
SEO-strateeg voor ${domain}. ${hoogIssues.length} kritieke fouten, ${mediumIssues.length} verbeterpunten.
${competitorText ? `Concurrenten:\n${competitorText}\n` : ''}
Pagina's: ${loadedPages.map(p => `${p.name}(h1="${p.meta.h1||'?'}")`).join(', ')}

Geef in het Nederlands:
### KEYWORD KANSEN (8 stuks)
▸ [zoekwoord] | volume: [laag/medium/hoog] | actie: [pagina/blog/aanpassen X]

### PRIORITEIT ACTIES DEZE WEEK
1. [actie] — waarom: [reden]
2. [actie] — waarom: [reden]
3. [actie] — waarom: [reden]

### VOLGENDE MAAND
1. [strategische actie]
2. [strategische actie]

${competitorText ? '### CONCURRENTIEVOORDELEN\n▸ [punt]\n▸ [punt]\n▸ [punt]' : ''}

Kort en concreet. Geen vage adviezen.`, apiKey, 1200)
  } catch (e) {
    console.error('Strategie analyse fout:', e.message)
  }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '🔍 Keywords & Actieplan',
      description: strategyResult.substring(0, 2000),
      color: 0xEB459E,
      footer: { text: 'JukeCoding Agency SEO Scan — /seo full' },
    }],
  })
}

// ── Helpers voor uitgebreide analyses ──────────────────────────────────
function buildPageSummary(loadedPages) {
  return loadedPages.map(p =>
    `${p.name} (${p.url})\n` +
    `  Title: "${p.meta.title || 'ONTBREEKT'}" (${p.meta.title?.length ?? 0} tekens)\n` +
    `  Description: "${p.meta.description?.substring(0, 80) || 'ONTBREEKT'}…" (${p.meta.description?.length ?? 0} tekens)\n` +
    `  H1: "${p.meta.h1 || 'ONTBREEKT'}"\n` +
    `  H2s: ${p.meta.h2s.join(' | ') || 'geen'}\n` +
    `  H3s: ${p.meta.h3s.join(' | ') || 'geen'}\n` +
    `  Canonical: ${p.meta.canonical || 'ONTBREEKT'}\n` +
    `  OG: title=${p.meta.ogTitle ? '✓' : '✗'} desc=${p.meta.ogDesc ? '✓' : '✗'} img=${p.meta.ogImage ? '✓' : '✗'}\n` +
    `  Schema: ${p.meta.schemas.length} JSON-LD blok(ken)\n` +
    `  Afbeeldingen: ${p.meta.imagesWithAlt}/${p.meta.imagesTotal} met alt-tekst\n` +
    `  Woorden: ${p.meta.wordCount} | Lang: ${p.meta.lang || '✗'} | Viewport: ${p.meta.viewport ? '✓' : '✗'}\n` +
    `  Robots: ${p.meta.robots || 'niet ingesteld'} | FAQ schema: ${p.meta.hasFaqSchema ? '✓' : '✗'}`
  ).join('\n\n')
}

function resolveUrl(siteUrl) {
  return siteUrl
    ? (siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`).replace(/\/$/, '')
    : DEFAULT_SITE_URL
}

function resolveDomain(displayUrl) {
  return displayUrl.replace('https://', '').replace('http://', '')
}

function siteContext(domain) {
  return domain.includes('jukecoding')
    ? 'JukeCoding (Belgisch webbureau, custom websites + AI-automatisering voor KMO\'s, regio Hasselt/Limburg)'
    : `klantsite (${domain})`
}

async function fetchAllPages(siteUrl) {
  const pages = buildPageList(siteUrl)
  const pageData = await Promise.all(
    pages.map(async (page) => {
      const html = await fetchPage(page.url)
      const meta = extractMeta(html)
      return { ...page, meta, loaded: !!html }
    })
  )
  return { pageData, loadedPages: pageData.filter(p => p.loaded) }
}

async function fetchCompetitorData(domain) {
  const urls = domain.includes('jukecoding')
    ? ['https://www.imaxx.be', 'https://kmodesign.be', 'https://www.lincelot.com']
    : []
  if (urls.length === 0) return { data: [], text: '' }
  const data = await Promise.all(
    urls.map(async (url) => {
      const html = await fetchPage(url)
      return { url, meta: extractMeta(html), loaded: !!html }
    })
  )
  const loaded = data.filter(c => c.loaded)
  const text = loaded.map(c =>
    `${c.url}: title="${c.meta.title || '?'}" h1="${c.meta.h1 || '?'}" h2s="${c.meta.h2s.slice(0, 3).join(' | ') || '?'}" woorden=${c.meta.wordCount}`
  ).join('\n')
  return { data: loaded, text }
}

// ── ACTIE: Deep Scan — volledige 10-sectie analyse ───────────────────
async function runDeepScan({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)

  // ── Stap 1: Pagina's & concurrenten ophalen ─────────────────────────
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)
  const { data: compData, text: competitorText } = await fetchCompetitorData(domain)

  // Technische issues tellen
  const techIssues = loadedPages.flatMap(p => {
    const issues = []
    if (!p.meta.title) issues.push(`❌ **${p.name}**: Title ontbreekt`)
    else if (p.meta.title.length > 60 || p.meta.title.length < 30) issues.push(`⚠️ **${p.name}**: Title ${p.meta.title.length} tekens (moet 30-60)`)
    if (!p.meta.description) issues.push(`❌ **${p.name}**: Description ontbreekt`)
    else if (p.meta.description.length > 160 || p.meta.description.length < 80) issues.push(`⚠️ **${p.name}**: Description ${p.meta.description.length} tekens (moet 80-160)`)
    if (!p.meta.h1) issues.push(`❌ **${p.name}**: H1 ontbreekt`)
    if (!p.meta.canonical) issues.push(`⚠️ **${p.name}**: Canonical ontbreekt`)
    if (p.meta.schemas.length === 0) issues.push(`⚠️ **${p.name}**: Geen structured data`)
    if (p.meta.imagesTotal > 0 && p.meta.imagesWithAlt < p.meta.imagesTotal) issues.push(`⚠️ **${p.name}**: ${p.meta.imagesTotal - p.meta.imagesWithAlt} afbeelding(en) zonder alt-tekst`)
    if (!p.meta.ogTitle || !p.meta.ogDesc) issues.push(`⚠️ **${p.name}**: OG tags onvolledig`)
    return issues
  })
  const kritiek = techIssues.filter(i => i.startsWith('❌')).length
  const medium = techIssues.filter(i => i.startsWith('⚠️')).length
  const scoreColor = kritiek > 3 ? 0xFF4444 : kritiek > 0 ? 0xFFAA00 : 0x57F287
  const scoreEmoji = kritiek > 3 ? '🔴' : kritiek > 0 ? '🟡' : '🟢'

  // ── Embed 1: Overzicht + technische scan ────────────────────────────
  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `${scoreEmoji} Deep SEO/GEO/AEO Scan — ${domain}`,
      description: `**${loadedPages.length} pagina's** gescand · **${kritiek} kritiek** · **${medium} medium** · ${new Date().toLocaleDateString('nl-BE')}\n\n${techIssues.slice(0, 15).join('\n')}${techIssues.length > 15 ? `\n… en ${techIssues.length - 15} meer` : ''}`,
      color: scoreColor,
      footer: { text: '⏳ Stap 1/8 — Quick wins worden geanalyseerd...' },
    }],
  })

  // ── Embed 2: Quick Wins ─────────────────────────────────────────────
  let quickWins = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    quickWins = await askClaude(`
Je bent een senior SEO-specialist. Analyseer deze website en geef de 5 belangrijkste quick wins die DEZE WEEK geïmplementeerd kunnen worden.

WEBSITE: ${context}
DATA:
${pageSummary}

Antwoord in het Nederlands. Formaat per item:
🔥 **[Quick win]** — Impact: [hoog/medium] · Tijdsinvestering: [x minuten/uren]
  → Hoe: [concrete implementatiestap]

Focus op laaghangend fruit met hoge impact. Geen vage adviezen.`, apiKey, 1000)
  } catch (e) { console.error('Quick wins fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '⚡ Quick Wins — Direct Toepasbaar',
      description: quickWins.substring(0, 2000),
      color: 0xFF9900,
      footer: { text: '⏳ Stap 2/8 — Technische SEO analyse...' },
    }],
  })

  // ── Embed 3: Technical SEO ──────────────────────────────────────────
  let techAnalysis = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    techAnalysis = await askClaude(`
Je bent een technische SEO-specialist. Geef een diepgaande technische analyse.

WEBSITE: ${context}
DATA:
${pageSummary}

Analyseer en rapporteer over:
1. **Core Web Vitals indicatoren** (op basis van de HTML-structuur)
2. **Render blocking risico's** (grote scripts, CSS)
3. **Indexing** (robots, canonical, duplicaten)
4. **Structured Data** (JSON-LD kwaliteit en ontbrekende types)
5. **Mobile usability** (viewport, responsive indicatoren)
6. **Accessibility** (alt-tekst, heading structuur, lang)
7. **Interne structuur** (heading hiërarchie, content diepte)

Per punt:
❌/⚠️/✅ **[Onderdeel]** — Impact: [hoog/medium/laag]
  → Probleem: [wat er mis is]
  → Oplossing: [concrete stap]

Kort en concreet. Nederlands.`, apiKey, 1500)
  } catch (e) { console.error('Tech SEO fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '🔧 Technische SEO Analyse',
      description: techAnalysis.substring(0, 2000),
      color: 0x5865F2,
      footer: { text: '⏳ Stap 3/8 — On-page & content analyse...' },
    }],
  })

  // ── Embed 4: On-Page & Content ──────────────────────────────────────
  let onPageAnalysis = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    onPageAnalysis = await askClaude(`
Je bent een SEO content specialist. Analyseer de on-page SEO en content.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### ✏️ VERBETERDE META'S
▸ **[Paginanaam]**
  Title: "[max 60 tekens, keyword vooraan]"
  Description: "[130-160 tekens, eindig met CTA]"

### 📊 CONTENT GAPS
▸ [Wat ontbreekt en waarom het belangrijk is voor SEO]

### 🏷️ KEYWORD CLUSTERS
▸ **[cluster naam]** → pagina's: [welke pagina's targeten dit] → zoekwoorden: [3-5 keywords]

### 📐 HEADING STRUCTUUR
▸ [pagina]: [probleem met H1/H2/H3 hiërarchie] → [oplossing]

Max 3 items per sectie. Concreet en klaar om te implementeren.`, apiKey, 1500)
  } catch (e) { console.error('On-page fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '📝 On-Page & Content Analyse',
      description: onPageAnalysis.substring(0, 2000),
      color: 0x57F287,
      footer: { text: '⏳ Stap 4/8 — GEO analyse (AI-zoekmachines)...' },
    }],
  })

  // ── Embed 5: GEO (Generative Engine Optimization) ───────────────────
  let geoAnalysis = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    geoAnalysis = await askClaude(`
Je bent een GEO-specialist (Generative Engine Optimization). Analyseer hoe goed deze website vindbaar is voor AI-zoekmachines zoals ChatGPT, Google Gemini, Perplexity en Copilot.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 🤖 AI-VINDBAARHEID SCORE
▸ Huidige status: [goed/matig/slecht] — Waarom: [korte uitleg]

### ❓ FAQ SECTIES (genereer 5 FAQ's voor de homepage)
▸ **V:** [vraag die gebruikers aan AI stellen]
  **A:** [kort, feitelijk antwoord in 2-3 zinnen — klaar om als FAQ-schema toe te voegen]

### 📖 AI-READABLE CONTENT VERBETERINGEN
▸ **[pagina]**: [wat aanpassen zodat AI-systemen de content beter begrijpen en citeren]

### 🧩 GESTRUCTUREERDE ANTWOORDEN
▸ [zoekintentie] → [hoe de content structureren als direct antwoord voor AI]

Concreet en direct toepasbaar. Nederlands.`, apiKey, 1500)
  } catch (e) { console.error('GEO fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '🤖 GEO — AI Zoekmachine Optimalisatie',
      description: geoAnalysis.substring(0, 2000),
      color: 0x9B59B6,
      footer: { text: '⏳ Stap 5/8 — AEO analyse (featured snippets)...' },
    }],
  })

  // ── Embed 6: AEO (Answer Engine Optimization) ──────────────────────
  let aeoAnalysis = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    aeoAnalysis = await askClaude(`
Je bent een AEO-specialist (Answer Engine Optimization). Optimaliseer deze website voor featured snippets, position zero en People Also Ask.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 🎯 SNIPPET-READY ANTWOORDEN (5 stuks)
▸ Zoekterm: "**[zoekterm]**"
  Snippet: "[direct antwoord in max 40 woorden — klaar voor featured snippet]"
  Type: [paragraph/list/table]

### 🏆 POSITION ZERO OPTIMALISATIES
▸ **[pagina]**: [welk type snippet targeten] — [hoe de content aanpassen]

### ❓ VRAAG-GEBASEERDE CONTENT
▸ "[vraag die mensen stellen]" → [content strategie om dit te beantwoorden]

### 📋 PEOPLE ALSO ASK KANSEN
▸ "[gerelateerde vraag]" → [hoe hierop inspelen]

Concreet. Klaar om te implementeren. Nederlands.`, apiKey, 1500)
  } catch (e) { console.error('AEO fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '🎯 AEO — Answer Engine Optimalisatie',
      description: aeoAnalysis.substring(0, 2000),
      color: 0xE91E63,
      footer: { text: '⏳ Stap 6/8 — Keyword strategie & concurrentie...' },
    }],
  })

  // ── Embed 7: Keyword Strategy + Competitor Insights ─────────────────
  let keywordAnalysis = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    keywordAnalysis = await askClaude(`
Je bent een keyword strategie specialist en competitieve SEO-analist.

WEBSITE: ${context}
DATA:
${pageSummary}
${competitorText ? `\nCONCURRENTEN:\n${competitorText}` : ''}

Geef:
### 📈 HIGH ROI KEYWORDS (8 stuks)
▸ **[keyword]** | Volume: [hoog/medium/laag] | Moeilijkheid: [makkelijk/medium/moeilijk] | Intent: [informational/commercial/transactional]

### 🔎 LONG-TAIL KANSEN (6 stuks)
▸ "**[long-tail keyword]**" → actie: [blog/pagina/FAQ] | Verwacht effect: [beschrijving]

### 🧭 INTENT MAPPING
▸ **[awareness/consideration/decision]** → keywords: [relevante zoekwoorden] → content type: [blog/landingspagina/FAQ/casestudy]

${competitorText ? `### 🥊 CONCURRENTIE INSIGHTS
▸ Wat zij beter doen: [3 punten]
▸ Waar kansen liggen: [3 punten]
▸ Wat je kunt overnemen: [2 concrete ideeën]` : ''}

Concreet en actiegericht. Nederlands.`, apiKey, 1800)
  } catch (e) { console.error('Keywords fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '📈 Keyword Strategie & Concurrentie',
      description: keywordAnalysis.substring(0, 2000),
      color: 0xFEE75C,
      footer: { text: '⏳ Stap 7/8 — CRO & off-page analyse...' },
    }],
  })

  // ── Embed 8: CRO + Off-Page ────────────────────────────────────────
  let croOffPage = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    croOffPage = await askClaude(`
Je bent een CRO-specialist en off-page SEO expert.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 💰 CRO — CONVERSIE OPTIMALISATIE
**CTA Analyse:**
▸ **[pagina]**: [huidige CTA status] → Verbetering: [concrete suggestie]

**Vertrouwen & Social Proof:**
▸ [wat ontbreekt] → [hoe toevoegen voor meer conversie]

**Structuur:**
▸ [pagina]: [specifieke verbetering voor hogere conversie]

### 🔗 OFF-PAGE SEO
**Backlink Strategie (5 acties):**
▸ **[bron/methode]** — verwacht resultaat: [beschrijving] — prioriteit: [hoog/medium]

**Local SEO:**
▸ [actie] — [waarom belangrijk voor lokale vindbaarheid]

**Directory & Citations:**
▸ [platform] — [wat daar doen]

Concreet en actiegericht. Nederlands.`, apiKey, 1500)
  } catch (e) { console.error('CRO/Off-page fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '💰 CRO & Off-Page SEO',
      description: croOffPage.substring(0, 2000),
      color: 0x2ECC71,
      footer: { text: '⏳ Stap 8/8 — Prioriteiten & actieplan...' },
    }],
  })

  // ── Embed 9: Prioriteiten ──────────────────────────────────────────
  let priorities = '⚠️ Tijdelijk niet beschikbaar.'
  try {
    priorities = await askClaude(`
Je bent een SEO-projectmanager. Maak een geprioriteerd actieplan.

Website: ${context}
Gevonden: ${kritiek} kritieke problemen, ${medium} medium problemen, ${loadedPages.length} pagina's gescand.
Pagina's: ${loadedPages.map(p => p.name).join(', ')}

Geef een actieplan in 3 fases:

### 🔥 QUICK WINS — Deze Week
1. **[actie]** — verwachte impact: [beschrijving] — tijdsinvestering: [x uur]
2. (max 5 items)

### 📅 MIDDELLANGE TERMIJN — 1-3 Maanden
1. **[actie]** — verwachte impact: [beschrijving]
2. (max 5 items)

### 🎯 LANGE TERMIJN — 3-6 Maanden
1. **[strategische actie]** — verwachte impact: [beschrijving]
2. (max 3 items)

### 📊 VERWACHT RESULTAAT
▸ Na 1 maand: [wat je kunt verwachten]
▸ Na 3 maanden: [wat je kunt verwachten]
▸ Na 6 maanden: [wat je kunt verwachten]

Realistisch, concreet, geen vage beloftes. Nederlands.`, apiKey, 1500)
  } catch (e) { console.error('Prioriteiten fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: '🧭 Prioriteiten & Actieplan',
      description: priorities.substring(0, 2000),
      color: 0xEB459E,
      footer: { text: '✅ Deep Scan compleet — JukeCoding SEO/GEO/AEO Bot' },
    }],
  })
}

// ── ACTIE: GEO analyse (individueel) ─────────────────────────────────
async function runGeoAnalysisSingle({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)

  let analysis = '⚠️ Analyse niet beschikbaar.'
  try {
    analysis = await askClaude(`
Je bent een GEO-specialist (Generative Engine Optimization). Geef een complete analyse van hoe goed deze website vindbaar en citeerbaar is voor AI-zoekmachines (ChatGPT, Gemini, Perplexity, Copilot).

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 🤖 AI-VINDBAARHEID SCORE
▸ Score: [1-10] — Status: [goed/matig/slecht]
▸ Sterke punten: [wat al goed is]
▸ Zwakke punten: [wat ontbreekt]

### ❓ FAQ SECTIES (8 FAQ's — klaar voor implementatie)
▸ **V:** [vraag]
  **A:** [feitelijk antwoord in 2-3 zinnen]

### 📖 AI-READABLE CONTENT
Per pagina:
▸ **[pagina]**: [wat aanpassen] → [verwacht effect op AI-vindbaarheid]

### 🧩 STRUCTURED DATA AANBEVELINGEN
▸ [schema type] — voor pagina: [welke] — waarom: [reden]

### 🎯 ENTITY OPTIMIZATION
▸ [entiteit/concept] — [hoe duidelijker maken voor AI] — [welke pagina]

Uitgebreid, concreet, direct implementeerbaar. Nederlands.`, apiKey, 2000)
  } catch (e) { console.error('GEO analyse fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `🤖 GEO Analyse — ${domain}`,
      description: analysis.substring(0, 4000),
      color: 0x9B59B6,
      footer: { text: `${loadedPages.length} pagina's geanalyseerd · ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── ACTIE: AEO analyse (individueel) ─────────────────────────────────
async function runAeoAnalysisSingle({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)

  let analysis = '⚠️ Analyse niet beschikbaar.'
  try {
    analysis = await askClaude(`
Je bent een AEO-specialist (Answer Engine Optimization). Geef een complete analyse voor featured snippets, position zero, People Also Ask en voice search.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 🎯 SNIPPET-READY ANTWOORDEN (8 stuks)
▸ Zoekterm: "**[zoekterm]**"
  Type: [paragraph/list/table/video]
  Snippet: "[klaar voor featured snippet — max 40 woorden]"

### 🏆 POSITION ZERO STRATEGIE
Per pagina:
▸ **[pagina]** → target snippet type: [type] — aanpassing: [concreet]

### ❓ PEOPLE ALSO ASK KANSEN (6 stuks)
▸ "[vraag]" → [hoe beantwoorden] → [op welke pagina]

### 🗣️ VOICE SEARCH OPTIMALISATIE
▸ [zoekpatroon] → [hoe content aanpassen voor voice]

### 📋 CONTENT STRUCTUUR
▸ [pagina]: [heading/list/table aanpassing voor betere snippet kans]

Uitgebreid, concreet. Nederlands.`, apiKey, 2000)
  } catch (e) { console.error('AEO analyse fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `🎯 AEO Analyse — ${domain}`,
      description: analysis.substring(0, 4000),
      color: 0xE91E63,
      footer: { text: `${loadedPages.length} pagina's geanalyseerd · ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── ACTIE: CRO analyse (individueel) ─────────────────────────────────
async function runCroAnalysisSingle({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)

  let analysis = '⚠️ Analyse niet beschikbaar.'
  try {
    analysis = await askClaude(`
Je bent een CRO-specialist (Conversion Rate Optimization). Analyseer deze website op conversie-optimalisatie.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 💰 CONVERSIE SCORE
▸ Score: [1-10] — Status: [goed/matig/slecht]
▸ Grootste conversie-killer: [wat het meest kost]

### 🔘 CTA ANALYSE
Per pagina:
▸ **[pagina]**: [huidige situatie] → **Verbetering:** [nieuwe CTA tekst + plaatsing]

### 🤝 VERTROUWEN & SOCIAL PROOF
▸ [wat ontbreekt] → [hoe toevoegen] → [verwacht effect]

### 📐 PAGINA STRUCTUUR
▸ **[pagina]**: [structuur probleem] → [hoe optimaliseren voor conversie]

### 🎯 USER FLOW OPTIMALISATIE
▸ [huidige flow probleem] → [verbeterde flow]

### 📱 MOBILE CONVERSIE
▸ [mobiel-specifiek probleem] → [oplossing]

### 📊 A/B TEST SUGGESTIES
▸ [wat testen] — hypothese: [verwachting] — impact: [hoog/medium]

Uitgebreid, concreet, data-gedreven. Nederlands.`, apiKey, 2000)
  } catch (e) { console.error('CRO analyse fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `💰 CRO Analyse — ${domain}`,
      description: analysis.substring(0, 4000),
      color: 0x2ECC71,
      footer: { text: `${loadedPages.length} pagina's geanalyseerd · ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── ACTIE: Off-Page analyse (individueel) ────────────────────────────
async function runOffPageAnalysisSingle({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)

  let analysis = '⚠️ Analyse niet beschikbaar.'
  try {
    analysis = await askClaude(`
Je bent een off-page SEO en local SEO specialist.

WEBSITE: ${context}
DATA:
${pageSummary}

Geef:
### 🔗 BACKLINK STRATEGIE (8 concrete acties)
▸ **[bron/methode]** — hoe: [uitleg] — verwacht resultaat: [beschrijving] — prioriteit: [hoog/medium/laag]

### 📍 LOCAL SEO OPTIMALISATIE
▸ Google Business Profile: [checklist van optimalisaties]
▸ NAP consistentie: [wat controleren]
▸ Lokale content: [welke content toevoegen]
▸ Reviews strategie: [hoe meer reviews genereren]

### 📂 DIRECTORY & CITATIONS (10 platforms)
▸ **[platform]** — [wat daar doen] — prioriteit: [hoog/medium]

### 🤝 LINK BUILDING OUTREACH
▸ [type partner/bron] — [benadering] — [verwacht resultaat]

### 📱 SOCIAL SIGNALS
▸ [platform] — [strategie voor meer social signals]

### 🏆 BRAND MENTIONS
▸ [hoe brand mentions genereren zonder link] — [waarom waardevol]

Uitgebreid, concreet, actiegericht. Nederlands.`, apiKey, 2000)
  } catch (e) { console.error('Off-page analyse fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `🔗 Off-Page SEO Analyse — ${domain}`,
      description: analysis.substring(0, 4000),
      color: 0x3498DB,
      footer: { text: `Geanalyseerd op ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── ACTIE: Keyword strategie (individueel) ───────────────────────────
async function runKeywordStrategySingle({ interactionToken, applicationId, apiKey, siteUrl }) {
  const displayUrl = resolveUrl(siteUrl)
  const domain = resolveDomain(displayUrl)
  const context = siteContext(domain)
  const { loadedPages } = await fetchAllPages(siteUrl)
  const pageSummary = buildPageSummary(loadedPages)
  const { text: competitorText } = await fetchCompetitorData(domain)

  let analysis = '⚠️ Analyse niet beschikbaar.'
  try {
    analysis = await askClaude(`
Je bent een keyword strategie specialist met 15 jaar ervaring.

WEBSITE: ${context}
DATA:
${pageSummary}
${competitorText ? `\nCONCURRENTEN:\n${competitorText}` : ''}

Geef:
### 📈 HIGH ROI KEYWORDS (10 stuks)
▸ **[keyword]** | Volume: [hoog/medium/laag] | Moeilijkheid: [makkelijk/medium/moeilijk] | Intent: [informational/commercial/transactional] | Actie: [nieuwe pagina/blog/optimaliseer X]

### 🔎 LONG-TAIL KANSEN (10 stuks)
▸ "**[long-tail keyword]**" → actie: [blog/FAQ/pagina] | Verwacht effect: [beschrijving] | Moeilijkheid: [makkelijk/medium]

### 🧭 INTENT MAPPING
▸ **Awareness** → keywords: [lijst] → content: [type]
▸ **Consideration** → keywords: [lijst] → content: [type]
▸ **Decision** → keywords: [lijst] → content: [type]

### 🗓️ CONTENT KALENDER (3 maanden)
▸ Maand 1: [3 content stukken met target keyword]
▸ Maand 2: [3 content stukken met target keyword]
▸ Maand 3: [3 content stukken met target keyword]

### 🎯 KEYWORD GAPS
▸ [keyword waar concurrenten op ranken maar jij niet] → [actie]

Uitgebreid, strategisch, concreet. Nederlands.`, apiKey, 2500)
  } catch (e) { console.error('Keyword strategie fout:', e.message) }

  await sendFollowup(applicationId, interactionToken, {
    embeds: [{
      title: `📈 Keyword Strategie — ${domain}`,
      description: analysis.substring(0, 4000),
      color: 0xFEE75C,
      footer: { text: `${loadedPages.length} pagina's + ${competitorText ? 'concurrenten ' : ''}geanalyseerd · ${new Date().toLocaleDateString('nl-BE')}` },
    }],
  })
}

// ── Main handler ───────────────────────────────────────────────────────
export default async function handler(req) {
  const { ANTHROPIC_API_KEY, DISCORD_APPLICATION_ID, INTERNAL_WORKER_SECRET } = process.env

  if (!ANTHROPIC_API_KEY || !DISCORD_APPLICATION_ID) {
    return new Response('Env vars ontbreken', { status: 500 })
  }

  // This worker is an internal-only endpoint: it is triggered server-to-server
  // by discord-bot.mjs and burns ANTHROPIC_API_KEY + does outbound fetches.
  // Require a shared secret so it cannot be invoked directly by the public.
  // Fail closed: if the secret is not configured, refuse everything.
  if (
    !INTERNAL_WORKER_SECRET ||
    !timingSafeEqualStr(req.headers.get('x-internal-secret') || '', INTERNAL_WORKER_SECRET)
  ) {
    return new Response('Unauthorized', { status: 401 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response('Ongeldige JSON', { status: 400 })
  }

  const { action, interactionToken, applicationId, url, topic, siteUrl } = body
  const appId = applicationId || DISCORD_APPLICATION_ID

  console.log(`🔧 Worker actie: ${action} | site: ${siteUrl || 'jukecoding.be'}`)

  try {
    if (action === 'check') {
      await runQuickCheck({ interactionToken, applicationId: appId, siteUrl })
    } else if (action === 'full') {
      await runFullAgencyScan({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'analyse') {
      await runFullAnalysis({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'competitor') {
      await runCompetitorAnalysis({ url, interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY })
    } else if (action === 'blog') {
      await runBlogGeneration({ topic, interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY })
    } else if (action === 'deep') {
      await runDeepScan({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'geo') {
      await runGeoAnalysisSingle({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'aeo') {
      await runAeoAnalysisSingle({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'cro') {
      await runCroAnalysisSingle({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'offpage') {
      await runOffPageAnalysisSingle({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    } else if (action === 'keywords') {
      await runKeywordStrategySingle({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY, siteUrl })
    }
  } catch (err) {
    console.error('Worker fout:', err)
    await sendFollowup(appId, interactionToken, {
      content: `❌ Er ging iets mis: ${err.message}`,
    }).catch(() => {})
  }

  return new Response('OK', { status: 200 })
}
