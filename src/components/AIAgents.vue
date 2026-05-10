<template>
  <section class="ai-agents-section">
    <div class="container">
      <div class="content-wrapper">
        <!-- Tekst kant -->
        <div class="text-content">
          <span class="label">AI Agents Platform</span>
          <h2>
            Stel je AI team samen
            <span class="highlight">
              <span class="highlight-glow"></span>
            </span>
          </h2>
          <p>
            Ons Agent Platform is de plek waar al jouw AI agents samenkomen. Verbind verschillende agents voor marketing, sales, support of data-analyse en laat ze communiceren, samenwerken en taken verdelen – net als een echt digitaal team.
          </p>

          <div class="features-list">
            <div class="feature-item" v-for="(feature, index) in features" :key="index">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-text">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <button class="cta-button">
            <a
                href="https://juke-coding-ai.be/"
                class="nav-link"
                target="_blank"
                rel="noopener noreferrer"
            >
              <span>Ontdek ons platform</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </button>
        </div>

        <!-- Image kant -->
        <div class="image-content">
          <div class="image-card">
            <div class="card-glow"></div>
            <div class="image-placeholder">
              <img
                  :src="imageSrc"
                  :alt="imageAlt"
                  class="agent-image"
              />

              <!-- Floating particles -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import JukeCodingAiAgentsOffice from '@/assets/JukeCodingAiAgentsOffice.png'

defineProps({
  imageSrc: {
    type: String,
    default: JukeCodingAiAgentsOffice
  },
  imageAlt: {
    type: String,
    default: 'AI Agents Platform'
  }
})

const features = [
  {
    title: 'Communicatie tussen agents',
    description: 'Agents delen informatie en werken samen aan complexe taken.'
  },
  {
    title: 'Automatische taakverdeling',
    description: 'Taken worden automatisch toegewezen aan de beste agent.'
  },
  {
    title: 'Real-time monitoring',
    description: 'Volg alle activiteiten live en krijg inzicht in prestaties.'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.text-content, .image-content').forEach(el => observer.observe(el))
})
</script>

<style scoped lang="scss">

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
  font-family: var(--font-sans);
}

.ai-agents-section {
  position: relative;
  padding: 5rem 2rem;
  overflow: hidden;
}

.container {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  z-index: 1;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

/* === TEXT CONTENT === */
.text-content {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateX(0);
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

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--color-text-primary);
    font-family: var(--font-display);
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 2rem 0;
  }

  .highlight {
    position: relative;
    display: inline-block;
  }

  .highlight-text {
    position: relative;
    z-index: 2;
    color: var(--color-primary);
    padding: 0 0.5rem;
  }

  .highlight-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    height: 110%;
    background: var(--color-primary-glow);
    filter: blur(20px);
    border-radius: 1rem;
    z-index: 1;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin: 0 0 3rem 0;
  }
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  .feature-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: var(--color-primary);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-primary);
    box-shadow: var(--shadow-glow-primary);
  }

  .feature-text {
    flex: 1;

    h4 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 0.5rem 0;
    }

    p {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }
}

.cta-button {
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
  background: var(--color-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-glow-primary);
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    z-index: 2;
  }

  svg {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

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

    svg {
      transform: translateX(4px);
    }

    &::before {
      opacity: 1;
    }
  }
}

/* === IMAGE CONTENT === */
.image-content {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.image-card {
  position: relative;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.4),
      0 0 0 1px var(--color-bg-surface) inset;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 1.5rem;
  padding: 1rem;


  &:hover {
    border-color: var(--color-primary-glow);
    transform: translateY(-8px);

    .card-glow {
      opacity: 1;
    }
  }
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-primary-subtle);
  border-radius: 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.image-placeholder {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
}

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

@keyframes particle-float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  50% {
    transform: translate(20px, -20px);
    opacity: 0.8;
  }
}

@media (max-width: 992px) {
  .ai-agents-section {
    padding: 6rem 1.5rem;
  }

  .content-wrapper {
    gap: 3rem;
  }

  .text-content,
  .image-content {

    &.visible {
      transform: translateY(0);
    }
  }

  .image-card {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .features-list {
    gap: 1.25rem;
  }

  .feature-item .feature-icon {
    width: 36px;
    height: 36px;
  }
  .image-card {
    border-radius: 1.1rem;
  }
  .agent-image {
    border-radius: 0.4rem;
  }
}

</style>