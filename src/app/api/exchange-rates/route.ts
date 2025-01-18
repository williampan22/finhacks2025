// Call the exchangeRates API when we dont have the latest exchange rate information of the day
import { NextResponse } from 'next/server';
import { getExchangeRates } from '@/utils/exchangeRates';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const baseCurrency = url.searchParams.get('base') || 'USD'; // Default to USD

  try {
    const rates = await getExchangeRates(baseCurrency);
    return NextResponse.json(rates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch exchange rates' }, { status: 500 });
  }
}
