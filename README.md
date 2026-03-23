# spa-ui-controls

Reusable React + TypeScript UI controls and design tokens for small SPA-style test apps.

## What it includes

- Theme foundation with `light`, `dark`, and `system` modes
- App shell and top bar primitives
- Overlay drawer primitives for left/right sidebars
- Shared controls such as buttons, panels, banners, form fields, and a settings trigger
- A theme toggle wired to the shared theme context

## Development

```bash
npm install
npm run dev
```

This repo pins Node `22` for local development tools such as `fnm`/`nvm`.

The Vite dev server renders a demo app that exercises the exported controls.

## Validation

```bash
npm run build
npm run lint
npm run test:run
```

## Package usage

```tsx
import {
  AppShell,
  TopBar,
  Panel,
  SettingsButton,
  ThemeProvider,
  ThemeToggle,
} from '@mattgotteiner/spa-ui-controls'
import '@mattgotteiner/spa-ui-controls/styles.css'
```

Wrap your app with `ThemeProvider`, then use `ThemeToggle`, `SettingsButton`, and the shell primitives to keep layout and appearance consistent across apps.

If your app already persists theme state elsewhere, `ThemeProvider` also supports a controlled mode:

```tsx
<ThemeProvider
  theme={settings.theme}
  onThemeChange={(nextTheme) => updateSettings({ theme: nextTheme })}
  persist={false}
>
  <App />
</ThemeProvider>
```

## Installing from GitHub Packages

This package is published to GitHub Packages as `@mattgotteiner/spa-ui-controls`.

Log in for the `@mattgotteiner` scope and keep the default npm registry pointed at npmjs.org. That way, npm continues installing public packages from npm while resolving `@mattgotteiner/*` packages from GitHub Packages.

### Local install

1. Log in to the GitHub npm registry for the package scope:

   ```bash
   npm login --scope=@mattgotteiner --auth-type=legacy --registry=https://npm.pkg.github.com
   ```

2. Install the package:

   ```bash
   npm install @mattgotteiner/spa-ui-controls
   ```

This login flow scopes GitHub Packages access to `@mattgotteiner/*`, so installs such as `react` or `@babel/core` still resolve from the public npm registry. Do not commit tokens or a tokenized `.npmrc` file into the repository.

### Publishing from `main`

Pushes to `main` automatically publish this package to the `@mattgotteiner` GitHub Packages feed.

The workflow builds, lints, and tests the package before publishing. Each `main` publish gets a unique version based on the base package version, using the format `0.1.0-main.<run-number>`, so every merge can publish without needing a manual version bump first.

### Pull request CI

Pull requests targeting `main` automatically run `lint`, `typecheck`, `test:run`, and `build` through `.github/workflows/ci.yml`.

### GitHub Actions CI flow

For CI, grant the consuming repository access to the package in GitHub first, then configure the workflow to read packages.

```yaml
permissions:
  contents: read
  packages: read

steps:
  - uses: actions/checkout@v4

  - uses: actions/setup-node@v4
    with:
      node-version: 22
      scope: '@mattgotteiner'
      registry-url: 'https://npm.pkg.github.com'

  - run: npm ci
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

With the scoped registry configuration above, npm will still use the public npm registry for unscoped packages and GitHub Packages only for `@mattgotteiner/*`.

If the package lives outside the workflow repository and `GITHUB_TOKEN` is not allowed to read it, create a repository secret with a token that has package read access and use that secret for `NODE_AUTH_TOKEN` instead.
