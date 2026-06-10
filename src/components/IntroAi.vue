<!-- IntroAi.vue -->
<template>
  <section class="intro-ai" :class="{ 'is-dark': dark }">
    <div class="container intro-content">
      <div class="eyebrow">
        <span class="eyebrow__dot"></span>
        {{ t('introAi.eyebrow') }}
      </div>

      <h1>
        {{ t('introAi.head.title') }}
        <span class="highlight">{{ t('introAi.head.titleHighlight') }}</span>
      </h1>

      <p class="description">
        {{ t('introAi.head.lead') }}
      </p>

      <div class="cta-group">
        <router-link to="/contact" class="btn btn--accent btn--lg">
          {{ t('introAi.cta.start') }}
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
        <router-link
          :to="{ path: '/ai-projecten', hash: '#faqlistai' }"
          class="btn btn--secondary btn--lg"
        >
          {{ t('introAi.cta.faq') }}
        </router-link>
      </div>

      <!-- AI workflow terminal -->
      <div class="terminal" aria-hidden="true">
        <div class="terminal__bar">
          <span class="td"></span><span class="td"></span><span class="td"></span>
          <span class="terminal__name">juke · e-mail-workflow</span>
        </div>
        <div class="terminal__body">
          <p class="line"><span class="prompt">$</span> juke run e-mailflow</p>
          <p class="line out">{{ t('introAi.terminal.line1') }}</p>
          <p class="line out">{{ t('introAi.terminal.line2') }}</p>
          <p class="line out">{{ t('introAi.terminal.line3') }}</p>
          <p class="line ok">{{ t('introAi.terminal.done') }}<span class="cursor"></span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({ dark: { type: Boolean, default: false } })
</script>

<style scoped lang="scss">
.intro-ai {
  position: relative;
  padding: calc(var(--space-32) + 2rem) 0 var(--space-20);
  text-align: center;
  overflow: hidden;
}

.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eyebrow {
  margin-bottom: var(--space-6);
  animation: fade-up 0.7s var(--ease-out-expo) both;
}

h1 {
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
  max-width: 18ch;
  animation: fade-up 0.7s var(--ease-out-expo) 0.08s both;
}
.highlight {
  color: var(--color-accent);
}

.description {
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 62ch;
  margin: 0 0 var(--space-8);
  animation: fade-up 0.7s var(--ease-out-expo) 0.16s both;
}

.cta-group {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  animation: fade-up 0.7s var(--ease-out-expo) 0.24s both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Terminal ── */
.terminal {
  width: 100%;
  max-width: 620px;
  margin: var(--space-20) auto 0;
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: #0b1813;
  box-shadow: var(--shadow-elevated);
  animation: fade-up 0.7s var(--ease-out-expo) 0.32s both;
}
.terminal__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: #11221b;
  border-bottom: 1px solid #233830;
}
.td {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2f5a47;
}
.terminal__name {
  margin-left: var(--space-3);
  font-family: var(--font-mono);
  font-size: 11px;
  color: #76847b;
}

.terminal__body {
  padding: var(--space-5);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.9;
}
.line {
  margin: 0;
  color: #a7b5ac;
  white-space: nowrap;
  overflow: hidden;
}
.prompt {
  color: #34c98e;
  margin-right: var(--space-2);
}
.out {
  color: #8aa89a;
}
.ok {
  color: #34c98e;
}

.cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  margin-left: 6px;
  vertical-align: -2px;
  background: #34c98e;
  animation: blink 1.1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .intro-ai {
    padding: var(--space-32) 0 var(--space-16);
  }
  .cta-group {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    .btn {
      width: 100%;
    }
  }
  .terminal {
    margin-top: var(--space-12);
  }
  .terminal__body {
    font-size: 0.72rem;
  }
  .line {
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
