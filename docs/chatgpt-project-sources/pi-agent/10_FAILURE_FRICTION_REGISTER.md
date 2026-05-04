# Failure and Friction Register

## Purpose

Capture every failure mode and friction point in the manual GTM loop for later
analysis.

Do not wait until a problem feels important. Record it when it happens. Minor
frictions compound, and agents need a durable surface to detect repeated
patterns.

## Status Values

- `new`
- `triaged`
- `accepted`
- `deferred`
- `fixed`
- `declined`

## Severity Values

- `low`: slows the user or agent but does not block progress
- `medium`: causes confusion, retry, or visible loss of confidence
- `high`: blocks first value, signup, activation, or feedback submission
- `critical`: damages trust, privacy, safety, or willingness to continue

## Friction Types

- unclear value proposition
- unfamiliar terminology
- wrong first decision point
- missing cue
- expected-vs-observed mismatch
- low-empowerment trap
- unavailable integration
- excessive token or attention cost
- missing acknowledgement
- missing report-back time
- reward mismatch
- implementation handoff gap
- measurement gap
- false or ungrounded report
- spam-channel displacement
- maintainer burden increase
- privacy leak
- wrong implementation route
- duplicate signal loss
- hostile deflection
- external evidence staleness
- route ambiguity

## Register

| ID | Stage | Human/Agent | Expected Outcome | Observed Outcome | Type | Severity | Evidence | Suspected Root Cause | Proposed Fix | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F001 | Problem discovery | Human | The target user segment is concrete enough to recruit. | Persona narrowed to computational postdoc or technical researcher with existing AI-agent workflow pain. | unclear value proposition | medium | `persona.md`, updated problem note, and updated MVP hypothesis. | First loop had not selected a specific lab persona. | Pick one persona before outreach, probably a technical researcher or lab operator with AI-agent workflow pain. | Edward | fixed |
| F002 | MVP hypothesis | Human/agent | The first useful artifact is obvious. | First useful artifact narrowed to one workflow friction map plus one implementation-ready improvement candidate. | wrong first decision point | medium | `persona.md` and updated MVP hypothesis. | Trying to validate the whole loop at once may overload onboarding. | Make the onboarding promise "one workflow friction map plus one implementation-ready improvement." | Edward | fixed |
| F003 | Onboarding | Agent | Agent can decide why it should spend token budget on the loop. | Agent reward is still indirect unless the represented user goal is explicit. | excessive token or attention cost | high | Agent-facing doctrine says agents need low token overhead and clear represented-user value. | The first outreach script does not yet include a compact machine-readable value proposition. | Add a short agent-facing preamble with preferred outcome, expected artifact, and report-back promise. | Edward | new |
| F004 | Feedback capture | Human/agent | Every friction point has a durable place to land. | A register now exists, but it has not been tested in a real session. | measurement gap | low | This artifact is newly created. | No real or simulated onboarding run has exercised the fields. | Use this register during the first onboarding attempt and revise fields only after the run. | Edward | new |
| F005 | Persona selection | Human | Narrowing the persona makes outreach easier without excluding the future business wedge. | Business segment is now explicitly deferred, but still present as future segment. | measurement gap | low | `persona.md` lists non-personas for loop 001. | Persona narrowing may overfit to technical early adopters. | Keep loop 001 technical, then test business operators in a later loop. | Edward | new |
| F006 | External case: Earendil Pi pre-PR feedback | Agent | Agent feedback records are concise and grounded in evidence. | Agents may submit persuasive but false reports that sound actionable. | false or ungrounded report | critical | `pi-pre-pr-feedback-case.md` failure mode analysis. | Agents optimize for plausibility unless the form requires evidence and uncertainty. | Require expected-vs-observed mismatch, repro evidence, logs, session branch, and confidence labels. | Edward | new |
| F007 | External case: Earendil Pi pre-PR feedback | Human/agent | The pre-PR inbox reduces GitHub noise. | The feedback inbox may become another spam channel. | spam-channel displacement | high | `pi-pre-pr-feedback-case.md` failure mode analysis. | Moving the surface upstream does not by itself create signal thresholds. | Add local self-checks, duplicate detection, evidence thresholds, and rate limits for low-trust submitters. | Edward | new |
| F008 | External case: Earendil Pi pre-PR feedback | Human | Maintainers spend less time per actionable decision. | Maintainers may spend more time reading triage summaries than raw issues. | maintainer burden increase | high | `pi-pre-pr-feedback-case.md` failure mode analysis. | Digests can become extra process unless measured against maintainer time saved. | Track maintainer minutes per actionable decision and kill or revise the digest if it fails. | Edward | new |
| F009 | External case: Earendil Pi pre-PR feedback | Human/agent | Session exports provide useful evidence safely. | Session exports may leak secrets, private code, or user data. | privacy leak | critical | `pi-pre-pr-feedback-case.md` failure mode analysis. | Evidence-rich feedback conflicts with privacy unless export is controlled. | Default to anonymized, optional, redacted session evidence and explicit submitter consent. | Edward | new |
| F010 | External case: Earendil Pi pre-PR feedback | Agent | Agents route feedback to docs, extension, provider, UX, core, or no action correctly. | Agents may over-route docs or extension issues into core changes. | wrong implementation route | medium | `pi-pre-pr-feedback-case.md` failure mode analysis. | Agents may equate friction with core product defect. | Require route comparison and an explanation for why docs or extension is insufficient. | Edward | new |
| F011 | External case: Earendil Pi pre-PR feedback | Human/agent | Duplicate clustering preserves useful differences. | Duplicate clustering may hide severity, platform, or segment differences. | duplicate signal loss | high | `pi-pre-pr-feedback-case.md` failure mode analysis. | Clustering can compress away minority evidence. | Preserve segment, platform, severity, repro, and evidence deltas under canonical feedback items. | Edward | new |
| F012 | External case: Earendil Pi pre-PR feedback | Human | Contributors feel heard even when PRs are closed. | Contributors may perceive `/feedback` as hostile deflection. | hostile deflection | high | `pi-pre-pr-feedback-case.md` failure mode analysis. | A redirect without acknowledgement and status feels like rejection by another name. | Return acknowledgement, next review timing, and a clear path from accepted feedback to implementation. | Edward | new |
| F013 | External specimen: Earendil Pi issue #3978 | Human/agent | Public legacy issues can be used as accurate current product-friction specimens. | The specimen is useful for interface design, but may be stale because `earendil-works/pi` is not publicly visible from this environment. | external evidence staleness | medium | `../../feedback-specimens/specimen-001-earendil-pi-config-path-label.md`. | Current Earendil Pi state is unavailable, so legacy public evidence cannot prove current priority or unresolved status. | Mark external specimens as simulated, record source status, and require maintainer/current-repo verification before product claims. | Edward | new |
| F014 | External specimen comparison 001-003 | Agent | Recommended route separates small fixes, runtime regressions, and strategic capability requests. | All three specimens can route to `product_spec`, which is directionally correct but not specific enough for dashboard prioritization. | route ambiguity | medium | `../../feedback-specimens/specimen-comparison-001-003.md`. | Route labels are too coarse even when severity differs. | Added `route_subtype` and `severity_clock` fields to the triage prompt and first three specimens. | Edward | fixed |
