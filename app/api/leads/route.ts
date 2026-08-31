import { NextRequest, NextResponse } from 'next/server';
import { leadSubmissionSchema, parseFullName } from '@/lib/validations';
import { db } from '@/lib/db';
import { sendLeadToGoHighLevel } from '@/lib/ghl';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 1. IP Rate Limiting Check
    const rateCheck = checkRateLimit(ip, 15, 15 * 60 * 1000);
    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few moments before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Body
    const body = await req.json();
    const validationResult = leadSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid lead data.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = validationResult.data;
    const { firstName, lastName } = parseFullName(data.fullName);
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const leadCode = `HH-FL-${randomSuffix}`;

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

    // 4. Asynchronous GoHighLevel (GHL) Webhook Dispatch
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
      },
    };

    // Dispatch webhook asynchronously
    sendLeadToGoHighLevel(ghlPayload).catch((err) => {
      console.error('[Async GHL Error]', err);
    });

    return NextResponse.json({
      success: true,
      leadCode,
      message: 'Appointment request confirmed successfully.',
    });
  } catch (error: any) {
    console.error('[API Leads Critical Error]', error);
    return NextResponse.json(
      { error: error?.message || 'Server encountered an unexpected error.' },
      { status: 500 }
    );
  }
}
