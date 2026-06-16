// v-scale-fit="<designWidthPx>"
// Shrinks a fixed-design-width mock so it fits its container on narrow screens,
// using CSS `zoom` (which reflows the layout box — unlike transform, it leaves no
// empty gap and needs no clipping). The element keeps its full layout: all content
// stays visible, just proportionally smaller. Above the design width it's left
// untouched (natural/fluid).
const cleanups = new WeakMap()

function apply(el, base) {
  const parent = el.parentElement
  if (!parent || !base) return
  const avail = parent.clientWidth
  if (avail && avail < base) {
    el.style.width = base + 'px'
    el.style.zoom = String(Math.round((avail / base) * 1000) / 1000)
  } else {
    el.style.width = ''
    el.style.zoom = ''
  }
}

export const vScaleFit = {
  mounted(el, binding) {
    const base = Number(binding.value)
    const run = () => apply(el, base)
    run()
    const ro = new ResizeObserver(run)
    if (el.parentElement) ro.observe(el.parentElement)
    window.addEventListener('resize', run)
    // Re-run once fonts/images settle (layout width can shift after load).
    window.addEventListener('load', run, { once: true })
    cleanups.set(el, () => {
      ro.disconnect()
      window.removeEventListener('resize', run)
    })
  },
  updated(el, binding) {
    apply(el, Number(binding.value))
  },
  unmounted(el) {
    const fn = cleanups.get(el)
    if (fn) fn()
    cleanups.delete(el)
  },
}
