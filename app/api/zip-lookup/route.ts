import { NextRequest, NextResponse } from 'next/server';
import { isFloridaZip, lookupFloridaZip } from '@/lib/florida-zips';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get('zip') || '';

  if (!isFloridaZip(zip)) {
    return NextResponse.json(
      { error: 'Invalid or non-Florida zip code' },
      { status: 400 }
    );
  }

  const location = lookupFloridaZip(zip);
  if (!location) {
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    location,
  });
}
