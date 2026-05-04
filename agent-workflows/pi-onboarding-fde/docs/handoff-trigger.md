---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: handoff-trigger
  artifact_kind: workflow_doc
  artifact_status: draft_manual_mvp
  product_identity: Pi
  stable_boundary: pi_runtime
  capability_boundary: pi_runtime_session_continuity
  capability_focus: session_continuity
  implementation_target_status: undecided_until_current_reproduction
  evidence_labels:
    - legacy_public_issue_report
    - current_local_runtime_checkout
    - current_runtime_reproduction
    - future_migration_assumption
    - pending_current_reproduction
  required_next_evidence:
    - current_runtime_reproduction
---

# Handoff Trigger

The Onboarding Agent hands the case to the FDE Agent when first value depends on
runtime behavior rather than onboarding instruction.

## Trigger

Hand off when all are true:

- the user goal is to resume a saved Pi session,
- first value is blocked or fragile,
- the observed risk is session-continuity reliability,
- the next useful work is spec, test, or verification witness design,
- the current defect status remains `undecided_until_current_reproduction`.

## Non-Trigger

Do not hand off only because the user needs clearer copy, a tutorial, or a
better explanation. The handoff is for cases where documentation cannot make
the first-value path reliable.

## Handoff Packet

The handoff packet must include:

- product identity: `Pi`,
- stable boundary: `pi_runtime`,
- capability boundary: `pi_runtime_session_continuity`,
- user goal: resume and continue saved session,
- blocker: runtime/session-continuity reliability,
- evidence status: stale witness seed plus pending current reproduction,
- FDE request: draft workflow contract, spec/test sketch, and witness status.
