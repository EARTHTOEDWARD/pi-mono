# Earendil Pi Pre-PR Feedback Case Study

## Purpose

Use Earendil Pi's agent pull-request noise as the first concrete external
business case for the SACP / Fractal Lab GTM loop.

The case shows how a business problem can become a product-learning resource:
agent activity that currently arrives as speculative implementation work can be
captured earlier as structured feedback, triaged, and converted into specs and
tests only after maintainer acceptance.

## Source Status

Canonical naming for this case is Earendil Pi.

Mario Zechner wrote that Pi is moving from `badlogic/pi-mono` to
`earendil-works/pi`, that Pi is owned by Earendil, and that Pi decisions remain
under Mario, Armin, and Colin's governance. The public `earendil-works/pi` repo
may not yet be available or may be redirecting, so this case uses
`badlogic/pi-mono` only as legacy public evidence.

Public legacy evidence from `badlogic/pi-mono` still shows the contribution
gate: new-contributor issues and pull requests are automatically closed, short
concrete reports are requested, AI may help group or summarize reports, and
maintainers retain final decision authority.

Pi's public product site also supports the proposed MVP shape. Pi is presented
as a minimal, adaptable harness with extensions, skills, prompt templates,
themes, self-modification, and tree-structured shareable sessions. That makes a
Pi-native feedback extension more natural than a heavy external feedback
platform.

Sources:

- Mario on the Earendil move and governance:
  <https://mariozechner.at/posts/2026-04-08-ive-sold-out/>
- Legacy public contribution gate evidence:
  <https://github.com/badlogic/pi-mono/blob/main/CONTRIBUTING.md>
- Pi product and extensibility evidence: <https://pi.dev/>

## Business Problem

Current open-loop pattern:

```text
agent friction -> speculative code -> PR noise -> maintainer gate -> lost signal
```

This is not simply an open-source hygiene problem. It is a business-learning
problem.

Agents using Pi or OpenClaw hit friction, infer a possible fix, and express that
fix as an issue or pull request. By the time the artifact reaches GitHub, the
original product question has already been collapsed into code. Maintainers then
have to judge low-context implementation artifacts instead of deciding whether
the underlying friction matters.

Mario's current gate is a rational back-pressure mechanism. It protects
maintainer attention. But a defensive gate alone discards useful product signal.
The better system preserves the gate while moving agent expression one step
upstream.

## Proposed Closed Loop

Target pattern:

```text
agent friction -> structured feedback -> triage digest -> maintainer decision -> spec/tests -> implementation -> measured learning
```

The key move is to prevent agents from first expressing themselves as pull
requests. They should first express the friction:

- what goal they were pursuing
- what they expected
- what happened
- what evidence supports the report
- what local workaround or patch they attempted
- whether the right route appears to be docs, extension, core, provider, UX, or
  no action

Only accepted feedback should become an issue, implementation spec, acceptance
test, or pull request.

## MVP Shape

### Pi-Native `/feedback` Command

Add a Pi command:

```text
/feedback
```

The command asks the current session to produce a concise feedback record before
opening an issue or pull request.

Prompt shape:

```text
You appear to have hit friction or generated a possible contribution.
Before opening an issue or PR, produce a concise feedback record:
- What were you trying to do?
- What did you expect?
- What happened?
- What evidence supports this?
- Did you attempt a local fix?
- Should this be docs, extension, core, provider, UX, or no action?
```

Output shape:

```text
.pi/feedback/pi-feedback-<timestamp>.yaml
```

### Short Feedback Record

```yaml
id: pi-feedback-YYYYMMDD-<hash>
source:
  pi_repo: earendil-works/pi
  source_status: current repo target; legacy evidence may come from badlogic/pi-mono
  pi_version:
  model:
  provider:
  os:
  session_export_url:
  anonymized: true

task:
  user_goal:
  agent_goal:
  command_or_workflow:
  expected_outcome:
  observed_outcome:

friction:
  category: bug | docs | extension | core | provider | UX | performance | contribution_process
  severity: blocker | high | medium | low
  reproducible: yes | no | unknown
  minimal_repro:
  evidence:
    logs:
    files_touched:
    screenshots:
    session_branch:

agent_analysis:
  suspected_root_cause:
  attempted_workaround:
  did_workaround_succeed:
  proposed_fix:
  why_core_change_might_be_needed:
  why_extension_or_docs_might_be_enough:

triage:
  duplicate_of:
  status: new | needs_clarification | duplicate | accepted | declined | implemented
  recommended_route: docs | extension | core | provider | UX | no_action | needs_human
  acceptance_test_sketch:
  maintainer_note:

report_back:
  submitter_contact_or_channel:
  acknowledgement:
  next_status_due:
  final_outcome:
```

### GitHub Auto-Close Redirect

If a new or untrusted contributor opens an issue or pull request without a
feedback record, the auto-close response should redirect them into the feedback
flow rather than only closing the contribution.

Required response fields:

- why the PR is being closed
- how to create a feedback record
- what evidence is needed
- what happens after submission
- when a maintainer or triage digest may review it
- how accepted feedback becomes an issue, spec, test, or PR

### Maintainer Digest

A triage agent should produce a compact digest for maintainers:

```text
Today's Earendil Pi feedback:
- repeated friction clusters
- new high-severity reports
- likely duplicates with new evidence
- docs or extension candidates
- possible core bugs with repro evidence
- items needing maintainer judgement

Recommended decisions:
- accept
- decline
- ask for clarification
- route to docs
- route to extension
- route to core spec/test
```

## Human Governance

Agents can summarize, cluster, draft, and propose. Humans decide.

| Stage | Agent Role | Human Maintainer Role |
| --- | --- | --- |
| Feedback capture | Generate structured report | Optional submitter review |
| Duplicate detection | Cluster similar reports | Approve canonical grouping when important |
| Triage | Recommend severity and route | Accept, decline, defer, or ask for clarification |
| Spec and tests | Draft success criteria | Approve what counts as fixed |
| Implementation | Draft code, docs, or extension | Review important changes |
| Measurement | Detect recurrence | Decide whether the learning is real |

This boundary is essential. The proposal is not to let agents control the Pi
roadmap. It is to improve the sensory apparatus around human maintainer taste.

## Failure Modes

| Failure Mode | Risk | Mitigation |
| --- | --- | --- |
| Agents submit persuasive but false reports. | Maintainers may act on fabricated or ungrounded evidence. | Require expected-vs-observed fields, reproduction evidence, logs, session branch, and confidence labels. |
| Feedback inbox becomes another spam channel. | The new surface recreates GitHub noise elsewhere. | Add local self-checks, duplicate detection, evidence thresholds, and rate limits for low-trust submitters. |
| Maintainers spend more time reading summaries than raw issues. | The system fails its core promise. | Measure maintainer minutes per actionable decision and kill or revise the loop if summaries do not save time. |
| Session exports leak private data. | A useful evidence channel creates privacy and trust damage. | Default to anonymized exports, redact secrets, and make session sharing explicit and optional. |
| Agents over-route docs or extension issues into core. | Core maintainers receive work that should live elsewhere. | Make `recommended_route` explicit and require explanation for why docs or extension is insufficient. |
| Duplicate clustering hides severity or segment differences. | Important affected-user details disappear inside a canonical item. | Preserve duplicate evidence, segment, platform, severity, and reproduction deltas under the canonical record. |
| Contributors perceive feedback as hostile deflection. | The new flow feels like a softer auto-close rather than being heard. | Return acknowledgement, status, next review timing, and clear paths from accepted feedback to implementation. |

## Success Criteria

The experiment is working if:

- raw low-signal pull requests decrease
- actionable feedback records increase
- maintainers spend less time per decision
- accepted feedback produces clearer specs and tests
- repeated friction becomes visible as clusters
- contributors receive clearer acknowledgement and status
- accepted feedback can be traced to shipped docs, extension, or core changes

The experiment is failing if:

- the feedback inbox becomes another spam channel
- maintainers read more, not less
- contributors feel dismissed
- reports lack evidence
- private session data leaks
- accepted items cannot be tied to measured improvement

## SACP / Fractal Lab Lesson

Earendil Pi is the first external business case for the SACP / Fractal Lab GTM
thesis:

> A company's most painful inbound noise may be its best unprocessed feedback
> signal.

For SACP, the operating rule is:

```text
raw friction first becomes feedback; accepted feedback then becomes implementation work
```

Pull requests, patches, and implementation tasks are late-stage artifacts. The
company should not let humans or agents skip the learning step by turning every
complaint into code.
