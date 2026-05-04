# Roadmap

## Milestone 1: Feedback OS Spec

Goal: define the feedback operating system before building the widget.

Done when:

- repo exists locally and remotely as private
- business and brand context is recorded
- feedback record shape is defined
- triage statuses and reward statuses are defined
- Codex implementation loop is documented
- reward policy and anti-gaming policy are documented

## Milestone 2: Manual GTM Self-Improving Loop

Goal: run one artifact-rich GTM cycle before building automation.

Work:

- write one customer problem note
- write one MVP hypothesis
- design the human-facing and agent-facing moment-of-friction feedback surfaces
- run one onboarding attempt with a human or agent
- create one onboarding audit
- capture all feedback as durable feedback records
- ask an agent to create evidence bundles, relevance evaluations, and decision packets
- test operator visibility with a small loop-control mock data artifact
- convert one accepted item into a spec and acceptance test
- write a shipped outcome note or simulated outcome note
- close with a learning summary

Done when:

- every step in the GTM loop has a durable artifact
- feedback can be captured at the moment of friction for both humans and agents
- next unclosed edges, report-back clocks, and risk flags are visible to an operator
- an agent can query the artifacts and explain what happened
- the learning summary changes the next problem, MVP, onboarding path, feedback process, or implementation test

## Milestone 3: Manual Intake Trial

Goal: test the loop manually before automation.

Work:

- collect 10 to 20 anonymized feedback specimens
- create a `feedback.record` for each specimen
- create at least 5 `feedback.evidence_bundle` artifacts
- create at least 5 relevance evaluations
- create at least 3 decision packets
- create at least 1 accepted work issue/spec/test artifact
- create at least 1 simulated outcome note and learning delta
- measure minutes per loop edge, not only minutes per triage item

Done when:

- manual loop-edge advancement takes less than 10 minutes for simple edges
- the feedback record shape survives real examples
- reward rules are specific enough to avoid arbitrary decisions
- relevance evaluation blocks irrelevant, performative, or strategically misaligned feedback from becoming product work
- at least one loop closes through report-back and learning delta

## Milestone 4: Feedback Widget Prototype

Goal: create the first visible product intake surface.

Work:

- add a feedback icon to one SACP / Fractal Lab surface
- capture source page automatically
- produce a durable feedback record
- return an acknowledgement ID
- route the record into manual Codex triage

Done when:

- a tester can submit feedback without instructions
- a durable record is created
- Codex can triage the record using this repo's policy

## Milestone 5: Loop Control Panel

Goal: make loop closure visible to the operator.

Work:

- list feedback by loop state, next unclosed edge, report-back state, and linked artifact
- surface stale evidence, relevance risk, duplicates, accepted work, and verification gaps
- make the next edge obvious

Done when:

- blocked loop edges are visible immediately
- accepted items have linked implementation artifacts
- implemented or declined items have recorded outcomes, report-back, and learning deltas

## Milestone 6: Public Beta Loop

Goal: run the feedback economy with real users.

Work:

- publish the feedback promise
- award points and tokens manually
- review reward abuse risk
- track which feedback becomes shipped product work

Done when:

- users understand how to provide feedback
- useful feedback is rewarded
- at least one shipped change can be traced back to a user feedback record
