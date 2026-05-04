---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 01_goal_frame
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

# 01 Goal Frame

## Product Identity

Pi

## Stable Boundary

`pi_runtime`

## Capability Boundary

`session_continuity` / `pi_runtime_session_continuity`

## User Job

The user wants Pi to preserve work across sessions so a saved runtime session can
be resumed as a usable continuation point.

## Success Criteria

- saved session opens,
- prior conversational and terminal context is visible enough to continue,
- pathological Markdown-looking terminal output does not block resume,
- no manual session-file editing is required.

## Failure Mode To Avoid

The saved session becomes unreadable or unopenable because terminal output is
handled as unsafe or unbounded Markdown structure.
