import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { stadSlugs } from './src/data/steden.js'
import { provincieSlugs } from './src/data/provincies.js'
import { blogPosts } from './src/data/blogs/index.js'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    includedRoutes(paths) {
      // ✅ Base routes
      const baseRoutes = [
        '/',
        '/webdesign',
        '/ai-projecten',
        '/saas-development',
        '/contact',
        '/cookies',
        '/offerte-aanvraag',
        '/locaties',
        '/website-die-klanten-oplevert',
        '/gratis-seo-scan',
        '/blog',
      ]

      // ✅ Province routes
      const provinceRoutes = provincieSlugs.map(slug => `/webdesign-${slug}`)

      // ✅ City routes
      const cityRoutes = stadSlugs.map(stad => `/webdesign-${stad}`)

      // ✅ Blog post routes (alleen gepubliceerde posts)
      const blogRoutes = blogPosts
        .filter(p => p.published)
        .map(p => `/blog/${p.slug}`)

      return [...baseRoutes, ...provinceRoutes, ...cityRoutes, ...blogRoutes]
    },
  },
})