<script setup lang="ts">
import colors from '../generated/colors'

interface ColorItem {
  name: string
  value: string
}

interface ColorGroup {
  name: string
  colors: ColorItem[]
}

const groups: Record<string, ColorGroup> = {}

Object.keys(colors).forEach((name: string) => {
  const value = colors[name as keyof typeof colors]
  const group = name.split('-')[3] || 'default'

  if (!groups[group]) {
    groups[group] = { name: group, colors: [] }
  }

  groups[group].colors.push({
    name,
    value,
  })
})
</script>

<template>
  <div class="styleguide-colors">
    <div
      v-for="group in groups"
      :key="group.name"
    >
      <strong>{{ group.name }}</strong>
      <ul class="list-unstyle styleguide-colors__list">
        <li
          v-for="color in group.colors"
          :key="color.name"
        >
          <button
            type="button"
            class="copy"
            @click="copyToClipboard(color.name)"
          >
            <div
              class="styleguide-colors__color"
              :style="`background-color: var(${color.name});`"
            />
            <div class="styleguide-colors__label">
              <span class="styleguide-colors__label-name">
                {{ color.name }}</span>
              <span
                :data-color="color.value"
                class="styleguide-colors__label-color"
              />
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
@import url('~layers/components/Devtools/Colors.css');
</style>
