<template>
  <BackgroundWeb>
    <WebdesignDatKlantenOplevert />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'

import WebdesignDatKlantenOplevert from '@/components/WebdesignDatKlantenOplevert.vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

import {faqsMeerKlanten} from '@/data/faqs.meerklanten.js'

const url = 'https://jukecoding.be/website-die-klanten-oplevert'
const siteUrl = 'https://jukecoding.be/'
const ogImage = 'https://jukecoding.be/og-image-conversie.jpg'

/** JSON-LD: Breadcrumbs - Met webdesign tussenlaag */
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Webdesign', item: `${siteUrl}webdesign` },
    { '@type': 'ListItem', position: 3, name: 'Website die klanten oplevert', item: url },
  ],
}

/** JSON-LD: FAQPage */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faqsMeerKlanten.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

/** JSON-LD: HowTo - Voor Featured Snippet kans */
const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${url}#howto`,
  name: 'Hoe zorg je dat je website klanten oplevert',
  description: 'Ontdek in 5 stappen hoe je website omzet in een klantenmagneet met duidelijke CTA\'s en conversie-optimalisatie.',
  image: {
    '@type': 'ImageObject',
    url: ogImage,
  },
  totalTime: 'P14D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'EUR',
    value: '600',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Strategie & doelen',
      text: 'Bepaal je primaire call-to-action (contact, offerte, afspraak) en maak je doelgroep glashelder.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Structuur (wireframe)',
      text: 'Bouw een logische opbouw zodat bezoekers snel vinden wat ze zoeken en vlot kunnen beslissen.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Design & copy-richting',
      text: 'CreÃ«er design dat vertrouwen opbouwt met duidelijke hiÃ«rarchie en converterende content.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Bouw & performance',
      text: 'Zorg voor mobielvriendelijke, snelle website die technisch netjes is: klaar voor SEO en vlotte UX.',
      url: `${url}#stappen-webdesign`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Lancering & optimalisatie',
      text: 'Livegang + opvolging: meten, bijsturen en verbeteren waar nodig voor maximale conversie.',
      url: `${url}#stappen-webdesign`,
    },
  ],
}

/** JSON-LD: WebPage */
const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${url}#webpage`,
  url,
  name: 'Website die klanten oplevert | Conversie-optimalisatie',
  description:
      "Website die geen klanten oplevert? Wij optimaliseren voor conversie met duidelijke CTA's, snelheid en vertrouwenssignalen. Meer aanvragen, betere resultaten.",
  inLanguage: 'nl-BE',
  isPartOf: { '@id': `${siteUrl}#website` },
  about: { '@id': `${siteUrl}#organization` },
  breadcrumb: { '@id': `${url}#breadcrumb` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: ogImage,
    width: 1200,
    height: 630,
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero__title', '.section-title']
  }
}

/** JSON-LD: Service - Conversie-specifiek */
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name: 'Website conversie-optimalisatie',
  serviceType: 'Conversie-optimalisatie & Webdesign',
  description:
      "Transformeer je website in een klantenmagneet. We optimaliseren voor meer aanvragen via duidelijke CTA's, snelheid, vertrouwenssignalen en mobiele ervaring.",
  areaServed: { '@type': 'Country', name: 'Belgium' },
  url,
  provider: { '@type': 'Organization', '@id': `${siteUrl}#organization` },
  offers: {
    '@type': 'Offer',
    name: 'Website conversie-optimalisatie pakket',
    description: 'Complete website die klanten oplevert: van strategie tot conversie-geoptimaliseerd design',
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '600',
      priceCurrency: 'EUR'
    },
    availability: 'https://schema.org/InStock',
    url: `${siteUrl}webdesign#pakketten`,
  },
  serviceOutput: {
    '@type': 'WebSite',
    name: 'Conversiegerichte website'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Conversie-verbeteringen',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CTA optimalisatie',
          description: 'Duidelijke call-to-actions op strategische plaatsen'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performance optimalisatie',
          description: 'Snelle laadtijden voor lagere bounce rate'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobiele conversie',
          description: 'Mobielvriendelijk design dat converteert'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vertrouwensopbouw',
          description: 'Design en content die vertrouwen opbouwt'
        }
      }
    ]
  }
}

useHead({
  // ðŸŽ¯ Title met probleem + oplossing focus
  title: 'Website Die Klanten Oplevert | JukeCoding',

  meta: [
    {
      name: 'description',
      content:
          'Wil je meer aanvragen via je site? We bouwen snelle pagina\'s met sterke CTA\'s, vertrouwen en lokale SEO.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
    { name: 'author', content: 'JukeCoding' },
    { name: 'language', content: 'nl' },

    // Keywords - conversie-specifiek
    {
      name: 'keywords',
      content: 'website klanten oplevert, conversiegerichte website, website meer aanvragen, conversie optimalisatie, website leadgeneratie, CTA optimalisatie'
    },

    // Open Graph
    { property: 'og:title', content: 'Website Die Klanten Oplevert | JukeCoding'},
    {
      property: 'og:description',
      content:
          'Snelle pagina\'s met sterke CTA\'s, vertrouwen en lokale SEO voor meer aanvragen.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'JukeCoding - Website conversie-optimalisatie' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:locale:alternate', content: 'nl_NL' },
    { property: 'og:site_name', content: 'JukeCoding' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Website Die Klanten Oplevert | JukeCoding' },
    {
      name: 'twitter:description',
      content: 'Meer aanvragen via een snelle website met sterke CTA\'s en vertrouwen.',
    },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: 'JukeCoding â€“ website conversie-optimalisatie' },

    // Additional SEO
    { name: 'format-detection', content: 'telephone=yes' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
  ],

  link: [
    { rel: 'canonical', href: url },

    // DNS Prefetch voor performance
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' },

    // Preload critical image
    { rel: 'preload', href: ogImage, as: 'image' },
  ],

  script: [
    {
      key: 'ld-breadcrumb',
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbJsonLd)
    },
    {
      key: 'ld-webpage',
      type: 'application/ld+json',
      children: JSON.stringify(webPageJsonLd)
    },
    {
      key: 'ld-service',
      type: 'application/ld+json',
      children: JSON.stringify(serviceJsonLd)
    },
    {
      key: 'ld-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToJsonLd)
    },
    {
      key: 'ld-faq-meerklanten',
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd),
    },
  ],
})

</script>




