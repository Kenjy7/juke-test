import fs from 'node:fs'
import path from 'node:path'

import { blogPosts } from '../src/data/blogs/index.js'

const SITE_URL = 'https://jukecoding.be'

const staticRoutes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    image: {
      loc: `${SITE_URL}/og-image.jpg`,
      title: 'JukeCoding - Webdesign & AI Automatisatie Hasselt',
    },
  },
  { path: '/ai-automatisatie', changefreq: 'weekly', priority: '0.8' },
  { path: '/saas-development', changefreq: 'weekly', priority: '0.8' },
  { path: '/vibemind', changefreq: 'weekly', priority: '0.8' },
  { path: '/beheerly', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
]

const blogRoutes = blogPosts
  .filter((post) => post.published)
  .map((post) => ({
    path: `/blog/${post.slug}`,
    date: post.publishedAt,
    changefreq: 'monthly',
    priority: '0.7',
    image: post.ogImage ? { loc: `${SITE_URL}${post.ogImage}`, title: post.title } : null,
  }))

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
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.loc}"/>\n`)
    .join('')

// One <url> per locale, each carrying the full set of alternates.
const toUrls = ({ path: routePath, date, changefreq, priority, image }) => {
  const imageTag = image
    ? `    <image:image>\n      <image:loc>${image.loc}</image:loc>\n      <image:title>${image.title}</image:title>\n    </image:image>\n`
    : ''
  const alternates = alternateTags(routePath)

  return ['nl', 'en'].map(
    (locale) =>
      `  <url>\n` +
      `    <loc>${SITE_URL}${localePath(routePath, locale)}</loc>\n` +
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
