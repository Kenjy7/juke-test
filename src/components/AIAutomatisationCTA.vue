<!-- src/components/AiAutomationCta.vue -->
<template>
  <section class="ai-cta">
    <div class="ai-cta-inner">
      <div class="ai-cta-content">
        <h3>Klaar om jouw processen te automatiseren met AI?</h3>
        <p>
          Koppel formulieren, leads en opvolging aan slimme AI-agents <br>ideaal voor KMO’s die tijd willen winnen en sneller willen groeien.
        </p>
      </div>

      <RouterLink to="/ai-automatisatie" class="ai-cta-btn" aria-label="Bekijk AI automatisatie">
        Ontdek AI automatisatie
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
    </div>
  </section>
</template>

<script>
export default {
  name: "AiAutomationCta",
};
</script>

<style scoped lang="scss">
.ai-cta {
  position: relative;
  margin-top: var(--space-4);
  margin-bottom: var(--space-16);
  padding: 0 var(--space-4);
  overflow-x: hidden;
}

.ai-cta-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  min-width: 0;
}

.ai-cta-content {
  display: grid;
  gap: var(--space-2);
  min-width: 0;

  h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: -0.01em;
    margin: 0;
    padding: 0;
    line-height: 1.25;
  }

  p {
    font-family: var(--font-sans);
    font-size: 1.05rem;
    color: var(--color-text-secondary);
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }
}

.ai-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--color-bg-primary);
  background: var(--color-text-primary);
  border: none;
  box-shadow: var(--shadow-elevated);
  transition: transform var(--duration-base) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-spring);
  white-space: nowrap;
  min-width: 0;
  max-width: 100%;

  svg {
    opacity: 0.9;
    transition: transform var(--duration-base) var(--ease-spring);
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow-primary);

    svg {
      transform: translateX(3px);
    }
  }
}

@media (max-width: 900px) {
  .ai-cta-inner {
    padding: var(--space-6);
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }

  .ai-cta-content {
    text-align: left;
  }

  .ai-cta-btn {
    width: 100%;
    margin-top: var(--space-1);
  }
}

@media (max-width: 600px) {
  .ai-cta-inner {
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    gap: var(--space-4);
  }

  .ai-cta-content {
    gap: var(--space-3);

    h3 {
      font-size: 1.1rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.98rem;
      line-height: 1.55;
    }
  }

  .ai-cta-btn {
    padding: var(--space-3) var(--space-4);
    font-size: 0.95rem;
  }
}

@media (max-width: 380px) {
  .ai-cta-btn {
    font-size: 0.9rem;
    padding: var(--space-3) var(--space-4);
  }
}
</style>
