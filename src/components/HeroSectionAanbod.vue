<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <h1>
          {{ t('heroSectionAanbod.head.titleLead') }}
          <span class="highlight">{{ t('heroSectionAanbod.head.titleHighlight') }}</span>
        </h1>

        <p>
          {{ t('heroSectionAanbod.head.lead') }}
        </p>

        <div class="hero-buttons">
          <router-link to="/contact" class="btn btn--accent btn--lg">
            {{ t('heroSectionAanbod.buttons.start') }}
            <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
          <router-link to="/contact" class="btn btn--secondary btn--lg">
            {{ t('heroSectionAanbod.buttons.intro') }}
          </router-link>
        </div>

        <ul class="hero-checks">
          <li v-for="item in checks" :key="item">
            <CheckCircle2 :size="16" :stroke-width="1.8" /> {{ item }}
          </li>
        </ul>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="browser">
          <div class="browser__bar">
            <span class="d"></span><span class="d"></span><span class="d"></span>
            <div class="browser__url">jouwbedrijf.be</div>
          </div>
          <div class="browser__view">
            <div class="site-nav">
              <span class="site-logo"></span>
              <span class="site-links"><i></i><i></i><i></i></span>
              <span class="site-cta"></span>
            </div>
            <div class="site-hero">
              <span class="l l--xl"></span>
              <span class="l l--lg"></span>
              <span class="l l--md"></span>
              <span class="site-btn"></span>
            </div>
            <div class="site-cards">
              <span class="site-card"></span>
              <span class="site-card"></span>
              <span class="site-card"></span>
            </div>
          </div>
        </div>
        <div class="score-badge">
          <span class="score-badge__num">98</span>
          <span class="score-badge__label">PageSpeed</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircle2 } from 'lucide-vue-next'

const { t } = useI18n()

const checks = computed(() => [
  t('heroSectionAanbod.checks.live'),
  t('heroSectionAanbod.checks.mobile'),
  t('heroSectionAanbod.checks.seo'),
])
</script>

<style scoped lang="scss">
.hero {
  padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: var(--space-16);
  align-items: center;
  width: 100%;
}

.hero-copy {
  animation: fade-up 0.7s var(--ease-out-expo) both;
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.eyebrow {
  margin-bottom: var(--space-5);
}

h1 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
}
.highlight {
  color: var(--color-accent);
}

p {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-8);
  max-width: 52ch;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.hero-checks {
  list-style: none;
  margin: var(--space-8) 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);

  li {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    svg {
      color: var(--color-accent);
    }
  }
}

/* ── Browser visual ── */
.hero-visual {
  position: relative;
  animation: fade-up 0.7s var(--ease-out-expo) 0.12s both;
}

.browser {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
}
.browser__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
}
.d {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-border-hover);
}
.browser__url {
  margin-left: var(--space-2);
  flex: 1;
  max-width: 180px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  font-size: 10px;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  padding-inline: var(--space-3);
}
.browser__view {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.site-logo {
  width: 34px;
  height: 14px;
  border-radius: var(--radius-sm);
  background: var(--color-text-primary);
}
.site-links {
  display: flex;
  gap: var(--space-2);
  flex: 1;
  i {
    width: 26px;
    height: 7px;
    border-radius: var(--radius-full);
    background: var(--color-border);
  }
}
.site-cta {
  width: 54px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
}

.site-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-4) 0;
}
.l {
  border-radius: var(--radius-full);
  background: var(--color-border-hover);
}
.l--xl {
  width: 78%;
  height: 18px;
  background: var(--color-text-primary);
}
.l--lg {
  width: 60%;
  height: 12px;
}
.l--md {
  width: 45%;
  height: 12px;
}
.site-btn {
  margin-top: var(--space-2);
  width: 96px;
  height: 30px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}

.site-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}
.site-card {
  height: 56px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
}

.score-badge {
  position: absolute;
  bottom: -18px;
  left: -18px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
  padding: var(--space-3) var(--space-4);
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.score-badge__num {
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  color: var(--color-success);
  letter-spacing: var(--tracking-tight);
}
.score-badge__label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-tertiary);
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .hero-visual {
    max-width: 480px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
  }
  h1 {
    font-size: var(--text-h2);
  }
  p {
    font-size: var(--text-body);
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    .btn {
      width: 100%;
    }
  }
}
</style>
