# DPIA, Mensenrechtentoets & Het 10-Punten SIGNAL Safety Framework

Omdat SIGNAL werkt met potentieel zeer kwetsbare personen en gevoelige informatie, is een **Gegevensbeschermingseffectbeoordeling (DPIA / Data Protection Impact Assessment)** onder Artikel 35 AVG wettelijk verplicht vóórdat enige echte melding in een pilot of productieomgeving wordt verwerkt.

Wij combineren deze DPIA met een **Mensenrechten- en Veiligheidstoets (HRIA)**.

---

## 1. Het 10-Punten SIGNAL Safety Framework

Elk geïdentificeerd risico in SIGNAL is gekoppeld aan concrete technische én procedurele preventiemaatregelen:

| # | Risico | Preventie- en Beheersmaatregelen binnen SIGNAL |
|---|---|---|
| **1** | **Valse of kwaadwillige meldingen (Laster / Sybil-aanval)** | Geen automatische conclusies op basis van aantallen; verplichte scheiding tussen eigen ervaring en derdenverklaring; proportionele verificatie bij overdracht; verplichte menselijke vierogencontrole. |
| **2** | **Datalek met intieme getuigenissen** | Dataminimalisatie (`SIGNAL Zero`), drievoudige domeinscheiding, envelope encryption per dossier via EU KMS/HSM, geen gevoelige data in logs en verplichte externe penetratietests. |
| **3** | **Onterechte matching (Naamgenoten / Aliassen)** | `Safe Matching` is standaard technisch uitgeschakeld; waar later toegelaten worden nooit automatische notificaties aan melders gestuurd en beoordeelt altijd eerst een gemachtigd menselijk reviewteam. |
| **4** | **Intimidatie of beïnvloeding tussen melders** | Geen publieke of besloten groepschats tussen melders; `SIGNAL Handshake` en `Collective` verlopen uitsluitend via individuele professionele begeleiding of een advocaat. |
| **5** | **Reputatieschade voor beschuldigden** | Absoluut verbod op publieke namenlijsten, rankings of tellers; zorgvuldige interne geheimhouding; naleving van de onschuldpresumptie (`SIGNAL Fairness`). |
| **6** | **AI-fouten of hallucinaties** | AI mag geen waarheids- of schuldoordeel vellen en geen feiten aanvullen; originele getuigenis blijft altijd primair bewaard; deterministische beslisboom voor doorverwijzingen. |
| **7** | **Minderjarige of extra kwetsbare gebruikers** | Specifiek `SIGNAL Guardian`-protocol met leeftijdsgeschikte uitleg, directe aansluiting op gespecialiseerde jeugdhulp/1712 en vooraf juridisch getoetste escalatieregels. |
| **8** | **Acuut fysiek of medisch gevaar** | Direct zichtbare nood- en urgentiebanner (`101`/`112`, `1712`, `ZSG` binnen 72 uur voor forensisch sporenonderzoek) zodat niemand kostbare tijd verliest in een formulier. |
| **9** | **Misbruik of nieuwsgierigheid door eigen personeel** | *Least privilege*, de Gouden Regel (geen admin-toegang tot alle dossiers), vierogencontrole en onwijzigbare *append-only* auditlogging van elke toegangspoging. |
| **10** | **Financiële of institutionele beïnvloeding** | Juridische, technische en bestuurlijke muur tussen `SIGNAL Care` en `SIGNAL Institutional`; statutair verbod op beïnvloeding of inzage door sponsors of betalende organisaties. |

---

## 2. Verplichte Checklist vóór Start van Fase 2 (Begeleide Pilot)

Geen enkele regel productiedata mag worden opgeslagen voordat de **Privacy & Security Committee** en de **Onafhankelijke DPO** onderstaande zes documenten schriftelijk hebben goedgekeurd:

- [ ] **1. Goedgekeurde DPIA (Art. 35 AVG):** Inclusief eventuele voorafgaande raadpleging van de Gegevensbeschermingsautoriteit (GBA) onder Art. 36 AVG indien uit de DPIA blijkt dat restrisico's hoog blijven.
- [ ] **2. Verwerkingsregister & Rolbepaling (Art. 26 / 28 / 30 AVG):** Ondubbelzinnige vastlegging voor elke module of SIGNAL verwerkingsverantwoordelijke, gezamenlijke verwerkingsverantwoordelijke of verwerker is ten opzichte van de deelnemende partnerorganisatie.
- [ ] **3. Onafhankelijk Penetratietestrapport:** Uitgevoerd door een gecertificeerde externe beveiligingspartner zonder openstaande kritieke of hoge kwetsbaarheden.
- [ ] **4. Protocol Minderjarigen & Acuut Gevaar (`SIGNAL Guardian`):** Gevalideerd door gespecialiseerde Belgische hulpverleners en juristen.
- [ ] **5. Getekende Samenwerkingsovereenkomst met Eerste Erkende Partner:** Met vastgelegde SLA voor opvolgingscapaciteit zodat doorverwezen gebruikers nooit in een luchtledige terechtkomen.
- [ ] **6. Operationeel Incident- & Datalekplan + Continuïteitsreserve (`SIGNAL Continuity`).**
