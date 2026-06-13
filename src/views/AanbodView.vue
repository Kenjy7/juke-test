<template>
  <BackgroundWeb>
    <HeroSectionAanbod />
    <ShortAnswer class="”stylewebdesign”" :title="t('aanbodView.shortAnswer.title')">
      {{ t('aanbodView.shortAnswer.body') }}
    </ShortAnswer>

    <WebdesignProcess />
    <WebdesignKnowledge />
    <WebdesignSeoFacts />

    <!-- âœ… FAQ's via props -->
    <FaqList :faqs="webdesignFaqs" />
    <WebdesignClosingCta />
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

const { t, locale } = useI18n()

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import HeroSectionAanbod from '@/components/HeroSectionAanbod.vue'
import WebdesignProcess from '@/components/WebdesignProcess.vue'
import WebdesignKnowledge from '@/components/WebdesignKnowledge.vue'
import WebdesignSeoFacts from '@/components/WebdesignSeoFacts.vue'
import WebdesignClosingCta from '@/components/WebdesignClosingCta.vue'
import FaqList from '@/components/FaqList.vue'
import ShortAnswer from '@/components/ShortAnswer.vue'

import { faqsWebdesign } from '@/data/faqs.webdesign'

const webdesignFaqs = computed(() => faqsWebdesign[locale.value] ?? faqsWebdesign.nl)

// ============================================================================
// CONFIGURATIE
// ============================================================================
const SITE_CONFIG = {
  url: 'https://jukecoding.be',
  name: 'Juke',
  alternateName: 'Juke Coding',
  phone: '+32479131715',
  email: 'contact@jukecoding.be',
  location: {
    city: 'Hasselt',
    region: 'Vlaanderen',
    postalCode: '3500',
    country: 'BE',
    lat: '50.9307',
    lng: '5.3378',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/jukecoding',
    instagram: 'https://www.instagram.com/jukecoding',
  },
}

const url = `${SITE_CONFIG.url}/webdesign`
const ogImage = `${SITE_CONFIG.url}/og-image-webdesign.jpg`

// 1ï¸âƒ£ LocalBusiness Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.alternateName,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  image: `${SITE_CONFIG.url}/og-image.jpg`,
  description:
    "AI-automatisering en webdesign voor Belgische KMO's - digitale oplossingen die tijd besparen en meer leads opleveren.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE_CONFIG.location.city,
    addressRegion: SITE_CONFIG.location.region,
    postalCode: SITE_CONFIG.location.postalCode,
    addressCountry: SITE_CONFIG.location.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.location.lat,
    longitude: SITE_CONFIG.location.lng,
  },
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.instagram],
  knowsAbout: [
    'AI automatisatie',
    'Workflow Automatisatie',
    'Webdesign',
    'Website laten maken',
    'Web development',
    'SEO optimalisatie',
    'UX design',
    'Responsive design',
    'Conversie optimalisatie',
  ],
  // ðŸŽ¯ Uitgebreide geo-targeting voor betere lokale vindbaarheid
  areaServed: [
    { '@type': 'City', name: 'Hasselt' },
    { '@type': 'City', name: 'Genk' },
    { '@type': 'City', name: 'Tongeren' },
    { '@type': 'City', name: 'Sint-Truiden' },
    { '@type': 'City', name: 'Antwerpen' },
    { '@type': 'City', name: 'Gent' },
    { '@type': 'City', name: 'Brussel' },
    { '@type': 'AdministrativeArea', name: 'Limburg' },
    { '@type': 'AdministrativeArea', name: 'Vlaanderen' },
    { '@type': 'Country', name: 'Belgium' },
  ],
}

// 2ï¸âƒ£ WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}#website`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  publisher: { '@id': `${SITE_CONFIG.url}#organization` },
  inLanguage: 'nl-BE',
}

// 3ï¸âƒ£ WebPage Schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${url}#webpage`,
  url,
  name: 'Website laten maken in Limburg | Juke',
  description:
    'Website laten maken bij Juke: snelle, SEO-proof websites op maat. Live in 2 weken, transparante afspraken.',
  isPartOf: { '@id': `${SITE_CONFIG.url}#website` },
  about: { '@id': `${SITE_CONFIG.url}#organization` },
  breadcrumb: { '@id': `${url}#breadcrumb` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${url}#primaryimage`,
    url: ogImage,
    width: 1200,
    height: 630,
  },
  inLanguage: 'nl-BE',
}

// 4ï¸âƒ£ BreadcrumbList Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
    { '@type': 'ListItem', position: 2, name: 'Webdesign', item: url },
  ],
}

// 5ï¸âƒ£ OfferCatalog Schema - Voor prijsweergave in Google
// 6ï¸âƒ£ Service Schema met OfferCatalog
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'Website laten maken in Limburg',
  serviceType: 'Webdesign',
  description:
    "Professionele websites op maat voor Belgische KMO's â€” snel, mobielvriendelijk en conversiegericht.",
  provider: { '@id': `${SITE_CONFIG.url}#organization` },
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url,
  termsOfService: `${SITE_CONFIG.url}/algemene-voorwaarden`,
  // ðŸŽ¯ Service features
  serviceOutput: {
    '@type': 'WebSite',
    name: 'Professionele website op maat',
  },
}

// 7ï¸âƒ£ HowTo Schema - Kans op featured snippet
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Hoe laat je een website maken bij Juke?',
  description: 'Het proces van intake tot livegang van jouw nieuwe website in 5 stappen',
  image: {
    '@type': 'ImageObject',
    url: ogImage,
  },
  totalTime: 'P14D', // ISO 8601 duration: 14 dagen
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Intake & strategie',
      text: 'We bespreken jouw doelen, doelgroep en gewenste functionaliteiten in een vrijblijvend kennismakingsgesprek.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Wireframe & sitemap',
      text: 'We maken een structuur en opzet van je website zodat je precies ziet hoe alles wordt opgebouwd.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Design & ontwikkeling',
      text: 'We ontwerpen jouw website en ontwikkelen deze met moderne, snelle technologie.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Reviewen & verfijnen',
      text: 'Je krijgt inzage in de website en we verwerken jouw feedback tot alles perfect is.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Livegang & ondersteuning',
      text: 'We zetten je website live en blijven beschikbaar voor vragen en ondersteuning.',
      url: `${url}#stappen-webdesign`,
    },
  ],
}

// 8ï¸âƒ£ FAQPage Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: webdesignFaqs.value.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

// ============================================================================
// HEAD META CONFIGURATIE
// ============================================================================

useHead({
  // ðŸŽ¯ Geoptimaliseerde title met USP
  title: 'Website Laten Maken in Limburg | Juke',

  meta: [
    // Primary Meta Tags
    {
      name: 'description',
      content:
        'Snelle website laten maken voor KMO en zelfstandigen in Hasselt en Limburg, gebouwd voor SEO, snelheid en meer aanvragen.',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    { name: 'author', content: SITE_CONFIG.name },
    { name: 'language', content: 'nl' },

    // Mobile Optimization
    { name: 'theme-color', content: '#ffffff' },
    { name: 'mobile-web-app-capable', content: 'yes' },

    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_CONFIG.name },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:locale:alternate', content: 'nl_NL' },
    { property: 'og:title', content: 'Website Laten Maken in Limburg | Juke' },
    {
      property: 'og:description',
      content:
        'Voor KMO en zelfstandigen in Hasselt en Limburg: snelle websites op maat met lokale SEO en focus op meer aanvragen.',
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:secure_url', content: ogImage },
    { property: 'og:image:alt', content: 'Juke webdesign voor bedrijven in BelgiÃ«' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/jpeg' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Website Laten Maken in Limburg | Juke' },
    {
      name: 'twitter:description',
      content:
        'Snelle websites op maat voor KMO en zelfstandigen in Hasselt en Limburg, gebouwd voor SEO en aanvragen.',
    },
    { name: 'twitter:image', content: ogImage },
    {
      name: 'twitter:image:alt',
      content: 'Juke â€“ Webdesign en AI automatisatie in BelgiÃ«',
    },

    // Additional SEO
    { name: 'format-detection', content: 'telephone=yes' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
  ],

  link: [
    // Canonical
    { rel: 'canonical', href: url },

    // DNS Prefetch & Preconnect voor performance
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

    // Preload critical resources
    { rel: 'preload', href: ogImage, as: 'image' },

    // Alternate language versions (indien van toepassing)
    // { rel: 'alternate', hreflang: 'nl-NL', href: `${url}?region=nl` },
    // { rel: 'alternate', hreflang: 'fr-BE', href: `${url}?lang=fr` },
  ],

  script: [
    // âœ… LocalBusiness Schema
    {
      key: 'ld-organization',
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema),
    },
    // âœ… WebSite Schema
    {
      key: 'ld-website',
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema),
    },
    // âœ… WebPage Schema
    {
      key: 'ld-webpage',
      type: 'application/ld+json',
      children: JSON.stringify(webPageSchema),
    },
    // âœ… BreadcrumbList Schema
    {
      key: 'ld-breadcrumb',
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbSchema),
    },
    // âœ… Service Schema (met OfferCatalog)
    {
      key: 'ld-service',
      type: 'application/ld+json',
      children: JSON.stringify(serviceSchema),
    },
    // âœ… HowTo Schema (kans op featured snippet!)
    {
      key: 'ld-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema),
    },
    // âœ… FAQPage Schema
    {
      key: 'ld-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqSchema),
    },
  ],
})
</script>

<style scoped></style>
