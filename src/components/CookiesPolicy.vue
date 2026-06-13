<template>
  <section class="cookies">
    <div class="cookies-container">
      <div class="header">
        <h1>{{ t('cookiesPolicy.header.title') }}</h1>
        <p class="subtitle">{{ t('cookiesPolicy.header.subtitle') }}</p>
        <p class="last-updated">{{ t('cookiesPolicy.header.lastUpdated') }}</p>
      </div>

      <div class="intro">
        <p>
          {{ t('cookiesPolicy.intro') }}
        </p>
      </div>

      <div class="content">
        <section class="section">
          <h2>{{ t('cookiesPolicy.whatAreCookies.title') }}</h2>
          <p>
            {{ t('cookiesPolicy.whatAreCookies.text') }}
          </p>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.whichCookies.title') }}</h2>

          <div class="cookie-type" v-for="(type, index) in cookieTypes" :key="index">
            <h3>{{ type.title }}</h3>
            <p>
              {{ type.text }}
            </p>
            <p class="examples">{{ type.examples }}</p>
          </div>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.manage.title') }}</h2>
          <p>
            {{ t('cookiesPolicy.manage.text') }}
          </p>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.thirdParties.title') }}</h2>
          <p>
            {{ t('cookiesPolicy.thirdParties.text') }}
          </p>

          <div class="third-parties">
            <div class="party" v-for="(party, index) in thirdParties" :key="index">
              <span class="party-name">{{ party.name }}</span>
              <span class="party-purpose">{{ party.purpose }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.retention.title') }}</h2>
          <p>{{ t('cookiesPolicy.retention.intro') }}</p>

          <div class="durations">
            <div class="duration-item" v-for="(duration, index) in durations" :key="index">
              <span class="duration-type">{{ duration.type }}</span>
              <span class="duration-time">{{ duration.time }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.rights.title') }}</h2>
          <p>{{ t('cookiesPolicy.rights.intro') }}</p>

          <ul class="rights-list">
            <li v-for="(right, index) in rights" :key="index">{{ right }}</li>
          </ul>
        </section>

        <section class="section">
          <h2>{{ t('cookiesPolicy.changes.title') }}</h2>
          <p>
            {{ t('cookiesPolicy.changes.text') }}
          </p>
        </section>

        <section class="section contact-section">
          <h2>{{ t('cookiesPolicy.contact.title') }}</h2>
          <p>{{ t('cookiesPolicy.contact.intro') }}</p>

          <div class="contact-info">
            <a href="mailto:contact@jukecoding.be" class="contact-link">
              <span class="contact-label">{{ t('cookiesPolicy.contact.emailLabel') }}</span>
              <span class="contact-value">contact@jukecoding.be</span>
            </a>
            <a href="tel:+32123456789" class="contact-link">
              <span class="contact-label">{{ t('cookiesPolicy.contact.phoneLabel') }}</span>
              <span class="contact-value">+32 96 42 89 50</span>
            </a>
          </div>
        </section>
      </div>

      <router-link to="/" class="back-link">
        {{ t('cookiesPolicy.backLink') }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const cookieTypes = computed(() => [
  {
    title: t('cookiesPolicy.whichCookies.necessary.title'),
    text: t('cookiesPolicy.whichCookies.necessary.text'),
    examples: t('cookiesPolicy.whichCookies.necessary.examples'),
  },
  {
    title: t('cookiesPolicy.whichCookies.functional.title'),
    text: t('cookiesPolicy.whichCookies.functional.text'),
    examples: t('cookiesPolicy.whichCookies.functional.examples'),
  },
  {
    title: t('cookiesPolicy.whichCookies.analytical.title'),
    text: t('cookiesPolicy.whichCookies.analytical.text'),
    examples: t('cookiesPolicy.whichCookies.analytical.examples'),
  },
  {
    title: t('cookiesPolicy.whichCookies.marketing.title'),
    text: t('cookiesPolicy.whichCookies.marketing.text'),
    examples: t('cookiesPolicy.whichCookies.marketing.examples'),
  },
])

const thirdParties = computed(() => [
  {
    name: 'Google Analytics',
    purpose: t('cookiesPolicy.thirdParties.googleAnalytics'),
  },
  {
    name: 'Google Fonts',
    purpose: t('cookiesPolicy.thirdParties.googleFonts'),
  },
  {
    name: 'Social Media Plugins',
    purpose: t('cookiesPolicy.thirdParties.socialMedia'),
  },
])

const durations = computed(() => [
  {
    type: t('cookiesPolicy.retention.session.type'),
    time: t('cookiesPolicy.retention.session.time'),
  },
  {
    type: t('cookiesPolicy.retention.permanent.type'),
    time: t('cookiesPolicy.retention.permanent.time'),
  },
  {
    type: t('cookiesPolicy.retention.analytical.type'),
    time: t('cookiesPolicy.retention.analytical.time'),
  },
])

const rights = computed(() => [
  t('cookiesPolicy.rights.withdraw'),
  t('cookiesPolicy.rights.delete'),
  t('cookiesPolicy.rights.object'),
  t('cookiesPolicy.rights.access'),
])
</script>

<style scoped lang="scss">
.cookies {
  min-height: 100vh;
  background: transparent;
  padding: var(--hero-pad-top) 1.5rem var(--section-pad-y);
}

.cookies-container {
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
  }
}

.cookie-type {
  margin-top: 2rem;
  padding-left: 1.5rem;
  border-left: 2px solid var(--color-primary-glow);

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  .examples {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
    font-style: italic;
  }
}

.third-parties {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.party {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;

  .party-name {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .party-purpose {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
  }
}

.durations {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.duration-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .duration-type {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .duration-time {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }
}

.rights-list {
  margin-top: 1rem;
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

.contact-section {
  margin-top: 2rem;
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
  transition: all 0.3s ease;

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
  margin-top: 4rem;
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
  .cookies {
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

  .cookie-type {
    padding-left: 1rem;

    h3 {
      font-size: 1.125rem;
    }
  }

  .party {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }

  .back-link {
    margin-top: 3rem;
  }
}

@media (max-width: 480px) {
  .cookies {
    padding: var(--hero-pad-top) 1rem var(--section-pad-y);
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
