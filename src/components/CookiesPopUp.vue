<template>
  <transition name="fade">
    <div v-if="showBanner" class="cookie-banner-overlay">
      <div class="cookie-banner">
        <div class="cookie-content">
          <div class="cookie-header">
            <div class="cookie-icon">🍪</div>
            <h3>Cookievoorkeuren</h3>
          </div>

          <p class="cookie-description">
            We gebruiken cookies om je ervaring te verbeteren. Pas je voorkeuren aan of accepteer alles.
          </p>

          <!-- Detailed settings -->
          <div v-if="showDetails" class="cookie-settings">
            <div class="cookie-option">
              <div class="option-header">
                <input
                    type="checkbox"
                    id="necessary"
                    checked
                    disabled
                    class="cookie-checkbox"
                />
                <label for="necessary">
                  <span class="option-title">Noodzakelijk</span>
                  <span class="option-required">(Verplicht)</span>
                </label>
              </div>
            </div>

            <div class="cookie-option">
              <div class="option-header">
                <input
                    type="checkbox"
                    id="functional"
                    v-model="preferences.functional"
                    class="cookie-checkbox"
                />
                <label for="functional">
                  <span class="option-title">Functioneel</span>
                </label>
              </div>
            </div>

            <div class="cookie-option">
              <div class="option-header">
                <input
                    type="checkbox"
                    id="analytics"
                    v-model="preferences.analytics"
                    class="cookie-checkbox"
                />
                <label for="analytics">
                  <span class="option-title">Analytisch</span>
                </label>
              </div>
            </div>

            <div class="cookie-option">
              <div class="option-header">
                <input
                    type="checkbox"
                    id="marketing"
                    v-model="preferences.marketing"
                    class="cookie-checkbox"
                />
                <label for="marketing">
                  <span class="option-title">Marketing</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="cookie-actions">
            <button
                v-if="!showDetails"
                @click="toggleDetails"
                class="btn btn-secondary"
            >
              Aanpassen
            </button>

            <button
                v-if="showDetails"
                @click="handleSavePreferences"
                class="btn btn-secondary"
            >
              Opslaan
            </button>

            <button
                v-if="!showDetails"
                @click="handleRejectAll"
                class="btn btn-tertiary"
            >
              Weigeren
            </button>

            <button
                @click="handleAcceptAll"
                class="btn btn-primary"
            >
              {{ showDetails ? 'Alles accepteren' : 'Accepteren' }}
            </button>
          </div>

          <router-link to="/cookies" class="cookie-policy-link">
            Meer info over ons cookiebeleid
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCookieConsent } from '../composables/useCookieConsent'

// Gebruik de composable
const {
  initializeConsent,
  saveConsent,
  acceptAll,
  acceptNecessary
} = useCookieConsent()

const showBanner = ref(false)
const showDetails = ref(false)

const preferences = ref({
  functional: true,
  analytics: true,
  marketing: false
})

onMounted(() => {
  // Check of gebruiker al een keuze heeft gemaakt
  const hasExistingConsent = initializeConsent()

  if (!hasExistingConsent) {
    // Geen bestaande voorkeuren, toon banner
    setTimeout(() => {
      showBanner.value = true
    }, 1000)
  } else {
    // Gebruiker heeft al gekozen, banner blijft weg
    console.log('Gebruiker heeft al cookie voorkeuren ingesteld')
  }
})

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

const handleAcceptAll = () => {
  acceptAll() // Composable functie - accepteert alles
  showBanner.value = false
  console.log('✅ Alle cookies geaccepteerd')
}

const handleRejectAll = () => {
  acceptNecessary() // Composable functie - alleen noodzakelijke
  showBanner.value = false
  console.log('❌ Alleen noodzakelijke cookies geaccepteerd')
}

const handleSavePreferences = () => {
  // Sla custom voorkeuren op via composable
  saveConsent(preferences.value)
  showBanner.value = false
  console.log('💾 Custom voorkeuren opgeslagen:', preferences.value)
}
</script>

<style scoped lang="scss">
.cookie-banner-overlay {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
    left: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgb(43, 45, 48) 0%, transparent 100%);
    backdrop-filter: blur(4px);
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
}

.cookie-banner {
  max-width: 470px;
  background: var(--color-bg-card-inner);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
  }
}

.cookie-content {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  .cookie-icon {
    font-size: 1.5rem;

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
}

.cookie-description {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
}

.cookie-settings {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
}

.cookie-option {
  .option-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      cursor: pointer;
      user-select: none;
      flex: 1;
    }

    .option-title {
      font-weight: 600;
      color: var(--color-text-primary);
      font-size: 0.9375rem;
    }

    .option-required {
      font-size: 0.75rem;
      color: var(--color-text-tertiary);
      font-style: italic;
    }
  }
}

.cookie-checkbox {
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  accent-color: var(--color-primary);
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    gap: 0.625rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.625rem;
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-glow-primary);

  &:hover {
    box-shadow: var(--shadow-glow-primary);
  }
}

.btn-secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);

  &:hover {
    background: var(--color-border);
    border-color: var(--color-primary-glow);
  }
}

.btn-tertiary {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-surface);
  }
}

.cookie-policy-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--color-primary);

    svg {
      transform: translateX(4px);
    }
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>