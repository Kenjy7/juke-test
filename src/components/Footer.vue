<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <h2 class="brand-title">juke</h2>
        <p class="brand-tagline">{{ t('footer.tagline') }}</p>

        <div class="footer-social">
          <a
            href="https://www.linkedin.com/company/jukecoding"
            class="social-link"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/jukecoding/"
            class="social-link"
            aria-label="Instagram"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-linecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <nav class="footer-nav">
          <h3 class="footer-heading">{{ t('footer.headings.services') }}</h3>
          <ul class="footer-list">
            <li>
              <router-link to="/saas-development">{{ t('nav.saas') }}</router-link>
            </li>
            <li>
              <router-link to="/ai-projecten">{{ t('nav.ai') }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="footer-col">
          <nav class="footer-nav">
            <h3 class="footer-heading">{{ t('footer.headings.products') }}</h3>
            <ul class="footer-list">
              <li><router-link to="/vibemind">Vibemind</router-link></li>
              <li><router-link to="/beheerly">{{ t('nav.beheerly') }}</router-link></li>
            </ul>
          </nav>

          <nav class="footer-nav">
            <h3 class="footer-heading">{{ t('footer.headings.company') }}</h3>
            <ul class="footer-list">
              <li>
                <router-link to="/blog">{{ t('footer.links.blog') }}</router-link>
              </li>
            </ul>
          </nav>
        </div>

        <nav class="footer-nav footer-contact">
          <h3 class="footer-heading">{{ t('footer.headings.contact') }}</h3>
          <ul class="footer-list">
            <li>
              <router-link to="/contact">{{ t('footer.links.contact') }}</router-link>
            </li>
            <li>
              <a href="mailto:contact@jukecoding.be">contact@jukecoding.be</a>
            </li>
            <li>
              <a href="tel:+32479131715">+32 479 13 17 15</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-company">
        &copy; 2026 Juke &middot; 3500 Hasselt, België
      </p>
      <nav class="footer-legal" :aria-label="t('footer.legal.aria')">
        <router-link to="/privacybeleid">{{ t('footer.legal.privacy') }}</router-link>
        <router-link to="/cookies">{{ t('footer.legal.cookies') }}</router-link>
        <button type="button" class="footer-legal__btn" @click="openSettings">
          {{ t('footer.legal.cookieSettings') }}
        </button>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { t } = useI18n()
// "Cookievoorkeuren" reopens the consent dialog (GDPR: withdraw as easily as given).
const { openSettings } = useCookieConsent()
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
  grid-template-columns: 1.3fr 1.7fr;
  gap: var(--space-16) var(--space-12);
  align-items: start;
}

/* ─── Brand zone (anchor on the left) ─── */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: flex-start;
}

.brand-title {
  font-family: var(--font-wordmark);
  font-size: clamp(2.25rem, 3.5vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  margin: 0;
  line-height: 1;
  color: var(--color-text-primary);
}

.brand-tagline {
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
  margin: 0;
  max-width: 30ch;
  line-height: var(--leading-normal);
}

/* ─── Link cluster (right zone) ─── */
.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: var(--space-12) var(--space-8);
  align-items: start;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.footer-heading {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-tertiary);
  margin: 0 0 var(--space-5) 0;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-list a {
  display: inline-block;
  width: fit-content;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-small);
  /* Emerald underline-on-hover — intentional, calm. */
  background-image: linear-gradient(var(--color-primary), var(--color-primary));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  transition: color var(--transition-fast), background-size var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
    background-size: 100% 1px;
  }
}

/* ─── Social tiles (hairline, calm — no lift) ─── */
.footer-social {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
  transition: color var(--transition-fast), border-color var(--transition-fast),
    background var(--transition-fast);

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary-border);
    background: var(--color-primary-subtle);
  }
}

/* ─── Bottom bar ─── */
.footer-bottom {
  border-top: 1px solid var(--color-border);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-6) var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
}

.footer-company {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.footer-legal {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
}
.footer-legal a,
.footer-legal__btn {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
  }
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: var(--space-12) var(--space-6) var(--space-8);
    text-align: center;
  }
  .footer-brand {
    align-items: center;
  }
  .footer-links {
    grid-template-columns: 1fr;
    gap: var(--space-10);
    justify-items: center;
  }
  .footer-col {
    gap: var(--space-10);
  }
  .footer-list {
    align-items: center;
  }
  .footer-bottom {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}
</style>
