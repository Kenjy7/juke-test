<template>
  <section ref="rootEl" id="faqlistai" class="faq-section">
    <div class="container">
      <div class="faq-header">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('faqListAI.head.label') }}</span>
        <h2>{{ t('faqListAI.head.title') }}</h2>
        <p>{{ t('faqListAI.head.lead') }}</p>
      </div>

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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FaqItem from './FaqItem.vue'

const { t } = useI18n()

defineProps({
  faqs: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const rootEl = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  const items = rootEl.value?.querySelectorAll('.faq-item') ?? []
  items.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="scss">
.faq-section {
  position: relative;
  padding-top: var(--section-pad-y);
  padding-bottom: var(--section-pad-y);
  overflow: hidden;
}

.container {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 var(--space-8);
  z-index: 1;
}

.faq-header {
  text-align: center;
  margin-bottom: var(--space-16);
  animation: fadeInUp var(--duration-reveal) var(--ease-out-expo);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }

.faq-header h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}

.faq-header p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  max-width: 58ch;
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-list {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Refine the cards to match the site — scoped to this FAQ via the section id,
   so the shared FaqItem stays unchanged on other pages. */
#faqlistai :deep(.faq-item) {
  border-radius: var(--radius-lg);
  box-shadow: none;
  padding: var(--space-5) var(--space-6);
}
#faqlistai :deep(.faq-item:hover) {
  transform: none;
  box-shadow: none;
  border-color: var(--color-border-hover);
}
#faqlistai :deep(.faq-question h3) {
  font-weight: var(--weight-semibold);
}
#faqlistai :deep(.toggle-button) {
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
}
#faqlistai :deep(.toggle-button:hover) {
  background: transparent;
}

@media (max-width: 768px) {
  .faq-section {
    padding: var(--section-pad-y) 0;
  }

  .faq-header {
    margin-bottom: var(--space-12);
  }
}
</style>
