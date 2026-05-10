<template>
  <section class="problem-section">
    <div class="content">
      <div class="title-wrapper">
        <h2 class="section-title">
          Tijdverlies in je bedrijf?
          <span class="gradient-text">Wij automatiseren het.</span>
        </h2>
        <p class="section-description">
          Veel bedrijven verspillen dagelijks uren aan repetitieve processen.
          Met slimme AI-automatisatie lossen we dit sneller op dan je denkt.
        </p>
      </div>

      <ul class="problem-list">
        <li v-for="(item, i) in problems" :key="i" :style="{ '--delay': i * 0.05 + 's' }">
          <div class="icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const problems = [
  "Manuele data-invoer",
  "Rapporten opmaken",
  "Teamcommunicatie structureren",
  "Documenten controleren",
  "Complexe processen die eenvoudiger kunnen",
  "Gebrek aan overzicht en inzicht bij wat telt",
];
</script>

<style scoped lang="scss">
/* =========================================================
   SECTION BASE
   ========================================================= */
.problem-section {
  position: relative;
  padding: 1.8rem 2rem 5rem;
  color: var(--color-text-primary);
  overflow: hidden;
  border-bottom: 1px solid var(--color-bg-surface);
}

/* =========================================================
   CONTENT
   ========================================================= */
.content {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  z-index: 1;
}

/* =========================================================
   TITLE WRAPPER
   ========================================================= */
.title-wrapper {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
}

/* =========================================================
   TITLE
   ========================================================= */
.section-title {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.gradient-text {
  display: block;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 0.5rem;
  font-weight: 900;
}

/* =========================================================
   DESCRIPTION
   ========================================================= */
.section-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  max-width: 720px;
  margin: 0 auto;
}

/* =========================================================
   PROBLEM LIST (GLASS TILES)
   ========================================================= */
.problem-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.problem-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  border-radius: 1.25rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-subtle);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: var(--color-primary-glow);
    box-shadow: var(--shadow-glow-primary);

    &::before {
      opacity: 1;
    }

    .icon-wrapper {
      background: var(--color-primary);
      transform: scale(1.1) rotate(5deg);

      svg {
        stroke: var(--color-text-primary);
      }
    }
  }

  span {
    position: relative;
    z-index: 1;
    color: var(--color-text-primary);
  }
}

/* Icon wrapper */
.icon-wrapper {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--color-primary-border);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;

  svg {
    stroke: var(--color-primary);
    transition: stroke 0.3s ease;
  }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .problem-section {
    padding: 6rem 1.5rem;
  }

  .title-wrapper {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .problem-list {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .problem-list li {
    font-size: 0.95rem;
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>