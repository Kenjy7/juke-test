<template>
  <section class="services band--sunken" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <span class="eyebrow">
          <span class="eyebrow__dot"></span>
          Wat we bouwen
        </span>
        <h2>Van AI-agents tot complete platformen.</h2>
        <p class="lead">
          Eén partner voor je hele digitale traject — van slimme automatisering
          tot software en web, telkens op maat van je bedrijf.
        </p>
      </header>

      <div class="cards-grid">
        <article
          class="feature-card reveal"
          v-for="(service, index) in services"
          :key="index"
          :class="[`reveal-delay-${index + 1}`]"
        >
          <div class="feature-card__icon">
            <component :is="service.icon" />
          </div>

          <h3>{{ service.title }}</h3>

          <ul class="feature-card__list">
            <li v-for="(point, i) in service.points" :key="i">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ point }}
            </li>
          </ul>

          <router-link :to="service.linkUrl" class="card-link">
            <span>{{ service.linkText }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, ref, onMounted } from 'vue';

const sectionRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

const AiIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [
  h('path', { d: 'M12 2a4 4 0 0 1 4 4v1a1 1 0 0 0 1 1h1a4 4 0 0 1 0 8h-1a1 1 0 0 0-1 1v1a4 4 0 0 1-8 0v-1a1 1 0 0 0-1-1H6a4 4 0 0 1 0-8h1a1 1 0 0 0 1-1V6a4 4 0 0 1 4-4z' }),
  h('circle', { cx: '12', cy: '12', r: '2' })
]);

const SaasIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [
  h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }),
  h('path', { d: 'M3 9h18' }),
  h('path', { d: 'M9 21V9' })
]);

const WebIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [
  h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }),
  h('path', { d: 'M8 21h8' }),
  h('path', { d: 'M12 17v4' }),
  h('path', { d: 'M7 8l3 3-3 3' }),
  h('path', { d: 'M13 14h4' })
]);

const services = [
  {
    icon: AiIcon,
    title: "AI-oplossingen op maat",
    points: [
      "AI-agents voor sales, support & opvolging",
      "Chatbots voor 24/7 klantenservice",
      "Slimme workflows & automatisering",
      "API-koppelingen & integraties"
    ],
    linkText: "Meer over AI",
    linkUrl: "/ai-projecten"
  },
  {
    icon: SaasIcon,
    title: "SaaS-platformen bouwen",
    points: [
      "Custom dashboards & portalen",
      "Gebruikersbeheer & authenticatie",
      "Schaalbare architectuur",
      "Van concept tot live product"
    ],
    linkText: "Meer over SaaS",
    linkUrl: "/saas-development"
  },
  {
    icon: WebIcon,
    title: "Websites die converteren",
    points: [
      "Websites op maat vanaf EUR 600",
      "Mobielvriendelijk & snel",
      "SEO-geoptimaliseerd",
      "Conversiegerichte structuur"
    ],
    linkText: "Bekijk pakketten",
    linkUrl: "/webdesign"
  }
];
</script>

<style scoped lang="scss">
.services {
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Editorial section head: left-aligned, generous ── */
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

/* ── Flat hairline feature cards ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

.feature-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: border-color var(--transition-base),
              transform var(--transition-base),
              box-shadow var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
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

  svg { width: 22px; height: 22px; }
}

h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5) 0;
  letter-spacing: -0.01em;
}

.feature-card__list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-8) 0;
  flex: 1;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    line-height: var(--leading-normal);
    margin-bottom: 0.75rem;

    svg { flex-shrink: 0; margin-top: 0.2rem; color: var(--color-accent); }
    &:last-child { margin-bottom: 0; }
  }
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: auto;
  font-weight: var(--weight-medium);
  font-size: var(--text-small);
  color: var(--color-accent);
  text-decoration: none;

  svg { transition: transform var(--transition-base); }
  &:hover svg { transform: translate(2px, -2px); }
}

@media (max-width: 900px) {
  .cards-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .services { padding: var(--space-16) var(--space-5); }
}
</style>
