import fs from 'node:fs'
import path from 'node:path'

import { blogPosts } from '../src/data/blogs/index.js'
import { provincieSlugs } from '../src/data/provincies.js'
import { stadSlugs, stadData } from '../src/data/steden.js'

const SITE_URL = 'https://jukecoding.be'

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0', image: { loc: `${SITE_URL}/og-image.jpg`, title: 'JukeCoding - Webdesign & AI Automatisatie Hasselt' } },
  { path: '/webdesign', changefreq: 'weekly', priority: '0.8', image: { loc: `${SITE_URL}/og-image-webdesign.jpg`, title: 'Webdesign pakketten - JukeCoding' } },
  { path: '/ai-automatisatie', changefreq: 'weekly', priority: '0.8' },
  { path: '/gratis-seo-scan', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/website-die-klanten-oplevert', changefreq: 'monthly', priority: '0.7' },
  { path: '/locaties', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/offerte-aanvraag', changefreq: 'monthly', priority: '0.6' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
]

const provinceRoutes = provincieSlugs.map((slug) => ({ path: `/webdesign-${slug}`, changefreq: 'monthly', priority: '0.7' }))

const cityRoutes = stadSlugs.map((slug) => {
  const data = stadData[slug]
  const entry = { path: `/webdesign-${slug}`, changefreq: 'monthly', priority: '0.7' }
  if (data?.ogImage) {
    entry.image = {
      loc: `${SITE_URL}${data.ogImage}`,
      title: `Webdesign ${data.naam} - JukeCoding`,
    }
  }
  return entry
})

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

const toUrl = ({ path: routePath, date, changefreq, priority, image }) => {
  const loc = `${SITE_URL}${routePath}`
  const imageTag = image
    ? `    <image:image>\n      <image:loc>${image.loc}</image:loc>\n      <image:title>${image.title}</image:title>\n    </image:image>\n`
    : ''

  return (
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `    <lastmod>${date || lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    imageTag +
    `  </url>`
  )
}

const allUrls = [...staticRoutes, ...provinceRoutes, ...cityRoutes, ...blogRoutes].map(toUrl)

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  allUrls.join('\n') +
  `\n</urlset>\n`

const outPath = path.resolve('public', 'sitemap.xml')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, xml, 'utf8')

const total = staticRoutes.length + provinceRoutes.length + cityRoutes.length + blogRoutes.length
console.log(`sitemap.xml gegenereerd (${total} urls) -> ${outPath}`)
console.log(`   -> ${staticRoutes.length} statische pagina's`)
console.log(`   -> ${provinceRoutes.length} provinciepagina's`)
console.log(`   -> ${cityRoutes.length} locatiepagina's`)
console.log(`   -> ${blogRoutes.length} blogposts`)
