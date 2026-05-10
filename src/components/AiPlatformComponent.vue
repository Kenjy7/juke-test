<template>
  <section class="ai-growth-section">
    <div class="container">
      <!-- Content First -->
      <div class="content-block">

        <h2 class="headline">
          Digitale oplossingen <br>
          die met uw bedrijf meegroeien.
        </h2>

        <p class="lead">
          We transformeren bedrijfsprocessen met intelligente automatisering.
          Van eerste idee tot enterprise-schaal: onze AI-oplossingen evolueren
          met uw ambities.
        </p>

        <div class="industries">
          <h3 class="industries-title">Voor elk bedrijfstype</h3>
          <div class="industry-tags">
            <span class="tag-item">Startups</span>
            <span class="tag-item">Product- & marketingteams</span>
            <span class="tag-item">Bureaus & enterprises</span>
            <span class="tag-item">Klantenservice teams</span>
            <span class="tag-item">Logistiek & supply chain</span>
            <span class="tag-item">Salesafdelingen</span>
          </div>
        </div>
      </div>

      <!-- Visual Stack -->
      <div class="visual-block">
        <div class="floating-card card-primary">
          <div class="card-glow"></div>
          <img src="../assets/JukeAITemplate.png" alt="AI Dashboard" />
        </div>
        <div class="floating-card card-secondary">
          <div class="card-glow"></div>
          <img src="../assets/JukeCodingAIRun.png" alt="AI Analytics" />
        </div>
        <div class="orbit-ring"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
.ai-growth-section {
  position: relative;
  padding: 0;
  background:
      radial-gradient(circle at 20% 50%, var(--color-primary-subtle) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, var(--color-primary-subtle) 0%, transparent 50%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
        transparent,
        var(--color-primary-glow),
        transparent
    );
  }
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

/* CONTENT BLOCK */
.content-block {
  z-index: 2;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: slideInLeft 0.6s ease-out;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.headline {
  font-size: clamp(2.3rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  animation: slideInLeft 0.6s ease-out 0.1s both;
}

.lead {
  font-size: 1.15rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
  max-width: 540px;
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

/* STATS GRID */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: slideInLeft 0.6s ease-out 0.3s both;
}

.stat-card {
  padding: 1rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary-subtle);
    border-color: var(--color-primary-glow);
    transform: translateY(-4px);
  }
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* INDUSTRIES */
.industries {
  animation: slideInLeft 0.6s ease-out 0.4s both;
}

.industries-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.industry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-item {
  padding: 0.6rem 1.2rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: var(--color-primary-subtle);
    border-color: var(--color-border-active);
    color: var(--color-text-primary);
    transform: translateY(-2px);
  }
}

/* VISUAL BLOCK */
.visual-block {
  position: relative;
  height: 680px;
  padding-right: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit-ring {
  position: absolute;
  width: 500px;
  height: 500px;
  border: 1px solid var(--color-primary-subtle);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.floating-card {
  position: absolute;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.4),
      0 0 0 1px var(--color-bg-surface) inset;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    display: block;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: var(--color-border-active);
    box-shadow:
        0 35px 90px var(--color-primary-glow),
        0 0 0 1px var(--color-primary-border) inset;
  }
}

.card-glow {
  position: absolute;
  inset: -1px;
  background: radial-gradient(
          600px circle at var(--x, 50%) var(--y, 50%),
          var(--color-primary-border),
          transparent 40%
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.floating-card:hover .card-glow {
  opacity: 1;
}

.card-primary {
  width: 450px;
  left: -90px;
  bottom: 150px;
  z-index: 1;
  animation: floatIn 0.8s ease-out 0.5s both;

  &:hover {
    z-index: 3;
    transform: translateY(-12px) scale(1.02);
  }
}

.card-secondary {
  width: 230px;
  right: 10px;
  top: 80px;
  z-index: 2;
  animation: floatIn 0.8s ease-out 0.7s both;

  &:hover {
    z-index: 3;
    transform: translateY(-12px) scale(1.02);
  }
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* MOBILE - 768px and below */
@media (max-width: 768px) {
  .ai-growth-section {
    padding: 4rem 0;
  }

  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 1.5rem;
  }

  .content-block {
    order: -1;
  }

  .visual-block {
    order: 1;
    height: 450px;
    padding-right: 0;
  }

  .headline {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
    margin-bottom: 2rem;
    max-width: 100%;
  }

  .industry-tags {
    gap: 0.6rem;
  }

  .tag-item {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }

  .card-primary {
    width: 450px;
    left: 60px;
    bottom: 50px;
  }

  .card-secondary {
    width: 200px;
    right: 70px;
    top: -10px;
  }

  .orbit-ring {
    width: 350px;
    height: 350px;
  }
}

/* SMALL MOBILE - 480px and below */
@media (max-width: 480px) {
  .ai-growth-section {
    padding: 3rem 0;
  }

  .container {
    padding: 0 1rem;
    gap: 2.5rem;
  }

  .headline {
    font-size: 1.75rem;
  }

  .lead {
    font-size: 0.9375rem;
  }

  .industries-title {
    font-size: 0.875rem;
  }

  .tag-item {
    font-size: 0.8rem;
    padding: 0.45rem 0.9rem;
  }

  .visual-block {
    height: 380px;
  }

  .card-primary {
    width: 240px;
    left: 10px;
    bottom: 100px;
  }

  .card-secondary {
    width: 150px;
    right: 10px;
    top: 10px;
  }

  .orbit-ring {
    width: 300px;
    height: 300px;
  }
}
</style>