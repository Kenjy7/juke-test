// @vitest-environment happy-dom
import { config, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The form renders <RouterLink> in its footer; stub it so we don't need a full
// router instance just to test form behaviour.
config.global.stubs = { RouterLink: { template: '<a><slot /></a>' } }

// The form now uses vue-i18n (useI18n); install a real instance so t() resolves.
// Default locale is nl, so rendered text matches the original Dutch the
// assertions expect.
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

const fillValidForm = async (wrapper) => {
  await wrapper.find('input[value="webdesign"]').setValue()
  await wrapper.find('#name').setValue('John')
  await wrapper.find('#lastname').setValue('Doe')
  await wrapper.find('#email').setValue('john@example.com')
}

describe('ContactFormulier', () => {
  beforeEach(() => {
    mockRoute = { query: {} }
    emailjs.send.mockReset()
    trackEvent.mockReset()
    // jsdom's alert is a "not implemented" stub — silence it so validation
    // failures don't throw, while letting us assert it was called.
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends the email and shows the success modal on a valid submit', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).toHaveBeenCalledTimes(1)
    const [, , templateParams] = emailjs.send.mock.calls[0]
    expect(templateParams).toMatchObject({ name: 'John', email: 'john@example.com', service: 'webdesign' })
    expect(wrapper.find('.modal-content').text()).toContain('Bericht verzonden!')
  })

  it('fires the lead_submitted conversion event with the chosen service (before reset clears it)', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(trackEvent).toHaveBeenCalledWith('lead_submitted', {
      source_form: 'contact',
      service: 'webdesign',
    })
  })

  it('resets the form after a successful send', async () => {
    emailjs.send.mockResolvedValue({ status: 200 })
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
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
    expect(wrapper.find('.modal-content').text()).toContain('Bericht verzonden!') // looks normal to the bot
  })

  it('blocks submit and warns when no service is selected', async () => {
    const wrapper = mount(ContactFormulier)

    await wrapper.find('#name').setValue('John')
    await wrapper.find('#lastname').setValue('Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(window.alert).toHaveBeenCalled()
    expect(emailjs.send).not.toHaveBeenCalled()
  })

  it('blocks submit and warns when name/email are missing', async () => {
    const wrapper = mount(ContactFormulier)

    await wrapper.find('input[value="webdesign"]').setValue() // service only
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(window.alert).toHaveBeenCalled()
    expect(emailjs.send).not.toHaveBeenCalled()
  })

  it('shows the error modal when sending fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // expected: component logs the caught error
    emailjs.send.mockRejectedValue(new Error('network down'))
    const wrapper = mount(ContactFormulier)

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    const modal = wrapper.find('.modal-content')
    expect(modal.classes()).toContain('error')
    expect(modal.text()).toContain('Oeps, er ging iets mis')
    expect(trackEvent).not.toHaveBeenCalled() // no conversion on failure
  })

  it('prefills subject and service from a ?pakket= query param', async () => {
    mockRoute = { query: { pakket: 'Juke Groove' } }
    const wrapper = mount(ContactFormulier)
    await flushPromises()

    expect(wrapper.text()).toContain('Juke Groove')
    expect(wrapper.find('#subject').element.value).toBe('Interesse in Juke Groove')
  })
})
