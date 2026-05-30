// hifi-teams-2.jsx — Team detail + User detail (hi-fi)
/* global React, HAppFrame, HSwatch, HTile, HDot, HTag, HChip, HAv, HStack, HIco */

// ═══════════════════════════════════════════════════════════════════
// Team detail — single team, hero + tabs
// ═══════════════════════════════════════════════════════════════════
function HTeamDetail({density='regular', nav='rail'}){
  const sources = ['Linear','Slack','GitHub GraphQL','Sentry','Notion','Postgres·prod'];
  const members = [
    {name:'Kyle Patterson',  email:'kyle@latitudes.io',  role:'Owner',     joined:'Mar 4',  calls:4120},
    {name:'Mira Rao',        email:'mira@latitudes.io',  role:'Maintainer',joined:'Mar 4',  calls:3004},
    {name:'Dev Vora',        email:'dev@latitudes.io',   role:'Maintainer',joined:'Mar 8',  calls:1512},
    {name:'Jules Singh',     email:'jules@latitudes.io', role:'Member',    joined:'Apr 1',  calls:880},
    {name:'Priya Rao',       email:'priya@latitudes.io', role:'Member',    joined:'Apr 14', calls:610},
    {name:'Sam Quinn',       email:'sam@latitudes.io',   role:'Member',    joined:'May 2',  calls:240},
  ];
  return (
    <HAppFrame density={density} nav={nav} active="teams">
      {/* hero */}
      <div style={{borderBottom:'1px solid var(--line)', background:'var(--surface-2)'}}>
        <div style={{padding:'20px 30px 0', display:'flex', flexDirection:'column', gap:14}}>
          <div className="h-row" style={{gap:8, fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>
            <a>Teams &amp; users</a><span>/</span><a>Teams</a><span>/</span><span style={{color:'var(--ink-2)'}}>Engineering</span>
          </div>
          <div className="h-row" style={{gap:18, alignItems:'flex-end'}}>
            <span style={{
              width:88, height:88, borderRadius:14,
              background:'linear-gradient(135deg, var(--brand), var(--brand-deep))',
              border:'2px solid var(--gold)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              color:'var(--brand-ink)',
              fontFamily:'var(--font-display)', fontWeight:700, fontSize:28,
              position:'relative', overflow:'hidden'
            }}>
              <span style={{position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 10px, rgba(255,255,255,.06) 10px 11px)'}}/>
              <span style={{position:'relative'}}>⬢</span>
            </span>
            <div style={{flex:1}}>
              <div className="eyebrow">Team · created Mar 4, 2026</div>
              <h1 style={{margin:'8px 0 0', fontSize:34}}>Engineering</h1>
              <div className="h-row" style={{gap:8, marginTop:10, flexWrap:'wrap'}}>
                <HTag tone="brand">14 members</HTag>
                <HTag>6 sources</HTag>
                <HTag tone="accent">2 destructive policies</HTag>
                <span className="h-muted h-italic" style={{fontSize:12}}>· owner kyle@latitudes.io</span>
              </div>
            </div>
            <div className="h-row" style={{gap:8}}>
              <button className="h-btn">Audit</button>
              <button className="h-btn">+ Add member</button>
              <button className="h-btn primary">Edit team</button>
            </div>
          </div>
          <div className="h-tabs" style={{borderBottom:'none', marginTop:6}}>
            <div className="h-tab on">Overview</div>
            <div className="h-tab">Members <span className="h-muted h-mono" style={{fontSize:10, marginLeft:4}}>14</span></div>
            <div className="h-tab">Sources <span className="h-muted h-mono" style={{fontSize:10, marginLeft:4}}>6</span></div>
            <div className="h-tab">Permissions</div>
            <div className="h-tab">Activity</div>
            <div className="h-tab">Settings</div>
          </div>
        </div>
      </div>

      <div className="h-pagebody">
        {/* KPI row */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[
            ['Members','14','+2 this month'],
            ['Sources','6 / 34','142 tools accessible'],
            ['Calls · 7d','38,720','+8.4%'],
            ['Destructive · 7d','82','12 awaiting review']
          ].map(([l,v,d]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
              <div className="stat">{v}</div>
              <div className="h-mono h-muted" style={{fontSize:11, marginTop:6}}>{d}</div>
            </div>
          ))}
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'2fr 1fr'}}>
          {/* members table */}
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <div className="h-row" style={{padding:'14px 18px', justifyContent:'space-between', borderBottom:'1px solid var(--line-2)'}}>
              <h3 style={{margin:0}}>Members</h3>
              <div className="h-row" style={{gap:6}}>
                <HChip on>All roles</HChip><HChip>Owner</HChip><HChip>Maintainer</HChip><HChip>Member</HChip>
              </div>
            </div>
            <table className="h-table">
              <thead><tr><th>Member</th><th>Role on this team</th><th>Calls · 7d</th><th>Joined</th><th></th></tr></thead>
              <tbody>
                {members.map((m,i) => (
                  <tr key={m.email}>
                    <td>
                      <div className="h-row" style={{gap:11}}>
                        <HAv initials={m.name.split(' ').map(s=>s[0]).join('')}/>
                        <div>
                          <div style={{fontWeight:600, fontSize:12.5}}>{m.name}</div>
                          <div className="h-mono h-muted" style={{fontSize:11}}>{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="h-row" style={{border:'1px solid var(--line-strong)', borderRadius:6, padding:2, gap:0, width:'fit-content', background:'var(--surface)'}}>
                        <span className={`h-chip${m.role==='Owner'?' on':''}`} style={{borderRadius:4}}>Owner</span>
                        <span className={`h-chip${m.role==='Maintainer'?' on':''}`} style={{borderRadius:4}}>Maintainer</span>
                        <span className={`h-chip${m.role==='Member'?' on':''}`} style={{borderRadius:4}}>Member</span>
                      </div>
                    </td>
                    <td>
                      <div className="h-row" style={{gap:8}}>
                        <span className="h-mono">{m.calls.toLocaleString()}</span>
                        <div className="h-bar" style={{width:50}}><i className="accent" style={{right:`${Math.max(0,100-(m.calls/50))}%`}}/></div>
                      </div>
                    </td>
                    <td className="h-mono h-muted" style={{fontSize:11.5}}>{m.joined}</td>
                    <td style={{textAlign:'right', color:'var(--muted-2)'}}>{HIco.dots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* right rail: sources + recent */}
          <div className="h-col" style={{gap:14}}>
            <div className="h-card">
              <h3>Sources this team can call</h3>
              <div className="h-col" style={{marginTop:12, gap:8}}>
                {sources.map(s => (
                  <div key={s} className="h-row" style={{padding:'8px 10px', border:'1px solid var(--line)', borderRadius:6, gap:10, background:'var(--surface-2)'}}>
                    <HSwatch name={s} size="sm"/>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:12.5, fontWeight:600}}>{s}</div>
                      <div className="h-mono h-muted" style={{fontSize:10.5, marginTop:1}}>{Math.floor(2 + Math.random()*8)} tools allowed</div>
                    </div>
                    <span style={{color:'var(--muted-2)'}}>{HIco.chev}</span>
                  </div>
                ))}
              </div>
              <button className="h-btn" style={{width:'100%', marginTop:12, justifyContent:'center'}}>+ Add source</button>
            </div>
            <div className="h-card">
              <h3>Activity · 24h</h3>
              <div className="h-col" style={{marginTop:10, gap:8}}>
                {[
                  ['KP','approved stripe.refunds.create','Stripe API','4m ago'],
                  ['MR','called linear.createIssue','Linear','12m ago'],
                  ['DV','denied · postgres.exec','Postgres·prod','19m ago'],
                  ['JS','called slack.postMessage','Slack','42m ago'],
                ].map((r,i) => (
                  <div key={i} className="h-row" style={{gap:10, padding:'5px 0', borderTop: i===0?'none':'1px solid var(--line-2)'}}>
                    <HAv initials={r[0]} sm/>
                    <div style={{flex:1, minWidth:0, fontSize:11.5}}>
                      <div style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{r[1]}</div>
                      <div className="h-row" style={{gap:5, marginTop:2}}>
                        <HSwatch name={r[2]} size="sm"/>
                        <span className="h-mono h-muted" style={{fontSize:10}}>{r[2]}</span>
                      </div>
                    </div>
                    <span className="h-mono h-muted" style={{fontSize:10.5}}>{r[3]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// User detail — single member, access + activity + security
// ═══════════════════════════════════════════════════════════════════
function HUserDetail({density='regular', nav='rail'}){
  const accessibleSources = [
    {name:'Linear',          tools:14, allowed:8, status:'good'},
    {name:'Slack',           tools:21, allowed:6, status:'good'},
    {name:'GitHub GraphQL',  tools:38, allowed:12,status:'good'},
    {name:'Sentry',          tools:11, allowed:4, status:'bad'},
    {name:'Notion',          tools:8,  allowed:5, status:'good'},
  ];
  return (
    <HAppFrame density={density} nav={nav} active="teams">
      {/* hero */}
      <div style={{borderBottom:'1px solid var(--line)', background:'var(--surface-2)'}}>
        <div style={{padding:'20px 30px 0', display:'flex', flexDirection:'column', gap:14}}>
          <div className="h-row" style={{gap:8, fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>
            <a>Teams &amp; users</a><span>/</span><a>People</a><span>/</span><span style={{color:'var(--ink-2)'}}>Mira Rao</span>
          </div>
          <div className="h-row" style={{gap:18, alignItems:'flex-end'}}>
            <span style={{
              width:88, height:88, borderRadius:'50%',
              background: 'var(--brand)',
              color: 'var(--brand-ink)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              font:'700 30px/1 var(--font-display)',
              boxShadow:'inset 0 0 0 2px var(--gold), inset 0 0 0 4px var(--brand)',
            }}>MR</span>
            <div style={{flex:1}}>
              <div className="eyebrow">Person · invited Apr 2 by kyle@latitudes.io</div>
              <h1 style={{margin:'8px 0 0', fontSize:32}}>Mira Rao</h1>
              <div className="h-row" style={{gap:8, marginTop:10, flexWrap:'wrap'}}>
                <span className="h-mono" style={{fontSize:12, color:'var(--ink-2)'}}>mira@latitudes.io</span>
                <span className="h-muted">·</span>
                <HChip>Engineer</HChip>
                <HChip>Eng</HChip>
                <span className="h-muted h-italic" style={{fontSize:12}}>· last active 14m ago</span>
              </div>
            </div>
            <div className="h-row" style={{gap:8}}>
              <button className="h-btn">Send message</button>
              <button className="h-btn">Reset MFA</button>
              <button className="h-btn" style={{color:'var(--bad)', borderColor:'var(--bad)'}}>Suspend</button>
            </div>
          </div>
          <div className="h-tabs" style={{borderBottom:'none', marginTop:6}}>
            <div className="h-tab on">Access</div>
            <div className="h-tab">Activity</div>
            <div className="h-tab">Security</div>
            <div className="h-tab">Sessions</div>
            <div className="h-tab">Settings</div>
          </div>
        </div>
      </div>

      <div className="h-pagebody">
        {/* KPIs */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[
            ['Sources accessible','5 / 34','of 92 tools'],
            ['Calls · 7d','3,004','+12.6%'],
            ['Destructive · 7d','11','3 approved · 8 denied'],
            ['MFA','On','TOTP · last verified 2d ago']
          ].map(([l,v,d]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
              <div className="stat">{v}</div>
              <div className="h-mono h-muted" style={{fontSize:11, marginTop:6}}>{d}</div>
            </div>
          ))}
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'1.4fr 1fr'}}>
          {/* sources access */}
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <div className="h-row" style={{padding:'14px 18px', justifyContent:'space-between', borderBottom:'1px solid var(--line-2)'}}>
              <h3 style={{margin:0}}>Sources Mira can call</h3>
              <a className="h-mono" style={{fontSize:11, color:'var(--gold-ink)'}}>edit access →</a>
            </div>
            <div className="h-col" style={{gap:0}}>
              {accessibleSources.map((s,i) => (
                <div key={s.name} className="h-row" style={{padding:'14px 18px', gap:12, borderTop: i===0?'none':'1px solid var(--line-2)'}}>
                  <HSwatch name={s.name} size="lg"/>
                  <div style={{flex:1, minWidth:0}}>
                    <div className="h-row" style={{gap:8}}>
                      <span style={{fontWeight:600, fontSize:13}}>{s.name}</span>
                      <HDot tone={s.status}/>
                    </div>
                    <div className="h-row" style={{gap:8, marginTop:5}}>
                      <span className="h-mono h-muted" style={{fontSize:11}}>{s.allowed} of {s.tools} tools</span>
                      <div className="h-bar" style={{width:80}}><i className="accent" style={{right:`${100-(s.allowed/s.tools)*100}%`}}/></div>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="h-row" style={{gap:5, justifyContent:'flex-end'}}>
                      <HTag>per-user</HTag>
                      <HTag tone="brand">via team · Eng</HTag>
                    </div>
                    <span className="h-mono h-muted" style={{fontSize:11, display:'block', marginTop:5}}>last used {['2m','14m','1h','3h','4h'][i]} ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* security / sessions */}
          <div className="h-col" style={{gap:14}}>
            <div className="h-card">
              <h3>Security</h3>
              <div className="h-col" style={{marginTop:12, gap:10}}>
                <div className="h-row" style={{justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontSize:12.5, fontWeight:600}}>MFA · TOTP</div>
                    <div className="h-muted h-italic" style={{fontSize:11.5, marginTop:2}}>enrolled Apr 2 · last verified 2d ago</div>
                  </div>
                  <HTag tone="good">on</HTag>
                </div>
                <div className="h-row" style={{justifyContent:'space-between', paddingTop:10, borderTop:'1px solid var(--line-2)'}}>
                  <div>
                    <div style={{fontSize:12.5, fontWeight:600}}>SSO · Google Workspace</div>
                    <div className="h-muted h-italic" style={{fontSize:11.5, marginTop:2}}>required by policy</div>
                  </div>
                  <HTag tone="good">linked</HTag>
                </div>
                <div className="h-row" style={{justifyContent:'space-between', paddingTop:10, borderTop:'1px solid var(--line-2)'}}>
                  <div>
                    <div style={{fontSize:12.5, fontWeight:600}}>API keys · personal</div>
                    <div className="h-mono h-muted" style={{fontSize:11, marginTop:2}}>lat_••••••3f4a · 1 active</div>
                  </div>
                  <button className="h-btn sm">Rotate</button>
                </div>
              </div>
            </div>

            <div className="h-card">
              <h3>Active sessions</h3>
              <div className="h-col" style={{marginTop:12, gap:10}}>
                {[
                  ['MacBook Pro · Chrome 138', 'San Francisco, CA','2 minutes ago', true],
                  ['iPhone 15 · Safari',        'San Francisco, CA','3 hours ago',   false],
                  ['executor cli · v3.4.1',     'cli session',      '1 day ago',     false],
                ].map((s,i) => (
                  <div key={i} className="h-row" style={{gap:11, paddingTop: i===0?0:10, borderTop: i===0?'none':'1px solid var(--line-2)'}}>
                    <span style={{width:8, height:8, borderRadius:'50%', background: s[3]?'var(--good)':'var(--muted-2)', flex:'0 0 8px', marginTop:5}}/>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:12.5, fontWeight:500}}>{s[0]}</div>
                      <div className="h-mono h-muted" style={{fontSize:11, marginTop:2}}>{s[1]} · {s[2]}</div>
                    </div>
                    <button className="h-btn sm ghost" style={{color:'var(--bad)'}}>revoke</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* recent activity */}
        <div>
          <div style={{fontWeight:700, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)', marginBottom:10}}>
            Recent activity
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <table className="h-table">
              <tbody>
                {[
                  ['linear.createIssue','Linear','{ title: "Sentry…" }','200',false,'14m'],
                  ['slack.postMessage', 'Slack','#engineering channel','200',false,'42m'],
                  ['stripe.refunds.create','Stripe API','ch_3Pj… · $84.20','review pending',true,'1h'],
                  ['github.search',     'GitHub GraphQL','"deploy infra"','200',false,'2h'],
                  ['postgres.exec',     'Postgres·prod','UPDATE customers SET…','denied',true,'3h'],
                ].map((r,i) => (
                  <tr key={i}>
                    <td style={{width:34}}><HSwatch name={r[1]} size="sm"/></td>
                    <td><span className="h-mono">{r[0]}</span> {r[4] && <HTag tone="bad" style={{marginLeft:6}}>destructive</HTag>}</td>
                    <td className="h-mono h-muted" style={{fontSize:11}}>{r[2]}</td>
                    <td>{r[3]==='200' ? <HTag tone="good">200</HTag> : r[3]==='denied' ? <HTag tone="bad">denied</HTag> : <HTag tone="accent">{r[3]}</HTag>}</td>
                    <td className="h-mono h-muted" style={{fontSize:11, textAlign:'right'}}>{r[5]} ago</td>
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

Object.assign(window, { HTeamDetail, HUserDetail });
