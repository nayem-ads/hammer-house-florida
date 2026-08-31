import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') || '').trim();
  const city = searchParams.get('city') || 'Miami';
  const zip = searchParams.get('zip') || '33101';

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  // Pre-configured realistic Florida street names
  const sampleStreets = [
    'Ocean Dr',
    'Biscayne Blvd',
    'Palmetto Expressway',
    'Magnolia Ave',
    'Cypress Point',
    'Palm Beach Lakes Blvd',
    'Orange Ave',
    'Sunshine Blvd',
    'Gulf to Bay Blvd',
    'Federal Hwy',
    'Atlantic Ave',
    'Commercial Blvd',
    'Las Olas Blvd',
  ];

  const filtered = sampleStreets.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const suggestions = (filtered.length > 0 ? filtered : sampleStreets.slice(0, 4)).map(
    (street, i) => `${(i + 1) * 1024} ${street}, ${city}, FL ${zip}`
  );

  return NextResponse.json({
    suggestions,
  });
}
