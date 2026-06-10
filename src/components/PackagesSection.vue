<template>
  <section id="pakketten" class="packages">
    <div class="container">
      <div class="packages-header">
        <span class="label">{{ t('packagesSection.head.label') }}</span>
        <h2 class="hero-title">{{ t('packagesSection.head.title') }}</h2>
        <p class="hero-subtitle" v-html="t('packagesSection.head.lead')"></p>
      </div>

      <!-- TOGGLE: EENMALIG vs ABONNEMENT -->
      <div class="pricing-toggle">
        <button
          class="toggle-btn"
          :class="{ active: billing === 'oneoff' }"
          @click="billing = 'oneoff'"
          type="button"
        >
          {{ t('packagesSection.toggle.oneoff') }}
        </button>

        <button
          class="toggle-btn"
          :class="{ active: billing === 'monthly' }"
          @click="billing = 'monthly'"
          type="button"
        >
          {{ t('packagesSection.toggle.monthly') }}
          <span class="toggle-pill">{{ t('packagesSection.toggle.monthlyPill') }}</span>
        </button>
      </div>

      <!-- MAANDELIJKS: 1x uitleg (niet per kaart herhalen) -->
      <div v-if="billing === 'monthly'" class="monthly-info">
        <div class="monthly-info-item">
          <strong>{{ t('packagesSection.monthlyInfo.term.title') }}</strong>
          <span>{{ t('packagesSection.monthlyInfo.term.text') }}</span>
        </div>
        <div class="monthly-info-item">
          <strong>{{ t('packagesSection.monthlyInfo.ownership.title') }}</strong>
          <span>{{ t('packagesSection.monthlyInfo.ownership.text') }}</span>
        </div>
        <div class="monthly-info-item">
          <strong>{{ t('packagesSection.monthlyInfo.support.title') }}</strong>
          <span>{{ t('packagesSection.monthlyInfo.support.text') }}</span>
        </div>
      </div>

      <!-- ÉÉN GEHEEL: 3 PAKKETTEN -->
      <div class="packages-grid unified">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          :id="`juke-${tier.class}`"
          class="package-card"
          :class="[tier.class, { popular: tier.popular }]"
        >
          <div class="card-glow"></div>

          <div v-if="tier.popular" class="popular-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1L10.163 5.396L15 6.132L11.5 9.532L12.326 14.368L8 12.1L3.674 14.368L4.5 9.532L1 6.132L5.837 5.396L8 1Z"
                fill="currentColor"
              />
            </svg>
            {{ t('packagesSection.card.popular') }}
          </div>

          <div class="package-badge">{{ tier.badge }}</div>

          <div class="package-header">
            <h3>{{ tier.name }}</h3>

            <div
              class="price"
              :aria-label="t('packagesSection.card.priceAria', { name: tier.name })"
            >
              <span class="amount amount--quote">{{ t('packagesSection.card.amount') }}</span>
              <span class="period">
                <template v-if="billing === 'oneoff'">{{
                  t('packagesSection.card.periodOneoff')
                }}</template>
                <template v-else>{{ t('packagesSection.card.periodMonthly') }}</template>
              </span>
            </div>
          </div>

          <!-- Abonnement: service block -->
          <div v-if="billing === 'monthly' && tier.monthly" class="monthly-included">
            <div class="monthly-included-head">
              <div class="monthly-included-title">
                {{ t('packagesSection.card.includedTitle') }}
              </div>
              <div
                class="monthly-included-sub"
                v-html="t('packagesSection.card.includedSub', { name: tier.name })"
              ></div>
            </div>

            <ul class="monthly-included-list">
              <li v-for="(s, j) in tier.monthly.service" :key="j">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M16.6663 5L7.49967 14.1667L3.33301 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ s }}</span>
              </li>
            </ul>

            <div class="monthly-included-note" v-if="tier.monthly.note">
              {{ tier.monthly.note }}
            </div>
          </div>

          <!-- Eenmalig: feature lijst -->
          <div v-if="billing === 'oneoff'" class="feature-groups">
            <div v-for="(group, g) in tier.featureGroups" :key="g" class="feature-group">
              <div class="feature-group-title">{{ group.title }}</div>

              <ul class="feature-list">
                <li v-for="(feature, j) in group.items" :key="j">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M16.6663 5L7.49967 14.1667L3.33301 10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span v-html="feature"></span>
                </li>
              </ul>
            </div>
          </div>

          <button
            class="cta-button"
            :class="{ secondary: billing === 'monthly' }"
            @click="selectPackage(billing === 'oneoff' ? tier.oneoff.name : tier.monthly?.name)"
          >
            <span>{{ t('packagesSection.card.cta', { name: tier.name }) }}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { trackEvent } from '@/composables/useAnalytics'

const router = useRouter()
const { t } = useI18n()

/**
 * Billing toggle
 * - 'oneoff' = eenmalig
 * - 'monthly' = abonnement
 */
const billing = ref('oneoff')

/**
 * One-off packages
 * (copy is SEO+conversie sterker, logica blijft identiek)
 */
const packages = computed(() => [
  {
    name: 'Juke Lite',
    badge: t('packagesSection.packages.lite.badge'),
    price: '€600 – €900',
    class: 'lite',
    featureGroups: [
      {
        title: t('packagesSection.packages.lite.groups.website.title'),
        items: [
          t('packagesSection.packages.lite.groups.website.items.0'),
          t('packagesSection.packages.lite.groups.website.items.1'),
          t('packagesSection.packages.lite.groups.website.items.2'),
        ],
      },
      {
        title: t('packagesSection.packages.lite.groups.design.title'),
        items: [
          t('packagesSection.packages.lite.groups.design.items.0'),
          t('packagesSection.packages.lite.groups.design.items.1'),
          t('packagesSection.packages.lite.groups.design.items.2'),
        ],
      },
      {
        title: t('packagesSection.packages.lite.groups.seo.title'),
        items: [
          t('packagesSection.packages.lite.groups.seo.items.0'),
          t('packagesSection.packages.lite.groups.seo.items.1'),
          t('packagesSection.packages.lite.groups.seo.items.2'),
        ],
      },
    ],
  },
  {
    name: 'Juke Groove',
    badge: t('packagesSection.packages.groove.badge'),
    price: '€1.200 – €1.600',
    class: 'groove',
    popular: true,
    featureGroups: [
      {
        title: t('packagesSection.packages.groove.groups.website.title'),
        items: [
          t('packagesSection.packages.groove.groups.website.items.0'),
          t('packagesSection.packages.groove.groups.website.items.1'),
          t('packagesSection.packages.groove.groups.website.items.2'),
        ],
      },
      {
        title: t('packagesSection.packages.groove.groups.design.title'),
        items: [
          t('packagesSection.packages.groove.groups.design.items.0'),
          t('packagesSection.packages.groove.groups.design.items.1'),
          t('packagesSection.packages.groove.groups.design.items.2'),
        ],
      },
      {
        title: t('packagesSection.packages.groove.groups.seo.title'),
        items: [
          t('packagesSection.packages.groove.groups.seo.items.0'),
          t('packagesSection.packages.groove.groups.seo.items.1'),
          t('packagesSection.packages.groove.groups.seo.items.2'),
        ],
      },
    ],
  },
  {
    name: 'Juke Amplify',
    badge: t('packagesSection.packages.amplify.badge'),
    price: '€2.400 – €2.800',
    class: 'amplify',
    featureGroups: [
      {
        title: t('packagesSection.packages.amplify.groups.website.title'),
        items: [
          t('packagesSection.packages.amplify.groups.website.items.0'),
          t('packagesSection.packages.amplify.groups.website.items.1'),
          t('packagesSection.packages.amplify.groups.website.items.2'),
        ],
      },
      {
        title: t('packagesSection.packages.amplify.groups.design.title'),
        items: [
          t('packagesSection.packages.amplify.groups.design.items.0'),
          t('packagesSection.packages.amplify.groups.design.items.1'),
          t('packagesSection.packages.amplify.groups.design.items.2'),
          t('packagesSection.packages.amplify.groups.design.items.3'),
        ],
      },
      {
        title: t('packagesSection.packages.amplify.groups.seo.title'),
        items: [
          t('packagesSection.packages.amplify.groups.seo.items.0'),
          t('packagesSection.packages.amplify.groups.seo.items.1'),
          t('packagesSection.packages.amplify.groups.seo.items.2'),
          t('packagesSection.packages.amplify.groups.seo.items.3'),
        ],
      },
    ],
  },
])

/**
 * Monthly plans (alleen service/onderhoud)
 * (kleine copy edits: "content updates" is duidelijker dan "wijzigingen")
 */
const monthlyPlans = computed(() => [
  {
    name: 'Juke Lite Monthly',
    badge: t('packagesSection.monthlyPlans.lite.badge'),
    price: '€55 – €88',
    class: 'lite',
    service: [
      t('packagesSection.monthlyPlans.lite.service.0'),
      t('packagesSection.monthlyPlans.lite.service.1'),
      t('packagesSection.monthlyPlans.lite.service.2'),
      t('packagesSection.monthlyPlans.lite.service.3'),
      t('packagesSection.monthlyPlans.lite.service.4'),
    ],
    note: t('packagesSection.monthlyPlans.lite.note'),
  },
  {
    name: 'Juke Groove Monthly',
    badge: t('packagesSection.monthlyPlans.groove.badge'),
    price: '€110 – €145',
    class: 'groove',
    service: [
      t('packagesSection.monthlyPlans.groove.service.0'),
      t('packagesSection.monthlyPlans.groove.service.1'),
      t('packagesSection.monthlyPlans.groove.service.2'),
      t('packagesSection.monthlyPlans.groove.service.3'),
      t('packagesSection.monthlyPlans.groove.service.4'),
    ],
    note: t('packagesSection.monthlyPlans.groove.note'),
  },
  {
    name: 'Juke Amplify Monthly',
    badge: t('packagesSection.monthlyPlans.amplify.badge'),
    price: '€220 – €255',
    class: 'amplify',
    service: [
      t('packagesSection.monthlyPlans.amplify.service.0'),
      t('packagesSection.monthlyPlans.amplify.service.1'),
      t('packagesSection.monthlyPlans.amplify.service.2'),
      t('packagesSection.monthlyPlans.amplify.service.3'),
      t('packagesSection.monthlyPlans.amplify.service.4'),
    ],
    note: t('packagesSection.monthlyPlans.amplify.note'),
  },
])

/**
 * Merge: 1 kaart per tier (Lite/Groove/Amplify) met 2 prijsmodellen
 * Match op `class` (lite/groove/amplify)
 */
const tiers = computed(() => {
  return packages.value.map((p) => {
    const m = monthlyPlans.value.find((mp) => mp.class === p.class)

    return {
      name: p.name,
      badge: p.badge,
      class: p.class,
      popular: p.popular,
      featureGroups: p.featureGroups,

      oneoff: {
        name: p.name,
        price: p.price,
      },

      monthly: m
        ? {
            name: m.name,
            price: m.price,
            service: m.service,
            note: m.note,
          }
        : null,
    }
  })
})

const selectPackage = (packageName) => {
  if (!packageName) return

  // Funnel step toward a lead (consent-gated, enumerable values)
  trackEvent('package_selected', { package: packageName, billing: billing.value })

  router.push({
    path: '/contact',
    hash: '#contact',
    query: { pakket: packageName },
  })

  setTimeout(() => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  document.querySelectorAll('.package-card').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
/* ───────────────────────────────────────────────
   SECTION
   ─────────────────────────────────────────────── */
.packages {
  position: relative;
  padding: var(--space-24) 0;
  overflow: hidden;
}

.container {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-8);
  z-index: 1;
}

/* ───────────────────────────────────────────────
   HEADER
   ─────────────────────────────────────────────── */
.packages-header {
  text-align: center;
  margin-bottom: var(--space-8);
  animation: fadeInUp var(--duration-reveal) var(--ease-out-expo);
}

.label {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-8);
  margin-top: var(--space-4);
  letter-spacing: var(--tracking-wide);
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-h3);
  color: var(--color-text-secondary);
  max-width: var(--max-width);
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ───────────────────────────────────────────────
   TOGGLE
   ─────────────────────────────────────────────── */
.pricing-toggle {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin: 0 auto var(--space-12) auto;
  padding: var(--space-2);
  width: fit-content;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-bg-card-outer);
}

.toggle-btn {
  position: relative;
  border: 0;
  cursor: pointer;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-weight: var(--weight-extrabold);
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  background: transparent;
  transition: all var(--duration-fast) var(--ease-out-expo);

  &:hover {
    color: var(--color-text-primary);
  }

  &.active {
    background: var(--color-primary);
    color: var(--color-text-on-accent);
    box-shadow: var(--shadow-glow-primary);
  }
}

.toggle-pill {
  display: inline-block;
  margin-left: var(--space-2);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-hover);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font-weight: var(--weight-bold);
}

/* ───────────────────────────────────────────────
   MONTHLY INFO BAR
   ─────────────────────────────────────────────── */
.monthly-info {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  background: var(--color-bg-card-outer);
  margin: 0 auto var(--space-8) auto;
  max-width: var(--max-width);
}

.monthly-info-item {
  text-align: center;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-inner-highlight);

  strong {
    display: block;
    font-family: var(--font-display);
    color: var(--color-text-primary);
    font-weight: var(--weight-extrabold);
    letter-spacing: var(--tracking-tight);
    margin-bottom: var(--space-1);
  }

  span {
    display: block;
    font-family: var(--font-sans);
    color: var(--color-text-secondary);
    font-size: var(--text-small);
    line-height: var(--leading-normal);
  }
}

/* ───────────────────────────────────────────────
   GRID
   ─────────────────────────────────────────────── */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-6);
  margin-bottom: 0;
}

/* ───────────────────────────────────────────────
   CARD  — Double-Bezel pattern
   outer shell: --color-bg-card-outer + --color-border + 6px padding + --radius-2xl
   inner: --color-bg-card-inner + --shadow-inner-highlight + calc radius
   ─────────────────────────────────────────────── */
.package-card {
  position: relative;
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 6px;

  display: flex;
  flex-direction: column;

  min-height: 680px;

  transition: all var(--duration-base) var(--ease-out-expo);
  opacity: 0;
  transform: translateY(30px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:nth-child(2) {
    transition-delay: 100ms;
  }
  &:nth-child(3) {
    transition-delay: 200ms;
  }

  /* Inner bezel via direct children wrapper — we apply inner styles to the
     card-glow (repurposed as the inner bezel surface) */

  &:hover {
    transform: translateY(-8px);
    border-color: var(--color-primary-border);

    .card-glow {
      opacity: 1;
    }

    .cta-button {
      background: var(--color-text-primary);
      color: var(--color-bg-primary);

      svg {
        transform: translateX(4px);
      }
    }

    .cta-button.secondary {
      background: var(--color-text-primary);
      color: var(--color-bg-primary);
      border-color: transparent;
      box-shadow: var(--shadow-elevated);
    }
  }
}

/* Inner bezel surface */
.card-glow {
  position: absolute;
  inset: 6px;
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-2xl) - 6px);
  box-shadow: var(--shadow-inner-highlight);
  opacity: 0.5;
  transition: opacity var(--duration-base) var(--ease-out-expo);
  pointer-events: none;
}

/* All actual card content needs to sit above the glow layer */
.package-badge,
.popular-badge,
.package-header,
.monthly-included,
.feature-groups,
.cta-button {
  position: relative;
  z-index: 1;
}

/* Popular card — highlighted border */
.package-card.popular {
  border-color: var(--color-primary-border);
  box-shadow: var(--shadow-glow-primary);

  .card-glow {
    opacity: 1;
  }
}

/* ───────────────────────────────────────────────
   BADGES
   ─────────────────────────────────────────────── */
.package-badge {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  color: var(--color-text-secondary);
  background: var(--color-bg-surface);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  margin: var(--space-6) var(--space-6) var(--space-3) var(--space-6);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border: 1px solid var(--color-border);
  width: fit-content;
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: var(--space-8);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-primary);
  color: var(--color-text-on-accent);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  box-shadow: var(--shadow-glow-primary);
  z-index: 2;
}

/* ───────────────────────────────────────────────
   PACKAGE HEADER & PRICE
   ─────────────────────────────────────────────── */
.package-header {
  margin: 0 var(--space-6) var(--space-3) var(--space-6);

  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h2);
    font-weight: var(--weight-extrabold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-1);
    letter-spacing: var(--tracking-tight);
  }
}

.price {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  .amount {
    font-family: var(--font-display);
    font-size: var(--text-h1);
    font-weight: var(--weight-extrabold);
    color: var(--color-primary);
    letter-spacing: var(--tracking-tight);
  }

  .amount--quote {
    font-size: var(--text-h2);
  }

  .period {
    font-family: var(--font-sans);
    font-size: var(--text-small);
    color: var(--color-text-tertiary);
    font-weight: var(--weight-medium);
  }

  .price-meta {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
  }
}

/* ───────────────────────────────────────────────
   MONTHLY INCLUDED
   ─────────────────────────────────────────────── */
.monthly-included {
  margin: 0 var(--space-6) var(--space-4) var(--space-6);
}

.monthly-included-head {
  margin-bottom: var(--space-3);
}

.monthly-included-title {
  font-family: var(--font-display);
  font-weight: var(--weight-extrabold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  font-size: var(--text-body);
  margin-bottom: var(--space-1);
}

.monthly-included-sub {
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  font-size: var(--text-small);
  line-height: var(--leading-normal);

  strong {
    color: var(--color-text-primary);
  }
}

.monthly-included-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-2);

  li {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-bg-card-outer);
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
    font-size: var(--text-small);
    line-height: var(--leading-normal);
  }

  svg {
    margin-top: 2px;
    color: var(--color-primary);
    opacity: 0.7;
    flex-shrink: 0;
  }
}

.monthly-included-note {
  margin-top: var(--space-3);
  font-family: var(--font-sans);
  color: var(--color-text-tertiary);
  font-size: var(--text-small);
  line-height: var(--leading-normal);
}

/* ───────────────────────────────────────────────
   FEATURE GROUPS (eenmalig)
   ─────────────────────────────────────────────── */
.feature-groups {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-2) var(--space-6) var(--space-4) var(--space-6);
}

.feature-group {
  padding: 0;
  background: transparent;
  border: none;
}

.feature-group-title {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-extrabold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-1);
}

.feature-list li {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.feature-list svg {
  margin-top: 2px;
  color: var(--color-primary);
  opacity: 0.7;
  flex-shrink: 0;
}

.feature-list strong {
  color: var(--color-text-primary);
  font-weight: var(--weight-extrabold);
}

/* ───────────────────────────────────────────────
   CTA BUTTON
   ─────────────────────────────────────────────── */
.cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: calc(100% - var(--space-12));
  margin: auto var(--space-6) var(--space-6) var(--space-6);
  padding: var(--space-4) var(--space-8);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: var(--text-body);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-spring);
  box-shadow: var(--shadow-elevated);

  svg {
    transition: transform var(--duration-fast) var(--ease-spring);
  }

  &:hover {
    box-shadow: var(--shadow-elevated);
    transform: translateY(-2px);
  }
}

.cta-button.secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  box-shadow: none;
  border: 1px solid var(--color-border-hover);
}

/* ───────────────────────────────────────────────
   RESPONSIVE
   ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .packages {
    padding: var(--space-16) 0;
  }

  .packages-header {
    margin-bottom: var(--space-8);
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }

  .monthly-info {
    grid-template-columns: 1fr;
  }

  .package-card {
    min-height: unset;
  }

  .pricing-toggle {
    flex-direction: column;
    border-radius: var(--radius-lg);

    .toggle-btn {
      border-radius: var(--radius-md);
    }
  }
}
</style>
