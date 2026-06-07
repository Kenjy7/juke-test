<template>
  <div v-if="city" class="page">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero__overlay"></div>

      <div class="container container--7xl hero__inner">
        <div class="hero__grid">
          <div
              class="hero__content hero__reveal"
              :class="{ 'hero__reveal--in': isVisible, 'hero__reveal--out': !isVisible }"
          >
            <div class="hero__location">
              <svg class="icon icon--sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="hero__locationText">
                {{ city.naam }}, {{ regioLabel }}
              </span>
            </div>

            <h1 class="hero__title">Website laten maken <br>in {{ city.naam }}</h1>

            <p class="hero__subtitle">
              {{ city.beschrijving }}
            </p>

            <p class="hero__answer">
              Een website laten maken in {{ city.naam }} doe je bij JukeCoding. Wij bouwen snelle websites
              op maat voor KMO en zelfstandigen in {{ regioLabel }}. <strong>Prijs vanaf EUR 600</strong>,
              inclusief ontwerp en livegang. <strong>Gemiddelde doorlooptijd: 3 tot 5 weken.</strong>
            </p>

            <p v-if="city.heroIntro" class="hero__subtitle hero__subtitle--intro">
              {{ city.heroIntro }}
            </p>

            <div class="hero__badges">
              <span class="hero__badge">Vanaf EUR 600</span>
              <span class="hero__badge">Lokale SEO inbegrepen</span>
              <span class="hero__badge">Voor KMO's & zelfstandigen</span>
            </div>

            <div class="hero__actions">
              <router-link to="/offerte-aanvraag" class="btn btn--accent">
                Gratis Offerte
                <svg class="btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>

              <router-link
                  to="/webdesign#pakketten"
                  class="btn btn--secondary"
              >
                Bekijk prijzen & aanpak
              </router-link>
            </div>
          </div>

          <div class="hero__image">
            <img
                :src="city.fotoHero"
                :alt="`Webdesign in ${city.naam} – voorbeelden en aanpak`"
                loading="eager"
                fetchpriority="high"
                width="800"
                height="600"
            />
          </div>
        </div>
      </div>

      <div class="hero__wave">
        <svg viewBox="0 0 1440 120" class="hero__waveSvg">
          <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </header>

    <!-- Stats Bar -->
    <section class="stats">
      <div class="container">
        <div class="stats__grid">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <div class="stat__number">{{ stat.number }}</div>
            <div class="stat__label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- About City Section -->
    <section class="about">
      <div class="container">
        <div class="about__grid">
          <div class="about__image">
            <img
                :src="city.fotoAbout"
                :alt="`Website laten maken in ${city.naam} – lokaal webdesign`"
                loading="lazy"
                width="800"
                height="500"
            />
          </div>

          <div class="about__content">
            <span class="label">Over {{ city.naam }}</span>
            <h2 class="about__title">Expertise uit jouw regio</h2>
            <p class="about__text">{{ city.introLang }}</p>
            <p class="about__text about__text--business">
              We bouwen websites voor dienstverleners, horeca en KMO's in {{ city.naam }} die meer aanvragen willen.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pain Points Section -->
    <section class="pain-points">
      <div class="container">
        <div class="pain-points__header">
          <h2 class="pain-points__title">Komt dit je bekend voor?</h2>
        </div>

        <div class="pain-points__grid">
          <div v-for="(point, index) in painPoints" :key="index" class="pain-point">
            <div class="pain-point__icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p class="pain-point__text">{{ point }}</p>
          </div>
        </div>

        <div class="pain-points__cta">
          <p class="pain-points__cta-text">
            Wij begrijpen deze frustraties. Daarom bieden we in {{ city.naam }} transparante,
            betaalbare webdesign-oplossingen die wél resultaat opleveren.
          </p>
        </div>
      </div>
    </section>

    <!-- Werkwijze Section -->
    <section class="process">
      <div class="container">
        <div class="section-header">
          <span class="label">Onze aanpak</span>
          <h2 class="section-header__title">Hoe we werken</h2>
          <p class="section-header__subtitle">
            Van eerste gesprek tot succesvolle website in 4 heldere stappen
          </p>
        </div>

        <div class="process__grid">
          <div v-for="(step, index) in processSteps" :key="index" class="process-step">
            <div class="process-step__number">{{ index + 1 }}</div>
            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="process-step__description">{{ step.description }}</p>
          </div>
        </div>

        <div class="process__cta">
          <router-link to="/webdesign#stappen-webdesign" class="btn btn--accent btn--lg">
            Ontdek onze volledige werkwijze
            <svg class="btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Local Proof Section -->
    <section class="local-proof">
      <div class="container">
        <div class="section-header">
          <span class="label">Lokaal & transparant</span>
          <h2 class="section-header__title">Webdesign voor {{ city.naam }} en omgeving</h2>
          <p class="section-header__subtitle">
            {{ localProofIntro }}
          </p>
        </div>

        <div class="local-proof__grid">
          <div v-for="item in localProofItems" :key="item.title" class="local-proof__card">
            <h3 class="local-proof__title">{{ item.title }}</h3>
            <p class="local-proof__text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <div class="section-header">
          <span class="label">Onze Diensten</span>
          <h2 class="section-header__title">Website laten maken in {{ city.naam }}</h2>
          <p class="section-header__subtitle">
            Van moderne websites tot complete digitale strategieën
          </p>
        </div>

        <div class="services__grid">
          <div v-for="(service, index) in services" :key="index" class="service-card">
            <div class="service-card__icon" v-html="service.icon"></div>
            <h3 class="service-card__title">{{ service.title }}</h3>
            <p class="service-card__description">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Local Offer Section -->
    <section class="local-offer">
      <div class="container">
        <div class="section-header">
          <span class="label">Gratis & vrijblijvend</span>
          <h2 class="section-header__title">Gratis Website Check in {{ city.naam }}</h2>
          <p class="section-header__subtitle">
            In 15 minuten zie je waar je website kansen laat liggen — en welke verbeteringen het snelst resultaat geven.
          </p>
        </div>

        <div class="local-offer__grid">
          <!-- Card 1: Website Check -->
          <div class="local-card">
            <div class="local-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            <h3 class="local-card__title">Gratis Website Check</h3>
            <ul class="local-card__list">
              <li>Laadsnelheid & mobiele ervaring</li>
              <li>Lokale SEO basics (vindbaarheid)</li>
              <li>Conversie: CTA's & formulieren</li>
              <li>Design & teksten</li>
            </ul>

            <p class="local-card__note">
              Je krijgt 3 verbeterpunten die je meteen kan toepassen of door ons kan laten uitvoeren.
            </p>

            <router-link to="/contact" class="btn btn--accent">
              Start gratis check
              <svg class="btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <!-- Card 2: Kennismaking -->
          <div class="local-card">
            <div class="local-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              </svg>
            </div>

            <h3 class="local-card__title">Lokale Kennismaking</h3>
            <p class="local-card__text">
              We plannen een korte meeting (online of in {{ city.naam }} als het uitkomt).
            </p>
            <p class="local-card__text">
              In 15 minuten brengen we je doelen in kaart en tonen we waar je nu kansen laat liggen.
            </p>

            <div class="local-card__chips">
              <span class="chip">15 min</span>
              <span class="chip">Online / lokaal</span>
              <span class="chip">Vrijblijvend</span>
            </div>

            <router-link to="/contact" class="btn btn--secondary">
              Plan gesprek
            </router-link>
          </div>

          <!-- Card 3: Quick Wins via WhatsApp -->
          <div class="local-card">
            <div class="local-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" />
              </svg>
            </div>

            <h3 class="local-card__title">3 Quick Wins</h3>
            <p class="local-card__text">
              Of je nu net start of al een website hebt, we geven je drie snelle verbeteringen
              die vrijwel meteen effect laten zien:
            </p>

            <ul class="local-card__list">
              <li>Snellere site die fijner aanvoelt</li>
              <li>Meteen duidelijk wat je aanbiedt</li>
              <li>Bezoekers sneller richting contact</li>
              <li>Makkelijker contact</li>
            </ul>

            <a
                :href="whatsappQuickWinsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--secondary"
            >
              <svg class="btn__icon-whatsapp" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Stuur WhatsApp
            </a>
          </div>
        </div>

        <div class="local-offer__footer">
          <p class="local-offer__footerText">
            Geen verplichtingen, gewoon heldere tips waar je meteen iets aan hebt.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why">
      <div class="container">
        <div class="section-header">
          <span class="label">Waarom Kiezen Voor Ons</span>
          <h2 class="section-header__title">Jouw partner in {{ city.naam }}</h2>
          <p class="section-header__subtitle">
            Voor ondernemers in {{ city.naam }} en {{ city.omgeving.join(', ') }}.
          </p>
        </div>

        <div class="why__grid">
          <div v-for="feature in features" :key="feature" class="why__item">
            <svg class="why__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Local Cities Section -->
    <section class="cities-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Ook Actief in</h2>
          <p class="section-subtitle">
            Wij bedienen ondernemers in heel {{ provincieNaam }}
          </p>
          <router-link :to="`/webdesign-${provincieSlug}`" class="btn btn--secondary cities-section__cta">
            Bekijk Webdesign {{ provincieNaam }}
          </router-link>
        </div>

        <div class="cities">
          <router-link
              v-for="stad in andereProvincieSteden"
              :key="stad.slug"
              :to="`/webdesign-${stad.slug}`"
              class="city"
          >
            <svg class="city__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div class="city__content">
              <h3 class="city__title">{{ stad.naam }}</h3>
              <p class="city__text">{{ stad.regioHint || provincieNaam }}</p>
            </div>
            <svg class="city__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta__card">
          <h2 class="cta__title">Klaar om te starten?</h2>
          <p class="cta__text">
            Vraag vrijblijvend een offerte aan voor jouw project in {{ city.naam }}, of ontdek wat er in onze standaard pakketten zit.
          </p>

          <div class="cta__buttons">
            <router-link to="/contact" class="btn btn--accent btn--lg">
              Website laten maken in {{ city.naam }}
              <svg class="btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>

            <router-link to="/webdesign#pakketten" class="btn btn--secondary btn--lg">
              Bekijk pakketten & prijzen
              <svg class="btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <div class="cta__contact">
            <a href="tel:+32479131715" class="cta__contact-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +32 479 13 17 15
            </a>

            <a href="mailto:contact@jukecoding.be" class="cta__contact-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              contact@jukecoding.be
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- WhatsApp Floating Button -->
    <a
        :href="whatsappInterestUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-btn"
        aria-label="Chat via WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
      <span class="whatsapp-btn__text">Chat met ons</span>
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { stadSlugs, stadData } from '@/data/steden'

const props = defineProps({
  stadSlug: { type: String, required: true },
  stadInfo: { type: Object, required: true },
})

const city = computed(() => props.stadInfo)
const isVisible = ref(false)

const provincieSlug = computed(() => city.value.provincieSlug || 'limburg')
const provincieNaam = computed(() => city.value.provincie || 'Limburg')

const andereProvincieSteden = computed(() => {
  return stadSlugs
      .filter((s) => s !== props.stadSlug && (stadData[s].provincieSlug || 'limburg') === provincieSlug.value)
      .map((s) => ({
        slug: s,
        naam: stadData[s].naam,
        regioHint: stadData[s].regioHint,
      }))
})

const regioLabel = computed(() => city.value.regioHint || provincieNaam.value)

const omgevingLabel = computed(() => {
  const list = city.value.omgeving
  if (!Array.isArray(list) || list.length === 0) return `${city.value.naam} en omgeving`
  return `${city.value.naam} & ${list.slice(0, 4).join(', ')}`
})

const localProofIntro = computed(() => {
  const regio = (city.value.regioHint || '').toLowerCase()
  if (regio.includes('haspengouw')) {
    return `Ondernemen in ${regioLabel.value} vraagt om een heldere website die vertrouwen wekt en snel converteert.`
  }
  if (regio.includes('maas')) {
    return `In ${regioLabel.value} wil je online opvallen bij zowel locals als bezoekers: snel, duidelijk en mobiel sterk.`
  }
  if (regio.includes('noord')) {
    return `In ${regioLabel.value} telt efficiëntie: een snelle website die aanvragen of verkopen oplevert.`
  }
  if (regio.includes('mijn')) {
    return `In ${regioLabel.value} zijn veel KMO's actief: een sterke website helpt je professioneel over te komen en leads te vangen.`
  }
  return `In ${regioLabel.value} is een sterke online aanwezigheid cruciaal om op te vallen en klanten te overtuigen.`
})

const localProofItems = computed(() => ([
  {
    title: 'Actief in jouw regio',
    text: `We werken voor ondernemers in\n${omgevingLabel.value}.\nAltijd dichtbij en bereikbaar.`,
  },
  {
    title: 'Snel schakelen',
    text: `Korte lijnen en snelle feedback,\nzonder onnodige meetings.\nDuidelijk van start tot live.`,
  },
  {
    title: 'Eerlijk advies',
    text: `Geen overbodige features,\nwel focus op impact.\nEerst resultaat, dan uitbreiden.`,
  },
]))

const stats = [
  { number: 'Vanaf EUR 600', label: 'startbudget' },
  { number: '2 weken', label: 'snelle oplevering' },
  { number: 'Lokale SEO', label: 'beter gevonden' },
  { number: 'KMO-proof', label: 'voor zelfstandigen' },
]

const painPoints = [
  'Je hebt een website, maar het webdesign is verouderd en er komt geen business uit.',
  'Je wil een nieuwe website, maar je maakt je zorgen over het kostenplaatje.',
  'Je beseft dat er iets moet veranderen aan je website, maar je weet niet goed hoe en dus gebeurt er niets.',
]

const processSteps = [
  {
    title: 'Kennismaking & plan opstellen',
    description: 'We beginnen bij jou en jouw doelen, geen ingewikkelde theorie',
  },
  {
    title: 'Ontwerp & Uitstraling',
    description: 'We maken een website die logisch werkt en er goed uitziet.',
  },
  {
    title: 'Website Bouwen & Functionaliteiten',
    description: 'We zetten het ontwerp om naar een snelle en betrouwbare website.',
  },
  {
    title: 'Testen, Livegang & Verbeteren',
    description: 'We zorgen dat alles goed werkt en blijven optimaliseren.',
  },
]

const services = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>`,
    title: 'Website Development',
    description: 'Moderne, responsive websites gebouwd met betrouwbare technologie.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>`,
    title: 'Lokale SEO (vindbaarheid)',
    description: 'Vergroot je lokale online zichtbaarheid en bereik meer klanten uit jouw regio.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>`,
    title: 'E-commerce & Webshops',
    description: 'Gebruiksvriendelijke webshops gericht op conversie en verkoop.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,
    title: 'Onderhoud & Support',
    description: 'Doorlopende ondersteuning en updates voor een stabiele website.',
  },
]

const features = computed(() => [
  'Lokale kennis van ' + city.value.naam,
  'Persoonlijke begeleiding',
  'Snelle laadtijden',
  'Mobile-first design',
  'Google geoptimaliseerd',
  'Veilig & betrouwbaar',
  'Maandelijks onderhoud',
  'Transparante prijzen',
])

const whatsappQuickWinsUrl = computed(() => {
  const text = `Hallo, kunnen jullie 3 quick wins voor mijn website in ${city.value.naam} voorstellen?`
  return `https://wa.me/32479131715?text=${encodeURIComponent(text)}`
})

const whatsappInterestUrl = computed(() => {
  const text = `Hallo, ik heb interesse in webdesign diensten in ${city.value.naam}`
  return `https://wa.me/32479131715?text=${encodeURIComponent(text)}`
})

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  position: relative;
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

.container--7xl {
  max-width: 1300px;
}

.icon {
  display: block;
}

.icon--sm {
  width: 1.25rem;
  height: 1.25rem;
}

/* Label */
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

/* Buttons — canonical .btn system comes from base.css.
   Only the WhatsApp-specific icon override stays local. */
.btn__icon-whatsapp {
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
}

/* Hero Section */
.hero {
  padding: 0;
  position: relative;
  overflow: hidden;
  color: var(--color-text-primary);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.hero__inner {
  position: relative;
  padding-top: 4rem;
  padding-bottom: 6rem;
}

@media (max-width: 576px) {
  .hero__inner {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.hero__image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  aspect-ratio: 4/3;
}

.hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__reveal {
  transition-property: all;
  transition-duration: 1000ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.hero__reveal--in {
  transform: translateY(0);
  opacity: 1;
}

.hero__reveal--out {
  transform: translateY(2.5rem);
  opacity: 0;
}

.hero__location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.hero__locationText {
  color: var(--color-text-secondary);
}

.hero__title {
  font-size: 3rem;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

@media (max-width: 576px) {
  .hero__title {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .hero__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }
}

.hero__subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  max-width: 42rem;
  margin-bottom: 2rem;
}

.hero__answer {
  max-width: 50rem;
  margin: -0.75rem 0 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.hero__answer strong {
  color: var(--color-text-primary);
}

@media (min-width: 768px) {
  .hero__subtitle {
    font-size: 1.5rem;
  }
}

.hero__subtitle--intro {
  opacity: 0.85;
  margin-top: 0.5rem;
  font-size: 1.0625rem;
  max-width: 55ch;
  line-height: 1.7;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.hero__badge {
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-hover);
  background: var(--color-border);
  color: var(--color-text-primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.hero__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .hero__actions {
    flex-direction: row;
  }
}

.hero__wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero__waveSvg {
  width: 100%;
  height: 3rem;
  fill: currentColor;
  color: transparent;
}

/* Stats */
.stats {
  padding: 2rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat__number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.stat__label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Pain Points Section */
.pain-points {
  padding: 6rem 0;
}

@media (max-width: 768px) {
  .pain-points {
    padding: 4rem 0;
  }
}

.pain-points__header {
  text-align: center;
  margin-bottom: 3rem;
}

.pain-points__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.pain-points__grid {
  display: grid;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto 3rem;
}

.pain-point {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pain-point:hover {
  border-color: var(--color-primary-border);
  border-left-color: var(--color-accent);
  transform: translateX(4px);
  background: var(--color-bg-surface);
}

.pain-point__icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: rgba(245, 158, 11, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pain-point__icon svg {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
}

.pain-point__text {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  padding-top: 0.5rem;
}

.pain-points__cta {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding-top: 0.5rem;
}

.pain-points__cta-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

/* Process Section */
.process {
  padding: 0 0 5rem;
}

@media (max-width: 768px) {
  .process {
    padding: 4rem 0;
  }
}

.process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .process__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .process__grid {
    grid-template-columns: 1fr;
  }
}

.process-step {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.process-step:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary-glow);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}

.process-step__number {
  width: 48px;
  height: 48px;
  background: var(--color-primary-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0 auto 1.5rem;
}

.process-step__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.process-step__description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.process__cta {
  text-align: center;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.section-header .label {
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-header__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  width: 100%;
}

.section-header__subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* About */
.about {
  padding: 7rem 0 2rem 0;
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 0;
  }
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 968px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.about__image {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/10;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.about__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about__content .label {
  margin-bottom: 1.5rem;
}

.about__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.about__text {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.about__text--business {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Services */
.services {
  padding: 6rem 0 3rem 0;
}

@media (max-width: 768px) {
  .services {
    padding: 4rem 0;
  }
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}

.service-card {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary-glow);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}

.service-card:hover .service-card__icon {
  background: var(--color-primary);
  transform: scale(1.05);
}

.service-card__icon {
  width: 56px;
  height: 56px;
  background: var(--color-primary-subtle);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.service-card__icon :deep(svg) {
  width: 40px;
  height: 40px;
  color: var(--color-accent);
}

.service-card:hover .service-card__icon :deep(svg) {
  color: #fff;
}

.service-card__title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.875rem;
  letter-spacing: -0.01em;
}

.service-card__description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  flex-grow: 1;
}

/* Why */
.why {
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .why {
    padding: 4rem 0;
  }
}

.why__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .why__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}

.why__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.why__item:hover {
  border-color: var(--color-primary-glow);
  transform: translateX(4px);
}

.why__icon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  color: var(--color-primary);
}

/* Cities */
.cities-section {
  padding: 3rem 0;
}

.cities-section__cta {
  margin: 1.5rem auto 0;
}

@media (max-width: 768px) {
  .cities-section {
    padding: 4rem 0;
  }
}

.cities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.city {
  background: var(--color-bg-surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.city:hover {
  transform: translateY(-4px);
  border-color: rgba(96, 165, 250, 0.3);
  background: var(--color-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.city:hover .city__arrow {
  transform: translateX(4px);
}

.city__icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  color: var(--color-primary);
}

.city__content {
  flex: 1;
}

.city__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.city__text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.city__arrow {
  width: 20px;
  height: 20px;
  color: var(--color-text-tertiary);
  transition: all 0.3s ease;
}

/* CTA */
.cta {
  padding: 3rem 0 5rem;
}

@media (max-width: 768px) {
  .cta {
    padding: 4rem 0 6rem;
  }
}

.cta__card {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 3.5rem 3rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .cta__card {
    padding: 2.5rem 2rem;
  }
}

.cta__title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.cta__text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta__buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .cta__buttons {
    flex-direction: row;
  }
}

/* CTA buttons: mooier met lange tekst */
.cta__buttons .btn {
  width: 100%;
  max-width: 520px;
  white-space: normal;
  text-align: center;
  line-height: 1.25;
}

@media (min-width: 640px) {
  .cta__buttons .btn {
    width: auto;
    min-width: 260px;
  }
}

.cta__contact {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.cta__contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta__contact-link:hover {
  color: var(--color-primary);
}

.cta__contact-link svg {
  width: 18px;
  height: 18px;
}

/* WhatsApp Button */
.whatsapp-btn {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 0.9375rem;
}

.whatsapp-btn:hover {
  background: #20ba5a;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(37, 211, 102, 0.5);
}

.whatsapp-btn svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.whatsapp-btn__text {
  white-space: nowrap;
}

@media (max-width: 640px) {
  .whatsapp-btn {
    bottom: 1.5rem;
    left: 1.5rem;
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
  }

  .whatsapp-btn svg {
    width: 20px;
    height: 20px;
  }
}

/* Local Proof */
.local-proof {
  padding: 2rem 0 0 0;
  margin: 0;
}

@media (max-width: 768px) {
  .local-proof {
    padding: 4rem 0;
  }
}

.local-proof__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .local-proof__grid {
    grid-template-columns: 1fr;
  }
}

.local-proof__card {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.local-proof__card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
}

.local-proof__title {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.local-proof__text {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.975rem;
  white-space: pre-line;
}

/* Local Offer */
.local-offer {
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .local-offer {
    padding: 4rem 0;
  }
}

.local-offer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .local-offer__grid {
    grid-template-columns: 1fr;
  }
}

.local-card {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.local-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary-glow);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}

.local-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--color-primary-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.local-card__icon svg {
  width: 28px;
  height: 28px;
  color: var(--color-text-primary);
}

.local-card__title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-primary);
}

.local-card__text,
.local-card__note {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.975rem;
}

.local-card__list {
  margin-left: 1rem;
  display: grid;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.local-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.chip {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
  background: var(--color-primary-subtle);
}

.local-offer__footer {
  max-width: 800px;
  margin: 2.5rem auto 0;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.local-offer__footerText {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
