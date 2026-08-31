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
    homeowner_confirmed: boolean;
    tcpa_consent_granted: boolean;
    lead_source: string;
    submitted_at: string;
    ip_address?: string;
    user_agent?: string;
  };
}

/**
 * Dispatch lead data to GoHighLevel Inbound Webhook
 */
export async function sendLeadToGoHighLevel(payload: GHLPayload): Promise<{ success: boolean; message: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.trim() === '' || webhookUrl.includes('your_inbound_webhook_id')) {
    console.log('[GHL Dispatcher] GHL_WEBHOOK_URL is not set. Skipping webhook dispatch. Payload ready:', payload.leadCode);
    return { success: true, message: 'GHL webhook not configured (logged locally)' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'HammerHouse-Webhook/1.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL Dispatcher Error]', response.status, errorText);
      return { success: false, message: `GHL returned ${response.status}: ${errorText}` };
    }

    const responseData = await response.text();
    console.log('[GHL Dispatcher Success] Lead dispatched successfully:', payload.leadCode);
    return { success: true, message: responseData || 'Dispatched successfully' };
  } catch (error: any) {
    console.error('[GHL Dispatcher Exception]', error);
    return { success: false, message: error?.message || 'Network exception during GHL dispatch' };
  }
}
