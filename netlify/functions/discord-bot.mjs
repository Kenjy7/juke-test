/**
 * JukeCoding — Discord Slash Command Handler
 * ─────────────────────────────────────────────────────────────────────
 * Ontvangt Discord slash commands en triggert de juiste actie.
 *
 * Beschikbare commands:
 *   /seo analyse          — Volledige SEO-analyse van jukecoding.be
 *   /seo competitor [url] — Analyseer een specifieke concurrent
 *   /seo blog [onderwerp] — Genereer een blogpost draft
 *   /seo help             — Overzicht van alle commands
 *
 * Env vars vereist:
 *   DISCORD_PUBLIC_KEY       — Uit Discord Developer Portal
 *   DISCORD_APPLICATION_ID   — Uit Discord Developer Portal
 *   DISCORD_BOT_TOKEN        — Bot token uit Discord Developer Portal
 *   ANTHROPIC_API_KEY        — Claude API key
 * ─────────────────────────────────────────────────────────────────────
 */

// ── Signature verificatie (verplicht door Discord) ────────────────────
import nacl from 'tweetnacl'

function verifyDiscordRequest(publicKey, signature, timestamp, rawBody) {
  try {
    return nacl.sign.detached.verify(
      Buffer.from(timestamp + rawBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )
  } catch {
    return false
  }
}

// ── Discord interaction types ─────────────────────────────────────────
const InteractionType = { PING: 1, APPLICATION_COMMAND: 2 }
const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE: 4,
  DEFERRED_CHANNEL_MESSAGE: 5,
}

// ── Trigger background worker ─────────────────────────────────────────
function triggerWorker(payload) {
  const workerUrl = `${process.env.URL}/.netlify/functions/discord-seo-worker-background`
  // Niet awaiten — fire and forget zodat we snel kunnen antwoorden aan Discord
  fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(err => console.error('Worker trigger fout:', err))
}

// ── Main handler ───────────────────────────────────────────────────────
export default async function handler(req) {
  const { DISCORD_PUBLIC_KEY, DISCORD_APPLICATION_ID } = process.env

  if (!DISCORD_PUBLIC_KEY) {
    return new Response('DISCORD_PUBLIC_KEY ontbreekt', { status: 500 })
  }

  // Lees body
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature-ed25519') || ''
  const timestamp = req.headers.get('x-signature-timestamp') || ''

  // Verifieer Discord signature
  const isValid = verifyDiscordRequest(DISCORD_PUBLIC_KEY, signature, timestamp, rawBody)
  if (!isValid) {
    return new Response('Ongeldige handtekening', { status: 401 })
  }

  const interaction = JSON.parse(rawBody)

  // Ping → Pong (vereist door Discord bij instellen endpoint)
  if (interaction.type === InteractionType.PING) {
    return new Response(JSON.stringify({ type: InteractionResponseType.PONG }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Slash command
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const commandName = interaction.data.name
    const subcommand = interaction.data.options?.[0]?.name || ''
    const subOptions = interaction.data.options?.[0]?.options || []
    const subValue = subOptions[0]?.value || ''
    const urlOption = subOptions.find(o => o.name === 'url')?.value || ''

    // /seo help
    if (commandName === 'seo' && subcommand === 'help') {
      return new Response(JSON.stringify({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        data: {
          embeds: [{
            title: '🤖 JukeCoding SEO Bot — Commands',
            description: 'Hier zijn alle beschikbare commands:',
            color: 0x5865F2,
            fields: [
              { name: '── BASIS ──', value: '\u200B', inline: false },
              { name: '/seo check [url?]', value: '⚡ Instant technische scan — titles, H1, canonical. Direct klaar.', inline: false },
              { name: '/seo analyse [url?]', value: '🔍 AI-analyse met verbeterde titels, descriptions en keywords (±30 sec)', inline: false },
              { name: '/seo full [url?]', value: '🔬 Agency-scan — pagina\'s, concurrenten, keyword gaps, actieplan (±60 sec)', inline: false },
              { name: '/seo competitor [url]', value: '🥊 Analyseer één concurrent', inline: false },
              { name: '/seo blog [onderwerp]', value: '📝 Genereer een blogpost draft via GitHub PR', inline: false },
              { name: '── GEAVANCEERD ──', value: '\u200B', inline: false },
              { name: '/seo deep [url?]', value: '🧬 **Full-power 10-sectie analyse** — SEO + GEO + AEO + CRO + off-page + actieplan (±2 min)', inline: false },
              { name: '/seo geo [url?]', value: '🤖 GEO — AI-zoekmachine optimalisatie (ChatGPT, Gemini, Perplexity)', inline: false },
              { name: '/seo aeo [url?]', value: '🎯 AEO — Featured snippets, position zero, People Also Ask', inline: false },
              { name: '/seo cro [url?]', value: '💰 CRO — Conversie optimalisatie, CTA\'s, vertrouwen, UX', inline: false },
              { name: '/seo offpage [url?]', value: '🔗 Off-page — Backlinks, local SEO, directories, brand mentions', inline: false },
              { name: '/seo keywords [url?]', value: '📈 Keyword strategie — High ROI, long-tail, intent mapping, content kalender', inline: false },
              { name: '/seo help', value: 'Dit overzicht', inline: false },
            ],
            footer: { text: 'JukeCoding SEO Bot · jukecoding.be' },
          }],
        },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo check [url?] — instant technische scan, geen AI nodig
    if (commandName === 'seo' && subcommand === 'check') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'check',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `⚡ Technische scan van **${target}** gestart...` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo full [url] — uitgebreide agency-scan
    if (commandName === 'seo' && subcommand === 'full') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'full',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `🔬 Uitgebreide agency-scan van **${target}** gestart... even geduld (±60 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo analyse [url?] — deferred response + trigger worker
    if (commandName === 'seo' && subcommand === 'analyse') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'analyse',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `⏳ SEO-analyse van **${target}** gestart... even geduld (±30 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo competitor [url]
    if (commandName === 'seo' && subcommand === 'competitor') {
      triggerWorker({
        action: 'competitor',
        url: subValue,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `⏳ Concurrent **${subValue}** wordt geanalyseerd...` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo blog [onderwerp]
    if (commandName === 'seo' && subcommand === 'blog') {
      triggerWorker({
        action: 'blog',
        topic: subValue,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `⏳ Blogpost over **"${subValue}"** wordt geschreven...` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo deep [url?] — volledige 10-sectie deep scan
    if (commandName === 'seo' && subcommand === 'deep') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'deep',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `🧬 Deep SEO/GEO/AEO scan van **${target}** gestart... 10 secties worden geanalyseerd (±2 min)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo geo [url?] — GEO analyse
    if (commandName === 'seo' && subcommand === 'geo') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'geo',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `🤖 GEO analyse van **${target}** gestart... AI-vindbaarheid wordt geanalyseerd (±30 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo aeo [url?] — AEO analyse
    if (commandName === 'seo' && subcommand === 'aeo') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'aeo',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `🎯 AEO analyse van **${target}** gestart... featured snippets & position zero (±30 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo cro [url?] — CRO analyse
    if (commandName === 'seo' && subcommand === 'cro') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'cro',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `💰 CRO analyse van **${target}** gestart... conversie-optimalisatie (±30 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo offpage [url?] — Off-page analyse
    if (commandName === 'seo' && subcommand === 'offpage') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'offpage',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `🔗 Off-page SEO analyse van **${target}** gestart... backlinks & local SEO (±30 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // /seo keywords [url?] — Keyword strategie
    if (commandName === 'seo' && subcommand === 'keywords') {
      const target = urlOption || 'jukecoding.be'
      triggerWorker({
        action: 'keywords',
        siteUrl: urlOption,
        interactionToken: interaction.token,
        applicationId: DISCORD_APPLICATION_ID,
      })
      return new Response(JSON.stringify({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE,
        data: { content: `📈 Keyword strategie voor **${target}** gestart... high ROI & long-tail analyse (±45 sec)` },
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // Onbekend command
    return new Response(JSON.stringify({
      type: InteractionResponseType.CHANNEL_MESSAGE,
      data: { content: '❓ Onbekend command. Gebruik `/seo help` voor een overzicht.' },
    }), { headers: { 'Content-Type': 'application/json' } })
  }

  return new Response('Onbekend interaction type', { status: 400 })
}
