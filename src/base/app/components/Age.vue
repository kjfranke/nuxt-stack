<script setup lang="ts">
interface Props {
  year: number
}

const props = defineProps<Props>()

const age = computed((): number => {
  const date = new Date()
  date.setFullYear(props.year)

  return new Date().getFullYear() - date.getFullYear()
})
</script>

<template>
  <span>{{ age }}</span>
</template>
