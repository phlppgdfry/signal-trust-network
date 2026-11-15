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
    personaName: "Dossier #DEMO-024 — Stagiaire creatieve sector",
    neutralPersonaName: "Dossier A — Werkplek- en begeleidingscontext",
    roleType: "direct_reporter",
    categories: ["pesten-intimidatie-machtsmisbruik", "seksueel-grensoverschrijdend-gedrag"],
    summary:
      "Ervaart tijdens een stage herhaaldelijk grensoverschrijdende berichten laat op de avond en druk om buiten werktijd alleen af te spreken. Twijfelt tussen haar hogeschool en het Vlaams Meldpunt.",
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
          "Mijn voorganger waarschuwde me in mijn eerste week kort: 'Zorg dat je nooit als laatste op kantoor achterblft.' Ik twijfel of dat op maandag 7 of dinsdag 8 september was.",
        categories: ["pesten-intimidatie-machtsmisbruik"]
      }
    ]
  },
  {
    dossierId: "demo-dossier-02",
    personaName: "Dossier #DEMO-031 — Collega-getuige (SIGNAL Witness)",
    neutralPersonaName: "Dossier B — Collega-observatie (Witness)",
    roleType: "witness",
    categories: ["discriminatie", "pesten-intimidatie-machtsmisbruik"],
    summary:
      "Ziet als teamlid hoe een nieuwe collega structureel wordt buitengesloten van veiligheidsbriefings en vernederende opmerkingen over afkomst krijgt. Gebruikt SIGNAL Witness.",
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
    personaName: "Dossier #DEMO-045 — Klokkenluider subsidiefraude",
    neutralPersonaName: "Dossier C — Financiële naleving",
    roleType: "direct_reporter",
    categories: ["bedrijfsfraude-klokkenluiden"],
    summary:
      "Ontdekt dat urenstaten voor een publiek gesubsidieerd project systematisch worden aangepast. Gebruikt SIGNAL Reality Check en Bridge richting Federale Ombudsman / FIRM-IFDH.",
    timelineEntries: [
      {
        entryId: "tl-301",
        createdAt: "2026-11-02T14:20:00+01:00",
        incidentDateOrPeriod: "30 oktober 2026",
        entryType: "document_evidence",
        certainty: "exact",
        title: "Verschil tussen urenregistratie en ingediende subsidieclaim Q3",
        rawUserNarrative:
          "Export van het originele urenoverzicht voordat mij schriftelijk werd gevraagd 420 niet-gepresteerde uren toe te voegen aan het subsidiedossier.",
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
    page: "home",
    title: "Stap 1/6 — Rustig overzicht & 5 Niveaus van Safe Disclosure",
    text: "Bezoekers oriënteren zich zonder account (SIGNAL Zero) en zien direct de 3 pijlers: Vault, Compass en Bridge."
  },
  {
    page: "report",
    title: "Stap 2/6 — 3-Staps SIGNAL Compass & Reality Check",
    text: "Selecteer één of meer categorieën, je rol (melder, getuige, minderjarige) en bekijk direct welke Belgische organisaties bevoegd zijn."
  },
  {
    page: "help",
    title: "Stap 3/6 — Hulpkanalen & Geverifieerde Trust Passports",
    text: "Bekijk het beroepsgeheim, toezicht en de contactkanalen van 1712, ZSG, Vlaams Meldpunt, Unia en de Federale Ombudsman."
  },
  {
    page: "vault",
    title: "Stap 4/6 — Mijn Privékluis (SIGNAL Timeline, Memory & Continuity)",
    text: "Voeg een eigen notitie toe met SHA-256 hash of plaats een latere aanvulling zonder het origineel ooit te overschrijven."
  },
  {
    page: "bridge",
    title: "Stap 5/6 — SIGNAL Bridge (Warme overdracht met Bridge Token)",
    text: "Kies zelf welke items meegaan naar een partner, bevestig de juridische verwachtingen en ontvang een overdrachtscode."
  },
  {
    page: "cases",
    title: "Stap 6/6 — Gouden Architectuurregel & Fase 3 Handshake Simulator",
    text: "Test hoe zelfs een platformbeheerder of betalende werkgever geblokkeerd wordt en hoe Safe Matching (ADR-002) werkt."
  }
];

const PARTNER_URLS = {
  "org-1712": "https://www.1712.be/",
  "org-zsg": "https://www.zsg.belgium.be/",
  "org-vlaams-meldpunt": "https://www.vlaanderen.be/vlaams-meldpunt-grensoverschrijdend-gedrag",
  "org-unia": "https://www.unia.be/",
  "org-ombudsman-firm": "https://www.federalombudsman.be/",
  "org-meldpunt-concurrentie": "https://consumerconnect.be/"
};

const state = {
  activePage: "home",
  invisibleMode: false,
  emergencyOpen: false,
  tourActive: false,
  tourIndex: 0,
  // Compass wizard
  wizardStep: 0,
  compassNeed: "explore",
  compassRole: "direct_reporter",
  compassRecent72h: false,
  compassCategories: ["pesten-intimidatie-machtsmisbruik"],
  // Help filter
  helpFilter: "all",
  // Vault
  dossiers: structuredClone(INITIAL_DOSSIERS),
  activeDossierId: "demo-dossier-01",
  aiStructuredPreviewOpen: false,
  continuityExportJson: null,
  // Bridge
  bridgeSelectedEntries: ["tl-101", "tl-102"],
  bridgeRecipientId: "org-vlaams-meldpunt",
  bridgeDisclosureLevel: "pseudonymous_bridge",
  bridgeConsentNotPolice: true,
  bridgeConsentRevocability: true,
  lastCreatedBridgePackage: null,
  // Cases subtabs & simulators
  casesTab: "workspace",
  wsSelectedActor: "partner_caseworker",
  wsPartnerOrg: "org-vlaams-meldpunt",
  wsAuditLog: [
    {
      time: "2026-11-15 09:12:04",
      actor: "Melder (Vault Owner)",
      action: "Tijdlijnitem tl-102 + SHA-256 hash geregistreerd in KMS Domein B",
      result: "ALLOWED"
    },
    {
      time: "2026-11-15 09:18:22",
      actor: "SIGNAL Bridge Service",
      action: "Deelpakket (2 items) versleuteld voor Vlaams Meldpunt",
      result: "DELIVERED"
    },
    {
      time: "2026-11-15 09:24:10",
      actor: "Platform SysAdmin (Test)",
      action: "Poging tot lezen van ruwe Vault-tabel zonder gebruikerssleutel",
      result: "BLOCKED"
    }
  ],
  hsPhase: 3,
  hsLegalApproved: true,
  hsReviewer1: true,
  hsReviewer2: true,
  hsHearsayFlag: false,
  hsNamesakeFlag: false,
  hsReporter1Consent: false,
  hsReporter2Consent: false,
  // Trust subtabs & consent
  trustTab: "principles",
  consentMatrix: {
    localVault: true,
    evidenceHash: true,
    bridgeTransfer: false,
    patternCheckPhase3: false,
    anonymousPulseStats: false
  }
};

function getActiveDossier() {
  return state.dossiers.find((d) => d.dossierId === state.activeDossierId) || state.dossiers[0];
}

function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3200);
}

export function gotoPage(pageId) {
  state.activePage = pageId;
  document.querySelectorAll(".section").forEach((s) => s.classList.toggle("active", s.id === pageId));
  document.querySelectorAll("[data-page]").forEach((b) => b.classList.toggle("active", b.dataset.page === pageId));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (pageId === "report") renderWizard();
  if (pageId === "help") renderHelp();
  if (pageId === "vault") renderVault();
  if (pageId === "bridge") renderBridge();
  if (pageId === "cases") renderCases();
  if (pageId === "trust") renderTrust();
}

// 1. COMPASS WIZARD (3 stappen, uitgebreide versie van de eerste demo)
function renderWizard() {
  const stepNumEl = document.getElementById("stepnum");
  if (stepNumEl) stepNumEl.textContent = String(state.wizardStep + 1);
  document.querySelectorAll(".steps .step").forEach((el, i) => {
    el.classList.toggle("done", i <= state.wizardStep);
  });

  const w = document.getElementById("wizard");
  if (!w) return;

  if (state.wizardStep === 0) {
    w.innerHTML = `
      <h2 style="margin:0 0 6px; font-family:'Manrope',sans-serif;">Waar gaat het ongeveer over? (Meerdere keuzes mogelijk)</h2>
      <p class="sub" style="margin-bottom:14px;">Kies één of meer van de 8 Belgische domeinen. Niets wordt opgeslagen of verstuurd.</p>
      <div class="option-grid">
        ${SIGNAL_CATEGORIES.map((cat) => {
          const isSel = state.compassCategories.includes(cat.id);
          const title = state.invisibleMode ? cat.neutralLabel : cat.name;
          return `
            <button type="button" class="option ${isSel ? "selected" : ""}" data-wiz-cat="${cat.id}">
              <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
                <span>${title}</span>
                <span class="pill ${cat.wave === 3 ? "pill-caution" : ""}">Golf ${cat.wave}</span>
              </div>
              <small>${cat.examples}</small>
            </button>
          `;
        }).join("")}
      </div>
    `;
    w.querySelectorAll("[data-wiz-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cid = btn.dataset.wizCat;
        if (state.compassCategories.includes(cid)) {
          if (state.compassCategories.length > 1) {
            state.compassCategories = state.compassCategories.filter((x) => x !== cid);
          }
        } else {
          state.compassCategories = [...state.compassCategories, cid];
        }
        renderWizard();
      });
    });
  } else if (state.wizardStep === 1) {
    const needs = [
      ["explore", "Ik weet niet zeker of dit 'meldbaar' is", "Bekijk eerst rustig voorbeelden, definities en rechten."],
      ["document_privately", "Ik wil mijn verhaal ordenen in een tijdlijn", "Bekijk hoe eigen herinneringen en bewijsstukken werken."],
      ["talk_to_human", "Ik wil vertrouwelijk met iemand praten", "Vind direct een erkende hulplijn met beroepsgeheim."],
      ["prepare_official", "Ik wil een overdracht of formele stap voorbereiden", "Bereid een gecontroleerd SIGNAL Bridge-pakket voor."]
    ];
    const roles = [
      ["direct_reporter", "Ik heb dit zelf meegemaakt"],
      ["witness", "Ik ben getuige of collega (SIGNAL Witness)"],
      ["minor_guardian", "Het gaat om een minderjarige (SIGNAL Guardian)"],
      ["urgent_danger", "Er is mogelijk acuut fysiek gevaar"]
    ];
    w.innerHTML = `
      <h2 style="margin:0 0 6px; font-family:'Manrope',sans-serif;">Wat helpt je nu, en vanuit welke rol kijk je?</h2>
      <p class="sub" style="margin-bottom:12px;">Jouw antwoord bepaalt deterministisch (zonder AI) welke bescherming en partners we tonen.</p>
      <div class="option-grid">
        ${needs
          .map(
            (n) => `
          <button type="button" class="option ${state.compassNeed === n[0] ? "selected" : ""}" data-wiz-need="${n[0]}">
            ${n[1]}<small>${n[2]}</small>
          </button>
        `
          )
          .join("")}
      </div>
      <label class="field-label">Vanuit welke rol zoek je informatie?</label>
      <div class="option-grid">
        ${roles
          .map(
            (r) => `
          <button type="button" class="option ${state.compassRole === r[0] ? "selected" : ""}" data-wiz-role="${r[0]}" style="min-height:auto; padding:13px 16px;">
            ${r[1]}
          </button>
        `
          )
          .join("")}
      </div>
      <label style="display:flex; align-items:center; gap:8px; font-size:12.5px; margin-top:10px; cursor:pointer;">
        <input type="checkbox" id="wiz-72h" ${state.compassRecent72h ? "checked" : ""} />
        <span>Het voorval vond minder dan 72 uur tot 7 dagen geleden plaats (tijdsgevoelig voor medisch/forensisch sporenbehoud)</span>
      </label>
    `;
    w.querySelectorAll("[data-wiz-need]").forEach((b) =>
      b.addEventListener("click", () => {
        state.compassNeed = b.dataset.wizNeed;
        renderWizard();
      })
    );
    w.querySelectorAll("[data-wiz-role]").forEach((b) =>
      b.addEventListener("click", () => {
        state.compassRole = b.dataset.wizRole;
        renderWizard();
      })
    );
    const cb72 = w.querySelector("#wiz-72h");
    if (cb72) {
      cb72.addEventListener("change", (e) => {
        state.compassRecent72h = e.target.checked;
      });
    }
  } else {
    const res = evaluateCompassRoute({
      need: state.compassNeed,
      categoryIds: state.compassCategories,
      roleContext: state.compassRole,
      recentIncidentUnder72h: state.compassRecent72h
    });

    w.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h2 style="margin:0; font-family:'Manrope',sans-serif;">Jouw persoonlijke SIGNAL Compass-resultaat</h2>
        <span class="pill">Safe Disclosure Niveau ${res.recommendedDisclosureLevel} · Deterministisch (Geen AI)</span>
      </div>

      ${res.urgentAlerts
        .map(
          (a) => `
        <div class="urgent-note">
          <strong>${a.title}</strong><br />${a.message}
        </div>
      `
        )
        .join("")}

      ${
        res.witnessGuidance
          ? `<div class="panel-soft" style="margin-top:14px;"><strong>${res.witnessGuidance.protocol}</strong><p style="margin:4px 0 0; font-size:12.5px;">${res.witnessGuidance.rule}</p></div>`
          : ""
      }

      <div class="grid-2" style="margin-top:18px;">
        <div>
          <h3 style="margin:0 0 10px; font-family:'Manrope',sans-serif; font-size:15px;">Bevoegde Belgische Organisaties</h3>
          <div class="route-list">
            ${res.recommendedPartners
              .map(
                (p) => `
              <div class="route" style="padding:15px;">
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap;">
                    <h3>${p.shortName}</h3>
                    <span class="pill">${p.badgeText}</span>
                  </div>
                  <p style="margin-top:4px;">${p.confidentialityRegime.secrecyArticle} · Tel: <strong>${p.accessChannels.phoneNumber}</strong></p>
                  <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="primary" style="padding:8px 13px; font-size:12px;" data-wiz-bridge="${p.organizationId}">Bereid Bridge voor</button>
                    <a class="secondary" style="padding:7px 12px; font-size:12px;" target="_blank" rel="noopener noreferrer" href="${PARTNER_URLS[p.organizationId] || "#"}">Website ↗</a>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div>
          <h3 style="margin:0 0 10px; font-family:'Manrope',sans-serif; font-size:15px;">SIGNAL Reality Check &amp; Evidence Coach</h3>
          ${res.matchedCategories
            .map(
              (c) => `
            <div class="small-note" style="margin-top:0; margin-bottom:10px;">
              <strong>${state.invisibleMode ? c.neutralLabel : c.name}</strong><br />
              <span style="color:#2b4f4d;"><strong>Wél:</strong> ${c.realityCheck.whatItIs}</span><br />
              <span><strong>Níét:</strong> ${c.realityCheck.whatItIsNot}</span>
            </div>
          `
            )
            .join("")}
          <div class="panel-soft">
            <strong style="font-size:12.5px;">Tips om zuiver bewijs te bewaren:</strong>
            <ul style="margin:6px 0 0; padding-left:18px; font-size:12px; color:#425f5d;">
              ${res.combinedEvidenceTips.map((t) => `<li style="margin-bottom:4px;">${t}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

    w.querySelectorAll("[data-wiz-bridge]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.bridgeRecipientId = btn.dataset.wizBridge;
        gotoPage("bridge");
      });
    });
  }

  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  if (backBtn) backBtn.style.visibility = state.wizardStep === 0 ? "hidden" : "visible";
  if (nextBtn) {
    nextBtn.textContent = state.wizardStep === 2 ? "Open Mijn Privékluis →" : "Volgende →";
  }
}

// 2. HELP & TRUST PASSPORTS
function renderHelp() {
  const routesEl = document.getElementById("routes");
  if (!routesEl) return;

  const filtered = PARTNER_PASSPORTS.filter(
    (p) => state.helpFilter === "all" || p.supportedCategories.includes(state.helpFilter)
  );

  routesEl.innerHTML = filtered
    .map(
      (p) => `
    <div class="route">
      <div class="ico">${p.organizationId === "org-zsg" ? "✚" : p.organizationId === "org-1712" ? "♡" : "◇"}</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h3>${p.name}</h3>
          <span class="pill">${p.badgeText}</span>
        </div>
        <p style="margin-top:4px;">${p.legalBasisSummary}</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px; margin-top:10px; font-size:12px; color:#4f6869; background:#f6faf8; padding:10px 12px; border-radius:10px;">
          <div><strong>Bevoegdheid:</strong> ${p.jurisdiction}</div>
          <div><strong>Geheimhouding:</strong> ${p.confidentialityRegime.secrecyArticle}</div>
          <div><strong>Toezicht:</strong> ${p.independentOversightBody}</div>
          <div><strong>Contact:</strong> ${p.accessChannels.phoneNumber}</div>
        </div>
        <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" class="primary" style="padding:8px 14px; font-size:12px;" data-help-bridge="${p.organizationId}">
            Kies in SIGNAL Bridge
          </button>
          <a class="secondary" style="padding:7px 13px; font-size:12px;" target="_blank" rel="noopener noreferrer" href="${PARTNER_URLS[p.organizationId] || "#"}">
            Officiële website ↗
          </a>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  routesEl.querySelectorAll("[data-help-bridge]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.bridgeRecipientId = btn.dataset.helpBridge;
      gotoPage("bridge");
    });
  });
}

async function computeSha256Hex(text) {
  const data = new TextEncoder().encode(text);
  if (window.crypto && window.crypto.subtle) {
    const buf = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
}

// 3. VAULT (TIMELINE, MEMORY, SHA-256, ADDENDUM, CONTINUITY)
function renderVault() {
  const root = document.getElementById("vault-dynamic-root");
  if (!root) return;

  const dossier = getActiveDossier();
  const typeLabels = {
    own_memory: "Eigen herinnering",
    document_evidence: "Bewijsstuk (SHA-256)",
    third_party_note: "Waarneming derde",
    addendum_correction: "Latere aanvulling",
    official_step: "Officiële stap"
  };
  const certaintyLabels = {
    exact: "Exacte datum & detail",
    approximate_date: "Datum bij benadering",
    uncertain_detail: "Onzeker detail"
  };

  root.innerHTML = `
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px;">
      ${state.dossiers
        .map(
          (d) => `
        <button type="button" class="subtab ${d.dossierId === dossier.dossierId ? "active" : ""}" data-select-dossier="${d.dossierId}">
          ${state.invisibleMode ? d.neutralPersonaName : d.personaName}
        </button>
      `
        )
        .join("")}
    </div>

    <div class="vault-grid">
      <div class="panel">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h3 style="margin:0; font-family:'Manrope',sans-serif;">${state.invisibleMode ? dossier.neutralPersonaName : dossier.personaName}</h3>
          <span class="pill">${dossier.roleType === "witness" ? "SIGNAL Witness" : "Privékluis (Niveau 2)"}</span>
        </div>
        <p style="font-size:12.5px; color:#6b8081; margin:8px 0 0;">${dossier.summary}</p>

        <div class="timeline">
          ${dossier.timelineEntries
            .map(
              (e) => `
            <div class="event ${e.entryType === "addendum_correction" ? "is-addendum" : ""}">
              <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center; margin-bottom:4px;">
                <span class="pill">${typeLabels[e.entryType] || e.entryType}</span>
                <span class="pill ${e.certainty === "exact" ? "" : "pill-caution"}">${certaintyLabels[e.certainty] || e.certainty}</span>
                <span style="font-size:11px; color:#7c8e90;">${e.incidentDateOrPeriod}</span>
              </div>
              <strong>${e.title}</strong>
              <p>${e.rawUserNarrative}</p>
              ${
                e.attachments
                  ? e.attachments
                      .map(
                        (att) => `
                  <div class="hash-box">
                    <strong>Bijlage:</strong> ${att.fileName}<br />
                    <strong>SHA-256:</strong> ${att.sha256Hash}
                  </div>
                `
                      )
                      .join("")
                  : ""
              }
              ${
                e.entryType !== "addendum_correction"
                  ? `<button type="button" class="secondary" style="padding:6px 11px; font-size:11.5px; margin-top:6px;" data-add-addendum="${e.entryId}">+ Voeg latere aanvulling toe (origineel blijft intact)</button>`
                  : `<div style="font-size:11px; color:var(--teal); font-weight:700; margin-top:4px;">✓ Oorspronkelijke notitie (${e.parentEntryId}) is ongewijzigd bewaard (ADR-003).</div>`
              }
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <div class="panel" style="margin-top:20px;">
          <div class="eyebrow">NIEUWE REGISTRATIE (DEMO)</div>
          <h3 style="margin:6px 0 8px; font-family:'Manrope',sans-serif;">Tijdlijnnotitie toevoegen</h3>
          <label class="field-label" for="v-title">Titel van het voorval</label>
          <input class="field" id="v-title" type="text" placeholder="Bijv. Gesprek na teamvergadering" />

          <label class="field-label" for="v-date">Datum of periode</label>
          <input class="field" id="v-date" type="text" placeholder="Bijv. 14 november 2026 rond 16:30" />

          <label class="field-label" for="v-type">Type registratie</label>
          <select class="field" id="v-type">
            <option value="own_memory">Eigen herinnering / waarneming</option>
            <option value="document_evidence">Document / screenshot (SHA-256 hash)</option>
            <option value="third_party_note">Verklaring van derde</option>
            <option value="official_step">Reeds gezette stap</option>
          </select>

          <label class="field-label" for="v-certainty">Zekerheid (SIGNAL Memory)</label>
          <select class="field" id="v-certainty">
            <option value="exact">Exacte datum en details zeker</option>
            <option value="approximate_date">Datum bij benadering</option>
            <option value="uncertain_detail">Herinnering met onzeker detail</option>
          </select>

          <label class="field-label" for="v-text">Jouw eigen beschrijving (nooit herschreven door AI)</label>
          <textarea class="field" id="v-text" placeholder="Schrijf in je eigen woorden wat je hebt meegemaakt of gezien..."></textarea>

          <button type="button" class="primary" style="margin-top:12px; width:100%;" id="btn-add-vault-entry">
            Vastleggen met SHA-256 hash
          </button>
        </div>

        <div class="panel">
          <div class="eyebrow">ADR-003 · BEGRENSDE AI &amp; CONTINUITY</div>
          <h3 style="margin:6px 0 8px; font-family:'Manrope',sans-serif;">Hulpmiddelen zonder oordeel</h3>
          <p style="font-size:12px; color:#6b8081; margin:0 0 12px;">
            AI geeft nooit een geloofwaardigheidsscore. Genereer een chronologisch uittreksel of exporteer je kluis.
          </p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="secondary" style="font-size:12px; padding:9px 13px;" id="btn-vault-ai">
              ${state.aiStructuredPreviewOpen ? "Verberg chronologisch uittreksel" : "Chronologisch uittreksel (AI)"}
            </button>
            <button type="button" class="secondary" style="font-size:12px; padding:9px 13px;" id="btn-vault-export">
              Continuity Export-manifest
            </button>
            <button type="button" class="primary" style="font-size:12px; padding:9px 14px;" data-goto="bridge">
              Doorsturen via SIGNAL Bridge →
            </button>
          </div>
          ${
            state.aiStructuredPreviewOpen
              ? `
            <div class="panel-soft" style="margin-top:12px; font-size:12px;">
              <strong>Chronologisch overzicht (alleen-lezen):</strong>
              <ul style="margin:6px 0 0; padding-left:18px;">
                ${dossier.timelineEntries
                  .map((e) => `<li><strong>[${e.incidentDateOrPeriod}]</strong> ${e.title} (origineel intact)</li>`)
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }
          ${
            state.continuityExportJson
              ? `<pre class="hash-box" style="max-height:150px; overflow:auto; margin-top:10px;">${state.continuityExportJson}</pre>`
              : ""
          }
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll("[data-select-dossier]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeDossierId = btn.dataset.selectDossier;
      state.bridgeSelectedEntries = getActiveDossier().timelineEntries.map((e) => e.entryId);
      state.continuityExportJson = null;
      renderVault();
    });
  });

  root.querySelectorAll("[data-add-addendum]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = window.prompt(
        "Voeg een latere aanvulling toe (de oorspronkelijke notitie blijft ongewijzigd):",
        "Aanvulling: ik heb vandaag het bijbehorende agenda-item teruggevonden."
      );
      if (text && text.trim()) {
        dossier.timelineEntries = createTimelineAddendum(
          dossier.timelineEntries,
          btn.dataset.addAddendum,
          text,
          new Date().toISOString()
        );
        showToast("Aanvulling toegevoegd zonder origineel te wijzigen.");
        renderVault();
      }
    });
  });

  const addBtn = root.querySelector("#btn-add-vault-entry");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const title = root.querySelector("#v-title").value.trim() || "Persoonlijke tijdlijnnotitie";
      const dateStr = root.querySelector("#v-date").value.trim() || "15 november 2026";
      const rawText =
        root.querySelector("#v-text").value.trim() ||
        "Fictieve voorvalbeschrijving toegevoegd in de demo-kluis.";
      const hashHex = await computeSha256Hex(`${title}|${dateStr}|${rawText}`);
      const nowIso = new Date().toISOString();
      const entry = {
        entryId: `tl-${Date.now().toString().slice(-4)}`,
        createdAt: nowIso,
        incidentDateOrPeriod: dateStr,
        entryType: root.querySelector("#v-type").value,
        certainty: root.querySelector("#v-certainty").value,
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
      dossier.timelineEntries.push(entry);
      state.bridgeSelectedEntries.push(entry.entryId);
      showToast("Notitie vastgelegd met SHA-256 integriteitshash.");
      renderVault();
    });
  }

  const aiBtn = root.querySelector("#btn-vault-ai");
  if (aiBtn) {
    aiBtn.addEventListener("click", () => {
      state.aiStructuredPreviewOpen = !state.aiStructuredPreviewOpen;
      renderVault();
    });
  }

  const expBtn = root.querySelector("#btn-vault-export");
  if (expBtn) {
    expBtn.addEventListener("click", () => {
      state.continuityExportJson = JSON.stringify(
        {
          protocol: "SIGNAL_CONTINUITY_EXPORT_V4",
          exportedAt: new Date().toISOString(),
          dossierId: dossier.dossierId,
          entries: dossier.timelineEntries
        },
        null,
        2
      );
      showToast("SIGNAL Continuity exportmanifest gegenereerd.");
      renderVault();
    });
  }

  root.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => gotoPage(b.dataset.goto))
  );
}

// 4. SIGNAL BRIDGE
function renderBridge() {
  const root = document.getElementById("bridge-dynamic-root");
  if (!root) return;

  const dossier = getActiveDossier();
  const partner =
    PARTNER_PASSPORTS.find((p) => p.organizationId === state.bridgeRecipientId) || PARTNER_PASSPORTS[0];

  root.innerHTML = `
    <div class="grid-2">
      <div class="panel">
        <div class="eyebrow">STAP 1 &amp; 2 · SELECTIE</div>
        <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">Welke tijdlijnitems wil je overdragen?</h3>
        <p style="font-size:12.5px; color:#6b8081; margin:0 0 12px;">
          Actief dossier: <strong>${state.invisibleMode ? dossier.neutralPersonaName : dossier.personaName}</strong>.
          Niet-aangevinkte items blijven privé in je kluis.
        </p>

        ${dossier.timelineEntries
          .map((e) => {
            const checked = state.bridgeSelectedEntries.includes(e.entryId);
            return `
              <label class="option ${checked ? "selected" : ""}" style="display:flex; gap:10px; align-items:flex-start; margin-bottom:10px; min-height:auto; cursor:pointer;">
                <input type="checkbox" data-bridge-cb="${e.entryId}" ${checked ? "checked" : ""} style="margin-top:3px;" />
                <div>
                  <div style="font-weight:700;">${e.title} <span class="pill">${e.incidentDateOrPeriod}</span></div>
                  <small>${e.rawUserNarrative}</small>
                </div>
              </label>
            `;
          })
          .join("")}

        <label class="field-label" for="bridge-partner">Ontvangende Belgische partner (Trust Passport)</label>
        <select class="field" id="bridge-partner">
          ${PARTNER_PASSPORTS.map(
            (p) => `<option value="${p.organizationId}" ${p.organizationId === partner.organizationId ? "selected" : ""}>${p.name}</option>`
          ).join("")}
        </select>

        <div class="panel-soft" style="margin-top:12px; font-size:12px;">
          <strong>Trust Passport: ${partner.shortName}</strong> (${partner.badgeText})<br />
          <span>Geheimhouding: ${partner.confidentialityRegime.secrecyArticle} · Toezicht: ${partner.independentOversightBody}</span>
        </div>

        <label class="field-label" for="bridge-level">Niveau van bekendmaking</label>
        <select class="field" id="bridge-level">
          <option value="anonymous_consultation" ${state.bridgeDisclosureLevel === "anonymous_consultation" ? "selected" : ""}>Oriënterend advies (zonder naam)</option>
          <option value="pseudonymous_bridge" ${state.bridgeDisclosureLevel === "pseudonymous_bridge" ? "selected" : ""}>Pseudonieme overdracht (enkel via SIGNAL Bridge Token)</option>
          <option value="named_handover" ${state.bridgeDisclosureLevel === "named_handover" ? "selected" : ""}>Volledige overdracht op naam</option>
        </select>
      </div>

      <div>
        <div class="panel">
          <div class="eyebrow">STAP 3 · BEWUSTE TOESTEMMING</div>
          <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">Wat deze overdracht wél en níét betekent</h3>
          <label style="display:flex; gap:9px; align-items:flex-start; font-size:12.5px; margin-bottom:12px; cursor:pointer;">
            <input type="checkbox" id="br-c1" ${state.bridgeConsentNotPolice ? "checked" : ""} style="margin-top:3px;" />
            <span>Ik begrijp dat overdracht naar <strong>${partner.shortName}</strong> géén automatisch proces-verbaal bij de politie is.</span>
          </label>
          <label style="display:flex; gap:9px; align-items:flex-start; font-size:12.5px; margin-bottom:16px; cursor:pointer;">
            <input type="checkbox" id="br-c2" ${state.bridgeConsentRevocability ? "checked" : ""} style="margin-top:3px;" />
            <span>Ik begrijp dat mijn eigen kluis wisbaar blijft, maar het overgedragen pakket na verzending valt onder het beroepsgeheim en bewaarbeleid van de ontvanger (art. 17 lid 3 AVG).</span>
          </label>
          <button type="button" class="primary" style="width:100%;" id="btn-run-bridge">
            Versleutel &amp; maak Bridge Token (${state.bridgeSelectedEntries.length} item(s))
          </button>
        </div>

        ${
          state.lastCreatedBridgePackage
            ? `
          <div class="panel" style="border-color:var(--teal); background:#f5fbf8;">
            <span class="pill">Ontvangstbevestiging · ${state.lastCreatedBridgePackage.handoverId}</span>
            <h3 style="margin:10px 0 6px; font-family:'Manrope',sans-serif;">SIGNAL Bridge Pakket Klaargezet</h3>
            <p style="font-size:12.5px; color:#456362; margin:0 0 10px;">
              Bestemd voor <strong>${state.lastCreatedBridgePackage.recipientOrganization.name}</strong>. Je hoeft je verhaal niet opnieuw te vertellen.
            </p>
            <div class="hash-box" style="background:#fff;">
              <strong>Afspraak- / Bridge Token:</strong> ${state.lastCreatedBridgePackage.bridgePhysicalToken}<br />
              <strong>Gedeelde items:</strong> ${state.lastCreatedBridgePackage.includedEntryCount} (${state.lastCreatedBridgePackage.includedEntryIds.join(", ")})<br />
              <strong>Privé gehouden in jouw kluis:</strong> ${state.lastCreatedBridgePackage.excludedPrivateEntryCount}
            </div>
            <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" class="primary" style="padding:9px 14px; font-size:12px;" data-goto="cases">Inspecteer in Professional Workspace →</button>
            </div>
          </div>
        `
            : `
          <div class="small-note">
            <strong>SIGNAL Aftercare:</strong> Na een overdracht blijf je altijd zelf in controle over je kluis en zie je rustig welke vervolgstap bij jouw situatie past.
          </div>
        `
        }
      </div>
    </div>
  `;

  root.querySelectorAll("[data-bridge-cb]").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = cb.dataset.bridgeCb;
      if (e.target.checked) {
        if (!state.bridgeSelectedEntries.includes(id)) state.bridgeSelectedEntries.push(id);
      } else {
        state.bridgeSelectedEntries = state.bridgeSelectedEntries.filter((x) => x !== id);
      }
      renderBridge();
    });
  });

  const pSel = root.querySelector("#bridge-partner");
  if (pSel) {
    pSel.addEventListener("change", (e) => {
      state.bridgeRecipientId = e.target.value;
      renderBridge();
    });
  }

  const lSel = root.querySelector("#bridge-level");
  if (lSel) {
    lSel.addEventListener("change", (e) => {
      state.bridgeDisclosureLevel = e.target.value;
    });
  }

  const c1 = root.querySelector("#br-c1");
  if (c1) c1.addEventListener("change", (e) => (state.bridgeConsentNotPolice = e.target.checked));
  const c2 = root.querySelector("#br-c2");
  if (c2) c2.addEventListener("change", (e) => (state.bridgeConsentRevocability = e.target.checked));

  const runBtn = root.querySelector("#btn-run-bridge");
  if (runBtn) {
    runBtn.addEventListener("click", () => {
      try {
        const pkg = buildBridgeHandoverPackage({
          dossierId: dossier.dossierId,
          timelineEntries: dossier.timelineEntries,
          selectedEntryIds: state.bridgeSelectedEntries,
          recipientOrganizationId: state.bridgeRecipientId,
          disclosureLevel: state.bridgeDisclosureLevel,
          understandsNotAutomaticPoliceReport: state.bridgeConsentNotPolice,
          revocabilityScopeExplained: state.bridgeConsentRevocability
        });
        state.lastCreatedBridgePackage = pkg;
        state.wsPartnerOrg = state.bridgeRecipientId;
        state.wsAuditLog.unshift({
          time: new Date().toISOString().slice(0, 19).replace("T", " "),
          actor: "Melder via Bridge",
          action: `Pakket ${pkg.handoverId} (${pkg.includedEntryCount} items) naar ${pkg.recipientOrganization.name}`,
          result: "DELIVERED"
        });
        showToast(`Bridge Token ${pkg.bridgePhysicalToken} aangemaakt.`);
        renderBridge();
      } catch (err) {
        window.alert(err.message);
      }
    });
  }

  root.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => gotoPage(b.dataset.goto))
  );
}

// 5. CASES (PROFESSIONAL WORKSPACE & HANDSHAKE SIMULATOR)
function renderCases() {
  document.querySelectorAll("[data-cases-tab]").forEach((t) => {
    t.classList.toggle("active", t.dataset.casesTab === state.casesTab);
  });

  const root = document.getElementById("cases-dynamic-root");
  if (!root) return;

  if (state.casesTab === "workspace") {
    const bridgedTarget = state.lastCreatedBridgePackage
      ? state.lastCreatedBridgePackage.recipientOrganization.organizationId
      : "org-vlaams-meldpunt";

    const authCheck = checkDossierAccessAuthorization({
      actorRole: state.wsSelectedActor,
      actorOrganizationId: state.wsPartnerOrg,
      bridgedToOrganizationId: bridgedTarget
    });

    root.innerHTML = `
      <div class="stat">
        <div class="card"><b>04</b><span>Fictieve dossiers</span></div>
        <div class="card"><b>02</b><span>Menselijke review</span></div>
        <div class="card"><b>00</b><span>Automatische conclusies</span></div>
      </div>

      <div class="grid-2">
        <div class="panel" style="margin-top:0;">
          <div class="eyebrow">GOUDEN ARCHITECTUURREGEL</div>
          <h3 style="margin:6px 0 8px; font-family:'Manrope',sans-serif;">Test wie inhoudelijk toegang krijgt</h3>
          <p style="font-size:12.5px; color:#6b8081; margin:0 0 12px;">
            Zelfs een platformbeheerder of een betalende werkgever mag nooit dossiers kunnen inzien. Test hieronder een rol:
          </p>

          <label class="field-label" for="ws-actor">Kies een rol</label>
          <select class="field" id="ws-actor">
            <option value="partner_caseworker" ${state.wsSelectedActor === "partner_caseworker" ? "selected" : ""}>Gemachtigde Behandelaar bij Partnerorganisatie</option>
            <option value="vault_owner" ${state.wsSelectedActor === "vault_owner" ? "selected" : ""}>De Melder zelf (Eigenaar Private Vault)</option>
            <option value="platform_sysadmin" ${state.wsSelectedActor === "platform_sysadmin" ? "selected" : ""}>Platform- / Databasebeheerder (SysAdmin)</option>
            <option value="sponsor_or_b2b_client" ${state.wsSelectedActor === "sponsor_or_b2b_client" ? "selected" : ""}>Betalende Werkgever / Sponsor (ADR-004)</option>
          </select>

          ${
            state.wsSelectedActor === "partner_caseworker"
              ? `
            <label class="field-label" for="ws-org">Organisatie van de behandelaar</label>
            <select class="field" id="ws-org">
              ${PARTNER_PASSPORTS.map(
                (p) => `<option value="${p.organizationId}" ${p.organizationId === state.wsPartnerOrg ? "selected" : ""}>${p.shortName}</option>`
              ).join("")}
            </select>
          `
              : ""
          }

          <div class="${authCheck.allowed ? "panel-soft" : "urgent-note"}" style="margin-top:14px;">
            <strong>${authCheck.allowed ? "TOEGESTAAN" : "GEWEIGERD & GELOGD"} (Scope: ${authCheck.scope})</strong><br />
            <span>${authCheck.reason}</span>
          </div>
        </div>

        <div class="panel" style="margin-top:0;">
          <div class="eyebrow">ZERO-PII TELEMETRY</div>
          <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">Onwijzigbaar Audit Logboek</h3>
          <table class="data-table">
            <thead>
              <tr><th>Tijd</th><th>Actor</th><th>Actie</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${state.wsAuditLog
                .slice(0, 5)
                .map(
                  (l) => `
                <tr>
                  <td>${l.time.slice(11)}</td>
                  <td><strong>${l.actor}</strong></td>
                  <td>${l.action}</td>
                  <td><span class="pill ${l.result.startsWith("BLOCKED") ? "pill-urgent" : ""}">${l.result}</span></td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const actorSel = root.querySelector("#ws-actor");
    if (actorSel) {
      actorSel.addEventListener("change", (e) => {
        state.wsSelectedActor = e.target.value;
        const c = checkDossierAccessAuthorization({
          actorRole: state.wsSelectedActor,
          actorOrganizationId: state.wsPartnerOrg,
          bridgedToOrganizationId: bridgedTarget
        });
        state.wsAuditLog.unshift({
          time: new Date().toISOString().slice(0, 19).replace("T", " "),
          actor: state.wsSelectedActor,
          action: `Toegangscontrole (${bridgedTarget})`,
          result: c.allowed ? `ALLOWED` : `BLOCKED`
        });
        renderCases();
      });
    }

    const orgSel = root.querySelector("#ws-org");
    if (orgSel) {
      orgSel.addEventListener("change", (e) => {
        state.wsPartnerOrg = e.target.value;
        renderCases();
      });
    }
  } else {
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
      <div class="small-note">
        <strong>ADR-002:</strong> In Fase 1 &amp; 2 is matching technisch uitgeschakeld. Deze simulator toont hoe in Fase 3 een eventuele overeenkomst wordt beoordeeld met <strong>SIGNAL Fairness</strong> en het <strong>vierogenprincipe</strong> — zonder automatische notificaties of groepschats.
      </div>
      <div class="grid-2" style="margin-top:16px;">
        <div class="panel" style="margin-top:0;">
          <label class="field-label" for="hs-phase" style="margin-top:0;">Projectfase</label>
          <select class="field" id="hs-phase">
            <option value="1" ${state.hsPhase === 1 ? "selected" : ""}>Fase 1 / 2 MVP — Matching technisch uitgeschakeld</option>
            <option value="3" ${state.hsPhase === 3 ? "selected" : ""}>Fase 3 — Wettelijk toegelaten domein na goedgekeurde DPIA</option>
          </select>

          <div style="margin-top:14px; font-size:12.5px;">
            <strong>1. SIGNAL Fairness (bescherming tegen valse matches)</strong>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-h" ${state.hsHearsayFlag ? "checked" : ""} /> Gerucht ("van horen zeggen") of gekopieerd verhaal</label>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-n" ${state.hsNamesakeFlag ? "checked" : ""} /> Risico op naamgenoot / onvoldoende context</label>
          </div>

          <div style="margin-top:14px; font-size:12.5px;">
            <strong>2. Menselijke vierogencontrole</strong>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-r1" ${state.hsReviewer1 ? "checked" : ""} /> Beoordelaar 1 (Jurist / Behandelaar) keurt goed</label>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-r2" ${state.hsReviewer2 ? "checked" : ""} /> Beoordelaar 2 (Onafhankelijk) keurt goed</label>
          </div>

          <div style="margin-top:14px; font-size:12.5px;">
            <strong>3. Afzonderlijke begeleiding &amp; vrijwillige coördinatie</strong>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-c1" ${state.hsReporter1Consent ? "checked" : ""} /> Melder A stemt na apart gesprek in via advocaat</label>
            <label style="display:flex; gap:8px; margin-top:6px; cursor:pointer;"><input type="checkbox" id="hs-c2" ${state.hsReporter2Consent ? "checked" : ""} /> Melder B stemt na apart gesprek in via advocaat</label>
          </div>
        </div>

        <div class="panel" style="margin-top:0;">
          <span class="pill ${evalHs.canProceedToHandshake ? "" : "pill-caution"}">Status: ${evalHs.status}</span>
          <h3 style="margin:10px 0 6px; font-family:'Manrope',sans-serif;">Uitkomst veiligheidstoets</h3>
          <p style="font-size:13px; color:#314d4f;">${evalHs.reason}</p>
          <table class="data-table" style="margin-top:12px;">
            <tbody>
              <tr><th>Automatische match-melding naar melders?</th><td><span class="pill">ALTIJD UIT (${evalHs.automatedNotificationSentToReporters})</span></td></tr>
              <tr><th>Publieke teller bijgewerkt?</th><td><span class="pill">VERBODEN (${evalHs.publicAccusationCounterIncremented})</span></td></tr>
              <tr><th>AI-geloofwaardigheidsscore?</th><td><span class="pill">VERBODEN (${evalHs.aiCredibilityScoreUsed})</span></td></tr>
              <tr><th>Individuele begeleiding (Handshake)?</th><td><strong>${evalHs.canProceedToHandshake ? "JA (apart)" : "NEE"}</strong></td></tr>
              <tr><th>Gecoördineerde stap (zonder groepschat)?</th><td><strong>${evalHs.canProceedToCollective ? "JA (via advocaat)" : "NEE"}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    root.querySelector("#hs-phase").addEventListener("change", (e) => {
      state.hsPhase = Number(e.target.value);
      state.hsLegalApproved = state.hsPhase === 3;
      renderCases();
    });
    const bindHs = (id, key) =>
      root.querySelector(id).addEventListener("change", (e) => {
        state[key] = e.target.checked;
        renderCases();
      });
    bindHs("#hs-h", "hsHearsayFlag");
    bindHs("#hs-n", "hsNamesakeFlag");
    bindHs("#hs-r1", "hsReviewer1");
    bindHs("#hs-r2", "hsReviewer2");
    bindHs("#hs-c1", "hsReporter1Consent");
    bindHs("#hs-c2", "hsReporter2Consent");
  }
}

// 6. TRUST, CONSENT & GOVERNANCE
function renderTrust() {
  document.querySelectorAll("[data-trust-tab]").forEach((t) => {
    t.classList.toggle("active", t.dataset.trustTab === state.trustTab);
  });

  const root = document.getElementById("trust-dynamic-root");
  if (!root) return;

  if (state.trustTab === "principles") {
    root.innerHTML = `
      <div class="grid" style="margin-top:20px;">
        <div class="card"><div class="ico">♧</div><h3>Geen publieke schandpaal</h3><p>Geen namenlijsten, rankings of reputatiescores van beschuldigde personen.</p></div>
        <div class="card"><div class="ico">◎</div><h3>Menselijke beoordeling</h3><p>AI ordent alleen tekst; juridische of menselijke beslissingen liggen altijd bij bevoegde professionals.</p></div>
        <div class="card"><div class="ico">▣</div><h3>Privacy by design</h3><p>KMS-scheiding, zero-PII auditlogs, DPIA en onafhankelijke security-audits.</p></div>
        <div class="card"><div class="ico">◇</div><h3>Vrijwillige stappen</h3><p>Duidelijk consent vóór elke overdracht via SIGNAL Bridge.</p></div>
        <div class="card"><div class="ico">⚖</div><h3>Rechten van iedereen</h3><p>Bescherming tegen valse of gecoördineerde meldingen via SIGNAL Fairness.</p></div>
        <div class="card"><div class="ico">↗</div><h3>Verbinding met bestaande hulp</h3><p>Ondersteunt 1712, ZSG, VMRI, Unia en Ombudsman zonder ze te vervangen.</p></div>
      </div>

      <div class="panel">
        <div class="eyebrow">RODE LIJNEN</div>
        <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">Wat SIGNAL absoluut NIET bouwt (7 Verboden Anti-Features)</h3>
        ${FORBIDDEN_ANTI_FEATURES.map(
          (f) => `
          <div style="padding:10px 0; border-bottom:1px solid var(--line); font-size:12.5px;">
            <strong style="color:var(--urgent-ink);">✕ ${f.title}</strong><br />
            <span style="color:#657b7b;">${f.reason}</span> — <strong style="color:var(--teal);">Alternatief:</strong> ${f.signalAlternative}
          </div>
        `
        ).join("")}
      </div>
    `;
  } else if (state.trustTab === "consent") {
    const items = [
      { key: "localVault", title: "Persoonlijke kluis & tijdlijn", rule: "100% direct wisbaar door jou (Crypto-shredding)." },
      { key: "evidenceHash", title: "SHA-256 Bewijsintegriteit", rule: "Wisbaar samen met je persoonlijke kluis." },
      { key: "bridgeTransfer", title: "SIGNAL Bridge-overdracht naar één partner", rule: "Vóór verzending intrekbaar; ná verzending geldt het bewaarbeleid van de ontvanger (art. 17 lid 3 AVG)." },
      { key: "patternCheckPhase3", title: "Safe Matching (Fase 3 · Standaard Uit)", rule: "Standaard uitgeschakeld in MVP (ADR-002)." },
      { key: "anonymousPulseStats", title: "SIGNAL Pulse (k-anonieme statistiek)", rule: "Bevat nooit herleidbare persoonsgegevens." }
    ];
    root.innerHTML = `
      <div class="panel">
        <div class="eyebrow">ARTIKEL 17 AVG · EERLIJKE TOELICHTING</div>
        <h3 style="margin:6px 0 12px; font-family:'Manrope',sans-serif;">Granulaire Toestemmingsmatrix</h3>
        ${items
          .map(
            (i) => `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid var(--line);">
            <div>
              <strong style="font-size:13px;">${i.title}</strong>
              <div style="font-size:12px; color:#6b8081;">${i.rule}</div>
            </div>
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; cursor:pointer;">
              <input type="checkbox" data-consent-k="${i.key}" ${state.consentMatrix[i.key] ? "checked" : ""} />
              <span>${state.consentMatrix[i.key] ? "Aan" : "Uit"}</span>
            </label>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    root.querySelectorAll("[data-consent-k]").forEach((cb) => {
      cb.addEventListener("change", (e) => {
        state.consentMatrix[cb.dataset.consentK] = e.target.checked;
        renderTrust();
      });
    });
  } else {
    root.innerHTML = `
      <div class="grid-2" style="margin-top:20px;">
        <div class="panel" style="margin-top:0;">
          <div class="eyebrow">BELGISCHE VZW / STICHTING</div>
          <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">De 8 Statutaire Onafhankelijkheidsregels</h3>
          <ol style="padding-left:18px; font-size:12.5px; color:#4f6869; line-height:1.7;">
            <li>Geen verkoop of commerciële exploitatie van meldingen.</li>
            <li>Geen advertenties of trackingpixels.</li>
            <li>Geen betaalde verwijdering of doofpot voor organisaties.</li>
            <li>Strikte muur tussen <em>SIGNAL Care</em> en zakelijke klanten (ADR-004).</li>
            <li>Openbaar jaarverslag met k-anonieme maatschappelijke cijfers.</li>
            <li>Jaarlijkse externe security- en governance-audit.</li>
            <li>Verplichte belangenconflict-onthouding.</li>
            <li>Geoormerkte continuïteitsreserve &amp; draagbare kluisexport.</li>
          </ol>
        </div>
        <div class="panel" style="margin-top:0;">
          <div class="eyebrow">SIGNAL PULSE</div>
          <h3 style="margin:6px 0 10px; font-family:'Manrope',sans-serif;">Ethische Impact-KPI's</h3>
          <p style="font-size:12.5px; color:#6b8081;">Succes wordt gemeten aan snelle, veilige hulp — nooit aan aantallen beschuldigingen:</p>
          <div class="demo-row">✓ <div><b>Successful Routing Rate</b><small>Vindt de gebruiker binnen één sessie het bevoegde kanaal?</small></div></div>
          <div class="demo-row">✓ <div><b>Time to Guidance / ZSG</b><small>Snellere toegang tot medische/forensische zorg binnen 72 uur.</small></div></div>
          <div class="demo-row">✓ <div><b>Consent Comprehension</b><small>95%+ begrijpt vooraf wat een overdracht juridisch wel en niet doet.</small></div></div>
        </div>
      </div>
    `;
  }
}

function toggleInvisibleMode() {
  state.invisibleMode = !state.invisibleMode;
  document.body.classList.toggle("invisible-mode", state.invisibleMode);
  const btn = document.getElementById("btn-toggle-invisible");
  if (btn) {
    btn.classList.toggle("active-toggle", state.invisibleMode);
    btn.textContent = state.invisibleMode ? "Invisible: AAN" : "SIGNAL Invisible";
  }
  const sub = document.getElementById("topbar-subtitle");
  if (sub) {
    sub.textContent = state.invisibleMode
      ? "Persoonlijke administratie-werkruimte"
      : "Onafhankelijk vertrouwensnetwerk · België (SIGNAL 4.0)";
  }
  gotoPage(state.activePage);
}

function triggerSafeExit() {
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
    bar.classList.remove("open");
    return;
  }
  bar.classList.add("open");
  const step = TOUR_STEPS[state.tourIndex];
  document.getElementById("tour-title").textContent = step.title;
  document.getElementById("tour-desc").textContent = step.text;
  gotoPage(step.page);
}

export function initSignalApp() {
  document.querySelectorAll("[data-page]").forEach((b) =>
    b.addEventListener("click", () => gotoPage(b.dataset.page))
  );
  document.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => gotoPage(b.dataset.goto))
  );

  // Wizard buttons
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      state.wizardStep = Math.max(0, state.wizardStep - 1);
      renderWizard();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (state.wizardStep < 2) {
        state.wizardStep += 1;
        renderWizard();
      } else {
        gotoPage("vault");
      }
    });
  }

  // Help filter
  const helpSel = document.getElementById("filter");
  if (helpSel) {
    helpSel.addEventListener("change", (e) => {
      state.helpFilter = e.target.value;
      renderHelp();
    });
  }

  // Subtabs
  document.querySelectorAll("[data-cases-tab]").forEach((t) => {
    t.addEventListener("click", () => {
      state.casesTab = t.dataset.casesTab;
      renderCases();
    });
  });
  document.querySelectorAll("[data-trust-tab]").forEach((t) => {
    t.addEventListener("click", () => {
      state.trustTab = t.dataset.trustTab;
      renderTrust();
    });
  });

  // Topbar controls
  const invBtn = document.getElementById("btn-toggle-invisible");
  if (invBtn) invBtn.addEventListener("click", toggleInvisibleMode);

  const emBtn = document.getElementById("btn-toggle-emergency");
  const emDrawer = document.getElementById("emergency-drawer");
  const closeEm = document.getElementById("btn-close-emergency");
  if (emBtn && emDrawer) {
    emBtn.addEventListener("click", () => {
      state.emergencyOpen = !state.emergencyOpen;
      emDrawer.classList.toggle("open", state.emergencyOpen);
      emBtn.classList.toggle("active-toggle", state.emergencyOpen);
    });
  }
  if (closeEm && emDrawer && emBtn) {
    closeEm.addEventListener("click", () => {
      state.emergencyOpen = false;
      emDrawer.classList.remove("open");
      emBtn.classList.remove("active-toggle");
    });
  }

  const exitBtn = document.getElementById("btn-safe-exit");
  if (exitBtn) exitBtn.addEventListener("click", triggerSafeExit);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") triggerSafeExit();
  });

  const closeExit = document.getElementById("btn-close-safe-exit");
  if (closeExit) {
    closeExit.addEventListener("click", () => {
      document.getElementById("safe-exit-modal").classList.remove("open");
      gotoPage("home");
    });
  }

  // Tour controls
  const startTour = document.getElementById("btn-start-tour");
  if (startTour) {
    startTour.addEventListener("click", () => {
      state.tourActive = true;
      state.tourIndex = 0;
      updateTourUI();
    });
  }
  const prevTour = document.getElementById("btn-tour-prev");
  const nextTour = document.getElementById("btn-tour-next");
  const stopTour = document.getElementById("btn-tour-stop");
  if (prevTour) {
    prevTour.addEventListener("click", () => {
      state.tourIndex = (state.tourIndex - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
      updateTourUI();
    });
  }
  if (nextTour) {
    nextTour.addEventListener("click", () => {
      state.tourIndex = (state.tourIndex + 1) % TOUR_STEPS.length;
      updateTourUI();
    });
  }
  if (stopTour) {
    stopTour.addEventListener("click", () => {
      state.tourActive = false;
      updateTourUI();
    });
  }

  // Initial renders
  renderWizard();
  renderHelp();
  renderVault();
  renderBridge();
  renderCases();
  renderTrust();
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", initSignalApp);
}
