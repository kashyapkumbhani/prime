import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentToken } from '@/lib/token';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }
    
    const validation = validatePaymentToken(token);
    
    if (!validation.valid) {
      return NextResponse.json(
        { 
          valid: false, 
          error: validation.error 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      valid: true,
      data: validation.data
    });
    
  } catch (error) {
    console.error('Error validating payment token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}