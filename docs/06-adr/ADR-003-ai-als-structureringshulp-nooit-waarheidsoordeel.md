# ADR-003: AI Uitsluitend als Taal- en Structureringshulp, Nooit als Waarheidsoordeel

- **Status:** Geaccepteerd
- **Datum:** November 2026

## Context
Generatieve AI en taalmodellen kunnen gebruikers helpen om verwarrende gedachten te ordenen of juridische teksten te begrijpen. Tegelijkertijd bestaat de verleiding om AI in te zetten voor het analyseren van de "geloofwaardigheid", "urgentie" of "schuld" in getuigenissen.

## Beslissing
1. **Streng Verbod op Oordelende AI:** SIGNAL bouwt of gebruikt nooit AI die getuigenissen beoordeelt op waarheid, geloofwaardigheid, emotie of bewijskracht.
2. **Behoud van Originele Getuigenis (*Raw Testimony Preservation*):** Wanneer een gebruiker kiest voor AI-hulp bij het chronologisch ordenen van een tijdlijn, wordt de oorspronkelijke, onbewerkte tekst van de gebruiker altijd ongewijzigd en met tijdstempel bewaard naast het gestructureerde overzicht.
3. **Deterministische Routering:** De doorverwijzing naar hulplijnen (`1712`, `ZSG`, `Unia`, `Federale Ombudsman`) in `SIGNAL Compass` gebeurt via gecontroleerde, deterministische beslisregels en nooit via een onvoorspelbare AI-hallucinatie.
4. **Geen Externe LLM-afhankelijkheid:** De kernfuncties van SIGNAL werken volledig zonder externe AI-providers.

## Gevolgen
- **Positief:** Volledige naleving van de EU AI Act, bescherming van de bewijswaarde van de oorspronkelijke getuigenis in een latere rechtszaak, en nul risico op discriminerende AI-oordelen over slachtoffers.
