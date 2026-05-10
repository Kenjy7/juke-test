<template>
  <div class="ai-view">
    <BackgroundWeb>
      <IntroAi />
      <ShortAnswer class="styleAI" title="AI-automatisering: de kernexpertise van JukeCoding">
        JukeCoding is gespecialiseerd in AI-automatisering voor Belgische bedrijven.
        We bouwen op maat gemaakte AI-agents, chatbots en slimme workflows die
        repetitieve taken volledig automatiseren. Zo besparen teams tot 80% tijd,
        verminderen ze fouten en kunnen ze zich focussen op groei en strategie.
      </ShortAnswer>

      <AIAgents />
      <AiFeaturedrid />
      <AiProblemSolver />
      <AiSplitSection />
      <AiPlatformComponent />
      <WebdesignCta />

      <FaqListAI :faqs="faqsAI" />
    </BackgroundWeb>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import IntroAi from '@/components/IntroAi.vue'
import AIAgents from '@/components/AIAgents.vue'
import AiFeaturedrid from '@/components/AiFeaturedrid.vue'
import AiProblemSolver from '@/components/AiProblemSolver.vue'
import AiSplitSection from '@/components/AiSplitSection.vue'
import AiPlatformComponent from '@/components/AiPlatformComponent.vue'
import WebdesignCta from '@/components/WebdesignCTA.vue'
import FaqListAI from '@/components/FaqListAI.vue'
import ShortAnswer from '@/components/ShortAnswer.vue'

import { faqsAI } from '@/data/faqs.ai'

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
  name: 'AI automatisering & AI agents voor KMO in Belgie',
  serviceType: ['AI Automation', 'AI Agents', 'Chatbot Development', 'Workflow Automatisatie'],
  description: 'AI-agents, chatbots en slimme workflows die repetitieve taken automatiseren voor KMO en zelfstandigen in Belgie. Bespaar tijd, verminder fouten en groei sneller.',
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url,
  provider: { '@type': 'Organization', '@id': 'https://jukecoding.be/#organization' },
  offers: {
    '@type': 'Offer',
    price: '800',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2026-12-31',
    description: 'AI automatisering op maat voor KMO vanaf EUR 800',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsAI.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://jukecoding.be/#organization',
  name: 'JukeCoding',
  alternateName: 'Juke Coding',
  url: 'https://jukecoding.be/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://jukecoding.be/logo.png',
    width: 200,
    height: 60,
  },
  image: 'https://jukecoding.be/og-image.jpg',
  description: 'Professionele websites en AI-automatisatie voor KMO en zelfstandigen in Hasselt, Limburg en heel Vlaanderen.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hasselt',
    addressRegion: 'Limburg',
    postalCode: '3500',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.9307,
    longitude: 5.3378,
  },
  telephone: '+32479131715',
  email: 'contact@jukecoding.be',
  priceRange: 'EUR 600 - EUR 3000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/jukecoding',
    'https://www.instagram.com/jukecoding',
  ],
  knowsAbout: [
    'AI Automatisatie', 'AI Agents', 'Chatbots', 'Workflow Automatisatie',
    'Web Design', 'AI Automation', 'Web Development', 'Digital Marketing', 'SEO',
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Limburg', addressCountry: 'BE' },
    { '@type': 'AdministrativeArea', name: 'Vlaanderen', addressCountry: 'BE' },
    { '@type': 'Country', name: 'Belgium' },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://jukecoding.be/#website',
  name: 'JukeCoding',
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
  title: 'AI Automatisatie voor KMO\'s in Belgie | JukeCoding',
  meta: [
    {
      name: 'description',
      content: 'AI automatisering voor KMO in Belgie met AI-agents en slimme workflows voor offertes, opvolging en rapportage. Actief in Hasselt en Limburg.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    {
      name: 'keywords',
      content: 'AI automatisatie Belgie, AI agents, chatbots, workflow automatisatie, KMO automatisatie, bedrijfsprocessen automatiseren',
    },
    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },
    { name: 'author', content: 'JukeCoding' },
    { name: 'copyright', content: 'JukeCoding' },
    { name: 'language', content: 'Dutch' },
    { property: 'og:title', content: 'AI Automatisatie voor KMO\'s | JukeCoding' },
    {
      property: 'og:description',
      content: 'AI automatisering voor KMO in Belgie met AI-agents en slimme workflows voor offertes, opvolging en rapportage. Actief in Hasselt en Limburg.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:alt', content: 'AI automatisering en AI agents door JukeCoding' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AI Automatisatie voor KMO\'s | JukeCoding' },
    {
      name: 'twitter:description',
      content: 'AI automatisering voor KMO in Belgie met AI-agents en slimme workflows voor offertes, opvolging en rapportage.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    {
      name: 'twitter:image:alt',
      content: 'JukeCoding - AI automatisatie voor Belgische KMO\'s',
    },
  ],
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      key: 'ld-organization',
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema),
    },
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
