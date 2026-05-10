<template>
  <section class="why-us" ref="sectionRef">
    <div class="container">
      <div class="section-header reveal">
        <h2>Waarom bedrijven met ons bouwen.</h2>
        <p class="subtitle">Technische expertise gecombineerd met een pragmatische aanpak.</p>
      </div>

      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index"
             class="feature-shell reveal" :class="[`reveal-delay-${index + 1}`]">
          <div class="feature-inner">
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
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
.why-us {
  padding: var(--space-24) 0 var(--space-16);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-8);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);

  h2 {
    font-family: var(--font-display);
    font-size: var(--text-h1);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-3) 0;
  }
}

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-tertiary);
  margin: 0 auto;
  max-width: 500px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* Double-Bezel feature cards */
.feature-shell {
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 6px;
  transition: all var(--duration-slow) var(--ease-spring);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-6px);
    box-shadow: var(--shadow-elevated);

    .feature-icon { box-shadow: var(--shadow-glow-primary); }
  }
}

.feature-inner {
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-2xl) - 6px);
  padding: var(--space-8);
  box-shadow: var(--shadow-inner-highlight);
}

.feature-icon {
  width: 44px;
  height: 44px;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--space-6);
  transition: box-shadow var(--duration-base) var(--ease-smooth);

  svg { width: 22px; height: 22px; }
}

h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  letter-spacing: -0.01em;
}

p {
  font-size: var(--text-small);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .why-us { padding: var(--space-16) 0 var(--space-8); }
  .container { padding: 0 var(--space-4); }
  .features-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
</style>
