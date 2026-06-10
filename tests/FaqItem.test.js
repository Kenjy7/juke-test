// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import FaqItem from '../src/components/FaqItem.vue'

const mountItem = () =>
  mount(FaqItem, { props: { question: 'Wat kost een website?', answer: 'Dat hangt ervan af.' } })

describe('FaqItem', () => {
  it('renders the question and hides the answer until opened', () => {
    const wrapper = mountItem()
    expect(wrapper.find('h3').text()).toBe('Wat kost een website?')
    expect(wrapper.find('.faq-answer').exists()).toBe(false)
  })

  it('reveals the answer on click', async () => {
    const wrapper = mountItem()
    await wrapper.find('.faq-item').trigger('click')

    expect(wrapper.find('.faq-answer').exists()).toBe(true)
    expect(wrapper.find('.faq-answer p').text()).toBe('Dat hangt ervan af.')
    expect(wrapper.find('.faq-item').classes()).toContain('open')
  })

  it('toggles back closed on a second click', async () => {
    const wrapper = mountItem()
    const item = wrapper.find('.faq-item')

    await item.trigger('click')
    await item.trigger('click')

    expect(wrapper.find('.faq-answer').exists()).toBe(false)
    expect(item.classes()).not.toContain('open')
  })
})
