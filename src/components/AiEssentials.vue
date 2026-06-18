<template>
  <section class="essentials" ref="sectionRef">
    <div class="container">
      <header class="essentials__head reveal">
        <h2>{{ t('title') }}</h2>
        <p class="essentials__lead">{{ t('lead') }}</p>
      </header>

      <ul class="grid">
        <li
          v-for="(card, i) in cards"
          :key="i"
          class="card reveal"
          :style="{ transitionDelay: `${i * 0.06}s` }"
        >
          <span class="card__icon" aria-hidden="true">
            <component :is="card.icon" :size="20" :stroke-width="1.75" />
          </span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Workflow, Plug, Sprout, UserCheck, Scale } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'Eerlijk over AI',
      title: 'Wat je moet weten over AI',
      lead: 'Nieuw met AI? Dit zijn de dingen die de meeste bedrijven nog niet weten, en die het verschil maken tussen hype en echt resultaat.',
      c1t: 'Je data blijft van jou',
      c1d: 'Je bedrijfsgegevens blijven binnen de EU, zijn GDPR-conform en worden nooit gebruikt om externe AI-modellen te trainen. Wat we bouwen, is van jou.',
      c2t: 'Geen chatbot, maar automatisering',
      c2d: 'Dit is geen venster waar je vragen in typt. De AI draait automatisch mee in je processen, verbonden met je systemen, ook wanneer jij niets doet.',
      c3t: 'Werkt met je bestaande tools',
      c3d: 'Geen migratie of alles opnieuw. We bouwen bovenop de software die je al gebruikt: je CRM, mailbox, boekhouding of webshop.',
      c4t: 'We beginnen klein',
      c4d: 'Geen groot, duur project in één keer. We starten met één afgebakende taak die snel resultaat oplevert en bouwen van daaruit verder.',
      c5t: 'AI kan fouten maken, jij beslist',
      c5d: 'AI is niet onfeilbaar. Daarom keur jij belangrijke acties goed vóór er iets naar een klant gaat. Jij houdt altijd de controle.',
      c6t: 'Eerlijk over wat AI kan',
      c6d: 'AI is geen toverstaf. We automatiseren alleen wat echt zinvol is en zeggen het eerlijk wanneer iets beter door een mens gebeurt.',
    },
    en: {
      eyebrow: 'Honest about AI',
      title: 'What you should know about AI',
      lead: 'New to AI? These are the things most businesses don\'t know yet, and they\'re what separates hype from real results.',
      c1t: 'Your data stays yours',
      c1d: 'Your business data stays within the EU, is GDPR-compliant and is never used to train external AI models. What we build belongs to you.',
      c2t: 'Not a chatbot, but automation',
      c2d: 'This isn\'t a box you type questions into. The AI runs automatically inside your processes, connected to your systems, even when you do nothing.',
      c3t: 'Works with your existing tools',
      c3d: 'No migration, no starting over. We build on top of the software you already use: your CRM, inbox, accounting or webshop.',
      c4t: 'We start small',
      c4d: 'No big, expensive project all at once. We start with one focused task that delivers quick results and build out from there.',
      c5t: 'AI can be wrong, you decide',
      c5d: 'AI isn\'t infallible. That\'s why you approve important actions before anything reaches a customer. You stay in control at all times.',
      c6t: 'Honest about what AI can do',
      c6d: 'AI is no magic wand. We only automate what genuinely makes sense, and we tell you honestly when something is better handled by a person.',
    },
  },
})

const cards = computed(() => [
  { icon: ShieldCheck, title: t('c1t'), body: t('c1d') },
  { icon: Workflow, title: t('c2t'), body: t('c2d') },
  { icon: Plug, title: t('c3t'), body: t('c3d') },
  { icon: Sprout, title: t('c4t'), body: t('c4d') },
  { icon: UserCheck, title: t('c5t'), body: t('c5d') },
  { icon: Scale, title: t('c6t'), body: t('c6d') },
])

const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.essentials { padding: var(--section-pad-y) var(--space-8); }
.container { max-width: var(--max-width); margin: 0 auto; }

.essentials__head { max-width: 680px; margin: 0 auto var(--space-12); text-align: center; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: var(--space-4);
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.essentials__head h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary); margin: 0; text-wrap: balance;
}
.essentials__lead {
  margin: var(--space-5) auto 0; font-size: var(--text-body-lg); line-height: var(--leading-relaxed);
  color: var(--color-text-secondary); max-width: 58ch;
}

.grid {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);
}
.card {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-6);
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover { border-color: var(--color-border-hover); transform: translateY(-3px); box-shadow: var(--shadow-elevated); }
.card__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: var(--radius-md); margin-bottom: var(--space-4);
  color: var(--color-primary); background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
}
.card h3 {
  font-family: var(--font-display); font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin: 0 0 var(--space-2);
}
.card p { font-size: var(--text-body); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin: 0; }

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo);
  &.visible { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .essentials { padding: var(--section-pad-y) var(--space-5); }
  .grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
</style>
