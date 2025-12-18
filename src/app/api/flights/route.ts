import { NextResponse } from 'next/server';
import localFlights from '@/lib/data/flights.json';

export async function GET() {
  const apiUrl = `${process.env.NEXT_PUBLIC_FLIGHT_API_URL}/interview/questions.json`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(120000),
      next: { revalidate: 3600 },
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok || !contentType?.includes('application/json')) {
      throw new Error(`API returned status ${response.status} or invalid content type`);
    }

    const data = await response.json();
    return NextResponse.json({
      data,
      source: 'api',
      message: 'Successfully fetched from external API',
    });

  } catch (error) {
    return NextResponse.json({
      data: localFlights,
      source: 'local_fallback',
       message: `Using local flight data due to API failure ${error}`,
    });
  }
}
