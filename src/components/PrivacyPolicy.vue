<template>
  <section class="privacy">
    <div class="privacy-container">
      <div class="header">
        <h1>{{ t('privacyPolicy.header.title') }}</h1>
        <p class="subtitle">{{ t('privacyPolicy.header.subtitle') }}</p>
        <p class="last-updated">{{ t('privacyPolicy.header.lastUpdated') }}</p>
      </div>

      <div class="intro">
        <p>{{ t('privacyPolicy.intro') }}</p>
      </div>

      <div class="content">
        <section class="section">
          <h2>{{ t('privacyPolicy.controller.title') }}</h2>
          <p>{{ t('privacyPolicy.controller.text') }}</p>
          <div class="ident">
            <span class="ident__name">{{ t('privacyPolicy.controller.name') }}</span>
            <span>{{ t('privacyPolicy.controller.address') }}</span>
            <a href="mailto:contact@jukecoding.be">contact@jukecoding.be</a>
          </div>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.data.title') }}</h2>
          <p>{{ t('privacyPolicy.data.intro') }}</p>
          <ul class="bullets">
            <li v-for="(item, i) in dataItems" :key="i">{{ item }}</li>
          </ul>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.purposes.title') }}</h2>
          <p>{{ t('privacyPolicy.purposes.intro') }}</p>
          <ul class="bullets">
            <li v-for="(item, i) in purposeItems" :key="i">{{ item }}</li>
          </ul>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.sharing.title') }}</h2>
          <p>{{ t('privacyPolicy.sharing.intro') }}</p>
          <div class="parties">
            <div class="party" v-for="(p, i) in parties" :key="i">
              <span class="party-name">{{ p.name }}</span>
              <span class="party-purpose">{{ p.purpose }}</span>
            </div>
          </div>
          <p>{{ t('privacyPolicy.sharing.outro') }}</p>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.retention.title') }}</h2>
          <p>{{ t('privacyPolicy.retention.text') }}</p>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.rights.title') }}</h2>
          <p>{{ t('privacyPolicy.rights.intro') }}</p>
          <ul class="bullets">
            <li v-for="(item, i) in rightsItems" :key="i">{{ item }}</li>
          </ul>
          <p>{{ t('privacyPolicy.rights.outro') }}</p>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.security.title') }}</h2>
          <p>{{ t('privacyPolicy.security.text') }}</p>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.cookies.title') }}</h2>
          <p>{{ t('privacyPolicy.cookies.text') }}</p>
          <router-link to="/cookies" class="inline-link">
            {{ t('privacyPolicy.cookies.link') }}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </section>

        <section class="section">
          <h2>{{ t('privacyPolicy.changes.title') }}</h2>
          <p>{{ t('privacyPolicy.changes.text') }}</p>
        </section>

        <section class="section contact-section">
          <h2>{{ t('privacyPolicy.contact.title') }}</h2>
          <p>{{ t('privacyPolicy.contact.text') }}</p>
          <div class="contact-info">
            <a href="mailto:contact@jukecoding.be" class="contact-link">
              <span class="contact-label">{{ t('privacyPolicy.contact.emailLabel') }}</span>
              <span class="contact-value">contact@jukecoding.be</span>
            </a>
            <a href="tel:+32479131715" class="contact-link">
              <span class="contact-label">{{ t('privacyPolicy.contact.phoneLabel') }}</span>
              <span class="contact-value">+32 479 13 17 15</span>
            </a>
          </div>
        </section>
      </div>

      <router-link to="/" class="back-link">
        {{ t('privacyPolicy.backLink') }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dataItems = computed(() => [t('privacyPolicy.data.form'), t('privacyPolicy.data.technical')])

const purposeItems = computed(() => [
  t('privacyPolicy.purposes.respond'),
  t('privacyPolicy.purposes.analytics'),
  t('privacyPolicy.purposes.legal'),
])

const parties = computed(() => [
  { name: 'EmailJS', purpose: t('privacyPolicy.sharing.emailjs') },
  { name: 'Google Analytics', purpose: t('privacyPolicy.sharing.analytics') },
  { name: 'Hosting', purpose: t('privacyPolicy.sharing.hosting') },
])

const rightsItems = computed(() => [
  t('privacyPolicy.rights.access'),
  t('privacyPolicy.rights.rectify'),
  t('privacyPolicy.rights.erase'),
  t('privacyPolicy.rights.restrict'),
  t('privacyPolicy.rights.object'),
  t('privacyPolicy.rights.portability'),
  t('privacyPolicy.rights.withdraw'),
])
</script>

<style scoped lang="scss">
.privacy {
  min-height: 100vh;
  background: transparent;
  padding: var(--hero-pad-top) 1.5rem var(--section-pad-y);
}

.privacy-container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 2.25rem;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.last-updated {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
}

.intro {
  margin-bottom: 2.25rem;

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.section {
  padding-block: 0; /* override the global .section { padding-block: 9rem } from base.css */

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.ident {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);

  .ident__name {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  a {
    color: var(--color-text-secondary);
    text-decoration: none;
    &:hover {
      color: var(--color-primary);
    }
  }
}

.bullets {
  margin: 0 0 1rem;
  padding-left: 1.5rem;
  list-style: none;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--color-primary);
      font-weight: bold;
    }
  }
}

.parties {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.party {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.5rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;

  .party-name {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .party-purpose {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }
}

.inline-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateX(3px);
  }
}

.contact-section {
  margin-top: 1rem;
}

.contact-info {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;

  .contact-label {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
    min-width: 80px;
  }

  .contact-value {
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  &:hover .contact-value {
    color: var(--color-text-primary);
  }
}

.back-link {
  display: inline-block;
  margin-top: 2.5rem;
  padding: 0.75rem 1.5rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-text-primary);
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
    transform: translateX(-4px);
  }
}

@media (max-width: 768px) {
  .privacy {
    padding: var(--hero-pad-top) 1.25rem var(--section-pad-y);
  }

  .header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .intro {
    margin-bottom: 2rem;

    p {
      font-size: 1rem;
    }
  }

  .content {
    gap: 2rem;
  }

  .section h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .privacy {
    padding: var(--hero-pad-top) 1rem var(--section-pad-y);
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
