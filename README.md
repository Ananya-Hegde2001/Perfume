# Nocturne Atelier — Perfume Product Showcase

Frontend-only luxury perfume showcase:

- Landing page (brand story + featured picks)
- Product listing (filter + sort)
- Product detail view (full specs)

No backend, no auth, no database. The goal is premium UI, clean component structure, and responsive layouts.

## Brand concept

**Nocturne Atelier** is a small-batch perfume house built around restraint: modern resins, polished woods, and florals cut with precision.
The product copy and specifications are written to feel like a real luxury brand (not generic filler).

## Tech stack (and why)

- **Vite + React (JavaScript):** fast dev/build feedback and a clean component architecture.
- **React Router:** client-side navigation for `/`, `/products`, and `/products/:id`.
- **CSS Modules + CSS variables:** controlled, reusable design system (type, palette, spacing, motion) without inline styling.

## Setup (exact commands)

Prereqs:

- Node.js **20.19+** (or **22.12+**). Vite may warn on older 20.x.

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

### Typography

- Heading font: **Cormorant Garamond** (editorial luxury feel)
- Body font: **Inter** (clean readability)

### Palette (max 4 colors)

Defined as CSS variables in `src/styles/tokens.css`:

- Paper: `--color-paper`
- Ink: `--color-ink`
- Mist: `--color-mist`
- Gold accent: `--color-gold`

### Spacing scale

- 4px-based spacing variables (`--space-1` … `--space-8`) for consistent rhythm.

### Layout logic

- Product grid is responsive: 1 column (mobile), 2 (tablet), 3 (desktop), 4 (wide desktop)
- Media uses fixed aspect ratios + `object-fit: cover` to avoid stretching

### Motion

- Subtle hover states with a single easing curve and 200–320ms durations

## Product data model

Static product data lives in `src/data/products.js`.

Each product includes:

- `id`, `name`, `price`, `shortDescription`, `fullDescription`, `category`, `image`
- Perfume specs: `fragranceNotes` (top/heart/base), `sizeMl`, `longevity`, `occasion`

Prices are formatted as **Indian Rupees (INR)** via `src/utils/format.js`.

## Known limitations / trade-offs

- No cart/checkout (intentional: showcase only).
- Filters/sort are UI state only (not persisted to the URL).
- Product media is MP4-based; above-the-fold videos are prioritized, while the rest defer loading for smoother scrolling.
