import { provincieSlugs } from '@/data/provincies'
import { geldigeSteden } from '@/data/steden'

const geldigeStedenSet = new Set(
  geldigeSteden.map((stad) => String(stad).toLowerCase())
)

const provincieRoutes = provincieSlugs.map((provincie) => ({
  path: `/webdesign-${provincie}`,
  name: `webdesignProvincie-${provincie}`,
  component: () => import('@/views/WebdesignProvincieView.vue'),
  props: { provincie },
}))

export const routes = [
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
  ...provincieRoutes,
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
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    alias: ['/kennismaking', '/afspraak', '/contact'],
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
    path: '/locaties',
    name: 'locaties',
    component: () => import('@/views/LocatiesView.vue'),
    alias: ['/locatie', '/actief'],
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
    path: '/webdesign-:stad',
    name: 'webdesignLokaal',
    component: () => import('@/views/WebdesignLokaalView.vue'),
    props: true,
    beforeEnter: (to) => {
      const stad = String(to.params.stad || '').toLowerCase()
      if (geldigeStedenSet.has(stad)) return true
      return { name: 'notFound', query: { from: to.fullPath } }
    },
  },
  {
    path: '/webdesigner-:stad',
    redirect: (to) => `/webdesign-${String(to.params.stad || '').toLowerCase()}`,
  },
  {
    path: '/website-laten-maken-:stad',
    redirect: (to) => `/webdesign-${String(to.params.stad || '').toLowerCase()}`,
  },
  {
    path: '/webdesign-belgie-:stad',
    redirect: (to) => `/webdesign-${String(to.params.stad || '').toLowerCase()}`,
  },
  {
    path: '/webdesign/:stad',
    redirect: (to) => `/webdesign-${String(to.params.stad || '').toLowerCase()}`,
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
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]
