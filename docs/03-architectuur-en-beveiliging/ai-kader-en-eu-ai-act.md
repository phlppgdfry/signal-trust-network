# AI binnen SIGNAL: Nuttig als Assistent, Verboden als Rechter

Kunstmatige intelligentie kan binnen SIGNAL een grote meerwaarde bieden voor toegankelijkheid en overzicht, mits de rol van AI **streng en ondubbelzinnig begrensd** is.

---

## 1. Drie Categorieën van AI-gebruik binnen SIGNAL

| Categorie | Toepassingen | Voorwaarden & Status |
|---|---|---|
| **1. Geschikte & Veilige AI-toepassingen (Groen)** | - **Toegankelijk taalgebruik (B1):** Ingewikkelde juridische procedures (zoals de klokkenluiderswet of de werking van een ZSG) uitleggen op het taalniveau van de bezoeker.<br/>- **Vertaling:** Hulpinformatie en wegwijzers vertalen voor anderstalige melders.<br/>- **Openbare wegwijzerhulp:** Op basis van algemene, niet-identificeerbare zoektermen de juiste publieke hulplijn tonen.<br/>- **Optionele tijdlijn-structurering:** De gebruiker helpen om een eigen tekstconcept om te zetten in een chronologische lijst van datum + gebeurtenis, waarbij de originele tekst altijd ongewijzigd bewaard blijft. | Toegestaan in een geïsoleerde omgeving, uitsluitend op openbare informatie of op niet-gevoelige tekst die de gebruiker expliciet selecteert. |
| **2. Voorwaardelijke Toepassingen (Oranje)** | - **Ondersteuning voor professionele behandelaars:** Samenvatten van een reeds via `SIGNAL Bridge` overgedragen dossier voor een erkende casemanager.<br/>- **Semantische ondersteuning bij patrooncontrole:** Herkennen van spelvarianten of organisatorische verbanden binnen het gemachtigde reviewteam. | **Alleen na afzonderlijke juridische, beveiligings- en kwaliteitstoets (DPIA + EU AI Act High-Risk Assessment).** Vereist EU-gehoste modellen met *zero data retention* en verplichte menselijke eindverantwoordelijkheid (*human-in-the-loop*). |
| **3. Absoluut Verboden Toepassingen (Rood)** | - **Leugendetector of geloofwaardigheidsscore:** Beoordelen of een getuigenis "waar" of "verzonnen" klinkt.<br/>- **Automatische schuld- of risicoscore:** Personen of organisaties een risicoscore toekennen op basis van onbewezen meldingen.<br/>- **Emotie- of sentimentanalyse op slachtoffers:** Afleiden uit toon of schrijfstijl hoe ernstig een trauma is.<br/>- **Autonome AI-onderzoeker:** Een AI-agent die zelfstandig op internet naar beschuldigden zoekt of betrokkenen benadert. | **Statutair en technisch verboden.** Wordt nooit gebouwd of onderzocht. |

---

## 2. Toetsing aan de Europese AI-verordening (EU AI Act)

De **EU AI Act (Verordening (EU) 2024/1689)** stelt strenge eisen aan AI-systemen, met specifieke verboden praktijken (Artikel 5, zoals bepaalde vormen van emotieherkenning en *social scoring*) en **hoog-risicocategorieën (Bijlage III)**, waaronder:
- Systemen die worden gebruikt voor het beoordelen van de betrouwbaarheid van bewijsmateriaal tijdens opsporing of vervolging;
- Systemen die de toegang tot essentiële publieke en maatschappelijke diensten bepalen;
- Systemen binnen rechtspleging en democratische processen.

### Onze ontwerpstrategie voor EU AI Act-naleving:
1. **Buiten de Hoog-Risico Besluitvorming blijven in het Kernplatform:**
   In `SIGNAL Compass` en `SIGNAL Vault` neemt AI **geen enkele beslissing** over wie hulp krijgt, wie geloofd wordt of welk dossier voorrang krijgt. De routeringsregels in `SIGNAL Compass` zijn **deterministisch en door juristen en hulpverleners gecontroleerd**, zodat elke doorverwijzing naar bijv. `1712`, een `ZSG` of `Unia` 100% uitlegbaar en voorspelbaar is.
2. **Geen Afhankelijkheid van Externe AI-providers voor Kernfuncties:**
   Het platform moet volledig blijven werken als alle AI-functies zijn uitgeschakeld. Geen enkele vertrouwelijke melding mag voor haar verwerking of opslag afhankelijk zijn van een commerciële externe LLM-API.
3. **Behoud van het Oorspronkelijke Verhaal (*Raw Testimony Preservation*):**
   Als een gebruiker in zijn kluis gebruikmaakt van een schrijfhulp om zijn gedachten chronologisch te ordenen, bewaart `SIGNAL Timeline` **altijd** de onbewerkte tekst van de gebruiker als primair document. Een advocaat of onderzoeker kan daardoor nooit beweren dat een AI de getuigenis heeft geformuleerd of gekleurd.
