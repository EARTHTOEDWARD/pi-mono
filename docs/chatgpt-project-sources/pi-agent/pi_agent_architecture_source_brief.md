# Pi Agent Architecture Source Brief for Memory Extension Design

_Date prepared: 2026-05-01_

## Source status

- Current public repository inspected: `badlogic/pi-mono` on GitHub.
- Current public GitHub release observed: `v0.71.1`, marked latest on 2026-05-01.
- Mario Zechner's Earendil migration post says the repo is intended to move from `badlogic/pi-mono` to `earendil-works/pi`, and the package from `@mariozechner/pi-coding-agent` to `@earendil/pi`; however, the public working source I could inspect remains `badlogic/pi-mono`.
- I attempted a shallow clone into the sandbox, but the shell environment could not resolve `github.com`. Live web inspection of GitHub, pi.dev, and docs succeeded.

## Key source URLs

- Repository: https://github.com/badlogic/pi-mono
- Coding agent README: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/README.md
- Extension docs: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md
- Session file format docs: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/session-format.md
- Compaction docs: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/compaction.md
- Package docs: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md
- Extension examples README: https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/README.md
- Product site: https://pi.dev/
- Mario's Earendil migration post: https://mariozechner.at/posts/2026-04-08-ive-sold-out/
- Mario's Pi philosophy post: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- Armin Ronacher on Pi: https://lucumr.pocoo.org/2026/1/31/pi/
- Syntax #976 transcript: https://syntax.fm/show/976/pi-the-ai-harness-that-powers-openclaw-w-armin-ronacher-and-mario-zechner/transcript

## Architecture facts relevant to memory

### Product shape

Pi is a minimal terminal coding harness. Its default model-facing capabilities are intentionally small: read, write, edit, and bash. It is designed to adapt to the user's workflow through extensions, skills, prompt templates, themes, and packages.

Pi runs in multiple modes: interactive, print/JSON, RPC, and SDK. A memory extension should therefore avoid relying only on interactive UI. Commands should degrade gracefully in print/RPC contexts.

### Context surfaces

Pi loads project and global context files:

- `~/.pi/agent/AGENTS.md`
- parent directory `AGENTS.md` or `CLAUDE.md` files
- current directory context files
- `.pi/SYSTEM.md` or global `SYSTEM.md` to replace the default system prompt
- `APPEND_SYSTEM.md` to append to the default system prompt

This means a memory extension should not duplicate ordinary project instructions. It should complement these files by storing evidence-linked decisions, constraints, repo maps, known traps, and reviewable memory entries.

### Sessions

Pi stores sessions as JSONL under:

```text
~/.pi/agent/sessions/--<path>--/<timestamp>_<uuid>.jsonl
```

Session entries are tree-linked via `id` and `parentId`, not merely linear logs. Branching is first-class. `/tree`, `/fork`, and `/clone` are central concepts.

Important entry types:

- `message`: ordinary user, assistant, and tool result messages.
- `compaction`: lossy summary of old context plus `firstKeptEntryId`.
- `branch_summary`: summary when navigating away from one branch to another.
- `custom`: extension state; not sent to the LLM.
- `custom_message`: extension-injected context; sent to the LLM.
- `label`: bookmarks or markers.
- `session_info`, `model_change`, `thinking_level_change`.

For a memory extension, this gives a clean split:

- Audit/persistence state should use `custom` entries or files.
- Injected memory should use `custom_message` or `before_agent_start` message injection.

### Context building

`buildSessionContext()` walks the active branch from current leaf to root. It handles compaction entries, branch summaries, and custom message entries. Therefore, injected memory should respect branch semantics. A memory extension that reconstructs in-memory state must rebuild on both `session_start` and `session_tree`, not only startup.

### Compaction

Compaction is lossy, but full JSONL remains on disk. It triggers automatically near context limits or manually via `/compact`. Defaults observed in docs/source:

- reserve tokens: 16,384
- keep recent tokens: 20,000

Extensions can intercept `session_before_compact` and provide custom summaries, or observe `session_compact` after compaction. A memory extension should not blindly promote compaction summaries to durable memory.

### Extension API

Extensions are TypeScript modules. Auto-discovery locations:

```text
~/.pi/agent/extensions/*.ts
~/.pi/agent/extensions/*/index.ts
.pi/extensions/*.ts
.pi/extensions/*/index.ts
```

Main hooks/events relevant to memory:

- `session_start`: reconstruct state on startup, reload, new session, resume, fork.
- `resources_discover`: add resource paths dynamically.
- `input`: intercept or transform user input before agent processing.
- `before_agent_start`: inspect prompt, loaded context, tools, skills; inject a custom message or alter the system prompt.
- `context`: modify messages before each LLM call.
- `before_provider_request`: inspect or replace final provider payload.
- `agent_end`: inspect messages from a prompt; useful for proposing memory updates.
- `session_before_compact`: cancel or customize compaction.
- `session_compact`: observe saved compaction entry.
- `session_before_tree` / `session_tree`: handle branch navigation.
- `tool_call` / `tool_result`: block, mutate, or observe tools.

API methods relevant to memory:

- `pi.registerCommand()` for `/memory` commands.
- `pi.registerTool()` for optional LLM-callable memory tools.
- `pi.appendEntry(customType, data)` for non-LLM-visible session audit state.
- `pi.sendMessage()` for custom messages, depending on context.
- `pi.setLabel()` for marking session entries.
- `ctx.sessionManager` for read-only session inspection.
- `ctx.getContextUsage()` for token-aware injection.
- `ctx.getSystemPrompt()` and `event.systemPromptOptions` for observability.

### Pi packages

Packages can bundle extensions, skills, prompts, and themes. A memory extension can be distributed as a Pi package by declaring a `pi` key in `package.json`, for example:

```json
{
  "name": "pi-memory-lite",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./src/index.ts"],
    "skills": ["./skills"],
    "prompts": ["./prompts"]
  }
}
```

Pi package security warning: packages run with full system access. A memory extension must be auditable and conservative.

## Design implications for our memory extension

1. Build as a project-local extension first: `.pi/extensions/pi-memory-lite/index.ts`.
2. Keep durable memory as files under `.pi/memory/`, not hidden database state.
3. Use `custom` entries for injection audit records; use `custom_message` only for selected memory that should actually enter model context.
4. Implement `/memory show`, `/memory search`, `/memory propose`, `/memory review`, `/memory inject`, and `/memory prune` as commands before exposing an LLM-callable tool.
5. Use `before_agent_start` for transparent selected-memory injection, capped tightly by tokens.
6. Use `agent_end` to draft proposed memories, but do not auto-promote without approval.
7. Reconstruct state on both `session_start` and `session_tree`, because session trees can move without extension runtime restart.
8. Treat code as truth. Memory entries about code should be pointers and repo maps, not prose claims that can drift.
9. Avoid embeddings/vector DB in v1. Use explicit file conventions, headings/tags, `rg`-style search, and evidence links.
10. Add provenance/trust fields: source, evidence, status, last-verified, review-by, scope, and confidence.

## Candidate file layout

```text
.pi/memory/
  INDEX.md
  CURRENT.md
  DECISIONS.md
  CONSTRAINTS.md
  REPO_MAP.md
  LESSONS.md
  TODO.md
  proposed/
  audit/
```

## Candidate injected context shape

```markdown
<pi-memory-lite>
Selected project memory for this turn:

1. M-2026-05-01-001 [constraint, active]
   Statement: Do not edit satellite repos while freeze is active unless explicit lift evidence exists.
   Evidence: .pi/memory/CONSTRAINTS.md
   Last verified: 2026-05-01

2. M-2026-05-01-004 [repo-map, active]
   Statement: Session-state code lives in packages/coding-agent/src/core/session-manager.ts.
   Evidence: .pi/memory/REPO_MAP.md
   Last verified: 2026-05-01
</pi-memory-lite>
```

## First implementation target

Minimum viable extension:

1. Create `.pi/memory` file convention.
2. Register `/memory search` and `/memory show`.
3. Register `/memory propose` to write to `.pi/memory/proposed/YYYY-MM-DD.md`.
4. Use `before_agent_start` to inject `CURRENT.md` plus up to three matched active entries.
5. Use `pi.appendEntry("pi-memory-lite.audit", ...)` to record selected memory IDs and source files.
6. Use `session_start` and `session_tree` to rebuild any cached index.
