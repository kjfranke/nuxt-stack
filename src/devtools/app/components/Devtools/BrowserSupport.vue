<script setup lang="ts">
// import broswerlist from '../../../.browserslistrc'
//
// console.log('broswerlist', broswerlist);

interface Country {
  code: string
  checked: boolean
}

const broswerlist = '>= 2% in NL' // Read data from browserlist config
const countryCodes = [
  // As of 11-01-2020:
  'alt-eu', // IE11: 1.80%  >> cover 90% in alt-eu and not dead ??
  'NL', // IE11: 1.62%
  'BE', // IE11: 2.03%
  'LU', // IE11: 1.32% IE8: 1.44%
  'GB', // IE11: 1.15%
  'DE', // IE11: 1.67%
  'FR', // IE11: 0.93%
]

const countries = ref<Country[]>(countryCodes.map((country) => {
  return {
    code: country,
    checked: broswerlist.includes(country),
  }
}))

const query = computed(() => {
  // console.log(countries.value)

  return encodeURI(countries.value.filter(country => country.checked).map(country => '>= 2% in ' + country.code).join(', '))
})

const updateBrowserlist = (data: Country) => {
  countries.value = countries.value.map((country) => {
    if (country.code === data.code) {
      country.checked = !country.checked
    }
    return country
  })
}
</script>

<template>
  <div class="browserlist">
    <ul>
      <li
        v-for="country in countries"
        :key="country.code"
      >
        <input
          :checked="country.checked"
          type="checkbox"
          @change="updateBrowserlist(country)"
        >
        {{ country }}
      </li>
    </ul>

    {{ query }}

    <iframe
      :src="`https://browserl.ist/?q=${query}`"
      loading="lazy"
      class="browserlist__iframe"
    />
  </div>
</template>

<style>
@import url('~layers/components/Devtools/BrowserSupport.css');
</style>
