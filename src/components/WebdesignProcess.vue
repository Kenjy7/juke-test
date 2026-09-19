<template>
  <section class="process" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
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
      title: 'Van idee tot website die werkt',
      lead: 'Geen vast stappenplan dat we erdoor jagen, maar een heldere aanpak in vier fases. Je weet altijd wat er gebeurt.',
      s1t: 'Strategie & doelen', s1d: 'We bepalen samen je doel, je doelgroep en wat de website concreet moet opleveren. Een helder plan voordat er iets gebouwd wordt.',
      s2t: 'Design op maat', s2d: 'We ontwerpen een uniek design dat bij jouw merk past en je bezoekers overtuigt. Geen kant-en-klaar template.',
      s3t: 'Snel en SEO-proof bouwen', s3d: 'We bouwen met schone code: razendsnel, mobielvriendelijk en technisch geoptimaliseerd zodat Google je goed begrijpt.',
      s4t: 'Lancering en nazorg', s4d: 'We zetten je website live en blijven beschikbaar voor updates, verbeteringen en groei. Een website is nooit echt af.',
    },
    en: {
      title: 'From idea to a website that works',
      lead: 'No rigid checklist we push you through, just a clear approach in four phases. You always know what is happening.',
      s1t: 'Strategy & goals', s1d: 'Together we set your goal, your audience and what the website should actually deliver. A clear plan before anything gets built.',
      s2t: 'Custom design', s2d: 'We design something unique that fits your brand and convinces your visitors. No off-the-shelf template.',
      s3t: 'Fast, SEO-proof build', s3d: 'We build with clean code: lightning fast, mobile friendly and technically optimised so Google understands you.',
      s4t: 'Launch and aftercare', s4d: 'We take your website live and stay available for updates, improvements and growth. A website is never truly finished.',
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.process { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.section-head { max-width: 720px; margin: 0 auto var(--space-16); text-align: center; }
.section-head h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance;
}
.lead { margin: var(--space-5) auto 0; max-width: 60ch; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

.timeline {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); position: relative;
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
  .timeline { grid-template-columns: repeat(2, 1fr); }
  .step-card:nth-child(2) .step-connector { display: none; }
}
@media (max-width: 768px) {
  .process { padding: var(--section-pad-y) var(--space-5); }
  .section-head { margin-bottom: var(--space-12); }
  .timeline { gap: var(--space-4); }
  .step-connector { display: none; }
  .step-index { font-size: 2rem; }
}
@media (max-width: 480px) {
  .timeline { grid-template-columns: 1fr; }
}
</style>
