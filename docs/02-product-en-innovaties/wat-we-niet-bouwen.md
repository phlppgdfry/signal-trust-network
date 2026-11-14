# Wat we absoluut NIET bouwen (Harde Rode Lijnen & Anti-Features)

Het grootste gevaar bij een platform rond grensoverschrijdend gedrag en ernstige mistoestanden is dat een systeem dat bedoeld is om mensen te beschermen, ontaardt in een **digitaal beschuldigingsregister**, een **online schandpaal** of een **aantrekkelijk doelwit voor kwaadwillige manipulatie en datalekken**.

Daarom legt SIGNAL niet alleen vast wat we wél bouwen, maar ook welke functies **principieel, technisch en statutair verboden** zijn.

---

## 1. De Zeven Verboden Functies (Anti-Features)

| # | Verboden Functie | Waarom dit levensgevaarlijk en onrechtmatig is | Wat SIGNAL in de plaats daarvan doet |
|---|---|---|---|
| **1** | **Geen publieke namenlijsten, kaarten of rankings van beschuldigden** | Schendt het vermoeden van onschuld, de AVG (art. 9 en 10) en het lasterrecht; vernietigt levens zonder wederhoor of rechterlijke toetsing. | Volledig afgeschermde individuele dossiers; overdracht uitsluitend naar wettelijk bevoegde hulp- of onderzoeksinstanties. |
| **2** | **Geen publieke of semi-publieke teller ("Al 4 meldingen over persoon X")** | Een teller moedigt gecoördineerde lastercampagnes aan, beïnvloedt getuigen en wekt ten onrechte de schijn van bewezen schuld. | Eventuele overeenkomstdetectie (`Safe Matching`) is volledig onzichtbaar voor gebruikers en gaat altijd eerst naar een gemachtigd menselijk reviewteam. |
| **3** | **Geen AI-leugendetector, geloofwaardigheidsscore of emotieanalyse** | Taalgebruik of emotie bij trauma verschilt sterk per persoon en cultuur. Een AI die oordeelt wie "echt" klinkt is wetenschappelijk onhoudbaar en verboden/hoog-risico onder de EU AI Act. | AI mag uitsluitend helpen bij toegankelijke taal (B1), vertaling en het chronologisch weergeven van door de gebruiker geselecteerde feiten, met behoud van het origineel. |
| **4** | **Geen openbare groepsdossiers of automatische groepschats tussen melders** | Wanneer melders elkaars verhalen lezen voordat ze bij politie of justitie zijn gehoord, treedt **geheugenbesmetting** (*memory contamination*) op. Een verdedigingsadvocaat kan dan terecht aanvoeren dat getuigen hun verhalen op elkaar hebben afgestemd. | `SIGNAL Handshake` en `SIGNAL Collective` houden getuigenissen strikt gescheiden en laten coördinatie uitsluitend verlopen via een bevoegde advocaat of behandelaar. |
| **5** | **Geen automatische contactverzoeken bij een match** | Een kwaadwillige dader zou zelf een valse melding tegen zichzelf kunnen indienen om te testen of een slachtoffer al een melding heeft gedaan (*fishing attack*). | Geen enkele melder krijgt automatisch te horen dat er een andere melding bestaat; beoordeling gebeurt altijd menselijk en asymmetrisch beschermd. |
| **6** | **Geen gamification, beloningen, strepen of badges voor melden** | Melden van ernstige mistoestanden mag nooit worden geprikkeld met spelmechanismen of financiële prikkels die valse of overdreven meldingen uitlokken. | Rustige, neutrale, niet-sturende interface (`Quiet Clarity`) zonder sociale-media-prikkels. |
| **7** | **Geen valse belofte van "100% onvoorwaardelijke en directe wissing overal"** | Zodra gegevens met toestemming zijn overgedragen aan een externe bevoegde instantie of onder een wettelijke bewaarplicht / gerechtelijk bevel vallen, geldt het recht op gegevenswissing (art. 17 AVG) niet onbeperkt. | Eerlijke transparantie in het `Consent Center`: een gebruiker kan zijn eigen `Private Vault` wissen, en ziet vooraf exact wat de gevolgen zijn zodra hij een pakket via `SIGNAL Bridge` verstuurt. |

---

## 2. Bescherming tegen Kwaadwillig Misbruik (`SIGNAL Fairness`)

Stel dat één persoon onder vijf valse e-mailadressen vijf gefabriceerde meldingen indient over een ex-partner, collega of concurrent om een kunstmatige "match" te veroorzaken. Hoe voorkomt SIGNAL dit?

1. **Geen beslissing op basis van aantallen alleen:** Twee of vijf meldingen in een database leiden nooit automatisch tot een conclusie of externe actie.
2. **Proportionele identiteits- en sybil-resistentie:**
   - Voor louter oriënteren (`SIGNAL Zero`) en een lokaal/persoonlijk dagboek is geen identiteitscontrole nodig.
   - Zodra een gebruiker echter wil deelnemen aan `Safe Matching` of een formele overdracht (`SIGNAL Bridge`) start, gelden proportionele verificatiestappen en menselijke intake om gecoördineerde dubbele accounts (*Sybil-aanvallen*) te detecteren.
3. **Scheiding tussen eigen ervaring en "van horen zeggen":** `SIGNAL Timeline` en `SIGNAL Witness` verplichten aan te geven of men iets zelf heeft meegemaakt of van een ander heeft gehoord, zodat één gerucht dat door vijf mensen wordt doorverteld nooit als vijf onafhankelijke feiten wordt geteld.
4. **Recht op verdediging en correctie:** Wanneer een dossier via een bevoegde instantie tot een formele procedure leidt, gelden de wettelijke rechten van de betrokken persoon (kennisname, wederhoor, rechtzetting van feitelijke onjuistheden en onschuldpresumptie).
