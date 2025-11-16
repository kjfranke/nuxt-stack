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
  - Add common composables
  - Add base components (if applicable)
  - Add more PostCSS utilities
  - Document custom modules better

### Low Priority / Future Ideas

- [ ] **Consider npm Publishing** - If wider distribution is needed
  - Set up npm account
  - Update workflows for npm publishing
  - Update README for both GitHub and npm install methods

- [ ] **Add More Devtools Features** - Expand the design system layer
  - Document devtools layer usage
  - Add more development utilities
  - Create component showcase

- [x] **Create Example Projects** - ✅ DONE! Added example consumer projects
  - Added `examples/basic-project/` - Full project example
  - Examples demonstrate how to extend and use the layer

- [ ] **Performance Monitoring** - Add tooling for tracking
  - Lighthouse CI integration
  - Bundle size monitoring
  - Performance budgets

## Notes

- Branch structure: `main` for releases, feature branches for development
- Use Changesets for version management: `npm24 run changeset`
- GitHub Action auto-creates version PRs
- Installation: `npm install github:kjfranke/nuxt-stack#main` or specific tag
- Environment variables documented in `src/base/.env.dist`
