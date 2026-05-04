---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 03_first_value_blocker
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

# 03 First Value Blocker

## First Value Path

1. User saves or returns to a prior Pi session.
2. Pi loads the saved session state.
3. Pi renders prior conversational and terminal context.
4. User continues the task without manual recovery.

## Blocker

The witness seed shows a class of risk where terminal output that resembles
deep Markdown blockquote syntax can threaten the saved-session resume path.

## Blocker Classification

- onboarding instruction: no
- user confusion: no
- runtime/session reliability: yes

## Handoff Requirement

FDE handoff is required because onboarding cannot make first value reliable if
the runtime resume/rendering path is fragile. The FDE Agent must define the
runtime contract, current reproduction requirement, acceptance-test sketch, and
verification witness.
