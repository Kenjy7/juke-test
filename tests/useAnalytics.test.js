import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { trackEvent } from '../src/composables/useAnalytics.js'

// trackEvent is consent-gated by construction: it only fires when
// `window.gtag` exists (which only happens after the visitor accepts the
// analytics cookie). These tests pin that contract plus the prop-cleaning.

describe('trackEvent', () => {
  afterEach(() => {
    delete globalThis.window
  })

  it('no-ops when window is undefined (SSR) without throwing', () => {
    // No window at all -> must be a safe no-op during server-side render.
    expect(() => trackEvent('cta_clicked')).not.toThrow()
  })

  it('no-ops when gtag is absent (consent not yet given)', () => {
    globalThis.window = {} // window exists, but no gtag => before consent
    expect(() => trackEvent('cta_clicked', { label: 'hero' })).not.toThrow()
  })

  it('forwards the event name and props to gtag', () => {
    const gtag = vi.fn()
    globalThis.window = { gtag }

    trackEvent('lead_submitted', { form: 'offerte' })

    expect(gtag).toHaveBeenCalledWith('event', 'lead_submitted', { form: 'offerte' })
  })

  it('drops undefined, null and empty-string props (no PII leakage of blanks)', () => {
    const gtag = vi.fn()
    globalThis.window = { gtag }

    trackEvent('lead_submitted', {
      form: 'offerte',
      plan: undefined,
      ref: null,
      note: '',
      step: 2,
    })

    expect(gtag).toHaveBeenCalledWith('event', 'lead_submitted', { form: 'offerte', step: 2 })
  })

  it('keeps falsy-but-meaningful values like 0 and false', () => {
    const gtag = vi.fn()
    globalThis.window = { gtag }

    trackEvent('scroll_depth', { percent: 0, milestone: false })

    expect(gtag).toHaveBeenCalledWith('event', 'scroll_depth', { percent: 0, milestone: false })
  })

  it('sends an empty props object when called with no props', () => {
    const gtag = vi.fn()
    globalThis.window = { gtag }

    trackEvent('page_viewed')

    expect(gtag).toHaveBeenCalledWith('event', 'page_viewed', {})
  })

  it('never lets a throwing gtag break the caller flow', () => {
    const gtag = vi.fn(() => {
      throw new Error('gtag blew up')
    })
    globalThis.window = { gtag }

    expect(() => trackEvent('cta_clicked')).not.toThrow()
  })
})
