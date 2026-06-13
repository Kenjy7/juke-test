<template>
  <section class="wd-seo" ref="sectionRef">
    <div class="container">
      <header class="wd-seo__head reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="wd-seo__lead">{{ t('lead') }}</p>
      </header>

      <ul class="facts">
        <li
          v-for="(fact, i) in facts"
          :key="i"
          class="fact reveal"
          :style="{ transitionDelay: `${i * 0.06}s` }"
        >
          <span class="fact__icon" aria-hidden="true">
            <component :is="fact.icon" :size="20" :stroke-width="1.75" />
          </span>
          <div class="fact__text">
            <h3>{{ fact.title }}</h3>
            <p>{{ fact.body }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Gauge, Smartphone, MapPin, FileText, TrendingUp } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'SEO',
      title: 'Waarom SEO bepaalt of je gevonden wordt',
      lead: 'Een prachtige website is waardeloos als niemand hem vindt. Dit zijn de dingen die bepalen of jij bovenaan staat of onvindbaar bent.',
      f1t: 'Bijna niemand gaat naar pagina 2',
      f1d: 'De meeste mensen klikken op een van de eerste resultaten en kijken nooit verder. Niet vindbaar zijn betekent voor nieuwe klanten dat je niet bestaat.',
      f2t: 'Snelheid is een rankingfactor',
      f2d: 'Google gebruikt laadsnelheid en Core Web Vitals mee om te bepalen wie bovenaan komt. Een snelle site scoort beter en houdt bezoekers vast.',
      f3t: 'Google kijkt naar je mobiele versie',
      f3d: 'Met mobile-first indexering beoordeelt Google je site op de mobiele weergave. Werkt die slecht, dan zakt je positie, ook voor desktopgebruikers.',
      f4t: 'Lokaal vindbaar wint klanten',
      f4d: 'Voor een KMO bepaalt een zoekopdracht als "webdesign Hasselt" of je gevonden wordt. Een goed Google Bedrijfsprofiel en lokale signalen tellen zwaar mee.',
      f5t: 'Structuur bepaalt of Google je snapt',
      f5d: 'Heldere koppen, schone code en een logische opbouw helpen Google begrijpen waar je pagina over gaat. Techniek en inhoud bepalen samen je positie.',
      f6t: 'SEO stopt niet als je stopt met betalen',
      f6d: 'Anders dan advertenties verdwijnt SEO-verkeer niet zodra je budget op is. Het bouwt op en blijft klanten opleveren, ook op de lange termijn.',
    },
    en: {
      eyebrow: 'SEO',
      title: 'Why SEO decides whether you get found',
      lead: 'A beautiful website is worthless if no one finds it. These are the things that decide whether you rank at the top or stay invisible.',
      f1t: 'Almost no one reaches page 2',
      f1d: 'Most people click one of the first results and never look further. For new customers, not being found means you simply do not exist.',
      f2t: 'Speed is a ranking factor',
      f2d: 'Google uses load speed and Core Web Vitals to help decide who ranks at the top. A fast site scores better and keeps visitors around.',
      f3t: 'Google looks at your mobile version',
      f3d: 'With mobile-first indexing, Google judges your site on the mobile view. If that performs poorly, your ranking drops, even for desktop users.',
      f4t: 'Local visibility wins customers',
      f4d: 'For a small business, a search like "web design Hasselt" decides whether you get found. A strong Google Business Profile and local signals matter a lot.',
      f5t: 'Structure decides if Google gets you',
      f5d: 'Clear headings, clean code and a logical layout help Google understand what your page is about. Tech and content together set your ranking.',
      f6t: 'SEO does not stop when you stop paying',
      f6d: 'Unlike ads, SEO traffic does not vanish the moment your budget runs out. It compounds and keeps bringing customers over the long term.',
    },
  },
})

const facts = computed(() => [
  { icon: Search, title: t('f1t'), body: t('f1d') },
  { icon: Gauge, title: t('f2t'), body: t('f2d') },
  { icon: Smartphone, title: t('f3t'), body: t('f3d') },
  { icon: MapPin, title: t('f4t'), body: t('f4d') },
  { icon: FileText, title: t('f5t'), body: t('f5d') },
  { icon: TrendingUp, title: t('f6t'), body: t('f6d') },
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
.wd-seo { padding: var(--section-pad-y) var(--space-8); background: var(--color-bg-sunken); }
.container { max-width: var(--max-width); margin: 0 auto; }

.wd-seo__head { max-width: 680px; margin: 0 auto var(--space-12); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: var(--space-4);
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.wd-seo__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0; text-wrap: balance;
}
.wd-seo__lead {
  margin: var(--space-5) auto 0; font-size: var(--text-body-lg); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 58ch;
}

/* ── Two-column fact list — accent-led rows (distinct from the icon-top cards) ── */
.facts {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-5);
}
.fact {
  display: grid; grid-template-columns: 44px 1fr; gap: var(--space-4); align-items: start;
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-primary);
  border-radius: var(--radius-lg); padding: var(--space-5) var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.fact:hover { border-color: var(--color-border-hover); border-left-color: var(--color-primary); transform: translateY(-3px); box-shadow: var(--shadow-elevated); }
.fact__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: var(--radius-md);
  color: var(--color-primary); background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}
.fact__text { min-width: 0; }
.fact h3 {
  font-family: var(--font-display); font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-1);
  line-height: var(--leading-snug);
}
.fact p { font-size: var(--text-body); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 860px) {
  .facts { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .wd-seo { padding: var(--section-pad-y) var(--space-5); }
}
</style>
