# Latitudes Gateway · Design System

> A governance + observability admin product for [Executor](https://github.com/RhysSullivan/executor) (executor.sh). Latitudes operates one production instance — each WorkOS organization is a paying customer. Latitudes staff log in as `msp_admin`; customer staff log in as `customer_admin` / `customer_viewer`.

This pack is the canonical visual + interaction spec for the Gateway admin surface.

## What's in the product

A single admin web app organized into five primary sections:

1. **Home** — workspace overview, KPI band, most-active connectors at a glance, "needs your attention" feed, recent activity log.
2. **Connections** — gallery / list / detail of every governed source (MCP, OpenAPI, GraphQL, custom adapters). The connector tile is the design pivot — every source has a stable color, pattern, and Simple-Icons logo that repeat across every page.
3. **Reporting** — chart-grid (operator view) + weekly narrative (editorial view, for the Monday-morning read).
4. **Permissions** — roles × tools matrix, by-caller inspector, policy editor (per role), role detail.
5. **Teams & users** — members table, team cards, team detail, user detail.

Plus the global chrome: navy nav rail, top bar with stacked wordmark, command-palette search.

The audience is technical team leads at mid-to-large SMBs — they're tech-savvy but expect something closer to Linear / Stripe than a config dashboard.

## Source material

This design system was built by reading two repos at `Latitudes-Dev`:

- **[`Latitudes-Dev/Latitudes-Gateway-Mockup`](https://github.com/Latitudes-Dev/Latitudes-Gateway-Mockup)** — the canonical design mockup. 14 high-fidelity artboards, all design tokens, full JSX components, and a `DESIGN_HANDOFF.md` that is the single source of truth. Everything in `ui_kits/gateway/` is lifted from here verbatim.
- **[`Latitudes-Dev/latitudes-gateway`](https://github.com/Latitudes-Dev/latitudes-gateway)** — the production scaffold. Read its `AGENTS.md`, `README.md`, and `PLAN-phase-2-governance-dashboard.md` for product semantics, role model, and shipping plan.

If you have access to either repo, browse them for full context — the mockup's `DESIGN_HANDOFF.md` (also kept here at `ui_kits/gateway/DESIGN_HANDOFF.md`) is exhaustive.

## Index — what lives where

| Path | Purpose |
|---|---|
| `colors_and_type.css` | Importable token + semantic-class stylesheet (`--brand`, `--ink`, `.eyebrow`, `.h1`, `.sub`, `.mono`, etc). Start here for any new artifact. |
| `assets/` | `latitudes-mark.png` (brand glyph, white-on-transparent). |
| `fonts/` | Self-hosted variable TTFs (Montserrat, Manrope, Lora, Geist Mono) + `fonts.css` declaring `@font-face`. Offline-ready. |
| `preview/` | Per-token + per-component preview cards used by the Design System tab. |
| `ui_kits/gateway/` | The full UI kit — `index.html` plus 7 JSX files reconstructing all 14 production screens with a screen-switcher header. Read this kit's own `README.md` before extending. |
| `ui_kits/gateway/DESIGN_HANDOFF.md` | The original 34kb designer handoff — token table, screen anatomies, port plan. |
| `SKILL.md` | Skill manifest for Claude Code compatibility. |

---

## Visual foundations

### Palette

A two-color brand on a warm paper-cream stack. Navy `#1e3a5f` is primary; gold `#f5a623` is reserved as a single-purpose accent (page-header `<em>`, active nav item, gold-soft suggestion callouts, the hero band's 4px bottom border). Gold and navy never appear together as a gradient.

- **Surfaces:** `--bg #faf9f6` (page), `--bg-2 #f1eee6` (sunken), `--surface #ffffff` (cards), `--surface-2 #fbfaf6` (nav, page header). The page background is never pure white.
- **Ink:** `--ink #0e1726` is the darkest text — never pure black. The full scale steps down through `--ink-2`, `--ink-3`, `--muted`, `--muted-2`.
- **Lines:** `--line #e6e3d6` is warm (matches the cream surfaces). `--line-strong #cfcaba` for input borders and segmented controls.
- **Status:** `--good / --warn / --bad` defined in **oklch** for perceptual calibration (`oklch(0.55 0.10 155)`, `oklch(0.68 0.13 75)`, `oklch(0.55 0.18 25)`).
- **Connector palette:** 12 named source colors live in `CONNECTOR_PALETTE` (in `ui_kits/gateway/hifi-primitives.jsx`). Each source has `{c, mono, pattern, logo}`. Patterns are CSS-only overlays at ~20% opacity on a flat color crown.

### Type

Four families, used with discipline:

- **Montserrat** — display moments. Page H1 is **500 weight (NOT bold)**, uppercase, 30px. Button labels, table headers, eyebrows, KPI numbers, nav labels. Letter-spacing varies `.04 → .20em` by size.
- **Manrope** — UI and body. All running text, form labels, table cells.
- **Lora** (italic only) — descriptive "voice". Used sparingly in page subs, suggestion callouts, italic-em metadata. **Never UI. Never bold.**
- **Geist Mono** — API names, IDs, emails, masked credentials, time-ago. Always 12px or smaller.

`<em>` inside an H1 renders **gold, not italic**. `<span class="serif">` inside an H1 renders italic Lora gold (e.g. *"Engineer role"*).

### Spacing, radii, shadows

- **Spacing:** loose scale at common values `4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 24 · 30`. Card padding 18 default / 13 compact / 22 comfy. Page body 22 / 30. Rail width 220 / 190 / 264.
- **Radii:** `4 / 6 / 10 / 14`. Cards and tiles get 10. We are not a rounded-corner brand.
- **Shadows:** cool-tinted, layered (1px hairline + soft drop), very low opacity. Never blurry-grey.

### Backgrounds, motion, hover

- **Page bg** is solid cream — no images, no gradients, no textures, no grain.
- **Nav rail** has a vertical navy gradient (`brand → brand-deep`) plus a *repeating-linear-gradient* of latitude lines at 3% opacity, with a soft radial highlight top-right. This is the only place a textured surface appears.
- **Hero band** (`.h-hero`) is the same navy gradient with a 4px gold bottom border + 80px-spaced vertical latitude lines at 4% opacity. Used on the Weekly Report and on big detail-page heroes.
- **Tile crowns** carry pattern overlays — `dots / lines / rings / grid / diag / wave` — at ~20% white on the source color.
- **Hover** on tiles and cards: lift `translateY(-1px)`, switch shadow `sm → md`, switch border `line → gold-line`. No bounce, no scale.
- **No bouncy animation.** Transitions are subtle, 140ms ease.
- **Press states** rely on the underlying button variant — gold buttons go to `--gold-2`, primary navy goes to `--brand-2`. No scale-down, no inset shadow.

### Layout rules

- **Top bar** is 60px tall, full white surface, with a 2-color stacked wordmark on the left. The wordmark's `min-width: calc(rail-w - 22px)` aligns the workspace pill with the nav rail's right edge.
- **Nav rail** is `--rail-w` (220 default) and reachable in three styles: `rail` / `icons` / `wide`. Wide adds a plan/usage card at the bottom.
- **Page header** is its own `surface-2` strip with eyebrow → H1 → italic sub on the left, primary action(s) right-aligned.
- **Page body** scrolls; chrome is fixed.
- **Cards** are the dominant container. KPIs sit in a 4-col grid; long content sits in a 2-col split (`2fr / 1fr` for left-heavy, `1.4fr / 1fr` for detail pages).
- **Minimum viewport** 1280px. Below 1024 → horizontal-scroll tables; below 768 → "Best viewed on desktop" notice.

### Transparency, blur

- Blur is used sparingly — only on top-of-crown pill chrome (`.src-stat` uses a 2px backdrop-filter) and on a couple of nav highlight overlays. No frosted-glass cards. No general blur.
- Transparency is mostly used in the nav rail's inner card (`rgba(255,255,255,.06)` background, `.10` border) for the plan widget. Otherwise solid surfaces.

### Imagery

The product has no marketing imagery. Vendor logos are loaded white-on-color from the **Simple Icons CDN** (`https://cdn.simpleicons.org/<slug>/FFFFFF`), with a 2-letter monogram fallback in 800 Montserrat when the CDN 404s (Slack is a known one; their brand has asked Simple Icons to remove their mark). There are no photos, no illustrations, no avatars-as-photos — every person gets a navy-circle initial avatar; every agent gets a dark-gradient *square* avatar.

---

## Content fundamentals

The voice is **refined, governed-by-design, conversational without being chatty**. Closer to Linear or Stripe than to a config dashboard. Every screen mixes one quiet UI-prose sentence (Manrope) with a Lora-italic clause that gives the page its tone.

### Pattern

The page-header sub is always built the same way:

> *italic descriptor*  **bold count**  *italic continuation.*

Examples lifted from the screens:

- **Dashboard:** *"12 sources answered"* **38,412 calls** *"overnight. Three need a look — everything else is humming."*
- **Connections:** **34 sources · 207 tools** *"exposed across MCP, OpenAPI, GraphQL and custom adapters."*
- **Weekly Report:** *"Most of the lift came from"* **finance-bot** *"— its Stripe-API run rate doubled mid-week."*
- **Suggested action callout (gold-soft):** *"Two of these errors share an auth scope — rotating the Sentry credential should clear most of the queue."*

### Casing

- **Page H1s are uppercase.** "CONNECTIONS", "GOOD MORNING, KYLE.", "ENGINEER".
- **Eyebrows are uppercase + letter-spaced** (.16em or .20em).
- **Card titles (H3) are uppercase**, 11px, .08em.
- **Button labels are uppercase**, Montserrat 700, 11px, .06em.
- **Body, tags, descriptions, sub text — sentence case.** Never SHOUTY in running prose.
- **Mono content (tool names, emails)** lives lowercase: `linear.createIssue`, `kyle@latitudes.io`.

### Voice

- **You / your, not we.** Cards address the team-lead: *"Your connectors"*, *"Needs your attention"*, *"Tools Mira can call"*, *"Email me this"*.
- **First-person only in the assistant moment.** *"Email me this"* on the Weekly Report hero. Never "we will…" or "Latitudes recommends…".
- **No exclamation marks.**
- **Em-dashes for tone.** *"everything else is humming."*, *"— rotating the Sentry credential should clear most of the queue."*
- **No emoji.** None in nav, buttons, status, copy. The brand never uses emoji. (Unicode glyphs are fine where useful — `→`, `·`, `▾`, `⌘K`.)
- **Numbers are bold.** Counts inside the sub copy are wrapped in `<strong>` and inherit ink, not gold, weight 700.
- **Action verbs are short and direct.** "Add source", "Rotate credentials", "Browse marketplace", "Save changes", "Revoke" (in `--bad`).

### Examples to copy from

If you need to write a new page header or callout, copy the cadence from one of these:

- `Latitudes-Dev/Latitudes-Gateway-Mockup/hifi-screens.jsx` — Dashboard, Connections gallery.
- `…/hifi-reporting.jsx` — Weekly narrative copy + suggested-action callouts.
- `…/hifi-permissions.jsx` — Matrix legend voice, "by caller" inspector language.

---

## Iconography

**The product uses no icon set as a library.** All product iconography is **hand-authored inline SVG at 17×17** (1.4 stroke, round caps/joins), kept in `HIco` in `hifi-primitives.jsx`. There are exactly nine — `home`, `connections`, `reporting`, `permissions`, `teams`, `audit`, `settings`, `search`, `plus`, `bell`, `filter`, `chev`, `chevDown`, `arrowUp`, `arrowDown`, `dots`, `globe`. They are geometric, modest, refined — not a Lucide / Heroicons clone but stylistically adjacent. **Copy them from `HIco` rather than re-drawing.**

**Vendor logos** are loaded from the **[Simple Icons](https://simpleicons.org/) CDN** as white SVGs:

```
https://cdn.simpleicons.org/<slug>/FFFFFF
```

Slugs are stored per-source in `CONNECTOR_PALETTE.logo`. When the CDN 404s, the tile falls back to a 2-letter Montserrat 800 monogram in white over the source's brand color. For production: vendor the same SVGs (`simple-icons` npm package) or self-host — but keep the white-on-color rendering and the monogram fallback.

**No emoji**, ever. **No Unicode icons** in product chrome. Some text-only Unicode is acceptable in body copy: `→` for navigation links, `↑` `↓` for trend arrows (paired with a tone color), `·` as a separator, `▾` for dropdown affordance.

---

## Fonts

All four families are bundled as **variable TTFs** in `fonts/`:

| File | Family | Weight range | License |
|---|---|---|---|
| `Montserrat-VF.ttf` | Montserrat | 100 – 900 | OFL · from `google/fonts` |
| `Manrope-VF.ttf` | Manrope | 200 – 800 | OFL · from `google/fonts` |
| `Lora-VF.ttf` + `Lora-Italic-VF.ttf` | Lora | 400 – 700 (roman + italic) | OFL · from `google/fonts` |
| `GeistMono-VF.ttf` | Geist Mono | 100 – 900 | OFL · from `vercel/geist-font` |

`fonts/fonts.css` declares the `@font-face` blocks. `colors_and_type.css` imports it. This means **anything that links `colors_and_type.css` is offline-ready by default** — no CDN dependency.

The original OFL licenses live alongside each file (`fonts/OFL-Montserrat.txt`, etc).

If you'd rather use Google Fonts CDN (smaller initial paint, no bundled assets), swap the `@import` at the top of `colors_and_type.css` for the commented-out Google Fonts URL right above it.

---

## Caveats

- **Vendor logos depend on the Simple Icons CDN at runtime.** Acceptable for mockups; replace with a local asset path for production.
- **The UI kit uses in-browser Babel** for JSX transpilation. There's a brief "compiling" pause on first load. Fine for design references, not production-shippable.
- **No router, no state persistence in the kit.** The screen-switcher at the top is for design review, not real navigation.
- **Empty / loading / error states** are described in `ui_kits/gateway/DESIGN_HANDOFF.md` but not all drawn — implement them following the patterns there (skeleton lines on `--bg-2` shimmer; dashed-border empty cards; bad-tone callouts).

---

## Quick start

To make a new artifact in this brand:

1. `<link rel="stylesheet" href="colors_and_type.css">` — gets you all tokens + semantic type.
2. Use the page-header pattern: `<div class="eyebrow">…</div> <h1>… <em>highlighted</em>.</h1> <div class="sub">…</div>`.
3. For real UI, link `ui_kits/gateway/hifi.css` and use the `h-*` component classes (`h-card`, `h-btn`, `h-tile`, `h-swatch`, etc).
4. For vendor logos, look up the slug in `CONNECTOR_PALETTE` and load from `cdn.simpleicons.org/<slug>/FFFFFF`.

See `SKILL.md` for use as an Agent Skill.
