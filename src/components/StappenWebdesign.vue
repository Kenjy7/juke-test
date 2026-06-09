<template>
  <section id="stappen-webdesign" class="services-wrapper">
    <section
        v-for="(service, i) in services"
        :key="i"
        class="service-section"
        :class="{ 'reverse': i % 2 === 1 }"
    >
      <div class="container">
        <div class="grid">
          <!-- TEXT -->
          <div class="text" :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'">
            <span class="label">{{ service.phase }} · {{ service.duration }}</span>
            <h2>{{ service.title }}</h2>
            <p class="intro">{{ service.intro }}</p>
            <div class="paragraphs">
              <p v-for="(p, j) in service.paragraphs" :key="j">{{ p }}</p>
            </div>

            <router-link
                v-if="service.cta"
                to="/contact"
                class="btn"
            >
              <span>{{ service.cta }}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </router-link>
          </div>

          <!-- CARDS -->
          <div class="cards" v-if="service.cards" :data-aos="i % 2 === 0 ? 'fade-left' : 'fade-right'">
            <div
                class="info-card"
                v-for="(card, k) in service.cards"
                :key="k"
                :style="{ animationDelay: `${k * 0.1}s` }"
            >
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h4>{{ card.title }}</h4>
              <p>{{ card.description }}</p>
            </div>
          </div>

          <!-- IMAGES -->
          <div class="images" v-if="service.images" :data-aos="i % 2 === 0 ? 'fade-left' : 'fade-right'">
            <div class="image-stack">
              <div
                  v-for="(img, l) in service.images"
                  :key="l"
                  class="image-wrapper"
                  :class="`image-${l + 1}`"
              >
                <img :src="img" :alt="`${service.title} afbeelding ${l + 1}`" width="900" height="900" loading="lazy" decoding="async" />
                <div class="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

// Importeer alle images bovenaan
import DesignJukeAgent from '@/assets/JukeCodingAIDesign.webp'
import KleurpaletJuke from '@/assets/TekenbordHuis.webp'
import NazorgWeb from '@/assets/JukeCodingAINazorg.webp'
import ITservices from '@/assets/ITServicesJuke.webp'

const services = [
  {
    phase: 'Stap 1',
    duration: 'Gesprek',
    title: 'Kennismaken & Plan maken',
    intro: 'We bepalen samen wat jouw website moet opleveren.',
    paragraphs: [
      'We starten met een persoonlijk gesprek over je bedrijf, je aanbod en je ideale klant. Heb je al een website? Dan bekijken we wat goed werkt en waar bezoekers afhaken.',
      'Daarna maken we een helder plan: structuur, pagina’s, inhoud en de volgende stappen. Zo bouwen we gericht aan een website die duidelijk is én aanvragen oplevert.'
    ],
    cards: [
      {
        title: 'Persoonlijk gesprek',
        description: 'We bespreken jouw ideeën, doelen en verwachtingen zodat we goed op één lijn zitten.'
      },
      {
        title: 'Inzicht in je doelgroep',
        description: 'We kijken wie je klanten zijn en wat zij nodig hebben op jouw website.'
      },
      {
        title: 'Website check',
        description: 'Als je al een website hebt, bekijken we snelheid, gebruiksgemak en verbeterpunten.'
      },
      {
        title: 'Duidelijk stappenplan',
        description: 'Je weet precies wat we gaan doen, wanneer en met welk doel.'
      }
    ],
    cta: 'Start met een gratis strategiesessie'
  },
  {
    phase: 'Stap 2',
    duration: '1 week',
    title: 'Ontwerp & Uitstraling',
    intro: 'Een ontwerp dat vertrouwen wekt en bezoekers vlot laat beslissen.',
    paragraphs: [
      'We werken eerst de structuur uit: welke pagina’s zijn nodig en hoe vinden bezoekers snel wat ze zoeken. Alles wordt ontworpen met gebruiksgemak als prioriteit.',
      'Daarna vertalen we jouw merk naar een professionele uitstraling met kleuren, typografie en beelden die passen bij je doelgroep. Je krijgt een duidelijk voorstel dat we samen verfijnen.'
    ],
    images: [DesignJukeAgent, KleurpaletJuke]
  },
  {
    phase: 'Stap 3',
    duration: '2-3 weken',
    title: 'Website Bouwen',
    intro: 'We bouwen een snelle, veilige website die klaar is om te groeien.',
    paragraphs: [
      'We ontwikkelen je website met moderne techniek die snel laadt en betrouwbaar werkt op mobiel en desktop. Je kan achteraf zelf eenvoudig teksten en afbeeldingen aanpassen.',
      'Heb je extra functionaliteiten nodig, zoals formulieren, een webshop of koppelingen met tools? Dan bouwen we die mee in — zonder dat het complex wordt voor jou.'
    ],
    cards: [
      {
        title: 'Website op maat',
        description: 'Een professionele website die volledig aansluit bij jouw wensen en doelen.'
      },
      {
        title: 'Webshop',
        description: 'Online verkopen met een gebruiksvriendelijke en veilige webshop.'
      },
      {
        title: 'Koppelingen & tools',
        description: 'Integraties met e-mail, betalingen, statistieken en andere systemen.'
      },
      {
        title: 'Portalen & dashboards',
        description: 'Handige omgevingen voor klanten, medewerkers of overzichtelijke data.'
      }
    ]
  },
  {
    phase: 'Stap 4',
    duration: 'Doorlopend',
    title: 'Testen, Livegang & Verbeteren',
    intro: 'We lanceren zorgvuldig en blijven optimaliseren voor betere resultaten.',
    paragraphs: [
      'Voor de livegang testen we alles uitgebreid: snelheid, mobielvriendelijkheid, formulieren en weergave in verschillende browsers. Zo gaat je website stabiel en professioneel online.',
      'Na de lancering blijven we verbeteren. We kijken naar bezoekersgedrag en sturen bij waar nodig, zodat je website stap voor stap meer aanvragen en conversie oplevert.'
    ],
    results: [
      'Goed geteste en stabiele website',
      'Betere vindbaarheid in Google',
      'Inzicht in bezoekers en prestaties',
      'Doorlopende verbeteringen',
      'Onderhoud en support zonder zorgen'
    ],
    images: [NazorgWeb, ITservices]
  }
]


onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el))
})
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.services-wrapper {
  position: relative;
  overflow: hidden;
}

.service-section {
  position: relative;
  padding-top: 5rem;
  padding-bottom: 4rem;
  z-index: 1;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.reverse .grid {
  direction: rtl;

  > * {
    direction: ltr;
  }
}

// TEXT SECTION
.text {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 0;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-primary-border);
}

.text h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.intro {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: 2rem;
  border-left: 3px solid var(--color-primary);
  padding-left: 1.5rem;
}

.paragraphs {
  margin-bottom: 2.5rem;
}

.text p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
}

// Results Section
.results-section {
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: 1.25rem;
  padding: 2rem;
  margin: 2.5rem 0;

  h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 1.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '✨';
      font-size: 1.25rem;
    }
  }
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.875rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-primary);

    svg {
      flex-shrink: 0;
      margin-top: 0.25rem;
      color: var(--color-primary);
    }
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 3rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow-primary);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-hover);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  span, svg {
    position: relative;
    z-index: 1;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow-primary);

    &::before {
      opacity: 1;
    }

    svg {
      transform: translateX(4px);
    }
  }
}

// CARDS
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.info-card {
  background: var(--color-bg-card-inner);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: 1.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-subtle);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: var(--color-primary-glow);
    box-shadow: var(--shadow-glow-primary);

    &::before {
      opacity: 1;
    }

    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      background: var(--color-primary);
    }
  }

  h4, p {
    position: relative;
    z-index: 1;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 0.75rem 0;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  background: var(--color-primary-subtle);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  svg {
    color: var(--color-primary);
    transition: color 0.3s ease;
  }
}

.info-card:hover .icon-wrapper svg {
  color: #fff;
}

// IMAGES
.images {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.image-stack {
  position: relative;
  width: 100%;
  height: 500px;
}

.image-wrapper {
  position: absolute;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid var(--color-border);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-border);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.image-1 {
  width: 65%;
  height: 70%;
  top: 0;
  left: 0;
  z-index: 2;

  &:hover {
    transform: translateY(-10px) rotate(-2deg);
    z-index: 3;
  }
}

.image-2 {
  width: 55%;
  height: 60%;
  bottom: 0;
  right: 0;
  z-index: 1;

  &:hover {
    transform: translateY(-10px) rotate(2deg);
    z-index: 3;
  }
}

// RESPONSIVE
@media (max-width: 900px) {
  .service-section {
    padding: 6rem 0;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .reverse .grid {
    direction: ltr;
  }

  .text h2 {
    font-size: 2.5rem;
  }

  .intro {
    font-size: 1.125rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .image-stack {
    height: 400px;
  }

  .text, .cards, .images {
    transform: translateY(20px);

    &.visible {
      transform: translateY(0);
    }
  }
}

@media (max-width: 600px) {
  .service-section {
    padding: 4rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .text h2 {
    font-size: 2rem;
  }

  .intro {
    font-size: 1rem;
    padding-left: 1rem;
  }

  .results-section {
    padding: 1.5rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .image-stack {
    height: 350px;
  }
}

</style>

