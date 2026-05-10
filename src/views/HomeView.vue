<template>
  <BackgroundWeb>
    <HeroSectionHome />
    <AiShowcase />
    <ServiceSection />
    <AiProcess />
    <AiHomepageSection />
    <CasesCta />
    <WaaromJuke />
    <FaqList
      :faqs="homeFaqs"
      label="FAQ"
      title="Veelgestelde vragen"
      description="Heldere antwoorden over AI, SaaS, webdesign en samenwerking."
    />
    <ContactComponent />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import HeroSectionHome from '@/components/HeroSectionHome.vue'
import AiShowcase from '@/components/AiShowcase.vue'
import ServiceSection from '@/components/ServiceSection.vue'
import AiProcess from '@/components/AiProcess.vue'
import AiHomepageSection from '@/components/AiHomepageSection.vue'
import CasesCta from '@/components/CasesCta.vue'
import WaaromJuke from '@/components/WaaromJuke.vue'
import ContactComponent from '@/components/ContactFormulier.vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import FaqList from '@/components/FaqList.vue'

const homeFaqs = [
  {
    question: 'Wat doet JukeCoding precies?',
    answer:
      'JukeCoding is een development studio in Hasselt die AI-oplossingen, SaaS-platformen en websites bouwt voor bedrijven met ambitie. We helpen scale-ups en KMO\'s om processen te automatiseren, eigen software te ontwikkelen en online sterker te staan.',
  },
  {
    question: 'Wat kosten AI-projecten of SaaS-development?',
    answer:
      'AI-projecten starten vanaf EUR 800 voor kleinere automatiseringen. SaaS-platformen zijn maatwerk en worden per project begroot na een vrijblijvend gesprek. We maken altijd een heldere offerte vooraf.',
  },
  {
    question: 'Bieden jullie ook webdesign aan?',
    answer:
      'Ja. Naast AI en SaaS bouwen we professionele websites op maat vanaf EUR 600. Onze websites zijn snel, mobielvriendelijk en geoptimaliseerd voor conversie en lokale SEO.',
  },
  {
    question: 'Voor wie zijn jullie diensten bedoeld?',
    answer:
      'Onze AI- en SaaS-projecten zijn ideaal voor scale-ups, middelgrote bedrijven en internationale organisaties. Voor webdesign helpen we ook KMO\'s en zelfstandigen in heel Belgie.',
  },
  {
    question: 'Hoe ziet een samenwerking eruit?',
    answer:
      'We starten met een vrijblijvend gesprek om je situatie te begrijpen. Daarna maken we een voorstel met scope, planning en prijs. We werken in korte sprints zodat je snel resultaat ziet en tussentijds kunt bijsturen.',
  },
]

useHead({
  title: 'AI & SaaS Development Studio Hasselt | JukeCoding',
  meta: [
    {
      name: 'description',
      content:
        'JukeCoding bouwt AI-oplossingen, SaaS-platformen en websites voor bedrijven met ambitie. Development studio in Hasselt, Belgie.',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    {
      name: 'keywords',
      content:
        'JukeCoding, AI development Belgie, SaaS development, AI-agents, custom software, webdesign Hasselt, development studio Belgie',
    },
    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },
    { name: 'author', content: 'JukeCoding' },
    { name: 'copyright', content: 'JukeCoding' },
    { name: 'language', content: 'Dutch' },
    {
      property: 'og:title',
      content: 'AI & SaaS Development Studio | JukeCoding',
    },
    {
      property: 'og:description',
      content:
        'JukeCoding bouwt AI-oplossingen, SaaS-platformen en websites voor bedrijven met ambitie. Development studio in Hasselt, Belgie.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'AI & SaaS Development Studio | JukeCoding',
    },
    {
      name: 'twitter:description',
      content: 'AI-oplossingen, SaaS-platformen en websites voor bedrijven met ambitie.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    {
      name: 'twitter:image:alt',
      content: 'JukeCoding - AI & SaaS development studio in Hasselt',
    },
  ],
  link: [
    { rel: 'canonical', href: 'https://jukecoding.be/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
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
        description: 'AI-oplossingen, SaaS-platformen en websites voor bedrijven met ambitie. Development studio in Hasselt, Belgie.',
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
        priceRange: 'EUR 600 - EUR 25000+',
        currenciesAccepted: 'EUR',
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
          'AI Development', 'AI Agents', 'SaaS Development', 'Chatbots',
          'Workflow Automatisatie', 'Webdesign', 'Web Development', 'SEO',
        ],
        areaServed: [
          { '@type': 'City', name: 'Hasselt', addressCountry: 'BE' },
          { '@type': 'AdministrativeArea', name: 'Limburg', addressCountry: 'BE' },
          { '@type': 'AdministrativeArea', name: 'Vlaanderen', addressCountry: 'BE' },
          { '@type': 'Country', name: 'Belgium' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI, SaaS & Webdesign diensten',
          itemListElement: [
            {
              '@type': 'Offer',
              price: '800',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              itemOffered: {
                '@type': 'Service',
                name: 'AI-projecten',
                description: 'AI-agents, chatbots en slimme workflows op maat',
              },
            },
            {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS Development',
                description: 'Custom SaaS-platformen, dashboards en portalen',
              },
            },
            {
              '@type': 'Offer',
              price: '600',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              itemOffered: {
                '@type': 'Service',
                name: 'Webdesign',
                description: 'Professionele websites op maat voor KMO\'s en zelfstandigen',
              },
            },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://jukecoding.be/#website',
        name: 'JukeCoding',
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
