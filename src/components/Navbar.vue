<template>
  <header class="navbar-wrap" :class="{ scrolled: hasScrolled }">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand" @click="closeMenu">
        <img :src="logoUrl" class="logo" width="195" height="195" loading="eager" decoding="async" alt="JukeCoding logo" />
        <div class="brand">
          <span class="brand-name">JUKE<span class="brand-thin">CODING</span></span>
        </div>
      </router-link>

      <ul class="navbar-links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="nav-link" :class="{ active: $route.path === link.to }">
            {{ link.label }}
          </router-link>
        </li>
      </ul>

      <router-link to="/offerte-aanvraag" class="cta-btn">
        Start je project
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="cta-arrow">
          <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>

      <button
        class="hamburger"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Menu"
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
        id="mobile-menu"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Hoofdmenu"
        @click="closeMenu"
      >
        <div class="mobile-menu-inner" @click.stop>
          <nav class="mobile-nav-links">
            <router-link
              v-for="(link, i) in navLinks" :key="link.to"
              :to="link.to"
              class="mobile-link"
              :style="{ animationDelay: `${80 + i * 50}ms` }"
              @click="closeMenu"
            >
              {{ link.label }}
            </router-link>
          </nav>

          <div class="mobile-bottom" :style="{ animationDelay: `${80 + navLinks.length * 50 + 40}ms` }">
            <router-link to="/offerte-aanvraag" class="mobile-cta" @click="closeMenu">
              Start je project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
import logoUrl from "@/assets/logo.webp";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const navLinks = [
  { to: '/ai-projecten', label: 'AI & automatisering' },
  { to: '/saas-development', label: 'SaaS & apps' },
  { to: '/webdesign', label: 'Webdesign' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const isMenuOpen = ref(false);
const hasScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const onScroll = () => {
  hasScrolled.value = window.scrollY > 20;
};

const handleResize = () => {
  if (window.innerWidth > 900 && isMenuOpen.value) closeMenu();
};

const onKeydown = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) closeMenu();
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', onKeydown);
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
/* ─── Wrapper: transparent → solid on scroll ─── */
.navbar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background var(--duration-slow) var(--ease-smooth),
              border-color var(--duration-slow) var(--ease-smooth);
  background: transparent;
  border-bottom: 1px solid transparent;
}

.navbar-wrap.scrolled {
  background: rgba(250, 250, 249, 0.8);
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
  gap: 0.75rem;
  text-decoration: none;
  margin-right: auto;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  font-size: 1rem;
  color: var(--color-text-primary);
  letter-spacing: 0.06em;
}

.brand-thin {
  font-weight: 300;
  color: var(--color-text-tertiary);
  margin-left: 1px;
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

  &:hover { color: var(--color-text-primary); }

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

/* ─── CTA ─── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: var(--space-6);
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
    .cta-arrow { transform: translate(2px, -2px); opacity: 1; }
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

  .bar-1 { top: 14px; }
  .bar-2 { top: 21px; }
  .bar-3 { top: 28px; }

  &.active {
    .bar-1 { top: 21px; transform: translateX(-50%) rotate(45deg); }
    .bar-2 { opacity: 0; transform: translateX(-50%) scaleX(0); }
    .bar-3 { top: 21px; transform: translateX(-50%) rotate(-45deg); }
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

  &:hover { color: var(--color-text-primary); }
}

.mobile-bottom {
  margin-top: auto;
  padding-top: var(--space-12);
  opacity: 0;
  transform: translateY(1rem);
  animation: slideUp 0.5s var(--ease-out-expo) forwards;
}

.mobile-cta {
  display: inline-flex;
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

  svg { opacity: 0.85; }
}

.mobile-contact {
  a {
    font-size: var(--text-small);
    color: var(--color-text-tertiary);
    text-decoration: none;
    &:hover { color: var(--color-text-secondary); }
  }
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .navbar-links, .cta-btn { display: none; }
  .hamburger { display: flex; }
}

@media (max-width: 480px) {
  .navbar { padding: 1rem 1.25rem; }
  .logo { width: 34px; height: 34px; }
  .brand-name { font-size: 0.875rem; }
  .mobile-menu-inner { padding: 5rem 1.5rem 2rem; }
}
</style>
