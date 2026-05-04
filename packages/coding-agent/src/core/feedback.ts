import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { stringify } from "yaml";

export interface FeedbackGitInfo {
	branch?: string;
	commit?: string;
	repo?: string;
}

export interface WriteFeedbackRecordOptions {
	cwd: string;
	piVersion: string;
	summary?: string;
	now?: Date;
	git?: FeedbackGitInfo;
	osLabel?: string;
}

export interface WriteFeedbackRecordResult {
	id: string;
	filePath: string;
	content: string;
}

type FeedbackRecord = {
	id: string;
	source: {
		product: "Pi";
		repo: string;
		cwd: string;
		branch: string;
		commit: string;
		pi_version: string;
		os: string;
		anonymized: true;
	};
	task: {
		user_goal: string;
		agent_goal: string;
		command_or_workflow: string;
		expected_outcome: string;
		observed_outcome: string;
	};
	friction: {
		category: string;
		severity: string;
		reproducible: string;
		minimal_repro: string;
		evidence: {
			logs: string[];
			files_touched: string[];
			screenshots: string[];
		};
	};
	agent_analysis: {
		proposed_route: string;
		suggested_next_step: string;
		confidence: string;
	};
	status: {
		triage: "captured";
		created_at: string;
	};
};

const DEFAULT_REPO = "badlogic/pi-mono";

function formatFeedbackTimestamp(now: Date): string {
	const pad = (value: number) => value.toString().padStart(2, "0");
	return [
		now.getUTCFullYear(),
		pad(now.getUTCMonth() + 1),
		pad(now.getUTCDate()),
		"-",
		pad(now.getUTCHours()),
		pad(now.getUTCMinutes()),
		pad(now.getUTCSeconds()),
	].join("");
}

function readGitValue(cwd: string, args: string[]): string | undefined {
	const result = spawnSync("git", args, {
		cwd,
		encoding: "utf-8",
		stdio: ["ignore", "pipe", "ignore"],
	});
	if (result.status !== 0) return undefined;
	const value = result.stdout.trim();
	return value || undefined;
}

function normalizeRepoUrl(remoteUrl: string | undefined): string | undefined {
	if (!remoteUrl) return undefined;
	const githubMatch = remoteUrl.match(/github\.com[:/](.+?)(?:\.git)?$/);
	if (githubMatch?.[1]) return githubMatch[1];
	return remoteUrl.replace(/^git\+/, "").replace(/\.git$/, "");
}

function collectGitInfo(cwd: string): FeedbackGitInfo {
	const branch = readGitValue(cwd, ["rev-parse", "--abbrev-ref", "HEAD"]);
	const commit = readGitValue(cwd, ["rev-parse", "--short", "HEAD"]);
	const remoteUrl = readGitValue(cwd, ["config", "--get", "remote.origin.url"]);
	return {
		branch: branch === "HEAD" ? undefined : branch,
		commit,
		repo: normalizeRepoUrl(remoteUrl),
	};
}

function createFeedbackRecord(
	options: Required<Pick<WriteFeedbackRecordOptions, "cwd" | "piVersion">> & {
		git: FeedbackGitInfo;
		id: string;
		now: Date;
		osLabel: string;
		summary?: string;
	},
): FeedbackRecord {
	const summary = options.summary?.trim();
	const userGoal = summary || "TODO: describe the user goal at the moment of friction";
	const observedOutcome = summary || "TODO: describe what happened instead";
	const workflow = summary ? `/feedback ${summary}` : "/feedback";

	return {
		id: options.id,
		source: {
			product: "Pi",
			repo: options.git.repo || DEFAULT_REPO,
			cwd: options.cwd,
			branch: options.git.branch || "unknown",
			commit: options.git.commit || "unknown",
			pi_version: options.piVersion,
			os: options.osLabel,
			anonymized: true,
		},
		task: {
			user_goal: userGoal,
			agent_goal: "Capture this feedback as a durable local artifact for later triage.",
			command_or_workflow: workflow,
			expected_outcome: "TODO: describe the expected outcome",
			observed_outcome: observedOutcome,
		},
		friction: {
			category: "unknown",
			severity: "unknown",
			reproducible: "unknown",
			minimal_repro: summary || "TODO: add minimal reproduction steps",
			evidence: {
				logs: [],
				files_touched: [],
				screenshots: [],
			},
		},
		agent_analysis: {
			proposed_route: "unknown",
			suggested_next_step: "Complete the TODO fields, then route through evidence -> evaluation -> decision.",
			confidence: "low",
		},
		status: {
			triage: "captured",
			created_at: options.now.toISOString(),
		},
	};
}

export function writeFeedbackRecord(options: WriteFeedbackRecordOptions): WriteFeedbackRecordResult {
	const now = options.now ?? new Date();
	const id = `pi-feedback-${formatFeedbackTimestamp(now)}`;
	const git = options.git ?? collectGitInfo(options.cwd);
	const osLabel = options.osLabel ?? `${os.type()} ${os.release()} ${os.arch()}`;
	const record = createFeedbackRecord({
		cwd: options.cwd,
		git,
		id,
		now,
		osLabel,
		piVersion: options.piVersion,
		summary: options.summary,
	});
	const content = stringify(record, { lineWidth: 0 });
	const feedbackDir = path.join(options.cwd, ".pi", "feedback");
	const filePath = path.join(feedbackDir, `${id}.yaml`);

	mkdirSync(feedbackDir, { recursive: true });
	writeFileSync(filePath, content, { encoding: "utf-8", flag: "wx" });

	return { id, filePath, content };
}
