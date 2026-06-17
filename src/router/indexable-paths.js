// Single source of truth for the canonical, indexable pages of the site.
//
// Three consumers used to each hardcode their own copy of this list and they
// drifted apart after the site revamp (launch pages missing from prerender, a
// redirect URL in the sitemap, dead routes prerendered as soft-404s):
//   • src/main.js          → vite-ssg `includedRoutes()` (what gets prerendered)
//   • vite.config.js       → ssgOptions.includedRoutes (same, belt-and-braces)
//   • scripts/generate-sitemap.mjs → sitemap.xml
//
// Keep this in sync with router/routes.js. ONLY canonical, indexable pages
// belong here — no redirects, no route aliases, no auth-gated pages. Paths are
// the default-locale (nl) form; `withLocales` derives the /en variants.
import { blogPosts } from '../data/blogs/index.js'

// Static canonical pages with their sitemap metadata, so the prerender list and
// the sitemap can never disagree on which pages exist. `image.loc` is a
// site-relative path; the sitemap builder prepends the origin.
export const staticPages = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    image: { loc: '/og-image.jpg', title: 'Juke — SaaS & AI studio Hasselt' },
  },
  { path: '/ai-projecten', changefreq: 'weekly', priority: '0.8' },
  { path: '/saas-development', changefreq: 'weekly', priority: '0.8' },
  { path: '/vibemind', changefreq: 'weekly', priority: '0.8' },
  { path: '/beheerly', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacybeleid', changefreq: 'yearly', priority: '0.3' },
]

// Published blog posts, in sitemap-ready shape.
export const blogPages = blogPosts
  .filter((post) => post.published)
  .map((post) => ({
    path: `/blog/${post.slug}`,
    date: post.publishedAt,
    changefreq: 'monthly',
    priority: '0.7',
    image: post.ogImage ? { loc: post.ogImage, title: post.title } : null,
  }))

// Every canonical nl path (static + blog posts) — the prerender/crawl set.
export const canonicalPaths = [...staticPages, ...blogPages].map((p) => p.path)

// Expand a list of nl paths into both locales: nl unprefixed, en under /en.
// Keep in sync with the prefix_except_default strategy in src/i18n/index.js.
export const withLocales = (paths) =>
  paths.flatMap((p) => [p, p === '/' ? '/en' : `/en${p}`])
