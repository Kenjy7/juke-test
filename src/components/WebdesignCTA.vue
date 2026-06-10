<template>
  <section class="webdesign-cta">
    <div class="webdesign-cta-inner">
      <div class="webdesign-cta-content">
        <h3>{{ t('webdesignCTA.head.title') }}</h3>
        <p>{{ t('webdesignCTA.head.lead') }}</p>
      </div>

      <RouterLink to="/webdesign" class="webdesign-cta-btn">
        {{ t('webdesignCTA.button') }}
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

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.webdesign-cta {
  position: relative;
  margin-top: var(--space-4);
  margin-bottom: var(--space-16);
  padding: 0 var(--space-4);
  overflow-x: hidden;
}

.webdesign-cta-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  min-width: 0;
}

.webdesign-cta-content {
  display: grid;
  gap: var(--space-2);
  min-width: 0;

  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h3);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    letter-spacing: -0.01em;
    margin: 0;
    line-height: 1.25;
  }

  p {
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    margin: 0;
    line-height: var(--leading-normal);
  }
}

.webdesign-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: var(--weight-semibold);
  font-size: var(--text-small);
  color: var(--color-bg-primary);
  background: var(--color-text-primary);
  transition: all var(--duration-base) var(--ease-spring);
  white-space: nowrap;

  svg {
    opacity: 0.7;
    transition: transform var(--duration-base) var(--ease-spring);
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-elevated);
    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: scale(0.97);
  }
}

@media (max-width: 900px) {
  .webdesign-cta-inner {
    padding: var(--space-6);
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }

  .webdesign-cta-btn {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .webdesign-cta-inner {
    border-radius: var(--radius-xl);
  }

  .webdesign-cta-content {
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: var(--text-small);
    }
  }

  .webdesign-cta-btn {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-small);
  }
}
</style>
