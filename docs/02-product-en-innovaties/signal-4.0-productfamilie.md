# SIGNAL 4.0 Productfamilie: Vijf Lagen & Zes Domeinen

## 1. Strategische Keuze: Waarom een Federatief Vertrouwensnetwerk?

Tijdens het ontwerp van SIGNAL zijn drie fundamentele productmodellen tegen elkaar afgewogen:

| Model | Omschrijving | Voordeel | Zwakte | Ons Oordeel |
|---|---|---|---|---|
| **Optie A — SIGNAL Reports** *(Centraal Meldplatform)* | Eén centrale website waar iedereen klachten, bewijzen en namen van beschuldigden uploadt voor centrale matching. | Eenvoudig uit te leggen aan gebruikers. | Enorme privacy-, laster- en beveiligingsrisico's; één centraal doelwit voor aanvallers; botst snel met art. 9 en 10 AVG. | **Afgewezen als eindmodel.** |
| **Optie B — SIGNAL Compass** *(Intelligente Wegwijzer)* | Een slimme, anonieme beslisboom die gebruikers naar bestaande Belgische hulplijnen en meldpunten leidt. | Zeer snel, veilig en zonder zware persoonsgegevens te lanceren. | Zonder persoonlijke documentatie en warme overdracht blijft het gat tussen "informatie lezen" en "echt geholpen worden" te groot. | **Ideaal als Fase 1 / Startproduct.** |
| **Optie C — SIGNAL Network** *(Federatief Vertrouwensnetwerk)* | Combineert anonieme oriëntatie (`Compass`), persoonlijke kluis (`Vault`) en gecontroleerde samenwerking/overdracht met bestaande erkende organisaties (`Bridge` & `Network`). | Maximale maatschappelijke impact zonder dat één partij eigenaar wordt van alle gevoelige dossiers. | Technisch en organisatorisch het meest ambitieus. | **Gekozen langetermijnarchitectuur (SIGNAL 4.0).** |

---

## 2. De Vijf Lagen van SIGNAL (Architectuurmodel v3.0 → v4.0)

Elke interactie binnen SIGNAL volgt vijf duidelijk gescheiden vertrouwenslagen:

### Laag 1 — DISCOVER (Verkennen zonder drempel)
*Doel: Zekerheid en richting geven zonder dat de gebruiker ook maar één persoonsgegeven hoeft achter te laten.*
- **`SIGNAL Zero`:** Volledige toegang tot oriëntatie, definities en hulproutes zonder account, e-mailadres of tracking.
- **`SIGNAL Compass`:** Vraagt niet *"Welke klacht wil je indienen?"*, maar *"Wat heb je op dit moment nodig?"*.
- **`SIGNAL Reality Check`:** Eerlijke, neutrale uitleg over wat een stap juridisch wel en niet betekent (bijv. verschil tussen een privénotitie, een melding bij een vertrouwenspersoon en een aangifte bij de politie).
- **`SIGNAL Evidence Coach`:** Praktische gids over hoe je berichten, screenshots, e-mailheaders en tijdlijnen veilig en rechtmatig bewaart.

### Laag 2 — PROTECT (Persoonlijk vastleggen & beschermen)
*Doel: Een veilige ruimte bieden om op eigen tempo ervaringen te ordenen voordat men beslist wat men ermee wil doen.*
- **`Safe Exit` & `SIGNAL Invisible`:** Discrete weergave voor mensen op een gecontroleerd toestel, geen gevoelige berichttitels en een snelle uitgangsknop (met eerlijke uitleg over browsergeschiedenis).
- **`Safe Disclosure` (5-traps model):** De gebruiker bepaalt zelf hoeveel informatie hij op welk moment prijsgeeft.
- **`SIGNAL Timeline` & `SIGNAL Memory`:** Chronologische dossieropbouw met strikt onderscheid tussen eigen herinnering (zeker vs. onzeker, ook terug in de tijd), objectieve documenten, verklaringen van derden en latere aanvullingen.
- **`Evidence Vault`:** Versleutelde bewijskluis met SHA-256 integriteitshashes en tijdstempels.
- **`Consent Center`:** Granulair beheer van toestemmingen per onderdeel en per ontvanger.

### Laag 3 — CONNECT (Veilig verbinden & overdragen)
*Doel: De kloof tussen het persoonlijke dossier en professionele hulp overbruggen zonder secundaire victimisatie.*
- **`SIGNAL Trust Passport`:** Transparante, verifieerbare profielen van deelnemende hulporganisaties (bevoegdheid, beroepsgeheim, privacybeleid, onafhankelijk toezicht).
- **`SIGNAL Bridge`:** Warme, gecontroleerde overdracht waarbij de gebruiker exact selecteert welke tijdlijnitems en bijlagen naar een geverifieerde hulpverlener of meldpunt worden gestuurd — zodat het verhaal niet telkens opnieuw verteld hoeft te worden.
- **`Safe Matching` & `SIGNAL Handshake`:** *(Standaard uitgeschakeld in MVP; alleen na wettelijke toetsing)* Gefaseerde, privacy-preserving detectie van mogelijke overeenkomsten tussen onafhankelijke dossiers, gevolgd door verplichte menselijke controle en individuele, vrijwillige begeleiding.

### Laag 4 — ACT (Begeleide vervolgstappen & nazorg)
*Doel: Menselijke ondersteuning vóór, tijdens en ná een melding, met oog voor alle betrokkenen.*
- **`SIGNAL Care` & `Independent Advocate`:** Beveiligd contact (`Confidential Messaging`) met gemachtigde vertrouwenspersonen, hulpverleners of advocaten.
- **`SIGNAL Aftercare`:** Vrijwillige ondersteuning ná een melding of overdracht (gespreksvoorbereiding, overzicht van vervolgstappen, welzijnscheck-ins zonder druk).
- **`SIGNAL Witness`:** Een afzonderlijke, zorgvuldig afgebakende route voor getuigen, collega's en omstanders, zodat derdenverklaringen nooit vermengd raken met eigen ervaringen.
- **`SIGNAL Guardian`:** Extra beschermings- en doorverwijzingsprotocollen voor minderjarigen en kwetsbare groepen.
- **`SIGNAL Collective`:** Begeleide samenwerking via een advocaat of bevoegde organisatie wanneer meerdere melders na individuele beoordeling gezamenlijk actie willen ondernemen — zonder ongecontroleerde groepschats.

### Laag 5 — IMPROVE (Toezicht, eerlijkheid & maatschappelijke impact)
*Doel: Structurele misstanden zichtbaar maken en de rechtsstaat beschermen zonder individuele privacy te schenden.*
- **`SIGNAL Fairness`:** Procedurele waarborgen tegen valse of kwaadwillige meldingen, vierogencontrole en bescherming van de rechten van personen over wie gemeld wordt.
- **`SIGNAL Continuity`:** Nood- en continuïteitsprotocol (veilige export, overdracht of vernietiging als SIGNAL ooit zou stoppen of aangevallen wordt).
- **`SIGNAL Pulse` & `Public Impact Observatory`:** Geaggregeerde, geanonimiseerde (k-anonieme) maatschappelijke trendrapportages per sector of regio.
- **`SIGNAL Federation` & `SIGNAL Research`:** Europese interoperabiliteit (`SIGNAL Connect API`) en onafhankelijk wetenschappelijk onderzoek naar de effectiviteit van meldsystemen.

---

## 3. De Zes Samenwerkende Domeinen (Gebruikers- en Partneroverzicht)

Voor communicatie naar gebruikers, partners en financiers vatten we de 5 lagen samen in **zes herkenbare domeinen**:

| Domein | Tagline | Kernonderdelen |
|---|---|---|
| **1. SIGNAL Compass** | *De juiste weg vinden* | `SIGNAL Zero`, `Compass`, `Reality Check`, `Help Directory` |
| **2. SIGNAL Vault** | *Veilig documenteren* | `Timeline`, `Memory`, `Evidence Vault`, `Evidence Coach`, `Consent Center` |
| **3. SIGNAL Care** | *Professionele hulp* | `Independent Advocate`, `Confidential Messaging`, `Aftercare`, `Guardian`, `Witness` |
| **4. SIGNAL Network** | *Vertrouwelijke samenwerking* | `SIGNAL Bridge`, `Trust Passport`, `Connect API`, `SIGNAL Federation` |
| **5. SIGNAL Justice** | *Rechtmatige vervolgstappen* | `Safe Matching`, `SIGNAL Handshake`, `SIGNAL Collective`, `SIGNAL Fairness` |
| **6. SIGNAL Impact** | *Maatschappelijke inzichten* | `SIGNAL Pulse`, `Impact Observatory`, `SIGNAL Research`, `SIGNAL Continuity` |

---

## 4. Twee Strikt Gescheiden Productlijnen: `SIGNAL Care` vs. `SIGNAL Institutional`

Om financiële duurzaamheid mogelijk te maken zonder het publieke vertrouwen ooit in gevaar te brengen, hanteert SIGNAL een harde scheiding:

| Kenmerk | `SIGNAL Care` (Publiek Netwerk) | `SIGNAL Institutional` (Organisatie-oplossing) |
|---|---|---|
| **Doelgroep** | Individuele burgers, slachtoffers, zoekenden en getuigen | Werkgevers, universiteiten, sportfederaties en sectororganisaties |
| **Prijs** | **100% gratis** voor elke gebruiker | Transparante abonnements- of implementatievergoeding |
| **Beheer & Eigenaarschap** | Onafhankelijke VZW / Stichting van Openbaar Nut | Afzonderlijke juridische en technische omgeving |
| **Toegang tot publieke dossiers** | Enkel de melder zelf + expliciet via `Bridge` gekozen hulpverleners | **Nul toegang** tot meldingen die in `SIGNAL Care` zijn geregistreerd |
| **Bescherming tegen beïnvloeding** | Een organisatie die klant is van `SIGNAL Institutional` kan **nooit** meldingen over zichzelf in `SIGNAL Care` inzien, blokkeren, vertragen of laten verwijderen | Dossiers volgen een gecertificeerde interne/externe klokkenluiders- of vertrouwenspersoonworkflow |
