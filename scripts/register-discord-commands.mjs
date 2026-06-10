/**
 * JukeCoding — Discord Slash Commands Registreren
 * ─────────────────────────────────────────────────────────────────────
 * Voer dit EENMALIG uit om de slash commands te registreren bij Discord.
 *
 * Gebruik:
 *   node --env-file=.env scripts/register-discord-commands.mjs
 *
 * Vereist in .env:
 *   DISCORD_APPLICATION_ID=jouw-app-id
 *   DISCORD_BOT_TOKEN=jouw-bot-token
 * ─────────────────────────────────────────────────────────────────────
 */

const { DISCORD_APPLICATION_ID, DISCORD_BOT_TOKEN } = process.env

if (!DISCORD_APPLICATION_ID || !DISCORD_BOT_TOKEN) {
  console.error('❌ DISCORD_APPLICATION_ID of DISCORD_BOT_TOKEN ontbreekt in .env')
  process.exit(1)
}

const commands = [
  {
    name: 'seo',
    description: 'JukeCoding SEO tools',
    options: [
      {
        type: 1, // SUB_COMMAND
        name: 'full',
        description:
          "🔬 Uitgebreide agency-scan: alle pagina's, concurrenten, keyword gaps, actieplan",
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te scannen (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'analyse',
        description: 'Volledige AI SEO-analyse met kant-en-klare verbeteringen',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'competitor',
        description: 'Analyseer een concurrent',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL van de concurrent (bv. imaxx.be)',
            required: true,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'blog',
        description: 'Genereer een SEO-blogpost draft',
        options: [
          {
            type: 3, // STRING
            name: 'onderwerp',
            description: 'Onderwerp of zoekwoord voor de blogpost',
            required: true,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'check',
        description:
          'Snelle technische scan: titles, descriptions, H1 en canonical (geen AI, direct klaar)',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te scannen (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'deep',
        description: '🧬 Full-power 10-sectie scan: SEO + GEO + AEO + CRO + off-page + actieplan',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te scannen (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'geo',
        description: '🤖 GEO — AI-zoekmachine optimalisatie (ChatGPT, Gemini, Perplexity)',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'aeo',
        description: '🎯 AEO — Featured snippets, position zero, People Also Ask',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'cro',
        description: "💰 CRO — Conversie optimalisatie, CTA's, vertrouwen, UX",
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'offpage',
        description: '🔗 Off-page SEO — Backlinks, local SEO, directories, brand mentions',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'keywords',
        description: '📈 Keyword strategie — High ROI, long-tail, intent mapping, content kalender',
        options: [
          {
            type: 3, // STRING
            name: 'url',
            description: 'URL om te analyseren (bv. klantsite.be) — leeg laat = jukecoding.be',
            required: false,
          },
        ],
      },
      {
        type: 1, // SUB_COMMAND
        name: 'help',
        description: 'Overzicht van alle beschikbare commands',
      },
    ],
  },
]

const res = await fetch(
  `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`,
  {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  },
)

if (res.ok) {
  const data = await res.json()
  console.log(`✅ ${data.length} command(s) geregistreerd!`)
  data.forEach((cmd) => console.log(`   /${cmd.name} — ${cmd.description}`))
  console.log('\n🎉 Klaar! Je kan nu /seo gebruiken in Discord.')
} else {
  const err = await res.text()
  console.error('❌ Registratie mislukt:', err)
}
