<script setup lang="ts">
const route = useRoute()

interface RouteMeta {
  pageClass?: string
}

const pageClass = computed(() => (route.meta as RouteMeta)?.pageClass || 'tpl-cm')
</script>

<template>
  <div
    id="app"
    class="app"
    :class="pageClass"
  >
    <!-- <Header class="app__header" /> -->
    <main class="app__main main">
      <div class="container">
        Layout
        <div class="content__default">
          <slot />
        </div>
      </div>
    </main>
    <!-- <Footer class="app__footer" /> -->
  </div>
</template>

<style>
@import url('~layers/app/layouts/default.css');
</style>
