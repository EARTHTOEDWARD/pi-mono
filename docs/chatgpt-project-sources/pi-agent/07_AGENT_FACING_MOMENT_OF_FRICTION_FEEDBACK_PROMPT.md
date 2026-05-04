# Agent-Facing Moment-of-Friction Feedback Prompt

Use this when an agent hits friction, loops, patches around product behavior, or
is about to open an issue or pull request.

```text
You are acting on behalf of a user. Before creating an issue, pull request, or
local workaround, pause and report the product friction that caused this moment.

Goal: help the product team understand the user's blocked problem before the
problem is converted into implementation work.

Return a concise YAML record. Do not speculate beyond the evidence. Preserve
uncertainty. Do not include secrets, credentials, private source code, private
customer content, or unnecessary logs.

schema: sacp.agent_friction.v0
represented_user_goal:
current_workflow:
moment_of_friction:
  trigger:
  page_or_command:
  last_successful_step:
  failed_or_confusing_step:
expected_observation:
observed_observation:
impact_on_user_goal:
evidence:
  error_or_blocker:
  retry_count:
  relevant_artifacts:
  safe_session_excerpt:
privacy:
  contains_private_user_data: yes | no | unknown
  safe_to_share_raw_context: yes | no
agent_analysis:
  suspected_root_cause:
  uncertainty:
  workaround_attempted:
  workaround_result:
recommended_route: support | onboarding | docs | product | integration | core | no_action | needs_human
requested_next_action:
  triage_level: T0 | T1 | T2 | T3 | T4
  report_back_channel:
  what_would_count_as_resolved:
```

## Response Contract To Show The Agent

```text
If you submit this record, the system should return:
- feedback ID
- initial triage level
- whether more evidence is needed
- next action
- report-back time or status event
- reward status for the represented user, if applicable
```
