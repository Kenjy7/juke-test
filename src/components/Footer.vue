<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <img src="../../src/assets/logo.webp" alt="JUKE Coding" class="footer-logo" />
        <div class="brand-content">
          <h2 class="brand-title"><span>JUKE</span> CODING</h2>
          <p class="brand-tagline">Development studio voor AI, SaaS en web.</p>
        </div>
      </div>

      <nav class="footer-nav">
        <h3 class="footer-heading">Diensten</h3>
        <ul class="footer-list">
          <li><router-link to="/ai-projecten">AI-projecten</router-link></li>
          <li><router-link to="/saas-development">SaaS Development</router-link></li>
          <li><router-link to="/webdesign">Webdesign</router-link></li>
          <li><router-link to="/gratis-seo-scan">Gratis SEO Scan</router-link></li>
        </ul>
      </nav>

      <nav class="footer-nav">
        <h3 class="footer-heading">Actief in</h3>
        <ul class="footer-list footer-list--locations">
          <li v-for="provincie in provincies" :key="provincie.slug">
            <router-link :to="`/webdesign-${provincie.slug}`">{{ provincie.naam }}</router-link>
          </li>
          <li class="footer-all-locations">
            <router-link to="/locaties">Bekijk alle locaties &rarr;</router-link>
          </li>
        </ul>
      </nav>

      <div class="footer-contact">
        <h3 class="footer-heading">Contact</h3>
        <ul class="footer-list">
          <li>
            <router-link to="/contact" class="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Neem contact op
            </router-link>
          </li>
          <li>
            <a href="mailto:contact@jukecoding.be" class="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              contact@jukecoding.be
            </a>
          </li>
          <li>
            <a href="tel:+32479131715" class="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (+32) 0479 13 17 15
            </a>
          </li>
        </ul>

        <div class="footer-social">
          <a href="https://www.linkedin.com/company/jukecoding" class="social-link" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/jukecoding/" class="social-link" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 JUKE CODING &mdash; All rights reserved</p>
    </div>
  </footer>
</template>

<script setup>
import { provincieData, provincieSlugs } from '@/data/provincies'

const provincies = provincieSlugs.map((slug) => ({
  slug,
  naam: provincieData[slug].naam,
}))
</script>

<style scoped lang="scss">
.footer {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-top: 1px solid var(--color-border);
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-8) var(--space-12);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-12);
  align-items: start;
}

.footer-brand {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.footer-logo {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.brand-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: var(--weight-regular);
  margin: 0;
  line-height: 1.2;
  padding-top: 24px;
  color: var(--color-text-primary);

  span { font-weight: var(--weight-bold); }
}

.brand-tagline {
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
  margin: 0;
}

.footer-heading {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-tertiary);
  margin: 0 0 var(--space-6) 0;
}

.footer-nav {
  .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: var(--text-small);
      transition: color var(--transition-fast);

      &:hover { color: var(--color-text-primary); }
    }
  }
}

.footer-list--locations li { break-inside: avoid; }
.footer-all-locations { padding-top: var(--space-3); }

.footer-contact {
  .footer-list {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-6) 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--text-small);
    transition: color var(--transition-fast);

    svg { flex-shrink: 0; opacity: 0.5; }
    &:hover { color: var(--color-text-primary); svg { opacity: 1; } }
  }
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-surface);
  border-radius: 50%;
  color: var(--color-text-tertiary);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    transform: translateY(-2px);
  }
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: var(--space-6) var(--space-8);
  text-align: center;

  p {
    margin: 0;
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
  }
}

@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12) var(--space-8);
  }
  .footer-brand {
    grid-column: 1 / -1;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-12) var(--space-6) var(--space-8);
  }
  .footer-brand {
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
  .footer-nav, .footer-contact {
    text-align: center;
    .footer-list { align-items: center; }
  }
  .contact-link { justify-content: center; }
  .footer-social { justify-content: center; }
}

@media (min-width: 769px) {
  .footer-list--locations {
    columns: 2;
    column-gap: var(--space-6);
  }
}
</style>
