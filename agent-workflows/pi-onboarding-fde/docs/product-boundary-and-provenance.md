---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: product-boundary-and-provenance
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

# Product Boundary And Provenance

## Product Identity

The product identity for this case is `Pi`.

Do not encode source provenance, repository history, maintainer identity, or
legacy issue location into the problem identity.

## Stable Boundary

The stable product boundary is `pi_runtime`.

The capability boundary is both:

- `session_continuity`
- `pi_runtime_session_continuity`

## Case Identity

The case identity is `PI-RUNTIME-SESSION-CONTINUITY-001`.

Keep this case name stable if the pack later moves into upstream Pi docs,
workflow material, or a separate planning package.

## Evidence Provenance

| Evidence label | Meaning in this pack | Current status |
| --- | --- | --- |
| `legacy_public_issue_report` | A prior public report seeded the witness shape. | usable as stale evidence |
| `current_local_runtime_checkout` | This pack was authored inside the current local checkout. | docs-only evidence |
| `current_runtime_reproduction` | A live reproduction against current runtime behavior. | missing |
| `future_migration_assumption` | The pack may move to another repo or docs surface later. | assumption only |
| `pending_current_reproduction` | The case is waiting for live runtime confirmation. | active |

## Required Constraint

The legacy markdown-render report can justify a workflow handoff and a test
sketch. It cannot justify a current defect claim or an implementation target
without `current_runtime_reproduction`.
