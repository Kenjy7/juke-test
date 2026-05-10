<template>
  <section class="tech-strip" ref="sectionRef">
    <div class="container reveal">
      <span class="strip-label">Gebouwd met</span>
      <div class="logos">
        <span v-for="tech in techs" :key="tech" class="logo-item">{{ tech }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sectionRef = ref(null);

const techs = ['Claude AI', 'OpenAI', 'Vue.js', 'Node.js', 'Python', 'Netlify'];

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.3 });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<style scoped lang="scss">
.tech-strip {
  padding: var(--space-8) var(--space-8) var(--space-4);
}

.container {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.strip-label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-weight: var(--weight-medium);
  white-space: nowrap;
  flex-shrink: 0;
}

.logos {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  overflow-x: auto;
  flex: 1;
  justify-content: flex-end;

  &::-webkit-scrollbar { display: none; }
}

.logo-item {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  white-space: nowrap;
  opacity: 0.6;
  transition: opacity var(--duration-fast) var(--ease-smooth);
  letter-spacing: 0.02em;

  &:hover { opacity: 1; }
}

@media (max-width: 768px) {
  .tech-strip { padding: var(--space-4); }

  .container {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }

  .logos {
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-4) var(--space-6);
  }
}
</style>
