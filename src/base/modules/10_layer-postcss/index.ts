import { existsSync } from 'fs'
// import { globSync } from 'tinyglobby'

import {
  defineNuxtModule,
} from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'layer-postcss', // Usually the npm package name of your module
    compatibility: { // Compatibility constraints
      nuxt: '>=3.0.0', // Semver version of supported nuxt versions
    },
  },
  async setup(_moduleOptions, nuxt) {
    const layersCopy = [...nuxt.options._layers]
    const mixinsCollection = new Map()

    let mq = {}, mediaQueriesPath

    layersCopy.forEach((layer) => {
      const mqPath = `${layer.config.srcDir}/assets/css/tokens/media-queries.module.ts`
      if (existsSync(mqPath)) {
        mediaQueriesPath = mqPath
      }

      // const globPath = `${layer.config.srcDir}/assets/css/mixins/`
      // const globPattern = '**/*.css'

      // globSync(globPath + globPattern, {
      //   absolute: true,
      // }).forEach((absolutePath) => {
      //   const relativePath = absolutePath.replace(globPath, '')
      //   if (!mixinsCollection.has(relativePath)) {
      //     mixinsCollection.set(relativePath, absolutePath)
      //   }
      // })
    })

    if (mediaQueriesPath) {
      mq = (await import(mediaQueriesPath)).default || {}
    }

    if (nuxt.options.debug) {
      console.dir({ mq }, { depth: null, maxArrayLength: null })
      console.dir({ mixinsCollection: Array.from(mixinsCollection.values()) }, { depth: null, maxArrayLength: null })
    }

    if (!nuxt.options?.postcss) {
      nuxt.options.postcss = {
        plugins: {},
        order: [],
      }
    }

    if (!nuxt.options.postcss.plugins) {
      nuxt.options.postcss.plugins = {}
    }

    nuxt.options.postcss = {
      ...nuxt.options.postcss,
      plugins: {
        'postcss-custom-media-generator': mq, // must be before postcss-preset-env / postcss-custom-media
        // CSS Mixins plugin with configuration options
        // './modules/10_layets-postcss/mixins/index.js': {
        //   // Load mixins from directories (relative to project root where PostCSS runs)
        //   // mixinsDir: [],
        //   // Load mixins from specific files (relative to project root where PostCSS runs)
        //   mixinsFiles: Array.from(mixinsCollection.values()),
        //   // Predefined mixins (optional)
        //   // mixins: {},
        // },
        'postcss-preset-env': {
          // Optimize for better performance
          stage: 2,
          features: {
            'custom-properties': false, // Modern browsers support this natively
            'nesting-rules': true,
          },
        },
        'cssnano': {
          preset: [
            'default',
            {
              // Optimize CSS minification
              discardComments: { removeAll: true },
              minifySelectors: true,
              minifyFontValues: true,
              normalizeWhitespace: true,
            },
          ],
        }, // disabled in dev mode
      },
    }
  },
})
