<template>
  <div class="page-environment">
    <div class="canvas-texture" aria-hidden="true"></div>
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
}

/* Subtle textured canvas — dot grid + soft accent/warm wash at top.
   Sits behind content; shows through transparent sections only. */
.canvas-texture {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 50% -10%, rgba(42, 108, 255, 0.07), transparent 45%),
    radial-gradient(circle at 100% 0%, rgba(42, 108, 255, 0.035), transparent 35%),
    radial-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 28px 28px;
}

.page-content {
  position: relative;
  z-index: 1;
}
</style>
