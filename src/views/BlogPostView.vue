<template>
  <BackgroundWeb>
    <!-- Post niet gevonden -->
    <div v-if="!post" class="blog-not-found">
      <h1>Post niet gevonden</h1>
      <RouterLink to="/blog">← Terug naar blog</RouterLink>
    </div>

    <!-- Post gevonden -->
    <article v-else class="blog-post">
      <!-- Breadcrumb -->
      <nav class="blog-post__breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <span>›</span>
        <RouterLink to="/blog">Blog</RouterLink>
        <span>›</span>
        <span>{{ post.title }}</span>
      </nav>

      <!-- Header -->
      <header class="blog-post__header">
        <div class="blog-post__meta">
          <span class="blog-post__category">{{ post.category }}</span>
          <span class="blog-post__date">{{ formatDate(post.publishedAt) }}</span>
          <span class="blog-post__time">{{ post.readingTime }} min leestijd</span>
        </div>
        <h1 class="blog-post__title">{{ post.title }}</h1>
        <p class="blog-post__excerpt">{{ post.excerpt }}</p>
      </header>

      <!-- Content -->
      <div class="blog-post__content" v-html="post.content"></div>

      <!-- CTA onderaan -->
      <div class="blog-post__cta-block">
        <h3>Klaar om te starten?</h3>
        <p>Ontdek wat JukeCoding voor jouw bedrijf kan betekenen. Vraag gratis een offerte aan.</p>
        <RouterLink to="/offerte-aanvraag" class="blog-post__cta-btn">
          Gratis offerte aanvragen →
        </RouterLink>
      </div>

      <!-- Terug -->
      <RouterLink to="/blog" class="blog-post__back">← Alle blogposts</RouterLink>
    </article>
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import { blogPosts } from '@/data/blogs/index.js'

const route = useRoute()
const slug = computed(() => route.params.slug)
const post = computed(() => blogPosts.find(p => p.slug === slug.value && p.published) || null)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const canonicalUrl = computed(() => `https://jukecoding.be/blog/${slug.value}`)

useHead(() => {
  if (!post.value) {
    return {
      title: 'Post niet gevonden | JukeCoding',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  return {
    title: post.value.metaTitle || post.value.title,
    meta: [
      { name: 'description', content: post.value.metaDescription },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JukeCoding' },
      { name: 'keywords', content: Array.isArray(post.value.keywords) ? post.value.keywords.join(', ') : (post.value.keywords || '') },
      // OG
      { property: 'og:title', content: post.value.metaTitle || post.value.title },
      { property: 'og:description', content: post.value.metaDescription },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:image', content: `https://jukecoding.be${post.value.ogImage || '/og-image.jpg'}` },
      { property: 'og:image:alt', content: post.value.title },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'nl_BE' },
      { property: 'og:site_name', content: 'JukeCoding' },
      // Article specific
      { property: 'article:published_time', content: post.value.publishedAt },
      { property: 'article:modified_time', content: post.value.updatedAt || post.value.publishedAt },
      { property: 'article:author', content: 'JukeCoding' },
      { property: 'article:section', content: post.value.category },
      ...(Array.isArray(post.value.keywords) ? post.value.keywords.map(kw => ({ property: 'article:tag', content: kw })) : []),
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.value.metaTitle || post.value.title },
      { name: 'twitter:description', content: post.value.metaDescription },
      { name: 'twitter:image', content: `https://jukecoding.be${post.value.ogImage || '/og-image.jpg'}` },
      { name: 'twitter:image:alt', content: post.value.title },
    ],
    link: [{ rel: 'canonical', href: canonicalUrl.value }],
    script: [
      // Article schema
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${canonicalUrl.value}#article`,
          headline: post.value.title,
          description: post.value.metaDescription,
          url: canonicalUrl.value,
          datePublished: post.value.publishedAt,
          dateModified: post.value.publishedAt,
          inLanguage: 'nl-BE',
          author: {
            '@type': 'Organization',
            '@id': 'https://jukecoding.be/#organization',
            name: 'JukeCoding',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://jukecoding.be/#organization',
            name: 'JukeCoding',
            logo: {
              '@type': 'ImageObject',
              url: 'https://jukecoding.be/logo.png',
            },
          },
          image: {
            '@type': 'ImageObject',
            url: `https://jukecoding.be${post.value.ogImage || '/og-image.jpg'}`,
            width: 1200,
            height: 630,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl.value,
          },
        }),
      },
      // BreadcrumbList
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://jukecoding.be/blog' },
            { '@type': 'ListItem', position: 3, name: post.value.title, item: canonicalUrl.value },
          ],
        }),
      },
    ],
  }
})
</script>

<style scoped>
.blog-not-found {
  text-align: center;
  padding: 120px 24px;
  color: var(--color-text-primary);
}

.blog-not-found a {
  color: var(--color-accent);
  margin-top: 16px;
  display: inline-block;
}

.blog-post {
  max-width: 780px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  color: var(--color-text-secondary);
}

.blog-post__breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-text-tertiary);
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.blog-post__breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.blog-post__breadcrumb a:hover {
  color: var(--color-text-primary);
}

.blog-post__breadcrumb span:not(:last-child) {
  color: var(--color-text-tertiary);
}

.blog-post__header {
  margin-bottom: 48px;
}

.blog-post__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.blog-post__category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  background: var(--color-bg-sunken);
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
}

.blog-post__date,
.blog-post__time {
  font-size: 0.85rem;
  color: var(--color-text-tertiary);
}

.blog-post__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 20px;
  color: var(--color-text-primary);
}

.blog-post__excerpt {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
  border-left: 3px solid var(--color-border);
  padding-left: 16px;
}

/* Blog content styles */
.blog-post__content {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.blog-post__content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 48px 0 16px;
}

.blog-post__content :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 32px 0 12px;
}

.blog-post__content :deep(p) {
  margin: 0 0 20px;
}

.blog-post__content :deep(ul),
.blog-post__content :deep(ol) {
  margin: 0 0 20px;
  padding-left: 24px;
}

.blog-post__content :deep(li) {
  margin-bottom: 8px;
}

.blog-post__content :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
}

.blog-post__content :deep(strong) {
  color: var(--color-text-primary);
  font-weight: 600;
}

.blog-post__content :deep(code) {
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.blog-post__content :deep(pre) {
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  overflow-x: auto;
  margin: 0 0 20px;
}

.blog-post__content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.9rem;
}

.blog-post__content :deep(blockquote) {
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin: 0 0 20px;
  color: var(--color-text-secondary);
}

/* CTA block */
.blog-post__cta-block {
  background: var(--color-bg-sunken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 40px;
  margin: 64px 0 48px;
  text-align: center;
}

.blog-post__cta-block h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--color-text-primary);
}

.blog-post__cta-block p {
  color: var(--color-text-secondary);
  margin: 0 0 24px;
}

.blog-post__cta-btn {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: 700;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  text-decoration: none;
  box-shadow: var(--shadow-glow-accent);
  transition: background var(--duration-base) var(--ease-smooth),
              box-shadow var(--duration-base) var(--ease-smooth),
              transform var(--duration-base) var(--ease-spring);
}

.blog-post__cta-btn:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 0 50px var(--color-accent-glow);
  transform: translateY(-2px);
}

.blog-post__back {
  display: inline-block;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
}

.blog-post__back:hover {
  color: var(--color-text-primary);
}
</style>
