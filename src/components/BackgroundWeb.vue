<template>
  <div class="page-environment">
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
/* Plain, calm background — the decorative dot-grid texture and the rising green
   particle field were removed. Kept as a thin wrapper: it owns the page
   background and the horizontal-overflow guard the layout relies on. */
.page-environment {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--color-bg-primary);
}

.page-content {
  position: relative;
  z-index: 1;
}
</style>
