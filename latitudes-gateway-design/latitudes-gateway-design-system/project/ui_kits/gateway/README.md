# Gateway · UI Kit

A pixel-faithful recreation of the Latitudes Gateway admin product — 14 production screens across all five sections, plus the global chrome (top bar, nav rail, page headers).

> Lifted directly from [`Latitudes-Dev/Latitudes-Gateway-Mockup`](https://github.com/Latitudes-Dev/Latitudes-Gateway-Mockup). The canonical design spec is `DESIGN_HANDOFF.md` in this folder.

## Open

`index.html` loads React 18 + Babel from CDN and renders a screen-switcher header above the chrome. Click any screen name in the dark bar to switch.

```bash
# any static server
python3 -m http.server 5173
# then open http://localhost:5173/ui_kits/gateway/
```

If you open `index.html` directly via `file://` Babel's XHR loader will fail. Serve over HTTP.

## Screens (in switcher order)

| Switcher label | Component | What it shows |
|---|---|---|
| Home | `HDashboard` | Workspace overview · KPI band · 12 connector mini-tiles · attention feed · activity log |
| Connections | `HConnectionsGallery` | 4-up large featured tiles + 4-up regular tiles + "Add source" slot |
| Conn · List | `HConnectionsList` | Filter rail + full-width table view of every source |
| Conn · Detail | `HConnectionDetail` | Linear connector detail — hero + tabs + tools table + access + credentials |
| Reporting | `HReportingGrid` | Dense operator view — KPI band + chart cards + top tools |
| Weekly report | `HReportingNarrative` | Editorial view with hero band + numbered sections + gold-soft callout |
| Permissions | `HPermissionsMatrix` | Roles × tools matrix with sticky first column |
| By caller | `HPermissionsInspector` | User-centric view — accessible sources, denied calls |
| Policy | `HPermissionsPolicy` | Accordion editor for editing a single role's policy |
| Role · Eng | `HPermissionsRole` | Engineer role detail with members + sources tables |
| Members | `HTeamsTable` | People / agents / teams / roles / invitations |
| Teams | `HTeamsCards` | Navy-crowned team cards + pending invitations |
| Team · Eng | `HTeamDetail` | Engineering team detail |
| User | `HUserDetail` | Mira Rao user detail with sessions + security |

## File map

| File | Purpose |
|---|---|
| `index.html` | Entry — loads React + Babel, mounts the screen-switcher. |
| `hifi.css` | All design tokens + component styles. The vocabulary lives here. |
| `hifi-primitives.jsx` | Top bar, nav rail, app frame, `CONNECTOR_PALETTE`, `<HTile>`, `<HSwatch>`, `<HChip>`, `<HTag>`, `<HAv>`, `<HDot>`, `<HIco>`. |
| `hifi-screens.jsx` | Home + 3 Connections variations. |
| `hifi-reporting.jsx` | Reporting grid + weekly narrative. |
| `hifi-permissions.jsx` | Matrix + by-caller inspector + `PM_TITLES` tool-title map. |
| `hifi-perms-2.jsx` | Policy editor + role detail. |
| `hifi-teams.jsx` | Members table + team cards. |
| `hifi-teams-2.jsx` | Team detail + user detail. |
| `hifi-app.jsx` | The original mockup's design-canvas wrapper. **Not used by this kit's `index.html`** — kept for reference. |
| `_canvas.html` | The original mockup's entry that uses the design-canvas wrapper. Kept for reference. |
| `DESIGN_HANDOFF.md` | 34kb designer handoff — token table, screen anatomies, port plan. **Read before extending.** |

## How to reuse a component

Components live on `window` (the JSX files all end in `Object.assign(window, {...})`). Once Babel finishes transpiling, you can do:

```jsx
<HAppFrame density="regular" nav="rail" active="connections">
  <div className="h-pagehead">
    <div className="eyebrow">Some context · timestamp</div>
    <h1>Page title with <em>gold</em>.</h1>
    <div className="sub"><em>italic descriptor</em> <strong>bold count</strong> <em>continuation.</em></div>
  </div>
  <div className="h-pagebody">
    <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
      {/* KPI cards or whatever */}
    </div>
  </div>
</HAppFrame>
```

For a single connector tile anywhere:

```jsx
<HTile name="Linear" kind="mcp" tools={14} calls="12.4k" status="good" size="lg" />
```

The `name` keys into `CONNECTOR_PALETTE` to look up color, pattern, mono fallback, and logo slug.

## Caveats

- **In-browser Babel.** Fine for mockups; precompile for production.
- **Simple Icons CDN** dependency for vendor logos. Slack always 404s — the monogram fallback is by design.
- **No router, no state persistence.** Refresh = back to Home.
- **No prod data model.** Mock data is inline in each `hifi-*.jsx` file (`HI_SOURCES`, `HI_ACTIVITY`, etc).
