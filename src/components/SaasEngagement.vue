<template>
  <section class="engagement band--sunken" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
      </header>

      <div class="cards">
        <article
          v-for="(m, i) in models"
          :key="m.name"
          class="card reveal"
          :class="[`reveal-delay-${i + 1}`, { 'card--featured': m.featured }]"
        >
          <span v-if="m.featured" class="card__badge">{{ t('popular') }}</span>
          <h3>{{ m.name }}</h3>
          <p class="card__price">{{ m.price }}</p>
          <p class="card__desc">{{ m.desc }}</p>
          <ul class="card__list">
            <li v-for="f in m.features" :key="f"><Check :size="15" :stroke-width="2.5" />{{ f }}</li>
          </ul>
        </article>
      </div>

      <p class="engagement__foot reveal">{{ t('foot') }}</p>

      <div class="engagement__cta reveal">
        <router-link to="/contact" class="btn btn--accent btn--lg">
          {{ t('cta') }}
          <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 12L12 4M12 4H5M12 4V11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Samenwerking',
      title: 'Een traject dat bij je past',
      lead: 'Of je nu een idee wilt valideren of een bestaand platform wilt laten doorgroeien, we werken transparant en op maat.',
      popular: 'Meest gekozen',
      cta: 'Bespreek je project',
      foot: 'Elk traject start met een vrijblijvend gesprek. Daarna volgt een voorstel op maat, transparant begroot per fase.',
      m1n: 'MVP-sprint', m1p: 'Vaste prijs', m1d: 'In enkele weken van idee naar een werkend prototype dat je kunt tonen en testen.',
      m1a: 'Discovery & scope', m1b: 'Klikbaar prototype', m1c: 'Werkende kern-MVP', m1e: 'Klaar om te valideren',
      m2n: 'Vast project', m2p: 'Op maat begroot', m2d: 'Een afgebakend platform van A tot Z gebouwd, opgeleverd en overgedragen.',
      m2a: 'Volledig ontwerp & build', m2b: 'Koppelingen met je tools', m2c: 'Testing & livegang', m2e: 'Code-overdracht, geen lock-in',
      m3n: 'Maandelijkse begeleiding', m3p: 'Maandelijks', m3d: 'Doorlopende doorontwikkeling, onderhoud en support voor een groeiend platform.',
      m3a: 'Nieuwe features per sprint', m3b: 'Onderhoud & monitoring', m3c: 'Vast aanspreekpunt', m3e: 'Opzegbaar, jouw tempo',
    },
    en: {
      eyebrow: 'Working together',
      title: 'An engagement that fits',
      lead: 'Whether you want to validate an idea or grow an existing platform, we work transparently and tailored to you.',
      popular: 'Most chosen',
      cta: 'Discuss your project',
      foot: 'Every engagement starts with a no-obligation chat. A tailored proposal follows, quoted transparently per phase.',
      m1n: 'MVP sprint', m1p: 'Fixed price', m1d: 'From idea to a working prototype you can show and test, in a few weeks.',
      m1a: 'Discovery & scope', m1b: 'Clickable prototype', m1c: 'Working core MVP', m1e: 'Ready to validate',
      m2n: 'Fixed project', m2p: 'Quoted custom', m2d: 'A defined platform built, delivered and handed over from A to Z.',
      m2a: 'Full design & build', m2b: 'Integrations with your tools', m2c: 'Testing & go-live', m2e: 'Code handover, no lock-in',
      m3n: 'Monthly support', m3p: 'Monthly', m3d: 'Ongoing development, maintenance and support for a growing platform.',
      m3a: 'New features per sprint', m3b: 'Maintenance & monitoring', m3c: 'Dedicated contact', m3e: 'Cancellable, at your pace',
    },
  },
})

const models = computed(() => [
  { name: t('m1n'), price: t('m1p'), desc: t('m1d'), features: [t('m1a'), t('m1b'), t('m1c'), t('m1e')] },
  { name: t('m2n'), price: t('m2p'), desc: t('m2d'), features: [t('m2a'), t('m2b'), t('m2c'), t('m2e')], featured: true },
  { name: t('m3n'), price: t('m3p'), desc: t('m3d'), features: [t('m3a'), t('m3b'), t('m3c'), t('m3e')] },
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
.engagement { padding: var(--section-pad-y) var(--space-8); }
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

.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); align-items: stretch; }
.card {
  position: relative; display: flex; flex-direction: column;
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-8) var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover { border-color: var(--color-border-hover); transform: translateY(-4px); box-shadow: var(--shadow-elevated); }
.card--featured { border-color: var(--color-primary); }
.card__badge {
  position: absolute; top: 0; right: var(--space-6); transform: translateY(-50%);
  font-size: 0.625rem; font-weight: var(--weight-semibold); letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--color-text-on-accent); background: var(--color-primary);
  border-radius: var(--radius-full); padding: 0.25rem 0.6rem;
}
.card h3 {
  font-size: var(--text-h3); font-weight: var(--weight-semibold); color: var(--color-text-primary);
  margin: 0 0 var(--space-2); letter-spacing: var(--tracking-tight);
}
.card__price { font-size: var(--text-body); font-weight: var(--weight-semibold); color: var(--color-primary); margin: 0 0 var(--space-4); }
.card__desc { font-size: var(--text-small); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0 0 var(--space-6); }
.card__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); margin-top: auto; }
.card__list li {
  display: flex; align-items: flex-start; gap: var(--space-3);
  font-size: var(--text-small); color: var(--color-text-primary);
  svg { flex-shrink: 0; margin-top: 2px; color: var(--color-primary); }
}

.engagement__foot {
  text-align: center; max-width: 56ch; margin: var(--space-12) auto 0;
  font-size: var(--text-small); color: var(--color-text-tertiary); line-height: var(--leading-relaxed);
}
.engagement__cta { display: flex; justify-content: center; margin-top: var(--space-8); }

@media (max-width: 900px) {
  .cards { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .engagement { padding: var(--section-pad-y) var(--space-5); }
  .section-head { margin-bottom: var(--space-12); }
}
</style>
