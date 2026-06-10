<template>
  <section class="ai-grid-section" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          {{ t('aiFeaturedrid.head.eyebrow') }}
        </span>
        <h2>
          {{ t('aiFeaturedrid.head.titleLine1') }}<br />{{ t('aiFeaturedrid.head.titleLine2') }}
        </h2>
      </header>

      <div class="grid">
        <AiFeatureCard
          v-for="(item, i) in features"
          :key="i"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :highlights="item.highlights"
          class="reveal"
          :class="[`reveal-delay-${i + 1}`]"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bot, BrainCircuit, Rocket } from 'lucide-vue-next'
import AiFeatureCard from '@/components/AiFeatureCard.vue'

const { t } = useI18n()

const sectionRef = ref(null)

const features = computed(() => [
  {
    title: t('aiFeaturedrid.cards.workflows.title'),
    description: t('aiFeaturedrid.cards.workflows.description'),
    icon: Bot,
    highlights: [
      t('aiFeaturedrid.cards.workflows.highlights.0'),
      t('aiFeaturedrid.cards.workflows.highlights.1'),
      t('aiFeaturedrid.cards.workflows.highlights.2'),
    ],
  },
  {
    title: t('aiFeaturedrid.cards.insight.title'),
    description: t('aiFeaturedrid.cards.insight.description'),
    icon: BrainCircuit,
    highlights: [
      t('aiFeaturedrid.cards.insight.highlights.0'),
      t('aiFeaturedrid.cards.insight.highlights.1'),
      t('aiFeaturedrid.cards.insight.highlights.2'),
    ],
  },
  {
    title: t('aiFeaturedrid.cards.growth.title'),
    description: t('aiFeaturedrid.cards.growth.description'),
    icon: Rocket,
    highlights: [
      t('aiFeaturedrid.cards.growth.highlights.0'),
      t('aiFeaturedrid.cards.growth.highlights.1'),
      t('aiFeaturedrid.cards.growth.highlights.2'),
    ],
  },
])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )

  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.ai-grid-section {
  padding: var(--space-16) var(--space-8) var(--space-24);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-head {
  max-width: 760px;
  margin-bottom: var(--space-16);
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

.eyebrow__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0;
  text-wrap: balance;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity var(--duration-reveal) var(--ease-out-expo),
    transform var(--duration-reveal) var(--ease-out-expo);
  &.visible {
    opacity: 1;
    transform: none;
  }
}
.reveal-delay-1 {
  transition-delay: 80ms;
}
.reveal-delay-2 {
  transition-delay: 160ms;
}
.reveal-delay-3 {
  transition-delay: 240ms;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .ai-grid-section {
    padding: var(--space-12) var(--space-5) var(--space-16);
  }
}
</style>
