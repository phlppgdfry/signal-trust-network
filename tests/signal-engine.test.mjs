import test from "node:test";
import assert from "node:assert/strict";
import {
  SIGNAL_CATEGORIES,
  PARTNER_PASSPORTS,
  FORBIDDEN_ANTI_FEATURES,
  evaluateCompassRoute,
  createTimelineAddendum,
  buildBridgeHandoverPackage,
  evaluateHandshakeSafety,
  checkDossierAccessAuthorization
} from "../site/assets/lib/signal-engine.mjs";

test("SIGNAL 4.0 supports all 8 categories across 3 responsible rollout waves", () => {
  assert.equal(SIGNAL_CATEGORIES.length, 8);
  const waves = new Set(SIGNAL_CATEGORIES.map((c) => c.wave));
  assert.deepEqual([...waves].sort(), [1, 2, 3]);
  const wave3Ids = SIGNAL_CATEGORIES.filter((c) => c.wave === 3).map((c) => c.id);
  assert.ok(wave3Ids.includes("seksueel-grensoverschrijdend-gedrag"));
  assert.ok(wave3Ids.includes("institutionele-misstanden"));
});

test("SIGNAL Compass uses deterministic routing (never AI) and prioritizes ZSG within 72h forensic window", () => {
  const result = evaluateCompassRoute({
    need: "talk_to_human",
    categoryIds: ["seksueel-grensoverschrijdend-gedrag"],
    roleContext: "direct_reporter",
    recentIncidentUnder72h: true
  });

  assert.equal(result.deterministicEngine, true);
  assert.equal(result.aiUsedForRoutingDecision, false);
  assert.ok(result.recommendedPartners.some((p) => p.organizationId === "org-zsg"));
  assert.ok(result.urgentAlerts.some((a) => a.type === "forensic_window"));
});

test("SIGNAL Compass supports multilabel categorization and SIGNAL Witness / Guardian protocols", () => {
  const witnessResult = evaluateCompassRoute({
    need: "document_privately",
    categoryIds: ["pesten-intimidatie-machtsmisbruik", "discriminatie"],
    roleContext: "witness"
  });

  assert.equal(witnessResult.matchedCategories.length, 2);
  assert.ok(witnessResult.witnessGuidance);
  assert.equal(witnessResult.witnessGuidance.protocol, "SIGNAL Witness Route");
  assert.ok(witnessResult.recommendedPartners.some((p) => p.organizationId === "org-unia"));
  assert.ok(witnessResult.recommendedPartners.some((p) => p.organizationId === "org-vlaams-meldpunt"));

  const guardianResult = evaluateCompassRoute({
    need: "talk_to_human",
    categoryIds: ["institutionele-misstanden"],
    roleContext: "minor_guardian"
  });
  assert.ok(guardianResult.urgentAlerts.some((a) => a.type === "guardian_protection"));
});

test("SIGNAL Timeline addendum preserves original raw testimony untouched (ADR-003)", () => {
  const initialEntries = [
    {
      entryId: "tl-101",
      createdAt: "2026-10-04T21:15:00+02:00",
      incidentDateOrPeriod: "2026-10-02",
      entryType: "own_memory",
      certainty: "exact",
      title: "Originele herinnering",
      rawUserNarrative: "Dit is mijn oorspronkelijke tekst van 4 oktober.",
      categories: ["pesten-intimidatie-machtsmisbruik"]
    }
  ];

  const updated = createTimelineAddendum(
    initialEntries,
    "tl-101",
    "Aanvulling op 10 oktober: ik vond de agenda-uitnodiging terug.",
    "2026-10-10T09:00:00+02:00"
  );

  assert.equal(updated.length, 2);
  assert.equal(updated[0].rawUserNarrative, "Dit is mijn oorspronkelijke tekst van 4 oktober.");
  assert.equal(updated[1].entryType, "addendum_correction");
  assert.equal(updated[1].parentEntryId, "tl-101");
  assert.equal(updated[1].preservesOriginalUntouched, true);
});

test("SIGNAL Bridge requires explicit consent and shares only selected timeline items", () => {
  const entries = [
    { entryId: "tl-1", title: "Deelbaar item" },
    { entryId: "tl-2", title: "Privé item dat in de kluis blijft" }
  ];

  assert.throws(() => {
    buildBridgeHandoverPackage({
      dossierId: "demo-1",
      timelineEntries: entries,
      selectedEntryIds: ["tl-1"],
      recipientOrganizationId: "org-vlaams-meldpunt",
      understandsNotAutomaticPoliceReport: false,
      revocabilityScopeExplained: true
    });
  }, /vereist expliciete geïnformeerde toestemming/);

  const pkg = buildBridgeHandoverPackage({
    dossierId: "demo-1",
    timelineEntries: entries,
    selectedEntryIds: ["tl-1"],
    recipientOrganizationId: "org-vlaams-meldpunt",
    understandsNotAutomaticPoliceReport: true,
    revocabilityScopeExplained: true
  });

  assert.equal(pkg.includedEntryCount, 1);
  assert.equal(pkg.excludedPrivateEntryCount, 1);
  assert.deepEqual(pkg.includedEntryIds, ["tl-1"]);
  assert.ok(pkg.bridgePhysicalToken.startsWith("SIG-BE-"));
});

test("Safe Matching & SIGNAL Handshake enforces ADR-002, Four-Eyes review, and SIGNAL Fairness", () => {
  const mvpState = evaluateHandshakeSafety({ mvpPhase: 1, legalBasisApproved: false });
  assert.equal(mvpState.status, "disabled_by_default_adr_002");
  assert.equal(mvpState.automatedNotificationSentToReporters, false);
  assert.equal(mvpState.canProceedToHandshake, false);

  const hearsayState = evaluateHandshakeSafety({
    mvpPhase: 3,
    legalBasisApproved: true,
    reviewerOneApproved: true,
    reviewerTwoApproved: true,
    isHearsayOrCopycat: true
  });
  assert.equal(hearsayState.status, "blocked_by_signal_fairness");
  assert.equal(hearsayState.canProceedToHandshake, false);

  const oneReviewerState = evaluateHandshakeSafety({
    mvpPhase: 3,
    legalBasisApproved: true,
    reviewerOneApproved: true,
    reviewerTwoApproved: false
  });
  assert.equal(oneReviewerState.status, "awaiting_four_eyes_human_review");
  assert.equal(oneReviewerState.canProceedToHandshake, false);

  const collectiveState = evaluateHandshakeSafety({
    mvpPhase: 3,
    legalBasisApproved: true,
    reviewerOneApproved: true,
    reviewerTwoApproved: true,
    reporterOneIndividualConsent: true,
    reporterTwoIndividualConsent: true
  });
  assert.equal(collectiveState.status, "transferred_to_legal_collective_coordinator");
  assert.equal(collectiveState.automatedNotificationSentToReporters, false);
  assert.equal(collectiveState.identitiesSharedBetweenReporters, false);
  assert.equal(collectiveState.directVictimGroupChatCreated, false);
});

test("Golden Architecture Rule blocks sysadmin, B2B clients, and non-designated partners", () => {
  const sysadminAttempt = checkDossierAccessAuthorization({ actorRole: "platform_sysadmin" });
  assert.equal(sysadminAttempt.allowed, false);
  assert.equal(sysadminAttempt.auditAlert, "BLOCKED_GOLDEN_RULE_SYSADMIN_READ_ATTEMPT");

  const b2bClientAttempt = checkDossierAccessAuthorization({ actorRole: "sponsor_or_b2b_client" });
  assert.equal(b2bClientAttempt.allowed, false);

  const wrongPartnerAttempt = checkDossierAccessAuthorization({
    actorRole: "partner_caseworker",
    actorOrganizationId: "org-unia",
    bridgedToOrganizationId: "org-vlaams-meldpunt"
  });
  assert.equal(wrongPartnerAttempt.allowed, false);

  const authorizedPartner = checkDossierAccessAuthorization({
    actorRole: "partner_caseworker",
    actorOrganizationId: "org-vlaams-meldpunt",
    bridgedToOrganizationId: "org-vlaams-meldpunt"
  });
  assert.equal(authorizedPartner.allowed, true);
  assert.equal(authorizedPartner.scope, "bridged_package_only");
});

test("All 7 forbidden anti-features and 6 Belgian partner passports are defined", () => {
  assert.equal(FORBIDDEN_ANTI_FEATURES.length, 7);
  assert.equal(PARTNER_PASSPORTS.length, 6);
});
