<template>
  <!-- Decorative product illustration: hidden from assistive tech, not tabbable.
       Niche: a custom invoicing / facturatie app (mobile). -->
  <div class="phonewrap" aria-hidden="true">
    <div class="phone">
      <span class="phone__btn phone__btn--vol1"></span>
      <span class="phone__btn phone__btn--vol2"></span>
      <span class="phone__btn phone__btn--power"></span>

      <div class="phone__screen">
        <span class="phone__island"></span>

        <div class="statusbar">
          <span class="statusbar__time num">9:41</span>
          <span class="statusbar__icons">
            <Signal :size="12" :stroke-width="2.5" />
            <Wifi :size="12" :stroke-width="2.5" />
            <BatteryMedium :size="16" :stroke-width="2" />
          </span>
        </div>

        <header class="mapp">
          <div class="mapp__id">
            <span class="mapp__title">{{ t('appTitle') }}</span>
            <span class="mapp__sub">{{ t('dateRange') }}</span>
          </div>
          <span class="mapp__avatar"><User :size="15" :stroke-width="2" /></span>
        </header>

        <div class="mbody">
          <div class="hero">
            <span class="hero__lbl">{{ t('outstanding') }}</span>
            <span class="hero__val num">€4.280</span>
            <div class="hero__chips">
              <span class="chip chip--pos"><ArrowUp :size="11" :stroke-width="2.5" />€18,4k {{ t('paidWord') }}</span>
              <span class="chip chip--neg"><ArrowDown :size="11" :stroke-width="2.5" />€1.120 {{ t('overdueWord') }}</span>
            </div>
          </div>

          <div class="mcard">
            <div class="mcard__head">
              <span class="cap">{{ t('recentInvoices') }}</span>
              <span class="mcard__see">{{ t('seeAll') }}</span>
            </div>
            <div class="ilist">
              <div class="irow" v-for="inv in invoices" :key="inv.id">
                <span class="irow__main">
                  <span class="irow__name">{{ inv.name }}</span>
                  <span class="irow__id code">{{ inv.id }}</span>
                </span>
                <span class="irow__right">
                  <span class="irow__amt num">{{ inv.amount }}</span>
                  <span class="tag" :class="inv.cls">{{ inv.status }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav class="mtabs">
          <span class="mtab is-active"><LayoutDashboard :size="16" :stroke-width="2" /><span>{{ t('navOverview') }}</span></span>
          <span class="mtab"><Receipt :size="16" :stroke-width="2" /><span>{{ t('navInvoices') }}</span></span>
          <span class="mtab"><Users :size="16" :stroke-width="2" /><span>{{ t('navCustomers') }}</span></span>
          <span class="mtab"><Settings :size="16" :stroke-width="2" /><span>{{ t('navSettings') }}</span></span>
        </nav>

        <span class="home-indicator"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LayoutDashboard, Receipt, Users, Settings, User, ArrowUp, ArrowDown, Signal, Wifi, BatteryMedium } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      appTitle: 'Facturatie', dateRange: 'Deze maand',
      outstanding: 'Openstaand', paidWord: 'betaald', overdueWord: 'te laat',
      recentInvoices: 'Recente facturen', seeAll: 'Alles',
      navOverview: 'Overzicht', navInvoices: 'Facturen', navCustomers: 'Klanten', navSettings: 'Instellingen',
      paid: 'Betaald', open: 'Open', overdue: 'Te laat',
    },
    en: {
      appTitle: 'Invoicing', dateRange: 'This month',
      outstanding: 'Outstanding', paidWord: 'paid', overdueWord: 'overdue',
      recentInvoices: 'Recent invoices', seeAll: 'All',
      navOverview: 'Overview', navInvoices: 'Invoices', navCustomers: 'Customers', navSettings: 'Settings',
      paid: 'Paid', open: 'Open', overdue: 'Overdue',
    },
  },
})

const invoices = computed(() => [
  { id: 'F-2025-118', name: 'Vandenberghe nv', amount: '€2.480', status: t('paid'), cls: 'pos' },
  { id: 'F-2025-117', name: 'Claes retail', amount: '€1.150', status: t('open'), cls: 'neutral' },
  { id: 'F-2025-116', name: 'Mertens bvba', amount: '€860', status: t('overdue'), cls: 'neg' },
  { id: 'F-2025-115', name: 'Dewals & co', amount: '€3.275', status: t('paid'), cls: 'pos' },
])
</script>

<style scoped lang="scss">
.num { font-variant-numeric: tabular-nums; }
.code { font-family: var(--font-mono); }

.phonewrap { position: relative; display: flex; justify-content: center; padding: var(--space-4) 0; }
.phonewrap::before {
  content: ''; position: absolute; z-index: 0; top: 50%; left: 50%;
  width: 320px; height: 380px; transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--color-primary-subtle), transparent 70%);
  filter: blur(28px);
}

/* ── Phone shell: even bezel, concentric corners, hardware details ── */
.phone {
  position: relative; z-index: 1; width: min(294px, 100%);
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: 44px; padding: 10px;
  box-shadow: var(--shadow-ambient);
}
.phone__btn { position: absolute; background: var(--color-border-hover); border-radius: 2px; z-index: 0; }
.phone__btn--vol1 { left: -2px; top: 104px; width: 3px; height: 28px; }
.phone__btn--vol2 { left: -2px; top: 140px; width: 3px; height: 28px; }
.phone__btn--power { right: -2px; top: 128px; width: 3px; height: 56px; }

.phone__screen { position: relative; background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 33px; overflow: hidden; display: flex; flex-direction: column; }
.phone__island { position: absolute; top: 9px; left: 50%; transform: translateX(-50%); width: 84px; height: 22px; border-radius: var(--radius-full); background: #0d1512; z-index: 4; }

/* status bar */
.statusbar { display: flex; align-items: center; justify-content: space-between; padding: 11px 20px 4px; }
.statusbar__time { font-size: 0.6875rem; font-weight: var(--weight-bold); color: var(--color-text-primary); }
.statusbar__icons { display: inline-flex; align-items: center; gap: 5px; color: var(--color-text-primary); }

.mapp { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); }
.mapp__id { display: flex; flex-direction: column; gap: 2px; }
.mapp__title { font-size: var(--text-small); font-weight: var(--weight-bold); color: var(--color-text-primary); }
.mapp__sub { font-size: 0.625rem; color: var(--color-text-tertiary); }
.mapp__avatar { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-secondary); }

.mbody { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-4); }

.cap { display: inline-flex; align-items: center; gap: 6px; font-size: 0.5625rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); }

/* Outstanding hero */
.hero { background: var(--color-bg-sunken); border-radius: var(--radius-md); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.hero__lbl { font-size: 0.5625rem; font-weight: var(--weight-medium); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); }
.hero__val { font-size: 1.9rem; font-weight: var(--weight-bold); color: var(--color-text-primary); line-height: 1; letter-spacing: var(--tracking-tight); }
.hero__chips { display: flex; gap: var(--space-2); }
.chip { display: inline-flex; align-items: center; gap: 3px; font-size: 0.5625rem; font-weight: var(--weight-semibold); padding: 3px 8px; border-radius: var(--radius-full); }
.chip--pos { color: var(--color-primary); background: var(--color-primary-subtle); }
.chip--neg { color: var(--color-error); background: rgba(220, 38, 38, 0.09); }

.mcard { background: var(--color-bg-sunken); border-radius: var(--radius-md); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
.mcard__head { display: flex; align-items: center; justify-content: space-between; }
.mcard__see { font-size: 0.5625rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); }

.ilist { display: flex; flex-direction: column; }
.irow { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: var(--space-3); padding: 0.45rem 0; border-top: 1px solid var(--color-border); }
.irow:first-child { border-top: none; }
.irow__main { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.irow__name { font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.irow__id { font-size: 0.5625rem; color: var(--color-text-tertiary); }
.irow__right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
.irow__amt { font-size: 0.75rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.tag { font-size: 0.5rem; font-weight: var(--weight-semibold); padding: 0.1rem 0.45rem; border-radius: var(--radius-full); white-space: nowrap; }
.tag.pos { color: var(--color-primary); background: var(--color-primary-subtle); }
.tag.neg { color: var(--color-error); background: rgba(220, 38, 38, 0.09); }
.tag.neutral { color: var(--color-text-secondary); background: var(--color-bg-surface); }

.mtabs { display: flex; align-items: center; justify-content: space-around; padding: var(--space-3) var(--space-2) var(--space-2); border-top: 1px solid var(--color-border); }
.mtab { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 0.5rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); }
.mtab.is-active { color: var(--color-primary); }

.home-indicator { width: 108px; height: 4px; border-radius: var(--radius-full); background: var(--color-text-primary); opacity: 0.25; margin: 4px auto 8px; }
</style>
