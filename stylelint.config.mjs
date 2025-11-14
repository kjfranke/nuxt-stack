export default {
  defaultSeverity: 'warning',
  plugins: [
    'stylelint-no-unsupported-browser-features',
  ],
  extends: [
    // 'stylelint-config-standard',
    'stylelint-config-standard-vue',
  ],
  rules: {
    'plugin/no-unsupported-browser-features': [true, {
      severity: 'warning',
      ignore: [
      //     // 'css-container-queries', // issue for safari 15.6, hopefully exit soon, impact major
      //     // 'css-has', // issue in Firefox 115 hopefully exit soon, impact major
      //     // 'css-overscroll-behavior', // issue for safari 15.6, hopefully exit soon, impact minor

        //     // 'css-overflow', // Not supporting clip, so check value manually - not sure what to do with this, impact minor

        'css-scrollbar', // Safari not on standards track, use -webkit- pseudo classes, test 2 things in safari, impact minor
        //     'intrinsic-width', // should not be a problem, triggers on other flex related stuff https://caniuse.com/?search=intrinsic-width, impact minor

        //     // disable above to test the others

        //     // 'css-has', // Not supporting :has in Firefox 115 ghost version
        //     'css-nesting', // PostCSS does transpile this to unnested CSS
        //     'css-masks', // autoprefixer adds vendor prefixes
        //     'css3-cursors-grab', // mobile browser don't support cursors
        'css3-cursors', // mobile browser don't support cursors
        //     'css3-cursors-newer', // mobile browser don't support cursors
        //     'multicolumn', // bug: get triggered on grid-*-columns https://github.com/anandthakker/doiuse/issues/100, Partial support has only print issues: https://caniuse.com/#feat=multicolumn
        //     'text-decoration', // Not or partially supporting (-webkit-)text-decoration-skip / text-decoration-style, but can be considered progressive enhancement
        'text-size-adjust', // autoprefixer adds vendor prefixes
      ],
    }],
    // 'selector-class-pattern': null, // XSARUS, support BEM notation
    // 'no-descending-specificity': null, // XSARUS, sometimes we want to group selector block in a specific way
    'comment-word-disallowed-list': ['!commit', { severity: 'error' }], // XSARUS, prevent commit programmatically
  },
}
