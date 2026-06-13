<template>
  <section class="scope" ref="sectionRef">
    <div class="container">
      <header class="scope__head reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
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
        <router-link :to="{ path: '/contact', query: { interesse: 'saas' } }" class="scope-more__link">
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
import { LayoutTemplate, LayoutDashboard, CalendarClock, ShoppingCart, Boxes, Workflow, Users, Plug, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Op maat, zonder grenzen',
      title: 'Wat we bouwen? Vrijwel alles wat jouw bedrijf nodig heeft.',
      lead: 'Geen vast pakket met vaste functies. We bouwen de software die jouw bedrijf nodig heeft. Dit is maar een greep.',
      c1t: 'Klantportalen', c1d: 'Waar klanten zelf hun zaken regelen.',
      c2t: 'Interne dashboards & tools', c2d: 'Overzicht en grip voor je team.',
      c3t: 'Planning & boekingen', c3d: 'Afspraken, capaciteit en agenda\'s.',
      c4t: 'Webshops & bestelplatformen', c4d: 'Verkopen of bestellen op maat.',
      c5t: 'Voorraad & orderbeheer', c5d: 'Van bestelling tot levering.',
      c6t: 'Workflow-automatisering', c6d: 'Repetitief werk dat zichzelf doet.',
      c7t: 'Ledenadministratie & CRM', c7d: 'Leden, klanten en hun historiek.',
      c8t: 'Koppelingen', c8d: 'Je bestaande tools met elkaar verbonden.',
      moreText: 'Staat jouw idee er niet tussen? Grote kans dat we het bouwen.',
      moreCta: 'Bespreek je idee',
    },
    en: {
      eyebrow: 'Custom, without limits',
      title: 'What do we build? Almost anything your business needs.',
      lead: 'No fixed package with fixed features. We build the software your business needs. These are just a few examples.',
      c1t: 'Customer portals', c1d: 'Where clients handle things themselves.',
      c2t: 'Internal dashboards & tools', c2d: 'Overview and grip for your team.',
      c3t: 'Planning & bookings', c3d: 'Appointments, capacity and calendars.',
      c4t: 'Webshops & order platforms', c4d: 'Selling or ordering, tailor-made.',
      c5t: 'Stock & order management', c5d: 'From order to delivery.',
      c6t: 'Workflow automation', c6d: 'Repetitive work that runs itself.',
      c7t: 'Membership & CRM', c7d: 'Members, customers and their history.',
      c8t: 'Integrations', c8d: 'Your existing tools, connected.',
      moreText: 'Don\'t see your idea? Chances are we can build it.',
      moreCta: 'Tell us your idea',
    },
  },
})

const cards = computed(() => [
  { icon: LayoutTemplate, title: t('c1t'), desc: t('c1d') },
  { icon: LayoutDashboard, title: t('c2t'), desc: t('c2d') },
  { icon: CalendarClock, title: t('c3t'), desc: t('c3d') },
  { icon: ShoppingCart, title: t('c4t'), desc: t('c4d') },
  { icon: Boxes, title: t('c5t'), desc: t('c5d') },
  { icon: Workflow, title: t('c6t'), desc: t('c6d') },
  { icon: Users, title: t('c7t'), desc: t('c7d') },
  { icon: Plug, title: t('c8t'), desc: t('c8d') },
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
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: var(--space-4);
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
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
  display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4);
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
