<template>
  <div class="page-environment">
    <!-- Layered atmospheric background -->
    <div class="atmosphere" aria-hidden="true">
      <!-- Primary mesh gradients -->
      <div class="mesh mesh-1"></div>
      <div class="mesh mesh-2"></div>
      <div class="mesh mesh-3"></div>

      <!-- Subtle radial vignette -->
      <div class="vignette"></div>

      <!-- Dot grid pattern -->
      <div class="dot-grid"></div>

      <!-- Top ambient glow -->
      <div class="top-glow"></div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.page-environment {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--color-bg-primary);

  & > .page-content > * {
    background: transparent !important;
  }
}

.atmosphere {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* ─── Mesh gradient orbs (deep, ambient) ─── */
.mesh {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.mesh-1 {
  width: 900px;
  height: 900px;
  top: -20%;
  left: -15%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.06) 0%,
    rgba(59, 130, 246, 0.02) 40%,
    transparent 70%
  );
  filter: blur(80px);
  animation: meshDrift1 40s ease-in-out infinite;
}

.mesh-2 {
  width: 700px;
  height: 700px;
  bottom: -10%;
  right: -10%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.05) 0%,
    rgba(59, 130, 246, 0.015) 40%,
    transparent 70%
  );
  filter: blur(80px);
  animation: meshDrift2 50s ease-in-out infinite;
}

.mesh-3 {
  width: 500px;
  height: 500px;
  top: 40%;
  left: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.025) 0%,
    transparent 60%
  );
  filter: blur(100px);
  animation: meshDrift3 35s ease-in-out infinite;
}

@keyframes meshDrift1 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(60px, 40px); }
  50% { transform: translate(20px, -30px); }
  75% { transform: translate(-40px, 20px); }
}

@keyframes meshDrift2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-50px, -40px); }
  66% { transform: translate(30px, 50px); }
}

@keyframes meshDrift3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 40px) scale(1.1); }
}

/* ─── Radial vignette (darkens edges) ─── */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 30%,
    transparent 0%,
    transparent 50%,
    rgba(5, 5, 8, 0.4) 100%
  );
}

/* ─── Subtle dot grid ─── */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px
  );
  background-size: 32px 32px;
  mask-image: radial-gradient(
    ellipse at 50% 40%,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 70%
  );
  -webkit-mask-image: radial-gradient(
    ellipse at 50% 40%,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 70%
  );
}

/* ─── Top ambient light (hero area) ─── */
.top-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 600px;
  background: radial-gradient(
    ellipse,
    rgba(59, 130, 246, 0.05) 0%,
    rgba(59, 130, 246, 0.015) 40%,
    transparent 70%
  );
  filter: blur(60px);
}

.page-content {
  position: relative;
  z-index: 1;
}
</style>
