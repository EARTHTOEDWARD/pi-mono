---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: workflow-pack-readme
  artifact_kind: workflow_pack_readme
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

# Pi Onboarding -> FDE Workflow Pack

This is a docs-only manual MVP workflow pack for one case:
`PI-RUNTIME-SESSION-CONTINUITY-001`.

The pack models a portable loop:

```text
Onboarding Agent -> FDE Agent
```

The user goal is to resume and continue a saved Pi session without manual
recovery. The loop treats session continuity as core value, not user confusion
or generic UI polish.

## Evidence Policy

The imported legacy markdown-render report is a witness seed only. It is not
treated as proof that the current local runtime still has a defect.

Accepted evidence labels in this pack:

- `legacy_public_issue_report`
- `current_local_runtime_checkout`
- `current_runtime_reproduction`
- `future_migration_assumption`
- `pending_current_reproduction`

The implementation target remains
`undecided_until_current_reproduction` until a current runtime reproduction or
equivalent current fixture is produced.

## Source Inputs

- `docs/chatgpt-project-sources/pi-agent/13_SPECIMEN_002_EARENDIL_PI_MARKDOWN_RENDER_CRASH.md`
- `docs/chatgpt-project-sources/pi-agent/21_PI_LOOP_CLOSURE_WITNESS_001_003.md`

These sources are used only as provenance and workflow evidence. This pack does
not edit them and does not claim maintainer action, shipped fixes, or current
runtime behavior.

## Layout

- `docs/`: pack-level goal, boundary, handoff, non-goal, and gate policy.
- `prompts/`: portable prompts for the Onboarding Agent and FDE Agent.
- `templates/`: reusable nine-artifact loop skeleton.
- `experiments/PI-RUNTIME-SESSION-CONTINUITY-001/`: completed manual MVP run.

## Manual MVP Rule

Keep product identity separate from source provenance. The product identity in
this workflow is `Pi`; the source evidence can still come from legacy public
reports, imported ChatGPT project sources, or a current local checkout.
