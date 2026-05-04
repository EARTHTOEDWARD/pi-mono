---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 04_handoff_packet
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

# 04 Handoff Packet

## Recipient

Pi FDE Agent

## Handoff Reason

The Onboarding Agent cannot close the loop because the first-value path depends
on runtime session-continuity reliability. Documentation can explain resume, but
it cannot prove that saved-session rendering survives pathological terminal
output.

## Packet

- case id: `PI-RUNTIME-SESSION-CONTINUITY-001`
- product identity: `Pi`
- stable boundary: `pi_runtime`
- capability boundary: `pi_runtime_session_continuity`
- user goal: resume and continue a saved session without manual recovery
- blocker: session resume may be fragile around Markdown-looking terminal
  output
- implementation target status:
  `undecided_until_current_reproduction`
- evidence status: `legacy_public_issue_report` plus
  `pending_current_reproduction`

## Requested FDE Work

Draft a workflow contract for saved-session resume, a spec/test sketch for
renderer/session-resume reliability, a verification witness status, a
non-promissory report-back, and a learning delta for the manual MVP process.
