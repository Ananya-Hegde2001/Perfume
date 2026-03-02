# React + Vite (JavaScript)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Nocturne Atelier — Product Showcase (Perfume)

  Frontend-only luxury perfume showcase: Landing page → Product listing → Product detail view.
  No backend, no auth, no database — the focus is premium UI, clean component structure, and responsive layouts.

  ## Brand concept

  **Nocturne Atelier** is a small-batch perfume house built around restraint: modern resins, polished woods, and florals cut with precision.
  The product copy and specifications are written to feel like a real luxury brand (not generic filler).

  ## Tech stack (and why)

  - **Vite + React (JavaScript)**: fast dev/build and a clean component architecture.
  - **React Router**: clean client-side navigation for Landing / Listing / Detail.
  - **CSS Modules + CSS variables**: strict control over palette, spacing scale, typography, and hover/motion without inline styling.

  ## Setup (exact commands)

  Prereqs:
  - Node.js **20.19+** (Vite prints a warning on 20.18; upgrade recommended)

  Install:

  ```bash
  npm install
  ```

  Run locally:

  ```bash
  npm run dev
  ```

  Production build:

  ```bash
  npm run build
  ```

  Preview production build:

  ```bash
  npm run preview
  ```

  Lint:

  ```bash
  npm run lint
  ```

  ## Design decisions

  - **Typography**
    - Heading font: *Cormorant Garamond* (luxury editorial feel)
    - Body font: *Inter* (clean, modern readability)
  - **Palette (max 4 colors)**
    - Paper `--color-paper`, Ink `--color-ink`, Mist `--color-mist`, Gold accent `--color-gold`
    - Defined in [src/styles/tokens.css](src/styles/tokens.css) and reused everywhere.
  - **Spacing scale**
    - 4px-based spacing variables (`--space-1` … `--space-8`) to keep rhythm consistent.
  - **Layout logic**
    - Product grid is responsive: 1 column (mobile), 2 (tablet), 3–4 (desktop).
    - Images use fixed aspect ratios and `object-fit: cover` to prevent stretching.
  - **Motion**
    - Hover states and transitions use 200–320ms durations with a single easing curve.

  ## Data model

  Static product data lives in [src/data/products.js](src/data/products.js) and includes:

  - `id`, `name`, `price`, `shortDescription`, `fullDescription`, `category`, `image`
  - Perfume specs: `fragranceNotes` (top/heart/base), `sizeMl`, `longevity`, `occasion`

  ## Known limitations / trade-offs

  - No cart/checkout (intentional: frontend-only showcase).
  - Filters/sort are UI state only (not persisted to URL).
  - Product imagery is consistent-tone SVG artwork (premium placeholders), not photography.
