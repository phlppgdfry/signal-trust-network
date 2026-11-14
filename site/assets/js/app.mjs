import {
  SIGNAL_CATEGORIES,
  PARTNER_PASSPORTS,
  FORBIDDEN_ANTI_FEATURES,
  evaluateCompassRoute,
  createTimelineAddendum,
  buildBridgeHandoverPackage,
  evaluateHandshakeSafety,
  checkDossierAccessAuthorization
} from "../lib/signal-engine.mjs";

const INITIAL_DOSSIERS = [
  {
    dossierId: "demo-dossier-01",
    personaName: "Fictief Dossier A — Stagiaire in de creatieve sector",
    neutralPersonaName: "Dossier A — Werkplek- en begeleidingscontext",
    roleType: "direct_reporter",
    currentDisclosureLevel: 2,
    categories: ["pesten-intimidatie-machtsmisbruik", "seksueel-grensoverschrijdend-gedrag"],
    summary:
      "Ervaart tijdens een stage herhaaldelijk grensoverschrijdende berichten laat op de avond en druk om buiten werktijd alleen af te spreken om een beoordeling 'goed te laten verlopen'. Twijfelt tussen haar hogeschool en het Vlaams Meldpunt.",
    timelineEntries: [
      {
        entryId: "tl-101",
        createdAt: "2026-10-04T21:15:00+02:00",
        incidentDateOrPeriod: "2 oktober 2026 (avond)",
        entryType: "own_memory",
        certainty: "exact",
        title: "Gesprek na afloop van de vrijdagborrel",
        rawUserNarrative:
          "Na het vertrek van de andere collega's zei de begeleider dat mijn stagebeoordeling 'volledig van hem afhangt' en dat we dat buiten kantoor onder vier ogen moesten bespreken.",
        categories: ["pesten-intimidatie-machtsmisbruik"]
      },
      {
        entryId: "tl-102",
        createdAt: "2026-10-12T08:40:00+02:00",
        incidentDateOrPeriod: "11 oktober 2026 om 23:48",
        entryType: "document_evidence",
        certainty: "exact",
        title: "Screenshot van berichten op zondagavond",
        rawUserNarrative:
          "Drie opeenvolgende berichten waarin gevraagd wordt om laat op de avond langs te komen en opnieuw verwezen wordt naar mijn eindcijfer.",
        categories: ["seksueel-grensoverschrijdend-gedrag", "pesten-intimidatie-machtsmisbruik"],
        attachments: [
          {
            attachmentId: "att-901",
            fileName: "screenshot-berichten-11okt-synthetisch.png",
            mimeType: "image/png",
            sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            timestampedAt: "2026-10-12T08:40:12+02:00"
          }
        ]
      },
      {
        entryId: "tl-103",
        createdAt: "2026-10-19T19:05:00+02:00",
        incidentDateOrPeriod: "Begin september 2026 (datum onzeker)",
        entryType: "third_party_note",
        certainty: "approximate_date",
        title: "Opmerking van oud-stagiair tijdens overdracht",
        rawUserNarrative:
          "Mijn voorganger waarschuwde me in mijn eerste week kort: 'Zorg dat je nooit als laatste op kantoor achterblijft.' Ik twijfel of dat op maandag 7 of dinsdag 8 september was.",
        categories: ["pesten-intimidatie-machtsmisbruik"]
      }
    ]
  },
  {
    dossierId: "demo-dossier-02",
    personaName: "Fictief Dossier B — Collega / Getuige op logistieke afdeling (SIGNAL Witness)",
    neutralPersonaName: "Dossier B — Collega-observatie (Witness)",
    roleType: "witness",
    currentDisclosureLevel: 1,
    categories: ["discriminatie", "pesten-intimidatie-machtsmisbruik"],
    summary:
      "Ziet als teamlid hoe een nieuwe collega structureel wordt buitengesloten van veiligheidsbriefings en vernederende opmerkingen over afkomst krijgt. Gebruikt SIGNAL Witness om eigen feitelijke waarneming vast te leggen.",
    timelineEntries: [
      {
        entryId: "tl-201",
        createdAt: "2026-10-28T17:30:00+01:00",
        incidentDateOrPeriod: "28 oktober 2026 om 07:15",
        entryType: "own_memory",
        certainty: "exact",
        title: "Eigen waarneming tijdens ploegwissel in magazijn B",
        rawUserNarrative:
          "Ik stond er zelf op twee meter afstand bij toen de ploegverantwoordelijke weigerde de veiligheidsinstructie aan mijn collega te geven met een denigrerende opmerking over zijn afkomst.",
        categories: ["discriminatie", "pesten-intimidatie-machtsmisbruik"]
      }
    ]
  },
  {
    dossierId: "demo-dossier-03",
    personaName: "Fictief Dossier C — Financieel medewerker ontdekt subsidiefraude (Klokkenluiden)",
    neutralPersonaName: "Dossier C — Financiële naleving (Klokkenluiden)",
    roleType: "direct_reporter",
    currentDisclosureLevel: 4,
    categories: ["bedrijfsfraude-klokkenluiden"],
    summary:
      "Ontdekt dat urenstaten voor een publiek gesubsidieerd project systematisch worden aangepast. Gebruikt SIGNAL Reality Check en SIGNAL Bridge richting Federale Ombudsman en FIRM-IFDH.",
    timelineEntries: [
      {
        entryId: "tl-301",
        createdAt: "2026-11-02T14:20:00+01:00",
        incidentDateOrPeriod: "30 oktober 2026",
        entryType: "document_evidence",
        certainty: "exact",
        title: "Verschil tussen interne urenregistratie en ingediende subsidieclaim Q3",
        rawUserNarrative:
          "Export van het originele urenoverzicht voordat mij schriftelijk werd gevraagd 420 niet-geprestesteerde uren toe te voegen aan het subsidiedossier.",
        categories: ["bedrijfsfraude-klokkenluiden"],
        attachments: [
          {
            attachmentId: "att-902",
            fileName: "vergelijking-uren-q3-synthetisch.pdf",
            mimeType: "application/pdf",
            sha256Hash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
            timestampedAt: "2026-11-02T14:20:45+01:00"
          }
        ]
      }
    ]
  }
];

const TOUR_STEPS = [
  {
    screen: "screen-home",
    title: "Stap 1/6 — Van klachtenformulier naar vertrouwensnetwerk (SIGNAL Zero)",
    text: "Bezoekers kunnen zich oriënteren zonder account, login of cookies. Bekijk de 5 niveaus van Safe Disclosure en de 6 samenwerkende domeinen."
  },
  {
    screen: "screen-compass",
    title: "Stap 2/6 — SIGNAL Compass & Reality Check",
    text: "Kies wat je nu nodig hebt, selecteer één of meer categorieën (of de SIGNAL Witness / Guardian route) en zie direct welke Belgische partnerorganisatie bevoegd is."
  },
  {
    screen: "screen-vault",
    title: "Stap 3/6 — Mijn Veilige Ruimte (SIGNAL Timeline & Memory)",
    text: "Ervaar hoe eigen herinneringen (zeker vs. onzeker), bewijsstukken met SHA-256 hash en latere aanvullingen strikt gescheiden blijven zonder dat de originele getuigenis ooit wordt overschreven."
  },
  {
    screen: "screen-bridge",
    title: "Stap 4/6 — SIGNAL Bridge & Trust Passport",
    text: "Stel zelf een overdrachtspakket samen, controleer het Trust Passport van de ontvanger en genereer een overdrachtsbewijs zodat je je verhaal niet opnieuw hoeft te vertellen."
  },
  {
    screen: "screen-handshake",
    title: "Stap 5/6 — Safe Matching & SIGNAL Handshake Simulator (Fase 3)",
    text: "Test waarom automatische match-meldingen verboden zijn en hoe vierogencontrole, SIGNAL Fairness en individuele begeleiding werken."
  },
  {
    screen: "screen-workspace",
    title: "Stap 6/6 — De Gouden Architectuurregel & Governance",
    text: "Test in de Professional Workspace hoe zelfs een systeembeheerder of betalende B2B-klant géén toegang krijgt tot dossiers, en bekijk de 8 statutaire waarborgen."
  }
];

const state = {
  activeScreen: "screen-home",
  invisibleMode: false,
  emergencyOpen: false,
  tourActive: false,
  tourIndex: 0,
  // Compass state
  compassNeed: "explore",
  compassRole: "direct_reporter",
  compassRecent72h: false,
  compassCategories: ["pesten-intimidatie-machtsmisbruik"],
  // Consent Center state
  consentMatrix: {
    localVault: true,
    evidenceHash: true,
    bridgeTransfer: false,
    patternCheckPhase3: false,
    anonymousPulseStats: false
  },
  // Vault & Dossiers state
  dossiers: structuredClone(INITIAL_DOSSIERS),
  activeDossierId: "demo-dossier-01",
  aiStructuredPreviewOpen: false,
  continuityExportJson: null,
  // Bridge state
  bridgeSelectedEntries: ["tl-101", "tl-102"],
  bridgeRecipientId: "org-vlaams-meldpunt",
  bridgeDisclosureLevel: "pseudonymous_bridge",
  bridgeGoal: "listening_and_advice",
  bridgeConsentNotPolice: true,
  bridgeConsentRevocability: true,
  lastCreatedBridgePackage: null,
  // Handshake Simulator state
  hsPhase: 3,
  hsLegalApproved: true,
  hsReviewer1: true,
  hsReviewer2: true,
  hsHearsayFlag: false,
  hsNamesakeFlag: false,
  hsReporter1Consent: false,
  hsReporter2Consent: false,
  // Workspace Role Tester state
  wsSelectedActor: "partner_caseworker",
  wsPartnerOrg: "org-vlaams-meldpunt",
  wsAuditLog: [
    {
      time: "2026-11-14 09:12:04",
      actor: "Melder (Vault Owner)",
      action: "Tijdlijnitem tl-102 + SHA-256 hash geregistreerd in KMS Domein B",
      result: "ALLOWED (Eigen kluissleutel)"
    },
    {
      time: "2026-11-14 09:18:22",
      actor: "SIGNAL Bridge Service",
      action: "Deelpakket (2 van 3 items) versleuteld voor publieke sleutel Vlaams Meldpunt",
      result: "DELIVERED (Pseudoniem)"
    },
    {
      time: "2026-11-14 09:24:10",
      actor: "Platform SysAdmin (Test)",
      action: "Poging tot lezen van ruwe Vault-tabel zonder gebruikerssleutel",
      result: "BLOCKED (Gouden Architectuurregel)"
    }
  ]
};

function getActiveDossier() {
  return state.dossiers.find((d) => d.dossierId === state.activeDossierId) || state.dossiers[0];
}

export function switchScreen(screenId) {
  state.activeScreen = screenId;
  document.querySelectorAll(".screen-section").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });
  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCompassScreen() {
  const container = document.getElementById("compass-dynamic-root");
  if (!container) return;

  const evalResult = evaluateCompassRoute({
    need: state.compassNeed,
    categoryIds: state.compassCategories,
    roleContext: state.compassRole,
    recentIncidentUnder72h: state.compassRecent72h
  });

  const needs = [
    { id: "explore", label: "Ik weet niet zeker of wat er gebeurd is 'meldbaar' is", desc: "Bekijk eerst rustig voorbeelden, rechten en definities zonder iets op te slaan." },
    { id: "document_privately", label: "Ik wil iets voor mezelf vastleggen voordat ik details vergeet", desc: "Start een chronologische tijdlijn in je persoonlijke kluis zonder dat iemand bericht krijgt." },
    { id: "talk_to_human", label: "Ik wil veilig en vertrouwelijk met iemand kunnen praten", desc: "Vind direct de juiste erkende hulplijn of vertrouwenspersoon met beroepsgeheim." },
    { id: "check_patterns", label: "Ik vraag me af of anderen iets soortgelijks meemaakten", desc: "Lees hoe gecontroleerde patroonherkenning en onafhankelijke begeleiding werken." },
    { id: "prepare_official", label: "Ik wil weten hoe ik een officiële melding of overdracht voorbereid", desc: "Bekijk de bevoegde instanties en stel een gecontroleerd SIGNAL Bridge-pakket samen." }
  ];

  const roles = [
    { id: "direct_reporter", label: "Ik heb dit zelf meegemaakt" },
    { id: "witness", label: "Ik ben getuige, collega of omstander (SIGNAL Witness)" },
    { id: "minor_guardian", label: "Het gaat om een minderjarige of kwetsbare persoon (SIGNAL Guardian)" },
    { id: "urgent_danger", label: "Er is mogelijk acuut gevaar of medische nood" }
  ];

  container.innerHTML = `
    <div class="grid-2">
      <div>
        <div class="panel" style="margin-bottom: 1.25rem;">
          <h3>Stap 1 — Wat zou jou op dit moment het meest helpen?</h3>
          <p>Je hoeft niet te beginnen met een klachtenformulier. Kies waar je nu behoefte aan hebt:</p>
          ${needs
            .map(
              (n) => `
            <button type="button" class="choice-card ${state.compassNeed === n.id ? "selected" : ""}" data-compass-need="${n.id}">
              <div class="choice-card-title">
                <span>${n.label}</span>
                ${state.compassNeed === n.id ? '<span class="badge badge-trust">Geselecteerd</span>' : ""}
              </div>
              <p class="choice-card-desc">${n.desc}</p>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="panel" style="margin-bottom: 1.25rem;">
          <h3>Stap 2 — Vanuit welke rol zoek je informatie?</h3>
          ${roles
            .map(
              (r) => `
            <button type="button" class="choice-card ${state.compassRole === r.id ? "selected" : ""}" data-compass-role="${r.id}">
              <div class="choice-card-title">
                <span>${r.label}</span>
                ${state.compassRole === r.id ? '<span class="badge badge-trust">Actief</span>' : ""}
              </div>
            </button>
          `
            )
            .join("")}
          <label style="display:flex; align-items:center; gap:0.6rem; margin-top:0.75rem; font-size:0.9rem; cursor:pointer;">
            <input type="checkbox" id="compass-72h-toggle" ${state.compassRecent72h ? "checked" : ""} />
            <span>Het voorval vond minder dan 72 uur tot 7 dagen geleden plaats (tijdsgevoelig voor medisch/forensisch onderzoek)</span>
          </label>
        </div>

        <div class="panel">
          <h3>Stap 3 — Waar gaat de situatie over? (Meerdere keuzes mogelijk)</h3>
          <p>Een ervaring valt vaak onder meerdere thema's tegelijk. Klik om thema's te combineren:</p>
          ${SIGNAL_CATEGORIES.map((cat) => {
            const isSel = state.compassCategories.includes(cat.id);
            const displayName = state.invisibleMode ? cat.neutralLabel : cat.name;
            return `
              <button type="button" class="choice-card ${isSel ? "selected" : ""}" data-compass-cat="${cat.id}">
                <div class="choice-card-title">
                  <span>${displayName}</span>
                  <span class="badge ${cat.wave === 3 ? "badge-caution" : "badge-trust"}">Golf ${cat.wave} · Risico: ${cat.riskLabel}</span>
                </div>
                <p class="choice-card-desc">${cat.examples}</p>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div>
        ${evalResult.urgentAlerts
          .map(
            (alert) => `
          <div class="panel-urgent" style="margin-bottom: 1rem;">
            <h3 style="margin:0 0 0.35rem 0; color:var(--urgent-ink);">${alert.title}</h3>
            <p style="margin:0; color:var(--ink-primary); font-size:0.92rem;">${alert.message}</p>
          </div>
        `
          )
          .join("")}

        ${
          evalResult.witnessGuidance
            ? `
          <div class="panel-soft" style="margin-bottom: 1rem;">
            <h3>${evalResult.witnessGuidance.protocol}</h3>
            <p style="margin:0; font-size:0.92rem;">${evalResult.witnessGuidance.rule}</p>
          </div>
        `
            : ""
        }

        <div class="panel" style="margin-bottom: 1.25rem; border-color: var(--deep-trust);">
          <span class="badge badge-trust" style="margin-bottom:0.5rem;">Deterministische Wegwijzer · Geen AI-beslissing</span>
          <h3>Jouw aanbevolen route: Safe Disclosure Niveau ${evalResult.recommendedDisclosureLevel}</h3>
          <p>Op basis van jouw selectie (${evalResult.matchedCategories.length} categorie(ën)) zijn deze erkende Belgische voorzieningen bevoegd:</p>

          ${evalResult.recommendedPartners
            .map(
              (p) => `
            <div class="panel-soft" style="margin-bottom: 0.85rem;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:0.5rem;">
                <strong style="color:var(--deep-trust); font-size:1rem;">${p.name}</strong>
                <span class="badge badge-trust">${p.badgeText}</span>
              </div>
              <p style="font-size:0.88rem; margin:0.4rem 0;">${p.legalBasisSummary}</p>
              <div style="font-size:0.82rem; color:var(--ink-secondary); display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:0.5rem;">
                <span><strong>Geheimhouding:</strong> ${p.confidentialityRegime.secrecyArticle}</span>
                <span><strong>Telefoon:</strong> ${p.accessChannels.phoneNumber}</span>
              </div>
              <div style="margin-top:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="btn btn-primary" data-goto-bridge="${p.organizationId}">Bereid SIGNAL Bridge-overdracht voor</button>
                <button type="button" class="btn" data-goto-screen="screen-network">Bekijk volledig Trust Passport</button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="panel-caution" style="margin-bottom: 1.25rem;">
          <h3 style="margin-top:0; color:var(--caution-ink);">SIGNAL Reality Check — Wat je juridisch moet weten</h3>
          ${evalResult.matchedCategories
            .map(
              (c) => `
            <div style="margin-bottom: 0.85rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--caution-border);">
              <strong>${state.invisibleMode ? c.neutralLabel : c.name} (${c.gdprArticles.join(" · ")})</strong>
              <p style="margin:0.3rem 0; font-size:0.88rem; color:var(--ink-primary);"><strong>Wat dit wél is:</strong> ${c.realityCheck.whatItIs}</p>
              <p style="margin:0; font-size:0.88rem; color:var(--caution-ink);"><strong>Wat dit níét is:</strong> ${c.realityCheck.whatItIsNot}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="panel">
          <h3>SIGNAL Evidence Coach — Veilig & rechtmatig documenteren</h3>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem; color:var(--ink-secondary);">
            ${evalResult.combinedEvidenceTips.map((tip) => `<li style="margin-bottom:0.4rem;">${tip}</li>`).join("")}
          </ul>
          <div style="margin-top:1rem;">
            <button type="button" class="btn btn-primary" data-goto-screen="screen-vault">Open Mijn Veilige Ruimte (Private Vault)</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind events
  container.querySelectorAll("[data-compass-need]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.compassNeed = btn.dataset.compassNeed;
      renderCompassScreen();
    });
  });

  container.querySelectorAll("[data-compass-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.compassRole = btn.dataset.compassRole;
      renderCompassScreen();
    });
  });

  const toggle72 = container.querySelector("#compass-72h-toggle");
  if (toggle72) {
    toggle72.addEventListener("change", (e) => {
      state.compassRecent72h = e.target.checked;
      renderCompassScreen();
    });
  }

  container.querySelectorAll("[data-compass-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cid = btn.dataset.compassCat;
      if (state.compassCategories.includes(cid)) {
        if (state.compassCategories.length > 1) {
          state.compassCategories = state.compassCategories.filter((x) => x !== cid);
        }
      } else {
        state.compassCategories = [...state.compassCategories, cid];
      }
      renderCompassScreen();
    });
  });

  container.querySelectorAll("[data-goto-bridge]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.bridgeRecipientId = btn.dataset.gotoBridge;
      renderBridgeScreen();
      switchScreen("screen-bridge");
    });
  });

  container.querySelectorAll("[data-goto-screen]").forEach((btn) => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.gotoScreen));
  });
}

function renderConsentScreen() {
  const root = document.getElementById("consent-dynamic-root");
  if (!root) return;

  const items = [
    {
      key: "localVault",
      title: "Persoonlijke kluis & tijdlijn (KMS Sleuteldomein B)",
      purpose: "Enkel voor jezelf bewaren van notities en chronologie.",
      recipient: "Niemand (uitsluitend jijzelf)",
      erasureRule: "100% direct en onvoorwaardelijk wisbaar door jou (Crypto-shredding)."
    },
    {
      key: "evidenceHash",
      title: "SHA-256 Bewijsintegriteit & Tijdregistratie",
      purpose: "Vastleggen dat een bijlage sinds opname in de kluis niet is gewijzigd.",
      recipient: "Geen externe partij",
      erasureRule: "Volledig wisbaar samen met je persoonlijke kluis."
    },
    {
      key: "bridgeTransfer",
      title: "SIGNAL Bridge — Warme overdracht naar één gekozen partner",
      purpose: "Geselecteerde tijdlijnitems overdragen zodat je je verhaal niet opnieuw hoeft te vertellen.",
      recipient: "Enkel de door jou geselecteerde Belgische partnerorganisatie",
      erasureRule: "Vóór verzending direct intrekbaar. Ná verzending geldt het wettelijk bewaarbeleid en beroepsgeheim van de ontvangende instantie (art. 17 lid 3 AVG)."
    },
    {
      key: "patternCheckPhase3",
      title: "Safe Matching — Geïsoleerde patrooncontrole (Fase 3 · Standaard Uit)",
      purpose: "Controleren of er binnen een wettelijk toegelaten partnerdomein een onafhankelijke overeenkomst bestaat.",
      recipient: "Geïsoleerd vierogen-reviewteam (nooit andere melders rechtstreeks)",
      erasureRule: "Standaard uitgeschakeld in MVP (ADR-002). Toestemming kan op elk moment worden ingetrokken voor toekomstige vergelijkingen."
    },
    {
      key: "anonymousPulseStats",
      title: "SIGNAL Pulse — Geaggregeerde maatschappelijke statistiek (k-anoniem)",
      purpose: "Uitsluitend anonieme telling op sector- en categorieniveau zonder namen of verhalen.",
      recipient: "Openbaar jaarverslag / Wetenschappelijk onderzoek",
      erasureRule: "Bevat geen persoonsgegevens of herleidbare verhalen."
    }
  ];

  root.innerHTML = `
    <div class="grid-2">
      <div class="panel">
        <h3>Granulaire Toestemmingsmatrix (Consent Center)</h3>
        <p>Bij SIGNAL geef je nooit één algemene toestemming. Je beslist per onderdeel en ziet direct wie toegang heeft en hoe gegevenswissing (artikel 17 AVG) werkt:</p>
        ${items
          .map(
            (item) => `
          <div style="padding:0.9rem 0; border-bottom:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
              <strong style="color:var(--deep-trust);">${item.title}</strong>
              <label style="display:inline-flex; align-items:center; gap:0.4rem; cursor:pointer; font-size:0.86rem; font-weight:600;">
                <input type="checkbox" data-consent-toggle="${item.key}" ${state.consentMatrix[item.key] ? "checked" : ""} />
                <span>${state.consentMatrix[item.key] ? "Ingeschakeld" : "Uitgeschakeld"}</span>
              </label>
            </div>
            <p style="margin:0.3rem 0; font-size:0.86rem;"><strong>Doel:</strong> ${item.purpose}</p>
            <p style="margin:0.2rem 0; font-size:0.84rem;"><strong>Ontvanger:</strong> <span class="badge badge-trust">${item.recipient}</span></p>
            <p style="margin:0.2rem 0 0 0; font-size:0.82rem; color:var(--caution-ink);"><strong>Recht op wissing (Art. 17 AVG):</strong> ${item.erasureRule}</p>
          </div>
        `
          )
          .join("")}
      </div>

      <div>
        <div class="panel-soft" style="margin-bottom: 1.25rem;">
          <h3>De 5 Niveaus van Safe Disclosure (ADR-005)</h3>
          <p>Je bepaalt zelf op welk niveau je SIGNAL gebruikt — van nul persoonsgegevens tot een begeleide formele stap:</p>
          <ol style="padding-left:1.25rem; margin:0; font-size:0.9rem;">
            <li style="margin-bottom:0.5rem;"><strong>Niveau 1 — SIGNAL Zero:</strong> Oriënteren zonder account, login of persoonsgegevens.</li>
            <li style="margin-bottom:0.5rem;"><strong>Niveau 2 — Private Vault:</strong> Persoonlijk en versleuteld documenteren op eigen tempo.</li>
            <li style="margin-bottom:0.5rem;"><strong>Niveau 3 — Vertrouwelijk Advies:</strong> Anoniem of vertrouwelijk sparren met een erkende hulplijn (bijv. 1712 of ZSG).</li>
            <li style="margin-bottom:0.5rem;"><strong>Niveau 4 — SIGNAL Bridge:</strong> Zelf geselecteerde dossieritems overdragen aan een geverifieerde partnerorganisatie.</li>
            <li><strong>Niveau 5 — Formeel of Collectief:</strong> Onder professionele of juridische begeleiding een formele procedure starten.</li>
          </ol>
        </div>

        <div class="panel">
          <h3>Veiligheid op een gecontroleerd toestel (SIGNAL Invisible & Safe Exit)</h3>
          <p>Sommige mensen worden thuis of op het werk digitaal in de gaten gehouden. Test hier direct de twee beschermingsfuncties:</p>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.75rem;">
            <button type="button" class="btn btn-primary" id="consent-toggle-invisible">
              ${state.invisibleMode ? "Schakel SIGNAL Invisible (Discrete modus) UIT" : "Schakel SIGNAL Invisible (Discrete modus) IN"}
            </button>
            <button type="button" class="btn btn-safe-exit" id="consent-trigger-safe-exit">
              Test Safe Exit (Veilige Uitgang)
            </button>
          </div>
          <div class="panel-caution" style="margin-top:1rem;">
            <strong>Eerlijke technische toelichting:</strong> Een Safe Exit-knop sluit en wist direct jouw actieve sessie in deze applicatie, maar kan zonder privévenster (incognitomodus) niet automatisch je volledige browsergeschiedenis wissen. Gebruik op een onveilig toestel daarom bij voorkeur een privévenster of bel gratis naar <strong>1712</strong> (dit nummer verschijnt niet op de telefoonrekening).
          </div>
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll("[data-consent-toggle]").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const k = cb.dataset.consentToggle;
      state.consentMatrix[k] = e.target.checked;
      renderConsentScreen();
    });
  });

  const invBtn = root.querySelector("#consent-toggle-invisible");
  if (invBtn) {
    invBtn.addEventListener("click", () => {
      toggleInvisibleMode();
      renderConsentScreen();
    });
  }

  const exitBtn = root.querySelector("#consent-trigger-safe-exit");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => triggerSafeExitModal());
  }
}

async function computeSha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  if (window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
}

function renderVaultScreen() {
  const root = document.getElementById("vault-dynamic-root");
  if (!root) return;

  const dossier = getActiveDossier();

  const typeLabels = {
    own_memory: "Eigen herinnering (Memory)",
    document_evidence: "Bewijsstuk / Document (Evidence Vault)",
    third_party_note: "Verklaring of waarneming van derde",
    addendum_correction: "Latere aanvulling (Origineel behouden)",
    official_step: "Gezette officiële stap"
  };

  const certaintyLabels = {
    exact: "Exacte datum & detail zeker",
    approximate_date: "Datum bij benadering / deels onzeker",
    uncertain_detail: "Herinnering met onzeker detail"
  };

  root.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:0.6rem; align-items:center; margin-bottom:1.25rem;">
      <strong style="color:var(--deep-trust);">Kies een fictief voorbeelddossier:</strong>
      ${state.dossiers
        .map(
          (d) => `
        <button type="button" class="btn ${d.dossierId === dossier.dossierId ? "btn-primary" : ""}" data-select-dossier="${d.dossierId}">
          ${state.invisibleMode ? d.neutralPersonaName : d.personaName}
        </button>
      `
        )
        .join("")}
    </div>

    <div class="grid-2">
      <div>
        <div class="panel-soft" style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <h3 style="margin:0;">${state.invisibleMode ? dossier.neutralPersonaName : dossier.personaName}</h3>
            <span class="badge badge-trust">${dossier.roleType === "witness" ? "SIGNAL Witness Dossier" : "Persoonlijke Kluis (Niveau 2)"}</span>
          </div>
          <p style="margin:0.5rem 0 0 0; font-size:0.92rem;">${dossier.summary}</p>
        </div>

        <h3 style="color:var(--deep-trust); margin-bottom:0.5rem;">Chronologische SIGNAL Timeline (${dossier.timelineEntries.length} items)</h3>
        <div class="timeline-list">
          ${dossier.timelineEntries
            .map(
              (entry) => `
            <div class="timeline-item ${entry.entryType === "addendum_correction" ? "is-addendum" : ""}">
              <div class="timeline-meta">
                <span class="badge badge-trust">${typeLabels[entry.entryType] || entry.entryType}</span>
                <span class="badge ${entry.certainty === "exact" ? "" : "badge-caution"}">${certaintyLabels[entry.certainty] || entry.certainty}</span>
                <span><strong>Voorval:</strong> ${entry.incidentDateOrPeriod}</span>
                <span><strong>Vastgelegd:</strong> ${entry.createdAt.slice(0, 16).replace("T", " ")}</span>
              </div>
              <h4 style="margin:0 0 0.35rem 0; color:var(--deep-trust);">${entry.title}</h4>
              <p style="margin:0 0 0.5rem 0; font-size:0.92rem; color:var(--ink-primary);">${entry.rawUserNarrative}</p>
              ${
                entry.attachments && entry.attachments.length > 0
                  ? entry.attachments
                      .map(
                        (att) => `
                  <div class="hash-box">
                    <strong>Bijlage:</strong> ${att.fileName} (${att.mimeType})<br/>
                    <strong>SHA-256 Integriteitshash:</strong> ${att.sha256Hash}<br/>
                    <strong>Gekwalificeerd tijdstempel:</strong> ${att.timestampedAt}
                  </div>
                `
                      )
                      .join("")
                  : ""
              }
              ${
                entry.entryType !== "addendum_correction"
                  ? `
                <div style="margin-top:0.65rem;">
                  <button type="button" class="btn" style="font-size:0.8rem; padding:0.3rem 0.65rem;" data-add-addendum="${entry.entryId}">
                    + Voeg latere aanvulling toe (zonder origineel te overschrijven)
                  </button>
                </div>
              `
                  : `<div style="font-size:0.78rem; color:var(--human-care); margin-top:0.35rem;">✓ Oorspronkelijke notitie (${entry.parentEntryId}) is ongewijzigd bewaard gebleven (ADR-003).</div>`
              }
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>Nieuwe gebeurtenis of herinnering toevoegen aan deze fictieve kluis</h3>
          <p style="font-size:0.88rem;">Ervaar hoe SIGNAL feiten, onzekere herinneringen en derdenverklaringen zuiver uit elkaar houdt:</p>
          <div class="form-group">
            <label class="form-label" for="new-entry-title">Korte titel van het voorval</label>
            <input class="form-input" id="new-entry-title" type="text" placeholder="Bijv. Gesprek bij de koffiemachine na teamvergadering" />
          </div>
          <div class="grid-2" style="gap:0.75rem;">
            <div class="form-group">
              <label class="form-label" for="new-entry-date">Datum of periode van het voorval</label>
              <input class="form-input" id="new-entry-date" type="text" placeholder="Bijv. 12 november 2026 rond 16:30" />
            </div>
            <div class="form-group">
              <label class="form-label" for="new-entry-type">Type registratie</label>
              <select class="form-select" id="new-entry-type">
                <option value="own_memory">Eigen herinnering / eigen waarneming</option>
                <option value="document_evidence">Bestaand document / screenshot (met SHA-256 hash)</option>
                <option value="third_party_note">Verklaring van een derde / collega</option>
                <option value="official_step">Reeds gezette stap (bijv. gesprek met huisarts/HR)</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="new-entry-certainty">Hoe zeker ben je van de datum en details? (SIGNAL Memory)</label>
            <select class="form-select" id="new-entry-certainty">
              <option value="exact">Exacte datum en details zijn zeker</option>
              <option value="approximate_date">Datum bij benadering (bijv. 'begin oktober')</option>
              <option value="uncertain_detail">Ik twijfel over een specifiek detail (eerlijk aangeven versterkt geloofwaardigheid)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="new-entry-narrative">Jouw eigen beschrijving (wordt nooit door AI herschreven)</label>
            <textarea class="form-textarea" id="new-entry-narrative" placeholder="Beschrijf op je eigen tempo wat je zelf hebt gezien, gehoord of ontvangen..."></textarea>
          </div>
          <button type="button" class="btn btn-primary" id="btn-save-timeline-entry">Vastleggen met SHA-256 integriteitshash</button>
        </div>

        <div class="panel" style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
            <h3 style="margin:0;">Begrensde AI Dossier-assistent (EU AI Act-conform)</h3>
            <span class="badge badge-trust">ADR-003</span>
          </div>
          <p style="font-size:0.88rem; margin-top:0.4rem;">
            AI mag binnen SIGNAL <strong>nooit</strong> oordelen wie gelijk heeft of hoe geloofwaardig een verhaal klinkt. AI kan enkel op jouw verzoek een chronologische samenvatting tonen terwijl jouw originele woorden 100% bewaard blijven.
          </p>
          <button type="button" class="btn" id="btn-toggle-ai-preview">
            ${state.aiStructuredPreviewOpen ? "Verberg chronologische structuurweergave" : "Genereer chronologisch uittreksel (zonder origineel te wijzigen)"}
          </button>
          ${
            state.aiStructuredPreviewOpen
              ? `
            <div class="panel-soft" style="margin-top:0.85rem; font-size:0.86rem;">
              <strong>Chronologisch overzicht (alleen-lezen hulpmiddel):</strong>
              <ul style="margin:0.4rem 0; padding-left:1.2rem;">
                ${dossier.timelineEntries
                  .map(
                    (e) =>
                      `<li><strong>[${e.incidentDateOrPeriod}]</strong> (${typeLabels[e.entryType]}): ${e.title} — <em>Oorspronkelijke getuigenis intact (${e.rawUserNarrative.length} tekens)</em></li>`
                  )
                  .join("")}
              </ul>
              <div style="color:var(--deep-trust); font-weight:600; margin-top:0.4rem;">
                ✓ Geen schuldscore · Geen geloofwaardigheidsanalyse · Originele bewoordingen ongewijzigd bewaard.
              </div>
            </div>
          `
              : ""
          }
        </div>

        <div class="panel">
          <h3>SIGNAL Continuity — Draagbare Kluis-export</h3>
          <p style="font-size:0.88rem;">Wat als je je dossier zelf wilt bewaren voor een advocaat of als SIGNAL ooit zou stoppen? Met één klik genereer je een controleerbaar exportmanifest inclusief SHA-256 hashes:</p>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button type="button" class="btn" id="btn-generate-export">Genereer SIGNAL Continuity Export-manifest</button>
            <button type="button" class="btn btn-primary" data-goto-bridge-from-vault="true">Selecteer items voor SIGNAL Bridge-overdracht</button>
          </div>
          ${
            state.continuityExportJson
              ? `<pre class="hash-box" style="max-height:180px; overflow:auto; margin-top:0.75rem;">${state.continuityExportJson}</pre>`
              : ""
          }
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll("[data-select-dossier]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeDossierId = btn.dataset.selectDossier;
      const d = getActiveDossier();
      state.bridgeSelectedEntries = d.timelineEntries.map((e) => e.entryId);
      state.continuityExportJson = null;
      renderVaultScreen();
      renderBridgeScreen();
    });
  });

  root.querySelectorAll("[data-add-addendum]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentId = btn.dataset.addAddendum;
      const text = window.prompt(
        "Voeg een latere aanvulling of correctie toe. De oorspronkelijke notitie blijft ongewijzigd zichtbaar:",
        "Aanvulling: ik heb vandaag het bijbehorende agenda-item en de naam van een aanwezige collega teruggevonden."
      );
      if (text && text.trim()) {
        dossier.timelineEntries = createTimelineAddendum(
          dossier.timelineEntries,
          parentId,
          text,
          new Date().toISOString()
        );
        renderVaultScreen();
        renderBridgeScreen();
      }
    });
  });

  const saveBtn = root.querySelector("#btn-save-timeline-entry");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const titleEl = root.querySelector("#new-entry-title");
      const dateEl = root.querySelector("#new-entry-date");
      const typeEl = root.querySelector("#new-entry-type");
      const certEl = root.querySelector("#new-entry-certainty");
      const narEl = root.querySelector("#new-entry-narrative");

      const title = titleEl.value.trim() || "Nieuwe persoonlijke tijdlijnnotitie";
      const dateStr = dateEl.value.trim() || "14 november 2026";
      const rawText =
        narEl.value.trim() ||
        "Ik heb dit voorval vandaag voor mezelf vastgelegd in mijn persoonlijke kluis.";

      const hashHex = await computeSha256Hex(`${title}|${dateStr}|${rawText}`);
      const nowIso = new Date().toISOString();
      const newEntry = {
        entryId: `tl-${Date.now().toString().slice(-4)}`,
        createdAt: nowIso,
        incidentDateOrPeriod: dateStr,
        entryType: typeEl.value,
        certainty: certEl.value,
        title,
        rawUserNarrative: rawText,
        categories: [...dossier.categories],
        attachments: [
          {
            attachmentId: `att-${Date.now().toString().slice(-4)}`,
            fileName: "notitie-integriteitsbewijs.txt",
            mimeType: "text/plain",
            sha256Hash: hashHex,
            timestampedAt: nowIso
          }
        ]
      };

      dossier.timelineEntries.push(newEntry);
      state.bridgeSelectedEntries.push(newEntry.entryId);
      renderVaultScreen();
      renderBridgeScreen();
    });
  }

  const aiBtn = root.querySelector("#btn-toggle-ai-preview");
  if (aiBtn) {
    aiBtn.addEventListener("click", () => {
      state.aiStructuredPreviewOpen = !state.aiStructuredPreviewOpen;
      renderVaultScreen();
    });
  }

  const expBtn = root.querySelector("#btn-generate-export");
  if (expBtn) {
    expBtn.addEventListener("click", () => {
      state.continuityExportJson = JSON.stringify(
        {
          protocol: "SIGNAL_CONTINUITY_EXPORT_V4",
          exportedAt: new Date().toISOString(),
          dossierId: dossier.dossierId,
          entryCount: dossier.timelineEntries.length,
          entries: dossier.timelineEntries
        },
        null,
        2
      );
      renderVaultScreen();
    });
  }

  const gotoBridgeBtn = root.querySelector("[data-goto-bridge-from-vault]");
  if (gotoBridgeBtn) {
    gotoBridgeBtn.addEventListener("click", () => {
      renderBridgeScreen();
      switchScreen("screen-bridge");
    });
  }
}

function renderBridgeScreen() {
  const root = document.getElementById("bridge-dynamic-root");
  if (!root) return;

  const dossier = getActiveDossier();
  const selectedPartner =
    PARTNER_PASSPORTS.find((p) => p.organizationId === state.bridgeRecipientId) || PARTNER_PASSPORTS[0];

  root.innerHTML = `
    <div class="grid-2">
      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>Stap 1 — Selecteer welke tijdlijnitems je wilt overdragen</h3>
          <p style="font-size:0.88rem;">
            Actief dossier: <strong>${state.invisibleMode ? dossier.neutralPersonaName : dossier.personaName}</strong>.
            Items die je níét aanvinkt, blijven uitsluitend in je eigen kluis.
          </p>
          ${dossier.timelineEntries
            .map((e) => {
              const checked = state.bridgeSelectedEntries.includes(e.entryId);
              return `
                <label class="choice-card ${checked ? "selected" : ""}" style="display:flex; gap:0.75rem; align-items:flex-start;">
                  <input type="checkbox" data-bridge-entry="${e.entryId}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
                  <div>
                    <div class="choice-card-title">${e.title} <span class="badge">${e.incidentDateOrPeriod}</span></div>
                    <p class="choice-card-desc">${e.rawUserNarrative}</p>
                  </div>
                </label>
              `;
            })
            .join("")}
        </div>

        <div class="panel">
          <h3>Stap 2 — Kies de ontvangende Belgische partnerorganisatie</h3>
          <div class="form-group">
            <label class="form-label" for="bridge-partner-select">Bevoegde partnerorganisatie (met geverifieerd Trust Passport)</label>
            <select class="form-select" id="bridge-partner-select">
              ${PARTNER_PASSPORTS.map(
                (p) =>
                  `<option value="${p.organizationId}" ${p.organizationId === selectedPartner.organizationId ? "selected" : ""}>${p.name}</option>`
              ).join("")}
            </select>
          </div>

          <div class="panel-soft" style="margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
              <strong style="color:var(--deep-trust);">SIGNAL Trust Passport: ${selectedPartner.shortName}</strong>
              <span class="badge badge-trust">${selectedPartner.badgeText}</span>
            </div>
            <p style="font-size:0.86rem; margin:0.4rem 0;"><strong>Verwerkingsverantwoordelijke:</strong> ${selectedPartner.confidentialityRegime.dataControllerName}</p>
            <p style="font-size:0.86rem; margin:0.2rem 0;"><strong>Wettelijke geheimhouding:</strong> ${selectedPartner.confidentialityRegime.secrecyArticle}</p>
            <p style="font-size:0.86rem; margin:0.2rem 0;"><strong>Onafhankelijk toezicht:</strong> ${selectedPartner.independentOversightBody}</p>
            <p style="font-size:0.84rem; margin:0.4rem 0 0 0; color:var(--ink-secondary);">${selectedPartner.confidentialityRegime.retentionPolicySummary}</p>
          </div>

          <div class="form-group">
            <label class="form-label" for="bridge-disclosure-select">Niveau van bekendmaking bij deze overdracht</label>
            <select class="form-select" id="bridge-disclosure-select">
              <option value="anonymous_consultation" ${state.bridgeDisclosureLevel === "anonymous_consultation" ? "selected" : ""}>Oriënterend advies (zonder naam/contactgegevens)</option>
              <option value="pseudonymous_bridge" ${state.bridgeDisclosureLevel === "pseudonymous_bridge" ? "selected" : ""}>Pseudonieme overdracht (contact enkel via beveiligde SIGNAL inbox / Bridge Token)</option>
              <option value="named_handover" ${state.bridgeDisclosureLevel === "named_handover" ? "selected" : ""}>Volledige overdracht op naam voor persoonlijke intake</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>Stap 3 — Bewuste toestemming & verwachtingsmanagement</h3>
          <p style="font-size:0.88rem;">Voordat SIGNAL het geselecteerde pakket versleutelt voor <strong>${selectedPartner.shortName}</strong>, bevestig je onderstaande twee punten:</p>

          <label style="display:flex; gap:0.65rem; align-items:flex-start; margin-bottom:0.85rem; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="bridge-check-not-police" ${state.bridgeConsentNotPolice ? "checked" : ""} style="margin-top:0.25rem;" />
            <span>Ik begrijp dat deze overdracht naar <strong>${selectedPartner.shortName}</strong> géén automatisch proces-verbaal bij de politie is, maar een vertrouwelijke overdracht binnen de wettelijke opdracht van deze organisatie.</span>
          </label>

          <label style="display:flex; gap:0.65rem; align-items:flex-start; margin-bottom:1rem; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="bridge-check-art17" ${state.bridgeConsentRevocability ? "checked" : ""} style="margin-top:0.25rem;" />
            <span>Ik begrijp dat mijn eigen Private Vault altijd door mij wisbaar blijft, en dat het overgedragen pakket na verzending valt onder het beroepsgeheim en de wettelijke bewaarplicht van de ontvangende organisatie (art. 17 lid 3 AVG).</span>
          </label>

          <button type="button" class="btn btn-primary" id="btn-execute-bridge">
            Versleutel & draag ${state.bridgeSelectedEntries.length} geselecteerd(e) item(s) over via SIGNAL Bridge
          </button>
        </div>

        ${
          state.lastCreatedBridgePackage
            ? `
          <div class="panel-soft" style="border-color:var(--deep-trust);">
            <span class="badge badge-trust" style="margin-bottom:0.4rem;">Ontvangstbevestiging & Fysieke Overdrachtscode</span>
            <h3>SIGNAL Bridge Pakket Gereed: ${state.lastCreatedBridgePackage.handoverId}</h3>
            <p style="font-size:0.9rem;">
              Jouw geselecteerde dossieronderdelen zijn versleuteld klaargezet voor <strong>${state.lastCreatedBridgePackage.recipientOrganization.name}</strong>.
              Je hoeft je verhaal tijdens het gesprek niet vanaf nul te herhalen.
            </p>
            <div class="hash-box" style="background:#ffffff; font-size:0.85rem;">
              <strong>Fysieke / Telefonische Afspraakcode (Bridge Token):</strong> ${state.lastCreatedBridgePackage.bridgePhysicalToken}<br/>
              <strong>Gedeelde items:</strong> ${state.lastCreatedBridgePackage.includedEntryCount} (${state.lastCreatedBridgePackage.includedEntryIds.join(", ")})<br/>
              <strong>Privé gehouden items in jouw kluis:</strong> ${state.lastCreatedBridgePackage.excludedPrivateEntryCount}<br/>
              <strong>Geheimhoudingsregime:</strong> ${state.lastCreatedBridgePackage.recipientOrganization.secrecyRegime}
            </div>
            <div style="margin-top:0.9rem; display:flex; gap:0.6rem; flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" data-goto-aftercare="true">Bekijk Mijn Vervolgstappen & SIGNAL Aftercare</button>
              <button type="button" class="btn" data-goto-workspace="true">Inspecteer als Behandelaar in Professional Workspace</button>
            </div>
          </div>
        `
            : `
          <div class="panel-caution">
            <strong>Waarom SIGNAL Bridge zo belangrijk is:</strong> Slachtoffers en melders haken vaak af omdat ze hun verhaal vier keer opnieuw moeten vertellen aan verschillende loketten. Met SIGNAL Bridge houd jij de regie over wát je deelt en met wíe.
          </div>
        `
        }
      </div>
    </div>
  `;

  root.querySelectorAll("[data-bridge-entry]").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = cb.dataset.bridgeEntry;
      if (e.target.checked) {
        if (!state.bridgeSelectedEntries.includes(id)) state.bridgeSelectedEntries.push(id);
      } else {
        state.bridgeSelectedEntries = state.bridgeSelectedEntries.filter((x) => x !== id);
      }
      renderBridgeScreen();
    });
  });

  const partnerSel = root.querySelector("#bridge-partner-select");
  if (partnerSel) {
    partnerSel.addEventListener("change", (e) => {
      state.bridgeRecipientId = e.target.value;
      renderBridgeScreen();
    });
  }

  const discSel = root.querySelector("#bridge-disclosure-select");
  if (discSel) {
    discSel.addEventListener("change", (e) => {
      state.bridgeDisclosureLevel = e.target.value;
    });
  }

  const c1 = root.querySelector("#bridge-check-not-police");
  if (c1) c1.addEventListener("change", (e) => (state.bridgeConsentNotPolice = e.target.checked));

  const c2 = root.querySelector("#bridge-check-art17");
  if (c2) c2.addEventListener("change", (e) => (state.bridgeConsentRevocability = e.target.checked));

  const execBtn = root.querySelector("#btn-execute-bridge");
  if (execBtn) {
    execBtn.addEventListener("click", () => {
      try {
        const pkg = buildBridgeHandoverPackage({
          dossierId: dossier.dossierId,
          timelineEntries: dossier.timelineEntries,
          selectedEntryIds: state.bridgeSelectedEntries,
          recipientOrganizationId: state.bridgeRecipientId,
          disclosureLevel: state.bridgeDisclosureLevel,
          userExpectationGoal: state.bridgeGoal,
          understandsNotAutomaticPoliceReport: state.bridgeConsentNotPolice,
          revocabilityScopeExplained: state.bridgeConsentRevocability
        });
        state.lastCreatedBridgePackage = pkg;
        state.wsPartnerOrg = state.bridgeRecipientId;
        state.wsAuditLog.unshift({
          time: new Date().toISOString().slice(0, 19).replace("T", " "),
          actor: "Melder via SIGNAL Bridge",
          action: `Overdrachtspakket ${pkg.handoverId} (${pkg.includedEntryCount} items) geadresseerd aan ${pkg.recipientOrganization.name}`,
          result: "ENCRYPTED & DELIVERED"
        });
        renderBridgeScreen();
        renderWorkspaceScreen();
      } catch (err) {
        window.alert(err.message);
      }
    });
  }

  const afterBtn = root.querySelector("[data-goto-aftercare]");
  if (afterBtn) afterBtn.addEventListener("click", () => switchScreen("screen-aftercare"));

  const wsBtn = root.querySelector("[data-goto-workspace]");
  if (wsBtn) wsBtn.addEventListener("click", () => switchScreen("screen-workspace"));
}

function renderNetworkScreen() {
  const root = document.getElementById("network-dynamic-root");
  if (!root) return;

  root.innerHTML = `
    <div class="grid-3" style="margin-bottom:1.5rem;">
      <div class="panel-soft">
        <h3>1. Digitaal (SIGNAL Web & Bridge)</h3>
        <p style="font-size:0.88rem; margin:0;">Oriënteren zonder account (SIGNAL Zero), versleutelde tijdlijn en gecontroleerde digitale overdracht naar erkende Belgische partners.</p>
      </div>
      <div class="panel-soft">
        <h3>2. Telefonisch (Warme Doorverwijzing)</h3>
        <p style="font-size:0.88rem; margin:0;">Directe doorverwijzing naar gratis professionele hulplijnen zoals <strong>1712</strong>, <strong>0800 20 808</strong> (Vlaams Meldpunt) en <strong>0800 12 800</strong> (Unia), zonder dat SIGNAL zelf een callcenter simuleert.</p>
      </div>
      <div class="panel-soft">
        <h3>3. Fysiek (Met Bridge Token)</h3>
        <p style="font-size:0.88rem; margin:0;">Neem je afdrukbare overzicht of <strong>Bridge Token</strong> mee naar een fysiek gesprek bij een Zorgcentrum na Seksueel Geweld (ZSG), CAW of advocaat.</p>
      </div>
    </div>

    <div class="grid-2">
      ${PARTNER_PASSPORTS.map(
        (p) => `
        <div class="panel">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.5rem;">
            <h3 style="margin:0;">${p.name}</h3>
            <span class="badge badge-trust">${p.badgeText}</span>
          </div>
          <p style="font-size:0.88rem;">${p.legalBasisSummary}</p>
          <table class="data-table" style="font-size:0.82rem; margin-bottom:0.85rem;">
            <tbody>
              <tr>
                <th>Bevoegdheid</th>
                <td>${p.jurisdiction}</td>
              </tr>
              <tr>
                <th>Geheimhouding</th>
                <td>${p.confidentialityRegime.secrecyArticle}</td>
              </tr>
              <tr>
                <th>Verwerkingsverantwoordelijke</th>
                <td>${p.confidentialityRegime.dataControllerName}</td>
              </tr>
              <tr>
                <th>Onafhankelijk toezicht</th>
                <td>${p.independentOversightBody}</td>
              </tr>
              <tr>
                <th>Bereikbaarheid</th>
                <td><strong>${p.accessChannels.phoneNumber}</strong> · ${p.accessChannels.hours}</td>
              </tr>
              <tr>
                <th>Laatste verificatie</th>
                <td>${p.lastAuditedAt} (DPO & Bevoegdheid gecontroleerd)</td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-primary" data-partner-bridge="${p.organizationId}">
            Kies deze partner in SIGNAL Bridge
          </button>
        </div>
      `
      ).join("")}
    </div>
  `;

  root.querySelectorAll("[data-partner-bridge]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.bridgeRecipientId = btn.dataset.partnerBridge;
      renderBridgeScreen();
      switchScreen("screen-bridge");
    });
  });
}

function renderHandshakeScreen() {
  const root = document.getElementById("handshake-dynamic-root");
  if (!root) return;

  const evalHs = evaluateHandshakeSafety({
    mvpPhase: state.hsPhase,
    legalBasisApproved: state.hsLegalApproved,
    reviewerOneApproved: state.hsReviewer1,
    reviewerTwoApproved: state.hsReviewer2,
    isHearsayOrCopycat: state.hsHearsayFlag,
    possibleNamesakeRisk: state.hsNamesakeFlag,
    reporterOneIndividualConsent: state.hsReporter1Consent,
    reporterTwoIndividualConsent: state.hsReporter2Consent
  });

  root.innerHTML = `
    <div class="panel-caution" style="margin-bottom:1.25rem;">
      <strong>Educatieve Simulatie (ADR-002):</strong> In de eerste release (MVP Fase 1 & 2) is de matchingmodule technisch uitgeschakeld. Deze interactieve simulator laat juristen, toezichthouders en partners exact testen hoe <strong>SIGNAL Handshake</strong> en <strong>SIGNAL Fairness</strong> in Fase 3 werken — en waarom automatische match-meldingen of groepschats altijd geblokkeerd blijven.
    </div>

    <div class="grid-2">
      <div class="panel">
        <h3>Stel de voorwaarden en controles in (Test de Waarborgen)</h3>
        <div class="form-group">
          <label class="form-label" for="hs-phase-select">Projectfase & Wettelijke Status (Art. 9/10 AVG)</label>
          <select class="form-select" id="hs-phase-select">
            <option value="1" ${state.hsPhase === 1 ? "selected" : ""}>Fase 1 / Fase 2 MVP — Matching technisch uitgeschakeld (Standaard)</option>
            <option value="3" ${state.hsPhase === 3 ? "selected" : ""}>Fase 3 — Wettelijk toegelaten partnerdomein na goedgekeurde DPIA</option>
          </select>
        </div>

        <div style="padding:0.75rem 0; border-top:1px solid var(--border-subtle);">
          <strong style="color:var(--deep-trust); display:block; margin-bottom:0.5rem;">1. SIGNAL Fairness — Bescherming tegen valse matches & misbruik</strong>
          <label style="display:flex; gap:0.6rem; align-items:center; margin-bottom:0.45rem; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-hearsay-cb" ${state.hsHearsayFlag ? "checked" : ""} />
            <span>Simuleer: Eén van de meldingen is een gerucht ("van horen zeggen") of gekopieerd verhaal</span>
          </label>
          <label style="display:flex; gap:0.6rem; align-items:center; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-namesake-cb" ${state.hsNamesakeFlag ? "checked" : ""} />
            <span>Simuleer: Risico op naamgenoot / onvoldoende unieke organisatiecontext</span>
          </label>
        </div>

        <div style="padding:0.75rem 0; border-top:1px solid var(--border-subtle);">
          <strong style="color:var(--deep-trust); display:block; margin-bottom:0.5rem;">2. Verplichte Menselijke Vierogencontrole (Reviewteam)</strong>
          <label style="display:flex; gap:0.6rem; align-items:center; margin-bottom:0.45rem; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-rev1-cb" ${state.hsReviewer1 ? "checked" : ""} />
            <span>Gemachtigde Beoordelaar 1 (Jurist / Behandelaar) bevestigt rechtmatigheid</span>
          </label>
          <label style="display:flex; gap:0.6rem; align-items:center; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-rev2-cb" ${state.hsReviewer2 ? "checked" : ""} />
            <span>Gemachtigde Beoordelaar 2 (Onafhankelijke Vierogencontrole) bevestigt</span>
          </label>
        </div>

        <div style="padding:0.75rem 0; border-top:1px solid var(--border-subtle);">
          <strong style="color:var(--deep-trust); display:block; margin-bottom:0.5rem;">3. Afzonderlijke Begeleiding & Vrijwillige Coördinatie (SIGNAL Handshake)</strong>
          <label style="display:flex; gap:0.6rem; align-items:center; margin-bottom:0.45rem; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-rep1-cb" ${state.hsReporter1Consent ? "checked" : ""} />
            <span>Melder A stemt na individueel gesprek vrijwillig in met overdracht naar coördinerend advocaat</span>
          </label>
          <label style="display:flex; gap:0.6rem; align-items:center; font-size:0.88rem; cursor:pointer;">
            <input type="checkbox" id="hs-rep2-cb" ${state.hsReporter2Consent ? "checked" : ""} />
            <span>Melder B stemt na individueel gesprek vrijwillig in met overdracht naar coördinerend advocaat</span>
          </label>
        </div>
      </div>

      <div>
        <div class="panel" style="border-color:var(--deep-trust); margin-bottom:1.25rem;">
          <span class="badge ${evalHs.canProceedToHandshake ? "badge-trust" : "badge-caution"}" style="margin-bottom:0.5rem;">
            Systeemstatus: ${evalHs.status}
          </span>
          <h3>Resultaat van de Veiligheids- & Rechtmatigheidstoets</h3>
          <p style="font-size:0.94rem; color:var(--ink-primary);">${evalHs.reason}</p>

          <table class="data-table" style="font-size:0.85rem; margin-top:1rem;">
            <tbody>
              <tr>
                <th>Automatische "Er is een match!"-notificatie naar melders?</th>
                <td><span class="badge badge-trust">ALTIJD UIT (${evalHs.automatedNotificationSentToReporters})</span></td>
              </tr>
              <tr>
                <th>Publieke teller of beschuldigingsregister bijgewerkt?</th>
                <td><span class="badge badge-trust">VERBODEN (${evalHs.publicAccusationCounterIncremented})</span></td>
              </tr>
              <tr>
                <th>AI-geloofwaardigheidsscore gebruikt?</th>
                <td><span class="badge badge-trust">VERBODEN (${evalHs.aiCredibilityScoreUsed})</span></td>
              </tr>
              <tr>
                <th>Individuele begeleiding (SIGNAL Handshake) toegestaan?</th>
                <td><strong>${evalHs.canProceedToHandshake ? "JA — Afzonderlijk door vertrouwenspersoon" : "NEE — Geblokkeerd door veiligheidspoort"}</strong></td>
              </tr>
              <tr>
                <th>Gezamenlijke juridische opvolging (SIGNAL Collective)?</th>
                <td><strong>${evalHs.canProceedToCollective ? "JA — Via gemachtigde advocaat (zonder groepschat)" : "NEE — Wacht op individueel akkoord van beide melders"}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel-soft">
          <h3>Waarom verbiedt SIGNAL groepschats tussen melders?</h3>
          <p style="font-size:0.88rem; margin:0;">
            Wanneer twee slachtoffers elkaars getuigenis lezen voordat zij bij politie of justitie zijn gehoord, kan een verdedigingsadvocaat aanvoeren dat hun herinneringen elkaar hebben beïnvloed (<em>geheugenbesmetting</em>). Door getuigenissen strikt gescheiden te houden en coördinatie uitsluitend via een advocaat of bevoegde onderzoeksinstantie te laten verlopen, blijft de juridische bewijskracht van elk afzonderlijk verhaal maximaal beschermd.
          </p>
        </div>
      </div>
    </div>
  `;

  const phaseSel = root.querySelector("#hs-phase-select");
  if (phaseSel) {
    phaseSel.addEventListener("change", (e) => {
      state.hsPhase = Number(e.target.value);
      state.hsLegalApproved = state.hsPhase === 3;
      renderHandshakeScreen();
    });
  }

  const bindCheck = (sel, key) => {
    const el = root.querySelector(sel);
    if (el) {
      el.addEventListener("change", (e) => {
        state[key] = e.target.checked;
        renderHandshakeScreen();
      });
    }
  };

  bindCheck("#hs-hearsay-cb", "hsHearsayFlag");
  bindCheck("#hs-namesake-cb", "hsNamesakeFlag");
  bindCheck("#hs-rev1-cb", "hsReviewer1");
  bindCheck("#hs-rev2-cb", "hsReviewer2");
  bindCheck("#hs-rep1-cb", "hsReporter1Consent");
  bindCheck("#hs-rep2-cb", "hsReporter2Consent");
}

function renderWorkspaceScreen() {
  const root = document.getElementById("workspace-dynamic-root");
  if (!root) return;

  const bridgedTarget = state.lastCreatedBridgePackage
    ? state.lastCreatedBridgePackage.recipientOrganization.organizationId
    : "org-vlaams-meldpunt";

  const authCheck = checkDossierAccessAuthorization({
    actorRole: state.wsSelectedActor,
    actorOrganizationId: state.wsPartnerOrg,
    bridgedToOrganizationId: bridgedTarget
  });

  root.innerHTML = `
    <div class="grid-2">
      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>Test de Gouden Architectuurregel (Wie kan een dossier lezen?)</h3>
          <p style="font-size:0.88rem;">
            De belangrijkste architectuurregel van SIGNAL luidt: <strong>een gewone platformbeheerder of externe financier mag nooit inhoudelijke toegang hebben tot alle meldingen.</strong> Kies hieronder een rol en test de toegangscontrole:
          </p>

          <div class="form-group">
            <label class="form-label" for="ws-actor-select">Kies de rol die toegang probeert te krijgen</label>
            <select class="form-select" id="ws-actor-select">
              <option value="partner_caseworker" ${state.wsSelectedActor === "partner_caseworker" ? "selected" : ""}>Gemachtigde Behandelaar bij Partnerorganisatie (Hardware MFA)</option>
              <option value="vault_owner" ${state.wsSelectedActor === "vault_owner" ? "selected" : ""}>De Melder zelf (Eigenaar van de Private Vault)</option>
              <option value="platform_sysadmin" ${state.wsSelectedActor === "platform_sysadmin" ? "selected" : ""}>SIGNAL Platform- / Databasebeheerder (SysAdmin)</option>
              <option value="sponsor_or_b2b_client" ${state.wsSelectedActor === "sponsor_or_b2b_client" ? "selected" : ""}>Betalende Werkgever / Klant van SIGNAL Institutional / Sponsor</option>
            </select>
          </div>

          ${
            state.wsSelectedActor === "partner_caseworker"
              ? `
            <div class="form-group">
              <label class="form-label" for="ws-org-select">Organisatie van de ingelogde behandelaar</label>
              <select class="form-select" id="ws-org-select">
                ${PARTNER_PASSPORTS.map(
                  (p) =>
                    `<option value="${p.organizationId}" ${p.organizationId === state.wsPartnerOrg ? "selected" : ""}>${p.shortName}</option>`
                ).join("")}
              </select>
            </div>
          `
              : ""
          }

          <div class="${authCheck.allowed ? "panel-soft" : "panel-urgent"}" style="margin-top:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>Toegangsbeslissing: ${authCheck.allowed ? "TOEGESTAAN (Binnen strikte scope)" : "GEWEIGERD & GELOGD"}</strong>
              <span class="badge ${authCheck.allowed ? "badge-trust" : "badge-urgent"}">Scope: ${authCheck.scope}</span>
            </div>
            <p style="margin:0.4rem 0 0 0; font-size:0.9rem; color:var(--ink-primary);">${authCheck.reason}</p>
          </div>
        </div>

        <div class="panel">
          <h3>Wat deze rol daadwerkelijk te zien krijgt</h3>
          ${
            authCheck.allowed
              ? `
            <div class="panel-soft">
              <strong>Ontsleuteld weergavebereik (${authCheck.scope}):</strong>
              <p style="font-size:0.88rem; margin:0.4rem 0;">
                ${
                  authCheck.scope === "full_private_vault"
                    ? "Volledige persoonlijke tijdlijn zichtbaar voor de eigenaar van de kluis."
                    : `Alleen de door de melder geselecteerde items in het SIGNAL Bridge-pakket voor ${bridgedTarget} zijn ontsleuteld. Niet-geselecteerde kluisnotities zijn cryptografisch onbereikbaar.`
                }
              </p>
            </div>
          `
              : `
            <div class="hash-box" style="color:var(--urgent-ink);">
              [CRYPTOGRAPHIC ACCESS DENIED]<br/>
              KMS Key Domain B (Vault) & Partner Key Envelopes weigeren ontsleuteling voor rol '${state.wsSelectedActor}'.<br/>
              Audit Event: ${authCheck.auditAlert || "UNAUTHORIZED_ROLE"}
            </div>
          `
          }
        </div>
      </div>

      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>Onwijzigbaar Audit Logboek (Zero-PII Telemetry)</h3>
          <p style="font-size:0.86rem;">Elke toegangspoging wordt vastgelegd zonder dat er ooit namen of inhoudelijke getuigenissen in de systeemlogs terechtkomen:</p>
          <table class="data-table" style="font-size:0.82rem;">
            <thead>
              <tr>
                <th>Tijdstip</th>
                <th>Actor</th>
                <th>Actie</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${state.wsAuditLog
                .slice(0, 6)
                .map(
                  (log) => `
                <tr>
                  <td>${log.time}</td>
                  <td><strong>${log.actor}</strong></td>
                  <td>${log.action}</td>
                  <td><span class="badge ${log.result.startsWith("BLOCKED") ? "badge-urgent" : "badge-trust"}">${log.result}</span></td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h3>Confidential Messaging (Asynchroon & Zonder Gevoelige E-mailtitels)</h3>
          <p style="font-size:0.86rem;">
            Een gemachtigde behandelaar kan via de beveiligde berichtenbox vragen stellen aan de melder (ook bij een pseudonieme overdracht), zonder dat er een verraderlijke e-mail met gevoelige tekst op het toestel van de melder verschijnt.
          </p>
          <div class="panel-soft" style="font-size:0.86rem;">
            <strong>Voorbeeldbericht van Behandelaar (${bridgedTarget}):</strong><br/>
            <em>"Wij hebben jouw SIGNAL Bridge-pakket goed ontvangen. We ondernemen geen enkele stap richting de genoemde organisatie zonder jouw toestemming. Wil je deze week telefonisch of fysiek de opties overlopen?"</em>
          </div>
        </div>
      </div>
    </div>
  `;

  const actorSel = root.querySelector("#ws-actor-select");
  if (actorSel) {
    actorSel.addEventListener("change", (e) => {
      state.wsSelectedActor = e.target.value;
      const check = checkDossierAccessAuthorization({
        actorRole: state.wsSelectedActor,
        actorOrganizationId: state.wsPartnerOrg,
        bridgedToOrganizationId: bridgedTarget
      });
      state.wsAuditLog.unshift({
        time: new Date().toISOString().slice(0, 19).replace("T", " "),
        actor: state.wsSelectedActor,
        action: `Toegangscontrole op dossierpakket (${bridgedTarget})`,
        result: check.allowed ? `ALLOWED (${check.scope})` : `BLOCKED (${check.auditAlert})`
      });
      renderWorkspaceScreen();
    });
  }

  const orgSel = root.querySelector("#ws-org-select");
  if (orgSel) {
    orgSel.addEventListener("change", (e) => {
      state.wsPartnerOrg = e.target.value;
      renderWorkspaceScreen();
    });
  }
}

function renderTrustScreen() {
  const root = document.getElementById("trust-dynamic-root");
  if (!root) return;

  root.innerHTML = `
    <div class="grid-2" style="margin-bottom:1.5rem;">
      <div class="panel">
        <h3>De 7 Verboden Anti-Features (Wat we absoluut NIET bouwen)</h3>
        <p style="font-size:0.88rem;">Deze rode lijnen beschermen zowel slachtoffers als beschuldigden tegen een digitaal schandblok:</p>
        ${FORBIDDEN_ANTI_FEATURES.map(
          (f) => `
          <div style="padding:0.65rem 0; border-bottom:1px solid var(--border-subtle);">
            <strong style="color:var(--urgent-ink); font-size:0.92rem;">✕ ${f.title}</strong>
            <p style="margin:0.2rem 0; font-size:0.84rem;"><strong>Waarom verboden:</strong> ${f.reason}</p>
            <p style="margin:0; font-size:0.84rem; color:var(--deep-trust);"><strong>SIGNAL-alternatief:</strong> ${f.signalAlternative}</p>
          </div>
        `
        ).join("")}
      </div>

      <div>
        <div class="panel" style="margin-bottom:1.25rem;">
          <h3>De 8 Statutaire Onafhankelijkheidsregels (Belgische VZW / Stichting)</h3>
          <ol style="margin:0; padding-left:1.2rem; font-size:0.88rem; color:var(--ink-secondary);">
            <li style="margin-bottom:0.4rem;"><strong>Geen verkoop van data:</strong> Persoonsgegevens of meldingen worden nooit commercieel geëxploiteerd.</li>
            <li style="margin-bottom:0.4rem;"><strong>Geen advertenties of tracking:</strong> Geen gedragsgerichte reclame of commerciële pixels.</li>
            <li style="margin-bottom:0.4rem;"><strong>Geen betaalde doofpot:</strong> Geen enkele organisatie kan betalen om meldingen te verbergen of te verwijderen.</li>
            <li style="margin-bottom:0.4rem;"><strong>Geen inzage door financiers (ADR-004):</strong> Strikte muur tussen publieke <em>SIGNAL Care</em> en zakelijke <em>SIGNAL Institutional</em>.</li>
            <li style="margin-bottom:0.4rem;"><strong>Openbaar jaarverslag:</strong> Jaarlijkse verantwoording met k-anonieme maatschappelijke cijfers.</li>
            <li style="margin-bottom:0.4rem;"><strong>Jaarlijkse externe security- & governance-audit:</strong> Openbare samenvatting van de bevindingen.</li>
            <li style="margin-bottom:0.4rem;"><strong>Strikte belangenconflictregels:</strong> Verplichte onthouding bij betrokkenheid van eigen netwerk.</li>
            <li><strong>Verplicht SIGNAL Continuity noodplan:</strong> Geoormerkte reserve en gegarandeerde exportmogelijkheid.</li>
          </ol>
        </div>

        <div class="panel-soft">
          <h3>SIGNAL Pulse — Ethische Impact-KPI's (Geen jacht op aantallen klachten)</h3>
          <p style="font-size:0.86rem;">Wij meten succes nooit aan het aantal beschuldigingen, maar aan veilige en tijdige hulp:</p>
          <div class="grid-2" style="gap:0.75rem;">
            <div class="panel" style="padding:0.85rem;">
              <strong style="color:var(--deep-trust);">Successful Routing Rate</strong>
              <p style="font-size:0.8rem; margin:0.2rem 0 0 0;">Vindt de gebruiker binnen één sessie de juiste bevoegde Belgische instantie?</p>
            </div>
            <div class="panel" style="padding:0.85rem;">
              <strong style="color:var(--deep-trust);">Time to Guidance</strong>
              <p style="font-size:0.8rem; margin:0.2rem 0 0 0;">Hoeveel sneller krijgt iemand passende steun of sporenbehoud (ZSG)?</p>
            </div>
            <div class="panel" style="padding:0.85rem;">
              <strong style="color:var(--deep-trust);">Consent Comprehension</strong>
              <p style="font-size:0.8rem; margin:0.2rem 0 0 0;">Begrijpt 95%+ exact wat een stap juridisch wél en níét doet?</p>
            </div>
            <div class="panel" style="padding:0.85rem;">
              <strong style="color:var(--deep-trust);">Partner Follow-through</strong>
              <p style="font-size:0.8rem; margin:0.2rem 0 0 0;">Bruikbare warme overdracht zonder het verhaal opnieuw te moeten vertellen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleInvisibleMode() {
  state.invisibleMode = !state.invisibleMode;
  document.body.classList.toggle("invisible-mode", state.invisibleMode);
  const btn = document.getElementById("btn-toggle-invisible");
  if (btn) {
    btn.classList.toggle("active-toggle", state.invisibleMode);
    btn.textContent = state.invisibleMode
      ? "SIGNAL Invisible: AAN (Discreet)"
      : "SIGNAL Invisible (Discrete weergave)";
  }
  const brandSub = document.getElementById("brand-subtitle-text");
  if (brandSub) {
    brandSub.textContent = state.invisibleMode
      ? "Persoonlijke administratie- en oriëntatiewerkruimte"
      : "The Independent Trust Infrastructure · Jouw verhaal. Jouw keuze.";
  }
  renderCompassScreen();
  renderVaultScreen();
  renderBridgeScreen();
}

function triggerSafeExitModal() {
  // Reset local demo mutations immediately
  state.dossiers = structuredClone(INITIAL_DOSSIERS);
  state.lastCreatedBridgePackage = null;
  state.continuityExportJson = null;
  const modal = document.getElementById("safe-exit-modal");
  if (modal) modal.classList.add("open");
}

function updateTourUI() {
  const bar = document.getElementById("tour-bar");
  if (!bar) return;
  if (!state.tourActive) {
    bar.style.display = "none";
    return;
  }
  bar.style.display = "block";
  const step = TOUR_STEPS[state.tourIndex];
  document.getElementById("tour-title").textContent = step.title;
  document.getElementById("tour-desc").textContent = step.text;
  switchScreen(step.screen);
}

export function initSignalApp() {
  // Navigation tabs
  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.screen));
  });

  // Quick screen jump buttons on Home & Aftercare
  document.querySelectorAll("[data-nav-target]").forEach((btn) => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.navTarget));
  });

  // Topbar actions
  const invBtn = document.getElementById("btn-toggle-invisible");
  if (invBtn) invBtn.addEventListener("click", toggleInvisibleMode);

  const emBtn = document.getElementById("btn-toggle-emergency");
  const emDrawer = document.getElementById("emergency-drawer");
  if (emBtn && emDrawer) {
    emBtn.addEventListener("click", () => {
      state.emergencyOpen = !state.emergencyOpen;
      emDrawer.style.display = state.emergencyOpen ? "block" : "none";
      btn.classList.toggle("active-toggle", state.emergencyOpen);
    });
  }

  const exitBtn = document.getElementById("btn-safe-exit");
  if (exitBtn) exitBtn.addEventListener("click", triggerSafeExitModal);

  const closeExitModal = document.getElementById("btn-close-safe-exit");
  if (closeExitModal) {
    closeExitModal.addEventListener("click", () => {
      document.getElementById("safe-exit-modal").classList.remove("open");
      switchScreen("screen-home");
      renderVaultScreen();
      renderBridgeScreen();
    });
  }

  // Tour controls
  const startTourBtn = document.getElementById("btn-start-tour");
  if (startTourBtn) {
    startTourBtn.addEventListener("click", () => {
      state.tourActive = true;
      state.tourIndex = 0;
      updateTourUI();
    });
  }

  const prevTour = document.getElementById("btn-tour-prev");
  if (prevTour) {
    prevTour.addEventListener("click", () => {
      state.tourIndex = (state.tourIndex - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
      updateTourUI();
    });
  }

  const nextTour = document.getElementById("btn-tour-next");
  if (nextTour) {
    nextTour.addEventListener("click", () => {
      state.tourIndex = (state.tourIndex + 1) % TOUR_STEPS.length;
      updateTourUI();
    });
  }

  const stopTour = document.getElementById("btn-tour-stop");
  if (stopTour) {
    stopTour.addEventListener("click", () => {
      state.tourActive = false;
      updateTourUI();
    });
  }

  // Initial render of all dynamic screens
  renderCompassScreen();
  renderConsentScreen();
  renderVaultScreen();
  renderBridgeScreen();
  renderNetworkScreen();
  renderHandshakeScreen();
  renderWorkspaceScreen();
  renderTrustScreen();

  // Auto-start tour if ?tour in URL
  if (window.location.search.includes("tour")) {
    state.tourActive = true;
    state.tourIndex = 0;
    updateTourUI();
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", initSignalApp);
}
