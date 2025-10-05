// app/api/mercadopago/create-preference/route.js
import { NextResponse } from 'next/server';

const NEXT_PUBLIC_JAVA_BACKEND_URL = process.env.NEXT_PUBLIC_JAVA_BACKEND_URL;

export async function POST(request) {
  console.log('API route called');
  try {
    const body = await request.json();
    console.log('Body received:', body);
    console.log('Backend URL:', NEXT_PUBLIC_JAVA_BACKEND_URL);
    
    const response = await fetch(`${NEXT_PUBLIC_JAVA_BACKEND_URL}/api/mercadopago/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Backend error response:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Success data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}

// Agregar este handler para debug
export async function GET() {
  return NextResponse.json({ message: 'This endpoint only accepts POST requests' }, { status: 405 });
}