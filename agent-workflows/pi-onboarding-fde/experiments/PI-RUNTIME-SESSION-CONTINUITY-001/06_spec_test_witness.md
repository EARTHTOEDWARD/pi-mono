---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 06_spec_test_witness
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

# 06 Spec Test Witness

## Spec Sketch

Saved-session rendering should complete without stack overflow or unrecoverable
display failure when terminal output includes long leading sequences of
greater-than characters.

If the renderer cannot faithfully format that content as Markdown, it should
degrade safely: cap nesting, escape the content, or render it as plain text.

## Acceptance Test Sketch

The current runtime fixture now covers:

- include a saved-session entry with terminal output containing at least 80
  leading greater-than characters on one line,
- resume or render the session through the current display path,
- assert that rendering completes,
- assert that the session remains usable for new input,
- assert that no manual session-file editing is required.

## Verification Witness

- status: `passed_current_runtime_fixture`
- current_runtime_reproduction: confirmed before patch with call-stack overflow
  in the Markdown render path
- renderer regression:
  `packages/tui/test/markdown.test.ts`
- saved-session resume regression:
  `packages/coding-agent/test/session-continuity.test.ts`
- assistant-message render regression:
  `packages/coding-agent/test/assistant-message.test.ts`

## Implementation Readiness

The spec/test sketch has been implemented for the manual MVP. Broader hardening
can add more pathological transcript shapes, but the core resume blocker now
has a current reproduction, runtime fix, and regression witness.
