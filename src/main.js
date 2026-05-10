import { blogPosts } from './data/blogs'
import { provincieSlugs } from './data/provincies'
import { stadSlugs } from './data/steden'
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router/routes'

import { createHeadCore, createUnhead } from '@unhead/vue'
import { renderSSRHead } from '@unhead/ssr'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router, isClient }) => {
    app.use(createPinia())

    const unhead = createUnhead()
    const head = createHeadCore(unhead)
    app.use(head)
    app.config.globalProperties.$unhead = unhead

    unhead.push({
      htmlAttrs: { lang: 'nl' },
    })

    if (isClient) {
      router.afterEach((to) => {
        if (!to.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
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
    async onRendered(ctx) {
      const unhead = ctx.app.config.globalProperties.$unhead
      const { headTags, htmlAttrs, bodyAttrs } = await renderSSRHead(unhead)

      const fixedHtmlAttrs = /lang="[^"]*"/.test(htmlAttrs)
        ? htmlAttrs.replace(/lang="[^"]*"/, 'lang="nl"')
        : `${htmlAttrs} lang="nl"`

      ctx.html = ctx.html
        .replace('<html', `<html${fixedHtmlAttrs}`)
        .replace('<body', `<body${bodyAttrs}`)
        .replace('</head>', `${headTags}</head>`)
    },
  }
)

export function includedRoutes() {
  return [
    '/',
    '/webdesign',
    '/ai-automatisatie',
    '/contact',
    '/cookies',
    '/offerte-aanvraag',
    '/locaties',
    '/website-die-klanten-oplevert',
    '/gratis-seo-scan',
    '/blog',
    ...provincieSlugs.map((provincie) => `/webdesign-${provincie}`),
    ...stadSlugs.map((stad) => `/webdesign-${stad}`),
    ...blogPosts.filter((post) => post.published).map((post) => `/blog/${post.slug}`),
  ]
}
