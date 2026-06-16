<template>
  <section class="process" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
      </header>

      <ol class="timeline" :aria-label="t('title')">
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="step-card reveal"
          :class="[`reveal-delay-${i + 1}`]"
        >
          <span class="step-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="step-body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
          <span class="step-connector" aria-hidden="true"></span>
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
      eyebrow: 'Hoe we werken',
      title: 'Van idee tot werkend platform',
      lead: 'Een vast, transparant traject in vijf fases. Je weet altijd waar we staan en wat de volgende stap is.',
      s1t: 'Discovery', s1d: 'We brengen je idee, gebruikers en doelen in kaart en bepalen de scope. Je krijgt een helder voorstel met fasering en begroting.',
      s2t: 'Ontwerp & prototype', s2d: 'Wireframes en een klikbaar prototype zodat je het platform ziet en voelt voordat er een regel productiecode is geschreven.',
      s3t: 'Bouw', s3d: 'We bouwen in korte sprints met een moderne, schaalbare stack. Je volgt de voortgang en test elke fase mee.',
      s4t: 'Lancering', s4d: 'Testing, koppelingen en livegang. We zetten alles veilig in productie en dragen de code en documentatie aan je over.',
      s5t: 'Onderhoud & groei', s5d: 'Na livegang blijven we beschikbaar voor updates, nieuwe features en doorontwikkeling, zo groeit je platform mee.',
    },
    en: {
      eyebrow: 'How we work',
      title: 'From idea to working platform',
      lead: 'One transparent path in five phases. You always know where we stand and what comes next.',
      s1t: 'Discovery', s1d: 'We map your idea, users and goals and lock down the scope. You get a clear proposal with phasing and a budget.',
      s2t: 'Design & prototype', s2d: 'Wireframes and a clickable prototype so you see and feel the platform before a line of production code is written.',
      s3t: 'Build', s3d: 'We build in short sprints on a modern, scalable stack. You follow progress and test along every phase.',
      s4t: 'Launch', s4d: 'Testing, integrations and go-live. We ship everything to production safely and hand over the code and documentation.',
      s5t: 'Maintenance & growth', s5d: 'After launch we stay available for updates, new features and further development, so your platform grows with you.',
    },
  },
})

const steps = computed(() => [
  { title: t('s1t'), desc: t('s1d') },
  { title: t('s2t'), desc: t('s2d') },
  { title: t('s3t'), desc: t('s3d') },
  { title: t('s4t'), desc: t('s4d') },
  { title: t('s5t'), desc: t('s5d') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.process { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.section-head { max-width: 720px; margin: 0 auto var(--space-16); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.section-head h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance;
}
.lead { margin: var(--space-5) auto 0; max-width: 60ch; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

.timeline {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-5); position: relative;
}
.step-card {
  position: relative; display: flex; flex-direction: column;
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-8) var(--space-6) var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover); transform: translateY(-4px); box-shadow: var(--shadow-elevated);
    .step-index { color: var(--color-accent); }
  }
  &:last-child .step-connector { display: none; }
}
.step-index {
  display: block; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: var(--weight-bold);
  color: var(--color-text-tertiary); line-height: 1; letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-5); transition: color var(--transition-base);
}
.step-body { flex: 1; }
.step-card h3 {
  font-size: var(--text-h3); font-weight: var(--weight-semibold); color: var(--color-text-primary);
  margin: 0 0 var(--space-3); letter-spacing: var(--tracking-tight); text-wrap: balance;
}
.step-card p { font-size: var(--text-small); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.step-connector {
  position: absolute; top: calc(var(--space-8) + 1.4rem);
  right: calc(-1 * var(--space-5) / 2 - 0.5px); width: var(--space-5); height: 1px;
  background: var(--color-border); pointer-events: none; z-index: 1;
}

@media (max-width: 1100px) {
  .timeline { grid-template-columns: repeat(3, 1fr); }
  .step-card:nth-child(3) .step-connector, .step-card:last-child .step-connector { display: none; }
}
@media (max-width: 768px) {
  .process { padding: var(--section-pad-y) var(--space-5); }
  .section-head { margin-bottom: var(--space-12); }
  .timeline { grid-template-columns: 1fr 1fr; gap: var(--space-4); }
  .step-connector { display: none; }
  .step-index { font-size: 2rem; }
}
@media (max-width: 480px) {
  .timeline { grid-template-columns: 1fr; }
}
</style>
