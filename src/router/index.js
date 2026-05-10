import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // terug/vooruit in browser: behoud scroll
    if (savedPosition) return savedPosition

    // #hash links
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

    // gewone navigatie: naar boven
    return { top: 0, left: 0 }
  },
})

export default router
