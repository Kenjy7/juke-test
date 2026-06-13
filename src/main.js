import { blogPosts } from './data/blogs'
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router/routes'

import { createHeadCore, createUnhead } from '@unhead/vue'

import { createAppI18n, LOCALE_META } from './i18n/index.js'
import { localeFromPath, stripLocale } from './i18n/routing.js'
import LocaleLink from './components/LocaleLink.vue'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router, isClient }) => {
    app.use(createPinia())

    // Per-app i18n (see createAppI18n) — avoids locale bleed between concurrent
    // SSG renders.
    const i18n = createAppI18n()
    app.use(i18n)

    const unhead = createUnhead()
    const head = createHeadCore(unhead)
    app.use(head)
    app.config.globalProperties.$unhead = unhead

    // Globally override <router-link> with LocaleLink so every existing link
    // auto-prefixes the active locale's path (prerendered /en pages link to /en
    // internally — essential for SEO). vite-ssg installs vue-router *after* this
    // setup fn runs, so registering here directly would be clobbered by the
    // built-in RouterLink. Doing it on the first guard run lands after install.
    let linkRegistered = false

    // Single source of truth for the active locale: derived from the URL.
    // Runs on the server during prerender and on the client during navigation.
    router.beforeEach((to) => {
      if (!linkRegistered) {
        app.component('RouterLink', LocaleLink)
        linkRegistered = true
      }
      i18n.global.locale.value = to.meta.locale || localeFromPath(to.path)
    })

    if (isClient) {
      router.afterEach((to, from) => {
        // Language switch (same page, only the locale prefix changes): keep the
        // current scroll position and focus instead of jumping to the top.
        if (from && stripLocale(to.path) === stripLocale(from.path)) return

        if (!to.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
          // SPA focus management: move focus to the main landmark so
          // keyboard / screen-reader users land on the new route's content.
          const main = document.getElementById('main')
          if (main) main.focus({ preventScroll: true })
          return
        }

        let tries = 0
        const maxTries = 40

        const scrollToHash = () => {
          const element = document.querySelector(to.hash)
          if (!element) {
            if (tries++ < maxTries) requestAnimationFrame(scrollToHash)
            return
          }

          const navbar = document.querySelector('.navbar')
          const offset = navbar?.offsetHeight ?? 0
          const y = element.getBoundingClientRect().top + window.pageYOffset - offset
          window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
        }

        requestAnimationFrame(scrollToHash)
      })

      router.afterEach((to) => {
        if (window.gtag) window.gtag('config', 'G-MDEMFNGVWJ', { page_path: to.fullPath })
      })
    }
  },
  {
    // Authoritative <html lang> per prerendered route — derived from the URL
    // prefix so it always matches the page's content locale (SEO + a11y).
    onPageRendered(route, html) {
      const lang = LOCALE_META[localeFromPath(route)].htmlLang
      return /<html[^>]*\slang=/.test(html)
        ? html.replace(/(<html[^>]*\slang=")[^"]*(")/, `$1${lang}$2`)
        : html.replace('<html', `<html lang="${lang}"`)
    },
  },
)

export function includedRoutes() {
  const nlPaths = [
    '/',
    '/webdesign',
    '/ai-automatisatie',
    '/contact',
    '/cookies',
    '/offerte-aanvraag',
    '/website-die-klanten-oplevert',
    '/gratis-seo-scan',
    '/blog',
    ...blogPosts.filter((post) => post.published).map((post) => `/blog/${post.slug}`),
  ]
  // Prerender every page in both locales: nl unprefixed, en under /en.
  const enPaths = nlPaths.map((p) => (p === '/' ? '/en' : `/en${p}`))
  return [...nlPaths, ...enPaths]
}
