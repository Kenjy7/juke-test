<template>
  <section class="integrations" ref="sectionRef">
    <div class="container reveal">
      <p class="integrations__label">
        <Plug :size="14" :stroke-width="2" />{{ t('label') }}
      </p>
      <ul class="integrations__list">
        <li v-for="name in tools" :key="name">{{ name }}</li>
      </ul>
      <p class="integrations__note">{{ t('note') }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plug } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      label: 'Werkt bovenop je bestaande stack',
      note: 'We koppelen AI aan de tools die je team al gebruikt. Geen migratie nodig.',
    },
    en: {
      label: 'Works on top of your existing stack',
      note: 'We connect AI to the tools your team already uses. No migration required.',
    },
  },
})

// Plain wordmarks, no logo assets. Edit this list to match the tools you integrate with.
const tools = [
  'HubSpot', 'Salesforce', 'Slack', 'Gmail', 'Outlook',
  'Notion', 'Zapier', 'Make', 'Exact', 'OpenAI',
]

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.2 })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.integrations { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; text-align: center; }

.integrations__label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: var(--text-xs); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide); text-transform: uppercase;
  color: var(--color-text-tertiary); margin: 0 0 var(--space-8);
  svg { color: var(--color-accent); }
}
.integrations__list {
  list-style: none; margin: 0 0 var(--space-6); padding: 0;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
  gap: var(--space-4) var(--space-8);
}
.integrations__list li {
  font-size: 1.0625rem; font-weight: var(--weight-semibold);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-tight);
  opacity: 0.75; transition: opacity var(--transition-base), color var(--transition-base);
}
.integrations__list li:hover { opacity: 1; color: var(--color-text-primary); }
.integrations__note {
  font-size: var(--text-small); color: var(--color-text-tertiary);
  margin: 0; max-width: 52ch; margin-inline: auto;
}

@media (max-width: 768px) {
  .integrations { padding: var(--section-pad-y) var(--space-5); }
  .integrations__list { gap: var(--space-3) var(--space-5); }
  .integrations__list li { font-size: 0.9375rem; }
}
</style>
