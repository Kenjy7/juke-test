<!-- IntroAi.vue -->
<template>
  <section class="intro-ai" :class="{ 'is-dark': dark }">
    <div class="container intro-content">
      <h1>
        {{ t('introAi.head.title') }}
        <span class="highlight">{{ t('introAi.head.titleHighlight') }}</span>
      </h1>

      <p class="description">
        {{ t('introAi.head.lead') }}
      </p>

      <div class="cta-group">
        <router-link
          :to="{ path: '/contact', query: { interesse: 'ai' } }"
          class="btn btn--accent btn--lg"
        >
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
        <a href="#faqlistai" class="btn btn--secondary btn--lg">
          {{ t('introAi.cta.faq') }}
        </a>
      </div>

      <!-- AI workflow terminal -->
      <div class="terminal" ref="termRef" aria-hidden="true">
        <div class="terminal__bar">
          <span class="td"></span><span class="td"></span><span class="td"></span>
          <span class="terminal__name">juke · klantvragen-flow</span>
        </div>
        <div class="terminal__body">
          <p class="line"><span class="prompt">$</span> <span class="cmd">{{ cmd }}</span><span v-if="typing" class="cursor"></span></p>
          <p class="line out" :class="{ 'is-shown': step >= 1 }">{{ t('introAi.terminal.line1') }}</p>
          <p class="line out" :class="{ 'is-shown': step >= 2 }">{{ t('introAi.terminal.line2') }}</p>
          <p class="line out" :class="{ 'is-shown': step >= 3 }">{{ t('introAi.terminal.line3') }}</p>
          <p class="line ok" :class="{ 'is-shown': step >= 4 }">{{ t('introAi.terminal.done') }}<span v-if="!typing" class="cursor"></span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({ dark: { type: Boolean, default: false } })

// Terminal typing: once the terminal scrolls into view, type the command, then
// print the output lines one by one. The terminal sits low in the hero, so this
// is gated on visibility — otherwise the sequence finishes before you reach it.
// Base / no-JS state is the empty terminal (decorative + aria-hidden); reduced
// motion jumps straight to the final frame.
const CMD = 'juke run klantvragen'
const cmd = ref('')
const step = ref(0)
const typing = ref(true)
const termRef = ref(null)

let timers = []
let observer = null
const after = (ms, fn) => timers.push(setTimeout(fn, ms))

const run = () => {
  let i = 1
  const typeChar = () => {
    cmd.value = CMD.slice(0, i)
    if (i < CMD.length) { i += 1; after(42, typeChar) }
    else {
      typing.value = false
      after(280, () => (step.value = 1))
      after(640, () => (step.value = 2))
      after(1000, () => (step.value = 3))
      after(1380, () => (step.value = 4))
    }
  }
  after(320, typeChar)
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (reduced) { cmd.value = CMD; typing.value = false; step.value = 4; return }

  observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { observer.disconnect(); run() }
  }, { threshold: 0.4 })
  observer.observe(termRef.value)
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  observer?.disconnect()
})
</script>

<style scoped lang="scss">
.intro-ai {
  position: relative;
  padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
  min-height: var(--hero-min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
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

/* Output lines hold their layout space from the start (opacity only), so the
   terminal never grows and nothing below it jumps as lines print in. */
.terminal__body .out,
.terminal__body .ok {
  opacity: 0;
  transform: translateY(2px);
}
.terminal__body .out.is-shown,
.terminal__body .ok.is-shown {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: no-preference) {
  .terminal__body .out,
  .terminal__body .ok {
    transition: opacity 0.25s var(--ease-smooth), transform 0.25s var(--ease-smooth);
  }
}

.cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  margin-left: 6px;
  vertical-align: -2px;
  background: #34c98e;
  animation: blink 1.4s var(--ease-smooth) infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
/* The caret is the "actively waiting" signal — keep it breathing even under the
   global reduced-motion reset (base.css forces animation-duration/iteration to
   near-zero on *). This carve-out is intentionally scoped to the caret only. */
@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation-duration: 1.4s !important;
    animation-iteration-count: infinite !important;
  }
}

@media (max-width: 768px) {
  .intro-ai {
    padding: var(--hero-pad-top) 0 var(--hero-pad-bottom);
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
</style>
