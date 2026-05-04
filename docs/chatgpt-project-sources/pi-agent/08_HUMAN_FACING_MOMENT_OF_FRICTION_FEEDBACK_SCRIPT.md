# Human-Facing Moment-of-Friction Feedback Script

Use this copy when a person is blocked, confused, disappointed by an output, or
leaving signup/onboarding without reaching first value.

## Short In-Product Prompt

```text
What were you trying to do?
```

Follow-up fields:

```text
What happened?
What did you expect instead?
How serious is this for you right now?
What would make this feel solved?
Can we follow up with you?
```

## Failed Signup Or Activation Prompt

```text
What stopped you from getting value today?
```

Supporting copy:

```text
We are trying to make this easier. If your answer helps us understand a real
blocker, we may offer credits, a gift token, or a larger reward if it leads to a
product change.
```

## Acknowledgement Template

```text
Received: <feedback_id>

We understand that you were trying to <user_goal>, but <observed_blocker>.

Initial triage: <T0/T1/T2/T3/T4>
Next action: <what we will do next>
Report-back: <time or status event>
Reward status: <unreviewed/pending/awarded/candidate>
```

## Report-Back Template

```text
Update on <feedback_id>

Decision: <accepted/needs clarification/duplicate/declined/implemented>

What we understood:
<one sentence restatement>

What we are doing:
<action, workaround, spec, issue, or explanation>

What happens next:
<next status time, shipped outcome, or what evidence would change the decision>

Reward status:
<points/token/feature reward candidate/no reward with reason>
```
