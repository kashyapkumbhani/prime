import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    const {
      serviceType,
      customerName,
      customerEmail,
      customerPhone,
      numberOfTravelers,
      totalAmount,
      paymentMethod,
      status = 'PENDING'
    } = orderData;

    // Create or find customer
    let customer = await prisma.customer.findUnique({
      where: { email: customerEmail }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: customerEmail,
          phone: customerPhone
        }
      });
    }

    // Convert serviceType to enum format
    const serviceTypeEnum = serviceType.replace('-', '_').toUpperCase() as 'FLIGHT_RESERVATION' | 'HOTEL_BOOKING' | 'TRAVEL_INSURANCE';
    
    // Create order
    const order = await prisma.order.create({
      data: {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        serviceType: serviceTypeEnum,
        customerId: customer.id,
        customerName,
        customerEmail,
        customerPhone,
        numberOfTravelers,
        totalAmount,
        paymentMethod,
        status: status as 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
      }
    });

    // Create travelers
    const travelers = [];
    for (let i = 0; i < numberOfTravelers; i++) {
      const traveler = await prisma.traveler.create({
        data: {
          orderId: order.id,
          title: 'Mr',
          firstName: i === 0 ? customerName.split(' ')[0] : `Traveler${i + 1}`,
          lastName: i === 0 ? customerName.split(' ')[1] || 'Doe' : 'Companion',
          dateOfBirth: new Date(1990, 0, 1), // Default DOB
          isPrimary: i === 0
        }
      });
      travelers.push(traveler);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}