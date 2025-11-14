/**
 * Modern CSS Mixins Plugin
 * Implements @mixin and @apply syntax inspired by native CSS mixins proposal
 */

import fs from 'fs'
import path from 'path'

const plugin = (opts = {}) => {
  const {
    mixinsDir = [],
    mixinsFiles = [],
    mixins: predefinedMixins = {},
  } = opts

  // Storage for defined mixins
  const mixins = new Map()

  // Load mixins from predefined object
  Object.entries(predefinedMixins).forEach(([name, content]) => {
    mixins.set(name, {
      params: [],
      content: createMixinFromString(content),
    })
  })

  return {
    postcssPlugin: 'postcss-mixins',

    // Load mixins from files during plugin initialization
    Once(root, helpers) {
      // console.log('[CSS Mixins] Plugin Once hook called')
      // console.log('[CSS Mixins] mixinsDir:', mixinsDir)
      // console.log('[CSS Mixins] mixinsFiles:', mixinsFiles)
      loadMixinsFromFiles(mixinsDir, mixinsFiles, mixins, helpers)
      // console.log('[CSS Mixins] Total mixins loaded:', mixins.size)
    },

    // Handle @mixin definitions
    AtRule: {
      mixin(atRule) {
        // Parse mixin name and parameters
        const mixinName = parseMixinName(atRule.params)
        const mixinParams = parseMixinParams(atRule.params)

        // Store the mixin content
        mixins.set(mixinName, {
          params: mixinParams,
          content: atRule.clone(),
        })

        // Remove the mixin definition from output
        atRule.remove()
      },

      apply(atRule) {
        // Parse apply call
        const { name, args } = parseApplyCall(atRule.params)

        // console.log(`[CSS Mixins] Applying mixin: --${name}`)
        // console.log(`[CSS Mixins] Available mixins:`, Array.from(mixins.keys()).map(k => `--${k}`))

        // Find the mixin
        const mixin = mixins.get(name)
        if (!mixin) {
          console.warn(`[CSS Mixins] Mixin "--${name}" is not defined. Available mixins: ${Array.from(mixins.keys()).map(k => `--${k}`).join(', ')}`)
          return
          // throw atRule.error(`Mixin "${name}" is not defined. Available mixins: ${Array.from(mixins.keys()).map(k => `--${k}`).join(', ')}`)
        }

        // Clone mixin content and process parameters
        const clonedContent = mixin.content.clone()

        // Replace parameters with arguments (using CSS custom properties)
        if (mixin.params.length > 0 && args.length > 0) {
          processParameters(clonedContent, mixin.params, args)
        }

        // Insert mixin content
        clonedContent.each((child) => {
          atRule.parent.insertBefore(atRule, child.clone())
        })

        // Remove the @apply rule
        atRule.remove()
      },
    },
  }
}

// Parse mixin name from parameters
function parseMixinName(params) {
  const match = params.match(/^--([a-zA-Z0-9-_]+)/)
  if (!match) {
    console.warn(`Invalid mixin name: ${params}`)
    return
    // throw new Error(`Invalid mixin name: ${params}`)
  }
  return match[1]
}

// Parse mixin parameters
function parseMixinParams(params) {
  const paramMatch = params.match(/\((.*?)\)/)
  if (!paramMatch) return []

  return paramMatch[1]
    .split(',')
    .map(param => param.trim())
    .filter(param => param.length > 0)
    .map((param) => {
      // Extract parameter name (CSS custom property format)
      const match = param.match(/^(--[a-zA-Z0-9-_]+)/)
      return match ? match[1] : param
    })
}

// Parse @apply call
function parseApplyCall(params) {
  const match = params.match(/^--([a-zA-Z0-9-_]+)(?:\((.*?)\))?/)
  if (!match) {
    console.warn(`Invalid apply syntax: ${params}`)
    // throw new Error(`Invalid apply syntax: ${params}`)
  }

  const name = match[1]
  const argsString = match[2] || ''
  const args = argsString
    .split(',')
    .map(arg => arg.trim())
    .filter(arg => arg.length > 0)

  return { name, args }
}

// Process parameters by replacing them with arguments
function processParameters(content, params, args) {
  content.walkDecls((decl) => {
    params.forEach((param, index) => {
      if (args[index]) {
        // Replace parameter with argument value
        const regex = new RegExp(`var\\(${escapeRegExp(param)}(?:,\\s*([^)]+))?\\)`, 'g')
        decl.value = decl.value.replace(regex, args[index])

        // Also replace direct parameter references
        const directRegex = new RegExp(escapeRegExp(param), 'g')
        decl.value = decl.value.replace(directRegex, args[index])
      }
    })
  })
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Load mixins from directories and glob patterns
function loadMixinsFromFiles(mixinsDir, mixinsFiles, mixins, helpers) {
  const { postcss } = helpers

  // Process directories
  const dirs = Array.isArray(mixinsDir) ? mixinsDir : [mixinsDir].filter(Boolean)
  dirs.forEach((dir) => {
    // console.log(`[CSS Mixins] Checking directory: ${dir}`)
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      // console.log(`[CSS Mixins] Found files in ${dir}:`, files)
      files.forEach((file) => {
        const ext = path.extname(file)
        if (ext === '.css' || ext === '.pcss') {
          const filePath = path.join(dir, file)
          // console.log(`[CSS Mixins] Loading mixins from: ${filePath}`)
          loadMixinsFromFile(filePath, mixins, postcss)
        }
      })
    }
    else {
      console.warn(`[CSS Mixins] Directory not found: ${dir}`)
    }
  })

  // Process files
  const files = Array.isArray(mixinsFiles) ? mixinsFiles : Array.from(mixinsFiles)
  files.forEach((filePath) => {
    loadMixinsFromFile(filePath, mixins, postcss)
  })
}

// Load mixins from a single CSS file
function loadMixinsFromFile(filePath, mixins, postcss) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const root = postcss.parse(content, { from: filePath })

    // Extract @mixin definitions from the file
    root.walkAtRules('mixin', (atRule) => {
      const mixinName = parseMixinName(atRule.params)
      const mixinParams = parseMixinParams(atRule.params)

      mixins.set(mixinName, {
        params: mixinParams,
        content: atRule.clone(),
      })
    })
  }
  catch (error) {
    console.warn(`Failed to load mixins from ${filePath}:`, error.message)
  }
}

// Create a mixin from a string (for predefined mixins)
function createMixinFromString(content) {
  // Simple implementation - wrap content in a temporary rule
  const postcss = require('postcss')
  const root = postcss.parse(`@mixin temp { ${content} }`)
  return root.first
}

// Mark as PostCSS 8 compatible
plugin.postcss = true

export default plugin
