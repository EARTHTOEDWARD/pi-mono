---
artifact_header:
  case_id: PI-RUNTIME-SESSION-CONTINUITY-001
  artifact_id: 08_learning_delta
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

# 08 Learning Delta

## Changed Belief

The manual MVP process must separate product identity from source provenance at
the start of every case. A stale source report can still be useful, but it must
not rename the product problem or imply current runtime state.

## Changed Artifact

Update the workflow templates and prompts to carry these fields separately:

- `product_identity`
- `stable_boundary`
- `capability_boundary`
- `evidence_labels`
- `implementation_target_status`

## Manual MVP Update

Product identity and source provenance are separate fields. The case remains
`PI-RUNTIME-SESSION-CONTINUITY-001` even if it later moves to upstream Pi docs,
workflow material, or a separate planning package.

## Next Experiment

The next experiment is no longer basic current reproduction for this case. The
manual MVP rule should now require closing the loop from witness seed to current
runtime fixture before report-back language is upgraded from "suspected" to
"locally fixed."
