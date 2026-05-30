// hifi-perms-2.jsx — additional permissions screens
/* global React, HAppFrame, HSwatch, HDot, HTag, HChip, HAv, HStack, HIco */

const PE_SOURCES = [
  {name:'Linear',          kind:'mcp',    tools:['createIssue','listIssues','update','comment','delete','search']},
  {name:'Stripe API',      kind:'api',    tools:['charges.list','refunds.create','customers.list','customers.update','invoices.send']},
  {name:'Postgres·prod',   kind:'custom', tools:['query','exec','vacuum','schema.list']},
  {name:'Slack',           kind:'mcp',    tools:['postMessage','listChannels','upload','archive']},
  {name:'GitHub GraphQL',  kind:'gql',    tools:['search','createPullRequest','mergePullRequest','deleteBranch']},
];
const PE_DESTR = new Set(['delete','exec','vacuum','refunds.create','update','customers.update','archive','mergePullRequest','deleteBranch','invoices.send']);

// Human-readable titles for additional tools in the policy editor.
// Falls back to the global `toolTitle` (defined in hifi-permissions.jsx).
const PE_TITLES = {
  'linear.search':               'Search Issues',
  'stripe.customers.update':     'Update Customer',
  'stripe.invoices.send':        'Send an Invoice',
  'postgres.schema.list':        'List Schemas',
  'slack.archive':               'Archive a Channel',
  'github.search':               'Search Repositories',
  'github.createPullRequest':    'Open a Pull Request',
  'github.mergePullRequest':     'Merge a Pull Request',
  'github.deleteBranch':         'Delete a Branch',
};
function peTitle(sourceName, tool){
  const slug = toolSlug(sourceName, tool);
  return PE_TITLES[slug] || (typeof PM_TITLES !== 'undefined' && PM_TITLES[slug]) || tool;
}

// ═══════════════════════════════════════════════════════════════════
// C · Permissions · Policy editor (accordion per source)
// ═══════════════════════════════════════════════════════════════════
function HPermissionsPolicy({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="permissions">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="h-row" style={{gap:8, fontSize:11.5, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>
              <a>Permissions</a>
              <span>/</span>
              <span>Roles</span>
            </div>
            <h1 style={{marginTop:6}}>Engineer <span className="serif">role</span></h1>
            <div className="h-row" style={{marginTop:10, gap:8, alignItems:'center'}}>
              <HTag tone="brand">14 members</HTag>
              <span className="h-muted h-italic" style={{fontSize:12.5}}>inherits from</span>
              <HChip>Read-only</HChip>
              <span className="h-muted h-italic" style={{fontSize:12.5}}>· applied to</span>
              <HChip>team · Eng</HChip>
              <HChip>team · Ops</HChip>
            </div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Duplicate</button>
            <button className="h-btn">Discard</button>
            <button className="h-btn gold">Save changes</button>
          </div>
        </div>
      </div>
      <div className="h-pagebody">
        <div className="h-row" style={{gap:8}}>
          <div className="h-search" style={{flex:1, maxWidth:420}}>{HIco.search}<span>Search tools…</span></div>
          <button className="h-btn">Bulk · allow read</button>
          <button className="h-btn">Bulk · require review</button>
        </div>

        {PE_SOURCES.map((s, sIdx) => {
          const isOpen = sIdx === 0;
          const allowedCount = s.tools.filter(t => !PE_DESTR.has(t)).length;
          return (
            <div key={s.name} className="h-card" style={{padding:0, overflow:'hidden'}}>
              {/* accordion header */}
              <div className="h-row" style={{padding:'12px 16px', justifyContent:'space-between', borderBottom: isOpen?'1px solid var(--line-2)':'none', cursor:'default', background: isOpen?'var(--surface-2)':'var(--surface)'}}>
                <div className="h-row" style={{gap:11}}>
                  <span style={{display:'inline-flex', width:14, height:14, alignItems:'center', justifyContent:'center', color:'var(--muted)'}}>{isOpen?HIco.chevDown:HIco.chev}</span>
                  <HSwatch name={s.name} size="sm"/>
                  <span style={{fontWeight:600, fontSize:13.5}}>{s.name}</span>
                  <span className="h-muted h-mono" style={{fontSize:11}}>{s.tools.length} tools · {allowedCount} allowed</span>
                </div>
                <div className="h-row" style={{gap:6}}>
                  <HChip on>per-tool</HChip><HChip>allow all read</HChip><HChip>deny all</HChip>
                </div>
              </div>
              {isOpen && (
                <table className="h-table">
                  <thead>
                    <tr>
                      <th style={{width:'30%'}}>Tool</th>
                      <th>Schema</th>
                      <th style={{width:200}}>Access</th>
                      <th style={{width:240}}>Destructive policy</th>
                      <th style={{width:60}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.tools.map(t => {
                      const destr = PE_DESTR.has(t);
                      const access = t==='delete' ? 'deny' : destr ? 'review' : 'allow';
                      const slug = toolSlug(s.name, t);
                      const title = peTitle(s.name, t);
                      return (
                        <tr key={t}>
                          <td>
                            <div>
                              <span style={{fontWeight:600, fontSize:13, color:'var(--ink)'}}>{title}</span>{' '}
                              <span className="h-mono h-muted" style={{fontSize:11.5}}>({slug})</span>
                              {destr && <HTag tone="bad" style={{marginLeft:8}}>destructive</HTag>}
                            </div>
                          </td>
                          <td className="h-muted h-mono" style={{fontSize:11}}>
                            {t==='listIssues' ? '{ filter, limit? } → Issue[]'
                              : t==='createIssue' ? '{ title, body?, team } → Issue'
                              : t==='query' ? '{ sql, params? } → Row[]'
                              : '{ … } → …'}
                          </td>
                          <td>
                            <div className="h-row" style={{border:'1px solid var(--line-strong)', borderRadius:6, padding:2, gap:0, width:'fit-content', background:'var(--surface)'}}>
                              <span className={`h-chip${access==='allow'?' on':''}`} style={{borderRadius:4}}>allow</span>
                              <span className={`h-chip${access==='read'?' on':''}`} style={{borderRadius:4}}>read</span>
                              <span className={`h-chip${access==='review'?' on':''}`} style={{borderRadius:4}}>review</span>
                              <span className={`h-chip${access==='deny'?' on':''}`} style={{borderRadius:4}}>deny</span>
                            </div>
                          </td>
                          <td>
                            {destr
                              ? <div className="h-row" style={{gap:6}}>
                                  <HTag tone="accent">reviewer</HTag>
                                  <span style={{fontSize:12, color:'var(--ink-2)'}}>@kyle</span>
                                  <span className="h-muted h-italic" style={{fontSize:11.5}}>· auto-deny after 24h</span>
                                </div>
                              : <span className="h-muted h-italic" style={{fontSize:12}}>not applicable</span>}
                          </td>
                          <td style={{textAlign:'right', color:'var(--muted-2)'}}>{HIco.dots}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// D · Permissions · Role detail (single role overview)
// ═══════════════════════════════════════════════════════════════════
function HPermissionsRole({density='regular', nav='rail'}){
  const sources = ['Linear','Slack','GitHub GraphQL','Sentry','Notion','Postgres·prod'];
  return (
    <HAppFrame density={density} nav={nav} active="permissions">
      {/* hero */}
      <div style={{borderBottom:'1px solid var(--line)', background:'var(--surface-2)'}}>
        <div style={{padding:'20px 30px 0', display:'flex', flexDirection:'column', gap:14}}>
          <div className="h-row" style={{gap:8, fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>
            <a>Permissions</a><span>/</span><a>Roles</a><span>/</span><span style={{color:'var(--ink-2)'}}>Engineer</span>
          </div>
          <div className="h-row" style={{gap:18, alignItems:'flex-end'}}>
            <span style={{
              width:88, height:88, borderRadius:14,
              background:'linear-gradient(135deg, var(--brand), var(--brand-deep))',
              border:'2px solid var(--gold)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              color:'var(--brand-ink)',
              font:'600 14px/1 var(--font-display)', letterSpacing:'.08em',
              textTransform:'uppercase', textAlign:'center', padding:'0 8px',
            }}>Eng</span>
            <div style={{flex:1}}>
              <div className="eyebrow">Role · created Mar 4</div>
              <h1 style={{margin:'8px 0 0', fontSize:34}}>Engineer</h1>
              <div className="h-row" style={{gap:8, marginTop:10}}>
                <HTag tone="brand">14 members</HTag>
                <HTag>inherits Read-only</HTag>
                <HTag tone="accent">2 destructive policies</HTag>
                <span className="h-muted h-italic" style={{fontSize:12}}>· last edited 3d ago by kyle@latitudes.io</span>
              </div>
            </div>
            <div className="h-row" style={{gap:8}}>
              <button className="h-btn">Duplicate</button>
              <button className="h-btn">Export policy</button>
              <button className="h-btn primary">Edit role</button>
            </div>
          </div>
          <div className="h-tabs" style={{borderBottom:'none', marginTop:6}}>
            <div className="h-tab on">Overview</div>
            <div className="h-tab">Policy <span className="h-muted h-mono" style={{fontSize:10, marginLeft:4}}>42</span></div>
            <div className="h-tab">Members <span className="h-muted h-mono" style={{fontSize:10, marginLeft:4}}>14</span></div>
            <div className="h-tab">Sources <span className="h-muted h-mono" style={{fontSize:10, marginLeft:4}}>{sources.length}</span></div>
            <div className="h-tab">History</div>
          </div>
        </div>
      </div>

      <div className="h-pagebody">
        {/* KPIs */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[['Members','14','+2 this month'],['Sources reachable','6 / 34','of 207 tools'],['Tools allowed','42','5 require review'],['Calls · 7d','38,720','by 12 callers']].map(([l,v,d]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
              <div className="stat">{v}</div>
              <div className="h-mono h-muted" style={{fontSize:11, marginTop:6}}>{d}</div>
            </div>
          ))}
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'1.4fr 1fr'}}>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <div className="h-row" style={{padding:'14px 18px', justifyContent:'space-between', borderBottom:'1px solid var(--line-2)'}}>
              <h3 style={{margin:0}}>Source access</h3>
              <a className="h-mono" style={{fontSize:11, color:'var(--gold-ink)'}}>edit policy →</a>
            </div>
            <table className="h-table">
              <thead><tr><th>Source</th><th>Tools allowed</th><th>Destructive</th><th>Calls · 7d</th></tr></thead>
              <tbody>
                {sources.map((s,i) => (
                  <tr key={s}>
                    <td>
                      <div className="h-row" style={{gap:10}}>
                        <HSwatch name={s} size="sm"/>
                        <span style={{fontWeight:600, fontSize:13}}>{s}</span>
                      </div>
                    </td>
                    <td>
                      <div className="h-row" style={{gap:8}}>
                        <span className="h-mono">{[5,3,4,3,4,2][i]} / {[6,5,4,3,5,3][i]}</span>
                        <div className="h-bar" style={{width:60}}><i className="accent" style={{right:`${[20,40,0,0,20,33][i]}%`}}/></div>
                      </div>
                    </td>
                    <td>{[true,false,false,false,false,true][i] ? <HTag tone="accent">with review</HTag> : <span className="h-muted h-italic" style={{fontSize:12}}>read-only</span>}</td>
                    <td className="h-mono h-muted">{[12440,8210,6020,4150,2880,5020][i].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="h-card">
            <h3>Members</h3>
            <div className="h-row" style={{marginTop:12, gap:10, justifyContent:'space-between'}}>
              <HStack items={['KP','MR','DV','JS','AC','SQ','PR']} more={7}/>
              <span className="h-muted h-mono" style={{fontSize:11}}>14 in this role</span>
            </div>
            <div className="h-col" style={{marginTop:14, gap:10}}>
              {[
                {name:'Kyle Patterson', email:'kyle@latitudes.io', via:'team · Eng'},
                {name:'Mira Rao',       email:'mira@latitudes.io', via:'direct'},
                {name:'Dev Vora',       email:'dev@latitudes.io',  via:'team · Eng'},
                {name:'Jules Singh',    email:'jules@latitudes.io',via:'team · Ops'},
              ].map(m => (
                <div key={m.email} className="h-row" style={{gap:11}}>
                  <HAv initials={m.name.split(' ').map(s=>s[0]).join('')}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:600}}>{m.name}</div>
                    <div className="h-mono h-muted" style={{fontSize:11}}>{m.email}</div>
                  </div>
                  <span className="h-muted h-italic" style={{fontSize:11}}>via {m.via}</span>
                </div>
              ))}
            </div>
            <button className="h-btn" style={{width:'100%', marginTop:14, justifyContent:'center'}}>View all 14 →</button>
          </div>
        </div>

        {/* recent changes */}
        <div>
          <div style={{fontWeight:700, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)', marginBottom:10}}>
            Recent policy changes
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <table className="h-table">
              <tbody>
                {[
                  ['kyle@latitudes.io', 'KP', 'Granted', 'linear.delete', 'Linear', 'with review by @kyle', '3d ago'],
                  ['mira@latitudes.io', 'MR', 'Revoked', 'postgres.exec', 'Postgres·prod', '—', '8d ago'],
                  ['kyle@latitudes.io', 'KP', 'Changed', 'reviewer for stripe.refunds.create', 'Stripe API', 'from @mira to @kyle', '14d ago'],
                ].map((r,i) => (
                  <tr key={i}>
                    <td style={{width:40}}><HAv initials={r[1]} sm/></td>
                    <td className="h-mono h-muted" style={{fontSize:11.5}}>{r[0]}</td>
                    <td>
                      <span className={`h-tag${r[2]==='Revoked'?' bad':r[2]==='Granted'?' good':' accent'}`}>{r[2]}</span>
                    </td>
                    <td><span className="h-mono">{r[3]}</span></td>
                    <td>
                      <div className="h-row" style={{gap:8}}>
                        <HSwatch name={r[4]} size="sm"/>
                        <span style={{fontSize:12}}>{r[4]}</span>
                      </div>
                    </td>
                    <td className="h-muted h-italic" style={{fontSize:12}}>{r[5]}</td>
                    <td className="h-mono h-muted" style={{fontSize:11, textAlign:'right'}}>{r[6]}</td>
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

Object.assign(window, { HPermissionsPolicy, HPermissionsRole });
