<template>
  <BackgroundWeb>
    <CookiesPolicy />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import CookiesPolicy from '@/components/CookiesPolicy.vue'

useHead({
  title: 'Cookiebeleid | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Lees welke cookies Juke gebruikt, waarvoor ze dienen en hoe je je voorkeuren beheert, in overeenstemming met de GDPR.',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/cookies' }],
})
</script>

<style scoped lang="scss"></style>
