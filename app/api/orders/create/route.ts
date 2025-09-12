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
      status = 'PENDING',
      primaryTraveler,
      additionalTravelers,
      // Flight booking specific fields
      tripType,
      departureAirport,
      arrivalAirport,
      departureDate,
      returnDate,
      // Hotel booking specific fields
      destinationCity,
      checkInDate,
      checkOutDate,
      numberOfHotels,
      // Common fields
      purpose,
      deliveryTiming,
      deliveryDate,
      specialRequest
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

    // Create travelers with actual form data
    const travelers = [];
    
    console.log('Creating travelers with data:', { primaryTraveler, additionalTravelers });
    
    // Create primary traveler
    if (primaryTraveler && primaryTraveler.firstName) {
      const traveler = await prisma.traveler.create({
        data: {
          orderId: order.id,
          title: primaryTraveler.title || 'Mr',
          firstName: primaryTraveler.firstName || customerName.split(' ')[0],
          lastName: primaryTraveler.lastName || customerName.split(' ')[1] || '',
          isPrimary: true
        }
      });
      travelers.push(traveler);
    } else {
      // Fallback: create primary traveler from customer name
      const nameParts = customerName.split(' ');
      const traveler = await prisma.traveler.create({
        data: {
          orderId: order.id,
          title: 'Mr',
          firstName: nameParts[0] || 'Primary',
          lastName: nameParts.slice(1).join(' ') || 'Traveler',
          isPrimary: true
        }
      });
      travelers.push(traveler);
    }
    
    // Create additional travelers
    if (additionalTravelers && additionalTravelers.length > 0) {
      for (let i = 0; i < additionalTravelers.length; i++) {
        const additionalTraveler = additionalTravelers[i];
        if (additionalTraveler && (additionalTraveler.firstName || additionalTraveler.lastName)) {
          const traveler = await prisma.traveler.create({
            data: {
              orderId: order.id,
              title: additionalTraveler.title || 'Mr',
              firstName: additionalTraveler.firstName || `Traveler${i + 2}`,
              lastName: additionalTraveler.lastName || '',
              isPrimary: false
            }
          });
          travelers.push(traveler);
        }
      }
    }
    
    // Create flight booking if it's a flight reservation
    if (serviceTypeEnum === 'FLIGHT_RESERVATION' && tripType && departureAirport && arrivalAirport && departureDate) {
      await prisma.flightBooking.create({
        data: {
          orderId: order.id,
          tripType,
          departureAirport: `${departureAirport.name} - ${departureAirport.city}, ${departureAirport.country}`,
          arrivalAirport: `${arrivalAirport.name} - ${arrivalAirport.city}, ${arrivalAirport.country}`,
          departureDate: new Date(departureDate),
          returnDate: returnDate ? new Date(returnDate) : null,
          purpose: purpose || 'Visa Submission / Application',
          specialRequests: specialRequest,
          deliveryTiming: deliveryTiming || 'now'
        }
      });
    }
    
    // Create hotel booking if it's a hotel booking
    if (serviceTypeEnum === 'HOTEL_BOOKING' && destinationCity && checkInDate && checkOutDate) {
      await prisma.hotelBooking.create({
        data: {
          orderId: order.id,
          destinationCity,
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
          numberOfRooms: numberOfHotels || 1,
          numberOfGuests: numberOfTravelers,
          purpose: purpose || 'Visa Submission / Application',
          specialRequests: specialRequest
        }
      });
      
      console.log('Hotel booking created successfully for order:', order.id);
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