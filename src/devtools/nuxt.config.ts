export default defineNuxtConfig({
  $meta: {
    name: 'devtools',
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['baseline-status'].includes(tag),
    },
  },
})
