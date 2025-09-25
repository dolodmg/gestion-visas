import { NextResponse } from 'next/server';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${JAVA_BACKEND_URL}/api/mercadopago/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in process-payment:', error);
    return NextResponse.json(
      { error: 'Error procesando pago' },
      { status: 500 }
    );
  }
}