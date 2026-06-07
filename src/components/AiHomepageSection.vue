<template>
  <section class="stats-section band--sunken" ref="sectionRef">
    <div class="container">
      <h2 class="reveal">
        Technologie die meetbaar
        <span class="highlight">resultaat levert.</span>
      </h2>

      <div class="stats-shell reveal reveal-delay-1">
        <div class="stats-inner">
          <div v-for="(stat, index) in visibleStats" :key="`${stat.number}-${index}`" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-2" style="text-align: center;">
        <router-link to="/contact" class="cta-btn">
          <span>Bespreek wat AI voor jou kan doen</span>
          <span class="cta-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);

const stats = [
  { number: 'Tot 80%', label: 'Tijdsbesparing door automatisering' },
  { number: '24/7', label: 'Beschikbaar via AI-agents' },
  { number: '3x', label: 'Snellere doorlooptijd' },
  { number: '95%', label: 'Klanttevredenheid' },
  { number: '10x', label: 'Meer schaalbaarheid' },
  { number: '60%', label: 'Kostenreductie op processen' }
];

const currentStartIndex = ref(0);
let interval = null;

const visibleStats = computed(() => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentStartIndex.value + i) % stats.length;
    result.push(stats[index]);
  }
  return result;
});

onMounted(() => {
  interval = setInterval(() => {
    currentStartIndex.value = (currentStartIndex.value + 1) % stats.length;
  }, 3500);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

onUnmounted(() => { if (interval) clearInterval(interval); });
</script>

<style scoped lang="scss">
.stats-section {
  padding: var(--space-24) 0 var(--space-24);
}

.container {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  padding: 0 var(--space-8);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  text-align: center;
  margin: 0 0 var(--space-12) 0;
}

.highlight { color: var(--color-primary); }

/* Double-Bezel stats */
.stats-shell {
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 5px;
  margin-bottom: var(--space-12);
}

.stats-inner {
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-2xl) - 5px);
  box-shadow: var(--shadow-inner-highlight);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: var(--space-12) var(--space-8);
}

.stat-item {
  text-align: center;
  animation: slideIn 0.5s var(--ease-out-expo);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.stat-number {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: var(--weight-bold);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--weight-medium);
  letter-spacing: 0.01em;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.75rem 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  font-family: var(--font-sans);
  background: var(--color-primary);
  color: #fff;
  text-decoration: none;
  box-shadow: var(--shadow-glow-primary);
  transition: all var(--duration-slow) var(--ease-spring);

  .cta-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--duration-base) var(--ease-spring);
  }

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 0 60px var(--color-primary-glow);
    .cta-icon { transform: translate(1px, -1px) scale(1.08); }
  }

  &:active { transform: scale(0.97); }
}

@media (max-width: 768px) {
  .stats-section { padding: var(--space-16) 0; }
  .container { padding: 0 var(--space-4); }
  .stats-inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    padding: var(--space-8) var(--space-6);
  }
  .cta-btn { width: 100%; justify-content: center; }
}
</style>
