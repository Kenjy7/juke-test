<template>
  <BackgroundWeb>
    <!-- ───────────── Hero ───────────── -->
    <section class="vm-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('vibemindView.hero.eyebrow') }}
          </div>
          <h1>
            Vibemind —
            <span class="highlight">{{ t('vibemindView.hero.titleHighlight') }}</span>
          </h1>
          <p class="subtitle">
            {{ t('vibemindView.hero.subtitle') }}
          </p>
          <div class="hero-buttons">
            <a href="#beta" class="btn btn--accent btn--lg">
              {{ t('vibemindView.hero.ctaBeta') }}
              <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5M12 4V11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#screenshots" class="btn btn--secondary btn--lg">
              {{ t('vibemindView.hero.ctaApp') }}
            </a>
          </div>
          <p class="hero-note">
            {{ t('vibemindView.hero.note') }}
          </p>
        </div>

        <!-- Faux app window: the real Vibemind UI — workspaces · terminal · skills -->
        <div class="hero-visual" aria-hidden="true">
          <div class="vmapp">
            <!-- Top bar -->
            <div class="vmapp__top">
              <span class="vmapp__brand"><span class="vmapp__logo"></span>Vibemind</span>
              <span class="vmapp__crumb">
                juke-test <span class="vmapp__sep">&rsaquo;</span>
                <span class="vmapp__path">~/Desktop/chatbot-/juke-test</span>
              </span>
              <span class="vmapp__actions">
                <span class="vmapp__ready"><span class="vmapp__readydot"></span>2 ready</span>
                <span class="vmapp__btn">Files</span>
                <span class="vmapp__btn">Tasks</span>
                <span class="vmapp__btn vmapp__btn--cta">+ Spawn</span>
              </span>
            </div>

            <!-- Body: workspaces rail · terminal pane · skills rail -->
            <div class="vmapp__body">
              <aside class="vmapp__side">
                <div class="vmapp__sidehead">
                  {{ t('vibemindView.mockup.workspaces') }}<span class="vmapp__plus">+</span>
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #34d399"></span>Juke
                </div>
                <div class="wsrow wsrow--active">
                  <span class="wsrow__dot" style="background: #60a5fa"></span>juke-test<span
                    class="wsrow__n"
                    >1</span
                  >
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #a78bfa"></span>Syndicus
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #34d399"></span>vibemind
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #f59e0b"></span>research
                </div>
              </aside>

              <!-- Center terminal pane — a live Claude Code session -->
              <div class="vmapp__main">
                <div class="term__head">
                  <span class="term__dot term__dot--run"></span>Claude
                  <span class="term__sub">claude</span>
                  <span class="term__win">&hellip; &#x21bb; &times;</span>
                </div>
                <div class="term__screen">
                  <p class="t-dim">─ Claude Code v2.1.177 ───────────────</p>
                  <p class="t-strong">Welcome back kenjy!</p>
                  <p class="t-dim">Opus 4.8 (1M context) · Claude Max</p>
                  <p class="t-dim">~/Desktop/chatbot-/juke-test</p>
                  <p>&nbsp;</p>
                  <p>
                    <span class="t-acc">&rsaquo;</span> {{ t('vibemindView.mockup.buildPrompt') }}
                  </p>
                  <p class="t-bul">● Edit <span class="t-file">CheckoutView.vue</span></p>
                  <p class="t-bul">● Bash <span class="t-dim">npm run test</span></p>
                  <p class="t-ok">✓ 24 passed</p>
                  <p class="t-cur">▋</p>
                </div>
              </div>

              <!-- Skills rail -->
              <aside class="vmapp__skills">
                <div class="vmapp__sidehead">
                  {{ t('vibemindView.mockup.skills') }}<span class="vmapp__count">60</span>
                </div>
                <div class="skillsearch">{{ t('vibemindView.mockup.searchSkills') }}</div>
                <div class="skillcat">Frontend</div>
                <div class="skillcard">
                  <span class="skillcard__name">VibeA11y</span><span class="skillcard__tag">A11Y</span>
                </div>
                <div class="skillcard">
                  <span class="skillcard__name">VibeResponsive</span
                  ><span class="skillcard__tag">RESP</span>
                </div>
                <div class="skillcard">
                  <span class="skillcard__name">VibeFormulieren</span
                  ><span class="skillcard__tag">FORMS</span>
                </div>
                <div class="skillcard">
                  <span class="skillcard__name">VibeData</span><span class="skillcard__tag">DATA</span>
                </div>
                <div class="skillcard">
                  <span class="skillcard__name">VibeTokens</span
                  ><span class="skillcard__tag">TOKENS</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── What is it ───────────── -->
    <section class="vm-intro">
      <div class="container intro-grid">
        <h2>{{ t('vibemindView.intro.title') }}</h2>
        <div class="intro-body">
          <p>
            {{ t('vibemindView.intro.p1') }}
          </p>
          <p>
            {{ t('vibemindView.intro.p2a') }} <strong>workspaces</strong>
            {{ t('vibemindView.intro.p2b') }} <strong>panes</strong>
            {{ t('vibemindView.intro.p2c') }}
            <strong>{{ t('vibemindView.intro.p2skill') }}</strong>
            {{ t('vibemindView.intro.p2d') }} <strong>MCP-server</strong>
            {{ t('vibemindView.intro.p2e') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ───────────── Features ───────────── -->
    <section class="vm-features">
      <div class="container">
        <h2>{{ t('vibemindView.features.title') }}</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="f in features" :key="f.title">
            <div class="feature-card__icon" v-html="f.icon" aria-hidden="true"></div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── Screenshots ───────────── -->
    <section class="vm-shots" id="screenshots">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('vibemindView.shots.title') }}</h2>
          <p>{{ t('vibemindView.shots.subtitle') }}</p>
        </div>
        <div class="shots-rows">
          <figure
            class="shot"
            :class="{ 'shot--reverse': i % 2 === 1 }"
            v-for="(s, i) in shots"
            :key="i"
          >
            <div class="shot__media">
              <img
                v-if="!s.broken"
                :src="s.src"
                :alt="s.alt"
                loading="lazy"
                decoding="async"
                class="shot__img"
                @error="s.broken = true"
              />
              <div v-else class="shot__placeholder">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="9.5" r="1.5" />
                  <path d="M21 15l-5-5L5 18" />
                </svg>
                <span>{{ t('vibemindView.shots.placeholder') }}</span>
              </div>
            </div>
            <figcaption class="shot__text">
              <h3>{{ s.caption }}</h3>
              <p>{{ s.desc }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ───────────── Beta signup ───────────── -->
    <section class="vm-beta" id="beta">
      <div class="container beta-card">
        <div class="beta-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('vibemindView.beta.eyebrow') }}
          </div>
          <h2>{{ t('vibemindView.beta.title') }}</h2>
          <p>
            {{ t('vibemindView.beta.lead') }}
          </p>
          <ul class="beta-points">
            <li>{{ t('vibemindView.beta.point1') }}</li>
            <li>{{ t('vibemindView.beta.point2') }}</li>
            <li>{{ t('vibemindView.beta.point3') }}</li>
          </ul>
        </div>

        <form class="beta-form" @submit.prevent="submitBeta" novalidate>
          <h3>{{ t('vibemindView.beta.formTitle') }}</h3>

          <div class="field">
            <label for="vm-name">{{ t('vibemindView.beta.nameLabel') }}</label>
            <input
              id="vm-name"
              type="text"
              v-model.trim="form.name"
              :placeholder="t('vibemindView.beta.namePlaceholder')"
              autocomplete="name"
            />
          </div>

          <div class="field">
            <label for="vm-email"
              >{{ t('vibemindView.beta.emailLabel') }} <span class="req">*</span></label
            >
            <input
              id="vm-email"
              type="email"
              v-model.trim="form.email"
              required
              placeholder="je@email.com"
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label for="vm-reason"
              >{{ t('vibemindView.beta.reasonLabel') }}
              <span class="opt">{{ t('vibemindView.beta.optional') }}</span></label
            >
            <textarea
              id="vm-reason"
              rows="3"
              v-model.trim="form.reason"
              :placeholder="t('vibemindView.beta.reasonPlaceholder')"
            ></textarea>
          </div>

          <!-- honeypot -->
          <input
            type="text"
            v-model="form.website"
            class="hp"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <button
            type="submit"
            class="btn btn--accent btn--lg beta-submit"
            :disabled="status === 'sending'"
          >
            <span v-if="status === 'sending'">{{ t('vibemindView.beta.submitSending') }}</span>
            <span v-else>{{ t('vibemindView.beta.submit') }}</span>
          </button>

          <p v-if="status === 'success'" class="form-msg form-msg--ok" role="status">
            {{ t('vibemindView.beta.success') }}
          </p>
          <p v-else-if="status === 'error'" class="form-msg form-msg--err" role="alert">
            {{ t('vibemindView.beta.errorPrefix') }}
            <a href="mailto:contact@jukecoding.be">contact@jukecoding.be</a>.
          </p>
        </form>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import vibemind1 from '@/assets/Vibemind1.webp'
import vibemind2 from '@/assets/Vibemind2.webp'
import vibemind3 from '@/assets/Vibemind3.webp'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('vibemindView.features.items.panes.title'),
    description: t('vibemindView.features.items.panes.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/></svg>',
  },
  {
    title: t('vibemindView.features.items.kanban.title'),
    description: t('vibemindView.features.items.kanban.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="5" height="14" rx="1"/><rect x="10" y="3" width="5" height="9" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>',
  },
  {
    title: t('vibemindView.features.items.skills.title'),
    description: t('vibemindView.features.items.skills.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg>',
  },
  {
    title: t('vibemindView.features.items.mcp.title'),
    description: t('vibemindView.features.items.mcp.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/></svg>',
  },
  {
    title: t('vibemindView.features.items.voice.title'),
    description: t('vibemindView.features.items.voice.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  },
  {
    title: t('vibemindView.features.items.workspaces.title'),
    description: t('vibemindView.features.items.workspaces.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M9 13h6"/></svg>',
  },
])

const shots = reactive([
  {
    src: vibemind1,
    alt: t('vibemindView.shots.items.panes.alt'),
    caption: t('vibemindView.shots.items.panes.caption'),
    desc: t('vibemindView.shots.items.panes.desc'),
    broken: false,
  },
  {
    src: vibemind2,
    alt: t('vibemindView.shots.items.kanban.alt'),
    caption: t('vibemindView.shots.items.kanban.caption'),
    desc: t('vibemindView.shots.items.kanban.desc'),
    broken: false,
  },
  {
    src: vibemind3,
    alt: t('vibemindView.shots.items.skills.alt'),
    caption: t('vibemindView.shots.items.skills.caption'),
    desc: t('vibemindView.shots.items.skills.desc'),
    broken: false,
  },
])

const form = reactive({ name: '', email: '', reason: '', website: '' })
const status = ref('idle') // idle | sending | success | error

const submitBeta = async () => {
  if (form.website) {
    // honeypot tripped → pretend it worked, store nothing
    status.value = 'success'
    return
  }
  if (!form.email) {
    status.value = 'error'
    return
  }
  status.value = 'sending'

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  try {
    // INSERT into the Supabase `signups` table via the REST API. RLS only
    // allows INSERT with the anon key, so this is safe to run client-side.
    const res = await fetch(`${supabaseUrl}/rest/v1/signups`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email: form.email,
        name: form.name || null,
        reason: form.reason || null,
        source: 'website',
      }),
    })

    if (!res.ok) throw new Error(`Supabase responded ${res.status}`)

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.reason = ''
  } catch (err) {
    console.error('Vibemind beta signup error:', err)
    status.value = 'error'
  }
}

useHead({
  title: 'Vibemind — Parallelle AI-agents in één app | JukeCoding',
  meta: [
    {
      name: 'description',
      content:
        'Vibemind is de desktop-tool van JukeCoding om meerdere Claude Code-agents parallel te draaien: panes, kanban, skills en een MCP-server. Schrijf je in voor de beta.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Vibemind — Parallelle AI-agents in één app | JukeCoding' },
    {
      property: 'og:description',
      content:
        'Draai meerdere Claude Code-agents naast elkaar: panes, kanban, skills en MCP. Schrijf je in voor de pre-release beta.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/vibemind' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Vibemind — Parallelle AI-agents in één app' },
    {
      name: 'twitter:description',
      content: 'Draai meerdere Claude Code-agents naast elkaar. Schrijf je in voor de beta.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/vibemind' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Vibemind',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'macOS',
        description:
          'Desktop-tool om meerdere Claude Code-agents parallel te draaien met panes, kanban, skills en een MCP-server.',
        url: 'https://jukecoding.be/vibemind',
        author: { '@type': 'Organization', name: 'JukeCoding', url: 'https://jukecoding.be' },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Gratis tijdens de pre-release beta',
        },
      }),
    },
  ],
})
</script>

<style scoped lang="scss">
.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Hero ── */
.vm-hero {
  padding: calc(var(--space-32) + 1rem) var(--space-8) var(--space-20);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-copy {
  animation: fade-up 0.7s var(--ease-out-expo) 0.1s both;
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-5);
}
.eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

h1 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-5) 0;
}
.highlight {
  color: var(--color-accent);
}

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-8);
  max-width: 52ch;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.hero-note {
  margin: var(--space-5) 0 0;
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
}

/* ── Vibemind app mockup — authentic dark terminal UI ──
   Self-contained dark palette (matches the real app: --bg #06080c,
   mint accent #34d399), so the window reads as a real product shot
   against the light marketing page. */
.hero-visual {
  animation: fade-up 0.7s var(--ease-out-expo) both;
}
.vmapp {
  --vm-bg: #090d13;
  --vm-panel: #0c1118;
  --vm-screen: #06080c;
  --vm-line: #1f2733;
  --vm-text: #e6edf3;
  --vm-dim: #8b95a5;
  --vm-muted: #5a6478;
  --vm-accent: #34d399;
  --vm-warn: #f59e0b;
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--vm-bg);
  box-shadow:
    0 24px 60px -20px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.02);
  font-family: var(--font-mono);
  color: var(--vm-text);
}

/* Top bar */
.vmapp__top {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--vm-panel);
  border-bottom: 1px solid var(--vm-line);
}
.vmapp__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}
.vmapp__btn {
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--vm-dim);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--vm-line);
}
.vmapp__btn--cta {
  color: var(--vm-warn);
  border-color: rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.1);
  font-weight: var(--weight-semibold);
}
.vmapp__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: 12px;
  color: var(--vm-text);
}
.vmapp__logo {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background: linear-gradient(135deg, #34d399 0%, #60a5fa 100%);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.4);
}
.vmapp__crumb {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  color: var(--vm-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vmapp__sep {
  color: var(--vm-muted);
  margin: 0 4px;
}
.vmapp__path {
  color: var(--vm-muted);
}
.vmapp__ready {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: var(--weight-semibold);
  color: var(--vm-warn);
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.28);
  padding: 3px 8px;
  border-radius: var(--radius-full);
}
.vmapp__readydot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vm-warn);
  box-shadow: 0 0 6px var(--vm-warn);
  animation: vm-pulse 1.8s ease-in-out infinite;
}
@keyframes vm-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* Body: workspaces · terminal · skills */
.vmapp__body {
  display: grid;
  grid-template-columns: 116px 1fr 158px;
  min-height: 320px;
}
.vmapp__side,
.vmapp__skills {
  background: var(--vm-panel);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.vmapp__side {
  border-right: 1px solid var(--vm-line);
}
.vmapp__skills {
  border-left: 1px solid var(--vm-line);
}
.vmapp__sidehead {
  display: flex;
  align-items: center;
  font-size: 9px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
  padding-left: 4px;
}
.vmapp__plus {
  margin-left: auto;
  color: var(--vm-muted);
}
.vmapp__count {
  margin-left: auto;
  font-size: 9px;
  color: var(--vm-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 5px;
  border-radius: var(--radius-full);
}
.wsrow {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px 6px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-family: var(--font-sans);
  color: var(--vm-dim);
}
.wsrow--active {
  background: rgba(96, 165, 250, 0.12);
  color: var(--vm-text);
}
.wsrow__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.wsrow__n {
  margin-left: auto;
  font-size: 9px;
  color: var(--vm-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 5px;
  border-radius: var(--radius-full);
}

/* Center terminal pane */
.vmapp__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--vm-screen);
}
.term__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-3);
  font-size: 10px;
  font-family: var(--font-sans);
  color: var(--vm-dim);
  border-bottom: 1px solid var(--vm-line);
  background: var(--vm-panel);
}
.term__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.term__dot--run {
  background: var(--vm-accent);
  box-shadow: 0 0 6px var(--vm-accent);
}
.term__sub {
  color: var(--vm-muted);
  font-family: var(--font-mono);
}
.term__win {
  margin-left: auto;
  color: var(--vm-muted);
  letter-spacing: 1px;
}
.term__screen {
  flex: 1;
  padding: var(--space-4);
  font-size: 11px;
  line-height: 1.6;
  overflow: hidden;
}
.term__screen p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.t-dim {
  color: var(--vm-muted);
}
.t-strong {
  color: var(--vm-text);
  font-weight: var(--weight-semibold);
}
.t-acc {
  color: var(--vm-accent);
}
.t-bul {
  color: var(--vm-dim);
}
.t-file {
  color: #60a5fa;
}
.t-ok {
  color: var(--vm-accent);
}
.t-cur {
  color: var(--vm-accent);
  animation: vm-blink 1.1s step-end infinite;
}
@keyframes vm-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Skills rail */
.skillsearch {
  font-size: 10px;
  color: var(--vm-muted);
  background: var(--vm-bg);
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  padding: 5px 8px;
  margin-bottom: var(--space-2);
  font-family: var(--font-sans);
}
.skillcat {
  font-size: 8.5px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  margin: 2px 0 4px;
  padding-left: 2px;
}
.skillcard {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  background: var(--vm-bg);
}
.skillcard__name {
  font-size: 10.5px;
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  color: var(--vm-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.skillcard__tag {
  margin-left: auto;
  font-size: 7.5px;
  letter-spacing: 0.04em;
  color: var(--vm-muted);
  flex-shrink: 0;
}

/* ── Intro ── */
.vm-intro {
  padding: var(--space-16) var(--space-8);
}
.intro-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: var(--space-12);
  align-items: start;
}
.vm-intro h2 {
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0;
}
.intro-body p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-5);
  &:last-child {
    margin-bottom: 0;
  }
  strong {
    color: var(--color-text-primary);
    font-weight: var(--weight-semibold);
  }
}

/* ── Features ── */
.vm-features {
  padding: var(--space-16) var(--space-8);
}
.vm-features h2 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin: 0 0 var(--space-12) 0;
  letter-spacing: var(--tracking-tight);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.feature-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all var(--transition-smooth);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
  }

  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--color-primary-subtle);
    color: var(--color-accent);
    margin-bottom: var(--space-5);
    :deep(svg) {
      width: 22px;
      height: 22px;
    }
  }
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-3) 0;
  }
  p {
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── Screenshots ── */
.vm-shots {
  padding: var(--space-16) var(--space-8);
}
.section-head {
  text-align: center;
  margin-bottom: var(--space-12);
}
.section-head h2 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-3);
}
.section-head p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0;
}
.shots-rows {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}
.shot {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  gap: var(--space-10);
  margin: 0;
}
.shot--reverse .shot__media {
  order: 2;
}
.shot__media {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-ambient);
}
.shot__text h3 {
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-3);
}
.shot__text p {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}
.shot__img {
  display: block;
  width: 100%;
  height: auto;
}
.shot__placeholder {
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  background: var(--color-bg-sunken);
  color: var(--color-text-tertiary);
  svg {
    width: 36px;
    height: 36px;
    opacity: 0.6;
  }
  span {
    font-size: var(--text-small);
  }
}
/* ── Beta ── */
.vm-beta {
  padding: var(--space-16) var(--space-8) var(--space-24);
}
.beta-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-16);
}
.beta-copy h2 {
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-4);
}
.beta-copy p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-6);
}
.beta-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  li {
    position: relative;
    padding-left: var(--space-6);
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-accent);
    }
  }
}

.beta-form {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-6);
  }
}
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  label {
    font-size: var(--text-small);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
  }
  .req {
    color: var(--color-error);
  }
  .opt {
    color: var(--color-text-tertiary);
    font-weight: var(--weight-regular);
  }
  input,
  textarea {
    font-family: inherit;
    font-size: var(--text-body);
    color: var(--color-text-primary);
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.7rem 0.9rem;
    transition: border-color var(--transition-fast);
    &::placeholder {
      color: var(--color-text-tertiary);
    }
    &:focus {
      outline: none;
      border-color: var(--color-border-active);
    }
  }
  textarea {
    resize: vertical;
  }
}
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.beta-submit {
  width: 100%;
  justify-content: center;
  margin-top: var(--space-2);
}
.form-msg {
  margin: var(--space-4) 0 0;
  font-size: var(--text-small);
  line-height: var(--leading-normal);
  &--ok {
    color: var(--color-success);
  }
  &--err {
    color: var(--color-error);
    a {
      color: inherit;
    }
  }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .hero-copy {
    order: -1;
  }
  .hero-visual {
    max-width: 540px;
  }
  .intro-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .beta-card {
    grid-template-columns: 1fr;
    gap: var(--space-10);
    padding: var(--space-12);
  }
}

@media (max-width: 768px) {
  .vm-hero {
    padding: var(--space-32) var(--space-6) var(--space-16);
  }
  h1 {
    font-size: var(--text-h2);
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    .btn {
      width: 100%;
    }
  }
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .shot {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }
  .shot--reverse .shot__media {
    order: 0;
  }
  .vmapp__body {
    grid-template-columns: 104px 1fr;
  }
  .vmapp__skills {
    display: none;
  }
  .vm-intro,
  .vm-features,
  .vm-shots,
  .vm-beta {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
  .beta-card {
    padding: var(--space-8);
  }
}
</style>