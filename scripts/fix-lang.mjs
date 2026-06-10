// scripts/fix-lang.mjs
// Post-build locale finaliser for the prerendered HTML. Per-page SEO tags are
// still authored in Dutch inside each view's useHead(); this pass rewrites them
// for the English pages (everything under dist/en/ and dist/en.html) so each
// locale ships correct, self-referencing signals:
//   • <html lang>        → "en"            (else "nl-BE")
//   • <link canonical>   → the /en URL     (else untouched, already nl)
//   • og:locale          → "en_US"         (else "nl_BE")
//   • og:locale:alternate→ counterpart locale (fixes a stale "nl_NL")
// vite-ssg sets <html lang> via onPageRendered too; this stays the deterministic
// final word. Once the views are migrated to locale-aware useHead(), this pass
// becomes a no-op and can be dropped.
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'dist'
const ORIGIN = 'https://jukecoding.be'

function htmlFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...htmlFiles(full))
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

// dist/en.html (the /en home) or anything under dist/en/ is English.
const isEnglish = (file) => {
  const rel = path.relative(DIST, file)
  return rel === 'en.html' || rel.startsWith(`en${path.sep}`)
}

// Insert the /en prefix into a canonical href that still points at the nl URL.
const toEnglishCanonical = (href) => {
  if (!href.startsWith(ORIGIN) || href.startsWith(`${ORIGIN}/en`)) return href
  const pathPart = href.slice(ORIGIN.length) // '', '/', '/contact', …
  if (pathPart === '' || pathPart === '/') return `${ORIGIN}/en`
  return `${ORIGIN}/en${pathPart}`
}

let changed = 0
for (const file of htmlFiles(DIST)) {
  const en = isEnglish(file)
  let html = fs.readFileSync(file, 'utf8')
  const before = html

  // <html lang>
  const lang = en ? 'en' : 'nl-BE'
  html = /<html[^>]*\slang="[^"]*"/.test(html)
    ? html.replace(/(<html[^>]*\slang=")[^"]*(")/, `$1${lang}$2`)
    : html.replace('<html', `<html lang="${lang}"`)

  if (en) {
    // Self-referencing canonical for the English page.
    html = html.replace(
      /(<link[^>]*rel="canonical"[^>]*href=")([^"]*)(")/,
      (_m, p1, href, p3) => p1 + toEnglishCanonical(href) + p3,
    )
    // og:locale + its alternate.
    html = html
      .replace(/(<meta[^>]*property="og:locale"[^>]*content=")[^"]*(")/, `$1en_US$2`)
      .replace(/(<meta[^>]*property="og:locale:alternate"[^>]*content=")[^"]*(")/, `$1nl_BE$2`)
  } else {
    // Dutch pages: advertise English as the alternate (some views hard-coded nl_NL).
    html = html.replace(
      /(<meta[^>]*property="og:locale:alternate"[^>]*content=")[^"]*(")/,
      `$1en_US$2`,
    )
  }

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8')
    changed++
  }
}

console.log(`✅ Localised SEO tags in ${changed} file(s)`)
