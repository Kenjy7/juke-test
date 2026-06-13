<template>
  <section class="process" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          {{ t('aiProcess.head.eyebrow') }}
        </span>
        <h2>{{ t('aiProcess.head.titleLine1') }}<br />{{ t('aiProcess.head.titleLine2') }}</h2>
      </header>

      <ol class="timeline" :aria-label="t('aiProcess.timelineLabel')">
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="step-card reveal"
          :class="[`reveal-delay-${i + 1}`]"
        >
          <span class="step-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="step-body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
          <!-- connector line between steps (hidden on last) -->
          <span class="step-connector" aria-hidden="true"></span>
        </li>
      </ol>

      <div class="process-cta reveal">
        <router-link to="/contact" class="btn btn--accent">
          <span>{{ t('aiProcess.cta.label') }}</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref(null)

const steps = computed(() => [
  { title: t('aiProcess.steps.analyse.title'), desc: t('aiProcess.steps.analyse.desc') },
  { title: t('aiProcess.steps.ontwerp.title'), desc: t('aiProcess.steps.ontwerp.desc') },
  { title: t('aiProcess.steps.bouw.title'), desc: t('aiProcess.steps.bouw.desc') },
  { title: t('aiProcess.steps.integratie.title'), desc: t('aiProcess.steps.integratie.desc') },
  {
    title: t('aiProcess.steps.optimalisatie.title'),
    desc: t('aiProcess.steps.optimalisatie.desc'),
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
/* ── Section shell ── */
.process {
  padding: var(--section-pad-y) var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Editorial section head (matches ServiceSection pattern) ── */
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
  flex-shrink: 0;
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

/* ── Process timeline ── */
.timeline {
  list-style: none;
  margin: 0 0 var(--space-16);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-5);
  position: relative;
}

.step-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6) var(--space-6);
  transition:
    border-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);

    .step-index {
      color: var(--color-accent);
    }
  }

  /* Hide connector on last child */
  &:last-child .step-connector {
    display: none;
  }
}

/* Large editorial step number */
.step-index {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: var(--weight-semibold);
  color: var(--color-text-tertiary);
  line-height: 1;
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-5);
  transition: color var(--transition-base);
}

.step-body {
  flex: 1;
}

h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
}

p {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* Hairline connector — sits at the top-right edge, links to next card */
.step-connector {
  position: absolute;
  top: calc(var(--space-8) + 1.4rem); /* vertically aligns with step-index midline */
  right: calc(-1 * var(--space-5) / 2 - 0.5px);
  width: var(--space-5);
  height: 1px;
  background: var(--color-border);
  pointer-events: none;
  z-index: 1;
}

/* ── CTA ── */
.process-cta {
  display: flex;
  justify-content: flex-start;
}

/* ── Reveal animation (coordinated with IntersectionObserver) ── */
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

@for $i from 1 through 6 {
  .reveal-delay-#{$i} {
    transition-delay: #{$i * 80}ms;
  }
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .timeline {
    grid-template-columns: repeat(3, 1fr);
  }
  /* hide connectors that cross row boundaries */
  .step-card:nth-child(3) .step-connector,
  .step-card:last-child .step-connector {
    display: none;
  }
}

@media (max-width: 768px) {
  .process {
    padding: var(--section-pad-y) var(--space-5);
  }

  .timeline {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  /* hide all connectors in 2-col layout */
  .step-connector {
    display: none;
  }

  .step-index {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .timeline {
    grid-template-columns: 1fr;
  }
}
</style>
