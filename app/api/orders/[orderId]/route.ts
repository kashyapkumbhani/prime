import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        travelers: true,
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Format the order data for the frontend
    const formattedOrder = {
      id: order.id,
      serviceType: order.serviceType,
      customer: {
        name: order.customerName, // Using customerName from Order model
        email: order.customerEmail, // Using customerEmail from Order model
        phone: order.customerPhone // Using customerPhone from Order model
      },
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      completedAt: order.completedAt?.toISOString(),
      travelers: order.travelers,
      numberOfTravelers: order.travelers.length,
      paymentMethod: order.paymentMethod
    };

    return NextResponse.json({
      success: true,
      order: formattedOrder
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}