<template>
  <section ref="rootEl" id="faqlistai" class="faq-section">
    <div class="container">
      <div class="faq-header">
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
}

.container {
  position: relative;
  max-width: 900px;
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
  margin: 0;
  text-wrap: balance;
}

.faq-header p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  max-width: 58ch;
  margin: var(--space-5) auto 0;
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
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
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
