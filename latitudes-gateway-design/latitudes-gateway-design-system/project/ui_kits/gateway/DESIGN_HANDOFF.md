# Handoff · Latitudes Gateway

## Overview

**Latitudes Gateway** is an administrative web interface for managing **Executor** — an agent-callable tool/source discovery and execution layer (executor.sh). Gateway lets a team-lead set up sources once (MCP, OpenAPI, GraphQL, custom adapters), share them with their team via roles and permissions, and observe what agents and people are calling.

**Primary user:** technical team leads (mid-to-large SMBs) managing access for engineers, ops, and agents. They are tech-savvy but expect a refined, governed-by-design product — closer to Linear/Stripe than to a config dashboard.

**Surface area in this packet:** 14 artboards across 5 nav sections — Home, Connections, Reporting, Permissions, Teams & users.

## About the design files

The files in this bundle are **HTML/JSX design references**, not production code. They use React 18 + Babel-in-the-browser purely so I could iterate visually inside a single HTML prototype. **Do not ship them.** Recreate the designs in the target codebase's environment (Next.js + Tailwind, Remix, plain React + CSS Modules — whatever's already in use). If no environment exists yet, default to **Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui**, since the visual vocabulary maps cleanly to that stack.

The single HTML entry point is `Latitudes Gateway — Refined.html`. It loads `hifi.css` plus a chain of `.jsx` files (each containing React components for one screen group). To preview locally: serve the folder over HTTP (`python3 -m http.server`) and open the HTML. Babel transpiles the JSX in the browser.

## Fidelity

**High-fidelity.** Exact colors, typography, spacing, and component structure are intentional and should be reproduced pixel-faithfully. Vendor logos in the connector tiles use the Simple Icons CDN — replicate the same approach (or embed the SVG paths). Status/empty/error states are described below but not all drawn in the HTML; implement them following the same vocabulary.

A separate `Tweaks` panel (bottom-right of the HTML preview) lets the user toggle nav style (rail/icons/wide) and density (compact/regular/comfy). These should map to user-preference settings, not be hardcoded.

---

## Design tokens

### Colors

```css
/* surfaces */
--bg:          #faf9f6;   /* page */
--bg-2:        #f1eee6;   /* secondary fill */
--surface:     #ffffff;   /* cards, tables */
--surface-2:   #fbfaf6;   /* nav, page header */

/* ink */
--ink:         #0e1726;
--ink-2:       #2a3447;
--ink-3:       #4a5468;
--muted:       #6c7385;
--muted-2:     #a4abbc;
--line:        #e6e3d6;
--line-2:      #eeece1;
--line-strong: #cfcaba;

/* brand — pulled from latitudes.dev */
--brand:       #1e3a5f;   /* navy primary */
--brand-2:     #2a4d7a;   /* navy hover */
--brand-deep:  #122844;   /* darker navy for gradients */
--brand-ink:   #ffffff;
--gold:        #f5a623;   /* amber accent */
--gold-2:      #ffb83d;
--gold-soft:   #fff2d6;
--gold-line:   #f3d28a;
--gold-ink:    #6b4500;

/* status tones (oklch — convert to hex per your tooling) */
--good: oklch(0.55 0.10 155);   /* ≈ #3f8757 */
--warn: oklch(0.68 0.13 75);    /* ≈ #c79332 */
--bad:  oklch(0.55 0.18 25);    /* ≈ #c84a36 */
```

### Typography

| Role | Family | Weights used | Notes |
|---|---|---|---|
| Display (page titles, KPI numbers, button labels, table headers, nav section labels) | **Montserrat** | 500, 600, 700, 800, 900 | Heavy-weight uppercase moments. Letter-spacing varies (.04 → .16em). Page H1 is **500** weight — explicitly NOT bold — uppercase, 30px. |
| UI / body | **Manrope** | 300, 400, 500, 600, 700 | All running text, form labels, table cells. |
| Italic / descriptive ("voice") | **Lora** | 400, 500 italic | Used sparingly in sub-titles, suggestions, callouts. Class `h-italic`. Never UI. |
| Monospace | **Geist Mono** | 400, 500, 600 | API names, IDs, emails, technical values. |

Google Fonts import: `https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Manrope:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Geist+Mono:wght@400;500;600&display=swap`

### Spacing scale (px)

Used loosely; common values: `4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 24 · 30`. Card padding is **18px** at regular density, **13px** compact, **22px** comfy. Page body padding is **22 / 30px** at regular.

### Radii

```
--r-sm: 4px   --r-md: 6px   --r-lg: 10px   --r-xl: 14px
```

### Shadows

```
--shadow-sm: 0 1px 0 rgba(14,23,38,.04), 0 1px 2px rgba(14,23,38,.05);
--shadow-md: 0 1px 0 rgba(14,23,38,.04), 0 4px 14px rgba(14,23,38,.07);
--shadow-lg: 0 1px 0 rgba(14,23,38,.04), 0 12px 32px rgba(14,23,38,.10);
```

### Rail width (drives chrome alignment)

`--rail-w: 220px` (190 compact, 264 wide). Used by the nav and the top-bar wordmark so the workspace pill aligns with the rail's right edge.

---

## Global chrome

### Top bar (`.h-top`, 60px tall, white)

```
[ Logo ▢ ] LATITUDES        ┊  Latitudes Inc · prod ▾                ⌕ Find a tool…  ⌘K   [+]  [🔔]  [KP]
            GATEWAY
```

- **Logo box:** 34×34 navy `--brand`, 7px radius. Contains the white Latitudes mark PNG, 26×26 inside.
- **Stacked wordmark:** "LATITUDES" Montserrat 800 13.5px navy, letter-spacing .05em; "GATEWAY" Montserrat 600 10.5px **gold** below, letter-spacing .18em. Stack gap 3px.
- **Wordmark container** has `min-width: calc(var(--rail-w) - 22px)` so the workspace pill that follows aligns visually with the nav rail's right edge.
- **Workspace pill:** rounded-rect (6px), light-grey border, contains a tiny navy-gradient swatch + workspace name + chevron. Implies switcher.
- **Search:** 340px max, rounded 6px, has `⌘K` kbd hint on the right.
- **Action buttons:** 34px square, transparent until hover; `+` (new) and bell (notifications).
- **Avatar:** 32px circle, navy bg, white initials in Montserrat 700, inset gold-ring optional on user-detail hero.

### Side nav rail (`.h-nav.rail`, width `--rail-w` = 220px)

- Background: **vertical navy gradient** `linear-gradient(180deg, var(--brand) 0%, var(--brand-deep) 100%)`.
- Subtle latitude-line texture overlay: `repeating-linear-gradient(0deg, transparent 0 60px, rgba(255,255,255,.03) 60px 61px)` plus a soft radial highlight in the top-right.
- White text at 86% opacity for inactive items; muted-white icons; counts in pill with rgba(255,255,255,.08) bg.
- **Active item:** solid **gold** (`--gold`) background, dark navy text and icon, slight shadow. This is the only place gold is used as a fill.
- Hover: rgba(255,255,255,.06) background.
- Items (regular order):
  1. Home — `🏠` (geometric house)
  2. Connections — two circles + line (with count badge, e.g. `34`)
  3. Reporting — three vertical bars on a baseline
  4. Permissions — clock-like circle with hand
  5. Teams & users — two overlapping circles
  6. Audit log — page with lines
  7. Settings — gear
- Bottom widget (wide nav only): plan / usage card with progress bar (`1.4M / 2M calls`) — semi-transparent white card on navy.

### Page header (`.h-pagehead`)

Pattern across every page:
```
EYEBROW · METADATA       ← 10.5px Montserrat 700, gold underline accent
PAGE TITLE               ← 30px Montserrat 500 UPPERCASE navy (NOT bold)
Sub-line with italic Lora descriptor + bold ink count               [actions →]
```

`<em>` inside H1 renders in gold (not italic). `<span class="serif">` renders in italic Lora and is used in titles like "Engineer *role*".

---

## Reusable components

| Component | Class | Notes |
|---|---|---|
| Card | `.h-card` | white, 1px line border, 10px radius, 18px padding, sm shadow. `.tight` for inline cards, has `<h3>` (uppercase 11px / .08em letter-spacing). |
| Button | `.h-btn` | 9×14 padding, 5px radius, Montserrat 700 11px uppercase. Variants: `.primary` (navy), `.gold` (gold/navy), `.ghost`, `.sm` (smaller). Use `.text-only` for plain links. |
| Chip | `.h-chip` | pill, Montserrat 600 10.5px uppercase. `.on` = navy fill. Holds filter selections, segmented controls. |
| Tag | `.h-tag` | small mono uppercase label, 9.5px Geist Mono. Variants: `.good .warn .bad .accent .brand`. |
| Tabs | `.h-tabs` + `.h-tab` | underline tab. Active uses gold underline + navy text. |
| Status dot | `.h-dot.good/.warn/.bad/.off` | 8px circle with soft tinted glow on the colored ones. |
| Avatar (person) | `.h-pp` | 28px navy circle, white Montserrat 700 initials. `.sq` = agent (dark gradient square). `.sm` = 22px. |
| Avatar stack | `.h-stack` | overlapping avatars with -8 negative margin and 1.5px surface border. |
| Bar | `.h-bar` | 6px track, fills with navy (or `.accent` gold, `.good`, `.bad`). |
| Chart placeholder | `.h-chartph` | gridded background — every page that shows a chart uses this. **Real implementation should use a charting lib (Recharts / Visx / Echarts).** |

---

## Connector system (the showpiece)

Connectors are the design pivot for this product. Every source appears in one of three forms — large/regular/small tile, or as an inline swatch — across **every page**. Consistency here is critical.

### Per-source palette (`CONNECTOR_PALETTE` in `hifi-primitives.jsx`)

Each source has `{ color, mono, pattern, logo }`:

| Source | Color (oklch → ≈ hex) | Mono | Pattern | Logo slug |
|---|---|---|---|---|
| Linear           | `oklch(0.52 0.16 280)` ≈ `#5a4ad1` | `Ln` | `lines` | `linear` |
| Stripe API       | `oklch(0.55 0.14 250)` ≈ `#5872c2` | `St` | `grid` | `stripe` |
| Postgres·prod    | `oklch(0.42 0.10 235)` ≈ `#3e5e7c` | `Pg` | `wave` | `postgresql` |
| Slack            | `oklch(0.56 0.16 25)`  ≈ `#c66247` | `Sl` | `dots` | `slack` (404s on Simple Icons — falls back to mono) |
| GitHub GraphQL   | `oklch(0.28 0.02 250)` ≈ `#2d343d` | `Gh` | `rings` | `github` |
| Sentry           | `oklch(0.46 0.16 320)` ≈ `#88467a` | `Se` | `diag` | `sentry` |
| Notion           | `oklch(0.32 0.02 60)`  ≈ `#403c33` | `Nt` | `lines` | `notion` |
| BigQuery         | `oklch(0.50 0.14 260)` ≈ `#5365b8` | `Bq` | `grid` | `googlebigquery` |
| Snowflake (sql)  | `oklch(0.66 0.10 220)` ≈ `#6fa3c4` | `Sn` | `dots` | `snowflake` |
| Zendesk          | `oklch(0.40 0.10 155)` ≈ `#3e6850` | `Zd` | `rings` | `zendesk` |
| HubSpot          | `oklch(0.62 0.14 45)`  ≈ `#cc7a47` | `Hs` | `wave` | `hubspot` |
| Intercom         | `oklch(0.50 0.16 215)` ≈ `#3678a1` | `Ic` | `dots` | `intercom` |

Patterns are CSS-only overlays at ~20% opacity over the source color (see `.h-tile .crown[data-pattern="..."]::after` in `hifi.css`).

### Logos

Pulled from **Simple Icons CDN** as white SVG: `https://cdn.simpleicons.org/<slug>/FFFFFF`. The component falls back to the 2-letter monogram if the image fails to load (e.g. Slack, which has been removed at brand's request). Implementation note: when porting, consider hosting these locally (Simple Icons npm package or your own assets) to avoid CDN dependency.

### Tile (`<HTile>` in `hifi-primitives.jsx`)

Three sizes:
- **Large** (`size="lg"`): 140px crown, 50px monogram / 60px logo. Status pill top-left, kind chip top-right.
- **Regular**: 96px crown, 32px monogram / 42px logo. Status/kind same.
- **Small** (`size="sm"`): 64px crown, 22px mono / 32px logo. **Status & kind move OUT of the crown into the meta strip below** (as small `.h-tag.good/.warn/.bad` + neutral `.h-tag` chips). Avoids overlap on the smaller crown.

Meta row beneath crown always shows `name` (Montserrat 700 13.5px) + `sub` (mono, e.g. "14 tools · 12.4k/24h").

Hover lifts the tile (`translateY(-1px)`) and switches the border to `--gold-line`.

### Inline swatch (`<HSwatch>`)

Just the colored chip with the logo, no crown chrome. Four sizes: `sm` (22px), default (30px), `lg` (54px), `xl` (88px — used as hero avatar on connection detail). Used in tables, lists, breadcrumbs, anywhere a source needs identifying inline.

---

## Screens

> Section numbers match the canvas. Every page sits inside the global chrome (top bar + nav rail). All measurements assume regular density at 1320 viewport.

### 1 · Home (`HDashboard`)

**Purpose:** team-lead lands here, sees the workspace pulse at a glance.

**Layout (top to bottom):**
1. **Page header** — eyebrow "WORKSPACE OVERVIEW · Tue, May 12", H1 "Good morning, *Kyle*." (Kyle in gold), italic sub-line. Right side: Audit log / + Add source buttons.
2. **KPI band** — 4 cards in a 4-col grid:
   - Tool calls · 24h — 38,412 — +6.4%
   - Active agents — 17 — +2
   - Errors — 142 — 0.37%
   - p95 latency — 412 ms — −18 ms

   Each card has muted label, big Lora-numeral-style stat (Montserrat 800 30px navy via `.h-card .stat`), and a small row with a colored arrow + delta in mono.

3. **2-col split** (2fr / 1fr):
   - **Left card · "Your connectors"** — header "12 of 34 most active · last 24h" + chip filters (All / Healthy / Degraded). 6-col grid of **small tiles** (`size="sm"`, no chevron). Pulls the 12 most-active sources.
   - **Right card · "Needs your attention"** — vertical list of alerts. Each row: source swatch (small) OR status dot · message · chev. Examples: "Sentry returning 502", "Postgres·prod p95 latency ↑ 3.2× over baseline", "Intercom credentials expire in 4 days", "2 pending access requests" (no swatch).

4. **Recent activity card** — header with chip filters (All / Agents / People / Destructive) + "open log →". Table columns: Caller (avatar + email or agent name) · Tool (mono + destructive tag) · Source (swatch + name) · Result (200/5xx tag) · When (time-ago, mono).

### 2 · Connections — three variations + one detail page

#### A · Gallery (`HConnectionsGallery`)

- **Header:** eyebrow "GOVERNED SOURCES · YOUR TEAM" + H1 "CONNECTIONS" + italic sub "exposed across MCP, OpenAPI, GraphQL and custom adapters." Right: Browse marketplace / Import OpenAPI / + Add source.
- **Toolbar row:** search (flex 1, max 520) · Filters button (with count badge) · A→Z · view-toggle segmented control (Gallery / List / Table).
- **Active filter chips** strip: small chips with `×` for removable, plus a "clear" link.
- **Section 1 · "Most active · this week"** — **4-up large tiles** (`size="lg"`).
- **Section 2 · "All connections"** — **4-up regular tiles** (`size`-default), with a final **dashed "Add source" slot** ending the grid. The slot's crown reads "Add an MCP, OpenAPI spec, GraphQL endpoint, or custom adapter" with a `+` glyph above.

#### B · Refined list (`HConnectionsList`)

- **Header (row variant):** eyebrow "ALL SOURCES" + small H1 "CONNECTIONS" + italic count + Export / + Add source on right.
- **228px-wide filter rail** on the left (own scroll), white-on-surface-2 panel. Sections: Type · Status · Credentials · Team · Owner. Each option is a custom checkbox + label + count.
- **Right pane: full-width table.** Columns:
  - Source — big swatch (`lg` size) + bold name + kind tag + status dot + word ("healthy"/"degraded"/"down").
  - Tools — large Lora number ("14") + "callable" subtitle.
  - Owner — mono email.
  - Credentials — `shared` neutral tag or `per-user` gold tag.
  - Calls · 24h — number + trend arrow row.
  - Last used — mono time-ago.
  - Dots menu.

#### C · Connection detail (`HConnectionDetail`)

- **Hero block** (surface-2 bg): breadcrumb "Connections / Linear" → big row with **XL swatch** (88px) + eyebrow "MCP source · added Apr 2" + H1 "Linear" (34px) + tag row [kind, status, "shared credentials", muted npm/version metadata] + actions on the right (Test a tool / Rotate credentials / Edit source primary).
- **Tabs:** Overview · Tools (n) · Schemas · Access (n) · Activity · Settings. Active uses gold underline.
- **Body:**
  - 4-up KPI band (calls 7d, latency, errors %, tools exposed).
  - 2-col split:
    - **Left (1.4fr) — Exposed tools table.** Header with chip filters (All / Destructive · 3 / Read-only) + "add a tool →". Cols: Tool name (mono + destructive bad tag) · Inputs → output (mono schema) · Calls · 7d (mono + thin bar) · "try →" button.
    - **Right (1fr) col:**
      - **Access card** — avatar stack + "22 callers · 4 teams" + per-team usage bars + "Manage permissions →" full-width button.
      - **Credentials card** — `shared` tag + rotated-time-ago + masked mono key in a sunken bg-2 panel + Rotate / View in vault buttons.

### 3 · Reporting — two variations

#### A · Chart grid (`HReportingGrid`)

Operator's view, dense.

- **Header:** eyebrow "MAY 5 — MAY 12 · vs prev 7d" + H1 + italic sub. Schedule report / Export / Save view buttons.
- **Filter row:** date-range buttons (text + ▾) · "Source · all" / "Tool · all" / "Caller · all" chips · "Destructive" active chip with × · "+ Add filter" gold link.
- **KPI band (4-up):** Total calls / Errors / p95 latency / Cost est. — each card has the stat + delta arrow + tiny `chartph` sparkline.
- **2-col (2fr / 1fr):**
  - Left big card: "Calls over time" with segmented chip toggle (volume / by source / by tool) and `chartph` 200px tall. Below: 6 sources legend (swatch + name).
  - Right: "Errors by source" — col-stack list (swatch + name + count + colored bar).
- **2-col (1fr / 1fr):**
  - "Latency distribution" with p50/p95/p99 in mono footer.
  - "Top tools" table — swatch + tool name + count + bar.

#### B · Weekly narrative (`HReportingNarrative`)

Editorial — for the team-lead's Monday morning read.

- **Hero band** (`.h-hero`, navy gradient + gold underline 4px): eyebrow "WEEKLY REPORT" + H1 "This week in *Gateway*" (Gateway in gold) + italic sub naming the headline driver, with one gold-colored caller name. Two CTA buttons: gold "Email me this", outlined white "Save as dashboard".
- **Sticky filter pill** (rounded rectangle, 1px border) — labeled "filter" mono + active filter chips + "+ add" gold link.
- **Numbered sections** (Montserrat 800 "01/02/03/04" in gold + section title in 14px uppercase letter-spaced):
  1. Call volume — single chart card.
  2. Latency distribution — single chart card.
  3. Where the errors came from — 2-col: 3-row error list + **gold-soft callout card** "Suggested action" with italic copy + gold CTA.
  4. The 5 tools that ate this week — numbered table rows (mono `01/02/…` numerals).

### 4 · Permissions — four screens

#### A · Matrix (`HPermissionsMatrix`)

Roles × tools grid.

- **Header:** eyebrow "ACCESS POLICY · MATRIX VIEW" + H1. Sub has an inline legend (▣ allowed · ▢ read-only · `!` requires review · — denied).
- **Filter row:** search · type chips · "destructive only" gold-active chip · "Group · by source".
- **Table** (sticky first column):
  - First column (`min-width: 280px`, sticky): **Tool name in human title** (Manrope 600 13px ink) + technical id in mono+muted parens, e.g. `Create an Issue (linear.createIssue)`. Destructive tools have a `destructive` bad tag.
  - Role columns: 7 rotated headers (writing-mode vertical-rl).
  - Cells: one of four `<CellMark s="...">` glyphs — `on` (filled navy square with white check), `read` (hollow muted square), `review` (gold square with `!`), `off` (dashed muted square).
- Tool source headers (Linear, Stripe API, …) span the row with a small swatch + bold name on a bg-2 separator row.

**Title mapping** (`PM_TITLES` in `hifi-permissions.jsx`):

```
linear.createIssue     → Create an Issue
linear.listIssues      → List Issues
linear.update          → Update Issue
linear.comment         → Add a Comment
linear.delete          → Delete Issue
linear.search          → Search Issues
stripe.charges.list    → List Charges
stripe.refunds.create  → Issue a Refund
stripe.customers.list  → List Customers
stripe.customers.update→ Update Customer
stripe.invoices.send   → Send an Invoice
postgres.query         → Run Read-only Query
postgres.exec          → Execute Statement
postgres.vacuum        → Vacuum Database
postgres.schema.list   → List Schemas
slack.postMessage      → Post a Message
slack.listChannels     → List Channels
slack.upload           → Upload a File
slack.archive          → Archive a Channel
github.search          → Search Repositories
github.createPullRequest → Open a Pull Request
github.mergePullRequest  → Merge a Pull Request
github.deleteBranch    → Delete a Branch
```

Destructive set: `delete, exec, vacuum, refunds.create, update, customers.update, archive, mergePullRequest, deleteBranch, invoices.send`.

#### B · User-centric inspector (`HPermissionsInspector`)

- **Header (row variant):** eyebrow "ACCESS · BY CALLER" + small H1. Segmented chips "By user / By tool / By role". Simulate call / + New role on right.
- **248px left aside:** users list with search at top. Sections "People" / "Agents". Each row: avatar (square for agents) + name + role mono. Active row has bg-2 fill + 3px gold left border.
- **Right pane:** selected caller hero (square avatar + eyebrow + display-style name + tag row [agent, role, italic metadata]) + Change role / Revoke (bad-colored) buttons.
  - **3-up KPI cards** (Tools allowed / Destructive · auto-run / Destructive · with review).
  - **"Effective access · grouped by source"** — one card per accessible source. Card has swatch + name + per-user-credentials note + "edit" ghost button, then a chip-wrap of tools. Destructive but allowed = `review` gold tag inside the chip. Denied tools render greyed + strikethrough.
  - **Recent denied calls** table — swatch + mono tool + italic reason + time-ago.

#### C · Policy editor (`HPermissionsPolicy`)

Accordion per source — for editing the policy of a single role (e.g. Engineer).

- **Header:** breadcrumb "Permissions / Roles" + H1 with `<span class="serif">role</span>` italic gold modifier. Below: 14 members tag, italic "inherits from" → Read-only chip, italic "applied to" → team chips. Right: Duplicate / Discard / **Save changes (gold primary)**.
- **Bulk action row:** search · Bulk · allow read · Bulk · require review.
- **One card per source** (5 sources). Header bar: chev + swatch + bold name + mono "n tools · n allowed" + per-source preset chips (per-tool / allow all read / deny all). First source is `open`; rest collapsed.
- Open table cols: Tool (human title + `(slug)` mono) · Schema (mono, `{...} → ...`) · Access (segmented 4-state control: allow / read / review / deny) · Destructive policy (when destructive: reviewer tag + `@kyle` handle + italic "auto-deny after 24h"; else "not applicable" italic muted) · dots menu.

#### D · Role detail (`HPermissionsRole`)

- **Hero (surface-2 bg, full-bleed):** breadcrumb · 88px **navy-gradient square with gold border** containing role abbreviation "ENG" · eyebrow + H1 "Engineer" + tag row (14 members, inherits Read-only, 2 destructive policies, italic last-edited metadata) · Duplicate / Export policy / Edit role buttons. Tabs: Overview · Policy (42) · Members (14) · Sources (n) · History.
- **Body:**
  - 4-up KPI (Members / Sources reachable / Tools allowed / Calls 7d).
  - 2-col (1.4fr / 1fr):
    - **Left — Source access table** — swatch + name · tools allowed (n/total + bar) · destructive (review gold tag or italic "read-only") · calls.
    - **Right — Members card** — avatar stack + count, then a short member list (4 with "View all 14 →" full-width button). Each row: avatar + name + email + italic "via team · Eng" or "direct".
  - **Recent policy changes** audit table — actor avatar + email + colored action tag (Granted/Revoked/Changed) + tool mono + source swatch + italic detail + time-ago.

### 5 · Teams & users — four screens

#### A · Members table (`HTeamsTable`)

- Header eyebrow "MEMBERS · ROLES · INVITATIONS" + H1 "Teams & users" + italic sub with bold counts. Bulk import / + Create team / + Invite people buttons.
- **Tabs** below header: People · 58 · Agents · 7 · Teams · 5 · Roles · 8 · Invitations · 3.
- Filter chip row: search · Role/Team/MFA chips · "has access > 30d unused" active-gold chip · Sort · last active ↓.
- **Table:** checkbox · Member (avatar + name + mono email) · Role (chip) · Teams (chip-wrap) · **Sources accessible** (avatar-stack of small swatches + "+n more") · MFA (good/bad tag) · Last active (mono time-ago) · dots.
- Footer: "Showing 1–6 of 58" mono + pagination buttons.

#### B · Team cards + invitations (`HTeamsCards`)

- Header eyebrow "BUNDLE PEOPLE, SOURCES & POLICY" + H1 "Teams" + italic sub. Manage roles / + Create team buttons.
- Search + view-toggle segmented (Cards / List).
- **2-col card grid.** Each card is **a navy-crowned mini-hero**:
  - Crown: `linear-gradient(135deg, color-mix(brand 92% / gold 8%), brand-deep)` + diagonal-line texture overlay + 2px gold bottom border. Inside: "TEAM" eyebrow in gold + team name 22px Montserrat 500 uppercase + mono owner caption.
  - Body: avatar stack (4 + count) + member count. Then **"ACCESSIBLE CONNECTORS"** label and a wrap of small pill-rows — each `[swatch] [name]` in a thin border + bg-2 pill. Footer row: destructive-policies tag OR read-only good tag, plus "open team →" gold link.
- Final grid slot: dashed "Create a team" card (centered `+` glyph + uppercase label + italic muted description).
- **"PENDING INVITATIONS"** section below the grid — small label, then a table: anonymous avatar + mono email + role chip + team chip + italic invited-by metadata + resend/revoke (bad-colored) buttons.

#### C · Team detail (`HTeamDetail`)

- Hero with **88px navy-gradient square + gold border** containing a single brand glyph (`⬢`) → eyebrow + H1 "Engineering" 34px + tag row [14 members, 6 sources, 2 destructive policies, italic owner email] + Audit / + Add member / Edit team buttons. Tabs: Overview · Members (14) · Sources (6) · Permissions · Activity · Settings.
- Body: 4-up KPI (Members / Sources / Calls 7d / Destructive 7d).
- 2-col (2fr / 1fr):
  - **Members table** — avatar + name + email · **Role on this team** (Owner/Maintainer/Member segmented control) · Calls 7d (mono + bar) · Joined date · dots.
  - **Right col, two cards stacked:**
    - "Sources this team can call" — each source as a row pill (swatch + name + tools allowed) with a chev. "+ Add source" full-width button.
    - "Activity · 24h" — short feed: avatar + action + source swatch + time-ago.

#### D · User detail (`HUserDetail`)

- Hero with **88px circle avatar — navy fill, gold inset ring** ("MR" 30px). Eyebrow "PERSON · INVITED APR 2 BY KYLE@LATITUDES.IO" + H1 "Mira Rao" + tag row [mono email · Engineer chip · Eng team chip · italic last-active]. Buttons: Send message / Reset MFA / Suspend (bad-colored). Tabs: Access · Activity · Security · Sessions · Settings.
- 4-up KPI (Sources accessible / Calls 7d / Destructive 7d / MFA).
- 2-col (1.4fr / 1fr):
  - **"Sources Mira can call"** list — each row: `lg` swatch + name + status dot + tools-allowed mono + bar + right-side tag stack (`per-user`, `via team · Eng` brand tag) + last-used time.
  - **Right stack:**
    - **Security card** — three rows separated by 1px lines: MFA · TOTP (good "on" tag + italic verified date) · SSO · Google Workspace (good "linked" tag + italic policy note) · API keys (mono masked key + Rotate button).
    - **Active sessions card** — three rows: green dot if active else muted, device + browser, mono "city · time-ago", "revoke" bad-colored ghost button.
- Below: "RECENT ACTIVITY" audit table — source swatch + tool name (mono + destructive tag) + mono inputs/note + result tag (200/denied/review pending) + time-ago.

---

## Interactions & behavior

- **Navigation:** standard SPA routing per section. Nav items take you to their list; clicking a row opens the detail page. Breadcrumbs are clickable.
- **View toggles** (Connections list/gallery/table; Teams cards/list): persists per-user.
- **Filter chips:** all chip filters are toggleable; `×` clears a chip; "Filters" button reveals an advanced filter sheet (not drawn). Filter selections should be URL-encoded so they're shareable.
- **Status pills** (good/warn/bad) on tiles & rows: link to the relevant alert / log.
- **Destructive tag:** non-interactive label. The actual destructive-policy is set in the Policy editor.
- **Segmented controls** (Allow/Read/Review/Deny on Policy editor; Owner/Maintainer/Member on Team detail): instant edit, optimistic update with toast on failure. "Save changes" gold button commits the role-level diff.
- **Hover lift on tiles:** translateY(-1px), shadow upgrade, border switches to gold-line. No click-state animation needed.
- **Search (`⌘K`):** global command palette; expects fuzzy match across sources, tools, people, and recent activity.
- **Tweaks panel:** nav style + density toggle. Should be user-preferences endpoint, persisted across sessions.

## State management

- **Sources** — server state, real-time-ish (websocket or 10s poll) for status + 24h counts.
- **Activity log** — append-only stream; "Live" indicator and 5s refresh on the dashboard activity card. Pagination via cursor.
- **Policies** — per-role document, optimistic local edit with diff staged until "Save changes". The diff banner should show "n unsaved changes" if user navigates away.
- **Reporting** — querying a metrics store (Clickhouse / equivalent). Filter selections → URL params → query. Cache results per filter combo.
- **Permissions resolution** — the inspector and the user-detail page both need an "effective access" calculation that resolves role + team inheritance + per-user overrides. Server-side; client requests `/permissions/effective?caller=…`.

## Empty / loading / error states

Not drawn explicitly. Patterns:
- **Loading:** skeleton lines using `--bg-2` shimmer for tables, cards, and chart areas. Page header titles render instantly; bodies fade in.
- **Empty:** dashed-border "card" with centered `+` glyph and a one-line description in italic Lora muted. Same pattern as the gallery's "Add source" slot.
- **Error:** bad-tone tag on the affected row + a top-of-section bad-callout card (mirror the gold "Suggested action" treatment with bad palette).

## Responsive behavior

This product is a desktop admin tool. Minimum viewport 1280px. Below that:
- Collapse nav rail to `icons` mode automatically.
- Detail pages: stack 2-col splits vertically.
- Tables: keep but enable horizontal scroll past 1024.
- The product does NOT need to be mobile-optimized — show a "Best viewed on desktop" notice below 768px.

## Assets

- **Latitudes mark** — `assets/latitudes-mark.png` (white logo glyph, 517×567 with transparency). Renders inside the 34px navy logo box in the top bar. **Brand asset** — keep in your repo, do not regenerate.
- **Vendor logos** — currently fetched on the fly from `https://cdn.simpleicons.org/<slug>/<color>`. For production:
  - Either install `simple-icons` npm package and bundle the SVGs you need, or
  - Use a logo-proxy / self-hosted asset directory.
  - Fall-back: 2-letter monogram (`Ln`, `St`, etc.) over the source's brand color.
- **Fonts** — Google Fonts (Montserrat, Manrope, Lora, Geist Mono).

## Files in this bundle

| File | Purpose |
|---|---|
| `Latitudes Gateway — Refined.html` | Entry point — open in a browser via local HTTP server. |
| `hifi.css` | All design tokens + component styles. The vocabulary lives here. |
| `hifi-primitives.jsx` | Top bar, nav rail, app frame, connector palette + `<HTile>` / `<HSwatch>` / tags / chips / avatars. |
| `hifi-screens.jsx` | Home dashboard + 3 Connections variations (Gallery, List, Detail). |
| `hifi-reporting.jsx` | Reporting · Chart grid + Weekly narrative. |
| `hifi-permissions.jsx` | Permissions · Matrix + User-centric inspector + `PM_TITLES` map + `toolSlug`/`toolTitle` helpers. |
| `hifi-perms-2.jsx` | Permissions · Policy editor (accordion) + Role detail. |
| `hifi-teams.jsx` | Teams · Members table + Team cards. |
| `hifi-teams-2.jsx` | Teams · Team detail + User detail. |
| `hifi-app.jsx` | Wires every screen into a single `<DesignCanvas>` gallery. **For production, skip this file — render screens in your router.** |
| `design-canvas.jsx` | Gallery wrapper (pan/zoom canvas). **Tooling — not part of the design. Do not port.** |
| `tweaks-panel.jsx` | Tweaks UI (nav style / density toggles). **Tooling — port the *behavior* into user preferences, not the UI.** |
| `assets/latitudes-mark.png` | Brand mark. |

## Recommended porting order

1. **Tokens & global chrome first** — get `hifi.css` values into your design-token system, build `<TopBar>`, `<NavRail>`, `<PageHeader>` exactly as drawn. Verify the wordmark stack alignment with the rail edge.
2. **Connector primitives** — `<ConnectorSwatch>` and `<ConnectorTile>` are reused across every screen. Pin the palette + Simple Icons integration before touching screens.
3. **Connections page (Gallery)** — fastest way to verify the tile + chrome + filter vocabulary in one go.
4. **Connections list + detail** — exercises the filter rail, table, and hero patterns. After these, every other screen is a remix.
5. **Reporting · Narrative** — exercises the `.h-hero` navy band + numbered sections + gold callout — useful as the brand "moment" template for future marketing-adjacent pages.
6. **Permissions matrix** — once tables work, the matrix is straightforward but make sure the sticky first column + `<CellMark>` glyphs are exact.
7. **Everything else** — role/team/user detail pages all share the same hero+tabs+KPI+2col body template. Build a `<DetailPage>` layout primitive to avoid repetition.

## Questions to clarify with the team before shipping

- Final list of supported source types (this packet shows MCP / OpenAPI / GraphQL / Custom — confirm).
- Real role/permission model (this packet assumes Admin / Engineer / Operator / Finance / Read-only + agent-specific roles).
- SSO providers supported (Google Workspace shown — Okta, Azure AD, others?).
- Where credentials are actually stored (per-user vs shared shown — confirm vault integration).
- Whether the destructive-review approver should be a single user or a group.
- Audit log retention policy and export format.
