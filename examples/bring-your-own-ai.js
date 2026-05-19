// Bring Your Own AI provider example
// This file intentionally uses placeholder environment variables only.

export async function summarizeWithTenantAI({ tenant, event }) {
  if (!tenant.ai?.apiKey) {
    throw new Error('Tenant AI key is required. Do not use the platform owner key for tenant traffic.');
  }

  const preferredLanguage = event.routing?.preferred_language || tenant.defaultLanguage || 'en';
  const text = event.payload?.text || '';

  // Replace this with the tenant's chosen AI SDK/provider.
  // Keep provider credentials tenant-scoped.
  const prompt = [
    `Summarize the following customer message in ${preferredLanguage}.`,
    'Keep it short, practical, and business-focused.',
    'Do not expose sensitive internal information.',
    '',
    text
  ].join('\n');

  return {
    provider: tenant.ai.provider,
    language: preferredLanguage,
    summary: `[demo summary in ${preferredLanguage}] ${text.slice(0, 120)}`,
    prompt_shape: prompt
  };
}
