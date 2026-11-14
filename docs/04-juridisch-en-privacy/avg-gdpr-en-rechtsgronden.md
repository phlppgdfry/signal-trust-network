# AVG / GDPR, Rechtsgronden (Art. 6, 9, 10) & Rechten van Betrokkenen

Bij een platform als SIGNAL moet de **juridische structuur vastliggen vóórdat de gevoelige onderdelen technisch worden gebouwd**. Een mooi geformuleerde privacyverklaring of een simpel "Ik ga akkoord"-vinkje maakt het verwerken van gegevens over seksueel misbruik of strafbare feiten onder het Europees recht **niet** automatisch rechtmatig.

---

## 1. De Drie Kritieke AVG-artikelen voor SIGNAL

| Artikel AVG | Waar gaat het over? | Impact op het ontwerp van SIGNAL |
|---|---|---|
| **Artikel 6 AVG** *(Rechtmatigheid van de verwerking)* | Elke verwerking van persoonsgegevens vereist een geldige rechtsgrond (bijv. toestemming, wettelijke verplichting, zwaarwegend algemeen belang). | Voor **Laag 1 (`SIGNAL Zero` & `Compass`)** verwerken we géén persoonsgegevens (dataminimalisatie). Voor **Laag 2 (`Private Vault`)** en **Laag 3 (`SIGNAL Bridge`)** geldt uitdrukkelijke, specifieke en per doel gescheiden toestemming of de wettelijke taak van de ontvangende partnerorganisatie. |
| **Artikel 9 AVG** *(Bijzondere categorieën van persoonsgegevens)* | Verbod op verwerking van gegevens over o.a. **gezondheid, seksueel gedrag/gerichtheid, ras of etnische afkomst**, tenzij een specifieke uitzondering uit art. 9 lid 2 van toepassing is. | Getuigenissen over seksueel grensoverschrijdend gedrag of discriminatie vallen vrijwel altijd onder art. 9 AVG. Daarom minimaliseert SIGNAL centrale opslag en leidt het gebruikers zo snel mogelijk naar erkende zorg- en hulpverleners (zoals `ZSG` of `Unia`) die over een wettelijke grondslag beschikken. |
| **Artikel 10 AVG** *(Gegevens betreffende strafrechtelijke veroordelingen en strafbare feiten)* | Verwerking van gegevens over (vermeende) strafbare feiten mag alleen geschieden onder toezicht van de overheid of indien toegestaan bij Unierecht of lidstatelijk recht dat passende waarborgen biedt. | Dit is de reden waarom een **privaat beschuldigingsregister of ongecontroleerde matchingdatabase op naam van daders in Europa onrechtmatig is**. In de Belgische Wet Bescherming Persoonsgegevens (30 juli 2018, art. 10) gelden strikte voorwaarden voor wie strafrechtelijke gegevens mag verwerken (zoals advocaten, erkende slachtofferhulporganisaties of voor het beheer van eigen geschillen). `Safe Matching` blijft daarom technisch uitgeschakeld totdat een sluitend juridisch kader met bevoegde partners is vastgesteld. |

---

## 2. De Rechten van de Persoon over wie Gemeld Wordt (`SIGNAL Fairness`)

Onder de AVG heeft niet alleen de melder rechten, maar ook een eventuele derde persoon wiens naam in een melding voorkomt (zoals het recht op informatie onder art. 14 AVG en recht op inzage/rectificatie onder art. 15–16 AVG).

Tegelijkertijd zou een meldsysteem onbruikbaar en gevaarlijk zijn als een vermoedelijke pleger van geweld meteen een automatische e-mail zou krijgen: *"Er is zojuist een notitie over u aangemaakt."*

Hoe gaan het Belgische recht en de architectuur van SIGNAL met dit spanningsveld om?
1. **Persoonlijke Kluis (`Private Vault`):** Zolang een gebruiker uitsluitend een persoonlijk, versleuteld dagboek bijhoudt voor eigen geheugensteun en voorbereiding van eventuele eigen rechtsvorderingen, vindt er geen openbaarmaking of verspreiding naar derden plaats.
2. **Beroepsgeheim en Wettelijke Uitzonderingen bij Partners (`SIGNAL Bridge`):** Wanneer een overdracht plaatsvindt naar een advocaat, een arts/hulpverlener bij een ZSG, 1712 of een wettelijk klokkenluiderskanaal, voorzien artikel 14 lid 5 AVG (beroepsgeheim / vertrouwelijkheidsplicht) en de Belgische klokkenluiderswetgeving in specifieke bescherming van de identiteit van de melder en het lopende onderzoek.
3. **Geen Zwarte Lijsten:** Omdat SIGNAL **geen** centrale zwarte lijst of risicoscore van beschuldigden bijhoudt, wordt niemand buiten zijn weten om op een "lijst" geplaatst die zijn werk of reputatie aantast.

---

## 3. Eerlijkheid over Gegevenswissing (Artikel 17 AVG) & Bewaartermijnen

SIGNAL belooft gebruikers **geen** onrealistische of juridisch onhoudbare zaken:
- **In je eigen `Private Vault`:** De gebruiker kan op elk moment notities of zijn volledige persoonlijke kluis vernietigen (*crypto-shredding*).
- **Na een `SIGNAL Bridge`-overdracht:** Zodra een gebruiker er bewust voor heeft gekozen een dossierpakket over te dragen aan een externe bevoegde instantie (bijv. Federale Ombudsman, Unia of een advocaat), valt dat ontvangen dossier onder de wettelijke bewaartermijnen en procedures van die instantie. Artikel 17 lid 3 AVG kent immers uitzonderingen op het recht op gegevenswissing (zoals wettelijke verwerkingsplichten en het instellen, uitoefenen of onderbouwen van een rechtsvordering).
- **Categoriegebonden Bewaartermijnen:** Gegevens worden nooit onbeperkt bewaard. Inactieve kluizen krijgen een instelbare levensduur met tijdige, discrete exportmogelijkheid vóór automatische opruiming.

---

## 4. Meldplicht Datalekken (72-uurs Protocol)

Indien ondanks alle beveiligingsmaatregelen een beveiligingsincident met persoonsgegevens plaatsvindt:
- Geldt onder **Artikel 33 AVG** de plicht om een meldingsplichtig datalek zonder onredelijke vertraging en, waar mogelijk, uiterlijk **binnen 72 uur** na kennisname te melden aan de **Gegevensbeschermingsautoriteit (GBA)**.
- Geldt onder **Artikel 34 AVG** een kennisgevingsplicht aan de betrokkenen bij een waarschijnlijk hoog risico, op een wijze die hun veiligheid op eventueel gecontroleerde toestellen niet in gevaar brengt.
