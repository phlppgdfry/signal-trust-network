# Start Hier — Leeswijzer voor SIGNAL 4.0

Welkom in de repository van **SIGNAL 4.0 — The Independent Trust Infrastructure**. Omdat SIGNAL op het snijvlak ligt van **maatschappelijke hulpverlening, publiekrecht/AVG, informatiebeveiliging en mensgericht productontwerp**, biedt deze leeswijzer per rol de snelste route door de documentatie.

---

## 1. Kies jouw invalshoek

### A. Voor Hulpverleners, Meldpunten & Maatschappelijke Partners
*Focus: Hoe sluit SIGNAL aan op 1712, ZSG, Unia en het Vlaams Meldpunt zonder dubbel werk of verwarring te creëren?*
1. **[Probleemanalyse & Context](docs/01-visie-en-probleemanalyse/probleemanalyse-en-context.md)** — Waarom mensen vandaag te laat of via sociale media naar buiten treden, en hoe we de drempel verlagen.
2. **[Belgisch & Europees Landschap](docs/01-visie-en-probleemanalyse/belgisch-en-europees-landschap.md)** — Samenwerkingsmodel met bestaande Belgische instanties, inclusief telefonische en fysieke toegangswegen.
3. **[Kerninnovaties: Compass, Bridge, Witness, Guardian & Aftercare](docs/02-product-en-innovaties/kerninnovaties-en-features.md)** — Hoe warme overdracht (`SIGNAL Bridge`) secundaire victimisatie voorkomt en hoe getuigen en minderjarigen apart worden begeleid.

### B. Voor Juristen, DPO's, Ethici & Toezichthouders
*Focus: Hoe voorkom je een illegaal beschuldigingsregister en hoe voldoe je aan artikel 9 en 10 AVG en de EU AI Act?*
1. **[Wat we absoluut NIET bouwen](docs/02-product-en-innovaties/wat-we-niet-bouwen.md)** — De harde rode lijnen tegen publieke schandpalen, automatische conclusies en geloofwaardigheidsscores.
2. **[AVG/GDPR & Rechtsgronden](docs/04-juridisch-en-privacy/avg-gdpr-en-rechtsgronden.md)** — Analyse van art. 6, 9 en 10 AVG, bewaartermijnen, uitzonderingen op gegevenswissing (art. 17 AVG) en rechten van beschuldigde derden (`SIGNAL Fairness`).
3. **[DPIA & Veiligheidskader](docs/04-juridisch-en-privacy/dpia-en-veiligheidskader.md)** — Het 10-punten veiligheidsraamwerk en de verplichte toetsstenen vóór verwerking van echte meldingen.
4. **[AI-kader & EU AI Act](docs/03-architectuur-en-beveiliging/ai-kader-en-eu-ai-act.md)** — Waarom AI nooit over waarheid of schuld oordeelt en hoe we buiten risicovolle autonome besluitvorming blijven.
5. **[De 5 Kernbeslissingen vóór Bouw](docs/04-juridisch-en-privacy/vijf-kernbeslissingen-voor-bouw.md)** — De vijf bestuurlijke en juridische poortbeslissingen.

### C. Voor Software-architecten, Security Engineers & Developers
*Focus: Hoe ontwerp je een systeem waarin zelfs de systeembeheerder geen toegang heeft tot alle dossiers?*
1. **[Systeemarchitectuur](docs/03-architectuur-en-beveiliging/systeemarchitectuur.md)** — De 9 kernmodules, de modulaire monoliet (Next.js + ASP.NET Core + PostgreSQL) en de evolutie naar een federatief netwerk.
2. **[Beveiliging, Cryptografie & Continuity](docs/03-architectuur-en-beveiliging/beveiliging-en-cryptografie.md)** — Gescheiden sleuteldomeinen (KMS/HSM), envelope encryption, SHA-256 bewijsintegriteit, Private Set Intersection (PSI) en het noodprotocol (`SIGNAL Continuity`).
3. **[Data Contracts & SIGNAL Connect API](docs/03-architectuur-en-beveiliging/data-contracts-en-connect-api.md)** — Technische datastructuren voor `Trust Passport`, `Bridge`-overdrachtspakketten en granulair `Consent`.
4. **[Architecture Decision Records (`docs/06-adr/`)](docs/06-adr/ADR-001-federatief-vertrouwensnetwerk-boven-centrale-database.md)** — De 5 fundamentele ontwerpbeslissingen.

### D. Voor Product Designers & Demo-bouwers
*Focus: Hoe vertalen we rust, veiligheid en keuzevrijheid naar de interactieve SIGNAL 4.0-demo?*
1. **[SIGNAL 4.0 Productfamilie](docs/02-product-en-innovaties/signal-4.0-productfamilie.md)** — De 5 lagen (*Discover, Protect, Connect, Act, Improve*) en 6 domeinen (*Compass, Vault, Care, Network, Justice, Impact*).
2. **[SIGNAL 4.0 Demo-specificatie](docs/07-demo-blueprint/signal-4.0-demo-specificatie.md)** — Kleurenpalet (*Deep Trust*, *Human Care*, *Quiet Clarity*), typografie, de 10 interactieve schermen en de klikbare gebruikersreizen.
3. **[Fictieve Scenario-dossiers (`fictieve-scenario-dossiers.json`)](docs/07-demo-blueprint/fictieve-scenario-dossiers.json)** — Kant-en-klare synthetische dataset voor de interactieve demo.

### E. Voor Bestuurders, Fondsen & Beleidsmakers
*Focus: Hoe blijft SIGNAL financieel duurzaam én 100% onafhankelijk van commerciële of politieke druk?*
1. **[Masterplan 2026–2029](MASTERPLAN.md)** — Het totaaloverzicht van visie tot Europese schaalbaarheid.
2. **[Governance & Statutaire Waarborgen](docs/05-governance-en-financiering/governance-en-statutaire-waarborgen.md)** — De 6 governance-organen, de beslissingsmatrix en de 8 onwijzigbare statutaire regels.
3. **[Businessmodel & Budget](docs/05-governance-en-financiering/businessmodel-en-budget.md)** — Het hybride non-profitmodel (45/25/20/10), de muur tussen `SIGNAL Care` en `SIGNAL Institutional`, en de Belgische kostenraming.
4. **[Roadmap & Ethische KPI's](docs/05-governance-en-financiering/roadmap-en-kpis.md)** — Hoe we maatschappelijke impact meten zonder te sturen op het aantal beschuldigingen.

---

## 2. Evolutie van het ontwerp (Versiehistoriek in deze repo)

In dit project zijn vier opeenvolgende ontwerpiteraties samengebracht tot één samenhangende blauwdruk:

| Iteratie | Kernbijdrage | Waar terug te vinden |
|---|---|---|
| **v1.0 — Conceptvoorstel & Masterplan** | Probleemdefinitie, 4 pijlers (*Document, Navigate, Connect, Act*), 8 categorieën, 9 technische modules, governance en non-profit financieringsmodel | [`MASTERPLAN.md`](MASTERPLAN.md), [`docs/01-visie-en-probleemanalyse/`](docs/01-visie-en-probleemanalyse/categorie-analyse-en-fasering.md) |
| **v2.0 — Van Meldformulier naar Trust Network** | Kritische audit van statische meldpunten, 15 verbeterpunten, `SIGNAL Compass`, `SIGNAL Timeline`, `SIGNAL Handshake`, `Trust Passport` en `SIGNAL Continuity` | [`docs/02-product-en-innovaties/kerninnovaties-en-features.md`](docs/02-product-en-innovaties/kerninnovaties-en-features.md) |
| **v3.0 — De 5-Lagen Architectuur** | Ordening in *Discover → Protect → Connect → Act → Improve*, visuele richting (*Deep Trust / Human Care / Quiet Clarity*) en 10-schermen democoncept | [`docs/02-product-en-innovaties/signal-4.0-productfamilie.md`](docs/02-product-en-innovaties/signal-4.0-productfamilie.md) |
| **v4.0 — The Independent Trust Infrastructure** | Verschuiving van "meldingen verzamelen" naar "veilig van onzekerheid naar hulp gaan zonder onnodig dataverlies": `SIGNAL Zero`, `Safe Disclosure` (5 niveaus), `SIGNAL Bridge`, `Witness`, `Guardian`, `Aftercare`, `Fairness` en offline/fysieke toegankelijkheid | Alle documenten + [`docs/07-demo-blueprint/`](docs/07-demo-blueprint/signal-4.0-demo-specificatie.md) |
