# Triage Dashboard Mock Data

## Purpose

Provide a one-page operator-facing mock data set for the first three public
legacy Earendil Pi specimens.

This is not a real dashboard implementation. It is the minimum visibility model
needed to test whether a human operator can quickly see:

- what needs attention first
- what route the item should take
- who owns the next action
- when the submitter should hear back
- where evidence is stale or incomplete

## Operator View

| Rank | Feedback ID | Severity | Problem | Route | Route Subtype | Report-Back Due | Next Action | Risk Flag |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `SACP-SPECIMEN-002` | T1 | TUI markdown renderer can crash and block session resume. | `product_spec` | `runtime_regression` | 2026-05-02 | Reproduce against current Pi and add a regression witness. | Current Earendil repo not visible. |
| 2 | `SACP-SPECIMEN-003` | T2 | Prompt RPC lacks video/audio support for multimodal workflows. | `product_spec` | `strategic_capability_request` | 2026-05-03 | Decide core vs provider extension vs integration recipe. | Privacy and payload constraints unresolved. |
| 3 | `SACP-SPECIMEN-001` | T3 | `pi config` may mislabel skill source directories. | `product_spec` | `small_product_correction` | 2026-05-08 | Reproduce current behavior and decide whether label fix is accepted. | Current Earendil repo not visible. |

## Structured Rows

```yaml
dashboard_generated: 2026-05-01
source_status: simulated_from_public_legacy_badlogic_pi_mono_issues
operator_note: >
  These rows test SACP / Fractal Lab operator visibility. They do not claim
  current Earendil Pi priority or unresolved status.
items:
  - feedback_id: SACP-SPECIMEN-002
    source_issue: https://github.com/badlogic/pi-mono/issues/3826
    source_status: public_legacy_issue
    title: TUI Markdown renderer stack-overflows on long leading > lines
    triage_level: T1
    severity_name: blocked_core_value
    customer_problem: >
      Saved session continuity can be blocked by a renderer crash on terminal
      output that resembles deeply nested markdown blockquotes.
    represented_user_goal: Resume and continue a saved Pi session.
    expected_vs_observed:
      expected: TUI renders, escapes, caps, or degrades difficult terminal output.
      observed: Renderer can overflow the call stack and block session resume.
    recommended_route: product_spec
    route_subtype: runtime_regression
    owner: current_pi_maintainer_or_sacp_triage_operator
    next_action: reproduce_current_pi_and_add_regression_witness
    report_back_due: 2026-05-02
    severity_clock:
      first_response_due: 2026-05-02
      next_decision_due: 2026-05-02
    operator_priority_reason: >
      Highest priority because the user or agent may be unable to resume a
      saved session without manual file editing.
    risk_flags:
      - external_evidence_staleness
      - current_repo_visibility_missing
    linked_specimen: ../../feedback-specimens/specimen-002-earendil-pi-markdown-render-crash.md

  - feedback_id: SACP-SPECIMEN-003
    source_issue: https://github.com/badlogic/pi-mono/issues/3200
    source_status: public_legacy_issue
    title: Support video/audio content in prompt command
    triage_level: T2
    severity_name: high_value_friction
    customer_problem: >
      A downstream integrator wants Pi to forward video and audio content so
      multimodal models can answer questions about screen recordings or audio.
    represented_user_goal: Use Pi as a backend for multimodal media analysis.
    expected_vs_observed:
      expected: Prompt content support covers video/audio for capable providers.
      observed: Public request says only image content is supported in that path.
    recommended_route: product_spec
    route_subtype: strategic_capability_request
    owner: current_pi_product_dri_or_sacp_triage_operator
    next_action: decide_core_vs_provider_extension_vs_integration_recipe
    report_back_due: 2026-05-03
    severity_clock:
      first_response_due: 2026-05-03
      next_decision_due: 2026-05-03
    operator_priority_reason: >
      Strategically interesting and concrete, but not a universal runtime
      blocker.
    risk_flags:
      - privacy_constraints_unresolved
      - payload_size_constraints_unresolved
      - external_evidence_staleness
    linked_specimen: ../../feedback-specimens/specimen-003-earendil-pi-video-audio-prompt-support.md

  - feedback_id: SACP-SPECIMEN-001
    source_issue: https://github.com/badlogic/pi-mono/issues/3978
    source_status: public_legacy_issue
    title: pi config hardcodes ~/.pi/agent/ path in group label
    triage_level: T3
    severity_name: improvement_candidate
    customer_problem: >
      The configuration surface may mislead users about where skills are loaded
      from, causing avoidable directory and resource-origin confusion.
    represented_user_goal: Inspect Pi configuration and understand active skill directories.
    expected_vs_observed:
      expected: Skills from ~/.agents/skills appear under an accurate source label.
      observed: Public issue says they appear under a ~/.pi/agent label.
    recommended_route: product_spec
    route_subtype: small_product_correction
    owner: current_pi_maintainer_or_sacp_triage_operator
    next_action: reproduce_current_label_behavior_and_decide_fix_or_decline
    report_back_due: 2026-05-08
    severity_clock:
      first_response_due: 2026-05-06
      next_decision_due: 2026-05-08
    operator_priority_reason: >
      Concrete and useful, but the user can likely continue using the product.
    risk_flags:
      - external_evidence_staleness
      - possible_deliberate_compatibility_abstraction
    linked_specimen: ../../feedback-specimens/specimen-001-earendil-pi-config-path-label.md
```

## Operator Visibility Test

A useful first dashboard should let the operator answer these questions in less
than one minute:

- Which customer problem is most urgent?
- Which item has the earliest report-back clock?
- Which items need human maintainer judgement?
- Which items are stale because current Earendil Pi state is unavailable?
- Which items are implementation candidates, and what kind?
- Which submitter response should go out next?

## Result

This mock data exposes the minimum dashboard columns:

- feedback ID
- severity
- customer problem
- expected-vs-observed summary
- recommended route
- route subtype
- owner
- next action
- report-back due
- risk flags
- linked specimen

The dashboard should sort by severity first, then report-back due, then stale or
privacy risk.
