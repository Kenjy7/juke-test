<template>
  <section class="hero">
    <div class="hero-content">
      <div class="eyebrow reveal-on-load delay-0">
        <span class="eyebrow-dot"></span>
        AI & SaaS Development Studio
      </div>

      <h1 class="reveal-on-load delay-1">
        AI-first development voor<br />
        <span class="highlight">bedrijven die vooruit denken.</span>
      </h1>

      <p class="subtitle reveal-on-load delay-2">
        SaaS-platformen, AI-agents en slimme workflows &mdash;
        gebouwd om jouw bedrijf te laten schalen.
      </p>

      <div class="hero-buttons reveal-on-load delay-3">
        <router-link to="/offerte-aanvraag" class="btn-accent">
          <span>Start je project</span>
          <span class="btn-icon">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </router-link>

        <router-link to="/ai-projecten" class="btn-ghost">
          <span>Bekijk onze diensten</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Hero-specific glow (layered on top of global atmosphere) -->
    <div class="hero-glow" aria-hidden="true"></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

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
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  padding: var(--space-40) var(--space-8) var(--space-24);
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  max-width: 860px;
  width: 100%;
  z-index: 1;
}

/* Staggered reveal */
.reveal-on-load {
  opacity: 0;
  transform: translateY(2rem);
  filter: blur(6px);
  transition:
    opacity var(--duration-reveal) var(--ease-out-expo),
    transform var(--duration-reveal) var(--ease-out-expo),
    filter var(--duration-reveal) var(--ease-out-expo);

  &.visible { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.delay-0 { transition-delay: 0ms; }
.delay-1 { transition-delay: 120ms; }
.delay-2 { transition-delay: 240ms; }
.delay-3 { transition-delay: 380ms; }

/* Eyebrow pill */
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
  margin-bottom: var(--space-8);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border: 1px solid var(--color-border);
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 8px var(--color-primary-glow);
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

h1 {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-8) 0;
}

.highlight {
  background: linear-gradient(135deg, var(--color-primary) 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0 auto var(--space-12);
  line-height: var(--leading-relaxed);
  max-width: 560px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Button-in-button accent CTA */
.btn-accent {
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

  .btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--duration-base) var(--ease-spring);
  }

  &:hover {
    background: var(--color-accent-hover);
    box-shadow: 0 0 60px var(--color-accent-glow);
    transform: translateY(-2px);
    .btn-icon { transform: translate(1px, -1px) scale(1.08); }
  }

  &:active { transform: scale(0.97); }
}

/* Ghost button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  text-decoration: none;
  border: 1px solid var(--color-border);
  background: transparent;
  transition: all var(--duration-slow) var(--ease-spring);

  svg { transition: transform var(--duration-base) var(--ease-spring); }

  &:hover {
    color: var(--color-text-primary);
    border-color: var(--color-border-hover);
    background: var(--color-bg-card-inner);
    transform: translateY(-2px);
    svg { transform: translateX(3px); }
  }

  &:active { transform: scale(0.97); }
}

/* Hero-specific focused glow */
.hero-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
  background: radial-gradient(
    ellipse,
    rgba(59, 130, 246, 0.07) 0%,
    rgba(59, 130, 246, 0.02) 50%,
    transparent 80%
  );
  filter: blur(40px);
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero {
    min-height: 80dvh;
    padding: var(--space-32) var(--space-6) var(--space-16);
  }

  .subtitle {
    font-size: var(--text-body);
    margin-bottom: var(--space-8);
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    .btn-accent, .btn-ghost { width: 100%; justify-content: center; }
  }

  .hero-glow { width: 400px; height: 300px; }
}

@media (max-width: 480px) {
  .hero { padding: var(--space-24) var(--space-4) var(--space-12); }
}
</style>
