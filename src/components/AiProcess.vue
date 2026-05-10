<template>
  <section class="process" ref="sectionRef">
    <div class="container">
      <div class="process-header reveal">
        <span class="eyebrow">
          <span class="dot"></span>
          Onze aanpak
        </span>
        <h2>Van vraag tot werkende AI<br />in vijf stappen.</h2>
      </div>

      <div class="timeline">
        <div v-for="(step, i) in steps" :key="i"
             class="step-shell reveal"
             :class="[`reveal-delay-${i + 1}`]">
          <div class="step-inner">
            <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <div class="process-cta reveal">
        <router-link to="/offerte-aanvraag" class="cta-btn">
          <span>Start met stap 1</span>
          <span class="cta-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sectionRef = ref(null);

const steps = [
  { title: 'Analyse', desc: 'We brengen je processen in kaart en identificeren waar AI het meeste impact heeft.' },
  { title: 'Ontwerp', desc: 'We ontwerpen de AI-oplossing: welke agents, welke workflows, welke integraties.' },
  { title: 'Bouw', desc: 'We ontwikkelen en trainen de AI op jouw data en processen. Iteratief en transparant.' },
  { title: 'Integratie', desc: 'We koppelen de AI aan je bestaande tools en systemen. Geen verstoring van je workflow.' },
  { title: 'Optimalisatie', desc: 'We monitoren, meten en verbeteren. De AI wordt elke week slimmer.' },
];

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<style scoped lang="scss">
.process {
  padding: var(--space-24) var(--space-8) var(--space-16);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.process-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  background: var(--color-bg-card-inner);
  padding: 0.4rem 1.125rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border: 1px solid var(--color-border);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 6px var(--color-primary-glow);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0;
}

/* Timeline grid */
.timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
  position: relative;
  margin-bottom: var(--space-16);

  /* Connecting line behind cards */
  &::before {
    content: '';
    position: absolute;
    top: 48px;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-border-hover) 20%,
      var(--color-primary-border) 50%,
      var(--color-border-hover) 80%,
      transparent
    );
    z-index: 0;
  }
}

.step-shell {
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 4px;
  transition: all var(--duration-slow) var(--ease-spring);
  position: relative;
  z-index: 1;

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);

    .step-number { color: var(--color-primary); }
  }
}

.step-inner {
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-xl) - 4px);
  box-shadow: var(--shadow-inner-highlight);
  padding: var(--space-6);
  text-align: center;
}

.step-number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--weight-medium);
  margin-bottom: var(--space-4);
  transition: color var(--duration-base) var(--ease-smooth);
  letter-spacing: 0.04em;
}

h3 {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
  letter-spacing: -0.01em;
}

p {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  line-height: var(--leading-normal);
  margin: 0;
}

.process-cta {
  text-align: center;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.75rem 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  font-family: var(--font-sans);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  text-decoration: none;
  box-shadow: var(--shadow-glow-accent);
  transition: all var(--duration-slow) var(--ease-spring);

  .cta-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--duration-base) var(--ease-spring);
  }

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 0 50px var(--color-accent-glow);
    .cta-icon { transform: translate(1px, -1px) scale(1.08); }
  }

  &:active { transform: scale(0.97); }
}

@media (max-width: 900px) {
  .timeline {
    grid-template-columns: repeat(3, 1fr);
    &::before { display: none; }
  }
}

@media (max-width: 600px) {
  .process { padding: var(--space-16) var(--space-4) var(--space-12); }

  .timeline {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }

  .step-inner { padding: var(--space-4); }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .timeline { grid-template-columns: 1fr; }
}
</style>
