<template>
  <section class="ai-split-section">
    <div class="inner">
      <div class="visual">
        <div class="image-stack">
          <div class="glass-mockup mockup-1">
            <img
                src="../assets/JukeCodingAIDashboard.png"
                alt="AI dashboard visual"
            />
          </div>
          <div class="glass-mockup mockup-2">
            <img
                src="../assets/JukeCodingAIVerbruik.png"
                alt="AI analytics visual"
            />
          </div>
        </div>
      </div>

      <div class="content">
        <h2 class="title">
          AI automatiseringen voor elke kernafdeling.
        </h2>

        <p class="description">
          Wij bouwen slimme AI-workflows die repetitief werk overnemen, fouten verminderen
          en teams laten focussen op wat écht waarde toevoegt.
        </p>

        <div class="list">
          <ul>
            <li><span>→</span> AI klantenservice & chatbots</li>
            <li><span>→</span> Sales automation & lead opvolging</li>
            <li><span>→</span> Marketing content & campagnes</li>
            <li><span>→</span> Data-analyse & rapportages</li>
          </ul>
          <ul>
            <li><span>→</span> Interne tools & dashboards</li>
            <li><span>→</span> Workflow & procesautomatisering</li>
            <li><span>→</span> Integraties (CRM, ERP, API's)</li>
            <li><span>→</span> Custom AI agents</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
.ai-split-section {
  padding: 6rem 4rem 6rem;
  border-bottom: 1px solid var(--color-bg-surface);
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

/* VISUAL */
.visual {
  display: flex;
  justify-content: center;
}

.image-stack {
  position: relative;
  width: 90%;
  max-width: 530px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.glass-mockup {
  position: relative;
  padding: 0.6rem;
  border-radius: 1.5rem;
  background: linear-gradient(
          180deg,
          var(--color-border),
          var(--color-bg-card-inner)
  );
  border: 1px solid var(--color-border);
  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1px var(--color-bg-surface);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
            400px circle at 30% 20%,
            var(--color-primary-border),
            transparent 50%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
        0 30px 80px var(--color-primary-border),
        inset 0 0 0 1px var(--color-border);

    &::after {
      opacity: 1;
    }
  }
}

.mockup-1 {
  animation: fadeInUp 0.8s ease-out;
}

.mockup-2 {
  animation: fadeInUp 0.8s ease-out 0.2s both;
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

/* CONTENT */
.content {
  width: 650px;
  animation: fadeInRight 0.8s ease-out 0.3s both;
  padding-bottom: 3.2rem;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.title {
  font-size: clamp(2.3rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
}

/* LIST */
.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;

    span {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
}

/* MOBILE - 768px and below */
@media (max-width: 768px) {
  .ai-split-section {
    padding: 4rem 1.5rem;
  }

  .inner {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 1rem;
  }

  .content {
    width: 100%;
    order: -1;
    padding-bottom: 0;
  }

  .visual {
    order: 1;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .image-stack {
    width: 100%;
    gap: 1.25rem;
  }

  .glass-mockup {
    padding: 0.5rem;
    border-radius: 1.25rem;

    img {
      border-radius: 0.875rem;
    }
  }
}

/* SMALL MOBILE - 480px and below */
@media (max-width: 480px) {
  .ai-split-section {
    padding: 3rem 1rem;
  }

  .inner {
    gap: 2.5rem;
    padding: 0 0.5rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .description {
    font-size: 0.9375rem;
  }

  .list {
    gap: 1.25rem;

    li {
      font-size: 0.875rem;

      span {
        font-size: 1rem;
      }
    }
  }

  .image-stack {
    gap: 1rem;
  }

  .glass-mockup {
    padding: 0.4rem;
    border-radius: 1rem;

    img {
      border-radius: 0.75rem;
    }
  }
}
</style>