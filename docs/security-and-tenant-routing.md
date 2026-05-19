# Security and tenant routing

## Rule 1: tenant data belongs to the tenant

If a developer uses the API for their own customer, their messages and notifications must route to their configured recipients, not to the Weristo owner.

## Rule 2: bring your own AI key

Third-party API users should connect their own AI provider credentials. This prevents uncontrolled platform-owner AI cost and keeps billing clear.

## Rule 3: role-aware notifications

Every event should include or resolve to a recipient role:

- `owner`
- `sales`
- `support`
- `developer`
- `billing`

The routing layer decides who receives what.

## Rule 4: language preferences are part of routing

A Spanish message can be summarized in German, Hungarian, English, or any configured recipient language.

Example:

```json
{
  "tenant_id": "tenant_lambda_system",
  "event_type": "message.inbound",
  "channel": "whatsapp",
  "source_language": "es",
  "routing": {
    "notify_role": "owner",
    "preferred_language": "de"
  }
}
```

## Rule 5: never leak platform-owner context

Do not send internal platform notes, private memory, prompts, API keys, logs, or unrelated tenant data to API users.

## Recommended audit metadata

Store metadata, not unnecessary content:

- event id
- tenant id
- event type
- channel
- source language
- target language
- recipient role
- policy decision
- AI provider name
- processing status
