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

    <!-- Full-screen mobile menu -->
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
              :style="{ animationDelay: `${80 + i * 50}ms` }"
              @click="closeMenu"
            >
              {{ t(link.labelKey) }}
            </router-link>
          </nav>

          <div
            class="mobile-bottom"
            :style="{ animationDelay: `${80 + navLinks.length * 50 + 40}ms` }"
          >
            <LocaleSwitcher class="locale-switcher-mobile" @click="closeMenu" />
            <router-link to="/contact" class="mobile-cta" @click="closeMenu">
              {{ t('cta.startProject') }}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
            <div class="mobile-contact">
              <a href="mailto:contact@jukecoding.be">contact@jukecoding.be</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
  // Flag the open state on <body> so other top-layer UI (e.g. the cookie
  // banner) can step aside while the full-screen menu is up.
  document.body.classList.toggle('menu-open', isMenuOpen.value)
  if (isMenuOpen.value) nextTick(() => getFocusable()[0]?.focus())
}

const closeMenu = (restoreFocus = false) => {
  const wasOpen = isMenuOpen.value
  isMenuOpen.value = false
  document.body.style.overflow = ''
  document.body.classList.remove('menu-open')
  // Only restore focus to the trigger on keyboard close (ESC); navigation
  // and pointer closes let the SPA route-focus take over.
  if (wasOpen && restoreFocus === true) nextTick(() => hamburgerRef.value?.focus())
}

const onScroll = () => {
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
  document.body.style.overflow = ''
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
  z-index: 100;
  transition:
    background var(--duration-slow) var(--ease-smooth),
    border-color var(--duration-slow) var(--ease-smooth);
  background: transparent;
  border-bottom: 1px solid transparent;
}

.navbar-wrap.scrolled {
  background: rgba(255, 255, 255, 0.82);
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

/* ─── Full-screen mobile menu ─── */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

.menu-reveal-enter-active {
  transition: opacity 0.3s var(--ease-out-expo);
}
.menu-reveal-leave-active {
  transition: opacity 0.25s var(--ease-smooth);
}
.menu-reveal-enter-from,
.menu-reveal-leave-to {
  opacity: 0;
}

.mobile-menu-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 2.5rem 3rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  text-decoration: none;
  letter-spacing: var(--tracking-tight);
  padding: 0.25rem 0;
  transition: color var(--duration-fast) var(--ease-smooth);
  opacity: 0;
  transform: translateY(1.5rem);
  animation: slideUp 0.5s var(--ease-out-expo) forwards;

  &:hover {
    color: var(--color-text-primary);
  }
}

.mobile-bottom {
  margin-top: auto;
  padding-top: var(--space-12);
  opacity: 0;
  transform: translateY(1rem);
  animation: slideUp 0.5s var(--ease-out-expo) forwards;
}

.locale-switcher-mobile {
  display: inline-flex;
  margin-bottom: var(--space-6);
}

.mobile-cta {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.625rem;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-medium);
  font-size: 1rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  margin-bottom: var(--space-6);

  svg {
    opacity: 0.85;
  }
}

.mobile-contact {
  a {
    font-size: var(--text-small);
    color: var(--color-text-tertiary);
    text-decoration: none;
    &:hover {
      color: var(--color-text-secondary);
    }
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
    padding: 5rem 1.5rem 2rem;
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
