<template>
  <BackgroundWeb>
    <LocatieComponent />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import LocatieComponent from '@/components/LocatieComponent.vue'
import { provincieSlugs, provincieData } from '@/data/provincies'

const siteUrl = 'https://jukecoding.be'

useHead({
  title: 'AI & Webdesign per Locatie in Vlaanderen | JukeCoding',
  meta: [
    {
      name: 'description',
      content: 'JukeCoding biedt AI-automatisering en webdesign voor KMO\'s in heel Vlaanderen. Bekijk onze locatiepagina\'s per provincie: Limburg, Antwerpen, Gent, West-Vlaanderen en Vlaams-Brabant.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'keywords', content: 'AI automatisatie Vlaanderen, webdesign Vlaanderen, AI-bureau Belgie locaties, webdesign per regio' },
    { name: 'author', content: 'JukeCoding' },
    { property: 'og:title', content: 'AI & Webdesign per Locatie in Vlaanderen | JukeCoding' },
    { property: 'og:description', content: 'AI-automatisering en webdesign voor KMO\'s in Limburg, Antwerpen, Oost-Vlaanderen, West-Vlaanderen en Vlaams-Brabant.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/locaties` },
    { property: 'og:image', content: `${siteUrl}/og-image-webdesign.jpg` },
    { property: 'og:image:alt', content: 'Webdesign locaties van JukeCoding in Vlaanderen' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Webdesign per Locatie in Vlaanderen | JukeCoding' },
    { name: 'twitter:description', content: 'Webdesign voor KMO en zelfstandigen in Limburg, Antwerpen, Gent en heel Vlaanderen.' },
    { name: 'twitter:image', content: `${siteUrl}/og-image-webdesign.jpg` },
    { name: 'twitter:image:alt', content: 'JukeCoding webdesign locaties in Vlaanderen' },
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/locaties` }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Locaties', item: `${siteUrl}/locaties` },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Webdesign per provincie in Vlaanderen',
        url: `${siteUrl}/locaties`,
        itemListElement: provincieSlugs.map((slug, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `Webdesign ${provincieData[slug].naam}`,
          url: `${siteUrl}/webdesign-${slug}`,
        })),
      }),
    },
  ],
})
</script>
