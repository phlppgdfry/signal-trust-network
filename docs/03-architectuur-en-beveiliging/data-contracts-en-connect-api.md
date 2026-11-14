# Data Contracts: Trust Passport, Consent & SIGNAL Connect API

Om een **federatief vertrouwensnetwerk** te bouwen waarin gebruikers hun dossier gecontroleerd kunnen overdragen aan erkende organisaties (`SIGNAL Bridge`), moeten de datastructuren helder, minimaal en controleerbaar zijn.

Hieronder staan de referentie-datamodellen (TypeScript / JSON Schema-stijl) die zowel de architectuur als de **SIGNAL 4.0 interactieve demo** aansturen.

---

## 1. `SIGNAL Trust Passport` (Geverifieerd Organisatieprofiel)

Elke organisatie in het `Verified Help Network` krijgt een machine- én mensleesbaar profiel zodat gebruikers vóór verzending exact zien met wie ze te maken hebben:

```typescript
export interface TrustPassport {
  organizationId: string;
  name: string;
  officialDomain: string;
  jurisdiction: "BE-Federaal" | "BE-Vlaanderen" | "BE-Brussel" | "BE-Wallonië" | "EU";
  verificationStatus: "verified_statutory" | "verified_partner" | "directory_only";
  supportedCategories: SignalCategory[];
  legalBasisSummary: string;          // B1-uitleg van wettelijke opdracht
  confidentialityRegime: {
    professionalSecrecy: boolean;     // Beroepsgeheim (art. 458 Sw.) of wettelijke geheimhouding
    allowsAnonymousContact: boolean;
    dataControllerName: string;
    dpoContactUrl: string;
    retentionPolicySummary: string;
  };
  independentOversightBody: string;   // Bijv. "Vlaams Parlement / GBA / Federale Kamer"
  accessChannels: {
    bridgeApiEnabled: boolean;        // Ondersteunt digitale SIGNAL Bridge-overdracht
    phoneNumber?: string;             // Bijv. "1712"
    physicalIntakePossible: boolean;
    emergency24x7: boolean;
  };
  lastAuditedAt: string;              // ISO 8601 datum
}
```

---

## 2. `SIGNAL Timeline` & `Memory` Item Contract

Dwingt het onderscheid af tussen eigen herinnering, objectief bewijsstuk, derdenverklaring en latere aanvulling:

```typescript
export type TimelineEntryType =
  | "own_memory"          // Eigen ervaring / herinnering
  | "document_evidence"   // Screenshot, bericht, e-mail, foto, contract
  | "third_party_note"    // Verklaring of observatie van een derde / getuige
  | "addendum_correction" // Latere aanvulling zonder het origineel te overschrijven
  | "official_step";      // Reeds gezette stap (bijv. gesprek met HR of huisarts)

export type MemoryCertainty = "exact" | "approximate_date" | "uncertain_detail";

export interface TimelineEntry {
  entryId: string;
  createdAt: string;                  // Onwijzigbaar registratietijdstempel in de Vault
  incidentDateOrPeriod: string;       // Wanneer vond het voorval plaats?
  entryType: TimelineEntryType;
  certainty: MemoryCertainty;
  title: string;
  rawUserNarrative: string;           // Originele tekst van de gebruiker (nooit door AI overschreven)
  categories: string[];               // Multilabel-tags
  attachments?: {
    attachmentId: string;
    fileName: string;
    mimeType: string;
    sha256Hash: string;               // Bewijsintegriteit
    timestampedAt: string;
  }[];
  parentEntryId?: string;             // Indien dit een addendum_correction is op een eerdere notitie
}
```

---

## 3. `SIGNAL Bridge` Overdrachtspakket (`HandoverPackage`)

Wanneer een gebruiker op Niveau 4 van `Safe Disclosure` besluit om geselecteerde onderdelen van zijn tijdlijn over te dragen aan een partnerorganisatie:

```typescript
export interface BridgeHandoverPackage {
  handoverId: string;
  createdAt: string;
  recipientOrganizationId: string;    // Verwijst naar een gevalideerd TrustPassport
  disclosureLevel: "anonymous_consultation" | "pseudonymous_bridge" | "named_handover";
  selectedEntryIds: string[];         // Enkel de items die de melder expliciet heeft aangevinkt
  selectedAttachmentIds: string[];
  userExpectationGoal:
    | "listening_and_advice"
    | "preserve_evidence_with_partner"
    | "mediation_or_prevention"
    | "formal_investigation_request";
  consentReceipt: {
    consentId: string;
    grantedAt: string;
    purposeAccepted: string;
    understandsNotAutomaticPoliceReport: true; // Verplichte expliciete bevestiging
    revocabilityScopeExplained: true;
  };
  deliveryStatus: "draft" | "encrypted_in_transit" | "received_by_partner";
  partnerReceiptTimestamp?: string;
}
```

---

## 4. `SIGNAL Handshake` Review Record (Voorwaardelijke Fase 3 Module)

Indien binnen een wettelijk getoetst domein een mogelijke overeenkomst wordt onderzocht, legt dit contract vast dat er **nooit** automatische koppeling of identiteitsuitwisseling plaatsvindt:

```typescript
export interface HandshakeReviewRecord {
  reviewId: string;
  domainCategory: string;
  legalBasisReference: string;        // Verplichte verwijzing naar DPIA & wettelijke grondslag
  status:
    | "queued_for_four_eyes_review"
    | "dismissed_false_positive"
    | "individual_counseling_offered"
    | "separate_consents_verified"
    | "transferred_to_legal_coordinator";
  reviewerOneId: string;              // Vierogencontrole: Beoordelaar 1
  reviewerTwoId: string;              // Vierogencontrole: Beoordelaar 2
  automatedNotificationSentToReporters: false; // Harde invariant: altijd false!
  identitiesSharedBetweenReporters: false;     // Harde invariant totdat advocaat begeleidt
  auditTrailHash: string;
}
```
