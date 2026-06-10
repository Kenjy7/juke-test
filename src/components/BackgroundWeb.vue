<template>
  <div class="page-environment">
    <!-- Static dot grid + soft top wash (the calm base layer) -->
    <div class="canvas-texture" aria-hidden="true"></div>

    <div class="page-content">
      <slot></slot>
    </div>

    <!-- Slow rising particles: constant, gentle drift — never busy.
         Sits ABOVE content (pointer-events:none) so it shows over every
         section, including opaque white cards. Off for reduced motion. -->
    <div class="particles" aria-hidden="true">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="particle"
        :style="{
          left: p.left,
          width: p.size,
          height: p.size,
          '--drift': p.drift,
          '--peak': p.opacity,
          animationDuration: p.duration,
          animationDelay: p.delay,
        }"
      ></span>
    </div>
  </div>
</template>

<script setup>
// Hand-tuned, deterministic field (no Math.random → stable across SSG/hydration).
const particles = [
  { left: '6%', size: '4px', drift: '14px', duration: '26s', delay: '-3s', opacity: 0.62 },
  { left: '14%', size: '3px', drift: '-10px', duration: '34s', delay: '-18s', opacity: 0.52 },
  { left: '22%', size: '5px', drift: '20px', duration: '30s', delay: '-9s', opacity: 0.58 },
  { left: '31%', size: '2px', drift: '-16px', duration: '38s', delay: '-22s', opacity: 0.46 },
  { left: '39%', size: '4px', drift: '12px', duration: '28s', delay: '-14s', opacity: 0.62 },
  { left: '47%', size: '3px', drift: '-18px', duration: '36s', delay: '-5s', opacity: 0.52 },
  { left: '55%', size: '5px', drift: '16px', duration: '32s', delay: '-25s', opacity: 0.58 },
  { left: '63%', size: '2px', drift: '-12px', duration: '40s', delay: '-11s', opacity: 0.46 },
  { left: '70%', size: '4px', drift: '18px', duration: '27s', delay: '-19s', opacity: 0.62 },
  { left: '78%', size: '3px', drift: '-14px', duration: '35s', delay: '-7s', opacity: 0.52 },
  { left: '86%', size: '5px', drift: '10px', duration: '31s', delay: '-16s', opacity: 0.58 },
  { left: '93%', size: '3px', drift: '-20px', duration: '37s', delay: '-2s', opacity: 0.52 },
]
</script>

<style lang="scss">
.page-environment {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--color-bg-primary);
}

/* Subtle textured canvas — dot grid + soft accent/warm wash at top.
   Sits behind content; shows through transparent sections only. */
.canvas-texture {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 50% -10%, rgba(12, 107, 80, 0.07), transparent 45%),
    radial-gradient(circle at 100% 0%, rgba(12, 107, 80, 0.035), transparent 35%),
    radial-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px);
  background-size:
    100% 100%,
    100% 100%,
    28px 28px;
}

/* ---- Rising particle field (ambient overlay above content) ---- */
.particles {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -12px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(12, 107, 80, 0.72) 0%,
    rgba(12, 107, 80, 0.28) 60%,
    transparent 100%
  );
  opacity: 0;
  will-change: transform, opacity;
  animation-name: particle-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes particle-rise {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  12% {
    opacity: var(--peak, 0.45);
  }
  88% {
    opacity: var(--peak, 0.45);
  }
  100% {
    transform: translate3d(var(--drift, 0), -100vh, 0);
    opacity: 0;
  }
}

/* Respect reduced-motion: hide the moving layer entirely. */
@media (prefers-reduced-motion: reduce) {
  .particles {
    display: none;
  }
}

.page-content {
  position: relative;
  z-index: 1;
}
</style>
