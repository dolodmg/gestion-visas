import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { paymentId } = params;
  
  if (!paymentId || paymentId === 'unknown') {
    return NextResponse.json(
      { error: 'ID de pago no válido' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.JAVA_BACKEND_URL}/api/mercadopago/verify?paymentId=${paymentId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000), // 30 segundos timeout
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Error verificando pago' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error verificando pago:', error);
    return NextResponse.json(
      { error: error.message || 'Error verificando pago' },
      { status: 500 }
    );
  }
}