import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { parse } from "yaml";
import { writeFeedbackRecord } from "../src/core/feedback.js";
import { BUILTIN_SLASH_COMMANDS } from "../src/core/slash-commands.js";
import { InteractiveMode } from "../src/modes/interactive/interactive-mode.js";

let tempDir: string | undefined;

afterEach(() => {
	if (tempDir) {
		rmSync(tempDir, { recursive: true, force: true });
		tempDir = undefined;
	}
});

function createTempDir(): string {
	tempDir = mkdtempSync(join(tmpdir(), "pi-feedback-"));
	return tempDir;
}

describe("writeFeedbackRecord", () => {
	test("writes a durable YAML feedback record under .pi/feedback", () => {
		const cwd = createTempDir();
		const now = new Date("2026-05-04T12:34:56.789Z");

		const result = writeFeedbackRecord({
			cwd,
			git: {
				branch: "main",
				commit: "abc1234",
				repo: "badlogic/pi-mono",
			},
			now,
			osLabel: "Darwin 25.0.0 arm64",
			piVersion: "0.71.1",
			summary: "Markdown renderer overflowed while resuming a saved session",
		});

		expect(result.id).toBe("pi-feedback-20260504-123456");
		expect(result.filePath).toBe(join(cwd, ".pi", "feedback", "pi-feedback-20260504-123456.yaml"));

		const parsed = parse(readFileSync(result.filePath, "utf-8"));
		expect(parsed.id).toBe("pi-feedback-20260504-123456");
		expect(parsed.source).toMatchObject({
			product: "Pi",
			repo: "badlogic/pi-mono",
			cwd,
			branch: "main",
			commit: "abc1234",
			pi_version: "0.71.1",
			os: "Darwin 25.0.0 arm64",
			anonymized: true,
		});
		expect(parsed.task.user_goal).toBe("Markdown renderer overflowed while resuming a saved session");
		expect(parsed.task.command_or_workflow).toBe(
			"/feedback Markdown renderer overflowed while resuming a saved session",
		);
		expect(parsed.friction.evidence).toEqual({
			logs: [],
			files_touched: [],
			screenshots: [],
		});
		expect(parsed.agent_analysis.suggested_next_step).toContain("evidence -> evaluation -> decision");
		expect(parsed.status).toEqual({
			triage: "captured",
			created_at: "2026-05-04T12:34:56.789Z",
		});
	});

	test("leaves TODO guidance when no summary is supplied", () => {
		const cwd = createTempDir();

		const result = writeFeedbackRecord({
			cwd,
			git: {},
			now: new Date("2026-05-04T00:00:00.000Z"),
			osLabel: "Linux 6.0.0 x64",
			piVersion: "0.71.1",
		});

		const parsed = parse(readFileSync(result.filePath, "utf-8"));
		expect(parsed.source).toMatchObject({
			repo: "badlogic/pi-mono",
			branch: "unknown",
			commit: "unknown",
		});
		expect(parsed.task.user_goal).toContain("TODO");
		expect(parsed.task.command_or_workflow).toBe("/feedback");
		expect(parsed.friction.minimal_repro).toContain("TODO");
	});
});

type FeedbackCommandContext = {
	sessionManager: { getCwd: () => string };
	showStatus: (message: string) => void;
	showError: (message: string) => void;
};

const interactiveModePrototype = InteractiveMode.prototype as unknown as {
	handleFeedbackCommand(this: FeedbackCommandContext, summary?: string): void;
};

describe("InteractiveMode /feedback command", () => {
	test("is available as a built-in slash command", () => {
		expect(BUILTIN_SLASH_COMMANDS.some((command) => command.name === "feedback")).toBe(true);
	});

	test("writes a feedback record and reports the path", () => {
		const cwd = createTempDir();
		const statuses: string[] = [];
		const errors: string[] = [];

		interactiveModePrototype.handleFeedbackCommand.call(
			{
				sessionManager: { getCwd: () => cwd },
				showStatus: (message) => statuses.push(message),
				showError: (message) => errors.push(message),
			},
			"provider login did not show expected model",
		);

		expect(errors).toEqual([]);
		expect(statuses).toHaveLength(1);
		expect(statuses[0]).toContain(join(cwd, ".pi", "feedback", "pi-feedback-"));
	});
});
