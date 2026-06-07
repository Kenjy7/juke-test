<template>
  <div id="app">
    <a href="#main" class="skip-link">Naar hoofdinhoud</a>
    <Navbar />
    <Chatbot />
    <CookiesPopUp />
    <main id="main" tabindex="-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import '@/assets/tokens.css'
import '@/assets/base.css'

import Navbar from '@/components/Navbar.vue'
import Chatbot from '@/components/Chatbot.vue'
import Footer from '@/components/Footer.vue'
import CookiesPopUp from '@/components/CookiesPopUp.vue'

useHead({
  htmlAttrs: {
    lang: 'nl',
  },
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    { name: 'geo.region', content: 'BE-VLG' },
    { name: 'geo.placename', content: 'Hasselt' },
    { name: 'geo.position', content: '50.9307;5.3378' },
    { name: 'ICBM', content: '50.9307, 5.3378' },

    { name: 'author', content: 'JukeCoding' },
    { name: 'copyright', content: 'JukeCoding' },
    { name: 'language', content: 'Dutch' },

    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
  ],
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
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

.reveal-delay-1 { transition-delay: 60ms; }
.reveal-delay-2 { transition-delay: 120ms; }
.reveal-delay-3 { transition-delay: 180ms; }
.reveal-delay-4 { transition-delay: 240ms; }
</style>