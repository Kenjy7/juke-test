<template>
  <div class="locaties-page">
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Actief in Vlaanderen</h1>
          <p class="hero__subtitle">
            Bekijk in welke Vlaamse provincies we websites bouwen voor zelfstandigen en KMO's.
          </p>
          <router-link to="/webdesign" class="hero__cta">
            Bekijk onze webdesign aanpak
          </router-link>
        </div>
      </div>
    </section>

    <section class="cities-section">
      <div class="container">
        <div class="cities">
          <router-link
            v-for="provincie in alleProvincies"
            :key="provincie.slug"
            :to="`/webdesign-${provincie.slug}`"
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
              <h3 class="city__title">{{ provincie.naam }}</h3>
              <p class="city__text">{{ provincie.regio }}</p>
            </div>
            <svg class="city__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { provincieData, provincieSlugs } from '@/data/provincies'

const alleProvincies = computed(() =>
  provincieSlugs.map((slug) => ({
    slug,
    naam: provincieData[slug].naam,
    regio: provincieData[slug].regio,
  }))
)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.locaties-page {
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

.hero {
  padding: 4rem 0 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 3rem;
  }
}

.hero__content {
  max-width: 700px;
  margin: 0 auto;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.hero__cta {
  display: inline-flex;
  margin-top: 1.5rem;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.2s ease;
}

.hero__cta:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-1px);
}

.cities-section {
  padding: 3rem 0 5rem;
}

@media (max-width: 768px) {
  .cities-section {
    padding: 2rem 0 4rem;
  }
}

.cities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.city {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.city:hover .city__arrow {
  transform: translateX(4px);
}

.city__icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  color: #60a5fa;
}

.city__content {
  flex: 1;
}

.city__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.city__text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.city__arrow {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

html {
  scroll-behavior: smooth;
}

*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
