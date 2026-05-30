// hifi-app.jsx — refined direction · full overview canvas
/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
   TweaksPanel, useTweaks, TweakRadio, TweakSection,
   HDashboard, HConnectionsGallery, HConnectionsList, HConnectionDetail,
   HReportingGrid, HReportingNarrative,
   HPermissionsMatrix, HPermissionsInspector, HPermissionsPolicy, HPermissionsRole,
   HTeamsTable, HTeamsCards, HTeamDetail, HUserDetail */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "regular",
  "nav": "rail"
}/*EDITMODE-END*/;

const AB_W = 1320, AB_H = 860;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const common = { density: t.density, nav: t.nav };
  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="home" title="1 · Home" subtitle="Lands the team-lead in the product with everything at a glance.">
          <DCArtboard id="hi-dash" label="Home — connectors at a glance" width={AB_W} height={AB_H + 60}>
            <HDashboard {...common}/>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="connections"
          title="2 · Connections"
          subtitle="Three graphical treatments + a connection-detail page. Real vendor logos on every tile.">
          <DCArtboard id="conn-gallery" label="A · Gallery — feature + grid" width={AB_W} height={AB_H}>
            <HConnectionsGallery {...common}/>
          </DCArtboard>
          <DCArtboard id="conn-list" label="B · Refined list — filter rail + brand swatches" width={AB_W} height={AB_H}>
            <HConnectionsList {...common}/>
          </DCArtboard>
          <DCArtboard id="conn-detail" label="C · Connection detail — hero + tabs" width={AB_W} height={AB_H + 60}>
            <HConnectionDetail {...common}/>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="reporting"
          title="3 · Reporting"
          subtitle="Operator's chart grid vs. an editorial weekly narrative.">
          <DCArtboard id="rep-grid" label="A · Chart grid — top filters + dense layout" width={AB_W} height={AB_H}>
            <HReportingGrid {...common}/>
          </DCArtboard>
          <DCArtboard id="rep-narrative" label="B · Weekly narrative — hero + numbered sections" width={AB_W} height={AB_H + 100}>
            <HReportingNarrative {...common}/>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="permissions"
          title="4 · Permissions"
          subtitle="Matrix at a glance, pivot to a user, edit the policy, or open a single role.">
          <DCArtboard id="perm-matrix" label="A · Matrix — roles × tools" width={AB_W} height={AB_H}>
            <HPermissionsMatrix {...common}/>
          </DCArtboard>
          <DCArtboard id="perm-inspector" label="B · User-centric inspector" width={AB_W} height={AB_H + 60}>
            <HPermissionsInspector {...common}/>
          </DCArtboard>
          <DCArtboard id="perm-policy" label="C · Policy editor (accordion per source)" width={AB_W} height={AB_H + 60}>
            <HPermissionsPolicy {...common}/>
          </DCArtboard>
          <DCArtboard id="perm-role" label="D · Role detail — hero + tabs + history" width={AB_W} height={AB_H + 60}>
            <HPermissionsRole {...common}/>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="teams"
          title="5 · Teams & users"
          subtitle="Members table · team cards · single team · single member.">
          <DCArtboard id="team-table" label="A · Members table — tab nav + filter chips" width={AB_W} height={AB_H}>
            <HTeamsTable {...common}/>
          </DCArtboard>
          <DCArtboard id="team-cards" label="B · Team cards + pending invitations" width={AB_W} height={AB_H + 60}>
            <HTeamsCards {...common}/>
          </DCArtboard>
          <DCArtboard id="team-detail" label="C · Team detail — hero + tabs + members" width={AB_W} height={AB_H + 60}>
            <HTeamDetail {...common}/>
          </DCArtboard>
          <DCArtboard id="user-detail" label="D · User detail — access, security, sessions, activity" width={AB_W} height={AB_H + 100}>
            <HUserDetail {...common}/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout"/>
        <TweakRadio
          label="Nav style"
          value={t.nav}
          options={['rail','icons','wide']}
          onChange={v => setTweak('nav', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact','regular','comfy']}
          onChange={v => setTweak('density', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
