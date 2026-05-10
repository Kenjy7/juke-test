<template>
  <BackgroundWeb>
    <div class="contactformuliermain">
      <contact-component />
    </div>
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import ContactComponent from '@/components/ContactFormulier.vue'

const contactFaqs = [
  {
    question: 'Hoe snel krijg ik een reactie na het sturen van een bericht?',
    answer: 'We reageren doorgaans binnen 1 werkdag op contactaanvragen. Voor dringende vragen kun je ook bellen of een korte omschrijving meesturen zodat we gericht kunnen antwoorden.',
  },
  {
    question: 'Is een kennismakingsgesprek gratis?',
    answer: 'Ja, een eerste kennismakingsgesprek is volledig gratis en vrijblijvend. We bespreken je wensen, doelen en wat de beste aanpak is voor jouw project.',
  },
  {
    question: 'Werken jullie ook buiten Hasselt en Limburg?',
    answer: 'Absoluut. Hoewel onze focus op Hasselt en Limburg ligt, helpen we KMO en zelfstandigen in heel Vlaanderen en de rest van Belgie. Veel trajecten verlopen volledig online.',
  },
  {
    question: 'Wat heb ik nodig voor een eerste gesprek?',
    answer: 'Niets speciaals. Een idee van wat je wil, wie je doelgroep is en eventueel een voorbeeld van websites die je aanspreekt is al meer dan genoeg om een goed gesprek te hebben.',
  },
]

useHead({
  title: 'Contact Opnemen | AI & Webdesign Hasselt | JukeCoding',
  meta: [
    {
      name: 'description',
      content: 'Plan een gratis kennismakingsgesprek voor je AI-project of website. Snel antwoord, helder advies. Actief in Hasselt, Limburg en heel Belgie.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'keywords', content: 'contact JukeCoding, AI automatisatie Hasselt, offerte aanvragen AI, kennismaking AI-bureau Belgie' },
    { name: 'author', content: 'JukeCoding' },
    { property: 'og:title', content: 'Contact Opnemen | AI & Webdesign Hasselt | JukeCoding' },
    { property: 'og:description', content: 'Plan een gratis kennismakingsgesprek voor je AI-project of website in Hasselt en Limburg. Snel antwoord, geen verplichtingen.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/contact' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:alt', content: 'Contact opnemen met JukeCoding voor AI en webdesign in Hasselt' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact Opnemen | JukeCoding Hasselt' },
    { name: 'twitter:description', content: 'Plan een gratis kennismakingsgesprek voor je AI-project of website. Actief in Hasselt, Limburg en heel Belgie.' },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    { name: 'twitter:image:alt', content: 'JukeCoding - AI automatisering en webdesign in Hasselt en Limburg' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/contact' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': 'https://jukecoding.be/contact#webpage',
        url: 'https://jukecoding.be/contact',
        name: 'Contact opnemen met JukeCoding',
        description: 'Plan een gratis kennismakingsgesprek voor AI-automatisering of webdesign in Hasselt en Limburg.',
        inLanguage: 'nl-BE',
        isPartOf: { '@id': 'https://jukecoding.be/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://jukecoding.be/contact' },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://jukecoding.be/contact#faq',
        mainEntity: contactFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }),
    },
  ],
})
</script>

<style scoped>
.contactformuliermain {
  padding-top: 1rem;
}
</style>
