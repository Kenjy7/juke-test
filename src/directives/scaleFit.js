// v-scale-fit="<designWidthPx>"
// Scales a fixed-design-width mock down to fit its container on small screens so
// all content stays visible (no crop, no cramming). Uses transform: scale()
// (reliable on iOS Safari, unlike `zoom`) and compensates the layout height with
// a negative margin so the scaled mock leaves no empty gap below it.
const cleanups = new WeakMap()

function apply(el, base) {
  const parent = el.parentElement
  if (!parent || !base) return
  // Reset first so we read the true available (container) width, then re-apply.
  el.style.transform = 'none'
  el.style.width = ''
  el.style.marginBottom = ''
  const avail = parent.clientWidth
  if (avail && avail < base) {
    const s = Math.round((avail / base) * 1000) / 1000
    el.style.width = base + 'px'
    el.style.transformOrigin = 'top left'
    el.style.transform = `scale(${s})`
    // offsetHeight is the unscaled layout height (transform doesn't change it);
    // pull the following content up by the height the scale removed.
    const h = el.offsetHeight
    el.style.marginBottom = `${Math.round(-h * (1 - s))}px`
  }
}

// Defer to after layout so the container width is final (iOS Safari reports a
// stale width if measured during hydration).
function schedule(el, base) {
  requestAnimationFrame(() => requestAnimationFrame(() => apply(el, base)))
}

export const vScaleFit = {
  mounted(el, binding) {
    const base = Number(binding.value)
    const run = () => schedule(el, base)
    run()
    const ro = new ResizeObserver(run)
    if (el.parentElement) ro.observe(el.parentElement)
    window.addEventListener('resize', run)
    window.addEventListener('load', run, { once: true })
    cleanups.set(el, () => {
      ro.disconnect()
      window.removeEventListener('resize', run)
    })
  },
  updated(el, binding) {
    schedule(el, Number(binding.value))
  },
  unmounted(el) {
    const fn = cleanups.get(el)
    if (fn) fn()
    cleanups.delete(el)
  },
}
