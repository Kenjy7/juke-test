<template>
  <header class="navbar-wrap" :class="{ scrolled: hasScrolled }">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand" @click="closeMenu" aria-label="juke — home">
        <span class="brand-name">juke</span>
      </router-link>

      <ul class="navbar-links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="nav-link" :class="{ active: $route.path === link.to }">
            {{ t(link.labelKey) }}
          </router-link>
        </li>
      </ul>

      <LocaleSwitcher class="locale-switcher-desktop" />

      <router-link to="/contact" class="cta-btn">
        {{ t('cta.startProject') }}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="cta-arrow">
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>

      <button
        ref="hamburgerRef"
        class="hamburger"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="t('a11y.menu')"
      >
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </button>
    </nav>

    <!-- Full-screen mobile menu — teleported to <body> so its position:fixed
         resolves against the viewport. Left inside the header, the navbar's
         backdrop-filter (when scrolled) becomes the containing block and
         collapses this overlay to the bar's height: the background appears to
         go transparent and the bottom actions drift up into the page. -->
    <Teleport to="body">
      <transition name="menu-reveal">
        <div
          v-if="isMenuOpen"
          ref="menuRef"
          id="mobile-menu"
          class="mobile-menu"
          role="dialog"
          aria-modal="true"
          :aria-label="t('a11y.mainMenu')"
          @click="closeMenu"
        >
          <div class="mobile-menu-inner" @click.stop>
            <nav class="mobile-nav-links">
              <router-link
                v-for="(link, i) in navLinks"
                :key="link.to"
                :to="link.to"
                class="mobile-link"
                :class="{ active: $route.path === link.to }"
                :style="{ animationDelay: `${60 + i * 45}ms` }"
                @click="closeMenu"
              >
                <span class="mobile-link__label">{{ t(link.labelKey) }}</span>
                <svg
                  class="mobile-link__arrow"
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
            </nav>

            <div
              class="mobile-bottom"
              :style="{ animationDelay: `${60 + navLinks.length * 45 + 40}ms` }"
            >
              <router-link to="/contact" class="mobile-cta" @click="closeMenu">
                {{ t('cta.startProject') }}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
              <div class="mobile-foot">
                <LocaleSwitcher class="locale-switcher-mobile" @click="closeMenu" />
                <a class="mobile-contact-link" href="mailto:contact@jukecoding.be"
                  >contact@jukecoding.be</a
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

const { t } = useI18n()

const navLinks = [
  { to: '/saas-development', labelKey: 'nav.saas' },
  { to: '/ai-projecten', labelKey: 'nav.ai' },
  { to: '/vibemind', labelKey: 'nav.vibemind' },
  { to: '/beheerly', labelKey: 'nav.beheerly' },
  { to: '/blog', labelKey: 'nav.blog' },
  { to: '/contact', labelKey: 'nav.contact' },
]

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
const menuRef = ref(null)
const hamburgerRef = ref(null)

const getFocusable = () =>
  menuRef.value ? Array.from(menuRef.value.querySelectorAll('a[href], button:not([disabled])')) : []

// Robust scroll lock. `body { overflow: hidden }` alone doesn't stop touch
// scrolling on mobile (the document element is usually the scroller), so we pin
// the body with position:fixed at a negative offset and restore the exact
// scroll position when the menu closes.
let savedScrollY = 0
const lockScroll = () => {
  savedScrollY = window.scrollY || window.pageYOffset || 0
  const b = document.body.style
  b.position = 'fixed'
  b.top = `-${savedScrollY}px`
  b.left = '0'
  b.right = '0'
  b.width = '100%'
  b.overflow = 'hidden'
}
const unlockScroll = () => {
  const b = document.body.style
  b.position = ''
  b.top = ''
  b.left = ''
  b.right = ''
  b.width = ''
  b.overflow = ''
  window.scrollTo(0, savedScrollY)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) lockScroll()
  else unlockScroll()
  // Flag the open state on <body> so other top-layer UI (e.g. the cookie
  // banner) can step aside while the full-screen menu is up.
  document.body.classList.toggle('menu-open', isMenuOpen.value)
  if (isMenuOpen.value) nextTick(() => getFocusable()[0]?.focus())
}

const closeMenu = (restoreFocus = false) => {
  const wasOpen = isMenuOpen.value
  isMenuOpen.value = false
  if (wasOpen) unlockScroll()
  document.body.classList.remove('menu-open')
  // Only restore focus to the trigger on keyboard close (ESC); navigation
  // and pointer closes let the SPA route-focus take over.
  if (wasOpen && restoreFocus === true) nextTick(() => hamburgerRef.value?.focus())
}

const onScroll = () => {
  // Skip while the menu is open: locking the body resets the document scroll to
  // 0, which would otherwise flip the navbar out of its scrolled state.
  if (isMenuOpen.value) return
  hasScrolled.value = window.scrollY > 20
}

const handleResize = () => {
  if (window.innerWidth > 900 && isMenuOpen.value) closeMenu()
}

const onKeydown = (e) => {
  if (!isMenuOpen.value) return
  if (e.key === 'Escape') {
    closeMenu(true)
    return
  }
  // Trap Tab within the open dialog (WCAG 2.4.3)
  if (e.key === 'Tab') {
    const f = getFocusable()
    if (!f.length) return
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', onKeydown)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', onKeydown)
  if (isMenuOpen.value) unlockScroll()
  document.body.classList.remove('menu-open')
})
</script>

<style scoped lang="scss">
/* ─── Wrapper: transparent → solid on scroll ─── */
.navbar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition:
    background var(--duration-slow) var(--ease-smooth),
    border-color var(--duration-slow) var(--ease-smooth);
  background: transparent;
  border-bottom: 1px solid transparent;
}

.navbar-wrap.scrolled {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom-color: var(--color-border);
}

/* ─── Nav bar ─── */
.navbar {
  max-width: var(--max-width-wide);
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 1.125rem 2.5rem;
}

/* ─── Brand ─── */
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.brand-name {
  font-family: var(--font-wordmark);
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: -0.04em;
}

/* ─── Links ─── */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  color: var(--color-text-tertiary);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: var(--weight-medium);
  padding: 0.5rem 0.875rem;
  transition: color var(--duration-base) var(--ease-smooth);

  &:hover {
    color: var(--color-text-primary);
  }

  &.active,
  &.router-link-active {
    color: var(--color-text-primary);

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--color-primary);
    }
  }
}

/* ─── Language switcher (desktop sits between links and CTA) ─── */
.locale-switcher-desktop {
  margin-left: var(--space-4);
}

/* ─── CTA ─── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: var(--space-4);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-medium);
  font-size: 0.8125rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--transition-base);

  .cta-arrow {
    transition: transform var(--transition-base);
    opacity: 0.85;
  }

  &:hover {
    background: var(--color-accent-hover);
    .cta-arrow {
      transform: translate(2px, -2px);
      opacity: 1;
    }
  }
}

/* ─── Hamburger (3 lines → X) ─── */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 44px;
  height: 44px;
  position: relative;
  /* Keep the toggle above the full-screen mobile menu (z-index 200)
     so it stays clickable to close the menu. */
  z-index: 300;

  .bar {
    position: absolute;
    left: 50%;
    width: 22px;
    height: 1.5px;
    background: var(--color-text-primary);
    border-radius: 1px;
    transform: translateX(-50%);
    transition: all var(--duration-slow) var(--ease-spring);
  }

  .bar-1 {
    top: 14px;
  }
  .bar-2 {
    top: 21px;
  }
  .bar-3 {
    top: 28px;
  }

  &.active {
    .bar-1 {
      top: 21px;
      transform: translateX(-50%) rotate(45deg);
    }
    .bar-2 {
      opacity: 0;
      transform: translateX(-50%) scaleX(0);
    }
    .bar-3 {
      top: 21px;
      transform: translateX(-50%) rotate(-45deg);
    }
  }
}

/* ─── Full-screen mobile menu ───
   Teleported to <body>, so position:fixed resolves against the viewport even
   when the navbar carries a backdrop-filter (which would otherwise become the
   containing block and collapse this overlay to the bar's height). It sits
   below the navbar (z 1000) so the brand + animated hamburger-X stay on top. */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: var(--color-bg-primary);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.menu-reveal-enter-active {
  transition: opacity 0.32s var(--ease-out-expo);
}
.menu-reveal-leave-active {
  transition: opacity 0.24s var(--ease-smooth);
}
.menu-reveal-enter-from,
.menu-reveal-leave-to {
  opacity: 0;
}

.mobile-menu-inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6.5rem 2rem 2.5rem;
}

/* ─── Nav links: big display rows with hairline dividers ─── */
.mobile-nav-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 6.5vw, 2.6rem);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-tight);
  line-height: 1.1;
  color: var(--color-text-primary);
  text-decoration: none;
  opacity: 0;
  transform: translateY(1.25rem);
  animation: slideUp 0.5s var(--ease-out-expo) forwards;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:first-child {
    border-top: 1px solid var(--color-border);
  }

  .mobile-link__arrow {
    flex-shrink: 0;
    color: var(--color-text-tertiary);
    opacity: 0;
    transform: translateX(-0.4rem);
    transition:
      opacity var(--duration-fast) var(--ease-smooth),
      transform var(--duration-fast) var(--ease-smooth),
      color var(--duration-fast) var(--ease-smooth);
  }

  &:hover,
  &:focus-visible {
    color: var(--color-text-primary);

    .mobile-link__label {
      transform: translateX(0.25rem);
    }
    .mobile-link__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.active {
    color: var(--color-primary);

    .mobile-link__arrow {
      color: var(--color-primary);
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.mobile-link__label {
  transition: transform var(--duration-base) var(--ease-out-expo);
}

/* ─── Bottom: full-width CTA + language / contact row ─── */
.mobile-bottom {
  padding-top: var(--space-8);
  opacity: 0;
  transform: translateY(1rem);
  animation: slideUp 0.5s var(--ease-out-expo) forwards;
}

.mobile-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-semibold);
  font-size: 1.0625rem;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  box-shadow: var(--shadow-elevated);
  transition:
    background var(--transition-base),
    transform var(--transition-base);

  svg {
    opacity: 0.9;
    transition: transform var(--transition-base);
  }

  &:hover {
    background: var(--color-accent-hover);

    svg {
      transform: translate(2px, -2px);
    }
  }
}

.mobile-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.locale-switcher-mobile {
  display: inline-flex;
}

.mobile-contact-link {
  font-size: var(--text-small);
  color: var(--color-text-tertiary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-text-secondary);
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .navbar-links,
  .cta-btn,
  .locale-switcher-desktop {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem 1.25rem;
  }
  .brand-name {
    font-size: 1.375rem;
  }
  .mobile-menu-inner {
    padding: 5.75rem 1.5rem 2rem;
  }
}
</style>

<!-- Global: top-layer widgets (cookie banner z-index 9999, chat launcher
     z-index 1000) live outside this component's stacking context, so they
     would otherwise float over the open full-screen menu. Suppress them
     while the menu is up. -->
<style lang="scss">
body.menu-open {
  .cookie-banner-overlay,
  #chatToggle,
  #chatbox {
    display: none;
  }
}
</style>
