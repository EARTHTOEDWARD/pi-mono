---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: working-goal
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

# Working Goal

Help a user resume and continue a saved Pi session without manual recovery, even
when the session contains terminal output that can look like deeply nested
Markdown.

## Milestone

Create a reusable manual workflow that can show when an onboarding problem is
actually blocked by runtime session-continuity reliability and should be handed
to an FDE Agent for specification, test, and witness work.

## Definition Of First Value

First value is reached when the user can reopen a saved session and keep
working from the prior context without editing session storage by hand.

## Current Blocker

The blocker is not a missing explanation or onboarding copy. The blocker is
that session resume may be fragile when saved terminal output contains repeated
Markdown-looking prefix characters.

## Closure Target

The workflow closes only when the case has:

- a clear intake record,
- source provenance separated from product identity,
- an FDE handoff trigger,
- a spec and acceptance-test sketch,
- a verification witness status,
- a report-back that avoids shipped-fix promises,
- a learning delta for the manual MVP process.
