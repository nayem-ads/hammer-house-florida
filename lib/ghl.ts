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
 * Dispatch lead data to GoHighLevel via Private Integration API Token OR Inbound Webhook
 */
export async function sendLeadToGoHighLevel(payload: GHLPayload): Promise<{ success: boolean; message: string }> {
  const pitKey = process.env.GHL_PRIVATE_INTEGRATION_KEY || process.env.GHL_API_KEY || 'pit-24cfb3ea-b549-416e-aeb6-1d53e21b6b2e';
  const locationId = process.env.GHL_LOCATION_ID;
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  const results: string[] = [];

  // Method 1: GHL v2 Contacts API via Private Integration Token (PIT)
  if (pitKey && pitKey.trim() !== '') {
    try {
      const contactPayload: Record<string, any> = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        address1: payload.address1,
        city: payload.city,
        state: payload.state || 'FL',
        postalCode: payload.postalCode,
        country: payload.country || 'US',
        tags: payload.tags,
        source: 'Hammer House Florida Funnel',
      };

      if (locationId && locationId.trim() !== '') {
        contactPayload.locationId = locationId.trim();
      }

      const apiRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
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
        console.log('[GHL API Success] Contact created in GoHighLevel:', payload.leadCode, resText);
        results.push('GHL API: Created successfully');
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
