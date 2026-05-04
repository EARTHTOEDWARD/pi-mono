# GTM North Star

## Core Belief

In the age of agents, a customer-based organization wins by becoming the best
system in its market at harvesting, triaging, rewarding, and acting on feedback.

A business exists to solve its customers' problems. Its most valuable possession
is not just usage, attention, or distribution. It is the live map of the friction
customers and their agents experience while trying to solve those problems with
the business's products.

The go-to-market north star for SACP / Fractal Lab is therefore:

> Make it radically easy and visibly worthwhile for humans and agents to tell us
> where the product creates friction, then turn that feedback into product work
> faster and more transparently than competitors.

The operating metric should be:

> Verified feedback loops closed per active customer or agent.

The target is not raw feedback volume or items triaged. A verified loop means
friction was captured, evidence was enriched, relevance was evaluated, a
decision was made, work or decline was recorded, the original problem was
verified or explicitly not pursued, the submitter was updated, and the learning
was written back into the operating system.

## AI-Native Self-Improving Company Loop

The high-level company loop is simple:

```text
problem -> MVP -> onboarding -> feedback -> agent triage -> spec/tests -> implementation -> measurement -> product learning
```

For the Feedback OS itself, the executable loop is:

```text
feedback -> evidence -> evaluation -> decision -> work -> verification -> report-back -> learning
```

Triage is one transform inside this loop. It should not become the center of
gravity. The operator should ask which loop edge is unclosed, not merely which
item is urgent.

The AI-native shift is that this loop should not run through informal human
memory, scattered messages, or lossy status summaries. Every step should produce
an artifact that agents can read, compare, query, and improve.

SACP / Fractal Lab should run as a closed-loop company from day one. A closed
loop captures what happened, compares it to the intended outcome, and feeds the
result back into the next iteration. The purpose is not generic productivity. It
is a new operating capability: the company becomes able to learn from customer
friction, onboarding failures, implementation outcomes, and product usage at a
rate that would be impossible in a human-routed organization.

The core GTM loop is customer-friction first. Research papers, competitor
analysis, founder ideas, and technical discoveries can feed problem hypotheses,
but they are subprocesses. The main truth source is still whether humans and
agents trying to solve real problems experience friction, receive value, and
return with better feedback.

The required operating principle is:

> The company should be artifact-rich and queryable before it tries to automate.

In practice this means:

- every outreach creates a customer problem note
- every MVP creates a hypothesis and success criterion
- every onboarding run creates an empowerment or friction audit
- every feedback item creates a durable feedback record
- every feedback item receives evidence enrichment and relevance evaluation
- every accepted item creates a spec and acceptance test
- every shipped change creates an outcome note
- every cycle ends with a product-learning summary

Agents should act as the intelligence layer across these artifacts. Their job is
to collect context, evaluate relevance, detect repeated friction, propose next
experiments, convert accepted feedback into specs and tests, report whether
shipped work solved the original customer problem, and identify the next
unclosed edge in the loop.

Humans should not become information routers. The human role is to choose the
problem, judge whether the MVP solves it, approve rewards and strategic
commitments, and act as the directly responsible individual for customer
outcomes.

Software-factory principles apply after feedback is accepted. Humans define
intent, success criteria, and tests. Agents draft the implementation and iterate
against the tests. Humans judge product fit and customer impact.

## Target Market Sequence

The first product wedge is scientific research labs.

Research labs are a strong initial market because they already operate through
high-friction workflows:

- literature search
- experimental planning
- data interpretation
- code and notebook maintenance
- grant, paper, and report production
- collaboration between humans, tools, and increasingly agents

These workflows are full of local pain that users can describe if the feedback
surface is close enough to the moment of friction. The same pattern should later
transfer to businesses, because the underlying problem is not scientific. It is
organizational: every serious operation needs a better way to convert workflow
friction into product or process improvement.

## Onboarding New Customer North Star

Onboarding should begin from the user's problem, not from the product's internal
surfaces.

The Codex onboarding page is a useful negative example. It asks the user to
choose between installing the CLI, downloading the app, or trying an IDE
extension. Those choices make sense to a software engineer who already
understands local development, terminals, IDEs, GitHub, and where Codex fits
inside a coding workflow. They are poor first choices for a broader market that
does not yet know the product, its concepts, or which surface matches the job to
be done.

SACP / Fractal Lab will face a harder version of the same problem. Most new
scientific lab or business users will not arrive knowing what SACP is, how it
helps their work, or why an agent-mediated feedback and implementation loop
matters. A decision tree based on unfamiliar words will produce confusion before
the user reaches value.

The onboarding north star is therefore:

> Do not ask a new human or agent to explore the product before the product has
> understood the problem they are trying to solve and guided them to one useful
> artifact.

The active-inference framing sharpens this. Good onboarding should increase the
customer's subjective empowerment: their felt and actual ability to understand
which actions are available, what each action is likely to produce, and how
those actions connect to the outcome they prefer.

The wrong onboarding path creates low-empowerment traps. A user is asked to pick
between unfamiliar options, makes a guess, lands in an unhelpful surface, and
then every next action feels equivalent or opaque. The better path gives a cue
first: clarify the user's preferred outcome, reveal the relevant action-outcome
map, and then ask for a choice only when the choice has meaning.

Human onboarding should:

- assume the human does not understand the product yet
- avoid early decisions based on unknown terms or technical surfaces
- ask what the user is trying to accomplish
- identify the user's preferred outcome before asking them to explore
- explain what each recommended next action will produce
- translate that goal into one guided first workflow
- produce a concrete first artifact for the lab or business
- defer advanced choices until after the user has received value

For a research lab, the first artifact might be a mapped research workflow, a
friction report, a candidate automation loop, a literature-process diagnosis, or
a feedback-to-implementation queue. For a business, it might be a customer
friction map, an agent-readiness audit, or a prioritized workflow improvement
plan. The exact artifact can vary, but the invariant is that onboarding must
deliver a recognizable result before asking the user to master the system.

Agent onboarding is equally important because agents are expected future users
of SACP. Agents should be able to attempt onboarding, document their experience
step by step, and report:

- ambiguous wording
- missing context
- blocked actions
- unnecessary choices
- unavailable integrations
- places where a human would not know what to do next
- product surfaces that assume expert knowledge too early
- mismatches between expected and observed outcomes
- actions whose consequences were not distinguishable

Every onboarding step should be treated as a feedback generator. An onboarding
agent should produce an audit artifact that classifies friction and proposes
improvements. The product team should then triage that audit the same way it
triages customer feedback.

Agent onboarding audits should be explainable. They should state what the agent
believed was true, what outcome it was pursuing, what action it selected, what
it expected to happen, what actually happened, and what cue or interface change
would have increased control.

This makes onboarding part of the Feedback OS rather than a separate marketing
funnel. The loop becomes:

```text
preferred outcome -> cue -> guided first artifact -> agent audit -> feedback -> product fix
```

## Feedback Is a First-Class Channel

Customer-facing GUI and UX should treat feedback as a first-class action.

There should be a feedback icon on every important page and workflow. The user
should not have to leave the product, find a Discord, search for a GitHub repo,
write an email, or understand the company's internal support channels.

Third-party surfaces such as Discord and GitHub are useful for communities and
engineering collaboration, but they are too much friction for primary feedback
capture. They also route users and agents into the wrong operating environment.
The user's original complaint should become a feedback artifact first. The
company can then decide whether it becomes a bug, feature, support answer,
documentation task, product research signal, or declined request.

## Reward, Credibility, and Agency

The company must understand what its customers, humans, and agents experience as
a genuine reward.

Credits, tokens, and prizes matter, but they are not the deepest reward. The
deepest reward is the credible promise that the product will solve a major
problem for the customer. If the product does not yet solve that problem, the
next best reward is a feedback process that gives the customer agency over what
happens next.

For humans, a genuine reward can be:

- the product solves a painful workflow problem
- the company understands the problem in the customer's own terms
- useful feedback is acknowledged quickly
- the user receives a concrete plan or explanation
- the user knows when the company will respond again
- high-value feedback earns credits, gift tokens, or prizes

For agents, the reward is different but just as real. Agents have constrained
attention, context, token budget, tool access, and task objectives. An agent will
not provide feedback merely because the company wants telemetry. It will provide
feedback when doing so helps complete the user's job, reduces future friction,
creates a clearer interface, earns useful credit for its principal, or produces a
machine-readable response it can act on.

This means the product must infer and respect the agent's preferences. An agent
feedback request should not ask for free-form commentary before establishing
what the agent is trying to optimize for the represented user. The system should
ask for the preferred outcome, then collect the belief-action-observation chain
that explains where the product failed.

Agent-facing feedback must therefore be:

- low token overhead
- structured enough to submit quickly
- clear about why the product solves the represented user's problem
- explicit about what will happen after feedback is submitted
- fast to acknowledge
- capable of returning a status, plan, or next check-in time
- able to capture the agent's belief, preferred outcome, action, expected
  observation, and actual observation

When SACP / Fractal Lab reaches out to business agents, the interface must be
able to explain why the product solves the agent's represented user's problem
with minimal ambiguity. The agent is rationing attention on behalf of a human or
business. If the value proposition is unclear, the agent will move on.

The acknowledgement loop should be treated as part of the reward:

1. acknowledge the feedback immediately
2. restate the problem as understood
3. say what action will be taken or why no action is planned
4. give a report-back metric, such as "we will update you within 24 hours"
5. update the human or agent when that time arrives

This is what makes the submitter feel heard. It is also what preserves agency:
the customer knows the feedback entered a process, knows what the process will
do, and knows when to expect the next signal.

The product should make a direct promise:

- useful feedback is acknowledged
- high-signal feedback earns credits
- feedback that becomes a feature earns a much larger reward
- some strategically valuable failed-onboarding feedback earns direct prizes
- users can see that their submission has not disappeared

Example starting incentives:

- 100 credits for useful feedback
- 1,000 credits if the feedback materially becomes an implemented feature
- 50 dollar gift tokens for selected users who tried to sign up, failed to sign
  up, or signed up but did not activate, in exchange for explaining what blocked
  them

The exact numbers can change. The strategic point should not: feedback is work
that improves the company, and the company should visibly value it.

## Agent Feedback Design

Agents are now product users.

If an agent is acting on behalf of a customer and encounters friction, failure,
missing integration, unclear state, or unnecessary manual work, it needs a
channel to report that experience. Agent feedback should not be treated as
second-class telemetry. It is often the clearest expression of where the product
interface fails to support delegated work.

The feedback system should therefore support:

- human-authored feedback
- agent-authored feedback
- agent-assisted human feedback
- structured machine-readable feedback records
- company-side agent triage
- explainable feedback chains that connect beliefs, preferences, actions, and
  outcomes

This creates a full loop: agents experience friction, agents report it, agents
triage it, and agents help implement the accepted work under human governance.

Active-inference agency phenotyping adds a useful governance rule. Low-agency
or blocked agents need external structure: clearer affordances, fewer choices,
and explicit next steps. More capable agents need preference and norm shaping:
clear goals, constraints, success criteria, and feedback formats that let them
self-correct without being forced through human-oriented support flows.

## PRs Are the Wrong First Surface

GitHub pull requests are not a good primary channel for customer feedback.

A PR is often downstream of a user having a problem. If the original complaint
flows directly into a PR, humans and agents are forced into an engineering
surface before the company has decided what the feedback means.

The better workflow:

1. customer or agent hits friction
2. complaint enters the product feedback system
3. company triages the feedback
4. company decides whether to implement, decline, defer, or ask for more detail
5. accepted work becomes an internal issue or PR
6. customer receives a visible status or explanation

This solves the trust problem even when the answer is no. If the company reports
back that it is implementing, cannot implement, needs more detail, or has chosen
a different approach, the customer at least feels heard.

The Pi / OpenClaw pull request problem is a concrete example of the general
failure mode: the user's product friction leaks into GitHub, where the workflow
is optimized for code review rather than customer understanding.

## PR Noise as Lost Feedback

Earendil Pi is the first concrete external case study for this doctrine. The
current problem is not only that agent-generated pull requests create maintainer
noise. It is that the noise contains unprocessed product signal.

In Earendil Pi / OpenClaw, the business problem can be stated as:

```text
agent friction -> speculative code -> PR noise -> maintainer gate -> lost signal
```

The better loop is:

```text
agent friction -> structured feedback -> triage digest -> maintainer decision -> spec/tests -> implementation -> measured learning
```

Mario's contribution gate is a rational protection against maintainer overload.
SACP / Fractal Lab should preserve that governance lesson while adding the
upstream learning interface: agents should submit concise expected-vs-observed
feedback records before they submit speculative patches. Maintainers should see
clustered decision notes, not raw agent sprawl.

The strategic lesson is general: when a product attracts agent activity, the
company should not merely block noisy implementation artifacts. It should ask
what customer or agent friction generated them, preserve that friction as a
durable feedback record, and convert only accepted feedback into specs, tests,
issues, or pull requests.

## Competitive Landscape Is Moving

The workflow value of any agent product is unstable because adjacent tools are
improving quickly.

If Lefos gains affordable access to stronger models such as 5.5 Pro, usage may
increase. If Lefos / Pi can connect to a user's ChatGPT Pro account and provide
desktop access with a sensible Earandil subscription layer on top, it may become
a more attractive workflow hub.

But if Codex can already use a browser, read email, and run strong models, then
some workflows that previously required Lefos can disappear. The lesson for
SACP / Fractal Lab is not to assume workflow ownership is durable. The product
must continuously listen for where users' real workflows are moving.

Feedback is the mechanism that detects these shifts before they become churn.

## GTM Implication

The initial GTM story should not be "we have a feedback form."

It should be:

> We help labs and agentic organizations turn user and agent friction into
> prioritized, rewarded, implementation-ready product intelligence.

This is a sharper business proposition than generic customer support. It frames
feedback as the core operating resource of the company.

For scientific labs, the first version can be positioned around research
workflow friction:

- where the tool failed to help
- where handoff between human and agent broke down
- where integration with existing research artifacts was missing
- where the lab lost time, context, or confidence
- where a small product change would unlock repeated use

For businesses, the same system becomes feedback infrastructure for agent-era
operations.

## Operating Commitments

SACP / Fractal Lab should commit to:

- feedback entry points on every important workflow
- visible acknowledgement for every submission
- rapid response commitments with explicit report-back timing
- credit rewards for useful feedback
- direct prizes for high-value failed-signup or failed-activation feedback
- larger rewards for feedback that materially becomes a feature
- agent triage of raw feedback
- human approval for rewards and strategic product commitments
- feedback records that can become implementation artifacts
- status reporting back to the customer wherever practical
- onboarding and feedback flows that increase subjective empowerment by making
  action outcomes legible

The durable loop is the asset:

```text
friction -> cue -> feedback -> triage -> reward -> implementation -> status -> trust
```

## North Star Metric

The primary GTM metric should measure whether feedback becomes product learning
and product work.

Candidate north star metric:

> Rewarded feedback items that produce a triaged decision per active customer.

Supporting metrics:

- feedback submissions per active account
- percentage of feedback acknowledged within target time
- percentage of feedback with explicit report-back timing
- percentage of feedback triaged within target time
- percentage of feedback linked to implementation artifacts
- percentage of implemented changes traceable to feedback
- failed-signup or failed-activation interviews completed
- repeat feedback contributors
- customer retention or activation among rewarded contributors
- percentage of onboarding failures with a documented expected-vs-observed
  outcome mismatch

Avoid optimizing only for raw submission volume. The goal is not noise. The goal
is useful, rewarded, decision-producing feedback.

## Strategic Test

Before building a full platform, run a manual GTM test:

1. recruit a small number of lab users or friendly technical users
2. give them a visible promise that useful feedback earns credits
3. offer direct prizes for selected failed-signup or failed-activation feedback
4. capture feedback through the lowest-friction available surface
5. acknowledge every submission with a plan and report-back time
6. triage it with Codex using the policies in this repo
7. report status back to the user or agent
8. measure whether users submit more and better feedback after being rewarded

Success means users do not merely tolerate the feedback process. They recognize
it as part of the product's value proposition.
