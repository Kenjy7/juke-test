<template>
  <section class="seo band--sunken" ref="sectionRef">
    <div class="container">
      <header class="section-head reveal">
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
      </header>

      <ul class="facts">
        <li
          v-for="(f, i) in facts"
          :key="f.title"
          class="fact reveal"
          :style="{ transitionDelay: `${i * 0.04}s` }"
        >
          <span class="fact__icon" aria-hidden="true">
            <component :is="f.icon" :size="20" :stroke-width="1.75" />
          </span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Zap, Smartphone, MapPin, ListTree, TrendingUp } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      title: 'Waarom SEO bepaalt of je gevonden wordt',
      lead: 'Een prachtige website is waardeloos als niemand hem vindt. Daarom bouwen we elke site op een technisch SEO-fundament.',
      f1t: 'Bijna niemand gaat naar pagina 2', f1d: 'De meeste mensen klikken op een van de eerste resultaten. Niet vindbaar zijn betekent voor nieuwe klanten dat je niet bestaat.',
      f2t: 'Snelheid is een rankingfactor', f2d: 'Google gebruikt laadsnelheid en Core Web Vitals mee om te bepalen wie bovenaan komt. Een snelle site scoort beter.',
      f3t: 'Google kijkt naar je mobiele versie', f3d: 'Met mobile-first indexering beoordeelt Google je site op de mobiele weergave. Werkt die slecht, dan zakt je positie.',
      f4t: 'Lokaal vindbaar wint klanten', f4d: 'Voor een KMO bepaalt een zoekopdracht als "webdesign Hasselt" of je gevonden wordt. Lokale signalen tellen zwaar mee.',
      f5t: 'Structuur bepaalt of Google je snapt', f5d: 'Heldere koppen, schone code en een logische opbouw helpen Google begrijpen waar je pagina over gaat.',
      f6t: 'SEO stopt niet als je stopt met betalen', f6d: 'Anders dan advertenties verdwijnt SEO-verkeer niet zodra je budget op is. Het bouwt op en blijft klanten opleveren.',
    },
    en: {
      title: 'Why SEO decides whether you get found',
      lead: 'A beautiful website is worthless if no one finds it. That is why we build every site on a technical SEO foundation.',
      f1t: 'Almost no one reaches page 2', f1d: 'Most people click one of the first results. For new customers, not being found means you simply do not exist.',
      f2t: 'Speed is a ranking factor', f2d: 'Google uses load speed and Core Web Vitals to help decide who ranks at the top. A fast site scores better.',
      f3t: 'Google looks at your mobile version', f3d: 'With mobile-first indexing, Google judges your site on the mobile view. If that performs poorly, your ranking drops.',
      f4t: 'Local visibility wins customers', f4d: 'For a small business, a search like "web design Hasselt" decides whether you get found. Local signals matter a lot.',
      f5t: 'Structure decides if Google gets you', f5d: 'Clear headings, clean code and a logical layout help Google understand what your page is about.',
      f6t: 'SEO does not stop when you stop paying', f6d: 'Unlike ads, SEO traffic does not vanish when your budget runs out. It compounds and keeps bringing in customers.',
    },
  },
})

const facts = computed(() => [
  { icon: Search, title: t('f1t'), desc: t('f1d') },
  { icon: Zap, title: t('f2t'), desc: t('f2d') },
  { icon: Smartphone, title: t('f3t'), desc: t('f3d') },
  { icon: MapPin, title: t('f4t'), desc: t('f4d') },
  { icon: ListTree, title: t('f5t'), desc: t('f5d') },
  { icon: TrendingUp, title: t('f6t'), desc: t('f6d') },
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
.seo { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.section-head { max-width: 720px; margin: 0 auto var(--space-16); text-align: center; }
.section-head h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance;
}
.lead { margin: var(--space-5) auto 0; max-width: 60ch; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

.facts {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
}
.fact {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-8) var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.fact:hover { border-color: var(--color-border-hover); transform: translateY(-4px); box-shadow: var(--shadow-elevated); }
.fact__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: var(--radius-md); margin-bottom: var(--space-5);
  color: var(--color-primary); background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}
.fact h3 {
  font-size: var(--text-h3); font-weight: var(--weight-semibold); color: var(--color-text-primary);
  margin: 0 0 var(--space-3); letter-spacing: var(--tracking-tight); text-wrap: balance;
}
.fact p { font-size: var(--text-small); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .facts { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .seo { padding: var(--section-pad-y) var(--space-5); }
  .section-head { margin-bottom: var(--space-12); }
}
@media (max-width: 560px) {
  .facts { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
}
</style>
