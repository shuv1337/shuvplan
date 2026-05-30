// hifi-teams.jsx — refined teams & users screens
/* global React, HAppFrame, HTile, HSwatch, HKindTag, HDot, HTag, HChip, HAv, HStack, HIco */

const TM_USERS = [
  {name:'Kyle Patterson', email:'kyle@latitudes.io', role:'Admin',     teams:['Eng','Ops'],     mfa:true,  last:'2m', sources:['Linear','Stripe API','Postgres·prod','Slack','GitHub GraphQL','Notion']},
  {name:'Mira Rao',       email:'mira@latitudes.io', role:'Engineer',  teams:['Eng'],           mfa:true,  last:'14m',sources:['Linear','Slack','GitHub GraphQL','Sentry','Intercom']},
  {name:'Dev Vora',       email:'dev@latitudes.io',  role:'Engineer',  teams:['Eng','Data'],    mfa:false, last:'1h', sources:['Linear','Postgres·prod','BigQuery','Snowflake (sql)']},
  {name:'Jules Singh',    email:'jules@latitudes.io',role:'Operator',  teams:['Ops'],           mfa:true,  last:'3h', sources:['Slack','Notion','Zendesk']},
  {name:'Aja Cole',       email:'aja@latitudes.io',  role:'Finance',   teams:['Finance'],       mfa:true,  last:'1d', sources:['Stripe API','HubSpot']},
  {name:'Sam Quinn',      email:'sam@latitudes.io',  role:'Read-only', teams:['Data'],          mfa:false, last:'4d', sources:['BigQuery','Snowflake (sql)']},
];

const TM_TEAMS = [
  {name:'Engineering', members:14, sources:['Linear','GitHub GraphQL','Sentry','Postgres·prod','Slack','Notion'],   owner:'kyle@latitudes.io', dest:2},
  {name:'Operations',  members:6,  sources:['Slack','Notion','Zendesk','Intercom'],                                  owner:'mira@latitudes.io', dest:0},
  {name:'Finance',     members:4,  sources:['Stripe API','HubSpot','BigQuery'],                                      owner:'finance-bot',       dest:1},
  {name:'Data',        members:7,  sources:['BigQuery','Snowflake (sql)','Postgres·prod'],                           owner:'data-platform',     dest:0},
];

// ═══════════════════════════════════════════════════════════════════
// A · Teams · Members table
// ═══════════════════════════════════════════════════════════════════
function HTeamsTable({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="teams">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">Members · roles · invitations</div>
            <h1 style={{marginTop:8}}>Teams &amp; users</h1>
            <div className="sub" style={{marginTop:6}}>
              <strong style={{color:'var(--ink)', fontWeight:700}}>58 people · 7 agents · 5 teams</strong>{' '}
              <span className="h-italic">in this workspace.</span>
            </div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Bulk import…</button>
            <button className="h-btn">+ Create team</button>
            <button className="h-btn primary">+ Invite people</button>
          </div>
        </div>
        <div className="h-tabs" style={{marginTop:8, borderBottom:'none'}}>
          <div className="h-tab on">People · 58</div>
          <div className="h-tab">Agents · 7</div>
          <div className="h-tab">Teams · 5</div>
          <div className="h-tab">Roles · 8</div>
          <div className="h-tab">Invitations · 3</div>
        </div>
        <div className="h-row" style={{marginTop:6, gap:8, flexWrap:'wrap'}}>
          <div className="h-search" style={{width:260}}>{HIco.search}<span>Search 58 people</span></div>
          <HChip on>Role: any</HChip><HChip>Team: any</HChip><HChip>MFA: any</HChip>
          <HChip on x>has access &gt; 30d unused</HChip>
          <div className="h-spacer"/>
          <button className="h-btn sm">Sort · last active ↓</button>
        </div>
      </div>
      <div className="h-pagebody" style={{padding:0, overflow:'hidden'}}>
        <div style={{flex:1, overflow:'auto'}}>
          <table className="h-table">
            <thead><tr>
              <th style={{width:30}}><input type="checkbox" readOnly/></th>
              <th>Member</th>
              <th>Role</th>
              <th>Teams</th>
              <th>Sources accessible</th>
              <th>MFA</th>
              <th>Last active</th>
              <th></th>
            </tr></thead>
            <tbody>
              {TM_USERS.map((u,i) => (
                <tr key={u.email}>
                  <td><input type="checkbox" readOnly/></td>
                  <td>
                    <div className="h-row" style={{gap:11}}>
                      <HAv initials={u.name.split(' ').map(s=>s[0]).join('').slice(0,2)}/>
                      <div>
                        <div style={{fontWeight:600, fontSize:12.5, color:'var(--ink)'}}>{u.name}</div>
                        <div className="h-mono h-muted" style={{fontSize:11}}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><HChip>{u.role}</HChip></td>
                  <td>
                    <div className="h-row" style={{gap:4, flexWrap:'wrap'}}>
                      {u.teams.map(t => <HChip key={t}>{t}</HChip>)}
                    </div>
                  </td>
                  <td>
                    <div className="h-row" style={{gap:5}}>
                      <div className="h-stack">
                        {u.sources.slice(0,5).map(s => <HSwatch key={s} name={s} size="sm"/>)}
                      </div>
                      {u.sources.length > 5 && <span className="h-mono h-muted" style={{fontSize:11, marginLeft:6}}>+{u.sources.length-5}</span>}
                    </div>
                  </td>
                  <td>{u.mfa ? <HTag tone="good">on</HTag> : <HTag tone="bad">off</HTag>}</td>
                  <td className="h-mono h-muted" style={{fontSize:11.5}}>{u.last} ago</td>
                  <td style={{textAlign:'right', color:'var(--muted-2)'}}>{HIco.dots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-row" style={{padding:'10px 22px', borderTop:'1px solid var(--line)', justifyContent:'space-between', fontSize:11, color:'var(--muted)', background:'var(--surface-2)'}}>
          <span className="h-mono">Showing 1–6 of 58</span>
          <div className="h-row" style={{gap:4}}>
            <button className="h-btn sm">‹</button>
            <button className="h-btn sm">1</button>
            <button className="h-btn sm">2</button>
            <button className="h-btn sm">3</button>
            <button className="h-btn sm">›</button>
          </div>
        </div>
      </div>
    </HAppFrame>
  );
}

// ═══════════════════════════════════════════════════════════════════
// B · Teams · Team cards
// ═══════════════════════════════════════════════════════════════════
function HTeamsCards({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="teams">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">Bundle people, sources & policy</div>
            <h1 style={{marginTop:8}}>Teams</h1>
            <div className="sub" style={{marginTop:6}}>
              <span className="h-italic">A team bundles people, the sources they share, and a default permission set.</span>
            </div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Manage roles</button>
            <button className="h-btn primary">+ Create team</button>
          </div>
        </div>
        <div className="h-row" style={{marginTop:6, gap:8}}>
          <div className="h-search" style={{width:300}}>{HIco.search}<span>Search teams &amp; people</span></div>
          <div className="h-spacer"/>
          <div className="h-row" style={{gap:0, border:'1px solid var(--line-strong)', borderRadius:6, padding:2, background:'var(--surface)'}}>
            <span className="h-chip on" style={{borderRadius:5}}>Cards</span>
            <span className="h-chip" style={{borderRadius:5, border:'none', background:'transparent'}}>List</span>
          </div>
        </div>
      </div>
      <div className="h-pagebody">
        <div className="h-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
          {TM_TEAMS.map(t => (
            <div key={t.name} className="h-card" style={{padding:0, overflow:'hidden'}}>
              {/* card crown */}
              <div style={{
                padding:'16px 18px',
                background: 'linear-gradient(135deg, color-mix(in oklab, var(--brand) 92%, var(--gold) 8%), var(--brand-deep))',
                color:'var(--brand-ink)',
                borderBottom:'2px solid var(--gold)',
                position:'relative', overflow:'hidden'
              }}>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,.04) 14px 15px)', pointerEvents:'none'}}/>
                <div className="h-row" style={{justifyContent:'space-between', position:'relative'}}>
                  <div>
                    <div style={{font:'700 10.5px/1 var(--font-display)', letterSpacing:'.16em', textTransform:'uppercase', color:'var(--gold)'}}>Team</div>
                    <div style={{font:'500 22px/1.05 var(--font-display)', textTransform:'uppercase', letterSpacing:'.005em', marginTop:6}}>{t.name}</div>
                    <div className="h-mono" style={{fontSize:11, color:'rgba(255,255,255,.65)', marginTop:6}}>owner · {t.owner}</div>
                  </div>
                  <span style={{color:'rgba(255,255,255,.55)', position:'relative', cursor:'default'}}>{HIco.dots}</span>
                </div>
              </div>
              {/* body */}
              <div style={{padding:'14px 18px 16px'}}>
                <div className="h-row" style={{justifyContent:'space-between'}}>
                  <div className="h-row" style={{gap:8}}>
                    <HStack items={['KP','MR','DV','JS'].slice(0, Math.min(4, t.members))} more={Math.max(0, t.members-4)}/>
                  </div>
                  <span className="h-mono h-muted" style={{fontSize:11}}>{t.members} members</span>
                </div>
                <div style={{marginTop:14, fontSize:11, letterSpacing:'.06em', textTransform:'uppercase', fontWeight:700, color:'var(--muted)'}}>
                  Accessible connectors
                </div>
                <div className="h-row" style={{marginTop:8, gap:6, flexWrap:'wrap'}}>
                  {t.sources.map(s => (
                    <div key={s} className="h-row" style={{gap:7, padding:'5px 10px 5px 5px', border:'1px solid var(--line)', borderRadius:6, background:'var(--surface-2)'}}>
                      <HSwatch name={s} size="sm"/>
                      <span style={{fontSize:11}}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="h-row" style={{justifyContent:'space-between', marginTop:16, paddingTop:12, borderTop:'1px solid var(--line-2)'}}>
                  <div className="h-row" style={{gap:6}}>
                    {t.dest > 0
                      ? <HTag tone="accent">{t.dest} destructive policies</HTag>
                      : <HTag tone="good">read-only access</HTag>}
                  </div>
                  <a className="h-mono" style={{fontSize:11, color:'var(--gold-ink)'}}>open team →</a>
                </div>
              </div>
            </div>
          ))}

          {/* add team card */}
          <div className="h-card" style={{borderStyle:'dashed', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, color:'var(--muted)', minHeight:240}}>
            <span style={{font:'500 32px/1 var(--font-display)', color:'var(--brand)'}}>+</span>
            <div style={{font:'500 14px/1 var(--font-display)', textTransform:'uppercase', letterSpacing:'.06em', color:'var(--brand)'}}>Create a team</div>
            <div style={{fontSize:12, textAlign:'center', maxWidth:220, color:'var(--muted)'}} className="h-italic">Bundle members, default sources, and policies.</div>
          </div>
        </div>

        {/* pending invitations */}
        <div style={{marginTop:8}}>
          <div style={{fontWeight:700, fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)', marginBottom:10}}>
            Pending invitations
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <table className="h-table">
              <tbody>
                {[
                  ['pending@latitudes.io','Engineer','Eng','2d ago','kyle@latitudes.io'],
                  ['contractor@external.com','Read-only','Data','5d ago','mira@latitudes.io']
                ].map((r,i) => (
                  <tr key={i}>
                    <td style={{width:36}}><HAv initials="?" sm/></td>
                    <td><span className="h-mono">{r[0]}</span></td>
                    <td><HChip>{r[1]}</HChip></td>
                    <td><HChip>{r[2]}</HChip></td>
                    <td className="h-muted h-italic" style={{fontSize:12}}>invited {r[3]} by {r[4]}</td>
                    <td style={{textAlign:'right'}}>
                      <button className="h-btn sm">resend</button>
                      <button className="h-btn sm" style={{marginLeft:6, color:'var(--bad)', borderColor:'var(--bad)'}}>revoke</button>
                    </td>
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

Object.assign(window, { HTeamsTable, HTeamsCards });
