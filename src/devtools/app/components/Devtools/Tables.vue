<script setup lang="ts">
const shipment = 15
const records = [
  {
    aantal: Math.round(Math.random(1, 19) * 100),
    prijs: Math.round(Math.random(1, 9999) * 10000) / 100,
  },
  {
    aantal: Math.round(Math.random(1, 19) * 100),
    prijs: Math.round(Math.random(1, 9999) * 10000) / 100,
  },
  {
    aantal: Math.round(Math.random(1, 19) * 100),
    prijs: Math.round(Math.random(1, 9999) * 10000) / 100,
  },
]

const subtotaal = computed(() => {
  let total = 0

  records.forEach((record) => {
    total += record.prijs * record.aantal
  })

  return total
})

const _totaal = computed(() => {
  return subtotaal.value + shipment
})
</script>

<template>
  <div>
    <h3>Table - Default</h3>
    <table class="">
      <caption class="table-caption">
        Meer informatie
      </caption>
      <tbody>
        <tr>
          <th>
            Activity
          </th>
          <td>
            Yoga, Gym
          </td>
        </tr>
        <tr>
          <th>
            Geslacht
          </th>
          <td>
            Men, Women, Unisex
          </td>
        </tr>
        <tr>
          <th>
            Categorie
          </th>
          <td>
            Exercise
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
