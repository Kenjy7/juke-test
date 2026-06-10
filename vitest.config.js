import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Standalone config for the test runner so we don't pull in the vite dev-tools
// plugin (or the SSG hooks) during unit tests. The vue plugin is needed to
// compile the .vue SFCs exercised by component tests. Pure-logic suites run in
// the default `node` environment; component suites opt into jsdom via a
// `// @vitest-environment jsdom` docblock at the top of the file.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.{js,mjs}'],
    clearMocks: true,
  },
})
