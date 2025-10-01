// app/api/mercadopago/get-preference-url/route.js
import { NextResponse } from 'next/server';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || 'http://localhost:8080';

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

    console.log('📤 Obteniendo URL para preference:', preferenceId);

    // Consultar al backend por la URL de la preference
    const response = await fetch(
      `${JAVA_BACKEND_URL}/api/mercadopago/preference/${preferenceId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error del backend:', errorText);
      return NextResponse.json(
        { error: `Error obteniendo preference: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ URL obtenida:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en get-preference-url:', error);
    return NextResponse.json(
      { error: 'Error del servidor: ' + error.message },
      { status: 500 }
    );
  }
}