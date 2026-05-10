<template>
  <section class="cases-section" ref="sectionRef">
    <div class="cases-shell reveal">
      <div class="cases-inner">
        <span class="eyebrow">
          <span class="eyebrow-dot"></span>
          Cases
        </span>
        <h2>
          We bouwen momenteel onze eerste<br />
          AI- en SaaS-projecten.
        </h2>
        <p>
          Heb je een idee voor een AI-oplossing of SaaS-platform?
          We denken graag vrijblijvend met je mee.
        </p>
        <router-link to="/offerte-aanvraag" class="cta-btn">
          <span>Bespreek je project</span>
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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<style scoped lang="scss">
.cases-section {
  padding: var(--space-8) var(--space-8) var(--space-24);
}

.cases-shell {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 6px;
}

.cases-inner {
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-2xl) - 6px);
  box-shadow: var(--shadow-inner-highlight);
  padding: var(--space-20) var(--space-12);
  text-align: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  background: var(--color-bg-surface);
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-8);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border: 1px solid var(--color-border);
}

.eyebrow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent-glow);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-4) 0;
}

p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 auto var(--space-8);
  max-width: 440px;
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
    .cta-icon { transform: translate(1px, -1px) scale(1.08); }
  }

  &:active { transform: scale(0.97); }
}

@media (max-width: 768px) {
  .cases-section { padding: var(--space-4) var(--space-4) var(--space-16); }
  .cases-inner { padding: var(--space-12) var(--space-6); }
  h2 { br { display: none; } }
  .cta-btn { width: 100%; justify-content: center; }
}
</style>
