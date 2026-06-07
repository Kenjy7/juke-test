<!-- AiBackground.vue -->
<template>
  <div class="ai-background" :class="{ dark }">
    <!-- Animated background elements -->
    <div class="bg-elements">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-pattern"></div>
      <div class="spotlight"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dark: { type: Boolean, default: false }
});
</script>

<style scoped>
/* =========================================================
   BACKGROUND WRAPPER
   ========================================================= */
.ai-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-sunken) 50%, var(--color-bg-primary) 100%);
  overflow: hidden;
}

.ai-background.light {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
}

/* =========================================================
   ANIMATED BACKGROUND ELEMENTS
   ========================================================= */
.bg-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.25;
  animation: float 25s ease-in-out infinite;
  mix-blend-mode: screen;
}

.dark .gradient-orb {
  opacity: 0.3;
  filter: blur(160px);
}

.orb-1 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, var(--color-primary) 0%, var(--color-primary) 35%, transparent 70%);
  top: -350px;
  right: -250px;
  animation-delay: 0s;
}

.orb-2 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, #ec4899 0%, var(--color-primary) 35%, transparent 70%);
  bottom: -250px;
  left: -200px;
  animation-delay: -10s;
}

.orb-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-primary) 0%, var(--color-primary) 35%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -15s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
      linear-gradient(var(--color-primary-subtle) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-primary-subtle) 1px, transparent 1px);
  background-size: 100px 100px;
  mask-image: radial-gradient(ellipse at center, black 10%, transparent 70%);
  animation: gridPulse 8s ease-in-out infinite;
  opacity: 0.3;
}

.dark .grid-pattern {
  background-image:
      linear-gradient(var(--color-bg-surface) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-bg-surface) 1px, transparent 1px);
  opacity: 0.4;
}

.spotlight {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at top, var(--color-primary-subtle) 0%, transparent 50%);
}

.dark .spotlight {
  background: radial-gradient(ellipse at top, var(--color-primary-border) 0%, transparent 50%);
}

/* =========================================================
   ANIMATIONS
   ========================================================= */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.1); }
  66% { transform: translate(-40px, 30px) scale(0.9); }
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .gradient-orb {
    filter: blur(100px);
  }

  .dark .gradient-orb {
    filter: blur(110px);
  }
}
</style>