import { NextResponse } from 'next/server';

const NEXT_PUBLIC_JAVA_BACKEND_URL = process.env.NEXT_PUBLIC_JAVA_BACKEND_URL;

export async function POST(request) {
  console.log('API route called');
  try {
    const body = await request.json();
    
    const response = await fetch(`${NEXT_PUBLIC_JAVA_BACKEND_URL}/api/mercadopago/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ message: 'This endpoint only accepts POST requests' }, { status: 405 });
}