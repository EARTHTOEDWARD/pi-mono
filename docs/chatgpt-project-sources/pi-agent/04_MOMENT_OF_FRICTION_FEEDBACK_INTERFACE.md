# Moment-of-Friction Feedback Interface

## Purpose

Design the human-facing and agent-facing interfaces that capture feedback at the
right moment: when the user or agent is experiencing friction.

The goal is not to ask for opinions later. The goal is to preserve the live
state of failure before memory, frustration, workaround code, or GitHub process
distorts it.

## Core Rule

Feedback capture should happen as close as possible to the moment of friction.

The product should detect or invite feedback when:

- a user is blocked
- an agent retries or loops
- an action fails
- an expected result does not appear
- the user abandons onboarding
- an agent is about to create speculative implementation work
- a user reaches for Discord, email, GitHub, or chat to explain a problem

The interface should not begin with "submit feedback." It should begin with the
customer's problem:

> What were you trying to do, what happened, and what would have counted as
> success?

## Interface Doctrine

Moment-of-friction capture has two jobs:

1. reduce effort for the submitter
2. increase evidence for the triage operator

The interface should therefore capture context automatically wherever possible:

- page or workflow
- timestamp
- user or agent type
- recent action
- error message
- selected object, file, run, or session
- current route or command
- product version
- integration or provider
- browser, OS, or model where relevant

The submitter should supply only what the product cannot know:

- intended outcome
- expected result
- observed result
- impact
- urgency
- whether they tried a workaround
- whether they want a response

## Human-Facing Interface

### Entry Points

Humans should have persistent and contextual entry points:

- visible feedback icon on every important page
- "I'm stuck" action beside complex workflows
- inline feedback beside failed actions
- exit feedback when signup, onboarding, or activation stalls
- post-result feedback after an artifact is produced
- pre-support feedback before routing to email, Discord, or GitHub

### Human Modes

The first choice should use ordinary language:

- `I'm stuck`
- `This result is wrong`
- `This is confusing`
- `I expected something else`
- `I have an improvement`

Avoid product-internal categories such as "provider", "core", "extension",
"workflow orchestration", or "artifact routing" as the first decision point.
Those can be inferred later by the triage process.

### Minimal Human Form

Required:

- What were you trying to do?
- What happened?
- What did you expect instead?
- How serious is this for you right now?

Optional:

- What did you try next?
- What would make this feel solved?
- Can we contact you with a follow-up?
- Are you willing to do a short paid follow-up if this blocked signup or
  activation?

### Human Acknowledgement

After submission, the interface should return:

- feedback ID
- restatement of the problem
- initial triage level
- expected next action
- report-back time
- reward status, if applicable

Example:

```text
Received: SACP-FB-00042

We understand that you were trying to map a research workflow, but the system
asked you to choose between unfamiliar setup options before producing a useful
artifact.

Initial status: urgent onboarding friction
Next action: we will review this and decide whether it needs a product change or
a clearer onboarding cue.
Report-back: within 24 hours
Reward: useful-feedback points pending review
```

## Agent-Facing Interface

### Agent Design Constraints

Agents have scarce context, token budget, tool calls, and attention. An agent
will not provide good feedback because the company wants telemetry. It will
provide feedback when doing so helps the represented user complete the task,
reduces future friction, or returns a machine-readable status that the agent can
act on.

Agent-facing feedback must be:

- low token overhead
- structured
- deterministic enough to parse
- clear about why it matters to the represented user's goal
- explicit about what happens next
- able to preserve uncertainty
- safe for private context

### Agent Triggers

Ask the agent for feedback when:

- the same action fails twice
- the agent changes strategy because the product path is unclear
- the agent needs missing context that the product should have supplied
- the agent is about to open an issue or pull request
- the agent patches around product behavior locally
- the agent cannot determine whether the task succeeded
- the agent detects a mismatch between user intent and product output
- the agent abandons a workflow or asks the human to intervene

### Agent Contract

The product should give agents a compact contract:

```text
If you report this friction, we will:
1. return a feedback ID
2. acknowledge the represented user goal
3. classify urgency
4. say whether more evidence is needed
5. report back by a stated time or status event
```

### Minimal Agent Record

```yaml
schema: sacp.agent_friction.v0
feedback_id:
represented_user_goal:
current_workflow:
trigger:
expected_observation:
observed_observation:
impact_on_user_goal:
evidence:
  page_or_command:
  error_or_blocker:
  retry_count:
  artifacts:
privacy:
  contains_private_user_data: unknown
  safe_to_share_raw_context: false
agent_analysis:
  suspected_root_cause:
  uncertainty:
  workaround_attempted:
  workaround_result:
requested_next_action:
  triage_level:
  report_back_channel:
```

### Agent Response Shape

The acknowledgement should also be machine-readable:

```yaml
feedback_id: SACP-FB-00042
received: true
problem_understood: >
  The agent could not complete onboarding because the product asked for an
  unfamiliar setup decision before producing a first useful artifact.
initial_triage_level: T1
next_action: product_triage
needs_more_evidence: false
report_back_due: 2026-05-02T10:00:00+01:00
reward_status: pending_review
```

## Capture Timing

### Passive Always-On Entry

The visible feedback icon should always be available, but it should not be the
only mechanism. Many users and agents do not stop to report friction unless the
product asks at the right time.

### Active Friction Intercepts

Use active prompts when the product observes likely friction:

- repeated failed validation
- repeated navigation between the same pages
- abandoned onboarding step
- tool or provider error
- generated artifact rejected or edited heavily
- agent retry loop
- pre-PR or pre-issue attempt

### Exit Capture

When a user leaves signup, onboarding, or activation, ask only one question:

```text
What stopped you from getting value today?
```

Offer a direct reward for high-signal answers from failed signup or activation
because this is disproportionately valuable feedback.

## Earendil Pi Visibility Note

We do not currently have state or session visibility inside Earendil Pi.

The intended current repo is `earendil-works/pi`, but it is not publicly
available from this environment at the time of writing. Public legacy
`badlogic/pi-mono` issue and pull-request pages still show visible problem
classes that are relevant to interface design:

- config path confusion
- TUI and terminal handling
- package manager and self-update failures
- provider support requests
- markdown rendering failures
- media or image support requests
- persistence and session-management issues
- idle scheduling and interruption requests
- OpenClaw-adjacent reports

This means SACP / Fractal Lab should not pretend to know Pi's internal support
state. The correct conclusion is narrower: public evidence is enough to design a
pre-PR feedback interface, but a real deployment would need Earendil's internal
maintainer view, session evidence, and decision criteria.

## Interface Success Criteria

The interface is working when:

- humans can submit feedback without leaving the product
- agents can submit feedback without spending many tokens
- expected-vs-observed mismatch is captured
- page, workflow, or session context is captured automatically
- the submitter receives a feedback ID and report-back time
- urgent customer problems are visible immediately
- accepted feedback becomes specs and tests
- declined feedback still receives an explanation

The interface is failing when:

- users wait until later to report problems
- agents open speculative implementation artifacts first
- feedback lacks evidence
- the acknowledgement feels generic
- no one owns the next action
- the submitter cannot tell whether they were heard
