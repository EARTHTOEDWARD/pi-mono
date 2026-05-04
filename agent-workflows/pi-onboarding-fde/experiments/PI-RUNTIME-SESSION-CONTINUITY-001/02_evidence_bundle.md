---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 02_evidence_bundle
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

# 02 Evidence Bundle

## Evidence Sources

| Label | Source | Status | Use |
| --- | --- | --- | --- |
| `legacy_public_issue_report` | Imported specimen 002 source | stale | witness seed |
| `current_local_runtime_checkout` | Local checkout containing this docs pack | current | workflow packaging context |
| `current_runtime_reproduction` | Live runtime run and current fixture | current | accepted as implementation evidence |
| `future_migration_assumption` | Planned portability of case materials | assumption | packaging constraint |
| `pending_current_reproduction` | Current evidence gate | closed | preserved as the pre-implementation gate |

## Source Files

- `docs/chatgpt-project-sources/pi-agent/13_SPECIMEN_002_EARENDIL_PI_MARKDOWN_RENDER_CRASH.md`
- `docs/chatgpt-project-sources/pi-agent/21_PI_LOOP_CLOSURE_WITNESS_001_003.md`

## Evidence Boundary

This evidence can support a manual workflow handoff, a runtime contract draft,
and an acceptance-test sketch. It cannot support a statement that current Pi
still reproduces the failure.

## Current Runtime Evidence

- current renderer behavior reproduced the stack overflow before the patch,
- current saved-session resume behavior is now covered by
  `packages/coding-agent/test/session-continuity.test.ts`,
- current renderer behavior is now covered by
  `packages/tui/test/markdown.test.ts`,
- current assistant-message display behavior is now covered by
  `packages/coding-agent/test/assistant-message.test.ts`,
- the implemented policy is safe degradation to escaped/plain text for
  pathological blockquote-looking terminal output.
