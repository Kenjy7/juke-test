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

        <!-- Faux app window: the real Vibemind UI — dark terminal panes -->
        <div class="hero-visual" aria-hidden="true">
          <div class="vmapp">
            <!-- Title bar -->
            <div class="vmapp__bar">
              <span class="vmapp__lights"><i></i><i></i><i></i></span>
              <span class="vmapp__brand"><span class="vmapp__logo"></span>Vibemind</span>
              <span class="vmapp__crumb">
                juke-test <span class="vmapp__sep">&rsaquo;</span>
                <span class="vmapp__path">~/Desktop/juke-test</span>
              </span>
              <span class="vmapp__ready"><span class="vmapp__readydot"></span>2 ready</span>
            </div>

            <!-- Body: workspaces rail + tiled terminal panes -->
            <div class="vmapp__body">
              <aside class="vmapp__side">
                <div class="vmapp__sidehead">{{ t('vibemindView.mockup.workspaces') }}</div>
                <div class="wsrow wsrow--active">
                  <span class="wsrow__dot" style="background: #34d399"></span>juke-test<span
                    class="wsrow__n"
                    >3</span
                  >
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #60a5fa"></span>syndicus<span
                    class="wsrow__n"
                    >1</span
                  >
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #a78bfa"></span>vibemind
                </div>
                <div class="wsrow">
                  <span class="wsrow__dot" style="background: #f59e0b"></span>research
                </div>
              </aside>

              <div class="vmapp__panes">
                <!-- Left: running build agent -->
                <div class="term term--tall">
                  <div class="term__head">
                    <span class="term__dot term__dot--run"></span>claude · build<span
                      class="term__tag"
                      >running</span
                    >
                  </div>
                  <div class="term__screen">
                    <p class="t-dim">~/juke-test on main</p>
                    <p>
                      <span class="t-acc">&rsaquo;</span> {{ t('vibemindView.mockup.buildPrompt') }}
                    </p>
                    <p class="t-bul">● Edit <span class="t-file">CheckoutView.vue</span></p>
                    <p class="t-bul">● Bash <span class="t-dim">npm run test</span></p>
                    <p class="t-ok">✓ 24 passed</p>
                    <p class="t-cur">▋</p>
                  </div>
                </div>
                <!-- Right top: review agent waiting on input -->
                <div class="term term--wait">
                  <div class="term__head">
                    <span class="term__dot term__dot--wait"></span>claude · review<span
                      class="term__badge"
                      >{{ t('vibemindView.mockup.waitingBadge') }}</span
                    >
                  </div>
                  <div class="term__screen">
                    <p class="t-bul">● {{ t('vibemindView.mockup.reviewDone') }}</p>
                    <p>{{ t('vibemindView.mockup.reviewAsk') }}</p>
                    <p class="t-prompt"><span class="t-acc">❯</span><span class="t-cur">▋</span></p>
                  </div>
                </div>
                <!-- Right bottom: tests agent running -->
                <div class="term">
                  <div class="term__head">
                    <span class="term__dot term__dot--run"></span>claude · tests
                  </div>
                  <div class="term__screen">
                    <p class="t-bul">● Bash <span class="t-dim">pytest -q</span></p>
                    <p class="t-dim">{{ t('vibemindView.mockup.testsRunning') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Task drawer: todo / doing / review / done -->
            <div class="vmapp__drawer">
              <div class="kcol">
                <span class="kcol__h"
                  ><i style="background: #94a3b8"></i
                  >{{ t('vibemindView.mockup.kanban.todo') }}</span
                ><span class="kcard">{{ t('vibemindView.mockup.kanban.cardWebhook') }}</span>
              </div>
              <div class="kcol">
                <span class="kcol__h"
                  ><i style="background: #fbbf24"></i
                  >{{ t('vibemindView.mockup.kanban.doing') }}</span
                ><span class="kcard kcard--act">{{
                  t('vibemindView.mockup.kanban.cardCheckout')
                }}</span>
              </div>
              <div class="kcol">
                <span class="kcol__h"
                  ><i style="background: #60a5fa"></i
                  >{{ t('vibemindView.mockup.kanban.review') }}</span
                ><span class="kcard">{{ t('vibemindView.mockup.kanban.cardAuth') }}</span>
              </div>
              <div class="kcol">
                <span class="kcol__h"
                  ><i style="background: #34d399"></i
                  >{{ t('vibemindView.mockup.kanban.done') }}</span
                ><span class="kcard kcard--done">{{
                  t('vibemindView.mockup.kanban.cardLanding')
                }}</span>
              </div>
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
        <div class="shots-grid">
          <figure class="shot" v-for="(s, i) in shots" :key="i">
            <div class="shot__frame">
              <div class="shot__bar"><span></span><span></span><span></span></div>
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
            <figcaption>{{ s.caption }}</figcaption>
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
import emailjs from '@emailjs/browser'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

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

// Drop real screenshots in /public/screenshots/ with these filenames to replace
// the placeholders. Until then a tasteful "Screenshot volgt" frame is shown.
const shots = reactive([
  {
    src: '/screenshots/vibemind-panes.png',
    alt: t('vibemindView.shots.items.panes.alt'),
    caption: t('vibemindView.shots.items.panes.caption'),
    broken: false,
  },
  {
    src: '/screenshots/vibemind-kanban.png',
    alt: t('vibemindView.shots.items.kanban.alt'),
    caption: t('vibemindView.shots.items.kanban.caption'),
    broken: false,
  },
  {
    src: '/screenshots/vibemind-skills.png',
    alt: t('vibemindView.shots.items.skills.alt'),
    caption: t('vibemindView.shots.items.skills.caption'),
    broken: false,
  },
])

const form = reactive({ name: '', email: '', reason: '', website: '' })
const status = ref('idle') // idle | sending | success | error

const submitBeta = async () => {
  if (form.website) return // honeypot tripped → silently ignore bots
  if (!form.email) {
    status.value = 'error'
    return
  }
  status.value = 'sending'
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Map onto the existing contact EmailJS template fields.
    await emailjs.send(
      serviceId,
      templateId,
      {
        service: 'Vibemind beta-inschrijving',
        name: form.name || 'Onbekend',
        lastname: '',
        email: form.email,
        phone: '',
        subject: 'Vibemind beta-inschrijving',
        message: form.reason || 'Geen toelichting opgegeven.',
      },
      publicKey,
    )

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
  title: 'Vibemind — Parallelle AI-agents in één app | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Vibemind is de desktop-tool van Juke om meerdere Claude Code-agents parallel te draaien: panes, kanban, skills en een MCP-server. Schrijf je in voor de beta.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Vibemind — Parallelle AI-agents in één app | Juke' },
    {
      property: 'og:description',
      content:
        'Draai meerdere Claude Code-agents naast elkaar: panes, kanban, skills en MCP. Schrijf je in voor de pre-release beta.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/vibemind' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'Juke' },
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
        author: { '@type': 'Organization', name: 'Juke', url: 'https://jukecoding.be' },
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
  padding: var(--hero-pad-top) var(--space-8) var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--space-16);
  align-items: center;
  width: 100%;
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

/* Title bar */
.vmapp__bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--vm-panel);
  border-bottom: 1px solid var(--vm-line);
}
.vmapp__lights {
  display: inline-flex;
  gap: 6px;
}
.vmapp__lights i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a323d;
}
.vmapp__lights i:nth-child(1) {
  background: #ff5f57;
  opacity: 0.85;
}
.vmapp__lights i:nth-child(2) {
  background: #febc2e;
  opacity: 0.85;
}
.vmapp__lights i:nth-child(3) {
  background: #28c840;
  opacity: 0.85;
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
  color: var(--vm-accent);
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.25);
  padding: 3px 8px;
  border-radius: var(--radius-full);
}
.vmapp__readydot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vm-accent);
  box-shadow: 0 0 6px var(--vm-accent);
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

/* Body */
.vmapp__body {
  display: grid;
  grid-template-columns: 116px 1fr;
  min-height: 268px;
}
.vmapp__side {
  border-right: 1px solid var(--vm-line);
  background: var(--vm-panel);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.vmapp__sidehead {
  font-size: 9px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
  padding-left: 4px;
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
  background: rgba(52, 211, 153, 0.1);
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

/* Tiled terminal panes (mosaic: one tall left, two stacked right) */
.vmapp__panes {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  background: var(--vm-line);
}
.term {
  background: var(--vm-panel);
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}
.term--tall {
  grid-row: span 2;
}
.term__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-3);
  font-size: 10px;
  color: var(--vm-dim);
  border-bottom: 1px solid var(--vm-line);
  background: rgba(255, 255, 255, 0.015);
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
.term__dot--wait {
  background: var(--vm-warn);
  box-shadow: 0 0 6px var(--vm-warn);
}
.term__tag {
  margin-left: auto;
  font-size: 9px;
  color: var(--vm-muted);
}
.term__badge {
  margin-left: auto;
  font-size: 8.5px;
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vm-warn);
  background: rgba(245, 158, 11, 0.12);
  padding: 2px 6px;
  border-radius: var(--radius-full);
}
.term--wait {
  background: rgba(245, 158, 11, 0.04);
}
.term__screen {
  flex: 1;
  background: var(--vm-screen);
  padding: var(--space-3);
  font-size: 10.5px;
  line-height: 1.55;
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
.t-prompt {
  margin-top: 2px;
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

/* Task drawer */
.vmapp__drawer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--vm-panel);
  border-top: 1px solid var(--vm-line);
}
.kcol {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.kcol__h {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  i {
    width: 6px;
    height: 6px;
    border-radius: 2px;
  }
}
.kcard {
  font-size: 10px;
  color: var(--vm-dim);
  background: var(--vm-bg);
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  padding: 5px 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kcard--act {
  border-color: rgba(245, 158, 11, 0.4);
  color: var(--vm-text);
}
.kcard--done {
  color: var(--vm-muted);
  text-decoration: line-through;
  opacity: 0.7;
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
.shots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.shot {
  margin: 0;
}
.shot__frame {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-ambient);
}
.shot__bar {
  display: flex;
  gap: 5px;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-border-hover);
  }
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
.shot figcaption {
  margin-top: var(--space-3);
  text-align: center;
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
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
  .features-grid,
  .shots-grid {
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
    padding: var(--hero-pad-top) var(--space-6) var(--hero-pad-bottom);
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
  .features-grid,
  .shots-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
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
