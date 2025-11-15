# Netlify Deployment Troubleshooting Log

## Project Context
- **Project**: @kjfranke/nuxt-stack
- **Goal**: Deploy Nuxt 4 base layer to Netlify for demo/testing
- **Repository**: https://github.com/kjfranke/nuxt-stack
- **Branch**: main
- **Structure**:
  - Root `package.json` with all dependencies
  - `src/base/` - Base Nuxt layer (nuxt.config.ts, app/, etc.)
  - `src/devtools/` - Optional devtools layer

## Issues Encountered & Solutions Attempted

### Issue 1: Missing pages/index.vue file
**Error**: ENOENT: no such file or directory `/opt/build/repo/src/base/app/pages/index.vue?macro=true`

**Cause**: Running `nuxt generate ./src/base` from repo root caused Nuxt to look for files at wrong path

**Attempted Solutions**:
1. Changed build command to `cd src/base && npm run generate`
2. Updated publish path to `src/base/.output/public`
3. Changed Node version from 22 to 24

**Result**: Build started but path issues persisted

---

### Issue 2: Secrets Scanner Blocking Build
**Error**: "Secrets scanning detected secrets in files during build"

**User Action**: Marked .env file as containing secrets in Netlify UI (though it currently doesn't have actual secrets)

**Solution Applied**:
```toml
[build.environment]
  SECRETS_SCAN_ENABLED = "false"
```

**Result**: Secrets scanner disabled, build progressed

---

### Issue 3: Deploy Directory Does Not Exist
**Error**: "Deploy directory 'src/base/dist' does not exist"

**Cause**: Nuxt 4 outputs to `.output/public` not `dist`

**Solution Applied**:
```toml
[build]
  publish = "src/base/.output/public"
```

**Result**: Correct publish path set, but still issues with build

---

### Issue 4: Path Confusion with nuxt generate ./src/base
**Error**: Nuxt looking for `.nuxt/tsconfig.app.json` at repo root instead of in src/base/

**Output Location**: Files built to `node_modules/.cache/nuxt/.nuxt/dist/client/` instead of `.output/`

**Attempted Solutions**:

**Try 1**: Revert to running from repo root
```toml
[build]
  command = "npm run generate"
  publish = ".output/public"
```
```json
"scripts": {
  "generate": "nuxt generate ./src/base"
}
```
**Result**: ENOENT error - couldn't find pages

**Try 2**: Remove path arguments from scripts
```json
"scripts": {
  "build": "nuxt build",
  "generate": "nuxt generate",
  "postinstall": "npm run browserslist && nuxt prepare"
}
```
**Result**: Same ENOENT error

**Try 3**: Use Netlify `base` directory
```toml
[build]
  base = "src/base"
  command = "npm run generate"
  publish = ".output/public"
```
**Result**: `nuxt: not found` - no package.json in src/base/

---

### Issue 5: No package.json in src/base
**Error**: "sh: 1: nuxt: not found" when using `base = "src/base"`

**Cause**: Dependencies are in root package.json, not in src/base/. Netlify runs npm install in base directory which has no package.json.

**Current Attempted Solution**:
```toml
[build]
  command = "cd src/base && npx nuxi generate"
  publish = "src/base/.output/public"
```

**Status**: Waiting for test results

---

## Current Configuration

### netlify.toml
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; frame-src https:; base-uri 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.iconify.design; img-src 'self' data:;"
    Feature-Policy = "geolocation 'none';"
    Referrer-Policy = "no-referrer, strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubdomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"

[build]
  command = "cd src/base && npx nuxi generate"
  publish = "src/base/.output/public"

[build.environment]
  NODE_VERSION = "24"
  SECRETS_SCAN_ENABLED = "false"

[dev]
  command = "npm run dev:nuxt"
  targetPort = 9229
  port = 3000
  framework = "#custom"
  autoLaunch = false
  jwtRolePath = "app_metadata.authorization.roles"
```

### package.json scripts (root)
```json
"scripts": {
  "build": "nuxt build",
  "dev": "netlify dev",
  "dev:nuxt": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview",
  "postinstall": "npm run browserslist && nuxt prepare",
  "version": "changeset version",
  "changeset": "changeset",
  "lint": "npx lint-staged",
  "lint:all": "npm run lint:style && npm run lint:js",
  "lint:js": "eslint src --fix --no-warn-ignored",
  "lint:style": "stylelint src/**/*.{vue,css} --fix --ignore-path .gitignore --ignore-path .stylelintignore",
  "browserslist": "npx browserslist > ./browserslist.txt"
}
```

## Environment Variables Set in Netlify
- `NUXT_PUBLIC_DEVTOOLS_ENABLED` = "enabled"
- `NUXT_PUBLIC_LANG` = (configured for language)
- `VITE_ALLOWED_HOSTS` = (configured for dev hosts)
- `NODE_VERSION` = "24"
- `SECRETS_SCAN_ENABLED` = "false"

## Key Learnings

1. **Path Issues**: Running `nuxt generate ./src/base` from repo root causes Nuxt to have path confusion - it looks for some files at root and some at src/base/

2. **Output Location**: Nuxt 4 with Nitro outputs to `.output/public`, not `dist`

3. **Base Directory Limitation**: Using Netlify's `base` directory requires a package.json in that directory

4. **npx Solution**: Using `npx nuxi` allows running Nuxt CLI from node_modules installed at repo root while executing in src/base context

## Next Steps / Questions for Comparison

Need to compare with working "natascha" project:
1. What's the directory structure? (Is Nuxt at root or in subdirectory?)
2. What's the build command in netlify.toml?
3. What's the publish directory?
4. How are the scripts configured in package.json?
5. Does it use layers or is it a standard Nuxt project?

## Files Modified During Troubleshooting

1. `netlify.toml` - Multiple changes to command and publish path
2. `package.json` - Scripts changed multiple times (with/without ./src/base paths)
3. No changes to actual Nuxt config or source files
