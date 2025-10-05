import { NextResponse } from 'next/server';

const NEXT_PUBLIC_JAVA_BACKEND_URL = process.env.NEXT_PUBLIC_JAVA_BACKEND_URL;

export async function POST(request) {
  try {
    const body = await request.text();
    const headers = {};
    
    // Pasar headers importantes
    request.headers.forEach((value, key) => {
      if (key.startsWith('x-')) {
        headers[key] = value;
      }
    });

    const response = await fetch(`${NEXT_PUBLIC_JAVA_BACKEND_URL}/api/mercadopago/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error in webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}