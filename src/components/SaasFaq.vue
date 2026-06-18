<template>
  <section ref="rootEl" id="saas-faq" class="faq-section">
    <div class="container">
      <header class="faq-header reveal">
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
      </header>

      <div class="faq-list">
        <FaqItem
          v-for="(item, index) in faqs"
          :key="index"
          :question="item.question"
          :answer="item.answer"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import FaqItem from './FaqItem.vue'

defineProps({
  faqs: { type: Array, required: true, default: () => [] },
})

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Veelgestelde vragen',
      title: 'Alles wat je wilt weten voor je start',
      lead: 'Van eigendom van de code tot timing en kosten: de vragen die klanten ons het vaakst stellen.',
    },
    en: {
      eyebrow: 'Frequently asked',
      title: 'Everything you want to know before you start',
      lead: 'From code ownership to timing and cost: the questions clients ask us most.',
    },
  },
})

const rootEl = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  rootEl.value?.querySelectorAll('.reveal, .faq-item').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => { if (observer) observer.disconnect() })
</script>

<style scoped lang="scss">
.faq-section { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: 900px; margin: 0 auto; }

.faq-header { text-align: center; margin-bottom: var(--space-16); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.faq-header h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance;
}
.lead { margin: var(--space-5) auto 0; max-width: 58ch; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

.faq-list { display: flex; flex-direction: column; gap: var(--space-4); }

@media (max-width: 768px) {
  .faq-section { padding: var(--section-pad-y) var(--space-5); }
  .faq-header { margin-bottom: var(--space-12); }
}
</style>
