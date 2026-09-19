// composables/useAnalytics.js
//
// Lightweight GA4 event helper for the lead funnel.
//
// - SSR-safe (no-ops when `window` is absent).
// - Consent-gated for free: `window.gtag` only exists after the visitor accepts
//   the `analytics` cookie category (see useCookieConsent.js → loadGoogleAnalytics).
//   Before consent it's undefined, so nothing is sent — GDPR-safe by construction.
// - GA4 is loaded IN CODE, never from Google Tag Manager. The GTM container must
//   NOT contain a GA4 tag for G-MDEMFNGVWJ or every hit is counted twice.
//   Each event is additionally mirrored into the dataLayer so GTM-side tags (Ads,
//   LinkedIn, pixels) can trigger on it. That mirror is a plain-object push, not a
//   gtag command, so gtag.js ignores it — it never reaches GA4.
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

  // GA4 — the single source of truth for analytics. `window.gtag` only exists
  // once the analytics category was accepted, so this stays consent-gated.
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', name, clean)
    } catch {
      /* never let analytics break a user flow */
    }
  }

  // GTM mirror — lets marketing tags fire on the same funnel events even when
  // only the marketing category was accepted. Consent Mode (defaults denied, set
  // in index.html) decides whether any tag actually fires, so pushing is safe.
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: name, ...clean })
  } catch {
    /* never let analytics break a user flow */
  }

  // LinkedIn conversion — no-op unless marketing consent loaded the Insight Tag
  // and this event has a conversion ID in useLinkedInInsight.js.
  trackLinkedInConversion(name)
}
