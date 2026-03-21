# spa-ui-controls

Reusable React + TypeScript UI controls and design tokens for small SPA-style test apps.

## What it includes

- Theme foundation with `light`, `dark`, and `system` modes
- App shell and top bar primitives
- Overlay drawer primitives for left/right sidebars
- Shared controls such as buttons, panels, banners, and form fields
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
  ThemeProvider,
  ThemeToggle,
  AppShell,
  TopBar,
  Panel,
} from 'spa-ui-controls'
import 'spa-ui-controls/styles.css'
```

Wrap your app with `ThemeProvider`, then use `ThemeToggle` and the shell primitives to keep layout and appearance consistent across apps.
