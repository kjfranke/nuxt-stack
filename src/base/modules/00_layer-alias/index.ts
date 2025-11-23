import { existsSync } from 'fs'

import {
  defineNuxtModule,
} from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'layer-alias', // Usually the npm package name of your module
    compatibility: { // Compatibility constraints
      nuxt: '>=4.0.0', // Semver version of supported nuxt versions
    },
  },
  setup(_moduleOptions, nuxt) {
    try {
      const layersCopy = [...nuxt.options._layers]

      nuxt.options.runtimeConfig.layers = layersCopy.map((layer) => {
        const name = layer?.config?.$meta?.name || layer.config.rootDir.replace('/src', '').split('/').at(-1)
        return {
          name,
          alias: `#layers/${name}`,
          rootDir: layer.config.rootDir,
          srcDir: layer.config.srcDir,
          serverDir: layer.config.serverDir,
        }
      })

      const customResolver = (source: string) => {
        let file = source

        if (source.includes('?')) {
          file = source.split('?')[0]
        }

        for (const layer of layersCopy) {
          const layerSource = source.replace(nuxt.options.rootDir, layer.config.rootDir) // can contain parameters
          const layerFile = file.replace(nuxt.options.rootDir, layer.config.rootDir)

          if (existsSync(layerFile)) {
            return layerSource
          }
        }

        return source
      }

      const extendAliases = (aliasConfig: any) => {
        // Preserve existing aliases (could be object or array)
        const existingAliases = Array.isArray(aliasConfig) ? [...aliasConfig] : []

        // If it's an object, convert to array while preserving entries
        if (!Array.isArray(aliasConfig)) {
          const extendAlias = ['@', '~', '@@', '~~', 'assets', 'public']
          for (const [find, replacement] of Object.entries(aliasConfig)) {
            const alias: any = {
              find,
              replacement,
            }

            if (extendAlias.includes(find)) {
              alias.customResolver = customResolver
            }

            existingAliases.push(alias)
          }
        }

        // Add custom "~~layers" alias with custom resolver
        existingAliases.push({
          find: '~~layers',
          replacement: nuxt.options.rootDir,
          customResolver,
        } as any)

        // Add custom "~layers" alias with custom resolver
        existingAliases.push({
          find: '~layers',
          replacement: nuxt.options.srcDir,
          customResolver,
        } as any)

        // Add workspace alias
        existingAliases.push({
          find: `~cwd`,
          replacement: nuxt.options.workspaceDir,
        } as any)

        return existingAliases
      }

      nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
        if (viteInlineConfig.resolve?.alias) {
          viteInlineConfig.resolve.alias = extendAliases(viteInlineConfig.resolve.alias)
        }
      })
    }
    catch (error) {
      console.error('Error in layer-alias module:', error)
    }
  },
})
