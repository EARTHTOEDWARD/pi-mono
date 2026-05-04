# Feedback Loop Controller

## Purpose

Define the Feedback OS as a closed-loop learning transport, not a triage desk.

The system exists to move customer and agent friction into verified product
improvement:

```text
feedback -> evidence -> evaluation -> decision -> work -> verification -> report-back -> learning
```

Triage is one transform inside that loop. It is not the center of gravity.

## North Star Metric

The primary metric is:

> Verified feedback loops closed per active customer or agent.

A loop is closed only when:

- friction is captured
- evidence is enriched
- relevance and direction are evaluated
- a product decision is made
- an implementation, docs, support, or decline artifact is created
- the original problem is verified, simulated, or explicitly not pursued
- the submitter receives report-back
- a learning delta updates the operating repo, product, docs, prompts, or tests

## Loop States

Use loop state as the dominant state machine. Severity is a flag, not the whole
workflow.

- `captured`
- `evidence_needed`
- `evidence_enriched`
- `evaluation_needed`
- `decision_needed`
- `accepted`
- `declined`
- `deferred`
- `duplicate`
- `work_created`
- `in_implementation`
- `in_review`
- `shipped_or_changed`
- `verification_needed`
- `verified`
- `reported_back`
- `learning_written`
- `closed`

## Next Unclosed Edge

Every active feedback item should expose the next unclosed edge.

Allowed values:

- `needs_structure`
- `needs_evidence`
- `needs_relevance_evaluation`
- `needs_duplicate_check`
- `needs_human_decision`
- `needs_issue_or_spec`
- `needs_acceptance_test`
- `needs_implementation`
- `needs_review`
- `needs_verification`
- `needs_report_back`
- `needs_learning_delta`
- `closed`

This changes the operator question from "which item is urgent?" to:

> Which loop is failing to close, and what single edge should be advanced next?

## Minimal Artifact Set

The live workflow should use six artifacts.

### 1. `feedback.record`

Captures the state transition at the moment of friction.

Required fields:

- feedback ID
- actor: human, agent, or agent-assisted human
- represented user goal
- workflow stage
- last known good state
- action taken
- expected observation
- observed observation
- impact
- evidence references
- privacy status
- submitter follow-up preference

### 2. `feedback.evidence_bundle`

Improves the evidential state before product judgement.

Required fields:

- feedback ID
- evidence status: sufficient, insufficient, unsafe, stale, unreproducible, or
  reproduced
- sources checked
- duplicate candidates
- reproduction attempt
- privacy findings
- stale evidence findings
- missing evidence
- recommended next probe

### 3. `feedback.decision_packet`

Makes the product decision without losing the evidence.

Required fields:

- feedback ID
- customer problem
- represented user goal
- evidence bundle ID
- relevance evaluation ID
- decision: accept, decline, defer, duplicate, or needs clarification
- decision owner
- decision reason
- route
- accepted work type
- verification witness
- report-back message
- reward recommendation
- human approval requirement

### 4. `work.issue_spec_test`

Converts accepted feedback into work.

Required fields:

- linked feedback
- linked evidence bundle
- linked decision packet
- customer problem
- intended behavior
- non-goals
- acceptance test
- verification witness
- report-back requirement

### 5. `feedback.outcome_note`

Records what happened after work was created.

Required fields:

- action taken
- shipped, declined, simulated, or blocked status
- verification result
- customer or agent notified
- original problem improved: yes, no, unknown, or not tested
- remaining risk

### 6. `feedback.learning_delta`

Writes learning back into the system.

Required fields:

- original assumption
- observed result
- changed belief
- changed artifact
- next experiment
- recurrence check

## Loop Controller Role

The loop controller is an agent role. It does not replace human judgement.

It should:

- find the next unclosed edge
- enrich evidence where safe
- call the relevance evaluation agent
- draft the decision packet
- create issue/spec/test drafts for accepted work
- flag human decision boundaries
- check whether report-back is owed
- write or draft the learning delta

It must not:

- silently accept strategically important feedback
- grant high-value rewards
- make public promises
- discard feedback without an explainable evaluation
- let irrelevant or performative feedback steer the roadmap

## Evaluation Agent Boundary

The evaluation agent protects the loop from distortion.

Its job is not to punish unusual feedback. Its job is to decide whether a
feedback item is relevant, evidenced, strategically coherent, safe, and useful
enough to advance the loop.

It should identify:

- relevant product friction
- insufficient evidence
- duplicate reports without new signal
- out-of-scope requests
- performative or silly submissions
- reward-gaming behavior
- harmful or strategically wrong product direction
- privacy or safety risk

Every rejection should still produce a reasoned report-back when practical.

## Controlled UX Witnesses

UX verification should use controlled witnesses: tests, local previews, public
pages that do not require sign-in, screenshots, logs, or customer confirmation.

Do not design the Feedback OS around unrestricted desktop automation or
authenticated browser state. Official Codex in-app browser guidance is that it
is suitable for local development servers, file-backed previews, and public
pages that do not require sign-in; signed-in flows should use the user's regular
browser.

Source:

- <https://developers.openai.com/codex/app/browser>
