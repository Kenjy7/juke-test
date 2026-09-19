<template>
  <!-- Decorative product illustration: hidden from assistive tech, not tabbable.
       Niche: a local renovation company's website that turns visitors into
       quote requests. -->
  <div class="browserwrap" aria-hidden="true">
    <div class="browser">
      <div class="browser__bar">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="url"><Lock :size="10" :stroke-width="2.5" />dewals-renovaties.be</span>
      </div>

      <div class="site">
        <nav class="site__nav">
          <span class="site__logo">Dewals<span class="site__logo-dot">.</span></span>
          <span class="site__links">
            <span>{{ t('navServices') }}</span>
            <span>{{ t('navWork') }}</span>
            <span>{{ t('navContact') }}</span>
          </span>
          <span class="site__navcta">{{ t('navCta') }}</span>
        </nav>

        <div class="site__hero">
          <span class="site__tag"><MapPin :size="10" :stroke-width="2.5" />{{ t('tag') }}</span>
          <span class="site__title">{{ t('title') }}</span>
          <span class="site__sub">{{ t('sub') }}</span>
          <span class="site__btns">
            <span class="sbtn sbtn--primary">{{ t('ctaPrimary') }}</span>
            <span class="sbtn">{{ t('ctaSecondary') }}</span>
          </span>
        </div>

        <div class="site__tiles">
          <span class="tile" v-for="(tile, i) in tiles" :key="tile">
            <span class="tile__img" :class="`tile__img--${i + 1}`"></span>
            <span class="tile__lbl">{{ tile }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="toast">
      <span class="toast__icon"><Inbox :size="15" :stroke-width="2" /></span>
      <span class="toast__text">
        <span class="toast__title">{{ t('toastTitle') }}</span>
        <span class="toast__meta">{{ t('toastMeta') }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Lock, MapPin, Inbox } from 'lucide-vue-next'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    nl: {
      navServices: 'Diensten', navWork: 'Realisaties', navContact: 'Contact', navCta: 'Offerte',
      tag: 'Renovatie in Limburg',
      title: 'Renoveren zonder zorgen.',
      sub: 'Van keuken tot totaalrenovatie, met één vast aanspreekpunt.',
      ctaPrimary: 'Vraag een offerte aan', ctaSecondary: 'Bekijk realisaties',
      tile1: 'Keukens', tile2: 'Badkamers', tile3: 'Totaalrenovatie',
      toastTitle: 'Nieuwe offerteaanvraag', toastMeta: 'via contactformulier · zojuist',
    },
    en: {
      navServices: 'Services', navWork: 'Projects', navContact: 'Contact', navCta: 'Quote',
      tag: 'Renovation in Limburg',
      title: 'Renovating, without the stress.',
      sub: 'From kitchens to full renovations, with one fixed point of contact.',
      ctaPrimary: 'Request a quote', ctaSecondary: 'See our projects',
      tile1: 'Kitchens', tile2: 'Bathrooms', tile3: 'Full renovation',
      toastTitle: 'New quote request', toastMeta: 'via contact form · just now',
    },
  },
})

const tiles = computed(() => [t('tile1'), t('tile2'), t('tile3')])
</script>

<style scoped lang="scss">
.browserwrap { position: relative; display: flex; justify-content: center; padding: var(--space-4) 0 var(--space-10); }
.browserwrap::before {
  content: ''; position: absolute; z-index: 0; top: 50%; left: 50%;
  width: 420px; height: 340px; transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--color-primary-subtle), transparent 70%);
  filter: blur(28px);
}

/* ── Browser shell ── */
.browser {
  position: relative; z-index: 1; width: min(500px, 100%);
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: 18px; padding: 0 8px 8px;
  box-shadow: var(--shadow-ambient);
}
.browser__bar { display: flex; align-items: center; gap: var(--space-3); padding: 10px 6px; }
.dots { display: inline-flex; gap: 5px; flex-shrink: 0; }
.dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border-hover); }
.url {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-width: 0;
  font-size: 0.625rem; font-weight: var(--weight-medium); color: var(--color-text-tertiary);
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-full); padding: 4px 10px;
  white-space: nowrap; overflow: hidden;
}

/* ── The client's website ── */
.site {
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column;
}
.site__nav {
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border);
}
.site__logo { font-size: var(--text-small); font-weight: var(--weight-bold); color: var(--color-text-primary); letter-spacing: var(--tracking-tight); }
.site__logo-dot { color: var(--color-accent); }
.site__links { display: inline-flex; gap: var(--space-3); margin-left: auto; font-size: 0.625rem; font-weight: var(--weight-medium); color: var(--color-text-secondary); }
.site__navcta {
  font-size: 0.625rem; font-weight: var(--weight-semibold); color: var(--color-text-on-accent);
  background: var(--color-primary); border-radius: var(--radius-full); padding: 4px 10px;
}

.site__hero { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-2); padding: var(--space-6) var(--space-5) var(--space-5); }
.site__tag {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.5625rem; font-weight: var(--weight-semibold); letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--color-primary); background: var(--color-primary-subtle);
  border-radius: var(--radius-full); padding: 3px 8px;
}
.site__title {
  font-size: 1.45rem; font-weight: var(--weight-bold); line-height: 1.1;
  color: var(--color-text-primary); letter-spacing: var(--tracking-tight); margin-top: var(--space-1);
}
.site__sub { font-size: 0.6875rem; line-height: var(--leading-relaxed); color: var(--color-text-secondary); max-width: 34ch; }
.site__btns { display: flex; gap: var(--space-2); margin-top: var(--space-2); }
.sbtn {
  white-space: nowrap;
  font-size: 0.625rem; font-weight: var(--weight-semibold); color: var(--color-text-primary);
  border: 1px solid var(--color-border); border-radius: var(--radius-full); padding: 5px 11px;
}
.sbtn--primary { color: var(--color-text-on-accent); background: var(--color-accent); border-color: var(--color-accent); }

.site__tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); padding: 0 var(--space-5) var(--space-5); }
.tile { display: flex; flex-direction: column; gap: 6px; }
.tile__img {
  display: block; aspect-ratio: 4 / 3; border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.tile__img--1 { background: linear-gradient(135deg, var(--color-primary-border), var(--color-bg-sunken)); }
.tile__img--2 { background: linear-gradient(160deg, var(--color-bg-sunken), var(--color-primary-border)); }
.tile__img--3 { background: linear-gradient(120deg, var(--color-primary-border) 0%, var(--color-bg-sunken) 60%, var(--color-primary-border) 100%); }
.tile__lbl { font-size: 0.625rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); }

/* ── Floating lead notification ── */
.toast {
  position: absolute; z-index: 2; left: max(0px, calc(50% - 250px - 16px)); bottom: 0;
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--color-bg-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-elevated);
  animation: toast-in 0.7s var(--ease-out-expo) 0.9s both;
}
.toast__icon {
  width: 30px; height: 30px; border-radius: var(--radius-md); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-primary); background: var(--color-primary-subtle);
}
.toast__text { display: flex; flex-direction: column; gap: 1px; }
.toast__title { font-size: 0.75rem; font-weight: var(--weight-semibold); color: var(--color-text-primary); white-space: nowrap; }
.toast__meta { font-size: 0.625rem; color: var(--color-text-tertiary); white-space: nowrap; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(0.75rem); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}

@media (max-width: 480px) {
  .site__links { display: none; }
  .site__navcta { margin-left: auto; }
  .site__title { font-size: 1.2rem; }
  .sbtn { padding: 5px 9px; font-size: 0.5625rem; }
  .toast { left: var(--space-2); }
}
</style>
