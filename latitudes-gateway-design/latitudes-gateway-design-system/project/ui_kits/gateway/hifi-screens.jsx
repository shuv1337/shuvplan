// hifi-screens.jsx — refined / hi-fi screens for Latitudes Gateway
/* global React, HAppFrame, HTile, HSwatch, HKindTag, HDot, HTag, HChip, HAv, HStack, HIco, paletteFor */

const HI_SOURCES = [
  {name:'Linear',          kind:'mcp', tools:14, status:'good', calls:'12.4k', trend:'+8',  owner:'kyle@latitudes.io'},
  {name:'Stripe API',      kind:'api', tools:42, status:'good', calls:'8.1k',  trend:'+2',  owner:'finance-bot'},
  {name:'Postgres·prod',   kind:'custom', tools:7,  status:'warn', calls:'5.6k',  trend:'-12', owner:'kyle@latitudes.io'},
  {name:'Slack',           kind:'mcp', tools:21, status:'good', calls:'4.9k',  trend:'+1',  owner:'mira@latitudes.io'},
  {name:'GitHub GraphQL',  kind:'gql', tools:38, status:'good', calls:'3.2k',  trend:'+22', owner:'eng-platform'},
  {name:'Sentry',          kind:'api', tools:11, status:'bad',  calls:'1.7k',  trend:'—',   owner:'mira@latitudes.io'},
  {name:'Notion',          kind:'mcp', tools:8,  status:'good', calls:'1.2k',  trend:'+4',  owner:'kyle@latitudes.io'},
  {name:'BigQuery',        kind:'api', tools:19, status:'good', calls:'940',   trend:'+6',  owner:'data-platform'},
  {name:'Snowflake (sql)', kind:'custom', tools:4, status:'good', calls:'612',  trend:'+1',  owner:'data-platform'},
  {name:'Zendesk',         kind:'api', tools:23, status:'good', calls:'480',   trend:'+14', owner:'mira@latitudes.io'},
  {name:'HubSpot',         kind:'api', tools:31, status:'good', calls:'410',   trend:'+9',  owner:'finance-bot'},
  {name:'Intercom',        kind:'mcp', tools:13, status:'warn', calls:'140',   trend:'-3',  owner:'mira@latitudes.io'},
];

const HI_ACTIVITY = [
  {who:'onboarding-bot', sq:true,  tool:'linear.createIssue',     dt:'2m',  destructive:false, ok:true,  src:'Linear'},
  {who:'KP',             sq:false, tool:'stripe.refunds.create',  dt:'4m',  destructive:true,  ok:true,  src:'Stripe API'},
  {who:'forecast-runner',sq:true,  tool:'postgres.query',         dt:'6m',  destructive:false, ok:false, src:'Postgres·prod'},
  {who:'MR',             sq:false, tool:'slack.postMessage',      dt:'11m', destructive:false, ok:true,  src:'Slack'},
  {who:'backfill',       sq:true,  tool:'github.search',          dt:'14m', destructive:false, ok:true,  src:'GitHub GraphQL'},
  {who:'DV',             sq:false, tool:'postgres.exec',          dt:'19m', destructive:true,  ok:false, src:'Postgres·prod'},
  {who:'onboarding-bot', sq:true,  tool:'notion.pages.create',    dt:'27m', destructive:true,  ok:true,  src:'Notion'},
];

// ═══════════════════════════════════════════════════════════════════
// 1 · DASHBOARD — refined, generous, mixes brand color + quiet ink
// ═══════════════════════════════════════════════════════════════════
function HDashboard({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="home">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">Workspace overview · Tue, May 12</div>
            <h1 style={{marginTop:8}}>Good morning, <em>Kyle</em>.</h1>
            <div className="sub" style={{marginTop:6}}><span className="h-italic">12 sources answered</span> <strong style={{color:'var(--ink)', fontWeight:700}}>38,412 calls</strong> <span className="h-italic">overnight. Three need a look — everything else is humming.</span></div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Audit log</button>
            <button className="h-btn primary">+ Add source</button>
          </div>
        </div>
      </div>
      <div className="h-pagebody">
        {/* hero KPI row */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[
            ['Tool calls · 24h', '38,412', '+6.4%', 'good'],
            ['Active agents',    '17',     '+2',     'good'],
            ['Errors',           '142',    '0.37%',  'warn'],
            ['p95 latency',      '412 ms', '−18 ms', 'good'],
          ].map(([l,v,d,t]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5, letterSpacing:'.01em'}}>{l}</div>
              <div style={{font:'400 30px/1.05 var(--font-serif)', letterSpacing:'-.02em', marginTop:8, color:'var(--ink)'}}>{v}</div>
              <div className="h-row" style={{marginTop:8, gap:6, fontSize:11}}>
                {t==='good' ? <span style={{color:'var(--good)'}}>{HIco.arrowUp}</span> : null}
                <span className="h-mono h-muted">{d}</span>
              </div>
            </div>
          ))}
        </div>

        {/* connectors at a glance + needs attention */}
        <div className="h-grid" style={{gridTemplateColumns:'2fr 1fr', gap:18}}>
          <div className="h-card" style={{padding:'18px 18px 14px'}}>
            <div className="h-row" style={{justifyContent:'space-between', marginBottom:14}}>
              <div>
                <h3>Your connectors</h3>
                <div className="sub">12 of 34 most active · last 24h</div>
              </div>
              <div className="h-row" style={{gap:6}}>
                <HChip on>All</HChip><HChip>Healthy</HChip><HChip>Degraded</HChip>
                <a className="h-mono" style={{fontSize:11, color:'var(--accent)', marginLeft:6}}>view all →</a>
              </div>
            </div>
            <div className="h-grid" style={{gridTemplateColumns:'repeat(6,1fr)', gap:10}}>
              {HI_SOURCES.slice(0,12).map(s => (
                <HTile key={s.name} size="sm" name={s.name} kind={s.kind} tools={s.tools} status={s.status} accent={false}/>
              ))}
            </div>
          </div>

          <div className="h-card">
            <h3>Needs your attention</h3>
            <div className="h-col" style={{gap:0, marginTop:10}}>
              {[
                {sw:'Sentry',  msg:'Returning 502 from upstream', tone:'bad'},
                {sw:'Postgres·prod', msg:'p95 latency ↑ 3.2× over baseline', tone:'warn'},
                {sw:'Intercom', msg:'Credentials expire in 4 days', tone:'warn'},
                {sw:null, msg:'2 pending access requests', tone:'off'},
              ].map((it,i) => (
                <div key={i} className="h-row" style={{padding:'11px 0', borderTop: i===0?'none':'1px solid var(--line-2)', gap:11}}>
                  {it.sw ? <HSwatch name={it.sw} size="sm"/> : <HDot tone={it.tone}/>}
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, color:'var(--ink-2)'}}>{it.msg}</div>
                    {it.sw && <div className="h-mono h-muted" style={{fontSize:10.5, marginTop:2}}>{it.sw}</div>}
                  </div>
                  <span style={{color:'var(--muted-2)'}}>{HIco.chev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* recent activity */}
        <div className="h-card" style={{padding:0, overflow:'hidden'}}>
          <div className="h-row" style={{padding:'14px 18px', justifyContent:'space-between', borderBottom:'1px solid var(--line-2)'}}>
            <h3 style={{margin:0}}>Recent activity</h3>
            <div className="h-row" style={{gap:6}}>
              <HChip on>All</HChip><HChip>Agents</HChip><HChip>People</HChip><HChip>Destructive</HChip>
              <a className="h-mono" style={{fontSize:11, color:'var(--accent)', marginLeft:6}}>open log →</a>
            </div>
          </div>
          <table className="h-table">
            <thead><tr>
              <th>Caller</th><th>Tool</th><th>Source</th><th style={{width:80}}>Result</th><th style={{width:80, textAlign:'right'}}>When</th>
            </tr></thead>
            <tbody>
              {HI_ACTIVITY.map((a,i) => (
                <tr key={i}>
                  <td>
                    <div className="h-row" style={{gap:10}}>
                      <HAv initials={a.sq?'⌬':a.who} sq={a.sq}/>
                      <span style={{fontSize:12.5, fontWeight: a.sq?500:400}}>{a.sq?a.who:`${a.who.toLowerCase()}@latitudes.io`}</span>
                    </div>
                  </td>
                  <td>
                    <span className="h-mono">{a.tool}</span>
                    {a.destructive && <HTag tone="bad" style={{marginLeft:6}}>destructive</HTag>}
                  </td>
                  <td>
                    <div className="h-row" style={{gap:8}}>
                      <HSwatch name={a.src} size="sm"/>
                      <span style={{fontSize:12}}>{a.src}</span>
                    </div>
                  </td>
                  <td>{a.ok ? <HTag tone="good">200</HTag> : <HTag tone="bad">5xx</HTag>}</td>
                  <td className="h-mono h-muted" style={{fontSize:11, textAlign:'right'}}>{a.dt} ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2 · CONNECTIONS · GALLERY  — full graphical tile grid
// ═══════════════════════════════════════════════════════════════════
function HConnectionsGallery({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="connections">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">Governed sources · your team</div>
            <h1 style={{marginTop:8}}>Connections</h1>
            <div className="sub" style={{marginTop:6}}><strong style={{color:'var(--ink)', fontWeight:700}}>34 sources · 207 tools</strong> <span className="h-italic">exposed across MCP, OpenAPI, GraphQL and custom adapters.</span></div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Browse marketplace</button>
            <button className="h-btn">Import OpenAPI</button>
            <button className="h-btn primary">+ Add source</button>
          </div>
        </div>
        <div className="h-row" style={{marginTop:14, gap:10}}>
          <div className="h-search" style={{flex:1, maxWidth:520}}>{HIco.search}<span>Search by source, tool name, or owner…</span><span className="kbd">⌘K</span></div>
          <button className="h-btn">{HIco.filter}<span style={{marginLeft:2}}>Filters</span><HTag tone="accent" style={{marginLeft:4}}>2</HTag></button>
          <button className="h-btn">A→Z</button>
          <div className="h-spacer"/>
          <div className="h-row" style={{gap:0, border:'1px solid var(--line-strong)', borderRadius:8, padding:2, background:'var(--surface)'}}>
            <span className="h-chip on" style={{borderRadius:6}}>Gallery</span>
            <span className="h-chip" style={{borderRadius:6, border:'none', background:'transparent'}}>List</span>
            <span className="h-chip" style={{borderRadius:6, border:'none', background:'transparent'}}>Table</span>
          </div>
        </div>
      </div>
      <div className="h-pagebody">
        <div className="h-row" style={{gap:6}}>
          <span className="h-muted" style={{fontSize:11.5}}>Active filters:</span>
          <HChip on x>type · MCP</HChip><HChip on x>team · Eng</HChip>
          <a className="h-mono" style={{fontSize:11, color:'var(--accent)', marginLeft:6}}>clear</a>
        </div>

        {/* featured row — bigger tiles for top 4 */}
        <div>
          <div className="h-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div style={{fontWeight:600, fontSize:13}}>Most active · this week</div>
            <span className="h-muted" style={{fontSize:11}}>4 of 34</span>
          </div>
          <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
            {HI_SOURCES.slice(0,4).map(s => (
              <HTile key={s.name} size="lg" name={s.name} kind={s.kind} tools={s.tools} calls={s.calls} status={s.status}/>
            ))}
          </div>
        </div>

        <div>
          <div className="h-row" style={{justifyContent:'space-between', marginBottom:10, marginTop:6}}>
            <div style={{fontWeight:600, fontSize:13}}>All connections</div>
            <span className="h-muted" style={{fontSize:11}}>30 more</span>
          </div>
          <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
            {HI_SOURCES.slice(4).map(s => (
              <HTile key={s.name} name={s.name} kind={s.kind} tools={s.tools} calls={s.calls} status={s.status}/>
            ))}
            {/* add card */}
            <div className="h-tile" style={{cursor:'default'}}>
              <div className="crown" style={{['--_c']:'transparent', background:'var(--bg-2)', border:'1px dashed var(--line-strong)'}}>
                <span style={{color:'var(--muted)', font:'400 13px/1.4 var(--font-ui)', textAlign:'center', maxWidth:180}}>
                  <span style={{fontSize:24, display:'block', marginBottom:4, color:'var(--ink-3)'}}>+</span>
                  Add an MCP, OpenAPI spec, GraphQL endpoint, or custom adapter
                </span>
              </div>
              <div className="meta">
                <div>
                  <div className="name" style={{color:'var(--muted)'}}>Add source</div>
                  <div className="sub">npm i @executor/cli</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3 · CONNECTIONS · REFINED LIST — left swatches + dense info
// ═══════════════════════════════════════════════════════════════════
function HConnectionsList({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="connections">
      <div className="h-pagehead row">
        <div>
          <div className="eyebrow">All sources</div>
          <h1 style={{fontSize:22, marginTop:6}}>Connections</h1>
        </div>
        <span className="h-italic" style={{fontSize:13}}>34 sources · 207 tools</span>
        <div className="h-spacer"/>
        <button className="h-btn">Export</button>
        <button className="h-btn primary">+ Add source</button>
      </div>
      <div className="h-pagebody" style={{flexDirection:'row', padding:0, gap:0, overflow:'hidden'}}>
        {/* filter rail */}
        <aside style={{width:228, padding:'18px 16px', borderRight:'1px solid var(--line)', background:'var(--surface-2)', overflow:'auto'}}>
          <div className="h-search" style={{width:'100%', padding:'6px 9px'}}>{HIco.search}<span>Search</span></div>
          {[
            ['Type', [['MCP',12,1],['OpenAPI',14,0],['GraphQL',4,0],['Custom',4,0]]],
            ['Status', [['Healthy',30,0],['Degraded',3,1],['Down',1,0]]],
            ['Credentials', [['Shared',22,0],['Per-user',12,0]]],
            ['Team', [['Eng',1,1],['Ops',1,0],['Finance',1,0],['Data',1,0]]],
            ['Owner', [['kyle@latitudes.io',0,0],['mira@latitudes.io',0,0],['eng-platform',0,0]]],
          ].map(([h, opts]) => (
            <div key={h} style={{marginTop:18}}>
              <div style={{fontWeight:600, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8}}>{h}</div>
              <div className="h-col" style={{gap:6}}>
                {opts.map(([n,c,checked]) => (
                  <label key={n} className="h-row" style={{gap:8, fontSize:12, color:'var(--ink-2)'}}>
                    <span style={{
                      width:14, height:14, border:`1.5px solid ${checked?'var(--ink)':'var(--line-strong)'}`,
                      borderRadius:4, background:checked?'var(--ink)':'transparent', display:'inline-block', flex:'0 0 14px', position:'relative'
                    }}>{checked ? <span style={{position:'absolute', inset:'2px', borderLeft:'1.5px solid var(--bg)', borderBottom:'1.5px solid var(--bg)', transform:'rotate(-45deg) translate(1px,-1px)'}}/> : null}</span>
                    <span style={{flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{n}</span>
                    {c>0 && <span className="h-muted h-mono" style={{fontSize:10.5}}>{c}</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* main list */}
        <div style={{flex:1, minWidth:0, overflow:'auto'}}>
          <table className="h-table">
            <thead><tr>
              <th>Source</th>
              <th>Tools</th>
              <th>Owner</th>
              <th>Credentials</th>
              <th>Calls · 24h</th>
              <th>Last used</th>
              <th></th>
            </tr></thead>
            <tbody>
              {HI_SOURCES.map((s,i) => (
                <tr key={s.name}>
                  <td>
                    <div className="h-row" style={{gap:12}}>
                      <HSwatch name={s.name} size="lg"/>
                      <div>
                        <div style={{fontWeight:600, fontSize:13.5, color:'var(--ink)'}}>{s.name}</div>
                        <div className="h-row" style={{gap:6, marginTop:4}}>
                          <HKindTag kind={s.kind}/>
                          <HDot tone={s.status}/>
                          <span className="h-muted" style={{fontSize:11}}>{s.status==='good'?'healthy':s.status==='warn'?'degraded':'down'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{font:'400 18px/1 var(--font-serif)', color:'var(--ink)'}}>{s.tools}</div>
                    <div className="h-muted" style={{fontSize:10.5, marginTop:2}}>callable</div>
                  </td>
                  <td className="h-mono" style={{fontSize:11.5}}>{s.owner}</td>
                  <td>{i%2===0 ? <HTag>shared</HTag> : <HTag tone="accent">per-user</HTag>}</td>
                  <td>
                    <div className="h-mono" style={{fontSize:13, color:'var(--ink)'}}>{s.calls}</div>
                    <div className="h-row" style={{gap:5, marginTop:3, fontSize:10.5}}>
                      <span style={{color: s.trend.startsWith('-')?'var(--bad)': s.trend==='—'?'var(--muted)':'var(--good)'}}>
                        {s.trend.startsWith('-')?HIco.arrowDown : s.trend==='—'?'·':HIco.arrowUp}
                      </span>
                      <span className="h-muted h-mono">{s.trend}{s.trend==='—'?'':' %'}</span>
                    </div>
                  </td>
                  <td className="h-muted h-mono" style={{fontSize:11.5}}>{['2m','4m','6m','11m','14m','19m','34m','1h','2h','3h','4h','6h'][i]} ago</td>
                  <td style={{textAlign:'right'}}><span style={{color:'var(--muted-2)'}}>{HIco.dots}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4 · CONNECTION DETAIL — single source, hero + tabs
// ═══════════════════════════════════════════════════════════════════
function HConnectionDetail({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="connections">
      {/* hero */}
      <div style={{borderBottom:'1px solid var(--line)', background:'var(--surface-2)'}}>
        <div style={{padding:'18px 30px 0', display:'flex', flexDirection:'column', gap:14}}>
          <div className="h-row" style={{gap:8, fontSize:12, color:'var(--muted)'}}>
            <a className="h-mono">Connections</a>
            <span>/</span>
            <span style={{color:'var(--ink-2)'}}>Linear</span>
          </div>
          <div className="h-row" style={{gap:20, alignItems:'flex-end'}}>
            <HSwatch name="Linear" size="xl"/>
            <div style={{flex:1}}>
              <div className="eyebrow">MCP source · added Apr 2</div>
              <h1 style={{margin:'8px 0 0', fontSize:34}}>Linear</h1>
              <div className="h-row" style={{gap:8, marginTop:10}}>
                <HKindTag kind="mcp"/>
                <HTag tone="good"><HDot tone="good"/>healthy</HTag>
                <HTag>shared credentials</HTag>
                <span className="h-muted h-mono" style={{fontSize:11.5}}>npm: @executor/source-linear · v3.4.1 · added Apr 2, 2026 by kyle@latitudes.io</span>
              </div>
            </div>
            <div className="h-row" style={{gap:8}}>
              <button className="h-btn">Test a tool</button>
              <button className="h-btn">Rotate credentials</button>
              <button className="h-btn primary">Edit source</button>
            </div>
          </div>
          <div className="h-tabs" style={{borderBottom:'none', marginTop:6}}>
            <div className="h-tab on">Overview</div>
            <div className="h-tab">Tools <span className="h-muted h-mono" style={{fontSize:10.5, marginLeft:4}}>14</span></div>
            <div className="h-tab">Schemas</div>
            <div className="h-tab">Access <span className="h-muted h-mono" style={{fontSize:10.5, marginLeft:4}}>22</span></div>
            <div className="h-tab">Activity</div>
            <div className="h-tab">Settings</div>
          </div>
        </div>
      </div>

      <div className="h-pagebody" style={{paddingTop:20}}>
        {/* KPI row */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[['Tool calls · 7d','42,180','+8.4%'],['Avg latency','89 ms','−4'],['Errors','0.12%','51 of 42,180'],['Tools exposed','14','+1 last month']].map(([l,v,d]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
              <div style={{font:'400 26px/1 var(--font-serif)', letterSpacing:'-.02em', marginTop:8, color:'var(--ink)'}}>{v}</div>
              <div className="h-mono h-muted" style={{fontSize:11, marginTop:6}}>{d}</div>
            </div>
          ))}
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'2fr 1fr'}}>
          {/* tools */}
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <div className="h-row" style={{padding:'14px 18px', justifyContent:'space-between', borderBottom:'1px solid var(--line-2)'}}>
              <h3 style={{margin:0}}>Exposed tools</h3>
              <div className="h-row" style={{gap:6}}>
                <HChip on>All</HChip><HChip>Destructive · 3</HChip><HChip>Read-only</HChip>
                <a className="h-mono" style={{fontSize:11, color:'var(--accent)', marginLeft:6}}>add a tool →</a>
              </div>
            </div>
            <table className="h-table">
              <thead><tr><th>Tool</th><th>Inputs → output</th><th>Calls · 7d</th><th></th></tr></thead>
              <tbody>
                {[
                  {n:'linear.createIssue', io:'{ title, body?, team } → Issue', c:'7.8k',  destr:false},
                  {n:'linear.listIssues',  io:'{ filter, limit? } → Issue[]',  c:'12.4k', destr:false},
                  {n:'linear.update',      io:'{ id, patch } → Issue',         c:'4.1k',  destr:true},
                  {n:'linear.comment',     io:'{ id, body } → Comment',        c:'2.7k',  destr:false},
                  {n:'linear.delete',      io:'{ id } → boolean',              c:'82',    destr:true},
                  {n:'linear.search',      io:'{ q, limit? } → Issue[]',       c:'9.2k',  destr:false},
                ].map(t => (
                  <tr key={t.n}>
                    <td>
                      <div className="h-row" style={{gap:8}}>
                        <span className="h-mono" style={{fontSize:12, color:'var(--ink)'}}>{t.n}</span>
                        {t.destr && <HTag tone="bad">destructive</HTag>}
                      </div>
                    </td>
                    <td className="h-mono h-muted" style={{fontSize:11}}>{t.io}</td>
                    <td>
                      <div className="h-row" style={{gap:8}}>
                        <span className="h-mono">{t.c}</span>
                        <div className="h-bar" style={{width:60}}><i className="accent" style={{right:`${Math.max(0,100-parseInt(t.c)*8)}%`}}/></div>
                      </div>
                    </td>
                    <td style={{textAlign:'right'}}><button className="h-btn sm">try →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* access summary */}
          <div className="h-col" style={{gap:14}}>
            <div className="h-card">
              <h3>Access</h3>
              <div className="h-row" style={{marginTop:12, gap:10, justifyContent:'space-between'}}>
                <HStack items={['KP','MR','DV','JS','AC','SQ']} more={16}/>
                <span className="h-muted h-mono" style={{fontSize:11}}>22 callers · 4 teams</span>
              </div>
              <div className="h-col" style={{marginTop:14, gap:8}}>
                {[['Eng',14],['Ops',3],['All-hands',3],['onboarding-bot',2]].map(([n,c]) => (
                  <div key={n}>
                    <div className="h-row" style={{justifyContent:'space-between', fontSize:11.5}}>
                      <span>{n}</span><span className="h-mono h-muted">{c}</span>
                    </div>
                    <div className="h-bar" style={{marginTop:4}}><i style={{right:`${100-c*5}%`}}/></div>
                  </div>
                ))}
              </div>
              <button className="h-btn" style={{width:'100%', marginTop:12, justifyContent:'center'}}>Manage permissions →</button>
            </div>
            <div className="h-card">
              <h3>Credentials</h3>
              <div className="h-row" style={{justifyContent:'space-between', marginTop:10}}>
                <HTag>shared</HTag>
                <span className="h-mono h-muted" style={{fontSize:11}}>rotated 41d ago</span>
              </div>
              <div className="h-mono" style={{fontSize:11, color:'var(--ink-2)', marginTop:10, padding:8, background:'var(--bg-2)', borderRadius:6, border:'1px solid var(--line)'}}>
                LIN_API_KEY = lin_••••••••••••••••3f4a
              </div>
              <div className="h-row" style={{marginTop:10, gap:6}}>
                <button className="h-btn sm">Rotate</button>
                <button className="h-btn sm ghost">View in vault</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HAppFrame>
  );
}

Object.assign(window, { HDashboard, HConnectionsGallery, HConnectionsList, HConnectionDetail });
