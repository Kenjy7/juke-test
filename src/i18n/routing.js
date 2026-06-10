import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './index.js'

// Pure helpers shared by the router guard, the global LocaleLink and the
// language switcher. No Vue/router imports here so they work in SSR, guards
// and components alike.

const PREFIXED = SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE)

/** Read the locale a given path belongs to (default locale for unprefixed). */
export function localeFromPath(path) {
  const seg = path.split('/')[1] // '' for '/', 'en' for '/en/...'
  return PREFIXED.includes(seg) ? seg : DEFAULT_LOCALE
}

/** Strip any locale prefix → the canonical default-locale path ('/en/x' → '/x'). */
export function stripLocale(path) {
  const loc = localeFromPath(path)
  if (loc === DEFAULT_LOCALE) return path || '/'
  const rest = path.slice(`/${loc}`.length)
  return rest === '' ? '/' : rest
}

/** Add the prefix for `locale` to a canonical (unprefixed) path. */
export function withLocale(path, locale) {
  const canonical = stripLocale(path)
  if (locale === DEFAULT_LOCALE) return canonical
  return canonical === '/' ? `/${locale}` : `/${locale}${canonical}`
}

/**
 * Localize a router `to` (string or location object) for the target locale.
 * Only touches internal, absolute paths — hashes, mailto:, http(s) and
 * relative links are returned untouched.
 */
export function localizeTo(to, locale) {
  if (typeof to === 'string') {
    if (!to.startsWith('/')) return to
    return withLocale(to, locale)
  }
  if (to && typeof to === 'object' && typeof to.path === 'string' && to.path.startsWith('/')) {
    return { ...to, path: withLocale(to.path, locale) }
  }
  return to
}
