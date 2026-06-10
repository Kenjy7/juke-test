import { describe, expect, it } from 'vitest'

import { blogPosts } from '../src/data/blogs/index.js'

// blogPosts feeds both the sitemap generator and the SSG includedRoutes, so a
// malformed entry silently ships a broken/duplicate URL. These assert the shape
// the build relies on. They run over the published set where the field only
// matters for live pages, and over all posts where it matters regardless.

const published = blogPosts.filter((p) => p.published)

describe('blogPosts data integrity', () => {
  it('contains at least one published post (sitemap would be empty otherwise)', () => {
    expect(published.length).toBeGreaterThan(0)
  })

  it('has unique slugs across all posts', () => {
    const slugs = blogPosts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(blogPosts.map((p) => [p.slug, p]))('post "%s" has url-safe slug', (_slug, post) => {
    // Lowercase letters, digits and single hyphens only — anything else breaks
    // the /blog/:slug route and the generated <loc>.
    expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it.each(blogPosts.map((p) => [p.slug, p]))('post "%s" has the required string fields', (_slug, post) => {
    for (const field of ['title', 'metaTitle', 'metaDescription', 'excerpt', 'category', 'content']) {
      expect(typeof post[field], field).toBe('string')
      expect(post[field].trim().length, field).toBeGreaterThan(0)
    }
  })

  it.each(blogPosts.map((p) => [p.slug, p]))('post "%s" has a boolean published flag', (_slug, post) => {
    expect(typeof post.published).toBe('boolean')
  })

  it.each(published.map((p) => [p.slug, p]))(
    'published post "%s" has an ISO (YYYY-MM-DD) publishedAt that parses',
    (_slug, post) => {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(post.publishedAt))).toBe(false)
    },
  )

  it.each(published.map((p) => [p.slug, p]))(
    'published post "%s" has a positive integer readingTime',
    (_slug, post) => {
      expect(Number.isInteger(post.readingTime)).toBe(true)
      expect(post.readingTime).toBeGreaterThan(0)
    },
  )

  it.each(published.map((p) => [p.slug, p]))(
    'published post "%s" has a root-relative ogImage',
    (_slug, post) => {
      expect(typeof post.ogImage).toBe('string')
      expect(post.ogImage.startsWith('/')).toBe(true)
    },
  )

  it.each(blogPosts.map((p) => [p.slug, p]))('post "%s" keywords is a non-empty string array', (_slug, post) => {
    expect(Array.isArray(post.keywords)).toBe(true)
    expect(post.keywords.length).toBeGreaterThan(0)
    for (const kw of post.keywords) expect(typeof kw).toBe('string')
  })
})
