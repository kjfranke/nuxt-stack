# @kjfranke/nuxt-stack

A production-ready Nuxt 4 foundation layer with performance optimizations, modern tooling, and security best practices built-in. Extend this stack via Nuxt layers to kickstart your projects with a solid foundation.

## Features

### 🚀 Performance Optimizations
- Advanced code splitting and tree shaking
- Inline critical CSS with `experimental.inlineSSRStyles`
- Optimized chunk splitting for Vue, Vue Router, and vendor code
- Component islands for better code splitting
- Compressed public assets with Nitro
- Vitalizer integration for optimal resource loading

### 🎨 Modern Tooling
- **[@nuxt/fonts](https://github.com/nuxt/fonts)** - Automatic font optimization
- **[@nuxt/icon](https://github.com/nuxt/icon)** - Icon management with Iconify
- **[@nuxt/image](https://github.com/nuxt/image)** - Automatic image optimization (AVIF, WebP, JPEG)
- **[@nuxt/eslint](https://github.com/nuxt/eslint)** - ESLint integration with stylistic rules
- **[nuxt-vitalizer](https://github.com/harlan-zw/nuxt-vitalizer)** - Resource hints optimization

### 🔒 Security
- Netlify deployment configuration with security headers
- Content Security Policy (CSP)
- HSTS, X-Frame-Options, and other security headers
- XSS protection

### 🎯 Developer Experience
- TypeScript support
- ESLint with browser compatibility checking
- Stylelint for CSS/Vue styles
- PostCSS with preset-env
- Browserslist integration
- Husky + lint-staged for pre-commit hooks
- Custom Nuxt modules included

## Installation

Install directly from GitHub:

```bash
npm install github:kjfranke/nuxt-stack#main
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "@kjfranke/nuxt-stack": "github:kjfranke/nuxt-stack#main"
  }
}
```

### Install Specific Version

```bash
# Install from specific tag
npm install github:kjfranke/nuxt-stack#v0.1.0

# Install from main branch (latest)
npm install github:kjfranke/nuxt-stack
```

## Usage

### As a Nuxt Layer

In your project's `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],

  // Override or extend the base configuration
  app: {
    head: {
      title: 'My Awesome Project',
      meta: [
        { name: 'description', content: 'My project description' }
      ]
    }
  }
})
```

> **Note**: When installing from GitHub, the package name in `extends` remains `@kjfranke/nuxt-stack` as defined in package.json.### Project Structure

Your project only needs to include project-specific code:

```
my-project/
├── nuxt.config.ts          # Extends @kjfranke/nuxt-stack
├── package.json
├── pages/                  # Your pages
├── components/             # Your components
├── assets/                 # Your assets
└── public/                 # Your public files
```

The base layer provides:
- `src/base/nuxt.config.ts` - Base Nuxt configuration
- `src/base/modules/` - Custom Nuxt modules
  - `10_devtools-dummy/` - Conditional devtools components
  - `10_layer-postcss/` - PostCSS configuration
- `src/base/app/app.vue` - Base app template
- `src/base/assets/` - Base CSS and icons
- Configuration files (ESLint, Stylelint, TypeScript, Browserslist)

## Configuration

### Image Optimization

The stack uses `@nuxt/image` with IPX in development and Netlify CDN in production:

```typescript
// Already configured, but you can override:
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],
  image: {
    quality: 90, // Override default 80
  }
})
```

### Icon Configuration

Custom icons can be added to your project's `assets/icons/` directory:

```typescript
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/icons',
      }
    ]
  }
})
```

### Fonts

Uncomment and configure in your project:

```typescript
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 700] }
    ]
  }
})
```

## Deployment

### Netlify

The stack includes a `netlify.toml` with:
- Security headers (CSP, HSTS, etc.)
- Optimized build settings
- Development server configuration

Customize the `netlify.toml` in your project or extend the provided one.

### Build Commands

```bash
# Development
npm run dev          # Netlify dev server
npm run dev:nuxt     # Nuxt dev server only

# Production
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## Requirements

- Node.js >= 24.0.0
- npm >= 11.0.0

## Extending the Layer

You can layer multiple configurations:

```typescript
export default defineNuxtConfig({
  extends: [
    '@kjfranke/nuxt-stack',
    './custom-layer'  // Your additional layer
  ]
})
```

## Scripts

The package includes these npm scripts:
- `lint` - Run lint-staged
- `lint:all` - Lint all JavaScript and CSS
- `lint:js` - ESLint only
- `lint:style` - Stylelint only
- `browserslist` - Update browser support list

## License

MIT © Keesjan Franke

## Repository

[GitHub Repository](https://github.com/kjfranke/nuxt-stack)

## Issues

Report issues at [GitHub Issues](https://github.com/kjfranke/nuxt-stack/issues)
