---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 02_evidence_bundle
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

# 02 Evidence Bundle

## Evidence Sources

| Label | Source | Status | Use |
| --- | --- | --- | --- |
| `legacy_public_issue_report` | [source] | stale | witness seed |
| `current_local_runtime_checkout` | [source] | current | local context only |
| `current_runtime_reproduction` | [source] | missing | required before implementation |
| `future_migration_assumption` | [source] | assumption | packaging constraint |
| `pending_current_reproduction` | [source] | active | evidence gate |

## Evidence Boundary

[State what this evidence can support and what it cannot support.]

## Missing Evidence

[List the evidence required to move from planning to implementation.]
