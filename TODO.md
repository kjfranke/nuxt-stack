# TODO

## Next Steps for @kjfranke/nuxt-stack

### High Priority

- [x] **Deploy to Netlify** - ✅ DONE! Successfully deployed with `base/` structure
  - ⚠️ **Important**: Currently using `./base` directory with path arguments (`nuxt generate ./base`)
  - 🔍 **Next**: Investigate if we can migrate to `./src` structure to match other projects
  - Note: `postinstall` must run `nuxt prepare` WITHOUT path argument for Netlify builds to work

- [x] **Test Installation in Another Project** - ✅ DONE! Package installs and works correctly
  - Created test project
  - Installed via: `npm install github:kjfranke/nuxt-stack`
  - Extended the layer in `nuxt.config.ts`
  - Verified all features work (fonts, icons, images, performance optimizations, ~layers alias)

- [x] **Create First Version/Release** - ✅ DONE! v0.2.0 released
  - Ran `npm24 run changeset` to document changes
  - Pushed to trigger GitHub Action
  - Reviewed and merged "Version Packages" PR
  - Created git tag: `v0.2.0` and pushed

### Medium Priority

- [x] **Add GitHub Actions for Quality** - ✅ DONE! CI workflow created
  - Added CI workflow for linting (ESLint + Stylelint)
  - Added build validation (build + generate)
  - Added type checking with nuxi typecheck
  - Runs on push to main and all pull requests

- [x] **Improve Documentation** - ✅ DONE! Enhanced README and COPILOT_INSTRUCTIONS
  - Added Quick Start section to README
  - Documented all environment variables with examples
  - Added troubleshooting section with common issues
  - Documented ~layers alias feature
  - Updated COPILOT_INSTRUCTIONS with current version and structure

- [ ] **Enhance Base Layer Features** - Add more utilities
  - Add common composables (discover during project implementations)
  - Add base components (discover during project implementations)
  - Add more PostCSS utilities (discover during project implementations)
  - Document custom modules better

### Low Priority / Future Ideas

- [ ] **Add Vitest Setup** - Testing infrastructure
  - Install and configure Vitest
  - Add example unit tests for composables
  - Add example component tests
  - Integrate with GitHub Actions CI workflow
  - Document testing best practices

- [ ] **Add More Devtools Features** - Expand the design system layer
  - Document devtools layer usage (discover during project implementations)
  - Add more development utilities (discover during project implementations)
  - Create component showcase (discover during project implementations)

- [x] **Create Example Projects** - ✅ DONE! Added example consumer projects
  - Added `examples/basic-project/` - Full project example
  - Examples demonstrate how to extend and use the layer

- [ ] **Performance Monitoring** - Add tooling for tracking
  - Bundle analyzer integration (visualize bundle size)
  - UnJS Bundle Runner for runtime performance
  - Add performance budget warnings in build
  - Document performance optimization strategies
  - Optional: Lighthouse CI for automated audits (requires hosted preview)

## Notes

- Branch structure: `main` for releases, feature branches for development
- Use Changesets for version management: `npm24 run changeset`
- GitHub Action auto-creates version PRs
- Installation: `npm install github:kjfranke/nuxt-stack#main` or specific tag
- Environment variables documented in `src/base/.env.dist`
