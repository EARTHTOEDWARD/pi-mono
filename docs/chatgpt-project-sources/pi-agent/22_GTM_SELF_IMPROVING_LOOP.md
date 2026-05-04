# GTM Self-Improving Loop

## Purpose

Run SACP / Fractal Lab as an AI-native closed-loop company from day one.

The goal is not to create a large operating system before there are customers.
The goal is to make the first GTM loop artifact-rich, queryable, and improvable
by agents.

Primary loop:

```text
problem -> MVP -> onboarding -> feedback -> agent triage -> spec/tests -> implementation -> measurement -> product learning
```

For the Feedback OS, this should be operated as a loop-control sequence:

```text
feedback -> evidence -> evaluation -> decision -> work -> verification -> report-back -> learning
```

The operator question is not only "how urgent is this?" It is "which edge is
unclosed, and what artifact or witness advances it?"

## Operating Doctrine

Every important customer-facing action should produce an artifact. If there is
no artifact, the company cannot learn from the action, agents cannot query it,
and the next cycle depends on memory.

The company should avoid informal human routing as the default. Humans should
own outcomes and judgement. Agents should collect context, compare artifacts,
detect repeated friction, and prepare implementation-ready next actions.

## Required Artifacts

### 1. Customer Problem Note

Captures the problem before building.

Required fields:

- customer or segment
- problem statement
- current workaround
- urgency
- cost of the problem
- why SACP / Fractal Lab might solve it
- evidence source
- open assumptions

### 2. MVP Hypothesis

Defines the smallest useful product promise.

Required fields:

- target user
- promised outcome
- MVP surface or manual service
- success criterion
- failure criterion
- timebox
- what will be learned

### 3. Onboarding Audit

Records whether a human or agent reached first value.

Required fields:

- preferred outcome
- first action taken
- expected outcome
- observed outcome
- low-empowerment moment
- missing cue
- first useful artifact produced
- whether first value was reached

### 4. Failure and Friction Register

Captures every failure mode and friction point for analysis.

Required fields:

- friction id
- loop stage
- human or agent affected
- expected outcome
- observed outcome
- friction type
- severity
- evidence
- suspected root cause
- proposed cue, product, or process fix
- owner
- status

### 5. Feedback Record

Captures user or agent friction.

Required fields:

- summary
- source page or workflow
- user type
- pain point
- suggestion
- urgency
- triage status
- reward status
- linked issue
- implementation outcome

### 6. Agent Triage Note

Turns feedback into a product decision.

Required fields:

- duplicate check
- urgency classification
- root friction
- customer segment affected
- proposed action
- reward recommendation
- linked artifact or issue
- report-back message

### 7. Implementation Spec and Acceptance Test

Converts accepted feedback into agent-ready work.

Required fields:

- user problem
- intended behavior
- non-goals
- acceptance test
- measurement plan
- rollback or decline condition

### 8. Shipped Outcome Note

Records what shipped and whether it worked.

Required fields:

- shipped change
- linked feedback
- linked spec
- customer notified
- observed usage or response
- whether the original problem improved

### 9. Learning Summary

Closes the loop.

Required fields:

- what was learned
- what assumption changed
- repeated friction detected
- next experiment
- product or positioning change
- open risk

## Agent Role

Agents should:

- collect context across all GTM artifacts
- identify the next unclosed edge in each feedback loop
- evaluate relevance before feedback becomes product direction
- detect repeated friction across users, agents, and onboarding runs
- maintain the failure and friction register
- propose the next GTM experiment
- convert accepted feedback into specs and acceptance tests
- compare shipped outcomes against the original customer problem
- draft report-back messages for humans and agents
- identify when a process is open-loop and missing artifacts

Agents should not silently decide strategic commitments, reward grants, public
claims, or customer promises without human approval.

## Human Role

Humans should:

- choose which customer problem matters
- judge whether an MVP actually solves it
- approve rewards and strategic commitments
- approve public positioning
- act as the directly responsible individual for customer outcomes
- decide when to continue, pivot, pause, or kill a loop

Humans should not be the default database, status router, or context carrier.

## Closed-Loop Customer Actions

### Outreach

Output: customer problem note.

The goal of outreach is not simply to get attention. It is to discover whether a
real problem exists and whether SACP / Fractal Lab can plausibly solve it.

### Onboarding

Output: onboarding audit.

The goal of onboarding is not product exploration. It is to guide the user or
agent from a preferred outcome to one useful artifact.

### Feedback

Output: feedback record and agent triage note.

The goal of feedback is not sentiment collection. It is to convert friction into
a product decision, reward decision, or explicit no.

### Implementation

Output: implementation spec and acceptance test.

The goal of implementation is not agent activity. It is an accepted product
change that can be judged against the customer problem.

### Shipping

Output: shipped outcome note.

The goal of shipping is not release volume. It is measured improvement in the
original problem or a clear learning that the proposed solution was wrong.

### Learning

Output: learning summary.

The goal of learning is to feed the next loop with better problem hypotheses,
better onboarding cues, better feedback capture, and better implementation
tests.

## Research and Competitor Inputs

Research and competitor observations are subprocesses.

They can feed:

- customer problem notes
- MVP hypotheses
- onboarding hypotheses
- positioning tests
- implementation ideas

They should not replace customer friction as the primary truth source. A
research insight or competitor move becomes GTM-relevant when it changes what
problem the customer has, how urgent it is, or how SACP / Fractal Lab can solve
it.

## Software Factory Boundary

Use software-factory principles only after feedback has become accepted work.

Human responsibility:

- define intent
- define success criteria
- approve acceptance tests
- judge product and customer fit

Agent responsibility:

- draft implementation
- generate or update tests
- iterate until tests pass
- summarize tradeoffs and remaining risks

The code is not the source of truth. The accepted feedback, spec, tests, and
customer outcome are the source of truth.

## Manual Run Checklist

For each GTM cycle:

1. Write one customer problem note.
2. Write one MVP hypothesis.
3. Run one onboarding attempt with a human or agent.
4. Create one onboarding audit.
5. Record every failure mode and friction point in the friction register.
6. Capture all feedback as durable feedback records.
7. Ask an agent to write triage notes.
8. Convert one accepted item into a spec and acceptance test.
9. Ship or simulate the change.
10. Write a shipped outcome note.
11. Write a learning summary.

The loop is complete only when the learning summary changes the next problem,
MVP, onboarding path, feedback process, or implementation test.
