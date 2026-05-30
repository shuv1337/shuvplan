// hifi-permissions.jsx — refined permissions screens
/* global React, HAppFrame, HTile, HSwatch, HKindTag, HDot, HTag, HChip, HAv, HStack, HIco */

const PM_ROLES = ['Admin','Engineer','Operator','Finance','Read-only','Onboarding-bot','Forecast-runner'];
const PM_SOURCES = [
  {name:'Linear',          kind:'mcp',    tools:['createIssue','listIssues','update','comment','delete']},
  {name:'Stripe API',      kind:'api',    tools:['charges.list','refunds.create','customers.list']},
  {name:'Postgres·prod',   kind:'custom', tools:['query','exec','vacuum']},
  {name:'Slack',           kind:'mcp',    tools:['postMessage','listChannels','upload']},
];
const PM_DESTRUCTIVE = new Set(['delete','exec','vacuum','refunds.create','update']);

// Human-readable titles for each tool (matched by `<source-slug>.<tool>`)
const PM_TITLES = {
  'linear.createIssue':    'Create an Issue',
  'linear.listIssues':     'List Issues',
  'linear.update':         'Update Issue',
  'linear.comment':        'Add a Comment',
  'linear.delete':         'Delete Issue',
  'stripe.charges.list':   'List Charges',
  'stripe.refunds.create': 'Issue a Refund',
  'stripe.customers.list': 'List Customers',
  'postgres.query':        'Run Read-only Query',
  'postgres.exec':         'Execute Statement',
  'postgres.vacuum':       'Vacuum Database',
  'slack.postMessage':     'Post a Message',
  'slack.listChannels':    'List Channels',
  'slack.upload':          'Upload a File',
};
function toolSlug(sourceName, tool){
  return sourceName.toLowerCase().split(/[·\s(]/)[0] + '.' + tool;
}
function toolTitle(sourceName, tool){
  return PM_TITLES[toolSlug(sourceName, tool)] || tool;
}

function cellState(roleIdx, toolIdx, destructive){
  const seed = (roleIdx*13 + toolIdx*7) % 11;
  if (roleIdx === 0) return 'on';
  if (roleIdx === 4) return seed < 7 ? 'read' : 'off';
  if (destructive && roleIdx > 1 && roleIdx !== 5) return seed < 3 ? 'review' : 'off';
  if (seed < 6) return 'on';
  if (seed < 8) return 'read';
  return 'off';
}

const CellMark = ({s}) => {
  if (s==='on')   return <span title="allowed" style={{display:'inline-block', width:16, height:16, border:'1.5px solid var(--brand)', background:'var(--brand)', borderRadius:4, position:'relative'}}>
    <span style={{position:'absolute', inset:'3px', borderLeft:'1.5px solid #fff', borderBottom:'1.5px solid #fff', transform:'rotate(-45deg) translate(1px,-1px)'}}/>
  </span>;
  if (s==='read') return <span title="read-only" style={{display:'inline-block', width:16, height:16, border:'1.5px solid var(--muted)', borderRadius:4, background:'transparent'}}/>;
  if (s==='review')return <span title="requires review" style={{display:'inline-block', width:16, height:16, border:'1.5px solid var(--gold)', background:'var(--gold-soft)', borderRadius:4, color:'var(--gold-ink)', font:'700 10px/14px var(--font-display)', textAlign:'center'}}>!</span>;
  return <span style={{display:'inline-block', width:16, height:16, border:'1.5px dashed var(--muted-2)', borderRadius:4, background:'transparent', opacity:.45}}/>;
};

// ═══════════════════════════════════════════════════════════════════
// A · Permissions · Matrix
// ═══════════════════════════════════════════════════════════════════
function HPermissionsMatrix({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="permissions">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">Access policy · matrix view</div>
            <h1 style={{marginTop:8}}>Permissions</h1>
            <div className="sub" style={{marginTop:6}}>
              <span className="h-italic">Who can call which tool. Cells:</span>{' '}
              <span style={{display:'inline-flex', alignItems:'center', gap:5, marginRight:8}}>
                <CellMark s="on"/> <span style={{fontSize:12}}>allowed</span>
              </span>
              <span style={{display:'inline-flex', alignItems:'center', gap:5, marginRight:8}}>
                <CellMark s="read"/> <span style={{fontSize:12}}>read-only</span>
              </span>
              <span style={{display:'inline-flex', alignItems:'center', gap:5, marginRight:8}}>
                <CellMark s="review"/> <span style={{fontSize:12}}>requires review</span>
              </span>
              <span style={{display:'inline-flex', alignItems:'center', gap:5}}>
                <CellMark s="off"/> <span style={{fontSize:12}}>denied</span>
              </span>
            </div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Test as user…</button>
            <button className="h-btn">Export policy</button>
            <button className="h-btn primary">+ New role</button>
          </div>
        </div>
        <div className="h-row" style={{marginTop:6, gap:8, flexWrap:'wrap'}}>
          <div className="h-search" style={{width:240}}>{HIco.search}<span>Filter tools…</span></div>
          <HChip on>All sources</HChip><HChip>MCP</HChip><HChip>OpenAPI</HChip><HChip>Custom</HChip>
          <span style={{width:1, height:20, background:'var(--line-strong)'}}/>
          <HChip on x>destructive only</HChip>
          <div className="h-spacer"/>
          <button className="h-btn sm">Group · by source</button>
        </div>
      </div>
      <div className="h-pagebody" style={{padding:0, overflow:'auto'}}>
        <table className="h-table" style={{minWidth:980}}>
          <thead>
            <tr>
              <th style={{position:'sticky', left:0, background:'var(--surface)', zIndex:1, minWidth:280}}>Tool</th>
              {PM_ROLES.map(r => (
                <th key={r} style={{textAlign:'center', verticalAlign:'bottom', padding:'10px 6px'}}>
                  <div style={{writingMode:'vertical-rl', transform:'rotate(180deg)', display:'inline-block', whiteSpace:'nowrap', padding:'8px 0'}}>{r}</div>
                </th>
              ))}
              <th style={{width:40}}></th>
            </tr>
          </thead>
          <tbody>
            {PM_SOURCES.map((s, sIdx) => (
              <React.Fragment key={s.name}>
                <tr>
                  <td colSpan={PM_ROLES.length+2} style={{background:'var(--bg-2)', padding:'9px 14px'}}>
                    <div className="h-row" style={{gap:10}}>
                      <HSwatch name={s.name} size="sm"/>
                      <span style={{fontWeight:600, fontSize:13}}>{s.name}</span>
                      <span className="h-muted h-mono" style={{fontSize:11}}>{s.tools.length} tools</span>
                    </div>
                  </td>
                </tr>
                {s.tools.map((t, tIdx) => {
                  const destructive = PM_DESTRUCTIVE.has(t);
                  const slug = toolSlug(s.name, t);
                  const title = toolTitle(s.name, t);
                  return (
                    <tr key={t}>
                      <td style={{position:'sticky', left:0, background:'var(--surface)'}}>
                        <div className="h-row" style={{gap:8}}>
                          <div>
                            <span style={{fontWeight:600, fontSize:13, color:'var(--ink)'}}>{title}</span>{' '}
                            <span className="h-mono h-muted" style={{fontSize:11.5}}>({slug})</span>
                          </div>
                          {destructive && <HTag tone="bad">destructive</HTag>}
                        </div>
                      </td>
                      {PM_ROLES.map((r, rIdx) => (
                        <td key={r} style={{textAlign:'center', padding:'10px 6px'}}>
                          <CellMark s={cellState(rIdx, tIdx + sIdx*10, destructive)}/>
                        </td>
                      ))}
                      <td style={{textAlign:'right', color:'var(--muted-2)'}}>{HIco.dots}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// B · Permissions · User-centric inspector
// ═══════════════════════════════════════════════════════════════════
function HPermissionsInspector({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="permissions">
      <div className="h-pagehead row">
        <div>
          <div className="eyebrow">Access · by caller</div>
          <h1 style={{fontSize:22, marginTop:6}}>Permissions</h1>
        </div>
        <HChip on>By user</HChip><HChip>By tool</HChip><HChip>By role</HChip>
        <div className="h-spacer"/>
        <button className="h-btn">Simulate call…</button>
        <button className="h-btn primary">+ New role</button>
      </div>
      <div className="h-pagebody" style={{flexDirection:'row', padding:0, gap:0, overflow:'hidden'}}>
        {/* user list */}
        <aside style={{width:248, borderRight:'1px solid var(--line)', background:'var(--surface)', overflow:'auto'}}>
          <div style={{padding:'12px 14px'}}>
            <div className="h-search" style={{width:'100%', padding:'7px 10px'}}>{HIco.search}<span>Find user / agent</span></div>
          </div>
          {[
            ['People', [['Kyle Patterson','KP','Admin'],['Mira Rao','MR','Engineer'],['Dev Vora','DV','Read-only'],['Jules Singh','JS','Operator'],['Finance Bot','FB','Finance']]],
            ['Agents', [['onboarding-bot','⌬','Onboarding-bot'],['forecast-runner','⌬','Forecast-runner'],['backfill','⌬','Read-only']]],
          ].map(([h, list], gi) => (
            <div key={h}>
              <div className="h-nav-section" style={{paddingLeft:14, color:'var(--muted-2)'}}>{h}</div>
              {list.map(([n,a,role], i) => {
                const isActive = gi===1 && i===0;
                return (
                  <div key={n} className="h-row" style={{padding:'10px 14px', gap:11,
                    background: isActive?'var(--bg-2)':'transparent',
                    borderLeft: isActive?'3px solid var(--gold)':'3px solid transparent'}}>
                    <HAv initials={a} sq={a==='⌬'}/>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:12.5, fontWeight:600, color:'var(--ink)'}}>{n}</div>
                      <div className="h-muted h-mono" style={{fontSize:10.5}}>{role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </aside>

        {/* inspector */}
        <div style={{flex:1, minWidth:0, overflow:'auto', padding:'22px 26px'}}>
          <div className="h-row" style={{gap:16}}>
            <HAv initials="⌬" sq/>
            <div style={{flex:1}}>
              <div className="eyebrow" style={{marginBottom:6}}>Agent · onboarding-bot</div>
              <div style={{font:'500 24px/1.1 var(--font-display)', textTransform:'uppercase', letterSpacing:'.005em', color:'var(--brand)'}}>onboarding-bot</div>
              <div className="h-row" style={{gap:8, marginTop:8}}>
                <HTag tone="accent">agent</HTag>
                <HTag>Onboarding-bot role</HTag>
                <span className="h-muted h-italic" style={{fontSize:12}}>created Apr 12 by kyle@latitudes.io · last call 2m ago</span>
              </div>
            </div>
            <button className="h-btn">Change role…</button>
            <button className="h-btn" style={{color:'var(--bad)', borderColor:'var(--bad)'}}>Revoke</button>
          </div>

          <div className="h-grid" style={{gridTemplateColumns:'repeat(3,1fr)', marginTop:20}}>
            {[['Tools allowed','27 / 207'],['Destructive · auto-run','0'],['Destructive · with review','4']].map(([l,v]) => (
              <div key={l} className="h-card">
                <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
                <div className="stat">{v}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:22, marginBottom:12, fontWeight:700, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)'}}>
            Effective access · grouped by source
          </div>
          <div className="h-col" style={{gap:12}}>
            {PM_SOURCES.map(s => (
              <div key={s.name} className="h-card">
                <div className="h-row" style={{justifyContent:'space-between'}}>
                  <div className="h-row" style={{gap:12}}>
                    <HSwatch name={s.name} size="lg"/>
                    <div>
                      <div style={{fontWeight:600, fontSize:14}}>{s.name}</div>
                      <div className="h-muted h-mono" style={{fontSize:11, marginTop:2}}>per-user credentials</div>
                    </div>
                  </div>
                  <button className="h-btn sm ghost">edit</button>
                </div>
                <div className="h-row" style={{gap:6, marginTop:12, flexWrap:'wrap'}}>
                  {s.tools.map(t => {
                    const destructive = PM_DESTRUCTIVE.has(t);
                    const allowed = !destructive || s.name==='Linear';
                    return (
                      <span key={t} className="h-chip" style={{opacity: allowed?1:0.4, textDecoration: allowed?'none':'line-through'}}>
                        <span className="h-mono" style={{fontSize:11, textTransform:'none', letterSpacing:0}}>{t}</span>
                        {destructive && allowed && <HTag tone="accent" style={{marginLeft:4}}>review</HTag>}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:22, marginBottom:10, fontWeight:700, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)'}}>
            Recent denied calls
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <table className="h-table">
              <tbody>
                {[
                  ['postgres.exec','Postgres·prod','no write access','11m ago'],
                  ['stripe.refunds.create','Stripe API','requires review · approver missing','42m ago'],
                  ['linear.delete','Linear','destructive · denied for role','2h ago']
                ].map(([t,src,r,d]) => (
                  <tr key={t+d}>
                    <td style={{width:36}}><HSwatch name={src} size="sm"/></td>
                    <td><span className="h-mono">{t}</span></td>
                    <td className="h-muted h-italic" style={{fontSize:12}}>{r}</td>
                    <td className="h-mono h-muted" style={{fontSize:11, textAlign:'right'}}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HAppFrame>
  );
}

Object.assign(window, { HPermissionsMatrix, HPermissionsInspector, PM_TITLES, toolSlug, toolTitle });
