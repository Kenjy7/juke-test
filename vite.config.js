import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
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
        '/website-die-klanten-oplevert',
        '/gratis-seo-scan',
        '/blog',
      ]

      // ✅ Blog post routes (alleen gepubliceerde posts)
      const blogRoutes = blogPosts
        .filter(p => p.published)
        .map(p => `/blog/${p.slug}`)

      return [...baseRoutes, ...blogRoutes]
    },
  },
})