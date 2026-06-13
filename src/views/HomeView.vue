<template>
  <BackgroundWeb>
    <HeroSectionHome />
    <SaasShowcaseHome />
    <AiShowcase />
    <ServiceSection />
    <WaaromJuke />
    <FaqList
      :faqs="homeFaqsDisplay"
      :label="t('homeView.faq.label')"
      :title="t('homeView.faq.title')"
      :description="t('homeView.faq.description')"
    />
    <CasesCta />
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import HeroSectionHome from '@/components/HeroSectionHome.vue'
import SaasShowcaseHome from '@/components/SaasShowcaseHome.vue'
import AiShowcase from '@/components/AiShowcase.vue'
import ServiceSection from '@/components/ServiceSection.vue'
import CasesCta from '@/components/CasesCta.vue'
import WaaromJuke from '@/components/WaaromJuke.vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import FaqList from '@/components/FaqList.vue'

const { t } = useI18n()

const homeFaqs = [
  {
    question: 'Wat doet Juke precies?',
    answer:
      "Juke is een development studio in Hasselt die SaaS-platformen, AI-oplossingen en websites bouwt voor bedrijven met ambitie. We helpen scale-ups en KMO's om eigen software te ontwikkelen, processen te automatiseren en online sterker te staan.",
  },
  {
    question: 'Wat kost SaaS-development of een AI-project?',
    answer:
      'SaaS-platformen en AI-projecten zijn maatwerk en worden per project begroot na een vrijblijvend gesprek. We bespreken de prijs altijd persoonlijk en maken vooraf een heldere offerte, afgestemd op de scope.',
  },
  {
    question: 'Bieden jullie ook webdesign aan?',
    answer:
      'Ja. Naast SaaS en AI bouwen we professionele websites op maat. Onze websites zijn snel, mobielvriendelijk en geoptimaliseerd voor conversie en lokale SEO.',
  },
  {
    question: 'Voor wie zijn jullie diensten bedoeld?',
    answer:
      "Onze SaaS- en AI-projecten zijn ideaal voor scale-ups, middelgrote bedrijven en internationale organisaties. Voor webdesign helpen we ook KMO's en zelfstandigen in heel Belgie.",
  },
  {
    question: 'Hoe ziet een samenwerking eruit?',
    answer:
      'We starten met een vrijblijvend gesprek om je situatie te begrijpen. Daarna maken we een voorstel met scope, planning en prijs. We werken in korte sprints zodat je snel resultaat ziet en tussentijds kunt bijsturen.',
  },
]

const homeFaqsDisplay = computed(() => [
  { question: t('homeView.faqs.what.question'), answer: t('homeView.faqs.what.answer') },
  { question: t('homeView.faqs.pricing.question'), answer: t('homeView.faqs.pricing.answer') },
  { question: t('homeView.faqs.webdesign.question'), answer: t('homeView.faqs.webdesign.answer') },
  { question: t('homeView.faqs.audience.question'), answer: t('homeView.faqs.audience.answer') },
  { question: t('homeView.faqs.process.question'), answer: t('homeView.faqs.process.answer') },
])

useHead({
  title: 'SaaS & AI Development Studio Hasselt | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Juke bouwt SaaS-platformen, AI-oplossingen en websites voor bedrijven met ambitie. Development studio in Hasselt, Belgie.',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'keywords',
      content:
        'Juke, SaaS development, AI development Belgie, AI-automatisering, custom software, webdesign Hasselt, development studio Belgie',
    },
    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },
    { name: 'author', content: 'Juke' },
    { name: 'copyright', content: 'Juke' },
    { name: 'language', content: 'Dutch' },
    {
      property: 'og:title',
      content: 'SaaS & AI Development Studio | Juke',
    },
    {
      property: 'og:description',
      content:
        'Juke bouwt SaaS-platformen, AI-oplossingen en websites voor bedrijven met ambitie. Development studio in Hasselt, Belgie.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'SaaS & AI Development Studio | Juke',
    },
    {
      name: 'twitter:description',
      content: 'SaaS-platformen, AI-oplossingen en websites voor bedrijven met ambitie.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    {
      name: 'twitter:image:alt',
      content: 'Juke - SaaS & AI development studio in Hasselt',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/' }],
  script: [
    // Organisatie-schema komt centraal uit App.vue (zie src/data/organizationSchema.js).
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://jukecoding.be/#website',
        name: 'Juke',
        url: 'https://jukecoding.be/',
        publisher: { '@id': 'https://jukecoding.be/#organization' },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://jukecoding.be/#faq',
        mainEntity: homeFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
})
</script>
