# Pi Loop Closure Witness 001-003

## Purpose

Run the first three public legacy Earendil Pi specimens through the revised loop:

```text
feedback -> evidence -> evaluation -> decision -> work -> verification -> report-back -> learning
```

This is a simulated SACP / Fractal Lab witness. It does not claim current
Earendil Pi priority or unresolved status. Public legacy evidence may be stale
because the current `earendil-works/pi` repo is not visible from this
environment.

## Summary

| Specimen | Main Customer Problem | Evaluation | Decision | Next Unclosed Edge |
| --- | --- | --- | --- | --- |
| `001` config path label | User may misunderstand where skills are loaded from. | Relevant, adequate but stale. | Defer until current behavior is reproduced. | `needs_evidence` |
| `002` markdown render crash | User or agent may be unable to resume a saved session. | Relevant, strong but stale. | Accept if current reproduction confirms. | `needs_acceptance_test` |
| `003` video/audio prompt support | Downstream integrator wants multimodal media prompt support. | Relevant but strategic. | Needs human product decision. | `needs_human_decision` |

## Specimen 001: Config Path Label

```yaml
feedback_record:
  feedback_id: SACP-SPECIMEN-001
  actor: human
  represented_user_goal: Inspect Pi configuration and understand active skill directories.
  workflow_stage: configuration
  last_known_good_state: Skills exist under ~/.agents/skills.
  action_taken: Run pi config.
  expected_observation: Skills from ~/.agents/skills appear under an accurate source label.
  observed_observation: Public issue says they appear under a ~/.pi/agent label.
  impact: Confusion about which directory to edit or trust.
  evidence_refs:
    - https://github.com/badlogic/pi-mono/issues/3978
  privacy_status: public_low_risk

evidence_bundle:
  evidence_status: stale
  sources_checked:
    github_issue: public legacy issue #3978
    docs: not checked
    current_repo: unavailable
    local_reproduction: not attempted
  reproduction_attempt:
    attempted: false
    method: none
    result: blocked_by_current_repo_visibility
    confidence: medium
  duplicate_candidates: unknown
  privacy_findings: no obvious private data
  stale_evidence_findings: current Earendil Pi state unavailable
  missing_evidence:
    - current Pi reproduction
    - maintainer intent for combined resource labels
  recommended_next_probe: Reproduce pi config against current Earendil Pi.

evaluation:
  relevance_status: relevant
  relevance_reason: Concrete configuration UX mismatch tied to a real user task.
  represented_user_goal_valid: yes
  product_boundary_match: yes
  evidence_quality: stale
  strategic_alignment: aligned
  noise_or_abuse_risk: low
  reward_eligible: yes
  recommended_next_edge: needs_evidence

decision_packet:
  decision: defer
  decision_owner: current Pi maintainer or SACP triage operator for simulation
  decision_reason: Useful and likely low-cost, but current behavior is unverified.
  route: product
  accepted_work_type: none_until_reproduced
  verification_witness: current-repo config output
  report_back_message: >
    We understand the configuration label may misrepresent where skills are
    loaded from. The next step is to reproduce this against current Pi before
    accepting a label fix.

work_issue_spec_test:
  status: blocked
  intended_behavior: pi config labels resource origins accurately.
  acceptance_test: >
    In a temporary home, create skills under ~/.agents/skills and
    ~/.pi/agent/skills. Assert config output does not misrepresent either source.

outcome_note:
  status: simulated_not_shipped
  original_problem_improved: unknown
  blocker: current-repo reproduction unavailable

learning_delta:
  changed_belief: >
    Small correctness reports can be relevant but should not create work until
    stale external evidence is refreshed.
  changed_artifact:
    - feedback relevance evaluation rule: stale evidence can be relevant but blocked.
  next_experiment: Reproduce one specimen against a current repo or local fixture.
```

## Specimen 002: Markdown Render Crash

```yaml
feedback_record:
  feedback_id: SACP-SPECIMEN-002
  actor: human
  represented_user_goal: Resume and continue a saved Pi session.
  workflow_stage: core_workflow
  last_known_good_state: Saved session exists with terminal output.
  action_taken: Resume or render session in Pi TUI.
  expected_observation: TUI renders or safely degrades difficult terminal output.
  observed_observation: Public issue reports call-stack overflow in markdown rendering.
  impact: User or agent may be blocked from resuming work without manual file editing.
  evidence_refs:
    - https://github.com/badlogic/pi-mono/issues/3826
  privacy_status: public_low_risk

evidence_bundle:
  evidence_status: stale_but_actionable
  sources_checked:
    github_issue: public legacy issue #3826
    reproduction_gist: referenced by public issue
    current_repo: unavailable
    local_reproduction: not attempted
  reproduction_attempt:
    attempted: false
    method: none
    result: blocked_by_current_repo_visibility
    confidence: medium_high
  duplicate_candidates: unknown
  privacy_findings: no obvious private data
  stale_evidence_findings: current Earendil Pi state unavailable
  missing_evidence:
    - current renderer behavior
    - regression test harness location
  recommended_next_probe: Create a renderer regression fixture if current repo is available.

evaluation:
  relevance_status: relevant
  relevance_reason: Core session-continuity blocker with concrete reproduction shape.
  represented_user_goal_valid: yes
  product_boundary_match: yes
  evidence_quality: strong_but_stale
  strategic_alignment: aligned
  noise_or_abuse_risk: low
  reward_eligible: yes
  recommended_next_edge: needs_acceptance_test

decision_packet:
  decision: accept_if_reproduced
  decision_owner: current Pi maintainer or SACP triage operator for simulation
  decision_reason: Session-resume crashes are blocked-core-value friction.
  route: product
  accepted_work_type: spec_and_test
  verification_witness: renderer regression test plus session-resume fixture
  report_back_message: >
    We understand the TUI renderer may crash on terminal output and block session
    resume. This should become a regression witness if current Pi reproduces it.

work_issue_spec_test:
  status: draft_ready
  intended_behavior: TUI rendering never crashes on terminal output with many > characters.
  non_goals: Redesign markdown rendering or terminal transcript formatting.
  acceptance_test: >
    Add a fixture with at least 80 leading greater-than characters in terminal
    output. Assert rendering completes without stack overflow and session resume
    still succeeds.

outcome_note:
  status: simulated_not_shipped
  original_problem_improved: unknown
  blocker: current repo unavailable for reproduction and test placement

learning_delta:
  changed_belief: >
    Some feedback is not mainly about severity; it exposes the verification
    witness needed to protect a core workflow.
  changed_artifact:
    - loop controller rule: runtime blockers should advance to acceptance-test edge.
  next_experiment: Convert this witness into a real test if current Pi source is available.
```

## Specimen 003: Video And Audio Prompt Support

```yaml
feedback_record:
  feedback_id: SACP-SPECIMEN-003
  actor: human
  represented_user_goal: Use Pi as a backend for multimodal media analysis.
  workflow_stage: integration
  last_known_good_state: Prompt command supports image content.
  action_taken: Request video/audio content support for prompt RPC.
  expected_observation: Prompt content supports video/audio for capable providers.
  observed_observation: Public issue says prompt does not accept video/audio content.
  impact: Downstream screen-recording or audio-analysis products need a bypass.
  evidence_refs:
    - https://github.com/badlogic/pi-mono/issues/3200
  privacy_status: public_low_risk_but_media_feature_has_future_privacy_risk

evidence_bundle:
  evidence_status: sufficient_for_strategy_question
  sources_checked:
    github_issue: public legacy issue #3200
    current_repo: unavailable
    provider_matrix: not checked
    privacy_policy: not checked
  reproduction_attempt:
    attempted: false
    method: none
    result: not_applicable_until_strategy_decision
    confidence: medium
  duplicate_candidates: unknown
  privacy_findings: future media payloads may contain sensitive recordings
  stale_evidence_findings: current Earendil Pi state unavailable
  missing_evidence:
    - provider capability matrix
    - maintainer view on core vs extension boundary
    - number of downstream users affected
  recommended_next_probe: Ask product maintainer whether media prompt support belongs in core.

evaluation:
  relevance_status: relevant
  relevance_reason: Concrete downstream integration gap, but product direction is strategic.
  represented_user_goal_valid: yes
  product_boundary_match: unclear
  evidence_quality: adequate
  strategic_alignment: human_decision
  noise_or_abuse_risk: low
  reward_eligible: human_decision
  recommended_next_edge: needs_human_decision

decision_packet:
  decision: needs_human_decision
  decision_owner: product DRI or maintainer
  decision_reason: >
    The request is coherent, but accepting it could expand product scope,
    provider abstraction, payload handling, and privacy obligations.
  route: strategy
  accepted_work_type: none_until_strategy_decision
  verification_witness: provider-gated schema tests if accepted
  report_back_message: >
    We understand the request for video/audio prompt support. The next decision
    is whether this belongs in core, provider extensions, documentation, or a
    separate integration recipe.

work_issue_spec_test:
  status: blocked
  intended_behavior: undecided
  non_goals: Do not add media payload handling before product boundary decision.
  acceptance_test: >
    If accepted, add schema tests and provider-gated capability tests for
    video/audio content parts.

outcome_note:
  status: simulated_not_shipped
  original_problem_improved: no
  blocker: human strategic decision required

learning_delta:
  changed_belief: >
    Relevant feedback can still be blocked because it would move product
    direction. Evaluation must separate relevance from acceptance.
  changed_artifact:
    - feedback relevance evaluation rule: strategic alignment can require human decision.
  next_experiment: Add one deliberately out-of-scope feature request to test rejection.
```

## Cross-Specimen Findings

| Specimen | What Codex Handles Well | Human Bottleneck | Main Risk |
| --- | --- | --- | --- |
| `001` | Structures the mismatch and acceptance test. | Current repo reproduction. | Stale evidence creating unnecessary work. |
| `002` | Identifies core workflow impact and verification witness. | Test placement and current reproduction. | Underestimating a renderer issue as UI polish. |
| `003` | Separates relevance from implementation readiness. | Product boundary decision. | Relevant request pulling product in wrong direction. |

## Loop Controller Result

The three specimens should not be sorted mainly by T1/T2/T3. They differ by the
edge that blocks closure:

- `001`: evidence edge is blocked
- `002`: acceptance-test and verification edge is central
- `003`: human strategic decision edge is blocked

This supports Pro's correction: the operator view should show loop state and
next unclosed edge, not just urgency.

## Evaluation Agent Result

All three Pi specimens are relevant. None are performative, silly, or reward
gaming. But relevance is not the same as acceptance:

- `001` is relevant but stale
- `002` is relevant and likely acceptance-test-ready if reproduced
- `003` is relevant but strategically gated

The evaluation agent therefore protects the loop in both directions: it prevents
bad feedback from distorting product direction, and it prevents useful but
uncomfortable feedback from being dismissed.
