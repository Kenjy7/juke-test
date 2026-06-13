<template>
  <div id="app">
    <a href="#main" class="skip-link">{{ t('a11y.skipToContent') }}</a>
    <Navbar />
    <CookiesPopUp />
    <main id="main" tabindex="-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import '@/assets/tokens.css'
import '@/assets/base.css'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import CookiesPopUp from '@/components/CookiesPopUp.vue'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_META } from '@/i18n/index.js'
import { stripLocale, withLocale } from '@/i18n/routing.js'
import { organizationSchema } from '@/data/organizationSchema.js'

const SITE = 'https://jukecoding.be'
const route = useRoute()
const { t, locale } = useI18n()

// hreflang: one reciprocal, absolute alternate per locale + x-default → the
// default-locale URL. Centralized here so it covers every page automatically.
const canonicalPath = computed(() => stripLocale(route.path))
const alternateLinks = computed(() => {
  const links = SUPPORTED_LOCALES.map((code) => ({
    rel: 'alternate',
    hreflang: LOCALE_META[code].hreflang,
    href: SITE + withLocale(canonicalPath.value, code),
  }))
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: SITE + withLocale(canonicalPath.value, DEFAULT_LOCALE),
  })
  return links
})

useHead({
  htmlAttrs: {
    lang: computed(() => LOCALE_META[locale.value].htmlLang),
  },
  link: alternateLinks,
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },

    { name: 'author', content: 'Juke' },
    { name: 'copyright', content: 'Juke' },
    { name: 'language', content: computed(() => LOCALE_META[locale.value].htmlLang) },

    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: computed(() => LOCALE_META[locale.value].ogLocale) },
  ],
  // Canonieke organisatie-schema, één keer voor de hele site. Andere pagina's
  // verwijzen ernaar via { '@id': ORG_ID } i.p.v. een eigen org-blok te definiëren.
  script: [
    {
      key: 'ld-organization',
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema),
    },
  ],
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: var(--color-primary);
  color: var(--color-text-on-accent);
}

/* ---- Scroll reveal — quiet fade, no blur, minimal movement ---- */
.reveal {
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity var(--duration-reveal) var(--ease-smooth),
    transform var(--duration-reveal) var(--ease-smooth);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 {
  transition-delay: 60ms;
}
.reveal-delay-2 {
  transition-delay: 120ms;
}
.reveal-delay-3 {
  transition-delay: 180ms;
}
.reveal-delay-4 {
  transition-delay: 240ms;
}
</style>
