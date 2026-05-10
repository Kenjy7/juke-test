<template>
  <section class="short-answer" :aria-label="title">
    <div class="container">
      <div class="rule"></div>

      <div class="grid">
        <h2 class="title">{{ title }}</h2>

        <div class="content">
          <p class="text">
            <slot />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<style scoped lang="scss">
.short-answer {
  position: relative;
  padding: var(--space-12) 0 var(--space-8);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-8);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: var(--space-12);
  align-items: start;
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-snug);
  color: var(--color-text-primary);
}

.content {
  border-left: 1px solid var(--color-border-hover);
  padding-left: var(--space-6);
}

.text {
  margin: 0;
  max-width: 60ch;
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .content {
    padding-left: var(--space-4);
  }

  .text {
    max-width: 70ch;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }

  .short-answer {
    padding: var(--space-8) 0 var(--space-6);
  }

  .text {
    font-size: var(--text-body);
  }
}
</style>
