export interface GHLPayload {
  leadCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  tags: string[];
  customFields: {
    service_type: string;
    roof_age?: string;
    homeowner_confirmed: boolean;
    tcpa_consent_granted: boolean;
    lead_source: string;
    submitted_at: string;
    ip_address?: string;
    user_agent?: string;
  };
}

/**
 * Convert US phone string to E.164 (+1XXXXXXXXXX) format for GoHighLevel
 */
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return phone;
}

/**
 * Dispatch lead data to GoHighLevel via Private Integration API Token (Upsert) OR Inbound Webhook
 */
export async function sendLeadToGoHighLevel(payload: GHLPayload): Promise<{ success: boolean; message: string }> {
  const pitKey = process.env.GHL_PRIVATE_INTEGRATION_KEY || process.env.GHL_API_KEY || 'pit-24cfb3ea-b549-416e-aeb6-1d53e21b6b2e';
  const locationId = process.env.GHL_LOCATION_ID || 'VvGYFY9VH9rUvCfQKTzR';
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  const results: string[] = [];

  // Method 1: GHL v2 Contacts Upsert API via Private Integration Token (PIT)
  if (pitKey && pitKey.trim() !== '') {
    try {
      const e164Phone = toE164(payload.phone);
      const contactPayload: Record<string, any> = {
        locationId: locationId.trim(),
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: payload.fullName,
        email: payload.email,
        phone: e164Phone,
        address1: payload.address1,
        city: payload.city,
        state: payload.state || 'FL',
        postalCode: payload.postalCode,
        country: payload.country || 'US',
        tags: [
          'Hammer House',
          'Florida Lead',
          `Service: ${payload.customFields.service_type}`,
          `Roof Age: ${payload.customFields.roof_age || 'Not specified'}`,
          `Ref: ${payload.leadCode}`,
        ],
        source: 'Hammer House Florida Web Funnel',
      };

      const apiRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pitKey.trim()}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(contactPayload),
      });

      const resText = await apiRes.text();

      if (apiRes.ok) {
        console.log('[GHL API Success] Contact upserted in GoHighLevel:', payload.leadCode, resText);
        results.push('GHL API: Upserted successfully');
      } else {
        console.warn('[GHL API Notice]', apiRes.status, resText);
        results.push(`GHL API status ${apiRes.status}: ${resText}`);
      }
    } catch (apiErr: any) {
      console.error('[GHL API Exception]', apiErr);
      results.push(`GHL API Exception: ${apiErr?.message}`);
    }
  }

  // Method 2: GHL Inbound Webhook (if configured)
  if (webhookUrl && webhookUrl.trim() !== '' && !webhookUrl.includes('your_inbound_webhook_id')) {
    try {
      const webhookRes = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'HammerHouse-Webhook/1.0',
        },
        body: JSON.stringify(payload),
      });

      const hookText = await webhookRes.text();
      if (webhookRes.ok) {
        console.log('[GHL Webhook Success] Lead dispatched via webhook:', payload.leadCode);
        results.push('GHL Webhook: Dispatched successfully');
      } else {
        console.error('[GHL Webhook Error]', webhookRes.status, hookText);
        results.push(`GHL Webhook Error ${webhookRes.status}: ${hookText}`);
      }
    } catch (hookErr: any) {
      console.error('[GHL Webhook Exception]', hookErr);
      results.push(`GHL Webhook Exception: ${hookErr?.message}`);
    }
  }

  return {
    success: results.some((r) => r.includes('successfully')),
    message: results.join(' | ') || 'No GHL dispatch method triggered',
  };
}
