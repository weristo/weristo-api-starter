// Minimal tenant-aware webhook router example.
// This is a public blueprint, not the Weristo production backend.

import { summarizeWithTenantAI } from './bring-your-own-ai.js';

const tenants = new Map([
  ['tenant_lambda_system', {
    id: 'tenant_lambda_system',
    defaultLanguage: 'de',
    ai: {
      provider: 'openai-compatible',
      apiKey: process.env.TENANT_LAMBDA_AI_KEY
    },
    recipients: {
      owner: { channel: 'telegram', language: 'de', target: 'tenant-owner-chat-id' },
      support: { channel: 'email', language: 'de', target: 'support@example.com' }
    }
  }]
]);

export async function routeBusinessEvent(event) {
  const tenant = tenants.get(event.tenant_id);
  if (!tenant) throw new Error('Unknown tenant');

  const role = event.routing?.notify_role || 'owner';
  const recipient = tenant.recipients[role];
  if (!recipient) throw new Error('No recipient configured for role');

  if (event.routing?.sensitivity === 'confidential' && role !== 'owner') {
    throw new Error('Policy blocked confidential event for non-owner recipient');
  }

  const aiResult = await summarizeWithTenantAI({
    tenant,
    event: {
      ...event,
      routing: {
        ...event.routing,
        preferred_language: event.routing?.preferred_language || recipient.language
      }
    }
  });

  return {
    status: 'ready_to_notify',
    tenant_id: tenant.id,
    recipient,
    message: aiResult.summary
  };
}
