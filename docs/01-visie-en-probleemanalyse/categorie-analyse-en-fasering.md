# Categorie-analyse, Multilabel-architectuur & Verantwoorde Fasering

Hoewel de maatschappelijke aanleiding voor SIGNAL vaak ligt bij seksueel grensoverschrijdend gedrag, is de onderliggende vertrouwensinfrastructuur (`Compass`, `Vault`, `Bridge`, `Handshake`) veel breder inzetbaar. Tegelijkertijd zou het onverantwoord zijn om alle domeinen op dag één op dezelfde manier open te zetten.

---

## 1. De Acht Hoofdcategorieën van SIGNAL

Elke categorie deelt dezelfde rustige, toegankelijke gebruikersinterface aan de voorkant, maar activeert achter de schermen **verschillende juridische waarschuwingen, bewaartermijnen, doorverwijsroutes en toegangsrechten**.

| # | Categorie | Mogelijke situaties | Maatschappelijk potentieel | Juridisch & veiligheidsrisico |
|---|---|---|---|---|
| **1** | **Seksueel grensoverschrijdend gedrag** | Aanranding, dwang, ongewenst seksueel gedrag, misbruik van gezagspositie | Zeer groot maatschappelijk belang | **Zeer hoog** — Bijzondere categorie persoonsgegevens (art. 9 AVG) + strafrechtelijke aard (art. 10 AVG) + acuut veiligheids- en traumarisico |
| **2** | **Pesten, intimidatie & machtsmisbruik** | Psychosociale belasting op het werk, grensoverschrijdend gedrag in sport, cultuur, hoger onderwijs of verenigingen | Breed toepasbaar, hoge dagelijkse behoefte aan dossieropbouw | **Hoog** — Raakt arbeidsrecht (welzijnswetgeving) en tuchtrecht |
| **3** | **Discriminatie** | Racisme, genderdiscriminatie, uitsluiting op basis van handicap, leeftijd, geloof of geaardheid | Breed toepasbaar, duidelijke bevoegde partners (Unia, IGVM, VMRI) | **Hoog** — Gevoelige persoonsgegevens (etniciteit, gezondheid, geaardheid onder art. 9 AVG) |
| **4** | **Bedrijfsfraude & klokkenluiden** | Corruptie, boekhoudfraude, witwassen, misbruik van publieke middelen of subsidies | Duidelijke professionele toepassing | **Hoog** — Wettelijke bescherming klokkenluiders hangt af van het volgen van de juiste interne/externe kanalen (Wet 28 nov. 2022) |
| **5** | **Consumentenmisstanden & oplichting** | Systematische misleiding, wanpraktijken door malafide aannemers, webshops of financiële tussenpersonen | Groot gebruikersbereik, uitstekend voor vroege validatie van routering | **Middel tot hoog** — Risico op laster bij valse meldingen, maar minder art. 9 AVG-gevoelig |
| **6** | **Institutionele misstanden** | Structureel misbruik of verwaarlozing binnen zorginstellingen, jeugdhulp, internaten of overheidsdiensten | Zeer groot maatschappelijk belang | **Zeer hoog** — Betreft vaak minderjarigen of afhankelijke personen (`SIGNAL Guardian` vereist) |
| **7** | **Online misbruik & afpersing** | Cyberstalking, doxxing, niet-consensuele verspreiding van intieme beelden, sextortion, ernstige bedreiging | Sterk groeiende digitale relevantie | **Hoog** — Vereist specifieke begeleiding rond digitaal bewijs (`Evidence Coach`) en snelle escalatie bij acuut gevaar |
| **8** | **Milieu- en veiligheidsmisstanden** | Illegale lozingen, gevaarlijke arbeidsomstandigheden, structureel negeren van veiligheidsnormen | Sterk publiek belang | **Hoog** — Kan bedrijfsgeheimen en complexe inspectiebevoegdheden raken |

---

## 2. Vergelijkende Scorematrix (Impact vs. Uitvoerbaarheid vs. Risico)

*Scores van 1 tot 5 (Strategische productinschatting):*
- **Impact:** 5 = zeer hoge maatschappelijke toegevoegde waarde.
- **Uitvoerbaarheid (Startfase):** 5 = relatief eenvoudig en veilig te starten met bestaande partners; 1 = zeer zware juridische en operationele voorwaarden.
- **Risico:** 5 = zwaarste juridische, psychologische en beveiligingsrisico's.

| Categorie | Impact (1–5) | Uitvoerbaarheid (1–5) | Risicozwaarte (1–5) | Primaire waarde van SIGNAL in fase 1 |
|---|---|---|---|---|
| **Consumentenmisstanden** | 4/5 | 5/5 | 3/5 | Routering naar inspectiediensten + gestructureerde chronologie |
| **Machtsmisbruik op het werk / in organisaties** | 5/5 | 4/5 | 4/5 | Tijdlijnopbouw (`Timeline`) + wegwijzer naar vertrouwenspersoon, externe preventiedienst of Vlaams Meldpunt |
| **Discriminatie** | 5/5 | 4/5 | 4/5 | Drempelverlagende oriëntatie + warme overdracht (`Bridge`) naar Unia / IGVM / VMRI |
| **Milieu- en veiligheidsmisstanden** | 4/5 | 4/5 | 4/5 | Bevoegde toezichthouder vinden zonder eigen identiteit direct prijs te geven |
| **Online intimidatie & afpersing** | 4/5 | 3/5 | 4/5 | `Evidence Coach` (screenshots/headers veilig bewaren) + directe hulp bij urgente dreiging |
| **Klokkenluiden & fraude** | 5/5 | 3/5 | 4/5 | Heldere `Reality Check` over wettelijke klokkenluidersbescherming + routering naar Federale Ombudsman / FIRM-IFDH |
| **Seksueel grensoverschrijdend gedrag** | 5/5 | 2/5 | 5/5 | `SIGNAL Zero` + directe warme lijn naar ZSG / 1712 + streng afgeschermde persoonlijke kluis |
| **Institutioneel misbruik** | 5/5 | 2/5 | 5/5 | Extra beschermingslaag (`SIGNAL Guardian`) + gespecialiseerde menselijke intake |

---

## 3. Multilabel-categorisering zonder Dossiervervuiling

In de praktijk valt een ervaring zelden netjes in één hokje. Voorbeeld:
- Een stagiair ervaart **machtsmisbruik** op de werkvloer, gecombineerd met **seksueel grensoverschrijdend gedrag** en **discriminatie**.
- Een werknemer ontdekt **milieufraude** en wordt na een interne vraag hierover **geïntimideerd**.

### Hoe SIGNAL dit oplost:
1. **Behoeftegestuurde intake (`SIGNAL Compass`):** De gebruiker hoeft niet zelf een juridisch wetsartikel te kiezen, maar duidt in begrijpelijke taal aan wat er speelt.
2. **Multilabel-tagging op metadata-niveau:** Het systeem kan meerdere thema's koppelen zodat `SIGNAL Compass` een gecombineerde hulproute toont (bijv. én 1712/ZSG voor persoonlijke opvang, én uitleg over arbeidsrechtelijke bescherming).
3. **Compartimentering bij overdracht (`SIGNAL Bridge`):** Wanneer de gebruiker besluit informatie over te dragen aan een specifieke instantie (bijv. Unia voor het discriminatie-aspect), kiest de gebruiker expliciet welke tijdlijnitems en bijlagen voor die specifieke bevoegdheid worden gedeeld. Dossiers worden nooit ongevraagd samengevoegd.

---

## 4. De Verantwoorde Uitrolvolgorde (Drie Golven)

1. **Golf 1 — Validatie van Compass, Timeline & Routering:**
   - Focus op **intimidatie/machtsmisbruik** en **consumentenmisstanden**, plus algemene, anonieme wegwijzerinformatie (`SIGNAL Zero`) voor alle categorieën (zodat iemand in nood altijd direct het juiste nummer van 1712 of een ZSG krijgt).
2. **Golf 2 — Gespecialiseerde Partnerkoppelingen (`SIGNAL Bridge`):**
   - Uitbreiding van de gestructureerde overdracht naar **discriminatie**, **klokkenluiden**, **online misbruik** en **milieu/veiligheid** in formele samenwerking met bevoegde Belgische instellingen.
3. **Golf 3 — Hoog-gevoelige Dossiers & Voorwaardelijke Matching (`Safe Matching & Handshake`):**
   - Pas nadat de beveiligingsarchitectuur, DPIA, onafhankelijke governance en professionele opvolgingscapaciteit bewezen en extern geaudit zijn, kan binnen een strikt afgebakend partnerschap worden onderzocht of gecontroleerde overeenkomstdetectie bij **seksuele en institutionele misstanden** rechtmatig en veilig kan worden ingezet.
