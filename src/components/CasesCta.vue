<template>
  <section class="cases-section" ref="sectionRef">
    <div class="cases-shell">
      <div class="cases-panel band--dark reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          {{ t('casesCta.eyebrow') }}
        </span>
        <h2>
          {{ t('casesCta.head.title') }}
        </h2>
        <p class="lead">
          {{ t('casesCta.head.lead') }}
        </p>
        <div class="cases-actions">
          <router-link to="/contact" class="btn btn--accent btn--lg">
            <span>{{ t('casesCta.cta.discuss') }}</span>
            <svg
              class="btn__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
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
    { threshold: 0.15 },
  )

  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
/* ── Section wrapper ── */
.cases-section {
  padding: var(--section-pad-y) var(--space-8) var(--space-24);
}

.cases-shell {
  max-width: var(--max-width-cta);
  margin: 0 auto;
}

/* ── Dark editorial panel ── */
.cases-panel {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12);
  text-align: center;
  transition: border-color var(--transition-base);
}

/* ── Flat eyebrow — no pill ── */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-6);
}

.eyebrow__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

/* ── Large serif headline ── */
h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
  margin: 0 auto var(--space-5);
  max-width: 22ch;
}

/* ── Supporting line ── */
.lead {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 auto var(--space-12);
  max-width: 46ch;
  text-wrap: balance;
}

/* ── Action row ── */
.cases-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .cases-section {
    padding: var(--section-pad-y) var(--space-5) var(--space-16);
  }

  .cases-panel {
    padding: var(--space-12) var(--space-6);
  }

  h2 {
    font-size: var(--text-h2);
  }

  .cases-actions {
    flex-direction: column;

    .btn {
      width: 100%;
    }
  }
}
</style>
