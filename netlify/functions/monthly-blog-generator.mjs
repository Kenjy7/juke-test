/**
 * JukeCoding — Netlify Scheduled Function: Monthly Blog Generator
 * ─────────────────────────────────────────────────────────────────────
 * Draait automatisch op de 1e van elke maand om 08:00.
 * Genereert een blogpost draft en stuurt een review-e-mail naar Kenjy.
 * Kenjy opent het bestand, zet published: true, en pusht naar GitHub.
 * Netlify deployt automatisch → post staat live.
 *
 * Netlify env vars vereist:
 *   ANTHROPIC_API_KEY   — Claude API key
 *   GITHUB_TOKEN        — GitHub token met repo write access
 *   GITHUB_REPO         — "gebruikersnaam/reponaam" (bv. "kenjy/jukecoding")
 *   EMAILJS_SERVICE_ID  — EmailJS service ID (al in gebruik op de site)
 *   EMAILJS_TEMPLATE_ID — EmailJS template ID voor blog review e-mail
 *   EMAILJS_PUBLIC_KEY  — EmailJS public key
 *   REVIEW_EMAIL        — E-mailadres om draft naartoe te sturen (contact@jukecoding.be)
 * ─────────────────────────────────────────────────────────────────────
 */

// Geplande zoekwoorden per maand (pas aan naar keuze)
const MONTHLY_KEYWORDS = [
  'website laten maken tips voor KMO',          // Januari
  'bedrijfsprocessen automatiseren met AI',     // Februari
  'wat is lokale SEO en waarom is het belangrijk', // Maart
  'hoeveel kost een website op maat in België', // April
  'AI chatbot voor bedrijf laten bouwen',       // Mei
  'webdesign trends voor KMO',                  // Juni
  'hoe scoort mijn website beter in Google',    // Juli
  'procesautomatisering voorbeelden kleine bedrijven', // Augustus
  'website zonder wordpress voordelen',         // September
  'lead generatie via website voor KMO',        // Oktober
  'custom website vs template verschil',        // November
  'digitale groei strategie voor KMO 2026',     // December
]

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
}

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

async function generateWithClaude(topic, apiKey) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })

  const systemPrompt = `Je bent een SEO-copywriter voor JukeCoding, een Belgisch webbureau dat custom websites bouwt en bedrijfsprocessen automatiseert voor KMO's.

JukeCoding profiel:
- Bouwt custom code websites (geen WordPress, geen page builders)
- Automatiseert bedrijfsprocessen met AI
- Doelgroep: groeiende KMO's (5-50 medewerkers), sector-onafhankelijk
- Tone of voice: professioneel maar ook wat speels
- Gebaseerd in Hasselt, actief in heel België
- Website: jukecoding.be | E-mail: contact@jukecoding.be

Schrijfregels:
- Schrijf in het Nederlands (Belgisch-Nederlands)
- Gebruik jij/je-vorm om de lezer direct aan te spreken
- Wees concreet — geen vage marketing-taal
- Gebruik de primaire zoekterm in H1, eerste alinea, en minstens 2x in de tekst
- Voeg interne links toe naar /webdesign, /ai-automatisatie of /offerte-aanvraag waar relevant
- Schrijf minimaal 600 woorden content
- Gebruik H2 en H3 voor structuur`

  const userPrompt = `Schrijf een volledige SEO-blogpost voor JukeCoding over: "${topic}"

Geef je antwoord UITSLUITEND als een geldig JSON-object:
{
  "title": "de volledige H1 paginatitel",
  "metaTitle": "SEO title (max 60 tekens, eindigt met | JukeCoding)",
  "metaDescription": "SEO meta beschrijving (max 160 tekens, met call-to-action)",
  "excerpt": "korte samenvatting voor de bloglijst (max 200 tekens)",
  "category": "Webdesign | Automatisering | SEO | AI",
  "keywords": ["zoekwoord 1", "zoekwoord 2", "zoekwoord 3"],
  "readingTime": 6,
  "content": "<h2>...</h2><p>...</p>... (volledige HTML content)"
}`

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const text = message.content[0].text.trim()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Geen geldig JSON in Claude response')
  return JSON.parse(jsonMatch[0])
}

async function createGithubPR({ postData, slug, githubToken, githubRepo }) {
  // Lees de huidige blogs/index.js via de GitHub API
  const apiBase = `https://api.github.com/repos/${githubRepo}`
  const headers = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }

  // Haal huidige bestandsinhoud op
  const fileRes = await fetch(`${apiBase}/contents/src/data/blogs/index.js`, { headers })
  const fileData = await fileRes.json()
  const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8')
  const sha = fileData.sha

  // Nieuwe post code opbouwen
  const newPostCode = `
  {
    slug: '${slug}',
    title: ${JSON.stringify(postData.title)},
    metaTitle: ${JSON.stringify(postData.metaTitle)},
    metaDescription: ${JSON.stringify(postData.metaDescription)},
    excerpt: ${JSON.stringify(postData.excerpt)},
    publishedAt: '${formatDate()}',
    published: false,  // ← Zet op true om live te gaan na review
    category: ${JSON.stringify(postData.category)},
    keywords: ${JSON.stringify(postData.keywords)},
    readingTime: ${postData.readingTime || 5},
    ogImage: '/og-image.jpg',
    content: ${JSON.stringify(postData.content)},
  },`

  const insertPoint = currentContent.lastIndexOf(']')
  const updatedContent =
    currentContent.slice(0, insertPoint) +
    newPostCode +
    '\n' +
    currentContent.slice(insertPoint)

  // Maak een nieuwe branch
  const branchName = `blog/draft-${slug}-${formatDate()}`

  // Haal main SHA op
  const mainRes = await fetch(`${apiBase}/git/refs/heads/main`, { headers })
  const mainData = await mainRes.json()
  const mainSha = mainData.object.sha

  // Maak nieuwe branch
  await fetch(`${apiBase}/git/refs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
  })

  // Commit het gewijzigde bestand naar de branch
  await fetch(`${apiBase}/contents/src/data/blogs/index.js`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `blog: draft "${postData.title}"`,
      content: Buffer.from(updatedContent).toString('base64'),
      sha,
      branch: branchName,
    }),
  })

  // Maak een Pull Request
  const prRes = await fetch(`${apiBase}/pulls`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: `📝 Blog draft: ${postData.title}`,
      head: branchName,
      base: 'main',
      body: `## Automatisch gegenereerde blogpost draft

**Titel:** ${postData.title}
**Slug:** /blog/${slug}
**Categorie:** ${postData.category}
**Leestijd:** ${postData.readingTime} min

**Excerpt:**
${postData.excerpt}

---

### Review checklist
- [ ] Tekst gelezen en goedgekeurd
- [ ] Zoekwoorden correct gebruikt
- [ ] Interne links kloppen
- [ ] \`published: false\` → \`published: true\` gezet

### Publiceren
Zet \`published: false\` op \`published: true\` in het bestand en merge deze PR.
Netlify deployt automatisch en de post staat live.`,
    }),
  })

  const prData = await prRes.json()
  return prData.html_url
}

// ── Netlify Scheduled Function Handler ───────────────────────────────
export default async function handler(req) {
  const now = new Date()
  const monthIndex = now.getMonth()
  const topic = MONTHLY_KEYWORDS[monthIndex]

  const {
    ANTHROPIC_API_KEY,
    GITHUB_TOKEN,
    GITHUB_REPO,
    REVIEW_EMAIL,
  } = process.env

  if (!ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY ontbreekt')
    return new Response('ANTHROPIC_API_KEY ontbreekt', { status: 500 })
  }

  console.log(`🚀 Maandelijkse blog generator gestart`)
  console.log(`   Maand: ${now.toLocaleString('nl-BE', { month: 'long' })}`)
  console.log(`   Onderwerp: ${topic}`)

  try {
    // 1. Genereer blogpost met Claude
    const postData = await generateWithClaude(topic, ANTHROPIC_API_KEY)
    const slug = toSlug(postData.title || topic)
    console.log(`✅ Post gegenereerd: "${postData.title}"`)

    // 2. Maak GitHub PR als token beschikbaar
    let prUrl = null
    if (GITHUB_TOKEN && GITHUB_REPO) {
      prUrl = await createGithubPR({ postData, slug, githubToken: GITHUB_TOKEN, githubRepo: GITHUB_REPO })
      console.log(`✅ GitHub PR aangemaakt: ${prUrl}`)
    } else {
      console.warn('⚠️ GITHUB_TOKEN of GITHUB_REPO ontbreekt — geen PR aangemaakt')
    }

    return new Response(
      JSON.stringify({
        success: true,
        title: postData.title,
        slug: `/blog/${slug}`,
        prUrl,
        month: now.toLocaleString('nl-BE', { month: 'long' }),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('❌ Fout:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// Netlify scheduled trigger: 1e van elke maand om 08:00
export const config = {
  schedule: '0 8 1 * *',
}
