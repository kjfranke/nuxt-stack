// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from 'std-env'

const config = defineNuxtConfig({
  $meta: {
    name: 'nuxt-stack',
  },
  // extends: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED === 'enabled'
  //   ? [
  //       '../devtools',
  //     ]
  //   : [],
  modules: [
    '@nuxt/hints',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-vitalizer',
  ],
  icon: {
    class: 'icon',
    cssLayer: 'base',
    cssSelectorPrefix: '',
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons',
        recursive: true,
      },
    ],
  },
  // fonts: {
  //   families: [
  //     { name: 'Roboto', provider: 'google', weights: [400] },
  //     { name: 'Shadows Into Light', provider: 'google', weights: [400] },
  //   ],
  // },
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  devServer: {
    port: 9229,
  },
  vite: {
    server: {
      allowedHosts: process.env.VITE_ALLOWED_HOSTS?.split(',') || [],
    },
    build: {
      cssCodeSplit: true,
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // More aggressive code splitting for better caching and smaller initial bundles
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              // Split Vue and Nuxt core separately
              if (id.includes('vue-router')) return 'vue-router'
              if (id.includes('vue')) return 'vue'
              // Other vendor code
              return 'vendor'
            }
          },
        },
      },
    },
    // Enable esbuild optimizations
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      }
    },
    inlineSSRStyles: true,
    payloadExtraction: false, // Reduce inline data in HTML
    componentIslands: true, // Enable component islands for better code splitting
  },
  router: {
    options: {
      // Improve route-based code splitting
      strict: false,
    },
  },
  eslint: {
    checker: false,
    config: {
      stylistic: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: process.env.NUXT_PUBLIC_LANG || 'en',
      },
      title: 'Project',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'dns-prefetch', href: 'https://api.netlify.com' },
      ],
    },
    layoutTransition: false,
    pageTransition: false,
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  vitalizer: {
    // Disable prefetch for dynamic imports (enabled by default)
    disablePrefetchLinks: 'dynamicImports',
    // Remove render-blocking entry CSS (since we inline styles)
    disableStylesheets: 'entry',
  },
  image: {
    // Uses IPX (Sharp) in dev, Netlify CDN in production automatically
    provider: 'ipx',
    format: ['avif', 'webp', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  }
})

export default config
