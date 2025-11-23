<template>
  <div class="devtools">
    <div class="container devtools__grid">
      <div
        v-for="i in 12"
        :key="i"
        class="devtools__grid-column"
      />
    </div>
  </div>
</template>

<style>
@import url('~layers/components/Devtools.css');
</style>
