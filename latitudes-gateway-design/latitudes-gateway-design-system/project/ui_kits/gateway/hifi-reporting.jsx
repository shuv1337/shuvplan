// hifi-reporting.jsx — refined / hi-fi reporting screens
/* global React, HAppFrame, HTile, HSwatch, HKindTag, HDot, HTag, HChip, HAv, HStack, HIco */

const REP_TOP_TOOLS = [
  ['linear.createIssue',     'Linear',          7842, 96],
  ['slack.postMessage',      'Slack',           6310, 89],
  ['stripe.charges.list',    'Stripe API',      5128, 72],
  ['postgres.query',         'Postgres·prod',   4471, 62],
  ['github.search',          'GitHub GraphQL',  2814, 39],
  ['notion.pages.get',       'Notion',          1944, 27],
  ['sentry.issues.list',     'Sentry',          1402, 19],
];
const REP_TOP_USERS = [
  ['onboarding-bot',  true,  12840],
  ['forecast-runner', true,  8220],
  ['KP',              false, 4120],
  ['MR',              false, 3004],
  ['backfill',        true,  2780],
  ['DV',              false, 1512],
];

// ═══════════════════════════════════════════════════════════════════
// A · Reporting · Top filter bar + chart grid (dense)
// ═══════════════════════════════════════════════════════════════════
function HReportingGrid({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="reporting">
      <div className="h-pagehead">
        <div className="h-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div className="eyebrow">May 5 — May 12 · vs prev 7d</div>
            <h1 style={{marginTop:8}}>Reporting</h1>
            <div className="sub" style={{marginTop:6}}>
              <strong style={{color:'var(--ink)', fontWeight:700}}>268,142 calls</strong>{' '}
              <span className="h-italic">across 34 sources, 207 tools and 58 callers. Errors held below 0.4%.</span>
            </div>
          </div>
          <div className="h-row" style={{gap:8}}>
            <button className="h-btn">Schedule report</button>
            <button className="h-btn">Export</button>
            <button className="h-btn primary">Save view</button>
          </div>
        </div>
        <div className="h-row" style={{marginTop:6, gap:8, flexWrap:'wrap'}}>
          <button className="h-btn sm">May 5 — May 12 ▾</button>
          <button className="h-btn sm">vs previous 7d ▾</button>
          <span style={{width:1, height:20, background:'var(--line-strong)'}}/>
          <HChip>Source · all</HChip><HChip>Tool · all</HChip><HChip>Caller · all</HChip>
          <HChip on x>Destructive</HChip>
          <div className="h-spacer"/>
          <a className="h-mono" style={{fontSize:11, color:'var(--gold-ink)'}}>+ Add filter</a>
        </div>
      </div>
      <div className="h-pagebody">
        {/* KPI band */}
        <div className="h-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {[
            ['Total calls','268,142','+12.4%','good'],
            ['Errors','1,041','0.39%','warn'],
            ['p95 latency','512 ms','+34 ms','warn'],
            ['Cost est.','$348.10','+$22','muted'],
          ].map(([l,v,d,t]) => (
            <div key={l} className="h-card">
              <div className="h-muted" style={{fontSize:11.5}}>{l}</div>
              <div className="stat">{v}</div>
              <div className="h-row" style={{marginTop:8, gap:6, fontSize:11}}>
                <span style={{color: t==='good'?'var(--good)':t==='warn'?'var(--warn)':'var(--muted)'}}>
                  {t==='good'?HIco.arrowUp:t==='warn'?HIco.arrowUp:'·'}
                </span>
                <span className="h-mono h-muted">{d}</span>
              </div>
              <div style={{marginTop:8, height:32}}><div className="h-chartph"/></div>
            </div>
          ))}
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'2fr 1fr'}}>
          <div className="h-card">
            <div className="h-row" style={{justifyContent:'space-between'}}>
              <h3>Calls over time</h3>
              <div className="h-row" style={{gap:6}}>
                <HChip on>volume</HChip><HChip>by source</HChip><HChip>by tool</HChip>
              </div>
            </div>
            <div style={{height:200, marginTop:14}}><div className="h-chartph"/></div>
            <div className="h-row" style={{gap:14, marginTop:12, flexWrap:'wrap'}}>
              {['Linear','Stripe API','Postgres·prod','Slack','GitHub GraphQL','Sentry'].map((s,i) => (
                <div key={s} className="h-row" style={{gap:7}}>
                  <HSwatch name={s} size="sm"/>
                  <span className="h-muted" style={{fontSize:11}}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-card">
            <h3>Errors by source</h3>
            <div className="h-col" style={{gap:10, marginTop:12}}>
              {[['Sentry',412,'bad'],['Postgres·prod',287,'bad'],['Stripe API',162,'warn'],['Linear',98,'warn'],['Slack',54,'good'],['BigQuery',28,'good']].map(([n,v,t]) => (
                <div key={n}>
                  <div className="h-row" style={{justifyContent:'space-between'}}>
                    <div className="h-row" style={{gap:8}}>
                      <HSwatch name={n} size="sm"/>
                      <span style={{fontSize:11.5}}>{n}</span>
                    </div>
                    <span className="h-mono h-muted" style={{fontSize:11}}>{v}</span>
                  </div>
                  <div className="h-bar" style={{marginTop:5}}><i className={t} style={{right:`${100-(v/500)*100}%`}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="h-card">
            <div className="h-row" style={{justifyContent:'space-between'}}>
              <h3>Latency distribution</h3>
              <span className="h-mono h-muted" style={{fontSize:11}}>p50 89 · p95 512 · p99 1.2s</span>
            </div>
            <div style={{height:150, marginTop:14}}><div className="h-chartph"/></div>
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line-2)'}}>
              <h3 style={{margin:0}}>Top tools</h3>
            </div>
            <table className="h-table">
              <tbody>
                {REP_TOP_TOOLS.slice(0,6).map(([t,src,v,p]) => (
                  <tr key={t}>
                    <td style={{width:'10%'}}><HSwatch name={src} size="sm"/></td>
                    <td><span className="h-mono">{t}</span></td>
                    <td className="h-mono" style={{textAlign:'right', width:80}}>{v.toLocaleString()}</td>
                    <td style={{width:'30%'}}><div className="h-bar"><i className="accent" style={{right:`${100-p}%`}}/></div></td>
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

// ═══════════════════════════════════════════════════════════════════
// B · Reporting · Single-scroll narrative ("This week in Gateway")
// ═══════════════════════════════════════════════════════════════════
function HReportingNarrative({density='regular', nav='rail'}){
  return (
    <HAppFrame density={density} nav={nav} active="reporting">
      {/* Hero band */}
      <div className="h-hero">
        <div className="eyebrow">Weekly report · May 5 — May 12</div>
        <h1>This week in <em>Gateway</em></h1>
        <div className="sub" style={{marginTop:8}}>
          <span className="h-italic" style={{color:'rgba(255,255,255,.82)'}}>
            268k tool calls, up 12% — mostly driven by <span style={{color:'var(--gold)'}}>onboarding-bot</span> running Linear and Slack. Three sources need attention.
          </span>
        </div>
        <div className="h-row" style={{gap:8, marginTop:14}}>
          <button className="h-btn gold">Email me this</button>
          <button className="h-btn" style={{background:'transparent', color:'var(--brand-ink)', borderColor:'rgba(255,255,255,.30)'}}>Save as dashboard</button>
        </div>
      </div>

      <div className="h-pagebody">
        {/* Sticky filter pill */}
        <div className="h-row" style={{gap:8, padding:'8px 14px', border:'1px solid var(--line-strong)', borderRadius:999, background:'var(--surface)', width:'fit-content', boxShadow:'var(--shadow-sm)'}}>
          <span className="h-mono h-muted" style={{fontSize:11}}>filter</span>
          <HChip on x>last 7d</HChip><HChip on x>all sources</HChip><HChip on x>all callers</HChip>
          <a className="h-mono" style={{fontSize:11, color:'var(--gold-ink)', marginLeft:4}}>+ add</a>
        </div>

        {/* Section 1 · Volume */}
        <section>
          <div className="h-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="h-row" style={{gap:10}}>
              <span className="h-numerals" style={{['--_sz']:'28px', color:'var(--gold)'}}>01</span>
              <h3 style={{margin:0, fontSize:14, letterSpacing:'.06em'}}>Call volume</h3>
            </div>
            <span className="h-mono h-muted" style={{fontSize:11}}>vs prev 7d ↑ 12.4%</span>
          </div>
          <div className="h-card">
            <div style={{height:180}}><div className="h-chartph"/></div>
          </div>
        </section>

        {/* Section 2 · Latency */}
        <section>
          <div className="h-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="h-row" style={{gap:10}}>
              <span className="h-numerals" style={{['--_sz']:'28px', color:'var(--gold)'}}>02</span>
              <h3 style={{margin:0, fontSize:14, letterSpacing:'.06em'}}>Latency distribution</h3>
            </div>
            <span className="h-mono h-muted" style={{fontSize:11}}>p50 89 · p95 512 · p99 1.2s</span>
          </div>
          <div className="h-card">
            <div style={{height:140}}><div className="h-chartph"/></div>
          </div>
        </section>

        {/* Section 3 · Errors */}
        <section>
          <div className="h-row" style={{marginBottom:10}}>
            <div className="h-row" style={{gap:10}}>
              <span className="h-numerals" style={{['--_sz']:'28px', color:'var(--gold)'}}>03</span>
              <h3 style={{margin:0, fontSize:14, letterSpacing:'.06em'}}>Where the errors came from</h3>
            </div>
          </div>
          <div className="h-grid" style={{gridTemplateColumns:'2fr 1fr'}}>
            <div className="h-card">
              <div className="h-col" style={{gap:12}}>
                {[['Sentry','502 from upstream',412,'bad'],['Postgres·prod','timeout',287,'bad'],['Stripe API','4xx auth',162,'warn']].map(([src,desc,v,t]) => (
                  <div key={src+desc}>
                    <div className="h-row" style={{justifyContent:'space-between'}}>
                      <div className="h-row" style={{gap:10}}>
                        <HSwatch name={src} size="sm"/>
                        <span style={{fontSize:12.5, fontWeight:600}}>{src}</span>
                        <span className="h-muted h-italic" style={{fontSize:12}}>· {desc}</span>
                      </div>
                      <span className="h-mono h-muted" style={{fontSize:11}}>{v}</span>
                    </div>
                    <div className="h-bar" style={{marginTop:6}}><i className={t} style={{right:`${100-(v/500)*100}%`}}/></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-card" style={{background:'var(--gold-soft)', borderColor:'var(--gold-line)'}}>
              <h3 style={{color:'var(--gold-ink)'}}>Suggested action</h3>
              <p style={{fontSize:12.5, color:'var(--ink-2)', marginTop:8, lineHeight:1.5}}>
                <span className="h-italic">Three sources contributed</span> <strong>83% of errors.</strong>{' '}
                <span className="h-italic">Page their owners?</span>
              </p>
              <button className="h-btn gold" style={{marginTop:10}}>Notify owners</button>
            </div>
          </div>
        </section>

        {/* Section 4 · Top tools */}
        <section>
          <div className="h-row" style={{marginBottom:10}}>
            <div className="h-row" style={{gap:10}}>
              <span className="h-numerals" style={{['--_sz']:'28px', color:'var(--gold)'}}>04</span>
              <h3 style={{margin:0, fontSize:14, letterSpacing:'.06em'}}>The 5 tools that ate this week</h3>
            </div>
          </div>
          <div className="h-card" style={{padding:0, overflow:'hidden'}}>
            <table className="h-table">
              <tbody>
                {REP_TOP_TOOLS.slice(0,5).map(([t,src,v,p],i) => (
                  <tr key={t}>
                    <td style={{width:36}}>
                      <span className="h-numerals" style={{['--_sz']:'18px', color:'var(--muted-2)'}}>0{i+1}</span>
                    </td>
                    <td style={{width:'10%'}}><HSwatch name={src} size="sm"/></td>
                    <td><span className="h-mono">{t}</span></td>
                    <td className="h-mono" style={{textAlign:'right', width:90}}>{v.toLocaleString()}</td>
                    <td><div className="h-bar"><i className="accent" style={{right:`${100-p}%`}}/></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </HAppFrame>
  );
}

Object.assign(window, { HReportingGrid, HReportingNarrative });
