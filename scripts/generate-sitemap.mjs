import fs from 'node:fs'
import path from 'node:path'

import { staticPages, blogPages } from '../src/router/indexable-paths.js'

const SITE_URL = 'https://jukecoding.be'

// XML-escape interpolated text (titles, URLs). A raw & (e.g. "SaaS & AI") makes
// the sitemap invalid XML — browsers and Google reject it with
// "xmlParseEntityRef: no name".
const xmlEscape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// Canonical pages (static + published blog posts) come from the shared source of
// truth in src/router/indexable-paths.js, so the sitemap can never list a page
// that isn't prerendered (or omit one that is). `image.loc` is site-relative
// there; make it absolute for the sitemap.
const absImage = (image) => (image ? { ...image, loc: `${SITE_URL}${image.loc}` } : null)

const staticRoutes = staticPages.map((p) => ({ ...p, image: absImage(p.image) }))
const blogRoutes = blogPages.map((p) => ({ ...p, image: absImage(p.image) }))

const lastmod = new Date().toISOString().slice(0, 10)

// prefix_except_default: nl is unprefixed, en lives under /en (keep in sync with
// src/i18n). Each URL declares reciprocal hreflang alternates + x-default (nl).
const localePath = (routePath, locale) =>
  locale === 'nl' ? routePath : routePath === '/' ? '/en' : `/en${routePath}`

const alternateTags = (routePath) =>
  [
    { hreflang: 'nl-BE', loc: `${SITE_URL}${localePath(routePath, 'nl')}` },
    { hreflang: 'en', loc: `${SITE_URL}${localePath(routePath, 'en')}` },
    { hreflang: 'x-default', loc: `${SITE_URL}${localePath(routePath, 'nl')}` },
  ]
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xmlEscape(a.loc)}"/>\n`)
    .join('')

// One <url> per locale, each carrying the full set of alternates.
const toUrls = ({ path: routePath, date, changefreq, priority, image }) => {
  const imageTag = image
    ? `    <image:image>\n      <image:loc>${xmlEscape(image.loc)}</image:loc>\n      <image:title>${xmlEscape(image.title)}</image:title>\n    </image:image>\n`
    : ''
  const alternates = alternateTags(routePath)

  return ['nl', 'en'].map(
    (locale) =>
      `  <url>\n` +
      `    <loc>${xmlEscape(`${SITE_URL}${localePath(routePath, locale)}`)}</loc>\n` +
      `    <lastmod>${date || lastmod}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      alternates +
      imageTag +
      `  </url>`,
  )
}

const allUrls = [...staticRoutes, ...blogRoutes].flatMap(toUrls)

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n` +
  `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  allUrls.join('\n') +
  `\n</urlset>\n`

const outPath = path.resolve('public', 'sitemap.xml')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, xml, 'utf8')

const total = (staticRoutes.length + blogRoutes.length) * 2
console.log(`sitemap.xml gegenereerd (${total} urls, nl + en) -> ${outPath}`)
console.log(`   -> ${staticRoutes.length} statische pagina's × 2 locales`)
console.log(`   -> ${blogRoutes.length} blogposts × 2 locales`)
