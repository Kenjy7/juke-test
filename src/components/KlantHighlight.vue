<template>
  <section class="case-highlight">
    <div class="container">
      <div class="case-header">
        <h2 class="title">
          E&eacute;n van onze digitale oplossingen
        </h2>
        <p class="subtitle">AI en webdesign gecombineerd voor maximaal resultaat</p>
      </div>

      <div class="content-wrapper">
        <!-- Laptop mockup -->
        <div class="mockup-container">
          <div class="mockup-glow"></div>
          <div class="device-wrapper">
            <img
                src="../assets/laptop%20klanthighlight.webp"
                alt="Laptop mockup IMMO SADS"
                class="laptop"
            />
          </div>
        </div>

        <!-- Text block -->
        <div class="text-block">
          <p class="description">
            Voor <span class="dik">Immo Sads</span> bouwden we een strakke en professionele website die hun expertise in plaatsbeschrijvingen
            en vastgoedmarketing helder presenteert. Met een gebruiksvriendelijk design en sterke visuele elementen
            brengen we hun diensten perfect tot hun recht.
          </p>

          <div class="features-list">
            <h4 class="features-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Wat wij deden voor deze klant
            </h4>
            <ul class="features">
              <li v-for="(feature, i) in features" :key="i">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  'AI-geoptimaliseerde website',
  'Mobielvriendelijk webdesign',
  'Conversiegericht ontwerp',
  'SEO-geoptimaliseerd'
]
</script>

<style scoped lang="scss">

.dik{
  font-weight: 900;
}

.case-highlight {
  position: relative;
  background: transparent;
  padding-top: 4rem;
  overflow: hidden;
  padding-bottom: 0.5rem;
}

.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
}

.case-header {
  text-align: center;
  margin-bottom: -1rem;
  animation: fadeInUp 0.8s ease;
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

.title {
  font-size: clamp(3rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-bottom: -7rem;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  font-weight: 400;
  max-width: 1000px;
  margin: 8.5rem auto -6rem auto;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: -8%; // Trek de hele content wrapper omhoog
}

// Mockup container
.mockup-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, var(--color-primary-border) 0%, transparent 40%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.device-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  z-index: 1;
}

.laptop {
  width: 120%;
  height: auto;
  object-fit: cover;
  clip-path: inset(0% 0 0% 0);
  margin: -1% 0% 10% -20%;
  display: block;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 0.5rem;
  filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.3));

  &:hover {
    transform: scale(1.03);
    filter: drop-shadow(0 25px 80px var(--color-primary-glow));
  }
}

// Text block
.text-block {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.description {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 1.0625rem;
  margin: 0;
}

.features-list {
  background: var(--color-bg-card-inner);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary-glow);
    background: var(--color-bg-surface);
  }
}

.features-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 1.5rem 0;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-secondary);
    font-size: 1rem;

    svg {
      flex-shrink: 0;
      color: var(--color-primary);
    }
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.6rem;
  background: var(--color-primary);
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow-primary);
  width: fit-content;
  text-decoration: none;


    svg {
      transition: transform 0.3s ease;
    }

    &:hover {
      box-shadow: var(--shadow-glow-primary);
      transform: translateY(-2px);
      background: var(--color-primary-hover);

      svg {
        transform: translateX(4px);
      }
    }
  }

  // Responsive
  @media (max-width: 900px) {
    .case-highlight {
      padding: 1rem 0 4rem 0;
    }

    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .case-header {
      margin-bottom: 3rem;
    }

    .laptop {
      clip-path: inset(12% 0 12% 0);
      margin: -10% 0% -15% -10%;
    }

    .cta-button {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .case-highlight {
      padding: 1rem 0 2rem 0;
    }

    .container {
      padding: 0 1.5rem;
    }

    .case-header {
      margin-bottom: 2rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .content-wrapper {
      gap: 2rem;
    }

    .laptop {
      clip-path: inset(15% 0 15% 0);
      margin: -8% 0% -15% -10%;
    }

    .features-list {
      padding: 1.5rem;
    }
  }

  @media (hover: hover) {
    .laptop:hover {
      transform: scale(1.03);
    }
  }

</style>