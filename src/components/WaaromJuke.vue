<template>
  <section class="why-us band--sunken" ref="sectionRef">
    <div class="container">

      <!-- Asymmetric two-column: sticky lead heading + reasons list -->
      <div class="why-us__layout">

        <!-- Left column: editorial lead -->
        <aside class="why-us__lead reveal">
          <span class="eyebrow">
            <span class="eyebrow__dot" aria-hidden="true"></span>
            Waarom Juke
          </span>
          <h2>Waarom bedrijven met ons bouwen.</h2>
          <p class="lead">Technische expertise gecombineerd met een pragmatische aanpak.</p>
        </aside>

        <!-- Right column: numbered hairline reason rows -->
        <ol class="why-us__list" role="list">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="reason-row reveal"
            :class="[`reveal-delay-${index + 1}`]"
          >
            <div class="reason-row__icon" aria-hidden="true">
              <component :is="feature.icon" />
            </div>
            <div class="reason-row__body">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
            <span class="reason-row__index" aria-hidden="true">0{{ index + 1 }}</span>
          </li>
        </ol>

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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

const SpeedIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })]);

const PersonalIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [
  h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
]);

const ScaleIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
}, [
  h('rect', { x: '2', y: '2', width: '8', height: '8', rx: '1' }),
  h('rect', { x: '14', y: '2', width: '8', height: '8', rx: '1' }),
  h('rect', { x: '2', y: '14', width: '8', height: '8', rx: '1' }),
  h('rect', { x: '14', y: '14', width: '8', height: '8', rx: '1' })
]);

const features = [
  {
    icon: SpeedIcon,
    title: 'Snelle oplevering',
    description: 'Van idee tot werkend product in weken, niet maanden. We werken in sprints en leveren snel tastbaar resultaat.'
  },
  {
    icon: PersonalIcon,
    title: 'Persoonlijke aanpak',
    description: 'Geen templates of standaardoplossingen. We analyseren jouw processen en bouwen precies wat je nodig hebt.'
  },
  {
    icon: ScaleIcon,
    title: 'Schaalbare technologie',
    description: 'We bouwen met moderne stacks die meegroeien met je bedrijf. Van Vue en Node tot AI-API\'s en cloud-infrastructuur.'
  }
];
</script>

<style scoped lang="scss">
/* ── Section shell ── */
.why-us {
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Asymmetric two-column layout ── */
.why-us__layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: var(--space-20);
  align-items: start;
}

/* ── Left: sticky editorial lead ── */
.why-us__lead {
  position: sticky;
  top: var(--space-8);
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
  text-wrap: balance;
  margin: 0;
}

.lead {
  margin: var(--space-5) 0 0;
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 42ch;
}

/* ── Right: numbered hairline reason rows ── */
.why-us__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.reason-row {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: var(--space-6);
  align-items: start;
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-border);
  transition: border-color var(--transition-base),
              transform var(--transition-base),
              box-shadow var(--transition-base);

  &:last-child {
    border-bottom: 1px solid var(--color-border);
  }

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateX(4px);
    box-shadow: none;

    .reason-row__icon {
      border-color: var(--color-primary-border);
      background: var(--color-primary-subtle);
    }
  }
}

.reason-row__icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg-surface);
  color: var(--color-accent);
  transition: border-color var(--transition-base),
              background var(--transition-base);

  svg { width: 22px; height: 22px; }
}

.reason-row__body {
  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-3) 0;
    letter-spacing: -0.01em;
    line-height: var(--leading-snug);
  }

  p {
    font-size: var(--text-small);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }
}

.reason-row__index {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  letter-spacing: var(--tracking-wide);
  margin-top: 0.25rem;
  user-select: none;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .why-us__layout {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }

  .why-us__lead {
    position: static;
  }
}

@media (max-width: 768px) {
  .why-us {
    padding: var(--space-16) var(--space-5);
  }

  .reason-row {
    grid-template-columns: 44px 1fr;

    .reason-row__index { display: none; }
  }
}
</style>
