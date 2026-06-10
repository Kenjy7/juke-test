<template>
  <BackgroundWeb>
    <section class="blog-hero">
      <h1 class="blog-hero__title">{{ t('blogView.hero.title') }}</h1>
      <p class="blog-hero__sub">
        {{ t('blogView.hero.sub') }}
      </p>
      <p class="blog-hero__intro">
        {{ t('blogView.hero.intro') }}
      </p>
    </section>

    <section class="blog-grid">
      <article v-for="post in publishedPosts" :key="post.slug" class="blog-card">
        <div class="blog-card__meta">
          <span class="blog-card__category">{{ post.category }}</span>
          <span class="blog-card__time"
            >{{ post.readingTime }} {{ t('blogView.card.readingTime') }}</span
          >
        </div>
        <h2 class="blog-card__title">
          <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
        </h2>
        <p class="blog-card__excerpt">{{ post.excerpt }}</p>
        <RouterLink :to="`/blog/${post.slug}`" class="blog-card__cta">
          {{ t('blogView.card.readMore') }}
        </RouterLink>
      </article>
    </section>
  </BackgroundWeb>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import { blogPosts } from '@/data/blogs/index.js'

const { t } = useI18n()

const publishedPosts = computed(() =>
  [...blogPosts]
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
)

useHead(() => ({
  title: "Blog over Webdesign & AI voor KMO's | JukeCoding",
  meta: [
    {
      name: 'description',
      content:
        'Praktische tips over websites, lokale SEO en AI voor KMO en zelfstandigen in Belgie. Duidelijk, toepasbaar en gericht op meer groei.',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'keywords',
      content:
        'webdesign blog Belgie, SEO tips KMO, AI automatisatie nieuws, website tips zelfstandigen, online groeien Vlaanderen',
    },
    { name: 'author', content: 'JukeCoding' },
    { property: 'og:title', content: "Blog over Webdesign & AI voor KMO's | JukeCoding" },
    {
      property: 'og:description',
      content:
        'Tips over websites, lokale SEO en AI voor Belgische KMO en zelfstandigen die online slimmer willen groeien.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://jukecoding.be/blog' },
    { property: 'og:image', content: 'https://jukecoding.be/og-image.jpg' },
    {
      property: 'og:image:alt',
      content: 'JukeCoding blog over webdesign en AI voor KMO in Belgie',
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:site_name', content: 'JukeCoding' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog | Webdesign & AI tips voor KMO | JukeCoding' },
    {
      name: 'twitter:description',
      content: 'Tips over websites, lokale SEO en AI voor Belgische KMO en zelfstandigen.',
    },
    { name: 'twitter:image', content: 'https://jukecoding.be/og-image.jpg' },
    { name: 'twitter:image:alt', content: 'JukeCoding blog - webdesign en AI voor KMO in Belgie' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/blog' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': 'https://jukecoding.be/blog#blog',
        url: 'https://jukecoding.be/blog',
        name: 'Blog over Webdesign en AI Automatisatie voor KMO in Belgie',
        description:
          'Praktische tips over websites, lokale SEO en AI voor KMO en zelfstandigen in Belgie.',
        inLanguage: 'nl-BE',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://jukecoding.be/#organization',
          name: 'JukeCoding',
        },
        blogPost: publishedPosts.value.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `https://jukecoding.be/blog/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `https://jukecoding.be/blog/${post.slug}`,
          datePublished: post.publishedAt,
          author: { '@type': 'Organization', '@id': 'https://jukecoding.be/#organization' },
          ...(post.ogImage
            ? {
                image: {
                  '@type': 'ImageObject',
                  url: `https://jukecoding.be${post.ogImage}`,
                  width: 1200,
                  height: 630,
                },
              }
            : {}),
        })),
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jukecoding.be/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://jukecoding.be/blog' },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Blogposts over webdesign en AI',
        url: 'https://jukecoding.be/blog',
        itemListElement: publishedPosts.value.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://jukecoding.be/blog/${post.slug}`,
          name: post.title,
        })),
      }),
    },
  ],
}))
</script>

<style scoped>
.blog-hero {
  text-align: center;
  padding: 80px 24px 48px;
}

.blog-hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.blog-hero__sub {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto 18px;
}

.blog-hero__intro {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  max-width: 760px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.blog-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.blog-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blog-card__category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  background: var(--color-bg-sunken);
  padding: 4px 10px;
  border-radius: 999px;
}

.blog-card__time {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
}

.blog-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
}

.blog-card__title a {
  color: var(--color-text-primary);
  text-decoration: none;
}

.blog-card__title a:hover {
  text-decoration: underline;
}

.blog-card__excerpt {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  flex: 1;
}

.blog-card__cta {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  margin-top: 8px;
}

.blog-card__cta:hover {
  text-decoration: underline;
}
</style>
