<script setup lang="ts">
definePageMeta({
  title: 'Home',
  pageClass: 'tpl-home',
  navigationOrder: 1,
  // description: home.value?.description,
})

useSeoMeta({
  title: 'Project',
  // description: home.value?.description,
})
</script>

<template>
  <div class="home-content">
    Home page test
  </div>
</template>

<style>
@import url('./index.css');
/* @import url('#layers/devtools/app/pages/design-system.css'); */
</style>
