# Feedback OS

## Thesis

The success of SACP / Fractal Lab depends on two linked behaviors:

1. potential customers try the product
2. users provide feedback that improves the product

The key design problem is not merely collecting feedback. It is making feedback painless, visible, and rewarding enough that users want to keep contributing.

The system is not a triage desk. It is a closed-loop learning transport from
customer and agent friction into verified product improvement.

## Product Principle

Feedback should be a first-class product surface.

Every important page or workflow should expose a clear feedback entry point. The user should never have to guess where to send a bug report, feature request, workflow complaint, or idea.

Feedback should also be captured at the moment of friction. The best feedback
often appears before a user writes a support email, opens a GitHub issue, edits
around a failed output, abandons onboarding, or asks an agent to patch the
system. The interface should preserve that moment before it becomes a distorted
memory or a speculative implementation artifact.

## User Journey

1. User clicks a feedback icon on a page.
2. The form captures page context automatically where possible.
3. The user writes a short comment, selects a category, and optionally adds impact or desired outcome.
4. The system returns a visible acknowledgement and reference ID.
5. Codex triages the feedback.
6. The user can later see whether the feedback was reviewed, merged into an existing issue, accepted, implemented, or declined.
7. Useful feedback earns points or token rewards.
8. Feedback that materially becomes a shipped feature can become eligible for a high-value reward such as an extended pro account.

## Why Users Bother

The loop must give users more than a blank form.

- Immediate acknowledgement: the user sees that the feedback was received.
- Low effort: page context and metadata are captured automatically.
- Visible status: the user can tell whether feedback disappeared or moved.
- Rewards: the user receives points, gift tokens, or feature-conversion rewards.
- Product dignity: users see that the company treats feedback as product work.

## Feedback Record Shape

Initial feedback records should include:

- `summary`: one-sentence description
- `source_page`: page or workflow where feedback was submitted
- `user_type`: prospective customer, active user, evaluator, internal tester, or unknown
- `pain_point`: what failed, confused, annoyed, or blocked the user
- `suggestion`: what the user wants changed
- `urgency`: user-visible urgency or impact
- `reward_status`: current reward handling state
- `triage_status`: current product triage state
- `linked_issue`: product issue, ticket, or repo reference
- `implementation_outcome`: shipped, rejected, deferred, duplicate, or unknown outcome

## Loop States

The dominant state should be the loop state:

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

The active record should also expose `next_unclosed_edge`, such as
`needs_evidence`, `needs_relevance_evaluation`, `needs_human_decision`,
`needs_acceptance_test`, `needs_verification`, `needs_report_back`, or
`needs_learning_delta`.

## Triage Statuses

- `new`
- `needs_clarification`
- `urgent`
- `non_urgent`
- `duplicate`
- `accepted`
- `implemented`
- `declined`

## Reward Statuses

- `unreviewed`
- `points_awarded`
- `token_awarded`
- `feature_reward_candidate`
- `feature_reward_granted`

## Codex Loop Controller

Codex is the feedback loop controller.

For each durable feedback record, Codex should:

1. identify the next unclosed edge
2. enrich evidence where safe
3. evaluate relevance and product direction
4. detect duplicates or related items
5. draft a decision packet
6. draft or create a linked work artifact when accepted
7. propose reward handling
8. verify or simulate whether the original problem improved
9. draft report-back
10. write a learning delta

The important invariant: accepted feedback must not stay as prose. It must become an implementation artifact with a clear owner, linked issue, and acceptance criterion.

The second invariant: irrelevant, performative, unsafe, or strategically harmful
feedback must not distort product direction merely because it is loud, long, or
agent-polished. The relevance evaluation step protects the loop from this.

## Interface and Triage References

- `docs/moment-of-friction-feedback-interface.md` defines the human-facing and
  agent-facing capture surfaces.
- `docs/feedback-loop-controller.md` defines the closed-loop transport.
- `docs/feedback-relevance-evaluation-agent.md` defines the relevance and
  anti-distortion gate.
- `docs/customer-problem-triage-process.md` defines triage as urgent customer
  problem care rather than passive backlog sorting.

## First Milestone Definition

The first milestone is complete when this repo contains enough policy and artifact structure that a future widget or intake app can implement the loop without inventing the rules from scratch.
