import { NextResponse } from 'next/server';

const NEXT_PUBLIC_JAVA_BACKEND_URL = process.env.NEXT_PUBLIC_JAVA_BACKEND_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const preferenceId = searchParams.get('preferenceId');

    if (!preferenceId) {
      return NextResponse.json(
        { error: 'preferenceId es requerido' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${NEXT_PUBLIC_JAVA_BACKEND_URL}/api/mercadopago/preference/${preferenceId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Error obteniendo preference: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error del servidor: ' + error.message },
      { status: 500 }
    );
  }
}