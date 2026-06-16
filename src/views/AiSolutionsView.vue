<template>
  <div class="ai-view">
    <BackgroundWeb>
      <IntroAi />
      <AiValue />
      <AiInAction />
      <AiOverview />
      <AiApproach />
      <AiEssentials />

      <FaqListAI :faqs="aiFaqs" />
      <AiClosingCta />
    </BackgroundWeb>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import IntroAi from '@/components/IntroAi.vue'
import AiValue from '@/components/AiValue.vue'
import AiInAction from '@/components/AiInAction.vue'
import AiOverview from '@/components/AiOverview.vue'
import AiApproach from '@/components/AiApproach.vue'
import AiEssentials from '@/components/AiEssentials.vue'
import FaqListAI from '@/components/FaqListAI.vue'
import AiClosingCta from '@/components/AiClosingCta.vue'

import { faqsAI } from '@/data/faqs.ai'

const { t, locale } = useI18n()

const aiFaqs = computed(() => faqsAI[locale.value] ?? faqsAI.nl)

const url = 'https://jukecoding.be/ai-automatisatie'

const breadcrumbAiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
    { '@type': 'ListItem', position: 2, name: 'AI automatisering', item: url },
  ],
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'AI-automatisering voor KMO in Belgie',
  serviceType: ['AI Automation', 'Chatbot Development', 'Workflow Automatisatie'],
  description:
    'Slimme workflows, chatbots en automatiseringen die repetitieve taken overnemen voor KMO en zelfstandigen in Belgie. Bespaar tijd, verminder fouten en groei sneller.',
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url,
  provider: { '@type': 'Organization', '@id': 'https://jukecoding.be/#organization' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'AI-automatisering op maat voor KMO, prijs op aanvraag na kennismaking',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsAI.nl.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

// Organisatie-schema komt centraal uit App.vue (zie src/data/organizationSchema.js).
// Andere schema's op deze pagina verwijzen ernaar via { '@id': ORG_ID }.

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://jukecoding.be/#website',
  name: 'Juke',
  url: 'https://jukecoding.be/',
  publisher: {
    '@id': 'https://jukecoding.be/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://jukecoding.be/?s={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

useHead({
  title: "AI Automatisatie voor KMO's in Belgie | Juke",
  meta: [
    {
      name: 'description',
      content:
        'AI automatisering voor KMO in Belgie met slimme workflows voor offertes, opvolging en rapportage. Actief in Hasselt en Limburg.',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'keywords',
      content:
        'AI automatisatie Belgie, slimme workflows, chatbots, workflow automatisatie, KMO automatisatie, bedrijfsprocessen automatiseren',
    },
    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },
    { name: 'author', content: 'Juke' },
    { name: 'copyright', content: 'Juke' },
    { name: 'language', content: 'Dutch' },
    { property: 'og:title', content: "AI Automatisatie voor KMO's | Juke" },
    {
      property: 'og:description',
      content:
        'AI automatisering voor KMO in Belgie met slimme workflows voor offertes, opvolging en rapportage. Actief in Hasselt en Limburg.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: 'https://jukecoding.be/og-ai.jpg' },
    { property: 'og:image:alt', content: 'AI-automatisering door Juke' },
    { property: 'og:image:width', content: '2245' },
    { property: 'og:image:height', content: '1181' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: "AI Automatisatie voor KMO's | Juke" },
    {
      name: 'twitter:description',
      content:
        'AI automatisering voor KMO in Belgie met slimme workflows voor offertes, opvolging en rapportage.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-ai.jpg' },
    {
      name: 'twitter:image:alt',
      content: "Juke - AI automatisatie voor Belgische KMO's",
    },
  ],
  link: [{ rel: 'canonical', href: url }],
  script: [
    // LocalBusiness/Organization-schema komt centraal uit App.vue.
    {
      key: 'ld-website',
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema),
    },
    {
      key: 'ld-breadcrumb-ai',
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbAiJsonLd),
    },
    {
      key: 'ld-service-ai',
      type: 'application/ld+json',
      children: JSON.stringify(serviceJsonLd),
    },
    {
      key: 'ld-faq-ai',
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd),
    },
  ],
})
</script>
