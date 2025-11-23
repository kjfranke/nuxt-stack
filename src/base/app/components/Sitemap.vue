<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'

interface RouteMeta {
  sitemapOrder?: number
  title?: string
}

type RouteWithMeta = RouteRecordNormalized & { meta: RouteMeta }

const router = useRouter()

const sitemap = computed(() => {
  const routes = router.getRoutes() as RouteWithMeta[]

  return routes
    .filter(entry => entry.meta.sitemapOrder)
    .sort((a, b) => (a.meta.sitemapOrder ?? 0) - (b.meta.sitemapOrder ?? 0))
})
</script>

<template>
  <nav class="sitemap">
    <ul class="sitemap__list">
      <li
        v-for="entry in sitemap"
        :key="entry.path"
        class="sitemap__item"
      >
        <NuxtLink
          class="sitemap__link"
          :to="entry.path"
        >
          {{ entry.meta.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
@import url('~layers/components/Sitemap.css');
</style>
