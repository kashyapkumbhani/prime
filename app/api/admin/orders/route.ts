import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all orders with their details
    const ordersFromDb = await prisma.order.findMany({
      include: {
        customer: true,
        travelers: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format orders for the dashboard
    const orders = ordersFromDb.map(order => ({
      id: order.id,
      serviceType: order.serviceType,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone,
      numberOfTravelers: order.travelers.length,
      totalAmount: order.totalAmount,
      status: order.status.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
      completedAt: order.completedAt?.toISOString(),
      flightBooking: order.flightFrom || order.flightTo ? {
        from: order.flightFrom,
        to: order.flightTo,
        departureDate: order.departureDate,
        returnDate: order.returnDate
      } : null,
      hotelBooking: order.destination ? {
        destination: order.destination,
        checkinDate: order.checkinDate,
        checkoutDate: order.checkoutDate
      } : null,
      insuranceBooking: order.coverageType ? {
        coverage: order.coverageType,
        tripValue: order.tripValue
      } : null
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