import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8080';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locales = searchParams.get('locales') || 'en';
  
  try {
    const response = await fetch(`${GATEWAY_URL}/api/i18n/ui?locales=${locales}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch i18n' }, { status: 500 });
  }
}
