import { NextRequest, NextResponse } from 'next/server';
import { createPaymentToken } from '@/lib/token';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { service, travelers, totalAmount, bookingDetails } = body;
    
    if (!service || !travelers || !totalAmount || !bookingDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate service type
    const validServices = ['flight-reservation', 'hotel-booking', 'travel-insurance'];
    if (!validServices.includes(service)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      );
    }
    
    // Create secure token with booking data
    const tokenData = {
      service,
      travelers,
      totalAmount,
      bookingDetails,
      createdAt: new Date().toISOString(),
      sessionId: crypto.randomUUID() // Additional security layer
    };
    
    const token = createPaymentToken(tokenData);
    
    return NextResponse.json({ 
      success: true, 
      token,
      redirectUrl: `/payment?token=${token}`
    });
    
  } catch (error) {
    console.error('Error creating payment token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}