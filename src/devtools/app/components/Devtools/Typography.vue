<script setup lang="ts">
import fonts from '../generated/fonts.json'
</script>

<template>
  <ul
    class="list-unstyle"
    style="font-size: 2rem;"
  >
    <li
      v-for="font in fonts"
      :key="font"
      :style="`font-family: ${font.family}; font-weight: ${font.weight}; font-style: ${font.style};`"
    >
      {{ font.family }}
      {{ font.weight }}
      {{ font.style }}
    </li>
  </ul>
</template>
