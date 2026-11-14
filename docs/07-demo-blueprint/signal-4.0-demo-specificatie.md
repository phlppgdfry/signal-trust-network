# SIGNAL 4.0 Interactieve Demo-specificatie (UX/UI Blueprint)

Dit document vormt de directe bouwspecificatie voor de **SIGNAL 4.0 Klikbare Productdemo**. Waar een eerste schets (v0.1) nog bestond uit losse statische schermen, ontwerpen we de SIGNAL 4.0-demo als **één samenhangende, realistische gebruikers- én partnerervaring** met duidelijke veiligheidsgrenzen en uitsluitend synthetische dossiers.

---

## 1. Visuele Identiteit & Design System

De ervaring van SIGNAL moet **rustig, discreet, waardig en niet-sensationeel** zijn. Geen alarmistische rode schermen, geen schreeuwerige tellers en geen koude ambtelijke formulieren.

### Kleurenpalet (*SIGNAL 4.0 Palette*)

| Naam | Rol | Hex-waarden | Toepassing |
|---|---|---|---|
| **Deep Trust** | Primair donkergroen | `#123524` · `#0F291E` | Koppen, primaire actieknoppen, navigatie-accenten, vertrouwensbadges |
| **Human Care** | Saliegroen / Zachtgroen | `#4E7A65` · `#DCE7E0` · `#EEF4F0` | Subtiele kaartachtergronden, voortgangsindicatoren, kalme begeleidingsblokken |
| **Quiet Clarity** | Warm wit & zacht zand | `#FAF9F5` · `#F3F1EC` · `#FFFFFF` | Pagina-achtergrond, rustige leesvlakken met hoog contrast en lage oogbelasting |
| **Clear Slate** | Tekst & neutrale kaders | `#1C2521` · `#52605A` · `#D6DDD8` | Broodtekst (WCAG AAA contrast), secundaire toelichtingen, fijne kaartlijnen |
| **Informed Caution** | Neutrale waarschuwing | `#8A5A19` · `#FDF6EA` | Juridische `Reality Check`-kaders, bewaartermijn-uitleg en urgentie-informatie |

### Typografie & Toegankelijkheid
- **Taalniveau:** B1 (helder, menselijk Nederlands zonder onvertaald juridisch jargon; elk begrip zoals *beroepsgeheim* of *klokkenluidersbescherming* heeft een directe toelichting).
- **Altijd zichtbare veiligheidselementen (Header Bar):**
  1. **Prototype- & Veiligheidsbanner:** *"Interactieve SIGNAL 4.0 Conceptdemo — Fictieve gegevens. Er wordt niets verzonden of centraal opgeslagen."*
  2. **Urgentieknop (`1712` / `ZSG` / `101`):** Directe uitklap voor wie acuut hulp nodig heeft.
  3. **`SIGNAL Invisible` (Discrete modus):** Schakelt gevoelige koppen en categorie-termen om naar neutrale labels.
  4. **`Safe Exit` (Veilige uitgang):** Verlaat en wist onmiddellijk de lokale demosessie (met eerlijke uitleg over browsergeschiedenis).

---

## 2. De 10 Interactieve Schermen van de SIGNAL 4.0 Demo

### Scherm 1 — Homepage & `SIGNAL Zero` (*Jouw verhaal. Jouw keuze.*)
- Heldere uitleg van het platform zonder accountdwang.
- Drie primaire ingangen:
  1. **Begrijpen & Oriënteren (`SIGNAL Compass`)**
  2. **Voor mezelf vastleggen (`Private Vault`)**
  3. **Directe hulp & erkende instanties (`Verified Help Network`)**
- Inclusief een apart pad voor getuigen/collega's (**`SIGNAL Witness`**) en uitleg over de **5 niveaus van `Safe Disclosure`**.

### Scherm 2 — `SIGNAL Compass` & `Reality Check` (*De Intelligente Wegwijzer*)
- Interactieve, behoeftegestuurde beslisboom:
  - Stap 1: *"Wat zou jou op dit moment het meest helpen?"* (5 menselijke opties).
  - Stap 2: Keuze uit de **8 categorieën** (met multilabel-ondersteuning, bijv. *Machtsmisbruik op het werk* + *Discriminatie*) en context (spoed, minderjarig via `SIGNAL Guardian`, getuige via `SIGNAL Witness`).
  - Stap 3: Dynamisch resultaat met **Reality Check** (wat kan juridisch wel/niet), **Evidence Coach**-tips voor dit type situatie, en de exacte **Belgische partnerorganisaties** die bevoegd zijn.

### Scherm 3 — `Safety & Consent Center` (*Veiligheid & Zelfbeschikking*)
- Volledig transparant overzicht van hoe `Safe Exit`, `SIGNAL Invisible` en de **5 niveaus van `Safe Disclosure`** werken.
- Interactieve **Consent Matrix**: de gebruiker kan per onderdeel (Tijdlijn, Bijlagen, Contactvoorkeur, Patrooncontrole) schakelaars bedienen en ziet direct in gewone taal wat er wel en niet gebeurt, inclusief eerlijke uitleg over artikel 17 AVG (recht op wissing vóór vs. ná externe overdracht).

### Scherm 4 — `Mijn Veilige Ruimte` (`SIGNAL Timeline`, `Memory` & `Evidence Vault`)
- Interactieve persoonlijke kluis met voorgeladen **fictieve scenario-dossiers** (waartussen de bezoeker kan wisselen) én de mogelijkheid om lokaal een testnotitie toe te voegen:
  - Visueel onderscheid tussen **Eigen herinnering** (met zekerheidslabel: *Exacte datum* vs. *Ongeveer / Onzeker detail*), **Bewijsstuk** (met SHA-256 hash & tijdstempel), **Verklaring van derde/getuige** en **Later addendum** (waarbij de originele tekst zichtbaar bewaard blijft).
  - Optionele, strikt begrensde **AI Structureringshulp-simulatie** die toont hoe losse zinnen chronologisch worden geordend zonder één woord aan de originele getuigenis te veranderen.
  - **`SIGNAL Continuity` Export-knop:** Simuleert het veilig downloaden van het eigen versleutelde dossierpakket.

### Scherm 5 — `SIGNAL Bridge` (*Warme Overdracht zonder Hervertellen*)
- Een begeleide 4-stappen wizard waarin de gebruiker ervaart hoe hij zijn verhaal niet telkens opnieuw hoeft te vertellen:
  1. **Selecteer items uit je Tijdlijn:** Vink aan welke gebeurtenissen en bewijsstukken je wilt delen (en welke privé blijven).
  2. **Kies en controleer de ontvanger (`Trust Passport`):** Bekijk het geverifieerde paspoort van bijv. *Vlaams Meldpunt*, *ZSG*, *Unia* of *Federale Ombudsman*.
  3. **Kies je niveau van bekendmaking:** Oriënterend advies, pseudonieme overdracht of overdracht op naam.
  4. **Ontvangstbevestiging & `Bridge Token`:** Toont het versleutelde overdrachtsbewijs (ook bruikbaar voor een fysieke afspraak).

### Scherm 6 — `Mijn Vervolgstappen & SIGNAL Aftercare` (*Case Journey*)
- Visuele tijdlijn van wat er **ná** een registratie of overdracht gebeurt, zonder enige druk om aangifte te doen:
  - Overzicht van gezette stappen en verwachte reactietijden van de partnerorganisatie.
  - **`SIGNAL Aftercare`-module:** Gespreksvoorbereiding (vragen die je aan een vertrouwenspersoon of advocaat kunt stellen), zelfzorg- en veiligheidsadvies, en vrijwillige check-ins.

### Scherm 7 — `Hulpverlenersnetwerk & Trust Passports` (*Verified Help Directory*)
- Doorzoekbaar overzicht van het Belgische hulplandschap (**1712**, **Zorgcentra na Seksueel Geweld**, **Vlaams Meldpunt Grensoverschrijdend Gedrag**, **Unia / IGVM / VMRI**, **Federale Ombudsman**, **FIRM-IFDH**, **Meldpunt Eerlijke Concurrentie**).
- Klik op elke organisatie om het volledige **`SIGNAL Trust Passport`** te openen (wettelijke basis, beroepsgeheim, ondersteunde categorieën, DPO-status, onafhankelijk toezicht en digitale/telefonische/fysieke kanalen).

### Scherm 8 — `Safe Matching & SIGNAL Handshake Simulator` *(Educatieve Simulatie)*
- Laat stap voor stap zien hoe gecontroleerde patroonherkenning in een toekomstige Fase 3 veilig en rechtmatig kan werken, én wat het verschil is met een verboden beschuldigingsregister:
  - Vergelijking van twee onafhankelijke fictieve dossiers (*Melder A* en *Melder B*).
  - Toont waarom er **geen automatische match-melding** naar de melders gaat.
  - Simuleert de **vierogencontrole** door twee gemachtigde beoordelaars, de controle op fout-positieven (`SIGNAL Fairness`), de **afzonderlijke menselijke benadering (`Handshake`)** en de vrijwillige, door een advocaat begeleide samenwerking (**`SIGNAL Collective`**).

### Scherm 9 — `Professional & Partner Workspace` (*Rolgebaseerde Behandelaarsomgeving*)
- Laat zien hoe een gemachtigde behandelaar bij een partnerorganisatie of het onafhankelijke reviewteam werkt:
  - Strikte **Dossiergebonden Autorisatie**: de behandelaar ziet uitsluitend het via `SIGNAL Bridge` toegewezen overdrachtspakket, nooit andere kluizen.
  - Onwijzigbare **Audit Trail** (wie heeft welk onderdeel wanneer geraadpleegd en op welke rechtsgrond).
  - Beveiligde **Confidential Messaging** terug naar de melder.

### Scherm 10 — `Trust Center, Governance & Public Impact Observatory` (*SIGNAL Pulse*)
- Interactief overzicht van:
  - De **6 Governance-organen** en de **8 Statutaire Onafhankelijkheidsregels**.
  - De **Gouden Architectuurregel** (visuele weergave van de 3 gescheiden opslag- en sleuteldomeinen).
  - **`SIGNAL Pulse` (Impact Observatory):** Geaggregeerde, volledig geanonimiseerde (k-anonieme) voorbeeldstatistieken per sector en categorie + de **8 Ethische Impact-KPI's**.
