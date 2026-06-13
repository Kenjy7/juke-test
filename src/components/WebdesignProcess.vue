<template>
  <section id="stappen-webdesign" class="wd-process" ref="sectionRef">
    <div class="container">
      <header class="wd-process__head reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="wd-process__lead">{{ t('intro') }}</p>
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
            <span class="tl-meta">{{ step.meta }}</span>
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
      eyebrow: 'Hoe we werken',
      title: 'Van idee tot website die werkt',
      intro: 'Elke website bouwen we op maat van jouw bedrijf. Geen vast stappenplan dat we erdoor jagen, maar een heldere aanpak waarin je precies weet wat er gebeurt.',
      s1m: 'Intake',
      s1t: 'Strategie & doelen',
      s1d: 'We bepalen samen je doel, je doelgroep en wat de website concreet moet opleveren. Geen aannames, wel een helder plan voordat er iets gebouwd wordt.',
      s2m: 'Ontwerp',
      s2t: 'Design op maat',
      s2d: 'We ontwerpen een uniek design dat bij jouw merk past en je bezoekers overtuigt. Geen kant-en-klaar template dat duizenden anderen ook gebruiken.',
      s3m: 'Bouw',
      s3t: 'Snel en SEO-proof bouwen',
      s3d: 'We bouwen je site met schone code: razendsnel, mobielvriendelijk en technisch geoptimaliseerd zodat Google je goed begrijpt en je bezoekers blijven.',
      s4m: 'Livegang',
      s4t: 'Lancering en nazorg',
      s4d: 'We zetten je website live en blijven beschikbaar voor updates, verbeteringen en groei. Een website is nooit echt af en wij laten hem meegroeien.',
    },
    en: {
      eyebrow: 'How we work',
      title: 'From idea to a website that works',
      intro: 'We build every website around your business. No rigid checklist we push you through, just a clear approach where you always know what is happening.',
      s1m: 'Intake',
      s1t: 'Strategy & goals',
      s1d: 'Together we set your goal, your audience and what the website should actually deliver. No assumptions, just a clear plan before anything gets built.',
      s2m: 'Design',
      s2t: 'Custom design',
      s2d: 'We design something unique that fits your brand and convinces your visitors. No off-the-shelf template that thousands of others use too.',
      s3m: 'Build',
      s3t: 'Fast and SEO-proof build',
      s3d: 'We build your site with clean code: lightning fast, mobile friendly and technically optimised so Google understands you and visitors stick around.',
      s4m: 'Launch',
      s4t: 'Launch and aftercare',
      s4d: 'We take your website live and stay available for updates, improvements and growth. A website is never truly finished, and we keep yours growing.',
    },
  },
})

const steps = computed(() => [
  { meta: t('s1m'), title: t('s1t'), desc: t('s1d') },
  { meta: t('s2m'), title: t('s2t'), desc: t('s2d') },
  { meta: t('s3m'), title: t('s3t'), desc: t('s3d') },
  { meta: t('s4m'), title: t('s4t'), desc: t('s4d') },
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
.wd-process { padding: var(--section-pad-y) var(--space-8); }
.container {
  max-width: var(--max-width); margin: 0 auto;
  display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--space-16); align-items: start;
}

.wd-process__head { position: sticky; top: var(--space-20); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.wd-process__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance; max-width: 16ch;
}
.wd-process__lead {
  margin: var(--space-5) 0 0; font-size: var(--text-body); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 44ch;
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
.tl-meta {
  display: inline-block; font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-primary); letter-spacing: var(--tracking-wide); text-transform: uppercase;
  margin-bottom: var(--space-2);
}
.tl-card h3 {
  font-family: var(--font-display); font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-2);
}
.tl-card p { font-size: var(--text-body); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

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

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: var(--space-10); }
  .wd-process__head { position: static; }
  .wd-process__head h2 { max-width: 18ch; }
  .wd-process__lead { max-width: 60ch; }
}
@media (max-width: 768px) {
  .wd-process { padding: var(--section-pad-y) var(--space-5); }
  .tl-step { grid-template-columns: 40px 1fr; gap: var(--space-4); }
  .tl-step:not(:last-child)::before { left: 19px; }
  .tl-node { width: 40px; height: 40px; font-size: 0.875rem; }
}
</style>
