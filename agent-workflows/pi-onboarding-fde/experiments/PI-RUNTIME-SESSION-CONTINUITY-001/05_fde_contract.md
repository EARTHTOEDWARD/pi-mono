---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 05_fde_contract
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

# 05 FDE Contract

## Workflow Under Protection

Saved-session resume in Pi.

## Contract

Pi should preserve session continuity by loading and rendering saved sessions
without crashing or requiring manual recovery when prior terminal output
contains repeated Markdown-looking prefix characters.

## Inputs To Cover

- terminal-output lines with many leading greater-than characters,
- saved-session entries containing transcript-like separators,
- resumed sessions where the problematic text appears before new user input,
- display paths that render prior session content before the user can recover.

## Out Of Scope

- redesigning Markdown rendering,
- changing transcript storage format without current reproduction,
- changing product identity,
- filing external maintainer comments,
- claiming a current runtime defect before live reproduction.

## Implementation Target Status

`undecided_until_current_reproduction`.
