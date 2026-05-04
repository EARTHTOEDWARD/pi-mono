# Specimen 002: Earendil Pi Markdown Render Crash

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

- Public issue: <https://github.com/badlogic/pi-mono/issues/3826>

## Source Summary

The public issue reports that Pi v0.70.2 can crash in the TUI markdown renderer
when rendering or resuming a session containing terminal-output lines with many
leading `>` characters. The report includes a stack-overflow error, a minimal
input pattern, a reproduction gist, expected behavior, and environment details.

This is a strong runtime-blocker specimen because the reported failure can make
a saved session impossible to resume until the session file is manually edited.

## Moment-of-Friction Record

```yaml
schema: sacp.agent_friction.v0
feedback_id: SACP-SPECIMEN-002
represented_user_goal: >
  Resume and continue a saved Pi session that includes pasted terminal or test
  output.
current_workflow: Rendering or resuming a TUI session.
moment_of_friction:
  trigger: TUI markdown renderer encountered long leading > sequences.
  page_or_command: Pi TUI session render/resume
  last_successful_step: Session contained terminal output or pytest/PDB-style separators.
  failed_or_confusing_step: >
    Renderer crashed while trying to display the session content.
expected_observation: >
  Pi should render the text, cap markdown nesting, degrade safely, or treat the
  terminal-output pattern as plain text.
observed_observation: >
  Pi hit a maximum call stack error in markdown rendering and could make the
  saved session impossible to resume without manual JSONL editing.
impact_on_user_goal: >
  The user or agent may be blocked from continuing the prior session, losing
  continuity and trust in session persistence.
evidence:
  error_or_blocker: Maximum call stack exceeded during markdown rendering.
  retry_count: unknown
  relevant_artifacts:
    - public GitHub issue #3826
    - reproduction gist linked from the issue
    - minimal long-leading-greater-than input pattern
    - version and environment details
  safe_session_excerpt: none
privacy:
  contains_private_user_data: no
  safe_to_share_raw_context: yes
agent_analysis:
  suspected_root_cause: >
    Markdown blockquote parsing or rendering recurses too deeply on terminal
    output that begins with repeated greater-than characters.
  uncertainty: >
    Based on the public issue report only. The current Earendil Pi repo may
    already contain a fix.
  workaround_attempted: Manual JSONL editing is described as a possible unblocker.
  workaround_result: User can potentially resume only after manual intervention.
recommended_route: product
requested_next_action:
  triage_level: T1
  report_back_channel: GitHub issue comment if this were run by Pi maintainers.
  what_would_count_as_resolved: >
    TUI rendering does not crash on repeated greater-than terminal output, and
    existing affected sessions can be resumed without manual file edits.
```

## Triage Output

```yaml
feedback_id: SACP-SPECIMEN-002
customer_problem: >
  A rendering bug can block users from resuming a saved session that contains
  ordinary terminal output, damaging trust in Pi's session persistence.
represented_user_goal: >
  Continue work from a saved TUI session without manual recovery.
expected_vs_observed:
  expected: >
    The TUI renders, escapes, caps, or degrades difficult markdown-looking
    terminal output without crashing.
  observed: >
    The TUI markdown renderer can overflow the call stack and prevent session
    resume.
triage_level: T1
triage_reason: >
  This is a blocked-core-value case. It can prevent a user or agent from
  resuming a saved session, and the workaround requires manual session-file
  editing. It is not T0 because no privacy, data exfiltration, payment, or
  security risk is visible from the public report.
evidence_present:
  - public issue URL
  - concrete error class
  - minimal input pattern
  - reproduction gist
  - version and environment details
evidence_missing:
  - confirmation against current Earendil Pi repo
  - maintainer reproduction result
  - whether affected sessions can be auto-recovered
privacy_or_safety_risk: low
duplicate_or_cluster:
  duplicate_of: unknown
  new_signal_added: >
    Shows that renderer robustness is not just display polish; it can become
    session-continuity risk.
recommended_route: product_spec
route_subtype: runtime_regression
owner: >
  If real: Earendil Pi maintainer or trusted contributor. For SACP practice:
  SACP triage operator.
next_action: >
  Reproduce against current Pi, add a regression witness for long leading >
  terminal output, and decide whether the renderer should cap nesting, escape
  terminal output, or degrade to plain text.
report_back_due: 2026-05-02
severity_clock:
  first_response_due: 2026-05-02
  next_decision_due: 2026-05-02
submitter_response: >
  Thanks. We understand that you were trying to resume a saved Pi session, but
  terminal output with long leading > sequences can crash the TUI markdown
  renderer and may require manual JSONL editing to recover. We are treating this
  as T1 blocked-core-value feedback because it affects session continuity. The
  next step is to reproduce against the current Pi repo and add a regression
  witness. We will report back by 2026-05-02 with accepted, duplicate, already
  fixed, or clarification status.
reward_recommendation: >
  If SACP reward rules applied, this would deserve elevated useful-feedback
  points because it includes a reproduction path, environment details, a clear
  expected behavior, and a core workflow impact.
implementation_candidate:
  accepted: needs_human
  proposed_spec: >
    Pi TUI markdown rendering should never crash or block session resume on
    terminal-output strings that look like deeply nested blockquotes.
  acceptance_test_sketch: >
    Add a renderer regression test with a line containing at least 80 leading
    greater-than characters around terminal text. Assert render completes
    without stack overflow and returns bounded output. Add a session-resume
    fixture containing the same pattern.
open_risks:
  - The issue may already be fixed in the current Earendil Pi repo.
  - The correct fix may belong in markdown parsing, terminal-output escaping, or
    session rendering policy.
  - The public issue may not reflect all affected environments.
```

## SACP Learning

This specimen validates the stronger triage doctrine. It should not be treated
as ordinary UI polish merely because the visible failure is a renderer bug. The
customer problem is session continuity: if a user or agent cannot resume work,
trust in the product's memory layer is harmed.

Compared with specimen 001, this is a higher severity item:

- `specimen-001` is T3 because the product can still be used despite misleading
  labels
- `specimen-002` is T1 because the user may be blocked from resuming a session

## Friction Register Update

This specimen exercises:

- `F006`: reports need concrete reproduction evidence to avoid persuasive but
  ungrounded bug claims
- `F010`: the route should be product/runtime robustness, not merely UI polish
- `F013`: current Earendil Pi state must be verified before product claims
