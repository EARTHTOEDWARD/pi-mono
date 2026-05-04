---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 05_fde_contract
  artifact_kind: reusable_template
  artifact_status: template
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

# 05 FDE Contract

## Workflow Under Protection

[Name the workflow the FDE must protect.]

## Contract

[State the runtime contract in observable product terms.]

## Inputs To Cover

[List pathological but valid inputs or saved-session shapes.]

## Out Of Scope

[List behaviors that the FDE must not expand into.]
