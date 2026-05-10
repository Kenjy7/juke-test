<template>
  <div
      class="faq-item"
      :class="{ open: isOpen }"
      @click="toggleFaq"
  >
    <div class="faq-glow"></div>

    <div class="faq-question">
      <h3>{{ question }}</h3>
      <button class="toggle-button" :class="{ rotated: isOpen }" aria-label="Toggle answer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <transition name="expand">
      <div v-if="isOpen" class="faq-answer">
        <p>{{ answer }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isOpen = ref(false)

const toggleFaq = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped lang="scss">
.faq-item {
  position: relative;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  cursor: pointer;
  transition: border-color var(--duration-base) var(--ease-spring),
              transform var(--duration-base) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-spring);
  box-shadow: var(--shadow-ambient);
  opacity: 1;
  transform: translateY(0);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-elevated);
  }

  &.open {
    border-color: var(--color-border-active, var(--color-primary));
  }
}

// Neutralise the glow div that remains in the template
.faq-glow {
  display: none;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  position: relative;
  z-index: 1;

  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h3, 1.125rem);
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }
}

.toggle-button {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-surface, var(--color-bg-card-outer));
  border: 1px solid var(--color-border);
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--duration-base) var(--ease-spring),
              background var(--duration-base) var(--ease-spring);
  color: var(--color-text-tertiary);

  &:hover {
    background: var(--color-bg-card-outer);
  }

  &.rotated {
    transform: rotate(180deg);
  }

  svg {
    transition: transform var(--duration-base) var(--ease-spring);
  }
}

.faq-answer {
  position: relative;
  z-index: 1;
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);

  p {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

// Expand transition
.expand-enter-active,
.expand-leave-active {
  transition: all var(--duration-base) var(--ease-spring);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
  margin-top: var(--space-6);
  padding-top: var(--space-6);
}

@media (max-width: 768px) {
  .faq-item {
    padding: var(--space-5);
  }

  .faq-question h3 {
    font-size: 1rem;
  }

  .toggle-button {
    width: 32px;
    height: 32px;
  }

  .faq-answer {
    margin-top: var(--space-4);
    padding-top: var(--space-4);

    p {
      font-size: 0.9375rem;
    }
  }
}
</style>