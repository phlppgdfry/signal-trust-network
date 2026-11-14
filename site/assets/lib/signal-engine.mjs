/**
 * SIGNAL 4.0 — Core Deterministic Engine & Policy Guardrails
 * Shared between the interactive browser prototype and the Node.js verification test suite.
 * Contains zero external dependencies and stores zero real personal data.
 */

export const SIGNAL_CATEGORIES = [
  {
    id: "pesten-intimidatie-machtsmisbruik",
    name: "Pesten, intimidatie & machtsmisbruik",
    neutralLabel: "Werk- en organisatiecontext A",
    examples: "Psychosociale belasting op het werk, grensoverschrijdend gedrag in sport, onderwijs of verenigingen",
    impact: 5,
    feasibility: 4,
    risk: 4,
    riskLabel: "Hoog",
    wave: 1,
    waveLabel: "Golf 1 — Startdomein (Compass, Timeline & Routering)",
    gdprArticles: ["Art. 6 AVG (Rechtmatige grondslag)", "Welzijnswet Werk ( België)"],
    realityCheck: {
      whatItIs: "Een gestructureerd persoonlijk overzicht om patronen van intimidatie of machtsmisbruik chronologisch vast te leggen vóór een gesprek met een vertrouwenspersoon, preventieadviseur of het Vlaams Meldpunt.",
      whatItIsNot: "Geen formele klacht bij de arbeidsinspectie of externe dienst voor preventie en bescherming op het werk (EDPBW), tenzij je die stap zelf expliciet zet.",
      evidenceTips: [
        "Noteer na elk voorval zo snel mogelijk datum, tijdstip, plaats en wie fysiek aanwezig was.",
        "Houd eigen waarnemingen ('Ik hoorde X zeggen...') strikt gescheiden van wat collega's je achteraf vertelden.",
        "Bewaar originele e-mails of werkroosters inclusief verzendgegevens."
      ]
    },
    recommendedPartners: ["org-vlaams-meldpunt", "org-1712", "org-unia"]
  },
  {
    id: "consumentenmisstanden",
    name: "Consumentenmisstanden & oplichting",
    neutralLabel: "Overeenkomst- en dienstencontext B",
    examples: "Systematische misleiding, wanpraktijken door malafide aannemers, webshops of tussenpersonen",
    impact: 4,
    feasibility: 5,
    risk: 3,
    riskLabel: "Middel tot hoog",
    wave: 1,
    waveLabel: "Golf 1 — Startdomein (Validatie van routering & dossieropbouw)",
    gdprArticles: ["Art. 6 AVG", "Wetboek van Economisch Recht (WER)"],
    realityCheck: {
      whatItIs: "Een heldere bundeling van facturen, beloftes, berichten en betalingsbewijzen om een melding bij de Economische Inspectie of een consumentenombudsdienst voor te bereiden.",
      whatItIsNot: "Geen automatische terugvordering van geld en geen publieke zwarte lijst van ondernemingen.",
      evidenceTips: [
        "Bewaar originele bestelbonnen, offertes, algemene voorwaarden en betalingsbewijzen.",
        "Maak screenshots van online advertenties of beloftes voordat een website offline wordt gehaald.",
        "Noteer het ondernemingsnummer (KBO) indien bekend."
      ]
    },
    recommendedPartners: ["org-meldpunt-concurrentie"]
  },
  {
    id: "bedrijfsfraude-klokkenluiden",
    name: "Bedrijfsfraude & klokkenluiden",
    neutralLabel: "Nalevings- en integriteitscontext C",
    examples: "Corruptie, boekhoudfraude, subsidiemisbruik, ernstige inbreuken op wetgeving",
    impact: 5,
    feasibility: 3,
    risk: 4,
    riskLabel: "Hoog",
    wave: 2,
    waveLabel: "Golf 2 — Uitbreiding met wettelijke klokkenluiderspartners",
    gdprArticles: ["Art. 6 & 10 AVG", "Belgische Klokkenluiderswet (28 nov. 2022)", "EU Richtlijn 2019/1937"],
    realityCheck: {
      whatItIs: "Een veilige voorbereidingsruimte om te controleren welk officieel intern of extern kanaal bevoegd is en om je feitenrelaas te ordenen.",
      whatItIsNot: "LET OP: Een notitie in SIGNAL is géén formele klokkenluidersmelding onder de wet van 28 november 2022. Wettelijke bescherming tegen represailles ontstaat pas wanneer je meldt via een officieel intern kanaal, een bevoegd extern kanaal (zoals de Federale Ombudsman) of onder strikte wettelijke voorwaarden.",
      evidenceTips: [
        "Gebruik nooit een werkcomputer of zakelijk e-mailadres om je oriëntatie te doen.",
        "Neem geen documenten weg op een manier die strafbaar is buiten het kader van de klokkenluiderswet; vraag bij twijfel eerst gratis advies aan het FIRM-IFDH.",
        "Noteer exact welke wettelijke norm of subsidievoorwaarde volgens jou wordt geschonden."
      ]
    },
    recommendedPartners: ["org-ombudsman-firm", "org-meldpunt-concurrentie"]
  },
  {
    id: "discriminatie",
    name: "Discriminatie & uitsluiting",
    neutralLabel: "Gelijke-behandelingscontext D",
    examples: "Racisme, genderdiscriminatie, uitsluiting op basis van handicap, leeftijd, geloof of geaardheid",
    impact: 5,
    feasibility: 4,
    risk: 4,
    riskLabel: "Hoog",
    wave: 2,
    waveLabel: "Golf 2 — Samenwerking met gelijkekanseninstellingen",
    gdprArticles: ["Art. 6 & 9 AVG (Bijzondere categorieën)", "Antidiscriminatiewetgeving"],
    realityCheck: {
      whatItIs: "Een wegwijzer die voor jou uitzoekt welke Belgische instelling (Unia, IGVM of Vlaams Mensenrechteninstituut) bevoegd is en je helpt het vermoeden van discriminatie feitelijk te onderbouwen.",
      whatItIsNot: "Geen formele ingebrekestelling; Unia of het IGVM neemt pas contact op met een tegenpartij na jouw uitdrukkelijke toestemming.",
      evidenceTips: [
        "Leg vast hoe jouw behandeling verschilde van die van een vergelijkbare persoon in dezelfde situatie.",
        "Bewaar schriftelijke afwijzingen, berichten of vacatureteksten.",
        "Als collega's of omstanders de uitspraak hebben gehoord, kunnen zij via SIGNAL Witness een eigen feitelijke waarneming vastleggen."
      ]
    },
    recommendedPartners: ["org-unia", "org-vlaams-meldpunt"]
  },
  {
    id: "online-misbruik",
    name: "Online misbruik, stalking & afpersing",
    neutralLabel: "Digitale veiligheidscontext E",
    examples: "Cyberstalking, doxxing, niet-consensueel delen van intieme beelden, sextortion, bedreiging",
    impact: 4,
    feasibility: 3,
    risk: 4,
    riskLabel: "Hoog",
    wave: 2,
    waveLabel: "Golf 2 — Digitale bewijsvoering & urgente doorverwijzing",
    gdprArticles: ["Art. 6, 9 & 10 AVG", "Strafwetboek (belaging / aantasting seksuele integriteit)"],
    realityCheck: {
      whatItIs: "Praktische hulp om digitaal bewijsmateriaal (URL's, profiel-ID's, tijdstempels) veilig te stellen voordat berichten door de afzender worden gewist.",
      whatItIsNot: "Geen takedown-dienst die zelfstandig accounts op sociale media kan verwijderen; voor verwijdering en strafrechtelijke stappen verwijzen we naar IGVM, Child Focus (voor minderjarigen) en politie.",
      evidenceTips: [
        "Maak screenshots waarop zowel het bericht, de datum/tijd als de volledige gebruikersnaam of URL zichtbaar zijn.",
        "Blokkeer een account bij voorkeur pas nadat je de profiel-URL en berichten veilig hebt vastgelegd.",
        "Betaal nooit bij online afpersing (sextortion) en schakel direct 1712 of de politie in."
      ]
    },
    recommendedPartners: ["org-1712", "org-unia", "org-zsg"]
  },
  {
    id: "milieu-en-veiligheidsmisstanden",
    name: "Milieu- en veiligheidsmisstanden",
    neutralLabel: "Omgevings- en veiligheidsnormen F",
    examples: "Illegale lozingen, gevaarlijke arbeidsomstandigheden, structureel negeren van veiligheidsrisico's",
    impact: 4,
    feasibility: 4,
    risk: 4,
    riskLabel: "Hoog",
    wave: 2,
    waveLabel: "Golf 2 — Routering naar bevoegde inspectie- en ombudsdiensten",
    gdprArticles: ["Art. 6 AVG", "Klokkenluiderswet / Milieuhandhaving"],
    realityCheck: {
      whatItIs: "Hulp bij het identificeren van de juiste omgevings- of arbeidsinspectie en het chronologisch documenteren van veiligheidsrisico's.",
      whatItIsNot: "Bij acuut levensgevaar of een ramp (brand, gaslek, zwaar arbeidsongeval) moet altijd onmiddellijk 112 worden gebeld.",
      evidenceTips: [
        "Noteer datum, tijdstip, exacte locatie en weers- of werkomstandigheden.",
        "Maak onderscheid tussen een eenmalige fout en een structurele instructie om veiligheidsregels te negeren."
      ]
    },
    recommendedPartners: ["org-ombudsman-firm", "org-meldpunt-concurrentie"]
  },
  {
    id: "seksueel-grensoverschrijdend-gedrag",
    name: "Seksueel grensoverschrijdend gedrag",
    neutralLabel: "Persoonlijke integriteitscontext G",
    examples: "Aanranding, dwang, ongewenst seksueel gedrag, misbruik van afhankelijkheidsrelatie",
    impact: 5,
    feasibility: 2,
    risk: 5,
    riskLabel: "Zeer hoog (Art. 9 & 10 AVG)",
    wave: 3,
    waveLabel: "Golf 3 — Hoogste beschermingsgraad (Enkel met erkende zorgpartners & na DPIA)",
    gdprArticles: ["Art. 9 AVG (Seksueel gedrag/gezondheid)", "Art. 10 AVG (Strafbare feiten)"],
    realityCheck: {
      whatItIs: "Een rustige, niet-oordelende plek om direct de weg te vinden naar een Zorgcentrum na Seksueel Geweld (ZSG) of 1712, of om op je eigen tempo voor jezelf te documenteren.",
      whatItIsNot: "Geen vervanging van medische/forensische opvang of politie. Belangrijk: in een Zorgcentrum na Seksueel Geweld (ZSG) kun je tot 7 dagen na de feiten (liefst binnen 72 uur) gratis medische zorg krijgen én forensisch bewijs laten bewaren zonder dat je meteen aangifte bij de politie hoeft te doen.",
      evidenceTips: [
        "Als het voorval minder dan 72 uur tot 7 dagen geleden plaatsvond: neem indien mogelijk direct contact op met een Zorgcentrum na Seksueel Geweld (ZSG) voor medische zorg en sporenonderzoek.",
        "Bewaar kleding of berichten indien mogelijk ongewijzigd.",
        "Schrijf op je eigen tempo op wat je je herinnert; geef gerust aan welke details je zeker weet en welke onzeker zijn."
      ]
    },
    recommendedPartners: ["org-zsg", "org-1712", "org-vlaams-meldpunt"]
  },
  {
    id: "institutionele-misstanden",
    name: "Institutionele misstanden (zorg, onderwijs, jeugd)",
    neutralLabel: "Institutionele zorgcontext H",
    examples: "Structureel misbruik, verwaarlozing of machtsmisbruik binnen zorg, onderwijs of overheid",
    impact: 5,
    feasibility: 2,
    risk: 5,
    riskLabel: "Zeer hoog (Art. 9 & 10 AVG · SIGNAL Guardian)",
    wave: 3,
    waveLabel: "Golf 3 — Gespecialiseerde menselijke intake & kwetsbare groepen",
    gdprArticles: ["Art. 9 & 10 AVG", "Jeugdbescherming & Zorginspectie"],
    realityCheck: {
      whatItIs: "Extra beschermde oriëntatie (inclusief SIGNAL Guardian voor minderjarigen en afhankelijke personen) naar onafhankelijke hulplijnen en toezichthouders buiten de betrokken instelling om.",
      whatItIsNot: "Geen intern klachtenformulier van de instelling zelf: de betrokken instelling krijgt nooit inzage in jouw oriëntatie op SIGNAL.",
      evidenceTips: [
        "Je hoeft niet eerst intern te klagen bij de persoon over wie het gaat als je je onveilig voelt.",
        "Neem bij twijfel over een minderjarige of kwetsbare persoon altijd eerst anoniem contact op met 1712."
      ]
    },
    recommendedPartners: ["org-1712", "org-vlaams-meldpunt", "org-ombudsman-firm"]
  }
];

export const PARTNER_PASSPORTS = [
  {
    organizationId: "org-1712",
    name: "1712 — Hulplijn Geweld, Misbruik & Kindermishandeling",
    shortName: "1712 Hulplijn",
    jurisdiction: "BE-Vlaanderen & Brussel",
    verificationStatus: "verified_statutory",
    badgeText: "Wettelijk Erkende Hulplijn",
    supportedCategories: [
      "seksueel-grensoverschrijdend-gedrag",
      "pesten-intimidatie-machtsmisbruik",
      "institutionele-misstanden",
      "online-misbruik"
    ],
    legalBasisSummary: "Door de Vlaamse overheid erkende en gefinancierde professionele hulplijn voor elke burger (slachtoffer, getuige of betrokkene) met vragen over geweld, misbruik en kindermishandeling.",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Beroepsgeheim (art. 458 Strafwetboek)",
      allowsAnonymousContact: true,
      dataControllerName: "Samenwerkingsverband CAW & Vertrouwenscentra Kindermishandeling",
      dpoVerified: true,
      retentionPolicySummary: "Volledig anoniem bellen of chatten mogelijk; geen informatie wordt gedeeld met politie of derden zonder jouw medeweten, behalve bij wettelijke noodtoestand."
    },
    independentOversightBody: "Departement Zorg (Vlaamse Overheid)",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "1712 (gratis & onzichtbaar op factuur)",
      physicalIntakePossible: true,
      emergency24x7: false,
      hours: "Telefonisch & chat op werkdagen; doorverwijzing via CAW"
    },
    lastAuditedAt: "2026-10-15"
  },
  {
    organizationId: "org-zsg",
    name: "Zorgcentra na Seksueel Geweld (ZSG)",
    shortName: "Zorgcentra Seksueel Geweld (ZSG)",
    jurisdiction: "BE-Federaal (10 ziekenhuiscentra in België)",
    verificationStatus: "verified_statutory",
    badgeText: "24/7 Medische, Psychische & Forensische Opvang",
    supportedCategories: ["seksueel-grensoverschrijdend-gedrag"],
    legalBasisSummary: "Federaal gecoördineerde centra (IGVM & FOD Volksgezondheid) waar slachtoffers op één plek terechtkunnen voor medische zorg, psychologische steun, forensisch sporenonderzoek en — enkel indien gewenst — een gesprek met gespecialiseerde zedeninspecteurs.",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Medisch & professioneel beroepsgeheim (art. 458 Sw.)",
      allowsAnonymousContact: false,
      dataControllerName: "Erkend Ziekenhuis van de betreffende ZSG-locatie",
      dpoVerified: true,
      retentionPolicySummary: "Forensisch bewijsmateriaal wordt beveiligd bewaard zonder dat je verplicht bent om meteen aangifte bij de politie te doen."
    },
    independentOversightBody: "Instituut voor de gelijkheid van vrouwen en mannen (IGVM) & FOD Volksgezondheid",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "24/7 bereikbaar via de 10 ZSG-ziekenhuizen",
      physicalIntakePossible: true,
      emergency24x7: true,
      hours: "24 uur op 24, 7 dagen op 7"
    },
    lastAuditedAt: "2026-10-20"
  },
  {
    organizationId: "org-vlaams-meldpunt",
    name: "Vlaams Meldpunt Grensoverschrijdend Gedrag",
    shortName: "Vlaams Meldpunt (VMRI)",
    jurisdiction: "BE-Vlaanderen",
    verificationStatus: "verified_statutory",
    badgeText: "Onafhankelijke Publieke Instelling",
    supportedCategories: [
      "pesten-intimidatie-machtsmisbruik",
      "seksueel-grensoverschrijdend-gedrag",
      "institutionele-misstanden"
    ],
    legalBasisSummary: "Onafhankelijk meldpunt ondergebracht bij het Vlaams Mensenrechteninstituut (VMRI) voor grensoverschrijdend gedrag binnen Vlaamse sectoren en organisaties (sport, cultuur, onderwijs, jeugd, welzijn, media).",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Wettelijke geheimhoudingsplicht (Decreet VMRI)",
      allowsAnonymousContact: true,
      dataControllerName: "Vlaams Mensenrechteninstituut (VMRI)",
      dpoVerified: true,
      retentionPolicySummary: "Er wordt nooit contact opgenomen met de betrokken organisatie of persoon zonder jouw uitdrukkelijke toestemming."
    },
    independentOversightBody: "Vlaams Parlement",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "0800 20 808 (gratis)",
      physicalIntakePossible: true,
      emergency24x7: false,
      hours: "Werkdagen + persoonlijke afspraak mogelijk"
    },
    lastAuditedAt: "2026-11-01"
  },
  {
    organizationId: "org-unia",
    name: "Unia / IGVM / Vlaams Mensenrechteninstituut",
    shortName: "Unia & Gelijkekanseninstellingen",
    jurisdiction: "BE-Federaal & Gewesten",
    verificationStatus: "verified_statutory",
    badgeText: "Wettelijk Gelijkekansencentrum",
    supportedCategories: [
      "discriminatie",
      "pesten-intimidatie-machtsmisbruik",
      "online-misbruik"
    ],
    legalBasisSummary: "Onafhankelijke openbare instellingen bevoegd voor het bestrijden van discriminatie, haatboodschappen en ongelijke behandeling (Unia, het Instituut voor de gelijkheid van vrouwen en mannen, en het VMRI).",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Wettelijke vertrouwelijkheid & AVG-waarborg",
      allowsAnonymousContact: true,
      dataControllerName: "Unia / IGVM / VMRI (afhankelijk van bevoegdheidsgrond)",
      dpoVerified: true,
      retentionPolicySummary: "Meldingen worden vertrouwelijk geanalyseerd; bemiddeling of juridische stappen gebeuren enkel met akkoord van de melder."
    },
    independentOversightBody: "Parlementair toezicht & Onafhankelijke Raad van Bestuur",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "0800 12 800 (gratis)",
      physicalIntakePossible: true,
      emergency24x7: false,
      hours: "Telefonisch, digitaal en via lokale contactpunten"
    },
    lastAuditedAt: "2026-10-18"
  },
  {
    organizationId: "org-ombudsman-firm",
    name: "Federale Ombudsman & FIRM-IFDH (Klokkenluiders)",
    shortName: "Federale Ombudsman & FIRM-IFDH",
    jurisdiction: "BE-Federaal",
    verificationStatus: "verified_statutory",
    badgeText: "Wettelijk Extern Klokkenluiderskanaal",
    supportedCategories: [
      "bedrijfsfraude-klokkenluiden",
      "milieu-en-veiligheidsmisstanden",
      "institutionele-misstanden"
    ],
    legalBasisSummary: "De Federale Ombudsman coördineert externe klokkenluidersmeldingen onder de Wet van 28 november 2022; het FIRM-IFDH biedt onafhankelijke juridische, psychologische en sociale ondersteuning aan klokkenluiders.",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Strikte geheimhoudingsplicht (Klokkenluiderswet art. 20)",
      allowsAnonymousContact: true,
      dataControllerName: "Federale Ombudsman / FIRM-IFDH",
      dpoVerified: true,
      retentionPolicySummary: "De identiteit van de klokkenluider mag nooit zonder diens uitdrukkelijke en vrije toestemming worden bekendgemaakt aan derden."
    },
    independentOversightBody: "Kamer van Volksvertegenwoordigers",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "0800 99 961",
      physicalIntakePossible: true,
      emergency24x7: false,
      hours: "Beveiligd kanaal, telefonisch en persoonlijk onderhoud"
    },
    lastAuditedAt: "2026-10-25"
  },
  {
    organizationId: "org-meldpunt-concurrentie",
    name: "Meldpunt voor een Eerlijke Concurrentie & Economische Inspectie",
    shortName: "Meldpunt Eerlijke Concurrentie",
    jurisdiction: "BE-Federaal",
    verificationStatus: "verified_statutory",
    badgeText: "Federaal Inspectieloket",
    supportedCategories: [
      "consumentenmisstanden",
      "bedrijfsfraude-klokkenluiden",
      "milieu-en-veiligheidsmisstanden"
    ],
    legalBasisSummary: "Officieel federaal meldpunt dat consumentenbedrog, sociale fraude en oneerlijke handelspraktijken doorstuurt naar de bevoegde inspectiedienst (FOD Economie, SIOD, FAVV).",
    confidentialityRegime: {
      professionalSecrecy: true,
      secrecyArticle: "Geheimhoudingsplicht sociale en economische inspecteurs",
      allowsAnonymousContact: false,
      dataControllerName: "FOD Economie / SIOD",
      dpoVerified: true,
      retentionPolicySummary: "Inspectiediensten maken de naam van een melder niet bekend aan de gecontroleerde onderneming."
    },
    independentOversightBody: "FOD Economie / Federale Overheid",
    accessChannels: {
      bridgeApiEnabled: true,
      phoneNumber: "Contactcentrum FOD Economie: 0800 120 33",
      physicalIntakePossible: false,
      emergency24x7: false,
      hours: "24/7 digitaal loket + telefonisch op werkdagen"
    },
    lastAuditedAt: "2026-10-12"
  }
];

export const FORBIDDEN_ANTI_FEATURES = [
  {
    id: "no-public-registry",
    title: "Geen publieke namenlijsten, kaarten of rankings van beschuldigden",
    reason: "Schendt het vermoeden van onschuld, artikel 9/10 AVG en lasterwetgeving; vernietigt levens zonder rechterlijke toetsing.",
    signalAlternative: "Individueel versleutelde kluis en gecontroleerde overdracht (SIGNAL Bridge) uitsluitend naar wettelijk bevoegde instanties."
  },
  {
    id: "no-accusation-counter",
    title: "Geen publieke of semi-publieke teller ('Al 4 meldingen over X')",
    reason: "Lokt gecoördineerde lastercampagnes en beïnvloeding uit en wekt ten onrechte de indruk van bewezen schuld.",
    signalAlternative: "Safe Matching is standaard uitgeschakeld en werkt in Fase 3 uitsluitend onzichtbaar met verplichte menselijke vierogencontrole."
  },
  {
    id: "no-ai-lie-detector",
    title: "Geen AI-geloofwaardigheidsscore, leugendetector of emotieanalyse",
    reason: "Wetenschappelijk onhoudbaar bij trauma en verboden/hoog-risico onder de EU AI Act.",
    signalAlternative: "AI helpt uitsluitend bij B1-taal en chronologische ordening, met 100% ongewijzigd behoud van de originele getuigenis."
  },
  {
    id: "no-victim-groupchats",
    title: "Geen openbare groepsdossiers of groepschats tussen melders",
    reason: "Veroorzaakt geheugenbesmetting (memory contamination), waardoor getuigenverklaringen in een latere strafzaak onderuitgehaald kunnen worden.",
    signalAlternative: "SIGNAL Handshake en Collective verlopen altijd via individuele begeleiding en een gemachtigde advocaat."
  },
  {
    id: "no-auto-match-ping",
    title: "Geen automatische contactverzoeken of match-meldingen",
    reason: "Maakt fishing-aanvallen mogelijk waarbij een pleger zelf testmeldingen indient om te ontdekken of een slachtoffer al heeft gemeld.",
    signalAlternative: "Asymmetrische menselijke beoordeling (vierogenprincipe) zonder enige automatische terugkoppeling."
  },
  {
    id: "no-gamification",
    title: "Geen gamification, badges of beloningen voor melden",
    reason: "Ernstige mistoestanden mogen nooit worden geprikkeld met spelmechanismen die valse meldingen aanwakkeren.",
    signalAlternative: "Rustige, neutrale en niet-sturende vormgeving (Quiet Clarity)."
  },
  {
    id: "no-false-erasure-promise",
    title: "Geen valse belofte van '100% onmiddellijke wissing overal na overdracht'",
    reason: "Zodra gegevens aan een externe bevoegde instantie zijn overgedragen, gelden de wettelijke bewaarplichten en uitzonderingen van art. 17 lid 3 AVG.",
    signalAlternative: "Volledige transparantie in het Consent Center vóórdat een gebruiker op verzenden drukt in SIGNAL Bridge."
  }
];

/**
 * Deterministic SIGNAL Compass routing function.
 * Never uses generative AI to guess legal competence; always returns auditable rules.
 */
export function evaluateCompassRoute({
  need = "explore",
  categoryIds = ["pesten-intimidatie-machtsmisbruik"],
  roleContext = "direct_reporter", // "direct_reporter" | "witness" | "minor_guardian" | "urgent_danger"
  recentIncidentUnder72h = false
}) {
  const selectedIds = Array.isArray(categoryIds) && categoryIds.length > 0
    ? categoryIds
    : ["pesten-intimidatie-machtsmisbruik"];

  const matchedCategories = SIGNAL_CATEGORIES.filter((c) => selectedIds.includes(c.id));
  const partnerIdSet = new Set();

  for (const cat of matchedCategories) {
    for (const pid of cat.recommendedPartners) {
      partnerIdSet.add(pid);
    }
  }

  // Context-specific mandatory routing rules
  const urgentAlerts = [];
  if (roleContext === "urgent_danger") {
    urgentAlerts.push({
      type: "immediate_emergency",
      title: "Acuut fysiek gevaar: bel onmiddellijk 101 of 112",
      message: "SIGNAL is geen live meldkamer en kan niet ter plaatse ingrijpen. Breng jezelf eerst in veiligheid en bel 101 (Politie) of 112 (Medische spoed)."
    });
    partnerIdSet.add("org-1712");
  }

  if (selectedIds.includes("seksueel-grensoverschrijdend-gedrag") || recentIncidentUnder72h) {
    partnerIdSet.add("org-zsg");
    if (recentIncidentUnder72h) {
      urgentAlerts.push({
        type: "forensic_window",
        title: "Belangrijk binnen 72 uur tot 7 dagen: Zorgcentrum na Seksueel Geweld (ZSG)",
        message: "Bij een ZSG kun je 24/7 terecht voor gratis medische zorg, psychologische opvang én het laten afnemen en bewaren van forensisch sporenmateriaal — zonder dat je nu al hoeft te beslissen of je aangifte doet bij de politie."
      });
    }
  }

  if (roleContext === "minor_guardian") {
    partnerIdSet.add("org-1712");
    urgentAlerts.push({
      type: "guardian_protection",
      title: "SIGNAL Guardian Protocol (Minderjarigen & Kwetsbare Personen)",
      message: "Voor minderjarigen gelden extra beschermingsregels. Je kunt volledig gratis en anoniem starten met een gesprek bij 1712 of een Vertrouwenscentrum Kindermishandeling."
    });
  }

  let witnessGuidance = null;
  if (roleContext === "witness") {
    witnessGuidance = {
      protocol: "SIGNAL Witness Route",
      rule: "Als getuige, collega of omstander leg je uitsluitend vast wat je zelf rechtstreeks hebt gezien of gehoord. Geruchten van derden worden strikt gescheiden gehouden om bewijsvervuiling te voorkomen."
    };
  }

  // Order partners so ZSG and 1712 appear first when relevant
  const recommendedPartners = PARTNER_PASSPORTS.filter((p) => partnerIdSet.has(p.organizationId));

  // Determine recommended Safe Disclosure starting level
  let recommendedDisclosureLevel = 1;
  if (need === "document_privately") recommendedDisclosureLevel = 2;
  if (need === "talk_to_human") recommendedDisclosureLevel = 3;
  if (need === "prepare_official" || need === "check_patterns") recommendedDisclosureLevel = 4;

  return {
    deterministicEngine: true,
    aiUsedForRoutingDecision: false,
    selectedCategoryIds: selectedIds,
    matchedCategories,
    roleContext,
    recommendedDisclosureLevel,
    urgentAlerts,
    witnessGuidance,
    recommendedPartners,
    combinedEvidenceTips: Array.from(
      new Set(matchedCategories.flatMap((c) => c.realityCheck.evidenceTips))
    )
  };
}

/**
 * Adds an addendum to a timeline entry without mutating or overwriting the original narrative.
 * Enforces the Raw Testimony Preservation invariant (ADR-003).
 */
export function createTimelineAddendum(existingEntries, parentEntryId, addendumText, createdAtIso) {
  const parent = existingEntries.find((e) => e.entryId === parentEntryId);
  if (!parent) {
    throw new Error(`Parent entry ${parentEntryId} not found`);
  }
  const newEntry = {
    entryId: `tl-add-${Date.now()}`,
    createdAt: createdAtIso || new Date().toISOString(),
    incidentDateOrPeriod: parent.incidentDateOrPeriod,
    entryType: "addendum_correction",
    certainty: "exact",
    title: `Aanvulling op: ${parent.title}`,
    rawUserNarrative: addendumText.trim(),
    categories: [...parent.categories],
    parentEntryId: parent.entryId,
    preservesOriginalUntouched: true
  };
  return [...existingEntries, newEntry];
}

/**
 * Validates and constructs a SIGNAL Bridge handover package.
 * Enforces explicit consent and verifies the recipient organization's Trust Passport.
 */
export function buildBridgeHandoverPackage({
  dossierId,
  timelineEntries,
  selectedEntryIds,
  recipientOrganizationId,
  disclosureLevel = "pseudonymous_bridge",
  userExpectationGoal = "listening_and_advice",
  understandsNotAutomaticPoliceReport = false,
  revocabilityScopeExplained = false
}) {
  if (!understandsNotAutomaticPoliceReport || !revocabilityScopeExplained) {
    throw new Error(
      "SIGNAL Bridge vereist expliciete geïnformeerde toestemming over wat de overdracht juridisch wel en niet betekent."
    );
  }
  const partner = PARTNER_PASSPORTS.find((p) => p.organizationId === recipientOrganizationId);
  if (!partner) {
    throw new Error(`Onbekende of niet-geverifieerde partnerorganisatie: ${recipientOrganizationId}`);
  }
  const includedEntries = timelineEntries.filter((e) => selectedEntryIds.includes(e.entryId));
  if (includedEntries.length === 0) {
    throw new Error("Selecteer ten minste één tijdlijnitem om in het overdrachtspakket op te nemen.");
  }

  const excludedCount = timelineEntries.length - includedEntries.length;
  const tokenSuffix = Math.abs(
    includedEntries.reduce((acc, item) => acc + item.entryId.charCodeAt(item.entryId.length - 1) * 137, 4096)
  )
    .toString(16)
    .toUpperCase()
    .slice(0, 6);

  return {
    handoverId: `brg-2026-${tokenSuffix}`,
    bridgePhysicalToken: `SIG-BE-${tokenSuffix}`,
    createdAt: new Date().toISOString(),
    dossierId,
    recipientOrganization: {
      organizationId: partner.organizationId,
      name: partner.name,
      dataControllerName: partner.confidentialityRegime.dataControllerName,
      secrecyRegime: partner.confidentialityRegime.secrecyArticle
    },
    disclosureLevel,
    userExpectationGoal,
    includedEntryCount: includedEntries.length,
    excludedPrivateEntryCount: excludedCount,
    includedEntryIds: includedEntries.map((e) => e.entryId),
    consentReceipt: {
      understandsNotAutomaticPoliceReport: true,
      revocabilityScopeExplained: true,
      gdprArticle17Notice:
        "Je eigen Private Vault blijft altijd door jou wisbaar. Na verzending valt het overgedragen pakket bij de gekozen partner onder diens wettelijke bewaartermijn en beroepsgeheim."
    },
    deliveryStatus: "received_by_partner"
  };
}

/**
 * Evaluates a simulated Fase 3 Handshake review under strict ADR-002 and SIGNAL Fairness rules.
 * Guarantees that automated notifications and automatic identity sharing are ALWAYS false.
 */
export function evaluateHandshakeSafety({
  mvpPhase = 1,
  legalBasisApproved = false,
  reviewerOneApproved = false,
  reviewerTwoApproved = false,
  isHearsayOrCopycat = false,
  possibleNamesakeRisk = false,
  reporterOneIndividualConsent = false,
  reporterTwoIndividualConsent = false
}) {
  // Hard invariant: never send automatic match alerts to users
  const baseInvariants = {
    automatedNotificationSentToReporters: false,
    publicAccusationCounterIncremented: false,
    aiCredibilityScoreUsed: false
  };

  if (mvpPhase < 3 || !legalBasisApproved) {
    return {
      ...baseInvariants,
      status: "disabled_by_default_adr_002",
      canProceedToHandshake: false,
      canProceedToCollective: false,
      reason: "Safe Matching is technisch uitgeschakeld totdat aan alle art. 9/10 AVG-voorwaarden, DPIA en Fase 3-goedkeuring is voldaan."
    };
  }

  if (isHearsayOrCopycat || possibleNamesakeRisk) {
    return {
      ...baseInvariants,
      status: "blocked_by_signal_fairness",
      canProceedToHandshake: false,
      canProceedToCollective: false,
      reason: isHearsayOrCopycat
        ? "Geblokkeerd door SIGNAL Fairness: verklaring berust op gerucht van derden of gekopieerd verhaal, niet op onafhankelijke eigen waarneming."
        : "Geblokkeerd door SIGNAL Fairness: risico op naamgenoot / onvoldoende unieke context."
    };
  }

  if (!reviewerOneApproved || !reviewerTwoApproved) {
    return {
      ...baseInvariants,
      status: "awaiting_four_eyes_human_review",
      canProceedToHandshake: false,
      canProceedToCollective: false,
      reason: "Verplichte menselijke vierogencontrole (2 onafhankelijke beoordelaars) is nog niet voltooid."
    };
  }

  if (!reporterOneIndividualConsent || !reporterTwoIndividualConsent) {
    return {
      ...baseInvariants,
      status: "individual_counseling_handshake_stage",
      canProceedToHandshake: true,
      canProceedToCollective: false,
      identitiesSharedBetweenReporters: false,
      reason: "Beide melders worden afzonderlijk begeleid door een vertrouwenspersoon zonder dat identiteiten of verhalen onderling worden gedeeld."
    };
  }

  return {
    ...baseInvariants,
    status: "transferred_to_legal_collective_coordinator",
    canProceedToHandshake: true,
    canProceedToCollective: true,
    identitiesSharedBetweenReporters: false,
    directVictimGroupChatCreated: false,
    reason: "Beide melders hebben na individueel juridisch advies vrijwillig ingestemd met gecoördineerde opvolging via een gemachtigde advocaat/organisatie (zonder groepschat om geheugenbesmetting te voorkomen)."
  };
}

/**
 * Enforces the Golden Architecture Rule:
 * Platform administrators cannot read vault contents; only the vault owner or a specifically
 * authorized partner caseworker for an explicitly bridged package can access the package.
 */
export function checkDossierAccessAuthorization({
  actorRole, // "vault_owner" | "platform_sysadmin" | "partner_caseworker" | "sponsor_or_b2b_client"
  actorOrganizationId = null,
  bridgedToOrganizationId = null
}) {
  if (actorRole === "vault_owner") {
    return {
      allowed: true,
      scope: "full_private_vault",
      reason: "Gebruiker heeft met eigen sleutel toegang tot de persoonlijke Private Vault."
    };
  }

  if (actorRole === "platform_sysadmin") {
    return {
      allowed: false,
      scope: "none",
      auditAlert: "BLOCKED_GOLDEN_RULE_SYSADMIN_READ_ATTEMPT",
      reason: "Gouden Architectuurregel: systeem- en platformbeheerders hebben geen sleutel- of leesrechten op inhoudelijke dossiers."
    };
  }

  if (actorRole === "sponsor_or_b2b_client") {
    return {
      allowed: false,
      scope: "none",
      auditAlert: "BLOCKED_STATUTORY_RULE_4_EXTERNAL_PARTY",
      reason: "Statutaire Onafhankelijkheidsregel 4 & ADR-004: financiers of SIGNAL Institutional-klanten hebben nul toegang tot meldingen."
    };
  }

  if (actorRole === "partner_caseworker") {
    if (actorOrganizationId && actorOrganizationId === bridgedToOrganizationId) {
      return {
        allowed: true,
        scope: "bridged_package_only",
        reason: `Gemachtigde behandelaar van ${actorOrganizationId} heeft uitsluitend toegang tot het door de melder geselecteerde SIGNAL Bridge-overdrachtspakket.`
      };
    }
    return {
      allowed: false,
      scope: "none",
      auditAlert: "BLOCKED_CROSS_TENANT_PARTNER_ACCESS",
      reason: "Behandelaar heeft alleen toegang tot dossiers die via SIGNAL Bridge specifiek aan zijn/haar eigen organisatie zijn overgedragen."
    };
  }

  return {
    allowed: false,
    scope: "none",
    reason: "Onbekende rol; standaard geweigerd (Zero Trust)."
  };
}
