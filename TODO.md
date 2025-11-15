# TODO

## Next Steps for @kjfranke/nuxt-stack

### High Priority

- [ ] **Deploy to Netlify** - Set up demo/testing deployment
  - Configure Netlify site
  - Add build settings
  - Test the deployed stack

- [ ] **Test Installation in Another Project** - Verify the package works as expected
  - Create a test project
  - Install via: `npm install github:kjfranke/nuxt-stack`
  - Extend the layer in `nuxt.config.ts`
  - Verify all features work (fonts, icons, images, performance optimizations)

- [ ] **Create First Version/Release** - Use Changesets workflow
  - Run `npm24 run changeset` to document changes
  - Push to trigger GitHub Action
  - Review and merge "Version Packages" PR
  - Create git tag: `git tag v0.1.0 && git push --tags`

### Medium Priority

- [ ] **Add GitHub Actions for Quality** - Automated testing and linting
  - Add CI workflow for running tests
  - Add linting workflow
  - Add build validation

- [ ] **Improve Documentation** - Add more examples and guides
  - Add example consumer project to README
  - Document all environment variables
  - Add troubleshooting section
  - Create migration guide from previous setups

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

- [ ] **Create Example Projects** - Showcase different use cases
  - Blog starter
  - Portfolio starter
  - E-commerce starter

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
