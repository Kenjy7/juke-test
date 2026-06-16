<template>
  <BackgroundWeb>
    <NotFound />
  </BackgroundWeb>
</template>
<script setup>
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import NotFound from '@/components/NotFound.vue'

useHead({
  title: 'Pagina niet gevonden | Juke',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>
