<template>
  <section class="ai-split-section" ref="sectionRef">
    <div class="container">
      <div class="content reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          {{ t('aiSplitSection.eyebrow') }}
        </span>
        <h2>{{ t('aiSplitSection.title') }}</h2>
        <p class="description">
          {{ t('aiSplitSection.description') }}
        </p>
      </div>

      <div class="panel reveal reveal-delay-1">
        <ul class="panel__list">
          <li v-for="item in capabilities" :key="item">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.3337 4L6.00033 11.3333L2.66699 8"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref(null)

const capabilities = computed(() => [
  t('aiSplitSection.capabilities.customerService'),
  t('aiSplitSection.capabilities.internalTools'),
  t('aiSplitSection.capabilities.salesAutomation'),
  t('aiSplitSection.capabilities.workflowAutomation'),
  t('aiSplitSection.capabilities.marketingContent'),
  t('aiSplitSection.capabilities.integrations'),
  t('aiSplitSection.capabilities.dataAnalysis'),
  t('aiSplitSection.capabilities.customWorkflows'),
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
.ai-split-section {
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: var(--space-16);
  align-items: center;
}

/* ── Content ── */
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
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
  text-wrap: balance;
}

.description {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 46ch;
}

/* ── Capability panel ── */
.panel {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.panel__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4) var(--space-6);

  li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-small);
    color: var(--color-text-secondary);

    svg {
      flex-shrink: 0;
      color: var(--color-accent);
      width: 22px;
      height: 22px;
      padding: 3px;
      border-radius: var(--radius-sm);
      background: var(--color-primary-subtle);
    }
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
.reveal-delay-1 {
  transition-delay: 120ms;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 768px) {
  .ai-split-section {
    padding: var(--space-16) var(--space-5);
  }
  h2 {
    font-size: var(--text-h2);
  }
  .panel {
    padding: var(--space-6);
  }
  .panel__list {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}
</style>
