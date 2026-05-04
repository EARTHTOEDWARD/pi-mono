# Specimen Comparison 001-003

## Purpose

Compare the first three public legacy Earendil Pi specimens and test whether the
triage prompt classifies them differently enough.

All three specimens are simulated SACP / Fractal Lab exercises based on public
legacy `badlogic/pi-mono` issues. None were submitted to Earendil or Pi
maintainers.

## Summary Table

| Specimen | Source | Problem Shape | Triage Level | Recommended Route | Why |
| --- | --- | --- | --- | --- | --- |
| `001` config path label | `#3978` | Misleading configuration label | T3 | product_spec | Concrete UX/correctness issue, but product still usable. |
| `002` markdown render crash | `#3826` | Runtime crash can block session resume | T1 | product_spec | Blocks core continuity and may require manual file editing. |
| `003` video/audio prompt support | `#3200` | Multimodal integration capability request | T2 | product_spec | High-value downstream workflow, but not universal core breakage. |

## Classification Result

The triage prompt is separating the cases usefully:

- `T1` is reserved for blocked core value. Specimen 002 qualifies because the
  reported crash can prevent a user or agent from resuming a saved session.
- `T2` captures high-value friction with a concrete customer workflow. Specimen
  003 qualifies because it affects a downstream integration and product adoption
  path, but is not a universal runtime blocker.
- `T3` captures ordinary improvement or correctness work. Specimen 001 qualifies
  because the reported label is misleading but does not block the core workflow.

## Route Result

All three currently route to `product_spec`, but for different reasons:

- `001`: small config UX/correctness spec
- `002`: runtime robustness and session-resume regression spec
- `003`: provider-gated multimodal capability spec

This exposes a useful refinement: `recommended_route` alone is not enough. The
triage record also needs a `route_subtype` or a strong proposed-spec field so
that a small label fix, a runtime regression, and a strategic capability request
do not look equivalent in a dashboard.

This refinement has now been applied to the triage prompt and backfilled into
the first three specimens.

## Report-Back Result

The report-back promises differ appropriately:

- `001`: one-week report-back because it is useful but non-urgent
- `002`: next-day report-back because core session continuity may be blocked
- `003`: two-day report-back because strategic routing needs human product
  judgement

This supports the customer-care interpretation of triage. The submitter should
not merely see a label; they should see attention proportional to the problem.

## Prompt Improvement Applied

The triage prompt now includes two additional fields:

```yaml
route_subtype:
  one_of:
    - small_product_correction
    - runtime_regression
    - strategic_capability_request
    - support_or_docs
    - provider_or_integration
severity_clock:
  first_response_due:
  next_decision_due:
```

These fields would make a triage dashboard more useful without changing the
core T0 to T4 severity model.

## SACP Learning

The comparison validates the first version of the triage doctrine:

- expected-vs-observed mismatch forces concrete customer-problem framing
- severity levels preserve urgency better than generic issue labels
- report-back timing makes the submitter feel heard
- public GitHub issues are useful dry-run material but remain stale external
  evidence until current maintainers verify them

The main gap is route resolution. A triage dashboard should not show all
accepted product items as equivalent.
