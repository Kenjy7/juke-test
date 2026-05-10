<template>
  <section ref="rootEl" id="faqlistai" class="faq-section">
    <div class="container">
      <div class="faq-header">
        <span class="label">Veelgestelde vragen</span>
        <h2>AI simpel uitgelegd</h2>
        <p>Ontdek hoe AI-agents jouw bedrijf slimmer laten werken</p>
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
import FaqItem from './FaqItem.vue'

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
  padding-top: var(--space-24);
  padding-bottom: var(--space-24);
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

.label {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: var(--text-xs, 0.75rem);
  font-weight: 600;
  color: var(--color-text-tertiary);
  background: var(--color-bg-card-inner);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-full);
  letter-spacing: 0.08em;
  border: 1px solid var(--color-border);
  text-transform: uppercase;
  margin-bottom: var(--space-6);
}

.faq-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.faq-header p {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .faq-section {
    padding: var(--space-16) 0;
  }

  .faq-header {
    margin-bottom: var(--space-12);
  }
}
</style>
