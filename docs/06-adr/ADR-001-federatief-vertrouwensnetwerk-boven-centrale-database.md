# ADR-001: Federatief Vertrouwensnetwerk boven Centrale Klachtendatabase

- **Status:** Geaccepteerd (SIGNAL 3.0 / 4.0)
- **Datum:** November 2026

## Context
Een voor de hand liggend idee bij het bouwen van een meldplatform is om één centrale database op te zetten waarin slachtoffers van allerlei mistoestanden hun verhalen en de namen van beschuldigden uploaden, zodat het platform centraal op zoek kan gaan naar patronen.

## Probleem met een Centrale Database
1. **Enorm Concentratierisico:** Eén centrale database met duizenden intieme verhalen en beschuldigingen is een exteem waardevol doelwit voor statelijke actoren, hackers en afpersers.
2. **Juridische Onhoudbaarheid (Art. 9 & 10 AVG):** Het centraal opslaan van onbewezen strafrechtelijke beschuldigingen tegen identificeerbare burgers zonder wettelijke opsporingsbevoegdheid botst direct met artikel 10 AVG en het Belgische gegevensbeschermingsrecht.
3. **Wantrouwen bij Bestaande Hulpverlening:** Erkende organisaties (zoals 1712, de ZSG's, Unia en het Vlaams Meldpunt) zullen nooit hun beroepsgeheim of dossiers uit handen geven aan een nieuw centraal privéplatform.

## Beslissing
Wij ontwerpen SIGNAL als een **federatief vertrouwensnetwerk (`SIGNAL Trust Network`)**:
- De gebruiker gebruikt SIGNAL voor **anonieme oriëntatie (`SIGNAL Zero` & `Compass`)** en **persoonlijke, versleutelde voorbereiding (`Private Vault`)**.
- Wanneer de gebruiker hulp wil, draagt hij via **`SIGNAL Bridge`** een door hemzelf geselecteerd pakket over aan de juiste bevoegde partnerorganisatie (`Verified Help Network` met `Trust Passport`).
- Elke partnerorganisatie blijft verwerkingsverantwoordelijke voor haar eigen ontvangen dossiers.

## Gevolgen
- **Positief:** Maximale maatschappelijke waarde en lagere drempels voor burgers, zonder dat SIGNAL een illegaal beschuldigingsregister of een centraal datalek-doelwit wordt.
- **Aandachtspunt:** Vereist duidelijke datastandaarden (`SIGNAL Connect API`) en formele samenwerkingsovereenkomsten met partnerorganisaties.
