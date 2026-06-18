<template>
  <section class="approach" ref="sectionRef">
    <div class="container">
      <header class="approach__head reveal">
        <h2>{{ t('title') }}</h2>
        <p class="approach__lead">{{ t('intro') }}</p>
      </header>

      <ol class="timeline" :aria-label="t('title')">
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="tl-step reveal"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="tl-marker">
            <span class="tl-node" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="tl-card">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Onze aanpak',
      title: 'Hoe Juke helpt',
      intro: 'Juke helpt Belgische bedrijven om repetitief werk te automatiseren. We brengen je processen in kaart, bouwen slimme workflows en AI-agents, en blijven ze optimaliseren zodat ze meegroeien met je bedrijf.',
      s1t: 'Analyse van bedrijfsprocessen',
      s1d: 'We identificeren knelpunten en kansen voor automatisering.',
      s2t: 'Ontwerp en implementatie',
      s2d: 'We ontwerpen en implementeren geautomatiseerde workflows en AI-agents.',
      s3t: 'Training en adoptie',
      s3d: 'We trainen medewerkers om de nieuwe automatiserings- en AI-tools effectief te gebruiken.',
      s4t: 'Optimalisatie en ondersteuning',
      s4d: 'We bieden doorlopende ondersteuning om processen verder te verbeteren.',
    },
    en: {
      eyebrow: 'Our approach',
      title: 'How Juke helps',
      intro: 'Juke helps Belgian businesses automate repetitive work. We map your processes, build smart workflows and AI agents, and keep optimising them so they grow with your business.',
      s1t: 'Analysis of business processes',
      s1d: 'We identify bottlenecks and opportunities for automation.',
      s2t: 'Design and implementation',
      s2d: 'We design and implement automated workflows and AI agents.',
      s3t: 'Training and adoption',
      s3d: 'We train your team to use the new automation and AI tools effectively.',
      s4t: 'Optimisation and support',
      s4d: 'We provide ongoing support to keep improving your processes.',
    },
  },
})

const steps = computed(() => [
  { title: t('s1t'), desc: t('s1d') },
  { title: t('s2t'), desc: t('s2d') },
  { title: t('s3t'), desc: t('s3d') },
  { title: t('s4t'), desc: t('s4d') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.approach { padding: var(--section-pad-y) var(--space-8); }
.container {
  max-width: var(--max-width); margin: 0 auto;
  display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--space-16); align-items: start;
}

.approach__head { position: sticky; top: var(--space-20); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.approach__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance; max-width: 14ch;
}
.approach__lead {
  margin: var(--space-5) 0 0; font-size: var(--text-body); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 42ch;
}

/* ── Vertical timeline of cards ── */
.timeline { list-style: none; margin: 0; padding: 0; }
.tl-step {
  position: relative; display: grid; grid-template-columns: 46px 1fr; gap: var(--space-5);
  padding-bottom: var(--space-6);
}
.tl-step:not(:last-child)::before {
  content: ''; position: absolute; left: 22px; top: 52px; bottom: -4px;
  width: 2px; background: var(--color-primary-border); border-radius: 2px;
}
.tl-marker { display: flex; justify-content: center; }
.tl-node {
  width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 0.9375rem; font-weight: var(--weight-semibold);
  color: var(--color-text-on-accent); background: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-subtle);
  position: relative; z-index: 1;
}
.tl-card {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-5) var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.tl-card:hover { border-color: var(--color-border-hover); transform: translateY(-3px); box-shadow: var(--shadow-elevated); }
.tl-card h3 {
  font-family: var(--font-display); font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-2);
}
.tl-card p { font-size: var(--text-body); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

/* ── Reveal motion: rail draws down + node pops in (reduced-motion safe) ── */
@media (prefers-reduced-motion: no-preference) {
  .tl-step:not(:last-child)::before { transform: scaleY(0); transform-origin: top; transition: transform 0.6s var(--ease-out-expo) 0.18s; }
  .tl-step.visible:not(:last-child)::before { transform: scaleY(1); }
  .tl-node { transform: scale(0.4); }
  .tl-step.visible .tl-node { animation: node-pop 0.55s var(--ease-spring) forwards; }
}
@keyframes node-pop {
  0% { transform: scale(0.4); box-shadow: 0 0 0 0 var(--color-primary-subtle); }
  55% { transform: scale(1.12); box-shadow: 0 0 0 10px var(--color-primary-subtle); }
  100% { transform: scale(1); box-shadow: 0 0 0 4px var(--color-primary-subtle); }
}

@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: var(--space-10); }
  .approach__head { position: static; }
  .approach__head h2 { max-width: 18ch; }
  .approach__lead { max-width: 60ch; }
}
@media (max-width: 768px) {
  .approach { padding: var(--section-pad-y) var(--space-5); }
  .tl-step { grid-template-columns: 40px 1fr; gap: var(--space-4); }
  .tl-step:not(:last-child)::before { left: 19px; }
  .tl-node { width: 40px; height: 40px; font-size: 0.875rem; }
}
</style>
