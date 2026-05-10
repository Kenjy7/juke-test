<template>
  <section class="showcase" ref="sectionRef">
    <div class="container">
      <div class="showcase-header reveal">
        <span class="eyebrow">
          <span class="dot"></span>
          Wat AI voor jouw bedrijf doet
        </span>
        <h2>Eén AI-agent vervangt<br />uren handmatig werk.</h2>
        <p class="lead">We bouwen AI die daadwerkelijk taken overneemt — niet alleen adviseert.</p>
      </div>

      <div class="showcase-grid">
        <!-- Main featured card -->
        <div class="card-shell card-featured reveal reveal-delay-1">
          <div class="card-inner">
            <div class="card-visual">
              <div class="flow-diagram">
                <div class="flow-node node-input">
                  <div class="node-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <span>Klant stuurt bericht</span>
                </div>
                <div class="flow-line"></div>
                <div class="flow-node node-ai">
                  <div class="node-icon node-icon-ai">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 0 1 1h1a4 4 0 0 1 0 8h-1a1 1 0 0 0-1 1v1a4 4 0 0 1-8 0v-1a1 1 0 0 0-1-1H6a4 4 0 0 1 0-8h1a1 1 0 0 0 1-1V6a4 4 0 0 1 4-4z"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <span>AI-agent verwerkt</span>
                </div>
                <div class="flow-line"></div>
                <div class="flow-node node-output">
                  <div class="node-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                  </div>
                  <span>Automatisch afgehandeld</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h3>Sales & Support Automatisering</h3>
              <p>AI-agents die inkomende leads kwalificeren, vragen beantwoorden en opvolging automatiseren. Van eerste contact tot afspraak — zonder handmatig werk.</p>
            </div>
          </div>
        </div>

        <!-- Secondary cards -->
        <div class="card-shell reveal reveal-delay-2">
          <div class="card-inner">
            <div class="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M10 9H8"/>
              </svg>
            </div>
            <h3>Automatische Contentcreatie</h3>
            <p>Blogposts, social media, rapportages — AI genereert content in jouw tone-of-voice. Altijd on-brand, altijd op tijd.</p>
          </div>
        </div>

        <div class="card-shell reveal reveal-delay-3">
          <div class="card-inner">
            <div class="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 20V10"/>
                <path d="M12 20V4"/>
                <path d="M6 20v-6"/>
              </svg>
            </div>
            <h3>Data & Inzichten</h3>
            <p>AI die patronen herkent in je data, rapportages genereert en anomalieën detecteert. Beslissingen op basis van feiten, niet gevoel.</p>
          </div>
        </div>

        <div class="card-shell reveal reveal-delay-4">
          <div class="card-inner">
            <div class="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <path d="M7 2v20"/>
                <path d="M2 12h5"/>
                <path d="M2 7h5"/>
                <path d="M2 17h5"/>
              </svg>
            </div>
            <h3>Workflow Integraties</h3>
            <p>Koppel AI aan je bestaande tools — CRM, e-mail, boekhouding. Alles praat met elkaar, zonder handmatig kopiëren.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sectionRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sectionRef.value?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<style scoped lang="scss">
.showcase {
  padding: var(--space-4) var(--space-8) var(--space-32);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.showcase-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  background: var(--color-bg-card-inner);
  padding: 0.4rem 1.125rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border: 1px solid var(--color-border);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-4) 0;
}

.lead {
  font-size: var(--text-body-lg);
  color: var(--color-text-tertiary);
  margin: 0;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

/* Bento-style grid */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: var(--space-4);
}

/* Double-Bezel cards */
.card-shell {
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 5px;
  transition: all var(--duration-slow) var(--ease-spring);

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);
  }
}

.card-inner {
  background: var(--color-bg-card-inner);
  border-radius: calc(var(--radius-2xl) - 5px);
  box-shadow: var(--shadow-inner-highlight);
  padding: var(--space-8);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Featured card spans full width */
.card-featured {
  grid-column: 1 / -1;

  .card-inner {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-8);
    align-items: center;
  }
}

/* Flow diagram visualization */
.flow-diagram {
  display: flex;
  align-items: center;
  gap: 0;
  padding: var(--space-6) var(--space-4);
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  flex: 1;

  span {
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
    text-align: center;
    font-weight: var(--weight-medium);
  }
}

.node-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--duration-base) var(--ease-spring);
}

.node-icon-ai {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-border);
  color: var(--color-primary);
  box-shadow: var(--shadow-glow-primary);
}

.flow-line {
  flex: 0.5;
  height: 1px;
  background: linear-gradient(90deg, var(--color-border), var(--color-primary-border), var(--color-border));
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-primary);
    opacity: 0.5;
    animation: flowPulse 2s ease-in-out infinite;
  }
}

@keyframes flowPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

.card-body {
  h3 {
    font-family: var(--font-display);
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-3) 0;
    letter-spacing: -0.01em;
  }

  p {
    font-size: var(--text-small);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
}

/* Secondary cards */
.card-icon {
  width: 44px;
  height: 44px;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--space-6);
  transition: box-shadow var(--duration-base) var(--ease-smooth);
}

.card-shell:hover .card-icon {
  box-shadow: var(--shadow-glow-primary);
}

.card-inner > h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  letter-spacing: -0.01em;
}

.card-inner > p {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

@media (max-width: 768px) {
  .showcase { padding: var(--space-4) var(--space-4) var(--space-20); }

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .card-featured .card-inner {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .flow-diagram {
    padding: var(--space-4) 0;
  }

  .flow-node span { font-size: 0.6rem; }
  .node-icon { width: 40px; height: 40px; }
}
</style>
