<template>
  <section class="showcase" ref="sectionRef">
    <div class="container">
      <header class="showcase-header reveal">
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
      </header>

      <!-- ════════ Screen 1: Eigenaarscockpit — "Vandaag" ════════ -->
      <div class="row row--reverse reveal">
        <div class="row__text">
          <span class="row__label">{{ t('rcLabel') }}</span>
          <h3>{{ t('rcTitle') }}</h3>
          <p>{{ t('rcBody') }}</p>
          <ul class="checks">
            <li v-for="c in rcChecks" :key="c"><Check :size="16" :stroke-width="2.5" />{{ c }}</li>
          </ul>
        </div>
        <div class="row__visual">
          <div class="mock" v-scale-fit="560" aria-hidden="true">
            <div class="mock__bar">
              <span class="tl"></span><span class="tl"></span><span class="tl"></span>
              <span class="mock__url code">{{ t('rcUrl') }}</span>
            </div>
            <div class="mock__chrome">
              <span class="mock__brand">{{ t('appName') }}</span>
              <span class="mock__search"><Search :size="13" :stroke-width="2" />{{ t('search') }}</span>
              <Bell :size="15" :stroke-width="2" class="mock__bell" />
              <span class="mock__avatar"><User :size="14" :stroke-width="2" /></span>
            </div>
            <div class="mock__body">
              <aside class="mock__side">
                <a v-for="n in navOverview" :key="n.label" class="navitem" :class="{ active: n.active }">
                  <component :is="n.icon" :size="16" :stroke-width="2" /><span>{{ n.label }}</span>
                </a>
              </aside>
              <div class="cockpit">
                <div class="main__head">
                  <span class="main__title">{{ t('todayTitle') }}</span>
                  <span class="cockpit__date">{{ t('todayDate') }}</span>
                </div>
                <div class="todo">
                  <div v-for="a in today" :key="a.title" class="todo__item">
                    <span class="todo__ic" :class="a.cls"><component :is="a.icon" :size="15" :stroke-width="2" /></span>
                    <span class="todo__txt">
                      <span class="todo__title">{{ a.title }}</span>
                      <span class="todo__meta">{{ a.meta }}</span>
                    </span>
                    <ChevronRight :size="14" :stroke-width="2" class="todo__chev" />
                  </div>
                </div>
                <div class="automation">
                  <Zap :size="14" :stroke-width="2" class="automation__ic" />
                  <span class="automation__txt"><strong>{{ t('autoLabel') }}</strong> · {{ t('autoRule') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════ Screen 2: Order pipeline — full-width process view ════════ -->
      <div class="feature-wide reveal">
        <div class="mock" v-scale-fit="760" aria-hidden="true">
          <div class="mock__bar">
            <span class="tl"></span><span class="tl"></span><span class="tl"></span>
            <span class="mock__url code">{{ t('r1url') }}</span>
          </div>
          <div class="mock__chrome">
            <span class="mock__brand">{{ t('appName') }}</span>
            <span class="mock__search"><Search :size="13" :stroke-width="2" />{{ t('search') }}</span>
            <Bell :size="15" :stroke-width="2" class="mock__bell" />
            <span class="mock__avatar"><User :size="14" :stroke-width="2" /></span>
          </div>
          <div class="mock__body">
            <aside class="mock__side">
              <a v-for="n in navOrders" :key="n.label" class="navitem" :class="{ active: n.active }">
                <component :is="n.icon" :size="16" :stroke-width="2" /><span>{{ n.label }}</span>
              </a>
            </aside>
            <div class="mock__main mock__main--flush">
              <div class="main__head">
                <span class="main__title">{{ t('pipelineTitle') }}</span>
                <span class="pill-btn"><Plus :size="13" :stroke-width="2.5" />{{ t('newOrder') }}</span>
              </div>
              <div class="kanban">
                <div v-for="col in pipeline" :key="col.stage" class="kanban__col">
                  <div class="kanban__head">
                    <span class="kanban__stage">{{ col.stage }}</span>
                    <span class="kanban__count">{{ col.cards.length }}</span>
                  </div>
                  <div
                    v-for="o in col.cards"
                    :key="o.id"
                    class="kcard"
                    :class="{ 'is-hot': o.hot, 'is-flag': o.flag }"
                  >
                    <div class="kcard__top">
                      <span class="kcard__id code">{{ o.id }}</span>
                      <span class="kcard__date">{{ o.date }}</span>
                    </div>
                    <div class="kcard__cust">
                      <span class="kcard__av">{{ o.initials }}</span>
                      <span class="kcard__name">{{ o.name }}</span>
                    </div>
                    <div class="kcard__foot">
                      <span class="kcard__amt num">{{ o.amount }}</span>
                      <span v-if="o.flag" class="kcard__flag">{{ t('flagBackorder') }}</span>
                    </div>
                  </div>
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
import { Check, Search, Bell, User, Plus, ChevronRight, ShoppingCart, Receipt, Package, Truck, AlertTriangle, Zap, LayoutDashboard, Users, Boxes, CreditCard, Settings } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Een voorbeeld uit de praktijk',
      title: 'Orbit: gebouwd rond het proces van één groothandel',
      lead: 'Zo ziet software op maat eruit. We bouwden Orbit rond de dagelijkse werking van een Belgische groothandel: van order tot factuur, in één systeem. Bij jou bouwen we rond jóuw proces, en je bezit het volledig: jouw product, jouw data, in eigen beheer.',

      appName: 'Orbit', search: 'Zoeken',
      navOverview: 'Overzicht', navOrders: 'Orders', navClients: 'Klanten', navStock: 'Voorraad', navBilling: 'Facturatie', navSettings: 'Instellingen',

      // Screen 1 — order pipeline
      r1url: 'orbit.jouwbedrijf.be/orders',
      pipelineTitle: 'Orderpijplijn', newOrder: 'Nieuw',
      stNew: 'Nieuw', stPicking: 'Picking', stShipped: 'Verzonden', stDelivered: 'Geleverd', stInvoiced: 'Gefactureerd',
      flagBackorder: 'Backorder',

      // Screen 2 — owner cockpit
      rcLabel: 'Eigenaarscockpit',
      rcTitle: 'Alles wat vandaag je aandacht vraagt',
      rcBody: 'Geen ruwe tabel om uit te pluizen. Orbit toont elke ochtend wat moet gebeuren en wat vastzit, zodat jij beslist in plaats van zoekt.',
      rc1: 'Beslissingen, geen ruwe data', rc2: 'Alles wat vastzit meteen zichtbaar', rc3: 'Automatiseringen op de achtergrond',
      rcUrl: 'orbit.jouwbedrijf.be/overzicht',
      todayTitle: 'Vandaag', todayDate: 'do 12 juni',
      t1: '3 orders wachten op verzending', t1m: '#2041 · #2039 · #2037',
      t2: '2 facturen vervallen vandaag', t2m: '€3,2k openstaand',
      t3: '1 levering gepland vandaag', t3m: 'Vandenberghe nv · 14:00',
      t4: 'Backorder bij Dewals & co', t4m: '#2043 · wacht op voorraad',
      autoLabel: 'Automatisering actief', autoRule: 'Betaalde order → factuur verstuurd → voorraad afgeboekt',
    },
    en: {
      eyebrow: 'A real-world example',
      title: 'Orbit: built around one wholesaler\'s process',
      lead: 'This is what custom software looks like. We built Orbit around the daily operation of a Belgian wholesaler: from order to invoice, in one system. For you we build around your process, and you own it fully: your product, your data, under your control.',

      appName: 'Orbit', search: 'Search',
      navOverview: 'Overview', navOrders: 'Orders', navClients: 'Customers', navStock: 'Stock', navBilling: 'Billing', navSettings: 'Settings',

      // Screen 1 — order pipeline
      r1url: 'orbit.yourcompany.be/orders',
      pipelineTitle: 'Order pipeline', newOrder: 'New',
      stNew: 'New', stPicking: 'Picking', stShipped: 'Shipped', stDelivered: 'Delivered', stInvoiced: 'Invoiced',
      flagBackorder: 'Backorder',

      // Screen 2 — owner cockpit
      rcLabel: 'Owner cockpit',
      rcTitle: 'Everything that needs you today',
      rcBody: 'No raw table to dig through. Every morning Orbit shows what needs to happen and what is stuck, so you decide instead of search.',
      rc1: 'Decisions, not raw data', rc2: 'Anything stuck is instantly visible', rc3: 'Automations running in the background',
      rcUrl: 'orbit.yourcompany.be/overview',
      todayTitle: 'Today', todayDate: 'Thu 12 June',
      t1: '3 orders awaiting shipment', t1m: '#2041 · #2039 · #2037',
      t2: '2 invoices due today', t2m: '€3.2k outstanding',
      t3: '1 delivery scheduled today', t3m: 'Vandenberghe nv · 14:00',
      t4: 'Backorder at Dewals & co', t4m: '#2043 · awaiting stock',
      autoLabel: 'Automation active', autoRule: 'Paid order → invoice sent → stock deducted',
    },
  },
})

const rcChecks = computed(() => [t('rc1'), t('rc2'), t('rc3')])

// Shared product shell — same sidebar on every screen, only the active tab differs.
function buildNav(active) {
  return [
    { icon: LayoutDashboard, label: t('navOverview'), active: active === 'overview' },
    { icon: ShoppingCart, label: t('navOrders'), active: active === 'orders' },
    { icon: Users, label: t('navClients'), active: active === 'clients' },
    { icon: Boxes, label: t('navStock'), active: active === 'stock' },
    { icon: CreditCard, label: t('navBilling'), active: active === 'billing' },
    { icon: Settings, label: t('navSettings'), active: active === 'settings' },
  ]
}
const navOrders = computed(() => buildNav('orders'))
const navOverview = computed(() => buildNav('overview'))

// One coherent wholesale order set, spread across the pipeline stages.
// #2041 (Vandenberghe) and the Dewals backorder also surface in the cockpit.
const pipeline = computed(() => [
  { stage: t('stNew'), cards: [
    { id: '#2040', date: '12/06', name: 'Claes retail', initials: 'CR', amount: '€1.150' },
    { id: '#2037', date: '11/06', name: 'Coppens groep', initials: 'CG', amount: '€540' },
  ] },
  { stage: t('stPicking'), cards: [
    { id: '#2041', date: '10/06', name: 'Vandenberghe nv', initials: 'VN', amount: '€2.480', hot: true },
    { id: '#2039', date: '10/06', name: 'Mertens bvba', initials: 'MB', amount: '€860' },
    { id: '#2043', date: '09/06', name: 'Dewals & co', initials: 'DC', amount: '€2.150', flag: true },
  ] },
  { stage: t('stShipped'), cards: [
    { id: '#2038', date: '08/06', name: 'Dewals & co', initials: 'DC', amount: '€3.275' },
    { id: '#2035', date: '07/06', name: 'Claes retail', initials: 'CR', amount: '€760' },
  ] },
  { stage: t('stDelivered'), cards: [
    { id: '#2036', date: '05/06', name: 'Vandenberghe nv', initials: 'VN', amount: '€1.920' },
  ] },
  { stage: t('stInvoiced'), cards: [
    { id: '#2034', date: '03/06', name: 'Mertens bvba', initials: 'MB', amount: '€1.460' },
    { id: '#2033', date: '02/06', name: 'Coppens groep', initials: 'CG', amount: '€980' },
  ] },
])

// Owner cockpit — decisions and what is stuck, not raw rows.
const today = computed(() => [
  { icon: Package, cls: '', title: t('t1'), meta: t('t1m') },
  { icon: Receipt, cls: 'alert', title: t('t2'), meta: t('t2m') },
  { icon: Truck, cls: '', title: t('t3'), meta: t('t3m') },
  { icon: AlertTriangle, cls: 'danger', title: t('t4'), meta: t('t4m') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.showcase { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.code { font-family: var(--font-mono); }
.num { font-variant-numeric: tabular-nums; }

/* Header */
.showcase-header { max-width: 720px; margin: 0 auto var(--space-16); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.showcase-header h2 {
  font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0; text-wrap: balance;
}
.lead { margin: var(--space-5) auto 0; max-width: 62ch; font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

/* Split rows */
/* minmax(0, …) so the visual column tracks its fr-share instead of growing to
   the mock's content width (which overflowed the row at 2-column tablet sizes). */
.row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: var(--space-16); align-items: center; padding: var(--space-12) 0; }
.row--reverse .row__text { order: 2; }
.row--reverse .row__visual { order: 1; }
.row__label { display: inline-block; font-size: var(--text-xs); font-weight: var(--weight-semibold); letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-primary); margin-bottom: var(--space-4); }
.row__text h3 { font-size: var(--text-h2); font-weight: var(--weight-semibold); color: var(--color-text-primary); line-height: var(--leading-snug); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-4); text-wrap: balance; }
.row__text p { font-size: var(--text-body-lg); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0 0 var(--space-6); }
.checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.checks li { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-body); color: var(--color-text-primary); svg { flex-shrink: 0; color: var(--color-primary); } }

/* Full-width feature (order pipeline) */
.feature-wide { padding: var(--space-12) 0; }

/* ── Window frame (shared) ── */
.mock { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated); overflow: hidden; }
.mock__bar {
  display: flex; align-items: center; gap: 7px; padding: 0.6rem 0.9rem;
  background: var(--color-bg-sunken); border-bottom: 1px solid var(--color-border);
}
.tl { width: 9px; height: 9px; border-radius: 50%; background: var(--color-border-hover); }
.mock__url { margin-left: 10px; flex: 1; max-width: 320px; font-size: 0.625rem; color: var(--color-text-tertiary); background: var(--color-bg-surface); border-radius: var(--radius-full); padding: 3px 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mock__chrome { display: flex; align-items: center; gap: var(--space-3); padding: 0.6rem 0.9rem; border-bottom: 1px solid var(--color-border); }
.mock__brand { font-weight: var(--weight-semibold); font-size: 0.875rem; color: var(--color-text-primary); margin-right: auto; }
.mock__search { display: inline-flex; align-items: center; gap: 6px; flex: 0 1 150px; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 0.6875rem; color: var(--color-text-tertiary); background: var(--color-bg-sunken); border-radius: var(--radius-full); padding: 5px 11px; svg { flex-shrink: 0; opacity: 0.7; } }
.mock__bell { color: var(--color-text-tertiary); }
.mock__avatar { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.625rem; font-weight: var(--weight-medium); background: var(--color-bg-sunken); color: var(--color-text-secondary); }
.mock__body { display: flex; min-height: 360px; }

/* sidebar (shared shell) */
.mock__side { flex-shrink: 0; width: 148px; padding: var(--space-4) var(--space-3); display: flex; flex-direction: column; gap: 2px; border-right: 1px solid var(--color-border); }
.navitem { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); padding: 0.45rem 0.6rem; border-radius: var(--radius-md); svg { flex-shrink: 0; opacity: 0.8; } }
.navitem.active { background: var(--color-bg-sunken); color: var(--color-text-primary); svg { opacity: 1; color: var(--color-primary); } }
.mock__main { flex: 1; padding: var(--space-4) var(--space-6) var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); min-width: 0; }
.mock__main--flush { padding-right: var(--space-5); padding-left: var(--space-5); }

.main__head { display: flex; align-items: center; justify-content: space-between; }
.main__title { font-size: var(--text-small); font-weight: var(--weight-semibold); color: var(--color-text-primary); white-space: nowrap; }
.pill-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 0.6875rem; font-weight: var(--weight-medium); color: var(--color-text-on-accent); background: var(--color-primary); border-radius: var(--radius-full); padding: 0.3rem 0.7rem; }

/* ════════ Screen 1 — order pipeline (kanban) ════════ */
.kanban { flex: 1; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--space-3); min-width: 0; align-content: start; }
.kanban__col { background: var(--color-bg-sunken); border-radius: var(--radius-md); padding: var(--space-2); display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
.kanban__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: 2px var(--space-1) var(--space-1); }
.kanban__stage { font-size: 0.5625rem; font-weight: var(--weight-semibold); letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.kanban__count { flex-shrink: 0; font-size: 0.5625rem; font-weight: var(--weight-bold); color: var(--color-text-secondary); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-full); padding: 0 6px; line-height: 1.5; }
.kcard { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.kcard.is-hot { border-color: var(--color-primary-border); }
.kcard.is-flag { border-color: rgba(220, 38, 38, 0.3); }
.kcard__top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.kcard__id { font-size: 0.625rem; color: var(--color-text-secondary); }
.kcard__date { font-size: 0.5625rem; color: var(--color-text-tertiary); }
.kcard__cust { display: flex; align-items: center; gap: 6px; min-width: 0; }
.kcard__av { width: 20px; height: 20px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.5rem; font-weight: var(--weight-bold); color: var(--color-primary); background: var(--color-primary-subtle); }
.kcard__name { font-size: 0.6875rem; font-weight: var(--weight-medium); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.kcard__foot { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.kcard__amt { font-size: 0.6875rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.kcard__flag { flex-shrink: 0; font-size: 0.5rem; font-weight: var(--weight-semibold); letter-spacing: 0.02em; text-transform: uppercase; color: var(--color-error); background: rgba(220, 38, 38, 0.09); border-radius: var(--radius-full); padding: 1px 6px; }

/* ════════ Screen 2 — owner cockpit ════════ */
.cockpit { flex: 1; padding: var(--space-4) var(--space-6) var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); min-width: 0; }
.cockpit__date { font-size: 0.625rem; color: var(--color-text-tertiary); }
.todo { display: flex; flex-direction: column; gap: var(--space-2); }
.todo__item { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--color-bg-sunken); border-radius: var(--radius-md); }
.todo__ic { width: 30px; height: 30px; flex-shrink: 0; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--color-primary-subtle); color: var(--color-primary); }
.todo__ic.alert { background: rgba(217, 119, 6, 0.1); color: #b45309; }
.todo__ic.danger { background: rgba(220, 38, 38, 0.09); color: var(--color-error); }
.todo__txt { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.todo__title { font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.todo__meta { font-size: 0.625rem; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.todo__chev { color: var(--color-text-tertiary); flex-shrink: 0; }
.automation { margin-top: auto; display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3); border: 1px dashed var(--color-primary-border); border-radius: var(--radius-md); background: var(--color-primary-subtle); min-width: 0; }
.automation__ic { color: var(--color-primary); flex-shrink: 0; }
.automation__txt { font-size: 0.625rem; color: var(--color-text-secondary); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; strong { color: var(--color-primary); font-weight: var(--weight-semibold); } }

/* Responsive */
@media (max-width: 900px) {
  /* minmax(0, …) stops the single column from growing to the mock's min-content,
     which otherwise pushed the heading/body wider than the viewport. */
  .row, .row--reverse { grid-template-columns: minmax(0, 1fr); gap: var(--space-8); }
  .row--reverse .row__text { order: 1; }
  .row--reverse .row__visual { order: 2; }
  .row__text { max-width: 560px; }
}
@media (max-width: 768px) {
  .showcase { padding: var(--section-pad-y) var(--space-5); }
  .showcase-header { margin-bottom: var(--space-12); }
  /* Pipeline cards on mobile only: smaller customer names that wrap so the full
     name shows (no truncation) in the scaled mock, and drop the backorder flag.
     Desktop keeps the full single-line name and the flag. */
  .kcard__name { font-size: 0.4375rem; white-space: normal; overflow-wrap: break-word; line-height: 1.2; }
  .kcard__flag { display: none; }
}
</style>
