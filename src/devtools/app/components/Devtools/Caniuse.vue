<script setup lang="ts">
interface Props {
  feature: string
}

const props = defineProps<Props>()

const show = ref(false)
const feat = ref(props.feature)

onMounted(() => {
  const id = 'caniuse-script'

  if (!document.getElementById(id)) {
    const script = document.createElement('script')
    script.async = true
    script.id = id
    script.onload = () => {
      show.value = true
    }
    script.src
      = 'https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js'

    document.body.appendChild(script)
  }
  else {
    show.value = true
  }
})
</script>

<template>
  <p
    v-show="show"
    :data-feature="feat"
    class="ciu_embed"
    data-periods="future_1,current,past_1,past_2"
    data-accessible-colours="false"
  >
    <a
      :href="'http://caniuse.com/#feat=' + feat"
      target="_blank"
      rel="noreferrer"
    >
      <NuxtImg
        :src="`https://caniuse.bitsofco.de/image/${feat}.webp`"
        :alt="`Data on support for the ${feat} feature across the major browsers from caniuse.com`"
        loading="lazy"
        format="webp"
      />
    </a>
  </p>
</template>
