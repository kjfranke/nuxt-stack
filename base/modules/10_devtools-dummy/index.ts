import { defineNuxtModule, addComponentsDir, createResolver } from 'nuxt/kit'

export default defineNuxtModule({
  setup(_moduleOptions, nuxt) {
    const xsarusDevtools = nuxt?.options?.runtimeConfig?.public?.xsarusDevtools

    if (xsarusDevtools !== 'enabled') {
      const resolver = createResolver(import.meta.url)

      addComponentsDir({
        path: resolver.resolve('runtime/components'),
      })
    }
  },
})
