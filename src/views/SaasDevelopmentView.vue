<template>
  <BackgroundWeb>
    <section class="saas-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1>
            {{ tg('saasDevelopmentView.hero.titleLead') }}
            <span class="highlight">{{ tg('saasDevelopmentView.hero.titleHighlight') }}</span>
          </h1>
          <p class="hero-lead">{{ tg('saasDevelopmentView.hero.subtitle') }}</p>
          <div class="cta-group">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'saas' } }"
              class="btn btn--accent btn--lg"
            >
              {{ tg('saasDevelopmentView.hero.ctaPrimary') }}
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
            <a href="#saas-faq" class="btn btn--secondary btn--lg">
              {{ tg('saasDevelopmentView.hero.ctaFaq') }}
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <SaasConsoleMock />
        </div>
      </div>
    </section>

    <SaasScope />
    <SaasShowcase />
    <SaasIntegrations />
    <SaasProcess />
    <SaasEngagement />
    <SaasFaq :faqs="saasFaqs" />

    <!-- ──────── Closing CTA ──────── -->
    <section class="saas-cta" ref="ctaRef">
      <div class="container">
        <div class="saas-cta__panel band--dark reveal">
          <h2>{{ tg('saasDevelopmentView.cta.heading') }}</h2>
          <p>{{ tg('saasDevelopmentView.cta.body') }}</p>
          <div class="cta-group">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'saas' } }"
              class="btn btn--accent btn--lg"
            >
              {{ tg('saasDevelopmentView.cta.button') }}
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
              {{ tg('saasDevelopmentView.hero.ctaSecondary') }}
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
import SaasConsoleMock from '@/components/SaasConsoleMock.vue'
import SaasScope from '@/components/SaasScope.vue'
import SaasShowcase from '@/components/SaasShowcase.vue'
import SaasIntegrations from '@/components/SaasIntegrations.vue'
import SaasProcess from '@/components/SaasProcess.vue'
import SaasEngagement from '@/components/SaasEngagement.vue'
import SaasFaq from '@/components/SaasFaq.vue'
import { faqsSaas } from '@/data/faqs.saas'

// Page hero + closing CTA copy lives in the generated global messages
// (src/i18n/generated/saasDevelopmentView.json); the showcase and the other
// sections ship their own component-local strings.
const { t: tg, locale } = useI18n({ useScope: 'global' })

const saasFaqs = computed(() => faqsSaas[locale.value] ?? faqsSaas.nl)

const ctaRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  ctaRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

const url = 'https://jukecoding.be/saas-development'

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'SaaS- & app-development op maat',
  serviceType: ['SaaS Development', 'Web Application Development', 'Custom Software Development'],
  description:
    'Custom SaaS-platformen, dashboards, klantportalen en bedrijfssoftware op maat. Van concept en MVP tot een schaalbaar product dat je zelf bezit en beheert.',
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url,
  provider: { '@type': 'Organization', '@id': 'https://jukecoding.be/#organization' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'SaaS-development op maat, prijs op aanvraag na vrijblijvende kennismaking',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsSaas.nl.map((faq) => ({
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
    { '@type': 'ListItem', position: 2, name: 'SaaS-development', item: url },
  ],
}

useHead({
  title: 'SaaS Development op Maat | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product. Development studio in Hasselt, Belgie.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'SaaS Development op Maat | Juke' },
    {
      property: 'og:description',
      content:
        'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: 'https://jukecoding.be/og-saas.jpg' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SaaS Development op Maat | Juke' },
    {
      name: 'twitter:description',
      content: 'Custom SaaS-platformen, dashboards en portalen op maat.',
    },
  ],
  link: [{ rel: 'canonical', href: url }],
  script: [
    { key: 'ld-service-saas', type: 'application/ld+json', children: JSON.stringify(serviceJsonLd) },
    { key: 'ld-faq-saas', type: 'application/ld+json', children: JSON.stringify(faqJsonLd) },
    { key: 'ld-breadcrumb-saas', type: 'application/ld+json', children: JSON.stringify(breadcrumbJsonLd) },
  ],
})
</script>

<style scoped lang="scss">
.container { max-width: var(--max-width); margin: 0 auto; }

/* ── Page hero — split: copy left, live dashboard right ── */
.saas-hero { padding: var(--hero-pad-top) var(--space-8) var(--hero-pad-bottom); min-height: var(--hero-min-height); display: flex; flex-direction: column; justify-content: center; }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr); gap: var(--space-10); align-items: center; width: 100%; }
.hero-copy { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.saas-hero h1 {
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
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.hero-visual { width: 100%; min-width: 0; }
.cta-group { display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }
.hero-copy .cta-group { justify-content: flex-start; }

/* Staggered hero entrance — same fade-up reveal as the AI-automation page.
   The eyebrow stays put; the rise cascade starts at the heading. */
.saas-hero h1 { animation: fade-up 0.7s var(--ease-out-expo) 0.08s both; }
.hero-lead { animation: fade-up 0.7s var(--ease-out-expo) 0.16s both; }
.hero-copy .cta-group { animation: fade-up 0.7s var(--ease-out-expo) 0.24s both; }
.hero-visual { animation: fade-up 0.7s var(--ease-out-expo) 0.2s both; }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Closing CTA ── */
.saas-cta { padding: var(--section-pad-y) var(--space-8) var(--space-24); }
.saas-cta .container { max-width: var(--max-width-cta); }
.saas-cta__panel {
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12); text-align: center;
  display: flex; flex-direction: column; align-items: center;
}
.saas-cta__panel h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-5);
  max-width: 22ch; text-wrap: balance;
}
.saas-cta__panel p {
  font-size: var(--text-body-lg); color: var(--color-text-secondary);
  line-height: var(--leading-relaxed); margin: 0 0 var(--space-12); max-width: 52ch;
}

/* Responsive */
@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; gap: var(--space-10); }
  .hero-copy { align-items: center; text-align: center; }
  .hero-copy .cta-group { justify-content: center; }
  .saas-hero h1 { max-width: 20ch; }
  .hero-lead { max-width: 60ch; }
  .hero-visual { max-width: 560px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .saas-hero { padding: var(--hero-pad-top) var(--space-5) var(--hero-pad-bottom); }
  .saas-hero h1 { font-size: var(--text-h1); }
  .cta-group { flex-direction: column; width: 100%; max-width: 340px; }
  .cta-group .btn { width: 100%; }
  .saas-cta { padding: var(--section-pad-y) var(--space-5) var(--space-16); }
  .saas-cta__panel { padding: var(--space-12) var(--space-6); }
  .saas-cta__panel h2 { font-size: var(--text-h2); }
}
</style>
