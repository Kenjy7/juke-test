// composables/useAnalytics.js
//
// Lightweight GA4 event helper for the lead funnel.
//
// - SSR-safe (no-ops when `window` is absent).
// - Consent-gated for free: `window.gtag` only exists after the visitor accepts
//   the `analytics` cookie category (see useCookieConsent.js → loadGoogleAnalytics).
//   Before consent it's undefined, so nothing is sent — GDPR-safe by construction.
// - Event names follow `noun_verb`, past tense, lowercase. Keep new events in
//   docs/analytics-events.md and reuse enumerable property values (no PII).
//
// NOTE: these are CLIENT-side events; ad-blockers / iOS ITP will drop a portion.
// For ad-blocker-resilient conversion counts, mirror these server-side via the
// GA4 Measurement Protocol (needs a GA4 API secret + a server hop) — see the doc.

import { trackLinkedInConversion } from './useLinkedInInsight'

export function trackEvent(name, props = {}) {
  if (typeof window === 'undefined') return

  const clean = {}
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== null && value !== '') clean[key] = value
  }

  // GA4 — `window.gtag` only exists
  // once the analytics category was accepted, so this stays consent-gated.
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', name, clean)
    } catch {
      /* never let analytics break a user flow */
    }
  }

  // LinkedIn conversion — no-op unless marketing consent loaded the Insight Tag
  // and this event has a conversion ID in useLinkedInInsight.js.
  trackLinkedInConversion(name)
}
