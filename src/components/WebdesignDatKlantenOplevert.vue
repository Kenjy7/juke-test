<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__inner container">
        <div class="hero__grid">
          <!-- Left: Content -->
          <div class="hero__content">
            <div class="label">Resultaatgericht webdesign</div>

            <h1 class="hero__title">
              Website die <br>klanten oplevert
              <span class="highlight">
                <span class="highlight-text">niet alleen mooi</span>
                <span class="highlight-glow"></span>
              </span>
            </h1>

            <p class="hero__subtitle">
              Voor Belgische kmo&apos;s en zelfstandigen: snelle, mobielvriendelijke websites die converteren naar
              aanvragen, offertes en afspraken.
            </p>

            <div class="hero-buttons">
              <router-link to="/contact" class="btn btn--primary">
                Gratis kennismaking
                <svg class="btn__icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </router-link>

              <router-link :to="{ path: '/webdesign', hash: '#pakketten' }" class="btn btn--secondary">
                Bekijk de pakketten
              </router-link>
            </div>

            <p class="micro">
            </p>

            <!-- TRUST BAR -->
            <ul class="trust-bar" aria-label="Belangrijkste voordelen">
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>Mobielvriendelijk &amp; snel</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>SEO-basis inbegrepen</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>Conversiegericht (CTA&apos;s)</span>
              </li>
              <li class="trust-item">
                <span class="trust-dot" aria-hidden="true"></span>
                <span>Duidelijke aanpak</span>
              </li>
            </ul>
          </div>

          <!-- Right: Image -->
          <div class="hero__image">
            <img
                src="../assets/CTR.png"
                alt="Preview van een conversiegerichte bedrijfswebsite op maat"
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
          <span class="label small">Waarom het vaak misloopt</span>
          <h2 class="section-title">Waarom veel websites geen klanten opleveren</h2>
          <p class="section-subtitle">
            Vaak ligt het niet aan je aanbod, maar aan de structuur, snelheid en duidelijkheid van je website.
            Kleine frictie zorgt voor minder aanvragen.
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
            <h3>Onduidelijke boodschap</h3>
            <p>Bezoekers snappen niet meteen wat je doet, voor wie, en waarom ze voor jou moeten kiezen.</p>
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
            <h3>Niet optimaal op mobiel</h3>
            <p>De meeste bezoekers komen via smartphone. Als het daar niet vlot werkt, verlies je conversie.</p>
          </div>

          <div class="problem-card">
            <div class="problem-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Snelheid en vertrouwen</h3>
            <p>Traag laden of een rommelige layout voelt onbetrouwbaar — en dat kost leads en aanvragen.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: AANPAK - Feature Cards with Icon Left -->
    <section class="content-section approach-section" id="aanpak">
      <div class="container">
        <div class="section-header">
          <span class="label small">Onze aanpak</span>
          <h2 class="section-title">Zo bouwen wij een website die wél werkt</h2>
          <p class="section-subtitle">
            We combineren strategie, structuur, design en performance zodat je website bezoekers overtuigt en converteert.
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
              <h3>Strategie &amp; structuur</h3>
              <p>We maken je aanbod glashelder en bouwen een logische opbouw zodat bezoekers sneller beslissen.</p>
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
              <h3>Conversiegericht design</h3>
              <p>Design dat vertrouwen opbouwt en bezoekers naar actie stuurt: contact, offerte of afspraak.</p>
            </div>
          </div>

          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="approach-content">
              <h3>Snelheid &amp; technische basis</h3>
              <p>Mobielvriendelijk, snel en technisch netjes — met een sterke SEO-basis vanaf dag één.</p>
            </div>
          </div>

          <div class="approach-card">
            <div class="approach-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
            </div>
            <div class="approach-content">
              <h3>Duidelijke call-to-actions</h3>
              <p>We verlagen frictie: duidelijke knoppen, slimme formulieren en een heldere contactflow.</p>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <router-link :to="{ path: '/webdesign', hash: '#stappen-webdesign' }" class="text-link">
            Bekijk onze werkwijze →
          </router-link>
        </div>
      </div>
    </section>

    <!-- RESULTATEN - Modern Cards with Gradient Accents -->
    <section class="content-section results-section" id="resultaten">
      <div class="container">
        <div class="section-header">
          <span class="label small">Resultaten</span>
          <h2 class="section-title">Wat een conversiegerichte website kan opleveren</h2>
          <p class="section-subtitle">
            Niet alleen een mooi design, maar verbeteringen in aanvragen, snelheid en vertrouwen.
          </p>
        </div>

        <div class="results-grid">
          <article class="result-card">
              <div class="result-header">
                <a href="https://fripole.be/" class="result-tag" target="_blank" rel="noopener noreferrer">
                  Fripole
                </a>
              <div class="result-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Snellere laadtijd
              </div>
            </div>
            <h3>Performance &amp; technische basis</h3>
            <p>Snellere pagina&apos;s zorgen voor minder afhakers en een professionelere indruk.</p>
            <ul class="result-features">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Afbeeldingen geoptimaliseerd
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Structuur + caching
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                FAQ + duidelijke antwoorden
              </li>
            </ul>
          </article>

          <article class="result-card">
            <div class="result-header">
              <a href="https://immosads.com" class="result-tag" target="_blank" rel="noopener noreferrer">
                IMMO Sads
              </a>

              <div class="result-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Meer vertrouwen
              </div>
            </div>
            <h3>Design dat vertrouwen bouwt</h3>
            <p>Een duidelijke layout + sterke uitleg maakt het makkelijker om "ja" te zeggen.</p>
            <ul class="result-features">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Consistente branding
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Mobile-first finetuning
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Snelle contactflow
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
          <span class="label small">Stappen</span>
          <h2 class="section-title">Onze werkwijze in 4 duidelijke stappen</h2>
          <p class="section-subtitle">
            Transparant proces, duidelijke feedbackmomenten en focus op resultaat: aanvragen, leads en afspraken.
          </p>
        </div>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker">
              <span>1</span>
            </div>
            <div class="timeline-content">
              <h3>Strategie &amp; doelen</h3>
              <p>We bepalen je doelgroep, boodschap en primaire call-to-action (contact, offerte, afspraak).</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>2</span>
            </div>
            <div class="timeline-content">
              <h3>wireframe &amp; Design</h3>
              <p>Design dat vertrouwen opbouwt, met duidelijke hiërarchie en converterende content.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>3</span>
            </div>
            <div class="timeline-content">
              <h3>Bouw &amp; performance</h3>
              <p>Mobielvriendelijk, snel en technisch netjes: klaar voor SEO en een vlotte gebruikerservaring.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">
              <span>4</span>
            </div>
            <div class="timeline-content">
              <h3>Lancering &amp; optimalisatie</h3>
              <p>Livegang + opvolging: meten, bijsturen en verbeteren waar nodig.</p>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <router-link :to="{ path: '/webdesign', hash: '#stappen-webdesign' }" class="btn btn--primary btn--large">
            Ontdek onze volledige werkwijze →
          </router-link>
        </div>
      </div>
    </section>

    <!-- VOOR WIE - Clean Checklist -->
    <section class="content-section checklist-section" id="voor-wie">
      <div class="container">
        <div class="section-header">
          <span class="label small">Voor wie?</span>
          <h2 class="section-title">Ideaal voor bedrijven die meer aanvragen willen</h2>
          <p class="section-subtitle">
            Voor bedrijven die hun website willen inzetten als groeimotor — niet als online brochure.
          </p>
        </div>

        <div class="checklist">
          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>KMO&apos;s en lokale bedrijven die meer leads of aanvragen willen.</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Dienstverleners (consultants, agencies, coaches, …) met een duidelijk aanbod.</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Starters die meteen professioneel online willen staan.</span>
          </div>

          <div class="checklist-item">
            <div class="checklist-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Bedrijven met een bestaande website die weinig resultaat oplevert.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PAKKETTEN - Feature Box -->
    <section class="content-section packages-section" id="pakketten">
      <div class="container">
        <div class="section-header">
          <span class="label">Pakketten</span>
          <h2 class="section-title">Eenmalig of abonnement: kies wat bij je past</h2>
          <p class="section-subtitle">
            Kies voor een eenmalige bouwprijs, of voor een abonnement met hosting &amp; onderhoud zodat je website veilig,
            snel en up-to-date blijft.
          </p>
        </div>

        <div class="packages-feature">
          <div class="packages-features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span>Mobielvriendelijk design</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Snelheid &amp; Core Web Vitals basis</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span>SEO-basis (structuur, meta, indexing)</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
              </div>
              <span>Conversie CTA&apos;s + duidelijke contactflow</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>SSL-certificaat &amp; beveiligde hosting</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <span>Contactformulier &amp; Google Analytics</span>
            </div>
          </div>
        </div>

        <div class="cta-row">
          <router-link :to="{ path: '/webdesign', hash: '#pakketten' }" class="btn btn--primary btn--large">
            Bekijk opties &amp; prijzen
            <svg class="btn__icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </router-link>

          <router-link to="/contact" class="btn btn--secondary btn--large">
            Vraag advies
          </router-link>
        </div>
      </div>
    </section>

    <FaqListKlanten :faqs="faqsMeerKlanten" />

    <!-- FINAL CTA -->
    <section class="content-section final-cta-section">
      <div class="container">
        <div class="final-cta">
          <div class="final-cta__content">
            <span class="label">Klaar om te starten?</span>
            <h2 class="section-title">Plan een gratis kennismaking</h2>
            <p class="section-subtitle1">
              We bekijken je doelen en geven eerlijk advies over wat je website nodig heeft om meer aanvragen op te leveren.
            </p>

            <div class="cta-row">
              <router-link to="/contact" class="btn btn--primary btn--large">
                Gratis kennismaking
                <svg class="btn__icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import FaqListKlanten from '../components/FaqListKlanten.vue'
import { faqsMeerKlanten } from '../data/faqs.meerklanten.js'
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

/* ─── Buttons ─── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

.btn__icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.btn--primary {
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-primary);
}

.btn--primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

.btn--primary:hover .btn__icon {
  transform: translateX(2px);
}

.btn--secondary {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.btn--secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn--large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* ─── Hero ─── */
.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
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
  color: #f8fafc;
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
  background: radial-gradient(circle, rgba(129, 140, 248, 0.3) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 1;
  pointer-events: none;
}

.hero__subtitle {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: rgba(248, 250, 252, 0.9);
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
  color: rgba(248, 250, 252, 0.7);
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
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.9rem;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.trust-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.9);
}

/* Floating elements */
.floating-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(80px);
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

.element-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.element-2 {
  width: 300px;
  height: 300px;
  background: var(--color-primary);
  bottom: 20%;
  right: -5%;
  animation-delay: 7s;
}

.element-3 {
  width: 250px;
  height: 250px;
  background: var(--color-primary);
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
    opacity: 0.08;
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
  color: #f8fafc;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-top: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: rgba(248, 250, 252, 0.7);
  max-width: 950px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-subtitle1 {
  font-size: 1.125rem;
  color: rgba(248, 250, 252, 0.7);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
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
  border-color: rgba(129, 140, 248, 0.3);
}

.problem-card:hover::before {
  opacity: 1;
}

.problem-icon {
  width: 52px;
  height: 52px;
  background: rgba(129, 140, 248, 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  transition: all 0.4s ease;
}

.problem-card:hover .problem-icon {
  background: rgba(129, 140, 248, 0.15);
  transform: scale(1.05);
}

.problem-icon svg {
  width: 26px;
  height: 26px;
}

.problem-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.problem-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.65);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.approach-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--color-primary-glow);
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
  background: #FFFFFF;
  transform: rotate(-5deg) scale(1.05);
}

.approach-icon svg {
  width: 28px;
  height: 28px;
}

.approach-content h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.approach-content p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.7);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.01);
  border-radius: 20px;
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
  border-color: var(--color-primary-glow);
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
  content: " ↗";
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
  color: rgba(129, 140, 248, 0.8);
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
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.result-card > p {
  margin: 0 0 1.5rem;
  color: rgba(248, 250, 252, 0.7);
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
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.875rem;
  line-height: 1.5;
}

.result-features svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #10b981;
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
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.25rem;
  color: #fff;
  position: relative;
  z-index: 2;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  border-color: var(--color-primary-glow);
  transform: translateX(4px);
}

.timeline-content h3 {
  margin: 0 0 0.5rem;
  color: #f8fafc;
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: -0.01em;
}

.timeline-content p {
  margin: 0;
  color: rgba(248, 250, 252, 0.7);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  font-size: 1rem;
  color: #f8fafc;
  line-height: 1.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.checklist-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateX(6px);
}

.checklist-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  transition: all 0.3s ease;
}

.checklist-item:hover .checklist-icon {
  background: #10b981;
  color: #fff;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-width: 900px;
  margin: 0 auto 3rem;
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
}

.packages-feature:hover {
  border-color: var(--color-primary-border);
  background: rgba(255, 255, 255, 0.04);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(248, 250, 252, 0.85);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-primary-glow);
  transform: translateY(-2px);
}

.feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: rgba(129, 140, 248, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  background: var(--color-primary);
  color: #fff;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-primary-border);
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
  .label{
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
