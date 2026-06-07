<template>
  <section class="hero">
    <div class="hero-content">
      <div class="eyebrow reveal-on-load delay-0">
        <span class="eyebrow-dot"></span>
        AI &amp; digitalisering voor bedrijven
      </div>

      <h1 class="reveal-on-load delay-1">
        AI die je bedrijf
        <span class="highlight">echt vooruit helpt.</span>
      </h1>

      <p class="subtitle reveal-on-load delay-2">
        Van automatisering en digitalisering tot SaaS, app-ontwikkeling en webdesign —
        wij bouwen wat je bedrijf efficiënter, slimmer en sterker maakt.
      </p>

      <div class="hero-buttons reveal-on-load delay-3">
        <router-link to="/offerte-aanvraag" class="btn btn--accent btn--lg">
          Start je project
          <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>

        <router-link to="/ai-projecten" class="btn btn--secondary btn--lg">
          Bekijk onze diensten
        </router-link>
      </div>
    </div>

    <div class="hero-pillars reveal-on-load delay-4">
      <router-link
        v-for="pillar in pillars"
        :key="pillar.title"
        :to="pillar.to"
        class="pillar"
      >
        <span class="pillar__icon"><component :is="pillar.icon" :size="20" :stroke-width="1.5" /></span>
        <span class="pillar__title">{{ pillar.title }}</span>
        <span class="pillar__desc">{{ pillar.desc }}</span>
        <ArrowUpRight class="pillar__arrow" :size="16" :stroke-width="1.5" />
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { Cpu, Workflow, AppWindow, Globe, ArrowUpRight } from 'lucide-vue-next';

const pillars = [
  { title: 'AI & automatisering', desc: 'Agents en workflows die werk uit handen nemen.', icon: Cpu, to: '/ai-projecten' },
  { title: 'Digitalisering', desc: 'Processen digitaliseren en stroomlijnen.', icon: Workflow, to: '/ai-projecten' },
  { title: 'SaaS & apps', desc: 'Platformen en applicaties op maat.', icon: AppWindow, to: '/saas-development' },
  { title: 'Webdesign', desc: 'Snelle, conversiegerichte websites.', icon: Globe, to: '/webdesign' },
];

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal-on-load').forEach(el => {
      el.classList.add('visible');
    });
  });
});
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 92dvh;
  padding: var(--space-32) var(--space-8) var(--space-20);
  text-align: center;
}

.hero-content {
  position: relative;
  max-width: 800px;
  width: 100%;
  z-index: 1;
}

/* Quiet staggered reveal — fade + small lift, no blur */
.reveal-on-load {
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity var(--duration-reveal) var(--ease-smooth),
    transform var(--duration-reveal) var(--ease-smooth);

  &.visible { opacity: 1; transform: translateY(0); }
}
.delay-0 { transition-delay: 0ms; }
.delay-1 { transition-delay: 80ms; }
.delay-2 { transition-delay: 160ms; }
.delay-3 { transition-delay: 240ms; }
.delay-4 { transition-delay: 340ms; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-6);
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

h1 {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-6) 0;
}

.highlight { color: var(--color-accent); }

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0 auto var(--space-8);
  line-height: var(--leading-relaxed);
  max-width: 580px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Service bento — the four pillars */
.hero-pillars {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1040px;
  margin-top: var(--space-16);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  text-align: left;
}

.pillar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-base), transform var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-3px);
    .pillar__arrow { opacity: 1; transform: translate(2px, -2px); }
  }
}

.pillar__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  color: var(--color-accent);
  margin-bottom: var(--space-1);
}

.pillar__title {
  font-weight: var(--weight-semibold);
  font-size: var(--text-small);
  color: var(--color-text-primary);
}

.pillar__desc {
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.pillar__arrow {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  color: var(--color-text-tertiary);
  opacity: 0;
  transition: opacity var(--transition-base), transform var(--transition-base);
}

@media (max-width: 900px) {
  .hero-pillars { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: var(--space-24) var(--space-5) var(--space-16);
  }

  .subtitle { font-size: var(--text-body); }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    .btn { width: 100%; }
  }

  .hero-pillars { margin-top: var(--space-12); }
}

@media (max-width: 460px) {
  .hero-pillars { grid-template-columns: 1fr; }
}
</style>
