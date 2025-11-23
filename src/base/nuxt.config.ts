// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from 'std-env'

export default defineNuxtConfig({
  extends: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED === 'enabled'
    ? [
        '../devtools',
      ]
    : [],
  modules: [
    '@nuxtjs/seo',
    '@nuxt/hints',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-vitalizer',
    'nuxt-security',
  ],
  $meta: {
    name: 'nuxt-stack',
  },
  // fonts: {
  //   families: [
  //     { name: 'Roboto', provider: 'google', weights: [400] },
  //     { name: 'Shadows Into Light', provider: 'google', weights: [400] },
  //   ],
  // },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: process.env.NUXT_PUBLIC_LANG || 'en',
      },
      title: 'Project',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'dns-prefetch', href: 'https://api.netlify.com' },
      ],
    },
    layoutTransition: false,
    pageTransition: false,
  },
  router: {
    options: {
      // Improve route-based code splitting
      strict: false,
    },
  },
  site: {
    // Site URL and name should be configured via environment variables in consuming projects
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: process.env.NUXT_PUBLIC_SITE_NAME || 'Nuxt Stack',
  },
  devServer: {
    port: 9229,
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
    payloadExtraction: false, // Reduce inline data in HTML
    componentIslands: true, // Enable component islands for better code splitting
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    compressPublicAssets: true,
    minify: true,
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
  eslint: {
    checker: false,
    config: {
      stylistic: true,
    },
  },
  icon: {
    class: 'icon',
    cssLayer: 'base',
    cssSelectorPrefix: '',
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons',
      },
    ],
  },
  image: {
    // Uses IPX (Sharp) in dev, Netlify CDN in production automatically
    provider: 'ipx',
    format: ['avif', 'webp', 'jpeg'],
    quality: 80,
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },
  robots: {
    // Block AI bots from scraping content
    blockAiBots: true,
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ['\'self\''],
        'base-uri': ['\'none\''],
        'object-src': ['\'none\''],
        'script-src': ['\'self\'', '\'unsafe-inline\''], // unsafe-inline needed for Nuxt
        'style-src': ['\'self\'', '\'unsafe-inline\''], // unsafe-inline needed for Nuxt
        'connect-src': ['\'self\'', 'https://api.iconify.design'],
        'img-src': ['\'self\'', 'data:'],
        'frame-src': ['https:'],
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'SAMEORIGIN',
      xXSSProtection: '1; mode=block',
      permissionsPolicy: {
        geolocation: [],
      },
    },
  },
  sitemap: {
    // Sitemap configuration for static sites
  },
  vitalizer: {
    // Disable prefetch for dynamic imports (enabled by default)
    disablePrefetchLinks: 'dynamicImports',
    // Remove render-blocking entry CSS (since we inline styles)
    disableStylesheets: 'entry',
  },
})
