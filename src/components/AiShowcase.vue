<template>
  <section class="showcase" ref="sectionRef">
    <div class="container">
      <!-- Editorial header: left-aligned, generous whitespace -->
      <header class="showcase-header reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          {{ t('aiShowcase.head.eyebrow') }}
        </span>
        <h2>{{ t('aiShowcase.head.titleLine1') }}<br />{{ t('aiShowcase.head.titleLine2') }}</h2>
        <p class="lead">{{ t('aiShowcase.head.lead') }}</p>
      </header>

      <!-- Featured full-width card: split layout -->
      <div class="showcase-featured reveal reveal-delay-1">
        <div class="featured-visual" aria-hidden="true">
          <div class="flow-diagram">
            <div class="flow-node">
              <div class="node-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span>{{ t('aiShowcase.flow.step1') }}</span>
            </div>
            <div class="flow-connector"></div>
            <div class="flow-node">
              <div class="node-icon node-icon--accent">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 0 1 1h1a4 4 0 0 1 0 8h-1a1 1 0 0 0-1 1v1a4 4 0 0 1-8 0v-1a1 1 0 0 0-1-1H6a4 4 0 0 1 0-8h1a1 1 0 0 0 1-1V6a4 4 0 0 1 4-4z"
                  />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <span>{{ t('aiShowcase.flow.step2') }}</span>
            </div>
            <div class="flow-connector"></div>
            <div class="flow-node">
              <div class="node-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <span>{{ t('aiShowcase.flow.step3') }}</span>
            </div>
          </div>
        </div>

        <div class="featured-body">
          <h3>{{ t('aiShowcase.featured.title') }}</h3>
          <p>{{ t('aiShowcase.featured.description') }}</p>
        </div>
      </div>

      <!-- Secondary cards: 3-column grid -->
      <div class="showcase-grid">
        <article class="feature-card reveal reveal-delay-2">
          <div class="feature-card__icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          </div>
          <h3>{{ t('aiShowcase.cards.content.title') }}</h3>
          <p>{{ t('aiShowcase.cards.content.description') }}</p>
        </article>

        <article class="feature-card reveal reveal-delay-3">
          <div class="feature-card__icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </div>
          <h3>{{ t('aiShowcase.cards.data.title') }}</h3>
          <p>{{ t('aiShowcase.cards.data.description') }}</p>
        </article>

        <article class="feature-card reveal reveal-delay-4">
          <div class="feature-card__icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M7 2v20" />
              <path d="M2 12h5" />
              <path d="M2 7h5" />
              <path d="M2 17h5" />
            </svg>
          </div>
          <h3>{{ t('aiShowcase.cards.workflow.title') }}</h3>
          <p>{{ t('aiShowcase.cards.workflow.description') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  )

  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.showcase {
  padding: var(--space-24) var(--space-8) var(--space-32);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Section head: left-aligned, editorial ── */
.showcase-header {
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

.lead {
  margin: var(--space-5) 0 0;
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 60ch;
}

/* ── Featured card: full-width split ── */
.showcase-featured {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-12);
  margin-bottom: var(--space-5);
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

/* Flow diagram */
.flow-diagram {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-8) var(--space-6);
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  flex: 1;

  span {
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
    text-align: center;
    font-weight: var(--weight-medium);
    line-height: var(--leading-normal);
  }
}

.node-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  min-height: 48px; /* tap target */
}

.node-icon--accent {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-border);
  color: var(--color-accent);
}

.flow-connector {
  flex: 0.4;
  height: 1px;
  background: var(--color-border);
  flex-shrink: 0;
}

/* Featured body */
.featured-body {
  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h2);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-5) 0;
    text-wrap: balance;
  }

  p {
    font-size: var(--text-body-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── Secondary cards: 3-column ── */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

.feature-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
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

.feature-card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-accent);
  margin-bottom: var(--space-6);
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
  }
}

.feature-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  letter-spacing: -0.01em;
}

.feature-card p {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .showcase-featured {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

@media (max-width: 900px) {
  .showcase-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
}

@media (max-width: 768px) {
  .showcase {
    padding: var(--space-16) var(--space-5) var(--space-20);
  }

  .showcase-featured {
    padding: var(--space-8);
  }

  .flow-diagram {
    padding: var(--space-5) var(--space-4);
  }

  .flow-node span {
    font-size: 0.65rem;
  }
  .node-icon {
    width: 40px;
    height: 40px;
    min-height: 40px;
  }
}
</style>
