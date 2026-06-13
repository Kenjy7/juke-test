// @vitest-environment happy-dom
import { config, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The form renders <RouterLink> in its footer; stub it so we don't need a full
// router instance just to test form behaviour. The form↔success swap uses a
// <transition mode="out-in">; the default test-utils stub holds the leaving
// child for a tick, so stub it transparently to render the active branch now.
config.global.stubs = {
  RouterLink: { template: '<a><slot /></a>' },
  transition: { template: '<slot />' },
  Transition: { template: '<slot />' },
}

// The form uses vue-i18n (useI18n); install a real instance so t() resolves.
// Default locale is nl, so rendered text matches the Dutch the assertions expect.
import { createAppI18n } from '../src/i18n/index.js'
config.global.plugins = [createAppI18n()]

import emailjs from '@emailjs/browser'
import { trackEvent } from '@/composables/useAnalytics'
import ContactFormulier from '../src/components/ContactFormulier.vue'

// Mock the boundaries the form talks to, nothing in between:
//  - emailjs: the external send call (we assert on it, never hit the network)
//  - useAnalytics: so we can assert the conversion event fires correctly
//  - vue-router: useRoute, with a query we can vary per test
vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))
vi.mock('@/composables/useAnalytics', () => ({ trackEvent: vi.fn() }))

let mockRoute
vi.mock('vue-router', () => ({ useRoute: () => mockRoute }))

// One of the three real service options (the form dropped the old "webdesign"
// value in the revamp). 'saas' is what the conversion event/template should see.
const fillValidForm = async (wrapper) => {
  await wrapper.find('input[value="saas"]').setValue()
  await wrapper.find('#name').setValue('John')
  await wrapper.find('#lastname').setValue('Doe')
  await wrapper.find('#email').setValue('john@example.com')
}

describe('ContactFormulier', () => {
  beforeEach(() => {
    mockRoute = { query: {} }
    emailjs.send.mockReset()
    trackEvent.mockReset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends the email and shows the inline success state on a valid submit', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).toHaveBeenCalledTimes(1)
    const [, , templateParams] = emailjs.send.mock.calls[0]
    expect(templateParams).toMatchObject({ name: 'John', email: 'john@example.com', service: 'saas' })
    expect(wrapper.find('.form-sent').text()).toContain('Bericht verzonden!')
  })

  it('fires the lead_submitted conversion event with the chosen service (before reset clears it)', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(trackEvent).toHaveBeenCalledWith('lead_submitted', {
      source_form: 'contact',
      service: 'saas',
    })
  })

  it('clears the form fields after a successful send', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    // Success swaps the form out for the .form-sent panel; "send another"
    // brings the (already reset) form back so we can assert it's empty.
    await wrapper.find('.form-sent button').trigger('click')
    await flushPromises()

    expect(wrapper.find('#email').element.value).toBe('')
    expect(wrapper.find('#name').element.value).toBe('')
  })

  it('drops bot submissions: a filled honeypot fakes success and sends nothing', async () => {
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('input[tabindex="-1"]').setValue('http://spam.example') // bot fills hidden field
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(trackEvent).not.toHaveBeenCalled()
    expect(wrapper.find('.form-sent').text()).toContain('Bericht verzonden!') // looks normal to the bot
  })

  it('blocks submit and shows an inline error when no service is selected', async () => {
    const wrapper = mount(ContactFormulier)

    await wrapper.find('#name').setValue('John')
    await wrapper.find('#lastname').setValue('Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(wrapper.find('.field-error').text()).toContain('Kies waar je in geïnteresseerd bent.')
  })

  it('blocks submit and flags the missing name/email fields', async () => {
    const wrapper = mount(ContactFormulier)

    await wrapper.find('input[value="saas"]').setValue() // service only
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(wrapper.findAll('.field-error').length).toBeGreaterThan(0)
  })

  it('shows the inline error banner when sending fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // expected: component logs the caught error
    emailjs.send.mockRejectedValue(new Error('network down'))
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    // Failure keeps the form mounted and surfaces the inline banner (no modal).
    expect(wrapper.find('.form-sent').exists()).toBe(false)
    expect(wrapper.find('.form-banner').text()).toContain('Het verzenden is mislukt')
    expect(trackEvent).not.toHaveBeenCalled() // no conversion on failure
  })

  it('prefills subject and service from an ?interesse= query param', async () => {
    mockRoute = { query: { interesse: 'saas' } }
    const wrapper = mount(ContactFormulier)
    await flushPromises()

    expect(wrapper.find('#subject').element.value).toBe('Interesse in SaaS & apps')
    // The matching service radio is pre-selected.
    expect(wrapper.find('input[value="saas"]').element.checked).toBe(true)
  })
})
