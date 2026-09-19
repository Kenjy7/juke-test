// composables/useLinkedInInsight.js
//
// LinkedIn Insight Tag.
//
// - Consent-gated: loadLinkedInInsight() is only called from
//   useCookieConsent.js → loadMarketingScripts(), i.e. after the visitor accepts
//   the `marketing` cookie category. `window.lintrk` only exists after that, so
//   trackLinkedInConversion() is a no-op before consent — same pattern as GA4.
// - CSP-safe: the loader runs from the 'self' module bundle and injects an
//   external <script src> from snap.licdn.com. LinkedIn's hosts are allowed in
//   netlify.toml (script-src / connect-src).
// - Inert until configured: with an empty LINKEDIN_PARTNER_ID nothing loads and
//   nothing is sent. Fill in the Partner ID from Campaign Manager → Insight Tag.

// Public identifier (same status as the GA4 measurement ID), not a secret.
const LINKEDIN_PARTNER_ID = '9742490'

// Funnel event (see docs/analytics-events.md) → LinkedIn conversion ID.
// Create each conversion in Campaign Manager as "Insight Tag – event-specific".
// Leave a value empty to skip that event.
const LINKEDIN_CONVERSIONS = {
  lead_submitted: '',
  quote_requested: '',
}

export function loadLinkedInInsight() {
  if (typeof window === 'undefined' || !LINKEDIN_PARTNER_ID) return
  if (window.lintrk) return

  window._linkedin_partner_id = LINKEDIN_PARTNER_ID
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)

  // Queue stub from LinkedIn's official snippet: calls made before
  // insight.min.js finishes loading are replayed once it arrives.
  const lintrk = function (action, data) {
    lintrk.q.push([action, data])
  }
  lintrk.q = []
  window.lintrk = lintrk

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
  document.head.appendChild(script)
}

export function trackLinkedInConversion(eventName) {
  if (typeof window === 'undefined' || typeof window.lintrk !== 'function') return

  const conversionId = LINKEDIN_CONVERSIONS[eventName]
  if (!conversionId) return

  try {
    window.lintrk('track', { conversion_id: Number(conversionId) })
  } catch {
    /* never let analytics break a user flow */
  }
}
