<template>
  <div id="app">
    <Navbar />
    <Chatbot />
    <CookiesPopUp />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import '@/assets/tokens.css'

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
  color: var(--color-text-secondary);
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
  color: var(--color-text-primary);
}

/* ---- Noise grain overlay (fixed, pointer-events-none) ---- */
#app::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* ---- Scroll reveal system ---- */
.reveal {
  opacity: 0;
  transform: translateY(2.5rem);
  filter: blur(6px);
  transition:
    opacity var(--duration-reveal) var(--ease-out-expo),
    transform var(--duration-reveal) var(--ease-out-expo),
    filter var(--duration-reveal) var(--ease-out-expo);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
.reveal-delay-3 { transition-delay: 300ms; }
.reveal-delay-4 { transition-delay: 400ms; }
</style>