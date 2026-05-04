---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: non-goals
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

# Non-Goals

This workflow pack is documentation only.

Do not use this pack to:

- edit runtime source,
- edit package docs or changelogs,
- add slash commands,
- add dashboards,
- add automations,
- edit `.pi/extensions/`,
- open or update GitHub issues,
- open pull requests,
- post maintainer-facing comments,
- claim that a current defect exists,
- claim that a fix has shipped.

The only allowed output is a Markdown workflow record that can later guide live
reproduction, spec work, and test placement.
