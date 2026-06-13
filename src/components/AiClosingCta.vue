<template>
  <section class="ai-closing" ref="sectionRef">
    <div class="container">
      <div class="ai-closing__panel band--dark reveal">
        <h2>{{ t('title') }}</h2>
        <p>{{ t('body') }}</p>
        <div class="cta-group">
          <router-link
            :to="{ path: '/contact', query: { interesse: 'ai' } }"
            class="btn btn--accent btn--lg"
          >
            {{ t('primary') }}
            <svg class="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
          <router-link to="/contact" class="btn btn--secondary btn--lg">
            {{ t('secondary') }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      title: 'Klaar om je processen te automatiseren?',
      body: 'Vertel ons waar je team tijd verliest. In een vrijblijvend gesprek bekijken we samen waar AI bij jou direct het verschil maakt.',
      primary: 'Bespreek je AI-project',
      secondary: 'Neem contact op',
    },
    en: {
      title: 'Ready to automate your processes?',
      body: 'Tell us where your team loses time. In a no-obligation chat we map out where AI makes an immediate difference for you.',
      primary: 'Discuss your AI project',
      secondary: 'Get in touch',
    },
  },
})

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.ai-closing { padding: var(--section-pad-y) var(--space-8) var(--space-24); }
.container { max-width: var(--max-width-cta); margin: 0 auto; }
.ai-closing__panel {
  border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-12); text-align: center;
  display: flex; flex-direction: column; align-items: center;
}
.ai-closing__panel h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-5);
  max-width: 22ch; text-wrap: balance;
}
.ai-closing__panel p {
  font-size: var(--text-body-lg); color: var(--color-text-secondary);
  line-height: var(--leading-relaxed); margin: 0 0 var(--space-12); max-width: 52ch;
}
.cta-group { display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }

@media (max-width: 768px) {
  .ai-closing { padding: var(--section-pad-y) var(--space-5) var(--space-16); }
  .ai-closing__panel { padding: var(--space-12) var(--space-6); }
  .ai-closing__panel h2 { font-size: var(--text-h2); }
  .cta-group { flex-direction: column; width: 100%; max-width: 340px; }
  .cta-group .btn { width: 100%; }
}
</style>
