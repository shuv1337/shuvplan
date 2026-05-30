---
name: latitudes-gateway-design
description: Use this skill to generate well-branded interfaces and assets for Latitudes Gateway, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and a 14-screen UI kit for prototyping the governance + observability admin product over Executor (executor.sh).
user-invocable: true
---

Read the `README.md` file at the root of this skill, and explore the other available files — especially `colors_and_type.css` (drop-in tokens + semantic type classes), `ui_kits/gateway/DESIGN_HANDOFF.md` (the canonical 34kb design spec), and `ui_kits/gateway/hifi.css` (full component vocabulary).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy the assets you need out of this skill and link `colors_and_type.css` from your HTML. For full-fidelity UI mocks, also link `ui_kits/gateway/hifi.css` and reuse the `h-*` component classes plus the `HTile`, `HSwatch`, etc React primitives in `ui_kits/gateway/hifi-primitives.jsx`. If working on production code, copy the brand mark (`assets/latitudes-mark.png`) and read the rules in `README.md` to become an expert in designing with this brand — then reproduce the components in your target stack (Next.js + Tailwind + shadcn/ui maps cleanly).

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience? web or in-app? marketing or admin? how brand-forward?), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key things to internalize before designing:

- **Palette:** navy `#1e3a5f` primary, gold `#f5a623` reserved accent, warm paper-cream surfaces — never pure white pages, never pure black ink.
- **Type:** Montserrat (uppercase display), Manrope (UI/body), Lora (italic voice — sparingly), Geist Mono (mono for IDs/tools/emails). Page H1 is 500-weight, NOT bold.
- **Pattern:** every page header uses eyebrow → H1 (with optional gold `<em>`) → Lora-italic sub with bold inline numerals. Always.
- **No emoji.** No marketing imagery. No bouncy animations. No frosted-glass blur. Cool-tinted layered shadows, very low opacity.
- **The connector tile is the design pivot.** Every governed source appears in tile or swatch form across every page, with a stable color + pattern + Simple Icons vendor logo.
