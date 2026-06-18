<template>
  <section class="value" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <h2>
          {{ t('aiFeaturedrid.head.titleLine1') }}
          <span class="accent">{{ t('aiFeaturedrid.head.titleLine2') }}</span>
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

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.value { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.section-head { max-width: 680px; margin: 0 auto var(--space-12); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: var(--space-4);
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.section-head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0; text-wrap: balance;
}
.accent { display: block; color: var(--color-accent); }
.lead { margin: var(--space-5) auto 0; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); max-width: 56ch; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }

/* tighten the cards to keep the page compact (scoped to this section) */
:deep(.card) { padding: var(--space-6); }
:deep(.card__icon) { margin-bottom: var(--space-4); }
:deep(.card__list) { margin-top: var(--space-5); padding-top: var(--space-4); gap: var(--space-2); }

.reveal { opacity: 0; transform: translateY(18px); transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo); &.visible { opacity: 1; transform: none; } }
.reveal-delay-1 { transition-delay: 80ms; }
.reveal-delay-2 { transition-delay: 160ms; }
.reveal-delay-3 { transition-delay: 240ms; }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .value { padding: var(--section-pad-y) var(--space-5); }
}
</style>
