<template>
  <section class="wd-know" ref="sectionRef">
    <div class="container">
      <header class="wd-know__head reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="wd-know__lead">{{ t('lead') }}</p>
      </header>

      <ul class="grid">
        <li
          v-for="(card, i) in cards"
          :key="i"
          class="card reveal"
          :style="{ transitionDelay: `${i * 0.06}s` }"
        >
          <span class="card__icon" aria-hidden="true">
            <component :is="card.icon" :size="20" :stroke-width="1.75" />
          </span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Palette, Gauge, Smartphone, KeyRound, Target, Wrench } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Goed om te weten',
      title: 'Wat een goede website echt bepaalt',
      lead: 'Een website is meer dan hoe hij eruitziet. Dit zijn de dingen die het verschil maken tussen een digitaal visitekaartje en een site die klanten oplevert.',
      c1t: 'Maatwerk, geen template',
      c1d: 'Elke site bouwen we specifiek voor jouw bedrijf. Je zit niet vast aan een thema dat duizenden anderen ook gebruiken en je site lijkt op niemand anders.',
      c2t: 'Snelheid telt mee',
      c2d: 'Een trage site jaagt bezoekers weg en scoort slechter in Google. We bouwen op snelheid, zodat pagina\'s meteen laden op elk toestel.',
      c3t: 'Mobiel eerst',
      c3d: 'Het grootste deel van je bezoekers komt via een telefoon. We ontwerpen mobiel-eerst, zodat je site daar net zo goed werkt als op desktop.',
      c4t: 'Van jou, geen lock-in',
      c4d: 'De website is jouw eigendom. Geen verplichte dure abonnementen of leverancier waar je voor altijd aan vastzit om online te blijven.',
      c5t: 'Gebouwd om te converteren',
      c5d: 'Een mooie site is niet genoeg. We ontwerpen rond één doel: bezoekers omzetten in aanvragen, afspraken of verkopen.',
      c6t: 'Onderhoud en groei',
      c6d: 'Een website is nooit af. We houden hem veilig en up-to-date en laten hem meegroeien met je bedrijf in plaats van te verouderen.',
    },
    en: {
      eyebrow: 'Good to know',
      title: 'What actually makes a website good',
      lead: 'A website is more than how it looks. These are the things that separate a digital business card from a site that brings in customers.',
      c1t: 'Custom, not a template',
      c1d: 'We build every site specifically for your business. You are not locked into a theme thousands of others use, and your site looks like no one else.',
      c2t: 'Speed matters',
      c2d: 'A slow site drives visitors away and ranks worse in Google. We build for speed, so pages load instantly on every device.',
      c3t: 'Mobile first',
      c3d: 'Most of your visitors arrive on a phone. We design mobile first, so your site works just as well there as on desktop.',
      c4t: 'Yours, no lock-in',
      c4d: 'The website is your property. No mandatory expensive subscriptions or a vendor you are stuck with forever just to stay online.',
      c5t: 'Built to convert',
      c5d: 'A pretty site is not enough. We design around one goal: turning visitors into enquiries, bookings or sales.',
      c6t: 'Maintenance and growth',
      c6d: 'A website is never finished. We keep it secure and up to date and let it grow with your business instead of ageing.',
    },
  },
})

const cards = computed(() => [
  { icon: Palette, title: t('c1t'), body: t('c1d') },
  { icon: Gauge, title: t('c2t'), body: t('c2d') },
  { icon: Smartphone, title: t('c3t'), body: t('c3d') },
  { icon: KeyRound, title: t('c4t'), body: t('c4d') },
  { icon: Target, title: t('c5t'), body: t('c5d') },
  { icon: Wrench, title: t('c6t'), body: t('c6d') },
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
.wd-know { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.wd-know__head { max-width: 680px; margin: 0 auto var(--space-12); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: var(--space-4);
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.wd-know__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0; text-wrap: balance;
}
.wd-know__lead {
  margin: var(--space-5) auto 0; font-size: var(--text-body-lg); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 58ch;
}

.grid {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);
}
.card {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover { border-color: var(--color-border-hover); transform: translateY(-3px); box-shadow: var(--shadow-elevated); }
.card__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: var(--radius-md); margin-bottom: var(--space-4);
  color: var(--color-primary); background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}
.card h3 {
  font-family: var(--font-display); font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-2);
}
.card p { font-size: var(--text-body); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .wd-know { padding: var(--section-pad-y) var(--space-5); }
  .grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
</style>
