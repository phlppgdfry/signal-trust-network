# De Vijf Kernbeslissingen vóór Ontwikkeling van Productie-onderdelen

Voordat het project de overgang maakt van de **interactieve SIGNAL 4.0 productdemo (Fase 1)** naar een **beperkte operationele pilot met echte gebruikers (Fase 2)**, moeten vijf fundamentele strategische en juridische beslissingen formeel zijn genomen en vastgelegd.

---

## Beslissing 1 — Juridische Rol onder de AVG
**De vraag:** *Is SIGNAL uitsluitend een anonieme navigator, een verwerkingsverantwoordelijke voor persoonlijke privédossiers, of een technische verwerker/dienstverlener voor bestaande erkende organisaties?*
- **Waarom dit niet door elkaar mag lopen:** Als SIGNAL zelf verwerkingsverantwoordelijke is voor dossiers met gegevens over seksueel misbruik of strafbare feiten, gelden veel zwaardere wettelijke eisen (art. 9 en 10 AVG) dan wanneer de burger lokaal documenteert en rechtstreeks overdraagt aan een bij wet gemachtigde partner (zoals een ZSG, advocaat of het Vlaams Meldpunt).
- **Aanbevolen richting:** Start in Fase 2 met **on-device / client-versleutelde voorbereiding** + **directe, gecontroleerde overdracht (`SIGNAL Bridge`)** naar één wettelijk bevoegde partnerorganisatie.

---

## Beslissing 2 — Rechtsvorm & Structurele Onafhankelijkheid
**De vraag:** *Wordt SIGNAL opgericht als een Belgische VZW, een Stichting van Openbaar Nut, of een combinatie met een afgescheiden technische dienstverlener?*
- **Waarom dit cruciaal is:** Een gewone commerciële BV/NV wekt wantrouwen bij slachtoffers en publieke partners, omdat aandeelhouders in theorie de koers kunnen wijzigen of het bedrijf kunnen verkopen.
- **Aanbevolen richting:** Richt voor het publieke netwerk (`SIGNAL Care`) een **onafhankelijke Belgische VZW of Stichting** op waarin de 8 onafhankelijkheidsregels en het `SIGNAL Continuity`-protocol statutair zijn verankerd. Houd een eventuele B2B-tak (`SIGNAL Institutional`) in een strikt gescheiden rechtspersoon.

---

## Beslissing 3 — Eerste Doelgroep & Lanceringspartner
**De vraag:** *Welke specifieke gebruikersgroep en categorie testen we als allereerste in een begeleide pilot, en met welke erkende hulporganisatie?*
- **Waarom focus nodig is:** Acht categorieën tegelijk lanceren zonder bewezen partnerketen leidt tot versnippering en operationeel risico.
- **Aanbevolen richting:**
  - Voor **publieke wegwijzer & oriëntatie (`SIGNAL Zero` & `Compass`)**: breed toegankelijk met verwijzing naar alle officiële Belgische kanalen.
  - Voor de **eerste `SIGNAL Bridge` pilot**: kies één afgebakend domein (bijv. grensoverschrijdend gedrag / machtsmisbruik binnen organisaties of hoger onderwijs, of discriminatie) samen met één erkende partner die voldoende menselijke opvolgingscapaciteit heeft.

---

## Beslissing 4 — Data-eigenaarschap & Sleutelbeheer
**De vraag:** *Wie bezit de cryptografische sleutels en wie mag onder welke voorwaarden gegevens ontsleutelen, doorsturen of verwijderen?*
- **Waarom dit vooraf moet vaststaan:** Als SIGNAL bij wachtwoordverlies een kluis kan herstellen, betekent dit technisch dat SIGNAL zelf bij de sleutel kan (en dus gedwongen kan worden gegevens af te geven of kwetsbaar is bij een inbraak). Als alleen de gebruiker de sleutel heeft (*zero-knowledge*), is herstel bij verlies onmogelijk.
- **Aanbevolen richting:**
  - Gebruik voor de persoonlijke kluis **client-side / zero-knowledge encryptie met een heldere herstelcode-procedure** voor de gebruiker.
  - Gebruik voor `SIGNAL Bridge` asymmetrische versleuteling rechtstreeks naar de publieke sleutel van de gekozen partnerorganisatie.

---

## Beslissing 5 — Operationele Grenzen & Verwachtingsmanagement
**De vraag:** *Welke meldingen behandelt SIGNAL zelf nadrukkelijk níét, en hoe voorkomen we dat een gebruiker in acuut gevaar denkt dat SIGNAL direct ingrijpt?*
- **Waarom dit mensenlevens kan raken:** Als iemand die op dat moment fysiek bedreigd wordt een notitie achterlaat in een digitale kluis in de veronderstelling dat "het platform nu de politie stuurt", ontstaat een levensgevaarlijke situatie.
- **Aanbevolen richting:**
  - Verplichte urgentie-triage aan het begin van `SIGNAL Compass` (*"Ben je op dit moment in acuut gevaar of heb je medische zorg nodig? Bel direct 101/112 of ga naar een ZSG"*).
  - Geen enkele functie in SIGNAL mag de indruk wekken een live 24/7 meldkamer of politiekanaal te zijn.
