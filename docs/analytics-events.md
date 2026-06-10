# Analytics events

Single source of truth for tracked events. Add new events here **in the same PR**
that fires them. Fired via `trackEvent(name, props)` from
`src/composables/useAnalytics.js` (GA4, consent-gated — see
`src/composables/useCookieConsent.js`).

## Conventions

- **Name:** `noun_verb`, past tense, lowercase, snake_case. e.g. `lead_submitted`.
- **Properties:** enumerable values where possible; **no PII** (no name/email/phone).
- **Units in the property name:** `duration_ms`, `amount_cents`, `budget_band`.
- New event → add a row here + review in PR.

## Events

| Event | Fired when | Properties (enumerable) | File |
|---|---|---|---|
| `lead_submitted` | Contact form sent OK | `source_form: "contact"`, `service: "webdesign" \| "ai-automatisation" \| "onbekend"` | `ContactFormulier.vue` |
| `quote_requested` | Offerte form sent OK | `source_form: "offerte"`, `package: <slug> \| "geen"`, `budget_band: "" \| "500-1000" \| "1000-2500" \| "2500+" \| "niet_opgegeven"` | `OfferteFormulier.vue` |
| `package_selected` | "Kies <pakket>" clicked | `package: <tier name>`, `billing: "oneoff" \| "monthly"` | `PackagesSection.vue` |

**North Star:** leads (`lead_submitted` + `quote_requested`). `package_selected` is the
upstream funnel step.

## Known limitation / follow-up

These are **client-side** events — ad-blockers + iOS ITP drop ~20-40%. For
ad-blocker-resilient conversion counts, mirror `lead_submitted` / `quote_requested`
**server-side** via the GA4 Measurement Protocol. Needs:
1. A GA4 **API secret** (env var, e.g. `GA4_API_SECRET`).
2. A server hop — route the form submit through a Netlify function (currently the
   forms call EmailJS directly from the browser, so there is no server step yet),
   or serve gtag first-party from `analytics.jukecoding.be` (Netlify rewrite) to
   dodge blocklists.
3. Dedupe client vs. server with a shared `event_id`.
