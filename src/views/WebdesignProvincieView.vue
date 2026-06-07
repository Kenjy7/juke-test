<template>
  <BackgroundWeb>
    <section class="hero">
      <div class="container hero__inner">
        <span class="eyebrow">Webdesign {{ currentProvince.naam }}</span>
        <h1 class="hero__title">
          Website laten maken in {{ currentProvince.naam }} voor KMO's en zelfstandigen
        </h1>
        <p class="hero__lead">
          {{ currentProvince.lead }}
          {{ currentProvince.intro }}
        </p>
        <div class="hero__badges">
          <span>Vanaf EUR 600</span>
          <span>Lokale SEO inbegrepen</span>
          <span>Snelle oplevering</span>
        </div>
        <div class="hero__actions">
          <RouterLink to="/offerte-aanvraag" class="btn btn--primary">Vraag je offerte aan</RouterLink>
          <RouterLink to="/webdesign" class="btn btn--secondary">Bekijk prijzen & pakketten</RouterLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Waarom JukeCoding</span>
          <h2>Wat je mag verwachten van webdesign in {{ currentProvince.naam }}</h2>
          <p>
            We bouwen geen generieke website, maar een snelle bedrijfswebsite die vertrouwen
            opbouwt, lokaal zichtbaar is en bezoekers richting contact of offerte stuurt.
          </p>
        </div>

        <div class="card-grid">
          <article class="card">
            <h3>Snelle website op maat</h3>
            <p>
              Je website wordt helder opgebouwd, mobiel sterk uitgewerkt en technisch klaar
              gezet om lokaal goed te presteren.
            </p>
          </article>
          <article class="card">
            <h3>Lokale SEO voor {{ currentProvince.naam }}</h3>
            <p>
              We stemmen copy, metadata en structuur af op koopgerichte zoekopdrachten in
              {{ currentProvince.naam }} en de omliggende steden.
            </p>
          </article>
          <article class="card">
            <h3>Gericht op aanvragen</h3>
            <p>
              Met duidelijke CTA's, vertrouwen en logische flows maken we van je website een
              kanaal dat effectief leads oplevert.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Lokale SEO</span>
          <h2>Hoe we bedrijven in {{ currentProvince.naam }} beter vindbaar maken</h2>
          <p>
            Van titles en descriptions tot interne links en commerciele copy: alles wordt
            opgezet om meer zichtbaarheid en meer aanvragen uit {{ currentProvince.naam }} te halen.
          </p>
        </div>

        <div class="steps">
          <article class="step">
            <span class="step__number">1</span>
            <h3>Snippet met koopintentie</h3>
            <p>
              We sturen op titles en descriptions die beter matchen met zoekopdrachten zoals
              website laten maken {{ currentProvince.naam }}.
            </p>
          </article>
          <article class="step">
            <span class="step__number">2</span>
            <h3>Content per provincie</h3>
            <p>
              Elke provinciepagina krijgt eigen copy, regiofocus en FAQ's zodat Google en je
              bezoeker meteen zien waar de pagina over gaat.
            </p>
          </article>
          <article class="step">
            <span class="step__number">3</span>
            <h3>Interne links die versterken</h3>
            <p>
              Je provinciepagina's, blog en webdesignpagina werken samen om meer topical authority
              op te bouwen in Vlaanderen.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Regiofocus</span>
          <h2>Actief in {{ currentProvince.naam }}</h2>
          <p>
            Dit zijn enkele belangrijke steden en regio's waar we ondernemers ondersteunen met
            webdesign, lokale SEO en conversiegerichte websites.
          </p>
        </div>

        <div class="city-grid">
          <RouterLink
            v-for="city in focusCities"
            :key="city.slug"
            :to="`/webdesign-${city.slug}`"
            class="city-card"
          >
            <h3>{{ city.naam }}</h3>
            <p>Website op maat, lokale SEO en een duidelijke route naar meer aanvragen.</p>
            <span>{{ currentProvince.naam }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <FaqList
      class="faq-shell"
      :faqs="faqItems"
      label="FAQ"
      :title="`Veelgestelde vragen over webdesign in ${currentProvince.naam}`"
      :description="`Alle antwoorden over websites, lokale SEO en samenwerking in ${currentProvince.naam}.`"
    />

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Provincies</span>
          <h2>Ook actief in andere provincies</h2>
          <p>
            We bouwen websites voor bedrijven in heel Vlaanderen. Bekijk ook onze andere provinciepagina's.
          </p>
        </div>

        <div class="province-grid">
          <RouterLink
            v-for="province in otherProvinces"
            :key="province.slug"
            :to="`/webdesign-${province.slug}`"
            class="province-card"
          >
            <h3>{{ province.naam }}</h3>
            <p>{{ province.regio }}</p>
            <span>Bekijk pagina -></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta">
        <h2>Klaar om je website in {{ currentProvince.naam }} sterker te maken?</h2>
        <p>
          Vraag een vrijblijvende offerte aan of ontdek eerst wat een website op maat kost voor je bedrijf.
        </p>
        <div class="hero__actions hero__actions--center">
          <RouterLink to="/offerte-aanvraag" class="btn btn--primary">Vraag offerte aan</RouterLink>
          <RouterLink
            to="/blog/hoeveel-kost-een-website-op-maat-belgie"
            class="btn btn--secondary"
          >
            Lees de prijsgids
          </RouterLink>
        </div>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import FaqList from '@/components/FaqList.vue'
import { maakProvincieFaqs, provincieData, provincieSlugs } from '@/data/provincies'
import { stadData, stadSlugs } from '@/data/steden'

const props = defineProps({
  provincie: {
    type: String,
    required: true,
  },
})

const siteUrl = 'https://jukecoding.be'

const currentProvince = computed(() => provincieData[props.provincie])
const faqItems = computed(() => maakProvincieFaqs(currentProvince.value.naam))
const canonicalUrl = computed(() => `${siteUrl}/webdesign-${props.provincie}`)
const metaDescription = computed(
  () =>
    `Website laten maken in ${currentProvince.value.naam}? Snelle website op maat met lokale SEO, duidelijke prijs en focus op meer aanvragen.`
)
const otherProvinces = computed(() =>
  provincieSlugs
    .filter((slug) => slug !== props.provincie)
    .map((slug) => ({
      slug,
      naam: provincieData[slug].naam,
      regio: provincieData[slug].regio,
    }))
)
const focusCities = computed(() =>
  currentProvince.value.focusCities
    .map((naam) => {
      const slug = stadSlugs.find((candidate) => stadData[candidate].naam === naam)
      if (!slug) return null
      return { slug, naam }
    })
    .filter(Boolean)
)

useHead(() => ({
  title: `Website Laten Maken in ${currentProvince.value.naam} | Vanaf EUR 600 | JukeCoding`,
  meta: [
    { name: 'description', content: metaDescription.value },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'keywords', content: [...currentProvince.value.keywords, `website laten maken ${currentProvince.value.naam.toLowerCase()}`, `webbureau ${currentProvince.value.naam.toLowerCase()}`].join(', ') },
    { name: 'author', content: 'JukeCoding' },
    { property: 'og:title', content: `Website Laten Maken in ${currentProvince.value.naam} | Vanaf EUR 600 | JukeCoding` },
    { property: 'og:description', content: metaDescription.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: `${siteUrl}/og-image-webdesign.jpg` },
    { property: 'og:image:alt', content: `Webdesign voor KMO en zelfstandigen in ${currentProvince.value.naam}` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Webdesign ${currentProvince.value.naam} | Vanaf EUR 600 | JukeCoding` },
    { name: 'twitter:description', content: metaDescription.value },
    { name: 'twitter:image', content: `${siteUrl}/og-image-webdesign.jpg` },
    { name: 'twitter:image:alt', content: `JukeCoding - webdesign in ${currentProvince.value.naam}` },
  ],
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl.value}#webpage`,
        url: canonicalUrl.value,
        name: `Website laten maken in ${currentProvince.value.naam} | Vanaf EUR 600`,
        description: metaDescription.value,
        inLanguage: 'nl-BE',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonicalUrl.value}#service`,
        name: `Website laten maken in ${currentProvince.value.naam}`,
        serviceType: ['Webdesign', 'Lokale SEO', 'Website laten maken'],
        description: metaDescription.value,
        provider: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'JukeCoding',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: currentProvince.value.naam,
          addressCountry: 'BE',
        },
        url: canonicalUrl.value,
        offers: {
          '@type': 'Offer',
          price: '600',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
          description: `Website op maat voor KMO en zelfstandigen in ${currentProvince.value.naam} vanaf EUR 600`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Webdesign pakketten ${currentProvince.value.naam}`,
          itemListElement: [
            { '@type': 'Offer', name: 'Juke Lite', price: '600', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', name: 'Juke Groove', price: '1400', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
            { '@type': 'Offer', name: 'Juke Amplify', price: '2600', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl.value}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Webdesign', item: `${siteUrl}/webdesign` },
          { '@type': 'ListItem', position: 3, name: `Webdesign ${currentProvince.value.naam}`, item: canonicalUrl.value },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonicalUrl.value}#faq`,
        mainEntity: faqItems.value.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
}))
</script>

<style scoped>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.section {
  padding: 72px 0;
}

.section--cta {
  padding-bottom: 88px;
}

.section-header {
  max-width: 720px;
  margin-bottom: 32px;
}

.section-header h2 {
  color: var(--color-text-primary);
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 14px;
}

.section-header p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.hero {
  padding: 72px 0 48px;
}

.hero__inner {
  max-width: 860px;
}

.hero__title {
  color: var(--color-text-primary);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin: 0 0 18px;
}

.hero__lead {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 720px;
  margin: 0 0 24px;
}

.eyebrow {
  display: inline-flex;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.hero__badges span {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.hero__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 14px;
  align-items: stretch;
  justify-content: flex-start;
}

.hero__actions--center {
  justify-content: center;
  justify-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.35rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  box-shadow: var(--shadow-glow-accent);
}

.btn--secondary {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-hover);
  color: var(--color-text-primary);
}

.card-grid,
.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.city-grid,
.province-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 18px;
}

.card,
.step,
.cta,
.city-card,
.province-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.card,
.step {
  padding: 24px;
}

.card h3,
.step h3,
.city-card h3,
.province-card h3,
.cta h2 {
  color: var(--color-text-primary);
  margin: 0 0 12px;
}

.card p,
.step p,
.city-card p,
.province-card p,
.cta p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.step__number {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-bg-sunken);
  color: var(--color-text-primary);
  font-weight: 700;
  margin-bottom: 14px;
}

.city-card,
.province-card {
  padding: 22px;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.city-card:hover,
.province-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-text-tertiary);
}

.city-card span,
.province-card span {
  display: inline-block;
  margin-top: 14px;
  color: var(--color-accent);
  font-weight: 600;
}

.cta {
  padding: 36px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}

.cta h2 {
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
}

.cta p {
  max-width: 720px;
  margin: 0 auto;
}

.section--cta .hero__actions {
  width: 100%;
  max-width: 560px;
  margin: 24px auto 0;
  justify-content: center;
}

.faq-shell :deep(.faq-section) {
  padding-top: 0;
  padding-bottom: 24px;
}

@media (max-width: 900px) {
  .card-grid,
  .steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 56px 0;
  }

  .hero {
    padding-top: 48px;
  }

  .container {
    padding: 0 18px;
  }

  .hero__actions {
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
  }

  .btn {
    width: 100%;
    padding: 0.95rem 1rem;
    font-size: 0.98rem;
  }

  .cta {
    padding: 28px 18px;
  }

  .cta p {
    font-size: 0.98rem;
  }
}

@media (max-width: 420px) {
  .container {
    padding: 0 16px;
  }

  .hero__title {
    line-height: 1.08;
  }

  .hero__lead {
    font-size: 1rem;
  }

  .hero__badges {
    gap: 10px;
  }

  .hero__badges span {
    width: 100%;
    text-align: center;
  }

  .btn {
    font-size: 0.94rem;
    line-height: 1.35;
  }

  .cta {
    padding: 24px 16px;
    border-radius: var(--radius-lg);
  }

  .cta h2 {
    font-size: 1.7rem;
  }

  .hero__actions--center {
    width: 100%;
    max-width: 100%;
  }
}
</style>
