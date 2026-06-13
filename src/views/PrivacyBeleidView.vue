<template>
  <BackgroundWeb>
    <PrivacyPolicy />
  </BackgroundWeb>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import BackgroundWeb from '@/components/BackgroundWeb.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'

useHead({
  title: 'Privacybeleid | Juke',
  meta: [
    {
      name: 'description',
      content:
        'Lees hoe Juke je persoonsgegevens verzamelt, gebruikt en beschermt, in overeenstemming met de GDPR.',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://jukecoding.be/privacybeleid' }],
})
</script>
