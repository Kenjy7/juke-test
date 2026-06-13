import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { canonicalPaths, withLocales } from './src/router/indexable-paths.js'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    // Canonical pages in both locales. Source of truth lives in
    // src/router/indexable-paths.js (shared with main.js includedRoutes() and
    // the sitemap generator). main.js's exported includedRoutes() is
    // authoritative for vite-ssg; this mirror keeps the two from drifting.
    includedRoutes() {
      return withLocales(canonicalPaths)
    },
  },
})