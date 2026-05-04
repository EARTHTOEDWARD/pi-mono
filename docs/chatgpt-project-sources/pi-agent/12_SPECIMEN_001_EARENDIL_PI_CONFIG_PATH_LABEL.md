# Specimen 001: Earendil Pi Config Path Label

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

- Public issue: <https://github.com/badlogic/pi-mono/issues/3978>

## Source Summary

The public issue reports that `pi config` displays skills located in
`~/.agents/skills` under a label that implies they are from `~/.pi/agent/`.
The reporter provides reproduction steps, an expected label, a suspected
implementation location, and the Pi version.

This is a good first specimen because it is concrete, low privacy risk, and has
a clear expected-vs-observed mismatch.

## Moment-of-Friction Record

```yaml
schema: sacp.agent_friction.v0
feedback_id: SACP-SPECIMEN-001
represented_user_goal: >
  Understand and manage which skills Pi has loaded from user-level skill
  directories.
current_workflow: Running `pi config` to inspect available skills.
moment_of_friction:
  trigger: Configuration UI displayed a misleading resource group label.
  page_or_command: pi config
  last_successful_step: User created or already had skills under ~/.agents/skills.
  failed_or_confusing_step: >
    Skills physically located under ~/.agents/skills appeared under a label that
    points to ~/.pi/agent/.
expected_observation: >
  Skills from ~/.agents/skills should be labelled as coming from ~/.agents/ or
  otherwise distinguished from ~/.pi/agent resources.
observed_observation: >
  pi config grouped those skills under a User label tied to ~/.pi/agent/.
impact_on_user_goal: >
  The user can still inspect configuration, but the UI makes resource origin
  ambiguous and may cause users or agents to edit the wrong directory.
evidence:
  error_or_blocker: Misleading group label in configuration output.
  retry_count: unknown
  relevant_artifacts:
    - public GitHub issue #3978
    - reproduction steps in public issue
    - suspected implementation location named by reporter
  safe_session_excerpt: none
privacy:
  contains_private_user_data: no
  safe_to_share_raw_context: yes
agent_analysis:
  suspected_root_cause: >
    Resource discovery can load skills from both Pi and agents directories, but
    the configuration label appears to use a hardcoded Pi path.
  uncertainty: >
    This is based only on the public issue report, not local reproduction or
    maintainer confirmation.
  workaround_attempted: none recorded
  workaround_result: unknown
recommended_route: product
requested_next_action:
  triage_level: T3
  report_back_channel: GitHub issue comment if this were run by Pi maintainers.
  what_would_count_as_resolved: >
    pi config labels resources by their actual source directory or clearly
    separates ~/.agents and ~/.pi resources.
```

## Triage Output

```yaml
feedback_id: SACP-SPECIMEN-001
customer_problem: >
  The configuration surface may mislead users about where skills are loaded
  from, creating avoidable confusion for humans and agents managing Pi resources.
represented_user_goal: >
  Inspect Pi configuration and understand which skill directories are active.
expected_vs_observed:
  expected: >
    Skills from ~/.agents/skills appear under an accurate ~/.agents label or
    separate category.
  observed: >
    Skills from that directory appear under a label associated with ~/.pi/agent.
triage_level: T3
triage_reason: >
  This is a concrete usability and correctness issue in a configuration surface.
  It does not appear to block core Pi usage, signup, activation, privacy, or
  safety, so it is not T0/T1. It is likely worth product or UX correction because
  misleading configuration labels can cause repeated support friction.
evidence_present:
  - public issue URL
  - reproduction steps
  - expected behavior
  - version number
  - suspected implementation area
evidence_missing:
  - local reproduction by maintainer or triage agent
  - screenshot inspection
  - duplicate search across current Earendil Pi repo
privacy_or_safety_risk: low
duplicate_or_cluster:
  duplicate_of: unknown
  new_signal_added: >
    Shows a class of friction where configuration surfaces expose internal
    resource routing ambiguously.
recommended_route: product_spec
route_subtype: small_product_correction
owner: >
  If real: Earendil Pi maintainer or trusted contributor. For SACP practice:
  SACP triage operator.
next_action: >
  Reproduce the issue against current Pi, check whether current Earendil Pi still
  has the same resource-label behavior, then either accept a small config UI fix
  or close with explanation if already resolved.
report_back_due: 2026-05-08
severity_clock:
  first_response_due: 2026-05-06
  next_decision_due: 2026-05-08
submitter_response: >
  Thanks. We understand that you are using pi config to inspect skill resources,
  but skills from ~/.agents/skills appear under a label that points to
  ~/.pi/agent. We are treating this as a concrete configuration UX issue. The
  next step is to reproduce it against the current Pi repo and check whether the
  label should reflect the actual resource source. We will report back by
  2026-05-08 with accepted, duplicate, already fixed, or declined status.
reward_recommendation: >
  If SACP reward rules applied, this would be useful-feedback points: specific,
  reproducible, low privacy risk, and implementation-relevant. It would not yet
  qualify for a high-value feature reward unless it changed product behavior or
  prevented repeated support load.
implementation_candidate:
  accepted: needs_human
  proposed_spec: >
    pi config should group or label user skills according to the actual resource
    source directory. Skills from ~/.agents/skills should not be presented as if
    they originate from ~/.pi/agent.
  acceptance_test_sketch: >
    Create a temporary home with one skill under ~/.agents/skills and one under
    ~/.pi/agent/skills. Run the config listing in a test harness and assert that
    each skill appears under the correct source label or an explicitly combined
    label that does not misrepresent origin.
open_risks:
  - The issue may already be fixed in the current Earendil Pi repo.
  - The label may be a deliberate compatibility abstraction.
  - The public issue body may omit context available to maintainers.
```

## SACP Learning

This specimen shows why moment-of-friction capture should happen before a pull
request:

- the problem is easier to understand as a configuration trust issue than as a
  code change
- the public issue includes enough structure to become a useful triage record
- the triage output can identify missing evidence without dismissing the user
- the report-back message makes the submitter feel heard even before a fix is
  promised

## Friction Register Update

This specimen exercises existing risks and adds one meta-friction:

- `F004`: the feedback register had not yet been tested against a real specimen
- `F010`: implementation route could be over-classified as core rather than
  product/config UX
- `F011`: duplicate checks could hide source-directory differences if clustered
  too aggressively
- `F013`: public legacy evidence may be stale because current Earendil Pi state
  is not visible from this environment
