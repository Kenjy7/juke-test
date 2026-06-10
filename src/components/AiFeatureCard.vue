<template>
  <div class="card" :style="{ animationDelay: `var(--delay)` }">
    <div class="card__icon">
      <component :is="icon" />
    </div>

    <h3 class="card__title">{{ title }}</h3>
    <p class="card__desc">{{ description }}</p>

    <ul v-if="highlights.length" class="card__list">
      <li v-for="h in highlights" :key="h">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.3337 4L6.00033 11.3333L2.66699 8"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ h }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: Object,
  highlights: { type: Array, default: () => [] },
})
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition:
    border-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);
  }
}

.card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-accent);
  margin-bottom: var(--space-6);

  svg,
  :deep(svg) {
    width: 22px;
    height: 22px;
  }
}

.card__title {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 var(--space-3);
}

.card__desc {
  font-size: var(--text-small);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

.card__list {
  list-style: none;
  margin: var(--space-6) 0 0;
  padding: var(--space-5) 0 0;
  border-top: 1px solid var(--color-border);
  display: grid;
  gap: var(--space-3);

  li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-small);
    color: var(--color-text-secondary);

    svg {
      color: var(--color-accent);
      flex-shrink: 0;
    }
  }
}
</style>
