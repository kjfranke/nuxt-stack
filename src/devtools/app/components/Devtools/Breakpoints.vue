<script setup lang="ts">
const breakpoint = ''
const breakpoints = []
const queries = []

const mediaQueries = computed(() => {
  const startsPattern = /\(min-width: ([\d.]+)(em)?\)/
  const stopsPattern = /\(max-width: ([\d.]+)(em)?\)/
  const pattern = /^\((min|max)-width: ([\d.]+)(em)?\)( and \((max)-width: ([\d.]+)(em)?\))?$/

  const uStarts = ['0']
  const uStops = []

  Object.keys(queries).forEach((breakpoint) => {
    const query = queries[breakpoint]
    let results = startsPattern.exec(query)

    if (results && !uStarts.includes(results[1])) {
      uStarts.push(results[1])
    }

    results = stopsPattern.exec(query)

    if (results && !uStops.includes(results[1])) {
      uStops.push(results[1])
    }
  })

  const starts = {}
  const stops = {}

  uStarts.sort().forEach((start, index) => {
    starts[start] = (100 / uStarts.length) * index
  })

  uStops.sort().forEach((stop, index) => {
    stops[stop] = (100 / uStarts.length) * ++index
  })

  return Object.keys(queries).map((breakpoint) => {
    const query = queries[breakpoint]
    const results = pattern.exec(query)

    const min
      = results[1] && results[2] && results[1] === 'min'
        ? starts[results[2]]
        : 0
    let max
      = results[1] && results[2] && results[1] === 'max'
        ? stops[results[2]]
        : 100
    max
      = results[5] && results[6] && results[5] === 'max'
        ? stops[results[6]]
        : max

    return {
      breakpoint,
      query,
      min,
      max,
      difference: max - min,
    }
  })
})
</script>

<template>
  <div class="breakpoints">
    <p>
      Current breakpoint: <b>{{ breakpoint }}</b>
    </p>

    <ul class="list-inline breakpoints__headings">
      <li
        v-for="(query, bp) in breakpoints"
        :key="bp"
        :class="{ 'breakpoints__heading--active': bp === breakpoint }"
        class="breakpoints__heading"
      >
        {{ bp }}
      </li>
    </ul>
    <div>
      <button
        v-for="(query, index) in mediaQueries"
        :key="index"
        :style="`left: ${query.min}%; width: ${query.difference}%;`"
        :class="query.breakpoint.replace('--', '')"
        type="button"
        class="query-line"
        @click="copyToClipboard(query.breakpoint)"
      >
        {{ query.breakpoint.replace('--', '') }}
      </button>
    </div>

    <dl>
      <template
        v-for="query in mediaQueries"
        :key="query.breakpoint"
      >
        <dt>
          <button
            type="button"
            @click="copyToClipboard(query.breakpoint)"
          >
            {{ query.breakpoint }}
          </button>
        </dt>
        <dd>{{ query.query }}</dd>
      </template>
    </dl>
  </div>
</template>

<style>
@import url('~layers/components/Devtools/Breakpoints.css');
</style>
