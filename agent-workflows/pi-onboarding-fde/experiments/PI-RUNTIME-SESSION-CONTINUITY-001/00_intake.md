---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 00_intake
  artifact_kind: completed_experiment_artifact
  artifact_status: complete_manual_mvp
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

# 00 Intake

## User Goal

Resume and continue a saved Pi session without manual recovery.

## First Value

The user reaches first value when Pi restores the saved session and the user can
continue work from the prior context without editing session data by hand.

## Observed Friction

Imported source material describes a legacy case where terminal output with many
leading greater-than characters could make saved-session rendering fragile. In
this workflow pack, that report is a witness seed for session-continuity risk,
not proof of current runtime behavior.

## Evidence

- `legacy_public_issue_report`: imported specimen describing session resume risk
  from Markdown-looking terminal output.
- `current_local_runtime_checkout`: this pack was authored in the current local
  checkout as docs-only workflow material.
- `current_runtime_reproduction`: missing.
- `future_migration_assumption`: the case may later move to upstream docs,
  workflow material, or a planning package.
- `pending_current_reproduction`: active.

## Current Decision

Implementation target status:
`undecided_until_current_reproduction`.
