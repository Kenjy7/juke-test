<template>
  <BackgroundWeb>
    <!-- ───────────── Hero ───────────── -->
    <section class="bh-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('beheerlyView.hero.eyebrow') }}
          </div>
          <h1>
            {{ t('beheerlyView.hero.titleLead') }}
            <span class="highlight">{{ t('beheerlyView.hero.titleHighlight') }}</span>
          </h1>
          <p class="subtitle">
            {{ t('beheerlyView.hero.subtitle') }}
          </p>
          <div class="hero-buttons">
            <router-link to="/contact" class="btn btn--accent btn--lg">
              {{ t('beheerlyView.hero.ctaPrimary') }}
              <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5M12 4V11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
            <a
              href="mailto:contact@jukecoding.be?subject=Interesse%20in%20Beheerly"
              class="btn btn--secondary btn--lg"
            >
              {{ t('beheerlyView.hero.ctaMail') }}
            </a>
          </div>
          <p class="hero-note">
            {{ t('beheerlyView.hero.note') }}
          </p>
        </div>

        <!-- App visual: syndicus dashboard mockup -->
        <div class="hero-visual" aria-hidden="true">
          <div class="appwin">
            <div class="appwin__bar">
              <span class="dd"></span><span class="dd"></span><span class="dd"></span>
              <span class="appwin__title">app.beheerly.be/dashboard</span>
            </div>
            <div class="appwin__shell">
              <!-- Sidebar -->
              <aside class="appnav">
                <div class="appnav__brand">
                  <span class="appnav__logo"></span>
                  Beheerly
                </div>
                <nav class="appnav__list">
                  <span
                    class="appnav__item"
                    v-for="n in nav"
                    :key="n.label"
                    :class="{ 'appnav__item--active': n.active }"
                  >
                    <span class="appnav__ico" v-html="n.icon"></span>
                    {{ n.label }}
                  </span>
                </nav>
              </aside>

              <!-- Main panel -->
              <div class="appmain">
                <div class="appmain__head">
                  <span class="appmain__title">{{ t('beheerlyView.mockup.dashboardTitle') }}</span>
                  <span class="appmain__sub">{{ t('beheerlyView.mockup.dashboardSub') }}</span>
                </div>

                <div class="statrow">
                  <div class="stat" v-for="s in stats" :key="s.label">
                    <span class="stat__val">{{ s.value }}</span>
                    <span class="stat__lbl">{{ s.label }}</span>
                  </div>
                </div>

                <div class="tickets">
                  <span class="tickets__head">{{ t('beheerlyView.mockup.recentTickets') }}</span>
                  <div class="trow" v-for="(t, i) in tickets" :key="i">
                    <span class="trow__main">
                      <span class="trow__title">
                        {{ t.title }}
                        <svg
                          v-if="t.ai"
                          class="trow__ai"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2l1.6 4.8L18 8.4l-4.4 1.6L12 15l-1.6-5L6 8.4l4.4-1.6L12 2z"
                          />
                        </svg>
                      </span>
                      <span class="trow__meta">{{ t.meta }}</span>
                    </span>
                    <span class="badge" :class="'badge--' + t.tone">{{ t.badge }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── What is it ───────────── -->
    <section class="bh-intro">
      <div class="container intro-grid">
        <h2>{{ t('beheerlyView.intro.title') }}</h2>
        <div class="intro-body">
          <p>
            {{ t('beheerlyView.intro.paragraph1') }}
          </p>
          <p>
            <strong>Beheerly</strong> {{ t('beheerlyView.intro.paragraph2a') }} <strong>AI</strong>
            {{ t('beheerlyView.intro.paragraph2b') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ───────────── Flow ───────────── -->
    <section class="bh-flow">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.flow.title') }}</h2>
          <p>{{ t('beheerlyView.flow.subtitle') }}</p>
        </div>
        <ol class="flow-steps">
          <li class="flow-step" v-for="(s, i) in steps" :key="s.title">
            <span class="flow-step__num">{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ───────────── Features ───────────── -->
    <section class="bh-features">
      <div class="container">
        <h2>{{ t('beheerlyView.features.title') }}</h2>
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
    <section class="bh-shots" id="screenshots">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.shots.title') }}</h2>
          <p>{{ t('beheerlyView.shots.subtitle') }}</p>
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
                <span>{{ t('beheerlyView.shots.placeholder') }}</span>
              </div>
            </div>
            <figcaption>{{ s.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ───────────── FAQ ───────────── -->
    <section class="bh-faq" id="faq">
      <div class="container faq-narrow">
        <div class="section-head">
          <h2>{{ t('beheerlyView.faq.title') }}</h2>
          <p>
            {{ t('beheerlyView.faq.leadBefore') }}
            <a href="mailto:contact@jukecoding.be?subject=Vraag%20over%20Beheerly">{{
              t('beheerlyView.faq.leadLink')
            }}</a>
            {{ t('beheerlyView.faq.leadAfter') }}
          </p>
        </div>
        <div class="faq-list">
          <details class="faq-item" v-for="(q, i) in faqs" :key="i">
            <summary>
              {{ q.question }}
              <svg class="faq-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </summary>
            <p>{{ q.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ───────────── CTA ───────────── -->
    <section class="bh-cta">
      <div class="container cta-card">
        <h2>{{ t('beheerlyView.cta.title') }}</h2>
        <p>
          {{ t('beheerlyView.cta.body') }}
        </p>
        <div class="cta-actions">
          <router-link to="/contact" class="btn btn--accent btn--lg">
            {{ t('beheerlyView.cta.ctaContact') }}
            <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
          <a href="#faq" class="btn btn--secondary btn--lg">{{ t('beheerlyView.cta.ctaFaq') }}</a>
          <a
            href="mailto:contact@jukecoding.be?subject=Interesse%20in%20Beheerly"
            class="btn btn--secondary btn--lg"
            >{{ t('beheerlyView.cta.ctaMail') }}</a
          >
        </div>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

const { t } = useI18n()

const nav = computed(() => [
  {
    label: t('beheerlyView.mockup.nav.dashboard'),
    active: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.buildings'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18M5 21V5l8-2v18M19 21V11l-6-2"/><path d="M9 8h.01M9 12h.01M9 16h.01"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.tickets'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 8l9 5 9-5M3 8l9-5 9 5v8l-9 5-9-5V8z"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.inbox'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h16v12H4zM4 16l3-3h10l3 3"/><path d="M9 13a3 3 0 0 0 6 0"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.quotes'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.siteFollowup'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 20h20M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.claims'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l9 16H3L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.meetings'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M18 20a6 6 0 0 0-3-5.2"/></svg>',
  },
])

const stats = computed(() => [
  { value: '12', label: t('beheerlyView.mockup.stats.buildings') },
  { value: '5', label: t('beheerlyView.mockup.stats.openTickets') },
  { value: '3', label: t('beheerlyView.mockup.stats.openQuotes') },
])

const tickets = computed(() => [
  {
    title: t('beheerlyView.mockup.tickets.t1.title'),
    meta: t('beheerlyView.mockup.tickets.t1.meta'),
    badge: t('beheerlyView.mockup.tickets.t1.badge'),
    tone: 'urgent',
    ai: true,
  },
  {
    title: t('beheerlyView.mockup.tickets.t2.title'),
    meta: t('beheerlyView.mockup.tickets.t2.meta'),
    badge: t('beheerlyView.mockup.tickets.t2.badge'),
    tone: 'open',
  },
  {
    title: t('beheerlyView.mockup.tickets.t3.title'),
    meta: t('beheerlyView.mockup.tickets.t3.meta'),
    badge: t('beheerlyView.mockup.tickets.t3.badge'),
    tone: 'accent',
  },
  {
    title: t('beheerlyView.mockup.tickets.t4.title'),
    meta: t('beheerlyView.mockup.tickets.t4.meta'),
    badge: t('beheerlyView.mockup.tickets.t4.badge'),
    tone: 'done',
  },
])

const steps = computed(() => [
  {
    title: t('beheerlyView.steps.complaint.title'),
    description: t('beheerlyView.steps.complaint.description'),
  },
  {
    title: t('beheerlyView.steps.quoteRequest.title'),
    description: t('beheerlyView.steps.quoteRequest.description'),
  },
  {
    title: t('beheerlyView.steps.award.title'),
    description: t('beheerlyView.steps.award.description'),
  },
  {
    title: t('beheerlyView.steps.siteFollowup.title'),
    description: t('beheerlyView.steps.siteFollowup.description'),
  },
  {
    title: t('beheerlyView.steps.delivery.title'),
    description: t('beheerlyView.steps.delivery.description'),
  },
])

const features = computed(() => [
  {
    title: t('beheerlyView.featureCards.syndics.title'),
    description: t('beheerlyView.featureCards.syndics.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3"/><path d="M9 9h.01M9 13h.01M9 17h.01"/></svg>',
  },
  {
    title: t('beheerlyView.featureCards.residents.title'),
    description: t('beheerlyView.featureCards.residents.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg>',
  },
  {
    title: t('beheerlyView.featureCards.contractors.title'),
    description: t('beheerlyView.featureCards.contractors.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 7l-1.5-1.5a2 2 0 0 0-2.8 0L4 11.2V14h2.8l5.7-5.7a2 2 0 0 0 0-2.8z"/><path d="M14 7l3 3M4 20h16"/></svg>',
  },
  {
    title: t('beheerlyView.featureCards.ai.title'),
    description: t('beheerlyView.featureCards.ai.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
  },
  {
    title: t('beheerlyView.featureCards.perBuilding.title'),
    description: t('beheerlyView.featureCards.perBuilding.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/></svg>',
  },
  {
    title: t('beheerlyView.featureCards.webMobile.title'),
    description: t('beheerlyView.featureCards.webMobile.description'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  },
])

// Drop real screenshots in /public/screenshots/ with these filenames to replace
// the placeholders. Until then a tasteful "Screenshot volgt" frame is shown.
const shots = reactive([
  {
    src: '/screenshots/beheerly-dashboard.png',
    alt: t('beheerlyView.shotsItems.dashboard.alt'),
    caption: t('beheerlyView.shotsItems.dashboard.caption'),
    broken: false,
  },
  {
    src: '/screenshots/beheerly-melding.png',
    alt: t('beheerlyView.shotsItems.report.alt'),
    caption: t('beheerlyView.shotsItems.report.caption'),
    broken: false,
  },
  {
    src: '/screenshots/beheerly-offertes.png',
    alt: t('beheerlyView.shotsItems.quotes.alt'),
    caption: t('beheerlyView.shotsItems.quotes.caption'),
    broken: false,
  },
])

const faqs = computed(() => [
  {
    question: t('beheerlyView.faqItems.q1.question'),
    answer: t('beheerlyView.faqItems.q1.answer'),
  },
  {
    question: t('beheerlyView.faqItems.q2.question'),
    answer: t('beheerlyView.faqItems.q2.answer'),
  },
  {
    question: t('beheerlyView.faqItems.q3.question'),
    answer: t('beheerlyView.faqItems.q3.answer'),
  },
  {
    question: t('beheerlyView.faqItems.q4.question'),
    answer: t('beheerlyView.faqItems.q4.answer'),
  },
  {
    question: t('beheerlyView.faqItems.q5.question'),
    answer: t('beheerlyView.faqItems.q5.answer'),
  },
])

useHead({
  title: 'Beheerly — Software voor syndici & mede-eigendommen | JukeCoding',
  meta: [
    {
      name: 'description',
      content:
        'Beheerly is het platform van JukeCoding voor het beheer van Belgische mede-eigendommen: van melding tot oplevering, met AI voor triage, offertes en samenvattingen. Vraag een demo.',
    },
    { name: 'robots', content: 'index, follow' },
    {
      property: 'og:title',
      content: 'Beheerly — Software voor syndici & mede-eigendommen | JukeCoding',
    },
    {
      property: 'og:description',
      content:
        'Eén platform voor syndici, aannemers en bewoners: melding → offerte → gunning → werf → oplevering, met AI. Vraag uitleg of een demo.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/beheerly' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Beheerly — Software voor syndici & mede-eigendommen' },
    {
      name: 'twitter:description',
      content: 'Eén platform voor het beheer van mede-eigendommen, met AI. Vraag een demo.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/beheerly' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Beheerly',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android (PWA)',
        description:
          'Web- en mobiel platform voor het beheer van Belgische mede-eigendommen. Verbindt syndici, aannemers en bewoners van melding tot oplevering, met AI.',
        url: 'https://jukecoding.be/beheerly',
        author: { '@type': 'Organization', name: 'JukeCoding', url: 'https://jukecoding.be' },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
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
.bh-hero {
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
  max-width: 54ch;
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

/* ── Dashboard app mockup ── */
.hero-visual {
  animation: fade-up 0.7s var(--ease-out-expo) both;
}
.appwin {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
}
.appwin__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
}
.dd {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-border-hover);
}
.appwin__title {
  margin-left: var(--space-3);
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}
.appwin__shell {
  display: grid;
  grid-template-columns: 132px 1fr;
  min-height: 318px;
  background: var(--color-bg-elevated);
}

/* Sidebar */
.appnav {
  border-right: 1px solid var(--color-border);
  background: var(--color-bg-surface);
  padding: var(--space-3) var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.appnav__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-2);
  font-size: 12px;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}
.appnav__logo {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--color-accent);
  flex-shrink: 0;
}
.appnav__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.appnav__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px var(--space-2);
  border-radius: var(--radius-sm);
  font-size: 11px;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.appnav__item--active {
  background: var(--color-primary-subtle);
  color: var(--color-accent);
  font-weight: var(--weight-semibold);
}
.appnav__ico {
  display: flex;
  flex-shrink: 0;
  :deep(svg) {
    width: 13px;
    height: 13px;
  }
}

/* Main panel */
.appmain {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.appmain__head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.appmain__title {
  font-size: 14px;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
}
.appmain__sub {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.statrow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
}
.stat {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat__val {
  font-size: 18px;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: 1;
}
.stat__lbl {
  font-size: 9px;
  color: var(--color-text-tertiary);
}

.tickets {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  overflow: hidden;
}
.tickets__head {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-weight: var(--weight-semibold);
  color: var(--color-text-tertiary);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
}
.trow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }
}
.trow__main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.trow__title {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
}
.trow__ai {
  width: 11px;
  height: 11px;
  color: var(--color-accent);
  flex-shrink: 0;
}
.trow__meta {
  font-size: 9px;
  color: var(--color-text-tertiary);
}
.badge {
  flex-shrink: 0;
  font-size: 9px;
  font-weight: var(--weight-semibold);
  padding: 2px 7px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
.badge--urgent {
  color: var(--color-error);
  background: rgba(198, 58, 43, 0.1);
}
.badge--open {
  color: var(--color-warning);
  background: rgba(183, 121, 31, 0.12);
}
.badge--accent {
  color: var(--color-accent);
  background: var(--color-primary-subtle);
}
.badge--done {
  color: var(--color-success);
  background: var(--color-primary-subtle);
}

/* ── Intro ── */
.bh-intro {
  padding: var(--space-16) var(--space-8);
}
.intro-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: var(--space-12);
  align-items: start;
}
.bh-intro h2 {
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

/* ── Section head (shared) ── */
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
  a {
    color: var(--color-accent);
  }
}

/* ── Flow steps ── */
.bh-flow {
  padding: var(--space-16) var(--space-8);
}
.flow-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-5);
  counter-reset: step;
}
.flow-step {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  &__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-full);
    background: var(--color-primary-subtle);
    color: var(--color-accent);
    font-weight: var(--weight-bold);
    font-size: var(--text-small);
    margin-bottom: var(--space-4);
  }
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-2);
  }
  p {
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── Features ── */
.bh-features {
  padding: var(--space-16) var(--space-8);
}
.bh-features h2 {
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
.bh-shots {
  padding: var(--space-16) var(--space-8);
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

/* ── FAQ ── */
.bh-faq {
  padding: var(--space-16) var(--space-8);
}
.faq-narrow {
  max-width: var(--max-width-narrow);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  overflow: hidden;
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-6);
    cursor: pointer;
    font-size: var(--text-body-lg);
    font-weight: var(--weight-medium);
    color: var(--color-text-primary);
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
  .faq-chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--color-text-tertiary);
    transition: transform var(--transition-fast);
  }
  &[open] .faq-chevron {
    transform: rotate(180deg);
  }
  p {
    margin: 0;
    padding: 0 var(--space-6) var(--space-5);
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
  }
}

/* ── CTA ── */
.bh-cta {
  padding: var(--space-16) var(--space-8) var(--space-24);
}
.cta-card {
  max-width: var(--max-width-narrow);
  text-align: center;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-16) var(--space-8);
  h2 {
    font-size: var(--text-h2);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-4);
  }
  p {
    font-size: var(--text-body-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0 auto var(--space-8);
    max-width: 560px;
  }
}
.cta-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
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
  .flow-steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .features-grid,
  .shots-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .bh-hero {
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
  .flow-steps {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .features-grid,
  .shots-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .bh-intro,
  .bh-flow,
  .bh-features,
  .bh-shots,
  .bh-faq,
  .bh-cta {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
  .cta-card {
    padding: var(--space-12) var(--space-6);
  }
}

@media (max-width: 540px) {
  .appwin__shell {
    grid-template-columns: 108px 1fr;
  }
  .statrow {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .stat {
    padding: var(--space-2);
  }
  .stat__val {
    font-size: 15px;
  }
}
</style>
