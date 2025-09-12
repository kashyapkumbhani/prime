import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all orders with their details
    const ordersFromDb = await prisma.order.findMany({
      include: {
        travelers: true,
        flightBooking: true,
        hotelBooking: true,
        insuranceBooking: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format orders for the dashboard
    const orders = ordersFromDb.map(order => ({
      id: order.id,
      serviceType: order.serviceType,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      numberOfTravelers: order.travelers.length,
      totalAmount: order.totalAmount,
      status: order.status.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
      completedAt: order.completedAt?.toISOString(),
      travelers: order.travelers,
      flightBooking: order.flightBooking,
      hotelBooking: order.hotelBooking,
      insuranceBooking: order.insuranceBooking
    }));

    // Calculate statistics
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
    const completedOrders = orders.filter(order => order.status === 'COMPLETED').length;

    // Get recent orders (last 5)
    const recentOrders = orders.slice(0, 5);

    const stats = {
      totalRevenue,
      totalOrders,
      pendingOrders,
      completedOrders
    };

    return NextResponse.json({
      orders: recentOrders,
      stats,
      allOrders: orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}