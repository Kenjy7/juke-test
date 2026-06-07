<template>
  <BackgroundWeb>
    <section class="saas-hero">
      <div class="container">
        <div class="eyebrow">SaaS Development</div>
        <h1>
          Custom SaaS-platformen<br />
          <span class="highlight">gebouwd om te schalen.</span>
        </h1>
        <p class="subtitle">
          Van concept tot live product. We bouwen dashboards, portalen en platformen
          op maat die meegroeien met jouw bedrijf.
        </p>
        <div class="hero-buttons">
          <router-link to="/offerte-aanvraag" class="btn btn-accent">
            <span>Bespreek je project</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <router-link to="/contact" class="btn btn-ghost">
            <span>Neem contact op</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <section class="saas-features">
      <div class="container">
        <h2>Wat we bouwen</h2>
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
        <h2>SaaS-projecten worden custom begroot.</h2>
        <p>Elk platform is anders. We maken een voorstel op maat na een vrijblijvend gesprek over jouw idee, doelgroep en technische eisen.</p>
        <router-link to="/offerte-aanvraag" class="btn btn-accent">
          <span>Start je SaaS-project</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'

const features = [
  {
    title: 'Custom dashboards & portalen',
    description: 'Gebruiksvriendelijke interfaces waar jouw klanten of team mee werken. Realtime data, rollen en rechten, en volledig op maat.'
  },
  {
    title: 'Gebruikersbeheer & authenticatie',
    description: 'Veilige login, multi-tenant architectuur, SSO-integraties en rolgebaseerde toegang. Gebouwd op bewezen standaarden.'
  },
  {
    title: 'Schaalbare architectuur',
    description: 'We bouwen met moderne stacks (Vue, Node, cloud) zodat je platform meegroeit van 10 naar 10.000 gebruikers.'
  },
  {
    title: 'API-first development',
    description: 'Elk platform krijgt een robuuste API zodat je kunt integreren met externe tools, mobiele apps en AI-services.'
  },
  {
    title: 'Van concept tot live product',
    description: 'We begeleiden je van het eerste idee door wireframes, development en testing tot een werkend product in productie.'
  },
  {
    title: 'Doorlopend onderhoud',
    description: 'Na livegang blijven we beschikbaar voor updates, nieuwe features en technisch onderhoud. Geen vendor lock-in.'
  }
]

useHead({
  title: 'SaaS Development op Maat | JukeCoding',
  meta: [
    {
      name: 'description',
      content: 'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product. Development studio in Hasselt, Belgie.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'SaaS Development op Maat | JukeCoding' },
    {
      property: 'og:description',
      content: 'Custom SaaS-platformen, dashboards en portalen op maat. Van concept tot schaalbaar product.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/saas-development' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { property: 'og:locale', content: 'nl_BE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SaaS Development op Maat | JukeCoding' },
    { name: 'twitter:description', content: 'Custom SaaS-platformen, dashboards en portalen op maat.' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/saas-development' }],
})
</script>

<style scoped lang="scss">
.saas-hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-24) var(--space-8);
}

.container {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
}

.eyebrow {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-8);
  letter-spacing: var(--tracking-wide);
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
}

h1 {
  font-size: var(--text-hero);
  font-weight: var(--weight-extrabold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-6) 0;
}

.highlight {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 auto var(--space-12);
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-body);
  font-weight: var(--weight-semibold);
  font-family: var(--font-sans);
  text-decoration: none;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;

  svg { transition: transform var(--transition-base); }
  &:hover svg { transform: translateX(4px); }
}

.btn-accent {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  box-shadow: var(--shadow-glow-accent);

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
  }
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border-hover);

  &:hover {
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
    transform: translateY(-2px);
  }
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

@media (max-width: 768px) {
  .saas-hero { min-height: 50vh; padding: var(--space-16) var(--space-6); }
  .hero-buttons {
    flex-direction: column;
    max-width: 350px;
    margin: 0 auto;
    .btn { width: 100%; justify-content: center; }
  }
  .features-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
  .saas-features, .saas-cta { padding: var(--space-12) var(--space-6); }
  .saas-cta .container { padding: var(--space-12) var(--space-6); }
}
</style>
