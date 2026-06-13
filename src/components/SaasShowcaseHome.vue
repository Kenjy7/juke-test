<template>
  <section class="saas-home" ref="sectionRef">
    <div class="container">
      <div class="content reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
        <ul class="checks">
          <li v-for="c in checks" :key="c"><Check :size="16" :stroke-width="2.5" />{{ c }}</li>
        </ul>
        <router-link to="/saas-development" class="link">
          {{ t('cta') }}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>
      </div>

      <div class="visual reveal reveal-delay-1">
        <!-- Decorative product illustration: hidden from assistive tech, not tabbable.
             A custom stock-management app (web + mobile, shared data). Shown in an
             in-use state — sorted lowest-stock-first, one row selected. -->
        <div class="pair" aria-hidden="true">
          <!-- Desktop -->
          <div class="device device--web">
            <div class="web__bar">
              <span class="tl"></span><span class="tl"></span><span class="tl"></span>
              <span class="web__url code">{{ t('url') }}</span>
            </div>
            <div class="web__chrome">
              <span class="web__brand">{{ t('appName') }}</span>
              <nav class="web__tabs">
                <span class="web__tab is-active">{{ t('tabStock') }}</span>
                <span class="web__tab">{{ t('tabProducts') }}</span>
                <span class="web__tab">{{ t('tabOrders') }}</span>
              </nav>
              <span class="web__avatar"><User :size="13" :stroke-width="2" /></span>
            </div>
            <div class="web__body">
              <div class="web__head">
                <span class="web__title">{{ t('tabStock') }}</span>
                <span class="web__filter">{{ t('period') }}<ChevronDown :size="12" :stroke-width="2.5" /></span>
              </div>

              <!-- KPI cards double as filters -->
              <div class="kpis">
                <div class="kpi" v-for="k in kpis" :key="k.lbl" :class="{ 'kpi--urgent': k.urgent }">
                  <span class="kpi__lbl">{{ k.lbl }}</span>
                  <span class="kpi__val num" :class="k.cls">{{ k.val }}</span>
                </div>
              </div>

              <!-- Search + bulk actions for the current selection -->
              <div class="toolbar">
                <div class="search">
                  <Search :size="13" :stroke-width="2" class="search__ic" />
                  <span class="search__ph">{{ t('searchPh') }}</span>
                  <span class="search__kbd">⌘K</span>
                </div>
                <div class="bulk">
                  <span class="bulk__count">{{ t('selected1') }}</span>
                  <span class="bulk__btn"><RotateCw :size="11" :stroke-width="2" />{{ t('reorder') }}</span>
                  <span class="bulk__btn bulk__btn--ghost"><Download :size="11" :stroke-width="2" />{{ t('export') }}</span>
                </div>
              </div>

              <!-- Sortable product table -->
              <div class="tbl">
                <div class="tbl__head">
                  <span class="th th--chk"><span class="chk chk--all"><span class="chk__dash"></span></span></span>
                  <span class="th">{{ t('colProduct') }}</span>
                  <span class="th th--sku">{{ t('colSku') }}</span>
                  <span class="th th--stock th--sort"><span>{{ t('colStock') }}</span><ArrowUp :size="10" :stroke-width="2.5" /></span>
                  <span class="th th--status">{{ t('colStatus') }}</span>
                  <span class="th th--mod">{{ t('colModified') }}</span>
                  <span class="th th--act"></span>
                </div>
                <div class="tbl__row" v-for="p in products" :key="p.sku" :class="{ 'is-sel': p.sel }">
                  <span class="td td--chk"><span class="chk" :class="{ 'chk--on': p.sel }"><Check v-if="p.sel" :size="10" :stroke-width="3" /></span></span>
                  <span class="td td--name">{{ p.name }}</span>
                  <span class="td td--sku code">{{ p.sku }}</span>
                  <span class="td td--stock num">{{ p.stock }}</span>
                  <span class="td td--status"><span class="sdot" :class="p.cls"></span>{{ p.status }}</span>
                  <span class="td td--mod">{{ p.mod }}</span>
                  <span class="td td--act"><MoreHorizontal :size="14" :stroke-width="2" /></span>
                </div>

                <!-- Open per-row action menu (on the selected row) -->
                <div class="rowmenu">
                  <span class="rowmenu__item"><RotateCw :size="12" :stroke-width="2" />{{ t('reorder') }}</span>
                  <span class="rowmenu__item"><Pencil :size="12" :stroke-width="2" />{{ t('adjust') }}</span>
                  <span class="rowmenu__item"><Plus :size="12" :stroke-width="2" />{{ t('addStock') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone — same stock app, same data -->
          <div class="device device--phone">
            <span class="phone__btn phone__btn--vol"></span>
            <span class="phone__btn phone__btn--power"></span>
            <div class="phone__screen">
              <span class="phone__island"></span>
              <div class="ph__status">
                <span class="ph__time num">9:41</span>
                <span class="ph__sig">
                  <Signal :size="9" :stroke-width="2.5" />
                  <Wifi :size="9" :stroke-width="2.5" />
                  <BatteryMedium :size="13" :stroke-width="2" />
                </span>
              </div>
              <div class="ph__top">
                <span class="ph__brand">{{ t('appName') }}</span>
                <span class="ph__av"><User :size="12" :stroke-width="2" /></span>
              </div>
              <div class="ph__hero">
                <span class="ph__lbl">{{ t('kLow') }}</span>
                <span class="ph__val num">7</span>
                <span class="ph__sub">{{ t('phNeedsAttention') }}</span>
              </div>
              <span class="ph__cap">{{ t('phCap') }}</span>
              <div class="ph__item" v-for="p in phoneProducts" :key="p.sku">
                <span class="ph__dot" :class="p.cls"></span>
                <span class="ph__name">{{ p.name }}</span>
                <span class="ph__amt num">{{ p.stock }}</span>
              </div>
              <nav class="ph__tabs">
                <span class="ph__tab is-active"><LayoutDashboard :size="16" :stroke-width="2" /></span>
                <span class="ph__tab"><Boxes :size="16" :stroke-width="2" /></span>
                <span class="ph__tab"><BarChart3 :size="16" :stroke-width="2" /></span>
                <span class="ph__tab"><Settings :size="16" :stroke-width="2" /></span>
              </nav>
              <span class="ph__home"></span>
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
import { Check, User, Search, ChevronDown, ArrowUp, MoreHorizontal, RotateCw, Download, Pencil, Plus, LayoutDashboard, Boxes, BarChart3, Settings, Signal, Wifi, BatteryMedium } from 'lucide-vue-next'

// Lead offer on the homepage: custom SaaS & apps. Component-local copy. A bespoke
// stock-management app on web + mobile (shared inventory: 1.284 SKUs, €128k value).
const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'SaaS & apps op maat',
      title: 'Jouw eigen platform, op maat gebouwd.',
      lead: 'Eén platform, op web én mobiel. Van voorraadbeheer tot portalen en dashboards. Wij bouwen de software die jouw operatie draait, jij bezit ze.',
      c1: 'Web én mobiel, één codebase',
      c2: 'Op maat van jouw processen',
      c3: 'Jouw data, in eigen beheer',
      cta: 'Ontdek SaaS- & app-development',
      appName: 'Orbit', url: 'orbit.jouwbedrijf.be/voorraad',
      tabStock: 'Voorraad', tabProducts: 'Producten', tabOrders: 'Bestellingen',
      period: '30 dagen', phCap: '1.284 producten', phNeedsAttention: 'vragen aandacht',
      kProducts: 'Producten', kLow: 'Lage voorraad', kValue: 'Voorraadwaarde',
      searchPh: 'Zoek op naam of SKU…',
      colProduct: 'Product', colSku: 'SKU', colStock: 'Voorraad', colStatus: 'Status', colModified: 'Gewijzigd',
      stIn: 'Op voorraad', stLow: 'Bijna op', stOut: 'Uitverkocht',
      reorder: 'Bijbestellen', adjust: 'Aanpassen', addStock: 'Bijboeken', export: 'Exporteren', selected1: '1 geselecteerd',
      p1: 'Eiken plank 200', p2: 'RVS schroef 4×40', p3: 'Verfrol 25cm', p4: 'Plamuur 5kg', p5: 'Houtlijm 1L',
      modToday: 'vandaag', mod2h: '2u geleden', modYest: 'gisteren', mod3d: '3 dagen',
    },
    en: {
      eyebrow: 'Custom SaaS & apps',
      title: 'Your own platform, built to measure.',
      lead: 'One platform, on web and mobile. From stock management to portals and dashboards. We build the software that runs your operation, and you own it.',
      c1: 'Web and mobile, one codebase',
      c2: 'Shaped to your processes',
      c3: 'Your data, under your control',
      cta: 'Explore SaaS & app development',
      appName: 'Orbit', url: 'orbit.yourcompany.be/inventory',
      tabStock: 'Inventory', tabProducts: 'Products', tabOrders: 'Orders',
      period: '30 days', phCap: '1,284 products', phNeedsAttention: 'need attention',
      kProducts: 'Products', kLow: 'Low stock', kValue: 'Stock value',
      searchPh: 'Search by name or SKU…',
      colProduct: 'Product', colSku: 'SKU', colStock: 'Stock', colStatus: 'Status', colModified: 'Modified',
      stIn: 'In stock', stLow: 'Low', stOut: 'Out of stock',
      reorder: 'Reorder', adjust: 'Edit', addStock: 'Add stock', export: 'Export', selected1: '1 selected',
      p1: 'Oak plank 200', p2: 'Inox screw 4×40', p3: 'Paint roller 25cm', p4: 'Filler 5kg', p5: 'Wood glue 1L',
      modToday: 'today', mod2h: '2h ago', modYest: 'yesterday', mod3d: '3 days',
    },
  },
})

const checks = computed(() => [t('c1'), t('c2'), t('c3')])

const kpis = computed(() => [
  { lbl: t('kProducts'), val: '1.284', cls: '' },
  { lbl: t('kLow'), val: '7', cls: 'warn', urgent: true },
  { lbl: t('kValue'), val: '€128k', cls: '' },
])

// Sorted lowest-stock-first (the default sort); the first row is selected.
const products = computed(() => [
  { name: t('p3'), sku: 'VR-25', stock: '0', status: t('stOut'), cls: 'neg', mod: t('modToday'), sel: true },
  { name: t('p2'), sku: 'SR-440', stock: '18', status: t('stLow'), cls: 'warn', mod: t('mod2h') },
  { name: t('p5'), sku: 'HL-10', stock: '47', status: t('stLow'), cls: 'warn', mod: t('modYest') },
  { name: t('p4'), sku: 'PL-05', stock: '126', status: t('stIn'), cls: 'pos', mod: t('modYest') },
  { name: t('p1'), sku: 'EP-200', stock: '342', status: t('stIn'), cls: 'pos', mod: t('mod3d') },
])
const phoneProducts = computed(() => products.value.slice(0, 3))

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.saas-home { padding: var(--section-pad-y) var(--space-8); }
.container {
  max-width: var(--max-width); margin: 0 auto;
  display: grid; grid-template-columns: 0.88fr 1.12fr; gap: var(--space-12); align-items: center;
}
.code { font-family: var(--font-mono); }
.num { font-variant-numeric: tabular-nums; }

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
.lead { font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); margin: 0 0 var(--space-6); max-width: 46ch; }
.checks { list-style: none; margin: 0 0 var(--space-8); padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.checks li { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-body); color: var(--color-text-primary); svg { flex-shrink: 0; color: var(--color-primary); } }
.link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-weight: var(--weight-medium); font-size: var(--text-body); color: var(--color-accent);
  text-decoration: none;
  svg { width: 16px; height: 16px; transition: transform var(--transition-base); }
  &:hover svg { transform: translate(2px, -2px); }
}


/* status dots */
.sdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.sdot.pos { background: var(--color-primary); }
.sdot.warn { background: #d97706; }
.sdot.neg { background: var(--color-error); }

/* ── Web + mobile pairing ── */
.pair { position: relative; width: 100%; max-width: 540px; margin-inline: auto; }

.device--web {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated); overflow: hidden;
}
.web__bar { display: flex; align-items: center; gap: 7px; padding: 0.55rem 0.9rem; background: var(--color-bg-sunken); border-bottom: 1px solid var(--color-border); }
.tl { width: 9px; height: 9px; border-radius: 50%; background: var(--color-border-hover); }
.web__url { margin-left: 10px; flex: 1; max-width: 280px; font-size: 0.625rem; color: var(--color-text-tertiary); background: var(--color-bg-surface); border-radius: var(--radius-full); padding: 3px 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.web__chrome { display: flex; align-items: center; gap: var(--space-3); padding: 0.5rem 0.9rem; border-bottom: 1px solid var(--color-border); }
.web__brand { font-weight: var(--weight-semibold); font-size: 0.8125rem; color: var(--color-text-primary); }
.web__tabs { display: flex; align-items: center; gap: 2px; margin-left: auto; }
.web__tab { font-size: 0.625rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); padding: 4px 9px; border-radius: var(--radius-full); }
.web__tab.is-active { color: var(--color-text-primary); background: var(--color-bg-sunken); }
.web__avatar { width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-secondary); }

.web__body { padding: var(--space-4) var(--space-5) var(--space-5); display: flex; flex-direction: column; gap: var(--space-3); }
.web__head { display: flex; align-items: center; justify-content: space-between; }
.web__title { font-size: var(--text-small); font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.web__filter { display: inline-flex; align-items: center; gap: 4px; font-size: 0.625rem; font-weight: var(--weight-medium); color: var(--color-text-secondary); background: var(--color-bg-sunken); border: 1px solid var(--color-border); border-radius: var(--radius-full); padding: 3px 6px 3px 10px; svg { color: var(--color-text-tertiary); } }

/* KPI filter cards */
.kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
.kpi { background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-3); display: flex; flex-direction: column; gap: 3px; transition: border-color var(--transition-base); }
.kpi:hover { border-color: var(--color-border-hover); }
.kpi--urgent { border-color: rgba(217, 119, 6, 0.45); background: rgba(217, 119, 6, 0.05); }
.kpi__lbl { font-size: 0.5625rem; font-weight: var(--weight-medium); letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-text-tertiary); }
.kpi__val { font-size: 1.05rem; font-weight: var(--weight-bold); color: var(--color-text-primary); line-height: 1; }
.kpi__val.warn { color: #b45309; }

/* Toolbar: search + bulk actions */
.toolbar { display: flex; align-items: center; gap: var(--space-3); }
.search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 7px; background: var(--color-bg-sunken); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 5px 8px; }
.search__ic { color: var(--color-text-tertiary); flex-shrink: 0; }
.search__ph { flex: 1; font-size: 0.6875rem; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search__kbd { font-size: 0.5rem; font-weight: var(--weight-semibold); color: var(--color-text-tertiary); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 4px; padding: 1px 5px; flex-shrink: 0; }
.bulk { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.bulk__count { font-size: 0.5625rem; font-weight: var(--weight-semibold); color: var(--color-primary); }
.bulk__btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.5625rem; font-weight: var(--weight-semibold); color: var(--color-text-on-accent); background: var(--color-primary); border-radius: var(--radius-full); padding: 3px 8px; }
.bulk__btn--ghost { color: var(--color-text-secondary); background: var(--color-bg-sunken); border: 1px solid var(--color-border); }

/* Table */
.tbl { position: relative; }
.tbl__head, .tbl__row { display: grid; grid-template-columns: 18px minmax(0, 1.4fr) 54px 46px 86px 58px 18px; align-items: center; gap: var(--space-2); }
.tbl__head { padding: 0 0 6px; border-bottom: 1px solid var(--color-border); }
.th { font-size: 0.5rem; font-weight: var(--weight-semibold); letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-text-tertiary); }
.th--stock, .td--stock { text-align: right; justify-content: flex-end; }
.th--sort { display: inline-flex; align-items: center; gap: 3px; color: var(--color-text-secondary); svg { color: var(--color-primary); } }
.tbl__row { padding: 0.34rem 0; border-bottom: 1px solid var(--color-border); font-size: 0.6875rem; }
.tbl__row:last-of-type { border-bottom: none; }
.tbl__row.is-sel { background: var(--color-primary-subtle); border-radius: var(--radius-sm); box-shadow: 0 0 0 1px var(--color-primary-border) inset; }
.td--name { color: var(--color-text-primary); font-weight: var(--weight-medium); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td--sku { color: var(--color-text-tertiary); font-size: 0.625rem; }
.td--stock { color: var(--color-text-primary); font-weight: var(--weight-semibold); }
.td--status { display: inline-flex; align-items: center; gap: 5px; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td--mod { color: var(--color-text-tertiary); font-size: 0.625rem; }
.td--act { color: var(--color-text-tertiary); display: flex; justify-content: center; }

.chk { width: 13px; height: 13px; border-radius: 4px; border: 1.5px solid var(--color-border-hover); display: flex; align-items: center; justify-content: center; }
.chk--on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-text-on-accent); }
.chk--all { position: relative; }
.chk__dash { width: 7px; height: 2px; border-radius: 1px; background: var(--color-text-tertiary); }

/* Open per-row action menu (anchored under the selected row's ⋯) */
.rowmenu { position: absolute; top: 48px; right: 2px; z-index: 4; width: 124px; background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: var(--shadow-elevated); padding: 4px; display: flex; flex-direction: column; gap: 1px; }
.rowmenu__item { display: inline-flex; align-items: center; gap: 7px; font-size: 0.625rem; font-weight: var(--weight-medium); color: var(--color-text-primary); padding: 5px 7px; border-radius: var(--radius-sm); svg { color: var(--color-text-tertiary); flex-shrink: 0; } }
.rowmenu__item:first-child { color: var(--color-primary); svg { color: var(--color-primary); } }

/* Phone — slim + tall, overlapping the lower-right corner */
.device--phone {
  position: absolute; right: -22px; bottom: -44px; z-index: 5;
  width: 168px;
  background: var(--color-bg-sunken); border: 1px solid var(--color-border);
  border-radius: 30px; padding: 8px; box-shadow: var(--shadow-ambient);
}
.phone__btn { position: absolute; background: var(--color-border-hover); border-radius: 2px; z-index: 0; }
.phone__btn--vol { left: -2px; top: 72px; width: 2px; height: 30px; }
.phone__btn--power { right: -2px; top: 88px; width: 2px; height: 40px; }
.phone__screen { position: relative; background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 23px; overflow: hidden; display: flex; flex-direction: column; min-height: 332px; }
.phone__island { position: absolute; top: 7px; left: 50%; transform: translateX(-50%); width: 46px; height: 13px; border-radius: var(--radius-full); background: #0d1512; z-index: 4; }
.ph__status { display: flex; align-items: center; justify-content: space-between; padding: 7px 12px 2px; }
.ph__time { font-size: 0.5rem; font-weight: var(--weight-bold); color: var(--color-text-primary); }
.ph__sig { display: inline-flex; align-items: center; gap: 3px; color: var(--color-text-primary); }
.ph__top { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4) var(--space-3); }
.ph__brand { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.ph__av { width: 21px; height: 21px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-secondary); }
.ph__hero { display: flex; flex-direction: column; gap: 2px; padding: var(--space-4); margin: 0 var(--space-4) var(--space-4); background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.25); border-radius: var(--radius-md); }
.ph__lbl { font-size: 0.5rem; font-weight: var(--weight-medium); letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-text-tertiary); }
.ph__val { font-size: 1.3rem; font-weight: var(--weight-bold); color: #b45309; line-height: 1.1; }
.ph__sub { font-size: 0.5625rem; font-weight: var(--weight-medium); color: #b45309; }
.ph__cap { display: block; font-size: 0.5rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); padding: 0 var(--space-4) 6px; }
.ph__item { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; padding: 0.4rem var(--space-4); font-size: 0.6875rem; }
.ph__dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.ph__dot.pos { background: var(--color-primary); }
.ph__dot.warn { background: #d97706; }
.ph__dot.neg { background: var(--color-error); }
.ph__name { color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ph__amt { color: var(--color-text-secondary); font-weight: var(--weight-semibold); }
.ph__tabs { display: flex; align-items: center; justify-content: space-around; margin-top: auto; padding: var(--space-2) var(--space-2) var(--space-2); border-top: 1px solid var(--color-border); }
.ph__tab { color: var(--color-text-tertiary); display: flex; }
.ph__tab.is-active { color: var(--color-primary); }
.ph__home { width: 64px; height: 3px; border-radius: var(--radius-full); background: var(--color-text-primary); opacity: 0.25; margin: 3px auto 6px; }

@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: var(--space-10); }
  .content { max-width: 560px; }
  .lead { max-width: none; }
  .pair { margin-bottom: var(--space-8); }
}
@media (max-width: 768px) {
  .saas-home { padding: var(--section-pad-y) var(--space-5); }
}
@media (max-width: 480px) {
  .device--phone { width: 132px; right: -6px; bottom: -28px; }
  .th--sku, .td--sku, .th--mod, .td--mod { display: none; }
  .tbl__head, .tbl__row { grid-template-columns: 18px minmax(0, 1.4fr) 46px 78px 18px; }
  .web__tabs { display: none; }
}
</style>
