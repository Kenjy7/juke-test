import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/index.js'

// Canonical (default-locale) routes. The localized route tree is derived from
// these — add a page once here and it exists in every locale automatically.
const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    alias: ['/home'],
  },
  {
    path: '/webdesign',
    name: 'webdesign',
    component: () => import('@/views/AanbodView.vue'),
    alias: ['/aanbod', '/webdesign-pakketten', '/pakketten'],
  },
  {
    path: '/ai-projecten',
    name: 'aiProjecten',
    component: () => import('@/views/AiSolutionsView.vue'),
    alias: ['/ai'],
  },
  {
    path: '/ai-automatisatie',
    redirect: '/ai-projecten',
  },
  {
    path: '/ai-automation',
    redirect: '/ai-projecten',
  },
  {
    path: '/saas-development',
    name: 'saasDevelopment',
    component: () => import('@/views/SaasDevelopmentView.vue'),
    alias: ['/saas'],
  },
  {
    path: '/vibemind',
    name: 'vibemind',
    component: () => import('@/views/VibemindView.vue'),
    alias: ['/vibe'],
  },
  {
    path: '/beheerly',
    name: 'beheerly',
    component: () => import('@/views/BeheerlyView.vue'),
    alias: ['/syndicus'],
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    alias: ['/kennismaking', '/afspraak'],
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('@/views/CookiesBeleidView.vue'),
    alias: ['/cookiebeleid', '/privacy-cookies'],
  },
  {
    path: '/offerte-aanvraag',
    name: 'offerteAanvraag',
    component: () => import('@/views/OfferteView.vue'),
    alias: ['/offerte', '/offerteaanvraag'],
  },
  {
    path: '/website-die-klanten-oplevert',
    name: 'websiteDieKlantenOplevert',
    component: () => import('@/views/WebdesignDatKlantenOplevertView.vue'),
    alias: [
      '/website-die-klanten-opbrengt',
      '/website-die-klanten-brengt',
      '/website-klanten-oplevert',
      '/webdesign-die-klanten-oplevert',
    ],
  },
  {
    path: '/gratis-seo-scan',
    name: 'gratisSeoScan',
    component: () => import('@/views/SeoScanView.vue'),
    alias: ['/seo-scan', '/seo-check'],
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blogPost',
    component: () => import('@/views/BlogPostView.vue'),
    props: true,
  },
]

const prefix = (path, locale) => (path === '/' ? `/${locale}` : `/${locale}${path}`)

// Clone the canonical tree for one locale: default locale stays unprefixed,
// others get a `/<locale>` path prefix on the route, its aliases and any
// redirect target. `meta.locale` lets the router guard set the active locale.
function localizedRoutes(locale) {
  const isDefault = locale === DEFAULT_LOCALE
  return baseRoutes.map((r) => {
    const route = { ...r, meta: { ...r.meta, locale } }
    if (!isDefault) {
      route.path = prefix(r.path, locale)
      if (r.name) route.name = `${r.name}-${locale}`
      if (r.alias) route.alias = r.alias.map((a) => prefix(a, locale))
      if (typeof r.redirect === 'string') route.redirect = prefix(r.redirect, locale)
    }
    return route
  })
}

export const routes = [
  ...SUPPORTED_LOCALES.flatMap(localizedRoutes),
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]
