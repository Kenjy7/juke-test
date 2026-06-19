<template>
  <BackgroundWeb>
    <!-- ───────────── Hero ───────────── -->
    <section class="bh-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('beheerlyView.hero.eyebrow') }}
          </div>
          <h1>
            {{ t('beheerlyView.hero.titleLead') }}
            <span class="highlight">{{ t('beheerlyView.hero.titleHighlight') }}</span>
          </h1>
          <p class="subtitle">
            {{ t('beheerlyView.hero.subtitle') }}
          </p>
          <div class="hero-buttons">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'beheerly' } }"
              class="btn btn--accent btn--lg"
            >
              {{ t('beheerlyView.hero.ctaPrimary') }}
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
            <a href="#functies" class="btn btn--secondary btn--lg">
              {{ t('beheerlyView.hero.ctaSecondary') }}
            </a>
          </div>
          <p class="hero-note">
            {{ t('beheerlyView.hero.note') }}
          </p>
        </div>

        <!-- App visual: Beheerly dashboard mockup (mirrors the real product UI) -->
        <div class="hero-visual" aria-hidden="true">
          <div class="appwin" ref="appwinEl">
            <div class="appwin__bar">
              <span class="dd"></span><span class="dd"></span><span class="dd"></span>
              <span class="appwin__title">app.beheerly.be/dashboard</span>
            </div>
            <!-- Product top bar -->
            <div class="appwin__top">
              <span class="brand">
                <span class="brand__logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M4 11.5 12 5l8 6.5" />
                    <path d="M6 10.5V19h12v-8.5" />
                    <path d="M10.5 19v-4h3v4" />
                  </svg>
                </span>
                <span class="brand__name">Beheerly</span>
              </span>
              <span class="appwin__account">
                <span class="appwin__email">kenjy@test.be</span>
                <span class="appwin__logout">{{ t('beheerlyView.mockup.logout') }}</span>
              </span>
            </div>
            <div class="appwin__shell">
              <!-- Sidebar -->
              <aside class="appnav">
                <nav class="appnav__list">
                  <span
                    class="appnav__item"
                    v-for="n in nav"
                    :key="n.label"
                    :class="{ 'appnav__item--active': n.active }"
                  >
                    <span class="appnav__ico" v-html="n.icon"></span>
                    {{ n.label }}
                  </span>
                </nav>
              </aside>

              <!-- Main panel -->
              <div class="appmain">
                <div class="appmain__head">
                  <span class="appmain__title">{{ t('beheerlyView.mockup.dashboardTitle') }}</span>
                  <span class="appmain__sub">{{ t('beheerlyView.mockup.dashboardSub') }}</span>
                </div>

                <div class="statrow">
                  <div class="stat" v-for="s in stats" :key="s.label">
                    <span class="stat__val">{{ s.value }}</span>
                    <span class="stat__lbl">{{ s.label }}</span>
                  </div>
                </div>

                <div class="tickets">
                  <span class="tickets__head">{{ t('beheerlyView.mockup.recentTickets') }}</span>
                  <div class="trow" v-for="(tk, i) in tickets" :key="i">
                    <span class="trow__main">
                      <span class="trow__title">
                        {{ tk.title }}
                        <svg
                          v-if="tk.ai"
                          class="trow__ai"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2l1.6 4.8L18 8.4l-4.4 1.6L12 15l-1.6-5L6 8.4l4.4-1.6L12 2z"
                          />
                        </svg>
                      </span>
                      <span class="trow__meta">{{ tk.meta }}</span>
                    </span>
                    <span class="badge" :class="'badge--' + tk.tone">{{ tk.badge }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── What is it ───────────── -->
    <section class="bh-intro">
      <div class="container intro-grid">
        <h2>{{ t('beheerlyView.intro.title') }}</h2>
        <div class="intro-body">
          <p>
            {{ t('beheerlyView.intro.paragraph1') }}
          </p>
          <p>
            <strong>Beheerly</strong> {{ t('beheerlyView.intro.paragraph2a') }} <strong>AI</strong>
            {{ t('beheerlyView.intro.paragraph2b') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ───────────── Flow ───────────── -->
    <section class="bh-flow">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.flow.title') }}</h2>
          <p>{{ t('beheerlyView.flow.subtitle') }}</p>
        </div>
        <ol class="flow-steps">
          <li class="flow-step" v-for="(s, i) in steps" :key="s.title">
            <span class="flow-step__num">{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ───────────── Feature spotlights (real screenshots) ───────────── -->
    <section class="bh-spot" id="functies">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.spotlights.title') }}</h2>
          <p>{{ t('beheerlyView.spotlights.subtitle') }}</p>
        </div>

        <div
          class="spot"
          v-for="(s, i) in spotlights"
          :key="s.key"
          :class="{ 'spot--reverse': i % 2 === 1 }"
        >
          <div class="spot__text">
            <span class="spot__label">{{ s.label }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.body }}</p>
            <ul class="checks">
              <li v-for="c in s.checks" :key="c"><Check :size="16" :stroke-width="2.5" />{{ c }}</li>
            </ul>
          </div>
          <figure class="spot__visual">
            <div class="shot__frame">
              <div class="shot__bar"><span></span><span></span><span></span></div>
              <img
                v-if="!broken[s.key]"
                :src="s.src"
                :alt="s.alt"
                loading="lazy"
                decoding="async"
                class="shot__img"
                @click="openLightbox(s)"
                @error="broken[s.key] = true"
              />
              <div v-else class="shot__placeholder">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="9.5" r="1.5" />
                  <path d="M21 15l-5-5L5 18" />
                </svg>
                <span>{{ t('beheerlyView.spotlights.placeholder') }}</span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <!-- ───────────── Rest of the platform ───────────── -->
    <section class="bh-platform">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.platform.title') }}</h2>
          <p>{{ t('beheerlyView.platform.subtitle') }}</p>
        </div>
        <div class="mod-grid">
          <div class="mod-card" v-for="m in platformItems" :key="m.title">
            <div class="mod-card__icon">
              <component :is="m.icon" :size="20" :stroke-width="1.8" aria-hidden="true" />
            </div>
            <h3>{{ m.title }}</h3>
            <p>{{ m.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── Why syndics benefit ───────────── -->
    <section class="bh-why">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('beheerlyView.why.title') }}</h2>
          <p>{{ t('beheerlyView.why.subtitle') }}</p>
        </div>
        <div class="why-grid">
          <div class="why-card" v-for="w in whyItems" :key="w.title">
            <div class="why-card__icon">
              <component :is="w.icon" :size="22" :stroke-width="1.8" aria-hidden="true" />
            </div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────── FAQ — shared FaqItem design (same as SaaS & AI pages) ───────────── -->
    <section class="bh-faq" id="faq">
      <div class="container">
        <header class="faq-header">
          <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('beheerlyView.faq.eyebrow') }}</span>
          <h2>{{ t('beheerlyView.faq.title') }}</h2>
          <p class="lead">
            {{ t('beheerlyView.faq.leadBefore') }}
            <router-link to="/contact">{{ t('beheerlyView.faq.leadLink') }}</router-link>
            {{ t('beheerlyView.faq.leadAfter') }}
          </p>
        </header>
        <div class="faq-list">
          <FaqItem
            v-for="(q, index) in faqs"
            :key="index"
            :question="q.question"
            :answer="q.answer"
            :index="index"
          />
        </div>
      </div>
    </section>

    <!-- ───────────── CTA ───────────── -->
    <section class="bh-cta">
      <div class="container">
        <div class="bh-cta__panel band--dark">
          <h2>{{ t('beheerlyView.cta.title') }}</h2>
          <p>{{ t('beheerlyView.cta.body') }}</p>
          <div class="cta-actions">
            <router-link
              :to="{ path: '/contact', query: { interesse: 'beheerly' } }"
              class="btn btn--accent btn--lg"
            >
              {{ t('beheerlyView.cta.ctaContact') }}
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
            <a href="#faq" class="btn btn--secondary btn--lg">{{ t('beheerlyView.cta.ctaFaq') }}</a>
          </div>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <div
        v-if="lightbox.src"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Vergrote schermafbeelding"
        @click="closeLightbox"
      >
        <button class="lightbox__close" type="button" aria-label="Sluiten" @click="closeLightbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
        <img :src="lightbox.src" :alt="lightbox.alt" class="lightbox__img" />
      </div>
    </Teleport>
  </BackgroundWeb>
</template>

<script setup>
import { reactive, ref, watch, nextTick, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import {
  Check,
  LayoutDashboard,
  Users,
  FileCheck,
  HelpCircle,
  Megaphone,
  Inbox,
  HardHat,
  Settings,
  Layers,
  ShieldCheck,
  Scale,
  Sparkles,
} from 'lucide-vue-next'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import FaqItem from '@/components/FaqItem.vue'

const { t, locale } = useI18n()

const SITE = 'https://jukecoding.be'
const ORG_ID = `${SITE}/#organization`
const UPDATED_ISO = '2026-06-16'

// nl is the default (unprefixed) locale; en lives under /en.
const pageUrl = computed(() => (locale.value === 'en' ? `${SITE}/en/beheerly` : `${SITE}/beheerly`))
const ogLocale = computed(() => (locale.value === 'en' ? 'en_US' : 'nl_BE'))

// ── Hero mock: shared product shell (CSS, not a screenshot, so it loads instantly) ──
const nav = computed(() => [
  {
    label: t('beheerlyView.mockup.nav.dashboard'),
    active: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.buildings'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18M5 21V5l8-2v18M19 21V11l-6-2"/><path d="M9 8h.01M9 12h.01M9 16h.01"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.tickets'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 13l2.2-7h11.6L20 13"/><path d="M4 13v5h16v-5"/><path d="M4 13h4l1 2h6l1-2h4"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.inbox'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h16v12H4zM4 16l3-3h10l3 3"/><path d="M9 13a3 3 0 0 0 6 0"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.documentQa'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9.6 12.4a1.6 1.6 0 1 1 2.4 1.4c-.5.3-.9.6-.9 1.3"/><path d="M11 18h.01"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.siteFollowup'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 4h6l1 2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3z"/><path d="M9 13l2 2 4-4"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.claims'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M15.5 9.2a4 4 0 1 0 0 5.6"/><path d="M7.5 11h6M7.5 13.2h6"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.quotes'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  },
  {
    label: t('beheerlyView.mockup.nav.meetings'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M18 20a6 6 0 0 0-3-5.2"/></svg>',
  },
])

const stats = computed(() => [
  { value: '3', label: t('beheerlyView.mockup.stats.buildings') },
  { value: '11', label: t('beheerlyView.mockup.stats.openTickets') },
  { value: '3', label: t('beheerlyView.mockup.stats.openQuotes') },
])

const tickets = computed(() => [
  {
    title: t('beheerlyView.mockup.tickets.t1.title'),
    meta: t('beheerlyView.mockup.tickets.t1.meta'),
    badge: t('beheerlyView.mockup.tickets.t1.badge'),
    tone: 'warn',
    ai: true,
  },
  {
    title: t('beheerlyView.mockup.tickets.t2.title'),
    meta: t('beheerlyView.mockup.tickets.t2.meta'),
    badge: t('beheerlyView.mockup.tickets.t2.badge'),
    tone: 'danger',
    ai: true,
  },
  {
    title: t('beheerlyView.mockup.tickets.t3.title'),
    meta: t('beheerlyView.mockup.tickets.t3.meta'),
    badge: t('beheerlyView.mockup.tickets.t3.badge'),
    tone: 'warn',
    ai: true,
  },
  {
    title: t('beheerlyView.mockup.tickets.t4.title'),
    meta: t('beheerlyView.mockup.tickets.t4.meta'),
    badge: t('beheerlyView.mockup.tickets.t4.badge'),
    tone: 'normal',
  },
])

const steps = computed(() => [
  {
    title: t('beheerlyView.steps.complaint.title'),
    description: t('beheerlyView.steps.complaint.description'),
  },
  {
    title: t('beheerlyView.steps.quoteRequest.title'),
    description: t('beheerlyView.steps.quoteRequest.description'),
  },
  {
    title: t('beheerlyView.steps.award.title'),
    description: t('beheerlyView.steps.award.description'),
  },
  {
    title: t('beheerlyView.steps.siteFollowup.title'),
    description: t('beheerlyView.steps.siteFollowup.description'),
  },
  {
    title: t('beheerlyView.steps.delivery.title'),
    description: t('beheerlyView.steps.delivery.description'),
  },
])

// ── Feature spotlights — real screenshots. Drop the PNGs in /public/screenshots/
// with the filenames below; until a file exists, a "Screenshot volgt" frame shows.
// `broken` tracks load failures per spotlight key so the fallback is reactive
// without losing locale-reactivity on the copy. ──
const broken = reactive({})

// Click a screenshot to view it enlarged in a lightbox.
const lightbox = reactive({ src: '', alt: '' })
function openLightbox(s) {
  lightbox.src = s.src
  lightbox.alt = s.alt
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.src = ''
  lightbox.alt = ''
  document.body.style.overflow = ''
}
function onLightboxKey(e) {
  if (e.key === 'Escape') closeLightbox()
}

// ── Keep the hero dashboard mock fully visible on every screen ──
// The mock is built at a fixed "design width" so its internal proportions match
// the desktop product exactly. Rather than reflow those internals on small
// screens — which made the sidebar crowd the panel and look unrealistic — we
// shrink the whole window as a single unit (like zooming out on a photo) so it
// always fits its column: identical proportions, no cropping, no overflow.
const appwinEl = ref(null)
// Desktop keeps the wider, approved proportions; small screens use a more
// compact design so the same column renders the window noticeably bigger.
const DESIGN_WIDTH_DESKTOP = 600
const DESIGN_WIDTH_MOBILE = 480
let appwinResizeObserver = null
let lastFitWidth = -1

function fitDashboardMock() {
  const el = appwinEl.value
  const parent = el?.parentElement
  if (!el || !parent) return
  const available = parent.clientWidth
  // Skip when the available width hasn't changed (e.g. a height-only resize),
  // which also stops our own tweaks from re-triggering the observer.
  if (available === lastFitWidth) return
  lastFitWidth = available

  // Pin the mock to its design width, then scale the whole window with
  // `transform: scale()` so it exactly fills its (centred) column. We avoid
  // `zoom` here because iOS Safari handles fractional `zoom` on a fixed-width
  // box unreliably — it kept the window at full width and cropped it off the
  // right edge on phones. `transform` is universally supported and scales the
  // window as a single unit: identical proportions, no reflow.
  //
  // Two follow-ups make `transform` behave like `zoom` did: (1) the layout box
  // isn't shrunk by `transform`, so a down-scaled window would still overflow
  // its column — `.hero-visual { overflow: hidden }` clips that stray box while
  // the visible (centred) content fits exactly; (2) the reserved height isn't
  // shrunk either, so we set the parent's height to the scaled height to remove
  // the leftover vertical gap. The compact mobile design lets it render bigger
  // on phones than the 600 desktop design would allow.
  const designWidth = window.innerWidth >= 900 ? DESIGN_WIDTH_DESKTOP : DESIGN_WIDTH_MOBILE
  const scale = available / designWidth
  el.style.zoom = '' // clear any value left by older builds
  el.style.width = `${designWidth}px`
  // Anchor top-left and scale from there: the painted width equals `available`,
  // so a left-anchored box fills the column exactly from its left edge. A
  // `center` origin only lands centred when the (over-wide) box is itself
  // centred first — but an inline-block wider than its line stays flush-left, so
  // a centre pivot pushed the window's right edge off-screen on phones.
  el.style.transformOrigin = 'top left'
  el.style.transform = `scale(${scale})`
  // `offsetHeight` is the untransformed layout height; the visible height is
  // that times the scale. Pin the column to it so nothing below floats away.
  parent.style.height = `${el.offsetHeight * scale}px`
}

// Re-fit when the locale flips (translated copy can change the mock's height).
watch(locale, () => {
  lastFitWidth = -1
  nextTick(fitDashboardMock)
})

onMounted(() => {
  window.addEventListener('keydown', onLightboxKey)
  nextTick(fitDashboardMock)
  const parent = appwinEl.value?.parentElement
  if (parent && 'ResizeObserver' in window) {
    appwinResizeObserver = new ResizeObserver(() => fitDashboardMock())
    appwinResizeObserver.observe(parent)
  } else {
    window.addEventListener('resize', fitDashboardMock)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onLightboxKey)
  window.removeEventListener('resize', fitDashboardMock)
  appwinResizeObserver?.disconnect()
  document.body.style.overflow = ''
})

const spotlights = computed(() => [
  {
    key: 'buildings',
    src: '/screenshots/beheerly-gebouwen.png',
    label: t('beheerlyView.spotlights.buildings.label'),
    title: t('beheerlyView.spotlights.buildings.title'),
    body: t('beheerlyView.spotlights.buildings.body'),
    checks: [
      t('beheerlyView.spotlights.buildings.check1'),
      t('beheerlyView.spotlights.buildings.check2'),
      t('beheerlyView.spotlights.buildings.check3'),
    ],
    alt: t('beheerlyView.spotlights.buildings.alt'),
    caption: t('beheerlyView.spotlights.buildings.caption'),
  },
  {
    key: 'tickets',
    src: '/screenshots/beheerly-tickets.png',
    label: t('beheerlyView.spotlights.tickets.label'),
    title: t('beheerlyView.spotlights.tickets.title'),
    body: t('beheerlyView.spotlights.tickets.body'),
    checks: [
      t('beheerlyView.spotlights.tickets.check1'),
      t('beheerlyView.spotlights.tickets.check2'),
      t('beheerlyView.spotlights.tickets.check3'),
    ],
    alt: t('beheerlyView.spotlights.tickets.alt'),
    caption: t('beheerlyView.spotlights.tickets.caption'),
  },
  {
    key: 'quotes',
    src: '/screenshots/beheerly-offertes.png',
    label: t('beheerlyView.spotlights.quotes.label'),
    title: t('beheerlyView.spotlights.quotes.title'),
    body: t('beheerlyView.spotlights.quotes.body'),
    checks: [
      t('beheerlyView.spotlights.quotes.check1'),
      t('beheerlyView.spotlights.quotes.check2'),
      t('beheerlyView.spotlights.quotes.check3'),
    ],
    alt: t('beheerlyView.spotlights.quotes.alt'),
    caption: t('beheerlyView.spotlights.quotes.caption'),
  },
  {
    key: 'site',
    src: '/screenshots/beheerly-werfopvolging.png',
    label: t('beheerlyView.spotlights.site.label'),
    title: t('beheerlyView.spotlights.site.title'),
    body: t('beheerlyView.spotlights.site.body'),
    checks: [
      t('beheerlyView.spotlights.site.check1'),
      t('beheerlyView.spotlights.site.check2'),
      t('beheerlyView.spotlights.site.check3'),
    ],
    alt: t('beheerlyView.spotlights.site.alt'),
    caption: t('beheerlyView.spotlights.site.caption'),
  },
  {
    key: 'arrears',
    src: '/screenshots/beheerly-achterstanden.png',
    label: t('beheerlyView.spotlights.arrears.label'),
    title: t('beheerlyView.spotlights.arrears.title'),
    body: t('beheerlyView.spotlights.arrears.body'),
    checks: [
      t('beheerlyView.spotlights.arrears.check1'),
      t('beheerlyView.spotlights.arrears.check2'),
      t('beheerlyView.spotlights.arrears.check3'),
    ],
    alt: t('beheerlyView.spotlights.arrears.alt'),
    caption: t('beheerlyView.spotlights.arrears.caption'),
  },
])

// ── Rest of the platform (no screenshot) — compact module grid. ──
const platformItems = computed(() => [
  { icon: LayoutDashboard, title: t('beheerlyView.platform.dashboard.title'), description: t('beheerlyView.platform.dashboard.description') },
  { icon: Users, title: t('beheerlyView.platform.meetings.title'), description: t('beheerlyView.platform.meetings.description') },
  { icon: FileCheck, title: t('beheerlyView.platform.certificates.title'), description: t('beheerlyView.platform.certificates.description') },
  { icon: HelpCircle, title: t('beheerlyView.platform.documentQa.title'), description: t('beheerlyView.platform.documentQa.description') },
  { icon: Megaphone, title: t('beheerlyView.platform.announcements.title'), description: t('beheerlyView.platform.announcements.description') },
  { icon: Inbox, title: t('beheerlyView.platform.inbox.title'), description: t('beheerlyView.platform.inbox.description') },
  { icon: HardHat, title: t('beheerlyView.platform.contractors.title'), description: t('beheerlyView.platform.contractors.description') },
  { icon: Settings, title: t('beheerlyView.platform.team.title'), description: t('beheerlyView.platform.team.description') },
])

// ── Why a syndic benefits — outcomes, not features. ──
const whyItems = computed(() => [
  { icon: Layers, title: t('beheerlyView.why.onePlatform.title'), description: t('beheerlyView.why.onePlatform.description') },
  { icon: ShieldCheck, title: t('beheerlyView.why.transparency.title'), description: t('beheerlyView.why.transparency.description') },
  { icon: Scale, title: t('beheerlyView.why.legal.title'), description: t('beheerlyView.why.legal.description') },
  { icon: Sparkles, title: t('beheerlyView.why.ai.title'), description: t('beheerlyView.why.ai.description') },
])

const faqs = computed(() => [
  { question: t('beheerlyView.faqItems.q1.question'), answer: t('beheerlyView.faqItems.q1.answer') },
  { question: t('beheerlyView.faqItems.q2.question'), answer: t('beheerlyView.faqItems.q2.answer') },
  { question: t('beheerlyView.faqItems.q3.question'), answer: t('beheerlyView.faqItems.q3.answer') },
  { question: t('beheerlyView.faqItems.q4.question'), answer: t('beheerlyView.faqItems.q4.answer') },
  { question: t('beheerlyView.faqItems.q5.question'), answer: t('beheerlyView.faqItems.q5.answer') },
  { question: t('beheerlyView.faqItems.q6.question'), answer: t('beheerlyView.faqItems.q6.answer') },
])

// ── SEO. Title/description stay Dutch (don't translate meta/schema for SEO).
// Org/Website @ids are defined globally in index.html and referenced here so the
// page joins one entity graph. ──
const SEO_TITLE = 'Beheerly — Software voor syndicus, VME & mede-eigendom | Juke'
const SEO_DESC =
  'Beheerly is de syndicussoftware voor Belgische syndici en VME’s: meldingen, offertes, werfopvolging en achterstanden (bestuurdersbeheer) in één systeem, met AI voor triage en samenvattingen. Boek een demo.'

const softwareJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${pageUrl.value}#beheerly`,
  name: 'Beheerly',
  alternateName:
    locale.value === 'en'
      ? ['Property management software', 'VME software']
      : ['Syndicussoftware', 'VME-software', 'Bestuurdersbeheersoftware'],
  applicationCategory: 'BusinessApplication',
  applicationSubCategory:
    locale.value === 'en' ? 'Property management software' : 'Syndicus- & VME-beheersoftware',
  keywords:
    locale.value === 'en'
      ? 'property management software, VME software, co-ownership management, syndic software'
      : 'software voor syndicus, syndicussoftware, VME-software, beheersoftware mede-eigendom, bestuurdersbeheersoftware',
  operatingSystem: 'Web, iOS, Android (PWA)',
  url: pageUrl.value,
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  description: SEO_DESC,
  creator: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  audience: {
    '@type': 'Audience',
    audienceType:
      locale.value === 'en'
        ? 'Property managers and co-ownerships (VMEs)'
        : "Syndici en mede-eigendommen (VME's)",
  },
  areaServed: { '@type': 'Country', name: 'Belgium' },
  datePublished: UPDATED_ISO,
  dateModified: UPDATED_ISO,
}))

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl.value}#faq`,
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  mainEntity: faqs.value.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}))

const webPageJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl.value}#webpage`,
  url: pageUrl.value,
  name: SEO_TITLE,
  description: SEO_DESC,
  inLanguage: locale.value === 'en' ? 'en' : 'nl-BE',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${pageUrl.value}#beheerly` },
  primaryImageOfPage: `${SITE}/og-beheerly.jpg`,
  datePublished: UPDATED_ISO,
  dateModified: UPDATED_ISO,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.bh-intro h2', '.intro-body'],
  },
}))

const breadcrumbJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: locale.value === 'en' ? `${SITE}/en` : `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Beheerly', item: pageUrl.value },
  ],
}))

useHead(() => ({
  title: SEO_TITLE,
  meta: [
    { name: 'description', content: SEO_DESC },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: SEO_TITLE },
    { property: 'og:description', content: SEO_DESC },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl.value },
    { property: 'og:image', content: `${SITE}/og-beheerly.jpg` },
    { property: 'og:image:width', content: '2256' },
    { property: 'og:image:height', content: '1187' },
    { property: 'og:site_name', content: 'Juke' },
    { property: 'og:locale', content: ogLocale.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: SEO_TITLE },
    { name: 'twitter:description', content: SEO_DESC },
    { name: 'twitter:image', content: `${SITE}/og-beheerly.jpg` },
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value },
    { rel: 'alternate', hreflang: 'nl-BE', href: `${SITE}/beheerly` },
    { rel: 'alternate', hreflang: 'en', href: `${SITE}/en/beheerly` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE}/beheerly` },
  ],
  script: [
    { key: 'ld-beheerly-software', type: 'application/ld+json', children: JSON.stringify(softwareJsonLd.value) },
    { key: 'ld-beheerly-faq', type: 'application/ld+json', children: JSON.stringify(faqJsonLd.value) },
    { key: 'ld-beheerly-webpage', type: 'application/ld+json', children: JSON.stringify(webPageJsonLd.value) },
    { key: 'ld-beheerly-breadcrumb', type: 'application/ld+json', children: JSON.stringify(breadcrumbJsonLd.value) },
  ],
}))
</script>

<style scoped lang="scss">
.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* ── Hero ── */
.bh-hero {
  padding: var(--hero-pad-top) var(--space-8) var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-grid {
  display: grid;
  /* minmax(0, …) instead of 1fr: a bare 1fr track has min-width:auto, so the
     fixed-width (script-scaled) dashboard window would force its column to the
     window's full design width and overflow the page. The 0 floor lets the
     column shrink and the window scales to fit it. */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: var(--space-16);
  align-items: center;
  width: 100%;
}
.hero-copy {
  animation: fade-up 0.7s var(--ease-out-expo) 0.1s both;
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

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-5);
}
.eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

h1 {
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-5) 0;
}
.highlight {
  color: var(--color-accent);
}

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-8);
  max-width: 54ch;
}
.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.hero-note {
  margin: var(--space-5) 0 0;
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
}

/* ── Beheerly dashboard mockup (mirrors the real product UI) ──
   The product runs its own navy + serif identity; we keep that inside the
   window frame so it reads as "the app", not as a recolour of the site. */
.hero-visual {
  animation: fade-up 0.7s var(--ease-out-expo) both;
  /* Left-align the window: the script scales it from its top-left corner to
     fill this column exactly, so the box must start at the column's left edge.
     The column spans the container, so the filled result reads as centred on
     the page. (Centring an over-wide inline-block here let the scale pivot
     off-centre and cropped the window's right edge on phones.) */
  text-align: left;
  /* The mock is pinned to a fixed design width and scaled down with
     `transform`, which leaves the (wider) layout box in place. Clip it so that
     stray box can never widen the page or crop off-screen on mobile — the
     visible, centred content scales to fit exactly. */
  overflow: hidden;
}
.appwin {
  display: inline-block;
  vertical-align: top;
  text-align: left; /* reset, so the mock's own content stays left-aligned */
  width: min(600px, 100%); /* design width; script pins it and scales via transform */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: #ffffff;
  box-shadow: var(--shadow-elevated);
  --bee-navy: #1f2d3d;
  --bee-ink: #16202c;
  --bee-line: #e7ebef;
  --bee-muted: #6b7785;
  --bee-active: #eef1f4;
}
.appwin__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
}
.dd {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-border-hover);
}
.appwin__title {
  margin-left: var(--space-3);
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

/* Product top bar */
.appwin__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px var(--space-4);
  background: #ffffff;
  border-bottom: 1px solid var(--bee-line);
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand__logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--bee-navy);
  color: #f3c969;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(svg) {
    width: 13px;
    height: 13px;
  }
}
.brand__name {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--bee-navy);
  letter-spacing: -0.01em;
}
.appwin__account {
  display: flex;
  align-items: center;
  gap: 10px;
}
.appwin__email,
.appwin__logout {
  font-size: 10px;
  color: var(--bee-muted);
}
.appwin__logout {
  font-weight: var(--weight-semibold);
}

.appwin__shell {
  display: grid;
  grid-template-columns: 140px 1fr;
  min-height: 300px;
  background: #ffffff;
}

/* Sidebar */
.appnav {
  border-right: 1px solid var(--bee-line);
  background: #ffffff;
  padding: var(--space-3) var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.appnav__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.appnav__item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px var(--space-2);
  border-radius: var(--radius-md);
  font-size: 11px;
  color: var(--bee-muted);
  white-space: nowrap;
}
.appnav__item--active {
  background: var(--bee-active);
  color: var(--bee-ink);
  font-weight: var(--weight-semibold);
}
.appnav__ico {
  display: flex;
  flex-shrink: 0;
  :deep(svg) {
    width: 14px;
    height: 14px;
  }
}
.appnav__item--active .appnav__ico {
  color: var(--bee-navy);
}

/* Main panel */
.appmain {
  padding: var(--space-4) var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.appmain__head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.appmain__title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--bee-ink);
}
.appmain__sub {
  font-size: 10px;
  color: var(--bee-muted);
}

.statrow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
}
.stat {
  border: 1px solid var(--bee-line);
  border-radius: var(--radius-md);
  background: #fff;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat__val {
  font-size: 18px;
  font-weight: 700;
  color: var(--bee-navy);
  line-height: 1;
}
.stat__lbl {
  font-size: 9px;
  color: var(--bee-muted);
}

.tickets {
  border: 1px solid var(--bee-line);
  border-radius: var(--radius-md);
  background: #fff;
  overflow: hidden;
}
.tickets__head {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-weight: var(--weight-semibold);
  color: var(--bee-muted);
  background: #f7f9fb;
  border-bottom: 1px solid var(--bee-line);
}
.trow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--bee-line);
  &:last-child {
    border-bottom: 0;
  }
}
.trow__main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.trow__title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: var(--weight-medium);
  color: var(--bee-ink);
}
.trow__ai {
  width: 11px;
  height: 11px;
  color: #d99e22;
  flex-shrink: 0;
}
.trow__meta {
  font-size: 9px;
  color: var(--bee-muted);
}
.badge {
  flex-shrink: 0;
  font-size: 9px;
  font-weight: var(--weight-semibold);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
.badge--danger {
  color: #ffffff;
  background: #d6452f;
}
.badge--warn {
  color: #97631a;
  background: #fbedd6;
}
.badge--normal {
  color: #5b6776;
  background: #eef1f4;
}
.badge--accent {
  color: var(--bee-navy);
  background: #e9eef4;
}

/* ── Intro ── */
.bh-intro {
  padding: var(--space-16) var(--space-8);
}
.intro-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: var(--space-12);
  align-items: start;
}
.bh-intro h2 {
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0;
}
.intro-body p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-5);
  &:last-child {
    margin-bottom: 0;
  }
  strong {
    color: var(--color-text-primary);
    font-weight: var(--weight-semibold);
  }
}

/* ── Section head (shared) ── */
.section-head {
  text-align: center;
  margin-bottom: var(--space-12);
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
.section-head h2 {
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-3);
  text-wrap: balance;
}
.section-head p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0;
  a {
    color: var(--color-accent);
  }
}

/* ── Flow steps ── */
.bh-flow {
  padding: var(--space-16) var(--space-8);
}
.flow-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-5);
  counter-reset: step;
}
.flow-step {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  &__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-full);
    background: var(--color-primary-subtle);
    color: var(--color-accent);
    font-weight: var(--weight-bold);
    font-size: var(--text-small);
    margin-bottom: var(--space-4);
  }
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-2);
  }
  p {
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── Feature spotlights ── */
.bh-spot {
  padding: var(--section-pad-y) var(--space-8);
}
.spot {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: var(--space-16);
  align-items: center;
  padding: var(--space-12) 0;
}
.spot--reverse .spot__text {
  order: 2;
}
.spot--reverse .spot__visual {
  order: 1;
}
.spot__label {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}
.spot__text h3 {
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
.spot__text > p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-6);
}
.checks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.checks li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  svg {
    flex-shrink: 0;
    color: var(--color-primary);
  }
}
.spot__visual {
  margin: 0;
}

/* ── Screenshot frame (shared by spotlights) ── */
.shot__frame {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
}
.shot__bar {
  /* Sits above the screenshot so the image's top edge can tuck underneath it. */
  position: relative;
  z-index: 1;
  display: flex;
  gap: 5px;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-sunken);
  border-bottom: 1px solid var(--color-border);
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-border-hover);
  }
}
.shot__img {
  display: block;
  width: 100%;
  height: auto;
  cursor: zoom-in;
  /* Nudge the capture up just enough to tuck the thin dark line at the very top
     under the bar, while keeping the Beheerly logo (and a px or two above it)
     fully visible. */
  margin-top: -2px;
}
.shot__placeholder {
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  background: var(--color-bg-sunken);
  color: var(--color-text-tertiary);
  svg {
    width: 36px;
    height: 36px;
    opacity: 0.6;
  }
  span {
    font-size: var(--text-small);
  }
}
/* Lightbox — click a screenshot to view it enlarged. */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  background: rgba(14, 28, 22, 0.82);
  cursor: zoom-out;
  animation: lightbox-fade var(--duration-fast) var(--ease-smooth);
}
.lightbox__img {
  max-width: min(1180px, 96vw);
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-overlay);
}
.lightbox__close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-6);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.lightbox__close:hover {
  background: #ffffff;
}
.lightbox__close svg {
  width: 22px;
  height: 22px;
}
@keyframes lightbox-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .lightbox {
    animation: none;
  }
}

/* ── Rest of the platform (module grid) ── */
.bh-platform {
  padding: var(--space-16) var(--space-8);
}
.mod-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.mod-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-smooth);
  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
  }
  &__icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--color-primary-subtle);
    color: var(--color-accent);
    margin-bottom: var(--space-4);
  }
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-2);
  }
  p {
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── Why syndics benefit ── */
.bh-why {
  padding: var(--space-16) var(--space-8);
}
.why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}
.why-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  &__icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--color-primary-subtle);
    color: var(--color-accent);
    margin-bottom: var(--space-5);
  }
  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-3);
    text-wrap: balance;
  }
  p {
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* ── FAQ — same design as the SaaS & AI pages (shared FaqItem component) ── */
.bh-faq {
  padding: var(--section-pad-y) var(--space-8);
}
.bh-faq .container {
  max-width: 900px;
}
.faq-header {
  text-align: center;
  margin-bottom: var(--space-16);
}
.faq-header h2 {
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0;
  text-wrap: balance;
}
.faq-header .lead {
  margin: var(--space-5) auto 0;
  max-width: 58ch;
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}
.faq-header .lead a {
  color: var(--color-accent);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ── CTA — shared dark closing-panel pattern ── */
.bh-cta {
  padding: var(--section-pad-y) var(--space-8) var(--space-24);
}
.bh-cta .container {
  max-width: var(--max-width-cta);
}
.bh-cta__panel {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-family: var(--font-display);
    font-size: var(--text-h1);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-5);
    max-width: 22ch;
    text-wrap: balance;
  }
  p {
    font-size: var(--text-body-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-12);
    max-width: 52ch;
  }
}
.cta-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Responsive ── */
@media (max-width: 980px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .mod-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-12);
  }
  .hero-copy {
    order: -1;
  }
  .hero-visual {
    /* Fill the column. Without an explicit width, `margin-inline: auto` makes
       this grid item shrink to its content — i.e. the fixed-width window —
       which overflowed the column and defeated the scale-to-fit. width:100%
       pins it to the (capped) track so the script measures the real column. */
    width: 100%;
    /* Give the mock more room on larger phones/tablets so it renders bigger;
       it still fills smaller columns. */
    max-width: 600px;
    /* Centre the capped column on wide single-column layouts (tablets). */
    margin-inline: auto;
  }
  .intro-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  .flow-steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .spot,
  .spot--reverse {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  .spot--reverse .spot__text {
    order: 1;
  }
  .spot--reverse .spot__visual {
    order: 2;
  }
  .spot__text {
    max-width: 560px;
  }
}

@media (max-width: 768px) {
  .bh-hero {
    padding: var(--hero-pad-top) var(--space-6) var(--hero-pad-bottom);
  }
  h1 {
    font-size: var(--text-h2);
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    .btn {
      width: 100%;
    }
  }
  .flow-steps {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .mod-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .why-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }
  .bh-intro,
  .bh-flow,
  .bh-spot,
  .bh-platform,
  .bh-why,
  .bh-faq,
  .bh-cta {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
  .bh-cta__panel {
    padding: var(--space-12) var(--space-6);
  }
  .bh-cta__panel h2 {
    font-size: var(--text-h2);
  }
  .cta-actions {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
  }
  .cta-actions .btn {
    width: 100%;
  }
}

/* ── Hero dashboard mock ──
   `fitDashboardMock()` in the script shrinks the whole window with
   `transform: scale()` to fit its column (proportional, no reflow, no cropping,
   no overflow); `.hero-visual { overflow: hidden }` clips the untransformed
   layout box and the script pins the column height to the scaled height, while
   `text-align: center` keeps it centred. */
</style>
