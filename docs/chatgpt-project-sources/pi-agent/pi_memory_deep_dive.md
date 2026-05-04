# Pi Memory Deep Dive

Date: 2026-05-01

## Executive Take

Pi has not, as of this check, publicly migrated from `badlogic/pi-mono` to an Earendil GitHub repository. Mario's April 8 post says the intended destination is `earendil-works/pi`, and the package will become `@earendil/pi`, but `git ls-remote` currently fails for both `Earandil/Pi` and `earendil-works/pi`. The active public repo is still `badlogic/pi-mono`, and npm still resolves `@mariozechner/pi-coding-agent` at `0.71.1`.

Mario's position is not that agents should have no context. It is that coding agents should not have opaque, product-managed, hard-to-inspect memory. For coding, his line is: the codebase is the ground truth; if you add a second hidden state store, you now have another thing to maintain and another place for stale facts to mislead the agent.

The opportunity is therefore not "add ChatGPT/Claude-style memory to Pi." The opportunity is a Pi-native memory layer:

- file-backed, not database-first
- visible, editable, greppable
- evidence-linked to repo files, commits, sessions, or user decisions
- injected only when relevant, not always-on
- small enough to be read by humans and maintained by agents
- compatible with Pi's existing session tree, compaction, extension state, AGENTS.md, and bash-first philosophy

## Current Public Project State

Sources checked:

- `https://github.com/Earandil/Pi.git`: repository not found.
- `https://github.com/earendil-works/pi.git`: repository not found.
- `https://github.com/badlogic/pi-mono.git`: resolves at `ade08de14cfd585fd32c3614d5bd33660fab69f5`.
- `npm view @mariozechner/pi-coding-agent`: version `0.71.1`, repository `git+https://github.com/badlogic/pi-mono.git`.
- `npm view @earendil/pi`: no package result in this check.

Mario's migration post says the repo is planned to move from `badlogic/pi-mono` to `earendil-works/pi`, with package name changing from `@mariozechner/pi-coding-agent` to `@earendil/pi`. That appears to be planned but not publicly complete.

## What Pi Already Has Instead Of "Memory"

Pi already contains several explicit state mechanisms.

### 1. Session Files

Pi stores sessions as JSONL under `~/.pi/agent/sessions/--<path>--/<timestamp>_<uuid>.jsonl`. The format is documented in `packages/coding-agent/docs/session-format.md`.

Important properties:

- session files are JSONL
- each entry has `type`, `id`, `parentId`, and timestamp fields
- sessions are trees, not only linear logs
- history is append-only from the user's perspective
- custom extension entries can persist state
- custom messages can participate in LLM context
- custom entries do not participate in LLM context

Relevant source:

- `packages/coding-agent/src/core/session-manager.ts`
- `packages/coding-agent/docs/session-format.md`

Key implementation facts:

- `CustomEntry` is explicitly for extension state and is ignored by `buildSessionContext`.
- `CustomMessageEntry` is explicitly for extension-provided messages that do get converted into LLM context.
- `buildSessionContext()` walks the active tree path and constructs only the current branch context.

This is important: Pi has a clean separation between "persisted state" and "context sent to the model."

### 2. Branching And Branch Summaries

Pi sessions form trees. `/tree` can move to earlier entries and continue from there. When switching away from a branch, Pi can summarize the abandoned branch and attach that summary at the new point.

This is a Pi-native answer to one of the main problems with long conversations: do not pollute the main path with every side quest; branch, summarize, and bring back the important part.

### 3. Compaction

Pi has automatic and manual compaction. The documented format is structured markdown:

- goal
- constraints and preferences
- progress
- key decisions
- next steps
- critical context
- read-files
- modified-files

Compaction is explicitly lossy, but the full JSONL history remains on disk and can be revisited with `/tree`.

This is already very close to a memory primitive, except it is session-local and mainly reactive to context pressure.

### 4. AGENTS.md And SYSTEM.md

Pi loads project context files hierarchically:

- `~/.pi/agent/AGENTS.md`
- parent directories
- current directory

It also supports `.pi/SYSTEM.md` and `APPEND_SYSTEM.md`. This gives a direct file-backed way to define durable project instructions and agent behavior.

### 5. Extensions

Pi extensions can:

- register tools
- intercept inputs and context
- modify the system prompt before an agent starts
- customize compaction
- append persistent state entries
- append custom context messages
- render custom TUI

This means a memory system does not need to change Pi core. It can be an extension plus a file convention.

## Why Mario Rejects Coding-Agent Memory

Mario's public rationale has several layers.

### 1. Code Is The Source Of Truth

On Syntax #976, Mario says that for coding he does not want a memory system because code is the ground truth and it changes. A separate memory store becomes another thing to maintain.

This is the central design constraint. Memory that records "how the code works" will drift unless it is continuously verified against the repo. Drifted memory is worse than no memory because it confidently steers the agent away from current code.

### 2. Models Can Learn Local Style From Code

Mario argues that models can infer code structure and style from reading relevant files. For many coding tasks, reading one or two representative files beats injecting stale memories about style.

The implication is that persistent memory should not duplicate things that are cheaply discoverable from the current repo. A memory layer should store only things that are not obvious from reading code: decisions, constraints, project boundaries, user preferences, known traps, workflow gates, and evidence pointers.

### 3. Hidden Harness Context Is Harmful

Mario's blog post says context engineering matters, and he built Pi because existing harnesses made it hard to know what entered the model context. Hidden injection breaks observability and makes behavior changes hard to debug.

Therefore a Pi-compatible memory layer must expose:

- what memory was selected
- why it was selected
- where it came from
- whether it was injected into the prompt or only available on disk

### 4. Big Fancy Retrieval Is Suspect

Mario is skeptical of embeddings, AST indexes, and similar systems unless they are evaluated against outputs. He argues that a simple folder map can be useful, but more elaborate retrieval often lacks proof that it improves coding performance.

This does not mean retrieval is useless. It means the baseline should be simple search over explicit files, using tools the model already knows: `rg`, `find`, `jq`, and direct reads.

### 5. Memory Changes The Human-Agent Relationship

Armin's comments on Syntax are different but relevant. He describes long-lived conversational memory as changing the user's relationship to the machine in a way he finds unhealthy or creepy. He also describes week-by-week compressed files that the agent can load and search, which works but is lossy.

For coding agents, this argues against personality/soul memory and in favor of operational memory: decisions, facts, known constraints, and workstream state.

### 6. Prompt Injection And Trust Boundaries

Mario is blunt that prompt injection remains unresolved. If memory can be written from untrusted content, it becomes a persistence channel for attack instructions. This matters especially for agents that read web/email/chat and have local file access.

A Pi-style memory system needs a provenance and trust model:

- user-approved memory
- agent-proposed but pending memory
- untrusted imported observations
- revoked/stale memory

## What An Ideal Pi-Compatible Memory Design Looks Like

The design should be boring. That is a feature.

### Principle 1: Memory Is Files

Use a project-local directory:

```text
.pi/memory/
  INDEX.md
  CURRENT.md
  DECISIONS.md
  CONSTRAINTS.md
  REPO_MAP.md
  LESSONS.md
  TODO.md
  evidence/
    sessions/
    notes/
```

No vector database in v1. No hidden global store in v1. No automatic personality memory.

### Principle 2: Memory Is Not Automatically Truth

Every durable memory item should have metadata:

```markdown
## M-2026-05-01-001: SACP freeze gate

Type: constraint
Scope: project
Status: active
Source: user
Evidence: AGENTS.md, session 019...
Last-verified: 2026-05-01
Review-by: 2026-06-01

Statement:
Do not edit satellite repos while the SACP freeze is active unless explicit lift evidence exists.
```

For Pi itself, the same pattern applies:

```markdown
## M-2026-05-01-002: Repo map is allowed memory

Type: design-decision
Scope: Pi memory prototype
Status: active
Source: Mario/Armin public comments
Evidence: Syntax #976, Pi README, docs/session-format.md
Last-verified: 2026-05-01

Statement:
Persistent coding memory should be a file-backed repo map and decision/constraint log, not a hidden semantic memory store.
```

### Principle 3: Agent Proposes, Human Promotes

The agent can write proposed memory to:

```text
.pi/memory/proposed/YYYY-MM-DD.md
```

But active memory only enters:

```text
.pi/memory/CURRENT.md
.pi/memory/DECISIONS.md
.pi/memory/CONSTRAINTS.md
```

after explicit user approval or a project policy that allows automatic promotion for low-risk categories.

This directly addresses Mario's "another place to maintain" objection: memory promotion is deliberate.

### Principle 4: Retrieval Is Explicit And Logged

The extension should expose commands, not silent magic:

```text
/memory search <query>
/memory show
/memory inject <id>
/memory propose
/memory verify <id>
/memory prune
```

For each prompt, the extension may do a cheap, transparent selection:

1. read `.pi/memory/INDEX.md`
2. use `rg` over `.pi/memory`
3. select at most N items
4. show/inject a small custom message
5. append a custom session entry recording which memories were injected

The custom session entry is not sent to the model; it is audit state.

The custom message is sent to the model; it should be visible unless the user chooses hidden mode.

### Principle 5: Current Code Beats Memory

Memory entries that describe code must be pointers, not stale explanations.

Bad:

```markdown
The auth system works by checking X in AuthManager.
```

Better:

```markdown
Auth code map:
- Entry point: src/auth/AuthManager.ts
- Middleware: src/http/authMiddleware.ts
- Tests: test/auth/*.test.ts
- Known trap: token refresh logic also appears in src/jobs/sessionRefresh.ts
```

The agent should still read the files.

### Principle 6: Memory Has Lifetimes

Stable:

- user preferences
- project boundaries
- accepted architecture decisions
- naming/notation conventions

Medium-lived:

- active milestone state
- current blockers
- near-term TODOs
- integration state

Short-lived:

- command outputs
- exploratory findings
- temporary hypotheses

The extension should treat these differently. Short-lived state belongs in session compaction or `TODO.md`, not in durable memory.

## Concrete MVP

Build a Pi extension named `pi-memory-lite`.

### Files

```text
.pi/extensions/pi-memory-lite/index.ts
.pi/memory/INDEX.md
.pi/memory/CURRENT.md
.pi/memory/DECISIONS.md
.pi/memory/CONSTRAINTS.md
.pi/memory/REPO_MAP.md
.pi/memory/proposed/
```

### Extension Hooks

Use Pi's existing extension API:

- `before_agent_start`: inspect prompt, optionally inject selected memory as a custom message
- `context`: avoid duplicate memory custom messages in the provider context
- `agent_end`: propose memory updates from the completed turn
- `session_before_compact`: ensure active memory is not lost inside compaction
- `pi.appendEntry`: record injected memory IDs and selected sources for audit

### Injection Format

Keep injection boring:

```markdown
<pi-memory-lite>
Selected project memory for this turn:

1. M-2026-05-01-001 [constraint, active]
   Do not edit satellite repos while freeze is active unless explicit lift evidence exists.
   Evidence: .pi/memory/CONSTRAINTS.md

2. M-2026-05-01-004 [repo-map, active]
   Session state code lives in packages/coding-agent/src/core/session-manager.ts.
   Evidence: .pi/memory/REPO_MAP.md
</pi-memory-lite>
```

Cap this aggressively, e.g. 1,500 tokens by default.

### Selection Algorithm

V1 should not use embeddings.

```text
Inputs:
- user prompt
- current cwd
- current git branch
- changed files from git status
- .pi/memory/INDEX.md

Steps:
1. tokenize user prompt into simple lowercase terms
2. grep headings and tags in .pi/memory/*.md
3. score by exact heading/tag matches, recency, status=active, scope match
4. include CURRENT.md always if under token cap
5. include top 3-7 memory entries
6. write an audit custom entry with selected IDs
```

This is intentionally primitive. It can be evaluated before adding complexity.

### Human Review Flow

At turn end, the extension can append proposed updates:

```markdown
# Proposed Memory Updates - 2026-05-01

## Proposed M-...
Type: lesson
Scope: project
Confidence: medium
Source: session:<id>

Statement:
The Pi public repo has not migrated yet; use badlogic/pi-mono until the public redirect exists.

Reason to remember:
Avoid broken GitHub/npm references.
```

The user or agent can then run:

```text
/memory review
```

and approve/reject/edit.

## Why This Addresses Mario's Objections

1. It does not compete with code as truth.
   It stores maps, decisions, constraints, and pointers. The agent still reads code.

2. It is inspectable.
   The user can open the files. The session log can show what was injected.

3. It is maintainable.
   Active memory is small, reviewed, and has stale/review dates.

4. It is Pi-native.
   It uses AGENTS.md, files, bash/rg, session custom entries, custom messages, and extensions.

5. It is easy to throw away.
   Delete `.pi/memory` or disable the extension. No lock-in.

6. It supports specialization.
   A Pi agent can become specialized through project-local files and reusable memory conventions, without needing an opaque proprietary Lefos-style backend.

## What Not To Build First

Do not start with:

- embeddings
- AST indexing
- autonomous global memory
- cross-project personal profile memory
- hidden prompt injection
- emotional/personality/soul memory
- auto-promoting every compaction summary into durable memory

These are exactly the directions that would violate the Pi philosophy.

## Evaluation Plan

The MVP should be judged empirically.

Test tasks:

1. cold-start a Pi session in a repo with only AGENTS.md
2. repeat with `pi-memory-lite`
3. compare:
   - number of files read before useful work starts
   - missed constraints
   - incorrect assumptions
   - duplicate code introduced
   - amount of stale memory injected
   - user time spent maintaining memory

Useful acceptance criteria:

- selected memory is visible and auditable every turn
- active memory stays under a configured token cap
- memory entries cite evidence
- stale entries are detected by review date
- no memory enters context from untrusted external content without approval
- deleting `.pi/memory` restores normal Pi behavior

## Recommended Next Step

Build a proof-of-concept `pi-memory-lite` extension in this workspace that only implements:

1. `.pi/memory` file convention
2. `/memory search`
3. `/memory propose`
4. `before_agent_start` injection of `CURRENT.md` plus up to three matched entries
5. custom session audit entry recording selected memory IDs

That is enough to test whether a Pi-style memory layer helps without violating the minimalism that makes Pi attractive.

## Sources

- Mario Zechner, "What I learned building an opinionated and minimal coding agent", 2025-11-30: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- Mario Zechner, "I've sold out", 2026-04-08: https://mariozechner.at/posts/2026-04-08-ive-sold-out/
- Mario Zechner, "Thoughts on slowing the fuck down", 2026-03-25: https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/
- Armin Ronacher, "Pi: The Minimal Agent Within OpenClaw", 2026-01-31: https://lucumr.pocoo.org/2026/1/31/pi/
- Syntax #976 transcript, "Pi - The AI Harness That Powers OpenClaw W/ Armin Ronacher & Mario Zechner", 2026-02-04: https://syntax.fm/show/976/pi-the-ai-harness-that-powers-openclaw-w-armin-ronacher-and-mario-zechner/transcript
- Pi public repo checked locally from `https://github.com/badlogic/pi-mono.git` at commit `ade08de`.
