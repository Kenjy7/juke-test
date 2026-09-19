<template>
  <section class="scope" ref="sectionRef">
    <div class="container">
      <header class="scope__head reveal">
        <h2>{{ t('title') }}</h2>
        <p class="scope__lead">{{ t('lead') }}</p>
      </header>

      <ul class="scope-grid">
        <li
          v-for="(c, i) in cards"
          :key="c.title"
          class="scope-card reveal"
          :style="{ transitionDelay: `${i * 0.04}s` }"
        >
          <span class="scope-card__icon" aria-hidden="true">
            <component :is="c.icon" :size="20" :stroke-width="1.75" />
          </span>
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
        </li>
      </ul>

      <div class="scope-more reveal">
        <span class="scope-more__text">{{ t('moreText') }}</span>
        <router-link :to="{ path: '/contact', query: { interesse: 'webdesign' } }" class="scope-more__link">
          {{ t('moreCta') }}
          <ArrowRight :size="16" :stroke-width="2" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PenTool, Gauge, Smartphone, KeyRound, MousePointerClick, RefreshCw, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      title: 'Wat een goede website echt bepaalt',
      lead: 'Een website is meer dan hoe hij eruitziet. Dit zijn de dingen die het verschil maken tussen een digitaal visitekaartje en een site die klanten oplevert.',
      c1t: 'Maatwerk, geen template', c1d: 'Elke site bouwen we specifiek voor jouw bedrijf. Je zit niet vast aan een thema dat duizenden anderen ook gebruiken.',
      c2t: 'Snelheid telt mee', c2d: 'Een trage site jaagt bezoekers weg en scoort slechter in Google. We bouwen op snelheid, zodat pagina\'s meteen laden.',
      c3t: 'Mobiel eerst', c3d: 'Het grootste deel van je bezoekers komt via een telefoon. We ontwerpen mobiel-eerst, zodat je site daar net zo goed werkt.',
      c4t: 'Van jou, geen lock-in', c4d: 'De website is jouw eigendom. Geen leverancier waar je voor altijd aan vastzit om online te blijven.',
      c5t: 'Gebouwd om te converteren', c5d: 'Een mooie site is niet genoeg. We ontwerpen rond één doel: bezoekers omzetten in aanvragen, afspraken of verkopen.',
      c6t: 'Onderhoud en groei', c6d: 'Een website is nooit af. We houden hem veilig en up-to-date en laten hem meegroeien met je bedrijf.',
      moreText: 'Twijfel je wat jouw website nodig heeft?',
      moreCta: 'Plan een kennismaking',
    },
    en: {
      title: 'What actually makes a website good',
      lead: 'A website is more than how it looks. These are the things that separate a digital business card from a site that brings in customers.',
      c1t: 'Custom, not a template', c1d: 'We build every site specifically for your business. You are not locked into a theme thousands of others use.',
      c2t: 'Speed matters', c2d: 'A slow site drives visitors away and ranks worse in Google. We build for speed, so pages load instantly.',
      c3t: 'Mobile first', c3d: 'Most of your visitors arrive on a phone. We design mobile first, so your site works just as well there.',
      c4t: 'Yours, no lock-in', c4d: 'The website is your property. No vendor you are stuck with forever just to stay online.',
      c5t: 'Built to convert', c5d: 'A pretty site is not enough. We design around one goal: turning visitors into enquiries, bookings or sales.',
      c6t: 'Maintenance and growth', c6d: 'A website is never finished. We keep it secure and up to date and let it grow with your business.',
      moreText: 'Not sure what your website needs?',
      moreCta: 'Book an intro call',
    },
  },
})

const cards = computed(() => [
  { icon: PenTool, title: t('c1t'), desc: t('c1d') },
  { icon: Gauge, title: t('c2t'), desc: t('c2d') },
  { icon: Smartphone, title: t('c3t'), desc: t('c3d') },
  { icon: KeyRound, title: t('c4t'), desc: t('c4d') },
  { icon: MousePointerClick, title: t('c5t'), desc: t('c5d') },
  { icon: RefreshCw, title: t('c6t'), desc: t('c6d') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.scope { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.scope__head { max-width: 720px; margin: 0 auto var(--space-12); text-align: center; }
.scope__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0; text-wrap: balance;
}
.scope__lead {
  margin: var(--space-5) auto 0; font-size: var(--text-body-lg); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 60ch;
}

.scope-grid {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);
}
.scope-card {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.scope-card:hover { border-color: var(--color-border-hover); transform: translateY(-3px); box-shadow: var(--shadow-elevated); }
.scope-card__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: var(--radius-md); margin-bottom: var(--space-4);
  color: var(--color-primary); background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}
.scope-card h3 {
  font-family: var(--font-display); font-size: var(--text-body); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-1);
}
.scope-card p { font-size: var(--text-small); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.scope-more {
  margin-top: var(--space-8); padding: var(--space-6) var(--space-8);
  border: 1px dashed var(--color-primary-border); border-radius: var(--radius-lg);
  background: var(--color-primary-subtle);
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: var(--space-3) var(--space-5);
  text-align: center;
}
.scope-more__text { font-size: var(--text-body-lg); font-weight: var(--weight-medium); color: var(--color-text-primary); }
.scope-more__link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: var(--text-body); font-weight: var(--weight-semibold); color: var(--color-primary);
  text-decoration: none; white-space: nowrap;
  svg { transition: transform var(--transition-base); }
  &:hover svg { transform: translateX(3px); }
}

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .scope-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .scope { padding: var(--section-pad-y) var(--space-5); }
  .scope-more { flex-direction: column; gap: var(--space-3); }
}
@media (max-width: 460px) {
  .scope-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
}
</style>
