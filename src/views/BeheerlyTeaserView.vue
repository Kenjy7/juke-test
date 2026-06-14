<template>
  <BackgroundWeb>
    <!-- ───────────── Hero ───────────── -->
    <section class="bt-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('beheerlyTeaser.hero.eyebrow') }}
          </div>
          <h1>
            {{ t('beheerlyTeaser.hero.titleLead') }}
            <span class="highlight">{{ t('beheerlyTeaser.hero.titleHighlight') }}</span>
            {{ t('beheerlyTeaser.hero.titleTail') }}
          </h1>
          <p class="subtitle">
            {{ t('beheerlyTeaser.hero.subtitle') }}
          </p>
          <p class="byline">
            {{ t('beheerlyTeaser.meta.byline') }} ·
            {{ t('beheerlyTeaser.meta.updatedLabel') }}
            <time :datetime="UPDATED_ISO">{{ t('beheerlyTeaser.meta.updatedDate') }}</time>
          </p>
          <div class="hero-buttons">
            <a :href="mailto" class="btn btn--accent btn--lg">
              {{ t('beheerlyTeaser.syndic.ctaMail') }}
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
          </div>
          <p class="hero-note">
            {{ t('beheerlyTeaser.hero.note') }}
          </p>
        </div>

        <!-- Mysterious "locked / redacted" preview -->
        <div class="hero-visual" aria-hidden="true">
          <div class="vault">
            <div class="vault__bar">
              <span class="dd"></span><span class="dd"></span><span class="dd"></span>
            </div>
            <div class="vault__body">
              <div class="redacted">
                <span class="redacted__line" style="width: 70%"></span>
                <span class="redacted__line" style="width: 48%"></span>
                <span class="redacted__line" style="width: 88%"></span>
                <span class="redacted__line" style="width: 60%"></span>
                <span class="redacted__line" style="width: 35%"></span>
                <span class="redacted__line" style="width: 76%"></span>
              </div>
              <div class="vault__lock">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <span>?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── Wat is Beheerly? (snippet-target answer + hints) ───────────── -->
    <section class="bt-about">
      <div class="container">
        <div class="bt-about__inner">
          <h2 class="bt-about__q">{{ t('beheerlyTeaser.about.question') }}</h2>
          <p class="bt-about__answer">{{ t('beheerlyTeaser.about.answer') }}</p>
        </div>
        <div class="hints-grid">
          <div class="hint-card" v-for="(h, i) in hints" :key="h.title">
            <div class="hint-card__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── FAQ (snippet + FAQPage schema) ───────────── -->
    <section class="bt-faq">
      <div class="container bt-faq__inner">
        <h2>{{ t('beheerlyTeaser.faq.title') }}</h2>
        <div class="faq-list">
          <div class="faq-item" v-for="f in faqVisible" :key="f.question">
            <h3 class="faq-item__q">{{ f.question }}</h3>
            <p class="faq-item__a">{{ f.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── Syndicus CTA (shared dark closing panel) ───────────── -->
    <section class="bt-syndic" id="syndicus">
      <div class="container">
        <div class="syndic-card band--dark">
          <h2>{{ t('beheerlyTeaser.syndic.title') }}</h2>
          <p>{{ t('beheerlyTeaser.syndic.body') }}</p>
          <div class="cta-group">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'beheerly' } }"
              class="btn btn--accent btn--lg"
            >
              {{ t('beheerlyTeaser.syndic.ctaContact') }}
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
          </div>
        </div>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

const { t, locale } = useI18n()

const MAIL_TO = 'contact@jukecoding.be'
const SITE = 'https://jukecoding.be'
const ORG_ID = `${SITE}/#organization`
const UPDATED_ISO = '2026-06-13'

// nl is the default (unprefixed) locale; en lives under /en.
const pageUrl = computed(() => (locale.value === 'en' ? `${SITE}/en/beheerly` : `${SITE}/beheerly`))
const ogLocale = computed(() => (locale.value === 'en' ? 'en_US' : 'nl_BE'))

const mailto = computed(() => {
  const subject = encodeURIComponent(t('beheerlyTeaser.syndic.mailSubject'))
  const body = encodeURIComponent(t('beheerlyTeaser.syndic.mailBody'))
  return `mailto:${MAIL_TO}?subject=${subject}&body=${body}`
})

const hints = computed(() => [
  { title: t('beheerlyTeaser.hints.items.one.title'), desc: t('beheerlyTeaser.hints.items.one.desc') },
  { title: t('beheerlyTeaser.hints.items.two.title'), desc: t('beheerlyTeaser.hints.items.two.desc') },
  { title: t('beheerlyTeaser.hints.items.three.title'), desc: t('beheerlyTeaser.hints.items.three.desc') },
])

// Visible FAQ — the "Wat is Beheerly?" definition lives in the About section above,
// so it isn't repeated here. These three answers each cover distinct ground.
const faqVisible = computed(() => [
  { question: t('beheerlyTeaser.faq.items.launch.question'), answer: t('beheerlyTeaser.faq.items.launch.answer') },
  { question: t('beheerlyTeaser.faq.items.access.question'), answer: t('beheerlyTeaser.faq.items.access.answer') },
  { question: t('beheerlyTeaser.faq.items.maker.question'), answer: t('beheerlyTeaser.faq.items.maker.answer') },
])

// FAQPage schema still leads with the definition so it stays the first quotable answer for AEO.
const faqSchema = computed(() => [
  { question: t('beheerlyTeaser.about.question'), answer: t('beheerlyTeaser.about.answer') },
  ...faqVisible.value,
])

// ── Structured data (JSON-LD). Org/Website @ids are defined globally in index.html
// and referenced here so the page joins one entity graph. ──
const softwareJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${pageUrl.value}#beheerly`,
  name: 'Beheerly',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: pageUrl.value,
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  description: t('beheerlyTeaser.about.answer'),
  creator: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  audience: {
    '@type': 'Audience',
    audienceType:
      locale.value === 'en'
        ? 'Property managers and co-ownerships (VMEs)'
        : "Syndici en mede-eigendommen (VME's)",
  },
  areaServed: { '@type': 'Country', name: 'Belgium' },
  datePublished: UPDATED_ISO,
  dateModified: UPDATED_ISO,
}))

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl.value}#faq`,
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  mainEntity: faqSchema.value.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}))

const webPageJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl.value}#webpage`,
  url: pageUrl.value,
  name: t('beheerlyTeaser.seo.title'),
  description: t('beheerlyTeaser.seo.description'),
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${pageUrl.value}#beheerly` },
  primaryImageOfPage: `${SITE}/og-image.jpg`,
  datePublished: UPDATED_ISO,
  dateModified: UPDATED_ISO,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.bt-about__q', '.bt-about__answer'],
  },
}))

const breadcrumbJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: locale.value === 'en' ? `${SITE}/en` : `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Beheerly', item: pageUrl.value },
  ],
}))

useHead(() => ({
  title: t('beheerlyTeaser.seo.title'),
  meta: [
    { name: 'description', content: t('beheerlyTeaser.seo.description') },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: t('beheerlyTeaser.seo.title') },
    { property: 'og:description', content: t('beheerlyTeaser.seo.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl.value },
    { property: 'og:image', content: `${SITE}/og-image.jpg` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: ogLocale.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('beheerlyTeaser.seo.title') },
    { name: 'twitter:description', content: t('beheerlyTeaser.seo.description') },
    { name: 'twitter:image', content: `${SITE}/og-image.jpg` },
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value },
    { rel: 'alternate', hreflang: 'nl-BE', href: `${SITE}/beheerly` },
    { rel: 'alternate', hreflang: 'en', href: `${SITE}/en/beheerly` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE}/beheerly` },
  ],
  script: [
    { key: 'ld-beheerly-software', type: 'application/ld+json', children: JSON.stringify(softwareJsonLd.value) },
    { key: 'ld-beheerly-faq', type: 'application/ld+json', children: JSON.stringify(faqJsonLd.value) },
    { key: 'ld-beheerly-webpage', type: 'application/ld+json', children: JSON.stringify(webPageJsonLd.value) },
    { key: 'ld-beheerly-breadcrumb', type: 'application/ld+json', children: JSON.stringify(breadcrumbJsonLd.value) },
  ],
}))
</script>

<style scoped lang="scss">
.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Hero ── */
.bt-hero {
  padding: var(--hero-pad-top) var(--space-8) var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: var(--space-16);
  align-items: center;
  width: 100%;
}
/* Staggered hero entrance — same fade-up reveal as the AI-automation page.
   The eyebrow stays put; the rise cascade starts at the heading. */
.hero-copy h1 { animation: fade-up 0.7s var(--ease-out-expo) 0.08s both; }
.hero-copy .subtitle { animation: fade-up 0.7s var(--ease-out-expo) 0.16s both; }
.hero-copy .byline { animation: fade-up 0.7s var(--ease-out-expo) 0.22s both; }
.hero-copy .hero-buttons { animation: fade-up 0.7s var(--ease-out-expo) 0.28s both; }
.hero-copy .hero-note { animation: fade-up 0.7s var(--ease-out-expo) 0.34s both; }
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
  margin: 0 0 var(--space-4);
  max-width: 54ch;
}
.byline {
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
  margin: 0 0 var(--space-8);
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

/* ── Locked / redacted preview ── */
.hero-visual {
  /* Delayed so it cascades in after the text (and past the page fade-in),
     otherwise a delay-0 rise plays while the page is still invisible. */
  animation: fade-up 0.7s var(--ease-out-expo) 0.42s both;
}
.vault {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
}
.vault__bar {
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
.vault__body {
  position: relative;
  min-height: 300px;
  background: var(--color-bg-elevated);
}
.redacted {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-8);
  filter: blur(5px);
  opacity: 0.5;
  user-select: none;
}
.redacted__line {
  height: 14px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--color-border-hover), var(--color-border));
}
.vault__lock {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  svg {
    width: 40px;
    height: 40px;
    opacity: 0.8;
  }
  span {
    font-size: var(--text-h2);
    font-weight: var(--weight-bold);
    color: var(--color-accent);
  }
}

/* ── Wat is Beheerly? (+ hints) ── */
.bt-about {
  padding: var(--space-12) var(--space-8) var(--space-16);
}
.bt-about__inner {
  max-width: 70ch;
  margin-bottom: var(--space-12);
}
.bt-about__q {
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3);
}
.bt-about__answer {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── Hints ── */
.hints-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.hint-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  padding: var(--space-8);
  transition: all var(--transition-smooth);
}
.hint-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
}
.hint-card__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-5);
}
.hint-card h3 {
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3);
}
.hint-card p {
  font-size: var(--text-body);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── FAQ ── */
.bt-faq {
  padding: var(--space-8) var(--space-8) var(--space-16);
}
.bt-faq__inner {
  max-width: 70ch;
}
.bt-faq h2 {
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-8);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.faq-item {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
}
.faq-item__q {
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3);
}
.faq-item__a {
  font-size: var(--text-body);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── Syndicus CTA — shared dark closing panel ── */
.bt-syndic {
  padding: var(--section-pad-y) var(--space-8) var(--space-24);
}
.bt-syndic .container {
  max-width: var(--max-width-cta);
}
.syndic-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.syndic-card h2 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-5);
  max-width: 22ch;
  text-wrap: balance;
}
.syndic-card p {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 52ch;
  margin: 0 0 var(--space-12);
}
.cta-group {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Responsive ── */
@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
  .hints-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
}
@media (max-width: 768px) {
  .bt-hero,
  .bt-about,
  .bt-faq,
  .bt-syndic {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
  .syndic-card {
    padding: var(--space-12) var(--space-6);
  }
  .cta-group {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
  }
  .cta-group .btn {
    width: 100%;
  }
}
</style>
