<template>
  <section class="ai-growth-section band--sunken" ref="sectionRef">
    <div class="container reveal">
      <span class="eyebrow">
        <span class="eyebrow__dot"></span>
        {{ t('aiPlatformComponent.eyebrow') }}
      </span>
      <h2 class="headline">
        {{ t('aiPlatformComponent.headline.lead') }}
        <span class="accent">{{ t('aiPlatformComponent.headline.accent') }}</span>
      </h2>
      <p class="lead">
        {{ t('aiPlatformComponent.lead') }}
      </p>

      <div class="industries">
        <h3 class="industries-title">{{ t('aiPlatformComponent.industriesTitle') }}</h3>
        <div class="industry-tags">
          <span class="tag-item" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref(null)

const tags = computed(() => [
  t('aiPlatformComponent.tags.startups'),
  t('aiPlatformComponent.tags.productMarketing'),
  t('aiPlatformComponent.tags.agencies'),
  t('aiPlatformComponent.tags.customerService'),
  t('aiPlatformComponent.tags.logistics'),
  t('aiPlatformComponent.tags.sales'),
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
.ai-growth-section {
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.headline {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
  max-width: 18ch;
  text-wrap: balance;
}
.accent {
  color: var(--color-accent);
}

.lead {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-10);
  max-width: 58ch;
}

.industries-title {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin: 0 0 var(--space-5);
}

.industry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: center;
  max-width: 640px;
}

.tag-item {
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  font-weight: var(--weight-medium);
  transition:
    border-color var(--transition-base),
    color var(--transition-base),
    transform var(--transition-base);

  &:hover {
    border-color: var(--color-primary-border);
    color: var(--color-text-primary);
    transform: translateY(-2px);
  }
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

@media (max-width: 768px) {
  .ai-growth-section {
    padding: var(--space-16) var(--space-5);
  }
  .headline {
    font-size: var(--text-h2);
  }
}
</style>
