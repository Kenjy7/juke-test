<template>
  <BackgroundWeb>
    <section class="scan-hero">
      <h1 class="scan-hero__title">Gratis SEO Scan</h1>
      <p class="scan-hero__sub">
        Voer je websiteadres in en ontdek in 10 seconden welke SEO-problemen
        je verbergen voor Google.
      </p>
    </section>

    <section class="scan-wrap">

      <!-- Al eerder gescand: toon vorig resultaat + CTA uitgebreide scan -->
      <div v-if="previousResult && !result" class="already-scanned">
        <div class="already-badge">Je hebt al een gratis scan gebruikt</div>
        <p class="already-text">
          Je hebt eerder <strong>{{ previousResult.url.replace('https://', '') }}</strong> gescand
          en een score van <strong>{{ previousResult.score.percentage }}% ({{ previousResult.score.grade }})</strong> behaald.
        </p>
        <div class="upgrade-card">
          <div class="upgrade-icon">SEO</div>
          <div class="upgrade-body">
            <h3 class="upgrade-title">Wil je een uitgebreide analyse?</h3>
            <p class="upgrade-text">
              Onze uitgebreide scan controleert elke pagina van je website, analyseert je concurrenten,
              zoekt keyword-kansen en geeft je een stap-voor-stap actieplan.
            </p>
            <div class="upgrade-actions">
              <a href="/#contact" class="upgrade-btn-primary">Vraag uitgebreide scan aan -></a>
              <button class="upgrade-btn-secondary" @click="rescan">
                Andere website scannen
              </button>
            </div>
          </div>
        </div>
        <!-- Toon vorig resultaat samengevat -->
        <div class="prev-summary">
          <p class="prev-summary__label">Jouw vorige scan</p>
          <div class="score-card" :class="`grade-${previousResult.score.grade.toLowerCase()}`">
            <div class="score-grade">{{ previousResult.score.grade }}</div>
            <div class="score-info">
              <span class="score-pct">{{ previousResult.score.percentage }}%</span>
              <span class="score-label"><strong>{{ previousResult.url.replace('https://', '') }}</strong></span>
              <span class="score-sub">{{ previousResult.score.points }}/{{ previousResult.score.max }} punten</span>
            </div>
          </div>
          <div class="checks-grid">
            <div
              v-for="(check, key) in previousResult.checks"
              :key="key"
              class="check-item"
            >
              <span class="check-icon" :class="`check-icon--${check.status}`">{{ checkStatusLabel(check.status) }}</span>
              <div class="check-body">
                <span class="check-name">{{ checkLabels[key] }}</span>
                <span class="check-msg">{{ check.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Normaal formulier (eerste keer) -->
      <template v-else-if="!result">
        <form class="scan-form" @submit.prevent="runScan">
          <div class="scan-input-row">
            <input
              v-model="urlInput"
              type="text"
              class="scan-input"
              placeholder="jouwwebsite.be"
              :disabled="scanning"
              autocomplete="off"
              spellcheck="false"
            />
            <button type="submit" class="scan-btn" :disabled="scanning || !urlInput.trim()">
              <span v-if="scanning" class="scan-spinner" />
              <span v-else>Scan nu -></span>
            </button>
          </div>
          <p v-if="error" class="scan-error">{{ error }}</p>
          <p class="scan-disclaimer">
            1 gratis scan per bezoeker. Bots en misbruik worden automatisch afgeremd.
          </p>
        </form>
      </template>

      <!-- Resultaten na nieuwe scan -->
      <transition name="fade">
        <div v-if="result" class="scan-results">

          <div class="score-card" :class="`grade-${result.score.grade.toLowerCase()}`">
            <div class="score-grade">{{ result.score.grade }}</div>
            <div class="score-info">
              <span class="score-pct">{{ result.score.percentage }}%</span>
              <span class="score-label">SEO Score voor <strong>{{ displayUrl }}</strong></span>
              <span class="score-sub">{{ result.score.points }}/{{ result.score.max }} punten</span>
            </div>
          </div>

          <div class="checks-grid">
            <div
              v-for="(check, key) in result.checks"
              :key="key"
              class="check-item"
              :class="`check-${check.status}`"
            >
              <span class="check-icon" :class="`check-icon--${check.status}`">{{ checkStatusLabel(check.status) }}</span>
              <div class="check-body">
                <span class="check-name">{{ checkLabels[key] }}</span>
                <span class="check-msg">{{ check.message }}</span>
              </div>
            </div>
          </div>

          <div class="meta-preview">
            <h3 class="meta-preview__title">Hoe Google jouw site ziet</h3>
            <div class="serp-preview">
              <p class="serp-url">{{ displayUrl }}</p>
              <p class="serp-title">{{ result.meta.title || 'Geen title tag gevonden' }}</p>
              <p class="serp-desc">{{ result.meta.description || 'Geen meta description gevonden - Google kiest zelf een snippet.' }}</p>
            </div>
          </div>

          <div v-if="result.meta.h2s?.length" class="heading-preview">
            <h3 class="heading-preview__title">Paginastructuur (H2-titels)</h3>
            <ul class="heading-list">
              <li v-for="h in result.meta.h2s" :key="h">{{ h }}</li>
            </ul>
          </div>

          <!-- Uitgebreide scan CTA -->
          <div class="upgrade-card upgrade-card--result">
            <div class="upgrade-icon">PRO</div>
            <div class="upgrade-body">
              <h3 class="upgrade-title">Wil je weten hoe je concurrenten het doen?</h3>
              <p class="upgrade-text">
                Onze uitgebreide scan analyseert alle pagina's, vergelijkt met je concurrenten,
                zoekt keyword-kansen en levert een concreet actieplan op.
              </p>
              <a href="/#contact" class="upgrade-btn-primary">Vraag uitgebreide scan aan -></a>
            </div>
          </div>

        </div>
      </transition>

    </section>
  </BackgroundWeb>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

const STORAGE_KEY = 'juke_seo_scan_result'

const urlInput = ref('')
const scanning = ref(false)
const error = ref('')
const result = ref(null)
const previousResult = ref(null)

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      previousResult.value = JSON.parse(stored)
    }
  } catch { /* ignore */ }
})

const displayUrl = computed(() => {
  if (!result.value) return ''
  return result.value.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')
})

const checkLabels = {
  title: 'Title tag',
  description: 'Meta description',
  h1: 'H1-titel',
  canonical: 'Canonical URL',
  ogTags: 'Social media tags (OG)',
  schema: 'Schema markup',
  headings: 'H2-structuur',
  images: 'Alt-tekst afbeeldingen',
}

function checkStatusLabel(status) {
  if (status === 'ok') return 'OK'
  if (status === 'warning') return '!'
  return 'X'
}

async function runScan() {
  error.value = ''
  result.value = null
  scanning.value = true

  try {
    const res = await fetch('/.netlify/functions/seo-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: urlInput.value.trim() }),
    })
    const data = await res.json().catch(() => ({}))

    if (!res.ok && data.error) {
      error.value = data.error
    } else if (data.error) {
      error.value = data.error
    } else {
      result.value = data
      // Sla op in localStorage zodat volgende bezoek de locked staat toont
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch { /* ignore */ }
    }
  } catch {
    error.value = 'Er ging iets mis. Probeer opnieuw.'
  } finally {
    scanning.value = false
  }
}

// Staat toe om een andere URL in te geven (wist vorige scan uit storage)
function rescan() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  previousResult.value = null
  result.value = null
  urlInput.value = ''
  error.value = ''
}

const seoScanFaqs = [
  {
    question: 'Wat controleert de gratis SEO scan?',
    answer: 'De gratis SEO scan controleert je title tag, meta description, H1-titel, canonical URL, Open Graph tags, schema markup, H2-structuur en alt-tekst van afbeeldingen. Je krijgt een score en concrete verbeterpunten.',
  },
  {
    question: 'Is de gratis SEO scan echt gratis?',
    answer: 'Ja, de scan is volledig gratis en geeft meteen resultaat. Je krijgt per aspect een status (OK, waarschuwing of fout) zodat je direct weet wat verbeterd kan worden.',
  },
  {
    question: 'Hoe snel geeft de scan resultaat?',
    answer: 'De scan analyseert je website en geeft binnen 10 tot 30 seconden een volledig rapport met SEO-score, SERP-preview en aanbevelingen.',
  },
  {
    question: 'Wat is het verschil met de uitgebreide SEO analyse?',
    answer: 'De gratis scan geeft een technische basischeck. De uitgebreide analyse controleert elke pagina, vergelijkt met concurrenten, zoekt keyword-kansen en levert een stap-voor-stap actieplan op maat.',
  },
]

useHead({
  title: 'Gratis SEO Scan voor je Website | Directe Score | JukeCoding',
  meta: [
    {
      name: 'description',
      content: 'Ontdek in 10 seconden waar je website SEO-kansen mist. Gratis scan met title, meta, headings, schema en canonical check. Direct resultaat, geen registratie nodig.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'keywords', content: 'gratis SEO scan, website SEO checker, SEO score website, SEO analyse Belgie, meta tags checker, website optimalisatie tool' },
    { name: 'author', content: 'JukeCoding' },
    { property: 'og:title', content: 'Gratis SEO Scan | Check je Website in 10 Seconden | JukeCoding' },
    { property: 'og:description', content: 'Gratis SEO scan met directe score. Controleer title, meta, headings, schema en canonical tags. Geen registratie nodig.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/gratis-seo-scan' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:alt', content: 'Gratis SEO scan tool van JukeCoding' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Gratis SEO Scan | Check je Website in 10 Seconden' },
    { name: 'twitter:description', content: 'Gratis SEO scan met directe score. Controleer title, meta, headings en schema markup. Geen registratie nodig.' },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    { name: 'twitter:image:alt', content: 'Gratis SEO scan tool van JukeCoding' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/gratis-seo-scan' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://jukecoding.be/gratis-seo-scan#app',
        name: 'JukeCoding Gratis SEO Scan',
        url: 'https://jukecoding.be/gratis-seo-scan',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'SEO Tool',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        inLanguage: 'nl-BE',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          description: 'Gratis SEO scan voor websites',
        },
        featureList: [
          'Title tag analyse',
          'Meta description check',
          'H1 en H2 structuur',
          'Canonical URL controle',
          'Open Graph tags',
          'Schema markup detectie',
          'Alt-tekst afbeeldingen',
          'SERP preview',
        ],
        provider: {
          '@type': 'Organization',
          '@id': 'https://jukecoding.be/#organization',
          name: 'JukeCoding',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
          { '@type': 'ListItem', position: 2, name: 'Gratis SEO Scan', item: 'https://jukecoding.be/gratis-seo-scan' },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://jukecoding.be/gratis-seo-scan#faq',
        mainEntity: seoScanFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }),
    },
  ],
})
</script>

<style scoped>
.scan-hero {
  text-align: center;
  padding: 80px 24px 48px;
}
.scan-hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.scan-hero__sub {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.6;
}

.scan-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* Form */
.scan-form { margin-bottom: 48px; }
.scan-input-row { display: flex; gap: 12px; }
.scan-input {
  flex: 1;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 1rem;
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.2s;
}
.scan-input::placeholder { color: var(--color-text-tertiary); }
.scan-input:focus { border-color: var(--color-accent); }
.scan-input:disabled { opacity: 0.5; }

.scan-btn {
  padding: 14px 28px;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: var(--shadow-glow-accent);
  transition: background var(--duration-base) var(--ease-smooth),
              box-shadow var(--duration-base) var(--ease-smooth),
              transform var(--duration-base) var(--ease-spring);
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 130px;
  justify-content: center;
}
.scan-btn:hover:not(:disabled) {
  background: var(--color-accent-hover);
  box-shadow: 0 0 50px var(--color-accent-glow);
  transform: translateY(-2px);
}
.scan-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.scan-spinner {
  width: 18px; height: 18px;
  border: 2px solid #00000030;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.scan-error { color: var(--color-error); margin-top: 12px; font-size: 0.9rem; }
.scan-disclaimer { color: var(--color-text-tertiary); font-size: 0.8rem; margin-top: 10px; }

/* Al gescand */
.already-scanned { display: flex; flex-direction: column; gap: 24px; }
.already-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(87,242,135,0.12);
  border: 1px solid rgba(87,242,135,0.3);
  color: var(--color-success);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 999px;
  width: fit-content;
  position: relative;
  padding-left: 34px;
}
.already-badge::before {
  content: '';
  position: absolute;
  left: 14px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 4px rgba(87,242,135,0.12);
}
.already-text {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

/* Upgrade card */
.upgrade-card {
  display: flex;
  gap: 20px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 28px;
}
.upgrade-card--result { margin-top: 8px; }
.upgrade-icon {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-text-on-accent);
  background: linear-gradient(135deg, rgba(123, 97, 255, 0.85), rgba(62, 195, 255, 0.75));
  box-shadow: 0 14px 28px rgba(79, 70, 229, 0.18);
}
.upgrade-body { display: flex; flex-direction: column; gap: 10px; }
.upgrade-title { font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0; }
.upgrade-text { font-size: 0.9rem; color: var(--color-text-secondary); margin: 0; line-height: 1.6; }
.upgrade-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 4px; }
.upgrade-btn-primary {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: var(--shadow-glow-accent);
  transition: background var(--duration-base) var(--ease-smooth),
              box-shadow var(--duration-base) var(--ease-smooth),
              transform var(--duration-base) var(--ease-spring);
}
.upgrade-btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 0 50px var(--color-accent-glow);
  transform: translateY(-2px);
}
.upgrade-btn-secondary {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.upgrade-btn-secondary:hover { border-color: var(--color-text-secondary); color: var(--color-text-primary); }

/* Vorige scan samenvatting */
.prev-summary { display: flex; flex-direction: column; gap: 16px; }
.prev-summary__label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-tertiary);
}

/* Score card */
.score-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 32px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
}
.grade-a { background: rgba(22,163,74,0.1); border-color: rgba(22,163,74,0.3); }
.grade-b { background: rgba(202,138,4,0.1); border-color: rgba(202,138,4,0.3); }
.grade-c { background: rgba(234,88,12,0.1); border-color: rgba(234,88,12,0.3); }
.grade-d, .grade-f { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.3); }
.score-grade { font-size: 3.5rem; font-weight: 900; line-height: 1; color: var(--color-text-primary); }
.score-info { display: flex; flex-direction: column; gap: 4px; }
.score-pct { font-size: 1.8rem; font-weight: 700; color: var(--color-text-primary); }
.score-label { font-size: 0.95rem; color: var(--color-text-secondary); }
.score-sub { font-size: 0.8rem; color: var(--color-text-tertiary); }

/* Checks */
.checks-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-sunken);
}
.check-icon {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  margin-top: 1px;
}
.check-icon--ok {
  background: rgba(87,242,135,0.14);
  color: var(--color-success);
  border: 1px solid rgba(87,242,135,0.3);
}
.check-icon--warning {
  background: rgba(255,193,7,0.14);
  color: var(--color-warning);
  border: 1px solid rgba(255,193,7,0.28);
}
.check-icon--error {
  background: rgba(255,68,68,0.14);
  color: var(--color-error);
  border: 1px solid rgba(255,68,68,0.28);
}
.check-body { display: flex; flex-direction: column; gap: 3px; }
.check-name { font-size: 0.9rem; font-weight: 600; color: var(--color-text-primary); }
.check-msg { font-size: 0.82rem; color: var(--color-text-secondary); }

/* SERP preview */
.meta-preview {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 20px;
}
.meta-preview__title {
  font-size: 0.85rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--color-text-tertiary); margin: 0 0 16px;
}
.serp-preview {
  background: #fff; border-radius: 10px; padding: 16px 20px;
  display: flex; flex-direction: column; gap: 4px;
}
.serp-url { font-size: 0.8rem; color: #006621; margin: 0; }
.serp-title { font-size: 1rem; color: #1a0dab; font-weight: 500; margin: 0; }
.serp-desc { font-size: 0.85rem; color: #545454; margin: 0; line-height: 1.5; }

/* Heading list */
.heading-preview {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 20px;
}
.heading-preview__title {
  font-size: 0.85rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--color-text-tertiary); margin: 0 0 14px;
}
.heading-list { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
.heading-list li { font-size: 0.92rem; color: var(--color-text-secondary); }

/* Fade */
.scan-results { display: flex; flex-direction: column; gap: 20px; }
.fade-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from { opacity: 0; transform: translateY(16px); }

@media (max-width: 520px) {
  .scan-input-row { flex-direction: column; }
  .score-card { flex-direction: column; gap: 12px; text-align: center; }
  .upgrade-card { flex-direction: column; }
}
</style>
