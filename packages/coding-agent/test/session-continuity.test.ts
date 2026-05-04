import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AssistantMessage } from "@mariozechner/pi-ai";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { SessionManager } from "../src/core/session-manager.js";
import { AssistantMessageComponent } from "../src/modes/interactive/components/assistant-message.js";
import { initTheme } from "../src/modes/interactive/theme/theme.js";

function createAssistantMessage(text: string): AssistantMessage {
	return {
		role: "assistant",
		content: [{ type: "text", text }],
		api: "openai-responses",
		provider: "openai",
		model: "gpt-4o-mini",
		usage: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			totalTokens: 0,
			cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
		},
		stopReason: "stop",
		timestamp: Date.now(),
	};
}

describe("session continuity", () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = join(tmpdir(), `pi-session-continuity-${Date.now()}-${Math.random().toString(36).slice(2)}`);
		mkdirSync(tempDir, { recursive: true });
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	test("resumes and renders a saved session with deeply nested blockquote-looking terminal output", () => {
		initTheme("dark");

		const session = SessionManager.create(tempDir, tempDir);
		session.appendMessage({ role: "user", content: "reopen the previous terminal output", timestamp: Date.now() });
		session.appendMessage(createAssistantMessage(`${">".repeat(2000)} terminal output`));

		const resumedSession = SessionManager.continueRecent(tempDir, tempDir);
		const context = resumedSession.buildSessionContext();
		const assistantMessage = context.messages.find((message) => message.role === "assistant");

		expect(assistantMessage).toBeDefined();
		if (!assistantMessage || assistantMessage.role !== "assistant") {
			throw new Error("Expected resumed session to contain an assistant message");
		}

		const rendered = new AssistantMessageComponent(assistantMessage).render(80).join("\n");

		expect(rendered).toContain("terminal output");
		expect(rendered).toContain(">>>>>>>>");
		expect(rendered).not.toContain("│ ");
	});
});
