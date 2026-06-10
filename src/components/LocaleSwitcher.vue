<!--
  NL / EN language switcher — a quiet segmented control sized to sit next to the
  nav links without competing with the primary CTA.

  • Renders real <RouterLink>s (not LocaleLink) so it can point at explicit
    per-locale URLs without being re-prefixed, and so each language is a real,
    crawlable href that reinforces the hreflang pair and works without JS.
  • Each option targets the *same page* in the other locale (current path with
    the locale prefix swapped), preserving hash + query.
  • The chosen locale is remembered in localStorage for future visits.
-->
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink as RouterLinkImpl } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/i18n/index.js'
import { withLocale } from '@/i18n/routing.js'

const route = useRoute()
const { t, locale } = useI18n()

const options = computed(() =>
  SUPPORTED_LOCALES.map((code) => ({
    code,
    short: t(`locale.${code}Short`),
    name: t(`locale.${code}`),
    active: locale.value === code,
    to: { path: withLocale(route.path, code), hash: route.hash, query: route.query },
  })),
)

function remember(code) {
  try {
    localStorage.setItem('locale', code)
  } catch {
    /* storage may be unavailable (private mode) — non-critical */
  }
}
</script>

<template>
  <nav class="locale-switcher" :aria-label="t('locale.nl') + ' / ' + t('locale.en')">
    <RouterLinkImpl
      v-for="opt in options"
      :key="opt.code"
      :to="opt.to"
      class="locale-opt"
      :class="{ active: opt.active }"
      :hreflang="opt.code"
      :aria-current="opt.active ? 'true' : undefined"
      :aria-label="t('a11y.switchLanguage', { lang: opt.name })"
      @click="remember(opt.code)"
    >
      {{ opt.short }}
    </RouterLinkImpl>
  </nav>
</template>

<style scoped lang="scss">
.locale-switcher {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: transparent;
}

.locale-opt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 1.75rem;
  padding-block: 0.2rem;
  padding-inline: 0.5rem;
  font-size: 0.6875rem;
  font-weight: var(--weight-medium);
  letter-spacing: 0.04em;
  line-height: 1;
  color: var(--color-text-tertiary);
  text-decoration: none;
  border-radius: var(--radius-full);
  transition:
    color var(--transition-fast),
    background var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
  }

  &.active {
    color: var(--color-primary);
    background: var(--color-primary-subtle);
    cursor: default;
  }
}
</style>
