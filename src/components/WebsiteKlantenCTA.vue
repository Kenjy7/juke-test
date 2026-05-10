<!-- src/components/WebsiteKlantenCta.vue -->
<template>
  <section class="website-klanten-cta">
    <div class="website-klanten-cta-inner">
      <div class="website-klanten-cta-content">
        <div class="cta-badge">💡 Bestaande website?</div>
        <h3>Website die weinig aanvragen oplevert?</h3>
        <p>Ontdek hoe we jouw website omzetten in een klantenmagneet <br>met behulp van conversie-optimalisatie.</p>
      </div>

      <RouterLink to="/website-die-klanten-oplevert" class="website-klanten-cta-btn">
        Lees meer over conversie
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
  name: "WebsiteKlantenCta",
};
</script>

<style scoped lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

.website-klanten-cta {
  position: relative;
  margin-bottom: 3.5rem;
  padding: 1rem 1rem;
  overflow-x: hidden;
}

.website-klanten-cta-inner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  padding: 1.75rem 2rem;
  border-radius: 1.5rem;

  // Consistent met je design system (paars/blauw)
  background: var(--color-bg-card-inner);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  min-width: 0;
}

.website-klanten-cta-content {
  display: grid;
  gap: 0.7rem;
  min-width: 0;
  position: relative;
  z-index: 1;

  .cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    width: fit-content;

    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    background: var(--color-primary-subtle);
    border: 1px solid var(--color-primary-border);
    padding: 0.35rem 0.85rem;
    border-radius: 2rem;
    letter-spacing: -0.01em;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
    margin: 0;
    padding: 0;
    line-height: 1.25;
  }

  p {
    font-size: 1.05rem;
    color: var(--color-text-secondary);
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }
}

.website-klanten-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.9rem 1.25rem;
  border-radius: 3rem;
  text-decoration: none;
  font-weight: 600;
  color: #fff;

  position: relative;
  z-index: 1;

  // Consistent met je bestaande buttons (paars gradient)
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-glow-primary);
  transition: all 0.3s ease;

  white-space: nowrap;
  min-width: 0;
  max-width: 100%;

  svg {
    opacity: 0.9;
    transition: transform 0.3s ease;
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
  .website-klanten-cta-inner {
    padding: 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }

  .website-klanten-cta-content {
    text-align: left;
  }

  .website-klanten-cta-btn {
    width: 100%;
    margin-top: 0.25rem;
  }
}

@media (max-width: 600px) {
  .website-klanten-cta-inner {
    padding: 1.35rem;
    border-radius: 1.25rem;
    gap: 1.15rem;
  }

  .website-klanten-cta-content {
    gap: 0.75rem;

    .cta-badge {
      font-size: 0.85rem;
      padding: 0.35rem 0.8rem;
    }

    h3 {
      font-size: 1.1rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.98rem;
      line-height: 1.55;
    }
  }

  .website-klanten-cta-btn {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 380px) {
  .website-klanten-cta-btn {
    font-size: 0.9rem;
    padding: 0.85rem 0.95rem;
  }
}
</style>