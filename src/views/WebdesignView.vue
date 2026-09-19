<template>
  <BackgroundWeb>
    <section class="wd-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1>
            {{ tg('webdesignView.hero.titleLead') }}
            <span class="highlight">{{ tg('webdesignView.hero.titleHighlight') }}</span>
          </h1>
          <p class="hero-lead">{{ tg('webdesignView.hero.subtitle') }}</p>
          <div class="cta-group">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'webdesign' } }"
              class="btn btn--accent btn--lg"
            >
              {{ tg('webdesignView.hero.ctaPrimary') }}
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
            <a href="#webdesign-faq" class="btn btn--secondary btn--lg">
              {{ tg('webdesignView.hero.ctaFaq') }}
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <WebdesignBrowserMock />
        </div>
      </div>
    </section>

    <WebdesignKnowledge />
    <WebdesignSeoFacts />
    <WebdesignProcess />
    <SaasFaq :faqs="webdesignFaqs" anchor-id="webdesign-faq" />

    <RelatedResources
      :slugs="[
        'hoeveel-kost-een-website-op-maat-belgie',
        'custom-code-vs-wordpress-wat-kiest-een-kmo',
        'waarom-is-een-website-belangrijk-in-je-onderneming-7-redenen-die-je-niet-mag-negeren',
      ]"
    />

    <!-- ──────── Closing CTA ──────── -->
    <section class="wd-cta" ref="ctaRef">
      <div class="container">
        <div class="wd-cta__panel band--dark reveal">
          <h2>{{ tg('webdesignView.cta.heading') }}</h2>
          <p>{{ tg('webdesignView.cta.body') }}</p>
          <div class="cta-group">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'webdesign' } }"
              class="btn btn--accent btn--lg"
            >
              {{ tg('webdesignView.cta.button') }}
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
            <router-link to="/contact" class="btn btn--secondary btn--lg">
              {{ tg('webdesignView.hero.ctaSecondary') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import WebdesignBrowserMock from '@/components/WebdesignBrowserMock.vue'
import WebdesignKnowledge from '@/components/WebdesignKnowledge.vue'
import WebdesignSeoFacts from '@/components/WebdesignSeoFacts.vue'
import WebdesignProcess from '@/components/WebdesignProcess.vue'
import SaasFaq from '@/components/SaasFaq.vue'
import RelatedResources from '@/components/RelatedResources.vue'
import { faqsWebdesign } from '@/data/faqs.webdesign'

// Page hero + closing CTA copy lives in the generated global messages
// (src/i18n/generated/webdesignView.json); the sections ship their own
// component-local strings. Layout mirrors SaasDevelopmentView.
const { t: tg, locale } = useI18n({ useScope: 'global' })

const webdesignFaqs = computed(() => faqsWebdesign[locale.value] ?? faqsWebdesign.nl)

const ctaRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  ctaRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

const SITE = 'https://jukecoding.be'
const url = computed(() =>
  locale.value === 'en' ? `${SITE}/en/webdesign` : `${SITE}/webdesign`,
)

// JSON-LD entity-IDs blijven op de canonieke nl-URL, ook op /en.
const NL_URL = `${SITE}/webdesign`

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${NL_URL}#service`,
  name: 'Webdesign & website op maat',
  serviceType: [
    'Webdesign',
    'Website laten maken',
    'Website op maat',
    'Web Design',
    'Website Development',
  ],
  description:
    'Snelle, conversiegerichte websites op maat voor KMO’s en zelfstandigen. Van strategie en design tot livegang, met technische SEO als fundament.',
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url: NL_URL,
  provider: { '@type': 'Organization', '@id': 'https://jukecoding.be/#organization' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'Website op maat, prijs op aanvraag na vrijblijvende kennismaking',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsWebdesign.nl.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
    { '@type': 'ListItem', position: 2, name: 'Webdesign', item: NL_URL },
  ],
}

useHead(() => ({
  title: 'Webdesign & website op maat laten maken | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Website laten maken? Juke bouwt snelle, conversiegerichte websites op maat met technische SEO als fundament. Webdesign studio in Hasselt, België.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: 'Webdesign & website op maat laten maken | Juke' },
    {
      property: 'og:description',
      content:
        'Snelle, conversiegerichte websites op maat met technische SEO als fundament. Van strategie en design tot livegang.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url.value },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: locale.value === 'en' ? 'en_US' : 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Webdesign & website op maat laten maken | Juke' },
    {
      name: 'twitter:description',
      content: 'Snelle, conversiegerichte websites op maat met technische SEO als fundament.',
    },
  ],
  link: [
    { rel: 'canonical', href: url.value },
  ],
  script: [
    { key: 'ld-service-webdesign', type: 'application/ld+json', innerHTML: JSON.stringify(serviceJsonLd) },
    { key: 'ld-faq-webdesign', type: 'application/ld+json', innerHTML: JSON.stringify(faqJsonLd) },
    { key: 'ld-breadcrumb-webdesign', type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbJsonLd) },
  ],
}))
</script>

<style scoped lang="scss">
.container { max-width: var(--max-width); margin: 0 auto; }

/* ── Page hero — split: copy left, client website right (as SaaS page) ── */
.wd-hero { padding: var(--hero-pad-top) var(--space-8) var(--hero-pad-bottom); min-height: var(--hero-min-height); display: flex; flex-direction: column; justify-content: center; }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); gap: var(--space-10); align-items: center; width: 100%; }
.hero-copy { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.wd-hero h1 {
  font-size: var(--text-hero); font-weight: var(--weight-bold);
  line-height: var(--leading-tight); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0 0 var(--space-5);
  max-width: 15ch; text-wrap: balance;
}
.highlight { color: var(--color-accent); }
.hero-lead {
  font-size: var(--text-body-lg); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 52ch; margin: 0 0 var(--space-8);
}
.hero-visual { width: 100%; min-width: 0; }
.cta-group { display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }
.hero-copy .cta-group { justify-content: flex-start; }

/* Staggered hero entrance — same fade-up reveal as the SaaS page. */
.wd-hero h1 { animation: fade-up 0.7s var(--ease-out-expo) 0.08s both; }
.hero-lead { animation: fade-up 0.7s var(--ease-out-expo) 0.16s both; }
.hero-copy .cta-group { animation: fade-up 0.7s var(--ease-out-expo) 0.24s both; }
.hero-visual { animation: fade-up 0.7s var(--ease-out-expo) 0.2s both; }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Closing CTA ── */
.wd-cta { padding: var(--section-pad-y) var(--space-8) var(--space-24); }
.wd-cta .container { max-width: var(--max-width-cta); }
.wd-cta__panel {
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12); text-align: center;
  display: flex; flex-direction: column; align-items: center;
}
.wd-cta__panel h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-5);
  max-width: 22ch; text-wrap: balance;
}
.wd-cta__panel p {
  font-size: var(--text-body-lg); color: var(--color-text-secondary);
  line-height: var(--leading-relaxed); margin: 0 0 var(--space-12); max-width: 52ch;
}

/* Responsive */
@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; gap: var(--space-10); }
  .hero-copy { align-items: center; text-align: center; }
  .hero-copy .cta-group { justify-content: center; }
  .wd-hero h1 { max-width: 20ch; }
  .hero-lead { max-width: 60ch; }
  .hero-visual { max-width: 560px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .wd-hero { padding: var(--hero-pad-top) var(--space-5) var(--hero-pad-bottom); }
  .wd-hero h1 { font-size: var(--text-h1); }
  .cta-group { flex-direction: column; width: 100%; max-width: 340px; }
  .cta-group .btn { width: 100%; }
  .wd-cta { padding: var(--section-pad-y) var(--space-5) var(--space-16); }
  .wd-cta__panel { padding: var(--space-12) var(--space-6); }
  .wd-cta__panel h2 { font-size: var(--text-h2); }
}
</style>
