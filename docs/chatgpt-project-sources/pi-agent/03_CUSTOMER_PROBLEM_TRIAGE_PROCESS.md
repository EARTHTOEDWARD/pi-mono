# Customer Problem Triage Process

## Purpose

Define triage as an urgent customer-care process, not a passive backlog label.

Triage is one decision transform inside the Feedback OS. It is not the whole
system. The wider system is defined in `docs/feedback-loop-controller.md`.

For SACP / Fractal Lab, triage means:

> Treat the customer's problem as important until evidence shows otherwise.

The hospital analogy is useful because triage is not "sort this into a list."
It is the disciplined act of assessing severity, assigning attention, deciding
the next action, and keeping the patient informed. In this business context, the
"patient" is the customer's blocked problem.

## Triage Doctrine

Every feedback item should receive:

- acknowledgement
- severity level
- owner or accountable reviewer
- next action
- report-back time
- evidence requirement
- reward recommendation where relevant

No feedback item should be left as raw text without a status.

## Severity Levels

| Level | Name | Meaning | First Response Target | Owner |
| --- | --- | --- | --- | --- |
| T0 | Critical trust or safety | Privacy, payment, data loss, security, legal, or severe reputational risk. | Immediate same-day response. | Human DRI immediately. |
| T1 | Blocked core value | User or agent cannot complete signup, activation, onboarding, or a core workflow. | Within 24 hours. | Human DRI plus triage agent. |
| T2 | High-value friction | The user can proceed, but the friction damages trust, causes major wasted time, or affects repeated use. | Within 48 hours. | Triage agent drafts; human reviews. |
| T3 | Improvement candidate | Useful feedback, feature request, or usability issue without urgent customer pressure. | Within 5 business days. | Triage agent. |
| T4 | Low-signal or not actionable | Vague, duplicate without new evidence, out of scope, or not enough context. | Acknowledge with clarification or decline. | Triage agent; human only if contested. |

The first classification may be wrong. That is acceptable if the record keeps
the reason and can be escalated quickly.

## Triage Steps

### 1. Receive

Create or update a durable feedback record. Capture automatic context and
submitter-supplied expected-vs-observed information.

Output:

- feedback ID
- source workflow
- submitter type
- raw statement
- automatic context

### 2. Acknowledge

Return a response that proves the problem was heard.

The acknowledgement must include:

- restatement of the user's goal
- restatement of the blocker
- initial severity
- what happens next
- when the submitter will hear back

### 3. Stabilize

For T0 and T1, ask what action prevents immediate harm or loss of trust.

Possible stabilizing actions:

- human follow-up
- temporary workaround
- refund, account help, or manual setup
- disable unsafe path
- add warning or known-issue note
- gather missing reproduction evidence

### 4. Diagnose

Determine the root type:

- product bug
- onboarding failure
- unclear value proposition
- missing integration
- documentation gap
- agent interface failure
- reward or incentive mismatch
- customer problem not actually solved by product
- duplicate or repeated friction cluster

### 5. Route

Assign a route:

- support response
- onboarding cue change
- documentation change
- product spec
- acceptance test
- engineering issue
- reward review
- decline with explanation
- needs clarification

Also assign a route subtype when the main route is too broad:

- small product correction
- runtime regression
- strategic capability request
- support or docs
- provider or integration

The route answers where the item goes. The route subtype answers what kind of
work it is, so a minor label fix, runtime blocker, and strategic capability
request do not appear equivalent in the triage dashboard.

### 6. Decide

Humans decide T0, T1, strategic commitments, high-value rewards, roadmap
changes, and contested declines.

Agents can decide or recommend T2 to T4 routing only within explicit policy, and
all automated decisions should be reviewable.

### 7. Report Back

Close the loop with the submitter.

Report-back messages should say:

- what was decided
- what action was taken or will be taken
- what is not being done
- what evidence would change the decision
- reward status
- next status time if still open

## Triage Agent Prompt Contract

The triage agent should behave like an emergency intake nurse for customer
problems: calm, evidence-oriented, fast, and unwilling to let serious problems
sit unowned.

The agent must answer:

- What customer problem is being reported?
- What was the customer or agent trying to achieve?
- What is the expected-vs-observed mismatch?
- Is this T0, T1, T2, T3, or T4?
- What evidence supports that level?
- What evidence is missing?
- Who owns the next action?
- What should be sent back to the submitter?
- Could this be a duplicate that still adds severity or segment evidence?
- Could the feedback be false, private, or unsafe to share?

## Escalation Rules

Escalate to a human immediately when:

- privacy, data, payment, or security is implicated
- signup or activation is blocked for a high-value prospect
- a public demo, launch, or customer conversation is blocked
- the feedback claims product output is materially wrong or misleading
- multiple independent users or agents hit the same blocker
- the submitter is angry, high-value, or likely to churn
- the agent cannot decide without making a strategic commitment

## Anti-Backlog Rule

The worst failure mode is to convert customer pain into a quiet backlog item.

If a problem is accepted but not immediately implemented, the record still needs:

- reason for delay
- owner
- next review date
- report-back message
- linked implementation artifact or explicit non-goal

## Measures

Track:

- percentage acknowledged within target
- percentage with report-back time
- time from feedback to first human-readable response
- time from feedback to triage decision
- T0/T1 count and resolution time
- percentage accepted into specs/tests
- percentage declined with explanation
- recurrence of the same friction after shipped changes
- submitter response after report-back

Triage quality is not measured by how many items are closed. It is measured by
whether serious customer problems receive attention fast enough to preserve
trust and improve the product.
