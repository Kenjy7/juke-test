<template>
  <BackgroundWeb>
    <OfferteFormulier />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'

import BackgroundWeb from '@/components/BackgroundWeb.vue'
import OfferteFormulier from '@/components/OfferteFormulier.vue'

useHead({
  title: 'Offerte AI & Webdesign in 24u | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Vraag je offerte aan voor AI-automatisering of webdesign. Binnen 24 uur een voorstel op maat voor je bedrijf.',
    },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:title', content: 'Offerte AI & Webdesign in 24u | Juke' },
    {
      property: 'og:description',
      content: 'Binnen 24 uur een voorstel op maat voor AI-automatisering of webdesign.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/offerte-aanvraag' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:alt', content: 'Offerte aanvragen bij Juke' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Offerte AI & Webdesign in 24u | Juke' },
    {
      name: 'twitter:description',
      content: 'Vraag vrijblijvend een voorstel op maat aan voor je AI-project of website.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    {
      name: 'twitter:image:alt',
      content: 'Juke - offerte voor AI automatisering of webdesign',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/offerte-aanvraag' }],
})
</script>

<style scoped lang="scss"></style>
