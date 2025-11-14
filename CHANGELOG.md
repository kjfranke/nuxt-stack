# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-11-14

### Added
- Initial release of @kjfranke/nuxt-stack
- Nuxt 4.2.1 base layer configuration
- Performance optimizations:
  - Advanced code splitting and tree shaking
  - Inline critical CSS
  - Optimized chunk splitting
  - Component islands
  - Compressed public assets
- Modern tooling integration:
  - @nuxt/fonts for automatic font optimization
  - @nuxt/icon with Iconify support
  - @nuxt/image with AVIF/WebP/JPEG support
  - @nuxt/eslint with stylistic rules
  - nuxt-vitalizer for resource hints optimization
- Security features:
  - Netlify deployment configuration
  - Security headers (CSP, HSTS, etc.)
  - XSS protection
- Developer experience:
  - TypeScript support
  - ESLint with browser compatibility checking
  - Stylelint for CSS/Vue styles
  - PostCSS with preset-env
  - Browserslist integration
  - Husky + lint-staged pre-commit hooks
- Custom Nuxt modules:
  - devtools-dummy module
  - layer-postcss module
- Base app structure with app.vue
- Base CSS and icon assets
- Comprehensive documentation

[Unreleased]: https://github.com/kjfranke/nuxt-stack/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kjfranke/nuxt-stack/releases/tag/v0.1.0
