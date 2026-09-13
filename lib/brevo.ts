export interface BrevoLeadNotificationData {
  leadCode: string;
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  serviceType: string;
  roofAge?: string;
  isHomeowner: boolean;
  tcpaConsent: boolean;
  ipAddress?: string;
  submittedAt: string;
}

/**
 * Send real-time email notification via Brevo (Sendinblue) API
 */
export async function sendBrevoLeadNotification(
  data: BrevoLeadNotificationData
): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.BREVO_TO_EMAIL;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'alerts@hammerhouse.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'Hammer House Alerts';

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_brevo_api_key')) {
    console.log('[Brevo Email] BREVO_API_KEY is not set. Skipping email alert. Lead code:', data.leadCode);
    return { success: true, message: 'Brevo API key not set (logged locally)' };
  }

  if (!recipientEmail || recipientEmail.trim() === '') {
    console.log('[Brevo Email] NOTIFICATION_EMAIL is not set. Skipping email alert.');
    return { success: true, message: 'Notification recipient email not configured' };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Florida Roofing Lead</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #0F172A;">
        <table align="center" width="100%" max-width="600px" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin: auto;">
          <!-- Header -->
          <tr>
            <td style="background-color: #8B1122; padding: 24px 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">🔨 HAMMER HOUSE</h1>
              <p style="color: #FECDD3; margin: 4px 0 0 0; font-size: 13px; font-weight: 600;">NEW FLORIDA ROOFING LEAD RECEIVED</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #166534;">
                  ✅ Ref Code: <span style="font-size: 16px; color: #15803D;">${data.leadCode}</span>
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #166534;">
                  Submitted: ${data.submittedAt}
                </p>
              </div>

              <h2 style="font-size: 16px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">
                Customer Contact Details
              </h2>

              <table width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B; width: 35%;">Full Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 15px; font-weight: 800; color: #0F172A;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">Phone Number:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 15px; font-weight: 800; color: #8B1122;"><a href="tel:${data.phone.replace(/\D/g, '')}" style="color: #8B1122; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">Email Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; font-weight: 700; color: #0F172A;"><a href="mailto:${data.email}" style="color: #0284C7; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">Property Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; font-weight: 700; color: #0F172A;">${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">Homeowner:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; font-weight: 700; color: #0F172A;">${data.isHomeowner ? 'Yes (Confirmed)' : 'No'}</td>
                </tr>
              </table>

              <h2 style="font-size: 16px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">
                Project Specifications
              </h2>

              <table width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B; width: 35%;">Service Requested:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; font-weight: 800; color: #8B1122;">${data.serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">Roof Age:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; font-weight: 700; color: #0F172A;">${data.roofAge || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 600; color: #64748B;">TCPA Consent:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; font-weight: 700; color: #15803D;">Granted (Florida Mini-TCPA Compliant)</td>
                </tr>
              </table>

              <!-- Quick Action Call Button -->
              <div style="text-align: center; margin-top: 28px;">
                <a href="tel:${data.phone.replace(/\D/g, '')}" style="display: inline-block; background-color: #8B1122; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 800; font-size: 15px; letter-spacing: 0.5px;">
                  📞 CALL CUSTOMER NOW
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 16px 32px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
              Hammer House Lead Routing Engine • Dispatched automatically via Brevo & GoHighLevel
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey.trim(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: recipientEmail.trim(),
            name: 'Hammer House Team',
          },
        ],
        subject: `🚨 New FL Roofing Lead: ${data.fullName} (${data.city}, FL - ${data.serviceType})`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[Brevo Email Error]', res.status, errorText);
      return { success: false, message: `Brevo returned ${res.status}: ${errorText}` };
    }

    const resJson = await res.json().catch(() => ({}));
    console.log('[Brevo Email Success] Alert sent for lead:', data.leadCode, resJson);
    return { success: true, message: 'Brevo email sent successfully' };
  } catch (err: any) {
    console.error('[Brevo Email Exception]', err);
    return { success: false, message: err?.message || 'Network exception calling Brevo API' };
  }
}
