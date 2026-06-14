<template>
  <section class="hero" ref="heroRef">
    <div class="container hero-top">
      <div class="eyebrow">
        <span class="eyebrow__dot"></span>
        {{ t('home.hero.eyebrow') }}
      </div>

      <h1 class="reveal-on-load delay-1">
        {{ t('home.hero.titleLead') }}
        <span class="highlight">{{ t('home.hero.titleHighlight') }}</span>
      </h1>

      <p class="subtitle reveal-on-load delay-2">
        {{ t('home.hero.subtitle') }}
      </p>

      <div class="hero-buttons reveal-on-load delay-3">
        <router-link to="/contact" class="btn btn--accent btn--lg">
          {{ t('cta.startProject') }}
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
        <router-link to="/saas-development" class="btn btn--secondary btn--lg">
          {{ t('home.hero.ctaSecondary') }}
        </router-link>
      </div>
    </div>

    <!-- Product window mockup -->
    <div class="showcase reveal-on-load delay-4">
      <div class="window" aria-hidden="true">
        <div class="window__bar">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          <div class="window__url">orbit.jouwbedrijf.be/dashboard</div>
        </div>
        <div class="window__body">
          <aside class="app-side">
            <div class="side-top">
              <span class="side-brand">Orbit</span>
              <Search class="side-search" :size="14" :stroke-width="2" />
            </div>
            <a class="nav-item is-active"><LayoutDashboard :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navDashboard') }}</span></a>
            <div class="nav-group">
              <span class="nav-label">{{ t('home.hero.demo.grpAnalytics') }}</span>
              <a class="nav-item"><BarChart3 :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navPerformance') }}</span></a>
              <a class="nav-item"><PieChart :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navOverview') }}</span></a>
            </div>
            <div class="nav-group">
              <span class="nav-label">{{ t('home.hero.demo.grpSupport') }}</span>
              <a class="nav-item"><Users :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navCustomers') }}</span></a>
              <a class="nav-item"><Wallet :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navBudgets') }}</span></a>
            </div>
            <div class="nav-group">
              <span class="nav-label">{{ t('home.hero.demo.grpAccount') }}</span>
              <a class="nav-item"><Settings :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navSettings') }}</span></a>
              <a class="nav-item"><Target :size="15" :stroke-width="2" /><span>{{ t('home.hero.demo.navGoals') }}</span></a>
            </div>
          </aside>
          <div class="app-main">
            <div class="ops-head">
              <div class="ops-head__title">
                <span class="ops-title">{{ t('home.hero.demo.title') }}</span>
                <span class="ops-sub">{{ t('home.hero.demo.subtitle') }}</span>
              </div>
              <div class="ops-user">
                <span class="ops-user__name">Emily Hilton</span>
                <span class="ops-user__av"><User :size="14" :stroke-width="2" /></span>
              </div>
            </div>

            <div class="ops-stats">
              <div class="ops-stat" v-for="s in stats" :key="s.lbl">
                <span class="ops-stat__lbl">{{ s.lbl }}</span>
                <div class="ops-stat__row">
                  <span class="ops-stat__val num">{{ s.val }}</span>
                  <span class="ops-stat__delta" :class="s.up ? 'up' : 'down'">
                    <component :is="s.up ? ArrowUp : ArrowDown" :size="11" :stroke-width="2.5" />{{ s.delta }}
                  </span>
                </div>
              </div>
            </div>

            <div class="ops-lower">
              <div class="ops-panel">
                <div class="ops-panel__head">
                  <div>
                    <span class="ops-panel__title">{{ t('home.hero.demo.reports') }}</span>
                    <span class="ops-panel__sub">{{ t('home.hero.demo.trend') }}</span>
                  </div>
                </div>
                <svg class="ops-chart" viewBox="0 0 700 200" aria-hidden="true">
                  <line x1="20" y1="36" x2="680" y2="36" class="g" />
                  <line x1="20" y1="82" x2="680" y2="82" class="g" />
                  <line x1="20" y1="128" x2="680" y2="128" class="g" />
                  <polyline class="ln ln--red" points="20,138 93,110 166,118 239,108 312,62 385,34 458,68 531,110 604,138 677,146" />
                  <polyline class="ln ln--green" points="20,118 93,100 166,92 239,102 312,110 385,112 458,88 531,74 604,64 677,66" />
                  <line x1="385" y1="112" x2="385" y2="164" class="tip-line" />
                  <rect x="345" y="66" width="92" height="34" rx="6" class="tip-box" />
                  <text x="391" y="80" class="tip-t1">Jun 2025</text>
                  <text x="391" y="93" class="tip-t2">€35,78</text>
                  <circle cx="385" cy="112" r="6" class="tip-dot" />
                  <text v-for="(m, i) in months" :key="m" :x="20 + i * 73" y="188" class="mlabel">{{ m }}</text>
                </svg>
              </div>

              <div class="ops-panel">
                <div class="ops-panel__head">
                  <span class="ops-panel__title">{{ t('home.hero.demo.transactions') }}</span>
                  <span class="ops-panel__link">{{ t('home.hero.demo.seeAll') }}</span>
                </div>
                <div class="tx-list">
                  <div class="tx" v-for="tx in txs" :key="tx.name">
                    <span class="tx__ic" :style="{ background: tx.dot }">{{ tx.ini }}</span>
                    <span class="tx__id">
                      <span class="tx__name">{{ tx.name }}</span>
                      <span class="tx__pay">{{ tx.pay }}</span>
                    </span>
                    <span class="tx__right">
                      <span class="tx__amt num">{{ tx.amount }}</span>
                      <span class="tx__status" :class="tx.cls"><component :is="tx.icon" :size="12" :stroke-width="2" />{{ tx.status }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="showcase__glow"></div>
    </div>

    <!-- Capability strip -->
    <div class="caps reveal-on-load delay-4">
      <component
        :is="cap.to ? 'router-link' : 'div'"
        v-for="cap in caps"
        :key="cap.title"
        :to="cap.to"
        class="cap"
        :class="{ 'cap--static': !cap.to }"
      >
        <component :is="cap.icon" :size="18" :stroke-width="1.6" class="cap__icon" />
        <span class="cap__title">{{ cap.title }}</span>
        <ArrowUpRight v-if="cap.to" class="cap__arrow" :size="14" :stroke-width="1.6" />
      </component>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { Cpu, AppWindow, Workflow, ArrowUpRight, Search, LayoutDashboard, BarChart3, PieChart, Users, Wallet, Settings, Target, User, ArrowUp, ArrowDown, CircleCheck, Clock } from 'lucide-vue-next'

const { t } = useI18n()

// Decorative business-operations dashboard (aria-hidden). Labels follow the site
// language; figures and proper nouns (merchants, months) stay as-is.
const stats = computed(() => [
  { lbl: t('home.hero.demo.s1'), val: '€24.769', delta: '24%', up: true },
  { lbl: t('home.hero.demo.s2'), val: '€56.217', delta: '37%', up: true },
  { lbl: t('home.hero.demo.s3'), val: '€10.421', delta: '14%', up: false },
])

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT']

const txs = computed(() => [
  { ini: 'Qu', name: 'Quantaro', status: t('home.hero.demo.completed'), cls: 'done', icon: CircleCheck, pay: 'Mastercard', amount: '€125.674', dot: '#e2574c' },
  { ini: 'Or', name: 'Orbipay', status: t('home.hero.demo.pending'), cls: 'pending', icon: Clock, pay: 'Visa card', amount: '€354.326', dot: 'var(--color-primary)' },
])

const caps = computed(() => [
  { title: t('home.hero.caps.saas'), icon: AppWindow, to: '/saas-development' },
  { title: t('home.hero.caps.ai'), icon: Cpu, to: '/ai-projecten' },
  { title: t('home.hero.caps.digital'), icon: Workflow, to: null },
])

// The homepage is the heavy landing page — a pure CSS entrance would finish
// during initial load before first paint. So we hold the hero hidden and start
// the staggered fade-up only once it's on screen (after paint), matching the
// reveal pattern used elsewhere on the site.
const heroRef = ref(null)
let observer = null
onMounted(() => {
  const els = heroRef.value?.querySelectorAll('.reveal-on-load') ?? []
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'))
    return
  }
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  els.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-top {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Staggered hero entrance — same fade-up reveal as the AI-automation page.
   The eyebrow stays put; the rise cascade starts at the heading. Held hidden
   until JS adds .visible once the hero is on screen (see script). */
.reveal-on-load {
  opacity: 0;
}
.reveal-on-load.visible {
  animation: fade-up 0.7s var(--ease-out-expo) both;
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.delay-1.visible {
  animation-delay: 80ms;
}
.delay-2.visible {
  animation-delay: 160ms;
}
.delay-3.visible {
  animation-delay: 240ms;
}
.delay-4.visible {
  animation-delay: 360ms;
}

.eyebrow {
  margin-bottom: var(--space-6);
}

h1 {
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
  max-width: 16ch;
}
.highlight {
  color: var(--color-accent);
}

.subtitle {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-8);
  max-width: 60ch;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Product window ── */
.showcase {
  position: relative;
  width: 100%;
  max-width: 1080px;
  margin: var(--space-20) auto 0;
  padding-inline: var(--space-8);
}
.showcase__glow {
  position: absolute;
  inset: 10% 20% auto;
  height: 60%;
  background: var(--color-primary-glow);
  filter: blur(80px);
  opacity: 0.5;
  z-index: -1;
}

.window {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
  overflow: hidden;
}
.window__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-sunken);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border-hover);
}
.window__url {
  margin-left: var(--space-3);
  flex: 1;
  max-width: 240px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  font-size: 11px;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  padding-inline: var(--space-3);
}
.window__body {
  display: grid;
  grid-template-columns: 208px 1fr;
  min-height: 0;
}

.num { font-variant-numeric: tabular-nums; }
.ta-r { text-align: right; }

/* ── Sidebar ── */
.app-side {
  border-right: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  padding: var(--space-4) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.side-top { display: flex; align-items: center; justify-content: space-between; }
.side-brand { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-small); font-weight: var(--weight-bold); color: var(--color-text-primary); }
.side-search { color: var(--color-text-tertiary); }
.nav-group { display: flex; flex-direction: column; gap: 2px; }
.nav-label { font-size: 0.5625rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); margin: var(--space-2) 0 4px var(--space-2); }
.nav-item { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-secondary); padding: 0.38rem var(--space-3); border-radius: var(--radius-md); svg { flex-shrink: 0; color: var(--color-text-tertiary); } }
.nav-item.is-active { background: var(--color-bg-surface); color: var(--color-text-primary); box-shadow: var(--shadow-ambient); svg { color: var(--color-primary); } }

/* ── Main ── */
.app-main {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
}
.ops-head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4); }
.ops-title { display: block; font-family: var(--font-display); font-size: 1.5rem; font-weight: var(--weight-bold); color: var(--color-text-primary); letter-spacing: var(--tracking-tight); line-height: 1.1; }
.ops-sub { display: block; font-size: var(--text-small); color: var(--color-text-secondary); margin-top: 4px; }
.ops-user { display: inline-flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
.ops-user__name { font-size: var(--text-small); font-weight: var(--weight-medium); color: var(--color-text-primary); }
.ops-user__av { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); border: 1px solid var(--color-border); color: var(--color-text-secondary); }

.ops-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
.ops-stat { background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); box-shadow: var(--shadow-ambient); display: flex; flex-direction: column; gap: 6px; }
.ops-stat__lbl { font-size: var(--text-small); color: var(--color-text-secondary); }
.ops-stat__row { display: flex; align-items: center; gap: var(--space-3); }
.ops-stat__val { font-size: 1.35rem; font-weight: var(--weight-bold); color: var(--color-text-primary); letter-spacing: var(--tracking-tight); line-height: 1; }
.ops-stat__delta { display: inline-flex; align-items: center; gap: 2px; font-size: 0.6875rem; font-weight: var(--weight-semibold); padding: 2px 7px; border-radius: var(--radius-full); }
.ops-stat__delta.up { color: var(--color-primary); background: var(--color-primary-subtle); }
.ops-stat__delta.down { color: var(--color-error); background: rgba(220, 38, 38, 0.1); }

.ops-panel { background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.ops-panel__head { display: flex; align-items: flex-start; justify-content: space-between; }
.ops-panel__title { display: block; font-size: var(--text-body); font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.ops-panel__sub { display: block; font-size: var(--text-small); color: var(--color-text-tertiary); margin-top: 2px; }
.ops-panel__link { font-size: var(--text-small); color: var(--color-text-tertiary); }

.ops-chart { width: 100%; height: auto; display: block; }
.ops-chart .g { stroke: var(--color-border); stroke-width: 1; }
.ln { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.ln--green { stroke: var(--color-primary); }
.ln--red { stroke: var(--color-error); }
.tip-line { stroke: var(--color-border-hover); stroke-width: 1; stroke-dasharray: 3 3; }
.tip-box { fill: var(--color-bg-surface); stroke: var(--color-border); }
.tip-dot { fill: var(--color-primary); stroke: var(--color-bg-surface); stroke-width: 3; }
.tip-t1 { fill: var(--color-text-tertiary); font-size: 11px; font-weight: 600; text-anchor: middle; font-family: var(--font-sans); }
.tip-t2 { fill: var(--color-text-primary); font-size: 12px; font-weight: 700; text-anchor: middle; font-family: var(--font-sans); }
.mlabel { fill: var(--color-text-tertiary); font-size: 11px; text-anchor: middle; font-family: var(--font-sans); }

.ops-lower { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-4); align-items: start; }

.tx-list { display: flex; flex-direction: column; gap: var(--space-3); }
.tx { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: var(--space-3); }
.tx__ic { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.5rem; font-weight: var(--weight-bold); color: #fff; }
.tx__id { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.tx__name { font-size: var(--text-small); font-weight: var(--weight-medium); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tx__pay { font-size: 0.625rem; color: var(--color-text-tertiary); }
.tx__right { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; flex-shrink: 0; }
.tx__amt { font-size: var(--text-small); font-weight: var(--weight-semibold); color: var(--color-text-primary); }
.tx__status { display: inline-flex; align-items: center; gap: 3px; font-size: 0.625rem; font-weight: var(--weight-medium); }
.tx__status.done { color: var(--color-primary); }
.tx__status.pending { color: #b45309; }

/* ── Capability strip ── */
.caps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  max-width: 900px;
  margin: var(--space-16) auto 0;
  padding-inline: var(--space-8);
}
.cap {
  position: relative;
  flex: 1 1 220px;
  max-width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-2px);
    .cap__arrow {
      opacity: 1;
      transform: translate(1px, -50%);
    }
  }
}
/* Non-clickable capability (no dedicated page) — same look, no hover affordance. */
.cap--static {
  cursor: default;
}
.cap--static:hover {
  border-color: var(--color-border);
  transform: none;
}
.cap__icon {
  color: var(--color-accent);
  flex-shrink: 0;
}
.cap__title {
  text-align: center;
}
.cap__arrow {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  opacity: 0;
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

@media (max-width: 900px) {
  .window__body {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  /* Hide the sidebar on narrow screens — show just the dashboard. */
  .app-side {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
  }
  .subtitle {
    font-size: var(--text-body);
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    .btn {
      width: 100%;
    }
  }
  .showcase {
    margin-top: var(--space-12);
    padding-inline: var(--space-5);
  }
  .ops-lower {
    grid-template-columns: 1fr;
  }
  .caps {
    margin-top: var(--space-12);
    padding-inline: var(--space-5);
  }
}

@media (max-width: 560px) {
  .app-main {
    padding: var(--space-4);
  }
  .ops-stats {
    grid-template-columns: 1fr;
  }
}

</style>
