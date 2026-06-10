<template>
  <section class="problem-section band--sunken" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <h2>
          {{ t('aiProblemSolver.head.title') }}
          <span class="accent">{{ t('aiProblemSolver.head.accent') }}</span>
        </h2>
        <p class="lead">
          {{ t('aiProblemSolver.head.lead') }}
        </p>
      </header>

      <ul class="problem-list">
        <li
          v-for="(item, i) in problems"
          :key="i"
          class="problem-tile reveal"
          :class="[`reveal-delay-${(i % 3) + 1}`]"
        >
          <span class="problem-tile__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6663 5L7.49967 14.1667L3.33301 10"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="problem-tile__text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref(null)

const problems = computed(() => [
  t('aiProblemSolver.problems.dataEntry'),
  t('aiProblemSolver.problems.reports'),
  t('aiProblemSolver.problems.teamCommunication'),
  t('aiProblemSolver.problems.documentReview'),
  t('aiProblemSolver.problems.simplifyProcesses'),
  t('aiProblemSolver.problems.overview'),
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
.problem-section {
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-head {
  max-width: 680px;
  margin: 0 auto var(--space-16);
  text-align: center;
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0;
  text-wrap: balance;
}

.accent {
  display: block;
  color: var(--color-accent);
}

.lead {
  margin: var(--space-5) auto 0;
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 56ch;
}

.problem-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.problem-tile {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  transition:
    border-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-3px);
    box-shadow: var(--shadow-elevated);
  }
}

.problem-tile__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.problem-tile__text {
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
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
  transition-delay: 60ms;
}
.reveal-delay-2 {
  transition-delay: 120ms;
}
.reveal-delay-3 {
  transition-delay: 180ms;
}

@media (max-width: 768px) {
  .problem-section {
    padding: var(--space-16) var(--space-5);
  }
  .problem-list {
    grid-template-columns: 1fr;
  }
}
</style>
