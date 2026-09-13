import { NextRequest, NextResponse } from 'next/server';
import { leadSubmissionSchema, parseFullName } from '@/lib/validations';
import { db } from '@/lib/db';
import { sendLeadToGoHighLevel } from '@/lib/ghl';
import { sendBrevoLeadNotification } from '@/lib/brevo';
import { checkRateLimit } from '@/lib/rate-limit';

// Strict security: Reject any GET/PUT/DELETE requests to prevent data leakage
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 1. IP Rate Limiting Check (15 submissions / 15 mins per IP)
    const rateCheck = checkRateLimit(ip, 15, 15 * 60 * 1000);
    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few moments before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const validationResult = leadSubmissionSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid lead data.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = validationResult.data;
    const { firstName, lastName } = parseFullName(data.fullName);
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const leadCode = `HH-FL-${randomSuffix}`;
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // 3. Save to Database (Prisma / PostgreSQL on Railway)
    try {
      await db.lead.create({
        data: {
          leadCode,
          zipCode: data.zipCode,
          city: data.city,
          state: data.state || 'FL',
          serviceType: data.serviceType,
          roofAge: data.roofAge || 'Not sure',
          fullName: data.fullName,
          firstName,
          lastName,
          streetAddress: data.streetAddress,
          isHomeowner: data.isHomeowner,
          phone: data.phone,
          email: data.email,
          tcpaConsent: data.tcpaConsent,
          ipAddress: ip,
          userAgent,
          status: 'PENDING',
        },
      });
    } catch (dbError) {
      console.error('[Database Storage Warning]', dbError);
    }

    // 4. Asynchronous GoHighLevel (GHL) Webhook & v2 Contacts Upsert Dispatch
    const ghlPayload = {
      leadCode,
      firstName,
      lastName,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address1: data.streetAddress,
      city: data.city,
      state: data.state || 'FL',
      postalCode: data.zipCode,
      country: 'US',
      tags: [
        'Hammer House',
        'Florida Lead',
        `Service: ${data.serviceType}`,
        `Roof Age: ${data.roofAge || 'Not sure'}`,
        `City: ${data.city}`,
        'Appointment Request',
      ],
      customFields: {
        service_type: data.serviceType,
        roof_age: data.roofAge || 'Not sure',
        homeowner_confirmed: data.isHomeowner,
        tcpa_consent_granted: data.tcpaConsent,
        lead_source: 'Hammer House Florida Web Funnel',
        submitted_at: new Date().toISOString(),
        ip_address: ip,
        user_agent: userAgent,
        // Meta Click Attribution IDs
        fbclid: data.fbclid,
        fbc: data.fbc,
        fbp: data.fbp,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
        utm_term: data.utm_term,
      },
    };

    // 5. Asynchronous Brevo Email Notification
    const brevoPayload = {
      leadCode,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state || 'FL',
      zipCode: data.zipCode,
      serviceType: data.serviceType,
      roofAge: data.roofAge,
      isHomeowner: data.isHomeowner,
      tcpaConsent: data.tcpaConsent,
      ipAddress: ip,
      submittedAt: `${submittedAt} EST`,
    };

    // Execute background dispatches in parallel
    Promise.allSettled([
      sendLeadToGoHighLevel(ghlPayload),
      sendBrevoLeadNotification(brevoPayload),
    ]).catch((err) => {
      console.error('[Background Routing Error]', err);
    });

    // 6. Secure Sanitized Output (only return reference code, zero internal secrets)
    return NextResponse.json({
      success: true,
      leadCode,
      message: 'Appointment request confirmed successfully.',
    });
  } catch (error: any) {
    console.error('[API Leads Critical Error]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
