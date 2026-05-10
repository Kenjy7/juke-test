<!-- IntroAi.vue -->
<template>
  <section class="intro-ai" :class="{ 'dark-section': dark }">
    <div class="bg-elements">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-pattern"></div>
      <div class="spotlight"></div>
    </div>

    <div class="intro-content">
      <!-- Animated badge -->
      <div class="eyebrow-wrapper">
        <span class="eyebrow">
          AI Automatisatie & Agents
        </span>
      </div>

      <!-- Gradient title with animation -->
      <h1 class="gradient-title">
        <span class="title-line">Automatiseer met AI</span>
        <span class="title-sub">en win tijd in je dagelijkse processen</span>
      </h1>

      <p class="description">
        Van AI-agents die sales, support en e-mail automatiseren
        tot maatwerk workflows voor bedrijven in België die tijd besparen en fouten elimineren.
      </p>

      <!-- Modern CTA buttons - EXACT ZOALS HERO -->
      <div class="cta-group">
        <button class="btn btn-outline">
          <router-link to="/contact" class="nav-link">
          <span>Start met AI</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </router-link>
        </button>
        <button class="btn btn-filled">
            <router-link
                :to="{ path: '/ai-automatisatie', hash: '#faqlistai' }"
                class="nav-link"
            >
              <span>Veel gestelde vragen rond AI</span>
            </router-link>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  dark: { type: Boolean, default: false }
});
</script>

<style scoped>
/* =========================================================
   SECTION BASE
   ========================================================= */

.intro-ai {
  position: relative;
  min-height: 68vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 5rem 3.2rem;
  margin-top: 4rem;
  color: var(--color-text-primary);
  overflow: hidden;
}

/* =========================================================
   CONTENT
   ========================================================= */
.intro-content {
  position: relative;
  z-index: 1;
  max-width: 1000px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================================================
   EYEBROW BADGE
   ========================================================= */
.eyebrow-wrapper {
  margin-bottom: 32px;
  animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  padding-bottom: 0.5rem;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: 999px;
  transition: all 0.3s ease;
}

.dark-section .eyebrow {
  color: var(--color-primary);
  background: var(--color-primary-border);
  border-color: var(--color-primary-glow);
}

.eyebrow:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-primary);
}


.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

/* =========================================================
   GRADIENT TITLE
   ========================================================= */
.gradient-title {
  margin-bottom: 32px;
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

.title-line {
  display: block;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  margin-bottom: 16px;
}

.dark-section .title-line {
  color: var(--color-text-primary);
}

.title-sub {
  display: block;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 500;
  opacity: 0.85;
  color: inherit;
}

/* =========================================================
   DESCRIPTION
   ========================================================= */
.description {
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 760px;
  margin: 0 auto 48px;
  font-weight: 400;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 0.4s backwards;
}

/* =========================================================
   CTA BUTTONS - EXACT ZOALS HERO SECTION
   ========================================================= */
.cta-group {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.5s backwards;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  font-family: inherit;

  span {
    position: relative;
    z-index: 2;
  }

  svg {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.98);
  }
}

.btn-outline {
  background: var(--color-bg-surface);
  border: 1.5px solid var(--color-primary-border);
  color: var(--color-text-primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-border);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--color-border-active);
    box-shadow: var(--shadow-glow-primary);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
}

.btn-filled {
  background: var(--color-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-glow-primary);
  border: 1px solid var(--color-border);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-hover);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: var(--shadow-glow-primary);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .intro-ai {
    min-height: 40vh;
    padding: 3em 1.5rem;
  }

  .eyebrow {
    font-size: 0.75rem;
    padding: 8px 20px;
  }

  .description {
    font-size: 1.05rem;
    margin-bottom: 36px;
  }

  .cta-group {
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .gradient-orb {
    filter: blur(80px);
  }
}

@media (max-width: 480px) {
  .btn {
    font-size: 0.9375rem;
    padding: 0.875rem 1.75rem;
  }
}
</style>
