<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'

interface RouteMeta {
  serviceOrder?: number
  title?: string
}

type RouteWithMeta = RouteRecordNormalized & { meta: RouteMeta }

const router = useRouter()

const navigation = computed(() => {
  const routes = router.getRoutes() as RouteWithMeta[]

  return routes
    .filter(entry => entry.meta.serviceOrder)
    .sort((a, b) => (a.meta.serviceOrder ?? 0) - (b.meta.serviceOrder ?? 0))
})
</script>

<template>
  <div class="service-menu">
    <NuxtLink
      v-for="entry in navigation"
      :key="entry.path"
      :to="entry.path"
    >
      {{ entry.meta.title }}
    </NuxtLink>
  </div>
</template>

<style>
@import url('~layers/components/ServiceMenu.css');
</style>
