<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content">
        <!-- 404 Number met glow effect -->
        <div class="error-number">
          <span class="number-glow">404</span>
          <h1 class="number-text">404</h1>
        </div>

        <!-- Error message -->
        <div class="error-message">
          <h2 class="message-title">Pagina niet gevonden</h2>
          <p class="message-description">
            Oeps! De pagina die je zoekt bestaat niet of is verplaatst.
            Geen zorgen, we helpen je graag verder.
          </p>
        </div>

        <!-- Action buttons -->
        <div class="error-actions">
          <button class="btn-primary" @click="goHome">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10L10 3L17 10M10 3V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Terug naar home</span>
          </button>

          <button class="btn-secondary" @click="goBack">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Ga terug</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}

</script>

<style scoped lang="scss">
.error-page {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.container {
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 2;
}

.error-content {
  text-align: center;
  position: relative;
}

.error-number {
  position: relative;
  margin-bottom: 2rem;
}

.number-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(8rem, 20vw, 12rem);
  font-weight: 900;
  color: var(--color-primary-glow);
  -webkit-text-fill-color: var(--color-primary-glow);
  filter: blur(30px);
  animation: pulse 3s ease-in-out infinite;
  z-index: 1;
}

.number-text {
  position: relative;
  font-size: clamp(8rem, 20vw, 12rem);
  font-weight: 900;
  color: var(--color-primary);
  -webkit-text-fill-color: var(--color-primary);
  margin: 0;
  line-height: 1;
  z-index: 2;
  letter-spacing: -0.02em;
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

.error-message {
  margin-bottom: 3rem;
}

.message-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.message-description {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;

  svg {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
  }
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-glow-primary);

  &::before {
    background: var(--color-primary-hover);
    opacity: 0;
  }

  &:hover {
    box-shadow: var(--shadow-glow-primary);

    &::before {
      opacity: 1;
    }

    svg {
      transform: translateY(-2px);
    }
  }
}

.btn-secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    background: rgba(10, 10, 10, 0.04);
    opacity: 0;
  }

  &:hover {
    border-color: var(--color-primary-glow);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }

    svg {
      transform: translateX(-2px);
    }
  }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: particle-float 6s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes particle-float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  50% {
    transform: translate(30px, -30px);
    opacity: 0.6;
  }
}

// Responsive
@media (max-width: 768px) {
  .error-page {
    padding: 1.5rem;
  }

  .error-number {
    margin-bottom: 1.5rem;
  }

  .error-message {
    margin-bottom: 2rem;
  }

  .message-description {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .error-page {
    padding: 1rem;
  }

  .number-glow,
  .number-text {
    font-size: 6rem;
  }

  .message-title {
    font-size: 1.5rem;
  }

  .message-description {
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
  }
}
</style>