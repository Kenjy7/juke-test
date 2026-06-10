<template>
  <BackgroundWeb>
    <section class="saas-hero">
      <div class="container hero-grid">
        <div class="hero-visual" aria-hidden="true">
          <div class="dash">
            <div class="dash__bar">
              <span class="dd"></span><span class="dd"></span><span class="dd"></span>
            </div>
            <div class="dash__body">
              <aside class="dash__side">
                <span class="dash__logo"></span>
                <span class="nav is-active"></span><span class="nav"></span>
                <span class="nav"></span><span class="nav"></span>
              </aside>
              <div class="dash__main">
                <div class="tiles">
                  <div class="tile" v-for="t in tiles" :key="t.label">
                    <span class="tile__label">{{ t.label }}</span>
                    <span class="tile__value">{{ t.value }}</span>
                  </div>
                </div>
                <div class="graph">
                  <svg viewBox="0 0 280 90" preserveAspectRatio="none" class="graph__svg">
                    <polyline
                      points="0,72 40,60 80,64 120,40 160,46 200,24 240,30 280,10"
                      fill="none"
                      stroke="var(--color-primary)"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-copy">
          <div class="eyebrow">
            <span class="eyebrow__dot"></span>
            {{ t('saasDevelopmentView.hero.eyebrow') }}
          </div>
          <h1>
            {{ t('saasDevelopmentView.hero.titleLead') }}
            <span class="highlight">{{ t('saasDevelopmentView.hero.titleHighlight') }}</span>
          </h1>
          <p class="subtitle">
            {{ t('saasDevelopmentView.hero.subtitle') }}
          </p>
          <div class="hero-buttons">
            <router-link to="/offerte-aanvraag" class="btn btn--accent btn--lg">
              {{ t('saasDevelopmentView.hero.ctaPrimary') }}
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
            <router-link to="/contact" class="btn btn--secondary btn--lg">
              {{ t('saasDevelopmentView.hero.ctaSecondary') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="saas-features">
      <div class="container">
        <h2>{{ t('saasDevelopmentView.features.heading') }}</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="saas-cta">
      <div class="container">
        <h2>{{ t('saasDevelopmentView.cta.heading') }}</h2>
        <p>{{ t('saasDevelopmentView.cta.body') }}</p>
        <router-link to="/offerte-aanvraag" class="btn btn-accent">
          <span>{{ t('saasDevelopmentView.cta.button') }}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10h12M12 6l4 4-4 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

const { t } = useI18n()

const tiles = computed(() => [
  { label: t('saasDevelopmentView.tiles.mrr'), value: '€48k' },
  { label: t('saasDevelopmentView.tiles.users'), value: '9.3k' },
  { label: t('saasDevelopmentView.tiles.uptime'), value: '99.9%' },
  { label: t('saasDevelopmentView.tiles.churn'), value: '1.2%' },
])

const features = computed(() => [
  {
    title: t('saasDevelopmentView.features.items.dashboards.title'),
    description: t('saasDevelopmentView.features.items.dashboards.description'),
  },
  {
    title: t('saasDevelopmentView.features.items.auth.title'),
    description: t('saasDevelopmentView.features.items.auth.description'),
  },
  {
    title: t('saasDevelopmentView.features.items.architecture.title'),
    description: t('saasDevelopmentView.features.items.architecture.description'),
  },
  {
    title: t('saasDevelopmentView.features.items.api.title'),
    description: t('saasDevelopmentView.features.items.api.description'),
  },
  {
    title: t('saasDevelopmentView.features.items.concept.title'),
    description: t('saasDevelopmentView.features.items.concept.description'),
  },
  {
    title: t('saasDevelopmentView.features.items.maintenance.title'),
    description: t('saasDevelopmentView.features.items.maintenance.description'),
  },
])

useHead({
  title: 'SaaS Development op Maat | JukeCoding',
  meta: [
    {
      name: 'description',
      content:
        'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product. Development studio in Hasselt, Belgie.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'SaaS Development op Maat | JukeCoding' },
    {
      property: 'og:description',
      content:
        'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/saas-development' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SaaS Development op Maat | JukeCoding' },
    {
      name: 'twitter:description',
      content: 'Custom SaaS-platformen, dashboards en portalen op maat.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/saas-development' }],
})
</script>

<style scoped lang="scss">
.saas-hero {
  padding: calc(var(--space-32) + 1rem) var(--space-8) var(--space-20);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--space-16);
  align-items: center;
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
  max-width: 52ch;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* ── Dashboard visual ── */
.hero-visual {
  animation: fade-up 0.7s var(--ease-out-expo) both;
}

.dash {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);
}
.dash__bar {
  display: flex;
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
.dash__body {
  display: grid;
  grid-template-columns: 60px 1fr;
  min-height: 280px;
}
.dash__side {
  border-right: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  padding: var(--space-4) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.dash__logo {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  margin-bottom: var(--space-2);
}
.nav {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-border);
}
.nav.is-active {
  background: var(--color-primary-border);
}
.dash__main {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}
.tile {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.tile__label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.tile__value {
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}

.graph {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  padding: var(--space-4);
  flex: 1;
}
.graph__svg {
  width: 100%;
  height: 90px;
}

.saas-features {
  padding: var(--space-16) var(--space-8);

  .container {
    max-width: var(--max-width);
  }

  h2 {
    font-size: var(--text-h1);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    text-align: center;
    margin: 0 0 var(--space-12) 0;
    letter-spacing: var(--tracking-tight);
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.feature-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all var(--transition-smooth);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
  }

  h3 {
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-3) 0;
  }

  p {
    font-size: var(--text-body);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

.saas-cta {
  padding: var(--space-16) var(--space-8);

  .container {
    max-width: var(--max-width-narrow);
    text-align: center;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-16) var(--space-8);
  }

  h2 {
    font-size: var(--text-h2);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-4) 0;
  }

  p {
    font-size: var(--text-body-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0 auto var(--space-8);
    max-width: 550px;
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .hero-copy {
    order: -1;
  }
  .hero-visual {
    max-width: 520px;
  }
}

@media (max-width: 768px) {
  .saas-hero {
    padding: var(--space-32) var(--space-6) var(--space-16);
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
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  .saas-features,
  .saas-cta {
    padding: var(--space-12) var(--space-6);
  }
  .saas-cta .container {
    padding: var(--space-12) var(--space-6);
  }
}
</style>
