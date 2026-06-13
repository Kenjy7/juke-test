<template>
  <section class="ai-overview" ref="sectionRef">
    <div class="container">
      <div class="content reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
        <ul class="checks">
          <li v-for="c in checks" :key="c"><Check :size="16" :stroke-width="2.5" />{{ c }}</li>
        </ul>
      </div>

      <div class="visual reveal reveal-delay-1">
        <!-- Decorative product illustration: hidden from assistive tech, not tabbable -->
        <div class="mock" aria-hidden="true">
          <div class="mock__bar">
            <span class="tl"></span><span class="tl"></span><span class="tl"></span>
            <span class="mock__url code">{{ t('url') }}</span>
          </div>
          <div class="mock__chrome">
            <span class="mock__brand">{{ t('app') }}</span>
            <span class="mock__live"><span class="mock__dot"></span>{{ t('liveNow') }}</span>
            <span class="mock__avatar"><User :size="14" :stroke-width="2" /></span>
          </div>
          <div class="mock__body">
            <aside class="mock__side">
              <a v-for="n in nav" :key="n.label" class="navitem" :class="{ active: n.active }">
                <component :is="n.icon" :size="16" :stroke-width="2" /><span>{{ n.label }}</span>
              </a>
            </aside>
            <div class="mock__main">
              <div class="main__head">
                <span class="main__title">{{ t('flowsTitle') }}</span>
                <span class="pill-btn"><Plus :size="13" :stroke-width="2.5" />{{ t('newFlow') }}</span>
              </div>
              <div class="ftable">
                <div class="ftable__head">
                  <span>{{ t('thFlow') }}</span>
                  <span>{{ t('thStatus') }}</span>
                  <span class="ta-r">{{ t('thRun') }}</span>
                </div>
                <div class="frow" v-for="f in flows" :key="f.name">
                  <span class="frow__id">
                    <span class="frow__ic" :class="{ live: f.live }"><component :is="f.icon" :size="13" :stroke-width="2" /></span>
                    <span class="frow__text">
                      <span class="frow__name">{{ f.name }}</span>
                      <span class="frow__does">{{ f.does }}</span>
                    </span>
                  </span>
                  <span><span class="tag" :class="f.cls">{{ f.status }}</span></span>
                  <span class="frow__run ta-r">{{ f.run }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, User, Plus, LayoutDashboard, Workflow, ScrollText, Plug, Settings, Headset, UserPlus, Receipt, Send, Boxes } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Eén overzicht',
      title: 'Al je automatiseringen op één plek.',
      lead: 'Zie in één oogopslag welke flows draaien, wat ze doen en wanneer ze laatst liepen, en grijp in waar nodig.',
      c1: 'Realtime status van elke flow',
      c2: 'Eén plek voor al je automatiseringen',
      c3: 'Grijp direct in waar nodig',
      app: 'Automatiseringen', liveNow: 'live', url: 'jouwbedrijf.be/automatiseringen',
      navOverview: 'Overzicht', navFlows: 'Flows', navLogs: 'Logs', navConnections: 'Koppelingen', navSettings: 'Instellingen',
      flowsTitle: 'Flows', newFlow: 'Nieuwe flow',
      thFlow: 'Flow', thStatus: 'Status', thRun: 'Laatste run',
      stActive: 'Actief', stScheduled: 'Gepland',
      fQuestions: 'Klantvragen', dQuestions: 'Beantwoordt supportvragen',
      fLeads: 'Lead-routing', dLeads: 'Wijst nieuwe leads toe',
      fInvoice: 'Factuurverwerking', dInvoice: 'Verwerkt inkomende facturen',
      fQuote: 'Offerte-opvolging', dQuote: 'Stuurt opvolgmails',
      fStock: 'Voorraad-sync', dStock: 'Werkt voorraad bij',
      rNow: 'nu', r14m: '14 min', r1h: '1 u', rPlan: '17:00', r3h: '3 u',
    },
    en: {
      eyebrow: 'One overview',
      title: 'All your automations in one place.',
      lead: 'See at a glance which flows are running, what they do and when they last ran, and step in where needed.',
      c1: 'Real-time status of every flow',
      c2: 'One place for all your automations',
      c3: 'Step in directly where needed',
      app: 'Automations', liveNow: 'live', url: 'jouwbedrijf.be/automations',
      navOverview: 'Overview', navFlows: 'Flows', navLogs: 'Logs', navConnections: 'Connections', navSettings: 'Settings',
      flowsTitle: 'Flows', newFlow: 'New flow',
      thFlow: 'Flow', thStatus: 'Status', thRun: 'Last run',
      stActive: 'Active', stScheduled: 'Scheduled',
      fQuestions: 'Customer questions', dQuestions: 'Answers support tickets',
      fLeads: 'Lead routing', dLeads: 'Assigns new leads',
      fInvoice: 'Invoice processing', dInvoice: 'Processes incoming invoices',
      fQuote: 'Quote follow-up', dQuote: 'Sends follow-up emails',
      fStock: 'Stock sync', dStock: 'Keeps stock up to date',
      rNow: 'now', r14m: '14 min', r1h: '1h', rPlan: '17:00', r3h: '3h',
    },
  },
})

const checks = computed(() => [t('c1'), t('c2'), t('c3')])

const nav = computed(() => [
  { icon: LayoutDashboard, label: t('navOverview') },
  { icon: Workflow, label: t('navFlows'), active: true },
  { icon: ScrollText, label: t('navLogs') },
  { icon: Plug, label: t('navConnections') },
  { icon: Settings, label: t('navSettings') },
])

const flows = computed(() => [
  { icon: Headset, name: t('fQuestions'), does: t('dQuestions'), status: t('stActive'), cls: 'pos', run: t('rNow'), live: true },
  { icon: UserPlus, name: t('fLeads'), does: t('dLeads'), status: t('stActive'), cls: 'pos', run: t('r14m') },
  { icon: Receipt, name: t('fInvoice'), does: t('dInvoice'), status: t('stActive'), cls: 'pos', run: t('r1h') },
  { icon: Send, name: t('fQuote'), does: t('dQuote'), status: t('stScheduled'), cls: 'neutral', run: t('rPlan') },
  { icon: Boxes, name: t('fStock'), does: t('dStock'), status: t('stActive'), cls: 'pos', run: t('r3h') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.ai-overview { padding: var(--section-pad-y) var(--space-8); }
/* Mirrored vs AiInAction — visual left, copy right — so the stacked demos alternate. */
.container {
  max-width: var(--max-width); margin: 0 auto;
  display: grid; grid-template-columns: 1.15fr 0.85fr; gap: var(--space-16); align-items: center;
}
.content { order: 2; }
.visual { order: 1; }
.code { font-family: var(--font-mono); }
.ta-r { text-align: right; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.content h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-5); text-wrap: balance;
}
.lead { font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); margin: 0 0 var(--space-8); max-width: 46ch; }
.checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.checks li { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-body); color: var(--color-text-primary); svg { flex-shrink: 0; color: var(--color-primary); } }

/* ── Automations dashboard ── */
.mock { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated); overflow: hidden; }
.mock__bar { display: flex; align-items: center; gap: 7px; padding: 0.6rem 0.9rem; background: var(--color-bg-sunken); border-bottom: 1px solid var(--color-border); }
.tl { width: 9px; height: 9px; border-radius: 50%; background: var(--color-border-hover); }
.mock__url { margin-left: 10px; flex: 1; max-width: 300px; font-size: 0.625rem; color: var(--color-text-tertiary); background: var(--color-bg-surface); border-radius: var(--radius-full); padding: 3px 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mock__chrome { display: flex; align-items: center; gap: var(--space-3); padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--color-border); }
.mock__brand { font-weight: var(--weight-semibold); font-size: 0.875rem; color: var(--color-text-primary); margin-right: auto; }
.mock__live { display: inline-flex; align-items: center; gap: 6px; font-size: 0.625rem; font-weight: var(--weight-semibold); letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-primary); }
.mock__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-primary); }
.mock__avatar { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-secondary); }

.mock__body { display: flex; min-height: 320px; }
.mock__side { flex-shrink: 0; width: 150px; padding: var(--space-4) var(--space-3); display: flex; flex-direction: column; gap: 2px; border-right: 1px solid var(--color-border); }
.navitem { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); padding: 0.45rem 0.6rem; border-radius: var(--radius-md); svg { flex-shrink: 0; opacity: 0.8; } }
.navitem.active { background: var(--color-bg-sunken); color: var(--color-text-primary); svg { opacity: 1; color: var(--color-primary); } }
.mock__main { flex: 1; padding: var(--space-5) var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); min-width: 0; }

.main__head { display: flex; align-items: center; justify-content: space-between; }
.main__title { font-size: var(--text-small); font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.pill-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 0.6875rem; font-weight: var(--weight-medium); color: var(--color-text-on-accent); background: var(--color-primary); border-radius: var(--radius-full); padding: 0.3rem 0.7rem; }

.ftable__head, .frow { display: grid; grid-template-columns: minmax(0, 1fr) 84px 60px; align-items: center; gap: var(--space-3); }
.ftable__head { padding: 0 0 var(--space-2); border-bottom: 1px solid var(--color-border); }
.ftable__head span { font-size: 0.5625rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); }
.frow { padding: 0.5rem 0; }
.frow:not(:last-child) { border-bottom: 1px solid var(--color-border); }
.frow__id { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }
.frow__ic { width: 26px; height: 26px; flex-shrink: 0; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-tertiary); }
.frow__ic.live { background: var(--color-primary-subtle); color: var(--color-primary); }
.frow__text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.frow__name { font-size: 0.8125rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.frow__does { font-size: 0.625rem; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.frow__run { font-size: 0.6875rem; color: var(--color-text-secondary); }
.tag { display: inline-block; font-size: 0.625rem; font-weight: var(--weight-medium); padding: 0.18rem 0.55rem; border-radius: var(--radius-full); white-space: nowrap; }
.tag.pos { color: var(--color-primary); background: var(--color-primary-subtle); }
.tag.neutral { color: var(--color-text-secondary); background: var(--color-bg-sunken); }

/* ── Motion (reduced-motion safe) ── */
@media (prefers-reduced-motion: no-preference) {
  .mock__dot, .frow__ic.live { animation: ov-pulse 2.4s var(--ease-smooth) infinite; }
}
@keyframes ov-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: var(--space-10); }
  .content { order: 0; max-width: 560px; }
  .visual { order: 1; }
  .lead { max-width: none; }
}
@media (max-width: 768px) {
  .ai-overview { padding: var(--section-pad-y) var(--space-5); }
}
@media (max-width: 560px) {
  .mock__side { width: 48px; }
  .navitem span { display: none; }
  .navitem { justify-content: center; padding: 0.45rem; }
  .mock__main { padding: var(--space-4); }
}
</style>
