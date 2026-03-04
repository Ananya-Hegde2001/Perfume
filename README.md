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

### 1) Prereqs

- Node.js **20.19+** (or **22.12+**). Vite may warn on older 20.x.

### 2) Get the code

If you already have the repo checked out, skip this section.

```bash
git clone <YOUR_REPO_URL>
cd Perfume
```

### 3) Install

```bash
npm install
```

### 4) Run locally

```bash
npm run dev
```

Then open:

- http://localhost:5173

### 5) Production build

```bash
npm run build
```

### 6) Preview production build

```bash
npm run preview
```

### 7) Lint

```bash
npm run lint
```

## Design decisions

### Typography

- Heading font: **Cormorant Garamond** (editorial luxury feel)
- Body font: **Inter** (clean readability)

### Palette (max 4 colors)

Defined as CSS variables in `src/styles/tokens.css`:

- Paper: `--color-paper` (warm, editorial background to avoid stark white)
- Ink: `--color-ink` (high-contrast text that still feels soft, not pure black)
- Mist: `--color-mist` (subtle surfaces/dividers for depth without heavy borders)
- Gold accent: `--color-gold` (restrained luxury accent for highlights and focus)

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

## Live Website

<h2 align="center"><a href="https://perfumeproduct-showcase.vercel.app" target="_blank">Visit My Built Website</a></h2>
