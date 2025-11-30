# Changelog

## 0.4.1

### Patch Changes

- Fix path for cutsom media querie names

## 0.4.0

### Minor Changes

- SEO Module (@nuxtjs/seo)

  Installed comprehensive SEO suite including robots.txt, sitemap.xml, OG images, schema.org, and SEO utilities
  Configured for static site generation (compatible with Netlify)
  Added AI bot blocking in robots.txt
  Site URL and name configurable via environment variables:
  NUXT_PUBLIC_SITE_URL - defaults to https://example.com
  NUXT_PUBLIC_SITE_NAME - defaults to Nuxt Stack
  Security Module (nuxt-security)

  Migrated from manual netlify.toml headers to nuxt-security module
  Implemented OWASP-recommended security headers:
  Content Security Policy (CSP) configured for Nuxt and Iconify
  HSTS with preload support
  XSS protection and frame options
  Referrer policy and permissions policy
  Documentation Updates

  Added SEO section to README with features list
  Documented new environment variables
  Updated COPILOT_INSTRUCTIONS.md
  Maintained documentation for improved layer aliases (~layers and ~~layers)

## 0.3.0

### Minor Changes

- f7e2cc9: Enhanced documentation and quality tooling

  Features:

  - Added comprehensive documentation (Quick Start, environment variables, troubleshooting)
  - Added GitHub Actions CI workflow (linting, build validation, type checking)
  - Added example consumer projects (basic-consumer, basic-project)
  - Updated COPILOT_INSTRUCTIONS with current structure and features
  - Improved ~layers alias documentation

  Developer Experience:

  - Better onboarding with Quick Start guide
  - Troubleshooting section for common issues
  - Working examples to reference
  - Automated quality checks on every commit

## 0.2.0

### Minor Changes

- 03d99b5: Initial release of @kjfranke/nuxt-stack

  Features:

  - Nuxt 4.2 base layer with performance optimizations
  - Optional devtools layer for design system development
  - Custom ~layers alias for cross-layer imports
  - Environment-based configuration (lang, devtools, allowed hosts)
  - Pre-configured modules: @nuxt/fonts, @nuxt/icon, @nuxt/image, nuxt-vitalizer
  - ESLint and Stylelint setup
  - Netlify deployment ready

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
