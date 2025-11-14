import compat from 'eslint-plugin-compat'
import withNuxt from './src/.nuxt/eslint.config.mjs'

/*
Nuxt override modules
- nuxt/javascript,
- nuxt/typescript/setup,
- nuxt/typescript/rules,
- nuxt/vue/setup,
- nuxt/vue/rules,
- nuxt/import/rules,
- nuxt/configs,
- nuxt/vue/single-root,
- nuxt/rules,
- nuxt/disables/routes,
- nuxt/import-globals
*/

export default withNuxt({
  // files: ['**/*.js', '**/*.ts', '**/*.vue'],
  ignores: ['src/*/analyze/*'],
})
  .append(
    compat.configs['flat/recommended'],
  )
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // XSARUS, give devs some slack in the trnaisition to TypeScript
    },
  })
  .override('nuxt/javascript', {
    rules: {
      'no-warning-comments': ['error', { terms: ['!commit'], location: 'anywhere' }], // XSARUS, prevent commit programmatically
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off', // Conflicts with Nuxt generated component names in sub dirs app/header (no multiword) becomes AppHeader (multiword)
    },
  })
