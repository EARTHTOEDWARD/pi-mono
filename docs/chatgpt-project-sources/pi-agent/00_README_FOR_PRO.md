# Pro Handoff: SACP / Fractal Lab Feedback OS

## Purpose

This folder is a flat handoff bundle for Pro.

It collects the key SACP / Fractal Lab documents needed to review the Feedback
OS, moment-of-friction capture process, loop controller, relevance evaluation
agent, Pi case study, and first loop-closure specimens.

The canonical source files remain in their original repo locations. These files
are copied here only so the folder can be selected, uploaded, or attached
without navigating the whole repo.

## Recommended Reading Order

1. `01_GTM_NORTH_STAR.md`
2. `02_FEEDBACK_OS.md`
3. `03_CUSTOMER_PROBLEM_TRIAGE_PROCESS.md`
4. `04_MOMENT_OF_FRICTION_FEEDBACK_INTERFACE.md`
5. `05_EARENDIL_PI_PRE_PR_FEEDBACK_CASE_STUDY.md`
6. `06_TRIAGE_AGENT_CUSTOMER_PROBLEM_PROMPT.md`
7. `07_AGENT_FACING_MOMENT_OF_FRICTION_FEEDBACK_PROMPT.md`
8. `08_HUMAN_FACING_MOMENT_OF_FRICTION_FEEDBACK_SCRIPT.md`
9. `09_TRIAGE_DASHBOARD_MOCK_DATA.md`
10. `10_FAILURE_FRICTION_REGISTER.md`
11. `11_SPECIMEN_COMPARISON_001_003.md`
12. `12_SPECIMEN_001_EARENDIL_PI_CONFIG_PATH_LABEL.md`
13. `13_SPECIMEN_002_EARENDIL_PI_MARKDOWN_RENDER_CRASH.md`
14. `14_SPECIMEN_003_EARENDIL_PI_VIDEO_AUDIO_PROMPT_SUPPORT.md`
15. `15_ROADMAP.md`
16. `16_DECISIONS.md`
17. `17_FEEDBACK_LOOP_CONTROLLER.md`
18. `18_FEEDBACK_RELEVANCE_EVALUATION_AGENT.md`
19. `19_FEEDBACK_LOOP_CONTROLLER_AGENT_PROMPT.md`
20. `20_FEEDBACK_RELEVANCE_EVALUATION_AGENT_PROMPT.md`
21. `21_PI_LOOP_CLOSURE_WITNESS_001_003.md`
22. `22_GTM_SELF_IMPROVING_LOOP.md`

## What We Want Pro To Assess

We are designing a Feedback OS for SACP / Fractal Lab. The core thesis is that
human and agent friction should be captured at the moment it occurs, converted
into durable feedback records, triaged with urgency and evidence, and then
converted into specs, tests, implementation, report-back, and learning.

Recent work has added:

- human-facing and agent-facing moment-of-friction feedback interfaces
- a customer-problem triage process with T0-T4 severity levels
- route subtypes and severity clocks
- an Earendil Pi / OpenClaw pre-PR feedback case study
- three public legacy Pi feedback specimens
- a mock triage dashboard view
- a loop controller frame: feedback, evidence, evaluation, decision, work,
  verification, report-back, learning
- a relevance evaluation agent to prevent irrelevant, performative,
  reward-gaming, or strategically harmful feedback from steering the product
- a loop-closure witness that runs the three Pi specimens through the new loop

The current design correction is that the system is not a triage desk. It is a
closed-loop learning transport from customer/agent friction into verified
product improvement. Triage remains useful, but only as a decision transform
inside the loop.

## Questions For Pro

1. Does the new loop frame correctly demote triage and make loop closure the
   center of gravity?
2. Is the six-artifact set minimal enough for the first 10-20 specimens:
   feedback record, evidence bundle, evaluation, decision packet, work artifact,
   outcome/learning?
3. Does the relevance evaluation agent catch the right distortion risks:
   irrelevant, performative, silly, reward-gaming, unsafe, duplicate without
   delta, and strategically harmful feedback?
4. What additional evaluation criterion would stop bad feedback from taking the
   product in the wrong direction without suppressing uncomfortable but useful
   feedback?
5. In the Pi loop-closure witness, are the three next unclosed edges right:
   `001` needs evidence, `002` needs acceptance test, `003` needs human
   strategic decision?
6. Should relevance evaluation happen before evidence enrichment, after evidence
   enrichment, or both?
7. What is the first real-world specimen type we should add to test irrelevant
   or performative feedback rejection?
8. What should the loop-control panel show first: next unclosed edge, overdue
   report-back, relevance risk, or verification gap?

## Source Map

| Handoff File | Canonical Source |
| --- | --- |
| `01_GTM_NORTH_STAR.md` | `docs/gtm-north-star.md` |
| `02_FEEDBACK_OS.md` | `docs/feedback-os.md` |
| `03_CUSTOMER_PROBLEM_TRIAGE_PROCESS.md` | `docs/customer-problem-triage-process.md` |
| `04_MOMENT_OF_FRICTION_FEEDBACK_INTERFACE.md` | `docs/moment-of-friction-feedback-interface.md` |
| `05_EARENDIL_PI_PRE_PR_FEEDBACK_CASE_STUDY.md` | `docs/case-study-earendil-pi-pre-pr-feedback.md` |
| `06_TRIAGE_AGENT_CUSTOMER_PROBLEM_PROMPT.md` | `prompts/triage-agent-customer-problem.md` |
| `07_AGENT_FACING_MOMENT_OF_FRICTION_FEEDBACK_PROMPT.md` | `prompts/agent-facing-moment-of-friction-feedback.md` |
| `08_HUMAN_FACING_MOMENT_OF_FRICTION_FEEDBACK_SCRIPT.md` | `prompts/human-facing-moment-of-friction-feedback.md` |
| `09_TRIAGE_DASHBOARD_MOCK_DATA.md` | `experiments/manual-gtm-loop-001/triage-dashboard-mock-data.md` |
| `10_FAILURE_FRICTION_REGISTER.md` | `experiments/manual-gtm-loop-001/failure-friction-register.md` |
| `11_SPECIMEN_COMPARISON_001_003.md` | `feedback-specimens/specimen-comparison-001-003.md` |
| `12_SPECIMEN_001_EARENDIL_PI_CONFIG_PATH_LABEL.md` | `feedback-specimens/specimen-001-earendil-pi-config-path-label.md` |
| `13_SPECIMEN_002_EARENDIL_PI_MARKDOWN_RENDER_CRASH.md` | `feedback-specimens/specimen-002-earendil-pi-markdown-render-crash.md` |
| `14_SPECIMEN_003_EARENDIL_PI_VIDEO_AUDIO_PROMPT_SUPPORT.md` | `feedback-specimens/specimen-003-earendil-pi-video-audio-prompt-support.md` |
| `15_ROADMAP.md` | `docs/roadmap.md` |
| `16_DECISIONS.md` | `docs/decisions.md` |
| `17_FEEDBACK_LOOP_CONTROLLER.md` | `docs/feedback-loop-controller.md` |
| `18_FEEDBACK_RELEVANCE_EVALUATION_AGENT.md` | `docs/feedback-relevance-evaluation-agent.md` |
| `19_FEEDBACK_LOOP_CONTROLLER_AGENT_PROMPT.md` | `prompts/feedback-loop-controller-agent.md` |
| `20_FEEDBACK_RELEVANCE_EVALUATION_AGENT_PROMPT.md` | `prompts/feedback-relevance-evaluation-agent.md` |
| `21_PI_LOOP_CLOSURE_WITNESS_001_003.md` | `experiments/manual-gtm-loop-001/pi-loop-closure-witness-001-003.md` |
| `22_GTM_SELF_IMPROVING_LOOP.md` | `docs/gtm-self-improving-loop.md` |
