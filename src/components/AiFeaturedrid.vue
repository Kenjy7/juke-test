<template>
  <section class="ai-grid-section">
    <div class="inner">
      <!-- Title section -->

      <!-- Grid -->
      <div class="grid">
        <AiFeatureCard
            v-for="(item, i) in features"
            :key="i"
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
            :highlights="item.highlights"
            :style="{ '--delay': i * 0.1 + 's' }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Bot, BrainCircuit, Rocket } from "lucide-vue-next";
import AiFeatureCard from "@/components/AiFeatureCard.vue";

const features = [
  {
    title: "Autonome AI Agents",
    description:
        "Zelfstandige AI-agents die repetitieve taken overnemen en 24/7 uitvoeren zonder menselijke tussenkomst.",
    icon: Bot,
    highlights: [
      "Sales & support automatisatie",
      "24/7 actief en schaalbaar",
      "Zelflerend en adaptief"
    ]
  },
  {
    title: "Inzicht & Besluitvorming",
    description:
        "AI analyseert grote hoeveelheden data en vertaalt deze naar duidelijke inzichten voor snellere, betere beslissingen.",
    icon: BrainCircuit,
    highlights: [
      "Realtime dashboards",
      "Predictive analytics",
      "Datagedreven keuzes"
    ]
  },
  {
    title: "Groei & Communicatie",
    description:
        "Slimme AI-oplossingen die marketing, content en klantcommunicatie optimaliseren voor duurzame groei.",
    icon: Rocket,
    highlights: [
      "Leadgeneratie & conversie",
      "Content & copy AI",
      "Consistente klantinteractie"
    ]
  }
];
</script>

<style scoped lang="scss">
.ai-grid-section {
  padding: 1rem 0 5rem;
  position: relative;
  border-bottom: 1px solid var(--color-bg-surface);
}

.inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* =========================================================
   TITLE SECTION
   ========================================================= */
.title-wrapper {
  text-align: center;
  margin-bottom: 5rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-primary-border);
  text-transform: uppercase;
}

.gradient-text {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.subtitle {
  font-size: 1.25rem;
  max-width: 720px;
  margin: 0 auto;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* =========================================================
   GRID
   ========================================================= */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .ai-grid-section {
    padding: 6rem 0;
  }

  .inner {
    padding: 0 1.5rem;
  }

  .title-wrapper {
    margin-bottom: 3rem;
  }

  .gradient-text {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .ai-grid-section {
    padding: 5rem 0;
  }

  .inner {
    padding: 0 1.25rem;
  }
}
</style>