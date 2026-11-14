# ADR-002: Safe Matching Standaard Technisch Uitgeschakeld in MVP

- **Status:** Geaccepteerd
- **Datum:** November 2026

## Context
Het detecteren van overeenkomsten tussen twee onafhankelijke meldingen over dezelfde betrokkene (`Safe Matching`) is een van de meest besproken en onderscheidende concepten achter SIGNAL (geïnspireerd op o.a. Callisto in de VS).

## Probleem bij Directe Activering
1. **Artikel 10 AVG:** Het vergelijken van namen of identificatoren van vermeende plegers van strafbare feiten vormt een verwerking van strafrechtelijke persoonsgegevens, waarvoor een expliciete wettelijke grondslag en passende waarborgen vereist zijn.
2. **Risico op Valse Matches & Misbruik:** Zonder menselijke beoordeling, sybil-preventie en strikte verificatie kan een kwaadwillige persoon onder meerdere accounts valse matches creëren of vissen naar bestaande meldingen (*fishing attacks*).

## Beslissing
1. In de eerste productiereleases (Fase 1 en Fase 2) blijft de **`Safe Matching`-module technisch uitgeschakeld**.
2. In de **SIGNAL 4.0 Productdemo** wordt de werking van `Safe Matching` en `SIGNAL Handshake` uitsluitend getoond als een **educatieve, volledig fictieve simulatie** om het concept te toetsen bij juristen, de Gegevensbeschermingsautoriteit (GBA) en partnerorganisaties.
3. Pas wanneer voor een specifiek domein een sluitende rechtsgrond, een goedgekeurde DPIA en een gemachtigd menselijk reviewteam (vierogenprincipe) aanwezig zijn, kan de module in Fase 3 voorwaardelijk worden geactiveerd.

## Gevolgen
- **Positief:** `SIGNAL Compass`, `Private Vault` en `SIGNAL Bridge` kunnen veel sneller en veiliger live gaan zonder te worden geblokkeerd door de zwaarste art. 10 AVG-vraagstukken.
- **Positief:** Wanneer een match in een latere fase wél plaatsvindt, verloopt de opvolging verplicht via `SIGNAL Handshake` (geen automatische notificaties aan melders, altijd eerst menselijke beoordeling en individuele benadering).
