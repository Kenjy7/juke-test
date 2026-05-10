<template>
  <div
      class="card"
      :style="{ animationDelay: `var(--delay)` }"
  >
    <div class="icon-wrapper">
      <component :is="icon" class="icon" />
    </div>

    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>

    <ul v-if="highlights.length" class="highlights">
      <li v-for="h in highlights" :key="h">
        <span class="dot"></span>
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
  highlights: {
    type: Array,
    default: () => []
  }
});
</script>


<style scoped lang="scss">
.card {
  position: relative;
  padding: 2.75rem 2.5rem;
  border-radius: 1.75rem;

  background: linear-gradient(
          180deg,
          var(--color-bg-surface),
          var(--color-bg-card-inner)
  );

  border: 1px solid var(--color-border);

  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  transition: all 0.45s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--color-border-active);
    box-shadow:
        0 25px 50px rgba(0,0,0,0.45),
        0 0 0 1px var(--color-primary-border);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
            500px circle at 50% 50%,
            var(--color-primary-border),
            transparent 40%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
}

/* ICON */
.icon-wrapper {
  width: 58px;
  height: 58px;
  border-radius: 1.1rem;
  background: var(--color-primary);
  display: grid;
  place-items: center;
  margin-bottom: 1.75rem;
  box-shadow: var(--shadow-glow-primary);
  transition: transform 0.4s ease;

  .icon {
    width: 28px;
    height: 28px;
    color: var(--color-text-primary);
  }

  svg {
    color: var(--color-text-primary);
  }
}

.card:hover .icon-wrapper {
  transform: scale(1.05) rotate(-4deg);
}

/* TEXT */
.title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}


.description {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

/* HIGHLIGHTS */
.highlights {
  margin-top: 1.75rem;
  display: grid;
  gap: 0.6rem;

  li {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
    margin-right: 0.75rem;
  }
}

/* ANIMATION */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
