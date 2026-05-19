# Architecture

Weristo API Starter describes a safe integration pattern for AI-assisted business workflows.

## Principles

- Each API user owns their tenant configuration.
- Each tenant config controls recipients, languages, channels, and permissions.
- AI usage is bring-your-own-key by default.
- Events are processed according to role and sensitivity.
- No tenant's private messages should be routed to the platform owner by default.

## Event lifecycle

1. An event arrives from WhatsApp, Telegram, email, webchat, voice, CRM, or a website form.
2. The API validates the tenant and event type.
3. The router loads tenant preferences.
4. The policy layer checks whether the requested recipient can receive the content.
5. The developer-owned AI provider summarizes, translates, classifies, or creates a task.
6. The notification layer sends the result to the configured recipient.

## Recommended components

- `event_gateway`: validates incoming events.
- `tenant_config`: stores language, channel, and AI provider preferences.
- `policy_engine`: blocks unsafe or unauthorized routing.
- `ai_adapter`: calls the tenant-owned AI provider.
- `notification_router`: sends the final message to Telegram, WhatsApp, email, or CRM.
- `audit_log`: stores metadata and safe traces.

## Non-goals

This starter does not implement the private Weristo production backend. It is an integration blueprint, not a cloneable SaaS platform.
