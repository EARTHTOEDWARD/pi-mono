# Decisions

## 2026-05-01: Create SACP SUITE CEO as the Business and Feedback OS Repo

Decision: create a new private repo named `sacp-suite-ceo` with local folder `/Users/edward/Desktop/SACP SUITE CEO`.

Context: the existing `/Users/edward/Desktop/SACP Suite` repo remains the product/runtime repo. This new repo owns business operations, lab strategy, and the feedback operating system.

Consequence: product source code should not be added here unless a later decision changes the repo boundary.

## 2026-05-01: First Milestone is Feedback OS

Decision: prioritize the feedback operating system before building a feedback widget.

Context: the central business insight is that product success depends on users trying the product and being incentivized to provide painless, useful feedback.

Consequence: the first commit should define the loop, statuses, reward policy, triage policy, and durable artifact structure.

## 2026-05-01: Use Fractal Lab Domain Evidence

Decision: record `fractal-lab.net` as the confirmed owned domain evidence.

Context: Gmail search found a Cloudflare Registrar email dated 2026-02-16 with subject `Domain registered - fractal-lab.net`.

Consequence: Fractal Lab is the working public brand name until superseded by a later naming decision.

## 2026-05-01: Feedback Is the GTM North Star

Decision: treat rewarded human and agent feedback as the central GTM thesis for SACP / Fractal Lab.

Context: customer and agent friction is the most valuable market signal a business can collect. The product should make feedback visible, low-friction, rewarded, triaged by agents, and convertible into implementation artifacts.

Consequence: early GTM work should validate whether users provide more and better feedback when the product makes feedback submission easy, acknowledges it visibly, and rewards useful contributions.

## 2026-05-01: Onboarding Must Be Problem-First and Agent-Auditable

Decision: SACP / Fractal Lab onboarding should begin from the user's problem and produce a first useful artifact before exposing advanced product surfaces or terminology.

Context: onboarding that asks users to choose between unfamiliar surfaces assumes product understanding that new humans and agents do not yet have. The Codex onboarding page is a useful negative example because it starts with CLI, app, and IDE-extension choices rather than the user's job to be done.

Consequence: onboarding should be designed as part of the Feedback OS. Humans should be guided to first value, and agents should be asked to onboard, document friction at each step, and propose improvements.

## 2026-05-01: Reward Means Credible Progress and Agency

Decision: treat the primary feedback reward as credible progress toward solving the customer's problem, with credits, tokens, and prizes as supporting incentives.

Context: humans and agents both have scarce attention. A human wants a major problem solved and to feel heard when it is not. An agent has limited token budget and will only spend attention when feedback helps the represented user's task, improves future interaction, or returns a useful status.

Consequence: feedback acknowledgement must include a restatement, plan or explanation, and report-back timing. SACP / Fractal Lab should also test direct prizes for failed-signup or failed-activation feedback because that friction may be disproportionately valuable.

## 2026-05-01: Onboarding Should Increase Subjective Empowerment

Decision: use agency phenotyping ideas from active inference as a design lens for onboarding and feedback.

Context: the active-inference paper frames agency through intentionality, rationality, explainability, and empowerment. For SACP / Fractal Lab, the practical lesson is that onboarding should reveal the action-outcome map, reduce ambiguity, and capture explainable belief-preference-action-outcome chains when users or agents fail.

Consequence: failed-signup and failed-activation interviews should ask what the user or agent wanted, believed, chose, expected, observed, and needed as a cue. Agent audits should produce structured expected-vs-observed reports.

## 2026-05-01: GTM Must Run as a Closed Loop

Decision: run SACP / Fractal Lab GTM as an artifact-rich, queryable, AI-native closed loop rather than through informal human memory.

Context: the company loop is problem, MVP, onboarding, feedback, agent triage, spec/tests, implementation, measurement, and learning. AI agents can improve this loop only if each step produces durable artifacts.

Consequence: the next milestone is a manual GTM self-improving loop. Humans own customer outcomes and strategic judgement; agents collect context, detect repeated friction, propose experiments, convert accepted feedback into specs/tests, and report whether shipped work solved the original problem.

## 2026-05-01: PR Noise Should Be Captured as Pre-PR Feedback

Decision: treat pull requests as late-stage implementation artifacts. Human and agent friction should be captured upstream as structured feedback before it becomes speculative code.

Context: Earendil Pi's agent pull-request pressure is a live business case. Maintainer back-pressure protects attention, but auto-closing raw issues and PRs without a structured upstream feedback path can discard valuable product signal.

Consequence: SACP / Fractal Lab should route raw friction into feedback records first. Accepted feedback may then become a spec, acceptance test, issue, or pull request. Agents can summarize, cluster, and draft; humans retain final authority over accept, decline, defer, rewards, and roadmap commitments.

## 2026-05-01: Capture Feedback at the Moment of Friction

Decision: design separate human-facing and agent-facing interfaces that capture feedback while the user or agent is blocked, confused, looping, abandoning onboarding, or about to convert friction into external support or implementation work.

Context: delayed feedback is lossy. By the time a human writes an email or an agent opens a pull request, the original expected-vs-observed mismatch may have been distorted into frustration, workaround code, or implementation advocacy.

Consequence: SACP / Fractal Lab should place feedback affordances at the moment of friction, capture context automatically, ask humans for plain-language goals and blockers, ask agents for structured expected-vs-observed records, and return acknowledgement plus report-back timing.

## 2026-05-01: Triage Means Urgent Customer Problem Care

Decision: define triage as an active customer-care process: assess severity, stabilize urgent problems, assign ownership, decide next action, and report back.

Context: "triage" can become a weak synonym for labeling backlog items. The intended meaning is closer to urgent patient triage: the customer's blocked problem deserves serious attention until evidence shows it is low severity, duplicate, or out of scope.

Consequence: every feedback item should receive a severity level, owner or accountable reviewer, evidence requirement, next action, and report-back time. T0/T1 cases and strategic commitments require human judgement.

## 2026-05-01: Feedback OS Is a Loop Controller, Not a Triage Desk

Decision: reframe the Feedback OS around loop closure: feedback, evidence, evaluation, decision, work, verification, report-back, and learning.

Context: Pro's review correctly identified that the triage analogy was adding too much gravity. Triage is useful as one transform, but the company asset is the recurrent transport from customer or agent friction into verified product improvement.

Consequence: the north star metric is now verified feedback loops closed per active customer or agent. Operator views should show the next unclosed edge rather than only severity. Codex should act as loop controller, not just feedback classifier.

## 2026-05-01: Add Relevance Evaluation Before Product Direction

Decision: add a feedback relevance evaluation agent between evidence enrichment and decision.

Context: a rewarded feedback economy can be distorted by irrelevant, performative, silly, agent-polished, reward-gaming, or strategically harmful feedback. The system must not let noisy feedback pull SACP / Fractal Lab away from the target customer and product direction.

Consequence: every feedback item should be evaluated for represented user goal, product boundary fit, evidence quality, strategic alignment, duplicate signal, abuse/noise risk, and reward eligibility before it becomes accepted work. Negative or surprising feedback should not be suppressed merely because it is inconvenient.
