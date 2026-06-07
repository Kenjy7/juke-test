<template>
  <section class="hero">
    <div class="hero-content">
      <div class="label">Webdesign</div>

      <h1>
        Professioneel webdesign<br />
        <span class="highlight">
          <span class="highlight-text">als fundament voor AI</span>
          <span class="highlight-glow"></span>
        </span>
      </h1>

      <p>
        Snelle, conversiegerichte websites die de perfecte basis vormen voor jouw AI-strategie. Van strategie tot livegang voor Belgische KMO’s en zelfstandigen.
      </p>

      <div class="hero-buttons">
        <button class="btn btn-outline">
          <router-link to="/contact" class="nav-link"><span>Gratis kennismaking</span></router-link>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="btn btn-filled">
          <router-link
              :to="{ path: '/webdesign', hash: '#pakketten' }"
              class="nav-link"
          >
            <span>Bekijk de pakketten</span>
          </router-link>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
    </div>
  </section>
</template>


<script setup>
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 3rem 2rem;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  max-width: 1000px;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  z-index: 1;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 36px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
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
  font-family: var(--font-sans);
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

// Label
.label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
  animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
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

// Title - exact same gradient as services
h1 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 2rem 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

// Highlight
.highlight {
  position: relative;
  display: inline-block;
  margin-top: 1rem;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

.highlight-text {
  position: relative;
  z-index: 2;
  color: var(--color-primary);
  -webkit-text-fill-color: var(--color-primary);
  padding: 0.3rem 1rem;
  font-weight: 900;
}

.highlight-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: var(--color-primary-glow);
  filter: blur(30px);
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
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: var(--color-text-secondary);
  margin: 0 auto 3rem;
  line-height: 1.7;
  font-weight: 400;
  max-width: 1200px;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
}

// Buttons
.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
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
  backdrop-filter: blur(10px);
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

// Floating elements
.floating-element {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

.element-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--color-border-active) 0%, transparent 70%);
  top: 10%;
  left: 10%;
  animation: float 20s ease-in-out infinite;
}

.element-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%);
  bottom: 10%;
  right: 10%;
  animation: float 25s ease-in-out infinite reverse;
}

.element-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(42, 108, 255, 0.10) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  animation: float 30s ease-in-out infinite;
  animation-delay: 5s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(30px, -50px);
  }
  66% {
    transform: translate(-20px, 30px);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .hero {
    min-height: 40vh;
    padding: 5em 1.5rem;
  }

  h1 {
    font-size: clamp(2rem, 9.5vw, 3rem);
    line-height: 1.15;
  }

  .highlight-text{
    font-size:  2.2rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0 auto 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;

    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  .floating-element {
    filter: blur(60px);
  }

  .element-1 {
    width: 200px;
    height: 200px;
  }

  .element-2 {
    width: 250px;
    height: 250px;
  }

  .element-3 {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 5rem 1.25rem;
  }

  .label {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    font-size: 0.9375rem;
    padding: 0.875rem 1.75rem;
  }
}
</style>