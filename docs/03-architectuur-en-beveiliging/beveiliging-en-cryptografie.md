# Beveiliging, Cryptografie & Het SIGNAL Continuity Protocol

## 1. De Gouden Architectuurregel

> **Een gewone platformbeheerder, databasebeheerder of cloud-engineer mag nooit inhoudelijke toegang hebben tot alle meldingen.**

Bij een klassieke webapplicatie kan een administrator met productietoegang de database openen en alle rijen lezen. Voor een platform als SIGNAL is dat onaanvaardbaar: één gecompromitteerd beheerdersaccount of één kwaadwillige medewerker zou dan duizenden intieme getuigenissen kunnen inzien.

Daarom dwingt SIGNAL zeven technische beveiligingsprincipes af:

1. **Autorisatie per individueel dossier (Cryptografisch & Policy-based):**
   Toegang wordt niet geregeld door alleen knoppen in de user interface te verbergen, maar door cryptografische sleutelscheiding per dossier (*Envelope Encryption*).
2. **Drievoudige Opslagscheiding (Tri-Domain Isolation):**
   - *Domein A (`Identity`):* Contact- of authenticatiegegevens (indien de gebruiker die vrijwillig heeft aangemaakt).
   - *Domein B (`Vault & Evidence`):* De inhoudelijke tijdlijn, notities en bijlagen, versleuteld met een unieke Data Encryption Key (`DEK`) per dossier.
   - *Domein C (`Matching Tokens` — indien geactiveerd):* Gehashte of cryptografisch afgeschermde vergelijkingskenmerken zonder de bijbehorende getuigenis.
3. **Geen gevoelige inhoud in logs, analytics of foutmeldingen:**
   Request bodies, zoekopdrachten, dossierinhoud en bestandsnamen worden op middleware-niveau gefilterd voordat telemetrie of foutopsporing plaatsvindt.
4. **Professionele toegang uitsluitend binnen een toegewezen overdracht (`SIGNAL Bridge`):**
   Een hulpverlener bij een partnerorganisatie kan uitsluitend het specifieke overdrachtspakket ontsleutelen dat de melder via `SIGNAL Bridge` bewust aan die organisatie heeft geadresseerd.
5. **Vierogencontrole & Tijdgebonden Noodtoegang (*Break-Glass*):**
   Voor kritieke systeem- of beveiligingsincidenten geldt een strikt gelogd *four-eyes* protocol met onafhankelijke toetsing door de DPO / Security Lead, zonder dat ruwe dossiertekst ontsleuteld hoeft te worden.
6. **Bewust ontwerp van End-to-End Encryptie (E2EE) per stroom:**
   - Voor de **persoonlijke kluis (`Private Vault`)** is client-side / zero-knowledge versleuteling ideaal omdat alleen de gebruiker toegang hoeft te hebben.
   - Daarbij hoort eerlijke gebruikerscommunicatie: als iemand zijn lokale herstelsleutel verliest bij pure zero-knowledge encryptie, kan SIGNAL het dossier niet herstellen.
   - Zodra een gebruiker kiest voor **`SIGNAL Bridge`** (overdracht naar een hulpverlener), wordt het geselecteerde deelpakket opnieuw versleuteld voor de publieke sleutel van de ontvangende partnerorganisatie.
7. **Verplichte Penetratietest & Red-Teaming vóór Livegang:**
   Geen enkele echte melding wordt verwerkt voordat een onafhankelijke Europese security-partij zowel de webapplicatie, de API's als de KMS/sleutelarchitectuur heeft getest.

---

## 2. Bewijsintegriteit (`Evidence Integrity`) zonder Valse Beloftes

Wanneer een gebruiker een screenshot, e-mail, audiofragment of PDF toevoegt aan de `Evidence Vault`, voert het systeem drie stappen uit:

1. **SHA-256 Integriteitshash:** Direct bij opname wordt een cryptografische vingerafdruk (SHA-256) berekend van het originele bestand.
2. **Gekwalificeerde Tijdregistratie:** De hash wordt gekoppeld aan een onwijzigbaar tijdstempel, zodat later aantoonbaar is dat het bestand op die datum in exact die vorm bestond en sindsdien niet is gemanipuleerd.
3. **Onwijzigbare Versiehistoriek (`SIGNAL Timeline`):** Als een gebruiker later een toelichting toevoegt of corrigeert, blijft de oorspronkelijke versie inclusief tijdstempel bewaard naast het addendum.

> **Juridische disclaimer in de interface:** SIGNAL legt altijd eerlijk uit dat een tijdstempel en hash bewijzen *wanneer* een bestand in de kluis is geplaatst en dat het *daarna niet is gewijzigd*, maar dat dit op zichzelf geen rechterlijk bewijs vormt dat de inhoud van een screenshot oorspronkelijk echt is. Daarom geeft `SIGNAL Evidence Coach` tips om originele bronbestanden en berichten op het toestel zelf te bewaren.

---

## 3. Cryptografische Verkenning voor Toekomstige Matching (PSI)

Mocht in Fase 3 (na expliciete goedkeuring onder art. 9 en 10 AVG) samengewerkt worden tussen twee of meer onafhankelijke hulporganisaties, dan kan **Private Set Intersection (PSI)** of vergelijkbare *Privacy-Enhancing Technology (PET)* worden onderzocht:
- Hiermee kunnen twee erkende instellingen controleren of er een overeenkomst bestaat tussen twee door hen begeleide dossiers, **zonder dat zij hun volledige bestanden met elkaar of met een centrale server hoeven te delen**.
- **Belangrijke kanttekening:** Cryptografie lost een technisch beveiligingsprobleem op, maar vervangt **nooit** de vereiste wettelijke grondslag (art. 9/10 AVG), de noodzaak om valse matches door naamgenoten of aliassen te filteren, of de verplichte menselijke beoordeling (`SIGNAL Handshake`).

---

## 4. `SIGNAL Continuity` — Wat als SIGNAL verdwijnt of uitvalt?

Gebruikers vertrouwen mogelijk jarenlang hun meest kwetsbare documentatie toe aan hun persoonlijke kluis. Wat gebeurt er als de stichting achter SIGNAL haar financiering verliest, stopt of getroffen wordt door een ernstige storing?

Het **`SIGNAL Continuity` Protocol** is een verplichte statutaire en technische waarborg:
1. **Open, Draagbaar Exportformaat op Elk Moment:** Elke gebruiker kan zijn eigen `Timeline` en `Evidence Vault` altijd met één klik exporteren als een versleuteld én menselijk leesbaar dossierpakket (PDF-overzicht + originele bestanden + SHA-256 manifest).
2. **Geen Vendor Lock-in voor Partners:** Partnerorganisaties ontvangen overdrachten via de gedocumenteerde `SIGNAL Connect API` zodat hun interne dossiervorming nooit afhankelijk is van het voortbestaan van SIGNAL.
3. **Financiële Continuïteitsreserve (Runway Escrow):** De VZW/Stichting houdt statutair een geoormerkte reserve aan om bij een eventuele beëindiging het platform minimaal **6 tot 12 maanden in een veilige export- en uitfaseringsmodus** in de lucht te houden.
4. **Geen Overname van Dossiers door Commerciële Partijen:** Bij ontbinding van de VZW/Stichting mogen persoonlijke kluizen **nooit** worden verkocht of overgedragen aan een commerciële partij; niet-geëxporteerde kluizen worden na afloop van de wettelijke kennisgevingsperiode cryptografisch vernietigd (*crypto-shredding*) onder toezicht van de DPO en een gerechtsdeurwaarder/auditor.
