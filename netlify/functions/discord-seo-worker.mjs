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

const SITE_URL = 'https://jukecoding.be'

const PAGES_TO_AUDIT = [
  { url: `${SITE_URL}/`, name: 'Homepage' },
  { url: `${SITE_URL}/webdesign`, name: 'Webdesign' },
  { url: `${SITE_URL}/ai-automatisatie`, name: 'AI Automatisatie' },
  { url: `${SITE_URL}/blog`, name: 'Blog' },
  { url: `${SITE_URL}/webdesign-hasselt`, name: 'Webdesign Hasselt' },
]

// ── Helpers ───────────────────────────────────────────────────────────
async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'JukeCoding-SEO-Bot/1.0' },
      signal: AbortSignal.timeout(8000),
    })
    return res.ok ? await res.text() : null
  } catch { return null }
}

function extractMeta(html) {
  if (!html) return { title: null, description: null, h1: null, canonical: null, h2s: [] }
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null
  const description =
    html.match(/name=["']description["'][^>]*content=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1]?.trim() || null
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]*>/g, '').trim() || null
  const canonical =
    html.match(/rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1]?.trim() ||
    html.match(/href=["']([^"']*)["'][^>]*rel=["']canonical["']/i)?.[1]?.trim() || null
  const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)]
    .map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean).slice(0, 4)
  return { title, description, h1, canonical, h2s }
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
async function askClaude(prompt, apiKey, maxTokens = 2500) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })
  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })
  return msg.content[0].text
}

// ── ACTIE: Volledige SEO analyse ───────────────────────────────────────
async function runFullAnalysis({ interactionToken, applicationId, apiKey }) {
  // 1. Pagina's ophalen
  const pageData = await Promise.all(
    PAGES_TO_AUDIT.map(async (page) => {
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

  const analysis = await askClaude(`
Je bent een SEO-expert voor JukeCoding (Belgisch webbureau, custom websites + AI-automatisering voor KMO's, Hasselt).

ON-PAGE DATA:
${auditText}

CONCURRENTEN:
${competitorText}

Geef een GESTRUCTUREERDE analyse in het Nederlands. Gebruik EXACT dit formaat:

### TITELS VERBETEREN
Per pagina die een betere title nodig heeft:
▸ [Paginanaam]
  Nu: "[huidige title]"
  Voorstel: "[nieuwe title — max 60 tekens, keyword vooraan]"

### DESCRIPTIONS VERBETEREN
Per pagina die een betere description nodig heeft:
▸ [Paginanaam]
  Nu: "[huidige description]"
  Voorstel: "[nieuwe description — 130-160 tekens, eindig met een CTA]"

### KEYWORD KANSEN
5 concrete zoekwoorden die JukeCoding nog onvoldoende target:
▸ [zoekwoord] → [waarom kans] → [maak: nieuwe pagina / blogpost / aanpassen aan pagina X]

### CONCURRENTIE-VOORDELEN
Wat JukeCoding beter doet of kan uitspelen vs de concurrenten (3 punten):
▸ ...

### TOP 5 ACTIES
Gerangschikte acties voor deze maand:
1. [actie] — [impact: hoog/medium]
2. [actie] — [impact: hoog/medium]
3. [actie] — [impact: hoog/medium]
4. [actie] — [impact: hoog/medium]
5. [actie] — [impact: hoog/medium]
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
        title: `📊 SEO Analyse — jukecoding.be`,
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
    content: \`${parsed.content.replace(/`/g, '\\`')}\`,
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

// ── Main handler ───────────────────────────────────────────────────────
export default async function handler(req) {
  const { ANTHROPIC_API_KEY, DISCORD_APPLICATION_ID } = process.env

  if (!ANTHROPIC_API_KEY || !DISCORD_APPLICATION_ID) {
    return new Response('Env vars ontbreken', { status: 500 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response('Ongeldige JSON', { status: 400 })
  }

  const { action, interactionToken, applicationId, url, topic } = body
  const appId = applicationId || DISCORD_APPLICATION_ID

  console.log(`🔧 Worker actie: ${action}`)

  try {
    if (action === 'analyse') {
      await runFullAnalysis({ interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY })
    } else if (action === 'competitor') {
      await runCompetitorAnalysis({ url, interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY })
    } else if (action === 'blog') {
      await runBlogGeneration({ topic, interactionToken, applicationId: appId, apiKey: ANTHROPIC_API_KEY })
    }
  } catch (err) {
    console.error('Worker fout:', err)
    await sendFollowup(appId, interactionToken, {
      content: `❌ Er ging iets mis: ${err.message}`,
    }).catch(() => {})
  }

  return new Response('OK', { status: 200 })
}
