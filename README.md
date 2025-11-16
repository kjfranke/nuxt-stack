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
# Install latest release
npm install github:kjfranke/nuxt-stack#v0.2.0

# Install from main branch (development)
npm install github:kjfranke/nuxt-stack
```

## Quick Start

1. **Install the package**:
   ```bash
   npm install github:kjfranke/nuxt-stack#v0.2.0
   ```

2. **Create or update `nuxt.config.ts`**:
   ```typescript
   export default defineNuxtConfig({
     extends: ['@kjfranke/nuxt-stack']
   })
   ```

3. **Copy environment variables** (optional):
   ```bash
   cp node_modules/@kjfranke/nuxt-stack/src/base/.env.dist .env
   ```

4. **Start developing**:
   ```bash
   npm run dev
   ```

## Examples

Check out the `examples/` directory in the [GitHub repository](https://github.com/kjfranke/nuxt-stack/tree/main/examples) for complete working examples:

- **[basic-project](examples/basic-project/)** - Full project example with custom configuration

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

### Environment Variables

The base layer supports configuration through environment variables. Copy the template to get started:

```bash
cp node_modules/@kjfranke/nuxt-stack/src/base/.env.dist .env
```

Available variables:

#### `NUXT_PUBLIC_DEVTOOLS_ENABLED`
- **Default**: disabled
- **Values**: `"enabled"` | disabled
- **Description**: Enable the optional devtools layer for design system development
- **Example**:
  ```env
  NUXT_PUBLIC_DEVTOOLS_ENABLED=enabled
  ```

#### `NUXT_PUBLIC_LANG`
- **Default**: `"en"`
- **Description**: Sets the HTML lang attribute
- **Example**:
  ```env
  NUXT_PUBLIC_LANG=nl
  ```

#### `VITE_ALLOWED_HOSTS`
- **Default**: empty
- **Description**: Comma-separated list of allowed dev server hosts
- **Example**:
  ```env
  VITE_ALLOWED_HOSTS=localhost,192.168.1.100
  ```

### Custom Alias: `~layers`

The stack includes a custom `~layers` alias that resolves imports across all Nuxt layers. This is especially useful for CSS imports:

```vue
<style>
/* Import CSS from any layer */
@import url('~layers/app/components/Header.css');
@import url('~layers/app/pages/index.css');
</style>
```

The alias automatically checks each layer for the file and returns the first match, making it easy to share styles across layers without worrying about relative paths.

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

## Troubleshooting

### Installation Issues

**Problem**: `ENOENT: spawn git` error when installing
- **Solution**: Use the full URL: `npm install git+https://github.com/kjfranke/nuxt-stack.git`
- **Cause**: Some environments don't support the `github:` shorthand

**Problem**: Missing dependencies in consuming project
- **Solution**: All required dependencies are included in the package's `dependencies` field and will be installed automatically
- **Note**: If you see missing packages, try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Build Issues

**Problem**: Module not found errors during build
- **Solution**: Run `npm run postinstall` or `nuxt prepare` to regenerate Nuxt's type definitions
- **Check**: Ensure your `nuxt.config.ts` extends the layer: `extends: ['@kjfranke/nuxt-stack']`

**Problem**: CSS imports not resolving
- **Solution**: Use the `~layers` alias for cross-layer CSS imports
- **Example**: `@import url('~layers/app/components/Header.css');`

### Development Issues

**Problem**: Changes to layer configuration not reflecting
- **Solution**: Clear `.nuxt` cache and restart dev server:
  ```bash
  rm -rf .nuxt node_modules/.cache
  npm run dev
  ```

**Problem**: Devtools layer not loading
- **Check**: Verify `NUXT_PUBLIC_DEVTOOLS_ENABLED=enabled` in your `.env` file
- **Note**: The devtools layer is disabled by default

## License

MIT © Keesjan Franke

## Repository

[GitHub Repository](https://github.com/kjfranke/nuxt-stack)

## Issues

Report issues at [GitHub Issues](https://github.com/kjfranke/nuxt-stack/issues)
