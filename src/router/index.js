import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { stripLocale } from '@/i18n/routing.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // terug/vooruit in browser: behoud scroll
    if (savedPosition) return savedPosition

    // Taalwissel (zelfde pagina, enkel de locale-prefix verandert): blijf staan
    if (stripLocale(to.path) === stripLocale(from.path)) return false

    // #hash links
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

    // gewone navigatie: naar boven
    return { top: 0, left: 0 }
  },
})

export default router
