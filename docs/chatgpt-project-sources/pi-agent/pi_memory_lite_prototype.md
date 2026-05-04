# Pi Memory Lite Prototype

Date: 2026-05-01

Purpose: a minimal Pi-native memory extension that gives Pi agents project-specialized state without adding opaque harness memory.

This file is intended as a handoff to ChatGPT Pro for review and improvement. It contains:

- design constraints
- file layout
- prototype TypeScript extension
- expected behavior
- review prompt for Pro

## Design Constraints

This prototype follows the Pi philosophy:

- memory is plain files under the project
- active memory is visible and editable
- selected memory is injected as a visible custom message
- selected memory IDs are recorded as session audit state with `pi.appendEntry`
- no embeddings or hidden retrieval in v1
- no automatic promotion of model-generated memories into active memory
- code facts should be pointers to files, not stale explanations of code

## File Layout

Install the extension into a project:

```text
<project>/
  .pi/
    extensions/
      pi-memory-lite/
        index.ts
    memory/
      INDEX.md
      CURRENT.md
      DECISIONS.md
      CONSTRAINTS.md
      REPO_MAP.md
      proposed/
```

Use `CURRENT.md` for high-value active state. Use the other files for durable entries headed by memory IDs.

Recommended entry format:

```markdown
## M-2026-05-01-001: Repo status for Pi

Type: repo-fact
Scope: Pi memory prototype
Status: active
Source: live-check
Evidence: badlogic/pi-mono at ade08de; npm @mariozechner/pi-coding-agent 0.71.1
Last-verified: 2026-05-01
Review-by: 2026-06-01
Tags: pi, migration, repo

Statement:
As of 2026-05-01, the public Pi repo and npm package have not migrated to Earendil names.
Use badlogic/pi-mono and @mariozechner/pi-coding-agent until the public repo/package changes.
```

## Prototype Extension

Save as:

```text
.pi/extensions/pi-memory-lite/index.ts
```

```ts
import type { AgentMessage } from "@mariozechner/pi-agent-core";
import type { TextContent } from "@mariozechner/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, appendFileSync } from "node:fs";
import path from "node:path";

const CUSTOM_TYPE = "pi-memory-lite";
const AUDIT_TYPE = "pi-memory-lite-audit";
const DEFAULT_MAX_CHARS = 6000;
const DEFAULT_MAX_ENTRIES = 3;

type MemoryKind = "current" | "entry";

interface MemoryEntry {
	id: string;
	title: string;
	file: string;
	kind: MemoryKind;
	tags: string[];
	status?: string;
	body: string;
	score: number;
}

interface AuditEntry {
	timestamp: string;
	prompt: string;
	selected: Array<{ id: string; file: string; title: string; score: number }>;
}

function memoryDir(cwd: string): string {
	return path.join(cwd, ".pi", "memory");
}

function proposedDir(cwd: string): string {
	return path.join(memoryDir(cwd), "proposed");
}

function activeFiles(cwd: string): string[] {
	const dir = memoryDir(cwd);
	return ["CURRENT.md", "DECISIONS.md", "CONSTRAINTS.md", "REPO_MAP.md", "INDEX.md"]
		.map((name) => path.join(dir, name))
		.filter((file) => existsSync(file));
}

function ensureMemoryLayout(cwd: string): void {
	const dir = memoryDir(cwd);
	const proposed = proposedDir(cwd);
	mkdirSync(proposed, { recursive: true });

	const seedFiles: Record<string, string> = {
		"INDEX.md": "# Memory Index\n\nUse this file to list high-value memory entries and tags.\n",
		"CURRENT.md": "# Current Project Memory\n\nKeep this short. Only durable, active context that should often be considered.\n",
		"DECISIONS.md": "# Decisions\n\n",
		"CONSTRAINTS.md": "# Constraints\n\n",
		"REPO_MAP.md": "# Repo Map\n\nStore pointers to important files, commands, tests, and known traps.\n",
	};

	for (const [name, content] of Object.entries(seedFiles)) {
		const file = path.join(dir, name);
		if (!existsSync(file)) writeFileSync(file, content, "utf8");
	}
}

function readText(file: string): string {
	try {
		return readFileSync(file, "utf8");
	} catch {
		return "";
	}
}

function tokenize(text: string): string[] {
	const stop = new Set([
		"the",
		"and",
		"for",
		"that",
		"this",
		"with",
		"from",
		"into",
		"have",
		"has",
		"will",
		"what",
		"when",
		"where",
		"why",
		"how",
		"can",
		"should",
		"could",
	]);
	return Array.from(
		new Set(
			text
				.toLowerCase()
				.split(/[^a-z0-9_./-]+/g)
				.map((t) => t.trim())
				.filter((t) => t.length >= 3 && !stop.has(t)),
		),
	);
}

function parseTags(block: string): string[] {
	const match = block.match(/^Tags:\s*(.+)$/im);
	if (!match) return [];
	return match[1]
		.split(",")
		.map((tag) => tag.trim().toLowerCase())
		.filter(Boolean);
}

function parseStatus(block: string): string | undefined {
	return block.match(/^Status:\s*(.+)$/im)?.[1]?.trim().toLowerCase();
}

function parseMemoryEntries(cwd: string): MemoryEntry[] {
	const entries: MemoryEntry[] = [];
	const dir = memoryDir(cwd);
	if (!existsSync(dir)) return entries;

	const currentFile = path.join(dir, "CURRENT.md");
	const current = readText(currentFile).trim();
	if (current && current.replace(/^#.*$/gm, "").trim()) {
		entries.push({
			id: "CURRENT",
			title: "Current Project Memory",
			file: currentFile,
			kind: "current",
			tags: ["current"],
			status: "active",
			body: current,
			score: 0,
		});
	}

	for (const file of activeFiles(cwd).filter((f) => path.basename(f) !== "CURRENT.md")) {
		const text = readText(file);
		const matches = Array.from(text.matchAll(/^##\s+(M-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3})(?::\s*(.*))?$/gm));
		for (let i = 0; i < matches.length; i++) {
			const match = matches[i];
			const start = match.index ?? 0;
			const end = i + 1 < matches.length ? matches[i + 1].index ?? text.length : text.length;
			const block = text.slice(start, end).trim();
			entries.push({
				id: match[1],
				title: match[2]?.trim() || match[1],
				file,
				kind: "entry",
				tags: parseTags(block),
				status: parseStatus(block),
				body: block,
				score: 0,
			});
		}
	}

	return entries;
}

function scoreEntry(entry: MemoryEntry, terms: string[]): MemoryEntry {
	let score = entry.kind === "current" ? 4 : 0;
	const haystack = `${entry.id} ${entry.title} ${entry.tags.join(" ")} ${entry.body}`.toLowerCase();

	for (const term of terms) {
		if (entry.id.toLowerCase().includes(term)) score += 8;
		if (entry.title.toLowerCase().includes(term)) score += 5;
		if (entry.tags.includes(term)) score += 4;
		if (haystack.includes(term)) score += 1;
	}

	if (entry.status === "active") score += 2;
	if (entry.status === "stale" || entry.status === "revoked") score -= 20;

	return { ...entry, score };
}

function selectMemory(cwd: string, prompt: string, maxEntries = DEFAULT_MAX_ENTRIES): MemoryEntry[] {
	const terms = tokenize(prompt);
	const scored = parseMemoryEntries(cwd)
		.map((entry) => scoreEntry(entry, terms))
		.filter((entry) => entry.kind === "current" || entry.score > 0)
		.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

	const current = scored.find((entry) => entry.kind === "current");
	const rest = scored.filter((entry) => entry.kind !== "current").slice(0, maxEntries);
	return current ? [current, ...rest] : rest;
}

function truncate(text: string, maxChars: number): string {
	if (text.length <= maxChars) return text;
	return `${text.slice(0, maxChars)}\n\n[pi-memory-lite: truncated ${text.length - maxChars} characters]`;
}

function formatInjection(entries: MemoryEntry[], maxChars = DEFAULT_MAX_CHARS): string {
	const parts = entries.map((entry, index) => {
		const rel = entry.file.includes(`${path.sep}.pi${path.sep}`) ? entry.file.slice(entry.file.indexOf(`${path.sep}.pi${path.sep}`) + 1) : entry.file;
		return [
			`${index + 1}. ${entry.id} [${entry.status || "unknown"}] ${entry.title}`,
			`   Source: ${rel}`,
			"",
			entry.body,
		].join("\n");
	});

	return truncate(
		`<pi-memory-lite>\nSelected project memory for this turn. Treat this as user-maintained context, but verify code facts against the current repository before acting.\n\n${parts.join("\n\n---\n\n")}\n</pi-memory-lite>`,
		maxChars,
	);
}

function isMemoryMessage(msg: AgentMessage): boolean {
	const typed = msg as AgentMessage & { customType?: string };
	if (typed.customType === CUSTOM_TYPE) return true;
	if (msg.role !== "user") return false;

	const content = msg.content;
	if (typeof content === "string") return content.includes("<pi-memory-lite>");
	if (!Array.isArray(content)) return false;

	return content.some((block) => block.type === "text" && (block as TextContent).text.includes("<pi-memory-lite>"));
}

function formatSearch(entries: MemoryEntry[]): string {
	if (entries.length === 0) return "No matching memory entries.";
	return entries
		.map((entry) => {
			const rel = entry.file.includes(`${path.sep}.pi${path.sep}`) ? entry.file.slice(entry.file.indexOf(`${path.sep}.pi${path.sep}`) + 1) : entry.file;
			const firstStatement =
				entry.body.match(/^Statement:\s*\n([\s\S]*?)(?:\n[A-Z][A-Za-z -]+:|\n##|\s*$)/m)?.[1]?.trim() ||
				entry.body.split("\n").slice(0, 6).join("\n").trim();
			return `${entry.id} (${entry.score}) ${entry.title}\n${rel}\n${firstStatement}`;
		})
		.join("\n\n---\n\n");
}

function today(): string {
	return new Date().toISOString().slice(0, 10);
}

function appendProposal(cwd: string, text: string): string {
	ensureMemoryLayout(cwd);
	const file = path.join(proposedDir(cwd), `${today()}.md`);
	const id = `M-${today()}-PROPOSED`;
	const block = [
		`## ${id}: Proposed memory`,
		"",
		"Type: proposed",
		"Scope: project",
		"Status: proposed",
		"Source: user-or-agent",
		`Last-verified: ${today()}`,
		"Review-by: TBD",
		"Tags: proposed",
		"",
		"Statement:",
		text.trim(),
		"",
	].join("\n");
	appendFileSync(file, `${block}\n`, "utf8");
	return file;
}

export default function piMemoryLite(pi: ExtensionAPI): void {
	pi.registerCommand("memory", {
		description: "Search and propose project memory",
		handler: async (args, ctx) => {
			const [subcommand, ...rest] = args.trim().split(/\s+/);
			const query = rest.join(" ").trim();

			if (!subcommand || subcommand === "help") {
				ctx.ui.notify(
					[
						"Usage:",
						"/memory init",
						"/memory search <query>",
						"/memory propose <memory text>",
						"/memory propose   # opens editor",
					].join("\n"),
					"info",
				);
				return;
			}

			if (subcommand === "init") {
				ensureMemoryLayout(ctx.cwd);
				ctx.ui.notify(`Initialized ${memoryDir(ctx.cwd)}`, "info");
				return;
			}

			if (subcommand === "search") {
				ensureMemoryLayout(ctx.cwd);
				const selected = selectMemory(ctx.cwd, query || args, 8);
				ctx.ui.notify(formatSearch(selected), "info");
				return;
			}

			if (subcommand === "propose") {
				ensureMemoryLayout(ctx.cwd);
				const text = query || (await ctx.ui.editor("Propose memory", "Statement:\n"));
				if (!text?.trim()) {
					ctx.ui.notify("No memory proposal written.", "info");
					return;
				}
				const file = appendProposal(ctx.cwd, text);
				ctx.ui.notify(`Wrote proposal to ${file}`, "info");
				return;
			}

			ctx.ui.notify(`Unknown /memory command: ${subcommand}`, "warning");
		},
	});

	pi.on("session_start", async (_event, ctx) => {
		if (!existsSync(memoryDir(ctx.cwd))) return;
		ctx.ui.setStatus("memory", ctx.ui.theme.fg("accent", "memory"));
	});

	pi.on("context", async (event) => {
		return {
			messages: event.messages.filter((msg) => !isMemoryMessage(msg)),
		};
	});

	pi.on("before_agent_start", async (event, ctx) => {
		if (!existsSync(memoryDir(ctx.cwd))) return;

		const selected = selectMemory(ctx.cwd, event.prompt, DEFAULT_MAX_ENTRIES);
		if (selected.length === 0) return;

		const audit: AuditEntry = {
			timestamp: new Date().toISOString(),
			prompt: event.prompt.slice(0, 500),
			selected: selected.map((entry) => ({
				id: entry.id,
				file: path.relative(ctx.cwd, entry.file),
				title: entry.title,
				score: entry.score,
			})),
		};
		pi.appendEntry<AuditEntry>(AUDIT_TYPE, audit);

		return {
			message: {
				customType: CUSTOM_TYPE,
				content: formatInjection(selected),
				display: true,
				details: audit,
			},
		};
	});
}
```

## Expected Behavior

1. User runs `/memory init`.
2. Extension creates `.pi/memory`.
3. User or agent writes active memory into `CURRENT.md`, `DECISIONS.md`, `CONSTRAINTS.md`, or `REPO_MAP.md`.
4. On each user prompt, the extension selects `CURRENT.md` plus up to three matching active entries.
5. The extension injects a visible custom message containing selected memory.
6. The extension appends an audit entry to the session with selected memory IDs and scores.
7. `/memory search <query>` shows matching entries.
8. `/memory propose` writes proposed memory under `.pi/memory/proposed/` for human review.

## Known Limitations

- Search is simple lexical matching.
- It does not validate `Review-by` dates yet.
- It does not parse proposed entries into active memory.
- It does not enforce trust levels.
- It does not shell out to `rg`; it uses Node file reads for a small known memory directory.
- It does not run tests here because this is a Markdown handoff artifact, not an installed extension.

## Suggested Improvements For Pro

Ask Pro to improve without breaking the Pi-native constraints:

- tighten the TypeScript types against current Pi extension APIs
- add stale/revoked filtering based on `Status` and `Review-by`
- improve parsing of memory entry metadata
- add `/memory review` for approving proposed memories
- add token-aware caps rather than char caps
- add better audit rendering
- add a test harness using Pi's extension tests if useful
- consider whether `CURRENT.md` should always inject, or only inject when score exceeds a threshold
- keep everything file-backed and inspectable

## Prompt For ChatGPT Pro

Use this prompt with the code above:

```text
You are reviewing a minimal Pi coding-agent memory extension prototype.

Goal:
Improve the extension while preserving the Pi philosophy: no opaque hidden memory, no embeddings in v1, no automatic promotion into active memory, no stale code explanations treated as truth. Memory must remain plain files, visible, editable, greppable, and auditable.

Context:
Pi is Mario Zechner's minimal coding-agent harness. It already has JSONL session trees, compaction, branch summaries, AGENTS.md, extension state, and custom context messages. The memory extension should use those native surfaces rather than creating a proprietary memory backend.

Please:
1. Review the extension code for correctness against the Pi extension API.
2. Identify likely runtime/type bugs.
3. Improve the implementation if you can.
4. Keep the feature set minimal:
   - .pi/memory file layout
   - /memory init
   - /memory search <query>
   - /memory propose
   - visible before_agent_start memory injection
   - session audit entries for selected memory IDs
5. Add only small, high-value features if they materially reduce risk, such as stale/revoked filtering, safer metadata parsing, or better caps.
6. Do not add vector search, background services, external databases, or global personal memory.
7. Return a revised index.ts and a short explanation of changes.

Acceptance criteria:
- Active memory is never silently hidden from the user.
- The model is told to verify code facts against the repo.
- Every injected memory selection is auditable in the session.
- Proposed memory remains proposed until reviewed.
- Deleting .pi/memory or disabling the extension restores normal Pi behavior.
```

## Open Questions

- Should `CURRENT.md` always inject, or only when it matches the prompt?
- Should memory files be project-local only in v1, or should `~/.pi/agent/memory` be supported later?
- Should Pro turn this into a real Pi package, or keep it as a project-local extension until tested?

NEXT: Ask Pro to review and revise `pi-memory-lite` while preserving the file-backed, visible, auditable memory constraints.
