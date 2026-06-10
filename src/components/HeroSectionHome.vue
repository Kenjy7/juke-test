<template>
  <section class="hero">
    <div class="container hero-top">
      <div class="eyebrow reveal-on-load delay-0">
        <span class="eyebrow__dot"></span>
        {{ t('home.hero.eyebrow') }}
      </div>

      <h1 class="reveal-on-load delay-1">
        {{ t('home.hero.titleLead') }}
        <span class="highlight">{{ t('home.hero.titleHighlight') }}</span>
      </h1>

      <p class="subtitle reveal-on-load delay-2">
        {{ t('home.hero.subtitle') }}
      </p>

      <div class="hero-buttons reveal-on-load delay-3">
        <router-link to="/offerte-aanvraag" class="btn btn--accent btn--lg">
          {{ t('cta.startProject') }}
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
        <router-link to="/ai-projecten" class="btn btn--secondary btn--lg">
          {{ t('home.hero.ctaSecondary') }}
        </router-link>
      </div>
    </div>

    <!-- Product window mockup -->
    <div class="showcase reveal-on-load delay-4">
      <div class="window" aria-hidden="true">
        <div class="window__bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <div class="window__url">app.jukecoding.be</div>
        </div>
        <div class="window__body">
          <aside class="app-side">
            <div class="app-logo"></div>
            <span class="side-item is-active"></span>
            <span class="side-item"></span>
            <span class="side-item"></span>
            <span class="side-item"></span>
          </aside>
          <div class="app-main">
            <div class="app-head">
              <span class="app-title"></span>
              <span class="app-pill"></span>
            </div>
            <div class="kpis">
              <div class="kpi" v-for="(k, i) in kpis" :key="i">
                <span class="kpi__label">{{ k.label }}</span>
                <span class="kpi__value">{{ k.value }}</span>
                <span class="kpi__trend" :class="{ down: k.down }">{{ k.trend }}</span>
              </div>
            </div>
            <div class="chart">
              <div class="bar" v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="showcase__glow"></div>
    </div>

    <!-- Capability strip -->
    <div class="caps reveal-on-load delay-4">
      <router-link v-for="cap in caps" :key="cap.title" :to="cap.to" class="cap">
        <component :is="cap.icon" :size="18" :stroke-width="1.6" class="cap__icon" />
        <span class="cap__title">{{ cap.title }}</span>
        <ArrowUpRight class="cap__arrow" :size="14" :stroke-width="1.6" />
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Cpu, AppWindow, Workflow, Globe, ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()

// Locale-reactive: labels/titles come from i18n, the mock figures stay as data.
const kpis = computed(() => [
  { label: t('home.hero.kpis.users'), value: '2.480', trend: '+18%' },
  { label: t('home.hero.kpis.processed'), value: '14.2k', trend: '+9%' },
  { label: t('home.hero.kpis.saved'), value: '63%', trend: '+12%' },
])
const bars = [38, 52, 44, 67, 58, 79, 71, 88, 82, 96]

const caps = computed(() => [
  { title: t('home.hero.caps.ai'), icon: Cpu, to: '/ai-projecten' },
  { title: t('home.hero.caps.saas'), icon: AppWindow, to: '/saas-development' },
  { title: t('home.hero.caps.digital'), icon: Workflow, to: '/ai-projecten' },
  { title: t('home.hero.caps.web'), icon: Globe, to: '/webdesign' },
])

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal-on-load').forEach((el) => el.classList.add('visible'))
  })
})
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  padding: calc(var(--space-32) + 2rem) 0 var(--space-20);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-top {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Reveal */
.reveal-on-load {
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity var(--duration-reveal) var(--ease-smooth),
    transform var(--duration-reveal) var(--ease-smooth);
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
.delay-0 {
  transition-delay: 0ms;
}
.delay-1 {
  transition-delay: 80ms;
}
.delay-2 {
  transition-delay: 160ms;
}
.delay-3 {
  transition-delay: 240ms;
}
.delay-4 {
  transition-delay: 360ms;
}

.eyebrow {
  margin-bottom: var(--space-6);
}

h1 {
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
  max-width: 16ch;
}
.highlight {
  color: var(--color-accent);
}

.subtitle {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-8);
  max-width: 60ch;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Product window ── */
.showcase {
  position: relative;
  width: 100%;
  max-width: 1080px;
  margin: var(--space-20) auto 0;
  padding-inline: var(--space-8);
}
.showcase__glow {
  position: absolute;
  inset: 10% 20% auto;
  height: 60%;
  background: var(--color-primary-glow);
  filter: blur(80px);
  opacity: 0.5;
  z-index: -1;
}

.window {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
  overflow: hidden;
}
.window__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-sunken);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border-hover);
}
.window__url {
  margin-left: var(--space-3);
  flex: 1;
  max-width: 240px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  font-size: 11px;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  padding-inline: var(--space-3);
}
.window__body {
  display: grid;
  grid-template-columns: 64px 1fr;
  min-height: 320px;
}

.app-side {
  border-right: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  background: var(--color-bg-elevated);
}
.app-logo {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  margin-bottom: var(--space-2);
}
.side-item {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-border);
}
.side-item.is-active {
  background: var(--color-primary-border);
}

.app-main {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.app-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-title {
  width: 160px;
  height: 14px;
  border-radius: var(--radius-full);
  background: var(--color-border-hover);
}
.app-pill {
  width: 80px;
  height: 26px;
  border-radius: var(--radius-full);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.kpi {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: var(--color-bg-elevated);
  text-align: left;
}
.kpi__label {
  font-size: 11px;
  color: var(--color-text-tertiary);
}
.kpi__value {
  font-size: 1.35rem;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}
.kpi__trend {
  font-size: 11px;
  font-weight: var(--weight-semibold);
  color: var(--color-success);
}
.kpi__trend.down {
  color: var(--color-error);
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  height: 96px;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
}
.bar {
  flex: 1;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-primary);
  opacity: 0.85;
}
.bar:nth-child(odd) {
  opacity: 0.55;
}

/* ── Capability strip ── */
.caps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  width: 100%;
  max-width: 1080px;
  margin: var(--space-16) auto 0;
  padding-inline: var(--space-8);
}
.cap {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-2px);
    .cap__arrow {
      opacity: 1;
      transform: translate(1px, -1px);
    }
  }
}
.cap__icon {
  color: var(--color-accent);
  flex-shrink: 0;
}
.cap__title {
  flex: 1;
}
.cap__arrow {
  color: var(--color-text-tertiary);
  opacity: 0;
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

@media (max-width: 900px) {
  .caps {
    grid-template-columns: repeat(2, 1fr);
  }
  .window__body {
    grid-template-columns: 1fr;
  }
  .app-side {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-32) 0 var(--space-12);
  }
  .subtitle {
    font-size: var(--text-body);
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    .btn {
      width: 100%;
    }
  }
  .showcase {
    margin-top: var(--space-12);
    padding-inline: var(--space-5);
  }
  .kpis {
    grid-template-columns: 1fr;
  }
  .caps {
    margin-top: var(--space-12);
    padding-inline: var(--space-5);
  }
}

@media (max-width: 460px) {
  .caps {
    grid-template-columns: 1fr;
  }
}
</style>
