# Specimen 003: Earendil Pi Video and Audio Prompt Support

## Specimen Status

- Type: simulated external feedback specimen
- Date created: 2026-05-01
- Source system: public legacy `badlogic/pi-mono` GitHub issue
- Current product naming: Earendil Pi
- Current repo status: Mario says Pi is moving to `earendil-works/pi`; that repo
  is not publicly visible from this environment at the time of this specimen.
- Action status: no feedback was submitted to Earendil or Pi maintainers; this
  is a SACP / Fractal Lab triage exercise.

Source:

- Public issue: <https://github.com/badlogic/pi-mono/issues/3200>

## Source Summary

The public issue asks for the `prompt` RPC command to forward video and audio
content to the LLM, extending existing image support. The issue gives a concrete
downstream use case: Pi embedded as a chat backend for screen recordings, where
users want to ask questions about clips using multimodal models.

This is a useful request-style specimen because it is not framed as a current
crash. It is a product capability gap tied to a concrete customer workflow and
integration.

## Moment-of-Friction Record

```yaml
schema: sacp.agent_friction.v0
feedback_id: SACP-SPECIMEN-003
represented_user_goal: >
  Use Pi as a backend for asking questions about video or audio recordings.
current_workflow: Sending multimodal content through the prompt RPC command.
moment_of_friction:
  trigger: Prompt command supports images but not video or audio content parts.
  page_or_command: prompt RPC command
  last_successful_step: Image content can be passed through.
  failed_or_confusing_step: >
    Video and audio inputs cannot be forwarded in the same way to capable
    multimodal models.
expected_observation: >
  The prompt command should support video and audio content where the configured
  model/provider can consume those content parts.
observed_observation: >
  The public request says prompt currently accepts image content but lacks
  equivalent support for video and audio.
impact_on_user_goal: >
  A downstream product that embeds Pi cannot use Pi as the full chat backend for
  screen-recording or audio-analysis workflows without custom bypasses.
evidence:
  error_or_blocker: Capability gap in prompt content types.
  retry_count: not applicable
  relevant_artifacts:
    - public GitHub issue #3200
    - concrete screen-recording use case
    - suggested content-part mapping
  safe_session_excerpt: none
privacy:
  contains_private_user_data: no
  safe_to_share_raw_context: yes
agent_analysis:
  suspected_root_cause: >
    The prompt command schema or provider mapping may be limited to image
    content parts despite models/providers supporting video or audio.
  uncertainty: >
    Based only on the public issue report. Current provider abstractions and
    roadmap constraints are unknown.
  workaround_attempted: Downstream product may need custom integration outside Pi.
  workaround_result: unknown
recommended_route: product
requested_next_action:
  triage_level: T2
  report_back_channel: GitHub issue comment if this were run by Pi maintainers.
  what_would_count_as_resolved: >
    Maintainers decide whether media prompt support belongs in Pi core, provider
    extensions, or an integration recipe, and document the accepted path.
```

## Triage Output

```yaml
feedback_id: SACP-SPECIMEN-003
customer_problem: >
  A downstream integrator wants Pi to support video and audio prompt content so
  Pi can serve as the chat backend for screen-recording analysis workflows.
represented_user_goal: >
  Ask multimodal models questions about video or audio clips through Pi.
expected_vs_observed:
  expected: >
    Prompt content support extends beyond images when a capable provider/model
    is configured.
  observed: >
    The public issue says video and audio content are not currently accepted in
    the same path.
triage_level: T2
triage_reason: >
  This is high-value friction rather than an immediate blocker for all users.
  It is concrete, tied to a downstream integration, and could affect adoption in
  multimodal workflows. It is not T1 because the report is a capability request,
  not a core session, install, or activation failure.
evidence_present:
  - public issue URL
  - concrete downstream product use case
  - current-vs-desired content type behavior
  - suggested implementation direction
evidence_missing:
  - current Earendil Pi provider architecture
  - maintainer view on whether this belongs in core or extension
  - provider compatibility matrix
  - customer impact count beyond one public report
privacy_or_safety_risk: medium
duplicate_or_cluster:
  duplicate_of: unknown
  new_signal_added: >
    Shows a product-expansion signal around multimodal agent workflows and
    downstream applications embedding Pi.
recommended_route: product_spec
route_subtype: strategic_capability_request
owner: >
  If real: Earendil Pi maintainer or product DRI. For SACP practice: SACP triage
  operator.
next_action: >
  Ask maintainers whether media prompt content belongs in core RPC support,
  provider extensions, or documentation. If accepted, write a provider-gated
  spec with privacy and payload-size constraints.
report_back_due: 2026-05-03
severity_clock:
  first_response_due: 2026-05-03
  next_decision_due: 2026-05-03
submitter_response: >
  Thanks. We understand that you want Pi's prompt command to support video and
  audio content so a downstream screen-recording product can ask multimodal
  models about clips. We are treating this as T2 high-value product friction:
  not a universal blocker, but a concrete integration gap. The next step is to
  decide whether this belongs in core RPC support, a provider extension, or an
  integration recipe, and to define privacy and payload constraints before any
  implementation. We will report back by 2026-05-03 with accepted, deferred,
  needs-clarification, or declined status.
reward_recommendation: >
  If SACP reward rules applied, this would be useful-feedback points and a
  feature-reward candidate only if it materially shaped a shipped multimodal
  integration path.
implementation_candidate:
  accepted: needs_human
  proposed_spec: >
    Pi should define a provider-gated way for prompt RPC calls to include
    non-image media content where the selected model and provider support it.
    The spec must state size limits, privacy expectations, local-vs-remote
    handling, and fallback behavior.
  acceptance_test_sketch: >
    Add schema tests for image, audio, and video content parts. Add provider
    mapping tests that accept video/audio only for declared-capable providers
    and return a clear error for unsupported providers.
open_risks:
  - Media prompts may carry sensitive user recordings.
  - Payload size and transport choices could make this unsuitable for core.
  - Provider APIs may diverge enough that an extension route is better.
  - The issue may already be addressed or rejected in the current Earendil repo.
```

## SACP Learning

This specimen tests whether the triage process distinguishes feature-shaped
feedback from urgent runtime breakage.

The triage output should not auto-escalate this to T1 merely because it is
strategically interesting. It should preserve the real product signal while
asking the necessary product questions:

- is this core, provider extension, or documentation?
- what privacy constraints apply?
- how many downstream users or integrations need it?
- what fallback happens for unsupported providers?

## Friction Register Update

This specimen exercises:

- `F003`: agents and downstream products need a clear reason to spend attention
  on structured feedback
- `F010`: agent triage may over-route integration requests into core
- `F013`: current Earendil Pi state must be verified before product claims
