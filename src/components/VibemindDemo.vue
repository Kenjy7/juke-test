<template>
  <!-- Interactive, fake-but-living preview of Vibemind. No real backend: spawning,
       skill-injection, project switching and tasks are all simulated client-side. -->
  <div class="vmdemo" aria-hidden="true">
    <!-- Top bar -->
    <div class="vmdemo__top">
      <span class="vmdemo__brand">Vibemind</span>
      <span class="vmdemo__crumb">
        {{ activeProject.name }} <span class="vmdemo__sep">&rsaquo;</span>
        <span class="vmdemo__path">~/Projects/{{ activeProject.name }}</span>
      </span>
      <span class="vmdemo__actions">
        <span class="vmdemo__ready"
          ><span class="vmdemo__readydot"></span>{{ activeProject.terminals.length }} ready</span
        >
        <button class="vmdemo__btn" type="button">Files</button>
        <button
          class="vmdemo__btn"
          :class="{ 'vmdemo__btn--on': tasksOpen }"
          type="button"
          @click="tasksOpen = !tasksOpen"
        >
          Tasks <span class="vmdemo__btncount">{{ taskCount }}</span>
        </button>
        <button
          class="vmdemo__btn vmdemo__btn--cta"
          type="button"
          :disabled="activeProject.terminals.length >= MAX_TERMS"
          @click="spawn"
        >
          + Spawn
        </button>
      </span>
    </div>

    <div class="vmdemo__body">
      <!-- Workspaces rail -->
      <aside class="vmdemo__side">
        <div class="vmdemo__sidehead">Workspaces<span class="vmdemo__plus">+</span></div>
        <button
          v-for="p in projects"
          :key="p.id"
          type="button"
          class="wsrow"
          :class="{ 'wsrow--active': p.id === activeId }"
          @click="activeId = p.id"
        >
          <span class="wsrow__dot" :style="{ background: p.dot }"></span>{{ p.name }}
          <span v-if="p.terminals.length" class="wsrow__n">{{ p.terminals.length }}</span>
        </button>
      </aside>

      <!-- Terminal panes (1–4) -->
      <div
        class="vmdemo__main"
        :style="{ gridTemplateColumns: activeProject.terminals.length <= 1 ? '1fr' : '1fr 1fr' }"
      >
        <template v-if="activeProject.terminals.length">
          <div
            v-for="term in activeProject.terminals"
            :key="term.id"
            class="term"
            :class="{ 'term--drop': dragOverId === term.id }"
            @dragover.prevent="dragOverId = term.id"
            @dragleave="onDragLeave(term.id)"
            @drop.prevent="onDrop(term)"
          >
            <div class="term__head">
              <span class="term__dot" :class="term.status === 'live' ? 'term__dot--run' : 'term__dot--ok'"></span>Claude
              <span class="term__sub">claude</span>
              <span class="term__badge" :class="`term__badge--${term.status}`">{{
                term.status === 'live' ? 'LIVE' : 'READY'
              }}</span>
              <button class="term__x" type="button" @click="closeTerm(term.id)">&times;</button>
            </div>
            <div class="term__screen">
              <div class="term__splash">
                <p class="t-strong">Claude Code</p>
                <p class="t-dim">Opus 4.8 (1M context) · Claude Max</p>
                <p class="t-dim">~/Projects/{{ activeProject.name }}</p>
              </div>
              <p class="term__prompt">
                <span class="t-acc">&rsaquo;</span> <span class="term__cmd">{{ term.prompt }}</span
                ><span v-if="!term.lines.length && term.status !== 'live'" class="t-cur"></span>
              </p>
              <p
                v-for="(line, i) in term.lines"
                :key="i"
                :class="line.startsWith('✓') ? 't-ok' : 't-bul'"
              >
                {{ line }}
              </p>
              <p v-if="term.lines.length || term.status === 'live'" class="term__prompt">
                <span class="t-acc">&rsaquo;</span> <span class="t-cur"></span>
              </p>
            </div>
          </div>
        </template>
        <div v-else class="vmdemo__empty">
          <p>Geen terminals open</p>
          <button class="vmdemo__emptybtn" type="button" @click="spawn">+ Spawn een terminal</button>
        </div>
      </div>

      <!-- Skills rail -->
      <aside class="vmdemo__skills">
        <div class="vmdemo__sidehead">Skills<span class="vmdemo__count">60</span></div>
        <input
          v-model="query"
          class="skillsearch"
          type="text"
          placeholder="Search skills"
          aria-label="Search skills"
        />
        <p class="skillhint">Sleep een skill op een terminal om de prompt te injecteren.</p>
        <div class="skilllist">
          <div class="skillcat">Frontend</div>
          <div
            v-for="skill in filteredSkills"
            :key="skill.name"
            class="skillcard"
            draggable="true"
            @dragstart="dragSkill = skill"
            @dragend="dragSkill = null"
          >
            <div class="skillcard__top">
              <span class="skillcard__name">{{ skill.name }}</span
              ><span class="skillcard__tag">{{ skill.tag }}</span>
            </div>
            <span class="skillcard__desc">{{ skill.desc }}</span>
          </div>
          <p v-if="!filteredSkills.length" class="skillempty">Geen skills gevonden</p>
        </div>
      </aside>
    </div>

    <!-- Tasks board (toggled) -->
    <transition name="tasks">
      <div v-if="tasksOpen" class="vmdemo__tasks">
        <div class="tasks__bar">
          <span class="tasks__title">Tasks</span>
          <button class="tasks__new" type="button">+ New task</button>
          <span class="tasks__spacer"></span>
          <button class="tasks__close" type="button" @click="tasksOpen = false">&times;</button>
        </div>
        <div class="tasks__cols">
          <div v-for="col in columns" :key="col.key" class="tcol">
            <div class="tcol__head">{{ col.label }}<span class="tcol__n">{{ col.cards.length }}</span></div>
            <div v-for="(card, i) in col.cards" :key="i" class="tcard">
              <p class="tcard__title">{{ card.title }}</p>
              <p class="tcard__desc">{{ card.desc }}</p>
              <span v-if="card.who" class="tcard__who">
                <span class="tcard__av" :style="{ background: card.who.color }">{{ card.who.initials }}</span>
                {{ card.who.name }}
              </span>
            </div>
            <div v-if="!col.cards.length" class="tcol__empty">Sleep een taak hierheen</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'

const MAX_TERMS = 2

let uid = 0
const newId = () => ++uid
const term = (prompt) => reactive({ id: newId(), status: 'ready', prompt, lines: [] })

// Projects each keep their own set of terminals (max 4 per project).
const projects = reactive([
  { id: 'webshop', name: 'Webshop', dot: '#34d399', terminals: [term('Try "fix lint errors"')] },
  {
    id: 'saas',
    name: 'saas',
    dot: '#60a5fa',
    terminals: [term('Try "fix typecheck errors"'), term('Try "refactor App.vue"')],
  },
  { id: 'marketing', name: 'Marketing', dot: '#a78bfa', terminals: [] },
  { id: 'api', name: 'api', dot: '#f59e0b', terminals: [term('Try "add a health check"')] },
])
const activeId = ref('saas')
const activeProject = computed(() => projects.find((p) => p.id === activeId.value))

const SUGGESTIONS = [
  'Try "explain this codebase"',
  'Try "add tests"',
  'Try "find and fix a bug"',
  'Try "write a migration"',
]
let spawnCount = 0
const spawn = () => {
  const p = activeProject.value
  if (p.terminals.length >= MAX_TERMS) return
  p.terminals.push(term(SUGGESTIONS[spawnCount++ % SUGGESTIONS.length]))
}
const closeTerm = (id) => {
  const list = activeProject.value.terminals
  const i = list.findIndex((t) => t.id === id)
  if (i !== -1) list.splice(i, 1)
}

// ── Skills ──────────────────────────────────────────────────────────────────
const skills = [
  // Each skill streams its own distinct processing steps over `time` seconds,
  // then a ✓ result line (the elapsed time is appended to it on completion).
  { name: 'VibeA11y', tag: 'A11Y', desc: 'WCAG 2.2 AA · ARIA · focus', prompt: 'doe een toegankelijkheidsaudit (WCAG 2.2 AA)', time: 2.6, output: ['● Scan DOM-structuur', '● Check ARIA & rollen', '● Test focus-volgorde', '● Meet kleurcontrast', '✓ 4 issues · 2 quick fixes'] },
  { name: 'VibeTekst', tag: 'COPY', desc: 'UI-microcopy · knoppen · lege staten', prompt: 'review de microcopy in deze view', time: 1.9, output: ['● Lees knoppen & labels', '● Check lege & error-staten', '● Toon-consistentie', '✓ 7 microcopy-suggesties'] },
  { name: 'VibeCorporate', tag: 'CORP', desc: 'Corporate design system · calm authority', prompt: 'pas het corporate design system toe', time: 3.1, output: ['● Laad design system', '● Map componenten', '● Pas tokens toe', '● Check calm-authority', '✓ 12 tokens toegepast'] },
  { name: 'VibeDarkTech', tag: 'DARK', desc: 'Dark-tech UI · terminal-style', prompt: 'geef dit een dark-tech look', time: 2.2, output: ['● Genereer dark palette', '● Map contrast-ratio', '● Tune accenten', '✓ thema + 9 tokens klaar'] },
  { name: 'VibeData', tag: 'DATA', desc: 'Data-fetching · server state · caching', prompt: 'review de data-fetching en caching', time: 2.6, output: ['● Analyseer fetch-laag', '● Check server state', '● Inspecteer caching', '● Zoek race-conditions', '✓ 3 race-conditions gevonden'] },
  { name: 'VibeOntwerp', tag: 'DESIGN', desc: 'Visuele polish · spacing · hiërarchie', prompt: 'doe een visuele polish-pass', time: 2.4, output: ['● Meet spacing-ritme', '● Check hiërarchie', '● Scan typografie', '✓ 6 polish-fixes voorgesteld'] },
  { name: 'VibeFormulieren', tag: 'FORMS', desc: 'Validatie · autocomplete · mobiel', prompt: 'review dit formulier', time: 2.0, output: ['● Inspecteer validatie-timing', '● Check autocomplete', '● Test mobiel toetsenbord', '✓ 5 form-issues'] },
  { name: 'VibeMobiel', tag: 'MOBILE', desc: 'Touch · tap targets · safe areas', prompt: 'doe een mobiele review', time: 1.8, output: ['● Test tap targets', '● Check safe areas', '● Sim traag netwerk', '✓ 3 te kleine targets'] },
  { name: 'VibeModern', tag: 'MODERN', desc: 'Modern-minimalist · off-white', prompt: 'geef dit een modern-minimalist look', time: 2.3, output: ['● Pas off-white canvas toe', '● Tune spacing & radius', '● Map tokens', '✓ modern-minimalist + 8 tokens'] },
  { name: 'VibeAnimatie', tag: 'MOTION', desc: 'Motion · easing · reduced-motion', prompt: 'review de animaties', time: 2.5, output: ['● Check easing-curves', '● Meet duur', '● prefers-reduced-motion', '● GPU-vriendelijk?', '✓ 4 transitions getuned'] },
  { name: 'VibeResponsive', tag: 'RESP', desc: '320px tot ultrawide · overflow', prompt: 'doe een responsive audit', time: 2.8, output: ['● Audit 320px → ultrawide', '● Overflow-jacht', '● Check min-content traps', '✓ 2 100vw-bugs gevonden'] },
  { name: 'VibeStijl', tag: 'STYLE', desc: 'Design-richting uit je brand-vibe', prompt: 'genereer een design-richting', time: 2.1, output: ['● Lees brand-vibe', '● Genereer richtingen', '● Match tokens', '✓ 3 design-richtingen'] },
  { name: 'VibeTokens', tag: 'TOKENS', desc: 'Design-tokens · theming · W3C', prompt: 'review de design-tokens', time: 2.4, output: ['● Valideer W3C-format', '● Check 3-tier naming', '● Resolve aliassen', '✓ 18 tokens · 0 conflicten'] },
  { name: 'VibeUX', tag: 'UX', desc: 'Flows · copy · microinteracties', prompt: 'doe een UX-review', time: 2.7, output: ['● Map user-flow', '● Check microinteracties', '● Scan friction-punten', '● Prioriteer', '✓ 5 UX-verbeteringen'] },
]
const query = ref('')
const filteredSkills = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return skills
  return skills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q),
  )
})

// ── Drag a skill onto a pane → inject the prompt and fake some work ───────────
const dragSkill = ref(null)
const dragOverId = ref(null)
const timers = []
const onDragLeave = (id) => {
  if (dragOverId.value === id) dragOverId.value = null
}
const onDrop = (t) => {
  dragOverId.value = null
  const skill = dragSkill.value
  if (!skill) return
  t.prompt = skill.prompt
  t.status = 'live'
  t.lines = []
  // Stream the processing steps over the skill's own duration, then stamp the
  // elapsed time onto the final ✓ result line.
  const out = skill.output
  const total = skill.time * 1000
  const step = total / out.length
  const timeStr = String(skill.time).replace('.', ',') + 's'
  out.forEach((line, i) => {
    timers.push(
      setTimeout(
        () => {
          const shown = out.slice(0, i + 1)
          if (i === out.length - 1) {
            shown[i] = `${line}  ·  ${timeStr}`
            t.status = 'ready'
          }
          t.lines = shown
        },
        Math.round(step * (i + 1)),
      ),
    )
  })
}

// ── Tasks board ──────────────────────────────────────────────────────────────
const tasksOpen = ref(false)
const junior = { initials: 'JU', name: 'junior', color: '#3b82f6' }
const kenjy = { initials: 'KE', name: 'kenjy', color: '#10b981' }
const columns = [
  {
    key: 'todo',
    label: 'Todo',
    cards: [
      { title: 'Improve Local SEO for Belgium', desc: 'Zorg dat het bedrijf opduikt bij lokale zoekopdrachten.' },
      { title: 'Tighten responsive & spacing', desc: 'Audit hoe het dashboard schaalt op kleinere schermen.' },
    ],
  },
  {
    key: 'doing',
    label: 'Doing',
    cards: [
      { title: 'Add empty, loading & error states', desc: 'Dek de momenten af zonder data of bij fouten.', who: junior },
    ],
  },
  {
    key: 'review',
    label: 'Review',
    cards: [
      { title: 'Establish a clear visual hierarchy', desc: 'Maak de belangrijkste metric meteen duidelijk.', who: kenjy },
    ],
  },
  {
    key: 'done',
    label: 'Done',
    cards: [
      { title: 'Write onboarding copy', desc: 'Korte, heldere teksten voor de eerste run.' },
    ],
  },
]
const taskCount = columns.reduce((n, c) => n + c.cards.length, 0)

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<style scoped lang="scss">
/* Self-contained dark app-window palette (matches the real Vibemind UI). */
.vmdemo {
  --vm-bg: #090d13;
  --vm-panel: #0c1118;
  --vm-screen: #06080c;
  --vm-line: #1f2733;
  --vm-text: #e6edf3;
  --vm-dim: #8b95a5;
  --vm-muted: #5a6478;
  --vm-accent: #34d399;
  --vm-warn: #f59e0b;
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--vm-bg);
  box-shadow: var(--shadow-elevated);
  font-family: var(--font-mono);
  color: var(--vm-text);
}

/* Top bar */
.vmdemo__top {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--vm-panel);
  border-bottom: 1px solid var(--vm-line);
}
.vmdemo__brand {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: 13px;
  color: var(--vm-text);
  flex-shrink: 0;
}
.vmdemo__crumb {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  color: var(--vm-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vmdemo__sep {
  color: var(--vm-muted);
  margin: 0 4px;
}
.vmdemo__path {
  color: var(--vm-muted);
}
.vmdemo__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}
.vmdemo__btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--vm-dim);
  padding: 4px 9px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--vm-line);
  background: transparent;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}
.vmdemo__btn:hover {
  color: var(--vm-text);
  border-color: var(--vm-muted);
}
.vmdemo__btn--on {
  color: var(--vm-text);
  border-color: var(--vm-accent);
  background: rgba(52, 211, 153, 0.1);
}
.vmdemo__btncount {
  font-size: 9px;
  background: rgba(255, 255, 255, 0.08);
  padding: 1px 5px;
  border-radius: var(--radius-full);
}
.vmdemo__btn--cta {
  color: var(--vm-warn);
  border-color: rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.1);
  font-weight: var(--weight-semibold);
}
.vmdemo__btn--cta:hover:not(:disabled) {
  background: rgba(245, 158, 11, 0.18);
  color: var(--vm-warn);
  border-color: rgba(245, 158, 11, 0.5);
}
.vmdemo__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.vmdemo__ready {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: var(--weight-semibold);
  color: var(--vm-warn);
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.28);
  padding: 4px 9px;
  border-radius: var(--radius-full);
}
.vmdemo__readydot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vm-warn);
  box-shadow: 0 0 6px var(--vm-warn);
}

/* Body grid */
.vmdemo__body {
  display: grid;
  grid-template-columns: 150px 1fr 210px;
  min-height: 420px;
  background: var(--vm-screen);
}
.vmdemo__side,
.vmdemo__skills {
  background: var(--vm-panel);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.vmdemo__side {
  border-right: 1px solid var(--vm-line);
}
.vmdemo__skills {
  border-left: 1px solid var(--vm-line);
}
.vmdemo__sidehead {
  display: flex;
  align-items: center;
  font-size: 10px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
  padding-left: 4px;
}
.vmdemo__plus,
.vmdemo__count {
  margin-left: auto;
}
.vmdemo__count {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}
.wsrow {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-family: var(--font-sans);
  color: var(--vm-dim);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background 0.15s, color 0.15s;
}
.wsrow:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--vm-text);
}
.wsrow--active {
  background: rgba(96, 165, 250, 0.14);
  color: var(--vm-text);
}
.wsrow__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.wsrow__n {
  margin-left: auto;
  font-size: 10px;
  color: var(--vm-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}

/* Panes */
.vmdemo__main {
  display: grid;
  grid-auto-rows: 1fr;
  gap: 1px;
  background: var(--vm-line);
  min-width: 0;
}
.term {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--vm-screen);
  transition: box-shadow 0.15s;
}
.term--drop {
  box-shadow: inset 0 0 0 2px var(--vm-accent);
}
.term__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 7px var(--space-3);
  font-size: 11px;
  font-family: var(--font-sans);
  color: var(--vm-dim);
  border-bottom: 1px solid var(--vm-line);
  background: var(--vm-panel);
}
.term__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--vm-muted);
}
.term__dot--run {
  background: var(--vm-warn);
  box-shadow: 0 0 6px var(--vm-warn);
  animation: vmd-pulse 1.6s ease-in-out infinite;
}
.term__dot--ok {
  background: var(--vm-accent);
  box-shadow: 0 0 6px var(--vm-accent);
}
@keyframes vmd-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
.term__sub {
  color: var(--vm-muted);
}
.term__badge {
  margin-left: auto;
  font-size: 8.5px;
  font-weight: var(--weight-semibold);
  letter-spacing: 0.05em;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}
.term__badge--ready {
  color: var(--vm-accent);
  background: rgba(52, 211, 153, 0.14);
}
.term__badge--live {
  color: var(--vm-warn);
  background: rgba(245, 158, 11, 0.16);
}
.term__x {
  color: var(--vm-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0 2px;
}
.term__x:hover {
  color: var(--vm-text);
}
.term__screen {
  flex: 1;
  padding: var(--space-4);
  font-size: 11px;
  line-height: 1.7;
  overflow: hidden;
}
.term__splash {
  border: 1px dashed rgba(245, 158, 11, 0.4);
  border-radius: var(--radius-sm);
  padding: var(--space-4);
  text-align: center;
  margin-bottom: var(--space-4);
}
.term__screen p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.term__prompt {
  display: flex;
  align-items: center;
  gap: 6px;
}
.term__cmd {
  color: var(--vm-dim);
}
.t-strong {
  color: var(--vm-text);
  font-weight: var(--weight-semibold);
}
.t-dim {
  color: var(--vm-muted);
}
.t-acc {
  color: var(--vm-accent);
  flex-shrink: 0;
}
.t-bul {
  color: var(--vm-dim);
}
.t-ok {
  color: var(--vm-accent);
}
.t-cur {
  display: inline-block;
  width: 7px;
  height: 12px;
  flex-shrink: 0;
  background: var(--vm-accent);
  animation: vmd-blink 1.4s var(--ease-smooth) infinite;
}
@keyframes vmd-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .t-cur {
    animation-duration: 1.4s !important;
    animation-iteration-count: infinite !important;
  }
}
.vmdemo__empty {
  grid-column: 1 / -1;
  background: var(--vm-screen);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-size: 13px;
}
.vmdemo__emptybtn {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--vm-warn);
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: var(--radius-sm);
  padding: 6px 12px;
  cursor: pointer;
}

/* Skills rail */
.skillsearch {
  font-size: 11px;
  color: var(--vm-text);
  background: var(--vm-bg);
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-family: var(--font-sans);
  outline: none;
}
.skillsearch::placeholder {
  color: var(--vm-muted);
}
.skillsearch:focus {
  border-color: var(--vm-accent);
}
.skillhint {
  margin: var(--space-2) 0;
  font-size: 9.5px;
  line-height: 1.4;
  color: var(--vm-muted);
  font-family: var(--font-sans);
}
.skilllist {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  max-height: 360px;
  margin: 0 -2px;
  padding: 0 2px;
}
.skillcat {
  font-size: 9px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  margin: 2px 0 2px;
  padding-left: 2px;
}
.skillcard {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 7px 9px;
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  background: var(--vm-bg);
  cursor: grab;
  transition: border-color 0.15s, transform 0.1s;
}
.skillcard:hover {
  border-color: var(--vm-muted);
}
.skillcard:active {
  cursor: grabbing;
  transform: scale(0.98);
}
.skillcard__top {
  display: flex;
  align-items: center;
  gap: 6px;
}
.skillcard__name {
  font-size: 11.5px;
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  color: var(--vm-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.skillcard__tag {
  margin-left: auto;
  font-size: 8px;
  letter-spacing: 0.04em;
  color: var(--vm-muted);
  flex-shrink: 0;
}
.skillcard__desc {
  font-family: var(--font-sans);
  font-size: 9.5px;
  line-height: 1.35;
  color: var(--vm-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.skillempty {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--vm-muted);
  padding: var(--space-3) 2px;
  margin: 0;
}

/* Tasks board */
.vmdemo__tasks {
  border-top: 1px solid var(--vm-line);
  background: var(--vm-panel);
  overflow: hidden;
}
.tasks__bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--vm-line);
}
.tasks__title {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
}
.tasks__new {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: var(--weight-semibold);
  color: #06140d;
  background: var(--vm-accent);
  border: none;
  border-radius: var(--radius-sm);
  padding: 5px 11px;
  cursor: pointer;
}
.tasks__spacer {
  flex: 1;
}
.tasks__close {
  margin-left: auto;
  font-size: 16px;
  line-height: 1;
  color: var(--vm-muted);
  background: transparent;
  border: none;
  cursor: pointer;
}
.tasks__close:hover {
  color: var(--vm-text);
}
.tasks__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  padding: var(--space-4);
}
.tcol {
  background: var(--vm-bg);
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}
.tcol__head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--vm-muted);
}
.tcol__n {
  font-size: 9px;
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}
.tcard {
  background: var(--vm-panel);
  border: 1px solid var(--vm-line);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tcard__title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 11.5px;
  font-weight: var(--weight-semibold);
  color: var(--vm-text);
  line-height: 1.3;
}
.tcard__desc {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 10px;
  line-height: 1.4;
  color: var(--vm-muted);
}
.tcard__who {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--vm-dim);
}
.tcard__av {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  font-weight: var(--weight-bold);
  color: #fff;
}
.tcol__empty {
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--vm-muted);
  border: 1px dashed var(--vm-line);
  border-radius: var(--radius-sm);
  padding: var(--space-4) var(--space-2);
  text-align: center;
}

.tasks-enter-active,
.tasks-leave-active {
  transition: opacity 0.25s var(--ease-smooth);
}
.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 860px) {
  .vmdemo__body {
    grid-template-columns: 130px 1fr;
  }
  .vmdemo__skills {
    display: none;
  }
  .tasks__cols {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .vmdemo__main {
    grid-template-columns: 1fr !important;
  }
  .tasks__cols {
    grid-template-columns: 1fr;
  }
}
</style>
