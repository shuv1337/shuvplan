// hifi-primitives.jsx — refined chrome, nav, and the Connector tile component
/* global React */

// ─── Icons (geometric, refined stroke) ─────────────────────────────
const HIco = {
  home: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8 9 2.5 15.5 8v7H11v-4H7v4H2.5z"/></svg>,
  connections: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="4" cy="9" r="2.2"/><circle cx="14" cy="9" r="2.2"/><path d="M6.2 9h5.6" strokeLinecap="round"/></svg>,
  reporting: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M3 15V9M9 15V4M15 15v-4"/><path d="M2 15.5h14"/></svg>,
  permissions: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="9" cy="9" r="6.5"/><path d="M9 2.5V9l3.3 3.3" strokeLinecap="round"/></svg>,
  teams: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="8" r="2.6"/><circle cx="12.2" cy="8" r="2.6"/><path d="M2.5 15c0-2.2 1.7-3.6 3.8-3.6 1 0 1.8.3 2.5 1m6.6 2.6c0-2.2-1.7-3.6-3.8-3.6-.6 0-1.1.1-1.5.3" strokeLinecap="round"/></svg>,
  audit: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3.5" y="2.5" width="11" height="13" rx="1.2"/><path d="M6 6h6M6 9h6M6 12h4" strokeLinecap="round"/></svg>,
  settings: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="9" cy="9" r="2.4"/><path d="M9 1.5v2M9 14.5v2M16.5 9h-2M3.5 9h-2M14.3 3.7l-1.4 1.4M5.1 12.9l-1.4 1.4M14.3 14.3l-1.4-1.4M5.1 5.1 3.7 3.7" strokeLinecap="round"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14" strokeLinecap="round"/></svg>,
  plus: <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>,
  bell: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 11V7.5C4 5.3 5.8 3.5 8 3.5s4 1.8 4 4V11l1 1H3z"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0"/></svg>,
  filter: <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M2.5 4h11l-4 5v4l-3-1.5V9z"/></svg>,
  chev: <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>,
  chevDown: <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4"/></svg>,
  arrowUp: <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M4 7l4-4 4 4"/></svg>,
  arrowDown: <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v10M4 9l4 4 4-4"/></svg>,
  dots: <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="13" cy="8" r="1.3"/></svg>,
  globe: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="11" cy="11" r="8.5"/><path d="M2.5 11h17M11 2.5C8 5.5 8 16.5 11 19.5M11 2.5c3 3 3 14 0 17"/></svg>,
};

// ─── Curated connector palette ─────────────────────────────────────
// Each source gets a stable color, a 2-letter monogram (fallback), and
// a Simple Icons slug for the real vendor mark. Real adapters (Postgres·prod,
// Snowflake (sql)) are custom names — they use the parent product's logo.
const CONNECTOR_PALETTE = {
  Linear:           {c:'oklch(0.52 0.16 280)', mono:'Ln', pattern:'lines', logo:'linear'},
  'Stripe API':     {c:'oklch(0.55 0.14 250)', mono:'St', pattern:'grid',  logo:'stripe'},
  'Postgres·prod':  {c:'oklch(0.42 0.10 235)', mono:'Pg', pattern:'wave',  logo:'postgresql'},
  Slack:            {c:'oklch(0.56 0.16 25)',  mono:'Sl', pattern:'dots',  logo:'slack'},
  'GitHub GraphQL': {c:'oklch(0.28 0.02 250)', mono:'Gh', pattern:'rings', logo:'github'},
  Sentry:           {c:'oklch(0.46 0.16 320)', mono:'Se', pattern:'diag',  logo:'sentry'},
  Notion:           {c:'oklch(0.32 0.02 60)',  mono:'Nt', pattern:'lines', logo:'notion'},
  BigQuery:         {c:'oklch(0.50 0.14 260)', mono:'Bq', pattern:'grid',  logo:'googlebigquery'},
  'Snowflake (sql)':{c:'oklch(0.66 0.10 220)', mono:'Sn', pattern:'dots',  logo:'snowflake'},
  Zendesk:          {c:'oklch(0.40 0.10 155)', mono:'Zd', pattern:'rings', logo:'zendesk'},
  HubSpot:          {c:'oklch(0.62 0.14 45)',  mono:'Hs', pattern:'wave',  logo:'hubspot'},
  Intercom:         {c:'oklch(0.50 0.16 215)', mono:'Ic', pattern:'dots',  logo:'intercom'},
};
function paletteFor(name){
  return CONNECTOR_PALETTE[name] || {c:'oklch(0.50 0.10 200)', mono:(name||'??').slice(0,2), pattern:'lines'};
}
function logoUrl(slug, color='FFFFFF'){
  return slug ? `https://cdn.simpleicons.org/${slug}/${color}` : null;
}

// ─── Top bar ───────────────────────────────────────────────────────
function HTopBar({title='Gateway', workspace='Latitudes Inc · prod'}){
  return (
    <header className="h-top">
      <div className="h-mark">
        <span className="glyph">
          <img src="assets/latitudes-mark.png" alt="" width="26" height="26" style={{display:'block', objectFit:'contain'}}/>
        </span>
        <span className="word-stack">
          <span className="wordmark">Latitudes</span>
          <span className="product">{title}</span>
        </span>
      </div>
      <span className="h-workspace">
        <span className="dot"/>
        <span>{workspace}</span>
        <span style={{color:'var(--muted-2)'}}>{HIco.chevDown}</span>
      </span>
      <div className="h-spacer"/>
      <div className="h-search">
        {HIco.search}
        <span>Find a tool, source, or person</span>
        <span className="kbd">⌘K</span>
      </div>
      <button className="h-icobtn" title="New">{HIco.plus}</button>
      <button className="h-icobtn" title="Notifications">{HIco.bell}</button>
      <span className="h-avatar">KP</span>
    </header>
  );
}

// ─── Nav rail ──────────────────────────────────────────────────────
const H_NAV = [
  {id:'home',        label:'Home',         ico:HIco.home,       count:''},
  {id:'connections', label:'Connections',  ico:HIco.connections,count:'34'},
  {id:'reporting',   label:'Reporting',    ico:HIco.reporting,  count:''},
  {id:'permissions', label:'Permissions',  ico:HIco.permissions,count:''},
  {id:'teams',       label:'Teams & users',ico:HIco.teams,      count:'58'},
];
const H_NAV_2 = [
  {id:'audit',    label:'Audit log',  ico:HIco.audit},
  {id:'settings', label:'Settings',   ico:HIco.settings},
];
function HNav({style='rail', active='home'}){
  const cls = `h-nav ${style}`;
  if (style === 'wide'){
    return (
      <nav className={cls}>
        <div className="h-nav-section" style={{paddingTop:0}}>Workspace</div>
        {H_NAV.map(it => (
          <a key={it.id} className={`h-nav-item ${active===it.id?'on':''}`}>
            <span className="ico">{it.ico}</span>
            <span className="lbl">{it.label}</span>
            {it.count && <span className="cnt">{it.count}</span>}
          </a>
        ))}
        <div className="h-nav-section">Admin</div>
        {H_NAV_2.map(it => (
          <a key={it.id} className={`h-nav-item ${active===it.id?'on':''}`}>
            <span className="ico">{it.ico}</span>
            <span className="lbl">{it.label}</span>
          </a>
        ))}
        <div style={{flex:1}}/>
        <div className="h-card tight" style={{marginTop:8}}>
          <div className="h-row" style={{justifyContent:'space-between'}}>
            <span className="h-muted" style={{fontSize:11}}>Plan · Team</span>
            <span className="h-mono" style={{fontSize:11}}>1.4M/2M</span>
          </div>
          <div className="h-bar" style={{marginTop:7}}><i className="accent" style={{right:'30%'}}/></div>
          <a className="h-mono" style={{display:'inline-block', marginTop:8, fontSize:11, color:'var(--accent)'}}>upgrade →</a>
        </div>
      </nav>
    );
  }
  return (
    <nav className={cls}>
      {[...H_NAV, ...H_NAV_2].map(it => (
        <a key={it.id} className={`h-nav-item ${active===it.id?'on':''}`} title={it.label}>
          <span className="ico">{it.ico}</span>
          <span className="lbl">{it.label}</span>
          {it.count && <span className="cnt">{it.count}</span>}
        </a>
      ))}
    </nav>
  );
}

// ─── App frame ─────────────────────────────────────────────────────
function HAppFrame({children, density='regular', nav='rail', active='home', topBarProps={}}){
  return (
    <div className={`h-frame ${density==='compact'?'compact':(density==='comfy'?'comfy':'')}`}>
      <HTopBar {...topBarProps}/>
      <div className="h-body">
        <HNav style={nav} active={active}/>
        <div className="h-main">{children}</div>
      </div>
    </div>
  );
}

// ─── Connector swatch (small inline) ───────────────────────────────
function HSwatch({name, size}){
  const p = paletteFor(name);
  const cls = `h-swatch${size?' '+size:''}`;
  const url = logoUrl(p.logo);
  const logoSize = size==='xl' ? 44 : size==='lg' ? 30 : size==='sm' ? 13 : 17;
  return (
    <span className={cls} style={{['--_c']:p.c}}>
      {url ? <img src={url} alt="" width={logoSize} height={logoSize}
        style={{display:'block', position:'relative', zIndex:1,
          filter:'drop-shadow(0 1px 0 rgba(0,0,0,.15))'}}
        onError={(e)=>{ e.currentTarget.style.display='none';
          const n = e.currentTarget.nextSibling; if (n) n.style.display='inline'; }}/> : null}
      <span style={{display: url?'none':'inline', position:'relative', zIndex:1}}>{p.mono}</span>
    </span>
  );
}

// ─── Connector tile (the showpiece) ───────────────────────────────
function HTile({name, kind='mcp', tools=0, calls='', status='good', size, accent=true}){
  const p = paletteFor(name);
  const kindLabel = {mcp:'MCP', api:'OpenAPI', gql:'GraphQL', custom:'Custom'}[kind] || kind;
  const cls = `h-tile${size?' '+size:''}`;
  const url = logoUrl(p.logo);
  const logoSize = size==='lg' ? 60 : size==='sm' ? 32 : 42;
  const compact = size === 'sm';
  return (
    <div className={cls}>
      <div className="crown" data-pattern={p.pattern} style={{['--_c']:p.c}}>
        {!compact && (
          <span className="src-stat">
            <span className="h-dot" style={{
              background: status==='good'?'#7ee3a4': status==='warn'?'#ffd17a':'#ff9b9b',
              boxShadow: status==='good'?'0 0 0 3px rgba(126,227,164,.25)': 'none'
            }}/>
            {status}
          </span>
        )}
        {!compact && <span className="src-kind">{kindLabel}</span>}
        {url
          ? <img src={url} alt={name} width={logoSize} height={logoSize}
              style={{position:'relative', zIndex:1, display:'block',
                filter:'drop-shadow(0 1px 1px rgba(0,0,0,.18))'}}
              onError={(e)=>{ e.currentTarget.style.display='none';
                const n = e.currentTarget.nextSibling; if (n) n.style.display='inline'; }}/>
          : null}
        <span className="mono" style={{display: url?'none':'inline'}}>{p.mono}</span>
      </div>
      <div className="meta">
        <div style={{minWidth:0, flex:1}}>
          <div className="name">{name}</div>
          <div className="sub">{tools} tools{calls ? ` · ${calls}/24h` : ''}</div>
          {compact && (
            <div className="h-row" style={{gap:6, marginTop:7}}>
              <span className={`h-tag${status==='good'?' good':status==='warn'?' warn':' bad'}`} style={{padding:'3px 5px'}}>
                <span className={`h-dot ${status}`} style={{width:6, height:6, boxShadow:'none'}}/>
                {status}
              </span>
              <span className="h-tag" style={{padding:'3px 5px'}}>{kindLabel}</span>
            </div>
          )}
        </div>
        {accent && <span style={{color:'var(--muted-2)'}}>{HIco.chev}</span>}
      </div>
    </div>
  );
}

// ─── Source kind badge (refined) ──────────────────────────────────
function HKindTag({kind='mcp'}){
  const label = {mcp:'MCP', api:'OpenAPI', gql:'GraphQL', custom:'Custom'}[kind];
  const tone = {mcp:'accent', api:null, gql:null, custom:null}[kind];
  return <span className={`h-tag${tone?' '+tone:''}`}>{label}</span>;
}

// ─── Common small bits ────────────────────────────────────────────
function HDot({tone='good'}){ return <span className={`h-dot ${tone}`}/>; }
function HTag({tone, children, ...rest}){ return <span className={`h-tag${tone?' '+tone:''}`} {...rest}>{children}</span>; }
function HChip({on, x, children}){ return <span className={`h-chip${on?' on':''}`}>{children}{x && <span className="x">×</span>}</span>; }
function HAv({initials, sq, sm}){ return <span className={`h-pp${sq?' sq':''}${sm?' sm':''}`}>{initials}</span>; }
function HStack({items=[], more=0}){
  return (
    <div className="h-stack">
      {items.map((i,idx) => <HAv key={idx} initials={i}/>)}
      {more>0 && <HAv initials={`+${more}`}/>}
    </div>
  );
}

Object.assign(window, {
  HIco, paletteFor, logoUrl, CONNECTOR_PALETTE,
  HTopBar, HNav, HAppFrame,
  HTile, HSwatch, HKindTag, HDot, HTag, HChip, HAv, HStack,
});
