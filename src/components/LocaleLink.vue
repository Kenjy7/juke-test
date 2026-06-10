<!--
  Drop-in replacement for <router-link>, registered globally as `RouterLink` in
  main.js. It rewrites the `to` target to the active locale's path prefix, so
  every existing <router-link to="/contact"> automatically points to
  /en/contact while browsing in English — including in the prerendered (SSG)
  HTML, which is what keeps internal linking correct for SEO. No call sites
  needed changing.
-->
<script setup>
import { computed } from 'vue'
import { RouterLink as RouterLinkImpl } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { localizeTo } from '@/i18n/routing.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  to: { type: [String, Object], required: true },
})

const { locale } = useI18n()
const localizedTo = computed(() => localizeTo(props.to, locale.value))
</script>

<template>
  <RouterLinkImpl :to="localizedTo" v-bind="$attrs">
    <template #default="slotProps"><slot v-bind="slotProps" /></template>
  </RouterLinkImpl>
</template>
