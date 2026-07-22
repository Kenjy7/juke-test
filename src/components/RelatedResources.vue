<template>
  <section v-if="items.length" class="resources" :aria-label="heading">
    <div class="resources__inner">
      <h2 class="resources__title">{{ heading }}</h2>
      <ul class="resources__list">
        <li v-for="item in items" :key="item.slug">
          <!-- global RouterLink is overridden with LocaleLink → auto-localized -->
          <router-link :to="`/blog/${item.slug}`" class="resources__link">
            <span class="resources__link-text">{{ item.title }}</span>
            <svg class="resources__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { blogPosts } from '@/data/blogs/index.js'

// A compact "read more" block that links a money page to its supporting blog
// posts — builds the topical cluster (money page ↔ blog) and helps crawlers
// discover the posts. Pass the slugs; titles are pulled live from the blog
// index so they never drift out of sync.
const props = defineProps({
  slugs: { type: Array, required: true },
})

const { locale } = useI18n()

const heading = computed(() => (locale.value === 'en' ? 'Read more' : 'Meer lezen'))

const items = computed(() =>
  props.slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug && p.published))
    .filter(Boolean)
    .map((p) => ({ slug: p.slug, title: p.title })),
)
</script>

<style scoped lang="scss">
.resources { padding: 0 var(--space-8) var(--space-16); }
.resources__inner {
  max-width: var(--max-width-cta); margin: 0 auto;
  border-top: 1px solid var(--color-border); padding-top: var(--space-10);
}
.resources__title {
  font-size: var(--text-h3); font-weight: var(--weight-semibold);
  color: var(--color-text-primary); margin: 0 0 var(--space-6);
  letter-spacing: var(--tracking-tight);
}
.resources__list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }
.resources__link {
  display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  background: var(--color-bg-sunken); text-decoration: none;
  color: var(--color-text-primary);
  transition:
    border-color var(--duration-base) var(--ease-smooth),
    transform var(--duration-base) var(--ease-smooth);
}
.resources__link:hover { border-color: var(--color-accent); transform: translateY(-2px); }
.resources__link-text {
  font-size: var(--text-body); font-weight: var(--weight-medium); line-height: var(--leading-snug);
}
.resources__icon { width: 16px; height: 16px; flex-shrink: 0; color: var(--color-accent); }

@media (max-width: 768px) {
  .resources { padding: 0 var(--space-5) var(--space-12); }
}
</style>
