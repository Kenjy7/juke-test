/**
 * JukeCoding — Blog Draft Generator
 * ─────────────────────────────────────────────────────────────────────
 * Genereert automatisch een SEO-geoptimaliseerde blogpost draft via de Claude API.
 * De post wordt toegevoegd aan src/data/blogs/index.js met published: false.
 * Jij reviewt, past aan indien nodig, en zet published: true om live te gaan.
 *
 * Gebruik:
 *   node scripts/generate-blog-draft.mjs "jouw onderwerp of zoekwoord"
 *
 * Vereiste env var:
 *   ANTHROPIC_API_KEY=sk-ant-...
 *
 * Installeer eerst:
 *   npm install @anthropic-ai/sdk
 * ─────────────────────────────────────────────────────────────────────
 */

import fs from 'node:fs'
import path from 'node:path'

// ── Configuratie ──────────────────────────────────────────────────────
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const BLOGS_FILE = path.resolve('src/data/blogs/index.js')

// Maandelijkse zoekwoorden-planning — pas aan naar keuze
export const KEYWORD_PLANNING = [
  'hoeveel kost een website op maat in België',
  'custom code vs wordpress voor KMO',
  'bedrijfsprocessen automatiseren met AI',
  'wat is lokale SEO en waarom is het belangrijk',
  'website laten maken tips voor KMO',
  'AI chatbot voor bedrijf laten bouwen',
  'webdesign trends 2026',
  'hoe scoort mijn website beter in Google',
  'wat is een landingspagina en wanneer heb je er een nodig',
  'procesautomatisering voorbeelden voor kleine bedrijven',
  'website zonder wordpress voordelen',
  'lead generatie via website voor KMO',
]

// ── Helpers ───────────────────────────────────────────────────────────
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

// ── Claude API call ───────────────────────────────────────────────────
async function generateBlogPost(topic) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is niet ingesteld. Voeg het toe aan je .env bestand.')
  }

  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

  const systemPrompt = `Je bent een SEO-copywriter voor JukeCoding, een Belgisch webbureau dat custom websites bouwt en bedrijfsprocessen automatiseert voor KMO's.

JukeCoding profiel:
- Bouwt custom code websites (geen WordPress, geen page builders)
- Automatiseert bedrijfsprocessen met AI
- Doelgroep: groeiende KMO's (5-50 medewerkers), sector-onafhankelijk
- Tone of voice: professioneel maar ook wat speels — niet alles hoeft altijd serieus
- Gebaseerd in Hasselt, actief in heel België
- Contact: contact@jukecoding.be | jukecoding.be

Schrijfregels:
- Schrijf in het Nederlands (Belgisch-Nederlands)
- Gebruik jij/je-vorm om de lezer direct aan te spreken
- Wees concreet en eerlijk — geen vage marketing-taal
- Gebruik de primaire zoekterm in H1, eerste alinea, en minstens 2x in de tekst
- Voeg interne links toe naar /webdesign, /ai-automatisatie, /offerte-aanvraag waar relevant
- Schrijf minimaal 600 woorden aan content
- Gebruik H2 en H3 voor structuur`

  const userPrompt = `Schrijf een volledige SEO-blogpost voor JukeCoding over het volgende onderwerp/zoekwoord:

"${topic}"

Geef je antwoord UITSLUITEND als een geldig JSON-object met deze velden:
{
  "title": "de volledige H1 paginatitel",
  "metaTitle": "SEO title (max 60 tekens, eindigt met | JukeCoding)",
  "metaDescription": "SEO meta beschrijving (max 160 tekens, met een call-to-action)",
  "excerpt": "korte samenvatting voor de bloglijst (1-2 zinnen, max 200 tekens)",
  "category": "Webdesign | Automatisering | SEO | AI",
  "keywords": ["zoekwoord 1", "zoekwoord 2", "zoekwoord 3"],
  "readingTime": 6,
  "content": "<h2>...</h2><p>...</p>... (volledige HTML content, minimaal 600 woorden)"
}

Geen extra tekst buiten het JSON-object.`

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const text = message.content[0].text.trim()

  // JSON parsen
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Geen geldig JSON gevonden in Claude response')

  return JSON.parse(jsonMatch[0])
}

// ── Toevoegen aan blogs/index.js ──────────────────────────────────────
function appendPostToFile(postData, slug) {
  const currentContent = fs.readFileSync(BLOGS_FILE, 'utf8')

  const newPostCode = `
  {
    slug: '${slug}',
    title: ${JSON.stringify(postData.title)},
    metaTitle: ${JSON.stringify(postData.metaTitle)},
    metaDescription: ${JSON.stringify(postData.metaDescription)},
    excerpt: ${JSON.stringify(postData.excerpt)},
    publishedAt: '${formatDate()}',
    published: false,  // ← Review en zet op true om live te gaan
    category: ${JSON.stringify(postData.category)},
    keywords: ${JSON.stringify(postData.keywords)},
    readingTime: ${postData.readingTime || 5},
    ogImage: '/og-image.jpg',
    content: ${JSON.stringify(postData.content)},
  },`

  // Voeg toe voor de sluitende `]` van blogPosts array
  const insertPoint = currentContent.lastIndexOf(']')
  if (insertPoint === -1) throw new Error('Kan geen ] vinden in blogs/index.js')

  const updatedContent =
    currentContent.slice(0, insertPoint) + newPostCode + '\n' + currentContent.slice(insertPoint)

  fs.writeFileSync(BLOGS_FILE, updatedContent, 'utf8')
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  const topic = process.argv[2]

  if (!topic) {
    console.error('❌ Geef een onderwerp mee als argument:')
    console.error('   node scripts/generate-blog-draft.mjs "jouw onderwerp"')
    console.error('\nGeplande onderwerpen:')
    KEYWORD_PLANNING.forEach((k, i) => console.error(`   ${i + 1}. ${k}`))
    process.exit(1)
  }

  console.log(`\n🚀 Blogpost genereren over: "${topic}"`)
  console.log('   ⏳ Claude denkt na...\n')

  try {
    const postData = await generateBlogPost(topic)
    const slug = toSlug(postData.title || topic)

    appendPostToFile(postData, slug)

    console.log('✅ Draft blogpost aangemaakt!\n')
    console.log(`   Titel:    ${postData.title}`)
    console.log(`   Slug:     /blog/${slug}`)
    console.log(`   Categorie: ${postData.category}`)
    console.log(`   Leestijd: ${postData.readingTime} min`)
    console.log(`\n📝 Volgende stappen:`)
    console.log(`   1. Open src/data/blogs/index.js`)
    console.log(`   2. Lees de post na en pas aan waar nodig`)
    console.log(`   3. Zet published: false  →  published: true`)
    console.log(`   4. Build en deploy → post staat live!`)
  } catch (err) {
    console.error('❌ Fout bij genereren:', err.message)
    process.exit(1)
  }
}

main()
