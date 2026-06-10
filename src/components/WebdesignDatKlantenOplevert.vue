<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__inner container">
        <div class="hero__grid">
          <!-- Left: Content -->
          <div class="hero__content">
            <div class="label">{{ t('webdesignDatKlantenOplevert.hero.label') }}</div>

            <h1 class="hero__title">
              {{ t('webdesignDatKlantenOplevert.hero.titleLine1') }} <br />{{
                t('webdesignDatKlantenOplevert.hero.titleLine2')
              }}
              <span class="highlight">
                <span class="highlight-text">{{
                  t('webdesignDatKlantenOplevert.hero.titleHighlight')
                }}</span>
                <span class="highlight-glow"></span>
              </span>
            </h1>

            <p class="hero__subtitle">
              {{ t('webdesignDatKlantenOplevert.hero.subtitle') }}
            </p>

            <div class="hero-buttons">
              <router-link to="/contact" class="btn btn--accent">
                {{ t('webdesignDatKlantenOplevert.hero.ctaPrimary') }}
                <svg
                  class="btn__icon"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </router-link>

              <router-link
                :to="{ path: '/webdesign', hash: '#pakketten' }"
                class="btn btn--secondary"
              >
                {{ t('webdesignDatKlantenOplevert.hero.ctaSecondary') }}
              </router-link>
            </div>

            <p class="micro"></p>

            <!-- TRUST BAR -->
            <ul
              class="trust-bar"
              :aria-label="t('webdesignDatKlantenOplevert.hero.trustAriaLabel')"
            >
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>{{ t('webdesignDatKlantenOplevert.hero.trust.fast') }}</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>{{ t('webdesignDatKlantenOplevert.hero.trust.seo') }}</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>{{ t('webdesignDatKlantenOplevert.hero.trust.conversion') }}</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>{{ t('webdesignDatKlantenOplevert.hero.trust.approach') }}</span>
              </li>
            </ul>
          </div>

          <!-- Right: Image -->
          <div class="hero__image">
            <img
              src="../assets/CTR-hero.webp"
              :alt="t('webdesignDatKlantenOplevert.hero.imageAlt')"
              width="900"
              height="675"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div class="floating-element element-1" aria-hidden="true"></div>
      <div class="floating-element element-2" aria-hidden="true"></div>
      <div class="floating-element element-3" aria-hidden="true"></div>
    </section>

    <!-- SECTION 1: PROBLEEM - Minimalist Grid -->
    <section class="content-section problems-section" id="waarom">
      <div class="container">
        <div class="section-header">
          <span class="label small">{{ t('webdesignDatKlantenOplevert.problems.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.problems.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.problems.subtitle') }}
          </p>
        </div>

        <div class="problems-grid">
          <div class="problem-card">
            <div class="problem-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3>{{ t('webdesignDatKlantenOplevert.problems.cards.message.title') }}</h3>
            <p>{{ t('webdesignDatKlantenOplevert.problems.cards.message.text') }}</p>
          </div>

          <div class="problem-card">
            <div class="problem-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 8.965l-2.898-.777m0 0l2.898-.778M7.188 21.761l-.777-2.897m6.333-7.423l.777-2.897"
                />
              </svg>
            </div>
            <h3>{{ t('webdesignDatKlantenOplevert.problems.cards.mobile.title') }}</h3>
            <p>{{ t('webdesignDatKlantenOplevert.problems.cards.mobile.text') }}</p>
          </div>

          <div class="problem-card">
            <div class="problem-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3>{{ t('webdesignDatKlantenOplevert.problems.cards.speed.title') }}</h3>
            <p>{{ t('webdesignDatKlantenOplevert.problems.cards.speed.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: AANPAK - Feature Cards with Icon Left -->
    <section class="content-section approach-section" id="aanpak">
      <div class="container">
        <div class="section-header">
          <span class="label small">{{ t('webdesignDatKlantenOplevert.approach.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.approach.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.approach.subtitle') }}
          </p>
        </div>

        <div class="approach-grid">
          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="approach-content">
              <h3>{{ t('webdesignDatKlantenOplevert.approach.cards.strategy.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.approach.cards.strategy.text') }}</p>
            </div>
          </div>

          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <div class="approach-content">
              <h3>{{ t('webdesignDatKlantenOplevert.approach.cards.design.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.approach.cards.design.text') }}</p>
            </div>
          </div>

          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div class="approach-content">
              <h3>{{ t('webdesignDatKlantenOplevert.approach.cards.speed.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.approach.cards.speed.text') }}</p>
            </div>
          </div>

          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                />
              </svg>
            </div>
            <div class="approach-content">
              <h3>{{ t('webdesignDatKlantenOplevert.approach.cards.cta.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.approach.cards.cta.text') }}</p>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <router-link :to="{ path: '/webdesign', hash: '#stappen-webdesign' }" class="text-link">
            {{ t('webdesignDatKlantenOplevert.approach.workflowLink') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- RESULTATEN - Modern Cards with Gradient Accents -->
    <section class="content-section results-section" id="resultaten">
      <div class="container">
        <div class="section-header">
          <span class="label small">{{ t('webdesignDatKlantenOplevert.results.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.results.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.results.subtitle') }}
          </p>
        </div>

        <div class="results-grid">
          <article class="result-card">
            <div class="result-header">
              <a
                href="https://fripole.be/"
                class="result-tag"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fripole
              </a>
              <div class="result-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.performance.badge') }}
              </div>
            </div>
            <h3>{{ t('webdesignDatKlantenOplevert.results.cards.performance.title') }}</h3>
            <p>{{ t('webdesignDatKlantenOplevert.results.cards.performance.text') }}</p>
            <ul class="result-features">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.performance.features.images') }}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.performance.features.caching') }}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.performance.features.faq') }}
              </li>
            </ul>
          </article>

          <article class="result-card">
            <div class="result-header">
              <a
                href="https://immosads.com"
                class="result-tag"
                target="_blank"
                rel="noopener noreferrer"
              >
                IMMO Sads
              </a>

              <div class="result-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.trust.badge') }}
              </div>
            </div>
            <h3>{{ t('webdesignDatKlantenOplevert.results.cards.trust.title') }}</h3>
            <p>{{ t('webdesignDatKlantenOplevert.results.cards.trust.text') }}</p>
            <ul class="result-features">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.trust.features.branding') }}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.trust.features.mobile') }}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t('webdesignDatKlantenOplevert.results.cards.trust.features.contact') }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- STAPPENPLAN - Timeline Style -->
    <section id="stappen-webdesign" class="content-section timeline-section">
      <div class="container">
        <div class="section-header">
          <span class="label small">{{ t('webdesignDatKlantenOplevert.steps.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.steps.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.steps.subtitle') }}
          </p>
        </div>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker">
              <span>1</span>
            </div>
            <div class="timeline-content">
              <h3>{{ t('webdesignDatKlantenOplevert.steps.items.strategy.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.steps.items.strategy.text') }}</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>2</span>
            </div>
            <div class="timeline-content">
              <h3>{{ t('webdesignDatKlantenOplevert.steps.items.design.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.steps.items.design.text') }}</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>3</span>
            </div>
            <div class="timeline-content">
              <h3>{{ t('webdesignDatKlantenOplevert.steps.items.build.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.steps.items.build.text') }}</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>4</span>
            </div>
            <div class="timeline-content">
              <h3>{{ t('webdesignDatKlantenOplevert.steps.items.launch.title') }}</h3>
              <p>{{ t('webdesignDatKlantenOplevert.steps.items.launch.text') }}</p>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <router-link
            :to="{ path: '/webdesign', hash: '#stappen-webdesign' }"
            class="btn btn--accent btn--lg"
          >
            {{ t('webdesignDatKlantenOplevert.steps.ctaLink') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- VOOR WIE - Clean Checklist -->
    <section class="content-section checklist-section" id="voor-wie">
      <div class="container">
        <div class="section-header">
          <span class="label small">{{ t('webdesignDatKlantenOplevert.audience.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.audience.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.audience.subtitle') }}
          </p>
        </div>

        <div class="checklist">
          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{{ t('webdesignDatKlantenOplevert.audience.items.sme') }}</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{{ t('webdesignDatKlantenOplevert.audience.items.services') }}</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{{ t('webdesignDatKlantenOplevert.audience.items.starters') }}</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{{ t('webdesignDatKlantenOplevert.audience.items.existing') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PAKKETTEN - Feature Box -->
    <section class="content-section packages-section" id="pakketten">
      <div class="container">
        <div class="section-header">
          <span class="label">{{ t('webdesignDatKlantenOplevert.packages.label') }}</span>
          <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.packages.title') }}</h2>
          <p class="section-subtitle">
            {{ t('webdesignDatKlantenOplevert.packages.subtitle') }}
          </p>
        </div>

        <div class="packages-feature">
          <div class="packages-features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.mobile') }}</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.speed') }}</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.seo') }}</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.conversion') }}</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.ssl') }}</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <span>{{ t('webdesignDatKlantenOplevert.packages.features.contactForm') }}</span>
            </div>
          </div>
        </div>

        <div class="cta-row">
          <router-link
            :to="{ path: '/webdesign', hash: '#pakketten' }"
            class="btn btn--accent btn--lg"
          >
            {{ t('webdesignDatKlantenOplevert.packages.ctaPrimary') }}
            <svg
              class="btn__icon"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </router-link>

          <router-link to="/contact" class="btn btn--secondary btn--lg">
            {{ t('webdesignDatKlantenOplevert.packages.ctaSecondary') }}
          </router-link>
        </div>
      </div>
    </section>

    <FaqListKlanten :faqs="meerKlantenFaqs" />

    <!-- FINAL CTA -->
    <section class="content-section final-cta-section">
      <div class="container">
        <div class="final-cta">
          <div class="final-cta__content">
            <span class="label">{{ t('webdesignDatKlantenOplevert.finalCta.label') }}</span>
            <h2 class="section-title">{{ t('webdesignDatKlantenOplevert.finalCta.title') }}</h2>
            <p class="section-subtitle1">
              {{ t('webdesignDatKlantenOplevert.finalCta.subtitle') }}
            </p>

            <div class="cta-row">
              <router-link to="/contact" class="btn btn--accent btn--lg">
                {{ t('webdesignDatKlantenOplevert.finalCta.cta') }}
                <svg
                  class="btn__icon"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FaqListKlanten from '../components/FaqListKlanten.vue'
import { faqsMeerKlanten } from '../data/faqs.meerklanten.js'

const { t, locale } = useI18n()

const meerKlantenFaqs = computed(() => faqsMeerKlanten[locale.value] ?? faqsMeerKlanten.nl)
</script>

<style scoped>
/* ─── Layout ─── */
.page {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
}

/* ─── Label ─── */
.label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: 100px;
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.label.small {
  font-size: 0.8125rem;
}

/* ─── Buttons — canonical .btn system comes from base.css ─── */

/* ─── Hero ─── */
.hero {
  position: relative;
  overflow: hidden;
  color: var(--color-text-primary);
  padding: 0;
}

.hero__inner {
  position: relative;
  z-index: 2;
  padding: 4.5rem 0 6rem;
}

@media (max-width: 768px) {
  .hero__inner {
    padding: 6rem 0 4rem;
  }
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr; /* 👈 Geef afbeelding MEER ruimte */
  gap: 4rem;
  align-items: center;
}

@media (max-width: 968px) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero__image {
    order: -1;
  }
}

.hero__content {
  text-align: left;
  max-width: 600px; /* 👈 Beperk tekst breedte voor betere balans */
}

.hero .label {
  margin-bottom: 1.25rem;
}

.hero__title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--color-text-primary);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
}

.highlight {
  position: relative;
  display: inline-block;
  margin-left: 0.25rem;
}

.highlight-text {
  position: relative;
  z-index: 2;
  color: var(--color-primary);
  -webkit-text-fill-color: var(--color-primary);
}

.highlight-glow {
  position: absolute;
  inset: -10px;
  background: none;
  filter: none;
  z-index: 1;
  pointer-events: none;
}

.hero__subtitle {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: var(--color-text-primary);
  margin: 0 0 1.5rem;
  line-height: 1.7;
  max-width: 44ch;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .hero-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}

.micro {
  margin: 0 0 1.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.hero__image {
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 2/1;
  width: 100%;
}

.hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Trust bar */
.trust-bar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.85rem;
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: 999px;
}

.trust-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--color-accent);
}

/* Floating elements */
.floating-element {
  position: absolute;
  border-radius: 50%;
  opacity: 1;
  filter: blur(80px);
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

.element-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary-subtle);
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.element-2 {
  width: 300px;
  height: 300px;
  background: var(--color-primary-subtle);
  bottom: 20%;
  right: -5%;
  animation-delay: 7s;
}

.element-3 {
  width: 250px;
  height: 250px;
  background: var(--color-primary-subtle);
  top: 50%;
  left: 50%;
  animation-delay: 14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

@media (max-width: 768px) {
  .floating-element {
    opacity: 0.5;
  }
}

/* ─── Sections ─── */
.content-section {
  padding: 4rem 0;
}

.content-section.final-cta-section {
  padding: 0 0 6rem;
}

/* ─── Section Header ─── */
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-header .label {
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-top: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 950px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-subtitle1 {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ─── SECTION 1: Problems - Minimalist Grid ─── */

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  max-width: 1100px;
  margin: 0 auto;
}

.problem-card {
  backdrop-filter: blur(10px);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.problem-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
}

.problem-card:hover::before {
  opacity: 1;
}

.problem-icon {
  width: 52px;
  height: 52px;
  background: var(--color-bg-sunken);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
  transition: all 0.4s ease;
}

.problem-card:hover .problem-icon {
  background: var(--color-bg-sunken);
  transform: scale(1.05);
}

.problem-icon svg {
  width: 26px;
  height: 26px;
}

.problem-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.problem-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

/* ─── SECTION 2: Approach - Horizontal Cards ─── */

.approach-grid {
  display: grid;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.approach-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.approach-card:hover {
  background: var(--color-bg-sunken);
  border-color: var(--color-accent);
  transform: translateX(6px);
}

.approach-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: var(--color-primary-subtle);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.approach-card:hover .approach-icon {
  background: var(--color-accent);
  color: #ffffff;
  transform: rotate(-5deg) scale(1.05);
}

.approach-icon svg {
  width: 28px;
  height: 28px;
}

.approach-content h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.approach-content p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

/* ─── SECTION 3: Results - Modern Cards ─── */
.results-section {
}

.result-tag {
  display: inline-block;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 2fr));
  gap: 1.75rem;
}

.result-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.result-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-accent);
}

.result-card:hover::before {
  opacity: 1;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.result-tag::after {
  content: ' ↗';
  margin-left: 4px;
  font-size: 0.9em;
}

.result-tag:hover .arrow {
  transform: translateX(3px);
}

.result-tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.result-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-primary);
}

.result-badge svg {
  width: 14px;
  height: 14px;
}

.result-card h3 {
  margin: 0 0 0.75rem;
  color: var(--color-text-primary);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.result-card > p {
  margin: 0 0 1.5rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.9375rem;
}

.result-features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.65rem;
}

.result-features li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.result-features svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-success);
}

/* ─── SECTION 4: Timeline ─── */
.timeline-section {
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-primary-glow), var(--color-primary-subtle));
}

@media (max-width: 640px) {
  .timeline::before {
    left: 24px;
  }
}

.timeline-item {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.25rem;
  color: #ffffff;
  position: relative;
  z-index: 2;
}

.timeline-content {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  border-color: var(--color-accent);
  transform: translateX(4px);
}

.timeline-content h3 {
  margin: 0 0 0.5rem;
  color: var(--color-text-primary);
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: -0.01em;
}

.timeline-content p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.9375rem;
}

/* ─── SECTION 5: Checklist ─── */
.checklist-section {
  margin-top: 0;
}

.checklist {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  color: var(--color-text-primary);
  line-height: 1.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.checklist-item:hover {
  background: var(--color-bg-sunken);
  border-color: var(--color-success);
  transform: translateX(6px);
}

.checklist-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: var(--color-bg-sunken);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-success);
  transition: all 0.3s ease;
}

.checklist-item:hover .checklist-icon {
  background: var(--color-success);
  color: #ffffff;
  transform: scale(1.1);
}

.checklist-icon svg {
  width: 18px;
  height: 18px;
}

/* ─── SECTION 6: Packages ─── */
.packages-section {
  position: relative;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.packages-feature {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  max-width: 900px;
  margin: 0 auto 3rem;
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  transition: all 0.3s ease;
}

.packages-feature:hover {
  border-color: var(--color-accent);
  background: var(--color-bg-sunken);
}

.packages-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-item:hover {
  background: var(--color-bg-surface);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--color-bg-surface);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  background: var(--color-accent);
  color: #ffffff;
  transform: scale(1.05);
}

.feature-icon svg {
  width: 22px;
  height: 22px;
}

/* ─── Inline CTA ─── */
.inline-cta {
  text-align: center;
  margin-top: 3.5rem;
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

@media (max-width: 768px) {
  .packages-feature {
    padding: 2rem 1.5rem;
  }

  .packages-features-grid {
    grid-template-columns: 1fr;
  }
}

/* ─── Inline CTA ─── */
.inline-cta {
  text-align: center;
  margin-top: 3rem;
}

.text-link {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.text-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ─── Inline CTA ─── */
.inline-cta {
  text-align: center;
  margin-top: 3rem;
}

.text-link {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.text-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ─── CTA Row ─── */
.cta-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ─── Final CTA ─── */
.final-cta {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 2rem 3rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.final-cta::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.final-cta__content {
  position: relative;
  z-index: 1;
}

.final-cta .label {
  margin-bottom: 1.25rem;
}

.final-cta .section-title {
  margin-bottom: 1rem;
}

.final-cta .section-subtitle {
  margin-bottom: 0;
}

.final-cta .cta-row {
  margin-top: 2.5rem;
}

@media (max-width: 640px) {
  .final-cta {
    padding: 3rem 2rem;
  }
}

@media (max-width: 768px) {
  .approach-card {
    flex-direction: column;
    text-align: center;
  }

  .approach-icon {
    margin: 0 auto;
  }
}

/* Maak de hero__grid responsief */
@media (max-width: 968px) {
  .hero__grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Zorg dat de tekst niet te breed wordt */
  .hero__content {
    max-width: 100%;
  }

  /* Maak de afbeelding groter en responsief */
  .hero__image {
    width: 100%;
    border-radius: 20px;
    aspect-ratio: auto; /* Laat de aspect ratio automatisch passen */
  }

  /* Optioneel: maak de afbeelding nog groter op kleinere schermen */
  .hero__image img {
    width: 100%;
    height: auto;
    object-fit: contain; /* Zorg dat de afbeelding niet vervormt */
  }
}

/* Verder kunnen we de tekstgrootte aanpassen voor kleinere schermen */
@media (max-width: 640px) {
  .hero__title {
    font-size: clamp(2.75rem, 5vw, 2.5rem);
    padding-left: 1.5rem;
  }
  .label {
    margin-left: 1.5rem;
  }
  .hero__subtitle {
    font-size: 1rem;
    padding-left: 1.5rem;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-buttons .btn {
    width: 80%;
    margin-left: 1rem;
  }
  .hero__image {
    padding: 0 20px; /* Pas de waarde aan voor meer of minder witruimte */
    box-sizing: border-box; /* Zorg dat padding meegerekend wordt in de breedte */
  }

  .hero__image img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: block;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .trust-bar {
    align-items: flex-start;
    padding-left: 1.5rem;
  }

  .trust-item {
    font-size: 0.7rem;
  }
}
</style>
