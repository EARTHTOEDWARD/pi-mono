# Pi Agent MVP Roadmap Handoff

## Current State

This handoff recovers the broader Pi Agent MVP and roadmap from the current
local checkout, imported ChatGPT project sources, and the committed manual MVP
workflow pack.

Current repo status at handoff creation:

- branch: `main`
- local relation to upstream before this doc: `ahead 2, behind 28`
- completed runtime commit: `f3997bb Complete Pi session continuity MVP`
- completed source import commit: `37d6b26 Import Pi Agent ChatGPT project sources`

The completed runtime MVP slice is `PI-RUNTIME-SESSION-CONTINUITY-001`:
saved-session continuity when the transcript includes pathological
Markdown-looking terminal output. That slice is complete, committed, and ready
for local testing.

The next broader MVP slice is now implemented as a Pi-native `/feedback`
command. It creates a durable local YAML artifact under `.pi/feedback/` that a
later Pi or Codex session can inspect without needing chat history.

## Completed MVP Slice

`PI-RUNTIME-SESSION-CONTINUITY-001` is the closed manual MVP slice.

Delivered artifacts:

- `agent-workflows/pi-onboarding-fde/`: portable Onboarding Agent to FDE Agent
  workflow pack, templates, prompts, and completed experiment artifacts.
- `packages/tui/src/components/markdown.ts`: Markdown renderer now safely
  degrades deeply nested blockquote-looking terminal output instead of
  overflowing the call stack.
- `packages/tui/test/markdown.test.ts`: renderer regression for pathological
  leading `>` output.
- `packages/coding-agent/test/assistant-message.test.ts`: assistant-message
  display regression for the same output shape.
- `packages/coding-agent/test/session-continuity.test.ts`: disk-backed saved
  session resume regression using `SessionManager.continueRecent()`.
- `packages/web-ui/tsconfig.json` and `packages/web-ui/example/tsconfig.json`:
  no-build check path for local source-resolution during `npm run check`.

Verification already completed before commit:

- `node --test --import tsx test/markdown.test.ts` in `packages/tui`
- `npx tsgo --noEmit -p tsconfig.build.json` in `packages/tui`
- `npx vitest --run test/assistant-message.test.ts test/session-continuity.test.ts`
  in `packages/coding-agent`
- `npm run check` at repo root
- docs-pack forbidden-label and artifact checks

Bounded claim: this is a local checkout implementation and regression witness.
It does not claim an upstream release, maintainer action, or deployed product
fix.

## Implemented Feedback MVP Slice

`PI-FEEDBACK-CAPTURE-001` is the first native broader-MVP feedback slice.

Delivered artifacts:

- `packages/coding-agent/src/core/feedback.ts`: deterministic local YAML
  feedback record writer.
- `packages/coding-agent/src/core/slash-commands.ts`: `/feedback` appears in
  built-in slash-command completion.
- `packages/coding-agent/src/modes/interactive/interactive-mode.ts`: `/feedback [summary]`
  writes `.pi/feedback/pi-feedback-YYYYMMDD-HHMMSS.yaml` and reports the path.
- `packages/coding-agent/test/feedback.test.ts`: regression coverage for record
  path, source/task/friction/agent-analysis/status sections, and TODO guidance.
- `packages/coding-agent/README.md`, `packages/coding-agent/docs/usage.md`,
  `packages/coding-agent/docs/sessions.md`, and
  `packages/coding-agent/CHANGELOG.md`: documented command surface.

Bounded claim: this implements local feedback capture only. It does not open
GitHub issues or PRs, publish feedback, implement rewards, or add a dashboard.

## Broader MVP Hypothesis

The broader Pi Agent MVP is an artifact-rich improvement loop for agent-facing
product feedback:

```text
problem -> MVP -> onboarding -> feedback -> agent triage -> spec/tests -> implementation -> measurement -> product learning
```

The operational loop should be:

```text
feedback -> evidence -> evaluation -> decision -> work -> verification -> report-back -> learning
```

The minimum product promise is:

> A Pi user or agent can capture friction at the moment it happens, turn it into
> a durable local artifact, and let another Pi session triage that artifact into
> evidence, a decision packet, and implementation-ready work.

This means the next broader MVP should not start with dashboards, rewards, or
automation. It should first create the smallest durable feedback surface that
another session can read from disk.

## Recovered Roadmap

The source roadmap lives in
`docs/chatgpt-project-sources/pi-agent/15_ROADMAP.md`.

Recovered milestones:

1. Feedback OS Spec
   - Define feedback record shape, triage statuses, reward statuses, Codex loop,
     and anti-gaming policy.
   - Status in this repo: imported source exists and native `/feedback` capture
     is implemented; full triage/reward policy remains future work.

2. Manual GTM Self-Improving Loop
   - Run one artifact-rich cycle before automation.
   - Durable artifacts should include a customer problem note, MVP hypothesis,
     onboarding audit, feedback records, evidence bundles, relevance
     evaluations, decision packets, spec/tests, outcome note, and learning
     summary.
   - Status in this repo: session-continuity case closed one loop slice, but the
     general loop is not implemented.

3. Manual Intake Trial
   - Collect 10 to 20 anonymized feedback specimens and advance several through
     evidence, evaluation, decision, and at least one simulated outcome.
   - Status in this repo: imported specimen sources exist and local capture is
     available; specimen-batch intake and simulated outcomes remain future work.

4. Feedback Widget Prototype
   - Add a visible feedback surface, create a durable record, return an
     acknowledgement ID, and route to manual triage.
   - Status in this repo: implemented as the Pi-native `/feedback` slash
     command rather than a web widget.

5. Loop Control Panel
   - Show loop state, stale evidence, relevance risk, accepted work, verification
     gaps, and next unclosed edge.
   - Status in this repo: defer until records and triage artifacts exist.

6. Public Beta Loop
   - Publish the feedback promise, reward useful feedback, and trace shipped
     work back to feedback.
   - Status in this repo: defer until local loop is proven.

## Implemented Slice Details

The Pi-native `/feedback` command is the next broader MVP slice.

Status: implemented as `PI-FEEDBACK-CAPTURE-001`.

Reason:

- It is the narrowest user-facing surface that advances the recovered roadmap.
- It creates durable artifacts another session can inspect.
- It does not require GitHub issue creation, rewards, dashboards, or public beta
  commitments.
- It directly follows the source MVP shape in
  `docs/chatgpt-project-sources/pi-agent/05_EARENDIL_PI_PRE_PR_FEEDBACK_CASE_STUDY.md`.

V1 behavior:

- Add a `/feedback` command in the Pi interactive command surface.
- When invoked, prompt or guide the current session to produce a concise feedback
  record before any issue or PR is opened.
- Write a local YAML file at:

```text
.pi/feedback/pi-feedback-<timestamp>.yaml
```

- Create `.pi/feedback/` if it does not exist.
- Return the written file path to the user.
- Do not open GitHub issues or PRs in V1.
- Do not implement rewards, dashboards, or public publishing in V1.

Minimum YAML shape:

```yaml
id: pi-feedback-YYYYMMDD-HHMMSS
source:
  product: Pi
  repo: badlogic/pi-mono
  cwd:
  branch:
  commit:
  pi_version:
  os:
  anonymized: true
task:
  user_goal:
  agent_goal:
  command_or_workflow:
  expected_outcome:
  observed_outcome:
friction:
  category: bug | docs | extension | core | provider | UX | performance | contribution_process | unknown
  severity: blocker | high | medium | low | unknown
  reproducible: yes | no | unknown
  minimal_repro:
  evidence:
    logs: []
    files_touched: []
    screenshots: []
agent_analysis:
  proposed_route: docs | extension | core | provider | UX | no_action | unknown
  suggested_next_step:
  confidence: low | medium | high
status:
  triage: captured
  created_at:
```

Implementation notes:

- Prefer existing slash-command patterns in `packages/coding-agent/src/modes/interactive/interactive-mode.ts`.
- Prefer existing config/path helpers for `.pi` or agent directory conventions
  where available.
- Keep the first command deterministic and file-backed. If LLM-generated
  analysis is needed, ask the model to draft content into the command flow, but
  do not require provider APIs for the basic file write path.
- The command should still be useful offline if the user manually fills fields
  or accepts placeholder values.

Acceptance criteria:

- A tester can run `/feedback` from an interactive Pi session.
- The command writes one YAML file under `.pi/feedback/`.
- The file includes source, task, friction, agent analysis, and status sections.
- The output path is shown to the user.
- A later Codex/Pi session can read the file and explain what happened without
  needing chat history.
- Root `npm run check` passes.

## Later MVP Candidate: pi-memory-lite

`pi-memory-lite` is a separate MVP candidate recovered from
`docs/chatgpt-project-sources/pi-agent/pi_memory_deep_dive.md`.

It should not be the immediate next slice unless explicitly selected. It is
larger than `/feedback` and belongs after the local feedback artifact loop is
usable.

Recovered shape:

- extension name: `pi-memory-lite`
- files:
  - `.pi/extensions/pi-memory-lite/index.ts`
  - `.pi/memory/INDEX.md`
  - `.pi/memory/CURRENT.md`
  - `.pi/memory/DECISIONS.md`
  - `.pi/memory/CONSTRAINTS.md`
  - `.pi/memory/REPO_MAP.md`
  - `.pi/memory/proposed/`
- hooks:
  - `before_agent_start`
  - `context`
  - `agent_end`
  - `session_before_compact`
  - `pi.appendEntry`
- constraints:
  - visible file-backed memory only
  - no embeddings in V1
  - no hidden prompt injection
  - selected memory must be auditable every turn
  - deleting `.pi/memory` restores normal behavior

Use this after `/feedback` when the product needs durable project memory to
support repeated triage and implementation sessions.

## Source Provenance

Primary local sources used to recover this roadmap:

- `agent-workflows/pi-onboarding-fde/`
- `docs/chatgpt-project-sources/pi-agent/15_ROADMAP.md`
- `docs/chatgpt-project-sources/pi-agent/22_GTM_SELF_IMPROVING_LOOP.md`
- `docs/chatgpt-project-sources/pi-agent/05_EARENDIL_PI_PRE_PR_FEEDBACK_CASE_STUDY.md`
- `docs/chatgpt-project-sources/pi-agent/pi_memory_deep_dive.md`
- `packages/coding-agent/test/session-continuity.test.ts`
- `packages/tui/test/markdown.test.ts`

## Hand-Off Instruction For Next Session

Start with the recommended `/feedback` slice. Do not broaden into dashboards,
rewards, public beta mechanics, or `pi-memory-lite` until the basic local
feedback record can be created, read, triaged, and checked in the current repo.

Expected next commit after implementation:

```text
Add Pi feedback capture command
```
