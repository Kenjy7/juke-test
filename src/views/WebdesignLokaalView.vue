<template>
  <BackgroundWeb>
    <WebdesignLokaal v-if="stadInfo" :stad-slug="slug" :stad-info="stadInfo" />
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import WebdesignLokaal from '@/components/WebdesignLokaal.vue'

import { stadData, geldigeSteden } from '@/data/steden'

const route = useRoute()

const slug = computed(() => String(route.params.stad || '').toLowerCase())
const stadInfo = computed(() => stadData[slug.value] || null)

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://jukecoding.be').replace(/\/$/, '')
const canonical = computed(() => `${siteUrl}/webdesign-${slug.value}`)

const stripNewlines = (value = '') => String(value).replace(/\s+/g, ' ').trim()

const toAbsUrl = (url) => {
  if (!url) return null
  return url.startsWith('http')
    ? url
    : `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

const title = computed(() => {
  if (!stadInfo.value) return 'Pagina niet gevonden'
  return `Website laten maken in ${stadInfo.value.naam} | Vanaf EUR 600`
})

const description = computed(() => {
  if (!stadInfo.value) return 'Deze pagina bestaat niet.'

  return stripNewlines(
    `Website laten maken in ${stadInfo.value.naam}? Snelle website op maat vanaf EUR 600, met lokale SEO en focus op meer aanvragen.`
  )
})

const ogImage = computed(() => {
  if (!stadInfo.value) return null
  const image = stadInfo.value.ogImage || stadInfo.value.foto || stadInfo.value.fotoHero || null
  return toAbsUrl(image)
})

const heroImage = computed(() => {
  if (!stadInfo.value) return null
  return toAbsUrl(stadInfo.value.fotoHero || null)
})

const orgJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'JukeCoding',
  url: siteUrl,
  telephone: '+32479131715',
  email: 'contact@jukecoding.be',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hasselt',
    addressRegion: 'Limburg',
    addressCountry: 'BE',
  },
  sameAs: [
    'https://www.linkedin.com/company/jukecoding',
    'https://www.instagram.com/jukecoding',
  ],
}))

const pageJsonLd = computed(() => {
  if (!stadInfo.value) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical.value}#webpage`,
    url: canonical.value,
    name: title.value,
    description: description.value,
    inLanguage: 'nl-BE',
    about: [{ '@type': 'City', name: stadInfo.value.naam, addressCountry: 'BE' }],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Webdesign', item: `${siteUrl}/webdesign` },
        { '@type': 'ListItem', position: 3, name: `Website laten maken in ${stadInfo.value.naam}`, item: canonical.value },
      ],
    },
  }
})

const serviceJsonLd = computed(() => {
  if (!stadInfo.value) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical.value}#service`,
    name: `Website laten maken in ${stadInfo.value.naam}`,
    url: canonical.value,
    description: description.value,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: {
      '@type': 'City',
      name: stadInfo.value.naam,
      addressCountry: 'BE',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: String(stadInfo.value.lat),
        longitude: String(stadInfo.value.lng),
      },
    },
    serviceType: ['Website laten maken', 'Webdesign', 'Lokale SEO', 'Website onderhoud'],
    offers: {
      '@type': 'Offer',
      price: '600',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      description: `Snelle website op maat voor ondernemers in ${stadInfo.value?.naam || ''} vanaf EUR 600`,
    },
  }
})

useHead(() => {
  const valid = geldigeSteden.includes(slug.value) && !!stadInfo.value

  if (!valid) {
    return {
      title: 'Pagina niet gevonden',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  const keywords = [
    ...(stadInfo.value.keywords || []),
    `website laten maken ${stadInfo.value.naam.toLowerCase()}`,
    `webdesign ${stadInfo.value.naam.toLowerCase()}`,
    `lokale SEO ${stadInfo.value.naam.toLowerCase()}`,
    `webbureau ${stadInfo.value.naam.toLowerCase()}`,
  ]

  const meta = [
    { name: 'description', content: description.value },
    { name: 'keywords', content: keywords.join(', ') },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'author', content: 'JukeCoding' },
    // GEO tags per stad
    { name: 'geo.region', content: `BE-VLG` },
    { name: 'geo.placename', content: stadInfo.value.naam },
    ...(stadInfo.value.lat && stadInfo.value.lng ? [
      { name: 'geo.position', content: `${stadInfo.value.lat};${stadInfo.value.lng}` },
      { name: 'ICBM', content: `${stadInfo.value.lat}, ${stadInfo.value.lng}` },
    ] : []),
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:url', content: canonical.value },
    ...(ogImage.value
      ? [
          { property: 'og:image', content: ogImage.value },
          { property: 'og:image:alt', content: `Webdesign voor KMO en zelfstandigen in ${stadInfo.value.naam}` },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
        ]
      : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
    ...(ogImage.value ? [
      { name: 'twitter:image', content: ogImage.value },
      { name: 'twitter:image:alt', content: `JukeCoding - webdesign in ${stadInfo.value.naam}` },
    ] : []),
  ]

  const link = [{ rel: 'canonical', href: canonical.value }]

  if (heroImage.value) {
    link.push({
      rel: 'preload',
      as: 'image',
      href: heroImage.value,
      fetchpriority: 'high',
    })
  }

  const stadNaam = stadInfo.value.naam
  const stadFaqs = [
    {
      question: `Wat kost een website laten maken in ${stadNaam}?`,
      answer: `Een website laten maken in ${stadNaam} start bij JukeCoding vanaf EUR 600. De prijs hangt af van het pakket, het aantal pagina's en de gewenste functies zoals een webshop of lokale SEO.`,
    },
    {
      question: `Werkt JukeCoding ook voor bedrijven buiten Hasselt, zoals in ${stadNaam}?`,
      answer: `Ja, JukeCoding werkt voor KMO en zelfstandigen in heel Vlaanderen, ook in ${stadNaam}. Veel trajecten verlopen volledig online. We stemmen elke website af op de lokale doelgroep en zoekintentie in ${stadNaam}.`,
    },
    {
      question: `Hoe snel staat mijn website live als ik in ${stadNaam} gevestigd ben?`,
      answer: `Gemiddeld staat een website live in 3 tot 4 weken. Dat geldt ook als je gevestigd bent in ${stadNaam}. Bij vlotte aanlevering van content en feedback kunnen kleinere projecten sneller live gaan.`,
    },
    {
      question: `Is lokale SEO voor ${stadNaam} inbegrepen?`,
      answer: `Ja. We voorzien in elk pakket een sterke SEO-basis: optimale title tags, meta descriptions, interne structuur en copy die inspeelt op zoekopdrachten vanuit ${stadNaam} en de omgeving.`,
    },
  ]

  const script = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(orgJsonLd.value) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(pageJsonLd.value) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(serviceJsonLd.value) },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonical.value}#faq`,
        mainEntity: stadFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }),
    },
  ]

  return {
    title: title.value,
    link,
    meta,
    script,
  }
})
</script>
