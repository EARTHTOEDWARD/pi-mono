---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: acceptance-gates
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

# Acceptance Gates

## Pack Gate

The workflow pack is acceptable when a reviewer can follow the same user goal
through all nine experiment artifacts without source-provenance confusion.

## Onboarding Gate

The Onboarding Agent output is acceptable when it shows that first value is
blocked by session-continuity reliability, not by user misunderstanding.

## FDE Gate

The FDE Agent output is acceptable when it provides:

- a workflow contract for saved-session resume,
- a spec sketch for pathological Markdown-looking terminal output,
- an acceptance-test sketch,
- a verification witness status,
- a report-back note with no product or maintainer promises.

## Evidence Gate

The evidence gate is not closed. `current_runtime_reproduction` is required
before implementation can move out of
`undecided_until_current_reproduction`.

## Learning Gate

The learning delta must update the manual MVP process rule: product identity
and source provenance are separate fields and must not be merged into the case
name.
