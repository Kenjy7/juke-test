<template>
  <section class="ai-action" ref="sectionRef">
    <div class="container">
      <div class="content reveal">
        <span class="eyebrow"><span class="eyebrow__dot"></span>{{ t('eyebrow') }}</span>
        <h2>{{ t('title') }}</h2>
        <p class="lead">{{ t('lead') }}</p>
        <ul class="checks">
          <li v-for="c in checks" :key="c"><Check :size="16" :stroke-width="2.5" />{{ c }}</li>
        </ul>
      </div>

      <div class="visual reveal reveal-delay-1">
        <!-- Decorative product illustration: hidden from assistive tech, not tabbable.
             Same product shell as AiOverview — a different screen (the support inbox). -->
        <div class="mock" :class="{ 'is-live': live }" aria-hidden="true">
          <div class="mock__bar">
            <span class="tl"></span><span class="tl"></span><span class="tl"></span>
            <span class="mock__url code">{{ t('url') }}</span>
          </div>
          <div class="mock__chrome">
            <span class="mock__brand">{{ t('assistant') }}</span>
            <span class="mock__live"><span class="mock__dot"></span>{{ t('activeNow') }}</span>
            <span class="mock__avatar"><User :size="14" :stroke-width="2" /></span>
          </div>
          <div class="mock__body">
            <aside class="mock__side">
              <a v-for="n in nav" :key="n.label" class="navitem" :class="{ active: n.active }">
                <component :is="n.icon" :size="16" :stroke-width="2" /><span>{{ n.label }}</span>
              </a>
            </aside>
            <div class="mock__main">
              <div class="bubble">
                <span class="bubble__who">{{ t('customer') }}</span>
                <p>{{ t('qText') }}</p>
              </div>

              <div class="steps">
                <span class="steps__cap"><Sparkles :size="12" :stroke-width="2" />{{ t('working') }}</span>
                <ul>
                  <li v-for="(s, i) in steps" :key="i" :style="{ '--i': i }">
                    <Check :size="13" :stroke-width="3" />{{ s }}
                  </li>
                </ul>
              </div>

              <div class="draft">
                <div class="draft__head">
                  <span class="draft__tag"><Sparkles :size="12" :stroke-width="2" />{{ t('aiDraft') }}</span>
                </div>
                <p class="draft__text">{{ t('ansText') }}</p>
                <div class="draft__actions">
                  <button class="draft__approve" type="button" tabindex="-1"><Check :size="14" :stroke-width="3" />{{ t('approve') }}</button>
                  <button class="draft__edit" type="button" tabindex="-1">{{ t('edit') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Sparkles, User, LayoutDashboard, Headset, Workflow, ScrollText, Settings } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      eyebrow: 'AI in actie',
      title: 'AI doet het werk. Jij houdt de controle.',
      lead: 'Een klantvraag komt binnen, de AI zoekt het op, stelt een antwoord op in jouw stijl en wacht op jouw akkoord. Geen black box. Je ziet elke stap.',
      c1: 'Antwoordt in jouw tone-of-voice',
      c2: 'Jij keurt goed vóór er iets verstuurd wordt',
      c3: 'GDPR-proof, data blijft in de EU',
      url: 'jouwbedrijf.be/klantvragen',
      assistant: 'Klantvragen', activeNow: 'actief', customer: 'Klant',
      navOverview: 'Overzicht', navQuestions: 'Klantvragen', navFlows: 'Flows', navLogs: 'Logs', navSettings: 'Instellingen',
      qText: 'Wat is de levertijd van order #4821?',
      working: 'AI verwerkt',
      s1: 'Order #4821 opgezocht',
      s2: 'Levertijd gevonden: morgen vóór 17u',
      s3: 'Antwoord opgesteld in jouw tone-of-voice',
      aiDraft: 'AI-concept',
      ansText: 'Order #4821 is verzonden en wordt morgen vóór 17u geleverd. Je ontvangt zo de track & trace.',
      approve: 'Goedkeuren', edit: 'Bewerken',
    },
    en: {
      eyebrow: 'AI in action',
      title: 'AI does the work. You stay in control.',
      lead: 'A customer question comes in, the AI looks it up, drafts a reply in your style and waits for your approval. No black box. You see every step.',
      c1: 'Replies in your tone of voice',
      c2: 'You approve before anything is sent',
      c3: 'GDPR-proof, data stays in the EU',
      url: 'jouwbedrijf.be/customer-questions',
      assistant: 'Customer questions', activeNow: 'active', customer: 'Customer',
      navOverview: 'Overview', navQuestions: 'Customer questions', navFlows: 'Flows', navLogs: 'Logs', navSettings: 'Settings',
      qText: 'What’s the delivery time for order #4821?',
      working: 'AI working',
      s1: 'Looked up order #4821',
      s2: 'Found delivery time: tomorrow before 5 pm',
      s3: 'Drafted a reply in your tone of voice',
      aiDraft: 'AI draft',
      ansText: 'Order #4821 has shipped and will be delivered tomorrow before 5 pm. You’ll receive the tracking link shortly.',
      approve: 'Approve', edit: 'Edit',
    },
  },
})

const checks = computed(() => [t('c1'), t('c2'), t('c3')])
const steps = computed(() => [t('s1'), t('s2'), t('s3')])

const nav = computed(() => [
  { icon: LayoutDashboard, label: t('navOverview') },
  { icon: Headset, label: t('navQuestions'), active: true },
  { icon: Workflow, label: t('navFlows') },
  { icon: ScrollText, label: t('navLogs') },
  { icon: Settings, label: t('navSettings') },
])

const live = ref(false)
const sectionRef = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        if (e.target.classList.contains('visual')) live.value = true
      }
    })
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })
  sectionRef.value?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped lang="scss">
.ai-action { padding: var(--section-pad-y) var(--space-8); }
.container {
  max-width: var(--max-width); margin: 0 auto;
  display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--space-16); align-items: center;
}
.code { font-family: var(--font-mono); }

.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--color-text-secondary); letter-spacing: var(--tracking-wide);
  text-transform: uppercase; margin-bottom: var(--space-5);
}
.eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
.content h2 {
  font-family: var(--font-display); font-size: var(--text-h1); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-5); text-wrap: balance;
}
.lead { font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); margin: 0 0 var(--space-8); max-width: 46ch; }
.checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.checks li { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-body); color: var(--color-text-primary); svg { flex-shrink: 0; color: var(--color-primary); } }

/* ── Product shell (matches AiOverview) ── */
.mock { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated); overflow: hidden; }
.mock__bar { display: flex; align-items: center; gap: 7px; padding: 0.6rem 0.9rem; background: var(--color-bg-sunken); border-bottom: 1px solid var(--color-border); }
.tl { width: 9px; height: 9px; border-radius: 50%; background: var(--color-border-hover); }
.mock__url { margin-left: 10px; flex: 1; max-width: 300px; font-size: 0.625rem; color: var(--color-text-tertiary); background: var(--color-bg-surface); border-radius: var(--radius-full); padding: 3px 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mock__chrome { display: flex; align-items: center; gap: var(--space-3); padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--color-border); }
.mock__brand { font-weight: var(--weight-semibold); font-size: 0.875rem; color: var(--color-text-primary); margin-right: auto; }
.mock__live { display: inline-flex; align-items: center; gap: 6px; font-size: 0.625rem; font-weight: var(--weight-semibold); letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-primary); }
.mock__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-primary); }
.mock__avatar { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--color-bg-sunken); color: var(--color-text-secondary); }

.mock__body { display: flex; min-height: 320px; }
.mock__side { flex-shrink: 0; width: 150px; padding: var(--space-4) var(--space-3); display: flex; flex-direction: column; gap: 2px; border-right: 1px solid var(--color-border); }
.navitem { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary); padding: 0.45rem 0.6rem; border-radius: var(--radius-md); svg { flex-shrink: 0; opacity: 0.8; } }
.navitem.active { background: var(--color-bg-sunken); color: var(--color-text-primary); svg { opacity: 1; color: var(--color-primary); } }
.mock__main { flex: 1; padding: var(--space-5) var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); min-width: 0; }

/* ── Support thread ── */
.bubble { align-self: flex-start; max-width: 82%; background: var(--color-bg-sunken); border-radius: 4px 14px 14px 14px; padding: var(--space-3) var(--space-4); }
.bubble__who { display: block; font-size: 0.5625rem; font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-tertiary); margin-bottom: 3px; }
.bubble p { margin: 0; font-size: 0.8125rem; color: var(--color-text-primary); }

.steps { display: flex; flex-direction: column; gap: var(--space-3); }
.steps__cap { display: inline-flex; align-items: center; gap: 6px; font-size: 0.625rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); svg { color: var(--color-primary); } }
.steps ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.steps li { display: flex; align-items: center; gap: 9px; font-size: 0.8125rem; color: var(--color-text-secondary); svg { flex-shrink: 0; color: var(--color-primary); } }

.draft { background: var(--color-bg-elevated); border: 1px solid var(--color-primary-border); border-radius: var(--radius-md); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.draft__head { display: flex; align-items: center; justify-content: space-between; }
.draft__tag { display: inline-flex; align-items: center; gap: 5px; font-size: 0.625rem; font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); svg { color: var(--color-primary); } }
.draft__text { margin: 0; font-size: 0.8125rem; color: var(--color-text-primary); line-height: var(--leading-normal); }
.draft__actions { display: flex; align-items: center; gap: var(--space-2); }
.draft__approve { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: var(--text-small); font-weight: var(--weight-medium); color: var(--color-text-on-accent); background: var(--color-primary); border: none; border-radius: var(--radius-md); padding: 0.5rem 0.9rem; cursor: pointer; }
.draft__edit { font-family: var(--font-sans); font-size: var(--text-small); color: var(--color-text-secondary); background: var(--color-bg-sunken); border: none; border-radius: var(--radius-md); padding: 0.5rem 0.9rem; cursor: pointer; }

/* ── Motion (reduced-motion safe; base = final frame) ── */
@media (prefers-reduced-motion: no-preference) {
  .mock__dot { animation: ai-pulse 2.4s var(--ease-smooth) infinite; }
  .steps li { opacity: 0; transform: translateY(4px); transition: opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo); transition-delay: calc(var(--i) * 0.22s + 0.2s); }
  .mock.is-live .steps li { opacity: 1; transform: none; }
}
@keyframes ai-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: var(--space-10); }
  .content { max-width: 560px; }
  .lead { max-width: none; }
}
@media (max-width: 768px) {
  .ai-action { padding: var(--section-pad-y) var(--space-5); }
}
@media (max-width: 560px) {
  .mock__side { width: 48px; }
  .navitem span { display: none; }
  .navitem { justify-content: center; padding: 0.45rem; }
  .mock__main { padding: var(--space-4); }
}
</style>
