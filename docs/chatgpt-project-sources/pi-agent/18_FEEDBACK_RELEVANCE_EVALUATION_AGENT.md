# Feedback Relevance Evaluation Agent

## Purpose

Prevent irrelevant, performative, silly, unsafe, or strategically harmful
feedback from distorting the Feedback OS.

The evaluation agent sits between evidence enrichment and decision. It does not
decide the roadmap. It decides whether the feedback should advance, pause,
clarify, decline, or be preserved only as weak signal.

## Core Rule

Do not reward or advance feedback merely because it is loud, long, agent-polished,
or framed as urgent.

Advance feedback when it is connected to:

- a real represented user goal
- a plausible product or workflow boundary
- an expected-vs-observed mismatch
- evidence or a clear missing-evidence path
- a strategic segment SACP / Fractal Lab actually wants to serve
- a feasible next action

## Evaluation Outcomes

- `relevant`: advance to decision packet
- `needs_evidence`: request clarification or reproduction evidence
- `duplicate_with_delta`: link to canonical item and preserve new signal
- `duplicate_without_delta`: acknowledge but do not advance as new work
- `out_of_scope`: decline or redirect
- `performative_or_silly`: acknowledge lightly, do not reward, do not advance
- `harmful_direction`: escalate to human if strategic, otherwise decline
- `unsafe_private_or_sensitive`: stop and redact before further processing

## Evaluation Criteria

### Relevance

Ask:

- Is there a concrete customer, user, agent, or workflow?
- Is the feedback about SACP / Fractal Lab or an intended integration surface?
- Does it connect to a problem the product is meant to solve?
- Is the suggested direction compatible with the current GTM wedge?

### Evidence

Ask:

- Is there an expected-vs-observed mismatch?
- Are reproduction steps, screenshots, logs, traces, examples, or user impact
  available?
- If evidence is missing, is there a reasonable next probe?
- Is the evidence stale or external?

### Direction

Ask:

- Would following this feedback make the product more coherent?
- Would it pull the product away from the target customer or workflow?
- Is this a support, docs, onboarding, integration, product, or strategy issue?
- Is the request trying to turn a local preference into product direction?

### Abuse and Noise

Ask:

- Is the feedback mainly reward-seeking?
- Is it generic praise or complaint without actionable signal?
- Is it agent-generated text that sounds plausible but lacks evidence?
- Is it a joke, rant, or performative submission?
- Is it duplicative without adding segment, severity, reproduction, or impact?

## Evaluation Record Shape

```yaml
feedback.evaluation.v1:
  evaluation_id:
  feedback_id:
  evaluator: codex | human | other_agent
  relevance_status:
  relevance_reason:
  represented_user_goal_valid: yes | no | unclear
  product_boundary_match: yes | no | unclear
  evidence_quality: strong | adequate | weak | missing | unsafe | stale
  strategic_alignment: aligned | questionable | misaligned | human_decision
  noise_or_abuse_risk: none | low | medium | high
  duplicate_signal:
    duplicate_of:
    adds_new_signal: yes | no | unclear
    delta:
  recommended_next_edge:
  reward_eligible: yes | no | human_decision
  report_back_summary:
```

## Guardrail

The evaluation agent should not suppress feedback just because it is negative,
surprising, inconvenient, or outside the current implementation plan.

Uncomfortable feedback can be highly relevant. Irrelevant feedback is feedback
that lacks a real product-learning path, lacks a represented user problem, or
would push the product away from its intended customers without strategic
approval.
