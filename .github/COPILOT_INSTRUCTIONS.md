# GitHub Copilot Instructions

> **IMPORTANT**: This is a living document. Always update this file when you learn something significant about this Nuxt stack boilerplate. Remove outdated information and keep instructions current with the latest patterns and best practices discovered during development.

## Project Overview

This is **@kjfranke/nuxt-stack** - a reusable Nuxt 4 base layer distributed as an npm package. This is NOT a full project, but a foundation that other projects extend via Nuxt layers.

### Key Characteristics
- **Package name**: `@kjfranke/nuxt-stack`
- **Purpose**: Reusable Nuxt layer with performance optimizations and modern tooling
- **Main export**: `src/base/nuxt.config.ts`
- **Usage**: Other projects extend this via `extends: ['@kjfranke/nuxt-stack']`
- **Repository**: https://github.com/kjfranke/nuxt-stack

### What's Included in the Package
- `src/base/` - The core Nuxt layer (configurations, modules, base app structure)
- README, LICENSE, CHANGELOG for documentation

### What's NOT in the Package (Reference Only)
- Project-specific configs (netlify.toml, eslint.config.mjs, stylelint.config.mjs)
- These are available in the GitHub repo for users to reference and copy if needed
- Development scripts and tools

## Documentation Lookup Strategy

When answering questions or implementing features related to the following frameworks/libraries, **always check Context7 documentation first** before providing answers:

### Required Context7 Lookups

1. **Nuxt** - For all Nuxt-related questions, routing, configuration, composables, etc.
   - Use library ID: `/websites/nuxt-4.x` for Nuxt 4
   - Use library ID: `/nuxt/nuxt` for general Nuxt docs

2. **Vue** - For Vue 3 component patterns, reactivity, composition API, etc.
   - Check Context7 for latest Vue documentation

3. **Vite** - For build configuration, plugins, optimization, etc.
   - Check Context7 for Vite documentation

4. **Nitro** - For server-side functionality, API routes, route rules, etc.
   - Check Context7 for Nitro documentation

5. **TypeScript** - For TypeScript configuration and typing issues
   - Check Context7 for TypeScript documentation

### Workflow

1. When asked about any of these technologies, resolve the library ID using `mcp_context7_resolve-library-id`
2. Fetch documentation using `mcp_context7_get-library-docs` with relevant topic keywords
3. Use the retrieved documentation to provide accurate, up-to-date answers
4. Apply solutions based on the official documentation patterns

### Project Context

- This is a **Nuxt 4 base layer package** (`@kjfranke/nuxt-stack`)
- Using **TypeScript**
- Server powered by **Nitro**
- Build tool: **Vite**
- Framework: **Vue 3**
- **Image optimization**: `@nuxt/image` module (AVIF format prioritized)
- **Font management**: `@nuxt/fonts` module
- **Icon system**: `@nuxt/icon` module with support for custom local SVG icons
- **Performance**: `nuxt-vitalizer` for resource hints optimization
- **Base structure**: Minimal app.vue, custom modules, and optimized configurations

### Why This Matters

- Ensures answers are based on current, official documentation
- Prevents outdated or incorrect advice
- Provides authoritative code examples from official sources
- Reduces errors from API changes between versions

---

## Base Layer Patterns

> **Note**: The patterns below describe the base layer structure. Consumer projects extending this layer may have different patterns for pages, components, and forms specific to their use case.

### Vue Component Patterns

#### 1. Script Setup with TypeScript
**Base layer components use TypeScript with `<script setup lang="ts">`**

```vue
<script setup lang="ts">
// Component logic here
</script>
```

#### 2. Page Meta Definition
**All pages use `definePageMeta()` for page-level configuration**

```vue
<script setup lang="ts">
definePageMeta({
  title: 'Page Title',
  pageClass: 'tpl-custom-class',  // Optional: custom page class
  navigationOrder: 1,              // Optional: navigation menu order
  navigationParent: 'parent-key',  // Optional: nested navigation
  sitemapOrder: 1,                 // Optional: sitemap order
})
</script>
```

#### 3. SEO Meta
**All pages use `useSeoMeta()` for SEO configuration**

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',  // Optional
})
</script>
```

#### 4. Props with TypeScript Interface
**Use TypeScript interfaces for component props**

```vue
<script setup lang="ts">
interface Props {
  year: number
  title?: string  // Optional props
}

const props = defineProps<Props>()
</script>
```

#### 5. Composables Pattern
**Use Vue 3 Composition API patterns**

```vue
<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const computed = computed(() => {
  // computed logic
})

const someRef = ref<Type>(initialValue)
</script>
```

#### 6. Component Imports
**Import components explicitly when needed (or rely on auto-imports)**

```vue
<script setup lang="ts">
import Logo from './Logo.vue'
import Navigation from './Navigation.vue'
</script>
```

#### 7. CSS Architecture Pattern
**CSS files are extracted and imported using aliases (pattern provided by base layer)**

**Note**: This is a recommended pattern. Consumer projects may organize CSS differently.

**Component CSS Import:**
```vue
<style>
@import url('~/components/ComponentName.css');
</style>
```

**Page CSS Import:**
```vue
<style>
@import url('~/pages/pagename.css');
</style>
```

**Layout CSS Import:**
```vue
<style>
@import url('~/layouts/layoutname.css');
</style>
```

**Global Assets Import (app.vue):**
```vue
<style>
@import url("~/assets/css/vars.css");
@import url("~/assets/css/root.css");
@import url("~/assets/css/text.css");
/* etc. */
</style>
```

**CSS File Structure:**
- Each Vue component can have a corresponding `.css` file in the same directory
- Use `~` alias for imports (resolves to consumer project's app directory)
- CSS files can use CSS custom properties (CSS variables)
- Custom PostCSS module provided: `src/base/modules/10_layer-postcss/`

**Example Component Structure:**
```
src/base/components/
├── Example.vue          # Component template and logic
└── Example.css          # Component styles
```

### Base Layer Structure

#### 8. Layout Pattern
**Layout uses route meta for dynamic classes**

```vue
<script setup lang="ts">
const route = useRoute()

interface RouteMeta {
  pageClass?: string
}

const pageClass = computed(() =>
  (route.meta as RouteMeta)?.pageClass || 'tpl-cm'
)
</script>

<template>
  <div :class="pageClass">
    <slot />
  </div>
</template>
```

### Base Layer Structure

```
src/base/
├── nuxt.config.ts       # Main layer configuration (exported to consumers)
├── app/
│   ├── app.vue          # Minimal base app template
│   └── assets/
│       ├── css/         # Base CSS (if any)
│       └── icons/       # Base icons (if any)
├── modules/             # Custom Nuxt modules
│   ├── 10_devtools-dummy/    # Conditional devtools components
│   └── 10_layer-postcss/     # PostCSS configuration module
└── public/              # Static assets (currently empty)
```

### Forms and Netlify Integration

**Example pattern for Netlify Forms** (consumer projects can use this pattern)

```vue
<template>
  <form
    action="/success-page/"
    method="post"
    name="form-name"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="form-name">

    <!-- Form fields with required attribute -->
    <div class="field required">
      <label for="field-id">Label</label>
      <input
        id="field-id"
        type="text"
        name="field-name"
        autocomplete="name"
        required
      >
    </div>
  </form>
</template>
```

### Navigation Pattern

**Example dynamic navigation from route metadata** (pattern for consumer projects)

```typescript
const navigation = computed(() => {
  const routes = router.getRoutes() as RouteWithMeta[]

  return routes
    .filter(entry => entry.meta.navigationOrder && !entry.meta.navigationParent)
    .map((entry) => {
      entry.children = routes.filter(
        child =>
          child.meta.navigationParent === entry.meta.navigationOrder
          && child.meta.navigationOrder,
      )
      return entry
    })
    .sort((a, b) => (a.meta.navigationOrder ?? 0) - (b.meta.navigationOrder ?? 0))
})
```

### CSS Architecture

**Base layer provides:**
1. **PostCSS Module** - Custom PostCSS configuration at `src/base/modules/10_layer-postcss/`
2. **Recommended Pattern**: Separate CSS files with alias-based imports
3. **Global CSS** - No scoped styles by default
4. **CSS Custom Properties** - Use `var(--variable-name)` for theming

**Consumer projects should:**
- Define their own CSS organization in their app directory
- Use the PostCSS module provided by the layer
- Follow the pattern of separate CSS files if desired

### File Organization

**Base Layer (`src/base/`):**
```
src/base/
├── nuxt.config.ts       # Layer configuration
├── app/
│   ├── app.vue          # Base app template
│   └── assets/          # Base assets
├── modules/             # Custom Nuxt modules
│   ├── 10_devtools-dummy/
│   └── 10_layer-postcss/
└── public/              # Static assets
```

**Consumer Project Example:**
```
my-project/
├── nuxt.config.ts       # Extends @kjfranke/nuxt-stack
├── pages/               # Project-specific pages
├── components/          # Project-specific components
├── layouts/             # Project-specific layouts
├── assets/              # Project-specific assets
└── public/              # Project-specific public files
```

### TypeScript Patterns

1. **Interface definitions** for component props and route metadata
2. **Type assertions** when accessing route meta: `(route.meta as RouteMeta)`
3. **Explicit typing** for refs: `ref<Type>(value)`
4. **Computed with return types** when appropriate

### Server Functions (Netlify)

**Example serverless function pattern** (for consumer projects deploying to Netlify)

```javascript
exports.handler = async (event, context) => {
  try {
    // Function logic
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error message' }),
    }
  }
}
```

### Key Conventions (Base Layer)

- ✅ TypeScript everywhere (`lang="ts"`)
- ✅ Composition API (`<script setup>`)
- ✅ Performance optimizations built-in (code splitting, inlineSSRStyles, etc.)
- ✅ Modern tooling (@nuxt/fonts, @nuxt/icon, @nuxt/image, nuxt-vitalizer)
- ✅ Custom PostCSS module for advanced CSS features
- ✅ Minimal base app.vue that consumers can override
- ✅ TypeScript interfaces for type safety

**For Consumer Projects:**
- ✅ Define page meta with `definePageMeta()`
- ✅ Use `useSeoMeta()` for SEO
- ✅ Always use `<NuxtImg>` or `<NuxtPicture>` for images
- ✅ Use `<Icon>` component for icons
- ✅ Follow TypeScript patterns
- ✅ Leverage the base layer's performance optimizations

### Icon System with @nuxt/icon

**Base layer provides @nuxt/icon module configured and ready to use**

#### Icon Usage Pattern (Consumer Projects)
```vue
<template>
  <Icon name="icon:icon-name" />
</template>
```

#### Icon Configuration
The base layer configures @nuxt/icon. Consumer projects can add their own custom icon collections:

```typescript
// In consumer project's nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],
  icon: {
    customCollections: [
      {
        prefix: 'my-icons',
        dir: './assets/icons',
      },
    ],
  }
})
```

Icons can be stored in consumer project's `assets/icons/` directory as individual SVG files.

#### Icon Styling
- Icons can be styled with CSS classes
- Use existing `.icon` class plus specific classes like `.icon-phone`, `.icon-menu`, etc.
- Icon colors are controlled via CSS `color` property (SVGs use `fill="currentColor"`)
- Icons are rendered as `.iconify` elements by @nuxt/icon
- Never use sprite.svg or SVG use/xlink:href patterns

#### CSP Configuration (For Netlify Deployments)
When deploying to Netlify, include in `netlify.toml`:
- `connect-src 'self' https://api.iconify.design` - Allow Iconify API fallback
- `img-src 'self' data:` - Allow inline SVG data URIs

### Image Optimization with @nuxt/image

**Base layer provides @nuxt/image configured with optimal defaults**

#### For Single Images
```vue
<NuxtImg
  src="/images/photo.jpg"
  width="800"
  height="600"
  sizes="xs:320px sm:640px md:800px"
  format="avif"
  quality="80"
  alt="Description"
  loading="lazy"
/>
```

#### For Responsive Images with Multiple Formats
```vue
<NuxtPicture
  src="/images/hero.jpg"
  width="1920"
  height="1080"
  sizes="xs:100vw sm:100vw md:100vw"
  format="avif,webp"
  quality="75"
  alt="Hero image"
  loading="eager"
  :preload="{ fetchPriority: 'high' }"
/>
```

#### Configuration
**Base layer provides:**
- **Provider**: IPX (Sharp) in dev, works with Netlify Image CDN in production
- **Default format priority**: AVIF → WebP → JPEG
- **Default quality**: 80
- **Responsive breakpoints**: xs(320), sm(640), md(768), lg(1024), xl(1280), 2xl(1536)

**Consumer projects can override:**
```typescript
export default defineNuxtConfig({
  extends: ['@kjfranke/nuxt-stack'],
  image: {
    quality: 90,  // Override default
    // Add provider-specific config
  }
})
```

**Best practices for consumer projects:**
- **Above-the-fold images**: Use `loading="eager"` and `preload`
- **Below-the-fold images**: Use `loading="lazy"`
- **Sharp**: Only in devDependencies for local development

#### Benefits
- Automatic AVIF conversion (50% smaller than WebP)
- Responsive srcset generation
- Modern format with automatic fallback
- Lazy loading support
- CDN-ready optimization
- Works in dev mode with Sharp/IPX
- Production uses Netlify Image CDN (no Sharp needed)

#### Deployment (Netlify Static Generation)
**For consumer projects deploying to Netlify:**
- Build command: `npm run generate`
- Publish directory: `.output/public` (or custom if configured)
- Images are served and optimized by Netlify's Image CDN
- AVIF/WebP conversion happens on-demand at the edge

### JavaScript Bundle Optimization

**Base layer provides aggressive performance optimizations built-in:**

#### Lazy Loading Components
**For below-the-fold or heavy components, use `defineAsyncComponent()`**

```vue
<script setup lang="ts">
// Lazy load components that aren't immediately visible
const Recensies = defineAsyncComponent(() => import('~/components/Recensies.vue'))
const ContactForm = defineAsyncComponent(() => import('~/components/ContactForm.vue'))
</script>
```

#### Build Configuration (Provided by Base Layer)
Aggressive code splitting enabled:
- **Vue Router**: Separate chunk
- **Vue Core**: Separate chunk
- **Vendor**: Separate chunk for node_modules
- **Component Islands**: Enabled for better code splitting
- **Console/Debugger**: Removed in production builds
- **CSS Code Splitting**: Enabled
- **Inline SSR Styles**: Enabled (critical CSS inlined)

#### Performance Features (Provided by Base Layer)
- ✅ **Nuxt Vitalizer**: Disables prefetch links for dynamic imports
- ✅ **Nuxt Vitalizer**: Removes render-blocking entry CSS
- ✅ **Nitro**: Compression and minification enabled
- ✅ **Payload Extraction**: Disabled to reduce inline data
- ✅ **Component Islands**: Enabled for granular code splitting
- ✅ **Route-based Splitting**: Each page gets its own chunk

#### Best Practices (For Consumer Projects)
- Lazy load forms and interactive components below the fold using `defineAsyncComponent()`
- Keep critical components (navigation, header, footer) in main bundle
- Use `loading="lazy"` for images not in viewport
- Defer non-critical JavaScript with `defineAsyncComponent()`
- Monitor bundle sizes with Lighthouse/WebPageTest
