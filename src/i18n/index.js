import { createI18n } from 'vue-i18n'
import nl from './locales/nl.js'
import en from './locales/en.js'
// Per-component namespaces extracted from the .vue files, composed by
// scripts/build-locales.mjs. Spread at top level alongside the hand-authored
// base (a11y/nav/cta/home/footer); namespaces are distinct so a shallow merge
// is correct.
import generated from './messages.generated.js'

// ── Locale strategy: prefix_except_default ───────────────────────────────────
// Default locale (nl) is served unprefixed (jukecoding.be/webdesign).
// English is served under a /en path prefix (jukecoding.be/en/webdesign).
// This is the most SEO-friendly layout: every locale gets its own indexable URL.
export const DEFAULT_LOCALE = 'nl'
export const SUPPORTED_LOCALES = ['nl', 'en']

// BCP-47 tags used for <html lang>, hreflang and og:locale. Belgium-specific.
export const LOCALE_META = {
  nl: { htmlLang: 'nl-BE', hreflang: 'nl-BE', ogLocale: 'nl_BE' },
  en: { htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US' },
}

// Factory, NOT a shared singleton. vite-ssg renders routes concurrently, each
// in its own app instance; a module-level i18n would let one route's locale
// bleed into another's render. Create a fresh instance per app.
export function createAppI18n() {
  return createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      nl: { ...nl, ...generated.nl },
      en: { ...en, ...generated.en },
    },
  })
}
